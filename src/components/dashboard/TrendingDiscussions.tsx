'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { TopicData } from '@/lib/data-parser';

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
      <div className="card-header">
        <h3 className="card-title">Trending Discussion Keywords</h3>
        <p className="text-xs text-slate-500 mt-0.5">Most discussed topics across student forums & reviews</p>
      </div>
      <div className="card-content">
        <div className="space-y-3.5">
          {topics.slice(0, 8).map((topic, i) => (
            <div key={topic.keyword} className="flex items-center gap-3">
              <span className="w-5 text-center text-xs font-bold text-slate-400 font-mono">
                {i + 1}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-800">{topic.keyword}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-slate-500">{topic.count} Mentions</span>
                    <span className={`badge ${trendLabel[topic.trend]} text-[10px] capitalize flex items-center gap-1`}>
                      {trendIcon[topic.trend]}
                      {topic.trend}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
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

