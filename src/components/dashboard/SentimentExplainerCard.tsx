'use client';

import { useState } from 'react';
import { 
  BarChart3, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  FileText,
  Target,
  ThumbsUp,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { UniversityData } from '@/lib/data-parser';

interface SentimentExplainerCardProps {
  data?: UniversityData | null;
}

export function SentimentExplainerCard({ data }: SentimentExplainerCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const posVal = data?.sentimentBreakdown.positive ?? 0;
  const neuVal = data?.sentimentBreakdown.neutral ?? 0;
  const negVal = data?.sentimentBreakdown.negative ?? 0;

  let perceptionLabel = 'Favorable Consensus';
  let perceptionBadgeStyle = 'bg-emerald-50 text-emerald-800 border-emerald-300';
  let perceptionSummary = `Based on aggregated student feedback, ${data?.name || 'this institution'} demonstrates a predominantly positive consensus, driven primarily by academic standards and campus infrastructure.`;

  if (posVal >= 65) {
    perceptionLabel = 'Highly Favorable Consensus';
    perceptionBadgeStyle = 'bg-emerald-50 text-emerald-800 border-emerald-300';
    perceptionSummary = `Based on aggregated student feedback, ${data?.name} maintains an exceptionally high student satisfaction score across academic programs, faculty support, and campus facilities.`;
  } else if (posVal >= 45) {
    perceptionLabel = 'Balanced Perception';
    perceptionBadgeStyle = 'bg-slate-100 text-slate-800 border-slate-300';
    perceptionSummary = `Analysis indicates a balanced perception for ${data?.name}, combining strong academic & placement praise alongside constructive feedback regarding fee structures and administrative procedures.`;
  } else if (negVal > 25) {
    perceptionLabel = 'Mixed Sentiment Index';
    perceptionBadgeStyle = 'bg-amber-50 text-amber-800 border-amber-300';
    perceptionSummary = `Student feedback for ${data?.name} indicates areas requiring institutional attention, particularly concerning fee transparency, hostel amenities, or administrative policies.`;
  }

  return (
    <div className="space-y-5">
      {/* Formal Methodology & Framework Card */}
      <div className="card bg-white border border-slate-200/90 shadow-2xs overflow-hidden">
        {/* Top Accent Line */}
        <div className="h-1 bg-gradient-to-r from-slate-800 via-indigo-900 to-slate-700" />
        
        <div className="p-5 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase">
                  Framework & Methodology
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 uppercase tracking-wider">
                  Sentiment Intelligence Engine
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-extrabold text-slate-900 tracking-tight">
                Student Sentiment Evaluation Methodology
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Standardized natural language categorization of verified campus feedback and student discussions
              </p>
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 shrink-0 shadow-2xs"
            >
              {isExpanded ? (
                <>
                  <span>Collapse Framework</span>
                  <ChevronUp className="w-4 h-4 text-slate-500" />
                </>
              ) : (
                <>
                  <span>Expand Framework</span>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </>
              )}
            </button>
          </div>

          {/* Formal Structured Content */}
          {isExpanded && (
            <div className="mt-5 pt-5 border-t border-slate-100 space-y-5 animate-slide-up">
              {/* Definition & Objective Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wide">
                    <FileText className="w-4 h-4 text-slate-700" />
                    <span>01 | Sentiment Definition</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Student sentiment represents the aggregated qualitative feedback, experiences, and evaluations documented by verified students across academic forums, review boards, and campus communities.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wide">
                    <Target className="w-4 h-4 text-slate-700" />
                    <span>02 | Analytical Objective</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Traditional promotional materials provide a single perspective. By categorizing student feedback into structured sentiment metrics, UniInsights provides prospective students with an empirical, multi-dimensional view of campus reality.
                  </p>
                </div>
              </div>

              {/* 3 Classification Standard Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Positive */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-all border-l-4 border-l-emerald-600">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                      Favorable Sentiment
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Positive
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Student praise regarding high placement figures, distinguished faculty, modern lab infrastructure, and active campus culture.
                  </p>
                </div>

                {/* Neutral */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-400 transition-all border-l-4 border-l-slate-500">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-600" />
                      Informational Sentiment
                    </span>
                    <span className="text-[10px] font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      Neutral
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Objective course discussions, syllabus inquiries, admission criteria updates, and non-evaluative campus queries.
                  </p>
                </div>

                {/* Negative */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-rose-300 transition-all border-l-4 border-l-rose-600">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                      Areas of Concern
                    </span>
                    <span className="text-[10px] font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      Constructive
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Constructive criticism concerning tuition costs, mess catering, mandatory attendance rules, or administrative overhead.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Institutional Perception Brief (Formal KPI Card) */}
      {data && (
        <div className="card bg-white border border-slate-200/90 shadow-2xs p-5 md:p-6 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-4 border-b border-slate-100">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase">
                  Institutional Sentiment Profile
                </span>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${perceptionBadgeStyle}`}>
                  {perceptionLabel}
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                {data.name} — Executive Sentiment Summary
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-2xl font-normal">
                {perceptionSummary}
              </p>
            </div>

            {/* Formal KPI Metric Grid */}
            <div className="grid grid-cols-3 gap-3 bg-slate-50/80 p-3 rounded-xl border border-slate-200/80 shrink-0">
              <div className="text-center px-3 py-1">
                <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-0.5">
                  Reviews Analyzed
                </span>
                <span className="text-base font-black text-slate-900">
                  {data.totalMentions.toLocaleString()}
                </span>
              </div>
              <div className="text-center px-3 py-1 border-x border-slate-200">
                <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-0.5">
                  Positive Share
                </span>
                <span className="text-base font-black text-emerald-700">
                  {posVal.toFixed(1)}%
                </span>
              </div>
              <div className="text-center px-3 py-1">
                <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block mb-0.5">
                  Index Score
                </span>
                <span className="text-base font-black text-slate-900">
                  {data.overallScore.toFixed(1)} <span className="text-xs text-slate-500 font-semibold">/ 10</span>
                </span>
              </div>
            </div>
          </div>

          {/* Key Drivers (Formal Tags) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-slate-800 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                Primary Praise Drivers:
              </span>
              {data.strengths.map((str) => (
                <span 
                  key={str} 
                  className="bg-emerald-50 text-emerald-900 border border-emerald-200/90 px-2.5 py-1 rounded-md font-bold text-[11px] flex items-center gap-1.5 shadow-2xs"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  {str}
                </span>
              ))}
            </div>

            {data.concerns.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-extrabold text-slate-800 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Primary Focus Areas:
                </span>
                {data.concerns.map((con) => (
                  <span 
                    key={con} 
                    className="bg-amber-50 text-amber-900 border border-amber-200/90 px-2.5 py-1 rounded-md font-bold text-[11px] flex items-center gap-1.5 shadow-2xs"
                  >
                    {con}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
