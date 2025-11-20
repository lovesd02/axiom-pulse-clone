'use client';

import ColumnGroup from './ColumnGroup';
import TokenRow from './TokenRow';
import Skeleton from '@/components/atoms/Skeleton';
import { useTokensQuery } from '@/hooks/useTokensQuery';
import { useWsMock } from '@/hooks/useWsMock';
import type { Token } from '@/lib/types';
import { useState, useMemo } from 'react';
import TokenDetailsDialog from './TokenDetailsDialog';
import { useAppSelector, useAppDispatch } from '@/store';
import {
  setSort,
  SortKey,
  GroupFilter,
  setGroupFilter,
  setLimit
} from '@/store/tokensSlice';
import SortPopover from '@/components/molecules/SortPopover';
import FilterBar from '@/components/molecules/FilterBar';

export default function TokenTable() {
  const { data, isLoading, isError, error } = useTokensQuery();
  useWsMock(true);

  const sortKey = useAppSelector((s) => s.tokensUI.sortKey);
  const sortDir = useAppSelector((s) => s.tokensUI.sortDir);
  const groupFilter = useAppSelector((s) => s.tokensUI.groupFilter);
  const limit = useAppSelector((s) => s.tokensUI.limit);
  const dispatch = useAppDispatch();

  const [selected, setSelected] = useState<Token | null>(null);

  const filteredAndSorted = useMemo(() => {
    if (!data) return [];
    const factor = sortDir === 'asc' ? 1 : -1;
    const key: SortKey = sortKey;

    let arr = [...data];

    // Filter by group if not "all"
    if (groupFilter !== 'all') {
      arr = arr.filter((t) => t.group === groupFilter);
    }

    // Sort by current key
    arr.sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (av === bv) return 0;
      return av > bv ? factor : -factor;
    });

    // Limit: top N by current sort
    if (limit > 0 && arr.length > limit) {
      arr = arr.slice(0, limit);
    }

    return arr;
  }, [data, sortKey, sortDir, groupFilter, limit]);

  const handleSortChange = (key: SortKey, dir: 'asc' | 'desc') => {
    dispatch(setSort({ key, dir }));
  };

  const handleGroupChange = (value: GroupFilter) => {
    dispatch(setGroupFilter(value));
  };

  const handleLimitChange = (value: number) => {
    dispatch(setLimit(value));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 lg:flex-row">
        {[0, 1, 2].map((i) => (
          <section
            key={i}
            className="card-surface min-w-[320px] flex-1"
          >
            <header className="card-header flex items-center justify-between px-3 py-2">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-4 w-16 rounded-full" />
            </header>
            <div className="space-y-1.5 p-3">
              {Array.from({ length: 7 }).map((_, j) => (
                <Skeleton
                  key={j}
                  className="h-[52px] w-full rounded-lg"
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-xl border border-red-800 bg-red-900/20 p-4 text-sm">
        <div className="mb-1 font-semibold">
          Failed to load tokens
        </div>
        <div className="text-xs text-red-200">
          {(error as Error)?.message}
        </div>
      </div>
    );
  }

  const byGroup = (group: Token['group']) =>
    filteredAndSorted.filter((t) => t.group === group);

  const totalCount = data.length;
  const visibleCount = filteredAndSorted.length;

  return (
    <>
      {/* top control bar: counts + filters + sort */}
      <div className="mb-3 flex flex-col gap-2 text-[11px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <span>
            Showing{' '}
            <span className="font-semibold text-slate-100">
              {visibleCount}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-slate-100">
              {totalCount}
            </span>{' '}
            tokens
          </span>
          <FilterBar
            groupFilter={groupFilter}
            limit={limit}
            onGroupChange={handleGroupChange}
            onLimitChange={handleLimitChange}
          />
        </div>

        <div className="flex items-center justify-end gap-2">
          <span className="hidden text-[10px] uppercase tracking-wide text-slate-500 sm:inline">
            Sort
          </span>
          <SortPopover
            sortKey={sortKey}
            sortDir={sortDir}
            onChange={handleSortChange}
          />
        </div>
      </div>

      {/* columns – respect groupFilter for which columns are shown */}
      <div className="flex flex-col gap-3 lg:flex-row">
        {(groupFilter === 'all' || groupFilter === 'new') && (
          <ColumnGroup title="New Pairs">
            {byGroup('new').map((t) => (
              <TokenRow
                key={t.id}
                token={t}
                onClick={() => setSelected(t)}
              />
            ))}
          </ColumnGroup>
        )}

        {(groupFilter === 'all' || groupFilter === 'final') && (
          <ColumnGroup title="Final Stretch">
            {byGroup('final').map((t) => (
              <TokenRow
                key={t.id}
                token={t}
                onClick={() => setSelected(t)}
              />
            ))}
          </ColumnGroup>
        )}

        {(groupFilter === 'all' || groupFilter === 'migrated') && (
          <ColumnGroup title="Migrated">
            {byGroup('migrated').map((t) => (
              <TokenRow
                key={t.id}
                token={t}
                onClick={() => setSelected(t)}
              />
            ))}
          </ColumnGroup>
        )}
      </div>

      <TokenDetailsDialog
        token={selected}
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      />
    </>
  );
}
