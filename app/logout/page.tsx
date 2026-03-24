// app/logout/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi';

export default function LogoutPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0); // 0 to 100%
  const [secondsLeft, setSecondsLeft] = useState(10); // numeric countdown
  const duration = 10000; // 10 seconds
  const intervalTime = 50; // update every 50ms for smooth animation

  useEffect(() => {
    // Clear user
    localStorage.removeItem('user');

    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed += intervalTime;
      setProgress(Math.min((elapsed / duration) * 100, 100));
      setSecondsLeft(Math.ceil((duration - elapsed) / 1000));
    }, intervalTime);

    const timeout = setTimeout(() => {
      router.replace('/');
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  // Circle params
  const radius = 60;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  // Color transition: green → yellow → red
  const getColor = (p: number) => {
    if (p < 50) return '#4ade80'; // green
    if (p < 80) return '#facc15'; // yellow
    return '#f87171'; // red
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <svg height={radius * 2} width={radius * 2} className="mb-6 transform -rotate-90">
        <circle
          stroke="#374151" // background ring
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
          style={{ transition: 'stroke-dashoffset 0.05s linear, stroke 0.2s linear' }}
        />
        <foreignObject x={0} y={0} width={radius * 2} height={radius * 2}>
          <div className="flex flex-col items-center justify-center w-full h-full">
            <FiLogOut className="text-4xl mb-1" />
            <span className="text-xl font-bold">{secondsLeft}s</span>
          </div>
        </foreignObject>
      </svg>

      <h1 className="text-3xl font-bold mb-2">Logging out...</h1>
      <p className="text-gray-400">
        Redirecting to homepage...
      </p>
      <p className="text-sm text-gray-500 mt-2">
        If you are not redirected,{' '}
        <span className="underline cursor-pointer" onClick={() => router.replace('/')}>
          click here
        </span>
        .
      </p>
    </div>
  );
}