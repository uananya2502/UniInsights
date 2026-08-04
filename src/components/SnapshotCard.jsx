import React from 'react';
import { Sparkles, MessageSquare, Video, Calendar, ThumbsUp } from 'lucide-react';

export default function SnapshotCard({ snapshot, univName }) {
  if (!snapshot) return null;

  return (
    <div id="snapshot" className="relative glass-card rounded-3xl p-8 border border-brand-200/80 bg-gradient-to-br from-white via-brand-50/40 to-sky-50/30 mb-12 shadow-glass overflow-hidden">
      {/* Decorative Top Accent Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-brand-300/20 via-sky-300/10 to-transparent blur-2xl rounded-full pointer-events-none" />

      {/* Header Badge */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-600 text-white text-xs font-bold shadow-md shadow-brand-500/20">
          <Sparkles className="w-4 h-4 text-sky-200" />
          <span>AI University Snapshot</span>
        </div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 bg-white/80 px-3 py-1.5 rounded-xl border border-slate-200">
          <Calendar className="w-3.5 h-3.5 text-brand-500" />
          <span>Discussion Period: {snapshot.discussion_period}</span>
        </div>
      </div>

      {/* Executive Summary Paragraph */}
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
          Executive Social Intelligence Overview
        </h2>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal bg-white/70 p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          {snapshot.text}
        </p>
      </div>

      {/* Four Core Metric Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center space-x-2 text-emerald-600 text-xs font-bold mb-1">
            <ThumbsUp className="w-4 h-4" />
            <span>Overall Sentiment</span>
          </div>
          <p className="text-xl font-extrabold text-slate-900">{snapshot.overall_sentiment}</p>
          <p className="text-xs text-slate-500 mt-0.5">{snapshot.positive_pct}% Positive</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center space-x-2 text-brand-600 text-xs font-bold mb-1">
            <Video className="w-4 h-4" />
            <span>Total Videos</span>
          </div>
          <p className="text-xl font-extrabold text-slate-900">{snapshot.total_videos.toLocaleString()}</p>
          <p className="text-xs text-slate-500 mt-0.5">Analyzed Transcripts</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center space-x-2 text-sky-600 text-xs font-bold mb-1">
            <MessageSquare className="w-4 h-4" />
            <span>Total Comments</span>
          </div>
          <p className="text-xl font-extrabold text-slate-900">{snapshot.total_comments.toLocaleString()}</p>
          <p className="text-xs text-slate-500 mt-0.5">NLP Processed</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center space-x-2 text-purple-600 text-xs font-bold mb-1">
            <Sparkles className="w-4 h-4" />
            <span>RAG Model</span>
          </div>
          <p className="text-xl font-extrabold text-slate-900">pgvector + RAG</p>
          <p className="text-xs text-slate-500 mt-0.5">Zero Hallucination</p>
        </div>
      </div>
    </div>
  );
}
