"use client"

import type React from "react"

import { useState, useEffect, useRef, memo, useCallback, useMemo } from "react"
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ZoomIn, ZoomOut, ExternalLink, ImageIcon, X, ChevronRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { SearchWaveEffect } from "./search-wave-effect"
import type { ProjectMapItem } from "@/types/project"

const pulseKeyframes = `
  @keyframes country-pulse {
    0%, 100% {
      stroke-opacity: 1;
      stroke-width: 1.5;
    }
    50% {
      stroke-opacity: 0.5;
      stroke-width: 2.5;
    }
  }
  
  @keyframes search-wave-expand {
    0% {
      transform: scale(0.1);
      opacity: 0;
    }
    10% {
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
  
  @keyframes edge-glow-pulse {
    0%, 100% {
      opacity: 0.3;
    }
    50% {
      opacity: 0.8;
    }
  }
  
  @keyframes particle-float {
    0% {
      transform: translateY(0) translateX(0);
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100px) translateX(50px);
      opacity: 0;
    }
  }
`

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

interface CountryData {
  name: string
  projects: number
  population: string
  flag: string // Now stores ISO 2-letter code for flag image URL
}

const countryData: Record<string, CountryData> = {
  "840": { name: "United States", projects: 18, population: "331M", flag: "us" },
  "124": { name: "Canada", projects: 5, population: "38M", flag: "ca" },
  "484": { name: "Mexico", projects: 2, population: "128M", flag: "mx" },
  "320": { name: "Guatemala", projects: 0, population: "18M", flag: "gt" },
  "340": { name: "Honduras", projects: 0, population: "10M", flag: "hn" },
  "222": { name: "El Salvador", projects: 0, population: "6M", flag: "sv" },
  "558": { name: "Nicaragua", projects: 0, population: "7M", flag: "ni" },
  "188": { name: "Costa Rica", projects: 0, population: "5M", flag: "cr" },
  "591": { name: "Panama", projects: 0, population: "4M", flag: "pa" },
  "084": { name: "Belize", projects: 0, population: "400K", flag: "bz" },
  "192": { name: "Cuba", projects: 0, population: "11M", flag: "cu" },
  "332": { name: "Haiti", projects: 0, population: "11M", flag: "ht" },
  "214": { name: "Dominican Republic", projects: 0, population: "11M", flag: "do" },
  "388": { name: "Jamaica", projects: 0, population: "3M", flag: "jm" },
  "780": { name: "Trinidad and Tobago", projects: 0, population: "1M", flag: "tt" },
  "052": { name: "Barbados", projects: 0, population: "287K", flag: "bb" },
  "076": { name: "Brazil", projects: 4, population: "214M", flag: "br" },
  "032": { name: "Argentina", projects: 2, population: "45M", flag: "ar" },
  "152": { name: "Chile", projects: 2, population: "19M", flag: "cl" },
  "170": { name: "Colombia", projects: 2, population: "51M", flag: "co" },
  "604": { name: "Peru", projects: 1, population: "33M", flag: "pe" },
  "218": { name: "Ecuador", projects: 1, population: "18M", flag: "ec" },
  "862": { name: "Venezuela", projects: 1, population: "28M", flag: "ve" },
  "858": { name: "Uruguay", projects: 1, population: "3M", flag: "uy" },
  "068": { name: "Bolivia", projects: 1, population: "12M", flag: "bo" },
  "600": { name: "Paraguay", projects: 0, population: "7M", flag: "py" },
  "740": { name: "Suriname", projects: 0, population: "600K", flag: "sr" },
  "328": { name: "Guyana", projects: 0, population: "800K", flag: "gy" },
  "254": { name: "French Guiana", projects: 0, population: "300K", flag: "gf" },
  "826": { name: "United Kingdom", projects: 1, population: "67M", flag: "gb" },
  "276": { name: "Germany", projects: 5, population: "83M", flag: "de" },
  "250": { name: "France", projects: 1, population: "67M", flag: "fr" },
  "380": { name: "Italy", projects: 2, population: "60M", flag: "it" },
  "724": { name: "Spain", projects: 2, population: "47M", flag: "es" },
  "528": { name: "Netherlands", projects: 1, population: "17M", flag: "nl" },
  "056": { name: "Belgium", projects: 1, population: "12M", flag: "be" },
  "756": { name: "Switzerland", projects: 1, population: "9M", flag: "ch" },
  "040": { name: "Austria", projects: 1, population: "9M", flag: "at" },
  "620": { name: "Portugal", projects: 1, population: "10M", flag: "pt" },
  "300": { name: "Greece", projects: 1, population: "11M", flag: "gr" },
  "372": { name: "Ireland", projects: 1, population: "5M", flag: "ie" },
  "442": { name: "Luxembourg", projects: 0, population: "630K", flag: "lu" },
  "492": { name: "Monaco", projects: 0, population: "39K", flag: "mc" },
  "578": { name: "Norway", projects: 1, population: "5M", flag: "no" },
  "752": { name: "Sweden", projects: 1, population: "10M", flag: "se" },
  "208": { name: "Denmark", projects: 1, population: "6M", flag: "dk" },
  "246": { name: "Finland", projects: 1, population: "6M", flag: "fi" },
  "352": { name: "Iceland", projects: 0, population: "370K", flag: "is" },
  "304": { name: "Greenland", projects: 0, population: "56K", flag: "gl" },
  "616": { name: "Poland", projects: 1, population: "38M", flag: "pl" },
  "203": { name: "Czech Republic", projects: 1, population: "11M", flag: "cz" },
  "348": { name: "Hungary", projects: 1, population: "10M", flag: "hu" },
  "642": { name: "Romania", projects: 0, population: "19M", flag: "ro" },
  "100": { name: "Bulgaria", projects: 0, population: "7M", flag: "bg" },
  "703": { name: "Slovakia", projects: 0, population: "5M", flag: "sk" },
  "705": { name: "Slovenia", projects: 0, population: "2M", flag: "si" },
  "191": { name: "Croatia", projects: 0, population: "4M", flag: "hr" },
  "070": { name: "Bosnia and Herzegovina", projects: 0, population: "3M", flag: "ba" },
  "688": { name: "Serbia", projects: 0, population: "7M", flag: "rs" },
  "499": { name: "Montenegro", projects: 0, population: "620K", flag: "me" },
  "807": { name: "North Macedonia", projects: 0, population: "2M", flag: "mk" },
  "008": { name: "Albania", projects: 0, population: "3M", flag: "al" },
  "498": { name: "Moldova", projects: 0, population: "3M", flag: "md" },
  "804": { name: "Ukraine", projects: 0, population: "44M", flag: "ua" },
  "112": { name: "Belarus", projects: 0, population: "9M", flag: "by" },
  "643": { name: "Russia", projects: 0, population: "144M", flag: "ru" },
  "233": { name: "Estonia", projects: 0, population: "1M", flag: "ee" },
  "428": { name: "Latvia", projects: 0, population: "2M", flag: "lv" },
  "440": { name: "Lithuania", projects: 0, population: "3M", flag: "lt" },
  "784": { name: "United Arab Emirates", projects: 1, population: "10M", flag: "ae" },
  "682": { name: "Saudi Arabia", projects: 0, population: "35M", flag: "sa" },
  "048": { name: "Bahrain", projects: 1, population: "2M", flag: "bh" },
  "634": { name: "Qatar", projects: 0, population: "3M", flag: "qa" },
  "414": { name: "Kuwait", projects: 0, population: "4M", flag: "kw" },
  "512": { name: "Oman", projects: 0, population: "5M", flag: "om" },
  "887": { name: "Yemen", projects: 0, population: "30M", flag: "ye" },
  "368": { name: "Iraq", projects: 0, population: "41M", flag: "iq" },
  "364": { name: "Iran", projects: 0, population: "85M", flag: "ir" },
  "792": { name: "Turkey", projects: 0, population: "85M", flag: "tr" },
  "376": { name: "Israel", projects: 0, population: "9M", flag: "il" },
  "275": { name: "Palestine", projects: 0, population: "5M", flag: "ps" },
  "400": { name: "Jordan", projects: 0, population: "10M", flag: "jo" },
  "422": { name: "Lebanon", projects: 0, population: "7M", flag: "lb" },
  "760": { name: "Syria", projects: 0, population: "18M", flag: "sy" },
  "196": { name: "Cyprus", projects: 0, population: "1M", flag: "cy" },
  "398": { name: "Kazakhstan", projects: 0, population: "19M", flag: "kz" },
  "860": { name: "Uzbekistan", projects: 0, population: "34M", flag: "uz" },
  "762": { name: "Tajikistan", projects: 0, population: "10M", flag: "tj" },
  "417": { name: "Kyrgyzstan", projects: 0, population: "7M", flag: "kg" },
  "795": { name: "Turkmenistan", projects: 0, population: "6M", flag: "tm" },
  "004": { name: "Afghanistan", projects: 0, population: "40M", flag: "af" },
  "586": { name: "Pakistan", projects: 0, population: "225M", flag: "pk" },
  "356": { name: "India", projects: 3, population: "1.4B", flag: "in" },
  "050": { name: "Bangladesh", projects: 0, population: "166M", flag: "bd" },
  "144": { name: "Sri Lanka", projects: 0, population: "22M", flag: "lk" },
  "764": { name: "Thailand", projects: 1, population: "70M", flag: "th" },
  "458": { name: "Malaysia", projects: 1, population: "33M", flag: "my" },
  "608": { name: "Philippines", projects: 1, population: "113M", flag: "ph" },
  "704": { name: "Vietnam", projects: 1, population: "98M", flag: "vn" },
  "702": { name: "Singapore", projects: 1, population: "6M", flag: "sg" },
  "104": { name: "Myanmar", projects: 0, population: "54M", flag: "mm" },
  "116": { name: "Cambodia", projects: 0, population: "17M", flag: "kh" },
  "418": { name: "Laos", projects: 0, population: "7M", flag: "la" },
  "096": { name: "Brunei", projects: 0, population: "440K", flag: "bn" },
  "626": { name: "Timor-Leste", projects: 0, population: "1M", flag: "tl" },
  "036": { name: "Australia", projects: 3, population: "26M", flag: "au" },
  "554": { name: "New Zealand", projects: 1, population: "5M", flag: "nz" },
  "598": { name: "Papua New Guinea", projects: 0, population: "9M", flag: "pg" },
  "242": { name: "Fiji", projects: 0, population: "900K", flag: "fj" },
  "090": { name: "Solomon Islands", projects: 0, population: "700K", flag: "sb" },
  "548": { name: "Vanuatu", projects: 0, population: "310K", flag: "vu" },
  "882": { name: "Samoa", projects: 0, population: "200K", flag: "ws" },
  "776": { name: "Tonga", projects: 0, population: "106K", flag: "to" },
  "818": { name: "Egypt", projects: 1, population: "104M", flag: "eg" },
  "434": { name: "Libya", projects: 0, population: "7M", flag: "ly" },
  "788": { name: "Tunisia", projects: 1, population: "12M", flag: "tn" },
  "012": { name: "Algeria", projects: 0, population: "44M", flag: "dz" },
  "504": { name: "Morocco", projects: 1, population: "37M", flag: "ma" },
  "729": { name: "Sudan", projects: 0, population: "45M", flag: "sd" },
  "728": { name: "South Sudan", projects: 0, population: "11M", flag: "ss" },
  "566": { name: "Nigeria", projects: 1, population: "216M", flag: "ng" },
  "270": { name: "Ghana", projects: 1, population: "32M", flag: "gh" },
  "384": { name: "Côte d'Ivoire", projects: 0, population: "27M", flag: "ci" },
  "466": { name: "Mali", projects: 0, population: "21M", flag: "ml" },
  "854": { name: "Burkina Faso", projects: 0, population: "21M", flag: "bf" },
  "562": { name: "Niger", projects: 0, population: "25M", flag: "ne" },
  "686": { name: "Senegal", projects: 0, population: "17M", flag: "sn" },
  "204": { name: "Benin", projects: 0, population: "12M", flag: "bj" },
  "404": { name: "Kenya", projects: 1, population: "54M", flag: "ke" },
  "834": { name: "Tanzania", projects: 1, population: "62M", flag: "tz" },
  "800": { name: "Uganda", projects: 0, population: "47M", flag: "ug" },
  "231": { name: "Ethiopia", projects: 1, population: "120M", flag: "et" },
  "706": { name: "Somalia", projects: 0, population: "16M", flag: "so" },
  "262": { name: "Djibouti", projects: 0, population: "1M", flag: "dj" },
  "232": { name: "Eritrea", projects: 0, population: "4M", flag: "er" },
  "646": { name: "Rwanda", projects: 0, population: "13M", flag: "rw" },
  "108": { name: "Burundi", projects: 0, population: "12M", flag: "bi" },
  "180": { name: "Democratic Republic of the Congo", projects: 0, population: "92M", flag: "cd" },
  "178": { name: "Republic of the Congo", projects: 0, population: "6M", flag: "cg" },
  "120": { name: "Cameroon", projects: 0, population: "27M", flag: "cm" },
  "140": { name: "Central African Republic", projects: 0, population: "5M", flag: "cf" },
  "148": { name: "Chad", projects: 0, population: "17M", flag: "td" },
  "266": { name: "Gabon", projects: 0, population: "2M", flag: "ga" },
  "226": { name: "Equatorial Guinea", projects: 0, population: "1M", flag: "gq" },
  "710": { name: "South Africa", projects: 2, population: "60M", flag: "za" },
  "072": { name: "Botswana", projects: 0, population: "2M", flag: "bw" },
  "516": { name: "Namibia", projects: 0, population: "3M", flag: "na" },
  "894": { name: "Zambia", projects: 0, population: "19M", flag: "zm" },
  "716": { name: "Zimbabwe", projects: 0, population: "15M", flag: "zw" },
  "454": { name: "Malawi", projects: 0, population: "20M", flag: "mw" },
  "508": { name: "Mozambique", projects: 0, population: "32M", flag: "mz" },
  "024": { name: "Angola", projects: 0, population: "33M", flag: "ao" },
  "748": { name: "Eswatini", projects: 0, population: "1M", flag: "sz" },
  "426": { name: "Lesotho", projects: 0, population: "2M", flag: "ls" },
  "480": { name: "Mauritius", projects: 0, population: "1M", flag: "mu" },
  "690": { name: "Seychelles", projects: 0, population: "99K", flag: "sc" },
  "174": { name: "Comoros", projects: 0, population: "890K", flag: "km" },
  "450": { name: "Madagascar", projects: 0, population: "28M", flag: "mg" },
}

interface Position {
  coordinates: [number, number]
  zoom: number
}

const INITIAL_POSITION: Position = { coordinates: [0, -25], zoom: 0.6 } // Define initial position constant for reset

interface OnCountrySelectParams {
  code: string
  name: string
}

const ScrambleText = memo(function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text)
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const iterationsRef = useRef(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Reset iteration counter
    iterationsRef.current = 0

    // Start scramble animation
    intervalRef.current = setInterval(() => {
      const currentIteration = iterationsRef.current

      if (currentIteration >= text.length) {
        // Animation complete - clear interval and set final text
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
        setDisplayText(text)
        return
      }

      // Generate scrambled text
      const scrambled = text
        .split("")
        .map((char, index) => {
          if (index < currentIteration) {
            return text[index]
          }
          if (char === " ") return " "
          return chars[Math.floor(Math.random() * chars.length)]
        })
        .join("")

      setDisplayText(scrambled)
      iterationsRef.current += 1
    }, 20)

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [text])

  return <span className={className}>{displayText}</span>
})

interface InteractiveMapProps {
  projects: ProjectMapItem[]
  colorMode?: "dark" | "teal"
  onProjectSelect?: (project: ProjectMapItem) => void
  onProjectDeselect?: () => void
  onCountrySelect?: (params: OnCountrySelectParams) => void
  zoomLevel?: number
  highlightedProjects?: string[]
  setVisibleProjectsCount?: (count: number) => void
  onZoomChange?: (zoom: number, visibleCount: number) => void
  isSearching?: boolean
  searchMatchedProjects?: number[]
  hasActiveConversation?: boolean
  selectedFilters?: string[]
  hasActiveSearchFilter?: boolean
}

export default function InteractiveMap({
  projects = [],
  colorMode = "dark",
  onProjectSelect,
  onProjectDeselect,
  onCountrySelect,
  zoomLevel: externalZoomLevel,
  highlightedProjects = [],
  setVisibleProjectsCount,
  onZoomChange,
  isSearching = false,
  searchMatchedProjects = [],
  hasActiveConversation = false,
  selectedFilters = [],
  hasActiveSearchFilter = false,
}: InteractiveMapProps) {
  // Default colorMode changed to 'dark'
  const [mounted, setMounted] = useState(false)
  const selectedCountryRef = useRef<{
    name: string
    population: string
    projects: number
    flag: string
    code: string
  } | null>(null)
  // State to trigger re-renders when selection changes
  const [selectedCountryState, setSelectedCountryState] = useState<typeof selectedCountryRef.current>(null)
  const [selectedCountryTrigger, setSelectedCountryTrigger] = useState(0) // Added for triggering re-render

  const [position, setPosition] = useState<Position>(INITIAL_POSITION)
  const [hoveredProjectData, setHoveredProjectData] = useState<ProjectMapItem | null>(null)
  const [hoveredCountry, setHoveredCountry] = useState<{
    name: string
    population: string
    projects: number
    flag: string
  } | null>(null) // Changed to specific type
  const [filters, setFilters] = useState<Set<string>>(new Set(selectedFilters)) // Use local state for filters
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null) // REMOVED: replaced by activeProject

  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }) // Declare setMousePosition state

  const lastZoomTimeRef = useRef(0)
  const ZOOM_THROTTLE_MS = 300 // Minimum time between zoom changes

  const [showSearchPulse, setShowSearchPulse] = useState(false)
  // State for staggered reveal animation - track which projects have been revealed
  const [revealedProjects, setRevealedProjects] = useState<Set<string>>(new Set())
  const [animatingProjects, setAnimatingProjects] = useState<Set<string>>(new Set())
  const previousSearchFilterRef = useRef<string[]>([])
  const animationTimersRef = useRef<Map<string, NodeJS.Timeout>>(new Map())
  const processedSearchRef = useRef<string>("")
  const lastSearchMatchedRef = useRef<string>("")
  const revealIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const revealQueueRef = useRef<string[]>([])

  useEffect(() => {
    if (isSearching) {
      setShowSearchPulse(true)
    }
  }, [isSearching])

  // Handle search animation
  useEffect(() => {
    const searchKey = JSON.stringify(searchMatchedProjects)

    // Skip if we already processed this exact search
    if (searchKey === lastSearchMatchedRef.current) {
      return
    }

    // Update the ref to track we've seen this
    lastSearchMatchedRef.current = searchKey

    // When searchMatchedProjects changes and we have new results
    if (isSearching && searchMatchedProjects.length > 0) {
      // Mark this search as processed
      processedSearchRef.current = searchKey

      // Sort projects by longitude for left-to-right reveal
      const sortedProjects = [...searchMatchedProjects].sort((a, b) => {
        const projectA = projects.find((p) => p.id === a)
        const projectB = projects.find((p) => p.id === b)
        if (!projectA || !projectB) return 0
        return projectA.coordinates[0] - projectB.coordinates[0]
      })

      // Clear existing animation timers and interval
      animationTimersRef.current.forEach((timer) => clearTimeout(timer))
      animationTimersRef.current.clear()
      if (revealIntervalRef.current) {
        clearInterval(revealIntervalRef.current)
        revealIntervalRef.current = null
      }

      // Reset revealed projects for new search
      setRevealedProjects(new Set())

      revealQueueRef.current = sortedProjects.map(String)

      revealIntervalRef.current = setInterval(() => {
        const nextProject = revealQueueRef.current.shift()

        if (nextProject) {
          setRevealedProjects((prev) => new Set([...prev, nextProject]))
          setAnimatingProjects((prev) => new Set([...prev, nextProject]))

          const animTimer = setTimeout(() => {
            setAnimatingProjects((prev) => {
              const newSet = new Set(prev)
              newSet.delete(nextProject)
              return newSet
            })
            animationTimersRef.current.delete(nextProject)
          }, 3000) // Allow 3 seconds for pulse animation to complete naturally

          animationTimersRef.current.set(nextProject, animTimer)
        } else {
          // Queue is empty, stop interval
          if (revealIntervalRef.current) {
            clearInterval(revealIntervalRef.current)
            revealIntervalRef.current = null
          }
        }
      }, 50) // 50ms between each project for faster but smooth reveal

      // Store current filter as previous for next search (using ref)
      previousSearchFilterRef.current = searchMatchedProjects.map(String)
    } else if (!isSearching && searchMatchedProjects.length === 0 && !hasActiveSearchFilter) {
      // Reset when search is cleared completely
      setRevealedProjects(new Set())
      processedSearchRef.current = ""
    }
  }, [isSearching, hasActiveSearchFilter, searchMatchedProjects]) // Removed searchMatchedProjects.length from dependency array

  useEffect(() => {
    return () => {
      animationTimersRef.current.forEach((timer) => clearTimeout(timer))
      if (revealIntervalRef.current) {
        clearInterval(revealIntervalRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isSearching && showSearchPulse) {
      // Keep pulse for a moment after search completes
      const timer = setTimeout(() => {
        setShowSearchPulse(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isSearching, showSearchPulse])

  const selectCountry = useCallback(
    (country: typeof selectedCountryRef.current) => {
      selectedCountryRef.current = country
      setSelectedCountryState(country)
      setSelectedCountryTrigger((prev) => prev + 1) // Increment trigger to force re-render
      // Call onCountrySelect prop if it exists and a country is selected
      if (country) {
        onCountrySelect?.({ code: country.code, name: country.name }) // Call onCountrySelect
      }
    },
    [onCountrySelect],
  )

  // For easier access, create an alias
  const selectedCountry = selectedCountryState

  useEffect(() => {
    setMounted(true)
  }, [])

  // Initialize filters from prop if provided
  useEffect(() => {
    if (selectedFilters && selectedFilters.length > 0) {
      setFilters(new Set(selectedFilters))
    }
  }, [selectedFilters])

  const updatedProjects = projects.map((project) => ({
    ...project,
    image:
      project.image ||
      `/placeholder.svg?height=120&width=200&query=${encodeURIComponent(project.name + " sustainable architecture")}`,
  }))

  const visibleProjects = updatedProjects.filter((p) => {
    const matchesFilter = filters.size === 0 || filters.has(p.type)
    const isHighlighted = highlightedProjects.length === 0 || highlightedProjects.includes(String(p.id))
    return matchesFilter && isHighlighted
  })

  const currentZoom = position.zoom
  const viewportVisibleProjects = useMemo(() => {
    const zoomFactor = currentZoom
    const centerLon = position.coordinates[0]
    const centerLat = position.coordinates[1]

    const lonRange = 180 / zoomFactor
    const latRange = 90 / zoomFactor

    const minLon = centerLon - lonRange
    const maxLon = centerLon + lonRange
    const minLat = centerLat - latRange
    const maxLat = centerLat + latRange

    return visibleProjects.filter((p) => {
      const [lon, lat] = p.coordinates

      const inLonRange =
        (lon >= minLon && lon <= maxLon) ||
        (lon + 360 >= minLon && lon + 360 <= maxLon) ||
        (lon - 360 >= minLon && lon - 360 <= maxLon)

      const inLatRange = lat >= minLat && lat <= maxLat

      return inLonRange && inLatRange
    })
  }, [visibleProjects, currentZoom, position.coordinates])

  useEffect(() => {
    if (setVisibleProjectsCount) {
      setVisibleProjectsCount(viewportVisibleProjects.length)
    }
    onZoomChange?.(currentZoom, viewportVisibleProjects.length)
  }, [currentZoom, viewportVisibleProjects.length, onZoomChange, setVisibleProjectsCount])

  const toggleFilter = (filterType: string) => {
    setFilters((prev) => {
      const newFilters = new Set(prev)
      if (newFilters.has(filterType)) {
        newFilters.delete(filterType)
      } else {
        newFilters.add(filterType)
      }
      return newFilters
    })
  }

  const clearFilters = () => {
    setFilters(new Set())
  }

  const projectTypes = Array.from(new Set(projects.map((p) => p.type))).sort()

  const handleZoomIn = useCallback(() => {
    const newZoom = Math.min(position.zoom * 1.5, 4)
    setPosition({
      ...position,
      zoom: newZoom,
    })
  }, [position])

  const handleZoomOut = useCallback(() => {
    const newZoom = Math.max(position.zoom / 1.5, 0.4)
    setPosition({
      ...position,
      zoom: newZoom,
    })
  }, [position])

  const handleZoomReset = useCallback(() => {
    setPosition(INITIAL_POSITION)
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 1) {
      e.preventDefault()
      setIsPanning(true)
      setPanStart({ x: e.clientX, y: e.clientY })
    }
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = mapContainerRef.current?.getBoundingClientRect()
      if (rect) {
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }

      if (isPanning) {
        const deltaX = e.clientX - panStart.x
        const deltaY = e.clientY - panStart.y

        const sensitivity = 0.5

        const [lng, lat] = position.coordinates
        const newLng = lng - deltaX * sensitivity
        const newLat = lat + deltaY * sensitivity

        const clampedLat = Math.max(-85, Math.min(85, newLat))

        setPosition((prevPosition) => ({
          ...prevPosition,
          coordinates: [newLng, clampedLat],
        }))

        setPanStart({ x: e.clientX, y: e.clientY })
      }
    },
    [isPanning, panStart, position.coordinates, setPanStart, setPosition, mapContainerRef],
  )

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    if (e.button === 1) {
      setIsPanning(false)
    }
  }, [])

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsPanning(false)
    }

    window.addEventListener("mouseup", handleGlobalMouseUp)
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp)
  }, [])

  const handleMoveEnd = useCallback((newPosition: any) => {
    let [lng, lat] = newPosition.coordinates

    lng = ((lng + 180) % 360) - 180
    if (lng < -180) lng += 360
    if (lng > 180) lng -= 360

    const wrappedPosition = {
      ...newPosition,
      coordinates: [lng, lat],
    }

    setPosition(wrappedPosition)
  }, [])

  const handleProjectClick = useCallback(
    (project: Project) => {
      setSelectedProject(project)
      onProjectSelect?.(project)
    },
    [onProjectSelect],
  )

  const handleCloseProject = useCallback(() => {
    setSelectedProject(null)
    onProjectDeselect?.()
  }, [onProjectDeselect])

  const isProjectVisibleInInstance = useCallback(
    (projectLon: number, offsetAngle: number) => {
      const currentLon = position.coordinates[0]
      const visualLon = projectLon + offsetAngle
      const distance = Math.abs(visualLon - currentLon)
      return distance < 180
    },
    [position.coordinates],
  )

  const MAP_WIDTH = 924

  const displayProject = selectedProject || hoveredProjectData
  const countryToShow = selectedCountryRef.current || hoveredCountry

  const renderMapContent = useCallback(
    (offsetKey: "left" | "center" | "right") => {
      const offsetAngle = offsetKey === "center" ? 0 : offsetKey === "left" ? -360 : 360
      // Convert project ID to string for lookup in revealedProjects and animatingProjects sets
      const isProjectRevealed = (projectId: number) => revealedProjects.has(projectId.toString())

      return (
        <>
          <Geographies geography={geoUrl}>
            {({ geographies }) => {
              return geographies.map((geo) => {
                const countryCode = geo.properties?.ISO_A3 || geo.properties?.ADM0_A3 || geo.id
                const countryName = geo.properties?.NAME || geo.properties?.ADMIN || "Unknown"
                const countryInfo = countryData[countryCode]

                const isSelectedCountry =
                  selectedCountry !== null &&
                  selectedCountry?.code === countryCode &&
                  countryCode !== undefined &&
                  offsetKey === "center"

                // Apply search-radar animation if isSearching is true and project is matched
                const isCountryMatched = isSearching && searchMatchedProjects?.includes(Number(countryCode))

                return (
                  <Geography
                    key={`${offsetKey}-${geo.rsmKey}`}
                    geography={geo}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (countryInfo) {
                        const countryData = {
                          ...countryInfo,
                          code: countryCode,
                        }
                        selectCountry(countryData)
                      }
                    }}
                    onMouseEnter={() => {
                      if (countryInfo && !selectedCountryRef.current) {
                        setHoveredCountry(countryInfo)
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredCountry(null)
                    }}
                    style={{
                      default: {
                        fill: isSelectedCountry
                          ? colorMode === "dark"
                            ? "#0d3d38"
                            : "#134e4a"
                          : colorMode === "dark"
                            ? "#1F1F1F"
                            : "#111827",
                        stroke: isSelectedCountry ? "#14b8a6" : colorMode === "dark" ? "#2A2A2A" : "#1F2937",
                        strokeWidth: isSelectedCountry ? 1.5 : 0.5,
                        outline: "none",
                        transition: "fill 0.3s ease, stroke-width 0.3s ease",
                        animation: isSelectedCountry ? "country-pulse 2s ease-in-out infinite" : "none",
                      },
                      hover: {
                        fill: isSelectedCountry
                          ? colorMode === "dark"
                            ? "#0d3d38"
                            : "#134e4a"
                          : colorMode === "dark"
                            ? "#2a2a2a"
                            : "#1f2937",
                        stroke: "#14b8a6",
                        strokeWidth: isSelectedCountry ? 2 : 0.75,
                        outline: "none",
                        transition: "fill 0.3s ease, stroke-width 0.3s ease",
                        animation: isSelectedCountry ? "country-pulse 2s ease-in-out infinite" : "none",
                      },
                      pressed: {
                        fill: "#14b8a6",
                        stroke: "#14b8a6",
                        strokeWidth: 1.5,
                        outline: "none",
                      },
                    }}
                  />
                )
              })
            }}
          </Geographies>

          {/* Project Markers */}
          {visibleProjects.map((project) => {
            const isSearchMatch = searchMatchedProjects.includes(project.id)
            const isProjectRevealed = revealedProjects.has(project.id.toString()) // Convert to string
            const wasPreviousMatch = previousSearchFilterRef.current.includes(project.id.toString()) // Convert to string
            const isStillAnimating = animatingProjects.has(project.id.toString()) // Convert to string

            // If we're searching and this is a new match, only show if revealed
            const waitingForReveal = isSearching && isSearchMatch && !isProjectRevealed

            // During a search transition, hide projects that:
            // 1. Were not in previous filter (if we had one)
            // 2. Are not in current matches
            // 3. Haven't been revealed yet in the new animation
            const shouldHide =
              hasActiveSearchFilter &&
              searchMatchedProjects.length > 0 &&
              !isSearchMatch &&
              !isProjectRevealed &&
              !wasPreviousMatch

            if (shouldHide || waitingForReveal) return null

            const isVisible = isProjectVisibleInInstance(project.coordinates[0], offsetAngle)

            if (!isVisible && offsetKey !== "center") return null

            const isHovered = hoveredProjectData?.id === project.id
            const isSelected = selectedProject?.id === project.id

            const isActiveMatch = hasActiveSearchFilter && isSearchMatch
            const showPulsingAnimation = isStillAnimating
            const justRevealed = isSearching && isProjectRevealed

            return (
              <Marker
                key={`${offsetKey}-${project.id}`}
                coordinates={project.coordinates}
                onClick={(e) => {
                  if (offsetKey !== "center") return
                  e.stopPropagation()
                  handleProjectClick(project)
                }}
                style={{ cursor: offsetKey === "center" ? "pointer" : "default" }}
              >
                <g transform={`translate(-6, -6) scale(${1 / currentZoom})`}>
                  {/* Outer pulsing ring during reveal */}
                  {showPulsingAnimation && (
                    <motion.circle
                      cx="6"
                      cy="6"
                      r="12"
                      fill="none"
                      stroke="#14b8a6"
                      strokeWidth="1.5"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      exit={{ opacity: 0, scale: 2 }}
                      transition={{
                        duration: 2,
                        repeat: 1, // Only repeat once instead of infinite
                        ease: "easeInOut",
                      }}
                    />
                  )}
                  {/* Second pulsing ring for more depth */}
                  {showPulsingAnimation && (
                    <motion.circle
                      cx="6"
                      cy="6"
                      r="8"
                      fill="none"
                      stroke="#14b8a6"
                      strokeWidth="1"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.4, 0, 0.4],
                      }}
                      exit={{ opacity: 0, scale: 1.8 }}
                      transition={{
                        duration: 2,
                        repeat: 1, // Only repeat once instead of infinite
                        ease: "easeInOut",
                        delay: 0.3,
                      }}
                    />
                  )}
                  {/* Main dot with reveal animation */}
                  <motion.circle
                    cx="6"
                    cy="6"
                    r="4"
                    fill="#14b8a6"
                    stroke={isActiveMatch ? "#14b8a6" : "#0d3d38"}
                    strokeWidth={isActiveMatch ? "2" : "1.5"}
                    initial={justRevealed ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                    animate={{
                      scale: 1,
                      opacity: offsetKey === "center" ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.34, 1.56, 0.64, 1], // Custom spring-like easing
                    }}
                    style={{
                      filter: isActiveMatch ? "drop-shadow(0 0 8px rgba(20, 184, 166, 0.9))" : "none",
                    }}
                  />
                  {/* Inner glow dot for matched projects */}
                  {isActiveMatch && (
                    <motion.circle
                      cx="6"
                      cy="6"
                      r="2"
                      fill="#5eead4"
                      initial={justRevealed ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 0.8 }}
                      animate={{ scale: 1, opacity: 0.8 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    />
                  )}
                </g>
              </Marker>
            )
          })}

          {displayProject && isProjectVisibleInInstance(displayProject.coordinates[0], offsetAngle) && (
            <Marker coordinates={displayProject.coordinates} key={`${offsetKey}-card`}>
              <g
                transform={`scale(${0.55 / currentZoom})`}
                style={{ pointerEvents: "auto" }}
                onClick={(e) => e.stopPropagation()}
              >
                <foreignObject x={20} y={10} width={180} height={200} style={{ overflow: "visible" }}>
                  <div
                    className="relative bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ease-out"
                    style={{ width: "180px" }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCloseProject()
                      }}
                      className="absolute top-1.5 left-1.5 z-50 p-1 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white transition-all backdrop-blur-sm"
                    >
                      <X className="w-3 h-3" />
                    </button>

                    <div className="relative h-20 w-full overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

                      <div className="absolute top-1.5 right-1.5 z-20">
                        <Badge className="bg-[#14b8a6] hover:bg-[#0d9488] text-black font-semibold border-none px-1.5 py-0.5 text-[10px] shadow-lg backdrop-blur-sm bg-opacity-90">
                          {displayProject.type}
                        </Badge>
                      </div>

                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                        {displayProject.image ? (
                          <img
                            src={displayProject.image || "/placeholder.svg"}
                            alt={displayProject.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-gray-600 opacity-50" />
                        )}
                      </div>
                    </div>

                    <div className="p-2 space-y-2">
                      <div>
                        <h3 className="text-xs font-bold text-white mb-0.5 leading-tight line-clamp-1">
                          {displayProject.name}
                        </h3>
                        <p className="text-gray-400 text-[10px] flex items-center gap-1 truncate">
                          {displayProject.location}
                        </p>
                      </div>

                      <Button
                        className="w-full bg-[#14b8a6] hover:bg-[#0d9488] text-black font-semibold h-6 text-[11px] shadow-[0_0_20px_rgba(20,184,166,0.3)] transition-all duration-300 group"
                        onClick={() => {
                          window.open(`/explorer/project/${displayProject.id}`, "_blank")
                        }}
                      >
                        <span>View Project</span>
                        <ExternalLink className="w-3 h-3 ml-1.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                      </Button>
                    </div>
                  </div>
                </foreignObject>
              </g>
            </Marker>
          )}
        </>
      )
    },
    [
      colorMode,
      selectedCountry,
      selectCountry,
      selectedProject,
      displayProject,
      handleProjectClick,
      handleCloseProject,
      currentZoom,
      isProjectVisibleInInstance,
      visibleProjects,
      highlightedProjects,
      hoveredProjectData,
      MAP_WIDTH,
      isSearching,
      searchMatchedProjects,
      revealedProjects,
      hasActiveSearchFilter,
      animatingProjects,
      previousSearchFilterRef, // Added dependency
      // isStillAnimating removed
    ],
  )

  if (!mounted) {
    return (
      <Card className="relative overflow-hidden bg-card border-border">
        <div className="w-full h-[600px] flex items-center justify-center">
          <div className="text-muted-foreground">Loading map...</div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="relative overflow-hidden bg-card border-0">
      <style>{pulseKeyframes}</style>

      <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
        <Button
          size="icon"
          onClick={handleZoomIn}
          disabled={position.zoom >= 4}
          title="Zoom In"
          className="h-10 w-10 rounded-full bg-black/80 border border-white/20 text-white hover:bg-black/90 hover:border-white/40 shadow-lg backdrop-blur-sm transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ZoomIn className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          onClick={handleZoomOut}
          disabled={position.zoom <= 0.4}
          title="Zoom Out"
          className="h-10 w-10 rounded-full bg-black/80 border border-white/20 text-white hover:bg-black/90 hover:border-white/40 shadow-lg backdrop-blur-sm transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ZoomOut className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          onClick={handleZoomReset}
          title="Reset View"
          className="h-10 w-10 rounded-full bg-black/80 border border-white/20 text-white hover:bg-black/90 hover:border-white/40 shadow-lg backdrop-blur-sm transition-all duration-200 active:scale-95"
        >
          <Home className="h-5 w-5" />
        </Button>
      </div>

      <div
        ref={mapContainerRef}
        className="relative w-full h-full bg-black overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={(e) => {
          if (
            !isPanning &&
            (e.target as HTMLElement).tagName !== "circle" &&
            (e.target as HTMLElement).tagName !== "BUTTON"
          ) {
            const isClickOnMapBackground =
              !mapContainerRef.current?.contains(e.target as Node) ||
              (e.target as HTMLElement).tagName === "svg" ||
              (e.target as HTMLElement).tagName === "path" ||
              (e.target as HTMLElement).tagName === "g"

            if (isClickOnMapBackground) {
              setSelectedProject(null)
              onProjectDeselect?.()
              selectCountry(null)
            }
          }
        }}
        style={{ cursor: isPanning ? "grabbing" : "default" }}
      >
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
          <ZoomableGroup
            zoom={currentZoom}
            center={position.coordinates as [number, number]}
            onMoveEnd={handleMoveEnd}
            translateExtent={[
              [-1000, -500],
              [1800, 1000],
            ]}
          >
            <g transform={`translate(${-MAP_WIDTH}, 0)`}>{renderMapContent("left")}</g>
            <g>{renderMapContent("center")}</g>
            <g transform={`translate(${MAP_WIDTH}, 0)`}>{renderMapContent("right")}</g>
          </ZoomableGroup>
        </ComposableMap>

        {/* Search Wave Effect - Advanced organic wave animation */}
        <SearchWaveEffect isActive={showSearchPulse} color="#14b8a6" />

        <AnimatePresence>
          {countryToShow && (
            <motion.div
              key={countryToShow ? `selected-${countryToShow.code}` : `hover-${countryToShow?.name}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-[120px] left-4 z-30"
            >
              <Card className="p-3 bg-black/95 backdrop-blur-md border-primary/50 shadow-2xl">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-6 rounded-md overflow-hidden flex-shrink-0 bg-muted/30 shadow-sm border border-white/10">
                      <img
                        src={`https://flagcdn.com/w80/${countryToShow.flag}.png`}
                        srcSet={`https://flagcdn.com/w160/${countryToShow.flag}.png 2x`}
                        alt={`${countryToShow.name} flag`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-base font-bold text-primary leading-tight font-mono tracking-tight">
                        {countryToShow.name}
                      </div>
                    </div>
                  </div>
                  {selectedCountryRef.current && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-muted-foreground hover:text-foreground"
                      onClick={(e) => {
                        e.stopPropagation()
                        selectCountry(null)
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-foreground">Projects</span>
                    <Badge variant="secondary" className="h-5 px-1.5 text-xs bg-primary/20 text-primary">
                      {countryToShow.projects}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-foreground">Population</span>
                    <span className="text-primary font-mono">{countryToShow.population}</span>
                  </div>
                </div>
                {selectedCountryRef.current && (
                  <Link href={`/explorer/country/${countryToShow.flag}`}>
                    <Button
                      size="sm"
                      className="w-full mt-1 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30"
                    >
                      View projects in {countryToShow.name}
                      <span className="ml-2 flex items-center justify-center w-5 h-5 rounded-full bg-primary/30">
                        <ChevronRight className="h-3 w-3" />
                      </span>
                    </Button>
                  </Link>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- UPDATED CODE START --- */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-end">
          <div className="h-32 w-full bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
        <div className="pointer-events-none absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-20" />
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-20" />
        {/* --- UPDATED CODE END --- */}
      </div>
    </Card>
  )
}
