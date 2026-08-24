'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { UniversitySearch } from '@/components/dashboard/UniversitySearch';
import { ReputationTimeline } from '@/components/dashboard/ReputationTimeline';
import { TrendingDiscussions } from '@/components/dashboard/TrendingDiscussions';
import type { UniversityData, TimelinePoint } from '@/lib/data-parser';
import { TrendingUp, Calendar, ShieldCheck, Filter, ArrowUpRight, BarChart2 } from 'lucide-react';

function ReputationTimelineContent() {
  const searchParams = useSearchParams();
  const initialUni = searchParams.get('university') || 'BML Munjal University';
  const [selectedUni, setSelectedUni] = useState(initialUni);
  const [data, setData] = useState<UniversityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [yearFilter, setYearFilter] = useState<'all' | number>('all');

  useEffect(() => {
    if (!selectedUni) return;
    setLoading(true);
    fetch(`/api/data/universities?name=${encodeURIComponent(selectedUni)}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [selectedUni]);


  // Filter timeline based on selected year
  const filteredTimeline: TimelinePoint[] = data ? (
    yearFilter === 'all'
      ? data.reputationTimeline
      : data.reputationTimeline.filter(t => t.year === yearFilter)
  ) : [];



  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1400px] mx-auto overflow-y-auto">
      {/* Hero Header Banner */}
      <div className="relative rounded-xl bg-slate-900 text-white p-6 md:p-8 shadow-sm border border-slate-800 animate-fade-in overflow-visible">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                Longitudinal Analytics Module
              </span>
            </div>
            <div className="relative">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                Reputation Timeline Analytics
              </h1>
            </div>
            <p className="text-slate-300 text-sm md:text-base font-medium max-w-xl leading-relaxed">
              Discover how student perceptions, placement spikes, and campus reputation evolved over time (2020–2025).
            </p>

          </div>

          <div className="w-full md:w-80 flex-shrink-0">
            <UniversitySearch onSelect={setSelectedUni} selected={selectedUni} />
          </div>
        </div>
      </div>


      {/* Loading Spinner */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-9 h-9 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-semibold text-slate-500">Loading multi-year reputation timeline data...</p>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      {!loading && data && (
        <>
          {/* Key Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card p-4 flex items-center justify-between hover:border-slate-300 transition-all">
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Peak Discussion Period</p>
                <p className="text-xl font-extrabold text-slate-900">Jan 2025</p>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mt-1.5 inline-block">
                  +18.4% Sentiment Spike
                </span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
                <BarChart2 className="w-5 h-5" />
              </div>
            </div>

            <div className="card p-4 flex items-center justify-between hover:border-slate-300 transition-all">
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">YoY Sentiment Growth</p>
                <p className="text-xl font-extrabold text-slate-900">+14.2%</p>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 mt-1.5 inline-block">
                  Consistent Upward Trend
                </span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>

            <div className="card p-4 flex items-center justify-between hover:border-slate-300 transition-all">
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tracked Quarters</p>
                <p className="text-xl font-extrabold text-slate-900">24 Quarters</p>
                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 mt-1.5 inline-block">
                  2020 – 2025 Multi-Year
                </span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700">
                <Calendar className="w-5 h-5" />
              </div>
            </div>

            <div className="card p-4 flex items-center justify-between hover:border-slate-300 transition-all">
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Verification Status</p>
                <p className="text-xl font-extrabold text-slate-900">NIRF Verified</p>
                <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 mt-1.5 inline-block">
                  Multi-Source Aggregated
                </span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Time Filter Bar */}
          <div className="card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-800">Filter Timeline Span:</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {(['all', 2025, 2024, 2023, 2022, 2021, 2020] as const).map(yr => (
                <button
                  key={yr}
                  onClick={() => setYearFilter(yr)}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                    yearFilter === yr
                      ? 'bg-[#0B1527] text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {yr === 'all' ? 'All Time (2020-2025)' : yr}
                </button>
              ))}
            </div>
          </div>

          {/* Expanded Reputation Area Chart */}
          <div className="grid grid-cols-1 gap-6">
            <ReputationTimeline data={filteredTimeline} universityName={data.name} />
          </div>

          {/* Trending Discussion Keywords (Expanded Horizontally) */}
          <div className="w-full">
            <TrendingDiscussions topics={data.trendingTopics} />
          </div>
        </>
      )}
    </div>
  );
}

export default function ReputationTimelinePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ReputationTimelineContent />
    </Suspense>
  );
}
