'use client';

import React, { useEffect, useState } from 'react';

interface DonutChartProps {
  label: string;
  value: number;
  color?: string;
}

export default function DonutChart({ label, value, color = 'text-green-500' }: DonutChartProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const clamped = Math.min(Math.max(value, 0), 100);
    const timeout = setTimeout(() => setAnimatedValue(clamped), 50); // delay to trigger animation
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="flex flex-col items-center text-xs">
      <svg className="w-16 h-16" viewBox="0 0 36 36">
        <path
          className="text-gray-200"
          stroke="currentColor"
          strokeWidth="3.8"
          fill="none"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className={`${color} transition-[stroke-dasharray] duration-1000 ease-out`}
          stroke="currentColor"
          strokeWidth="3.8"
          strokeDasharray={`${animatedValue}, 100`}
          fill="none"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text
  x="18"
  y="20.35"
  className="fill-current text-black font-semibold text-[8px]"
  textAnchor="middle"
>
          {Math.round(value)}%
        </text>
      </svg>
      <span className="mt-1 text-[12px]">{label}</span>
    </div>
  );
}
