'use client';

import { LucideIcon, BarChart3, MessageSquare, Video, ThumbsUp } from 'lucide-react';
import { DoodleSparkle } from '@/components/ui/Doodles';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

function StatCard({ label, value, icon: Icon, iconBg, iconColor }: StatCardProps) {
  return (
    <div className="stat-card relative overflow-hidden group hover:border-slate-300 transition-all duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            {label}
          </p>
          <p className="text-2xl font-extrabold text-slate-900 tracking-tight">{value}</p>
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center border shadow-2xs ${iconBg} ${iconColor} group-hover:scale-105 transition-transform`}>
          <Icon className="w-4.5 h-4.5" />
        </div>
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
    { label: 'Total Mentions', value: totalMentions.toLocaleString(), icon: BarChart3, iconBg: 'bg-blue-50/90 border-blue-200/80', iconColor: 'text-blue-700' },
    { label: 'Student Reviews', value: totalComments.toLocaleString(), icon: MessageSquare, iconBg: 'bg-emerald-50/90 border-emerald-200/80', iconColor: 'text-emerald-700' },
    { label: 'Video Sources', value: totalVideos.toLocaleString(), icon: Video, iconBg: 'bg-slate-100 border-slate-200', iconColor: 'text-slate-700' },
    { label: 'Avg. Engagement', value: avgLikes.toFixed(0), icon: ThumbsUp, iconBg: 'bg-amber-50/90 border-amber-200/80', iconColor: 'text-amber-700' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(card => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
}


