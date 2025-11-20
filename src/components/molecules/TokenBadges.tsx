'use client';

import Tooltip from '@/components/atoms/Tooltip';

type Props = {
  /** index-ish seed to vary fake time/score a bit */
  seed: number;
};

function pseudoFromSeed(seed: number, max: number, offset = 0) {
  // simple deterministic "random"
  return ((seed * 17 + 31) % max) + offset;
}

export default function TokenBadges({ seed }: Props) {
  const ageSeconds = pseudoFromSeed(seed, 55, 5); // 5s..60s
  const dsScore = pseudoFromSeed(seed, 25, 70);   // 70..94
  const paid = seed % 4 === 0;                    // ~25% paid

  return (
    <div className="mt-0.5 flex flex-wrap items-center gap-1 text-[9px] text-slate-400">
      {/* time since launch */}
      <Tooltip label="Approx. time since launch">
        <span className="rounded-full bg-slate-900/80 px-1.5 py-[1px] text-[9px] text-slate-300">
          {ageSeconds}s
        </span>
      </Tooltip>

      {/* DS score */}
      <Tooltip label="DS score (mock)">
        <span className="rounded-full border border-emerald-500/50 bg-emerald-500/10 px-1.5 py-[1px] text-[9px] text-emerald-400">
          DS {dsScore}%
        </span>
      </Tooltip>

      {/* Paid badge (sometimes on) */}
      {paid && (
        <Tooltip label="Sponsored listing (mock)">
          <span className="rounded-full border border-amber-400/60 bg-amber-400/10 px-1.5 py-[1px] text-[9px] text-amber-300">
            Paid
          </span>
        </Tooltip>
      )}
    </div>
  );
}
