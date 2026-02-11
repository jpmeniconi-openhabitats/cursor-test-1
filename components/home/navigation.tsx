"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useWaitlist } from "@/components/waitlist-provider"
import { WaitlistModal } from "@/components/WaitlistModal" // Import WaitlistModal

export function Navigation() {
  const [isPastHero, setIsPastHero] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false) // Declare isWaitlistOpen
  const { openWaitlist } = useWaitlist()

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled past hero section (approximately one viewport height)
      const heroHeight = window.innerHeight * 0.8
      setIsPastHero(window.scrollY > heroHeight)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial state
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div 
      className="fixed flex animate-slide-up [animation-delay:0.5s] z-50 px-4 top-0 pt-6 pb-12 right-0 left-0 justify-center transition-opacity duration-500"
      style={{ 
        opacity: isPastHero && !isHovered ? 0 : 1,
        pointerEvents: isPastHero && !isHovered ? 'none' : 'auto',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <nav className="flex transition-all duration-300 bg-black/60 w-full max-w-5xl border-white/10 border rounded-full py-3 pr-3 pl-2 shadow-2xl backdrop-blur-xl items-center justify-between">
        {/* Logo Area */}
        <a href="#hero" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0 pl-3.5">
          <Image 
            src="/openhabitats-logo.png" 
            alt="OpenHabitats" 
            width={32} 
            height={32} 
            className="h-[27px] w-[27px]"
          />
          <span className="font-sans text-base tracking-tight font-medium whitespace-nowrap">
            OpenHabitats
          </span>
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/60 flex-1 justify-center">
          <a href="#purpose" className="hover:text-white transition-colors whitespace-nowrap">
            Purpose
          </a>
          <a href="#infrastructure" className="hover:text-white transition-colors whitespace-nowrap">
            Coverage
          </a>
          <a href="#process" className="hover:text-white transition-colors whitespace-nowrap">
            Workflow
          </a>
          <a href="#transmissions" className="hover:text-white transition-colors whitespace-nowrap">
            Contact
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          
          
          <button 
            onClick={openWaitlist}
            className="flex items-center gap-2 px-4 py-2 bg-black/80 border border-white/10 rounded-full text-white text-xs font-mono tracking-wider uppercase hover:bg-white/[0.02] hover:border-emerald-500/30 transition-all duration-300 group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            JOIN WAITLIST
          </button>
        </div>
      </nav>
    </div>
  )
}
