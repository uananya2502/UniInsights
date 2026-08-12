'use client';

import { useState, useEffect } from 'react';
import { UniversitySearch } from '@/components/dashboard/UniversitySearch';
import { UniversityData } from '@/lib/data-parser';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { ArrowLeftRight, BarChart3, Scale } from 'lucide-react';

export default function ComparePage() {
  const [uniA, setUniA] = useState<string>('IIT Delhi');
  const [uniB, setUniB] = useState<string>('IIT Bombay');
  const [dataA, setDataA] = useState<UniversityData | null>(null);
  const [dataB, setDataB] = useState<UniversityData | null>(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (!uniA && !uniB) return;
    setLoading(true);
    const promises = [];
    if (uniA) promises.push(fetch(`/api/data/universities?name=${encodeURIComponent(uniA)}`).then(r => r.ok ? r.json() : null));
    else promises.push(Promise.resolve(null));
    if (uniB) promises.push(fetch(`/api/data/universities?name=${encodeURIComponent(uniB)}`).then(r => r.ok ? r.json() : null));
    else promises.push(Promise.resolve(null));
    
    Promise.all(promises)
      .then(([a, b]) => { setDataA(a); setDataB(b); })
      .finally(() => setLoading(false));
  }, [uniA, uniB]);

  const categories = ['academics', 'placement', 'infrastructure', 'studentExperience', 'hostel', 'fees'] as const;
  const categoryLabels: Record<string, string> = {
    academics: 'Academics', placement: 'Placement', infrastructure: 'Infrastructure',
    studentExperience: 'Experience', hostel: 'Hostel', fees: 'Fees',
  };

  const barData = categories.map(cat => ({
    category: categoryLabels[cat],
    ...(dataA ? { [dataA.name]: dataA.categoryScores[cat] } : {}),
    ...(dataB ? { [dataB.name]: dataB.categoryScores[cat] } : {}),
  }));

  const radarData = categories.map(cat => ({
    subject: categoryLabels[cat],
    ...(dataA ? { A: dataA.categoryScores[cat] } : {}),
    ...(dataB ? { B: dataB.categoryScores[cat] } : {}),
  }));

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1400px] mx-auto">
      <div className="flex items-center gap-3 pb-2 border-b border-slate-200/80">
        <div className="w-9 h-9 rounded bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
          <Scale className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Compare Universities</h1>
          <p className="text-xs text-slate-500">Side-by-side analytical metric comparison of top institutions</p>
        </div>
      </div>

      {/* Selection Area */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <div className="card p-4 border-l-4 border-l-blue-600">
          <p className="text-[11px] font-bold text-blue-700 uppercase tracking-wider mb-2">First Institution (University A)</p>
          <UniversitySearch onSelect={setUniA} selected={uniA} compact placeholder="Select first university..." />
          {dataA && (
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">{dataA.name}</span>
              <span className="text-base font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{dataA.overallScore.toFixed(1)} / 10</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center">
          <div className="w-9 h-9 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-xs">
            <ArrowLeftRight className="w-4 h-4 text-slate-600" />
          </div>
        </div>
        <div className="card p-4 border-l-4 border-l-emerald-600">
          <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-2">Second Institution (University B)</p>
          <UniversitySearch onSelect={setUniB} selected={uniB} compact placeholder="Select second university..." />
          {dataB && (
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">{dataB.name}</span>
              <span className="text-base font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">{dataB.overallScore.toFixed(1)} / 10</span>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Charts */}
      {(dataA || dataB) && !loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up">
          {/* Bar Chart */}
          <div className="card">
            <div className="card-header flex items-center justify-between">
              <h3 className="card-title">Category Breakdown Comparison</h3>
              <span className="text-[11px] font-semibold text-slate-400">Scores out of 10</span>
            </div>
            <div className="card-content">
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 10, right: 10, left: -15, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                    <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: 'white', border: '1px solid #1e293b', borderRadius: '6px', fontSize: '12px' }} />
                    {dataA && <Bar dataKey={dataA.name} fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={32} />}
                    {dataB && <Bar dataKey={dataB.name} fill="#059669" radius={[4, 4, 0, 0]} maxBarSize={32} />}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="card">
            <div className="card-header flex items-center justify-between">
              <h3 className="card-title">Institutional Strengths Radar</h3>
              <span className="text-[11px] font-semibold text-slate-400">Multi-axis Overlay</span>
            </div>
            <div className="card-content">
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }} />
                    <PolarRadiusAxis domain={[0, 10]} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                    {dataA && <Radar name={dataA.name} dataKey="A" stroke="#2563eb" fill="#2563eb" fillOpacity={0.15} strokeWidth={2} />}
                    {dataB && <Radar name={dataB.name} dataKey="B" stroke="#059669" fill="#059669" fillOpacity={0.15} strokeWidth={2} />}
                    <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 500 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          {dataA && dataB && (
            <div className="card lg:col-span-2 overflow-hidden">
              <div className="card-header flex items-center justify-between">
                <h3 className="card-title">Detailed Side-by-Side Category Matrix</h3>
                <span className="badge badge-blue">Head-to-Head</span>
              </div>
              <div className="card-content p-0 overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                      <th className="text-left py-3 px-4">Evaluation Parameter</th>
                      <th className="text-center py-3 px-4 text-blue-700">{dataA.name}</th>
                      <th className="text-center py-3 px-4 text-emerald-700">{dataB.name}</th>
                      <th className="text-center py-3 px-4">Category Leader</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {categories.map(cat => {
                      const scoreA = dataA.categoryScores[cat];
                      const scoreB = dataB.categoryScores[cat];
                      const winner = scoreA > scoreB ? 'A' : scoreB > scoreA ? 'B' : 'Tie';
                      return (
                        <tr key={cat} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 font-semibold text-slate-800">{categoryLabels[cat]}</td>
                          <td className={`text-center py-3 px-4 font-bold ${winner === 'A' ? 'text-blue-700 bg-blue-50/40' : 'text-slate-600'}`}>{scoreA.toFixed(1)} / 10</td>
                          <td className={`text-center py-3 px-4 font-bold ${winner === 'B' ? 'text-emerald-700 bg-emerald-50/40' : 'text-slate-600'}`}>{scoreB.toFixed(1)} / 10</td>
                          <td className="text-center py-3 px-4">
                            <span className={`badge text-[10px] ${winner === 'A' ? 'badge-blue' : winner === 'B' ? 'badge-emerald' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                              {winner === 'A' ? dataA.name.split(' ')[0] : winner === 'B' ? dataB.name.split(' ')[0] : 'Tie'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="bg-slate-900 text-white font-bold">
                      <td className="py-3 px-4">Overall Score Rating</td>
                      <td className="text-center py-3 px-4 text-blue-400 text-sm font-extrabold">{dataA.overallScore.toFixed(1)}</td>
                      <td className="text-center py-3 px-4 text-emerald-400 text-sm font-extrabold">{dataB.overallScore.toFixed(1)}</td>
                      <td className="text-center py-3 px-4">
                        <span className={`badge text-[10px] ${dataA.overallScore > dataB.overallScore ? 'badge-blue' : 'badge-emerald'}`}>
                          {dataA.overallScore > dataB.overallScore ? dataA.name.split(' ')[0] : dataB.name.split(' ')[0]} Overall
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="w-9 h-9 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

