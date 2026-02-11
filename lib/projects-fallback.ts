import type { ProjectMapItem, ProjectGridItem } from "@/types/project"
import fallbackData from "../scripts/seed-data.json"

const typedData = fallbackData as Array<{
  id: number
  name: string
  location: string
  coordinates: [number, number]
  type: string
  zoom: number
  image: string
}>

/** Fallback projects when Supabase is empty or not configured. */
export function getFallbackProjects(): ProjectMapItem[] {
  return typedData.map((p) => ({
    id: p.id,
    name: p.name,
    location: p.location,
    country: p.location,
    coordinates: p.coordinates,
    type: p.type,
    zoom: p.zoom,
    image: p.image.startsWith("/placeholder") ? "/placeholder.svg" : p.image,
  }))
}

/** Fallback for projects grid (same data, with placeholder extra fields). */
export function getFallbackGridProjects(): ProjectGridItem[] {
  return typedData.map((p) => ({
    id: p.id,
    title: p.name,
    architect: "",
    location: p.location,
    year: 0,
    type: p.type,
    materials: [],
    climate: "",
    co2Saved: "",
    image: p.image.startsWith("/placeholder") ? "/placeholder.svg" : p.image,
    description: "",
    certifications: [],
  }))
}
