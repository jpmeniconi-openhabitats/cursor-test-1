"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Download, Share2, Map, TrendingUp, Zap, Droplets, Wind, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { getProjectById, getProjectBySlug } from "@/app/actions/projects"
import type { ProjectDetail } from "@/types/project"

// Sample data - in production this would come from a database or API
const energyData = [
  { month: "Jan", heating: 32, cooling: 2, solar: 45 },
  { month: "Feb", heating: 28, cooling: 3, solar: 48 },
  { month: "Mar", heating: 22, cooling: 4, solar: 52 },
  { month: "Apr", heating: 15, cooling: 6, solar: 58 },
  { month: "May", heating: 8, cooling: 8, solar: 62 },
  { month: "Jun", heating: 4, cooling: 12, solar: 65 },
  { month: "Jul", heating: 3, cooling: 15, solar: 64 },
  { month: "Aug", heating: 5, cooling: 13, solar: 60 },
  { month: "Sep", heating: 12, cooling: 9, solar: 55 },
  { month: "Oct", heating: 18, cooling: 6, solar: 50 },
  { month: "Nov", heating: 25, cooling: 4, solar: 46 },
  { month: "Dec", heating: 30, cooling: 2, solar: 44 },
]

const materialsData = [
  { name: "Adobe", value: 415, color: "#14b8a6" },
  { name: "Mineral Wool", value: 120, color: "#10b981" },
  { name: "Low-E Glass", value: 45, color: "#06b6d4" },
  { name: "Concrete", value: 85, color: "#6366f1" },
]

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const idParam = params.id as string
  const [project, setProject] = useState<ProjectDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const numericId = parseInt(idParam, 10)
    if (!isNaN(numericId)) {
      getProjectById(numericId).then((p) => {
        setProject(p ?? null)
        setLoading(false)
      })
    } else {
      getProjectBySlug(idParam).then((p) => {
        setProject(p ?? null)
        setLoading(false)
      })
    }
  }, [idParam])

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-white/60">Loading project...</div>
      </main>
    )
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60 mb-4">Project not found</p>
          <Button variant="outline" className="border-white/20 text-white" onClick={() => router.back()}>
            Back to Map
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Map
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-white/10 text-white/70 hover:text-white bg-transparent"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-white/10 text-white/70 hover:text-white bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-73px)]">
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          {/* Hero Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                {project.certifications && project.certifications.length > 0 && (
                  <div className="inline-block px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-medium mb-4">
                    {project.certifications[0]}
                  </div>
                )}
                <h1 className="text-4xl font-bold mb-4 text-balance">{project.name}</h1>
                <p className="text-white/60 text-lg mb-6">
                  {project.description ?? "Sustainable architecture project."}
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Map className="w-4 h-4 text-teal-400" />
                    <span>{project.location}</span>
                  </div>
                  {project.co2Saved && (
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-teal-400" />
                      <span>{project.co2Saved} CO₂ Saved</span>
                    </div>
                  )}
                  {project.metadata?.solarCapacity && (
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-teal-400" />
                      <span>{project.metadata.solarCapacity}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="rounded-xl overflow-hidden h-[400px] relative bg-white/5">
                <Image src={project.imageUrl ?? "/placeholder.svg"} alt={project.name} fill className="object-cover" />
              </div>
            </div>
          </motion.div>

          {/* Key Metrics Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            <Card className="bg-white/5 border-white/10 p-6">
              <div className="flex items-center justify-between mb-2">
                <Sun className="w-5 h-5 text-amber-400" />
                <span className="text-xs text-white/50">Solar Gain</span>
              </div>
              <div className="text-2xl font-bold text-amber-400">50.5</div>
              <div className="text-xs text-white/50">kWh/m²·yr</div>
            </Card>
            <Card className="bg-white/5 border-white/10 p-6">
              <div className="flex items-center justify-between mb-2">
                <Droplets className="w-5 h-5 text-orange-400" />
                <span className="text-xs text-white/50">Heating</span>
              </div>
              <div className="text-2xl font-bold text-orange-400">27.5</div>
              <div className="text-xs text-white/50">kWh/m²·yr</div>
            </Card>
            <Card className="bg-white/5 border-white/10 p-6">
              <div className="flex items-center justify-between mb-2">
                <Wind className="w-5 h-5 text-blue-400" />
                <span className="text-xs text-white/50">Cooling</span>
              </div>
              <div className="text-2xl font-bold text-blue-400">5.6</div>
              <div className="text-xs text-white/50">kWh/m²·yr</div>
            </Card>
            <Card className="bg-emerald-950/30 border-emerald-900/50 p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span className="text-xs text-emerald-400/70">Carbon Saved</span>
              </div>
              <div className="text-2xl font-bold text-emerald-400">-70.8</div>
              <div className="text-xs text-emerald-400/70">tCO₂e/year</div>
            </Card>
          </motion.div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Annual Energy Balance */}
            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-lg font-semibold mb-4">Annual Energy Balance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="month" stroke="#ffffff50" style={{ fontSize: "12px" }} />
                  <YAxis stroke="#ffffff50" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{ background: "#000", border: "1px solid #ffffff20", borderRadius: "8px" }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Bar dataKey="heating" fill="#fb923c" name="Heating" />
                  <Bar dataKey="cooling" fill="#60a5fa" name="Cooling" />
                  <Bar dataKey="solar" fill="#fbbf24" name="Solar Gain" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Material Distribution */}
            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-lg font-semibold mb-4">Material Distribution (m³)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={materialsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {materialsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#000", border: "1px solid #ffffff20", borderRadius: "8px" }} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Building Envelope Details */}
          <Card className="bg-white/5 border-white/10 p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Building Envelope Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-white/50 mb-2">Glazing Type</div>
                <div className="text-white font-mono">Low-E Triple Pane</div>
                <div className="text-xs text-teal-400 mt-1">U-value: 1.8 W/m²K</div>
              </div>
              <div>
                <div className="text-sm text-white/50 mb-2">Window-Wall Ratio</div>
                <div className="text-white font-mono">10.17%</div>
                <div className="text-xs text-white/50 mt-1">Optimized for passive gain</div>
              </div>
              <div>
                <div className="text-sm text-white/50 mb-2">Solar Orientation</div>
                <div className="text-white font-mono">North (Primary)</div>
                <div className="text-xs text-white/50 mt-1">-15.77% solar gain reduction</div>
              </div>
              <div>
                <div className="text-sm text-white/50 mb-2">Wall Insulation</div>
                <div className="text-white font-mono">Adobe + Mineral Wool</div>
                <div className="text-xs text-teal-400 mt-1">U-value: 0.33 W/m²K</div>
              </div>
              <div>
                <div className="text-sm text-white/50 mb-2">Roof Insulation</div>
                <div className="text-white font-mono">Double Roof System</div>
                <div className="text-xs text-teal-400 mt-1">U-value: 0.26 W/m²K</div>
              </div>
              <div>
                <div className="text-sm text-white/50 mb-2">Ventilation</div>
                <div className="text-white font-mono">Night Cooling (1-3 ACH)</div>
                <div className="text-xs text-white/50 mt-1">Passive strategy</div>
              </div>
            </div>
          </Card>

          {/* 3D Model Placeholder */}
          <Card className="bg-white/5 border-white/10 p-6">
            <h3 className="text-lg font-semibold mb-4">BIM Model Integration</h3>
            <div className="bg-black/50 rounded-lg h-[500px] flex items-center justify-center border border-white/10">
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sun className="w-8 h-8 text-teal-400" />
                </div>
                <div className="text-white/50 mb-2">Interactive 3D Model</div>
                <div className="text-xs text-white/30 mb-4">Speckle integration coming soon</div>
                <Button variant="outline" size="sm" className="border-teal-500/30 text-teal-400 bg-transparent">
                  Load 3D Viewer
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </ScrollArea>
    </main>
  )
}
