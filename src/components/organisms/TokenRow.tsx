'use client';

import type { Token } from '@/lib/types';
import PriceChangePill from '@/components/molecules/PriceChangePill';
import Skeleton from '@/components/atoms/Skeleton';
import { memo } from 'react';
import Tooltip from '@/components/atoms/Tooltip';

type Props = {
  token: Token;
  onClick?: () => void;
};

function TokenRowBase({ token, onClick }: Props) {
  const isUp = token.priceChangePct24h >= 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-stretch gap-3 px-3 py-2.5 text-left text-xs transition-colors border-b border-slate-800/70 hover:bg-slate-900/70"
    >
      {/* left: avatar / preview */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900">
        {/* placeholder shimmer – later swap to real image */}
        <Skeleton className="h-9 w-9 rounded-md" />
      </div>

      {/* center: name / symbol / extra meta */}
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="flex items-center gap-2">
          <span className="truncate text-[12px] tracking-wide font-semibold uppercase tracking-wide text-slate-100">
            {token.name}
          </span>
          <Tooltip label={`Token ID: ${token.id}`}>
            <span className="rounded-full bg-slate-800/80 px-1.5 py-0.5 text-[9px] text-slate-300">
              ID
            </span>
          </Tooltip>
        </div>
        <div className="mt-0.5 flex items-center justify-between text-[11px] text-slate-500">
          <span className="truncate">{token.symbol}</span>
          <span className="truncate text-right">
            MC ${token.marketCap.toLocaleString()}
          </span>
        </div>
      </div>

      {/* right: price & stats */}
      <div className="flex w-[140px] flex-col items-end justify-between text-[12px] tracking-wide">
        <div className="font-semibold text-slate-100">
          ${token.price.toFixed(4)}
        </div>

        <PriceChangePill pct={token.priceChangePct24h} />

        <div className="mt-0.5 flex w-full justify-between text-[9px] text-slate-500">
          <span>Vol ${token.volume24h.toLocaleString()}</span>
          <span className={isUp ? 'text-emerald-400' : 'text-red-400'}>
            TX {token.txCount}
          </span>
        </div>

        <button
          type="button"
          className="mt-1 rounded-full bg-indigo-500/90 px-2 py-[2px] text-[11px] font-semibold text-white shadow hover:bg-indigo-500"
        >
          + 0 BNB
        </button>
      </div>

    </button>
  );
}

const TokenRow = memo(TokenRowBase);
export default TokenRow;
