import React, { useState } from 'react';
import { 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Activity, 
  Maximize2,
  ShieldCheck,
  Eye,
  HeartPulse
} from 'lucide-react';

export default function HospitalTour({ lang }) {
  const [activeTab, setActiveTab] = useState('mri');

  const tourData = {
    mri: {
      title: "3T Sessiz MR & Diagnostik Görüntüle Merkezi",
      badge: "Siemens Healthineers 3T Technology",
      image: "/images/mri_suite.jpg",
      desc: "Klarnet gürültüsünden arındırılmış %100 sessiz çekim, klostrofobiye son veren geniş tünel çapı ve yapay zeka destekli beyin-kalp haritalama.",
      hotspots: [
        { title: "Sessiz Çekim Teknolojisi", pos: "top-1/3 left-1/4" },
        { title: "AI Otomatik Tümör Analizörü", pos: "top-1/2 right-1/4" }
      ]
    },
    vip: {
      title: "VIP Executive Hasta Süiti & Konaklama",
      badge: "5-Star Medical Hospitality",
      image: "/images/vip_room.jpg",
      desc: "Panoramik şehir manzaralı, akıllı oda iklimlendirme sistemli, özel refakatçi yaşam alanı ve 24/7 VIP hemşire ve diyetisyen servisi.",
      hotspots: [
        { title: "Panoramik Şehir Manzarası", pos: "top-1/4 left-1/3" },
        { title: "Akıllı Medikal Karyola & Yatak", pos: "bottom-1/3 right-1/3" }
      ]
    },
    lobby: {
      title: "Uluslararası Karşılama Atriyumu & Resepsiyon",
      badge: "JCI Accredited Facility",
      image: "/images/hero_hospital.jpg",
      desc: "Doğal ışıkla aydınlatılan, stres seviyesini düşüren biyofilik iç mimari, 12 dilde tercüman servisi ve hızlı onay turnikeleri.",
      hotspots: [
        { title: "12 Dilde Tercüman Bankosu", pos: "bottom-1/3 left-1/3" },
        { title: "Hızlı Turnike & Bilet Geçişi", pos: "top-1/3 right-1/3" }
      ]
    }
  };

  const current = tourData[activeTab];

  return (
    <section className="py-28 md:py-36 px-6 relative bg-gradient-to-b from-[#0b1329] via-slate-950 to-[#0b1329] overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-5 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>Sanal Tıp Kompleksi Gezisi</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Dünya Standartlarında <br />
            <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Teknoloji & Mimari Altyapı
            </span>
          </h2>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
            Hastalarımızın konforu, güvenliği ve hızlı iyileşmesi için tasarlanan ileri teknoloji tanı üniteleri ve VIP konaklama süitlerimizi keşfedin.
          </p>
        </div>

        {/* Tab Switcher Buttons */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          <button
            onClick={() => setActiveTab('mri')}
            className={`px-6 py-3 rounded-2xl text-xs font-extrabold transition-all shadow-md ${
              activeTab === 'mri'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/25 scale-105'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            3T Sessiz MR Süiti
          </button>

          <button
            onClick={() => setActiveTab('vip')}
            className={`px-6 py-3 rounded-2xl text-xs font-extrabold transition-all shadow-md ${
              activeTab === 'vip'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/25 scale-105'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            VIP Executive Hasta Süiti
          </button>

          <button
            onClick={() => setActiveTab('lobby')}
            className={`px-6 py-3 rounded-2xl text-xs font-extrabold transition-all shadow-md ${
              activeTab === 'lobby'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/25 scale-105'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Ana Karşılama Atriyumu
          </button>
        </div>

        {/* Tour Showcase Card */}
        <div className="glass-card p-6 md:p-10 border border-cyan-500/30 rounded-3xl grid lg:grid-cols-12 gap-10 items-center shadow-2xl relative">
          
          {/* Interactive Image Frame */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden group shadow-2xl border border-slate-700/80">
            <img 
              src={current.image} 
              alt={current.title} 
              className="w-full h-[400px] md:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

            {/* Badge Overlay */}
            <div className="absolute top-4 left-4 px-4 py-2 rounded-xl bg-slate-950/85 backdrop-blur border border-cyan-500/40 text-cyan-300 text-xs font-extrabold flex items-center gap-2 shadow-lg">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{current.badge}</span>
            </div>

            {/* Interactive Hotspot Badges */}
            {current.hotspots.map((spot, idx) => (
              <div 
                key={idx} 
                className={`absolute ${spot.pos} hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/90 text-slate-950 font-extrabold text-[11px] shadow-2xl animate-bounce`}
                style={{ animationDuration: '3s', animationDelay: `${idx * 0.5}s` }}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{spot.title}</span>
              </div>
            ))}

            {/* Title Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white">{current.title}</h3>
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">İleri Teknoloji Altyapısı</span>
              <h4 className="text-xl font-extrabold text-white">{current.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light">{current.desc}</p>
            </div>

            {/* Live Vitals Mockup Box */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <HeartPulse className="w-4 h-4 text-red-400 animate-pulse" />
                  Canlı Medikal Vital Takibi
                </span>
                <span className="text-emerald-400 font-mono font-bold">%99.4 Optimal</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Kalp Ritmi</span>
                  <strong className="text-white font-mono text-sm">72 BPM</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Oksijen (SpO2)</span>
                  <strong className="text-cyan-400 font-mono text-sm">%99 SpO2</strong>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a 
                href="#triage" 
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <span>Hemen Muayene & Randevu Başlat</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
