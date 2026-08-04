import React from 'react';
import { CheckCircle2, AlertCircle, ThumbsUp, AlertTriangle } from 'lucide-react';

export default function StrengthsConcerns({ strengths = [], concerns = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      {/* Strengths Card */}
      <div className="glass-card rounded-3xl p-6 border border-emerald-200/80 bg-gradient-to-br from-white to-emerald-50/20 shadow-glass">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-300">
            <ThumbsUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Student Appreciated Strengths</h3>
            <p className="text-xs text-slate-500">Most frequent positive clusters in YouTube comments</p>
          </div>
        </div>

        <div className="space-y-3">
          {strengths.map((str, idx) => (
            <div key={idx} className="flex items-center space-x-3 p-3.5 bg-white rounded-2xl border border-emerald-200/60 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="text-sm font-bold text-slate-800">{str}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Concerns Card */}
      <div className="glass-card rounded-3xl p-6 border border-amber-200/80 bg-gradient-to-br from-white to-amber-50/20 shadow-glass">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center border border-amber-300">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Recurring Student Concerns</h3>
            <p className="text-xs text-slate-500">Constructive feedback & pain points raised by seniors</p>
          </div>
        </div>

        <div className="space-y-3">
          {concerns.map((con, idx) => (
            <div key={idx} className="flex items-center space-x-3 p-3.5 bg-white rounded-2xl border border-amber-200/60 shadow-sm">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <span className="text-sm font-bold text-slate-800">{con}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
