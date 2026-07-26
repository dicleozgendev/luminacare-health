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

export default function EmergencySection({ lang }) {
  const t = translations[lang];

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
                <span>24/7 Kesintisiz Acil Servis & Travma Merkezi</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Zamanla Yarışta <br />
                <span className="text-red-400">En Hızlı Müdahale</span>
              </h2>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
                Yoğun bakım tam donanımlı kırmızı alan ambulans filomuz, beyin krizi & inme timimiz ve kardiyak felç uzmanlarımız ile saniyelerin önemli olduğu anlarda yanınızdayız.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
                  <Ambulance className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <div>
                    <strong className="text-white block">Tam Donanımlı Yogun Bakim Ambulansı</strong>
                    <span className="text-slate-400">GPS Takip & Anında Çıkış</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  <div>
                    <strong className="text-white block">Kabul Bekleme Süresi</strong>
                    <span className="text-emerald-400 font-semibold">Ortalama ~6 Dakika</span>
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
                  <span>ACİL ÇAĞRI: 444 0 911</span>
                </a>

                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold transition-all"
                >
                  <Navigation className="w-4 h-4 text-cyan-400" />
                  <span>Yol Tarifi Al (Google Maps)</span>
                </a>
              </div>

            </div>

            {/* Right Map & Address Mockup */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <MapPin className="w-4 h-4 text-red-400" />
                    <span>LuminaCare Hastane Yerleşkesi</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 bg-emerald-500/10 rounded">AÇIK</span>
                </div>

                <p className="text-xs text-slate-300">
                  <strong>Adres:</strong> Büyükdere Caddesi No: 204, Levent / Maslak Medikal Bölgesi, İstanbul
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
                    <span>LuminaCare Acil Girişi</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 flex justify-between">
                  <span>Helikopter Pisti (Heliport): Aktif</span>
                  <span>Otopark & Vale: Ücretsiz</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
