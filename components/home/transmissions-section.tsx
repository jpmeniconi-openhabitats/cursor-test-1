"use client"

import { useWaitlist } from "@/components/waitlist-provider"

export function TransmissionsSection() {
  const { openWaitlist } = useWaitlist()
  
  return (
    <section className="overflow-hidden bg-black z-20 border-white/10 border-t relative py-[170px]" id="transmissions">
      {/* Full-width radial gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,210,146,0.15)_0%,_rgba(6,210,146,0.08)_25%,_rgba(6,210,146,0.03)_50%,_transparent_70%)]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Main question - Part 1 - Using SF Pro font */}
        <div className="text-4xl md:text-6xl font-sf text-white mb-2 tracking-tight leading-[1.1] animate-on-scroll animate lg:text-4xl">
          What if architects and designers could
        </div>

        {/* Main question - Part 2 - Using SF Pro font */}
        <div className="text-4xl md:text-6xl lg:text-7xl font-sf text-emerald-400 mb-8 tracking-tight leading-[1.1] animate-on-scroll animate">
          change the planet?
        </div>

        {/* Declaration of principles - Using SF Pro font - Separate divs for editing */}
        <div className="text-xl md:text-2xl text-white/50 font-sf font-light leading-relaxed max-w-2xl mx-auto mb-12 animate-on-scroll animate delay-100">
          <div className="font-medium text-2xl text-[rgba(255,255,255,1)]">We believe sustainable architecture</div>
          <div className="font-medium text-2xl text-[rgba(255,255,255,1)]">should be accessible to everyone.</div>
        </div>

        {/* CTA - Using SF Pro font */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-on-scroll animate delay-200">
          <button 
            onClick={openWaitlist}
            className="group px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-sf font-medium rounded-full transition-all duration-300 flex items-center gap-2"
          >
            <span>Join Waitlist</span>
            <iconify-icon icon="solar:arrow-right-linear" className="group-hover:translate-x-1 transition-transform"></iconify-icon>
          </button>
          <a 
            href="mailto:jpmeniconi@openhabitats.com?subject=Contact from OpenHabitats" 
            className="px-8 py-4 border border-white/20 hover:border-white/40 text-white/70 hover:text-white font-sf font-medium rounded-full transition-all duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  )
}
