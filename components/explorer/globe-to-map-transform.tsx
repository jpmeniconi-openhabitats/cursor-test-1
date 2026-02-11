"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import { feature } from "topojson-client"
import { Button } from "@/components/ui/button"

interface GeoFeature {
  type: string
  geometry: any
  properties: any
}

interface Project {
  id: number
  name: string
  location: string
  coordinates: [number, number]
  type: string
  status?: string
  year?: number
  image: string
}

interface GlobeToMapTransformProps {
  projects?: Project[]
  onProjectClick?: (project: Project) => void
  onUnroll?: () => void
  autoPlay?: boolean
}

function interpolateProjection(raw0: any, raw1: any) {
  const mutate: any = d3.geoProjectionMutator((t: number) => (x: number, y: number) => {
    const [x0, y0] = raw0(x, y)
    const [x1, y1] = raw1(x, y)
    return [x0 + t * (x1 - x0), y0 + t * (y1 - y0)]
  })
  let t = 0
  return Object.assign((mutate as any)(t), {
    alpha(_: number) {
      return arguments.length ? (mutate as any)((t = +_)) : t
    },
  })
}

export function GlobeToMapTransform({
  projects = [],
  onProjectClick,
  onUnroll,
  autoPlay = false,
}: GlobeToMapTransformProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [progress, setProgress] = useState([0])
  const [worldData, setWorldData] = useState<GeoFeature[]>([])
  const [rotation, setRotation] = useState([0, 0])
  const [translation, setTranslation] = useState([0, 0])
  const [isDragging, setIsDragging] = useState(false)
  const [lastMouse, setLastMouse] = useState([0, 0])
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [scale, setScale] = useState(200)

  const width = 800
  const height = 500

  useEffect(() => {
    const loadWorldData = async () => {
      try {
        const response = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
        const world: any = await response.json()
        const countries = feature(world, world.objects.countries).features
        setWorldData(countries)
        console.log("[v0] Successfully loaded world data with", countries.length, "countries")
      } catch (error) {
        console.log("[v0] Error loading world data:", error)
        const fallbackData = [
          {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [-180, -90],
                  [180, -90],
                  [180, 90],
                  [-180, 90],
                  [-180, -90],
                ],
              ],
            },
            properties: {},
          },
        ]
        setWorldData(fallbackData)
      }
    }

    loadWorldData()
  }, [])

  useEffect(() => {
    if (autoPlay && worldData.length > 0) {
      // Initial delay to show the globe, then unroll
      const timer = setTimeout(() => {
        handleAnimate()
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [autoPlay, worldData])

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true)
    const rect = svgRef.current?.getBoundingClientRect()
    if (rect) {
      setLastMouse([event.clientX - rect.left, event.clientY - rect.top])
    }
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging) return

    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return

    const currentMouse = [event.clientX - rect.left, event.clientY - rect.top]
    const dx = currentMouse[0] - lastMouse[0]
    const dy = currentMouse[1] - lastMouse[1]

    const t = progress[0] / 100

    if (t < 0.5) {
      const sensitivity = 0.5
      setRotation((prev) => [prev[0] + dx * sensitivity, Math.max(-90, Math.min(90, prev[1] - dy * sensitivity))])
    } else {
      const sensitivityMap = 0.25
      setRotation((prev) => [prev[0] + dx * sensitivityMap, Math.max(-90, Math.min(90, prev[1] - dy * sensitivityMap))])
    }

    setLastMouse(currentMouse)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault()
    const zoomSpeed = 0.1
    const delta = -event.deltaY * zoomSpeed

    setScale((prevScale) => {
      const newScale = prevScale + delta
      return Math.max(100, Math.min(400, newScale))
    })
  }

  useEffect(() => {
    if (!svgRef.current || worldData.length === 0) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const t = progress[0] / 100
    const alpha = Math.pow(t, 0.5)

    const scaleInterpolate = d3
      .scaleLinear()
      .domain([0, 1])
      .range([scale, scale * 0.6])
    const baseRotate = d3.scaleLinear().domain([0, 1]).range([0, 0])

    const projection = interpolateProjection(d3.geoOrthographicRaw, d3.geoEquirectangularRaw)
      .scale(scaleInterpolate(alpha))
      .translate([width / 2 + translation[0], height / 2 + translation[1]])
      .rotate([baseRotate(alpha) + rotation[0], rotation[1]])
      .precision(0.1)

    projection.alpha(alpha)

    const path = d3.geoPath(projection)

    try {
      const graticule = d3.geoGraticule()
      const graticulePath = path(graticule())
      if (graticulePath) {
        svg
          .append("path")
          .datum(graticule())
          .attr("d", graticulePath)
          .attr("fill", "none")
          .attr("stroke", "#cccccc")
          .attr("stroke-width", 1)
          .attr("opacity", 0.2)
      }
    } catch (error) {
      console.log("[v0] Error creating graticule:", error)
    }

    svg
      .selectAll(".country")
      .data(worldData)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("d", (d) => {
        try {
          const pathString = path(d as any)
          if (!pathString) return ""
          if (typeof pathString === "string" && (pathString.includes("NaN") || pathString.includes("Infinity"))) {
            return ""
          }
          return pathString
        } catch (error) {
          console.log("[v0] Error generating path for country:", error)
          return ""
        }
      })
      .attr("fill", "none")
      .attr("stroke", "#cccccc")
      .attr("stroke-width", 1.0)
      .attr("opacity", 1.0)
      .style("visibility", function () {
        const pathData = d3.select(this).attr("d")
        return pathData && pathData.length > 0 && !pathData.includes("NaN") ? "visible" : "hidden"
      })

    try {
      const sphereOutline = path({ type: "Sphere" })
      if (sphereOutline) {
        svg
          .append("path")
          .datum({ type: "Sphere" })
          .attr("d", sphereOutline)
          .attr("fill", "none")
          .attr("stroke", "#222222")
          .attr("stroke-width", 1)
          .attr("opacity", 1.0)
      }
    } catch (error) {
      console.log("[v0] Error creating sphere outline:", error)
    }

    if (projects.length > 0) {
      const markerGroup = svg
        .selectAll(".project-marker-group")
        .data(projects)
        .enter()
        .append("g")
        .attr("class", "project-marker-group")
        .style("cursor", "pointer")
        .on("mouseenter", (event, d) => {
          setHoveredProject(d.id)
        })
        .on("mouseleave", (event, d) => {
          setHoveredProject(null)
        })
        .on("click", (event, d) => {
          if (onProjectClick) {
            onProjectClick(d)
          }
        })

      markerGroup
        .append("circle")
        .attr("class", "project-marker-pulse")
        .attr("cx", (d) => {
          const coords = projection([d.coordinates[0], d.coordinates[1]])
          return coords ? coords[0] : -1000
        })
        .attr("cy", (d) => {
          const coords = projection([d.coordinates[0], d.coordinates[1]])
          return coords ? coords[1] : -1000
        })
        .attr("r", (d) => (hoveredProject === d.id ? 5 : 3))
        .attr("fill", "#14b8a6")
        .attr("stroke", "#0d9488")
        .attr("stroke-width", 1.5)
        .style("filter", "drop-shadow(0 0 6px #14b8a6)")
        .style("visibility", (d) => {
          if (alpha < 0.5) {
            const coords = projection([d.coordinates[0], d.coordinates[1]])
            return coords ? "visible" : "hidden"
          }
          return "visible"
        })

      markerGroup.selectAll(".project-marker-pulse").each(function (d: any) {
        const circle = d3.select(this)
        const baseRadius = hoveredProject === d.id ? 5 : 3
        const maxRadius = hoveredProject === d.id ? 7 : 5

        const animateRadius = document.createElementNS("http://www.w3.org/2000/svg", "animate")
        animateRadius.setAttribute("attributeName", "r")
        animateRadius.setAttribute("values", `${baseRadius};${maxRadius};${baseRadius}`)
        animateRadius.setAttribute("dur", "2s")
        animateRadius.setAttribute("repeatCount", "indefinite")
        this.appendChild(animateRadius)

        const animateOpacity = document.createElementNS("http://www.w3.org/2000/svg", "animate")
        animateOpacity.setAttribute("attributeName", "opacity")
        animateOpacity.setAttribute("values", "1;0.5;1")
        animateOpacity.setAttribute("dur", "2s")
        animateOpacity.setAttribute("repeatCount", "indefinite")
        this.appendChild(animateOpacity)
      })

      console.log("[v0] Rendered", projects.length, "project markers on globe with pulse animation")
    }

    console.log("[v0] Visualization updated with progress:", progress[0])
  }, [worldData, progress, rotation, translation, projects, hoveredProject, onProjectClick, scale])

  const handleAnimate = () => {
    if (isAnimating) return

    if (progress[0] === 0 && onUnroll) {
      // If we are unrolling (going from globe to map), call the callback when animation finishes
      setIsAnimating(true)
      const startProgress = progress[0]
      const endProgress = 100
      const duration = 2000

      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const t = Math.min(elapsed / duration, 1)
        const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
        const currentProgress = startProgress + (endProgress - startProgress) * eased

        setProgress([currentProgress])

        if (t < 1) {
          requestAnimationFrame(animate)
        } else {
          setIsAnimating(false)
          onUnroll() // Call this AFTER animation completes
        }
      }
      animate()
      return
    }

    setIsAnimating(true)
    const startProgress = progress[0]
    const endProgress = startProgress === 0 ? 100 : 0
    const duration = 2000

    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const t = Math.min(elapsed / duration, 1)

      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      const currentProgress = startProgress + (endProgress - startProgress) * eased

      setProgress([currentProgress])

      if (t < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
      }
    }

    animate()
  }

  const handleSliderChange = (value: number[]) => {
    if (!isAnimating) {
      setProgress(value)
    }
  }

  const handleReset = () => {
    setRotation([0, 0])
    setTranslation([0, 0])
    setScale(200)
  }

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full border-none bg-transparent cursor-grab active:cursor-grabbing"
        preserveAspectRatio="xMidYMid meet"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      />
      {!autoPlay && (
        <div className="absolute bottom-4 right-4 flex gap-2 z-10">
          <Button onClick={handleAnimate} disabled={isAnimating} className="cursor-pointer min-w-[120px] rounded">
            {isAnimating ? "Animating..." : progress[0] === 0 ? "Unroll Globe" : "Roll to Globe"}
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="cursor-pointer min-w-[80px] text-white border-white/20 hover:bg-white/10 bg-transparent rounded"
          >
            Reset
          </Button>
        </div>
      )}
    </div>
  )
}
