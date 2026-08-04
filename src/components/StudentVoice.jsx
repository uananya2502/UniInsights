import React from 'react';
import { Quote, Heart, Youtube, ExternalLink, Sparkles } from 'lucide-react';

export default function StudentVoice({ voices = [] }) {
  if (!voices || voices.length === 0) return null;

  return (
    <div className="glass-card rounded-3xl p-8 border border-slate-200/80 bg-white mb-12 shadow-glass">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
            <Quote className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Student Voice</h2>
            <p className="text-sm text-slate-500">Top-liked verified student comments from YouTube discussions</p>
          </div>
        </div>

        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>High Upvote Consensus</span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {voices.map((v, idx) => (
          <div
            key={idx}
            className="bg-slate-50 hover:bg-white p-6 rounded-2xl border border-slate-200 hover:border-brand-300 hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Top Quote Icon & Likes Badge */}
              <div className="flex items-center justify-between mb-4">
                <Quote className="w-8 h-8 text-brand-400 opacity-40 group-hover:opacity-100 transition-opacity" />
                <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-rose-100/80 text-rose-700 font-extrabold text-xs">
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  <span>{v.likes.toLocaleString()} Likes</span>
                </div>
              </div>

              {/* Comment Text */}
              <p className="text-slate-800 text-sm font-semibold italic mb-6 leading-relaxed">
                "{v.text}"
              </p>
            </div>

            {/* Source & Author */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900">{v.author}</p>
                <p className="text-slate-400 text-[11px]">Verified Student</p>
              </div>

              <a
                href={v.video_url || '#'}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 text-brand-600 hover:text-brand-700 font-bold bg-brand-50 hover:bg-brand-100 px-2.5 py-1 rounded-lg border border-brand-200 transition-colors"
              >
                <Youtube className="w-3.5 h-3.5 text-red-500" />
                <span className="text-[11px]">Source</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
