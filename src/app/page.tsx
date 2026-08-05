'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, BarChart3, Users, MessageSquare, BookOpen, Building2, TrendingUp, GraduationCap } from 'lucide-react';

const features = [
  { icon: BarChart3, title: 'University Report Card', desc: 'Comprehensive scores across academics, infrastructure, placement, and more.' },
  { icon: Users, title: 'Student Voice Analysis', desc: 'Real sentiment analysis from thousands of student reviews and comments.' },
  { icon: MessageSquare, title: 'AI Decision Assistant', desc: 'Get personalized university recommendations powered by Gemini AI.' },
  { icon: TrendingUp, title: 'Reputation Timeline', desc: 'Track how university perception has evolved over the years.' },
  { icon: Building2, title: 'Compare Universities', desc: 'Side-by-side comparison across every metric that matters.' },
  { icon: BookOpen, title: 'Live Intelligence Feed', desc: 'Stay updated with the latest discussions and trending topics.' },
];

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/dashboard?university=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">UniInsights</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-sm text-slate-400 hover:text-white transition-colors hidden sm:inline">
              Dashboard
            </Link>
            <Link href="/compare" className="text-sm text-slate-400 hover:text-white transition-colors hidden sm:inline">
              Compare
            </Link>
            <Link href="/chat" className="text-sm text-slate-400 hover:text-white transition-colors hidden sm:inline">
              Ask Seniors
            </Link>
            <Link href="/dashboard" className="btn-primary text-sm">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-blue-700/20" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <div className="badge-blue inline-flex items-center gap-1.5 mb-6 bg-blue-500/10 text-blue-300 border border-blue-500/20 px-3 py-1.5 rounded-full text-xs font-medium">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse-soft" />
              Data-Driven University Analytics
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              Choose Your Dream
              <br />
              University with
              <span className="text-blue-400"> AI</span>
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl">
              Make informed academic decisions backed by comprehensive data analysis, 
              student sentiment, and AI-powered insights across top Indian universities.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search for a university..."
                  className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/15 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <button
                onClick={handleSearch}
                className="btn-primary flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl"
              >
                Explore
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Analyzing data from 50+ universities across 6 key categories
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-white/10 bg-navy-800/50">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '50+', label: 'Universities Analyzed' },
            { value: '200K+', label: 'Student Reviews' },
            { value: '6', label: 'Data Categories' },
            { value: '94%', label: 'Accuracy Score' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Comprehensive University Intelligence</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Everything you need to make an informed decision about your academic future, powered by real data and AI analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-blue-500/30 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Start your smart academic journey today
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Explore comprehensive university data and make your decision with confidence.
          </p>
          <Link href="/dashboard" className="btn-primary inline-flex items-center gap-2 py-3 px-8 text-base">
            Open Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <GraduationCap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold">UniInsights</span>
          </div>
          <p className="text-xs text-slate-500">
            Know Your Campus. Choose with Confidence.
          </p>
        </div>
      </footer>
    </div>
  );
}
