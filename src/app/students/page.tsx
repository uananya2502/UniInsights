'use client';

import { useState, useEffect } from 'react';
import { UniversitySearch } from '@/components/dashboard/UniversitySearch';
import { UniversityData } from '@/lib/data-parser';
import { MessageSquare, ThumbsUp, Minus, ThumbsDown, Filter, Database } from 'lucide-react';
import { SentimentDashboardView } from '@/components/dashboard/SentimentDashboardView';

interface Comment {
  university: string;
  category: string;
  sentiment: string;
  text: string;
}

const SENTIMENT_STYLES: Record<string, { label: string; bg: string; border: string; text: string; dot: string; icon: React.ElementType }> = {
  positive: { label: 'Positive', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500', icon: ThumbsUp },
  negative: { label: 'Negative', bg: 'bg-red-50',     border: 'border-red-200',     text: 'text-red-700',     dot: 'bg-red-500',     icon: ThumbsDown },
  neutral:  { label: 'Neutral',  bg: 'bg-slate-50',   border: 'border-slate-200',   text: 'text-slate-600',   dot: 'bg-slate-400',   icon: Minus },
};

const CATEGORIES = ['all', 'academics', 'placement', 'hostel', 'fees', 'infrastructure', 'student_experience'];

export default function StudentsPage() {
  const [selectedUni, setSelectedUni]       = useState('BML Munjal University');
  const [data, setData]                     = useState<UniversityData | null>(null);
  const [loading, setLoading]               = useState(false);

  // Comments state
  const [comments, setComments]             = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [sentimentFilter, setSentimentFilter] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [visibleCount, setVisibleCount]     = useState(10);

  // Fetch university stats
  useEffect(() => {
    if (!selectedUni) return;
    setLoading(true);
    fetch(`/api/data/universities?name=${encodeURIComponent(selectedUni)}`)
      .then(r => r.ok ? r.json() : null)
      .then(setData)
      .finally(() => setLoading(false));
  }, [selectedUni]);

  // Fetch actual comments from SQLite
  useEffect(() => {
    if (!selectedUni) return;
    setCommentsLoading(true);
    setVisibleCount(10);
    fetch(`/api/data/comments?university=${encodeURIComponent(selectedUni)}&limit=100`)
      .then(r => r.ok ? r.json() : { comments: [] })
      .then(d => setComments(d.comments || []))
      .finally(() => setCommentsLoading(false));
  }, [selectedUni]);

  // Filter comments client-side
  const filtered = comments.filter(c => {
    const sentOk = sentimentFilter === 'all' || (c.sentiment || '').toLowerCase().includes(sentimentFilter);
    const catOk  = categoryFilter  === 'all' || (c.category  || '').toLowerCase().includes(categoryFilter);
    return sentOk && catOk;
  });

  const counts = {
    positive: comments.filter(c => c.sentiment?.toLowerCase().includes('positive')).length,
    negative: comments.filter(c => c.sentiment?.toLowerCase().includes('negative')).length,
    neutral:  comments.filter(c => c.sentiment?.toLowerCase().includes('neutral')).length,
  };

  return (
    <div className="p-4 md:p-6 max-w-[1400px] mx-auto space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Student Feedback &amp; Review Analytics
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Aggregated student reviews, satisfaction metrics, and campus perception insights
          </p>
        </div>
        <UniversitySearch onSelect={setSelectedUni} selected={selectedUni} />
      </div>

      {/* Stats Dashboard */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 card bg-white">
          <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3" />
          <span className="text-xs font-bold text-slate-600">Extracting Verified Student Data...</span>
        </div>
      )}
      {!loading && data && (
        <div className="animate-slide-up">
          <SentimentDashboardView data={data} />
        </div>
      )}

      {/* ── RAW COMMENTS SECTION ── */}
      {!loading && data && (
        <div className="card bg-white animate-slide-up">
          {/* Section Header */}
          <div className="card-header flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Database className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-sm font-extrabold text-slate-900">Raw Student Comments</h2>
                <p className="text-[11px] text-slate-500 font-medium">
                  Actual YouTube comments · Classified by VADER Sentiment Analysis
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              {counts.positive} Positive &nbsp;
              <span className="w-2 h-2 rounded-full bg-slate-400 inline-block" />
              {counts.neutral} Neutral &nbsp;
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
              {counts.negative} Negative
            </div>
          </div>

          <div className="card-content">
            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center gap-1.5 mr-2">
                <Filter className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[11px] font-bold text-slate-600">Filter by:</span>
              </div>

              {/* Sentiment filter */}
              {(['all', 'positive', 'negative', 'neutral'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setSentimentFilter(s)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-all ${
                    sentimentFilter === s
                      ? s === 'positive' ? 'bg-emerald-600 text-white border-emerald-600'
                      : s === 'negative' ? 'bg-red-600 text-white border-red-600'
                      : s === 'neutral'  ? 'bg-slate-600 text-white border-slate-600'
                      : 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  {s === 'all' ? `All (${comments.length})` : `${s.charAt(0).toUpperCase() + s.slice(1)} (${counts[s as keyof typeof counts]})`}
                </button>
              ))}

              <div className="h-4 border-l border-slate-300 mx-1" />

              {/* Category filter */}
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="text-[11px] font-bold text-slate-700 bg-white border border-slate-200 rounded-md px-2 py-1 outline-none"
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c === 'all' ? 'All Categories' : c.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
                ))}
              </select>
            </div>

            {/* Loading state */}
            {commentsLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <span className="ml-3 text-xs font-bold text-slate-500">Loading comments from database...</span>
              </div>
            )}

            {/* No comments */}
            {!commentsLoading && filtered.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-bold text-slate-500">No comments found for the selected filters.</p>
                <p className="text-xs text-slate-400 mt-1">Try changing the sentiment or category filter.</p>
              </div>
            )}

            {/* Comment Cards */}
            {!commentsLoading && filtered.length > 0 && (
              <div className="space-y-3">
                {filtered.slice(0, visibleCount).map((comment, i) => {
                  const sentKey = (comment.sentiment || 'neutral').toLowerCase().includes('positive')
                    ? 'positive' : (comment.sentiment || '').toLowerCase().includes('negative')
                    ? 'negative' : 'neutral';
                  const style = SENTIMENT_STYLES[sentKey];
                  const Icon  = style.icon;

                  return (
                    <div
                      key={i}
                      className={`rounded-lg border p-3.5 ${style.bg} ${style.border} transition-all hover:shadow-sm`}
                    >
                      {/* Top row */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${style.bg} ${style.text} ${style.border}`}>
                            <Icon className="w-3 h-3" />
                            {style.label}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                            {(comment.category || 'General').replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">{comment.university}</span>
                      </div>

                      {/* Comment text */}
                      <p className="text-xs text-slate-700 leading-relaxed font-normal">
                        &ldquo;{comment.text}&rdquo;
                      </p>
                    </div>
                  );
                })}

                {/* Load more */}
                {filtered.length > visibleCount && (
                  <button
                    onClick={() => setVisibleCount(v => v + 10)}
                    className="w-full py-2.5 text-xs font-bold text-indigo-600 border border-indigo-200 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    Load More Comments ({filtered.length - visibleCount} remaining)
                  </button>
                )}

                <p className="text-center text-[11px] text-slate-400 font-medium pt-2">
                  Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} comments · Sentiment classified by VADER NLP
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!loading && !data && (
        <div className="flex flex-col items-center justify-center py-20 text-center card bg-white">
          <div className="w-14 h-14 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center mb-3">
            <MessageSquare className="w-6 h-6 text-slate-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">Select a Campus to Analyze Student Reviews</h3>
          <p className="text-xs text-slate-500 max-w-sm">
            Search for a university above to inspect verified student sentiment and feedback.
          </p>
        </div>
      )}
    </div>
  );
}
