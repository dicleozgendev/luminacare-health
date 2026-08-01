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

// Was largely hardcoded Turkish regardless of `lang`. Also toned down two
// overclaims: a fabricated "%99 match score" (this is a simple keyword
// lookup against a local list, not a scored ML model) and "AI reviewing
// medical data" framing — replaced with honest "matching your description
// to a department" language, consistent with the earlier tumor-analyzer fix.
const triageText = {
  tr: {
    badge: "Akıllı Poliklinik Yönlendirme Aracı",
    titlePre: "Hangi Poliklinik Size Uygun?",
    titleHighlight: "Şikayetinizi Yazın, Yönlendirelim",
    desc: "Şikayetinizi doğal dille yazın; sistemimiz belirtilerinizi bilinen semptom-poliklinik eşleşmeleriyle karşılaştırarak size uygun tıbbi birimi ve hekimi önersin. Bu araç bir ön yönlendirme aracıdır, tıbbi teşhis koymaz.",
    analyzing: "İnceleniyor...",
    analyze: "Kontrol Et",
    sampleLabel: "Sık Karşılaşılan Şikayet Örnekleri (Tıklayın):",
    analyzingTitle: "Şikayetiniz Değerlendiriliyor...",
    analyzingDesc: "Belirttiğiniz ifadeler, bilinen semptom-poliklinik eşleşme listemizle karşılaştırılıyor.",
    recommendedDept: "Önerilen Tıbbi Uzmanlık Birimi",
    urgencyLabel: "Aciliyet:",
    adviceLabel: "Değerlendirme & Tavsiye:",
    doctorsLabel: "Bu Poliklinikteki Uzman Hekimlerimiz:",
    matchNote: "Şikayetinize Uygun",
    yearsExp: "Yıl Deneyim",
    bookAppt: "Randevu Al",
    noMatchTitle: "Net Bir Eşleşme Bulamadık",
    noMatchDesc: "Yazdığınız ifadeyi bilinen şikayet listemizle eşleştiremedik. Bu, bu aracın sınırlı bir ön yönlendirme listesi kullanmasından kaynaklanıyor — bir teşhis aracı değildir. Aşağıdan tüm polikliniklerimizi inceleyebilir veya doğrudan randevu sihirbazını kullanabilirsiniz.",
    viewAllDepts: "Tüm Poliklinikleri Gör",
  },
  en: {
    badge: "Smart Department Routing Tool",
    titlePre: "Which Department Is Right for You?",
    titleHighlight: "Describe Your Symptoms, We'll Point the Way",
    desc: "Describe your complaint in plain language; our system compares your description against a list of known symptom-to-department matches to suggest the right unit and doctor. This tool is a preliminary routing aid — it does not provide a medical diagnosis.",
    analyzing: "Checking...",
    analyze: "Check",
    sampleLabel: "Common Complaint Examples (Click to Try):",
    analyzingTitle: "Reviewing Your Complaint...",
    analyzingDesc: "Your description is being compared against our known symptom-to-department matches.",
    recommendedDept: "Recommended Medical Department",
    urgencyLabel: "Urgency:",
    adviceLabel: "Assessment & Advice:",
    doctorsLabel: "Our Specialists in This Department:",
    matchNote: "Matches Your Complaint",
    yearsExp: "Years Experience",
    bookAppt: "Book Appointment",
    noMatchTitle: "We Couldn't Find a Confident Match",
    noMatchDesc: "We couldn't match what you wrote to our known complaint list. That's because this tool works from a limited routing list — it is not a diagnostic tool. You can browse all our departments below, or go straight to the appointment wizard.",
    viewAllDepts: "View All Departments",
  },
};

export default function SymptomTriage({ lang, onSelectDoctorForBooking }) {
  const t = translations[lang];
  const c = triageText[lang];
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
      const matched = symptomsDb.find(item =>
        item.keywords.some(kw => textToSearch.includes(kw))
      );

      // Was silently falling back to a fixed department (symptomsDb[1]) when
      // nothing matched, and displaying it with the same confidence as a
      // real match. That's a real risk in a health context — an unrelated
      // complaint could get routed to the wrong department while looking
      // authoritative. Now an unmatched query honestly says so instead of
      // guessing.
      if (!matched) {
        setAnalyzedResult({ noMatch: true });
        setIsAnalyzing(false);
        return;
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
            <span>{c.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
            {c.titlePre} <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              {c.titleHighlight}
            </span>
          </h2>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
            {c.desc}
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
                  <span>{c.analyzing}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{c.analyze}</span>
                </>
              )}
            </button>
          </div>

          {/* Preset Sample Pills */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-400 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              {c.sampleLabel}
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
              <h4 className="text-xl font-bold text-white">{c.analyzingTitle}</h4>
              <p className="text-xs text-slate-400">{c.analyzingDesc}</p>
            </div>
          )}

          {/* No Confident Match — honest fallback instead of guessing a department */}
          {analyzedResult && analyzedResult.noMatch && !isAnalyzing && (
            <div className="mt-10 p-8 md:p-10 bg-slate-950/95 rounded-2xl border border-amber-500/40 space-y-4 animate-fadeIn text-center">
              <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
              <h4 className="text-xl font-bold text-white">{c.noMatchTitle}</h4>
              <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">{c.noMatchDesc}</p>
              <a
                href="#departments"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition-all"
              >
                <span>{c.viewAllDepts}</span>
              </a>
            </div>
          )}

          {/* Analyzed Result Display */}
          {analyzedResult && !analyzedResult.noMatch && !isAnalyzing && (
            <div className="mt-10 p-8 md:p-10 bg-slate-950/95 rounded-2xl border border-emerald-500/40 space-y-8 animate-fadeIn">

              {/* Urgency & Department Header */}
              <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-slate-800">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{c.recommendedDept}</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3 mt-1">
                    <span className="text-emerald-400">{analyzedResult.department?.title[lang]}</span>
                  </h3>
                </div>

                <div className={`px-5 py-2.5 rounded-2xl text-xs font-bold border flex items-center gap-2 ${analyzedResult.symptomInfo.urgencyClass}`}>
                  <AlertTriangle className="w-4 h-4" />
                  <span>{c.urgencyLabel} {analyzedResult.symptomInfo.urgency}</span>
                </div>
              </div>

              {/* Triage Advice Box */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-300 text-sm leading-relaxed flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-1">{c.adviceLabel}</strong>
                  {analyzedResult.symptomInfo.advice[lang]}
                </div>
              </div>

              {/* Suggested Doctor Cards */}
              <div>
                <h4 className="text-sm font-bold text-slate-200 mb-5 flex items-center justify-between">
                  <span>{c.doctorsLabel}</span>
                  <span className="text-xs font-semibold text-emerald-400">{c.matchNote}</span>
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
                          <p className="text-xs text-slate-400 mt-1">{doc.experience} {c.yearsExp} • ⭐ {doc.rating}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectDoctorForBooking(doc)}
                        className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-md transition-all whitespace-nowrap"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>{c.bookAppt}</span>
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
