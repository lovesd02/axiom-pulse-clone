import { ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactNode;
};

export default function ColumnGroup({ title, children }: Props) {
  return (
    <section className="card-surface flex-1 min-w-[320px] overflow-hidden transition hover:shadow-[0_0_0_1px_#1f2937]">
      <header className="card-header flex items-center justify-between px-3 py-2 text-[11px] leading-none">
        <div className="flex items-center gap-2">
          <span className="rounded-sm bg-slate-100/5 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-300">
            {title}
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-wide text-slate-500">
          BNB
        </span>
      </header>
      <div className="flex items-center gap-2 border-b border-borderSoft/80 px-3 py-1.5 text-[10px] text-slate-400">
        <span className="rounded-sm border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-[1px] text-[10px] text-emerald-400 backdrop-blur">          Bonding: 19.80%
        </span>

        <span className="ml-auto flex items-center gap-1">
          <span className="rounded bg-slate-800 px-1.5 py-[1px]">P1</span>
          <span className="rounded bg-slate-800 px-1.5 py-[1px]">P2</span>
          <span className="rounded bg-slate-800 px-1.5 py-[1px]">P3</span>
        </span>
      </div>

      <div className="divide-y divide-borderSoft/80">
        {children}
      </div>
    </section>
  );
}
