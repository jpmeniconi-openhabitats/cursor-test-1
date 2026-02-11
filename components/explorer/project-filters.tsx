"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, SlidersHorizontal, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

const regions = ["North America", "South America", "Europe", "Asia", "Africa", "Oceania"]
const buildingTypes = ["Residential", "Commercial", "Mixed-Use", "Institutional", "Industrial"]
const materials = ["Timber", "Bamboo", "Recycled", "Earth", "Concrete", "Steel"]
const climateZones = ["Tropical", "Arid", "Temperate", "Continental", "Polar"]

export function ProjectFilters() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [selectedClimates, setSelectedClimates] = useState<string[]>([])

  const toggleFilter = (value: string, selected: string[], setter: (val: string[]) => void) => {
    if (selected.includes(value)) {
      setter(selected.filter((item) => item !== value))
    } else {
      setter([...selected, value])
    }
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedRegions([])
    setSelectedTypes([])
    setSelectedMaterials([])
    setSelectedClimates([])
  }

  const activeFiltersCount =
    selectedRegions.length + selectedTypes.length + selectedMaterials.length + selectedClimates.length

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects by name, location, or architect..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card"
          />
        </div>
        <Button variant="outline" className="bg-card">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </Button>
      </div>

      {/* Filter Dropdowns */}
      <div className="flex flex-wrap gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="bg-card">
              Region {selectedRegions.length > 0 && `(${selectedRegions.length})`}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Filter by Region</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {regions.map((region) => (
              <DropdownMenuCheckboxItem
                key={region}
                checked={selectedRegions.includes(region)}
                onCheckedChange={() => toggleFilter(region, selectedRegions, setSelectedRegions)}
              >
                {region}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="bg-card">
              Building Type {selectedTypes.length > 0 && `(${selectedTypes.length})`}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {buildingTypes.map((type) => (
              <DropdownMenuCheckboxItem
                key={type}
                checked={selectedTypes.includes(type)}
                onCheckedChange={() => toggleFilter(type, selectedTypes, setSelectedTypes)}
              >
                {type}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="bg-card">
              Materials {selectedMaterials.length > 0 && `(${selectedMaterials.length})`}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Filter by Materials</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {materials.map((material) => (
              <DropdownMenuCheckboxItem
                key={material}
                checked={selectedMaterials.includes(material)}
                onCheckedChange={() => toggleFilter(material, selectedMaterials, setSelectedMaterials)}
              >
                {material}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="bg-card">
              Climate {selectedClimates.length > 0 && `(${selectedClimates.length})`}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Filter by Climate Zone</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {climateZones.map((climate) => (
              <DropdownMenuCheckboxItem
                key={climate}
                checked={selectedClimates.includes(climate)}
                onCheckedChange={() => toggleFilter(climate, selectedClimates, setSelectedClimates)}
              >
                {climate}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-muted-foreground">
            Clear all
            <X className="ml-2 h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedRegions.map((region) => (
            <Badge key={region} variant="secondary" className="gap-1">
              {region}
              <X
                className="h-3 w-3 cursor-pointer hover:text-foreground"
                onClick={() => toggleFilter(region, selectedRegions, setSelectedRegions)}
              />
            </Badge>
          ))}
          {selectedTypes.map((type) => (
            <Badge key={type} variant="secondary" className="gap-1">
              {type}
              <X
                className="h-3 w-3 cursor-pointer hover:text-foreground"
                onClick={() => toggleFilter(type, selectedTypes, setSelectedTypes)}
              />
            </Badge>
          ))}
          {selectedMaterials.map((material) => (
            <Badge key={material} variant="secondary" className="gap-1">
              {material}
              <X
                className="h-3 w-3 cursor-pointer hover:text-foreground"
                onClick={() => toggleFilter(material, selectedMaterials, setSelectedMaterials)}
              />
            </Badge>
          ))}
          {selectedClimates.map((climate) => (
            <Badge key={climate} variant="secondary" className="gap-1">
              {climate}
              <X
                className="h-3 w-3 cursor-pointer hover:text-foreground"
                onClick={() => toggleFilter(climate, selectedClimates, setSelectedClimates)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
