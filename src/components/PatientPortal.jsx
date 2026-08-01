import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Search, 
  Download, 
  Printer, 
  CheckCircle2, 
  AlertCircle, 
  Activity, 
  Calendar, 
  User, 
  Building2,
  FileCheck2
} from 'lucide-react';
import { samplePatientLabResult, translations } from '../data/mockData';

// Was largely hardcoded Turkish regardless of `lang` — only two strings
// (t.resultTitle, t.enterProtocol, t.loadSampleData) actually translated.
const portalText = {
  tr: {
    subtitle: "Laboratuvar Biyokimya & Radyoloji Görüntüleme Sorgulama",
    searching: "Sorgulanıyor...",
    search: "Sorgula",
    sampleHint: (code) => `+ Örnek Tahlil Verisi Yükle (Örnek: ${code})`,
    sslNote: "Güvenli 256-Bit SSL Şifreleme",
    patientName: "Hasta Adı Soyadı",
    protocolNo: "Protokol No",
    doctor: "Sorumlu Hekim",
    approvalDate: "Onay Tarihi",
    bloodTestResults: "Biyokimya & Kan Tahlil Sonuçları",
    allNormal: "Tüm Parametreler Fizyolojik Sınırda",
    testName: "Tetkik Adı",
    result: "Sonuç",
    refRange: "Referans Aralığı",
    status: "Durum",
    normal: "NORMAL",
    radiologyNote: "Radyoloji Uzman Değerlendirme Notu (3T Koroner BT)",
    printReport: "Raporu Yazdır",
    downloadPdf: "PDF Olarak İndir",
    downloadAlert: "Laboratuvar Raporu PDF formatında indirildi!",
  },
  en: {
    subtitle: "Lab Biochemistry & Radiology Imaging Lookup",
    searching: "Searching...",
    search: "Search",
    sampleHint: (code) => `+ Load Sample Test Data (Sample: ${code})`,
    sslNote: "Secure 256-Bit SSL Encryption",
    patientName: "Patient Name",
    protocolNo: "Protocol No.",
    doctor: "Attending Physician",
    approvalDate: "Approval Date",
    bloodTestResults: "Biochemistry & Blood Test Results",
    allNormal: "All Parameters Within Normal Range",
    testName: "Test Name",
    result: "Result",
    refRange: "Reference Range",
    status: "Status",
    normal: "NORMAL",
    radiologyNote: "Radiology Specialist Assessment Note (3T Coronary CT)",
    printReport: "Print Report",
    downloadPdf: "Download as PDF",
    downloadAlert: "Lab report downloaded as PDF!",
  },
};

export default function PatientPortal({ lang, isOpen, onClose }) {
  const t = translations[lang];
  const p = portalText[lang];

  const [inputProtocol, setInputProtocol] = useState('');
  const [labData, setLabData] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLabData(samplePatientLabResult);
      setLoading(false);
    }, 700);
  };

  const handleLoadSample = () => {
    setInputProtocol('LM-2026-88412');
    handleSearch();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass-card max-w-4xl w-full p-6 md:p-8 border border-blue-500/40 relative animate-fadeIn">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <FileCheck2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">{t.resultTitle}</h2>
            <p className="text-xs text-slate-400">{p.subtitle}</p>
          </div>
        </div>

        {/* Search Bar & Sample Pill */}
        <form onSubmit={handleSearch} className="mb-6 space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input 
                type="text"
                value={inputProtocol}
                onChange={(e) => setInputProtocol(e.target.value)}
                placeholder={t.enterProtocol}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg flex items-center gap-2"
            >
              {loading ? p.searching : p.search}
            </button>
          </div>

          <div className="flex justify-between items-center text-xs">
            <button
              type="button"
              onClick={handleLoadSample}
              className="text-cyan-400 hover:underline font-semibold flex items-center gap-1"
            >
              <span>{p.sampleHint('LM-2026-88412')}</span>
            </button>

            <span className="text-slate-500">{p.sslNote}</span>
          </div>
        </form>

        {/* Results Container */}
        {labData && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Patient & Report Banner */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">{p.patientName}</span>
                <strong className="text-white text-sm">{labData.patientName}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">{p.protocolNo}</span>
                <strong className="text-cyan-400 font-mono">{labData.protocolNo}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">{p.doctor}</span>
                <strong className="text-slate-200">{labData.doctor}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">{p.approvalDate}</span>
                <strong className="text-amber-400">{labData.date}</strong>
              </div>
            </div>

            {/* Blood Test Table */}
            <div>
              <h3 className="text-sm font-bold text-white mb-3 flex items-center justify-between">
                <span>{p.bloodTestResults}</span>
                <span className="text-xs text-emerald-400 font-normal">{p.allNormal}</span>
              </h3>

              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950/80">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-3">{p.testName}</th>
                      <th className="p-3">{p.result}</th>
                      <th className="p-3">{p.refRange}</th>
                      <th className="p-3">{p.status}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {labData.results.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="p-3 font-semibold text-white">{item.test}</td>
                        <td className="p-3 font-mono font-bold text-cyan-300">{item.value}</td>
                        <td className="p-3 text-slate-400">{item.ref}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                            {p.normal}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Radiology Note Box */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
              <h4 className="font-bold text-cyan-400 mb-1 flex items-center gap-1.5">
                <Activity className="w-4 h-4" />
                {p.radiologyNote}
              </h4>
              <p className="text-slate-300 leading-relaxed">{labData.radiologyNote}</p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700"
              >
                <Printer className="w-4 h-4 text-cyan-400" />
                <span>{p.printReport}</span>
              </button>

              <button
                onClick={() => alert(p.downloadAlert)}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>{p.downloadPdf}</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
