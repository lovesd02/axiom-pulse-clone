'use client';

import * as Popover from '@radix-ui/react-popover';
import { SortKey } from '@/store/tokensSlice';
import { ChevronDownIcon } from '@radix-ui/react-icons'; // optional, or remove if you don't use

type Props = {
  sortKey: SortKey;
  sortDir: 'asc' | 'desc';
  onChange: (key: SortKey, dir: 'asc' | 'desc') => void;
};

const LABELS: Record<SortKey, string> = {
  marketCap: 'Market Cap',
  price: 'Price',
  volume24h: 'Volume 24h'
};

export default function SortPopover({ sortKey, sortDir, onChange }: Props) {
  const toggleDir = () => {
    onChange(sortKey, sortDir === 'asc' ? 'desc' : 'asc');
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs text-slate-200 hover:border-slate-500 hover:bg-slate-900"
        >
          <span className="text-[11px] uppercase text-slate-400">
            Sort
          </span>
          <span className="font-medium">{LABELS[sortKey]}</span>
          <span className="text-[10px] text-slate-400">
            {sortDir === 'asc' ? '↑' : '↓'}
          </span>
          <ChevronDownIcon className="h-3 w-3" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="end"
          className="z-40 rounded-lg border border-slate-700 bg-slate-900/90 px-2 py-2 text-xs shadow-xl backdrop-blur-sm"
        >
          <div className="mb-1 px-1 text-[10px] uppercase tracking-wide text-slate-400">
            Sort by
          </div>
          <div className="space-y-1">
            {(['marketCap', 'price', 'volume24h'] as SortKey[]).map(
              (key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => onChange(key, sortDir)}
                  className={`flex w-full items-center justify-between rounded px-2 py-1 text-left hover:bg-slate-800 ${
                    sortKey === key ? 'text-slate-50' : 'text-slate-300'
                  }`}
                >
                  <span>{LABELS[key]}</span>
                  {sortKey === key && (
                    <span className="text-[10px] text-slate-400">
                      {sortDir === 'asc' ? 'asc' : 'desc'}
                    </span>
                  )}
                </button>
              )
            )}
          </div>
          <div className="mt-2 border-t border-slate-800 pt-2">
            <button
              type="button"
              onClick={toggleDir}
              className="w-full rounded bg-slate-800 px-2 py-1 text-[11px] font-medium text-slate-100 hover:bg-slate-700"
            >
              Toggle direction
            </button>
          </div>
          <Popover.Arrow className="fill-slate-800" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
