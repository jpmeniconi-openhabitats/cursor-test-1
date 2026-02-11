/**
 * Seed projects table.
 * Run: npx tsx scripts/seed-projects.ts
 * Requires: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY (e.g. from .env.local).
 * Load env first: export $(grep -v '^#' .env.local | xargs) && npx tsx scripts/seed-projects.ts
 */
import { createClient } from "@supabase/supabase-js"
import { readFileSync } from "fs"
import { join } from "path"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Load .env.local first.")
  process.exit(1)
}

interface SeedProject {
  id: number
  name: string
  location: string
  coordinates: [number, number]
  type: string
  zoom: number
  image: string
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

function countryCodeFromLocation(location: string): string {
  const part = location.split(", ").pop() || "XX"
  return part.trim()
}

async function main() {
  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  // Load seed data from JSON (generated from interactive-map data)
  const dataPath = join(__dirname, "seed-data.json")
  let seedProjects: SeedProject[]
  try {
    const raw = readFileSync(dataPath, "utf-8")
    seedProjects = JSON.parse(raw) as SeedProject[]
  } catch (e) {
    console.error("Could not read seed-data.json. Create it from the map projects array.", e)
    process.exit(1)
  }

  const placeholderUrl = `${supabaseUrl}/storage/v1/object/public/assets/placeholder.svg`
  const rows = seedProjects.map((p) => ({
    id: p.id,
    name: p.name,
    slug: slugify(p.name) + "-" + p.id,
    location: p.location,
    country_code: countryCodeFromLocation(p.location),
    latitude: p.coordinates[1],
    longitude: p.coordinates[0],
    type: p.type,
    zoom: p.zoom,
    image_url: p.image.startsWith("/placeholder") ? placeholderUrl : null,
  }))

  const { error } = await supabase.from("projects").insert(rows)

  if (error) {
    console.error("Insert error:", error)
    process.exit(1)
  }
  console.log("Seeded", rows.length, "projects.")
}

main()
