import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-grid p-8 text-cyan-50">
      {/* Header */}
      <header className="flex justify-between items-center mb-10 border-b border-cyan-900/50 pb-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter neon-text uppercase">
            Helios Reforum
          </h1>
          <p className="text-cyan-400/60 text-sm tracking-widest">Autonomous Prison Command Node</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-cyan-950/30 px-4 py-2 rounded border border-cyan-800/50 neon-border">
            <span className="block text-xs text-cyan-400">SYS STATUS</span>
            <span className="text-green-400 font-bold">ONLINE</span>
          </div>
          <div className="bg-red-950/30 px-4 py-2 rounded border border-red-800/50">
            <span className="block text-xs text-red-400">ALERT LEVEL</span>
            <span className="text-red-500 font-bold animate-pulse">ELEVATED</span>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Sector Map (Placeholder) */}
        <section className="md:col-span-2 bg-black/40 p-6 rounded-xl border border-cyan-900/50 backdrop-blur-sm neon-border">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
            Facility Overview
          </h2>
          <div className="h-64 bg-cyan-950/20 rounded-lg flex items-center justify-center border border-cyan-900/30 relative overflow-hidden">
            {/* Creating a CSS-only 'radar' effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--neon-blue)_0%,_transparent_70%)] opacity-10"></div>
            <div className="w-full h-[1px] bg-cyan-500/30 absolute top-1/2"></div>
            <div className="h-full w-[1px] bg-cyan-500/30 absolute left-1/2"></div>
            <span className="text-cyan-700 font-mono text-sm">[LIVE FEED: SECTOR 4]</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {['Block A', 'Block B', 'Isolation'].map((block) => (
              <div key={block} className="bg-cyan-950/40 p-3 rounded text-center border border-cyan-900/30">
                <div className="text-xs text-cyan-400 mb-1">{block}</div>
                <div className="text-lg font-bold">SECURE</div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Column */}
        <div className="space-y-6">

          {/* Inmate Stats */}
          <section className="bg-black/40 p-6 rounded-xl border border-cyan-900/50 neon-border">
            <h3 className="text-lg font-bold mb-4 text-cyan-100">Inmate Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-end border-b border-cyan-900/30 pb-2">
                <span className="text-cyan-400/70 text-sm">Total Count</span>
                <span className="text-2xl font-mono text-cyan-300">4,028</span>
              </div>
              <div className="flex justify-between items-end border-b border-cyan-900/30 pb-2">
                <span className="text-cyan-400/70 text-sm">High Risk</span>
                <span className="text-2xl font-mono text-red-400">142</span>
              </div>
              <div className="flex justify-between items-end border-b border-cyan-900/30 pb-2">
                <span className="text-cyan-400/70 text-sm">In Solitary</span>
                <span className="text-2xl font-mono text-orange-400">12</span>
              </div>
            </div>
          </section>

          {/* AI Logs */}
          <section className="bg-black/40 p-6 rounded-xl border border-purple-900/50">
            <h3 className="text-lg font-bold mb-4 text-purple-100 flex items-center gap-2">
              🧠 AI Predictions
            </h3>
            <ul className="space-y-3 font-mono text-xs">
              <li className="text-cyan-300/80">
                <span className="text-cyan-600">[10:42:01]</span> Risk analysis complete for Unit 4.
              </li>
              <li className="text-orange-400">
                <span className="text-cyan-600">[10:44:15]</span> Elevated heart rate: Inmate B-22.
              </li>
              <li className="text-cyan-300/80">
                <span className="text-cyan-600">[10:45:00]</span> Patrol Bot X9 returned to dock.
              </li>
            </ul>
          </section>

        </div>
      </main>
    </div>
  );
}
