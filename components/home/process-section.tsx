"use client"

import { Search, MessageCircle, Share2, Sparkles, UserCheck, Cpu, Users } from "lucide-react"

export function ProcessSection() {
  return (
    <section id="methodology" className="py-24 bg-black relative overflow-hidden border-t border-white/5">
      <div className="z-10 max-w-7xl mx-auto px-6 relative">
        {/* Header Section - Centered */}
        <div className="flex flex-col items-center text-center mb-12 animate-on-scroll animate">
          <div className="max-w-2xl py-2">
            <div className="flex items-center justify-center gap-3 mb-7">
              <div className="w-12 h-[1px] bg-emerald-500"></div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-500">
                Workflow
              </span>
              <div className="w-12 h-[1px] bg-emerald-500"></div>
            </div>
            <h2 className="text-5xl md:text-7xl font-bricolage text-white tracking-tighter leading-none mt-7">
              The next-generation    
            </h2>
            <div className="text-2xl mb-6 tracking-normal text-[rgba(6,210,146,1)] md:text-7xl font-medium mt-1">
              architecture platform   
            </div>
            <p className="leading-relaxed max-w-lg mx-auto text-xl font-normal text-[rgba(255,255,255,0.5)] mt-4">
              <span className="text-xl text-[rgba(255,255,255,1)] block">A non-linear research workflow for the creative process.</span>
              <span className="text-xl text-[rgba(255,255,255,1)] block">Evolve your work with the power of AI and connectivity.</span>
            </p>
          </div>
        </div>

        {/* Cards Grid - 3 columns */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 relative z-10">
            {/* Card 1: Search / Explore */}
            <div className="group relative h-[240px] bg-black/40 border border-white/10 rounded-3xl p-5 overflow-hidden hover:bg-black/60 transition-all duration-500 hover:border-white/20 backdrop-blur-sm animate-on-scroll animate delay-100 py-5">
              <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className="relative z-10 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-teal-400 group-hover:scale-110 group-hover:bg-teal-500/10 group-hover:border-teal-500/20 transition-all duration-500">
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </div>

              {/* Visualization - Orbital ellipses */}
              <div className="absolute inset-0 flex items-start justify-end pr-6 pt-3 opacity-20 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none">
                <div className="relative w-[120px] h-[120px] group-hover:scale-110 transition-transform duration-1000">
                  <svg className="absolute inset-0 w-full h-full text-teal-500 animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100" fill="none">
                    <ellipse cx="50" cy="50" rx="40" ry="12" stroke="currentColor" strokeWidth="0.4" className="opacity-40"></ellipse>
                    <ellipse cx="50" cy="50" rx="40" ry="12" stroke="currentColor" strokeWidth="0.4" className="opacity-40" transform="rotate(60 50 50)"></ellipse>
                    <ellipse cx="50" cy="50" rx="40" ry="12" stroke="currentColor" strokeWidth="0.4" className="opacity-40" transform="rotate(120 50 50)"></ellipse>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-teal-500/10 blur-xl animate-pulse"></div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-auto pt-8">
                <h3 className="text-lg text-white font-bricolage mb-1.5 tracking-tight group-hover:text-teal-50 transition-colors">
                  Search / Explore
                </h3>
                <p className="text-white/40 leading-relaxed group-hover:text-white/60 transition-colors text-lg">
                  <span className="block">Navigate projects in a interactive way.</span>
                  <span className="block">See patterns and relationships hidden before.</span>
                </p>
                <div className="w-full bg-white/5 h-[2px] relative overflow-hidden rounded-full mb-0 py-0 mt-8">
                  <div className="absolute inset-0 bg-teal-500 w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"></div>
                </div>
              </div>
            </div>

            {/* Card 2: Ask / Compare */}
            <div className="group relative h-[240px] bg-black/40 border border-white/10 rounded-3xl p-5 overflow-hidden hover:bg-black/60 transition-all duration-500 hover:border-white/20 backdrop-blur-sm animate-on-scroll animate delay-200">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className="relative z-10 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-all duration-500">
                <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
              </div>

              {/* Visualization - Pulsing circles */}
              <div className="absolute inset-0 flex items-start justify-end pr-6 pt-3 opacity-20 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none">
                <div className="relative w-[120px] h-[120px] group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border border-blue-500/30 animate-[spin_10s_linear_infinite]"></div>
                    <div className="absolute w-24 h-24 rounded-full border border-dashed border-blue-500/20 animate-[spin_15s_linear_infinite_reverse]"></div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-ping"></div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-auto pt-8">
                <h3 className="text-lg text-white font-bricolage mb-1.5 tracking-tight group-hover:text-blue-50 transition-colors">
                  Ask / Compare
                </h3>
                <p className="text-white/40 leading-relaxed group-hover:text-white/60 transition-colors text-lg">
                  <span className="block">Ask in natural language about project ideas.</span>
                  <span className="block">Get comparable references with real data.</span>
                </p>
                <div className="w-full bg-white/5 h-[2px] relative overflow-hidden rounded-full mt-8">
                  <div className="absolute inset-0 bg-blue-500 w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"></div>
                </div>
              </div>
            </div>

            {/* Card 3: Save / Share */}
            <div className="group relative h-[240px] bg-black/40 border border-white/10 rounded-3xl p-5 overflow-hidden hover:bg-black/60 transition-all duration-500 hover:border-white/20 backdrop-blur-sm animate-on-scroll animate delay-300">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className="relative z-10 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500/10 group-hover:border-amber-500/20 transition-all duration-500">
                <Share2 className="w-5 h-5" strokeWidth={1.5} />
              </div>

              {/* Visualization - Stacked layers */}
              <div className="absolute inset-0 flex items-start justify-end pr-6 pt-3 opacity-20 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none">
                <div className="relative w-[120px] h-[120px] group-hover:scale-110 transition-transform duration-1000">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
                    <div className="w-16 h-1 bg-amber-500/40 rounded-full animate-pulse"></div>
                    <div className="w-20 h-1 bg-amber-500/30 rounded-full animate-pulse delay-100"></div>
                    <div className="w-12 h-1 bg-amber-500/20 rounded-full animate-pulse delay-200"></div>
                    <div className="w-18 h-1 bg-amber-500/30 rounded-full animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-auto pt-8">
                <h3 className="text-lg text-white font-bricolage mb-1.5 tracking-tight group-hover:text-amber-50 transition-colors">
                  Save / Share
                </h3>
                <p className="text-white/40 leading-relaxed group-hover:text-white/60 transition-colors text-lg">
                  <span className="block">Build curated collections for better context.</span>
                  <span className="block">Export and share in a collaborative space.</span>
                </p>
                <div className="w-full bg-white/5 h-[2px] relative overflow-hidden rounded-full mt-8">
                  <div className="absolute inset-0 bg-amber-500 w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row - Two separate cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 mt-5">
            {/* Card 4: Multi-Agent Orchestration */}
            <div className="group relative bg-black/40 border border-white/10 rounded-3xl p-5 overflow-hidden hover:bg-black/60 transition-all duration-500 hover:border-white/20 backdrop-blur-sm animate-on-scroll animate delay-400">
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              {/* Animation - Multiple agent nodes */}
              <div className="absolute top-4 right-4 w-[100px] h-[100px] opacity-20 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none">
                <div className="relative w-full h-full">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.8)] animate-pulse"></div>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-500/60 rounded-full animate-[bounce_2s_ease-in-out_infinite]"></div>
                  <div className="absolute bottom-2 left-4 w-2 h-2 bg-emerald-500/60 rounded-full animate-[bounce_2s_ease-in-out_infinite_0.3s]"></div>
                  <div className="absolute bottom-2 right-4 w-2 h-2 bg-emerald-500/60 rounded-full animate-[bounce_2s_ease-in-out_infinite_0.6s]"></div>
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <line x1="50" y1="50" x2="50" y2="20" stroke="rgb(52,211,153)" strokeWidth="0.5" className="opacity-40" />
                    <line x1="50" y1="50" x2="25" y2="80" stroke="rgb(52,211,153)" strokeWidth="0.5" className="opacity-40" />
                    <line x1="50" y1="50" x2="75" y2="80" stroke="rgb(52,211,153)" strokeWidth="0.5" className="opacity-40" />
                  </svg>
                </div>
              </div>

              <div className="relative z-10 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-500">
                  <Sparkles className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg text-white font-bricolage mb-2 tracking-tight group-hover:text-emerald-50 transition-colors mt-5">
                    Multi-Agent Orchestration
                  </h3>
                  <p className="text-white/50 leading-relaxed group-hover:text-white/70 transition-colors text-lg">
                    AI agents work in parallel while you focus on design.
                  </p>
                  <div className="w-full bg-white/5 h-[2px] relative overflow-hidden rounded-full mt-8">
                    <div className="absolute inset-0 bg-emerald-500 w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 5: Human in the Loop */}
            <div className="group relative bg-black/40 border border-white/10 rounded-3xl p-5 overflow-hidden hover:bg-black/60 transition-all duration-500 hover:border-white/20 backdrop-blur-sm animate-on-scroll animate delay-500">
              <div className="absolute inset-0 bg-gradient-to-b from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              {/* Animation - Human approval/control visualization */}
              <div className="absolute top-4 right-4 w-[120px] h-[120px] opacity-20 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none">
                <div className="relative w-full h-full">
                  {/* Central human node */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-rose-400 shadow-[0_0_15px_rgba(251,113,133,0.6)]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-rose-400 rounded-full"></div>
                    </div>
                  </div>
                  {/* Approval checkmarks orbiting */}
                  <svg className="absolute inset-0 w-full h-full animate-[spin_8s_linear_infinite]" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="30" stroke="rgb(251,113,133)" strokeWidth="0.3" fill="none" className="opacity-30" />
                    {/* Checkmark 1 */}
                    <path d="M 75 50 L 78 53 L 83 47" stroke="rgb(251,113,133)" strokeWidth="1.5" fill="none" className="opacity-70" />
                    {/* Checkmark 2 */}
                    <path d="M 25 50 L 28 53 L 33 47" stroke="rgb(251,113,133)" strokeWidth="1.5" fill="none" className="opacity-70" />
                  </svg>
                  {/* Pulse ring */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-rose-400/50 animate-ping"></div>
                </div>
              </div>

              <div className="relative z-10 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-110 group-hover:bg-rose-500/20 transition-all duration-500">
                  <UserCheck className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg text-white font-bricolage mb-2 tracking-tight group-hover:text-rose-50 transition-colors mt-5">
                    Human-in-the-Loop
                  </h3>
                  <p className="text-white/50 leading-relaxed group-hover:text-white/70 transition-colors text-lg">
                    Approve or refine AI parameters for better results.
                  </p>
                  <div className="w-full bg-white/5 h-[2px] relative overflow-hidden rounded-full mt-8">
                    <div className="absolute inset-0 bg-rose-500 w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
