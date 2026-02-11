"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Loader2, User, Mic, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
  reasoning?: string[]
}

interface AISearchInterfaceProps {
  onSearch?: (query: string) => void
  onSearchStart?: () => void
  onSearchComplete?: (matchedProjectIds: number[]) => void
  projects?: Array<{ id: number; name: string; location: string; type: string }>
}

const LAST_ENTRIES = ["Chile", "solar panels", "wood", "low budget", "forest", "curved roof", ">30m2"]
const SUGGESTIONS = [
  "Small wood cabin in the south of Chile. Between 120 and 200 m2.",
  "Carbon neutral office buildings in Europe under $5M",
  "Passive house certified homes with solar integration",
  "Affordable bamboo housing projects in Southeast Asia",
  "Net-zero community centers with vertical gardens",
  "Retrofit of historic buildings for energy efficiency in UK",
  "Off-grid desert homes using earthship principles",
  "Floating solar farms on reservoirs in Japan",
  "Sustainable social housing developments in Medellin",
  "Leed Platinum skyscrapers with rainwater harvesting",
]

function searchProjects(
  query: string,
  projects: Array<{ id: number; name: string; location: string; type: string }>,
): number[] {
  const queryLower = query.toLowerCase()
  const queryWords = queryLower.split(/\s+/).filter((w) => w.length > 2)

  const keywordMappings: Record<string, string[]> = {
    passive: ["passive", "passivhaus", "passive house"],
    solar: ["solar", "photovoltaic", "pv", "sun"],
    "net-zero": ["net zero", "net-zero", "zero energy", "nzeb"],
    leed: ["leed", "platinum", "gold", "certified"],
    green: ["green", "eco", "sustainable", "environmental"],
    wood: ["wood", "timber", "wooden", "cabin"],
    bamboo: ["bamboo"],
    retrofit: ["retrofit", "renovation", "historic", "restoration"],
    smart: ["smart", "intelligent", "automated"],
    europe: ["europe", "germany", "france", "uk", "spain", "italy", "netherlands", "sweden", "denmark", "norway"],
    asia: ["asia", "japan", "china", "korea", "singapore", "indonesia", "vietnam", "thailand", "india"],
    usa: ["usa", "america", "united states", "us"],
    canada: ["canada", "canadian"],
    chile: ["chile", "chilean", "santiago"],
    brazil: ["brazil", "brazilian"],
    australia: ["australia", "australian"],
    africa: ["africa", "african", "nigeria", "kenya", "morocco"],
  }

  const scoredProjects: { id: number; score: number }[] = []

  projects.forEach((project) => {
    const projectText = `${project.name} ${project.location} ${project.type}`.toLowerCase()
    let score = 0

    queryWords.forEach((word) => {
      if (projectText.includes(word)) {
        score += 2
      }
    })

    Object.entries(keywordMappings).forEach(([key, synonyms]) => {
      const queryHasKeyword = synonyms.some((syn) => queryLower.includes(syn))
      const projectHasKeyword = synonyms.some((syn) => projectText.includes(syn))

      if (queryHasKeyword && projectHasKeyword) {
        score += 3
      }
    })

    if (queryLower.includes(project.type.toLowerCase())) {
      score += 4
    }

    const baseScore = Math.random() * 0.5
    scoredProjects.push({ id: project.id, score: score + baseScore })
  })

  scoredProjects.sort((a, b) => b.score - a.score)

  const highScoreCount = scoredProjects.filter((p) => p.score >= 2).length
  const targetCount = Math.max(10, Math.min(50, highScoreCount > 0 ? highScoreCount + 15 : 25))

  return scoredProjects.slice(0, targetCount).map((p) => p.id)
}

export function AISearchInterface({
  onSearch,
  onSearchStart,
  onSearchComplete,
  projects = [],
}: AISearchInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: "JARVIS initialized. Ready to explore sustainable architecture projects worldwide.",
    },
  ])
  const [input, setInput] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const [highlightedProjects, setHighlightedProjects] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSuggestionIndex((prev) => (prev + 1) % SUGGESTIONS.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsThinking(true)

    onSearchStart?.()
    onSearch?.(userMessage)

    const matchedProjectIds = searchProjects(userMessage, projects)

    const reasoningSteps = [
      "Analyzing query parameters...",
      "Scanning global project database...",
      `Found ${matchedProjectIds.length} potential matches...`,
      "Filtering by sustainability criteria...",
      "Ranking results by relevance...",
      "Highlighting projects on map...",
    ]

    for (let i = 0; i < reasoningSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 400))
      setMessages((prev) => {
        const newMessages = [...prev]
        const lastMessage = newMessages[newMessages.length - 1]
        if (lastMessage.role === "assistant" && lastMessage.reasoning) {
          lastMessage.reasoning.push(reasoningSteps[i])
        } else {
          newMessages.push({
            role: "assistant",
            content: "",
            reasoning: [reasoningSteps[i]],
          })
        }
        return newMessages
      })

      if (i === 2) {
        onSearchComplete?.(matchedProjectIds)
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 600))

    const responseText =
      matchedProjectIds.length > 0
        ? `I found ${matchedProjectIds.length} sustainable architecture projects matching "${userMessage}". I've highlighted them on the map with a pulsing effect. Click on any marker to view detailed information about the project, including climate data, materials, and sustainability metrics.`
        : `I couldn't find exact matches for "${userMessage}", but I'm showing all projects that might be relevant. Try adjusting your search terms or browse the map to discover projects manually.`

    setMessages((prev) => {
      const newMessages = [...prev]
      const lastMessage = newMessages[newMessages.length - 1]
      if (lastMessage.role === "assistant") {
        lastMessage.content = responseText
      }
      return newMessages
    })

    setIsThinking(false)
  }

  return (
    <div className="relative w-full flex flex-col items-center justify-end pb-4 md:pb-8">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        drag
        dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
        whileDrag={{ scale: 1.02, cursor: "grabbing" }}
        className="w-full max-w-3xl px-4 pointer-events-auto cursor-grab active:cursor-grabbing"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="hidden text-3xl md:text-5xl font-bold text-center mb-8 text-white tracking-tight"
        >
          Explore sustainable
          <br />
          <span className="text-primary/90">architecture and construction</span>
        </motion.h1>

        <div className="relative mx-auto max-w-2xl">
          <form onSubmit={handleSubmit} className="relative z-20" onPointerDown={(e) => e.stopPropagation()}>
            <div
              className={cn(
                "relative flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-1.5 transition-all duration-300",
                isAuthenticated ? "border-primary/30 bg-primary/5" : "hover:border-white/20",
              )}
              onMouseEnter={() => {
                if (!isAuthenticated && !isConnecting) {
                  setIsConnecting(true)
                  setTimeout(() => {
                    setIsConnecting(false)
                    setIsAuthenticated(true)
                  }, 1500)
                }
              }}
            >
              <AnimatePresence mode="wait">
                {isConnecting ? (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "100%" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="absolute inset-0 bg-primary/20 rounded-full flex items-center justify-center z-30 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-2 text-primary text-sm font-medium">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Connecting as JP Juan Pablo Meniconi...</span>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {isAuthenticated && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="hidden absolute -top-10 right-0 flex items-center gap-2 text-xs text-muted-foreground bg-black/50 px-3 py-1 rounded-full border border-white/10"
                >
                  <User className="h-3 w-3 text-primary" />
                  <span>Connected as JP</span>
                </motion.div>
              )}

              <div className="pl-4">
                {isThinking ? (
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                ) : (
                  <RotateCw className="h-5 w-5 text-primary" />
                )}
              </div>

              <Input
                value={input || ""}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isConnecting ? "" : "What are you looking for today?"}
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-white/50 h-12 text-lg"
                disabled={isConnecting}
              />

              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="text-white/50 hover:text-white hover:bg-white/10 rounded-full h-9 w-9 mr-1"
              >
                <Mic className="h-4 w-4" />
              </Button>

              <Button
                type="submit"
                size="icon"
                disabled={isThinking || !input.trim() || isConnecting}
                className={cn(
                  "rounded-full h-10 w-10 transition-all duration-300",
                  input.trim() ? "bg-primary text-primary-foreground scale-100" : "bg-white/10 text-white/50 scale-90",
                )}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-3 space-y-2 pointer-events-none flex flex-col items-center"
          >
            <p className="text-[10px] text-white/30 text-center tracking-widest">Try searching for</p>
            <div className="relative flex flex-col items-center gap-1 w-full max-w-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSuggestionIndex}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.5 }}
                  className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer pointer-events-auto text-center px-4"
                  onClick={() => setInput(SUGGESTIONS[currentSuggestionIndex])}
                >
                  "{SUGGESTIONS[currentSuggestionIndex]}"
                </motion.div>
              </AnimatePresence>
              <div className="h-[1px] w-32 bg-white/10 mt-2 overflow-hidden relative rounded-full">
                <motion.div
                  key={currentSuggestionIndex}
                  className="absolute inset-y-0 left-0 bg-teal-500/50"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 7, ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {messages.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: 20, height: 0 }}
                className="mt-6 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden w-full"
              >
                <div className="p-4 max-h-60 overflow-y-auto custom-scrollbar">
                  {messages.slice(1).map((message, index) => (
                    <div key={index} className="space-y-2">
                      {message.reasoning && (
                        <div className="space-y-1 mb-3">
                          {message.reasoning.map((step, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-center gap-2 text-xs text-primary/70 font-mono"
                            >
                              <span className="w-1 h-1 bg-primary rounded-full" />
                              {step}
                            </motion.div>
                          ))}
                        </div>
                      )}
                      {message.content && <p className="text-sm text-white/90 leading-relaxed">{message.content}</p>}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

export default AISearchInterface
