import React, { useState } from 'react';
import { Sparkles, Search, ChevronDown, Award, BarChart2, MessageSquare, Scale, Newspaper, Compass } from 'lucide-react';

export default function Navbar({ selectedUniv, onSelectUniv, universities }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-4 py-3">
      <nav className="max-w-7xl mx-auto glass-panel rounded-2xl px-6 py-3 shadow-glass flex items-center justify-between transition-all">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-500 to-sky-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 font-sans">
                Uni<span className="text-brand-500">Insights</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-600 border border-brand-200 uppercase tracking-wide">
                AI SaaS
              </span>
            </div>
            <p className="text-xs font-medium text-slate-500">Know Your College!</p>
          </div>
        </div>

        {/* Quick Navigation Links */}
        <div className="hidden lg:flex items-center space-x-6 text-sm font-semibold text-slate-600">
          <a href="#snapshot" className="hover:text-brand-600 transition-colors flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-brand-500" /> Snapshot
          </a>
          <a href="#ask-seniors" className="hover:text-brand-600 transition-colors flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-sky-500" /> Ask Seniors (RAG)
          </a>
          <a href="#report-card" className="hover:text-brand-600 transition-colors flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-500" /> Report Card
          </a>
          <a href="#compare" className="hover:text-brand-600 transition-colors flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-purple-500" /> Compare
          </a>
          <a href="#analytics" className="hover:text-brand-600 transition-colors flex items-center gap-1.5">
            <BarChart2 className="w-4 h-4 text-indigo-500" /> Analytics
          </a>
          <a href="#news" className="hover:text-brand-600 transition-colors flex items-center gap-1.5">
            <Newspaper className="w-4 h-4 text-amber-500" /> News
          </a>
        </div>

        {/* Active University Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200/80 rounded-xl text-slate-800 font-semibold text-sm transition-all border border-slate-200/60"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>{selectedUniv ? selectedUniv.name : 'Select University'}</span>
            <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-64 glass-panel rounded-2xl shadow-xl py-2 z-50 border border-slate-200 animate-in fade-in duration-200">
              <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Select Active Intelligence Target
              </div>
              {universities.map((u) => (
                <button
                  key={u.id}
                  onClick={() => {
                    onSelectUniv(u.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand-600 flex items-center justify-between transition-colors ${
                    selectedUniv?.id === u.id ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-700'
                  }`}
                >
                  <span>{u.name}</span>
                  <span className="text-[11px] text-slate-400">{u.location.split(',')[0]}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
