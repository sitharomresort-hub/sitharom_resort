'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Inbox, 
  Calendar, 
  FileText, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  User,
  Image as ImageIcon
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // If path is login, bypass layout checking entirely to avoid loops & nested rendering
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (e) {
      console.error('Error during logout API call', e);
    }
    window.location.href = '/admin/login';
  };

  const navItems = [
    { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Inquiries', href: '/admin/inquiries', icon: Inbox },
    { name: 'Rates & Block Dates', href: '/admin/rates-calendar', icon: Calendar },
    { name: 'Content Manager', href: '/admin/content-manager', icon: FileText },
    { name: 'Image Library', href: '/admin/image-library', icon: ImageIcon },
  ];

  const getPageTitle = () => {
    if (pathname === '/admin/dashboard') return 'Dashboard Overview';
    if (pathname === '/admin/inquiries') return 'Booking Inquiries';
    if (pathname === '/admin/rates-calendar') return 'Pricing & Availability';
    if (pathname === '/admin/content-manager') return 'Website Content Manager';
    if (pathname === '/admin/image-library') return 'Image Library';
    return 'Admin Panel';
  };

  return (
    <div className="min-h-screen bg-[#120d0a] text-warm-white flex">
      {/* ── SIDEBAR (DESKTOP) ────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#1b1410] border-r border-[#c17c45]/15 h-screen sticky top-0">
        {/* Brand Logo Header */}
        <div className="p-8 border-b border-[#c17c45]/10 flex flex-col gap-1.5">
          <h1 className="font-display text-2xl tracking-wider text-warm-white">
            Sitharom <em className="text-clay italic">Resort</em>
          </h1>
          <p className="text-[10px] tracking-widest uppercase text-text-muted">Control Console</p>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 px-4 py-8 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link 
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-300 text-sm tracking-wide ${
                  isActive 
                    ? 'bg-clay text-warm-white shadow-[0_4px_20px_rgba(181,69,27,0.25)]' 
                    : 'text-text-muted hover:bg-white/[0.03] hover:text-warm-white'
                }`}
              >
                <Icon size={18} strokeWidth={1.8} className={isActive ? 'text-warm-white' : 'text-clay'} />
                <span>{item.name}</span>
                {isActive && <ChevronRight size={14} className="ml-auto opacity-70" />}
              </Link>
            );
          })}
        </nav>

        {/* User Info / Logout */}
        <div className="p-4 border-t border-[#c17c45]/10 bg-black/10">
          <div className="flex items-center gap-3 px-2 py-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-clay/20 flex items-center justify-center border border-clay/30 text-clay">
              <User size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold text-warm-white">Administrator</p>
              <p className="text-[9px] uppercase tracking-wider text-text-muted">Super User</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 border border-[#c17c45]/30 hover:border-clay hover:bg-clay text-[#f5efe8] py-3 rounded-xl text-xs tracking-widest uppercase transition-all duration-300"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── MOBILE SIDEBAR DRAWER ────────────────────────────────────── */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
        isSidebarOpen ? 'opacity-100 pointer-events-auto bg-black/60 backdrop-blur-sm' : 'opacity-0 pointer-events-none'
      }`} onClick={() => setIsSidebarOpen(false)}>
        <aside 
          className={`w-64 bg-[#1b1410] border-r border-[#c17c45]/15 h-full flex flex-col transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-[#c17c45]/10 flex items-center justify-between">
            <div>
              <h1 className="font-display text-xl tracking-wider text-warm-white">Sitharom</h1>
              <p className="text-[8px] tracking-widest uppercase text-text-muted font-body">Control Console</p>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="text-text-muted hover:text-warm-white p-1">
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-4 py-8 flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link 
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 text-sm ${
                    isActive 
                      ? 'bg-clay text-warm-white shadow-lg' 
                      : 'text-text-muted hover:bg-white/[0.03] hover:text-warm-white'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-warm-white' : 'text-clay'} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-[#c17c45]/10 bg-black/10">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 border border-[#c17c45]/30 hover:border-clay hover:bg-clay text-warm-white py-3 rounded-xl text-xs tracking-widest uppercase transition-all"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>
      </div>

      {/* ── MAIN WORKSPACE CONTENT ───────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="h-20 bg-[#1b1410] border-b border-[#c17c45]/15 flex items-center justify-between px-6 md:px-8 z-30">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 border border-[#c17c45]/20 rounded-lg text-text-muted hover:text-warm-white"
            >
              <Menu size={20} />
            </button>
            <h2 className="font-display text-xl md:text-2xl text-warm-white tracking-wide">{getPageTitle()}</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-semibold text-warm-white">Sitharom Vythiri</span>
              <span className="text-[9px] uppercase tracking-wider text-clay font-medium">Logged in</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-clay flex items-center justify-center text-warm-white text-xs font-bold shadow-md">
              AD
            </div>
          </div>
        </header>

        {/* Dynamic Inner Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
