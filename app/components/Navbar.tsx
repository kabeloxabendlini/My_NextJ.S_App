'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function Navbar() {
  const [logoOpen, setLogoOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); // default theme

  const logoRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const handleLogout = () => {
    localStorage.removeItem('user'); // or token
    window.location.href = '/login';
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (logoRef.current && !logoRef.current.contains(target)) setLogoOpen(false);
      if (aboutRef.current && !aboutRef.current.contains(target)) setAboutOpen(false);
      if (moreRef.current && !moreRef.current.contains(target)) setMoreOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update html data-theme when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Toggle between light and dark
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const Dropdown = ({ open, children }: { open: boolean; children: React.ReactNode }) =>
    open ? children : null;

  return (
    <nav className="navbar bg-gray-900 text-white shadow-sm px-4 py-3 flex justify-between items-center">
      {/* Logo / Brand Dropdown */}
      <div className="relative" ref={logoRef}>
        <button
          onClick={() => setLogoOpen(!logoOpen)}
          className="btn btn-ghost text-2xl font-bold flex items-center gap-1 text-white"
        >
          MySite
          <svg
            className={`w-4 h-4 transform transition-transform ${logoOpen ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <Dropdown open={logoOpen}>
          <ul className="absolute left-0 mt-2 w-44 bg-gray-800 rounded-md shadow-lg py-2 z-50">
            <li>
              <Link href="/profile" className="block px-4 py-2 hover:bg-primary/20 transition">
                Profile
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="block px-4 py-2 hover:bg-primary/20 transition">
                Dashboard
              </Link>
            </li>
            <li>
              <button onClick={() => (window.location.href = '/logout')}
              className="block w-full text-left px-4 py-2 hover:bg-red-500/20 text-red-400 transition">
              Logout
              </button>
            </li>
          </ul>
        </Dropdown>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        <Link href="/" className="hover:text-primary transition">
          Home
        </Link>

        {/* About Dropdown */}
        <div className="relative" ref={aboutRef}>
          <button
            onClick={() => setAboutOpen(!aboutOpen)}
            className="flex items-center gap-1 hover:text-primary transition"
          >
            About
            <svg
              className={`w-4 h-4 transform transition-transform ${aboutOpen ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <Dropdown open={aboutOpen}>
            <ul className="absolute mt-2 w-44 bg-gray-800 rounded-md shadow-lg py-2 z-50">
              <li>
                <Link href="/about" className="block px-4 py-2 hover:bg-primary/20 transition">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/githubusers"
                  className="block px-4 py-2 hover:bg-primary/20 transition"
                >
                  GitHub Users
                </Link>
              </li>
              <li>
                <Link
                  href="/about/contact"
                  className="block px-4 py-2 hover:bg-primary/20 transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </Dropdown>
        </div>

        {/* More Dropdown */}
        <div className="relative" ref={moreRef}>
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className="flex items-center gap-1 hover:text-primary transition"
          >
            More
            <svg
              className={`w-4 h-4 transform transition-transform ${moreOpen ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <Dropdown open={moreOpen}>
            <ul className="absolute right-0 mt-2 w-44 bg-gray-800 rounded-md shadow-lg py-2 z-50">
              <li>
                <Link href="/blog" className="block px-4 py-2 hover:bg-primary/20 transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/services" className="block px-4 py-2 hover:bg-primary/20 transition">
                  Services
                </Link>
              </li>
            </ul>
          </Dropdown>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="ml-4 btn btn-square btn-ghost text-xl hover:bg-gray-700 transition"
          title="Toggle Theme"
        >
          {theme === 'light' ? '🌞' : '🌙'}
        </button>
      </div>
    </nav>
  );
}