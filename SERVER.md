# Appointment backend

A real Node/Express + SQLite backend behind the appointment wizard. Unlike
the original frontend-only demo (which faked a ticket number and always
claimed "SMS & email sent"), this actually stores bookings, generates a real
QR code, and only claims an email was sent if it really was.

SQLite access uses Node's own built-in `node:sqlite` module (not the
`better-sqlite3` npm package) — no native addon to compile, so there's
nothing that can fail to build against your Node version. Requires Node 22.5+
(it's marked "experimental" by Node and prints a one-line warning on
startup; that's expected and harmless).

## Running it

```bash
npm install
cp .env.example .env   # then edit .env — see below
npm run server          # http://localhost:4100, admin panel at /admin.html
```

`ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` in `.env` create the first staff
login on first run. Change that password after logging in once (there's no
change-password UI yet — for now that means: pick a strong one from the
start, or delete `server/data/luminacare.db` and reseed with a new one).

Email sending is optional. Without real SMTP credentials in `.env`, the
server logs what it would have sent instead of sending anything — bookings
still succeed either way. SMS was not implemented; that needs a paid SMS
provider account, which isn't something this app can set up on your behalf.

## What this is, and isn't

This is a **single-clinic prototype**: one SQLite file, one set of staff
accounts, no multi-tenant separation. If you productize this to sell to
multiple clinics, each clinic needs its own isolated data — that's a bigger
rebuild (shared backend with per-clinic accounts, or one deployment per
clinic), not a config flag.

## Honest note on KVKK / health data compliance

Appointment notes (reason for visit) can qualify as "özel nitelikli kişisel
veri" (special category personal data) under KVKK Article 6. What this
backend does on the technical side:

- **Does not collect or store T.C. Kimlik No.** The original frontend demo
  had a national ID field; it's been removed. Storing national ID numbers
  adds real legal weight for very little operational benefit at the booking
  stage — a name and phone number is enough to run a front desk.
- Requires an explicit consent checkbox before a booking is accepted
  (`consentGiven` must be `true`; see `server/consent.js` for the text shown
  to patients).
- Logs every staff view/edit/delete of appointment data to `audit_log`, so
  there's a real answer to "who accessed this record and when."
- Supports permanent deletion of a specific appointment (the "Erase" button
  in the staff panel) for erasure requests under KVKK Article 11.
- Rate-limits the public booking endpoint and the login endpoint.

What it does **not** do, and what a real deployment still needs:
- **Legal review.** `server/consent.js` is a draft. It needs a lawyer to fill
  in the actual clinic's legal entity name, retention period, and KVKK
  contact process before this goes in front of real patients. I'm not a
  lawyer and this isn't legal advice — treat the consent text as a starting
  point, not a finished document.
- **Encryption at rest for the database file** relies on the host machine's
  disk encryption (e.g., macOS FileVault) — there's no field-level
  encryption inside the SQLite file itself. For a real clinic, hosting on a
  provider with disk encryption enabled by default (Railway, Render, etc.)
  covers this reasonably; a from-scratch, field-level encryption layer would
  be disproportionate engineering for a single-clinic prototype at this
  stage.
- **HTTPS.** This app doesn't terminate TLS itself — whatever you deploy it
  behind (Netlify, Railway, a reverse proxy) needs to provide HTTPS. Never
  run this over plain HTTP in front of real patients.
- **VERBIS registration and a full KVKK compliance program** are the
  clinic's (the data controller's) responsibility, not something a codebase
  can satisfy on its own.
