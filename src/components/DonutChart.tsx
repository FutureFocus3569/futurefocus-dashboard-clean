'use client';

import React from 'react';

interface DonutChartProps {
  label: string;
  value: number;
  color?: string;
}

export default function DonutChart({ label, value, color = 'text-green-500' }: DonutChartProps) {
  const percentage = Math.min(Math.max(value, 0), 100);

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
          className={color}
          stroke="currentColor"
          strokeWidth="3.8"
          strokeDasharray={`${percentage}, 100`}
          fill="none"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text
          x="18"
          y="20.35"
          className="fill-current text-gray-800 text-[8px]"
          textAnchor="middle"
        >
          {Math.round(value)}%
        </text>
      </svg>
      <span className="mt-1 text-[12px]">{label}</span>
    </div>
  );
}
