'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ShieldCheck, ArrowRight, Home, CheckCircle2, Star, Building2, BarChart3, Newspaper } from 'lucide-react';
import { UserProfile } from '@/components/auth/AuthModal';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<'Student' | 'Researcher' | 'Alumni'>('Student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const name = email.split('@')[0] ? email.split('@')[0] : 'Ananya Sharma';
      const userProfile: UserProfile = {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email: email || 'student@uniinsights.edu',
        role,
        avatarInitials: name.slice(0, 2).toUpperCase(),
      };

      localStorage.setItem('uniinsights_user', JSON.stringify(userProfile));
      setIsLoading(false);
      router.push('/dashboard');
    }, 600);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      const googleUser: UserProfile = {
        name: 'Alex Morgan',
        email: 'alex.morgan@gmail.com',
        role: 'Student',
        avatarInitials: 'AM',
      };
      localStorage.setItem('uniinsights_user', JSON.stringify(googleUser));
      setIsLoading(false);
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Left Column - Branding Showcase (Desktop) */}
      <div className="md:w-1/2 bg-[#0B1527] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        {/* Ambient Gradient Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
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

        {/* Hero Copy & Features */}
        <div className="my-12 z-10 space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-blue-400" />
            <span>Trusted Higher Education Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
            Choose Your Ideal College with <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">Confidence.</span>
          </h1>

          <p className="text-sm text-slate-300 font-medium leading-relaxed">
            Access 100+ verified university profiles, NIRF government metrics, student review sentiment analysis, and live campus news feeds in one place.
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

        {/* Footer info */}
        <div className="z-10 flex items-center justify-between text-xs text-slate-400 font-medium border-t border-slate-800/80 pt-6">
          <span className="flex items-center gap-1.5 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-teal-400" /> Government Verified Data
          </span>
          <span>UniInsights &copy; 2026</span>
        </div>
      </div>

      {/* Right Column - Login Card Form */}
      <div className="md:w-1/2 bg-slate-50 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200/90 p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Sign In</h2>
            <p className="text-xs font-medium text-slate-500">Welcome back! Please enter your details.</p>
          </div>

          {/* Social Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs transition-all hover:border-slate-400"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Continue with Google
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider absolute">or login with email</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection Pill */}
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

            {/* Email Input */}
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

            {/* Password Input */}
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

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-1.5 font-semibold text-slate-600 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                Remember me
              </label>
              <a href="#" onClick={(e) => e.preventDefault()} className="font-bold text-blue-600 hover:text-blue-700">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-[#0B1527] hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold shadow-md transition-all flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2 space-y-2">
            <p className="text-xs text-slate-500 font-medium">
              Don't have an account?{' '}
              <Link href="/signup" className="font-bold text-blue-600 hover:text-blue-700">
                Create free account
              </Link>
            </p>
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  const guestUser: UserProfile = {
                    name: 'Guest User',
                    email: 'guest@uniinsights.edu',
                    role: 'Student',
                    avatarInitials: 'GU',
                  };
                  localStorage.setItem('uniinsights_user', JSON.stringify(guestUser));
                  router.push('/dashboard');
                }}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
              >
                Skip &amp; Continue as Guest &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

