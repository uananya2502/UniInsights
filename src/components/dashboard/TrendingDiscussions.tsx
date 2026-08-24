'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { TopicData } from '@/lib/data-parser';
import { DoodleSparkle } from '@/components/ui/Doodles';

interface TrendingDiscussionsProps {
  topics: TopicData[];
}

export function TrendingDiscussions({ topics }: TrendingDiscussionsProps) {
  const trendIcon = {
    rising: <TrendingUp className="w-3 h-3 text-emerald-600" />,
    stable: <Minus className="w-3 h-3 text-slate-500" />,
    declining: <TrendingDown className="w-3 h-3 text-red-600" />,
  };
  const trendLabel = {
    rising: 'badge-emerald',
    stable: 'bg-slate-100 text-slate-700 border-slate-200',
    declining: 'badge-red',
  };

  const maxCount = Math.max(...topics.map(t => t.count), 1);

  return (
    <div className="card animate-slide-up h-full">
      <div className="card-header flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Trending Discussion Keywords</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">Most discussed topics across student forums & reviews</p>
        </div>
      </div>
      <div className="card-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {topics.slice(0, 8).map((topic, i) => (
            <div key={topic.keyword} className="flex items-center gap-3 p-2 rounded-lg bg-slate-50/60 border border-slate-100 hover:bg-white hover:border-slate-200 transition-all">
              <span className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 font-mono shadow-2xs">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5 gap-2">
                  <span className="text-xs font-bold text-slate-800 truncate">{topic.keyword}</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[11px] font-semibold text-slate-500">{topic.count} Mentions</span>
                    <span className={`badge ${trendLabel[topic.trend]} text-[10px] font-bold capitalize flex items-center gap-1`}>
                      {trendIcon[topic.trend]}
                      {topic.trend}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-200/70 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${(topic.count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


