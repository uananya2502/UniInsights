'use client';

import { useState, useEffect } from 'react';
import { UniversitySearch } from '@/components/dashboard/UniversitySearch';
import { UniversityData } from '@/lib/data-parser';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Users } from 'lucide-react';

export default function StudentsPage() {
  const [selectedUni, setSelectedUni] = useState('');
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
    { name: 'Positive', value: data.sentimentBreakdown.positive, color: '#10b981' },
    { name: 'Neutral', value: data.sentimentBreakdown.neutral, color: '#94a3b8' },
    { name: 'Negative', value: data.sentimentBreakdown.negative, color: '#ef4444' },
  ] : [];

  return (
    <div className="p-4 md:p-6 max-w-[1400px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Student Voice</h1>
          <p className="text-sm text-slate-500 mt-0.5">Explore student reviews and sentiment analysis</p>
        </div>
        <UniversitySearch onSelect={setSelectedUni} selected={selectedUni} />
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {!loading && data && (
        <div className="space-y-6 animate-slide-up">
          {/* Sentiment Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="card lg:col-span-2">
              <div className="card-header">
                <h3 className="card-title">Sentiment Distribution</h3>
              </div>
              <div className="card-content">
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sentimentData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                      <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px' }} />
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
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Breakdown</h3>
              </div>
              <div className="card-content flex flex-col items-center">
                <div className="h-[160px] w-[160px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" strokeWidth={2} stroke="white">
                        {sentimentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col gap-2 mt-3 w-full">
                  {sentimentData.map(s => (
                    <div key={s.name} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                        {s.name}
                      </span>
                      <span className="font-semibold text-slate-700">{s.value.toFixed(0)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!loading && !data && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-4">
            <Users className="w-7 h-7 text-purple-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-1">Select a University</h3>
          <p className="text-sm text-slate-500 max-w-sm">
            Choose a university to view student reviews and sentiment analysis.
          </p>
        </div>
      )}
    </div>
  );
}
