import React from 'react';
import { 
  Activity, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Award, 
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { translations } from '../data/mockData';

// Was largely hardcoded Turkish regardless of `lang` (legal notice, all
// footer link columns, contact block, bottom bar) — only a couple of
// strings actually went through `translations[lang]`.
const footerText = {
  tr: {
    legalNoticeTitle: "Yasal Sorumluluk Reddi & Demo Bildirimi:",
    legalNoticeBody: "Bu web sitesi, hastaneler ve poliklinikler için ajans / müşteri gösterimi amacıyla hazırlanmış interaktif bir demo prototipidir. Sitede yer alan doktor isimleri, tahlil verileri ve randevu kayıtları kurgusaldır. Gerçek tıbbi teşhis, tedavi veya acil servis hizmeti vermez.",
    bio: "LuminaCare Tıp Kompleksi, teknoloji ile insan empatisini birleştiren modern, hasta odaklı bir sağlık kuruluşudur.",
    supportBadge: "7/24 Hasta Desteği",
    infraBadge: "Modern Tıbbi Altyapı",
    quickAccess: "Hızlı Erişim",
    linkBookAppointment: "Online Randevu Al",
    linkLabResults: "Laboratuvar Tahlil Sonuçları",
    linkTriage: "Yapay Zeka Semptom Triyajı",
    linkDoctors: "Uzman Hekim Kadromuz",
    linkCheckup: "Check-Up Paketleri",
    departmentsHeading: "Tıbbi Birimler",
    deptCardiology: "Kardiyoloji & Kalp Sağlığı",
    deptNeurology: "Nöroloji & Beyin Cerrahisi",
    deptPediatrics: "Çocuk Sağlığı & Hastalıkları",
    deptOrthopedics: "Ortopedi & Robotik Cerrahi",
    deptOphthalmology: "Göz Hastalıkları & Lazer",
    deptDermatology: "Dermatoloji & Estetik",
    contactHeading: "İletişim & Santral",
    callCenter: "Çağrı Merkezi: 444 0 911",
    addressLine: "Levent Maslak Medikal Bölgesi No: 204, İstanbul",
    copyright: "© 2026 LuminaCare Medical Center (Demo Portalı). Tüm Hakları Saklıdır.",
    kvkkText: "KVKK Metni (Demo)",
    privacyPolicy: "Gizlilik Politikası",
    terms: "Yasal Kullanım Koşulları",
  },
  en: {
    legalNoticeTitle: "Legal Disclaimer & Demo Notice:",
    legalNoticeBody: "This website is an interactive demo prototype built for agency/client presentation purposes for hospitals and clinics. Doctor names, test results, and appointment records shown here are fictional. It does not provide real medical diagnosis, treatment, or emergency services.",
    bio: "LuminaCare Medical Complex is a modern, patient-centered healthcare organization combining technology with human empathy.",
    supportBadge: "24/7 Patient Support",
    infraBadge: "Modern Medical Infrastructure",
    quickAccess: "Quick Access",
    linkBookAppointment: "Book Online Appointment",
    linkLabResults: "Lab & Test Results",
    linkTriage: "AI Symptom Triage",
    linkDoctors: "Our Medical Specialists",
    linkCheckup: "Check-Up Packages",
    departmentsHeading: "Medical Specialties",
    deptCardiology: "Cardiology & Heart Health",
    deptNeurology: "Neurology & Neurosurgery",
    deptPediatrics: "Pediatrics & Child Health",
    deptOrthopedics: "Orthopedics & Robotic Surgery",
    deptOphthalmology: "Ophthalmology & Laser Eye",
    deptDermatology: "Dermatology & Aesthetics",
    contactHeading: "Contact & Switchboard",
    callCenter: "Call Center: 444 0 911",
    addressLine: "Levent Maslak Medical District No: 204, Istanbul",
    copyright: "© 2026 LuminaCare Medical Center (Demo Portal). All Rights Reserved.",
    kvkkText: "KVKK Notice (Demo)",
    privacyPolicy: "Privacy Policy",
    terms: "Terms of Use",
  },
};

export default function Footer({ lang, onOpenAppointment, onOpenPatientPortal }) {
  const t = translations[lang];
  const f = footerText[lang];

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Explicit Legal Demo Notice Box */}
        <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-4">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-white block font-bold text-sm">{f.legalNoticeTitle}</strong>
            <p className="leading-relaxed">
              {f.legalNoticeBody}
            </p>
          </div>
        </div>

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-emerald-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Activity className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-2xl tracking-tight text-white">
                  Lumina<span className="text-cyan-400 font-light">Care</span>
                </span>
                <span className="text-[10px] font-bold text-amber-400 block">DEMO PORTAL</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-light">
              {f.bio}
            </p>

            {/* Was "JCI Akredite Hastane" and "ISO 9001:2026" — both are
                real, verifiable third-party certifications. Never claim
                them here; only add them back for a specific real clinic
                that actually holds that certification, with proof. */}
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/30">
                <ShieldCheck className="w-4 h-4" />
                {f.supportBadge}
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400 font-semibold bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/30">
                <Award className="w-4 h-4" />
                {f.infraBadge}
              </span>
            </div>
          </div>

          {/* Col 2: Quick links */}
          <div className="space-y-4 text-xs">
            <h4 className="font-bold text-white text-sm">{f.quickAccess}</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={onOpenAppointment} className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{f.linkBookAppointment}</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenPatientPortal} className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{f.linkLabResults}</span>
                </button>
              </li>
              <li><a href="#triage" className="hover:text-cyan-400">{f.linkTriage}</a></li>
              <li><a href="#doctors" className="hover:text-cyan-400">{f.linkDoctors}</a></li>
              <li><a href="#checkup" className="hover:text-cyan-400">{f.linkCheckup}</a></li>
            </ul>
          </div>

          {/* Col 3: Departments */}
          <div className="space-y-4 text-xs">
            <h4 className="font-bold text-white text-sm">{f.departmentsHeading}</h4>
            <ul className="space-y-2.5">
              <li><a href="#departments" className="hover:text-cyan-400">{f.deptCardiology}</a></li>
              <li><a href="#departments" className="hover:text-cyan-400">{f.deptNeurology}</a></li>
              <li><a href="#departments" className="hover:text-cyan-400">{f.deptPediatrics}</a></li>
              <li><a href="#departments" className="hover:text-cyan-400">{f.deptOrthopedics}</a></li>
              <li><a href="#departments" className="hover:text-cyan-400">{f.deptOphthalmology}</a></li>
              <li><a href="#departments" className="hover:text-cyan-400">{f.deptDermatology}</a></li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="space-y-4 text-xs">
            <h4 className="font-bold text-white text-sm">{f.contactHeading}</h4>
            <div className="space-y-3">
              <p className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>{f.callCenter}</span>
              </p>
              <p className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>info@luminacare.med.tr</span>
              </p>
              <p className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>{f.addressLine}</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{f.copyright}</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400">{f.kvkkText}</a>
            <a href="#" className="hover:text-slate-400">{f.privacyPolicy}</a>
            <a href="#" className="hover:text-slate-400">{f.terms}</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
