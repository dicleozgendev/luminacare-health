import React, { useState } from 'react';
import { 
  Stethoscope, 
  Sparkles, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  Loader2,
  HelpCircle,
  Activity,
  AlertCircle
} from 'lucide-react';
import { symptomsDb, departmentsData, doctorsData, translations } from '../data/mockData';

export default function SymptomTriage({ lang, onSelectDoctorForBooking }) {
  const t = translations[lang];
  const [symptomInput, setSymptomInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedResult, setAnalyzedResult] = useState(null);

  const sampleQueries = [
    { tr: "Göğüste ani sıkışma ve nefes darlığı", en: "Sudden chest pressure and shortness of breath" },
    { tr: "Şiddetli baş ağrısı ve mide bulantısı", en: "Severe headache and nausea" },
    { tr: "Çocukta 39°C ateş ve öksürük", en: "Child with 39°C fever and cough" },
    { tr: "Gözlerde kızarıklık ve bulanık görme", en: "Eye redness and blurred vision" },
    { tr: "Diz kapağında kitlenme ve eklem ağrısı", en: "Knee pain and joint stiffness" },
    { tr: "Ciltte kaşıntılı leke ve sivilce", en: "Skin itching and blemishes" }
  ];

  const handleAnalyze = (queryToUse) => {
    const textToSearch = (queryToUse || symptomInput).toLowerCase().trim();
    if (!textToSearch) return;

    setIsAnalyzing(true);
    setAnalyzedResult(null);

    setTimeout(() => {
      let matched = symptomsDb.find(item => 
        item.keywords.some(kw => textToSearch.includes(kw))
      );

      if (!matched) {
        matched = symptomsDb[1];
      }

      const matchingDepartment = departmentsData.find(d => d.id === matched.departmentId);
      const matchingDoctors = doctorsData.filter(doc => doc.departmentId === matched.departmentId);

      setAnalyzedResult({
        symptomInfo: matched,
        department: matchingDepartment,
        doctors: matchingDoctors
      });
      setIsAnalyzing(false);
    }, 900);
  };

  return (
    <section id="triage" className="py-28 md:py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-5 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>AI Destekli Akıllı Triyaj Simülasyonu</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Hangi Poliklinik Size Uygun? <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              AI Semptom Kontrolü ile Anında Öğrenin
            </span>
          </h2>
          
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
            Şikayetinizi doğal dille yazın; algoritmalarımız belirtilerinizi inceleyerek sizi doğru tıbbi birime ve en uygun hekime saniyeler içinde yönlendirsin.
          </p>
        </div>

        {/* Interactive Search Box Container with Airy Padding */}
        <div className="glass-card p-8 md:p-12 border border-emerald-500/30 max-w-4xl mx-auto shadow-2xl relative">
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <input 
              type="text"
              value={symptomInput}
              onChange={(e) => setSymptomInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              placeholder={t.symptomPlaceholder}
              className="w-full pl-12 pr-36 py-4 md:py-5 rounded-2xl bg-slate-950/90 border border-slate-700 text-white placeholder-slate-500 text-sm md:text-base focus:outline-none focus:border-emerald-500 transition-colors shadow-inner"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            
            <button
              onClick={() => handleAnalyze()}
              disabled={isAnalyzing || !symptomInput.trim()}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-extrabold text-xs md:text-sm shadow-lg flex items-center gap-2 disabled:opacity-50 transition-all"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analiz Ediliyor...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analiz Et</span>
                </>
              )}
            </button>
          </div>

          {/* Preset Sample Pills */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-400 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              Sık Karşılaşılan Şikayet Örnekleri (Tıklayın):
            </p>
            <div className="flex flex-wrap gap-2.5">
              {sampleQueries.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSymptomInput(sample[lang]);
                    handleAnalyze(sample[lang]);
                  }}
                  className="text-xs px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-emerald-950/60 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-300 transition-all text-left"
                >
                  + {sample[lang]}
                </button>
              ))}
            </div>
          </div>

          {/* Analysis Loading Screen */}
          {isAnalyzing && (
            <div className="mt-10 p-10 text-center bg-slate-950/95 rounded-2xl border border-emerald-500/40 animate-pulse space-y-4">
              <Activity className="w-12 h-12 text-emerald-400 animate-spin mx-auto" />
              <h4 className="text-xl font-bold text-white">Yapay Zeka Tıbbi Verileri İncelemekte...</h4>
              <p className="text-xs text-slate-400">Belirtileriniz klinik semptom veri tabanı ve poliklinik indeksleri ile eşleştiriliyor.</p>
            </div>
          )}

          {/* Analyzed Result Display */}
          {analyzedResult && !isAnalyzing && (
            <div className="mt-10 p-8 md:p-10 bg-slate-950/95 rounded-2xl border border-emerald-500/40 space-y-8 animate-fadeIn">
              
              {/* Urgency & Department Header */}
              <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-slate-800">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Önerilen Tıbbi Uzmanlık Birimi</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3 mt-1">
                    <span className="text-emerald-400">{analyzedResult.department?.title[lang]}</span>
                  </h3>
                </div>

                <div className={`px-5 py-2.5 rounded-2xl text-xs font-bold border flex items-center gap-2 ${analyzedResult.symptomInfo.urgencyClass}`}>
                  <AlertTriangle className="w-4 h-4" />
                  <span>Aciliyet: {analyzedResult.symptomInfo.urgency}</span>
                </div>
              </div>

              {/* Triage Advice Box */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-300 text-sm leading-relaxed flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-1">Klinik Değerlendirme & Tavsiye:</strong>
                  {analyzedResult.symptomInfo.advice[lang]}
                </div>
              </div>

              {/* Suggested Doctor Cards */}
              <div>
                <h4 className="text-sm font-bold text-slate-200 mb-5 flex items-center justify-between">
                  <span>Bu Poliklinikteki Nöbetçi Uzman Hekimlerimiz:</span>
                  <span className="text-xs font-semibold text-emerald-400">%99 Eşleşme Skoru</span>
                </h4>

                <div className="grid md:grid-cols-2 gap-6">
                  {analyzedResult.doctors.map((doc) => (
                    <div key={doc.id} className="glass-card p-5 border-slate-800 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={doc.image} 
                          alt={doc.name} 
                          className="w-16 h-16 rounded-2xl object-cover border border-slate-700 shadow-md"
                        />
                        <div>
                          <h5 className="font-extrabold text-white text-sm">{doc.name}</h5>
                          <p className="text-xs text-cyan-400 font-semibold mt-0.5">{doc.title[lang]}</p>
                          <p className="text-xs text-slate-400 mt-1">{doc.experience} Yıl Deneyim • ⭐ {doc.rating}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectDoctorForBooking(doc)}
                        className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-md transition-all whitespace-nowrap"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Randevu Al</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
