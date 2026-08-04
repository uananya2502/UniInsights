import React, { useState, useEffect } from 'react';
import { Scale, ChevronRight, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { fetchCompareData } from '../services/api';

export default function CompareModule({ universities }) {
  const [univA, setUnivA] = useState('kiit');
  const [univB, setUnivB] = useState('srm');
  const [compareData, setCompareData] = useState(null);

  useEffect(() => {
    async function loadComparison() {
      const data = await fetchCompareData(univA, univB);
      setCompareData(data);
    }
    loadComparison();
  }, [univA, univB]);

  if (!compareData) return null;

  return (
    <div id="compare" className="glass-card rounded-3xl p-8 border border-purple-200/80 bg-white mb-12 shadow-glass">
      {/* Feature Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-400 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Compare Universities</h2>
            <p className="text-sm text-slate-500">Side-by-side multi-parameter social intelligence matrix</p>
          </div>
        </div>

        {/* University Selectors */}
        <div className="flex items-center space-x-3 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <select
            value={univA}
            onChange={(e) => setUnivA(e.target.value)}
            className="bg-white font-bold text-slate-800 text-xs py-2 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {universities.map((u) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
          <span className="text-xs font-black text-purple-600">VS</span>
          <select
            value={univB}
            onChange={(e) => setUnivB(e.target.value)}
            className="bg-white font-bold text-slate-800 text-xs py-2 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {universities.map((u) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid: Radar Chart & Metrics Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Interactive Recharts Radar Chart */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
          <div className="text-center mb-4">
            <h3 className="text-base font-extrabold text-slate-900">Social Perception Radar Chart</h3>
            <p className="text-xs text-slate-500">Normalized AI Scores out of 100</p>
          </div>

          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={compareData.radar_data}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="subject" stroke="#475569" tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#CBD5E1" />
                <Radar name={compareData.univ_a.name} dataKey="A" stroke="#2563EB" fill="#2563EB" fillOpacity={0.4} />
                <Radar name={compareData.univ_b.name} dataKey="B" stroke="#9333EA" fill="#9333EA" fillOpacity={0.4} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Comparative Breakdown Table */}
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-400">
            <span>Dimension</span>
            <div className="flex space-x-8">
              <span className="text-brand-600 font-extrabold">{compareData.univ_a.name}</span>
              <span className="text-purple-600 font-extrabold">{compareData.univ_b.name}</span>
            </div>
          </div>

          {[
            { metric: 'Placements Grade', a: compareData.univ_a.report_card.placements, b: compareData.univ_b.report_card.placements },
            { metric: 'Faculty Rating', a: compareData.univ_a.report_card.faculty, b: compareData.univ_b.report_card.faculty },
            { metric: 'Infrastructure Grade', a: compareData.univ_a.report_card.infrastructure, b: compareData.univ_b.report_card.infrastructure },
            { metric: 'Hostel & Mess', a: compareData.univ_a.report_card.hostel, b: compareData.univ_b.report_card.hostel },
            { metric: 'Campus Life', a: compareData.univ_a.report_card.campus_life, b: compareData.univ_b.report_card.campus_life },
            { metric: 'Overall Satisfaction', a: compareData.univ_a.report_card.student_satisfaction, b: compareData.univ_b.report_card.student_satisfaction },
          ].map((row, i) => (
            <div key={i} className="flex justify-between items-center p-3.5 bg-white rounded-xl border border-slate-200 text-sm font-semibold hover:bg-brand-50/50 transition-colors">
              <span className="text-slate-700">{row.metric}</span>
              <div className="flex space-x-12">
                <span className="px-3 py-1 bg-brand-50 text-brand-700 rounded-lg font-bold border border-brand-200 min-w-[44px] text-center">
                  {row.a}
                </span>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg font-bold border border-purple-200 min-w-[44px] text-center">
                  {row.b}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
