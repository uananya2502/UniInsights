'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { TopicData } from '@/lib/data-parser';

interface TrendingDiscussionsProps {
  topics: TopicData[];
}

export function TrendingDiscussions({ topics }: TrendingDiscussionsProps) {
  const trendIcon = {
    rising: <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />,
    stable: <Minus className="w-3.5 h-3.5 text-slate-400" />,
    declining: <TrendingDown className="w-3.5 h-3.5 text-red-400" />,
  };
  const trendLabel = {
    rising: 'badge-emerald',
    stable: 'badge-blue',
    declining: 'badge-red',
  };

  const maxCount = Math.max(...topics.map(t => t.count), 1);

  return (
    <div className="card animate-slide-up h-full">
      <div className="card-header">
        <h3 className="card-title">Trending Discussions</h3>
        <p className="text-xs text-slate-400 mt-1">Most discussed topics</p>
      </div>
      <div className="card-content">
        <div className="space-y-3">
          {topics.slice(0, 8).map((topic, i) => (
            <div key={topic.keyword} className="flex items-center gap-3">
              <span className="text-xs font-medium text-slate-400 w-5 text-right">{i + 1}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">{topic.keyword}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">{topic.count} mentions</span>
                    <span className={`badge ${trendLabel[topic.trend]} text-[10px] flex items-center gap-0.5`}>
                      {trendIcon[topic.trend]}
                      {topic.trend}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1">
                  <div
                    className="bg-blue-500 h-1 rounded-full transition-all duration-500"
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
