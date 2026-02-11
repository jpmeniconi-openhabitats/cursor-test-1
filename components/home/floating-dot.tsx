"use client"

import { useEffect, useRef } from "react"

interface Dot {
  x: number
  y: number
  vx: number
  vy: number
  targetX: number
  targetY: number
}

export function FloatingDot() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const updateSize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }
    updateSize()
    window.addEventListener("resize", updateSize)

    // Create network of dots
    const dotCount = 8
    const dots: Dot[] = []
    const maxConnectionDistance = 250
    
    // Limit dots to bottom 50% of canvas (well below cards area)
    const minY = canvas.height * 0.5
    const maxY = canvas.height

    // Initialize dots with random positions and VERY slow velocities
    for (let i = 0; i < dotCount; i++) {
      const y = minY + Math.random() * (maxY - minY)
      dots.push({
        x: Math.random() * canvas.width,
        y: y,
        vx: (Math.random() - 0.5) * 0.02, // Super slow initial velocity
        vy: (Math.random() - 0.5) * 0.02,
        targetX: Math.random() * canvas.width,
        targetY: minY + Math.random() * (maxY - minY)
      })
    }

    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      time += 0.01

      // Update each dot
      for (const dot of dots) {
        // Create new target very rarely for extremely subtle movement
        if (Math.random() < 0.002) {
          dot.targetX = Math.random() * canvas.width
          dot.targetY = minY + Math.random() * (maxY - minY)
        }

        // Move toward target with extremely smooth interpolation
        const dx = dot.targetX - dot.x
        const dy = dot.targetY - dot.y
        
        // Tiny acceleration for barely noticeable movement
        dot.vx += dx * 0.0001
        dot.vy += dy * 0.0001
        
        // Very strong damping for ultra-slow, fluid motion
        dot.vx *= 0.99
        dot.vy *= 0.99
        
        dot.x += dot.vx
        dot.y += dot.vy

        // Keep dots in the bottom area only
        if (dot.x < 0) dot.x = canvas.width
        if (dot.x > canvas.width) dot.x = 0
        if (dot.y < minY) dot.y = minY
        if (dot.y > maxY) dot.y = maxY
      }

      // Draw connections between nearby dots
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dotA = dots[i]
          const dotB = dots[j]
          
          const distance = Math.sqrt(
            Math.pow(dotA.x - dotB.x, 2) + Math.pow(dotA.y - dotB.y, 2)
          )
          
          if (distance < maxConnectionDistance) {
            // Fade line opacity based on distance
            const opacity = (1 - distance / maxConnectionDistance) * 0.3
            
            ctx.beginPath()
            ctx.moveTo(dotA.x, dotA.y)
            ctx.lineTo(dotB.x, dotB.y)
            ctx.strokeStyle = `rgba(16, 185, 129, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      // Draw dots
      for (const dot of dots) {
        // Glow effect
        const gradient = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, 15)
        gradient.addColorStop(0, "rgba(16, 185, 129, 0.5)")
        gradient.addColorStop(0.5, "rgba(16, 185, 129, 0.2)")
        gradient.addColorStop(1, "rgba(16, 185, 129, 0)")
        
        ctx.fillStyle = gradient
        ctx.fillRect(dot.x - 15, dot.y - 15, 30, 30)

        // Core dot
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(16, 185, 129, 0.9)"
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", updateSize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  )
}
