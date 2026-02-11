"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useWaitlist } from "@/components/waitlist-provider"

// Hero images configuration
const heroImages = [
  {
    src: "/earth-hero.jpg",
    alt: "Earth from space at night",
    credit: "NASA",
    description: "Earth at Night"
  },
  {
    src: "/hero-tierra-patagonia.jpg",
    alt: "Hotel Tierra Patagonia at dusk",
    credit: "Cazú Zegers",
    description: "Hotel Tierra Patagonia, Chile"
  },
  {
    src: "/hero-lodtunduh.jpg",
    alt: "Studio Lodtunduh bamboo interior",
    credit: "Pablo Luna Studio",
    description: "Studio Lodtunduh, Bali"
  },
  {
    src: "/hero-casa-jardin.jpg",
    alt: "Casa Jardín sustainable house",
    credit: "Al Borde",
    description: "Casa Jardín, Ecuador"
  }
]

export function Hero() {
  const [showBetaMessage, setShowBetaMessage] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const timeoutRef = useRef(null)
  const imageIntervalRef = useRef(null)
  const { openWaitlist } = useWaitlist()

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsFadingOut(false)
    setShowBetaMessage(true)
  }

  const handleMouseLeave = () => {
    setIsFadingOut(true)
    timeoutRef.current = setTimeout(() => {
      setShowBetaMessage(false)
      setIsFadingOut(false)
    }, 5000)
  }

  useEffect(() => {
    // Set up image rotation every 10 seconds
    imageIntervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 10000)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (imageIntervalRef.current) {
        clearInterval(imageIntervalRef.current)
      }
    }
  }, [])
  return (
    <header className="relative w-full overflow-hidden flex flex-col justify-end pb-0 md:pb-0 h-[85vh] md:h-screen">
      {/* Background Image Layer with Cinematic Animation */}
      <div className="absolute inset-0 z-0 bg-black">
        {heroImages.map((image, index) => (
          <img 
            key={image.src}
            src={image.src || "/placeholder.svg"} 
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100 animate-cinematic' : 'opacity-0'
            }`}
            alt={image.alt}
            crossOrigin="anonymous"
          />
        ))}
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80"></div>
        <div className="bg-black/10 mix-blend-overlay absolute top-0 right-0 bottom-0 left-0"></div>
      </div>

      {/* Floating Data Points */}
      <div className="absolute top-12 right-6 md:right-12 z-20 flex flex-col items-end gap-2 animate-slide-up [animation-delay:2.5s] opacity-0">
        
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center -translate-y-4 md:-translate-y-12 px-6 md:px-12">
        {/* Centered Headline */}
        <div className="text-center max-w-4xl animate-slide-up [animation-delay:1.4s] opacity-0">
          <h1 className="font-sf text-white leading-tight tracking-tight mb-6 md:mb-8">
            <span className="block text-4xl md:text-6xl lg:text-7xl mb-1 md:mb-2">
              Sustainable architecture.
            </span>
            <span className="block text-4xl md:text-6xl lg:text-7xl text-emerald-400">
              Shared globally.
            </span>
          </h1>

          {/* Description */}
          <div className="flex flex-col items-center gap-2 md:gap-3 animate-slide-up [animation-delay:1.6s] opacity-0">
            <div className="space-y-1 text-white/60">
              <p className="text-sm md:text-lg font-medium text-[rgba(255,255,255,0.9)] leading-relaxed">
                Discover how design and data shape a better planet.
              </p>
              <p className="text-sm md:text-lg font-medium text-[rgba(255,255,255,0.9)] leading-relaxed">
                Make sustainable building knowledge actionable.
              </p>
            </div>
            <span className="text-sm md:text-lg text-emerald-400 font-medium my-0">
              Powered by AI.
            </span>
          </div>

          {/* CTA Section */}
          <div 
            className="flex flex-col items-center mt-8 md:mt-6 animate-slide-up [animation-delay:1.8s] opacity-0"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link 
              href="/explorer"
              className="px-12 py-4 md:px-8 md:py-3 rounded-full bg-neutral-700 hover:bg-neutral-600 text-white font-medium transition-colors text-base md:text-sm inline-block"
            >
              Explore
            </Link>
            <div className="h-10 mt-2 text-center">
              {showBetaMessage && (
                <p className={`text-[11px] text-white/50 ${isFadingOut ? 'animate-fade-out' : 'animate-fade-in'}`}>
                  Platform will be available later this 2026.
                  <br />
                  <button onClick={openWaitlist} className="text-white/70 hover:text-white transition-colors underline bg-transparent border-0 p-0 cursor-pointer">Join waitlist</button> for more info.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Photo Credit */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-slide-up [animation-delay:2.2s] opacity-0 z-20">
        <div className="px-4 py-2 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 transition-opacity duration-500">
          <p className="text-[10px] text-white/60 whitespace-nowrap">
            Image: <span className="text-white/80">{heroImages[currentImageIndex].credit}</span> / {heroImages[currentImageIndex].description}
          </p>
        </div>
      </div>

      {/* Bottom Left Status Card */}
      <div className="absolute bottom-8 left-8 hidden lg:flex flex-col gap-3 animate-slide-up [animation-delay:2.4s] opacity-0 z-20">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-white/40 font-mono">
          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>OpenHabitats v 1.0</span>
        </div>
        <div className="bg-black/80 w-64 border-white/10 border rounded-xl px-4 py-4 backdrop-blur">
          <div className="flex justify-between mb-2">
            <span className="text-xs text-white/60">Progress</span>
            <span className="text-xs text-emerald-400">14%</span>
          </div>
          <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
            <div className="bg-emerald-500 w-[14%] h-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <span className="block text-[10px] text-white/40 uppercase tracking-wider">
                Projects
              </span>
              <span className="text-sm text-white font-mono">72</span>
            </div>
            <div>
              <span className="block text-[10px] text-white/40 uppercase tracking-wider">
                Countries
              </span>
              <span className="text-sm text-white font-mono">21</span>
            </div>
          </div>
          <p className="text-xs text-white/50 font-light mt-4 pt-3 border-t border-white/10">
            We&apos;re building something extraordinary.
          </p>
        </div>
        
        {/* Investor Card */}
        <a href="mailto:jpmeniconi@openhabitats.com?subject=Investment Inquiry" className="bg-black/80 w-64 border-white/10 border rounded-xl px-4 py-3 backdrop-blur hover:bg-white/[0.02] hover:border-emerald-500/30 transition-all duration-300 group cursor-pointer block">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start">
              <span className="text-xs text-white/60 mb-0.5">Want to invest?</span>
              <span className="text-white/40 font-light text-xs">
                We&apos;re open for investors and partners.
              </span>
            </div>
            <iconify-icon icon="solar:arrow-right-linear" className="text-emerald-400 group-hover:translate-x-1 transition-transform" width="20"></iconify-icon>
          </div>
        </a>
      </div>

      {/* Bottom Right Description Card */}
      <div className="absolute bottom-8 right-8 hidden lg:flex flex-col gap-2 animate-slide-up [animation-delay:1.8s] opacity-0 z-20 max-w-sm xl:max-w-md">
        {/* High Contrast Glassmorphism Card */}
        <div className="overflow-hidden bg-black/60 border-white/10 border rounded-2xl ring-white/5 ring-1 p-5 xl:p-6 relative shadow-2xl backdrop-blur-2xl">
          {/* Shimmer Overlay */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent z-0 pointer-events-none animate-shimmer-effect"></div>

          <div className="relative z-10">
            <p className="text-base xl:text-lg text-white font-light leading-relaxed mb-5 xl:mb-6 antialiased drop-shadow-md">
              Find real built projects, materials, and strategies by climate, performance, and context. Evidence-backed references in plain language. Get ready for the AI era.
            </p>

            <div className="flex flex-col gap-4 xl:gap-5">
              <div className="grid grid-cols-2 gap-3 xl:gap-4 border-t border-white/20 pt-4 xl:pt-5">
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">
                    First Launch 
                  </span>
                  <span className="text-xl xl:text-2xl font-bricolage text-white">{"Later this 2026"}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">
                    Projects
                  </span>
                  <span className="text-xl xl:text-2xl font-bricolage text-white">{"100-500"}</span>
                </div>
              </div>

              <a href="mailto:jpmeniconi@openhabitats.com?subject=Contact from OpenHabitats" className="group flex items-center justify-between w-full p-1 border-b border-white/30 hover:border-white transition-colors pb-2">
                <span className="text-sm font-medium tracking-wide text-white">
                  Contact Us 
                </span>
                <iconify-icon icon="solar:arrow-right-linear" className="text-white group-hover:translate-x-1 transition-transform" width="18"></iconify-icon>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
