# LuminaCare Medical Center

A modern, bilingual (TR/EN) hospital/medical center website — plus a real
appointment backend behind it. Not just a static promo page: a full patient
journey demo (appointment booking, AI-style symptom triage UI, telehealth,
lab results portal) backed by an actual Express + SQLite API that stores
real bookings, generates real QR codes, and enforces KVKK-style consent.

> **Note:** This project is a demo/prototype. Doctor profiles, department
> data, and lab results are fictional. It does not provide real medical
> diagnosis, treatment, or emergency services. See [SERVER.md](./SERVER.md)
> for an honest breakdown of what the backend does and doesn't handle from
> a legal/compliance standpoint.

## Features

- **Digital appointment wizard** — a 4-step flow (department → doctor →
  date/time → confirm) that books a *real* appointment through the backend
  and returns a real ticket number and QR code.
- **AI-style symptom triage (UI simulation)** — routes the visitor to a
  suggested department based on a typed complaint. This is a rule-based
  UI flow, not a real diagnostic AI — see the honesty note in SERVER.md.
- **Telemedicine module** — simulates the screen flow of an online video
  consultation.
- **Patient portal** — a UI for checking lab/MRI results.
- **Doctor roster** — filterable, searchable list of specialists with
  profiles, ratings, and languages spoken.
- **Department showcase, check-up packages & insurance verification,
  campus locator, callback request, 24/7 emergency section.**
- **Staff admin panel** (`/admin.html` on the backend) — JWT-protected view
  of real bookings, with complete/cancel/erase actions and an audit log.
- **TR/EN language support**, dark/light theme, responsive design.

## Technology

**Frontend:** React 19 · Vite · Tailwind CSS 4 · lucide-react · canvas-confetti
**Backend:** Node.js · Express · `node:sqlite` (Node's built-in SQLite —
no native addon to compile) · JWT auth · bcrypt · rate limiting · helmet ·
QR code generation · best-effort email via Nodemailer

## Project structure

```text
src/
  components/       Header, Hero, Departments, DoctorsRoster, SymptomTriage,
                     AppointmentWizard, TelehealthModal, PatientPortal,
                     CheckupAndInsurance, EmergencySection, HospitalTour, Footer
  data/mockData.js  Translations (TR/EN) and doctor/department/package data —
                     also the single source of truth the backend seeds from
  App.jsx           Page state (language, theme, modals)

server/
  index.js          Express app: public booking API, staff auth, admin routes
  db.js             SQLite schema + seeding (via node:sqlite)
  auth.js           JWT issuing/verification, seed staff account on first run
  consent.js        Draft KVKK consent text (needs legal review before real use)
  mailer.js         Best-effort email confirmation (logs instead of faking success)
  admin.html        Staff panel — view/manage real bookings
```

## Running it

Frontend only (static demo, no real bookings):

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
```

Frontend + real backend (real bookings, real QR codes, admin panel):

```bash
npm install
cp .env.example .env    # then fill in ADMIN_SEED_EMAIL / ADMIN_SEED_PASSWORD
npm run server           # http://localhost:4100 (admin panel at /admin.html)
npm run dev              # http://localhost:5173, in a separate terminal
```

Full backend details, including the honest KVKK/health-data compliance
notes, are in [SERVER.md](./SERVER.md).
