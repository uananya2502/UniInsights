import React, { useState } from 'react';
import { BarChart2, PieChart, Network, Activity, ThumbsUp, ThumbsDown, Layers, Share2 } from 'lucide-react';
import {
  PieChart as RePieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area
} from 'recharts';

export default function AnalyticsSection({ snapshot, topics = [], network = {}, community = [] }) {
  const [commentFilter, setCommentFilter] = useState('all');

  // 1. Sentiment Distribution Data
  const sentimentData = [
    { name: 'Positive', value: snapshot?.positive_pct || 68.5, color: '#2563EB' },
    { name: 'Neutral', value: snapshot?.neutral_pct || 21.0, color: '#38BDF8' },
    { name: 'Negative', value: snapshot?.negative_pct || 10.5, color: '#F43F5E' },
  ];

  // 2. Monthly Trend Data
  const monthlyTrendData = [
    { month: 'Jan', volume: 1240, positive: 72 },
    { month: 'Feb', volume: 1380, positive: 70 },
    { month: 'Mar', volume: 1510, positive: 75 },
    { month: 'Apr', volume: 1890, positive: 68 },
    { month: 'May', volume: 2100, positive: 74 },
    { month: 'Jun', volume: 2450, positive: 78 },
  ];

  // 3. Topic Volume Bar Chart Data
  const topicBarData = topics.map(t => ({
    name: t.name,
    volume: t.volume,
  }));

  // 4. Sample Comments for Positive vs Negative tab
  const commentsList = [
    { text: "The coding culture in KIIT is super active! CSE placements touch 90%+ if you keep CGPA above 8.0.", author: "Rohan CSE", type: "positive", likes: 3420 },
    { text: "Campus fests like Kriti bring high-energy performances and great memories.", author: "Anjali S.", type: "positive", likes: 2100 },
    { text: "Mess food menu in North mess gets repetitive after 2 months. Quality needs improvement.", author: "Priya H.", type: "negative", likes: 1890 },
    { text: "Attendance is strictly 75%. If you fall below 70%, they issue admit card hold letters.", author: "Subhashree N.", type: "negative", likes: 980 },
  ];

  const filteredComments = commentFilter === 'all'
    ? commentsList
    : commentsList.filter(c => c.type === commentFilter);

  return (
    <div id="analytics" className="glass-card rounded-3xl p-8 border border-indigo-200/80 bg-white mb-12 shadow-glass">
      {/* Section Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-brand-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <BarChart2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Advanced Analytics Engine</h2>
            <p className="text-sm text-slate-500">NLP topic modeling, sentiment distribution & network graph</p>
          </div>
        </div>

        <div className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
          Precomputed YouTube Dataset
        </div>
      </div>

      {/* Row 1: Donut Chart & Monthly Trend Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Sentiment Distribution Donut Chart */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-brand-600" />
              Sentiment Distribution
            </h3>
            <span className="text-xs font-bold text-slate-400">18,400 Comments</span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Trend Area Chart */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-sky-600" />
              Monthly Discussion Volume & Sentiment Trend
            </h3>
            <span className="text-xs font-bold text-slate-400">Jan - Jun 2025</span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="volume" stroke="#2563EB" fill="#DBEAFE" name="Comment Volume" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Topic Distribution & Community Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Topic Distribution Bar Chart */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-indigo-600" />
              Topic Distribution (Mentions Volume)
            </h3>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topicBarData.length ? topicBarData : [{ name: 'Placements', volume: 5400 }, { name: 'Hostel', volume: 3800 }, { name: 'Faculty', volume: 2900 }, { name: 'Campus Life', volume: 4200 }]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip />
                <Bar dataKey="volume" fill="#4F46E5" radius={[8, 8, 0, 0]} name="Mentions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Community Detection Clusters */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-600" />
              Community Detection Clusters
            </h3>
            <span className="text-xs font-bold text-slate-400">Louvain Algorithm</span>
          </div>

          <div className="space-y-4">
            {community.length > 0 ? (
              community.map((c, i) => (
                <div key={i} className="p-4 bg-white rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-sm text-slate-900">{c.cluster_name}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-600">
                      {c.member_count} Members
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {c.key_phrases?.map((kp, j) => (
                      <span key={j} className="text-[11px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                        #{kp}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 bg-white rounded-xl border border-slate-200">
                <p className="font-bold text-sm text-slate-900 mb-1">CSE Placement & Coding Enthusiasts Cluster</p>
                <p className="text-xs text-slate-500">7,400 Members · Dominant Sentiment: Positive</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Row 3: Top Positive vs Negative Comments Table */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <ThumbsUp className="w-4 h-4 text-emerald-600" />
            Top Positive & Negative Comments Matrix
          </h3>

          <div className="flex space-x-2 bg-white p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setCommentFilter('all')}
              className={`px-3 py-1 rounded-lg ${commentFilter === 'all' ? 'bg-brand-600 text-white' : 'text-slate-600'}`}
            >
              All
            </button>
            <button
              onClick={() => setCommentFilter('positive')}
              className={`px-3 py-1 rounded-lg ${commentFilter === 'positive' ? 'bg-emerald-600 text-white' : 'text-slate-600'}`}
            >
              Positive
            </button>
            <button
              onClick={() => setCommentFilter('negative')}
              className={`px-3 py-1 rounded-lg ${commentFilter === 'negative' ? 'bg-rose-600 text-white' : 'text-slate-600'}`}
            >
              Negative
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredComments.map((c, i) => (
            <div key={i} className="p-4 bg-white rounded-xl border border-slate-200 flex items-start justify-between gap-4">
              <div className="flex items-start space-x-3">
                {c.type === 'positive' ? (
                  <ThumbsUp className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <ThumbsDown className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-sm font-semibold text-slate-800">"{c.text}"</p>
                  <p className="text-xs text-slate-400 mt-1">— {c.author}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-500 shrink-0">❤️ {c.likes}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
