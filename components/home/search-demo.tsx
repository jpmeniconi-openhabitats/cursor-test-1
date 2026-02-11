"use client"

import { useState, useEffect } from "react"
import { Search, Mic, Send, RotateCcw } from "lucide-react"

const searchSuggestions = [
  "Passive house certified homes with solar integration",
  "Retrofit of historic buildings for energy efficiency in UK",
  "Net zero carbon schools in tropical climates",
  "Bamboo structures with natural ventilation systems",
  "Living Building Challenge projects in urban areas",
]

const filterTags = [
  { label: "Bamboo", active: false },
  { label: "Carbon Neutral", active: false },
  { label: "Energy Positive", active: false },
  { label: "Green Building", active: false },
  { label: "LEED Platinum", active: false },
  { label: "Living Building", active: false },
  { label: "Net Positive", active: true },
  { label: "Net Zero", active: true },
  { label: "Passive House", active: true },
  { label: "Retrofit", active: false },
  { label: "Smart City", active: false },
  { label: "Solar", active: true },
  { label: "Vertical Garden", active: false },
  { label: "Zero Carbon", active: false },
]

export function SearchDemo() {
  const [currentSuggestion, setCurrentSuggestion] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [activeFilters, setActiveFilters] = useState<number[]>([])

  // Typing animation effect
  useEffect(() => {
    const suggestion = searchSuggestions[currentSuggestion]
    
    if (isTyping) {
      if (displayedText.length < suggestion.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(suggestion.slice(0, displayedText.length + 1))
        }, 50)
        return () => clearTimeout(timeout)
      } else {
        // Finished typing, wait then start deleting
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 2000)
        return () => clearTimeout(timeout)
      }
    } else {
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 25)
        return () => clearTimeout(timeout)
      } else {
        // Finished deleting, move to next suggestion
        setCurrentSuggestion((prev) => (prev + 1) % searchSuggestions.length)
        setIsTyping(true)
      }
    }
  }, [displayedText, isTyping, currentSuggestion])

  // Animate filter tags
  useEffect(() => {
    const interval = setInterval(() => {
      const numActive = Math.floor(Math.random() * 4) + 2
      const indices: number[] = []
      while (indices.length < numActive) {
        const idx = Math.floor(Math.random() * filterTags.length)
        if (!indices.includes(idx)) indices.push(idx)
      }
      setActiveFilters(indices)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto animate-on-scroll animate mt-[55px]">
      {/* Search Bar */}
      <div className="relative mb-4">
        <div className="flex items-center gap-2 bg-neutral-900/80 border border-white/10 rounded-full px-4 py-2.5 backdrop-blur-sm">
          <RotateCcw className="w-4 h-4 text-emerald-500 shrink-0" />
          <div className="flex-1 text-white/60 text-sm">
            {displayedText || "What are you looking for today?"}
            <span className="animate-pulse text-emerald-500">|</span>
          </div>
          <div className="flex items-center gap-2">
            <Mic className="w-4 h-4 text-white/40 hover:text-white/60 cursor-pointer transition-colors" />
            <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 cursor-pointer transition-colors">
              <Send className="w-3.5 h-3.5 text-white/60" />
            </div>
          </div>
        </div>
      </div>

      {/* Try searching for label */}
      <div className="text-center mb-3">
        
      </div>

      {/* Current suggestion display */}
      <div className="text-center mb-5">
        
        
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap justify-center gap-1.5">
        {filterTags.map((tag, index) => (
          <span
            key={tag.label}
            className={`px-3 py-1 rounded-full text-xs border transition-all duration-500 ${
              activeFilters.includes(index)
                ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                : "bg-transparent border-white/20 text-white/50"
            }`}
          >
            {tag.label}
          </span>
        ))}
        <span className="px-3 py-1 rounded-full text-xs bg-emerald-500 text-white font-medium">
          +100
        </span>
      </div>
    </div>
  )
}
