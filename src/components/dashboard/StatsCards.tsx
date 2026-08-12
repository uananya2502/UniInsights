'use client';

import { LucideIcon, BarChart3, MessageSquare, Video, ThumbsUp } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

function StatCard({ label, value, change, icon: Icon, iconBg, iconColor }: StatCardProps) {
  return (
    <div className="stat-card flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{label}</p>
        <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
        {change ? (
          <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 mt-2">
            <span>{change}</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 mt-2">
            <span>Verified Sources</span>
          </div>
        )}
      </div>
      <div className={`w-9 h-9 rounded-md flex items-center justify-center border ${iconBg} ${iconColor}`}>
        <Icon className="w-4 h-4" />
      </div>
    </div>
  );
}

interface StatsCardsProps {
  totalMentions: number;
  totalComments: number;
  totalVideos: number;
  avgLikes: number;
}

export function StatsCards({ totalMentions, totalComments, totalVideos, avgLikes }: StatsCardsProps) {
  const cards = [
    { label: 'Total Mentions', value: totalMentions.toLocaleString(), change: '+12% from last quarter', icon: BarChart3, iconBg: 'bg-blue-50 border-blue-100', iconColor: 'text-blue-600' },
    { label: 'Student Reviews', value: totalComments.toLocaleString(), change: '+8% from last quarter', icon: MessageSquare, iconBg: 'bg-emerald-50 border-emerald-100', iconColor: 'text-emerald-600' },
    { label: 'Video Sources', value: totalVideos.toLocaleString(), icon: Video, iconBg: 'bg-slate-100 border-slate-200', iconColor: 'text-slate-700' },
    { label: 'Avg. Engagement', value: avgLikes.toFixed(0), change: '+3% from last quarter', icon: ThumbsUp, iconBg: 'bg-amber-50 border-amber-100', iconColor: 'text-amber-600' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(card => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
}

