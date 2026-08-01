import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import QRCode from 'qrcode';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import db, { logAudit } from './db.js';
import { issueToken, requireStaffAuth, ensureSeedStaffUser } from './auth.js';
import { sendAppointmentConfirmation } from './mailer.js';
import { CONSENT_TEXT_TR, CONSENT_TEXT_EN, CONSENT_VERSION } from './consent.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// helmet()'s default Content-Security-Policy blocks inline <script> tags
// and inline onclick="" handlers, which is exactly what admin.html uses.
// Without this override, the login button silently does nothing — the
// browser blocks the script instead of erroring visibly. Loosening
// script-src/script-src-attr here is acceptable for this local,
// single-clinic staff tool; if this is ever exposed beyond localhost,
// admin.html's inline script should be moved to an external file and this
// exception removed.
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'script-src': ["'self'", "'unsafe-inline'"],
      'script-src-attr': ["'unsafe-inline'"],
    },
  },
}));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // serves admin.html

ensureSeedStaffUser();

// --- Public: departments & doctors (read-only, not sensitive) --------------

app.get('/api/departments', (req, res) => {
  const rows = db.prepare('SELECT id, title_tr, title_en FROM departments').all();
  res.json(rows.map(r => ({ id: r.id, title: { tr: r.title_tr, en: r.title_en } })));
});

app.get('/api/doctors', (req, res) => {
  const { departmentId } = req.query;
  const rows = departmentId
    ? db.prepare('SELECT * FROM doctors WHERE department_id = ?').all(departmentId)
    : db.prepare('SELECT * FROM doctors').all();
  res.json(rows.map(r => ({
    id: r.id,
    departmentId: r.department_id,
    name: r.name,
    title: { tr: r.title_tr, en: r.title_en },
    experience: r.experience,
    rating: r.rating,
    image: r.image,
    availableSlots: JSON.parse(r.available_slots || '[]'),
  })));
});

app.get('/api/consent-text', (req, res) => {
  const lang = req.query.lang === 'en' ? 'en' : 'tr';
  res.json({ version: CONSENT_VERSION, text: lang === 'en' ? CONSENT_TEXT_EN : CONSENT_TEXT_TR });
});

// --- Public: booking (rate-limited — this is the one endpoint a random ------
// visitor can write to, so it needs its own limiter separate from the
// general API to stop someone from flooding the appointments table) --------

const bookingLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 });

app.post('/api/appointments', bookingLimiter, async (req, res) => {
  const { patientName, phone, email, departmentId, doctorId, date, time, notes, consentGiven } = req.body || {};

  if (!patientName || !phone || !departmentId || !doctorId || !date || !time) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (!consentGiven) {
    return res.status(400).json({ error: 'Explicit consent is required to book an appointment.' });
  }

  const dept = db.prepare('SELECT * FROM departments WHERE id = ?').get(departmentId);
  const doctor = db.prepare('SELECT * FROM doctors WHERE id = ?').get(doctorId);
  if (!dept || !doctor) return res.status(400).json({ error: 'Unknown department or doctor' });

  const ticketNo = 'LM-' + Math.floor(100000 + Math.random() * 900000);

  db.prepare(`
    INSERT INTO appointments
      (ticket_no, patient_name, phone, email, department_id, doctor_id, appt_date, appt_time, notes, consent_given, consent_version)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)
  `).run(ticketNo, patientName, phone, email || null, departmentId, doctorId, date, time, notes || null, CONSENT_VERSION);

  logAudit(null, 'appointment_created', 'appointment', ticketNo);

  const mailResult = await sendAppointmentConfirmation({
    to: email,
    patientName,
    ticketNo,
    doctorName: doctor.name,
    deptTitle: dept.title_tr,
    date,
    time,
  });

  const qrDataUrl = await QRCode.toDataURL(ticketNo);

  res.status(201).json({
    ticketNo,
    qrDataUrl,
    emailSent: mailResult.sent,
    doctor: { id: doctor.id, name: doctor.name },
    department: { id: dept.id, title: { tr: dept.title_tr, en: dept.title_en } },
    date,
    time,
  });
});

// --- Staff auth --------------------------------------------------------

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });

app.post('/api/auth/login', loginLimiter, (req, res) => {
  const { email, password } = req.body || {};
  const staff = db.prepare('SELECT * FROM staff_users WHERE email = ?').get(email);
  if (!staff || !bcrypt.compareSync(password || '', staff.password_hash)) {
    logAudit(email, 'login_failed', 'staff_user', email);
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  logAudit(email, 'login_success', 'staff_user', email);
  res.json({ token: issueToken(staff), name: staff.name, role: staff.role });
});

// --- Staff-only: appointment management ---------------------------------

app.get('/api/staff/appointments', requireStaffAuth, (req, res) => {
  const rows = db.prepare(`
    SELECT a.*, d.title_tr AS dept_title_tr, doc.name AS doctor_name
    FROM appointments a
    LEFT JOIN departments d ON d.id = a.department_id
    LEFT JOIN doctors doc ON doc.id = a.doctor_id
    ORDER BY a.appt_date DESC, a.appt_time DESC
  `).all();
  logAudit(req.staff.email, 'list_appointments', 'appointment', null);
  res.json(rows);
});

app.patch('/api/staff/appointments/:id', requireStaffAuth, (req, res) => {
  const { status } = req.body || {};
  if (!['confirmed', 'cancelled', 'completed'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  db.prepare('UPDATE appointments SET status = ?, updated_at = datetime(\'now\') WHERE id = ?').run(status, req.params.id);
  logAudit(req.staff.email, `status_${status}`, 'appointment', req.params.id);
  res.json({ ok: true });
});

// KVKK erasure request handler: a patient asking to be forgotten results in
// a real, permanent delete — not a soft "hidden" flag — because the whole
// point of an erasure right is that the data stops existing.
app.delete('/api/staff/appointments/:id', requireStaffAuth, (req, res) => {
  db.prepare('DELETE FROM appointments WHERE id = ?').run(req.params.id);
  logAudit(req.staff.email, 'erasure_delete', 'appointment', req.params.id);
  res.json({ ok: true });
});

app.get('/api/staff/audit-log', requireStaffAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM audit_log ORDER BY created_at DESC LIMIT 200').all();
  res.json(rows);
});

const PORT = process.env.PORT || 4100;
app.listen(PORT, () => {
  console.log(`LuminaCare appointment backend running on http://localhost:${PORT}`);
  console.log(`  Admin panel: http://localhost:${PORT}/admin.html`);
});
