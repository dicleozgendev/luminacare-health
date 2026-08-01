import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  CheckCircle2, 
  QrCode, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck,
  Building2,
  Stethoscope,
  Phone,
  Mail,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { departmentsData, doctorsData, translations } from '../data/mockData';

// Points at the local backend by default; override with VITE_API_BASE for
// a deployed environment (e.g. when the API isn't on localhost:4100).
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4100';

// Was 100% hardcoded Turkish regardless of `lang` (aside from a few inline
// ternaries already present for error/status messages).
const wizardText = {
  tr: {
    stepDept: "1. Poliklinik",
    stepDoctor: "2. Uzman Hekim",
    stepDate: "3. Tarih & Saat",
    stepConfirm: "4. Onay",
    wizardBadge: "LuminaCare Dijital Geçiş Sihirbazı",
    wizardTitle: "Online Randevu Oluştur",
    chooseDept: "Lütfen Muayene Olmak İstediğiniz Tıbbi Birimi Seçin:",
    onStaffDoctors: "Kadrolu Hekim",
    goToDoctor: "Hekim Seçimine Geç",
    chooseDoctor: "Nöbetçi Uzman Hekim Seçimi:",
    yearsExp: "Yıl Deneyim",
    back: "Geri",
    goToDateTime: "Tarih & Saat Seç",
    chooseDate: "Randevu Tarihi Seçin:",
    chooseTime: "Uygun Saat Dilimi Seçin:",
    goToPatientInfo: "Hasta Bilgilerine Geç",
    patientInfoTitle: "Hasta Kimlik ve İletişim Bilgileri:",
    fullName: "Ad Soyad",
    phone: "Telefon",
    email: "E-Posta",
    selectedDoctor: "Seçilen Hekim:",
    department: "Poliklinik:",
    dateTime: "Tarih & Saat:",
    booking: "Oluşturuluyor...",
    confirmBooking: "Randevuyu Onayla ve Bilet Oluştur",
    emailSent: "E-Posta Bilgilendirmesi Gönderildi",
    emailNotSent: "Randevu Oluşturuldu (E-posta gönderilmedi — sunucuda SMTP yapılandırılmamış)",
    successTitle: "Randevunuz Başarıyla Oluşturuldu!",
    passTitle: "LuminaCare Dijital Geçiş Biletiniz",
    patientName: "Hasta Adı",
    deptAndDoctor: "Poliklinik & Hekim",
    apptTime: "Randevu Zamanı",
    qrLabel: "GİRİŞ QR KODU",
    createdAt: "Oluşturulma:",
    scanNote: "Gelişinizde QR Kodu Turnikeye Okutunuz",
    printTicket: "Bileti Yazdır",
    done: "Tamam",
  },
  en: {
    stepDept: "1. Department",
    stepDoctor: "2. Specialist",
    stepDate: "3. Date & Time",
    stepConfirm: "4. Confirm",
    wizardBadge: "LuminaCare Digital Check-In Wizard",
    wizardTitle: "Book an Online Appointment",
    chooseDept: "Please select the medical department you'd like to visit:",
    onStaffDoctors: "On-Staff Doctors",
    goToDoctor: "Continue to Doctor Selection",
    chooseDoctor: "Select an Available Specialist:",
    yearsExp: "Years Experience",
    back: "Back",
    goToDateTime: "Choose Date & Time",
    chooseDate: "Choose an Appointment Date:",
    chooseTime: "Choose an Available Time Slot:",
    goToPatientInfo: "Continue to Patient Info",
    patientInfoTitle: "Patient Identity & Contact Information:",
    fullName: "Full Name",
    phone: "Phone",
    email: "Email",
    selectedDoctor: "Selected Doctor:",
    department: "Department:",
    dateTime: "Date & Time:",
    booking: "Booking...",
    confirmBooking: "Confirm Appointment & Generate Ticket",
    emailSent: "Confirmation Email Sent",
    emailNotSent: "Appointment Created (Email not sent — SMTP not configured on the server)",
    successTitle: "Your Appointment Was Successfully Booked!",
    passTitle: "Your LuminaCare Digital Check-In Pass",
    patientName: "Patient Name",
    deptAndDoctor: "Department & Doctor",
    apptTime: "Appointment Time",
    qrLabel: "ENTRY QR CODE",
    createdAt: "Created:",
    scanNote: "Scan This QR Code at the Turnstile on Arrival",
    printTicket: "Print Ticket",
    done: "Done",
  },
};

export default function AppointmentWizard({ 
  lang, 
  isOpen, 
  onClose, 
  preSelectedDoctor, 
  preSelectedDept 
}) {
  const t = translations[lang];
  const w = wizardText[lang];

  const [step, setStep] = useState(1);
  const [selectedDeptId, setSelectedDeptId] = useState(preSelectedDept || 'cardiology');
  const [selectedDoctorId, setSelectedDoctorId] = useState(preSelectedDoctor?.id || '');
  const [selectedDate, setSelectedDate] = useState('2026-07-27');
  const [selectedSlot, setSelectedSlot] = useState('10:00');
  
  const [patientForm, setPatientForm] = useState({
    name: 'Deniz Kaya',
    phone: '0532 987 65 43',
    email: 'deniz.kaya@example.com',
    notes: 'Rutin kontrol ve tahlil incelemesi.'
  });
  const [consentGiven, setConsentGiven] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [ticketData, setTicketData] = useState(null);

  // Sync state if pre-selected doctor or department changes
  useEffect(() => {
    if (preSelectedDoctor) {
      setSelectedDoctorId(preSelectedDoctor.id);
      setSelectedDeptId(preSelectedDoctor.departmentId);
      setStep(3); // Jump to date/time step if doctor is already chosen!
    } else if (preSelectedDept) {
      setSelectedDeptId(preSelectedDept);
    }
  }, [preSelectedDoctor, preSelectedDept]);

  if (!isOpen) return null;

  const currentDeptDoctors = doctorsData.filter(doc => doc.departmentId === selectedDeptId);
  const selectedDoctorObj = doctorsData.find(doc => doc.id === selectedDoctorId) || currentDeptDoctors[0];
  const selectedDeptObj = departmentsData.find(d => d.id === selectedDeptId);

  const handleConfirmBooking = async () => {
    if (!consentGiven) {
      setSubmitError(lang === 'tr'
        ? 'Devam etmek için açık rıza metnini onaylamanız gerekiyor.'
        : 'You need to accept the consent notice to continue.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch(`${API_BASE}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName: patientForm.name,
          phone: patientForm.phone,
          email: patientForm.email,
          notes: patientForm.notes,
          departmentId: selectedDeptObj?.id || selectedDeptId,
          doctorId: selectedDoctorObj?.id || selectedDoctorId,
          date: selectedDate,
          time: selectedSlot,
          consentGiven,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Booking failed (HTTP ${res.status})`);
      }

      const data = await res.json();

      setTicketData({
        ticketNo: data.ticketNo,
        qrDataUrl: data.qrDataUrl,
        emailSent: data.emailSent,
        patientName: patientForm.name,
        phone: patientForm.phone,
        doctor: selectedDoctorObj,
        department: selectedDeptObj,
        date: selectedDate,
        time: selectedSlot,
        createdAt: new Date().toLocaleString(),
      });
      setStep(5);

      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (err) {
      // Show the real reason when we have one (e.g. a validation message
      // from the backend); only fall back to the generic "is it running"
      // message for genuine network failures (backend not reachable).
      const isNetworkFailure = err instanceof TypeError;
      setSubmitError(isNetworkFailure
        ? (lang === 'tr'
            ? 'Sunucuya ulaşılamadı. Sunucu çalışıyor mu kontrol edin (npm run server).'
            : 'Could not reach the backend. Check that it is running (npm run server).')
        : err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setTicketData(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass-card max-w-2xl w-full p-6 md:p-8 border border-cyan-500/30 relative animate-fadeIn">
        
        {/* Close Button */}
        <button 
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Wizard Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>{w.wizardBadge}</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">{w.wizardTitle}</h2>
        </div>

        {/* Step Indicator Bar (Steps 1-4) */}
        {step < 5 && (
          <div className="grid grid-cols-4 gap-2 mb-8 border-b border-slate-800 pb-4">
            <div className={`text-center pb-2 border-b-2 font-semibold text-xs ${step >= 1 ? 'border-cyan-400 text-cyan-400' : 'border-slate-800 text-slate-500'}`}>
              {w.stepDept}
            </div>
            <div className={`text-center pb-2 border-b-2 font-semibold text-xs ${step >= 2 ? 'border-cyan-400 text-cyan-400' : 'border-slate-800 text-slate-500'}`}>
              {w.stepDoctor}
            </div>
            <div className={`text-center pb-2 border-b-2 font-semibold text-xs ${step >= 3 ? 'border-cyan-400 text-cyan-400' : 'border-slate-800 text-slate-500'}`}>
              {w.stepDate}
            </div>
            <div className={`text-center pb-2 border-b-2 font-semibold text-xs ${step >= 4 ? 'border-cyan-400 text-cyan-400' : 'border-slate-800 text-slate-500'}`}>
              {w.stepConfirm}
            </div>
          </div>
        )}

        {/* STEP 1: Select Polyclinic */}
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-cyan-400" />
              {w.chooseDept}
            </h3>

            <div className="grid sm:grid-cols-2 gap-3">
              {departmentsData.map((dept) => (
                <div
                  key={dept.id}
                  onClick={() => {
                    setSelectedDeptId(dept.id);
                    // Reset doctor selection to first of this department
                    const firstDoc = doctorsData.find(d => d.departmentId === dept.id);
                    if (firstDoc) setSelectedDoctorId(firstDoc.id);
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedDeptId === dept.id
                      ? 'bg-cyan-950/60 border-cyan-500 shadow-lg shadow-cyan-500/20 text-white'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div>
                    <h4 className="font-bold text-sm">{dept.title[lang]}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{dept.specsCount} {w.onStaffDoctors}</p>
                  </div>
                  {selectedDeptId === dept.id && (
                    <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md flex items-center gap-2"
              >
                <span>{w.goToDoctor}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Select Specialist Doctor */}
        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-emerald-400" />
              {selectedDeptObj?.title[lang]} - {w.chooseDoctor}
            </h3>

            <div className="space-y-3">
              {currentDeptDoctors.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoctorId(doc.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                    selectedDoctorId === doc.id
                      ? 'bg-emerald-950/60 border-emerald-500 shadow-lg shadow-emerald-500/20 text-white'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={doc.image} alt={doc.name} className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
                    <div>
                      <h4 className="font-bold text-sm text-white">{doc.name}</h4>
                      <p className="text-xs text-cyan-400 font-medium">{doc.title[lang]}</p>
                      <p className="text-[11px] text-slate-400">{doc.experience} {w.yearsExp} • ⭐ {doc.rating}</p>
                    </div>
                  </div>

                  {selectedDoctorId === doc.id && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{w.back}</span>
              </button>

              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-bold text-xs shadow-md flex items-center gap-2"
              >
                <span>{w.goToDateTime}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Pick Date & Time Slot */}
        {step === 3 && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <h3 className="text-sm font-bold text-slate-200 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                {w.chooseDate}
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {['2026-07-27', '2026-07-28', '2026-07-29'].map((dateStr) => (
                  <button
                    key={dateStr}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                      selectedDate === dateStr
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-extrabold shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {dateStr}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-200 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                {w.chooseTime}
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {(selectedDoctorObj?.availableSlots || ["09:30", "11:00", "14:15", "16:00"]).map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2.5 rounded-lg text-xs font-bold border transition-all ${
                      selectedSlot === slot
                        ? 'bg-amber-400 text-slate-950 border-amber-300 font-extrabold shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{w.back}</span>
              </button>

              <button
                onClick={() => setStep(4)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md flex items-center gap-2"
              >
                <span>{w.goToPatientInfo}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Patient Info & Confirmation */}
        {step === 4 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-cyan-400" />
              {w.patientInfoTitle}
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">{w.fullName}</label>
                <input
                  type="text"
                  value={patientForm.name}
                  onChange={(e) => setPatientForm({...patientForm, name: e.target.value})}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">{w.phone}</label>
                <input
                  type="text"
                  value={patientForm.phone}
                  onChange={(e) => setPatientForm({...patientForm, phone: e.target.value})}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">{w.email}</label>
                <input 
                  type="email" 
                  value={patientForm.email} 
                  onChange={(e) => setPatientForm({...patientForm, email: e.target.value})}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Summary Box */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-xs text-slate-300 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">{w.selectedDoctor}</span>
                <strong className="text-white">{selectedDoctorObj?.name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{w.department}</span>
                <strong className="text-cyan-400">{selectedDeptObj?.title[lang]}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{w.dateTime}</span>
                <strong className="text-amber-400">{selectedDate} - {selectedSlot}</strong>
              </div>
            </div>

            {/* Consent checkbox — booking is rejected server-side without this */}
            <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-[11px] text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={consentGiven}
                onChange={(e) => setConsentGiven(e.target.checked)}
                className="mt-0.5"
              />
              <span>
                {lang === 'tr'
                  ? 'Randevu ve iletişim bilgilerimin bu randevuyu oluşturmak ve benimle iletişime geçmek amacıyla işlenmesini kabul ediyorum. (Taslak aydınlatma metni — gerçek kullanım öncesi hukuki incelemeden geçmelidir.)'
                  : 'I agree to my appointment and contact details being processed to create this booking and to be contacted about it. (Draft consent notice — needs legal review before real-world use.)'}
              </span>
            </label>

            {submitError && (
              <div className="text-xs font-semibold text-red-400 bg-red-950/40 border border-red-500/30 rounded-lg px-3 py-2">
                {submitError}
              </div>
            )}

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(3)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{w.back}</span>
              </button>

              <button
                onClick={handleConfirmBooking}
                disabled={isSubmitting || !consentGiven}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-white font-extrabold text-xs shadow-xl shadow-emerald-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isSubmitting ? w.booking : w.confirmBooking}
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Digital Pass Ticket & QR Code Screen */}
        {step === 5 && ticketData && (
          <div className="space-y-6 text-center animate-fadeIn">
            
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              {ticketData.emailSent ? (
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  {w.emailSent}
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                  {w.emailNotSent}
                </span>
              )}
              <h3 className="text-2xl font-extrabold text-white mt-2">{w.successTitle}</h3>
            </div>

            {/* Dynamic Pass Card */}
            <div className="glass-card p-6 border-cyan-500/40 text-left bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 relative overflow-hidden shadow-2xl">

              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  <span className="font-extrabold text-white text-sm">{w.passTitle}</span>
                </div>
                <span className="font-mono font-bold text-amber-400 text-xs px-2 py-0.5 bg-amber-400/10 rounded border border-amber-400/30">
                  {ticketData.ticketNo}
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4 my-4">
                <div className="md:col-span-2 space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 block">{w.patientName}</span>
                    <strong className="text-white text-sm">{ticketData.patientName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">{w.deptAndDoctor}</span>
                    <strong className="text-cyan-400 text-xs block">{ticketData.department?.title[lang]}</strong>
                    <strong className="text-slate-200 text-xs">{ticketData.doctor?.name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">{w.apptTime}</span>
                    <strong className="text-amber-400 text-sm">{ticketData.date} @ {ticketData.time}</strong>
                  </div>
                </div>

                {/* Real QR code, generated server-side from the ticket number */}
                <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white text-slate-950 text-center shadow-inner">
                  {ticketData.qrDataUrl ? (
                    <img src={ticketData.qrDataUrl} alt="QR code" className="w-24 h-24" />
                  ) : (
                    <QrCode className="w-24 h-24 text-slate-950" />
                  )}
                  <span className="text-[10px] font-mono font-bold mt-1">{w.qrLabel}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between">
                <span>{w.createdAt} {ticketData.createdAt}</span>
                <span className="text-emerald-400 font-semibold">{w.scanNote}</span>
              </div>

            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs flex items-center gap-1.5 border border-slate-700"
              >
                <Printer className="w-4 h-4 text-cyan-400" />
                <span>{w.printTicket}</span>
              </button>

              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg"
              >
                {w.done}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
