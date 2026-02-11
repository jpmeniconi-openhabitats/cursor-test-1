"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

interface HeroSectionProps {
  onInitiate?: () => void
}

export function HeroSection({ onInitiate }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0 z-0" exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 1 }}>
        <iframe
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            transform: "scale(1.5)",
          }}
          src="https://www.youtube.com/embed/NraF12qN4gs?autoplay=1&mute=1&loop=1&playlist=NraF12qN4gs&controls=0&showinfo=0&rel=0&modestbranding=1&start=4&enablejsapi=1"
          title="Digital Twin Background"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 text-balance leading-[1.1] tracking-tight"
        >
          Sustainable architecture.
          <br />
          <span className="text-chart-2">Shared globally.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 text-pretty leading-relaxed"
        >
          Discover how design and data shape a better planet.
          <br />
          Make sustainable building knowledge more actionable, visual and inclusive.
          <br />
          <span className="text-primary/80 font-medium">Powered by AI.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="px-6 py-3 text-sm h-auto rounded-full text-black hover:bg-teal-400 bg-teal-500 transition-all gap-2 group shadow-[0_0_20px_rgba(20,184,166,0.3)]"
            onClick={onInitiate}
          >
            Start Explorer
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
          {/* Removed the Try AI Assistant button */}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[5]" />
    </section>
  )
}
