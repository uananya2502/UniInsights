'use client';

import './globals.css';
import { useState } from 'react';
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
      <body className="bg-slate-50 antialiased font-sans">
        {isLanding ? (
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
              w-[250px] bg-slate-900 text-white flex flex-col border-r border-slate-800
              transform transition-transform duration-200 ease-in-out flex-shrink-0
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
              {/* Logo */}
              <div className="h-16 flex items-center px-5 border-b border-slate-800">
                <Link href="/" className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-white rounded-md flex items-center justify-center p-0.5 shadow-xs flex-shrink-0">
                    <Image src="/logo.png" alt="UniInsights Logo" width={32} height={32} className="object-contain" />
                  </div>
                  <div>
                    <span className="font-bold text-base tracking-tight text-white block">UniInsights</span>
                    <span className="text-[10px] text-slate-400 block -mt-1 truncate max-w-[150px]">Know Your Campus</span>
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
              <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
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
                      <item.icon className="w-4 h-4 mr-2.5 flex-shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}

                <div className="pt-4">
                  <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Analytics Views
                  </p>
                  <Link
                    href="/dashboard"
                    className={`sidebar-link ${pathname === '/dashboard' ? 'active' : ''}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <TrendingUp className="w-4 h-4 mr-2.5 flex-shrink-0" />
                    Reputation Timeline
                  </Link>
                </div>
              </nav>

              {/* Footer */}
              <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
                <p className="text-[11px] text-slate-400 leading-snug font-medium">
                  UniInsights Education Portal
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Know Your Campus. Choose with Confidence.
                </p>
              </div>
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
                  <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <Image src="/logo.png" alt="UniInsights Logo" width={22} height={22} className="object-contain" />
                    <span>Indian Education Analytics Platform</span>
                  </div>

                </div>

                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-semibold text-slate-600 hidden sm:inline">Registered Researcher</span>
                  <div className="w-8 h-8 rounded-md bg-slate-900 flex items-center justify-center text-white text-xs font-bold shadow-xs">
                    R
                  </div>
                </div>
              </header>

              {/* Page Content */}
              <div className="flex-1 p-0 bg-slate-50">
                {children}
              </div>
            </main>
          </div>
        )}
      </body>
    </html>
  );
}


