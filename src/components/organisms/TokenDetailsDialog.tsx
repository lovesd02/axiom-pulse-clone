'use client';

import * as Dialog from '@radix-ui/react-dialog';
import type { Token } from '@/lib/types';

type Props = {
  token: Token | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function TokenDetailsDialog({
  token,
  open,
  onOpenChange
}: Props) {
  if (!token) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-slate-700 bg-slate-950/95 p-4 shadow-2xl">
          <Dialog.Title className="mb-1 text-sm font-semibold">
            {token.name}
          </Dialog.Title>
          <Dialog.Description className="mb-3 text-xs text-slate-400">
            {token.symbol} • TX {token.txCount}
          </Dialog.Description>

          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Price</span>
              <span className="font-semibold">
                ${token.price.toFixed(6)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">24h Change</span>
              <span
                className={
                  token.priceChangePct24h >= 0
                    ? 'text-emerald-400'
                    : 'text-red-400'
                }
              >
                {token.priceChangePct24h.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Market Cap</span>
              <span>${token.marketCap.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Volume (24h)</span>
              <span>${token.volume24h.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded-md border border-slate-600 px-3 py-1 text-xs text-slate-100 hover:bg-slate-800"
              >
                Close
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Close
            aria-label="Close"
            className="absolute right-3 top-3 text-slate-400 hover:text-slate-100 text-sm"
          >
            ✕
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
