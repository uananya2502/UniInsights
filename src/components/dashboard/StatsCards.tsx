'use client';

import { LucideIcon, BarChart3, MessageSquare, Video, ThumbsUp } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  color: string;
}

function StatCard({ label, value, change, icon: Icon, color }: StatCardProps) {
  return (
    <div className="stat-card flex items-start justify-between">
      <div>
        <p className="text-xs font-medium text-slate-500 mb-1">{label}</p>
        <p className="text-xl font-bold text-slate-900">{value}</p>
        {change && (
          <p className="text-xs text-emerald-600 font-medium mt-1">{change}</p>
        )}
      </div>
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="w-4 h-4 text-white" />
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
    { label: 'Total Mentions', value: totalMentions.toLocaleString(), change: '+12% from last quarter', icon: BarChart3, color: 'bg-blue-600' },
    { label: 'Student Reviews', value: totalComments.toLocaleString(), change: '+8% from last quarter', icon: MessageSquare, color: 'bg-emerald-600' },
    { label: 'Video Sources', value: totalVideos.toLocaleString(), icon: Video, color: 'bg-indigo-600' },
    { label: 'Avg. Engagement', value: avgLikes.toFixed(0), change: '+3% from last quarter', icon: ThumbsUp, color: 'bg-amber-600' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(card => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
}
