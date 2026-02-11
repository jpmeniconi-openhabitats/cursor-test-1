"use server"

import { createServerClient } from "@/lib/supabase/server"
import type { ProjectRow } from "@/types/project"
import {
  mapRowToProject,
  projectToMapItem,
  projectToGridItem,
  type Project,
  type ProjectMapItem,
  type ProjectGridItem,
  type ProjectDetail,
} from "@/types/project"

function mapRows(rows: ProjectRow[]): Project[] {
  return rows.map(mapRowToProject)
}

/** All projects (for map). */
export async function getProjects(): Promise<ProjectMapItem[]> {
  const supabase = createServerClient()
  if (!supabase) return []
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("id", { ascending: true })

  if (error) {
    console.error("getProjects error:", error)
    return []
  }
  const projects = mapRows((data ?? []) as ProjectRow[])
  return projects.map(projectToMapItem)
}

/** Single project by slug (for detail page). */
export async function getProjectBySlug(slug: string): Promise<ProjectDetail | null> {
  const supabase = createServerClient()
  if (!supabase) return null
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error || !data) {
    return null
  }
  return mapRowToProject(data as ProjectRow)
}

/** Single project by id (for detail page when using id in URL). */
export async function getProjectById(id: number): Promise<ProjectDetail | null> {
  const supabase = createServerClient()
  if (!supabase) return null
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !data) {
    return null
  }
  return mapRowToProject(data as ProjectRow)
}

/** Projects by country code (e.g. USA, BRA). */
export async function getProjectsByCountry(countryCode: string): Promise<Project[]> {
  const supabase = createServerClient()
  if (!supabase) return []
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("country_code", countryCode.toUpperCase())
    .order("name", { ascending: true })

  if (error) {
    console.error("getProjectsByCountry error:", error)
    return []
  }
  return mapRows((data ?? []) as ProjectRow[])
}

/** Projects for grid (optionally filter by type). */
export async function getProjectsForGrid(filters?: { type?: string }): Promise<ProjectGridItem[]> {
  const supabase = createServerClient()
  if (!supabase) return []
  let q = supabase.from("projects").select("*").order("id", { ascending: true })
  if (filters?.type) {
    q = q.eq("type", filters.type)
  }
  const { data, error } = await q

  if (error) {
    console.error("getProjectsForGrid error:", error)
    return []
  }
  const projects = mapRows((data ?? []) as ProjectRow[])
  return projects.map(projectToGridItem)
}

/** Unique project types (for filters). */
export async function getProjectTypes(): Promise<string[]> {
  const supabase = createServerClient()
  if (!supabase) return []
  const { data, error } = await supabase
    .from("projects")
    .select("type")

  if (error) {
    return []
  }
  const types = [...new Set((data ?? []).map((r: { type: string }) => r.type).filter(Boolean))]
  return types.sort()
}
