'use client';

import Tooltip from '@/components/atoms/Tooltip';

const navItems = ['Discover', 'Pulse', 'Trackers', 'Perpetuals', 'Portfolio', 'Rewards'];

export default function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-900 bg-[#02040b]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-2 sm:px-6">
        {/* left: logo + nav */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-50 text-[11px] font-black text-slate-900">
              A
            </div>
            <div className="text-sm font-semibold leading-tight">
              AXIOM <span className="text-[11px] text-slate-400">Pro</span>
            </div>
          </div>

          <nav className="hidden items-center gap-4 text-xs text-slate-400 sm:flex">
            {navItems.map((item) => {
              const isActive = item === 'Pulse';
              return (
                <button
                  key={item}
                  type="button"
                  className={
                    'rounded-full px-2.5 py-1 transition-colors ' +
                    (isActive
                      ? 'bg-slate-800/80 text-white shadow-inner'
                      : 'hover:bg-slate-900/70')
                  }
                >
                  {item}
                  {isActive && (
                    <span className="ml-2 mt-[2px] inline-block h-[2px] w-5 rounded-full bg-emerald-400" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* right: search + chain + buttons */}
        <div className="flex items-center gap-3">
          {/* search pill */}
          <div className="hidden items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-[11px] text-slate-400 sm:flex">
            <span className="text-xs">🔍</span>
            <span>Search by token or CA...</span>
          </div>

          {/* chain selector (BNB pill) */}
          <button
            type="button"
            className="hidden h-8 items-center gap-1 rounded-full border border-slate-700/80 bg-[#050816] px-3 text-xs font-medium text-slate-100 shadow-[0_0_0_1px_rgba(15,23,42,0.9)] hover:bg-slate-900/80 sm:flex"
          >
            <span className="h-3 w-3 rounded-full bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,0.6)]" />
            <span>BNB</span>
            <span className="text-[9px] text-slate-400">▼</span>
          </button>


          {/* deposit button */}
          <button className="mt-[1px] rounded-xl bg-gradient-to-r from-[#445EFF] to-[#6A4DFF] px-4 py-[6px] text-[14px] font-semibold text-white shadow-[0_0_15px_rgba(97,90,255,0.35)] transition hover:brightness-110">
            Deposit
          </button>

          {/* right icons */}
          <div className="flex items-center gap-2 text-[13px]">
            {/* “fruit” / profile-ish icon */}
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700/80 bg-gradient-to-br from-[#2b1236] to-[#11041b] shadow-[0_0_0_1px_rgba(15,23,42,0.8),0_0_10px_rgba(190,24,93,0.55)]"
            >
              <span className="text-[14px]">🍑</span>
            </button>

            {/* bell */}
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700/80 bg-[#050816] shadow-[0_0_0_1px_rgba(15,23,42,0.8),0_0_8px_rgba(59,130,246,0.35)]"
            >
              <span className="text-[15px] text-slate-200">🔔</span>
            </button>

            {/* gear / settings */}
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700/80 bg-[#050816] shadow-[0_0_0_1px_rgba(15,23,42,0.8),0_0_8px_rgba(15,23,42,0.8)]"
            >
              <span className="text-[15px] text-slate-200">⚙️</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
