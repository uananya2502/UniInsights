'use client';

import './globals.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Newspaper,
  MessageSquare,
  TrendingUp,
  Menu,
  X,
  Home,
  LogOut,
  User,
  ChevronDown,
  LogIn,
} from 'lucide-react';
import { AuthModal, UserProfile } from '@/components/auth/AuthModal';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/compare', label: 'Compare', icon: BarChart3 },
  { href: '/students', label: 'Student Voice', icon: Users },
  { href: '/news', label: 'Intelligence Feed', icon: Newspaper },
  { href: '/chat', label: 'Ask Seniors', icon: MessageSquare },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auth State
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('uniinsights_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        setUser({
          name: 'Rajesh Kumar',
          email: 'researcher@uniinsights.edu',
          role: 'Researcher',
          avatarInitials: 'R',
        });
      }
    } else {
      // Default initial logged in persona for demo
      const defaultUser: UserProfile = {
        name: 'Rajesh Kumar',
        email: 'researcher@uniinsights.edu',
        role: 'Researcher',
        avatarInitials: 'R',
      };
      setUser(defaultUser);
      localStorage.setItem('uniinsights_user', JSON.stringify(defaultUser));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('uniinsights_user');
    setUser(null);
    setUserMenuOpen(false);
  };

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
    setUserMenuOpen(false);
  };

  const isStandalonePage = pathname === '/' || pathname === '/login' || pathname === '/signup';

  return (
    <html lang="en">
      <head>
        <title>UniInsights | Know Your Campus. Choose with Confidence.</title>
        <meta name="description" content="Comprehensive thesis dashboard for university data analysis. Compare universities, explore student reviews, and make informed decisions." />
      </head>
      <body className="bg-slate-50 antialiased font-sans">
        {isStandalonePage ? (
          <>{children}</>
        ) : (
          <div className="flex min-h-screen bg-slate-50">

            {/* Mobile overlay */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-slate-900/60 z-40 md:hidden animate-fade-in"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Sidebar */}
            <aside className={`
              fixed md:sticky md:top-0 h-screen z-50
              w-[240px] bg-white text-slate-900 flex flex-col border-r border-slate-200/80
              transform transition-transform duration-200 ease-in-out flex-shrink-0
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
              {/* Logo */}
              <div className="h-20 flex items-center px-5 border-b border-slate-100">
                <Link href="/" className="flex items-center gap-3">
                  <Image src="/uniinsights-official-logo.png" alt="UniInsights Logo" width={38} height={38} className="object-contain flex-shrink-0" />
                  <div>
                    <span className="font-extrabold text-lg tracking-tight text-slate-900 block leading-snug">UniInsights</span>
                    <span className="text-[11px] text-slate-500 block font-medium">Know Your Campus</span>
                  </div>
                </Link>
                <button
                  className="ml-auto md:hidden text-slate-400 hover:text-slate-700"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 py-5 px-3 space-y-1 overflow-y-auto">
                <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  NAVIGATION
                </p>
                {navItems.map((item) => {
                  const isActive = pathname === item.href || 
                    (item.href !== '/' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`sidebar-link ${isActive ? 'active' : ''}`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="w-4 h-4 mr-3 flex-shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}

                <div className="pt-5">
                  <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    ANALYTICS VIEWS
                  </p>
                  <Link
                    href="/reputation-timeline"
                    className={`sidebar-link ${pathname === '/reputation-timeline' ? 'active' : ''}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <TrendingUp className="w-4 h-4 mr-3 flex-shrink-0" />
                    Reputation Timeline
                  </Link>
                </div>
              </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 min-h-screen">
              {/* Top Header Bar */}
              <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 flex-shrink-0 sticky top-0 z-30 shadow-2xs">
                <div className="flex items-center gap-3">
                  <button
                    className="md:hidden text-slate-600 hover:text-slate-900 p-1"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                </div>

                {/* User Auth Section */}
                <div className="relative">
                  {user ? (
                    <div className="relative">
                      <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition-colors text-left"
                      >
                        <div className="flex flex-col text-right hidden sm:flex">
                          <span className="text-xs font-extrabold text-slate-900 leading-none">{user.name}</span>
                          <span className="text-[10px] font-bold text-blue-600 mt-0.5">{user.role}</span>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-[#0B1527] text-white flex items-center justify-center text-xs font-extrabold shadow-2xs border border-slate-800">
                          {user.avatarInitials}
                        </div>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                      </button>

                      {/* Dropdown Menu */}
                      {userMenuOpen && (
                        <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-slide-up">
                          <div className="px-3.5 py-2 border-b border-slate-100">
                            <p className="text-xs font-extrabold text-slate-900">{user.name}</p>
                            <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                          </div>
                          <button
                            onClick={() => openAuth('login')}
                            className="w-full text-left px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                          >
                            <User className="w-3.5 h-3.5 text-slate-400" />
                            Switch Persona
                          </button>
                          <button
                            onClick={handleSignOut}
                            className="w-full text-left px-3.5 py-2 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-slate-100"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            Sign Out
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openAuth('login')}
                        className="px-3 py-1.5 text-xs font-extrabold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <LogIn className="w-3.5 h-3.5" />
                        Sign In
                      </button>
                      <button
                        onClick={() => openAuth('signup')}
                        className="px-3 py-1.5 text-xs font-extrabold text-white bg-[#0B1527] hover:bg-slate-800 rounded-lg shadow-2xs transition-all"
                      >
                        Create Account
                      </button>
                    </div>
                  )}
                </div>
              </header>

              {/* Page Content */}
              <div className="flex-1 p-0 bg-slate-50">
                {children}
              </div>
            </main>
          </div>
        )}

        {/* Global Auth Modal */}
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          initialMode={authMode}
          onSuccess={(u) => setUser(u)}
        />
      </body>
    </html>
  );
}



