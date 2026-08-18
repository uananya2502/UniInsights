'use client';

import { CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { UniversityData } from '@/lib/data-parser';

interface StrengthsConcernsProps {
  data: UniversityData;
}

export function StrengthsConcerns({ data }: StrengthsConcernsProps) {
  const metrics = [
    { label: 'Academics', score: data.categoryScores.academics },
    { label: 'Infrastructure', score: data.categoryScores.infrastructure },
    { label: 'Placement', score: data.categoryScores.placement },
    { label: 'Student Experience', score: data.categoryScores.studentExperience },
    { label: 'Hostel Quality', score: data.categoryScores.hostel },
    { label: 'Fee Value', score: data.categoryScores.fees },
  ];

  const sorted = [...metrics].sort((a, b) => b.score - a.score);
  const strengths = sorted.slice(0, 3);
  const concerns = sorted.slice(3).filter(c => c.score < 8.0);

  return (
    <div className="card h-full animate-slide-up">
      <div className="card-header flex items-center justify-between">
        <h3 className="card-title text-slate-900">Strengths vs Concerns</h3>
        <span className="badge badge-emerald text-[10px] font-bold flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" />
          Verified Analysis
        </span>
      </div>
      <div className="card-content space-y-5">
        {/* Strengths */}
        <div>
          <h4 className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 shadow-2xs" />
            Top Institutional Strengths
          </h4>
          <div className="space-y-2">
            {strengths.map(s => (
              <div key={s.label} className="flex items-center justify-between p-2.5 rounded-md bg-emerald-50/70 border border-emerald-200/80 text-xs hover:border-emerald-300 transition-colors">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-bold text-slate-800">{s.label}</span>
                </div>
                <span className="font-extrabold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200 shadow-2xs">{s.score.toFixed(1)} / 10</span>
              </div>
            ))}
          </div>
        </div>

        {/* Concerns */}
        <div>
          <h4 className="text-[11px] font-extrabold text-amber-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-600 shadow-2xs" />
            Improvement Areas
          </h4>
          <div className="space-y-2">
            {concerns.length > 0 ? concerns.map(c => (
              <div key={c.label} className="flex items-center justify-between p-2.5 rounded-md bg-amber-50/70 border border-amber-200/80 text-xs hover:border-amber-300 transition-colors">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span className="font-bold text-slate-800">{c.label}</span>
                </div>
                <span className="font-extrabold text-amber-800 bg-white px-2 py-0.5 rounded border border-amber-200 shadow-2xs">{c.score.toFixed(1)} / 10</span>
              </div>
            )) : (
              <p className="text-xs text-slate-500 italic p-2.5 rounded bg-slate-50 border border-slate-200">No major operational concerns identified.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


