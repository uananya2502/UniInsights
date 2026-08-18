'use client';

import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TimelinePoint } from '@/lib/data-parser';
import { DoodleSparkle } from '@/components/ui/Doodles';

interface ReputationTimelineProps {
  data: TimelinePoint[];
  universityName: string;
}

export function ReputationTimeline({ data }: ReputationTimelineProps) {
  return (
    <div className="card h-full animate-slide-up">
      <div className="card-header flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="card-title text-slate-900">Reputation & Engagement Timeline</h3>
            <DoodleSparkle className="w-3.5 h-3.5 text-blue-500/70" />
          </div>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">Historical trend of student discussions and sentiment trajectory</p>
        </div>
        <div className="flex items-center gap-3 text-xs font-bold">
          <span className="flex items-center gap-1.5 text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-2xs" />
            Mentions
          </span>
          <span className="flex items-center gap-1.5 text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-600 shadow-2xs" />
            Sentiment Score
          </span>
        </div>
      </div>
      <div className="card-content">
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
                interval={3}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  color: 'white',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
                  fontSize: '12px',
                  fontWeight: 600
                }}
                itemStyle={{ color: '#f8fafc' }}
                labelStyle={{ color: '#94a3b8', fontWeight: 700, marginBottom: '4px' }}
              />
              <Area
                type="monotone"
                dataKey="mentions"
                stroke="#2563eb"
                strokeWidth={2.5}
                fill="url(#blueGrad)"
                dot={false}
                activeDot={{ r: 5, strokeWidth: 2, fill: '#ffffff' }}
              />
              <Area
                type="monotone"
                dataKey="sentiment"
                stroke="#0d9488"
                strokeWidth={2.5}
                fill="url(#tealGrad)"
                dot={false}
                activeDot={{ r: 5, strokeWidth: 2, fill: '#ffffff' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}


