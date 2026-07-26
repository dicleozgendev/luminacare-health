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

export default function TelehealthModal({ lang, isOpen, onClose }) {
  const t = translations[lang];

  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [callDuration, setCallDuration] = useState(262); // 4 minutes 22 seconds
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Dr. Selin Jenkins', text: 'Merhaba Ahmet Bey, e-nabız ve EKG verilerinizi inceliyorum. Şikayetiniz devam ediyor mu?', time: '10:31' },
    { sender: 'Siz', text: 'Merhaba hocam, hafif bir çarpıntı hissettim ama şu an EKG değerlerim sakinleşti.', time: '10:32' }
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

    const newMsg = { sender: 'Siz', text: inputMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages(prev => [...prev, newMsg]);
    setInputMsg('');

    // Doctor auto response simulation
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { 
          sender: 'Dr. Selin Jenkins', 
          text: 'Harika, verileriniz oldukça stabil görünüyor. E-reçetenize hafif bir magnezyum takviyesi yazdım, sistemden indirebilirsiniz.', 
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
                <span>Canlı Tele-Sağlık Görüntülü Muayene</span>
                <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/30">
                  {formatTime(callDuration)}
                </span>
              </h3>
              <p className="text-xs text-slate-400">Şifreli HD Medikal Görüşme Kanalı (#TLH-88492)</p>
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
                  <span className="text-xs font-medium">Kamera Kapatıldı</span>
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
                  alt="Hasta Özgörüntü" 
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 left-1 text-[9px] font-bold text-white px-1 bg-black/60 rounded">Siz</span>
              </div>
            </div>

            {/* Video Action Controls Bar */}
            <div className="flex items-center justify-center gap-4 p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
              <button
                onClick={() => setMicOn(!micOn)}
                className={`p-3.5 rounded-xl transition-all ${
                  micOn ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-red-500/20 text-red-400 border border-red-500/40'
                }`}
                title={micOn ? 'Mikrofonu Kapat' : 'Mikrofonu Aç'}
              >
                {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setVideoOn(!videoOn)}
                className={`p-3.5 rounded-xl transition-all ${
                  videoOn ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-red-500/20 text-red-400 border border-red-500/40'
                }`}
                title={videoOn ? 'Kamerayı Kapat' : 'Kamerayı Aç'}
              >
                {videoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setShowPrescription(!showPrescription)}
                className="px-4 py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>E-Reçete Görüntüle</span>
              </button>

              <button
                onClick={onClose}
                className="p-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 transition-all"
                title="Görüşmeyi Sonlandır"
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
                  <span className="font-bold text-white">Canlı Medikal Sohbet</span>
                  <span className="text-slate-400">Şifreli Mesajlaşma</span>
                </div>

                {/* Messages Feed */}
                <div className="flex-1 overflow-y-auto my-3 space-y-3 pr-1 max-h-[260px]">
                  {chatMessages.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`p-3 rounded-xl text-xs max-w-[85%] ${
                        msg.sender === 'Siz' 
                          ? 'ml-auto bg-cyan-600 text-white font-medium' 
                          : 'bg-slate-900 border border-slate-800 text-slate-200'
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] text-slate-300 mb-1">
                        <strong>{msg.sender}</strong>
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
                    placeholder="Doktora bir soru sorun..."
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
                    <h4 className="font-bold text-white text-sm">Dijital E-Reçete (#REC-9941)</h4>
                  </div>
                  <button 
                    onClick={() => setShowPrescription(false)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Sohbete Dön
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
                  <div className="flex justify-between border-b border-slate-800 pb-2 text-slate-400">
                    <span>Hekim: Prof. Dr. Selin Jenkins</span>
                    <span>Tarih: 25.07.2026</span>
                  </div>

                  <div>
                    <strong className="text-emerald-400 block mb-1">Yazılan İlaçlar:</strong>
                    <ul className="space-y-1 text-slate-300">
                      <li>• <strong>Magnisort Cardio 250mg</strong> (1x1 Tok - Akşam)</li>
                      <li>• <strong>Omega3 Epa-Dha Gold</strong> (1x1 Günde 1 Tane)</li>
                    </ul>
                  </div>

                  <div className="p-2 rounded bg-slate-950 text-[11px] text-slate-400 border border-slate-800">
                    E-Reçete Şifresi: <strong className="text-amber-400 font-mono">3829-AB</strong> (Tüm eczanelerde geçerlidir)
                  </div>
                </div>

                <button 
                  onClick={() => alert("E-Reçete PDF olarak indirildi!")}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>E-Reçeteyi İndir (PDF)</span>
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
