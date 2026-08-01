import React, { useState } from 'react';
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  Play, 
  X, 
  Sparkles, 
  Heart,
  Award
} from 'lucide-react';

// Was entirely hardcoded Turkish regardless of `lang`. These testimonials
// are fictional demo content (clearly a "sample story" pattern, not
// attributed to real, named public individuals) — but they still need to
// actually change with the language toggle, and the fabricated headline
// stat ("120,000+ happy patients") is removed since it's unverifiable.
const testimonialsByLang = {
  tr: [
    {
      id: 1,
      name: "Mehmet Özkan (54)",
      treatment: "Robotik Diz Protezi Cerrahisi",
      doctor: "Op. Dr. Murat Karahan",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      quote: "Yıllardır çektiğim şiddetli diz ağrıları nedeniyle yürüyemiyordum. Robotik cerrahi sonrası hızlı bir iyileşme süreci geçirdim.",
      videoUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      name: "Elif & Caner Şahin",
      treatment: "Çocuk Alerji & Astım Tedavisi",
      doctor: "Dr. Öğr. Üyesi Ayşe Kaya Demir",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      quote: "Oğlumuzun tekrarlayan öksürük krizleri alerji testi ve tedavisi sayesinde büyük ölçüde azaldı. İlgi ve empati mükemmeldi.",
      videoUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      name: "Zeynep Arslan (41)",
      treatment: "No-Touch Akıllı Lazer Ameliyatı",
      doctor: "Prof. Dr. Deniz Arslan",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      quote: "20 yıldır taktığım yüksek numaralı gözlüklerime No-Touch Lazer ile veda ettim. Ağrısız ve konforlu bir süreçti.",
      videoUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80"
    }
  ],
  en: [
    {
      id: 1,
      name: "Mehmet Özkan (54)",
      treatment: "Robotic Knee Replacement Surgery",
      doctor: "Op. Dr. Murat Karahan",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      quote: "I couldn't walk because of severe knee pain for years. After robotic surgery, I had a fast, smooth recovery.",
      videoUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      name: "Elif & Caner Şahin",
      treatment: "Pediatric Allergy & Asthma Care",
      doctor: "Dr. Öğr. Üyesi Ayşe Kaya Demir",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      quote: "Our son's recurring cough episodes decreased significantly after allergy testing and treatment. The care and empathy were excellent.",
      videoUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      name: "Zeynep Arslan (41)",
      treatment: "No-Touch Smart Laser Surgery",
      doctor: "Prof. Dr. Deniz Arslan",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      quote: "After 20 years of strong prescription glasses, No-Touch Laser let me say goodbye to them. It was painless and comfortable.",
      videoUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80"
    }
  ]
};

const uiText = {
  tr: {
    badge: "Gerçek Hasta Hikayeleri & Deneyimleri",
    titlePre: "Sağlığına Kavuşan",
    titleHighlight: "Hastalarımızın Hikayeleri",
    desc: "Tedavi süreçlerini LuminaCare uzman hekim kadrosuyla tamamlayan hastalarımızın samimi deneyimlerini keşfedin.",
    verified: "Doğrulanmış Hasta",
    watchStory: "Video Hikayeyi İzle",
    successStory: "Başarı Hikayesi",
  },
  en: {
    badge: "Real Patient Stories & Experiences",
    titlePre: "Stories From",
    titleHighlight: "Our Patients",
    desc: "Discover the honest experiences of patients who completed their treatment with the LuminaCare specialist team.",
    verified: "Verified Patient",
    watchStory: "Watch Video Story",
    successStory: "Success Story",
  },
};

export default function PatientTestimonials({ lang }) {
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const testimonials = testimonialsByLang[lang];
  const u = uiText[lang];

  return (
    <section className="py-28 md:py-36 px-6 relative bg-slate-950/70">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-5 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <Heart className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            <span>{u.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
            {u.titlePre} <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              {u.titleHighlight}
            </span>
          </h2>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
            {u.desc}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div key={item.id} className="glass-card p-8 border-slate-800 rounded-3xl flex flex-col justify-between relative group hover:border-emerald-500/40 transition-all shadow-xl">
              
              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {u.verified}
                  </span>
                </div>

                <Quote className="w-8 h-8 text-cyan-500/20 mb-3" />

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed mb-6 font-light">
                  "{item.quote}"
                </p>
              </div>

              {/* Patient Profile Footer */}
              <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow-md" />
                  <div>
                    <h4 className="font-extrabold text-white text-sm">{item.name}</h4>
                    <p className="text-[11px] text-cyan-400 font-semibold">{item.treatment}</p>
                    <p className="text-[10px] text-slate-500">{item.doctor}</p>
                  </div>
                </div>

                {/* Video Play Button */}
                <button
                  onClick={() => setActiveVideoModal(item)}
                  className="w-10 h-10 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform"
                  title={u.watchStory}
                >
                  <Play className="w-4 h-4 fill-emerald-400 ml-0.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Video Story Preview Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card max-w-2xl w-full p-6 border border-emerald-500/40 rounded-3xl relative animate-fadeIn">
            
            <button 
              onClick={() => setActiveVideoModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-white mb-1">{activeVideoModal.name} - {u.successStory}</h3>
            <p className="text-xs text-emerald-400 font-semibold mb-4">{activeVideoModal.treatment} • {activeVideoModal.doctor}</p>

            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
              <img src={activeVideoModal.videoUrl} alt="Video Story" className="w-full h-full object-cover filter contrast-105" />
              <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-2xl animate-pulse">
                  <Play className="w-8 h-8 fill-slate-950 ml-1" />
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 italic mt-4 text-center">
              "{activeVideoModal.quote}"
            </p>

          </div>
        </div>
      )}

    </section>
  );
}
