// Database layer for the LuminaCare appointment backend.
//
// Uses SQLite via Node's own built-in node:sqlite module — zero external
// services, zero native-addon compilation. (This used to run on
// better-sqlite3, but that package's native C++ addon doesn't yet build
// against very new Node versions; node:sqlite ships inside Node itself so
// there's nothing to compile.) Good enough for a single clinic; if this
// grows into a real multi-tenant SaaS product later, swap this file for a
// Postgres client and keep the same function signatures.

import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { departmentsData, doctorsData } from '../src/data/mockData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const db = new DatabaseSync(path.join(dataDir, 'luminacare.db'));
db.exec('PRAGMA journal_mode = WAL;');

db.exec(`
  CREATE TABLE IF NOT EXISTS departments (
    id TEXT PRIMARY KEY,
    title_tr TEXT NOT NULL,
    title_en TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS doctors (
    id TEXT PRIMARY KEY,
    department_id TEXT NOT NULL,
    name TEXT NOT NULL,
    title_tr TEXT,
    title_en TEXT,
    experience INTEGER,
    rating REAL,
    image TEXT,
    available_slots TEXT
  );

  -- Deliberately NOT storing T.C. Kimlik No (Turkish national ID). Health
  -- appointment data is a "special category" under KVKK; the fewer
  -- identifying fields we hold, the smaller the compliance burden and the
  -- smaller the damage if this database is ever leaked. Name + phone/email
  -- is enough to run a booking desk.
  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_no TEXT UNIQUE NOT NULL,
    patient_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    department_id TEXT NOT NULL,
    doctor_id TEXT NOT NULL,
    appt_date TEXT NOT NULL,
    appt_time TEXT NOT NULL,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'confirmed', -- confirmed | cancelled | completed
    consent_given INTEGER NOT NULL DEFAULT 0,
    consent_version TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS staff_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT,
    role TEXT NOT NULL DEFAULT 'staff',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  -- Every access/change a staff member makes to patient data gets logged
  -- here. This is a basic but real accountability trail — useful both for
  -- KVKK ("who touched this record") and for catching misuse.
  CREATE TABLE IF NOT EXISTS audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    actor_email TEXT,
    action TEXT NOT NULL,
    target_type TEXT,
    target_id TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

// Seed departments/doctors from the same mockData.js the frontend already
// uses, so there is exactly one source of truth for "what departments and
// doctors exist" instead of duplicating that list into the database by hand.
const deptCount = db.prepare('SELECT COUNT(*) AS c FROM departments').get().c;
if (deptCount === 0) {
  const insertDept = db.prepare('INSERT INTO departments (id, title_tr, title_en) VALUES (?, ?, ?)');
  for (const d of departmentsData) insertDept.run(d.id, d.title.tr, d.title.en);
}

const docCount = db.prepare('SELECT COUNT(*) AS c FROM doctors').get().c;
if (docCount === 0) {
  const insertDoc = db.prepare(`
    INSERT INTO doctors (id, department_id, name, title_tr, title_en, experience, rating, image, available_slots)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const d of doctorsData) {
    insertDoc.run(
      d.id, d.departmentId, d.name,
      d.title?.tr || '', d.title?.en || '',
      d.experience || 0, d.rating || 0, d.image || '',
      JSON.stringify(d.availableSlots || [])
    );
  }
}

export function logAudit(actorEmail, action, targetType, targetId) {
  db.prepare(
    'INSERT INTO audit_log (actor_email, action, target_type, target_id) VALUES (?, ?, ?, ?)'
  ).run(actorEmail || null, action, targetType || null, targetId ? String(targetId) : null);
}

export default db;
