'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function Navbar() {
  const [logoOpen, setLogoOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const logoRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  // Load persisted theme on mount
  useEffect(() => {
    const stored = (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    setTheme(stored);
    document.documentElement.setAttribute('data-theme', stored);
  }, []);

  // Persist + apply theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (logoRef.current && !logoRef.current.contains(target)) setLogoOpen(false);
      if (aboutRef.current && !aboutRef.current.contains(target)) setAboutOpen(false);
      if (moreRef.current && !moreRef.current.contains(target)) setMoreOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  const DropdownMenu = ({ children }: { children: React.ReactNode }) => (
    <ul className="absolute left-0 mt-2 w-44 bg-gray-900 border border-white/10 rounded-xl shadow-xl py-1 z-50">
      {children}
    </ul>
  );

  const DropdownItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <li>
      <Link
        href={href}
        className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors rounded-lg mx-1"
      >
        {children}
      </Link>
    </li>
  );

  const ChevronIcon = ({ open }: { open: boolean }) => (
    <svg
      className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <nav className="bg-[#0f172a] border-b border-white/[0.08] px-4 h-14 flex items-center justify-between relative z-50">
      {/* Brand */}
      <div className="relative" ref={logoRef}>
        <button
          onClick={() => setLogoOpen(o => !o)}
          className="flex items-center gap-1.5 text-white font-medium text-base hover:text-white/80 transition-colors"
        >
          MySite
          <ChevronIcon open={logoOpen} />
        </button>
        {logoOpen && (
          <DropdownMenu>
            <DropdownItem href="/profile">Profile</DropdownItem>
            <DropdownItem href="/dashboard">Dashboard</DropdownItem>
            <li>
              <button
                onClick={() => { localStorage.removeItem('user'); window.location.href = '/login'; }}
                className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors rounded-lg mx-1"
              >
                Log out
              </button>
            </li>
          </DropdownMenu>
        )}
      </div>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6">
        <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">Home</Link>

        <div className="relative" ref={aboutRef}>
          <button
            onClick={() => setAboutOpen(o => !o)}
            className="flex items-center gap-1 text-sm text-white/60 hover:text-white transition-colors"
          >
            About <ChevronIcon open={aboutOpen} />
          </button>
          {aboutOpen && (
            <DropdownMenu>
              <DropdownItem href="/about">About</DropdownItem>
              <DropdownItem href="/githubusers">GitHub Users</DropdownItem>
              <DropdownItem href="/about/contact">Contact</DropdownItem>
            </DropdownMenu>
          )}
        </div>

        <div className="relative" ref={moreRef}>
          <button
            onClick={() => setMoreOpen(o => !o)}
            className="flex items-center gap-1 text-sm text-white/60 hover:text-white transition-colors"
          >
            More <ChevronIcon open={moreOpen} />
          </button>
          {moreOpen && (
            <DropdownMenu>
              <DropdownItem href="/blog">Blog</DropdownItem>
              <DropdownItem href="/services">Services</DropdownItem>
            </DropdownMenu>
          )}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 transition-all"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-white/70 hover:text-white"
        onClick={() => setMobileOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {mobileOpen
            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="absolute top-14 left-0 right-0 bg-[#0f172a] border-b border-white/[0.08] py-3 px-4 flex flex-col gap-1 md:hidden">
          {[
            { href: '/', label: 'Home' },
            { href: '/about', label: 'About' },
            { href: '/githubusers', label: 'GitHub Users' },
            { href: '/about/contact', label: 'Contact' },
            { href: '/blog', label: 'Blog' },
            { href: '/services', label: 'Services' },
            { href: '/dashboard', label: 'Dashboard' },
            { href: '/profile', label: 'Profile' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="text-sm text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition-colors"
            >
              {label}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            className="text-left text-sm text-white/60 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors mt-1"
          >
            {theme === 'light' ? '🌙 Switch to Dark' : '☀️ Switch to Light'}
          </button>
        </div>
      )}
    </nav>
  );
}