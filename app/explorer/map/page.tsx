"use client"

import { useState, useEffect } from "react"
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps"
import { getProjects } from "@/app/actions/projects"
import { getFallbackProjects } from "@/lib/projects-fallback"
import type { ProjectMapItem } from "@/types/project"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  Search,
  Layers,
  MapPin,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Settings,
  Download,
  Share2,
  ChevronLeft,
  ChevronRight,
  Globe,
} from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { GlobeToMapTransform } from "@/components/explorer/globe-to-map-transform"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

export default function MapPage() {
  const [projects, setProjects] = useState<ProjectMapItem[]>([])
  const [leftPanelOpen, setLeftPanelOpen] = useState(true)
  const [rightPanelOpen, setRightPanelOpen] = useState(true)
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 })
  const [selectedProject, setSelectedProject] = useState<ProjectMapItem | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [show3D, setShow3D] = useState(false)

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data.length > 0 ? data : getFallbackProjects())
    })
  }, [])

  const handleZoomIn = () => setZoom(Math.min(zoom + 1, 3))
  const handleZoomOut = () => setZoom(Math.max(zoom - 1, 1))

  const handleUnroll = () => {
    setShow3D(false)
  }

  return (
    <div className="fixed inset-0 bg-black flex overflow-hidden">
      {/* Left Panel - Layers & Filters */}
      <div
        className={cn(
          "bg-background border-r border-border transition-all duration-300 flex flex-col",
          leftPanelOpen ? "w-80" : "w-0",
        )}
      >
        {leftPanelOpen && (
          <>
            {/* Panel Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">Layers & Filters</h2>
              </div>
              <Button size="icon" variant="ghost" onClick={() => setLeftPanelOpen(false)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-4 space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search Projects</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                {/* Map Layers */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Map Layers</label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-accent">
                      <span className="text-sm">Project Markers</span>
                      <Switch defaultChecked disabled={show3D} />
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-accent">
                      <span className="text-sm">Country Borders</span>
                      <Switch defaultChecked disabled={show3D} />
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-accent">
                      <span className="text-sm">Heatmap View</span>
                      <Switch checked={showHeatmap} onCheckedChange={setShowHeatmap} disabled={show3D} />
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-accent bg-accent/50">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">3D Globe View</span>
                      </div>
                      <Switch checked={show3D} onCheckedChange={setShow3D} />
                    </div>
                  </div>
                </div>

                {/* Project Type Filters */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Project Types</label>
                  <div className="space-y-2">
                    {[
                      "Passive House",
                      "Living Building",
                      "LEED Platinum",
                      "Net Zero",
                      "Solar",
                      "Green Building",
                      "Smart City",
                      "Retrofit",
                      "Zero Carbon",
                      "Net Positive",
                      "Energy Positive",
                      "Car-Free",
                      "Vertical Garden",
                      "Carbon Neutral",
                      "Wind Power",
                      "Bamboo",
                    ].map((type) => (
                      <div key={type} className="flex items-center gap-2">
                        <input type="checkbox" id={type} className="rounded" defaultChecked />
                        <label htmlFor={type} className="text-sm cursor-pointer">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Year Range */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Year Built</label>
                  <Slider defaultValue={[2010, 2024]} min={2000} max={2024} step={1} className="w-full" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>2010</span>
                    <span>2024</span>
                  </div>
                </div>

                {/* Status Filter */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Project Status</label>
                  <div className="space-y-2">
                    {["Completed", "In Progress", "Planned"].map((status) => (
                      <div key={status} className="flex items-center gap-2">
                        <input type="checkbox" id={status} className="rounded" defaultChecked />
                        <label htmlFor={status} className="text-sm cursor-pointer">
                          {status}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </>
        )}
      </div>

      {/* Main Map Area */}
      <div className="flex-1 relative">
        {/* Top Toolbar */}
        <div className="absolute top-16 left-0 right-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              {!leftPanelOpen && (
                <Button size="icon" variant="ghost" onClick={() => setLeftPanelOpen(true)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
              <div className="flex items-center gap-2">
                {show3D ? <Globe className="h-5 w-5 text-primary" /> : <MapPin className="h-5 w-5 text-primary" />}
                <h1 className="text-lg font-semibold">{show3D ? "3D Globe View" : "Global Projects Map"}</h1>
              </div>
              <Badge variant="secondary">
                Zoom: {zoom}/3 • {projects.length} Projects
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Map Controls */}
        {!show3D && (
          <div className="absolute top-36 right-4 z-20 flex flex-col gap-2">
            <Button size="icon" variant="secondary" onClick={handleZoomIn} disabled={zoom === 3}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" onClick={handleZoomOut} disabled={zoom === 1}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Map Container */}
        <div className="w-full h-full bg-black pt-[120px]">
          {show3D ? (
            <GlobeToMapTransform
              projects={projects}
              onProjectClick={(project) => setSelectedProject(project)}
              onUnroll={handleUnroll}
            />
          ) : (
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 147,
                center: [0, 20],
              }}
              width={800}
              height={600}
              style={{ width: "100%", height: "100%" }}
            >
              <ZoomableGroup zoom={position.zoom} center={position.coordinates as [number, number]}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={{
                          default: {
                            fill: "#0d9488",
                            stroke: "#14b8a6",
                            strokeWidth: 0.5,
                            outline: "none",
                          },
                          hover: {
                            fill: "#14b8a6",
                            stroke: "#f3f4f6",
                            strokeWidth: 1,
                            outline: "none",
                            cursor: "pointer",
                          },
                        }}
                      />
                    ))
                  }
                </Geographies>

                {projects.map((project) => (
                  <Marker key={project.id} coordinates={project.coordinates}>
                    <g onClick={() => setSelectedProject(project)} style={{ cursor: "pointer" }}>
                      <circle
                        r={3}
                        fill="#ffffff"
                        stroke="#ffffff"
                        strokeWidth={0.5}
                        style={{ filter: "drop-shadow(0 0 4px #ffffff)" }}
                      >
                        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                      </circle>
                    </g>
                  </Marker>
                ))}
              </ZoomableGroup>
            </ComposableMap>
          )}
        </div>
      </div>

      {/* Right Panel - Project Details */}
      <div
        className={cn(
          "bg-background border-l border-border transition-all duration-300 flex flex-col",
          rightPanelOpen ? "w-96" : "w-0",
        )}
      >
        {rightPanelOpen && (
          <>
            {/* Panel Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold">{selectedProject ? "Project Details" : "Select a Project"}</h2>
              <Button size="icon" variant="ghost" onClick={() => setRightPanelOpen(false)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <ScrollArea className="flex-1">
              {selectedProject ? (
                <div className="p-4 space-y-4">
                  {/* Project Image */}
                  <div className="relative w-full h-48 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={selectedProject.image || "/placeholder.svg"}
                      alt={selectedProject.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  {/* Project Info */}
                  <div>
                    <h3 className="text-xl font-bold mb-2">{selectedProject.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{selectedProject.location}</p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Type</span>
                        <Badge variant="secondary">{selectedProject.type}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Status</span>
                        <Badge variant="outline">{selectedProject.status}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Year</span>
                        <span className="text-sm font-medium">{selectedProject.year}</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">View Full Project</Button>
                </div>
              ) : (
                <div className="p-4">
                  <div className="text-center py-12 text-muted-foreground">
                    <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Click on a marker to view project details</p>
                  </div>
                </div>
              )}
            </ScrollArea>
          </>
        )}

        {!rightPanelOpen && (
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-20 right-4 z-20"
            onClick={() => setRightPanelOpen(true)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
