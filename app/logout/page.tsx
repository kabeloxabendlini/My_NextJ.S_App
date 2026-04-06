// app/logout/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(10);

  const duration = 10000;
  const intervalTime = 50;

  useEffect(() => {
    localStorage.removeItem('user');

    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed += intervalTime;
      setProgress(Math.min((elapsed / duration) * 100, 100));
      setSecondsLeft(Math.ceil((duration - elapsed) / 1000));
    }, intervalTime);

    const timeout = setTimeout(() => router.replace('/'), duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  const radius = 54;
  const stroke = 5;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getColor = (p: number) => {
    if (p < 50) return '#6366f1'; // indigo
    if (p < 80) return '#f59e0b'; // amber
    return '#ef4444';             // red
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 gap-6 px-6">

      {/* Circle timer */}
      <div className="relative">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          {/* Track */}
          <circle
            stroke="currentColor"
            className="text-black/10 dark:text-white/10"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress */}
          <circle
            stroke={getColor(progress)}
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            style={{ transition: 'stroke-dashoffset 0.05s linear, stroke 0.3s ease' }}
          />
        </svg>

        {/* Center label — sits on top of SVG */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Logout icon via SVG — no react-icons dependency */}
          <svg
            className="w-5 h-5 text-gray-500 dark:text-white/40 mb-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
          </svg>
          <span className="text-lg font-semibold text-gray-900 dark:text-white tabular-nums">
            {secondsLeft}s
          </span>
        </div>
      </div>

      {/* Text */}
      <div className="text-center space-y-1.5">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Logging out</h1>
        <p className="text-sm text-gray-500 dark:text-white/40">
          You'll be redirected to the homepage shortly.
        </p>
        <button
          onClick={() => router.replace('/')}
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline mt-1"
        >
          Go now →
        </button>
      </div>

    </div>
  );
}