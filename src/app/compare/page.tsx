'use client';

import { useState, useEffect } from 'react';
import { UniversitySearch } from '@/components/dashboard/UniversitySearch';
import { UniversityData } from '@/lib/data-parser';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { ArrowLeftRight } from 'lucide-react';

export default function ComparePage() {
  const [uniA, setUniA] = useState<string>('');
  const [uniB, setUniB] = useState<string>('');
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
      <div>
        <h1 className="text-xl font-bold text-slate-900">Compare Universities</h1>
        <p className="text-sm text-slate-500 mt-0.5">Select two universities to compare side-by-side</p>
      </div>

      {/* Selection Area */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <div className="card p-4">
          <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">University A</p>
          <UniversitySearch onSelect={setUniA} selected={uniA} compact placeholder="Select first university..." />
          {dataA && (
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-800">{dataA.name}</span>
              <span className="text-lg font-bold text-blue-600">{dataA.overallScore.toFixed(1)}</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center">
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
            <ArrowLeftRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>
        <div className="card p-4">
          <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">University B</p>
          <UniversitySearch onSelect={setUniB} selected={uniB} compact placeholder="Select second university..." />
          {dataB && (
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-800">{dataB.name}</span>
              <span className="text-lg font-bold text-emerald-600">{dataB.overallScore.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Charts */}
      {(dataA || dataB) && !loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up">
          {/* Bar Chart */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Category Comparison</h3>
            </div>
            <div className="card-content">
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                    <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px' }} />
                    {dataA && <Bar dataKey={dataA.name} fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={32} />}
                    {dataB && <Bar dataKey={dataB.name} fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={32} />}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Overall Profile</h3>
            </div>
            <div className="card-content">
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b' }} />
                    <PolarRadiusAxis domain={[0, 10]} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                    {dataA && <Radar name={dataA.name} dataKey="A" stroke="#2563eb" fill="#2563eb" fillOpacity={0.15} strokeWidth={2} />}
                    {dataB && <Radar name={dataB.name} dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.15} strokeWidth={2} />}
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          {dataA && dataB && (
            <div className="card lg:col-span-2">
              <div className="card-header">
                <h3 className="card-title">Detailed Comparison</h3>
              </div>
              <div className="card-content overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                      <th className="text-center py-2.5 px-3 text-xs font-semibold text-blue-600 uppercase tracking-wider">{dataA.name}</th>
                      <th className="text-center py-2.5 px-3 text-xs font-semibold text-emerald-600 uppercase tracking-wider">{dataB.name}</th>
                      <th className="text-center py-2.5 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Advantage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map(cat => {
                      const scoreA = dataA.categoryScores[cat];
                      const scoreB = dataB.categoryScores[cat];
                      const winner = scoreA > scoreB ? 'A' : scoreB > scoreA ? 'B' : 'Tie';
                      return (
                        <tr key={cat} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                          <td className="py-2.5 px-3 font-medium text-slate-700">{categoryLabels[cat]}</td>
                          <td className={`text-center py-2.5 px-3 font-bold ${winner === 'A' ? 'text-blue-600' : 'text-slate-500'}`}>{scoreA.toFixed(1)}</td>
                          <td className={`text-center py-2.5 px-3 font-bold ${winner === 'B' ? 'text-emerald-600' : 'text-slate-500'}`}>{scoreB.toFixed(1)}</td>
                          <td className="text-center py-2.5 px-3">
                            <span className={`badge text-[10px] ${winner === 'A' ? 'badge-blue' : winner === 'B' ? 'badge-emerald' : 'bg-slate-100 text-slate-500'}`}>
                              {winner === 'A' ? dataA.name.split(' ')[0] : winner === 'B' ? dataB.name.split(' ')[0] : 'Even'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="bg-slate-50 font-bold">
                      <td className="py-2.5 px-3 text-slate-800">Overall</td>
                      <td className="text-center py-2.5 px-3 text-blue-600">{dataA.overallScore.toFixed(1)}</td>
                      <td className="text-center py-2.5 px-3 text-emerald-600">{dataB.overallScore.toFixed(1)}</td>
                      <td className="text-center py-2.5 px-3">
                        <span className={`badge text-[10px] ${dataA.overallScore > dataB.overallScore ? 'badge-blue' : 'badge-emerald'}`}>
                          {dataA.overallScore > dataB.overallScore ? dataA.name.split(' ')[0] : dataB.name.split(' ')[0]}
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
          <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
