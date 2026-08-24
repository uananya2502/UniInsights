'use client';

import { useState, useEffect } from 'react';
import { UniversitySearch } from '@/components/dashboard/UniversitySearch';
import { UniversityData } from '@/lib/data-parser';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { MessageSquare, Users } from 'lucide-react';


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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Student Voice & Sentiment Intelligence</h1>
            <p className="text-xs text-slate-500">Natural language sentiment breakdown across thousands of campus reviews</p>
          </div>
        </div>
        <UniversitySearch onSelect={setSelectedUni} selected={selectedUni} />
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="w-9 h-9 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {!loading && data && (
        <div className="space-y-6 animate-slide-up">
          {/* Sentiment Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="card lg:col-span-2">
              <div className="card-header flex items-center justify-between">
                <h3 className="card-title">Sentiment Distribution Spectrum</h3>
                <span className="badge badge-blue">{data.name}</span>
              </div>
              <div className="card-content">
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sentimentData} margin={{ top: 10, right: 10, left: -15, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#475569', fontWeight: 600 }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                      <YAxis tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: 'white', border: '1px solid #1e293b', borderRadius: '6px', fontSize: '12px' }} />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={56}>
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
                <h3 className="card-title">Percentage Share</h3>
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
                    <div key={s.name} className="flex items-center justify-between text-xs font-medium p-1.5 rounded bg-slate-50 border border-slate-100">
                      <span className="flex items-center gap-2 text-slate-700">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                        {s.name}
                      </span>
                      <span className="font-bold text-slate-900">{s.value.toFixed(0)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>


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

