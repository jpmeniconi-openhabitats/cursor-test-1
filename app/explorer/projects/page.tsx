import { ProjectsGrid } from "@/components/explorer/projects-grid"
import { ProjectFilters } from "@/components/explorer/project-filters"
import { getProjectsForGrid } from "@/app/actions/projects"
import { getFallbackGridProjects } from "@/lib/projects-fallback"

export default async function ProjectsPage() {
  const fetched = await getProjectsForGrid()
  const projects = fetched.length > 0 ? fetched : getFallbackGridProjects()
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">Sustainable Architecture Projects</h1>
          <p className="text-lg text-muted-foreground max-w-3xl text-pretty">
            Explore innovative sustainable buildings from around the world. Filter by region, building type, materials,
            and climate zone.
          </p>
        </div>

        <ProjectFilters />
        <ProjectsGrid projects={projects} />
      </div>
    </main>
  )
}
