import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from './db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-only-secret-change-me';
const TOKEN_TTL = '8h';

export function issueToken(staff) {
  return jwt.sign({ sub: staff.id, email: staff.email, role: staff.role }, JWT_SECRET, { expiresIn: TOKEN_TTL });
}

export function requireStaffAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing auth token' });
  try {
    req.staff = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// One-time helper: creates the first staff account from env vars if the
// staff_users table is empty, so there's always a way to log into the admin
// panel on a fresh install without shipping a hardcoded password in the repo.
export function ensureSeedStaffUser() {
  const count = db.prepare('SELECT COUNT(*) AS c FROM staff_users').get().c;
  if (count > 0) return;

  const email = process.env.ADMIN_SEED_EMAIL;
  const password = process.env.ADMIN_SEED_PASSWORD;
  if (!email || !password) {
    console.warn(
      '[auth] No staff account exists yet, and ADMIN_SEED_EMAIL/ADMIN_SEED_PASSWORD are not set in .env — ' +
      'the admin panel will have no way to log in until you set those and restart the server.'
    );
    return;
  }
  const hash = bcrypt.hashSync(password, 12);
  db.prepare('INSERT INTO staff_users (email, password_hash, name, role) VALUES (?, ?, ?, ?)')
    .run(email, hash, 'Admin', 'admin');
  console.log(`[auth] Created initial staff account for ${email}. Change this password after first login.`);
}
