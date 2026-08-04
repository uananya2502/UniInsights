import React, { useState } from 'react';
import { Calendar, History, Sparkles, TrendingUp, ChevronRight } from 'lucide-react';

export default function ReputationTimeline({ timeline = [] }) {
  const [activeYearIndex, setActiveYearIndex] = useState(timeline.length - 1);

  if (!timeline || timeline.length === 0) return null;

  const currentItem = timeline[activeYearIndex] || timeline[0];

  return (
    <div className="glass-card rounded-3xl p-8 border border-slate-200/80 bg-white mb-12 shadow-glass">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-brand-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Reputation Timeline</h2>
            <p className="text-sm text-slate-500">Historical social perception trends from 2023 to 2026</p>
          </div>
        </div>

        <div className="px-4 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200">
          Multi-Year NLP Tracking
        </div>
      </div>

      {/* Interactive Year Selector Bar */}
      <div className="relative mb-8 pb-4">
        <div className="flex justify-between items-center max-w-2xl mx-auto relative z-10">
          {timeline.map((item, idx) => {
            const isActive = idx === activeYearIndex;
            return (
              <button
                key={item.year}
                onClick={() => setActiveYearIndex(idx)}
                className={`relative px-6 py-2.5 rounded-2xl font-extrabold text-sm transition-all flex flex-col items-center ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30 scale-110'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{item.year}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-sky-300 mt-1 animate-pulse" />}
              </button>
            );
          })}
        </div>

        {/* Connecting Progress Line */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1 bg-slate-200 -z-0 rounded-full" />
      </div>

      {/* Selected Year Insight Card */}
      <div className="bg-gradient-to-br from-slate-50 to-brand-50/30 p-6 sm:p-8 rounded-2xl border border-brand-200/80 shadow-sm animate-in fade-in duration-200">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-black text-brand-700">{currentItem.year}</span>
            <span className="text-xs font-bold text-slate-400">Social Perception Milestone</span>
          </div>

          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Overall Sentiment: {currentItem.overall_sentiment}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Major Discussed Topic</p>
            <p className="text-base font-extrabold text-slate-900">{currentItem.major_topic}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Most Discussed Event</p>
            <p className="text-base font-bold text-slate-800">{currentItem.most_discussed_event}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
