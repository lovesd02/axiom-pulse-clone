'use client';

import { useEffect, useRef, useState } from 'react';

type Props = { pct: number };

export default function PriceChangePill({ pct }: Props) {
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);
  const prevRef = useRef<number>(pct);

  useEffect(() => {
    const prev = prevRef.current;
    if (pct > prev) setFlash('up');
    else if (pct < prev) setFlash('down');
    prevRef.current = pct;

    if (flash) {
      const id = window.setTimeout(() => setFlash(null), 350);
      return () => window.clearTimeout(id);
    }
  }, [pct, flash]);

  const formatted =
    pct > 0 ? `+${pct.toFixed(2)}%` : `${pct.toFixed(2)}%`;

  const base =
    'px-2 py-0.5 text-[11px] font-medium price-flash';

  const modifier =
    flash === 'up'
      ? ' price-flash--up'
      : flash === 'down'
      ? ' price-flash--down'
      : '';

  const color =
    pct > 0 ? ' text-emerald-400' : pct < 0 ? ' text-red-400' : ' text-slate-300';

  return <span className={base + modifier + color}>{formatted}</span>;
}
