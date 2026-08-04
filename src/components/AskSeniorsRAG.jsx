import React, { useState } from 'react';
import { MessageSquare, Send, Sparkles, AlertCircle, ExternalLink, ShieldCheck, ThumbsUp, CheckCircle, HelpCircle } from 'lucide-react';
import { askSeniorsRAG } from '../services/api';

const SAMPLE_QUESTIONS = [
  "Is hostel food good?",
  "Are placements real?",
  "How is coding culture?",
  "Is attendance strict?",
  "Is KIIT worth joining?"
];

export default function AskSeniorsRAG({ selectedUnivId, univName }) {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleAsk = async (qToAsk) => {
    const activeQ = qToAsk || question;
    if (!activeQ.trim()) return;

    setLoading(true);
    setResponse(null);

    const res = await askSeniorsRAG(selectedUnivId, activeQ);
    setResponse(res);
    setLoading(false);
  };

  return (
    <div id="ask-seniors" className="glass-card rounded-3xl p-8 border border-sky-200/80 bg-white mb-12 shadow-glass">
      {/* Feature Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-extrabold text-slate-900">Ask Seniors</h2>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-200">
                RAG AI Chatbot
              </span>
            </div>
            <p className="text-sm text-slate-500">
              Query 18,000+ verified student comments and transcript chunks with strict citations
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Hallucination Protected</span>
        </div>
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="mb-6">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
          Ask Seniors Quick Prompts:
        </p>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_QUESTIONS.map((sq, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuestion(sq);
                handleAsk(sq);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-700 text-xs font-semibold border border-slate-200 transition-all hover:scale-105 flex items-center space-x-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5 text-brand-500" />
              <span>{sq}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input Field */}
      <form onSubmit={(e) => { e.preventDefault(); handleAsk(); }} className="relative mb-6">
        <div className="relative flex items-center">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={`Ask anything about ${univName || 'university'} (hostel, placements, professors, coding)...`}
            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 rounded-2xl py-4 pl-5 pr-14 text-slate-800 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-brand-500/10 transition-all"
          />
          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="absolute right-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white p-3 rounded-xl shadow-md transition-all flex items-center justify-center"
          >
            {loading ? <Sparkles className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </form>

      {/* Response Box */}
      {loading && (
        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200/80">
          <Sparkles className="w-8 h-8 text-brand-500 animate-spin mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-700">Retrieving relevant YouTube transcripts and vector chunks...</p>
          <p className="text-xs text-slate-400 mt-1">Executing RAG similarity match against student database</p>
        </div>
      )}

      {response && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {!response.has_sufficient_data ? (
            /* Insufficient Data Card */
            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 flex items-start space-x-4">
              <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-base font-extrabold text-amber-900 mb-1">Insufficient Data Notice</h4>
                <p className="text-sm font-bold text-amber-800 mb-2">
                  "{response.answer}"
                </p>
                <p className="text-xs text-amber-700">
                  Our strict RAG policy prevents hallucinating answers when public YouTube discussions lack statistical backing for this query.
                </p>
              </div>
            </div>
          ) : (
            /* AI Answer Card */
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              {/* Answer & Confidence Header */}
              <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200">
                <div className="flex items-center space-x-2 text-brand-700 font-extrabold text-sm">
                  <Sparkles className="w-4 h-4 text-brand-500" />
                  <span>RAG AI Senior Response</span>
                </div>
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>RAG Confidence: {response.confidence}%</span>
                </div>
              </div>

              {/* Verified Answer Text */}
              <p className="text-base text-slate-800 font-medium leading-relaxed">
                {response.answer}
              </p>

              {/* Cited YouTube Sources */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Verified Video Sources & Cited Comments:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {response.sources.map((src, i) => (
                    <div key={i} className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs shadow-sm hover:border-brand-300 transition-colors">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-slate-900 truncate max-w-[200px]">{src.video_title}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-50 text-red-600 border border-red-200 flex items-center gap-1">
                          Source {i + 1}
                        </span>
                      </div>
                      <p className="text-slate-600 italic mb-2 line-clamp-2">"{src.comment_text}"</p>
                      <div className="flex items-center justify-between text-slate-400 text-[11px]">
                        <span>— {src.author}</span>
                        <span className="flex items-center gap-1 text-slate-500 font-semibold">
                          <ThumbsUp className="w-3 h-3 text-brand-500" /> {src.likes}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
