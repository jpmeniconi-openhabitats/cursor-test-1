"use client"

import { useState } from "react"
import { ProjectCarousel } from "./project-carousel"

type FilterCategory = "all" | "residential" | "commercial" | "educational" | "landscape"

export function MissionsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all")

  const getCardVisibility = (cardType: "homes" | "schools" | "offices") => {
    if (activeFilter === "all") return true
    if (activeFilter === "residential") return cardType === "homes" || cardType === "schools"
    if (activeFilter === "commercial") return cardType === "offices"
    return true
  }

  return (
    <section id="projects" className="relative py-0 md:py-0 bg-black text-white overflow-hidden selection:bg-emerald-500/30">
      {/* Ambient Background & Grid */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[600px] bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none opacity-40 mix-blend-screen animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[60vw] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none opacity-30 mix-blend-screen"></div>

      <div className="md:px-12 z-10 w-full max-w-7xl mx-auto px-6 relative pt-24 md:pt-32 pb-24 md:pb-32">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-3xl relative animate-on-scroll animate">
            <div className="absolute -left-4 md:-left-8 top-1 bottom-1 w-1 bg-gradient-to-b from-emerald-500 to-transparent opacity-50"></div>
            <div className="flex items-center gap-3 mb-4 text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400/80">
                Highlighted This Month
              </span>
            </div>
            <h2 className="text-5xl md:text-8xl font-sf tracking-tighter text-white leading-[0.9]">
              Featured
              <span className="text-white/20 font-light"> Projects.</span>
            </h2>
          </div>

          {/* Filter Controls */}
          <div className="relative group animate-on-scroll animate delay-100">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative flex items-center p-1.5 rounded-full bg-black/90 border border-white/10 backdrop-blur-xl shadow-2xl">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                  activeFilter === "all"
                    ? "bg-white text-neutral-950 shadow-lg shadow-white/5 scale-105"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="7" height="7" x="3" y="3" rx="1"></rect>
                  <rect width="7" height="7" x="14" y="3" rx="1"></rect>
                  <rect width="7" height="7" x="14" y="14" rx="1"></rect>
                  <rect width="7" height="7" x="3" y="14" rx="1"></rect>
                </svg>
                All Projects
              </button>
              <button
                onClick={() => setActiveFilter("residential")}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeFilter === "residential"
                    ? "bg-white text-neutral-950 shadow-lg shadow-white/5 scale-105"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Residential
              </button>
              <button
                onClick={() => setActiveFilter("commercial")}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeFilter === "commercial"
                    ? "bg-white text-neutral-950 shadow-lg shadow-white/5 scale-105"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect>
                  <path d="M9 22v-4h6v4"></path>
                  <path d="M8 6h.01"></path>
                  <path d="M16 6h.01"></path>
                  <path d="M12 6h.01"></path>
                  <path d="M12 10h.01"></path>
                  <path d="M12 14h.01"></path>
                  <path d="M16 10h.01"></path>
                  <path d="M16 14h.01"></path>
                  <path d="M8 10h.01"></path>
                  <path d="M8 14h.01"></path>
                </svg>
                Commercial
              </button>
              <button
                onClick={() => setActiveFilter("educational")}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeFilter === "educational"
                    ? "bg-white text-neutral-950 shadow-lg shadow-white/5 scale-105"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"></path>
                  <path d="M6 12.5v5.5a1 1 0 0 0 1 1h2v-5.5"></path>
                  <path d="M18 12.5v5.5a1 1 0 0 1-1 1h-2v-5.5"></path>
                </svg>
                Educational
              </button>
              <button
                onClick={() => setActiveFilter("landscape")}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeFilter === "landscape"
                    ? "bg-white text-neutral-950 shadow-lg shadow-white/5 scale-105"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 18c0 1 1 2 3 2h10c2 0 3-1 3-2v-8a2 2 0 0 0-2-2h-2.5a2 2 0 0 1-1-3.75A2.5 2.5 0 0 0 6.75 4H4v14z"></path>
                  <circle cx="9" cy="9" r="2"></circle>
                </svg>
                Landscape
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Grid */}
        <div className={`grid grid-cols-1 gap-6 h-auto transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          activeFilter === "commercial" ? "md:grid-cols-1" : "md:grid-cols-12 md:h-[800px]"
        }`}>
          {/* Card 1: Climate Positive Homes (Residential) */}
          {getCardVisibility("homes") && (
            <div className={`group relative rounded-[2rem] overflow-hidden bg-black border border-white/10 shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-white/20 origin-left animate-on-scroll animate delay-200 ${
              activeFilter === "commercial" ? "hidden" : "md:col-span-8 md:row-span-2"
            }`}>
              <ProjectCarousel 
                images={[
                  "/pabellon-1.jpg",
                  "/pabellon-2.jpg",
                  "/pabellon-3.jpg",
                  "/pabellon-4.jpg"
                ]}
                title="Pabellón de la Reserva"
                architect="HEMAA"
                year="2024"
                interval={5000}
              />

              {/* HUD Overlay with Title */}
              <div className="absolute top-8 left-8 right-8 z-20">
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-mono text-white/80">
                    Passive House
                  </span>
                  <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-[10px] uppercase tracking-widest font-mono text-emerald-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    Verified
                  </span>
                </div>
                <h3 className="text-3xl md:text-5xl font-sans font-medium text-white mb-2 tracking-tight">
                  Pabellón de la Reserva
                </h3>
                <p className="text-white/50 text-xs font-light">
                  HEMAA · 2023 · Ciudad de México, México
                </p>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 pb-20">
                <div className="max-w-5xl">
                  <div className="text-[8rem] md:text-[12rem] font-bricolage font-bold text-white/5 absolute -top-40 md:-top-52 -left-6 pointer-events-none select-none tracking-tighter">
                    01
                  </div>
                  <p className="text-white/70 text-lg font-light leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 max-w-md">
                    A delicate lakeside structure with cantilevered eaves that dissolves boundaries between architecture and nature. Windows reinterpret the seven sacred lakes, inspired by Otomí cosmology.
                  </p>
                  <div className="flex items-center gap-8 pt-6 border-t border-white/10 text-xs font-mono text-white/40 uppercase tracking-widest">
                    <div>
                      <span className="block text-white mb-1">Energy</span>
                      15 kWh/m2
                    </div>
                    <div>
                      <span className="block text-white mb-1">Carbon</span>
                      -12 kg CO2
                    </div>
                    <div>
                      <span className="block text-white mb-1">BIM Model</span>
                      Available
                    </div>
                    <div>
                      <span className="block text-white mb-1">Materials</span>
                      <div className="flex items-center gap-1">
                        <span>Wood</span>
                        <span className="text-emerald-400">· 50% Local</span>
                      </div>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors bg-white/5 backdrop-blur-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right Column Stack */}
          <div className={`flex flex-col gap-6 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            activeFilter === "commercial" ? "md:col-span-12" : "md:col-span-4 md:row-span-2"
          }`}>
            {/* Card 2: Net Zero Offices (Commercial) */}
            {getCardVisibility("offices") && (
            <div className="group relative flex-1 rounded-[2rem] overflow-hidden bg-black border border-white/10 shadow-xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-white/20 origin-top animate-on-scroll animate delay-300 min-h-[300px]">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/ee3841e8-ef6d-45b3-9f33-9df069f9708a_1600w.webp" 
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-[1.02] transition-all duration-[2000ms] ease-out grayscale group-hover:grayscale-0" 
                  alt="Net Zero Office Building"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              </div>

                <div className="absolute top-6 right-6 z-20">
                  <div className="w-10 h-10 rounded-full bg-white/5 backdrop-blur flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-colors">
                    <span className="font-bricolage text-sm font-medium">02</span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full shadow-[0_0_10px_rgb(245,158,11)]"></span>
                      <span className="text-[10px] uppercase text-amber-400 tracking-widest font-mono">
                        Commercial
                      </span>
                    </div>
                    <h3 className="text-3xl font-sans font-medium text-white mb-2 tracking-tight">
                      Net Zero Offices
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Workplace buildings achieving operational carbon neutrality through integrated design strategies.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Card 3: Mass Timber Schools (Residential/Educational) */}
            {getCardVisibility("schools") && (
            <div className="group relative flex-1 rounded-[2rem] overflow-hidden bg-black border border-white/10 shadow-xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-white/20 origin-bottom animate-on-scroll animate delay-400 min-h-[300px]">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/68494c15-da1d-47aa-a9ac-b6ee8c9286cc_800w.webp" 
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-[1.02] transition-all duration-[2000ms] ease-out grayscale group-hover:grayscale-0" 
                  alt="Mass Timber School"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              </div>

                <div className="absolute top-6 right-6 z-20">
                  <div className="w-10 h-10 rounded-full bg-white/5 backdrop-blur flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-colors">
                    <span className="font-bricolage text-sm font-medium">03</span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full shadow-[0_0_10px_rgb(245,158,11)]"></span>
                      <span className="text-[10px] uppercase text-amber-400 tracking-widest font-mono">
                        Educational
                      </span>
                    </div>
                    <h3 className="text-3xl font-sans font-medium text-white mb-2 tracking-tight">
                      Mass Timber Schools
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Educational facilities built with engineered wood, reducing embodied carbon by up to 75%.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Action */}
        <div className="mt-20 flex justify-center">
          <a href="#" className="group inline-flex items-center gap-3 px-6 py-3 rounded-full text-xs font-mono text-white/60 hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest border border-transparent hover:border-white/10">
            View All References
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
