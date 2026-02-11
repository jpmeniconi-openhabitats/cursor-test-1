"use client"

import { useEffect, useRef, useState } from "react"
import { ParticleField } from "./particle-field"

export function PurposeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [showDivider, setShowDivider] = useState(false)
  const [textReveal, setTextReveal] = useState(0)
  const [rotatingWord, setRotatingWord] = useState(0)
  const [wordFade, setWordFade] = useState(1)
  
  const words = ["reference", "project", "idea", "design", "system", "material", "solution", "concept", "word"]

  // Auto-show divider on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDivider(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible && textReveal < 100) {
      const timer = setTimeout(() => {
        setTextReveal(prev => Math.min(prev + 2, 100))
      }, 20)
      return () => clearTimeout(timer)
    }
  }, [isVisible, textReveal])

  // Rotating word animation - every 2 seconds
  useEffect(() => {
    if (!isVisible) return
    
    const interval = setInterval(() => {
      // Fade out
      setWordFade(0)
      
      // Change word after fade out
      setTimeout(() => {
        setRotatingWord(prev => (prev + 1) % words.length)
        // Fade in
        setWordFade(1)
      }, 300)
    }, 2000)

    return () => clearInterval(interval)
  }, [isVisible, words.length])

  return (
    <section
      ref={sectionRef}
      id="purpose"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-black"
    >
      {/* Interactive particle field - Google Antigravity style */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        <ParticleField 
          particleCount={150}
          mouseInfluenceRadius={180}
          mouseForce={0.1}
          breatheIntensity={25}
        />
      </div>

      {/* Radial gradient overlay for depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%)',
        }}
      />

      {/* Main content - fully interactive for Design Mode editing */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-0">
        {/* Small label - Auto-shows without scroll */}
        <div 
          className="flex items-center justify-center gap-3 mb-32 md:mb-12 transition-all duration-1000"
          style={{
            opacity: showDivider ? 1 : 0,
            transform: showDivider ? 'translateY(0)' : 'translateY(20px)'
          }}
        >
          <span className="w-8 h-[1px] bg-emerald-500"></span>
          <span className="text-emerald-500 text-xs font-mono uppercase tracking-widest">
            Rethink the process
          </span>
          <span className="w-8 h-[1px] bg-emerald-500"></span>
        </div>

        {/* Main question - 5 lines on mobile for better readability */}
        <h2 
          className="font-sans text-3xl md:text-7xl lg:text-8xl font-medium leading-tight mb-6 md:mb-8 text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s ease-out 0.4s'
          }}
        >
          {/* Mobile: 5 lines vertical, Desktop: original 2 lines */}
          <div className="hidden md:flex flex-wrap items-center justify-center gap-4 text-white text-4xl">
            <span className="font-sans">What if finding the right</span>
            <span 
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm relative"
              style={{
                width: '195px',
                height: '52px'
              }}
            >
              <span
                className="text-emerald-400 absolute text-3xl"
                style={{
                  opacity: wordFade,
                  transition: 'opacity 0.3s ease-in-out'
                }}
              >
                {words[rotatingWord]}
              </span>
            </span>
            <span className="w-full mt-[-20px] text-emerald-400 text-7xl">was as simple as asking?</span>
          </div>
          
          {/* Mobile only: 5 lines vertical */}
          <div className="flex flex-col md:hidden text-white">
            <span className="font-sans text-3xl mb-1">What if</span>
            <span className="font-sans text-3xl mb-1">finding the right</span>
            <span 
              className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm relative mx-auto mb-1"
              style={{
                width: '160px',
                height: '44px'
              }}
            >
              <span
                className="text-emerald-400 absolute text-2xl"
                style={{
                  opacity: wordFade,
                  transition: 'opacity 0.3s ease-in-out'
                }}
              >
                {words[rotatingWord]}
              </span>
            </span>
            <span className="font-sans text-3xl text-emerald-400 mb-1">was as simple</span>
            <span className="font-sans text-3xl text-emerald-400">as asking?</span>
          </div>
        </h2>
        
        

        {/* Supporting text - First line */}
        <div 
          className="font-sans text-sm md:text-xl max-w-2xl mx-auto leading-relaxed mb-0 text-[rgba(255,255,255,0.9)]"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s ease-out 0.6s'
          }}
        >
          We're building a new way to explore architecture.
        </div>

        {/* Supporting text - Second line */}
        <div 
          className="font-sans text-sm md:text-xl max-w-2xl mx-auto leading-relaxed mb-16 md:mb-20 text-[rgba(255,255,255,0.9)]"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s ease-out 0.7s'
          }}
        >
          Bridging the gap between sustainability and technology.
        </div>

        {/* Animated stats/features */}
        <div 
          className="flex flex-wrap justify-center gap-8 md:gap-16 py-0 my-0"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s ease-out 0.9s'
          }}
        >
          <div className="text-center group">
            <div className="text-3xl md:text-4xl font-sans font-light text-white mb-2 transition-colors group-hover:text-emerald-400">
              AI-Powered
            </div>
            <div className="text-xs text-white/40 font-mono uppercase tracking-wider">
              Search Engine
            </div>
          </div>
          <div className="w-[1px] h-16 bg-white/10 hidden md:block"></div>
          <div className="text-center group">
            <div className="text-3xl md:text-4xl font-sans font-light text-white mb-2 transition-colors group-hover:text-emerald-400">
              Evidence-Based
            </div>
            <div className="text-xs text-white/40 font-mono uppercase tracking-wider">
              References
            </div>
          </div>
          <div className="w-[1px] h-16 bg-white/10 hidden md:block"></div>
          <div className="text-center group">
            <div className="text-3xl md:text-4xl font-sans font-light text-white mb-2 transition-colors group-hover:text-emerald-400">
              Open Access
            </div>
            <div className="text-xs text-white/40 font-mono uppercase tracking-wider">
              For Everyone
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{
            opacity: isVisible ? 0.5 : 0,
            transition: 'opacity 1s ease-out 1.2s'
          }}
        >
          
          
        </div>
      </div>
    </section>
  )
}
