import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Building, 
  Star, 
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { checkupPackages, insuranceProviders, translations } from '../data/mockData';

// Was largely hardcoded Turkish regardless of `lang`. Also softened the
// original absolute "%100 valid/agreed with all insurers" claims — actual
// coverage depends on the patient's specific policy, so we don't assert 100%.
const checkupText = {
  tr: {
    badge: "Kişiselleştirilmiş Koruyucu Tıp",
    title: "VIP Check-Up Paketleri & Anlaşmalı Sigortalar",
    desc: "Hastalıklar ortaya çıkmadan önlem alın. Yaş, cinsiyet ve yaşam tarzınıza özel hazırlanan bütüncül tıp paketlerimizi inceleyin.",
    bookCheckup: "Check-Up Randevusu Al",
    insuranceTitle: "Sağlık Sigortanızı Sorgulayın",
    insuranceDesc: "Türkiye genelinde birçok Özel Sağlık Sigortası (ÖSS) ve Tamamlayıcı Sağlık Sigortası (TSS) kurumuyla anlaşmamız bulunmaktadır. Kesin teminat kapsamı poliçenize göre değişebilir; randevu öncesi doğrulamanızı öneririz.",
    selectedInstitution: "Seçili Kurum:",
    coverageStatus: "Teminat Durumu:",
    partnered: "Anlaşmalı Kurum",
  },
  en: {
    badge: "Personalized Preventive Medicine",
    title: "VIP Check-Up Packages & Partner Insurers",
    desc: "Take precautions before illness strikes. Explore our holistic medical packages tailored to your age, gender, and lifestyle.",
    bookCheckup: "Book a Check-Up",
    insuranceTitle: "Check Your Health Insurance",
    insuranceDesc: "We have partnership agreements with many private health insurers and supplementary health insurance providers across Turkey. Exact coverage depends on your specific policy; we recommend confirming before your appointment.",
    selectedInstitution: "Selected Provider:",
    coverageStatus: "Coverage Status:",
    partnered: "Partner Provider",
  },
};

export default function CheckupAndInsurance({ lang, onOpenAppointment }) {
  const t = translations[lang];
  const c = checkupText[lang];
  const [selectedInsurance, setSelectedInsurance] = useState(insuranceProviders[0]);

  return (
    <section id="checkup" className="py-20 px-4 relative bg-slate-950/60">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{c.badge}</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            {c.title}
          </h2>

          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            {c.desc}
          </p>
        </div>

        {/* Check-up Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {checkupPackages.map((pkg) => (
            <div 
              key={pkg.id}
              className={`glass-card p-8 border rounded-2xl flex flex-col justify-between relative group ${
                pkg.popular 
                  ? 'border-cyan-500 shadow-2xl shadow-cyan-500/10 bg-gradient-to-b from-slate-900 via-slate-900 to-cyan-950/40' 
                  : 'border-slate-800'
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 text-xs font-extrabold shadow-lg">
                  {pkg.tag}
                </span>
              )}

              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-extrabold text-xl text-white group-hover:text-cyan-300 transition-colors">
                    {pkg.name[lang]}
                  </h3>
                </div>

                <div className="my-4 pb-4 border-b border-slate-800">
                  <span className="text-3xl font-extrabold text-white">{pkg.price}</span>
                  <span className="text-xs text-slate-400 block mt-1">{pkg.period[lang]}</span>
                </div>

                <ul className="space-y-3 my-6 text-xs text-slate-300">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{feat[lang]}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={onOpenAppointment}
                className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>{c.bookCheckup}</span>
              </button>

            </div>
          ))}
        </div>

        {/* Insurance Provider Checker Section */}
        <div className="glass-card p-8 border-slate-800 rounded-3xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            <div className="space-y-4 max-w-lg">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
                <span>{t.insuranceChecker}</span>
              </div>
              
              <h3 className="text-2xl font-extrabold text-white">
                {c.insuranceTitle}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed">
                {c.insuranceDesc}
              </p>

              <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 space-y-1">
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{c.selectedInstitution} {selectedInsurance.name}</span>
                </div>
                <p className="text-xs text-slate-300">
                  {c.coverageStatus} <strong className="text-white">{selectedInsurance.coverage[lang]}</strong>
                </p>
              </div>
            </div>

            {/* Insurance Provider Buttons Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto">
              {insuranceProviders.map((ins, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedInsurance(ins)}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    selectedInsurance.name === ins.name
                      ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <span className="text-2xl block mb-1">{ins.logo}</span>
                  <span className="font-bold text-xs block text-slate-200">{ins.name}</span>
                  <span className="text-[10px] text-emerald-400 mt-1 block font-medium">{c.partnered}</span>
                </button>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
