'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, MessageSquare, Sparkles, GraduationCap, Zap, ChevronRight, HelpCircle } from 'lucide-react';
import { DoodleSparkle, DoodleUnderline, DoodleGradCap, DoodleBook } from '@/components/ui/Doodles';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

function FormattedMessage({ content, isUser }: { content: string; isUser: boolean }) {
  if (isUser) {
    return <div className="whitespace-pre-wrap font-sans">{content}</div>;
  }

  const lines = content.split('\n');

  const formatBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-slate-900 bg-amber-50/80 px-1 py-0.2 rounded border border-amber-200/50">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="space-y-1.5 font-sans leading-relaxed text-xs">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-0.5" />;

        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={idx} className="text-xs font-extrabold text-slate-900 mt-2 mb-1 border-b border-slate-100 pb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              {formatBold(trimmed.replace(/^###\s+/, ''))}
            </h4>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={idx} className="text-sm font-extrabold text-slate-900 mt-2 mb-1">
              {formatBold(trimmed.replace(/^##\s+/, ''))}
            </h3>
          );
        }
        if (trimmed.startsWith('# ')) {
          return (
            <h2 key={idx} className="text-sm font-black text-slate-900 mt-2 mb-1">
              {formatBold(trimmed.replace(/^#\s+/, ''))}
            </h2>
          );
        }
        if (/^\d+\.\s+/.test(trimmed)) {
          const match = trimmed.match(/^(\d+\.\s+)(.*)/);
          const num = match ? match[1] : '';
          const rest = match ? match[2] : trimmed;
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-1 my-0.5">
              <span className="font-extrabold text-blue-600 flex-shrink-0">{num}</span>
              <span>{formatBold(rest)}</span>
            </div>
          );
        }
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-2 my-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
              <span>{formatBold(trimmed.replace(/^[-*]\s+/, ''))}</span>
            </div>
          );
        }

        return (
          <p key={idx} className="text-slate-800">
            {formatBold(line)}
          </p>
        );
      })}
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Welcome to the UniInsights Senior AI Advisor. I analyze 100+ Indian university datasets, NIRF rankings, placement records, and verified senior reviews to give you transparent, honest answers.\n\nWhat campus or degree questions can I help you clear up today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (overrideText?: string) => {
    const textToSend = (overrideText || input).trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    if (!overrideText) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await res.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || data.error || 'I was unable to generate a response.',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'A network error occurred. Please check your connection and try again.',
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    {
      badge: 'Placement ROI',
      text: 'Which engineering colleges offer the highest ROI in India?',
    },
    {
      badge: 'Campus Showdown',
      text: 'Compare IIT Delhi and IIT Bombay computer science placement data.',
    },
    {
      badge: 'NIRF 2025 Leaderboard',
      text: 'What are the top management institutes according to NIRF 2025?',
    },
    {
      badge: 'Hostel Reality',
      text: 'How do students rate BITS Pilani campus infrastructure and hostels?',
    },
    {
      badge: 'BML Munjal Insights',
      text: 'What is the real median salary and placement rate for BML Munjal CS?',
    },
    {
      badge: 'Cutoff Trends',
      text: 'What JEE Advanced rank is typically needed for top IIT computer science?',
    },
  ];

  return (
    <div className="h-full flex flex-col max-w-5xl mx-auto p-4 md:p-6 overflow-y-auto">
      {/* Creative & Doodly Hero Header */}
      <div className="relative rounded-xl bg-slate-900 text-white p-5 md:p-6 shadow-sm border border-slate-800 mb-4 animate-fade-in overflow-visible">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              Senior Guidance • Available 24/7
            </div>
            <div className="relative">
              <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-white">
                Ask Seniors
              </h1>
            </div>
            <p className="text-slate-300 text-xs md:text-sm font-medium max-w-xl leading-relaxed">
              Get honest, data-backed insights on placements, NIRF cutoffs, fee ROI, and campus culture directly from verified senior datasets.
            </p>
          </div>
        </div>
      </div>


      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 animate-slide-up ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar - Only for user */}
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs shadow-2xs border bg-[#0B1527] border-slate-700">
                <User className="w-4 h-4 text-white" />
              </div>
            )}

            {/* Bubble */}
            <div className={`max-w-[88%] rounded-xl px-4 py-3.5 text-xs leading-relaxed ${
              msg.role === 'user'
                ? 'bg-[#0B1527] text-white font-medium shadow-xs'
                : 'bg-white border border-slate-200 text-slate-800 shadow-2xs relative'
            }`}>
              {msg.role === 'assistant' && (
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-[10px] text-slate-500 font-bold">
                  <span className="flex items-center gap-1 text-blue-600">
                    Verified Senior Advisor
                  </span>
                  <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              )}

              <FormattedMessage content={msg.content} isUser={msg.role === 'user'} />

              {msg.role === 'user' && (
                <p className="text-[10px] text-slate-400 mt-1.5 text-right font-medium">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              )}
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-3 animate-slide-up">
            <div className="w-8 h-8 rounded-lg bg-blue-600 border border-blue-500 flex items-center justify-center flex-shrink-0 text-white shadow-2xs">
              <Bot className="w-4 h-4 text-amber-300" />
            </div>
            <div className="bg-white border border-slate-200 rounded-xl px-4 py-3.5 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span>Searching SQLite RAG & verified senior datasets...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />

        {/* Recommended Queries */}
        {messages.length <= 1 && (
          <div className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-extrabold text-slate-900">Recommended Student Queries</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Click to Ask</span>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {quickPrompts.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(item.text)}
                  className="group text-left p-3.5 rounded-xl border border-slate-200/90 bg-white hover:border-blue-500 hover:bg-blue-50/40 hover:shadow-xs transition-all cursor-pointer relative flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80 group-hover:bg-blue-100 group-hover:text-blue-800 group-hover:border-blue-200 transition-colors">
                      {item.badge}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-snug">
                    {item.text}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Input Bar */}
      <div className="pt-3 border-t border-slate-200/80 mt-3">
        {/* Quick Topic Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-[11px] font-bold text-slate-600">
          <span className="text-slate-400 font-extrabold flex-shrink-0 text-[10px] uppercase tracking-wider">Quick Topics:</span>
          {[
            { label: 'NIRF Rankings', query: 'List top 10 engineering colleges in NIRF 2025 with placement stats' },
            { label: 'Placements', query: 'Compare BML Munjal and VIT placement packages' },
            { label: 'Fees & ROI', query: 'Which colleges offer lowest fees with high placement ROI?' },
            { label: 'Hostels', query: 'How are hostels and mess food at BITS Pilani and IIT Delhi?' },
          ].map((pill, i) => (
            <button
              key={i}
              onClick={() => sendMessage(pill.query)}
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex-shrink-0 cursor-pointer"
            >
              {pill.label}
            </button>
          ))}
        </div>


        <div className="flex items-center gap-2 bg-white p-1.5 border border-slate-200 rounded-xl shadow-2xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 transition-all">
          <input
            type="text"
            className="flex-1 px-3 py-2 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none bg-transparent"
            placeholder="Ask about NIRF scores, branch cutoffs, placement ROI, hostels..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage()}
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-[#0B1527] hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
          >
            <span>Ask Seniors</span>
          </button>
        </div>
      </div>
    </div>
  );
}



