"use client"

const audiences = [
  {
    title: "Architects & Designers",
    icon: "solar:buildings-3-linear",
    location: "Global",
    department: "Design",
    departmentIcon: "solar:ruler-cross-pen-linear",
    type: "Professional",
  },
  {
    title: "Students & Educators",
    icon: "solar:square-academic-cap-linear",
    location: "Universities",
    department: "Learning",
    departmentIcon: "solar:book-linear",
    type: "Academic",
  },
  {
    title: "Developers & Researchers",
    icon: "solar:code-square-linear",
    location: "Remote",
    department: "Research",
    departmentIcon: "solar:test-tube-linear",
    type: "Technical",
  },
]

const benefits = [
  { icon: "solar:magnifer-bold", color: "text-emerald-500", title: "Search", description: "Natural language queries across climates and typologies." },
  { icon: "solar:document-bold", color: "text-blue-500", title: "Evidence", description: "Documented performance data where available." },
  { icon: "solar:users-group-rounded-bold", color: "text-teal-500", title: "Network", description: "Connect with sustainable architecture community." },
  { icon: "solar:bookmark-bold", color: "text-amber-500", title: "Collections", description: "Save and share curated project references." },
]

export function CareersSection() {
  return (
    <section className="bg-black border-white/5 border-t py-24 px-6 relative" id="careers">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

      <div className="z-10 w-full max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div className="max-w-3xl animate-on-scroll animate">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-emerald-500"></span>
              <span className="text-emerald-500 text-xs font-mono uppercase tracking-widest">
                Who It Is For
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bricolage font-medium tracking-tighter text-white leading-[0.9]">
              Built for
              <span className="text-white/30"> You.</span>
            </h2>
          </div>
          <p className="text-neutral-400 text-lg max-w-md font-light leading-relaxed mb-2">
            OpenHabitats supports people who need reliable, sustainability-driven precedents when they feel blocked or need evidence-backed references.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Audience Listings Column */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {audiences.map((audience, index) => (
              <a
                key={audience.title}
                href="#"
                className="group relative block p-[1px] rounded-3xl bg-gradient-to-br from-white/10 to-white/0 hover:from-white/20 hover:to-white/5 transition-all duration-500 animate-on-scroll animate"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="relative h-full bg-black/80 backdrop-blur-xl rounded-[23px] p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center border border-white/5 group-hover:border-transparent transition-colors overflow-hidden">
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 group-hover:scale-110 group-hover:bg-white/10 group-hover:text-white group-hover:border-white/30 transition-all duration-500 z-10">
                    <iconify-icon icon={audience.icon} width="28"></iconify-icon>
                  </div>
                  <div className="flex-1 text-center md:text-left z-10">
                    <h3 className="text-xl font-bricolage font-medium text-white mb-2 group-hover:text-white transition-colors">
                      {audience.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">
                      <span className="flex items-center gap-1.5">
                        <iconify-icon icon="solar:map-point-linear" width="16"></iconify-icon>
                        {audience.location}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-neutral-600 my-auto"></span>
                      <span className="flex items-center gap-1.5">
                        <iconify-icon icon={audience.departmentIcon} width="16"></iconify-icon>
                        {audience.department}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 z-10">
                    <span className="px-4 py-1.5 rounded-full border border-white/10 text-xs font-medium text-white/60 bg-white/5 uppercase tracking-wide group-hover:border-white/30 group-hover:bg-white/10 group-hover:text-white transition-colors">
                      {audience.type}
                    </span>
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:border-white/50 group-hover:text-white transition-all duration-300">
                      <iconify-icon icon="solar:arrow-right-linear" width="20"></iconify-icon>
                    </div>
                  </div>
                </div>
              </a>
            ))}

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 animate-on-scroll animate delay-400">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors group cursor-default">
                  <iconify-icon icon={benefit.icon} className={`${benefit.color} mb-4 text-2xl group-hover:scale-110 transition-transform duration-300`}></iconify-icon>
                  <h5 className="text-white font-medium mb-1 text-sm">{benefit.title}</h5>
                  <p className="text-xs text-neutral-500 leading-relaxed font-light">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Sidebar */}
          <div className="lg:col-span-4 lg:pl-8 animate-on-scroll animate delay-500">
            <div className="sticky top-32 p-8 rounded-3xl bg-black/50 backdrop-blur-md border border-white/5 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-medium text-white font-bricolage">
                  Filters
                </h3>
                <button className="text-xs text-neutral-500 hover:text-white transition-colors underline decoration-neutral-700 underline-offset-4">
                  Reset All
                </button>
              </div>

              {/* Goal */}
              <div className="mb-8">
                <h4 className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-4 font-bold">
                  Goal
                </h4>
                <div className="space-y-3">
                  {["Design (12)", "Learn (8)", "Research (5)"].map((item, i) => (
                    <label key={item} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative w-5 h-5 rounded border border-white/20 group-hover:border-emerald-500/50 bg-white/5 flex items-center justify-center transition-colors">
                        <input type="checkbox" defaultChecked={i === 0} className="peer appearance-none absolute inset-0 w-full h-full cursor-pointer" />
                        <iconify-icon icon="solar:check-read-linear" className="text-emerald-400 opacity-0 peer-checked:opacity-100 transition-opacity text-xs" width="14"></iconify-icon>
                      </div>
                      <span className="text-sm text-neutral-400 group-hover:text-white transition-colors font-light">
                        {item}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Stage */}
              <div>
                <h4 className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-4 font-bold">
                  Stage
                </h4>
                <div className="space-y-3">
                  {["Any Stage", "Concept", "Schematic", "Detailing"].map((item, i) => (
                    <label key={item} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative w-5 h-5 rounded-full border border-white/20 group-hover:border-white/50 bg-white/5 flex items-center justify-center transition-colors">
                        <input type="radio" name="stage" defaultChecked={i === 0} className="peer appearance-none absolute inset-0 w-full h-full cursor-pointer" />
                        <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                      </div>
                      <span className="text-sm text-neutral-400 group-hover:text-white transition-colors font-light">
                        {item}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
