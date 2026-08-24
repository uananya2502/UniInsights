'use client';

import { useState } from 'react';
import { 
  Heart, 
  HelpCircle, 
  AlertCircle, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Lightbulb
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

  return (
    <div className="space-y-4">
      {/* Clean Explainer Card */}
      <div className="card bg-white border border-slate-200/80 shadow-2xs">
        <div className="p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">
                  What is Student Sentiment & Why Do We Calculate It?
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  A simple guide to understanding how student feedback is summarized across Indian campuses
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 shrink-0"
            >
              {isExpanded ? (
                <>
                  <span>Hide Details</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>What & Why?</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Plain Language Explanation */}
          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-4 text-xs text-slate-600 animate-slide-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/70 space-y-1">
                  <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-blue-600" /> What is Student Sentiment?
                  </span>
                  <p className="leading-relaxed text-[12px]">
                    Student sentiment represents the overall feelings, opinions, and experiences shared by current and former students. Instead of relying only on official brochures, we look at thousands of real student reviews, discussion threads, and feedback to understand what campus life is actually like.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/70 space-y-1">
                  <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-600" /> Why Do We Calculate It?
                  </span>
                  <p className="leading-relaxed text-[12px]">
                    Every college has areas where it excels and areas that need improvement. By grouping student voices into <strong>Positive</strong>, <strong>Neutral</strong>, and <strong>Negative</strong> categories, we help prospective students see an honest, balanced picture before making one of the biggest decisions of their life.
                  </p>
                </div>
              </div>

              {/* 3 Sentiment Breakdown Boxes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200/80">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-xs mb-1">
                    <Heart className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" /> Positive Feedback
                  </div>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    Things students love: great placement records, supportive faculty, modern labs, and vibrant student culture.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-100/80 border border-slate-200">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs mb-1">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-600" /> Neutral Feedback
                  </div>
                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    General factual observations: course structures, admission guidelines, routine updates, and standard queries.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-rose-50/70 border border-rose-200/80">
                  <div className="flex items-center gap-1.5 font-bold text-rose-900 text-xs mb-1">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-600" /> Constructive Criticism
                  </div>
                  <p className="text-[11px] text-rose-800 leading-relaxed">
                    Areas needing improvement: high tuition fees, strict attendance rules, mess food complaints, or administrative delays.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* University Sentiment Brief */}
      {data && (
        <div className="card bg-white p-4 border border-slate-200/80 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Campus Perception Brief</span>
              <h3 className="text-base font-extrabold text-slate-900">
                {data.name} Sentiment Summary
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                Based on student feedback, {data.name} has a <strong>{posVal.toFixed(0)}% positive rating</strong> across placements, academics, and campus facilities.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200/70 shrink-0">
              <div className="text-center px-2">
                <div className="text-lg font-black text-slate-900">{data.totalMentions.toLocaleString()}</div>
                <div className="text-[10px] font-semibold text-slate-500">Student Reviews</div>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-center px-2">
                <div className="text-lg font-black text-emerald-600">{posVal.toFixed(0)}%</div>
                <div className="text-[10px] font-semibold text-slate-500">Positive Share</div>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-center px-2">
                <div className="text-lg font-black text-slate-700">{data.overallScore.toFixed(1)}/10</div>
                <div className="text-[10px] font-semibold text-slate-500">Overall Rating</div>
              </div>
            </div>
          </div>

          {/* Strengths & Concerns */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-700 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> Key Strengths:
              </span>
              {data.strengths.map((str) => (
                <span key={str} className="bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2 py-0.5 rounded font-semibold text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {str}
                </span>
              ))}
            </div>

            {data.concerns.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-slate-700 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Key Concerns:
                </span>
                {data.concerns.map((con) => (
                  <span key={con} className="bg-amber-50 text-amber-800 border border-amber-200/80 px-2 py-0.5 rounded font-semibold text-[11px] flex items-center gap-1">
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
