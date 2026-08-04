import React, { useState } from 'react';
import { Search, Sparkles, Youtube, CheckCircle2, TrendingUp, Users, ArrowRight } from 'lucide-react';

export default function HeroSection({ onSearch, popularUniversities, onSelectUniv }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <section className="relative pt-12 pb-20 px-4 overflow-hidden">
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-200/40 via-sky-200/30 to-brand-100/20 blur-3xl rounded-full -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center">
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-panel border border-brand-200/60 text-brand-700 text-xs font-bold shadow-sm mb-6 animate-bounce">
          <Sparkles className="w-4 h-4 text-brand-500" />
          <span>Unbiased YouTube Discussion & Social Sentiment Engine</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
          Real Campus Truth from <br />
          <span className="gradient-text">Public YouTube Discussions</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
          No marketing brochures. No sponsored rankings. UniInsights processes thousands of student comments, video transcripts, and community feedback using AI.
        </p>

        {/* Floating Large Search Bar */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8 relative">
          <div className="relative glass-panel rounded-3xl p-2 shadow-2xl border border-slate-200 flex items-center">
            <Search className="w-6 h-6 text-brand-500 ml-4 mr-2 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search any university (e.g. KIIT, SRM, IIT Bombay, LPU)..."
              className="w-full bg-transparent px-2 py-3 text-slate-800 text-base sm:text-lg focus:outline-none placeholder:text-slate-400 font-medium"
            />
            <button
              type="submit"
              className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3.5 rounded-2xl shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 transition-all flex items-center space-x-2 shrink-0"
            >
              <span>Explore Insights</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Popular Universities Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Popular:</span>
          {popularUniversities.map((univ) => (
            <button
              key={univ.id}
              onClick={() => onSelectUniv(univ.id)}
              className="px-4 py-1.5 rounded-full bg-white hover:bg-brand-50 text-slate-700 hover:text-brand-600 text-xs font-semibold border border-slate-200/80 shadow-sm transition-all hover:scale-105"
            >
              {univ.name}
            </button>
          ))}
        </div>

        {/* Platform Stat Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="glass-card p-5 rounded-2xl text-center">
            <div className="flex justify-center mb-2">
              <Youtube className="w-6 h-6 text-red-500" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900">18,400+</p>
            <p className="text-xs font-semibold text-slate-500">YouTube Comments</p>
          </div>
          <div className="glass-card p-5 rounded-2xl text-center">
            <div className="flex justify-center mb-2">
              <Sparkles className="w-6 h-6 text-brand-500" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900">320+</p>
            <p className="text-xs font-semibold text-slate-500">Video Transcripts</p>
          </div>
          <div className="glass-card p-5 rounded-2xl text-center">
            <div className="flex justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-emerald-500" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900">94.2%</p>
            <p className="text-xs font-semibold text-slate-500">RAG Confidence</p>
          </div>
          <div className="glass-card p-5 rounded-2xl text-center">
            <div className="flex justify-center mb-2">
              <Users className="w-6 h-6 text-sky-500" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900">100%</p>
            <p className="text-xs font-semibold text-slate-500">Student First</p>
          </div>
        </div>
      </div>
    </section>
  );
}
