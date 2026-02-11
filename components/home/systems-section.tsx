"use client"

export function SystemsSection() {
  return (
    <section id="systems" className="py-32 bg-black relative overflow-hidden border-t border-white/5">
      <div className="z-10 max-w-7xl mx-auto px-6 relative">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 animate-on-scroll animate">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-white/20"></div>
              <span className="text-xs font-mono uppercase tracking-widest text-white/50">
                Platform Features
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bricolage text-white mb-6 tracking-tighter leading-none">
              Core Capabilities
            </h2>
            <p className="text-lg text-white/50 font-light leading-relaxed max-w-lg">
              AI-powered tools designed for architects, designers, and researchers exploring sustainable building solutions.
            </p>
          </div>
          <a href="#" className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full text-sm font-medium hover:bg-neutral-200 transition-all mt-8 md:mt-0">
            <span>See How It Works</span>
            <iconify-icon icon="solar:arrow-right-linear" className="group-hover:translate-x-1 transition-transform"></iconify-icon>
          </a>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {/* Card 1: Nav-AI */}
          <div className="group relative h-[500px] bg-black/40 border border-white/10 rounded-3xl p-8 overflow-hidden hover:bg-black/60 transition-all duration-500 hover:border-white/20 backdrop-blur-sm animate-on-scroll animate delay-100">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-auto text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all duration-500">
              <iconify-icon icon="solar:cpu-bolt-linear" className="text-2xl"></iconify-icon>
            </div>

            {/* Visualization */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none perspective-distant">
              <div className="relative w-[300px] h-[300px] group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border border-emerald-500/30 animate-[spin_10s_linear_infinite]"></div>
                  <div className="absolute w-40 h-40 rounded-full border border-dashed border-emerald-500/20 animate-[spin_15s_linear_infinite_reverse]"></div>
                  <div className="absolute w-56 h-56 rounded-full border border-emerald-500/10 border-t-emerald-500/40 animate-[spin_20s_linear_infinite]"></div>
                  <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent animate-pulse top-1/2 -translate-y-1/2 rotate-45"></div>
                  <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent animate-pulse top-1/2 -translate-y-1/2 -rotate-45"></div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.8)] animate-ping"></div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-auto pt-32">
              <div className="flex items-center gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgb(16,185,129)] animate-pulse"></span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                  Active
                </span>
              </div>
              <h3 className="text-3xl text-white font-bricolage mb-3 tracking-tight group-hover:text-emerald-50 transition-colors">
                Semantic Search
              </h3>
              <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">
                Ask in plain language by climate, performance targets, typology, materials, and context.
              </p>
              <div className="w-full bg-white/5 h-[2px] mt-6 relative overflow-hidden rounded-full">
                <div className="absolute inset-0 bg-emerald-500 w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"></div>
              </div>
            </div>
          </div>

          {/* Card 2: Structured Project Cards */}
          <div className="group relative h-[500px] bg-black/40 border border-white/10 rounded-3xl p-8 overflow-hidden hover:bg-black/60 transition-all duration-500 hover:border-white/20 backdrop-blur-sm animate-on-scroll animate delay-200">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-auto text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-all duration-500">
              <iconify-icon icon="solar:document-text-linear" className="text-2xl"></iconify-icon>
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none perspective-midrange">
              <div className="relative w-[260px] h-[260px] group-hover:scale-105 transition-transform duration-1000 transform-style-preserve-3d">
                <svg className="absolute inset-0 w-full h-full text-blue-500 animate-[spin_30s_linear_infinite]" viewBox="0 0 100 100" fill="none">
                  <path d="M50 5 L89 27.5 V72.5 L50 95 L11 72.5 V27.5 Z" stroke="currentColor" strokeWidth="0.2" strokeDasharray="2 2" className="opacity-30"></path>
                  <path d="M50 15 L80.3 32.5 V67.5 L50 85 L19.7 67.5 V32.5 Z" stroke="currentColor" strokeWidth="0.3" className="opacity-50"></path>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 border-[0.5px] border-blue-400/30 rotate-45 animate-[spin_8s_linear_infinite]"></div>
                  <div className="absolute w-32 h-32 border-[0.5px] border-blue-400/30 -rotate-45 animate-[spin_8s_linear_infinite_reverse]"></div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-auto pt-32">
              <div className="flex items-center gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgb(59,130,246)] animate-pulse"></span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400">
                  Structured
                </span>
              </div>
              <h3 className="text-3xl text-white font-bricolage mb-3 tracking-tight group-hover:text-blue-50 transition-colors">
                Project Cards
              </h3>
              <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">
                Receive structured results grounded in built work, with documented or measured performance data.
              </p>
              <div className="w-full bg-white/5 h-[2px] mt-6 relative overflow-hidden rounded-full">
                <div className="absolute inset-0 bg-blue-500 w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"></div>
              </div>
            </div>
          </div>

          {/* Card 3: Pattern Discovery */}
          <div className="group relative h-[500px] bg-black/40 border border-white/10 rounded-3xl p-8 overflow-hidden hover:bg-black/60 transition-all duration-500 hover:border-white/20 backdrop-blur-sm animate-on-scroll animate delay-300">
            <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-auto text-teal-400 group-hover:scale-110 group-hover:bg-teal-500/10 group-hover:border-teal-500/20 transition-all duration-500">
              <iconify-icon icon="solar:graph-new-linear" className="text-2xl"></iconify-icon>
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none">
              <div className="relative w-[300px] h-[300px] group-hover:scale-110 transition-transform duration-1000">
                <svg className="absolute inset-0 w-full h-full text-teal-500 animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100" fill="none">
                  <ellipse cx="50" cy="50" rx="45" ry="15" stroke="currentColor" strokeWidth="0.3" className="opacity-40"></ellipse>
                  <ellipse cx="50" cy="50" rx="45" ry="15" stroke="currentColor" strokeWidth="0.3" className="opacity-40" transform="rotate(60 50 50)"></ellipse>
                  <ellipse cx="50" cy="50" rx="45" ry="15" stroke="currentColor" strokeWidth="0.3" className="opacity-40" transform="rotate(120 50 50)"></ellipse>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-teal-500/10 blur-xl animate-pulse"></div>
                  <div className="w-8 h-8 rounded-full bg-teal-400/20 blur-md animate-ping"></div>
                  <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_20px_rgb(20,184,166)]"></div>
                </div>
                <div className="absolute top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 border border-dashed border-teal-500/20 rounded-full animate-[spin_4s_linear_infinite]"></div>
              </div>
            </div>

            <div className="relative z-10 mt-auto pt-32">
              <div className="flex items-center gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shadow-[0_0_10px_rgb(20,184,166)] animate-pulse"></span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-teal-400">
                  Discovery
                </span>
              </div>
              <h3 className="text-3xl text-white font-bricolage mb-3 tracking-tight group-hover:text-teal-50 transition-colors">
                Pattern Discovery
              </h3>
              <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">
                Surface relationships between projects, patterns across climates, and make trade-offs explicit.
              </p>
              <div className="w-full bg-white/5 h-[2px] mt-6 relative overflow-hidden rounded-full">
                <div className="absolute inset-0 bg-teal-500 w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
