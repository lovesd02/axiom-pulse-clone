'use client';

import type { GroupFilter } from '@/store/tokensSlice';
import clsx from 'clsx';

type Props = {
  groupFilter: GroupFilter;
  limit: number;
  onGroupChange: (value: GroupFilter) => void;
  onLimitChange: (value: number) => void;
};

const GROUPS: { value: GroupFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'new', label: 'New' },
  { value: 'final', label: 'Final Stretch' },
  { value: 'migrated', label: 'Migrated' }
];

const LIMITS = [20, 50, 100];

export default function FilterBar({
  groupFilter,
  limit,
  onGroupChange,
  onLimitChange
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* group chips */}
      <div className="inline-flex rounded-full border border-slate-700/80 bg-slate-900/90 p-[2px]">
        {GROUPS.map((g) => {
          const active = g.value === groupFilter;
          return (
            <button
              key={g.value}
              type="button"
              onClick={() => onGroupChange(g.value)}
              className={clsx(
                'px-2.5 py-0.5 text-[11px] rounded-full transition-colors',
                active
                  ? 'bg-white text-black font-semibold shadow'
                  : 'text-slate-400 hover:bg-slate-800/90'
              )}
            >
              {g.label}
            </button>
          );
        })}
      </div>

      {/* top N selector */}
      <div className="flex items-center gap-1 text-[11px] text-slate-400">
        <span className="hidden sm:inline">Top</span>
        <div className="inline-flex overflow-hidden rounded-full border border-slate-700 bg-slate-900/80">
          {LIMITS.map((val) => {
            const active = val === limit;
            return (
              <button
                key={val}
                type="button"
                onClick={() => onLimitChange(val)}
                className={clsx(
                  'px-2 py-0.5 text-[11px] transition-colors',
                  active
                    ? 'bg-slate-100 text-slate-900 font-medium'
                    : 'text-slate-300 hover:bg-slate-800'
                )}
              >
                {val}
              </button>
            );
          })}
        </div>
        <span className="hidden sm:inline">by current sort</span>
      </div>
    </div>
  );
}
