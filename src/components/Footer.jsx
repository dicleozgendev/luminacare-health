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

export default function Footer({ lang, onOpenAppointment, onOpenPatientPortal }) {
  const t = translations[lang];

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Explicit Legal Demo Notice Box */}
        <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-4">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-white block font-bold text-sm">Yasal Sorumluluk Reddi & Demo Bildirimi:</strong>
            <p className="leading-relaxed">
              Bu web sitesi, hastaneler ve poliklinikler için ajans / müşteri gösterimi amacıyla hazırlanmış interaktif bir demo prototipidir. Sitede yer alan doktor isimleri, tahlil verileri ve randevu kayıtları kurgusaldır. Gerçek tıbbi teşhis, tedavi veya acil servis hizmeti vermez.
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
              LuminaCare Tıp Kompleksi, robotiğin gücü ve insan empatisini birleştiren uluslararası akredite A-Segment sağlık kuruluşudur.
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/30">
                <ShieldCheck className="w-4 h-4" />
                JCI Akredite Hastane
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400 font-semibold bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/30">
                <Award className="w-4 h-4" />
                ISO 9001:2026
              </span>
            </div>
          </div>

          {/* Col 2: Hızlı Bağlantılar */}
          <div className="space-y-4 text-xs">
            <h4 className="font-bold text-white text-sm">Hızlı Erişim</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={onOpenAppointment} className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Online Randevu Al</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenPatientPortal} className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Laboratuvar Tahlil Sonuçları</span>
                </button>
              </li>
              <li><a href="#triage" className="hover:text-cyan-400">Yapay Zeka Semptom Triyajı</a></li>
              <li><a href="#doctors" className="hover:text-cyan-400">Uzman Hekim Kadromuz</a></li>
              <li><a href="#checkup" className="hover:text-cyan-400">Check-Up Paketleri</a></li>
            </ul>
          </div>

          {/* Col 3: Poliklinikler */}
          <div className="space-y-4 text-xs">
            <h4 className="font-bold text-white text-sm">Tıbbi Birimler</h4>
            <ul className="space-y-2.5">
              <li><a href="#departments" className="hover:text-cyan-400">Kardiyoloji & Kalp Sağlığı</a></li>
              <li><a href="#departments" className="hover:text-cyan-400">Nöroloji & Beyin Cerrahisi</a></li>
              <li><a href="#departments" className="hover:text-cyan-400">Çocuk Sağlığı & Hastalıkları</a></li>
              <li><a href="#departments" className="hover:text-cyan-400">Ortopedi & Robotik Cerrahi</a></li>
              <li><a href="#departments" className="hover:text-cyan-400">Göz Hastalıkları & Lazer</a></li>
              <li><a href="#departments" className="hover:text-cyan-400">Dermatoloji & Estetik</a></li>
            </ul>
          </div>

          {/* Col 4: İletişim */}
          <div className="space-y-4 text-xs">
            <h4 className="font-bold text-white text-sm">İletişim & Santral</h4>
            <div className="space-y-3">
              <p className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Çağrı Merkezi: 444 0 911</span>
              </p>
              <p className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>info@luminacare.med.tr</span>
              </p>
              <p className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>Levent Maslak Medikal Bölgesi No: 204, İstanbul</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 LuminaCare Medical Center (Demo Portalı). Tüm Hakları Saklıdır.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400">KVKK Metni (Demo)</a>
            <a href="#" className="hover:text-slate-400">Gizlilik Politikası</a>
            <a href="#" className="hover:text-slate-400">Yasal Kullanım Koşulları</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
