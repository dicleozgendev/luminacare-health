import React, { useState } from 'react';
import { 
  UserCheck, 
  Star, 
  Calendar, 
  Video, 
  Award, 
  GraduationCap, 
  X, 
  Search, 
  Globe,
  Clock
} from 'lucide-react';
import { doctorsData, departmentsData, translations } from '../data/mockData';

export default function DoctorsRoster({ lang, onSelectDoctorForBooking }) {
  const t = translations[lang];
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDoctorModal, setActiveDoctorModal] = useState(null);

  const filteredDoctors = doctorsData.filter(doc => {
    const matchesDept = selectedDeptFilter === 'all' || doc.departmentId === selectedDeptFilter;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.title[lang].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <section id="doctors" className="py-28 md:py-32 px-6 relative bg-slate-950/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
              <UserCheck className="w-4 h-4 text-cyan-400" />
              <span>Dünya Standartlarında Medikal Kadro</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              {t.ourDoctors}
            </h2>
            <p className="text-slate-300 text-sm md:text-base max-w-xl font-light leading-relaxed">
              Uluslararası akreditasyona sahip, alanında bilimsel yayınları ve binlerce başarılı vakası bulunan uzman hekim kadromuzla tanışın.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchDoctor}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Polyclinic Filter Pills */}
        <div className="flex items-center gap-3 overflow-x-auto pb-6 mb-12 no-scrollbar">
          <button
            onClick={() => setSelectedDeptFilter('all')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedDeptFilter === 'all' 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25' 
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            {t.allDepartments} ({doctorsData.length})
          </button>

          {departmentsData.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDeptFilter(dept.id)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedDeptFilter === dept.id 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25' 
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {dept.title[lang]}
            </button>
          ))}
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doc) => (
            <div key={doc.id} className="glass-card glass-card-hover p-8 border-slate-800 flex flex-col justify-between relative group rounded-3xl shadow-xl">
              
              {/* Badges Bar */}
              <div className="flex items-center justify-between gap-2 mb-6">
                <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-cyan-400" />
                  {doc.experience} {t.yearsExp}
                </span>

                {doc.telehealth && (
                  <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5" />
                    Online Muayene
                  </span>
                )}
              </div>

              {/* Doctor Info */}
              <div className="flex items-start gap-5 mb-6">
                <img 
                  src={doc.image} 
                  alt={doc.name} 
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-slate-700 shadow-xl group-hover:scale-105 transition-transform"
                />
                <div className="space-y-1">
                  <h3 className="font-extrabold text-white text-base sm:text-lg group-hover:text-cyan-300 transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-xs text-cyan-400 font-semibold">{doc.title[lang]}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold pt-1">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{doc.rating}</span>
                    <span className="text-slate-500 font-normal">({doc.reviewCount} Görüş)</span>
                  </div>
                </div>
              </div>

              {/* Bio Teaser */}
              <p className="text-xs text-slate-400 line-clamp-3 mb-8 leading-relaxed font-light">
                {doc.bio[lang]}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-6 border-t border-slate-800">
                <button
                  onClick={() => setActiveDoctorModal(doc)}
                  className="w-1/2 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition-all text-center"
                >
                  {t.viewProfile}
                </button>
                
                <button
                  onClick={() => onSelectDoctorForBooking(doc)}
                  className="w-1/2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.bookNow}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Doctor Detailed Profile Modal */}
      {activeDoctorModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-card max-w-2xl w-full p-8 md:p-10 border border-cyan-500/30 relative animate-fadeIn rounded-3xl">
            
            <button 
              onClick={() => setActiveDoctorModal(null)}
              className="absolute top-5 right-5 p-2.5 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
              <img 
                src={activeDoctorModal.image} 
                alt={activeDoctorModal.name} 
                className="w-32 h-32 rounded-2xl object-cover border-2 border-cyan-500/40 shadow-xl"
              />
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                    JCI Sertifikalı Hekim
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{activeDoctorModal.rating}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-extrabold text-white">{activeDoctorModal.name}</h3>
                <p className="text-sm font-semibold text-cyan-400">{activeDoctorModal.title[lang]}</p>
                <p className="text-xs text-slate-400 flex items-center gap-2 pt-1">
                  <Globe className="w-4 h-4 text-slate-500" />
                  Konuşulan Diller: {activeDoctorModal.languages.join(", ")}
                </p>
              </div>
            </div>

            {/* Modal Tabs Content */}
            <div className="space-y-4 text-xs text-slate-300">
              
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
                <h4 className="font-bold text-white text-sm mb-1.5 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  Eğitim & Akademik Geçmiş
                </h4>
                <p className="text-slate-400 leading-relaxed">{activeDoctorModal.education[lang]}</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
                <h4 className="font-bold text-white text-sm mb-1.5 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400" />
                  Klinik Uzmanlık & Özgeçmiş
                </h4>
                <p className="text-slate-300 leading-relaxed">{activeDoctorModal.bio[lang]}</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
                <h4 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  En Yakın Uygun Randevu Saatleri
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {activeDoctorModal.availableSlots.map((slot, i) => (
                    <span key={i} className="px-3.5 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold">
                      {slot}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer CTA */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end gap-4">
              <button
                onClick={() => setActiveDoctorModal(null)}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs"
              >
                Kapat
              </button>
              
              <button
                onClick={() => {
                  const doc = activeDoctorModal;
                  setActiveDoctorModal(null);
                  onSelectDoctorForBooking(doc);
                }}
                className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/25"
              >
                Bu Hekim İçin Randevu Al
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
