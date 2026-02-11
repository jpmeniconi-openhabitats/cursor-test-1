"use client"

import Image from "next/image"

export function Footer() {
  return (
    <footer className="text-white bg-black relative">
      {/* Footer content - much taller for better visual separation */}
      <div className="border-t border-white/10 pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 relative">
          {/* Left - OpenHabitats logo and description - aligned with navbar logo */}
          <div className="flex flex-col gap-3 md:ml-12">
            <div className="flex items-center gap-2">
              <Image 
                src="/openhabitats-logo.png" 
                alt="OpenHabitats" 
                width={32} 
                height={32} 
                className="w-8 h-8"
              />
              <span className="text-lg font-sf font-medium">OpenHabitats</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-[220px]">
              Discover sustainable architecture through interactive AI-powered network.
            </p>
          </div>

          {/* Center - Backed by BeVisioneers - truly centered */}
          <div className="flex flex-col gap-3 items-center absolute left-1/2 -translate-x-1/2">
            <span className="text-xs text-white/40 font-sf uppercase tracking-wider">Backed by</span>
            <div className="h-8 flex items-center justify-center">
              <Image 
                src="/bevisioneers-logo.png" 
                alt="BeVisioneers - The Mercedes-Benz Fellowship" 
                width={180} 
                height={32} 
                className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
                priority={false}
              />
            </div>
          </div>

          {/* Right - Social links vertical - aligned with JOIN WAITLIST */}
          <div className="flex flex-col gap-3 md:mr-12 items-end">
            <h4 className="font-sf text-white/40 text-xs uppercase tracking-wider">Social</h4>
            <div className="flex flex-col gap-2 items-end">
              <a href="https://instagram.com/openhabitats" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm">
                Instagram
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm">
                LinkedIn
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm">
                X
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-white/30 md:px-12">
          <p>© 2026 OpenHabitats. All rights reserved.</p>
          <p className="mt-3 md:mt-0 flex items-center gap-2">
            Built from Chile for the world
            <span className="w-5 h-5 rounded-full overflow-hidden inline-flex items-center justify-center text-sm">
              <img src="https://flagcdn.com/w40/cl.png" alt="Chile" className="w-5 h-5 object-cover rounded-full" />
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
