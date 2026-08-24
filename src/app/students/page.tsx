'use client';

import { useState, useEffect } from 'react';
import { UniversitySearch } from '@/components/dashboard/UniversitySearch';
import { UniversityData } from '@/lib/data-parser';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { MessageSquare, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { SentimentExplainerCard } from '@/components/dashboard/SentimentExplainerCard';

export default function StudentsPage() {
  const [selectedUni, setSelectedUni] = useState('BML Munjal University');
  const [data, setData] = useState<UniversityData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedUni) return;
    setLoading(true);
    fetch(`/api/data/universities?name=${encodeURIComponent(selectedUni)}`)
      .then(r => r.ok ? r.json() : null)
      .then(setData)
      .finally(() => setLoading(false));
  }, [selectedUni]);

  const sentimentData = data ? [
    { name: 'Positive', value: data.sentimentBreakdown.positive, color: '#059669' },
    { name: 'Neutral', value: data.sentimentBreakdown.neutral, color: '#64748b' },
    { name: 'Negative', value: data.sentimentBreakdown.negative, color: '#dc2626' },
  ] : [];

  return (
    <div className="p-4 md:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* Formal Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/90">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase">
              Analytics Module
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 uppercase tracking-wider">
              Student Voice Engine
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Student Voice & Sentiment Analytics
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Empirical natural language sentiment breakdown synthesized across thousands of campus reviews
          </p>
        </div>
        <UniversitySearch onSelect={setSelectedUni} selected={selectedUni} />
      </div>

      {/* Formal Explainer Banner & KPI Brief */}
      <SentimentExplainerCard data={data} />

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 card bg-white">
          <div className="w-10 h-10 border-3 border-slate-800 border-t-transparent rounded-full animate-spin mb-3" />
          <span className="text-xs font-bold text-slate-600">Processing Campus Sentiment Data...</span>
        </div>
      )}

      {!loading && data && (
        <div className="space-y-6 animate-slide-up">
          {/* Main Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="card lg:col-span-2 bg-white border border-slate-200/90 shadow-2xs">
              <div className="card-header flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="card-title text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                    Sentiment Distribution Spectrum
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Categorized percentage share of evaluated student feedback</p>
                </div>
                <span className="badge border border-slate-200 bg-slate-50 text-slate-800 font-extrabold text-xs px-3 py-1">
                  {data.name}
                </span>
              </div>
              <div className="card-content pt-4">
                <div className="h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sentimentData} margin={{ top: 10, right: 10, left: -15, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#334155', fontWeight: 700 }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                      <YAxis tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} tickLine={false} axisLine={false} unit="%" />
                      <Tooltip 
                        formatter={(val: any) => [`${Number(val ?? 0).toFixed(1)}%`, 'Percentage Share']}
                        contentStyle={{ backgroundColor: '#0f172a', color: 'white', border: '1px solid #1e293b', borderRadius: '8px', fontSize: '12px', fontWeight: '600' }} 
                      />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={60}>
                        {sentimentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="card bg-white border border-slate-200/90 shadow-2xs">
              <div className="card-header border-b border-slate-100 pb-3">
                <h3 className="card-title text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                  Proportional Breakdown
                </h3>
                <p className="text-xs text-slate-500 font-medium">Overall sentiment composition share</p>
              </div>
              <div className="card-content pt-4 flex flex-col items-center">
                <div className="h-[170px] w-[170px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={48} outerRadius={72} dataKey="value" strokeWidth={2} stroke="white">
                        {sentimentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col gap-2 mt-4 w-full">
                  {sentimentData.map(s => (
                    <div key={s.name} className="flex items-center justify-between text-xs font-semibold p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                      <span className="flex items-center gap-2 text-slate-800">
                        <span className="w-2.5 h-2.5 rounded-full shadow-2xs" style={{ backgroundColor: s.color }} />
                        {s.name} Category
                      </span>
                      <span className="font-extrabold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
                        {s.value.toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Top Discussed Sentiment Topics */}
          {data.trendingTopics && data.trendingTopics.length > 0 && (
            <div className="card bg-white border border-slate-200/90 shadow-2xs">
              <div className="card-header border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="card-title text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                    Key Institutional Discussion Themes
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Frequently mentioned campus themes and their observed sentiment trajectories</p>
                </div>
                <span className="text-[10px] font-extrabold text-slate-500 bg-slate-100 px-2.5 py-1 rounded border border-slate-200 uppercase tracking-wider">
                  Top 10 Themes
                </span>
              </div>
              <div className="card-content pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
                  {data.trendingTopics.slice(0, 10).map((topic) => {
                    const isRising = topic.trend === 'rising';
                    const isDeclining = topic.trend === 'declining';
                    return (
                      <div 
                        key={topic.keyword} 
                        className="p-3.5 rounded-xl border border-slate-200/90 bg-slate-50/60 hover:bg-white hover:border-slate-300 transition-all flex flex-col justify-between space-y-2 shadow-2xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-slate-900 tracking-tight">{topic.keyword}</span>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded border flex items-center gap-1 ${
                            isRising ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                            isDeclining ? 'bg-rose-50 text-rose-800 border-rose-200' :
                            'bg-slate-100 text-slate-700 border-slate-200'
                          }`}>
                            {isRising ? <TrendingUp className="w-3 h-3 text-emerald-600" /> :
                             isDeclining ? <TrendingDown className="w-3 h-3 text-rose-600" /> :
                             <Minus className="w-3 h-3 text-slate-500" />}
                            {topic.trend.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-600 font-medium flex items-center justify-between pt-1 border-t border-slate-200/60">
                          <span>Volume</span>
                          <span className="font-extrabold text-slate-800">{topic.count} Mentions</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

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


