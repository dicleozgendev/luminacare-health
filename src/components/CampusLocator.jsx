import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Navigation, 
  Building2, 
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

export default function CampusLocator({ lang }) {
  const [activeCampus, setActiveCampus] = useState('maslak');

  const campuses = {
    maslak: {
      name: "Maslak Ana Tıp Kompleksi (Genel Hastane)",
      address: "Büyükdere Caddesi No: 204, Levent / Maslak Medikal Bölgesi, İstanbul",
      phone: "0212 988 00 00",
      emergencyPhone: "444 0 911",
      erStatus: "24/7 Acil & Travma Merkezi Aktif",
      parking: "500 Araçlık Ücretsiz VIP Kapalı Otopark & Vale",
      image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=600&q=80",
      mapUrl: "https://maps.google.com"
    },
    kadikoy: {
      name: "Kadıköy VIP Polikliniği & Lazer Merkezi",
      address: "Bağdat Caddesi No: 312, Suadiye / Kadıköy, İstanbul",
      phone: "0216 444 99 22",
      emergencyPhone: "444 0 911",
      erStatus: "Hafta İçi & Cumartesi 08:30 - 21:00",
      parking: "Vale & Şarj İstasyonu Mevcut",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
      mapUrl: "https://maps.google.com"
    },
    ankara: {
      name: "Ankara Çankaya Sağlık Yerleşkesi",
      address: "Eskişehir Yolu 7. Km, Çankaya Medikal Aksı, Ankara",
      phone: "0312 555 88 11",
      emergencyPhone: "444 0 911",
      erStatus: "24/7 Acil Servis & Helikopter Pisti",
      parking: "Ücretsiz Açık & Kapalı Otopark",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80",
      mapUrl: "https://maps.google.com"
    }
  };

  const current = campuses[activeCampus];

  return (
    <section className="py-28 md:py-36 px-6 relative bg-slate-950/40">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-5 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>Lokasyonlar & Hastane Yerleşkeleri</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Size En Yakın <br />
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              LuminaCare Yerleşkesini Seçin
            </span>
          </h2>
        </div>

        {/* Campus Tabs */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          <button
            onClick={() => setActiveCampus('maslak')}
            className={`px-6 py-3 rounded-2xl text-xs font-extrabold transition-all shadow-md ${
              activeCampus === 'maslak'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/25 scale-105'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            İstanbul - Maslak Ana Kompleks
          </button>

          <button
            onClick={() => setActiveCampus('kadikoy')}
            className={`px-6 py-3 rounded-2xl text-xs font-extrabold transition-all shadow-md ${
              activeCampus === 'kadikoy'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/25 scale-105'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            İstanbul - Kadıköy Polikliniği
          </button>

          <button
            onClick={() => setActiveCampus('ankara')}
            className={`px-6 py-3 rounded-2xl text-xs font-extrabold transition-all shadow-md ${
              activeCampus === 'ankara'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/25 scale-105'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Ankara - Çankaya Yerleşkesi
          </button>
        </div>

        {/* Selected Campus Card */}
        <div className="glass-card p-8 md:p-12 border border-slate-800 rounded-3xl grid lg:grid-cols-12 gap-10 items-center shadow-2xl">
          
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">Aktif Şube Bilgileri</span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white">{current.name}</h3>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-1">Adres:</strong>
                  <span>{current.address}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-1">Çalışma Saatleri & Acil:</strong>
                  <span>{current.erStatus}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-1">Santral & Doğrudan İletişim:</strong>
                  <span>{current.phone} • Acil: {current.emergencyPhone}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={current.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/20"
              >
                <Navigation className="w-4 h-4" />
                <span>Google Maps ile Yol Tarifi Al</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-2xl h-80 md:h-[400px] border border-slate-800">
            <img src={current.image} alt={current.name} className="w-full h-full object-cover filter contrast-105" />
            <div className="absolute inset-0 bg-slate-950/30" />
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/85 backdrop-blur text-xs text-white border border-slate-800">
              <strong className="text-emerald-400 block font-bold mb-0.5">Otopark & Ulaşım Kolaylığı:</strong>
              <span>{current.parking}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
