"use client"

import { useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Globe, Users, Bot, Target, Heart, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function AboutPage() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    document.querySelectorAll(".reveal").forEach((el) => {
      observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  const values = [
    {
      icon: Globe,
      title: "Global Perspective",
      description:
        "We believe sustainable solutions come from diverse perspectives across all geographies and cultures.",
      color: "from-teal-500/10",
      iconColor: "text-teal-300",
      borderColor: "border-teal-500/20",
      shadowColor: "shadow-[0_0_15px_-5px_rgba(20,184,166,0.5)]",
    },
    {
      icon: Users,
      title: "Community-Driven",
      description: "Built by architects, for architects. Our platform grows through collective knowledge sharing.",
      color: "from-blue-500/10",
      iconColor: "text-blue-300",
      borderColor: "border-blue-500/20",
      shadowColor: "shadow-[0_0_15px_-5px_rgba(59,130,246,0.5)]",
    },
    {
      icon: Bot,
      title: "AI-Powered",
      description: "Leveraging cutting-edge AI to make sustainable design knowledge accessible and actionable.",
      color: "from-purple-500/10",
      iconColor: "text-purple-300",
      borderColor: "border-purple-500/20",
      shadowColor: "shadow-[0_0_15px_-5px_rgba(168,85,247,0.5)]",
    },
  ]

  const stats = [
    { value: "500", label: "Projects", suffix: "+" },
    { value: "50", label: "Countries", suffix: "+" },
    { value: "15", label: "Professionals", suffix: "k+" },
    { value: "2024", label: "Founded", suffix: "" },
  ]

  const mission = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To make sustainable building knowledge more actionable, visual, and inclusive. We combine intelligent search, generative tools, and interactive features like BIM and AR to transform how people design and build.",
    },
    {
      icon: Heart,
      title: "Our Vision",
      description:
        "A world where every building project has access to contextual, high-quality design references and environmental data. Where sustainable architecture is the default, not the exception.",
    },
    {
      icon: Zap,
      title: "Our Approach",
      description:
        "We're building this platform from Chile, a country of extreme geographies and urgent climate challenges. We know that solving the built environment crisis requires diverse perspectives, disciplines, and collaborations.",
    },
  ]

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none opacity-50 mix-blend-screen" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 text-balance leading-[1.1] tracking-tight"
          >
            Built for designers.
            <br />
            <span className="text-chart-2 whitespace-nowrap">Powered by community.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 text-pretty leading-relaxed"
          >
            Making sustainable building knowledge accessible through intelligent search, AI tools, and collaborative
            features that transform how we design for our planet.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/explorer"
              className="group w-full sm:w-auto px-6 py-3 bg-teal-500 hover:bg-teal-400 text-black text-sm font-semibold rounded-full transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] text-center flex items-center justify-center gap-2"
            >
              Start Exploring
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/explorer/submit"
              className="w-full sm:w-auto px-6 py-3 border border-white/10 text-white text-sm font-medium rounded-full hover:bg-white/5 hover:border-white/20 transition-all text-center flex items-center justify-center"
            >
              Submit a Project
            </Link>
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-[5]" />
      </header>

      {/* Metrics Section */}
      <section className="py-24 border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
            {stats.map((stat, index) => (
              <div key={index} className="reveal" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="flex items-baseline justify-center md:justify-start gap-0.5 text-3xl md:text-4xl font-semibold text-white tracking-tight mb-2">
                  <span className="counter" data-target={stat.value}>
                    0
                  </span>
                  {stat.suffix}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Approach */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 md:mb-28 reveal">
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
              Why OpenHabitats Exists
            </h2>
            <p className="text-slate-400 max-w-xl text-lg font-light">
              Our foundation is built on three pillars that guide everything we create.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mission.map((item, index) => (
              <div
                key={index}
                className="reveal group relative p-8 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="h-10 w-10 rounded-lg bg-teal-500/20 flex items-center justify-center mb-6 text-teal-300 border border-teal-500/20 shadow-[0_0_15px_-5px_rgba(20,184,166,0.5)]">
                    <item.icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-medium text-white tracking-tight mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 border-t border-white/[0.06] bg-gradient-to-b from-white/[0.01] to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="reveal text-3xl md:text-4xl font-semibold text-white tracking-tight mb-12 text-center">
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="reveal group relative p-8 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
                style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${value.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <div
                    className={`h-10 w-10 rounded-lg bg-teal-500/20 flex items-center justify-center mb-6 ${value.iconColor} ${value.borderColor} ${value.shadowColor}`}
                  >
                    <value.icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-medium text-white tracking-tight mb-3">{value.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-8">{value.description}</p>
                  <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BeVisioneers Section - Testimonial Style */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="reveal p-8 md:p-10 rounded-xl bg-[#0B0C10] border border-white/[0.08] hover:border-white/[0.15] transition-colors relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-teal-500/10 blur-[50px] group-hover:bg-teal-500/20 transition-all duration-700 rounded-full" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Image src="/logo.png" alt="OpenHabitats" width={48} height={48} className="rounded-full" />
                <Badge variant="secondary" className="bg-teal-500/10 text-teal-300 border-teal-500/20">
                  Part of BeVisioneers
                </Badge>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Built by BeVisioneers</h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-8 font-light">
                OpenHabitats is developed by <span className="text-white font-medium">BeVisioneers</span>, a collective
                of designers, architects, and technologists committed to creating tools that accelerate the transition
                to sustainable building practices. <span className="text-white font-medium">Based in Chile</span>, we're
                building for the world.
              </p>
              <Button
                variant="outline"
                className="bg-transparent border-white/10 hover:bg-white/5 hover:border-white/20"
                asChild
              >
                <Link href="#">Learn More About BeVisioneers</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 text-center reveal">
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
            Join us in reimagining sustainable architecture
          </h2>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            Whether you're an architect, designer, student, or sustainability professional, there's a place for you in
            our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-teal-500 hover:bg-teal-400 text-black font-semibold shadow-[0_0_20px_rgba(20,184,166,0.3)]"
              asChild
            >
              <Link href="/explorer/submit">Submit a Project</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white/10 hover:bg-white/5 hover:border-white/20"
              asChild
            >
              <Link href="/explorer/projects">Explore Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Reveal Animation Styles */}
      <style jsx global>{`
        .reveal {
          opacity: 0;
          transform: scale(0.98);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          filter: blur(10px);
        }
        .reveal.active {
          opacity: 1;
          transform: scale(1);
          filter: blur(0);
        }
        .delay-100 {
          transition-delay: 100ms;
        }
        .delay-200 {
          transition-delay: 200ms;
        }
        .delay-300 {
          transition-delay: 300ms;
        }
      `}</style>
    </main>
  )
}
