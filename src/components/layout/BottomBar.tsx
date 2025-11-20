'use client';

export default function BottomBar() {
  return (
    <footer className="sticky bottom-0 z-30 border-t border-slate-900 bg-[#02040b]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-1.5 text-[11px] text-slate-300 sm:px-6">
        {/* left cluster: preset + nav-ish */}
        <div className="flex items-center gap-2">
          <button className="rounded-sm bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-slate-100 border border-slate-700">
            PRESET 1
          </button>

          <div className="hidden items-center gap-2 text-[10px] text-slate-400 sm:flex">
            <span>Wallet</span>
            <span>Twitter</span>
            <span>Discover</span>
            <span className="text-slate-100">Pulse</span>
            <span>PnL</span>
          </div>
        </div>

        {/* middle: balances */}
        <div className="hidden items-center gap-3 text-[10px] sm:flex">
          <span className="text-slate-400">Balance</span>
          <span className="font-semibold text-amber-400">$81.2K</span>
          <span className="text-slate-400">$3,075</span>
          <span className="text-slate-400">$920</span>
        </div>

        {/* right: status */}
        <div className="flex items-center gap-2 text-[10px]">
          <span className="rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-medium text-emerald-950">
            ● Connection is stable
          </span>
          <span className="hidden rounded-full border border-slate-700 bg-slate-900/90 px-2 py-0.5 text-slate-300 sm:inline">
            GLOBAL ▼
          </span>
          <span className="hidden text-slate-500 sm:inline">Docs</span>
        </div>
      </div>
    </footer>
  );
}
