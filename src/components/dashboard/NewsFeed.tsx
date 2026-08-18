'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Clock, Newspaper, RefreshCw } from 'lucide-react';
import { NewsArticle } from '@/lib/news-fetcher';
import { DoodleSparkle } from '@/components/ui/Doodles';

export function NewsFeed() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setArticles(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card animate-slide-up">
      <div className="card-header flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center">
            <Newspaper className="w-4 h-4 text-blue-700" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="card-title text-slate-900">Live Higher Education News</h3>
              <DoodleSparkle className="w-3.5 h-3.5 text-blue-500/70" />
            </div>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">Real-time headlines from NDTV, The Hindu, Times of India & Indian Express</p>
          </div>
        </div>
        <span className="badge badge-emerald flex items-center gap-1 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse-soft" />
          Live RSS Feed
        </span>
      </div>
      <div className="card-content">
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-2 text-slate-500 text-xs font-semibold">
            <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
            <span>Fetching live news headlines...</span>
          </div>
        ) : (
          <div className="space-y-3">
            {articles.map((article) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group p-3.5 rounded-lg border border-slate-200/80 bg-white hover:border-blue-500 hover:shadow-2xs transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="badge badge-blue text-[10px] uppercase font-bold">{article.category}</span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 font-semibold">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {article.date}
                  </span>
                </div>
                <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors mb-1 leading-snug">
                  {article.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-2.5 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between pt-1.5 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-700">{article.source}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 group-hover:underline">
                    Read Full Story
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}




