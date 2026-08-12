'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BarChart3, Users, MessageSquare, BookOpen, Building2, TrendingUp, LayoutDashboard, ShieldCheck } from 'lucide-react';

const features = [
  { icon: BarChart3, title: 'University Report Card', desc: 'Comprehensive scores across academics, infrastructure, placement, and more.', href: '/dashboard' },
  { icon: Users, title: 'Student Voice Analysis', desc: 'Real sentiment breakdown across thousands of verified student reviews.', href: '/students' },
  { icon: MessageSquare, title: 'AI Decision Assistant', desc: 'Get instant university guidance and compare NIRF parameters.', href: '/chat' },
  { icon: TrendingUp, title: 'Reputation Timeline', desc: 'Track how university perception and mentions evolved over the years.', href: '/dashboard' },
  { icon: Building2, title: 'Compare Universities', desc: 'Side-by-side comparison across every academic & placement metric.', href: '/compare' },
  { icon: BookOpen, title: 'Live Intelligence Feed', desc: 'Stay updated with live RSS headlines from reputed education portals.', href: '/news' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-navy-900 text-white">
      {/* Top Header Logo */}
      <nav className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-0.5 shadow-md flex-shrink-0">
              <Image src="/logo.png" alt="UniInsights Logo" width={36} height={36} className="object-contain" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight block text-white">UniInsights</span>
              <span className="text-[10px] text-blue-400 block -mt-1 font-medium">Know Your Campus</span>
            </div>
          </Link>
        </div>
      </nav>


      {/* Hero Section */}


      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-blue-700/20" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 lg:py-36">
          <div className="max-w-3xl">
            {/* Branding Header Badge */}
            <div className="inline-flex items-center gap-2 mb-6 bg-blue-500/10 text-blue-300 border border-blue-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>UniInsights</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-300 font-normal">Know Your Campus. Choose with Confidence.</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-white">
              Data-Driven Intelligence for
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-300">
                Indian Universities & Colleges
              </span>
            </h1>

            <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl font-normal">
              Compare NIRF rankings, verified placement benchmarks, campus infrastructure, and student sentiment across India's top higher education institutions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-2">
              <Link
                href="/dashboard"
                className="btn-primary py-3.5 px-7 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg shadow-blue-600/30 hover:scale-[1.02] transition-all"
              >
                <LayoutDashboard className="w-4.5 h-4.5" />
                <span>Explore Analytics Dashboard</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>

              <Link
                href="/compare"
                className="px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm flex items-center gap-2 transition-all hover:scale-[1.02]"
              >
                <BarChart3 className="w-4.5 h-4.5 text-blue-400" />
                <span>Compare Universities</span>
              </Link>
            </div>
          </div>
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
              <Link
                key={feature.title}
                href={feature.href}
                className="group p-6 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-blue-500/50 hover:shadow-lg transition-all duration-200 block cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center group-hover:bg-blue-600/20 group-hover:scale-105 transition-all">
                    <feature.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-semibold text-base mb-2 group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
              </Link>
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
            <div className="w-7 h-7 bg-white rounded flex items-center justify-center p-0.5 shadow-2xs">
              <Image src="/logo.png" alt="UniInsights Logo" width={24} height={24} className="object-contain" />
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
