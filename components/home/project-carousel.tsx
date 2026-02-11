"use client"

import { useState, useEffect } from "react"

interface ProjectCarouselProps {
  images: string[]
  title: string
  architect?: string
  year?: string
  interval?: number
}

export function ProjectCarousel({ 
  images, 
  title, 
  architect = "HEMAA", 
  year = "2024",
  interval = 5000 
}: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((current) => (current + 1) % images.length)
          return 0
        }
        return prev + (100 / (interval / 50))
      })
    }, 50)

    return () => clearInterval(progressInterval)
  }, [images.length, interval])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setProgress(0)
  }

  return (
    <div className="relative w-full h-full group">
      {/* Images */}
      <div className="absolute inset-0">
        {images.map((img, index) => (
          <img
            key={index}
            src={img || "/placeholder.svg"}
            alt={`${title} ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2000ms] ease-out ${
              index === currentIndex ? "opacity-60 group-hover:opacity-80" : "opacity-0"
            } group-hover:scale-[1.02] grayscale group-hover:grayscale-0`}
            crossOrigin="anonymous"
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>
      </div>

      {/* Progress Circle (Top Right) */}
      <div className="absolute top-8 right-8 z-20">
        <div className="relative w-12 h-12">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-white/10"
              strokeWidth="2"
            ></circle>
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-emerald-500"
              strokeWidth="2"
              strokeDasharray="100"
              strokeDashoffset={100 - progress}
              strokeLinecap="round"
            ></circle>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-mono text-white/80">
              {currentIndex + 1}/{images.length}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Dots (Bottom Center) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-emerald-500 w-8"
                : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
