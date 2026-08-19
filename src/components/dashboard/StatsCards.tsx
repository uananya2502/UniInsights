'use client';

import { LucideIcon, BarChart3, MessageSquare, Video, ThumbsUp } from 'lucide-react';
import { DoodleSparkle } from '@/components/ui/Doodles';

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  showSparkle?: boolean;
}

function StatCard({ label, value, change, icon: Icon, iconBg, iconColor, showSparkle }: StatCardProps) {
  return (
    <div className="stat-card relative overflow-hidden group hover:border-slate-300 transition-all duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            {label}
          </p>
          <p className="text-2xl font-extrabold text-slate-900 tracking-tight">{value}</p>
          {change ? (
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded border border-emerald-200/80 mt-2.5 shadow-2xs">
              <span>{change}</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100/80 px-2 py-0.5 rounded border border-slate-200/80 mt-2.5">
              <span>Verified Sources</span>
            </div>
          )}
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
    { label: 'Total Mentions', value: totalMentions.toLocaleString(), change: '+12% from last quarter', icon: BarChart3, iconBg: 'bg-blue-50/90 border-blue-200/80', iconColor: 'text-blue-700', showSparkle: true },
    { label: 'Student Reviews', value: totalComments.toLocaleString(), change: '+8% from last quarter', icon: MessageSquare, iconBg: 'bg-emerald-50/90 border-emerald-200/80', iconColor: 'text-emerald-700' },
    { label: 'Video Sources', value: totalVideos.toLocaleString(), icon: Video, iconBg: 'bg-slate-100 border-slate-200', iconColor: 'text-slate-700' },
    { label: 'Avg. Engagement', value: avgLikes.toFixed(0), change: '+3% from last quarter', icon: ThumbsUp, iconBg: 'bg-amber-50/90 border-amber-200/80', iconColor: 'text-amber-700' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(card => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
}


