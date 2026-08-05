'use client';

import { UniversityData } from '@/lib/data-parser';
import { BookOpen, Building2, Briefcase, UserCheck, Home, DollarSign } from 'lucide-react';

interface ReportCardProps {
  data: UniversityData;
}

function ScoreRing({ score, size = 120 }: { score: number; size?: number }) {
  const percentage = (score / 10) * 100;
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let color = '#2563eb';
  if (percentage >= 80) color = '#10b981';
  else if (percentage >= 60) color = '#2563eb';
  else if (percentage >= 40) color = '#f59e0b';
  else color = '#ef4444';

  return (
    <div className="score-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="#e2e8f0" strokeWidth="8"
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <div className="score-value">
        <span className="text-2xl font-bold text-slate-900">{score.toFixed(1)}</span>
        <span className="text-xs text-slate-400">/10</span>
      </div>
    </div>
  );
}

const categoryConfig = [
  { key: 'academics', label: 'Academics', icon: BookOpen, gradient: 'from-blue-500 to-blue-600' },
  { key: 'placement', label: 'Placement', icon: Briefcase, gradient: 'from-emerald-500 to-emerald-600' },
  { key: 'infrastructure', label: 'Infrastructure', icon: Building2, gradient: 'from-indigo-500 to-indigo-600' },
  { key: 'studentExperience', label: 'Experience', icon: UserCheck, gradient: 'from-purple-500 to-purple-600' },
  { key: 'hostel', label: 'Hostel', icon: Home, gradient: 'from-amber-500 to-amber-600' },
  { key: 'fees', label: 'Fees', icon: DollarSign, gradient: 'from-teal-500 to-teal-600' },
];

export function UniversityReportCard({ data }: ReportCardProps) {
  return (
    <div className="card animate-slide-up">
      <div className="card-header flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">{data.name}</h2>
          <p className="text-sm text-slate-500 mt-0.5">University Report Card</p>
        </div>
        <ScoreRing score={data.overallScore} />
      </div>
      <div className="card-content">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categoryConfig.map((cat) => {
            const score = data.categoryScores[cat.key as keyof typeof data.categoryScores];
            const pct = (score / 10) * 100;
            return (
              <div
                key={cat.key}
                className="group p-3.5 rounded-lg border border-slate-100 hover:border-slate-200 bg-white hover:shadow-sm transition-all cursor-default"
              >
                <div className="flex items-center gap-2 mb-2.5">
                  <div className={`w-7 h-7 rounded-md bg-gradient-to-br ${cat.gradient} flex items-center justify-center`}>
                    <cat.icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-xs font-medium text-slate-500">{cat.label}</span>
                </div>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="text-xl font-bold text-slate-900">{score.toFixed(1)}</span>
                  <span className="text-xs text-slate-400">/10</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div
                    className={`bg-gradient-to-r ${cat.gradient} h-1.5 rounded-full transition-all duration-700`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
