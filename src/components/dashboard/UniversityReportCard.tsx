'use client';

import { UniversityData } from '@/lib/data-parser';
import { BookOpen, Building2, Briefcase, UserCheck, Home, DollarSign } from 'lucide-react';
import { DoodleUnderline, DoodleSparkle } from '@/components/ui/Doodles';

interface ReportCardProps {
  data: UniversityData;
}

function ScoreRing({ score, size = 110 }: { score: number; size?: number }) {
  const percentage = (score / 10) * 100;
  const strokeWidth = 8;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let strokeColor = '#2563eb';
  if (score >= 8.0) strokeColor = '#059669';
  else if (score >= 6.5) strokeColor = '#2563eb';
  else if (score >= 5.0) strokeColor = '#d97706';
  else strokeColor = '#dc2626';

  return (
    <div className="score-ring flex-shrink-0 relative group" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="#f1f5f9" strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={strokeColor} strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
        />
      </svg>
      <div className="score-value">
        <span className="text-2xl font-extrabold text-slate-900 tracking-tight">{score.toFixed(1)}</span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Score / 10</span>
      </div>
    </div>
  );
}

const categoryConfig = [
  { key: 'academics', label: 'Academics', icon: BookOpen, bg: 'bg-blue-50/80 border-blue-200/80', iconColor: 'text-blue-700', barColor: 'bg-blue-600' },
  { key: 'placement', label: 'Placement', icon: Briefcase, bg: 'bg-emerald-50/80 border-emerald-200/80', iconColor: 'text-emerald-700', barColor: 'bg-emerald-600' },
  { key: 'infrastructure', label: 'Infrastructure', icon: Building2, bg: 'bg-slate-100 border-slate-200', iconColor: 'text-slate-700', barColor: 'bg-slate-700' },
  { key: 'studentExperience', label: 'Experience', icon: UserCheck, bg: 'bg-purple-50/80 border-purple-200/80', iconColor: 'text-purple-700', barColor: 'bg-purple-600' },
  { key: 'hostel', label: 'Hostel', icon: Home, bg: 'bg-amber-50/80 border-amber-200/80', iconColor: 'text-amber-700', barColor: 'bg-amber-600' },
  { key: 'fees', label: 'Fees', icon: DollarSign, bg: 'bg-teal-50/80 border-teal-200/80', iconColor: 'text-teal-700', barColor: 'bg-teal-600' },
];

import { getCampusImageUrl, DEFAULT_CAMPUS_IMAGE } from '@/lib/campus-images';

export function UniversityReportCard({ data }: ReportCardProps) {
  const campusImg = getCampusImageUrl(data.name);

  return (
    <div className="card animate-slide-up overflow-hidden">
      {/* Header Banner with Dedicated Campus Photo Thumbnail */}
      <div className="card-header flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 md:p-6 bg-white border-b border-slate-100">
        <div className="flex items-center gap-4">
          {/* Dedicated Campus Photo Thumbnail Card */}
          <div className="w-28 h-20 sm:w-32 sm:h-20 md:w-36 md:h-22 rounded-xl border border-slate-200/90 overflow-hidden flex-shrink-0 shadow-2xs relative bg-slate-100 group">
            <img 
              src={campusImg}
              alt={`${data.name} Campus`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = DEFAULT_CAMPUS_IMAGE;
              }}
            />
          </div>



          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative inline-block">
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">{data.name}</h2>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Comprehensive Performance Metrics Breakdown</p>
          </div>
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
                className="p-3.5 rounded-lg border border-slate-200/80 bg-slate-50/40 hover:bg-white hover:border-slate-300 hover:shadow-2xs transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-7 h-7 rounded-md border ${cat.bg} flex items-center justify-center flex-shrink-0 shadow-2xs`}>
                    <cat.icon className={`w-3.5 h-3.5 ${cat.iconColor}`} />
                  </div>
                  <span className="text-xs font-bold text-slate-800">{cat.label}</span>
                </div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-lg font-extrabold text-slate-900 tracking-tight">{score.toFixed(1)}</span>
                  <span className="text-[11px] font-bold text-slate-500">{pct.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-slate-200/80 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`${cat.barColor} h-1.5 rounded-full transition-all duration-500`}
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


