import React, { useState } from 'react';
import { 
  PhoneCall, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  User,
  Phone
} from 'lucide-react';

export default function CallbackModal({ lang }) {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone.trim()) return;

    setSubmitted(true);
    setTimeout(() => {
      // Auto reset toast
    }, 5000);
  };

  return (
    <section className="py-20 px-6 relative bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/40 border-y border-slate-800">
      <div className="max-w-5xl mx-auto">
        
        <div className="glass-card p-8 md:p-12 border-cyan-500/30 rounded-3xl grid md:grid-cols-12 gap-8 items-center shadow-2xl relative overflow-hidden">
          
          <div className="md:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Hızlı Temsilci Araması</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Sizi <span className="text-cyan-400">5 Dakika İçinde</span> Arayalım
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Poliklinik seçimi, doktor takvimi veya check-up paketleri hakkında bilgi almak için numaranızı bırakın; hasta danışmanımız hemen sizi arasın.
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" /> %100 Ücretsiz Çağrı
              </span>
              <span>• 256-Bit SSL Güvenli</span>
            </div>
          </div>

          <div className="md:col-span-6">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Adınız Soyadınız</label>
                  <div className="relative">
                    <input 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Örn: Deniz Yılmaz"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Telefon Numarası</label>
                  <div className="relative">
                    <input 
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="05XX XXX XX XX"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-emerald-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 animate-bounce" />
                  <span>Beni Hemen Arayın</span>
                </button>
              </form>
            ) : (
              <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-extrabold text-white text-base">Talebiniz Alındı!</h4>
                <p className="text-xs text-slate-300">Hasta danışmanımız verilen numarayı en geç 5 dakika içerisinde arayacaktır.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-[11px] text-cyan-400 underline font-semibold mt-2"
                >
                  Yeni Çağrı Talebi Oluştur
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
