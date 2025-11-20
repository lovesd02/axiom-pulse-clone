import TokenTable from '@/components/organisms/TokenTable';

export default function HomePage() {
  return (
    <main className="px-3 py-4 sm:px-6">
      <div className="mx-auto mt-2 flex max-w-6xl flex-col gap-3">
        <header className="flex items-center justify-between">
          <h1 className="text-[20px] font-semibold leading-tight">
            Pulse
          </h1>
          <div className="text-[11px] text-slate-500">
            Axiom Trade token discovery – demo
          </div>
        </header>
        <TokenTable />
      </div>
    </main>
  );
}
