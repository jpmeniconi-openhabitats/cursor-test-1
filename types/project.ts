/**
 * Unified project types for Supabase projects table.
 * DB columns use snake_case; we map to camelCase in app.
 */

export interface ProjectMetadata {
  energyDemand?: { solarGain?: number; heating?: number; cooling?: number }
  buildingEnvelope?: { glazing?: string; windowWallRatio?: string; solarOrientation?: string }
  materialsBreakdown?: Record<string, string>
  carbonSaved?: string
  solarCapacity?: string
  [key: string]: unknown
}

/** Full row from projects table (snake_case as from DB). */
export interface ProjectRow {
  id: number
  name: string
  slug: string
  description: string | null
  architect: string | null
  location: string
  country_code: string
  latitude: number
  longitude: number
  type: string
  year: number | null
  status: string
  materials: string[] | null
  climate: string | null
  co2_saved: string | null
  certifications: string[] | null
  image_url: string | null
  zoom: number
  focus: string | null
  metadata: ProjectMetadata | null
  created_at: string
  updated_at: string
}

/** App-level project with camelCase (full detail). */
export interface Project {
  id: number
  name: string
  slug: string
  description: string | null
  architect: string | null
  location: string
  countryCode: string
  latitude: number
  longitude: number
  type: string
  year: number | null
  status: string
  materials: string[] | null
  climate: string | null
  co2Saved: string | null
  certifications: string[] | null
  imageUrl: string | null
  zoom: number
  focus: string | null
  metadata: ProjectMetadata | null
  createdAt: string
  updatedAt: string
}

/** Subset for map: id, name, location/country, coordinates, type, image. */
export interface ProjectMapItem {
  id: number
  name: string
  location: string
  country: string
  coordinates: [number, number]
  type: string
  zoom: number
  image: string
}

/** Subset for projects grid. */
export interface ProjectGridItem {
  id: number
  title: string
  architect: string
  location: string
  year: number
  type: string
  materials: string[]
  climate: string
  co2Saved: string
  image: string
  description: string
  certifications: string[]
}

/** Full project for detail page (alias + metadata). */
export type ProjectDetail = Project

/** Map DB row to app Project (camelCase). */
export function mapRowToProject(row: ProjectRow): Project {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    architect: row.architect,
    location: row.location,
    countryCode: row.country_code,
    latitude: row.latitude,
    longitude: row.longitude,
    type: row.type,
    year: row.year,
    status: row.status,
    materials: row.materials,
    climate: row.climate,
    co2Saved: row.co2_saved,
    certifications: row.certifications,
    imageUrl: row.image_url,
    zoom: row.zoom,
    focus: row.focus,
    metadata: (row.metadata as ProjectMetadata) ?? null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

/** Map Project to ProjectMapItem (for interactive map). */
export function projectToMapItem(p: Project): ProjectMapItem {
  return {
    id: p.id,
    name: p.name,
    location: p.location,
    country: p.location,
    coordinates: [p.longitude, p.latitude],
    type: p.type,
    zoom: p.zoom,
    image: p.imageUrl ?? "/placeholder.svg",
  }
}

/** Map Project to ProjectGridItem (for projects grid). */
export function projectToGridItem(p: Project): ProjectGridItem {
  return {
    id: p.id,
    title: p.name,
    architect: p.architect ?? "",
    location: p.location,
    year: p.year ?? 0,
    type: p.type,
    materials: p.materials ?? [],
    climate: p.climate ?? "",
    co2Saved: p.co2Saved ?? "",
    image: p.imageUrl ?? "/placeholder.svg",
    description: p.description ?? "",
    certifications: p.certifications ?? [],
  }
}
