'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [confirmed, setConfirmed] = useState(false);

  const duration = 10000;
  const intervalTime = 50;

  useEffect(() => {
    if (!confirmed) return;

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
  }, [confirmed, router]);

  const radius = 54;
  const stroke = 5;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getColor = (p: number) => {
    if (p < 50) return '#6366f1';
    if (p < 80) return '#f59e0b';
    return '#ef4444';
  };

  // ── Confirmation dialog ───────────────────────────────────────────────────
  if (!confirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-sm p-8 flex flex-col items-center gap-6 border border-gray-100 dark:border-white/10">

          {/* Warning icon */}
          <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-400/10 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-amber-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
          </div>

          {/* Text */}
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Are you sure you want to log out?
            </h2>
            <p className="text-sm text-gray-500 dark:text-white/40">
              You'll need to sign in again to access your account.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col w-full gap-3">
            <button
              onClick={() => setConfirmed(true)}
              className="w-full py-2.5 rounded-xl bg-red-500 hover:bg-red-600 active:scale-95 text-white text-sm font-semibold transition-all duration-150"
            >
              Yes, log me out
            </button>
            <button
              onClick={() => router.back()}
              className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 active:scale-95 text-gray-700 dark:text-white text-sm font-semibold transition-all duration-150"
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ── Logout-in-progress screen (unchanged) ─────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 gap-6 px-6">

      <div className="relative">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          <circle
            stroke="currentColor"
            className="text-black/10 dark:text-white/10"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
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

        <div className="absolute inset-0 flex flex-col items-center justify-center">
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