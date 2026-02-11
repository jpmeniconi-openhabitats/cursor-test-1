"use client"

import type React from "react"

import { useState, useCallback, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Bot, Layout, Menu, X, Info, Inbox } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Navigation } from "@/components/explorer/navigation"
import InteractiveMap from "@/components/explorer/interactive-map"
import AISearchInterface from "@/components/explorer/ai-search-interface"
import Link from "next/link"
import { ExplorerChatPanel } from "@/components/explorer/explorer-chat-panel"
import { getProjects } from "@/app/actions/projects"
import { getFallbackProjects } from "@/lib/projects-fallback"
import type { ProjectMapItem } from "@/types/project"

export default function ExplorerPage() {
  const [projects, setProjects] = useState<ProjectMapItem[]>([])
  const [mobileLeftMenuOpen, setMobileLeftMenuOpen] = useState(false)
  const [mobileRightMenuOpen, setMobileRightMenuOpen] = useState(false)
  const [mapColorMode, setMapColorMode] = useState<"dark" | "teal">("dark")
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [bottomPanelOpen, setBottomPanelOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [aiNavigatorOpen, setAiNavigatorOpen] = useState(true)
  const [projectDetailsOpen, setProjectDetailsOpen] = useState(true)
  const [chatsExpanded, setChatsExpanded] = useState(true)
  const [rightPanelExpanded, setRightPanelExpanded] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [highlightedProjects, setHighlightedProjects] = useState<string[]>([])
  const [zoomLevel, setZoomLevel] = useState(0.6)
  const [visibleProjectsCount, setVisibleProjectsCount] = useState(100)
  const [isSearching, setIsSearching] = useState(false)
  const [searchMatchedProjects, setSearchMatchedProjects] = useState<number[]>([])
  const [hasActiveConversation, setHasActiveConversation] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [hasActiveSearchFilter, setHasActiveSearchFilter] = useState(false)

  const [leftPanelWidth, setLeftPanelWidth] = useState(320)
  const isResizing = useRef(false)
  const MIN_PANEL_WIDTH = 280
  const MAX_PANEL_WIDTH = 600

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    isResizing.current = true
    document.body.style.cursor = "col-resize"
    document.body.style.userSelect = "none"
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return
      const newWidth = Math.min(Math.max(e.clientX, MIN_PANEL_WIDTH), MAX_PANEL_WIDTH)
      setLeftPanelWidth(newWidth)
    }

    const handleMouseUp = () => {
      isResizing.current = false
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  const handleZoomChange = useCallback((zoom: number, visibleCount: number) => {
    setZoomLevel(zoom)
    setVisibleProjectsCount(visibleCount)
  }, [])

  const handleProjectDeselect = useCallback(() => {
    setSelectedProject(null)
  }, [])

  const handleProjectSelect = useCallback((project) => {
    setSelectedProject(project)
    if (window.innerWidth < 768) {
      setMobileRightMenuOpen(true)
    } else {
      setRightSidebarOpen(true)
    }
  }, [])

  const handleFilterChange = useCallback((filter: string) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(filter) ? prevFilters.filter((f) => f !== filter) : [...prevFilters, filter],
    )
  }, [])

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data.length > 0 ? data : getFallbackProjects())
    })
  }, [])

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="h-screen w-full overflow-hidden pt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-10 md:flex h-screen w-full"
        >
          <Navigation isHidden={true} />

          {/* Mobile Left Menu */}
          <AnimatePresence>
            {mobileLeftMenuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
                  onClick={() => setMobileLeftMenuOpen(false)}
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="md:hidden fixed left-0 top-0 bottom-0 w-[85vw] max-w-sm bg-black border-r border-white/10 z-[120] overflow-hidden"
                >
                  <div className="p-4 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2 text-white/80">
                        <Inbox className="w-5 h-5" />
                        <h2 className="font-semibold">Chats</h2>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileLeftMenuOpen(false)}
                        className="h-8 w-8 text-white/50 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                    <ExplorerChatPanel className="flex-1" />

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-auto pt-4 border-t border-white/10"
                    >
                      <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                          style={{ backgroundColor: "#008080" }}
                        >
                          JP
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-sm font-medium text-white group-hover:text-[#008080] transition-colors truncate">
                            Juan Pablo Meniconi
                          </span>
                          <span className="text-[10px] text-white/50 tracking-wider">Free</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Desktop Left Sidebar */}
          <motion.div
            initial={false}
            animate={{ width: leftSidebarOpen ? leftPanelWidth : 0 }}
            className="hidden md:flex flex-col bg-black/95 border-r border-white/10 backdrop-blur-xl overflow-hidden z-30 relative"
          >
            <div className="p-4 h-full flex flex-col" style={{ width: leftPanelWidth - 20 }}>
              <div className="flex items-center gap-2 mb-6 text-white/80">
                <Inbox className="w-5 h-5" />
                <h2 className="font-semibold">Chats</h2>
              </div>
              <ExplorerChatPanel className="flex-1" />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="mt-auto pt-4 border-t border-white/10"
              >
                <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: "#008080" }}
                  >
                    JP
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-medium text-white group-hover:text-[#008080] transition-colors truncate">
                      Juan Pablo Meniconi
                    </span>
                    <span className="text-[10px] text-white/50 tracking-wider">Free</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {leftSidebarOpen && (
              <div
                onMouseDown={handleMouseDown}
                className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-[#008080]/50 transition-colors z-50 group"
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-16 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
          </motion.div>

          <div
            className="hidden md:block fixed top-[50vh] -translate-y-1/2 z-50 transition-all duration-300"
            style={{ left: leftSidebarOpen ? leftPanelWidth : 0 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
              className="h-24 w-6 rounded-r-xl bg-black/50 border-y border-r border-white/10 text-white hover:bg-black/80"
            >
              {leftSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>

          <div className="fixed inset-0 md:relative md:flex-1 md:flex md:flex-col overflow-hidden">
            {/* Map Container */}
            <div className="relative h-screen md:h-full w-full md:flex-1 bg-black overflow-hidden">
              {/* Mobile Menu Buttons */}
              <div className="md:hidden absolute top-4 left-0 right-0 z-20 flex items-center justify-between px-4">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setMobileLeftMenuOpen(true)}
                  className="h-10 w-10 rounded-full bg-black/80 border border-white/10 text-white hover:bg-black/90 shadow-lg backdrop-blur-sm"
                >
                  <Menu className="w-5 h-5" />
                </Button>

                {selectedProject && (
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => setMobileRightMenuOpen(true)}
                    className="h-10 w-10 rounded-full bg-black/80 border border-white/10 text-white hover:bg-black/90 shadow-lg backdrop-blur-sm"
                  >
                    <Info className="w-5 h-5" />
                  </Button>
                )}
              </div>

              {/* Zoom level and project count indicator */}
              <div className="fixed top-8 right-[420px] z-20 flex flex-col items-center gap-0.5 text-white/50 font-mono text-xs">
                <div>Zoom Level: {Math.min(Math.max(Math.round(zoomLevel * 5) / 5, 0.2), 3).toFixed(1)}x</div>
                <div>
                  {visibleProjectsCount} Project{visibleProjectsCount !== 1 ? "s" : ""}
                </div>
              </div>

              {/* Interactive Map */}
              <div className="absolute inset-0 z-[1]">
                <InteractiveMap
                  projects={projects}
                  colorMode={mapColorMode}
                  onProjectSelect={handleProjectSelect}
                  onProjectDeselect={handleProjectDeselect}
                  zoomLevel={zoomLevel}
                  highlightedProjects={highlightedProjects}
                  setVisibleProjectsCount={setVisibleProjectsCount}
                  onZoomChange={handleZoomChange}
                  isSearching={isSearching}
                  searchMatchedProjects={searchMatchedProjects}
                  hasActiveConversation={hasActiveConversation}
                  selectedFilters={selectedFilters}
                  hasActiveSearchFilter={hasActiveSearchFilter}
                />
                {/* Gradient overlays */}
                <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-[5]" />
                <div className="hidden md:block absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-black via-black/50 to-transparent pointer-events-none z-[5]" />
                <div className="hidden md:block absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-black via-black/50 to-transparent pointer-events-none z-[5]" />
              </div>

              {/* Search Overlay */}
              <div className="absolute bottom-0 left-0 right-0 md:inset-0 z-10 flex flex-col justify-end pb-4 md:pb-6 px-4 md:px-0 pointer-events-none">
                <div className="pointer-events-auto w-full">
                  <AISearchInterface
                    projects={projects.map((p) => ({ id: p.id, name: p.name, location: p.country, type: p.type }))}
                    onSearch={(query) => {
                      setSearchQuery(query)
                    }}
                    onSearchStart={() => {
                      setIsSearching(true)
                      setHasActiveConversation(true)
                    }}
                    onSearchComplete={(matchedIds) => {
                      setSearchMatchedProjects(matchedIds)
                      setHasActiveSearchFilter(true)
                      setTimeout(() => {
                        setIsSearching(false)
                      }, 2000)
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Panel: Project Types */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: bottomPanelOpen ? "auto" : "40px" }}
              className="hidden md:flex bg-black/90 border-t border-white/10 backdrop-blur-xl z-20 flex-shrink-0 flex-col relative"
            >
              <div className="w-full flex justify-center -mt-3 absolute top-0 z-30 pointer-events-none">
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-6 w-24 rounded-full border border-white/10 bg-black/80 text-white/50 hover:text-white text-[10px] pointer-events-auto shadow-lg"
                  onClick={() => setBottomPanelOpen(!bottomPanelOpen)}
                >
                  {bottomPanelOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
                </Button>
              </div>

              <div className="p-4 overflow-hidden">
                <div className={`flex items-center justify-between mb-4 ${!bottomPanelOpen && "opacity-0"}`}>
                  <div className="flex items-center gap-4">
                    <h3 className="text-sm font-medium text-white/80">Project Types</h3>
                    <div className="relative hidden md:block">
                      <input
                        type="text"
                        placeholder="Search filters..."
                        className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#008080] w-32 transition-all focus:w-48"
                        value={searchQuery || ""}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <span className="hidden md:inline text-xs text-white/40 pr-6">Filter by category</span>
                </div>

                <div className="flex flex-wrap gap-2 justify-center pb-2">
                  {[
                    "Bamboo",
                    "Car-Free",
                    "Carbon Neutral",
                    "Energy Positive",
                    "Green Building",
                    "LEED Platinum",
                    "Living Building",
                    "Net Positive",
                    "Net Zero",
                    "Passive House",
                    "Retrofit",
                    "Smart City",
                    "Solar",
                    "Solar District",
                    "Vertical Garden",
                    "Wind Power",
                    "Zero Carbon",
                  ].map((type) => (
                    <Button
                      key={type}
                      variant="outline"
                      size="sm"
                      className="h-6 w-24 rounded-full bg-teal-950/30 border border-teal-900/50 text-[#008080] hover:bg-teal-950/50 hover:text-teal-300"
                      onClick={() => handleFilterChange(type)}
                    >
                      {type}
                    </Button>
                  ))}
                  <Button className="px-3 py-1.5 text-xs font-bold text-[#008080] hover:text-teal-300 hover:bg-teal-950/30 rounded-full transition-all border border-[#008080]/30 hover:border-[#008080]/60 bg-[#008080]/10">
                    +100
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile Right Menu */}
          <AnimatePresence>
            {mobileRightMenuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
                  onClick={() => setMobileRightMenuOpen(false)}
                />
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="md:hidden fixed right-0 top-0 bottom-0 w-[85vw] max-w-sm bg-black border-l border-white/10 z-[120] overflow-hidden"
                >
                  <div className="p-4 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-white/80">
                        <Layout className="w-4 h-4" />
                        <h2 className="font-semibold">Project Details</h2>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileRightMenuOpen(false)}
                        className="h-8 w-8 text-white/50 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>

                    <ScrollArea className="flex-1">
                      {selectedProject ? (
                        <div className="space-y-4">
                          <Button asChild className="w-full text-white" style={{ backgroundColor: "#008080" }}>
                            <Link href={`/explorer/project/${selectedProject.id}`}>
                              View Full Project →
                            </Link>
                          </Button>

                          <div className="relative w-full h-40 rounded-lg overflow-hidden">
                            <img
                              src={selectedProject.image || "/placeholder.svg?height=160&width=300"}
                              alt={selectedProject.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold text-white mb-1">{selectedProject.name}</h3>
                            <p className="text-sm text-white/60">{selectedProject.country}</p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-white/60">Type</span>
                              <span className="text-white">{selectedProject.type}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-white/60">Year</span>
                              <span className="text-white">{selectedProject.year || "N/A"}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-white/60">Architect</span>
                              <span className="text-white">{selectedProject.architect || "N/A"}</span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-sm font-medium text-white/80">Energy Demand (kWh/m²·yr)</h4>
                            <div className="space-y-2">
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-white/60">Solar Gain</span>
                                  <span className="text-yellow-400 font-semibold">50.5</span>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full"
                                    style={{ width: "50.5%" }}
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-white/60">Heating</span>
                                  <span className="text-orange-400 font-semibold">27.5</span>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-orange-500 to-red-400 rounded-full"
                                    style={{ width: "27.5%" }}
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-white/60">Cooling</span>
                                  <span className="text-blue-400 font-semibold">5.6</span>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                                    style={{ width: "5.6%" }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-sm font-medium text-white/80">Building Envelope</h4>
                            <div className="space-y-2 text-xs">
                              <div className="flex justify-between">
                                <span className="text-white/60">Glazing</span>
                                <span className="text-white">Low-E Triple (1.8 W/m²K)</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/60">Window-Wall Ratio</span>
                                <span className="text-white">10.17%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/60">Solar Orientation</span>
                                <span className="text-white">North (optimized)</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-sm font-medium text-white/80">Materials</h4>
                            <div className="space-y-2">
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-white/60">Adobe (Walls)</span>
                                  <span className="text-[#008080] font-semibold">415 m³</span>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                  <div className="h-full bg-[#008080] rounded-full" style={{ width: "65%" }} />
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-white/60">Mineral Wool</span>
                                  <span className="text-[#008080] font-semibold">120 m²</span>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                  <div className="h-full bg-[#008080] rounded-full" style={{ width: "35%" }} />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-sm font-medium text-white/80">Sustainability Metrics</h4>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="p-3 rounded-lg bg-[#008080]/20 border border-[#008080]/50">
                                <div className="text-[10px] text-[#008080]/70 mb-1">Carbon Saved</div>
                                <div className="text-base font-bold text-[#008080]">-70.8 tCO₂e</div>
                              </div>
                              <div className="p-3 rounded-lg bg-[#008080]/20 border border-[#008080]/50">
                                <div className="text-[10px] text-[#008080]/70 mb-1">Solar Gen.</div>
                                <div className="text-base font-bold text-[#008080]">4 kWp</div>
                              </div>
                            </div>
                          </div>

                          <p className="text-xs text-white/60 leading-relaxed">
                            This project demonstrates cutting-edge sustainable architecture principles, utilizing
                            passive cooling, thermal mass, and renewable energy integration.
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center p-6">
                          <Layout className="w-12 h-12 text-white/20 mb-4" />
                          <p className="text-white/40 text-sm">Select a project on the map to view details</p>
                        </div>
                      )}
                    </ScrollArea>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <div
            className="hidden md:block fixed top-[50vh] -translate-y-1/2 z-50 transition-all duration-300 pointer-events-auto"
            style={{ right: rightSidebarOpen ? 300 : 0 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
              className={cn(
                "h-24 w-8 rounded-l-xl border-y border-l border-white/10 text-white/50 hover:text-white backdrop-blur-sm transition-colors",
                rightSidebarOpen ? "bg-black/50 hover:bg-black/80" : "bg-transparent hover:bg-black/30",
              )}
            >
              {rightSidebarOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>

          {/* Desktop Right Sidebar */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: rightSidebarOpen ? 300 : 0,
              opacity: rightSidebarOpen ? 1 : 0,
            }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="hidden md:block flex-shrink-0 bg-black border-l border-white/10 overflow-hidden"
          >
            <ScrollArea className="h-full">
              <div className="p-6 space-y-6">
                {/* AI Agent & Navigator */}
                <div>
                  <div className="flex items-center gap-2 text-white/80 mb-4">
                    <Bot className="w-5 h-5 text-[#008080]" />
                    <h2 className="font-semibold">AI Agent & Navigator</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center gap-2 text-[#008080] mb-2">
                        <h3 className="font-medium text-sm">Auto-Navigator</h3>
                      </div>
                      <p className="text-xs text-white/60 mb-3">Delegate research tasks to your AI agent.</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-[#008080]/50 text-[#008080] hover:bg-[#008080]/10 bg-transparent"
                      >
                        Start New Task
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <div className="flex items-center gap-2 text-white/80 mb-4">
                    <Layout className="w-5 h-5" />
                    <h2 className="font-semibold">Project Details</h2>
                  </div>

                  {selectedProject ? (
                    <motion.div
                      key={selectedProject.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-4"
                    >
                      <Button asChild className="w-full text-white" style={{ backgroundColor: "#008080" }}>
                        <Link href={`/explorer/project/${selectedProject.id}`}>
                          View Full Project →
                        </Link>
                      </Button>

                      <div className="relative w-full h-40 rounded-lg overflow-hidden">
                        <img
                          src={selectedProject.image || "/placeholder.svg?height=160&width=300"}
                          alt={selectedProject.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{selectedProject.name}</h3>
                        <p className="text-sm text-white/60">{selectedProject.country}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Type</span>
                          <span className="text-white">{selectedProject.type}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Year</span>
                          <span className="text-white">{selectedProject.year || "N/A"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Architect</span>
                          <span className="text-white">{selectedProject.architect || "N/A"}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-white/80">Energy Demand (kWh/m²·yr)</h4>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-white/60">Solar Gain</span>
                              <span className="text-yellow-400 font-semibold">50.5</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "50.5%" }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                                className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-white/60">Heating</span>
                              <span className="text-orange-400 font-semibold">27.5</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "27.5%" }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                                className="h-full bg-gradient-to-r from-orange-500 to-red-400 rounded-full"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-white/60">Cooling</span>
                              <span className="text-blue-400 font-semibold">5.6</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "5.6%" }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-white/80">Building Envelope</h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-white/60">Glazing</span>
                            <span className="text-white">Low-E Triple (1.8 W/m²K)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Window-Wall Ratio</span>
                            <span className="text-white">10.17%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Solar Orientation</span>
                            <span className="text-white">North (optimized)</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-white/80">Materials</h4>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-white/60">Adobe (Walls)</span>
                              <span className="text-[#008080] font-semibold">415 m³</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "65%" }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                                className="h-full bg-[#008080] rounded-full"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-white/60">Mineral Wool</span>
                              <span className="text-[#008080] font-semibold">120 m²</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "35%" }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                                className="h-full bg-[#008080] rounded-full"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-white/80">Sustainability Metrics</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-3 rounded-lg bg-[#008080]/20 border border-[#008080]/50">
                            <div className="text-[10px] text-[#008080]/70 mb-1">Carbon Saved</div>
                            <div className="text-base font-bold text-[#008080]">-70.8 tCO₂e</div>
                          </div>
                          <div className="p-3 rounded-lg bg-[#008080]/20 border border-[#008080]/50">
                            <div className="text-[10px] text-[#008080]/70 mb-1">Solar Gen.</div>
                            <div className="text-base font-bold text-[#008080]">4 kWp</div>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-white/60 leading-relaxed">
                        This project demonstrates cutting-edge sustainable architecture principles, utilizing passive
                        cooling, thermal mass, and renewable energy integration.
                      </p>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center justify-center flex-1 text-center p-6">
                      <Layout className="w-12 h-12 text-white/20 mb-4" />
                      <p className="text-white/40 text-sm">Select a project on the map to view details</p>
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          </motion.div>
        </motion.div>
      </div>
    </SidebarProvider>
  )
}
