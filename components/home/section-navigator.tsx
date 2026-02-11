"use client"

import { useEffect, useState } from "react"

const sections = [
  { id: "hero", label: "Home" },
  { id: "purpose", label: "Purpose" },
  { id: "infrastructure", label: "Coverage" },
  { id: "process", label: "Workflow" },
  { id: "transmissions", label: "Contact" },
]

export function SectionNavigator() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isCentered, setIsCentered] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: "-50% 0px -50% 0px",
      }
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let rafId: number | null = null

    const handleScroll = () => {
      if (rafId) return
      
      rafId = requestAnimationFrame(() => {
        const activeElement = document.getElementById(activeSection)
        if (!activeElement) {
          rafId = null
          return
        }

        const rect = activeElement.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const elementCenter = rect.top + rect.height / 2
        const viewportCenter = viewportHeight / 2

        // Check if the section center is close to viewport center (within 20% of viewport height)
        const distanceFromCenter = Math.abs(elementCenter - viewportCenter)
        const threshold = viewportHeight * 0.2
        
        setIsCentered(distanceFromCenter < threshold)
        rafId = null
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check initial state
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [activeSection])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <nav 
      className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block transition-opacity duration-500"
      style={{ opacity: isCentered ? 1 : 0 }}
    >
      <div className="flex flex-col gap-3">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className="group relative"
            aria-label={`Navigate to ${label}`}
          >
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === id
                  ? "bg-white scale-125"
                  : "bg-white/30 hover:bg-white/60"
              }`}
            />
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xs text-white/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}
