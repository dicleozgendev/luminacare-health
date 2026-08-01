import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  Sparkles,
  Calendar,
  FileText,
  PhoneCall,
  User
} from 'lucide-react';
import { translations } from '../data/mockData';

export default function AIChatWidget({ lang, onOpenAppointment, onOpenPatientPortal }) {
  const t = translations[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: t.chatGreeting, time: '14:00' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Was hardcoded Turkish regardless of `lang` — the whole widget ignored
  // the language toggle. Re-seed the greeting whenever the language changes.
  useEffect(() => {
    setMessages([{ sender: 'bot', text: t.chatGreeting, time: '14:00' }]);
  }, [lang]);

  const quickQuestions = t.chatQuickQuestions;

  const handleSend = (textToSend) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    const userMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = t.chatDefaultReply;

      const qLower = query.toLowerCase();
      if (qLower.includes('randevu') || qLower.includes('appointment') || qLower.includes('book')) {
        replyText = t.chatApptReply;
      } else if (qLower.includes('tahlil') || qLower.includes('sonuç') || qLower.includes('mr') || qLower.includes('result') || qLower.includes('test')) {
        replyText = t.chatResultsReply;
      } else if (qLower.includes('sigorta') || qLower.includes('allianz') || qLower.includes('axa') || qLower.includes('insurance')) {
        replyText = t.chatInsuranceReply;
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-emerald-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs shadow-2xl shadow-cyan-500/40 hover:scale-105 transition-all"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
          </span>
          
          <Bot className="w-5 h-5 text-white" />
          <span className="hidden sm:inline">{t.chatWidgetLabel}</span>

          <span className="absolute -top-2 -right-1 bg-amber-400 text-slate-950 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">
            {lang === 'tr' ? '24/7 Canlı' : '24/7 Live'}
          </span>
        </button>
      )}

      {/* Chat Drawer Modal */}
      {isOpen && (
        <div className="glass-card max-w-sm w-[92vw] sm:w-[380px] h-[520px] border border-cyan-500/40 rounded-3xl flex flex-col justify-between shadow-2xl animate-fadeIn relative overflow-hidden bg-slate-950/95">
          
          {/* Drawer Header */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-500 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <h4 className="font-extrabold text-white text-sm flex items-center gap-1.5">
                  <span>{t.chatWidgetLabel}</span>
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </h4>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {t.chatOnlineStatus}
                </span>
              </div>
            </div>

            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                
                <div
                  className={`p-3 rounded-2xl max-w-[80%] ${
                    msg.sender === 'user'
                      ? 'bg-cyan-600 text-white font-medium rounded-tr-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                  <span className="text-[9px] opacity-60 block text-right mt-1">{msg.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs italic">
                <Bot className="w-4 h-4 text-cyan-400 animate-spin" />
                <span>{t.chatTypingIndicator}</span>
              </div>
            )}
          </div>

          {/* Preset Quick Questions */}
          <div className="p-3 bg-slate-900/60 border-t border-slate-800/80 space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1">
              {t.chatQuickQuestionsLabel}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    handleSend(q.label);
                    if (q.action === 'appointment') onOpenAppointment();
                    if (q.action === 'portal') onOpenPatientPortal();
                  }}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-cyan-950/60 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-all text-left"
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={t.chatInputPlaceholder}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold disabled:opacity-40 shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
