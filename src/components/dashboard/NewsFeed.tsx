'use client';

import { useState, useEffect, useMemo } from 'react';
import { ExternalLink, Clock, Newspaper, RefreshCw, Search, Bookmark, BookmarkCheck, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { NewsArticle } from '@/lib/news-fetcher';
import { DoodleSparkle, DoodleUnderline } from '@/components/ui/Doodles';

const CATEGORIES = ['All News', 'Placements', 'Rankings', 'Admissions', 'Research', 'Policy', 'Saved'];

export function NewsFeed() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All News');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<string>('Just now');
  const [showToast, setShowToast] = useState(false);

  const loadNews = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await fetch(`/api/news?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setArticles(data);
      }
      setLastRefreshedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      if (isManual) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3500);
      }
    } catch {
      // Keep existing articles if fetch fails
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);


  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const getPublisherBadge = (source: string) => {
    const s = source.toLowerCase();
    if (s.includes('indian express')) return 'bg-red-50 text-red-700 border-red-200/80';
    if (s.includes('hindustan times')) return 'bg-amber-50 text-amber-800 border-amber-200/80';
    if (s.includes('the hindu')) return 'bg-slate-100 text-slate-800 border-slate-300';
    if (s.includes('times of india')) return 'bg-blue-50 text-blue-700 border-blue-200/80';
    if (s.includes('ndtv')) return 'bg-emerald-50 text-emerald-800 border-emerald-200/80';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  const getRelativeDate = (dateStr: string) => {
    if (!dateStr) return 'Today';
    const lower = dateStr.toLowerCase();
    if (lower.includes('today') || lower.includes('yesterday') || lower.includes('just in') || lower.includes('days ago')) {
      return dateStr;
    }

    try {
      const today = new Date();
      const articleDate = new Date(dateStr);
      if (isNaN(articleDate.getTime())) return dateStr;

      const diffTime = Math.abs(today.getTime() - articleDate.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      return `${diffDays} days ago`;
    } catch {
      return dateStr;
    }
  };


  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = 
        searchQuery === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeCategory === 'All News') return true;
      if (activeCategory === 'Saved') return savedIds.includes(article.id);
      return article.category.toLowerCase() === activeCategory.toLowerCase();
    });
  }, [articles, searchQuery, activeCategory, savedIds]);

  const featuredArticle = filteredArticles.length > 0 ? filteredArticles[0] : null;
  const listArticles = filteredArticles.length > 1 ? filteredArticles.slice(1) : (filteredArticles.length === 1 ? filteredArticles : []);

  return (
    <div className="space-y-5 animate-slide-up">
      {/* Interactive Filter & Search Controls Card */}
      <div className="card p-4 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search live headlines e.g. IIT Kanpur, Admissions, Placements..."
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all bg-white"
            />
          </div>

          {/* Refresh Button */}
          <button
            onClick={() => loadNews(true)}
            disabled={refreshing || loading}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200 disabled:opacity-50 flex-shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-blue-600' : ''}`} />
            <span>{refreshing ? 'Syncing...' : 'Refresh Live Feed'}</span>
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mr-1" />
          {CATEGORIES.map(cat => {
            const isSavedTab = cat === 'Saved';
            const count = isSavedTab ? savedIds.length : (cat === 'All News' ? articles.length : articles.filter(a => a.category.toLowerCase() === cat.toLowerCase()).length);
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#0B1527] text-white shadow-2xs'
                    : 'bg-slate-100/80 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
                }`}
              >
                {isSavedTab && <Bookmark className="w-3 h-3 text-amber-400 fill-amber-400" />}
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Refresh Toast Banner */}
      {showToast && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between shadow-sm animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Live RSS feed synced directly from Indian Express, HT, The Hindu, TOI & NDTV!</span>
          </div>
          <span className="text-[10px] font-extrabold bg-emerald-200/60 px-2 py-0.5 rounded-full">Refreshed {lastRefreshedAt}</span>
        </div>
      )}


      {/* Live Status Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-1 gap-1 text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-700">
            {filteredArticles.length} Live Stories Found
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-[11px] font-semibold text-slate-500">Last Synced: {lastRefreshedAt}</span>
        </div>
        <span className="text-[11px] font-semibold text-slate-500">
          Source: Google News RSS (Indian Express, HT, TOI, The Hindu, NDTV)
        </span>
      </div>


      {/* Loading Skeleton */}
      {loading ? (
        <div className="py-16 card flex flex-col items-center justify-center gap-3 text-slate-500 text-xs font-bold">
          <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
          <span>Fetching live national newspaper RSS feeds...</span>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="card p-12 text-center space-y-3">
          <Newspaper className="w-8 h-8 text-slate-400 mx-auto" />
          <h4 className="text-sm font-bold text-slate-800">No headlines match your filter</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try clearing your search query or switching category tabs to view live stories.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setActiveCategory('All News'); }}
            className="px-4 py-1.5 bg-[#0B1527] text-white rounded-lg text-xs font-bold inline-block"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Featured Breaking News Hero Card (Minimal Accent) */}
          {featuredArticle && activeCategory === 'All News' && searchQuery === '' && (
            <a
              href={featuredArticle.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group card p-4 md:p-5 border border-blue-200/90 border-l-4 border-l-blue-600 bg-blue-50/30 hover:bg-white hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer relative rounded-lg"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 bg-blue-100/80 text-blue-800 border border-blue-200 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wider">
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    Top Story
                  </span>
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded border ${getPublisherBadge(featuredArticle.source)}`}>
                    {featuredArticle.source}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {getRelativeDate(featuredArticle.date)}
                  </span>
                </div>

                <button
                  onClick={(e) => toggleBookmark(featuredArticle.id, e)}
                  className="p-1 rounded text-slate-400 hover:text-amber-500 transition-colors flex-shrink-0"
                  title="Bookmark story"
                >
                  {savedIds.includes(featuredArticle.id) ? (
                    <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
              </div>

              <h3 className="text-sm md:text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5 leading-snug">
                {featuredArticle.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
                {featuredArticle.excerpt}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-blue-100/60">
                <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Primary National Coverage
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 group-hover:underline">
                  Read Full Story
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>
          )}


          {/* Interactive Articles Grid / List */}
          <div className="space-y-3">
            {(activeCategory === 'All News' && searchQuery === '' ? listArticles : filteredArticles).map((article) => {
              const isSaved = savedIds.includes(article.id);
              return (
                <a
                  key={article.id}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group card p-4 hover:border-blue-500 hover:shadow-xs transition-all cursor-pointer relative bg-white"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded border ${getPublisherBadge(article.source)}`}>
                        {article.source}
                      </span>
                      <span className="badge badge-blue text-[10px] font-bold uppercase">{article.category}</span>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1 font-semibold">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {getRelativeDate(article.date)}
                      </span>
                    </div>

                    <button
                      onClick={(e) => toggleBookmark(article.id, e)}
                      className="p-1 rounded text-slate-400 hover:text-amber-500 transition-colors flex-shrink-0"
                      title="Bookmark story"
                    >
                      {isSaved ? (
                        <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <h4 className="text-xs md:text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5 leading-snug">
                    {article.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Verified Newspaper Source
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 group-hover:underline">
                      Read Full Story
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}





