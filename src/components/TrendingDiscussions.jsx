import React from 'react';
import { Flame, TrendingUp, TrendingDown, Minus, ArrowUpRight } from 'lucide-react';

export default function TrendingDiscussions({ topics = [] }) {
  if (!topics || topics.length === 0) return null;

  return (
    <div className="glass-card rounded-3xl p-8 border border-slate-200/80 bg-white mb-12 shadow-glass">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-red-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Trending Discussions</h2>
            <p className="text-sm text-slate-500">Real-time discussion velocity & volume growth</p>
          </div>
        </div>

        <div className="px-3.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200 flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>High Discussion Velocity</span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {topics.map((t, idx) => {
          const isUp = t.trend === 'up';
          const isDown = t.trend === 'down';

          return (
            <div
              key={idx}
              className="bg-slate-50 hover:bg-white p-5 rounded-2xl border border-slate-200 hover:border-brand-300 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                  {t.name}
                </span>
                <span
                  className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    isUp
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : isDown
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : 'bg-slate-100 text-slate-700 border border-slate-300'
                  }`}
                >
                  {isUp && <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />}
                  {isDown && <TrendingDown className="w-3.5 h-3.5 text-rose-600" />}
                  {!isUp && !isDown && <Minus className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{t.change > 0 ? `+${t.change}%` : `${t.change}%`}</span>
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200">
                <span>Comment Volume:</span>
                <span className="font-bold text-slate-800">{t.volume.toLocaleString()} mentions</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
