"use client"

const materials = [
  {
    name: "Performance Targets",
    subtitle: "Operational Energy",
    icon: "solar:bolt-circle-linear",
    image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/44d41d4e-32d5-4432-bf2b-95b01b1df21f_320w.webp",
    specs: [
      { label: "Energy", value: "kWh/m2/yr", icon: "solar:flash-linear" },
      { label: "Carbon", value: "kg CO2e/m2", icon: "solar:leaf-linear" },
      { label: "Source", value: "Measured", icon: "solar:shield-check-linear" },
    ],
    chartLabel: ["Energy Demand", "Performance"],
    tier: "Verified",
    barHeights: [40, 60, 80, 65, 50, 45, 60, 75, 90, 70, 55, 40],
  },
  {
    name: "Climate Context",
    subtitle: "Environmental Data",
    icon: "solar:sun-linear",
    image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/a5122f84-43cb-4170-94c3-aded75f0d3ed_320w.webp",
    specs: [
      { label: "Zone", value: "ASHRAE/Koppen", icon: "solar:map-point-linear" },
      { label: "Temp", value: "Range Data", icon: "solar:temperature-linear" },
      { label: "Humidity", value: "Annual Avg", icon: "solar:cloud-linear" },
    ],
    chartLabel: ["Temperature Range", "Humidity"],
    tier: "Documented",
    barHeights: [50, 52, 55, 58, 60, 60, 60, 58, 55, 52, 50, 48],
  },
  {
    name: "Materials & Systems",
    subtitle: "Construction Data",
    icon: "solar:layers-minimalistic-linear",
    image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/7de1229a-6a54-423d-a41c-2377d871bf2c_320w.jpg",
    specs: [
      { label: "Structure", value: "Primary System", icon: "solar:buildings-linear" },
      { label: "Envelope", value: "U-Values", icon: "solar:ruler-angular-linear" },
      { label: "Source", value: "Regional", icon: "solar:globe-linear" },
    ],
    chartLabel: ["Embodied Carbon", "Availability"],
    tier: "Estimated",
    barHeights: [90, 95, 92, 98, 100, 98, 96, 94, 92, 95, 98, 99],
  },
]

export function MaterialsSection() {
  return (
    <section className="bg-black border-white/5 border-t py-24 px-6 relative" id="process">
      {/* Section Number */}
      <div className="absolute top-12 right-6 md:right-12 z-0 opacity-10 font-bricolage font-bold text-[8rem] md:text-[10rem] leading-none text-white pointer-events-none select-none tracking-tighter">
        DATA
      </div>

      <div className="z-10 w-full max-w-5xl mx-auto relative">
        <div className="text-center mb-16 animate-on-scroll animate">
          <h3 className="text-3xl md:text-5xl font-sans font-light text-white mb-4 tracking-tight">
            Evidence Layers
          </h3>
          <p className="text-white/50">
            What each project card includes in the OpenHabitats database.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {materials.map((material, index) => (
            <div
              key={material.name}
              className="group grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-4 md:p-6 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl transition-all duration-300 animate-on-scroll animate"
              style={{ animationDelay: `${0.25 + index * 0.15}s` }}
            >
              {/* Image & Name */}
              <div className="col-span-1 md:col-span-4 flex items-center gap-6">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-xl overflow-hidden shrink-0 relative flex items-center justify-center">
                  <img src={material.image || "/placeholder.svg"} className="w-full h-full object-cover" alt={material.name} crossOrigin="anonymous" />
                </div>
                <div>
                  <iconify-icon icon={material.icon} width="32" className="text-white/60 mb-1"></iconify-icon>
                  <h4 className="text-xl text-white font-sans font-light">
                    {material.name}
                  </h4>
                  <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">
                    {material.subtitle}
                  </p>
                </div>
              </div>

              {/* Tech Specs */}
              <div className="col-span-1 md:col-span-6 grid gap-y-4 gap-x-2 border-l border-white/10 pl-6 grid-cols-2 sm:grid-cols-3">
                {material.specs.map((spec) => (
                  <div key={spec.label} className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-white/50 text-xs uppercase tracking-wide">
                      <iconify-icon icon={spec.icon} width="14"></iconify-icon>
                      {spec.label}
                    </div>
                    <span className="text-white text-sm">{spec.value}</span>
                  </div>
                ))}
                <div className="col-span-2 sm:col-span-3 mt-2">
                  <div className="flex items-center justify-between text-xs text-white/30 mb-1">
                    <span>{material.chartLabel[0]}</span>
                    <span>{material.chartLabel[1]}</span>
                  </div>
                  <div className="w-full h-8 flex items-end gap-0.5 opacity-50">
                    {material.barHeights.map((height, i) => (
                      <div
                        key={i}
                        className="w-1 bg-white rounded-t-sm bar-anim"
                        style={{
                          height: `${height}%`,
                          animationDuration: `${1.5 + ((i * 7 + 3) % 10) / 10}s`,
                          animationDelay: `-${((i * 13 + 5) % 20) / 10}s`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end gap-6">
                <span className="text-xl font-serif italic text-white">{material.tier}</span>
                <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors group-hover:border-white">
                  <iconify-icon icon="solar:file-download-linear" width="18"></iconify-icon>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
