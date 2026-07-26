import React from 'react';
import { 
  Calendar, 
  Stethoscope, 
  FileCheck2, 
  Video, 
  Award, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { translations } from '../data/mockData';

export default function Hero({ 
  lang, 
  onOpenAppointment, 
  onOpenPatientPortal, 
  onOpenTelehealth,
  onScrollToTriage 
}) {
  const t = translations[lang];

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-16 md:py-24 px-4 sm:px-6">
      
      {/* Background Image with Ambient Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero_hospital.jpg" 
          alt="LuminaCare Modern Hospital Center" 
          className="w-full h-full object-cover object-center filter brightness-[0.35] scale-105 transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-[#0b1329]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1329] via-[#0b1329]/40 to-[#0b1329]" />
      </div>

      {/* Glowing Ambient Light Orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Headline & Action Buttons */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          
          {/* Accreditation Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold backdrop-blur-md">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>JCI Uluslararası Akredite Tıp Kompleksi</span>
          </div>

          {/* Headline (Responsive Scaling) */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Geleceğin Sağlık Teknolojisi, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
              İnsan Odaklı Bakım
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl font-light leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={onOpenAppointment}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-extrabold text-xs sm:text-sm text-white bg-gradient-to-r from-cyan-500 via-emerald-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.quickAppointment}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onScrollToTriage}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-cyan-300 bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 backdrop-blur hover:-translate-y-0.5 transition-all"
            >
              <Stethoscope className="w-4 h-4 text-emerald-400" />
              <span>{t.symptomChecker}</span>
            </button>
          </div>

        </div>

        {/* Right Column: Interactive Quick Action Hub */}
        <div className="lg:col-span-5">
          <div className="glass-card p-6 border border-slate-700/80 shadow-2xl space-y-4 relative overflow-hidden rounded-2xl">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="font-extrabold text-slate-100 text-sm sm:text-base">Hızlı Dijital Hizmetler</h3>
              </div>
              <span className="text-[10px] uppercase font-bold text-emerald-400 px-2 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/30">
                24/7 Aktif
              </span>
            </div>

            <div className="space-y-3">
              
              {/* Option 1: Appointment Wizard */}
              <div 
                onClick={onOpenAppointment}
                className="group flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">4 Adımda Dijital Randevu</h4>
                    <p className="text-[11px] text-slate-400">Poliklinik, hekim ve QR bilet seçimi</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </div>

              {/* Option 2: Telehealth simulator */}
              <div 
                onClick={onOpenTelehealth}
                className="group flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <Video className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">Online Görüntülü Muayene</h4>
                    <p className="text-[11px] text-slate-400">Canlı görüntülü doktor görüşmesi</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </div>

              {/* Option 3: Patient Lab Results */}
              <div 
                onClick={onOpenPatientPortal}
                className="group flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 hover:bg-blue-950/40 border border-slate-800 hover:border-blue-500/50 cursor-pointer transition-all shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-300 transition-colors">Laboratuvar & MR Sonuçları</h4>
                    <p className="text-[11px] text-slate-400">Tahlil sorgulama ve PDF indir</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Stats Counter Bar with Crisp Spacing */}
      <div className="relative z-10 max-w-7xl mx-auto w-full mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center border-slate-800 rounded-xl">
          <div className="text-2xl sm:text-3xl font-extrabold text-white bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            %99.6
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-semibold">Hasta Memnuniyet Oranı</div>
        </div>
        <div className="glass-card p-4 text-center border-slate-800 rounded-xl">
          <div className="text-2xl sm:text-3xl font-extrabold text-white bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            45+
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-semibold">Uluslararası Sertifikalı Hekim</div>
        </div>
        <div className="glass-card p-4 text-center border-slate-800 rounded-xl">
          <div className="text-2xl sm:text-3xl font-extrabold text-white bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            &lt; 6 Dk
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-semibold">Ortalama Acil Servis Kabulü</div>
        </div>
        <div className="glass-card p-4 text-center border-slate-800 rounded-xl">
          <div className="text-2xl sm:text-3xl font-extrabold text-white bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
            24/7
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-semibold">Robotik & Hibrit Cerrahi</div>
        </div>
      </div>

    </section>
  );
}
