"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Upload, X, CheckCircle2 } from "lucide-react"

export function SubmitProjectForm() {
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const materials = ["Timber", "Bamboo", "Recycled", "Earth", "Concrete", "Steel", "Glass", "Stone"]

  const toggleMaterial = (material: string) => {
    if (selectedMaterials.includes(material)) {
      setSelectedMaterials(selectedMaterials.filter((m) => m !== material))
    } else {
      setSelectedMaterials([...selectedMaterials, material])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccessModal(true)
  }

  return (
    <>
      <Card className="bg-card">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Project Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Project Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name *</Label>
                  <Input id="project-name" placeholder="Enter project name" required className="bg-background" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="architect">Architect / Designer *</Label>
                  <Input id="architect" placeholder="Enter architect name" required className="bg-background" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input id="location" placeholder="City, Country" required className="bg-background" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Completion Year *</Label>
                  <Input
                    id="year"
                    type="number"
                    placeholder="2024"
                    min="1900"
                    max="2030"
                    required
                    className="bg-background"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your sustainable architecture project, its goals, and key features..."
                  rows={6}
                  required
                  className="bg-background resize-none"
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Project Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="building-type">Building Type *</Label>
                  <Select required>
                    <SelectTrigger id="building-type" className="bg-background">
                      <SelectValue placeholder="Select building type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="mixed-use">Mixed-Use</SelectItem>
                      <SelectItem value="institutional">Institutional</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="climate">Climate Zone *</Label>
                  <Select required>
                    <SelectTrigger id="climate" className="bg-background">
                      <SelectValue placeholder="Select climate zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tropical">Tropical</SelectItem>
                      <SelectItem value="arid">Arid</SelectItem>
                      <SelectItem value="temperate">Temperate</SelectItem>
                      <SelectItem value="continental">Continental</SelectItem>
                      <SelectItem value="polar">Polar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Primary Materials *</Label>
                <div className="flex flex-wrap gap-2">
                  {materials.map((material) => (
                    <Badge
                      key={material}
                      variant={selectedMaterials.includes(material) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary/80 transition-colors"
                      onClick={() => toggleMaterial(material)}
                    >
                      {material}
                      {selectedMaterials.includes(material) && <X className="ml-1 h-3 w-3" />}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">Select all that apply</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="co2-reduction">CO₂ Reduction (%)</Label>
                  <Input
                    id="co2-reduction"
                    type="number"
                    placeholder="85"
                    min="0"
                    max="100"
                    className="bg-background"
                  />
                  <p className="text-xs text-muted-foreground">Compared to conventional buildings</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certifications">Certifications</Label>
                  <Input
                    id="certifications"
                    placeholder="LEED Platinum, Living Building Challenge"
                    className="bg-background"
                  />
                  <p className="text-xs text-muted-foreground">Comma-separated list</p>
                </div>
              </div>
            </div>

            {/* Media Upload */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Project Media</h2>
              </div>

              <div className="space-y-2">
                <Label htmlFor="images">Images *</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-background">
                  <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB (minimum 3 images)</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Project Website</Label>
                <Input id="website" type="url" placeholder="https://example.com" className="bg-background" />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Your Name *</Label>
                  <Input id="contact-name" placeholder="Enter your name" required className="bg-background" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="your@email.com" required className="bg-background" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                Submit Project
              </Button>
              <Button type="button" variant="outline" className="flex-1 bg-transparent">
                Save as Draft
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle className="text-center text-2xl">Project Submitted!</DialogTitle>
            <DialogDescription className="text-center">
              Thank you for contributing to OpenHabitats. Your project will be reviewed by our team and published within
              2-3 business days.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => setShowSuccessModal(false)}>
              Submit Another Project
            </Button>
            <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowSuccessModal(false)}>
              View My Submissions
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
