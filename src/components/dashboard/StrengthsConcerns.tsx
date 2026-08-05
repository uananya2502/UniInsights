'use client';

import { CheckCircle2, AlertTriangle } from 'lucide-react';
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
    { label: 'Hostel', score: data.categoryScores.hostel },
    { label: 'Fees Structure', score: data.categoryScores.fees },
  ];

  const sorted = [...metrics].sort((a, b) => b.score - a.score);
  const strengths = sorted.slice(0, 3);
  const concerns = sorted.slice(3).filter(c => c.score < 8.0);

  return (
    <div className="card h-full animate-slide-up">
      <div className="card-header">
        <h3 className="card-title">Strengths vs Concerns</h3>
      </div>
      <div className="card-content space-y-6">
        {/* Strengths */}
        <div>
          <h4 className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-3">Notable Strengths</h4>
          <div className="space-y-2.5">
            {strengths.map(s => (
              <div key={s.label} className="flex items-center gap-3 p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-slate-800">{s.label}</span>
                </div>
                <span className="text-sm font-bold text-emerald-600">{s.score.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Concerns */}
        <div>
          <h4 className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-3">Areas of Concern</h4>
          <div className="space-y-2.5">
            {concerns.length > 0 ? concerns.map(c => (
              <div key={c.label} className="flex items-center gap-3 p-2.5 rounded-lg bg-amber-50/50 border border-amber-100">
                <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-slate-800">{c.label}</span>
                </div>
                <span className="text-sm font-bold text-amber-600">{c.score.toFixed(1)}</span>
              </div>
            )) : (
              <p className="text-sm text-slate-400 italic p-2.5">No significant concerns identified.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
