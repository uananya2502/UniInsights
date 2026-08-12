'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, MessageSquare } from 'lucide-react';

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
          <strong key={i} className="font-bold text-slate-900">
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
            <h4 key={idx} className="text-xs font-extrabold text-slate-900 mt-2 mb-1 border-b border-slate-100 pb-1">
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
              <span className="font-bold text-blue-600 flex-shrink-0">{num}</span>
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
      content: 'Welcome to the UniInsights Advisory Assistant. I can help you compare universities, evaluate placement statistics, understand campus culture, and answer admission questions based on verified data. How can I assist you today?',
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

  const quickQuestions = [
    'Which engineering colleges offer the highest ROI in India?',
    'Compare IIT Delhi and IIT Bombay computer science placement data.',
    'What are the top management institutes according to NIRF 2025?',
    'How do students rate BITS Pilani campus infrastructure and hostels?',
  ];

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-4 md:p-6 pb-3 flex items-center gap-3 border-b border-slate-200/80">
        <div className="w-9 h-9 bg-blue-50 border border-blue-100 rounded-md flex items-center justify-center text-blue-600">
          <MessageSquare className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Ask Seniors & AI Assistant</h1>
          <p className="text-xs text-slate-500">Instant answers regarding NIRF data, placements, fees, and student experiences</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 animate-slide-up ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 text-white font-bold text-xs shadow-2xs ${
              msg.role === 'user' ? 'bg-slate-900' : 'bg-blue-600'
            }`}>
              {msg.role === 'user' ? (
                <User className="w-3.5 h-3.5 text-white" />
              ) : (
                <Bot className="w-3.5 h-3.5 text-white" />
              )}
            </div>
            <div className={`max-w-[85%] rounded-md px-4 py-3 text-xs leading-relaxed ${
              msg.role === 'user'
                ? 'bg-slate-900 text-white font-medium'
                : 'bg-white border border-slate-200 text-slate-800 shadow-2xs'
            }`}>
              <FormattedMessage content={msg.content} isUser={msg.role === 'user'} />
              <p className={`text-[10px] font-medium mt-2 ${msg.role === 'user' ? 'text-slate-400' : 'text-slate-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}


        {isLoading && (
          <div className="flex items-start gap-3 animate-slide-up">
            <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center flex-shrink-0">
              <Bot className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="bg-white border border-slate-200 rounded-md px-4 py-3 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                Analyzing institutional datasets...
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div className="pt-4">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">Recommended Queries (Click to Ask)</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickQuestions.map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-left p-3 rounded-md border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:border-blue-500 hover:bg-blue-50/50 hover:text-blue-700 transition-all shadow-2xs cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 pt-3 border-t border-slate-200 bg-white">
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="flex-1 px-3.5 py-2.5 border border-slate-200 rounded-md text-xs font-medium placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all bg-slate-50/50"
            placeholder="Ask about NIRF scores, branch cutoffs, placements..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage()}
            disabled={isLoading || !input.trim()}
            className="btn-primary px-4 py-2.5 rounded-md text-xs flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}


