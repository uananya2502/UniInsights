'use client';

import { useState } from 'react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Area, 
  AreaChart, 
  Bar, 
  Line, 
  ComposedChart, 
  ReferenceLine 
} from 'recharts';
import { TimelinePoint } from '@/lib/data-parser';

interface ReputationTimelineProps {
  data: TimelinePoint[];
  universityName: string;
}

export function ReputationTimeline({ data }: ReputationTimelineProps) {
  const [viewMode, setViewMode] = useState<'combo' | 'mentions' | 'sentiment'>('combo');

  return (
    <div className="card h-full animate-slide-up">
      <div className="card-header flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Reputation & Engagement Timeline</h3>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            {viewMode === 'combo' && 'Bar & Line Combo: Student Volume (Bars) vs Sentiment Rating 0–10 (Line)'}
            {viewMode === 'mentions' && 'Student Discussion Volume over time (Post count)'}
            {viewMode === 'sentiment' && 'Sentiment Trajectory Score over time (Scale 0.0 to 10.0)'}
          </p>
        </div>

        {/* View Mode Toggle Buttons */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-bold flex-shrink-0">
          <button
            onClick={() => setViewMode('combo')}
            className={`px-2.5 py-1 rounded-md transition-all ${viewMode === 'combo' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Combined View
          </button>
          <button
            onClick={() => setViewMode('mentions')}
            className={`px-2.5 py-1 rounded-md transition-all ${viewMode === 'mentions' ? 'bg-[#0B1527] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Mentions Only
          </button>
          <button
            onClick={() => setViewMode('sentiment')}
            className={`px-2.5 py-1 rounded-md transition-all ${viewMode === 'sentiment' ? 'bg-teal-700 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Sentiment (0-10)
          </button>
        </div>
      </div>

      <div className="card-content">
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            {viewMode === 'combo' ? (
              <ComposedChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} interval={3} />
                <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#3b82f6', fontWeight: 600 }} tickLine={false} axisLine={false} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 10]} tick={{ fontSize: 11, fill: '#0d9488', fontWeight: 700 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}/10`} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const mentions = payload.find(p => p.dataKey === 'mentions')?.value;
                      const sentiment = payload.find(p => p.dataKey === 'sentiment')?.value;
                      const scoreNum = Number(sentiment || 0);

                      let statusText = 'Positive';
                      if (scoreNum >= 8.0) statusText = 'Very Positive';
                      else if (scoreNum >= 6.5) statusText = 'Positive';
                      else if (scoreNum >= 5.0) statusText = 'Neutral / Mixed';
                      else statusText = 'Needs Improvement';

                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-lg border border-slate-700 shadow-xl text-xs space-y-1.5">
                          <p className="font-extrabold text-slate-300 border-b border-slate-700 pb-1">{label}</p>
                          <p className="text-blue-400 font-bold flex items-center justify-between gap-4">
                            <span>Discussion Volume:</span>
                            <span className="text-white font-extrabold">{mentions} posts</span>
                          </p>
                          <p className="text-teal-400 font-bold flex items-center justify-between gap-4">
                            <span>Sentiment Rating:</span>
                            <span className="text-white font-extrabold">{scoreNum.toFixed(1)} / 10 ({statusText})</span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                {/* Volume as subtle Light Blue Bars */}
                <Bar yAxisId="left" dataKey="mentions" fill="#93c5fd" radius={[4, 4, 0, 0]} opacity={0.6} barSize={14} />
                {/* Sentiment Rating as Crisp Teal Line */}
                <Line yAxisId="right" type="monotone" dataKey="sentiment" stroke="#0d9488" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#ffffff', stroke: '#0d9488', strokeWidth: 2 }} />
              </ComposedChart>
            ) : viewMode === 'mentions' ? (
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="blueOnly" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} interval={3} />
                <YAxis tick={{ fontSize: 11, fill: '#2563eb', fontWeight: 600 }} tickLine={false} axisLine={false} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-lg border border-slate-700 shadow-xl text-xs">
                          <p className="font-bold text-slate-300 mb-1">{label}</p>
                          <p className="text-blue-400 font-extrabold">{payload[0].value} Discussion Mentions</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="mentions" stroke="#2563eb" strokeWidth={2.5} fill="url(#blueOnly)" dot={false} activeDot={{ r: 5, fill: '#ffffff' }} />
              </AreaChart>
            ) : (
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="tealOnly" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} interval={3} />
                <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#0d9488', fontWeight: 700 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}/10`} />
                <ReferenceLine y={8.0} stroke="#059669" strokeDasharray="3 3" label={{ value: 'High Benchmark (8.0)', fill: '#059669', fontSize: 10, fontWeight: 700 }} />
                <ReferenceLine y={6.0} stroke="#d97706" strokeDasharray="3 3" label={{ value: 'Average Benchmark (6.0)', fill: '#d97706', fontSize: 10, fontWeight: 700 }} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const val = Number(payload[0].value || 0);
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-lg border border-slate-700 shadow-xl text-xs">
                          <p className="font-bold text-slate-300 mb-1">{label}</p>
                          <p className="text-teal-400 font-extrabold">Sentiment Score: {val.toFixed(1)} / 10</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="sentiment" stroke="#0d9488" strokeWidth={3} fill="url(#tealOnly)" dot={false} activeDot={{ r: 6, fill: '#ffffff' }} />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}




