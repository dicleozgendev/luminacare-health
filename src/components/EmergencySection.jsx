import React from 'react';
import { 
  PhoneCall, 
  Ambulance, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  HeartPulse, 
  Navigation,
  CheckCircle2
} from 'lucide-react';
import { translations } from '../data/mockData';

// Was largely hardcoded Turkish regardless of `lang` — only a couple of
// strings actually went through `translations[lang]`.
const emergencyText = {
  tr: {
    badge: "24/7 Kesintisiz Acil Servis & Travma Merkezi",
    titlePre: "Zamanla Yarışta",
    titleHighlight: "En Hızlı Müdahale",
    desc: "Yoğun bakım tam donanımlı kırmızı alan ambulans filomuz, beyin krizi & inme timimiz ve kardiyak felç uzmanlarımız ile saniyelerin önemli olduğu anlarda yanınızdayız.",
    ambulanceTitle: "Tam Donanımlı Yoğun Bakım Ambulansı",
    ambulanceDesc: "GPS Takip & Anında Çıkış",
    waitTimeTitle: "Kabul Bekleme Süresi",
    waitTimeValue: "Ortalama ~6 Dakika",
    callButton: "ACİL ÇAĞRI: 444 0 911",
    directionsButton: "Yol Tarifi Al (Google Maps)",
    campusName: "LuminaCare Hastane Yerleşkesi",
    openBadge: "AÇIK",
    addressLabel: "Adres:",
    addressValue: "Büyükdere Caddesi No: 204, Levent / Maslak Medikal Bölgesi, İstanbul",
    entranceLabel: "LuminaCare Acil Girişi",
    heliport: "Helikopter Pisti (Heliport): Aktif",
    parking: "Otopark & Vale: Ücretsiz",
  },
  en: {
    badge: "24/7 Uninterrupted Emergency & Trauma Center",
    titlePre: "In the Race Against Time,",
    titleHighlight: "The Fastest Response",
    desc: "With our fully-equipped critical care ambulance fleet, our stroke response team, and our cardiac arrest specialists, we're with you in the moments when seconds matter.",
    ambulanceTitle: "Fully-Equipped Critical Care Ambulance",
    ambulanceDesc: "GPS Tracking & Instant Dispatch",
    waitTimeTitle: "Admission Wait Time",
    waitTimeValue: "Average ~6 Minutes",
    callButton: "EMERGENCY: 444 0 911",
    directionsButton: "Get Directions (Google Maps)",
    campusName: "LuminaCare Hospital Campus",
    openBadge: "OPEN",
    addressLabel: "Address:",
    addressValue: "Büyükdere Avenue No: 204, Levent / Maslak Medical District, Istanbul",
    entranceLabel: "LuminaCare Emergency Entrance",
    heliport: "Heliport: Active",
    parking: "Parking & Valet: Free",
  },
};

export default function EmergencySection({ lang }) {
  const t = translations[lang];
  const e = emergencyText[lang];

  return (
    <section id="emergency" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        
        <div className="glass-card p-8 md:p-12 border-red-500/40 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-red-950/30 relative overflow-hidden shadow-2xl">
          
          {/* Glowing Red Aura */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full filter blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
                <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse" />
                <span>{e.badge}</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                {e.titlePre} <br />
                <span className="text-red-400">{e.titleHighlight}</span>
              </h2>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
                {e.desc}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
                  <Ambulance className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <div>
                    <strong className="text-white block">{e.ambulanceTitle}</strong>
                    <span className="text-slate-400">{e.ambulanceDesc}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  <div>
                    <strong className="text-white block">{e.waitTimeTitle}</strong>
                    <span className="text-emerald-400 font-semibold">{e.waitTimeValue}</span>
                  </div>
                </div>
              </div>

              {/* Call Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="tel:4440911"
                  className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-extrabold text-sm shadow-xl shadow-red-600/30 hover:scale-105 transition-all"
                >
                  <PhoneCall className="w-5 h-5 animate-bounce" />
                  <span>{e.callButton}</span>
                </a>

                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold transition-all"
                >
                  <Navigation className="w-4 h-4 text-cyan-400" />
                  <span>{e.directionsButton}</span>
                </a>
              </div>

            </div>

            {/* Right Map & Address Mockup */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <MapPin className="w-4 h-4 text-red-400" />
                    <span>{e.campusName}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 bg-emerald-500/10 rounded">{e.openBadge}</span>
                </div>

                <p className="text-xs text-slate-300">
                  <strong>{e.addressLabel}</strong> {e.addressValue}
                </p>

                <div className="h-40 rounded-xl overflow-hidden relative bg-slate-900 border border-slate-800 flex items-center justify-center">
                  {/* Decorative map representation */}
                  <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=500&q=80"
                    alt="LuminaCare Location Map"
                    className="w-full h-full object-cover filter contrast-125 opacity-70"
                  />
                  <div className="absolute inset-0 bg-slate-950/40" />
                  <div className="absolute p-2.5 rounded-xl bg-red-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xl animate-bounce">
                    <HeartPulse className="w-4 h-4" />
                    <span>{e.entranceLabel}</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 flex justify-between">
                  <span>{e.heliport}</span>
                  <span>{e.parking}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
