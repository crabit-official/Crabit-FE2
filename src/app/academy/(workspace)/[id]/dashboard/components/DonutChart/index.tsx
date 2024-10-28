'use client';

import React, { useEffect, useState } from 'react';

interface IDonutChartProps {
  approvedRate: number;
  color: string;
  size?: 'small' | 'large';
}

function DonutChart({ approvedRate, color, size = 'small' }: IDonutChartProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setProgress(approvedRate);
    }, 0);
  }, [approvedRate]);

  const radius = size === 'large' ? 100 : 50;
  const stroke = size === 'large' ? 44 : 22;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2}>
        <g transform={`rotate(-90, ${radius}, ${radius})`}>
          <circle stroke={color} opacity={0.2} fill="transparent" strokeWidth={stroke} r={normalizedRadius} cx={radius} cy={radius} />
          <circle
            stroke={color}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-1000 ease-out"
          />
        </g>
        <text x="50%" y="50%" dy=".3em" textAnchor="middle" className="fill-current text-lg font-bold">
          {`${progress}%`}
        </text>
      </svg>
    </div>
  );
}

export default DonutChart;
