'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  BarChart3, 
  ShieldCheck, 
  Search,
  Database,
  BrainCircuit,
  Lightbulb,
  CheckCircle2,
  BookOpen,
  Briefcase,
  Building2,
  UserCheck,
  Home,
  DollarSign,
  Users,
  Video
} from 'lucide-react';
import { UniversitySearch } from '@/components/dashboard/UniversitySearch';

import { useEffect, useState } from 'react';

export default function LandingPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('uniinsights_user');
    if (!savedUser) {
      router.push('/login');
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#0B1527] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full" />
          <p className="text-xs font-bold tracking-wider text-slate-300">Loading UniInsight Portal...</p>
        </div>
      </div>
    );
  }

  const handleSearchSelect = (universityName: string) => {
    router.push(`/dashboard?university=${encodeURIComponent(universityName)}`);
  };


  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-slate-900/10 selection:text-slate-900 font-sans">
      {/* Top Navbar */}
      <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center p-0.5 border border-slate-200 shadow-sm flex-shrink-0 group-hover:shadow-md transition-shadow">
              <Image src="/uniinsights-official-logo.png" alt="UniInsights Logo" width={32} height={32} className="object-contain" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight block text-slate-900">UniInsights</span>
              <span className="text-[10px] text-slate-500 block -mt-1 font-medium group-hover:text-slate-900 transition-colors">Know Your Campus</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
          </div>

        </div>
      </nav>

      <main>
        {/* 1. HERO SECTION */}
        <section className="relative w-full min-h-[calc(100vh-64px)] flex items-center py-16 lg:py-0 bg-slate-50 border-b border-slate-200">
          {/* University Scrapbook Collage Background (~45% Visual Intensity) */}
          <div 
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 bg-cover bg-center bg-fixed bg-no-repeat opacity-[0.45] transition-opacity"
            style={{ backgroundImage: `url('/university-collage-bg.jpg')`, width: '100%' }}
          />
          {/* Soft Slate Gradient Overlay for Crisp Text Contrast */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 bg-gradient-to-r from-slate-50/90 via-slate-50/50 to-slate-50/20" />


          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

              
              {/* Left Column: Text */}
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 mb-6 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0B1527]" />
                  <span>UniInsights • University Intelligence Platform</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-slate-900">
                  Know Your Campus.<br />
                  <span className="text-[#0B1527]">Choose with Confidence.</span>
                </h1>

                <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8 font-normal max-w-xl">
                  UniInsights turns university data, student voice, public discussions and campus information into clear insights that help students compare universities and make informed decisions.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/dashboard"
                    className="bg-[#0B1527] hover:bg-[#162238] text-white py-3.5 px-6 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  >
                    Explore Analytics <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>

                  <Link
                    href="/compare"
                    className="px-6 py-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5 shadow-sm"
                  >
                    Compare Universities
                  </Link>
                </div>
              </div>

              {/* Right Column: Dashboard Preview */}
              <div className="relative z-10 w-full rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden transform lg:rotate-2 hover:rotate-0 transition-transform duration-500 ease-out p-4 md:p-6">
                
                {/* Mock Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      College Report Card
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">Comprehensive Performance Metrics Breakdown</p>
                  </div>
                  <div className="flex flex-col items-center justify-center w-14 h-14 rounded-full border-4 border-[#0B1527] text-center">
                    <span className="text-lg font-black text-slate-900 leading-none">7.6</span>
                  </div>
                </div>

                {/* Mock Top Metrics */}
                <div className="flex gap-3 mb-6">
                  <div className="flex-1 bg-slate-50 border border-slate-100 rounded-lg p-3 shadow-sm hover:-translate-y-1 transition-transform duration-300">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Mentions</p>
                    <p className="text-lg font-bold text-slate-900">4,947+</p>
                  </div>
                  <div className="flex-1 bg-slate-50 border border-slate-100 rounded-lg p-3 shadow-sm hover:-translate-y-1 transition-transform duration-300">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Reviews</p>
                    <p className="text-lg font-bold text-slate-900">4,558+</p>
                  </div>
                  <div className="flex-1 bg-slate-50 border border-slate-100 rounded-lg p-3 shadow-sm hover:-translate-y-1 transition-transform duration-300 hidden sm:block">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Videos</p>
                    <p className="text-lg font-bold text-slate-900">149+</p>
                  </div>
                </div>

                {/* Mock Category Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Academics', score: 7.8, color: 'bg-[#0B1527]' },
                    { label: 'Placement', score: 7.5, color: 'bg-emerald-600' },
                    { label: 'Infrastructure', score: 8.2, color: 'bg-indigo-600' },
                    { label: 'Experience', score: 7.6, color: 'bg-purple-600' },
                    { label: 'Hostel', score: 7.8, color: 'bg-amber-600' },
                    { label: 'Fees', score: 7.0, color: 'bg-teal-600' }
                  ].map((cat) => (
                    <div key={cat.label} className="bg-slate-50 border border-slate-100 rounded-lg p-3 shadow-sm group hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-slate-600">{cat.label}</span>
                        <span className="text-xs font-bold text-slate-900">{cat.score}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-full ${cat.color} rounded-full transform origin-left transition-transform duration-1000 ease-out`} 
                          style={{ width: `${(cat.score / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* 2. HOW UNIINSIGHTS WORKS */}
        <section className="py-20 border-t border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">From University Data to Real Insights</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                How we process massive amounts of unstructured data into simple, actionable intelligence.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Collect', icon: Database, desc: 'Collect public university-related videos, discussions, reviews and information.' },
                { step: '02', title: 'Analyze', icon: BrainCircuit, desc: 'Clean, organize and analyze large amounts of unstructured university data.' },
                { step: '03', title: 'Understand', icon: Lightbulb, desc: 'Identify sentiment, engagement, reputation and important university trends.' },
                { step: '04', title: 'Decide', icon: CheckCircle2, desc: 'Turn the analysis into clear scores, comparisons and useful insights.' }
              ].map((item) => (
                <div key={item.step} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl relative group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-200 group-hover:border-slate-400 transition-colors">
                      <item.icon className="w-6 h-6 text-[#0B1527]" />
                    </div>
                    <span className="text-5xl font-black text-slate-200 group-hover:text-slate-300 transition-colors select-none">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. WHAT YOU CAN EXPLORE */}
        <section className="py-20 border-t border-slate-200 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything You Need to Know About a University</h2>
              <p className="text-slate-600 max-w-2xl">
                Our dashboard breaks down campus performance into six critical categories.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Academics', icon: BookOpen, score: '7.8', desc: 'Understand academic quality and learning experiences.', color: 'text-[#0B1527]', bg: 'bg-slate-100 border border-slate-200' },
                { title: 'Placement', icon: Briefcase, score: '7.5', desc: 'Explore placement discussions and student experiences.', color: 'text-emerald-600', bg: 'bg-emerald-50 border border-emerald-100' },
                { title: 'Infrastructure', icon: Building2, score: '8.2', desc: 'Understand campus facilities and infrastructure.', color: 'text-indigo-600', bg: 'bg-indigo-50 border border-indigo-100' },
                { title: 'Student Experience', icon: UserCheck, score: '7.6', desc: 'Explore what students are saying about campus life.', color: 'text-purple-600', bg: 'bg-purple-50 border border-purple-100' },
                { title: 'Hostel', icon: Home, score: '7.8', desc: 'Understand hostel-related experiences and discussions.', color: 'text-amber-600', bg: 'bg-amber-50 border border-amber-100' },
                { title: 'Fees', icon: DollarSign, score: '7.0', desc: 'Explore fee-related information and student perspectives.', color: 'text-teal-600', bg: 'bg-teal-50 border border-teal-100' }
              ].map(cat => (
                <div key={cat.title} className="bg-white border border-slate-200 rounded-xl p-5 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${cat.bg}`}>
                        <cat.icon className={`w-5 h-5 ${cat.color}`} />
                      </div>
                      <h3 className="font-bold text-slate-900">{cat.title}</h3>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 px-2 py-1 rounded-md">
                      <span className="text-sm font-bold text-slate-700">{cat.score} <span className="text-xs text-slate-400 font-normal">/ 10</span></span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">{cat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. STUDENT VOICE */}
        <section className="py-20 border-t border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">What Are Students Saying?</h2>
                <p className="text-slate-600 text-lg mb-8">
                  UniInsights analyzes public student discussions and content to understand the real conversations surrounding universities, going far beyond static rankings.
                </p>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div>
                    <h4 className="text-3xl font-black text-slate-900 mb-1">4,558+</h4>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Student Reviews</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-black text-slate-900 mb-1">4,947+</h4>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Mentions</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-black text-slate-900 mb-1">149+</h4>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Video Sources</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 shadow-md">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#0B1527]" />
                  Aggregate Sentiment Analysis
                </h3>
                
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-semibold text-emerald-600">Positive</span>
                      <span className="text-slate-900 font-bold">68%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '68%' }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-semibold text-slate-600">Neutral</span>
                      <span className="text-slate-900 font-bold">22%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-slate-400 h-full rounded-full" style={{ width: '22%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-semibold text-red-600">Negative</span>
                      <span className="text-slate-900 font-bold">10%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-red-500 h-full rounded-full" style={{ width: '10%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. EXPLORE A UNIVERSITY (Search) */}
        <section className="py-24 border-t border-slate-200 relative overflow-hidden bg-slate-50">
          <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Explore a University</h2>
            <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto">
              Search for a university and discover its data-driven profile immediately.
            </p>
            
            <div className="max-w-xl mx-auto text-left relative z-50">
              <UniversitySearch 
                onSelect={handleSearchSelect} 
                placeholder="Search universities e.g., IIT Delhi, BITS Pilani..."
              />
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {['IIT Delhi', 'VIT Vellore', 'Manipal University', 'SRM Institute of Science and Technology'].map(u => (
                <button 
                  key={u} 
                  onClick={() => handleSearchSelect(u)}
                  className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-sm"
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 6. COMPARE UNIVERSITIES */}
        <section className="py-20 border-t border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
              <div className="max-w-lg">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Compare Before You Choose</h2>
                <p className="text-slate-600 mb-8">
                  Put universities side-by-side to see exactly how they stack up across academics, infrastructure, and real student experiences.
                </p>
                <Link
                  href="/compare"
                  className="bg-[#0B1527] hover:bg-[#162238] text-white py-3 px-6 rounded-xl font-bold text-sm inline-flex items-center gap-2 transition-all shadow-sm"
                >
                  Compare Universities <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="w-full lg:w-auto flex-1 max-w-2xl bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 text-sm">Category Breakdown</h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Preview</span>
                </div>
                <div className="p-0 overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 font-semibold text-slate-600 uppercase text-xs">Category</th>
                        <th className="px-6 py-3 font-bold text-[#0B1527]">BMU</th>
                        <th className="px-6 py-3 font-bold text-emerald-600">VIT</th>
                        <th className="px-6 py-3 font-bold text-indigo-600">Manipal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {[
                        { cat: 'Academics', b: 7.8, v: 8.5, m: 8.3 },
                        { cat: 'Placement', b: 7.5, v: 8.7, m: 8.6 },
                        { cat: 'Infrastructure', b: 8.2, v: 8.8, m: 8.5 },
                        { cat: 'Experience', b: 7.6, v: 8.1, m: 8.0 }
                      ].map(row => (
                        <tr key={row.cat} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-3 font-medium text-slate-700">{row.cat}</td>
                          <td className="px-6 py-3 font-semibold text-slate-900">{row.b}</td>
                          <td className="px-6 py-3 font-semibold text-slate-900">{row.v}</td>
                          <td className="px-6 py-3 font-semibold text-slate-900">{row.m}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. FINAL CTA */}
        <section className="py-24 border-t border-slate-200 text-center bg-slate-50">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
              Don't choose a university based on one number.
            </h2>
            <p className="text-lg text-slate-600 mb-10">
              Explore the data. Understand the student voice. Compare what matters. Make an informed decision.
            </p>
            <Link
              href="/dashboard"
              className="bg-[#0B1527] hover:bg-[#162238] text-white py-4 px-8 rounded-xl font-bold text-base inline-flex items-center gap-2 transition-all shadow-md shadow-slate-900/20 hover:-translate-y-1"
            >
              Explore UniInsights <ArrowRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white rounded border border-slate-200 flex items-center justify-center p-0.5 shadow-sm">
              <Image src="/logo.png" alt="UniInsights Logo" width={20} height={20} className="object-contain" />
            </div>
            <span className="text-sm font-semibold text-slate-900">UniInsights</span>
          </div>
          <p className="text-xs text-slate-500">
            Know Your Campus. Choose with Confidence.
          </p>
        </div>
      </footer>
    </div>
  );
}

