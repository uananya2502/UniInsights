import React, { useState, useEffect } from 'react';
import { Newspaper, ExternalLink, Calendar, Tag, ArrowRight } from 'lucide-react';

const MOCK_NEWS = [
  {
    id: "news_1",
    headline: "UGC Releases Updated Guidelines for AI and Cyber Security Degrees in Indian Universities",
    summary: "The University Grants Commission (UGC) has issued new frameworks incorporating practical AI labs, hands-on internships, and industry certification into undergraduate Computer Science curricula.",
    source: "Education Times",
    published_date: "Aug 01, 2026",
    category: "Curriculum",
    url: "https://ugc.gov.in/news/ai-cybersecurity-guidelines"
  },
  {
    id: "news_2",
    headline: "NIRF 2026 Engineering Rankings: IIT Madras and IIT Bombay Retain Top Spots",
    summary: "The Ministry of Education released the NIRF 2026 Rankings, highlighting research output, graduation outcome, and campus diversity as key differentiating factors.",
    source: "The Indian Express",
    published_date: "Jul 28, 2026",
    category: "Rankings",
    url: "https://indianexpress.com/education/nirf-rankings-2026"
  },
  {
    id: "news_3",
    headline: "Tech Hiring Rebounds: Tier-1 & Tier-2 Engineering Colleges Report 25% Increase in Pre-Placement Offers",
    summary: "Core tech firms and global capability centers (GCCs) have scaled up early campus hiring, focusing heavily on full-stack development, cloud computing, and AI engineering.",
    source: "Economic Times Tech",
    published_date: "Jul 25, 2026",
    category: "Placements",
    url: "https://economictimes.indiatimes.com/tech/pors-2026"
  },
  {
    id: "news_4",
    headline: "National Entrance Exams (JEE Main & GATE) to Feature Adaptive Computer-Based Testing",
    summary: "Testing agencies announce modernized examination centers with enhanced digital security, real-time analytics, and faster scorecard releases.",
    source: "NDTV Education",
    published_date: "Jul 20, 2026",
    category: "Admissions",
    url: "https://ndtv.com/education/jee-gate-testing-updates"
  }
];

export default function EducationNews() {
  const [news, setNews] = useState(MOCK_NEWS);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Curriculum', 'Rankings', 'Placements', 'Admissions'];

  const filteredNews = filter === 'All' ? news : news.filter(item => item.category === filter);

  return (
    <div id="news" className="glass-card rounded-3xl p-8 border border-amber-200/80 bg-white mb-12 shadow-glass">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
            <Newspaper className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Current Education News</h2>
            <p className="text-sm text-slate-500">Verified higher education policy, placement & exam updates</p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                filter === cat
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* News Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            className="bg-slate-50 hover:bg-white p-6 rounded-2xl border border-slate-200 hover:border-amber-300 hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[11px] font-extrabold border border-amber-200">
                  <Tag className="w-3 h-3 text-amber-600" />
                  <span>{item.category}</span>
                </span>
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {item.published_date}
                </span>
              </div>

              <h3 className="text-base font-extrabold text-slate-900 mb-2.5 group-hover:text-brand-600 transition-colors leading-snug">
                {item.headline}
              </h3>

              <p className="text-slate-600 text-xs font-normal leading-relaxed mb-6">
                {item.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-500">Source: {item.source}</span>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 text-amber-700 font-extrabold hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200 transition-colors"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
