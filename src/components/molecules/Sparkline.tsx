'use client';

import { useEffect, useMemo, useState } from 'react';

type Props = {
  /** latest price – we maintain a rolling history internally */
  price: number;
  width?: number;
  height?: number;
};

export default function Sparkline({
  price,
  width = 60,
  height = 18
}: Props) {
  const [history, setHistory] = useState<number[]>([price]);

  // Append new price to history whenever it changes
  useEffect(() => {
    setHistory((prev) => {
      const next = [...prev, price];
      // keep last 32 points
      return next.slice(-32);
    });
  }, [price]);

  const path = useMemo(() => {
    if (!history.length) return '';
    const min = Math.min(...history);
    const max = Math.max(...history);
    const span = max - min || 1; // avoid divide-by-zero

    const step = history.length > 1 ? width / (history.length - 1) : width;

    return history
      .map((v, i) => {
        const x = i * step;
        // SVG y is inverted
        const y = height - ((v - min) / span) * height;
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  }, [history, width, height]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
    >
      {/* soft background line */}
      <path
        d={path}
        fill="none"
        stroke="rgba(148, 163, 184, 0.25)"
        strokeWidth={1.5}
      />
      {/* brighter foreground */}
      <path
        d={path}
        fill="none"
        stroke="rgba(52, 211, 153, 0.85)"
        strokeWidth={1}
      />
    </svg>
  );
}
