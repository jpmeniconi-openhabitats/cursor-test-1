"use client"

import { useEffect } from "react"
import { Navigation } from "@/components/home/navigation"
import { Hero } from "@/components/home/hero"
import { SectionNavigator } from "@/components/home/section-navigator"
import { DotDivider, SyncDivider } from "@/components/home/dividers"
import { PurposeSection } from "@/components/home/purpose-section"
import { MissionsSection } from "@/components/home/missions-section"
import { InfrastructureSection } from "@/components/home/infrastructure-section"
import { TimelineSection } from "@/components/home/timeline-section"
import { MaterialsSection } from "@/components/home/materials-section"
import { StatsSection } from "@/components/home/stats-section"
import { CareersSection } from "@/components/home/careers-section"
import { ProcessSection } from "@/components/home/process-section"
import { TransmissionsSection } from "@/components/home/transmissions-section"
import { Footer } from "@/components/home/footer"

export default function HomePage() {
  useEffect(() => {
    // Initialize intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    )

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <main className="bg-black text-neutral-50 w-full overflow-x-hidden selection:bg-white/20 selection:text-white relative">
      {/* Grain Texture Overlay */}
      <div className="bg-grain"></div>

      {/* Section Navigator */}
      <SectionNavigator />

      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>

      {/* Divider */}
      <DotDivider />

      {/* 2. Purpose Section */}
      <section id="purpose">
        <PurposeSection />
      </section>

      {/* Divider */}
      <DotDivider />

      {/* 3. Worldwide Coverage - Global Knowledge Map */}
      <section id="infrastructure">
        <InfrastructureSection />
      </section>

      {/* Divider */}
      <DotDivider />

      {/* 3. How It Works. */}
      <section id="process">
        <ProcessSection />
      </section>

      {/* Divider */}
      <DotDivider />

      {/* 5. Roadmap - HIDDEN FOR NOW */}
      <section id="timeline" className="hidden">
        <TimelineSection />
      </section>

      {/* Log Divider - HIDDEN */}
      <div className="hidden">
        <SyncDivider text="Log" />
      </div>

      {/* 6. Featured Projects - HIDDEN FOR NOW */}
      <section id="missions" className="hidden">
        <MissionsSection />
      </section>

      {/* Scan Divider - HIDDEN */}
      <div className="hidden">
        <SyncDivider text="Scan" />
      </div>

      {/* Evidence Layers - HIDDEN FOR NOW */}
      <section id="materials" className="hidden">
        <MaterialsSection />
      </section>

      {/* Divider - HIDDEN */}
      <div className="hidden">
        <DotDivider />
      </div>

      {/* MVP Snapshot - HIDDEN FOR NOW */}
      <section id="stats" className="hidden">
        <StatsSection />
      </section>

      {/* Divider - HIDDEN */}
      <div className="hidden">
        <DotDivider />
      </div>

      {/* Built for You - HIDDEN FOR NOW */}
      <section id="careers" className="hidden">
        <CareersSection />
      </section>

      {/* Transmissions Section */}
      <section id="transmissions">
        <TransmissionsSection />
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
