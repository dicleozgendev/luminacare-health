import React, { useState, useEffect } from 'react';
import { 
  X, 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  PhoneOff, 
  Send, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Download,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { doctorsData, translations } from '../data/mockData';

// Was 100% hardcoded Turkish regardless of `lang`.
const telehealthText = {
  tr: {
    liveTitle: "Canlı Tele-Sağlık Görüntülü Muayene",
    channelNote: "Şifreli HD Medikal Görüşme Kanalı (#TLH-88492)",
    cameraOff: "Kamera Kapatıldı",
    you: "Siz",
    selfVideoAlt: "Hasta Özgörüntü",
    micOffTitle: "Mikrofonu Aç",
    micOnTitle: "Mikrofonu Kapat",
    videoOffTitle: "Kamerayı Aç",
    videoOnTitle: "Kamerayı Kapat",
    viewPrescription: "E-Reçete Görüntüle",
    endCallTitle: "Görüşmeyi Sonlandır",
    liveChat: "Canlı Medikal Sohbet",
    encryptedMsg: "Şifreli Mesajlaşma",
    inputPlaceholder: "Doktora bir soru sorun...",
    prescriptionTitle: "Dijital E-Reçete (#REC-9941)",
    backToChat: "Sohbete Dön",
    doctorLabel: "Hekim: Prof. Dr. Selin Jenkins",
    dateLabel: "Tarih: 25.07.2026",
    prescribedMeds: "Yazılan İlaçlar:",
    med1: "Magnezyum Sitrat 250mg (Jenerik)",
    med1Dose: "(1x1 Tok - Akşam)",
    med2: "Omega3 Epa-Dha Gold",
    med2Dose: "(1x1 Günde 1 Tane)",
    codeLabel: "E-Reçete Şifresi:",
    codeNote: "(Tüm eczanelerde geçerlidir)",
    downloadBtn: "E-Reçeteyi İndir (PDF)",
    downloadAlert: "E-Reçete PDF olarak indirildi!",
    greeting: 'Merhaba Ahmet Bey, e-nabız ve EKG verilerinizi inceliyorum. Şikayetiniz devam ediyor mu?',
    patientReply: 'Merhaba hocam, hafif bir çarpıntı hissettim ama şu an EKG değerlerim sakinleşti.',
    doctorAutoReply: 'Harika, verileriniz oldukça stabil görünüyor. E-reçetenize hafif bir magnezyum takviyesi yazdım, sistemden indirebilirsiniz.',
  },
  en: {
    liveTitle: "Live Telehealth Video Consultation",
    channelNote: "Encrypted HD Medical Call Channel (#TLH-88492)",
    cameraOff: "Camera Off",
    you: "You",
    selfVideoAlt: "Patient Self View",
    micOffTitle: "Turn Mic On",
    micOnTitle: "Turn Mic Off",
    videoOffTitle: "Turn Camera On",
    videoOnTitle: "Turn Camera Off",
    viewPrescription: "View E-Prescription",
    endCallTitle: "End Call",
    liveChat: "Live Medical Chat",
    encryptedMsg: "Encrypted Messaging",
    inputPlaceholder: "Ask the doctor a question...",
    prescriptionTitle: "Digital E-Prescription (#REC-9941)",
    backToChat: "Back to Chat",
    doctorLabel: "Physician: Prof. Dr. Selin Jenkins",
    dateLabel: "Date: 07/25/2026",
    prescribedMeds: "Prescribed Medications:",
    med1: "Magnesium Citrate 250mg (Generic)",
    med1Dose: "(1x1 With Food - Evening)",
    med2: "Omega3 Epa-Dha Gold",
    med2Dose: "(1x1 Daily)",
    codeLabel: "E-Prescription Code:",
    codeNote: "(Valid at all pharmacies)",
    downloadBtn: "Download E-Prescription (PDF)",
    downloadAlert: "E-Prescription downloaded as PDF!",
    greeting: 'Hello Mr. Ahmet, I\'m reviewing your e-pulse and ECG data. Are your symptoms still present?',
    patientReply: 'Hello Doctor, I felt a mild palpitation but my ECG readings have settled down now.',
    doctorAutoReply: 'Great, your readings look quite stable. I\'ve added a mild magnesium supplement to your e-prescription, you can download it from the system.',
  },
};

export default function TelehealthModal({ lang, isOpen, onClose }) {
  const t = translations[lang];
  const c = telehealthText[lang];

  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [callDuration, setCallDuration] = useState(262); // 4 minutes 22 seconds
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Dr. Selin Jenkins', text: c.greeting, time: '10:31' },
    { sender: 'patient', text: c.patientReply, time: '10:32' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [showPrescription, setShowPrescription] = useState(false);

  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const doctor = doctorsData[0]; // Prof. Dr. Selin Jenkins

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg = { sender: 'patient', text: inputMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages(prev => [...prev, newMsg]);
    setInputMsg('');

    // Doctor auto response simulation
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'Dr. Selin Jenkins',
          text: c.doctorAutoReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-lg flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass-card max-w-5xl w-full p-6 border border-emerald-500/40 relative animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 live-badge-dot" />
            <div>
              <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                <span>{c.liveTitle}</span>
                <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/30">
                  {formatTime(callDuration)}
                </span>
              </h3>
              <p className="text-xs text-slate-400">{c.channelNote}</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Grid: Video Stream + Chat & E-Prescription */}
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Left Column: Doctor Video + Controls */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Video Canvas Mockup */}
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl">
              {videoOn ? (
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover filter contrast-[1.05]"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
                  <VideoOff className="w-12 h-12 mb-2" />
                  <span className="text-xs font-medium">{c.cameraOff}</span>
                </div>
              )}

              {/* Top Doctor Tag overlay */}
              <div className="absolute top-4 left-4 p-2.5 rounded-xl bg-slate-950/80 backdrop-blur border border-slate-800 text-xs text-white">
                <strong className="block font-bold">{doctor.name}</strong>
                <span className="text-[11px] text-cyan-400">{doctor.title[lang]}</span>
              </div>

              {/* Patient Self Video Inset */}
              <div className="absolute bottom-4 right-4 w-28 h-20 rounded-xl overflow-hidden border-2 border-emerald-500/60 bg-slate-900 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt={c.selfVideoAlt}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 left-1 text-[9px] font-bold text-white px-1 bg-black/60 rounded">{c.you}</span>
              </div>
            </div>

            {/* Video Action Controls Bar */}
            <div className="flex items-center justify-center gap-4 p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
              <button
                onClick={() => setMicOn(!micOn)}
                className={`p-3.5 rounded-xl transition-all ${
                  micOn ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-red-500/20 text-red-400 border border-red-500/40'
                }`}
                title={micOn ? c.micOnTitle : c.micOffTitle}
              >
                {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setVideoOn(!videoOn)}
                className={`p-3.5 rounded-xl transition-all ${
                  videoOn ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-red-500/20 text-red-400 border border-red-500/40'
                }`}
                title={videoOn ? c.videoOnTitle : c.videoOffTitle}
              >
                {videoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setShowPrescription(!showPrescription)}
                className="px-4 py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>{c.viewPrescription}</span>
              </button>

              <button
                onClick={onClose}
                className="p-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 transition-all"
                title={c.endCallTitle}
              >
                <PhoneOff className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* Right Column: Live Chat & E-Prescription Drawer */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full bg-slate-950/90 rounded-2xl border border-slate-800 p-4 min-h-[380px]">
            
            {!showPrescription ? (
              <>
                {/* Chat Header */}
                <div className="pb-3 border-b border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{c.liveChat}</span>
                  <span className="text-slate-400">{c.encryptedMsg}</span>
                </div>

                {/* Messages Feed */}
                <div className="flex-1 overflow-y-auto my-3 space-y-3 pr-1 max-h-[260px]">
                  {chatMessages.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`p-3 rounded-xl text-xs max-w-[85%] ${
                        msg.sender === 'patient'
                          ? 'ml-auto bg-cyan-600 text-white font-medium'
                          : 'bg-slate-900 border border-slate-800 text-slate-200'
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] text-slate-300 mb-1">
                        <strong>{msg.sender === 'patient' ? c.you : msg.sender}</strong>
                        <span>{msg.time}</span>
                      </div>
                      <p>{msg.text}</p>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-slate-800">
                  <input 
                    type="text"
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    placeholder={c.inputPlaceholder}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                  <button 
                    type="submit"
                    className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            ) : (
              /* E-Prescription Preview */
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <h4 className="font-bold text-white text-sm">{c.prescriptionTitle}</h4>
                  </div>
                  <button
                    onClick={() => setShowPrescription(false)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    {c.backToChat}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
                  <div className="flex justify-between border-b border-slate-800 pb-2 text-slate-400">
                    <span>{c.doctorLabel}</span>
                    <span>{c.dateLabel}</span>
                  </div>

                  <div>
                    <strong className="text-emerald-400 block mb-1">{c.prescribedMeds}</strong>
                    <ul className="space-y-1 text-slate-300">
                      <li>• <strong>{c.med1}</strong> {c.med1Dose}</li>
                      <li>• <strong>{c.med2}</strong> {c.med2Dose}</li>
                    </ul>
                  </div>

                  <div className="p-2 rounded bg-slate-950 text-[11px] text-slate-400 border border-slate-800">
                    {c.codeLabel} <strong className="text-amber-400 font-mono">3829-AB</strong> {c.codeNote}
                  </div>
                </div>

                <button
                  onClick={() => alert(c.downloadAlert)}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>{c.downloadBtn}</span>
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
