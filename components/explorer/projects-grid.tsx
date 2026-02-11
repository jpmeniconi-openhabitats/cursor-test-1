"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Leaf, ExternalLink } from "lucide-react"
import type { ProjectGridItem } from "@/types/project"

interface ProjectsGridProps {
  projects: ProjectGridItem[]
}

export function ProjectsGrid({ projects = [] }: ProjectsGridProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectGridItem | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="group cursor-pointer hover:border-primary/50 transition-all duration-300 overflow-hidden"
            onClick={() => setSelectedProject(project)}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3">
                <Badge className="text-white" style={{ backgroundColor: "#008080" }}>
                  {project.co2Saved} CO₂ Saved
                </Badge>
              </div>
            </div>
            <CardContent className="p-5">
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">{project.architect}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span className="line-clamp-1">{project.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{project.year}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">
                  {project.type}
                </Badge>
                {project.materials.slice(0, 2).map((material) => (
                  <Badge key={material} variant="outline" className="text-xs">
                    {material}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                  <img
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Architect</div>
                    <div className="font-medium">{selectedProject.architect}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Location</div>
                    <div className="font-medium">{selectedProject.location}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Year</div>
                    <div className="font-medium">{selectedProject.year}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">CO₂ Reduction</div>
                    <div className="font-medium text-primary flex items-center gap-1" style={{ color: "#008080" }}>
                      <Leaf className="h-4 w-4" />
                      {selectedProject.co2Saved}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">{selectedProject.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Materials</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.materials.map((material) => (
                      <Badge key={material} variant="secondary">
                        {material}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.certifications.map((cert) => (
                      <Badge key={cert} variant="outline" className="border-primary/50">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 text-white hover:opacity-90" style={{ backgroundColor: "#008080" }}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Full Case Study
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Save to Collection
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
