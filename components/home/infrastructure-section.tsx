"use client"

import dynamic from "next/dynamic"
import { SearchDemo } from "./search-demo"
import { useState, useEffect } from "react"

const EarthGlobe = dynamic(
  () => import("./earth-globe").then((mod) => mod.EarthGlobe),
  { ssr: false }
)

const featureSets = [
  [
    {
      icon: (
        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-6" />
        </svg>
      ),
      title: "Passive strategies",
      description: "Compare cooling, heating, and ventilation approaches."
    },
    {
      icon: (
        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      title: "Materials adaptability",
      description: "Discover materials and assemblies adapted to local supply chains."
    },
    {
      icon: (
        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Climate data integration",
      description: "Access real-time climate data and environmental metrics."
    }
  ],
  [
    {
      icon: (
        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: "BIM models",
      description: "Integrated with real-time 3D web viewers for model exploration."
    },
    {
      icon: (
        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Energy performance",
      description: "Access detailed metrics and performance data from each project."
    },
    {
      icon: (
        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Design insights",
      description: "Discover architectural solutions and design strategies."
    }
  ]
]

export function InfrastructureSection() {
  const [activeSet, setActiveSet] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveSet(prev => (prev + 1) % featureSets.length)
        setIsTransitioning(false)
      }, 600)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen py-16 bg-black text-white relative overflow-hidden flex flex-col justify-center" id="infrastructure">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-emerald-500"></span>
              <span className="text-emerald-500 text-xs font-mono uppercase tracking-widest">
                Worldwide Coverage
              </span>
            </div>
            <div className="mb-6 animate-on-scroll animate">
              <h2 className="text-4xl md:text-6xl font-sf font-medium leading-tight">
                <div className="font-medium">Search projects</div>
                <div className="text-[rgba(3,211,146,1)] font-medium">anywhere</div>
              </h2>
            </div>
            <div className="mb-8 animate-on-scroll animate delay-100">
              <p className="leading-relaxed font-sans text-xl text-[rgba(255,255,255,0.6)] font-normal">
                <span className="text-xl text-[rgba(255,255,255,1)] block">OpenHabitats connects projects across all the world,</span>
                <span className="text-xl text-[rgba(255,255,255,1)] block">helping users compare strategies and trade-offs.</span>
                
              </p>
            </div>
            <div className="mb-8 animate-on-scroll animate delay-200">
              
            </div>
            <div className="mb-8 animate-on-scroll animate delay-300">
              
            </div>

            <div className="space-y-6 relative">
              {featureSets[activeSet].map((feature, index) => (
                <div 
                  key={`${activeSet}-${index}`}
                  className="flex gap-4 group cursor-default"
                  style={{
                    opacity: isTransitioning ? 0 : 1,
                    transition: `opacity 0.6s ease-in-out ${index * 0.05}s`
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-transparent border border-white/20 flex items-center justify-center shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 font-sans text-lg">
                      {feature.title}
                    </h4>
                    <p className="text-white/50 text-lg">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Indicator dots */}
              <div className="flex gap-2 pt-4">
                {featureSets.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsTransitioning(true)
                      setTimeout(() => {
                        setActiveSet(index)
                        setIsTransitioning(false)
                      }, 600)
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeSet === index 
                        ? 'bg-emerald-500 w-6' 
                        : 'bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Show feature set ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative lg:h-[550px] w-full rounded-2xl overflow-hidden border border-white/10 animate-on-scroll animate h-[400px] md:h-[500px] bg-black">
            <EarthGlobe />
          </div>
        </div>

        {/* Search Demo Animation */}
        <SearchDemo />
      </div>
    </section>
  )
}
