'use client';

import './globals.css';
import { useState } from 'react';
import Link from 'next/link';
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
  GraduationCap,
  Home,
} from 'lucide-react';

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

  const isLanding = pathname === '/';

  return (
    <html lang="en">
      <head>
        <title>UniInsights | Know Your Campus. Choose with Confidence.</title>
        <meta name="description" content="Comprehensive thesis dashboard for university data analysis. Compare universities, explore student reviews, and make informed decisions." />
      </head>
      <body className="bg-slate-50 antialiased">
        {isLanding ? (
          <>{children}</>
        ) : (
          <div className="flex h-screen overflow-hidden">
            {/* Mobile overlay */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black/50 z-40 md:hidden animate-fade-in"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Sidebar */}
            <aside className={`
              fixed md:static inset-y-0 left-0 z-50
              w-[260px] bg-navy-900 text-white flex flex-col
              transform transition-transform duration-200 ease-in-out
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
              {/* Logo */}
              <div className="h-16 flex items-center px-5 border-b border-white/10">
                <Link href="/" className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="font-bold text-base tracking-tight">UniInsights</span>
                  </div>
                </Link>
                <button
                  className="ml-auto md:hidden text-slate-400 hover:text-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
                <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                  Navigation
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
                      <item.icon className="w-[18px] h-[18px] mr-3 flex-shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}

                <div className="pt-4">
                  <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                    Analytics
                  </p>
                  <Link
                    href="/dashboard"
                    className={`sidebar-link ${pathname === '/dashboard' ? 'active' : ''}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <TrendingUp className="w-[18px] h-[18px] mr-3 flex-shrink-0" />
                    Reputation Timeline
                  </Link>
                </div>
              </nav>

              {/* Footer */}
              <div className="p-4 border-t border-white/10">
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  UniInsights Thesis Dashboard
                  <br />
                  Data-driven university analytics
                </p>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
              {/* Top Header Bar */}
              <header className="h-14 bg-white border-b border-slate-200 flex items-center px-4 md:px-6 flex-shrink-0 z-30">
                <button
                  className="md:hidden mr-3 text-slate-600 hover:text-slate-900"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="w-5 h-5" />
                </button>

                <div className="flex-1" />

                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-600 hidden sm:inline">
                    Researcher
                  </span>
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                    R
                  </div>
                </div>
              </header>

              {/* Page Content */}
              <div className="flex-1 overflow-y-auto bg-slate-50">
                {children}
              </div>
            </main>
          </div>
        )}
      </body>
    </html>
  );
}
