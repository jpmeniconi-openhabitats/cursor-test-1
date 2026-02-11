"use client"

export function TimelineSection() {
  return (
    <section id="timeline" className="py-32 bg-black relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24 animate-on-scroll animate">
          <span className="text-emerald-500 font-mono text-xs uppercase tracking-widest">
            Development
          </span>
          <h2 className="text-5xl md:text-7xl font-bricolage text-white mt-4 font-semibold tracking-tight">
            Roadmap
          </h2>
        </div>
        <div className="relative">
          {/* Phase 1 */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-24 group">
            <div className="w-full md:w-5/12 pr-0 md:pr-12 order-2 md:order-1 animate-on-scroll animate text-center md:text-right" data-anim="slide-right">
              <h3 className="text-3xl text-white font-bricolage">Foundation</h3>
              <p className="text-white/40 mt-2 font-light">
                Curated dataset and schema design. Building the structured database of real sustainable architecture projects.
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-black border border-white/20 z-10 flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] order-1 md:order-2 mb-6 md:mb-0 relative">
              <span className="font-mono text-xs">01</span>
            </div>
            <div className="w-full md:w-5/12 pl-0 md:pl-12 order-3 animate-on-scroll animate" data-anim="slide-left">
              <span className="text-8xl font-bricolage text-white/5 font-bold absolute -translate-y-12 select-none pointer-events-none">
                Q1
              </span>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-24 group">
            <div className="w-full md:w-5/12 text-right pr-0 md:pr-12 order-2 md:order-1 animate-on-scroll animate" data-anim="slide-right">
              <span className="text-8xl font-bricolage text-white/5 font-bold absolute right-6 md:right-12 -translate-y-12 select-none pointer-events-none">
                Q2
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-black border border-white/20 z-10 flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] order-1 md:order-2 mb-6 md:mb-0 relative">
              <span className="font-mono text-xs">02</span>
            </div>
            <div className="w-full md:w-5/12 pl-0 md:pl-12 order-3 animate-on-scroll animate text-center md:text-left" data-anim="slide-left">
              <h3 className="text-3xl text-white font-bricolage">First Light</h3>
              <p className="text-white/40 mt-2 font-light">
                Semantic search with vector embeddings. Natural language queries returning structured project cards.
              </p>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-24 group">
            <div className="w-full md:w-5/12 pr-0 md:pr-12 order-2 md:order-1 animate-on-scroll animate text-center md:text-right" data-anim="slide-right">
              <h3 className="text-3xl text-white font-bricolage">Public Explorer</h3>
              <p className="text-white/40 mt-2 font-light">
                Open waitlist access. Expanding the database with community feedback and verified case studies.
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-black border border-white/20 z-10 flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] order-1 md:order-2 mb-6 md:mb-0 relative">
              <span className="font-mono text-xs">03</span>
            </div>
            <div className="w-full md:w-5/12 pl-0 md:pl-12 order-3 animate-on-scroll animate" data-anim="slide-left">
              <span className="text-8xl font-bricolage text-white/5 font-bold absolute -translate-y-12 select-none pointer-events-none">
                Q3
              </span>
            </div>
          </div>

          {/* Phase 4 */}
          <div className="flex flex-col md:flex-row items-center justify-between group">
            <div className="w-full md:w-5/12 text-right pr-0 md:pr-12 order-2 md:order-1 animate-on-scroll animate" data-anim="slide-right">
              <span className="text-8xl font-bricolage text-white/5 font-bold absolute right-6 md:right-12 -translate-y-12 select-none pointer-events-none">
                Q4
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-black border border-white/20 z-10 flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] order-1 md:order-2 mb-6 md:mb-0 relative">
              <span className="font-mono text-xs">04</span>
            </div>
            <div className="w-full md:w-5/12 pl-0 md:pl-12 order-3 animate-on-scroll animate text-center md:text-left" data-anim="slide-left">
              <h3 className="text-3xl text-white font-bricolage">Open Network</h3>
              <p className="text-white/40 mt-2 font-light">
                Community contributions and sharing. A global network to share real projects of all scales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
