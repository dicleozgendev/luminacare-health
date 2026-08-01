import React from 'react';
import { 
  Building2, 
  Sparkles, 
  Stethoscope,
  ChevronRight
} from 'lucide-react';
import { departmentsData, translations } from '../data/mockData';

export default function Departments({ lang, onSelectDeptForBooking }) {
  const t = translations[lang];

  return (
    <section id="departments" className="py-28 md:py-32 px-6 relative bg-slate-950/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-5 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>{t.deptSectionBadge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
            {t.ourDepartments}
          </h2>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
            {t.deptSectionDesc}
          </p>
        </div>

        {/* Departments Cards Grid with Spacious Gaps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {departmentsData.map((dept) => (
            <div 
              key={dept.id} 
              className="glass-card glass-card-hover rounded-3xl overflow-hidden border-slate-800 flex flex-col justify-between group shadow-xl"
            >
              {/* Card Image Header */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={dept.image} 
                  alt={dept.title[lang]} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-[#0b1329]/40 to-transparent" />
                
                {/* Tech Badge */}
                <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-slate-950/85 backdrop-blur border border-cyan-500/30 text-cyan-300 text-xs font-bold flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{dept.techBadge}</span>
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-4 left-5 right-5">
                  <h3 className="font-extrabold text-2xl text-white group-hover:text-cyan-300 transition-colors">
                    {dept.title[lang]}
                  </h3>
                  <span className="text-xs text-slate-300 font-semibold mt-0.5 block">
                    {dept.specsCount} {t.onStaffSpecialists}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-300 leading-relaxed">
                  {dept.desc[lang]}
                </p>

                {/* Popular Symptoms handled */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400">
                  <strong className="text-cyan-400 block mb-1 font-bold">{t.commonComplaints}</strong>
                  <span>{dept.popularSymptom[lang]}</span>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onSelectDeptForBooking(dept.id)}
                  className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-cyan-950/60 border border-slate-700 hover:border-cyan-500/50 text-white font-bold text-xs flex items-center justify-center gap-2 group-hover:text-cyan-300 transition-all shadow-md"
                >
                  <Stethoscope className="w-4 h-4 text-cyan-400" />
                  <span>{t.bookFromDepartment}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
