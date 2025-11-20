'use client';

import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { Token } from '@/lib/types';

/**
 * Simulate a WebSocket stream by tweaking prices every 2 seconds.
 * - Random subset of tokens are updated each tick (~20%).
 * - Price moves +/- 2% per tick.
 * - Slight nudges to 24h change, volume & tx to keep it lively.
 */
export function useWsMock(enabled = true) {
  const qc = useQueryClient();
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    timerRef.current = window.setInterval(() => {
      qc.setQueryData<Token[]>(['tokens'], (prev) => {
        if (!prev) return prev;

        return prev.map((t) => {
          // ~20% of tokens change each tick
          if (Math.random() > 0.8) return t;

          const deltaPct = (Math.random() - 0.5) * 0.04; // -2%..+2%
          const newPrice = t.price * (1 + deltaPct);
          const newChange = t.priceChangePct24h + deltaPct * 100;

          // tiny nudges for volume / tx to look active, but not crazy
          const volBump = Math.round((Math.random() - 0.4) * 500);
          const txBump = Math.round((Math.random() - 0.4) * 15);

          return {
            ...t,
            price: Number(newPrice.toFixed(6)),
            priceChangePct24h: Number(newChange.toFixed(2)),
            volume24h: Math.max(0, t.volume24h + volBump),
            txCount: Math.max(0, t.txCount + txBump)
          };
        });
      });
    }, 2000); // 2 seconds

    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [enabled, qc]);
}
