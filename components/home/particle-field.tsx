"use client"

import { useEffect, useRef, useCallback } from "react"

// ============================================
// CONFIGURABLE COLORS - Edit these for future color changes
// ============================================
const COLOR_CONFIG = {
  innerColor: { h: 168, s: 70, l: 45 },  // Teal
  outerColor: { h: 155, s: 65, l: 30 },  // Darker emerald green
}

// Simplex-like noise for organic movement
function noise(x: number, y: number, t: number): number {
  const n1 = Math.sin(x * 0.5 + t * 0.3) * Math.cos(y * 0.4 + t * 0.2)
  const n2 = Math.sin(x * 0.3 - t * 0.2) * Math.cos(y * 0.6 + t * 0.4)
  const n3 = Math.sin(x * 0.7 + t * 0.5) * Math.cos(y * 0.3 - t * 0.3)
  return (n1 + n2 * 0.5 + n3 * 0.25) / 1.75
}

interface Particle {
  // Current position
  x: number
  y: number
  // Each particle tracks its OWN center position (key for deformation)
  centerX: number
  centerY: number
  // Base formation offset from center
  baseOffsetX: number
  baseOffsetY: number
  // Ring info
  ringIndex: number
  // Individual follow speed - creates deformation when swarm moves
  followSpeed: number
  // Visual
  size: number
  alpha: number
  // Noise seeds for organic movement
  noiseSeedX: number
  noiseSeedY: number
}

interface ParticleFieldProps {
  particleCount?: number
  innerRadius?: number
  outerRadius?: number
  breatheIntensity?: number
  className?: string
}

export function ParticleField({
  particleCount = 120,
  innerRadius = 200,
  outerRadius = 360,
  breatheIntensity = 35,
  className = ""
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  
  // Smooth center tracking (like Antigravity's ringPos)
  const ringPosRef = useRef({ x: 0, y: 0 })
  const cursorPosRef = useRef({ x: 0, y: 0 })
  const lastValidPosRef = useRef({ x: 0, y: 0 })
  const isHoveringRef = useRef(false)
  
  const animationFrameRef = useRef<number>()
  const timeRef = useRef(0)

  const initParticles = useCallback((centerX: number, centerY: number) => {
    const particles: Particle[] = []
    const rings = 5
    const particlesPerRing = Math.floor(particleCount / rings)
    
    for (let ring = 0; ring < rings; ring++) {
      const ringProgress = ring / (rings - 1)
      const baseRingRadius = innerRadius + (outerRadius - innerRadius) * ringProgress
      
      for (let i = 0; i < particlesPerRing; i++) {
        const angle = (Math.PI * 2 * i) / particlesPerRing
        // Add slight randomness to make it less perfect
        const radiusJitter = (Math.random() - 0.5) * 30
        const angleJitter = (Math.random() - 0.5) * 0.15
        
        const finalAngle = angle + angleJitter
        const finalRadius = baseRingRadius + radiusJitter
        
        const baseOffsetX = Math.cos(finalAngle) * finalRadius
        const baseOffsetY = Math.sin(finalAngle) * finalRadius
        
        particles.push({
          x: centerX + baseOffsetX,
          y: centerY + baseOffsetY,
          centerX: centerX,
          centerY: centerY,
          baseOffsetX,
          baseOffsetY,
          ringIndex: ring,
          // Key: Each particle has different follow speed (0.03 to 0.12)
          // This creates deformation - some particles reach target faster than others
          followSpeed: 0.03 + Math.random() * 0.09,
          size: 1.2 + Math.random() * 1.2,
          alpha: 0.25 + Math.random() * 0.2,
          noiseSeedX: Math.random() * 100,
          noiseSeedY: Math.random() * 100
        })
      }
    }
    
    return particles
  }, [particleCount, innerRadius, outerRadius])

  const getParticleColor = useCallback((normalizedRadius: number, alpha: number) => {
    const inner = COLOR_CONFIG.innerColor
    const outer = COLOR_CONFIG.outerColor
    
    const h = inner.h + (outer.h - inner.h) * normalizedRadius
    const s = inner.s + (outer.s - inner.s) * normalizedRadius
    const l = inner.l + (outer.l - inner.l) * normalizedRadius
    
    return `hsla(${h}, ${s}%, ${l}%, ${alpha})`
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const parentElement = canvas.parentElement

    const handleResize = () => {
      const rect = parentElement?.getBoundingClientRect()
      if (rect) {
        canvas.width = rect.width
        canvas.height = rect.height
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        
        ringPosRef.current = { x: centerX, y: centerY }
        cursorPosRef.current = { x: centerX, y: centerY }
        lastValidPosRef.current = { x: centerX, y: centerY }
        
        particlesRef.current = initParticles(centerX, centerY)
      }
    }

    // Track mouse at WINDOW level so it works even over text elements
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      // Check if mouse is within the canvas bounds
      const isInBounds = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height
      
      if (isInBounds) {
        cursorPosRef.current = { x, y }
        lastValidPosRef.current = { x, y }
        isHoveringRef.current = true
      } else {
        isHoveringRef.current = false
      }
    }

    const handleMouseLeave = () => {
      isHoveringRef.current = false
    }

    const animate = () => {
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)
      
      timeRef.current += 0.016
      const time = timeRef.current
      
      const targetPos = isHoveringRef.current ? cursorPosRef.current : lastValidPosRef.current
      
      // Global breathing effect - inhale/exhale cycle
      // Primary breath (slow, deep)
      const breathPrimary = Math.sin(time * 0.8) * breatheIntensity
      // Secondary breath (subtle variation)
      const breathSecondary = Math.sin(time * 1.3) * (breatheIntensity * 0.3)
      const breathe = breathPrimary + breathSecondary
      
      const particles = particlesRef.current
      const rings = 5
      
      for (const particle of particles) {
        // KEY: Each particle has its OWN center that follows the cursor at its own speed
        // This creates the deformation effect - particles move independently
        particle.centerX += (targetPos.x - particle.centerX) * particle.followSpeed
        particle.centerY += (targetPos.y - particle.centerY) * particle.followSpeed
        
        // Calculate noise-based displacement (organic movement)
        const noiseX = noise(particle.noiseSeedX, time * 0.4, time) * 12
        const noiseY = noise(particle.noiseSeedY, time * 0.4 + 50, time) * 12
        
        // Scale base offset by breathing
        const breatheScale = 1 + breathe / outerRadius
        
        // Target position = particle's OWN center + scaled offset + noise
        const targetX = particle.centerX + particle.baseOffsetX * breatheScale + noiseX
        const targetY = particle.centerY + particle.baseOffsetY * breatheScale + noiseY
        
        // Smooth final position (minor smoothing for organic feel)
        particle.x += (targetX - particle.x) * 0.15
        particle.y += (targetY - particle.y) * 0.15
        
        // Get color based on ring
        const normalizedRadius = particle.ringIndex / (rings - 1)
        const color = getParticleColor(normalizedRadius, particle.alpha)
        const glowColor = getParticleColor(normalizedRadius, particle.alpha * 0.08)
        
        // Draw subtle glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2.5
        )
        gradient.addColorStop(0, color)
        gradient.addColorStop(0.4, glowColor)
        gradient.addColorStop(1, "transparent")
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
        
        // Draw core particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
      }
      
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
    
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (parentElement) {
        parentElement.removeEventListener("mousemove", handleMouseMove)
        parentElement.removeEventListener("mouseleave", handleMouseLeave)
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [initParticles, getParticleColor, breatheIntensity, outerRadius])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  )
}
