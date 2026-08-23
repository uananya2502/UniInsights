'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, ShieldCheck, ArrowRight, Home, Star, Building2, BarChart3, Newspaper } from 'lucide-react';
import { UserProfile } from '@/components/auth/AuthModal';

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<'Student' | 'Researcher' | 'Alumni'>('Student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const userDisplayName = name.trim() || 'Ananya Sharma';
      const initials = userDisplayName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

      const userProfile: UserProfile = {
        name: userDisplayName,
        email: email || 'student@uniinsights.edu',
        role,
        avatarInitials: initials || 'AS',
      };

      localStorage.setItem('uniinsights_user', JSON.stringify(userProfile));
      setIsLoading(false);
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Left Column - Branding Showcase (Desktop) */}
      <div className="md:w-1/2 bg-[#0B1527] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between z-10">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/uniinsights-official-logo.png" alt="UniInsights Logo" width={40} height={40} className="object-contain" />
            <div>
              <span className="font-black text-xl tracking-tight text-white block leading-none">UniInsights</span>
              <span className="text-[11px] text-slate-400 font-medium">Know Your Campus</span>
            </div>
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/80 transition-all hover:bg-slate-700"
          >
            <Home className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
        </div>

        <div className="my-12 z-10 space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-blue-400" />
            <span>Join 10,000+ Students & Researchers</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
            Create Your Free Account on <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">UniInsights.</span>
          </h1>

          <p className="text-sm text-slate-300 font-medium leading-relaxed">
            Unlock complete university report cards, compare top campuses side-by-side, and explore verified student reviews.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-200">
              <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <span>100+ Top Indian Universities & IITs Catalog</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-200">
              <div className="w-7 h-7 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 flex-shrink-0">
                <BarChart3 className="w-4 h-4" />
              </div>
              <span>Dual-Axis Sentiment Trajectory & Reputation Timelines</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-200">
              <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                <Newspaper className="w-4 h-4" />
              </div>
              <span>Live Student Discussions & National News Stream</span>
            </div>
          </div>
        </div>

        <div className="z-10 flex items-center justify-between text-xs text-slate-400 font-medium border-t border-slate-800/80 pt-6">
          <span className="flex items-center gap-1.5 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-teal-400" /> Government Verified Data
          </span>
          <span>UniInsights &copy; 2026</span>
        </div>
      </div>

      {/* Right Column - Signup Card Form */}
      <div className="md:w-1/2 bg-slate-50 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200/90 p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Create Account</h2>
            <p className="text-xs font-medium text-slate-500">Get started with your free UniInsight account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Account Persona
              </label>
              <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setRole('Student')}
                  className={`py-2 rounded-lg transition-all text-center ${
                    role === 'Student' ? 'bg-blue-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setRole('Researcher')}
                  className={`py-2 rounded-lg transition-all text-center ${
                    role === 'Researcher' ? 'bg-[#0B1527] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Researcher
                </button>
                <button
                  type="button"
                  onClick={() => setRole('Alumni')}
                  className={`py-2 rounded-lg transition-all text-center ${
                    role === 'Alumni' ? 'bg-teal-700 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Alumni
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="Ananya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="student@uniinsights.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-[#0B1527] hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold shadow-md transition-all flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  <span>Create Free Account</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 font-medium pt-2">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-blue-600 hover:text-blue-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
