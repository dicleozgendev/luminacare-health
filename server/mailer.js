// Best-effort email confirmation.
//
// Honest note: without real SMTP credentials this cannot actually send
// anything. If SMTP_HOST/SMTP_USER/SMTP_PASS aren't set in .env, we log the
// email to the console instead of pretending it was sent — unlike the old
// frontend-only demo, which always showed "SMS & Email sent" regardless of
// whether anything really happened. A booking still succeeds even if email
// sending fails or isn't configured; email is a nice-to-have, not a
// requirement for the appointment to be real.

import nodemailer from 'nodemailer';

let transporter = null;
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

export async function sendAppointmentConfirmation({ to, patientName, ticketNo, doctorName, deptTitle, date, time }) {
  const subject = `LuminaCare - Appointment confirmed (${ticketNo})`;
  const text = `Hi ${patientName},\n\nYour appointment is confirmed.\n\nDoctor: ${doctorName}\nDepartment: ${deptTitle}\nDate/time: ${date} ${time}\nTicket: ${ticketNo}\n\nSee you soon.`;

  if (!transporter) {
    console.log('[mailer] No SMTP configured — would have sent:', { to, subject, text });
    return { sent: false, reason: 'smtp_not_configured' };
  }
  if (!to) {
    return { sent: false, reason: 'no_recipient' };
  }

  try {
    await transporter.sendMail({ from: process.env.SMTP_FROM || process.env.SMTP_USER, to, subject, text });
    return { sent: true };
  } catch (err) {
    console.error('[mailer] send failed:', err.message);
    return { sent: false, reason: 'send_failed' };
  }
}
