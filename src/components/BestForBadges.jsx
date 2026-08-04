import React from 'react';
import { Check, Sparkles, Award } from 'lucide-react';

export default function BestForBadges({ bestFor = [] }) {
  if (!bestFor || bestFor.length === 0) return null;

  return (
    <div className="glass-card rounded-3xl p-6 border border-brand-200/80 bg-gradient-to-r from-brand-50/50 via-white to-sky-50/50 mb-12 shadow-glass">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-md shadow-brand-500/20">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">Recommended "Best For"</h3>
            <p className="text-xs text-slate-500">AI consensus recommendations based on high student satisfaction</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {bestFor.map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white text-slate-800 font-extrabold text-sm border border-brand-200 shadow-sm hover:border-brand-400 transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
