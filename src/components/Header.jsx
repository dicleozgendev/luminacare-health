import React, { useState } from 'react';
import { 
  Activity, 
  PhoneCall, 
  Calendar, 
  FileText, 
  Video, 
  Globe, 
  Sun, 
  Moon, 
  Menu,
  X,
  Stethoscope
} from 'lucide-react';
import { translations } from '../data/mockData';

export default function Header({ 
  lang, 
  setLang, 
  theme, 
  setTheme, 
  onOpenAppointment, 
  onOpenPatientPortal, 
  onOpenTelehealth 
}) {
  const t = translations[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 backdrop-blur-xl bg-[#0b1329]/80 border-b border-slate-800/80">
      
      {/* Top Mini Info Bar */}
      <div className="bg-slate-950/90 text-slate-400 py-1.5 px-4 text-[11px] font-medium border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 live-badge-dot" />
              Acil Bekleme: ~6 Dk
            </span>
            <span className="hidden sm:inline-block text-slate-500">|</span>
            <span className="hidden sm:inline-block text-slate-400">24/7 Travma & Ambulans Hizmeti</span>
          </div>

          <div className="flex items-center gap-3">
            <a href="tel:4440911" className="flex items-center gap-1 text-red-400 font-bold hover:text-red-300 transition-colors">
              <PhoneCall className="w-3 h-3 text-red-400" />
              <span>Acil: 444 0 911</span>
            </a>
            
            {/* Language Switcher */}
            <button 
              onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
              className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 transition-colors"
            >
              <Globe className="w-3 h-3 text-cyan-400" />
              <span className="font-bold text-[10px] uppercase">{lang === 'tr' ? 'EN' : 'TR'}</span>
            </button>

            {/* Theme Switcher */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center gap-1 text-slate-300 hover:text-amber-400 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-3 h-3 text-amber-400" /> : <Moon className="w-3 h-3 text-indigo-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <nav className="max-w-7xl mx-auto px-4 md:px-6 py-3.5 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Activity className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              Lumina<span className="text-cyan-400 font-light">Care</span>
            </span>
            <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest block -mt-1">
              Medical Center
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-300">
          <a href="#departments" className="hover:text-cyan-400 transition-colors">Poliklinikler</a>
          <a href="#doctors" className="hover:text-cyan-400 transition-colors">Uzman Kadromuz</a>
          <a href="#triage" className="hover:text-cyan-400 flex items-center gap-1">
            <Stethoscope className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI Semptom Kontrolü</span>
          </a>
          <a href="#checkup" className="hover:text-cyan-400 transition-colors">Check-Up & Sigorta</a>
          <a href="#emergency" className="hover:text-cyan-400 transition-colors">Acil Servis</a>
        </div>

        {/* Action Buttons & Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenPatientPortal}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>E-Sonuç</span>
          </button>

          <button
            onClick={onOpenTelehealth}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-xl transition-all"
          >
            <Video className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tele-Sağlık</span>
          </button>

          <button
            onClick={onOpenAppointment}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl shadow-lg shadow-cyan-500/20 transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Randevu Al</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-6 py-4 space-y-3 text-xs font-semibold text-slate-300 animate-fadeIn">
          <a href="#departments" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-cyan-400">Poliklinikler</a>
          <a href="#doctors" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-cyan-400">Uzman Hekim Kadrosu</a>
          <a href="#triage" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-cyan-400 text-emerald-400">AI Semptom Kontrolü</a>
          <a href="#checkup" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-cyan-400">Check-Up Paketleri & Sigorta</a>
          <a href="#emergency" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-cyan-400 text-red-400">24/7 Acil Servis</a>
          
          <div className="pt-3 border-t border-slate-800 flex gap-2">
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenPatientPortal(); }}
              className="w-1/2 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-center font-bold"
            >
              E-Sonuç Sorgula
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenTelehealth(); }}
              className="w-1/2 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center font-bold"
            >
              Online Muayene
            </button>
          </div>
        </div>
      )}

    </header>
  );
}
