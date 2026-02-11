"use client"
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { getProjectsByCountry } from "@/app/actions/projects"
import {
  ArrowLeft,
  MapPin,
  Users,
  Globe,
  Calendar,
  Thermometer,
  Building2,
  FileText,
  ExternalLink,
  Landmark,
  Scale,
  Sun,
  CloudRain,
  Mountain,
  TreePine,
  ChevronRight,
  BookOpen,
  Ruler,
  ShieldCheck,
  Home,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


// Comprehensive country data for AEC professionals
interface MinistryLink {
  name: string
  url: string
  description: string
}

interface BuildingRegulation {
  name: string
  description: string
  url?: string
  year?: number
}

interface ClimateZone {
  name: string
  description: string
  avgTemp: string
  precipitation: string
}

interface CountryFullData {
  name: string
  officialName: string
  flag: string // ISO 2-letter code
  capital: string
  population: string
  populationYear: number
  area: string
  founded: string
  government: {
    type: string
    headOfState: string
    headOfStateTitle: string
    headOfGovernment?: string
    headOfGovernmentTitle?: string
  }
  languages: string[]
  currency: string
  timezone: string
  climateOverview: string
  climateZones: ClimateZone[]
  regions: string[]
  history: string
  ministries: MinistryLink[]
  buildingRegulations: BuildingRegulation[]
  thermalStandards: BuildingRegulation[]
  permitProcess: string
  photos: string[]
  projects: Array<{
    id: number
    name: string
    location: string
    type: string
    year: number
    description: string
    image?: string
  }>
}

const COUNTRY_FULL_DATA: Record<string, CountryFullData> = {
  br: {
    name: "Brazil",
    officialName: "Federative Republic of Brazil",
    flag: "br",
    capital: "Brasília",
    population: "214.3 million",
    populationYear: 2023,
    area: "8,515,767 km²",
    founded: "September 7, 1822",
    government: {
      type: "Federal Presidential Constitutional Republic",
      headOfState: "Luiz Inácio Lula da Silva",
      headOfStateTitle: "President",
    },
    languages: ["Portuguese (official)"],
    currency: "Brazilian Real (BRL)",
    timezone: "UTC-2 to UTC-5",
    climateOverview:
      "Brazil has a diverse climate ranging from equatorial in the north to subtropical in the south. The majority of the country experiences tropical conditions with distinct wet and dry seasons.",
    climateZones: [
      {
        name: "Equatorial",
        description: "Amazon region - hot and humid year-round",
        avgTemp: "25-28°C",
        precipitation: "2000-3000mm/year",
      },
      {
        name: "Tropical",
        description: "Central and coastal regions - wet/dry seasons",
        avgTemp: "20-28°C",
        precipitation: "1000-2000mm/year",
      },
      {
        name: "Semi-arid",
        description: "Northeast interior - hot with irregular rainfall",
        avgTemp: "24-28°C",
        precipitation: "400-800mm/year",
      },
      {
        name: "Subtropical",
        description: "Southern states - four distinct seasons",
        avgTemp: "14-22°C",
        precipitation: "1200-2000mm/year",
      },
    ],
    regions: ["North (Amazon)", "Northeast", "Central-West", "Southeast", "South"],
    history:
      "Brazil is the largest country in South America and the fifth largest in the world. Originally inhabited by indigenous peoples, it was colonized by Portugal starting in 1500. Brazil declared independence in 1822 under Emperor Pedro I, becoming a republic in 1889. The country has undergone significant modernization, including the construction of its planned capital Brasília (1960), designed by Oscar Niemeyer and Lúcio Costa, which is now a UNESCO World Heritage Site and a masterpiece of modernist architecture.",
    ministries: [
      {
        name: "Ministry of Cities (Ministério das Cidades)",
        url: "https://www.gov.br/cidades/",
        description: "Urban development, housing, and sanitation policies",
      },
      {
        name: "Ministry of Environment (MMA)",
        url: "https://www.gov.br/mma/",
        description: "Environmental regulations and sustainability",
      },
      {
        name: "CAIXA Econômica Federal",
        url: "https://www.caixa.gov.br/",
        description: "Federal housing financing and programs",
      },
      { name: "IBAMA", url: "https://www.ibama.gov.br/", description: "Environmental licensing and permits" },
      {
        name: "INMETRO",
        url: "https://www.gov.br/inmetro/",
        description: "Standards and building materials certification",
      },
    ],
    buildingRegulations: [
      {
        name: "NBR 15575",
        description:
          "Building Performance Standard - defines minimum requirements for residential buildings including thermal, acoustic, and structural performance",
        year: 2013,
        url: "https://www.abnt.org.br/",
      },
      {
        name: "NBR 15220",
        description: "Thermal Performance in Buildings - establishes bioclimatic zoning and construction guidelines",
        year: 2005,
      },
      {
        name: "Código de Obras Municipal",
        description: "Each municipality has its own building code regulating construction parameters",
        year: 0,
      },
      {
        name: "NBR 9050",
        description: "Accessibility Standard - requirements for accessible design in buildings and urban spaces",
        year: 2020,
      },
    ],
    thermalStandards: [
      {
        name: "NBR 15220-3",
        description: "Bioclimatic Zoning - divides Brazil into 8 zones with specific thermal design recommendations",
      },
      {
        name: "RTQ-R",
        description: "Technical Regulation for Energy Efficiency in Residential Buildings (Procel Edifica)",
      },
      { name: "RTQ-C", description: "Technical Regulation for Energy Efficiency in Commercial Buildings" },
      { name: "Selo Casa Azul", description: "CAIXA's green building certification for sustainable housing" },
    ],
    permitProcess:
      "Building permits in Brazil are obtained through municipal prefecturas (city halls). The process typically involves: 1) Preliminary consultation with urban planning department, 2) Environmental licensing (if required), 3) Architectural project approval, 4) Fire department approval (Corpo de Bombeiros), 5) Alvará de Construção issuance. Timeframes vary significantly by municipality, from 30 days to 6+ months.",
    photos: [
      "/brasilia-cathedral-oscar-niemeyer-architecture.jpg",
      "/rio-de-janeiro-favela-urban-development.jpg",
      "/amazon-sustainable-housing-wooden-architecture.jpg",
      "/sao-paulo-modern-sustainable-building.jpg",
    ],
    projects: [
      {
        id: 1,
        name: "Amazon Sustainable Housing Initiative",
        location: "Manaus, Amazonas",
        type: "Residential",
        year: 2023,
        description:
          "Eco-friendly homes built with locally sourced materials, featuring solar panels and rainwater harvesting systems adapted to the Amazon climate.",
      },
      {
        id: 2,
        name: "Curitiba Green Transit Hub",
        location: "Curitiba, Paraná",
        type: "Infrastructure",
        year: 2022,
        description:
          "Zero-emission bus terminal with integrated bike lanes and green roofs, serving 50,000 daily commuters in one of Brazil's most sustainable cities.",
      },
      {
        id: 3,
        name: "São Paulo Urban Farm Complex",
        location: "São Paulo",
        type: "Agricultural",
        year: 2024,
        description:
          "Vertical farming facility producing organic vegetables for local communities using hydroponic systems and renewable energy.",
      },
      {
        id: 4,
        name: "Brasília Sustainable Government Building",
        location: "Brasília",
        type: "Commercial",
        year: 2023,
        description:
          "LEED Platinum certified office building incorporating passive cooling strategies suited to the cerrado climate.",
      },
    ],
  },
  us: {
    name: "United States",
    officialName: "United States of America",
    flag: "us",
    capital: "Washington, D.C.",
    population: "331.9 million",
    populationYear: 2023,
    area: "9,833,517 km²",
    founded: "July 4, 1776",
    government: {
      type: "Federal Presidential Constitutional Republic",
      headOfState: "Joe Biden",
      headOfStateTitle: "President",
    },
    languages: ["English (de facto)", "Spanish (widely spoken)"],
    currency: "US Dollar (USD)",
    timezone: "UTC-4 to UTC-10",
    climateOverview:
      "The United States spans multiple climate zones from arctic conditions in Alaska to tropical climates in Hawaii and Florida. The continental US experiences temperate, arid, and subtropical conditions.",
    climateZones: [
      {
        name: "Continental",
        description: "Midwest and Northeast - cold winters, warm summers",
        avgTemp: "-5 to 25°C",
        precipitation: "750-1250mm/year",
      },
      {
        name: "Subtropical",
        description: "Southeast - mild winters, hot humid summers",
        avgTemp: "10-28°C",
        precipitation: "1200-1500mm/year",
      },
      {
        name: "Arid/Semi-arid",
        description: "Southwest - hot, dry conditions",
        avgTemp: "5-35°C",
        precipitation: "250-500mm/year",
      },
      {
        name: "Mediterranean",
        description: "California coast - dry summers, mild wet winters",
        avgTemp: "10-25°C",
        precipitation: "300-750mm/year",
      },
      {
        name: "Marine",
        description: "Pacific Northwest - mild, wet year-round",
        avgTemp: "5-20°C",
        precipitation: "1500-3000mm/year",
      },
    ],
    regions: ["Northeast", "Southeast", "Midwest", "Southwest", "West Coast", "Alaska", "Hawaii"],
    history:
      "The United States declared independence from Britain in 1776 and has grown to become one of the world's largest economies. American architecture has evolved from colonial styles through various movements including the Chicago School, Prairie Style (Frank Lloyd Wright), Mid-Century Modern, and contemporary sustainable design. The country has been at the forefront of green building certification with LEED and other standards.",
    ministries: [
      {
        name: "U.S. Department of Housing and Urban Development (HUD)",
        url: "https://www.hud.gov/",
        description: "Federal housing policy and programs",
      },
      {
        name: "U.S. Environmental Protection Agency (EPA)",
        url: "https://www.epa.gov/",
        description: "Environmental regulations and sustainability",
      },
      {
        name: "U.S. Department of Energy",
        url: "https://www.energy.gov/",
        description: "Energy efficiency standards and programs",
      },
      {
        name: "International Code Council (ICC)",
        url: "https://www.iccsafe.org/",
        description: "Model building codes development",
      },
      { name: "USGBC (LEED)", url: "https://www.usgbc.org/", description: "Green building certification" },
    ],
    buildingRegulations: [
      {
        name: "International Building Code (IBC)",
        description: "Model building code adopted by most US jurisdictions with local amendments",
        year: 2021,
        url: "https://www.iccsafe.org/",
      },
      {
        name: "International Residential Code (IRC)",
        description: "Prescriptive code for one- and two-family dwellings",
        year: 2021,
      },
      { name: "NFPA 101 Life Safety Code", description: "Fire protection and life safety requirements", year: 2021 },
      {
        name: "ADA Standards",
        description: "Americans with Disabilities Act accessibility requirements",
        year: 2010,
        url: "https://www.ada.gov/",
      },
    ],
    thermalStandards: [
      {
        name: "IECC",
        description: "International Energy Conservation Code - sets minimum energy efficiency requirements",
        url: "https://www.iccsafe.org/",
      },
      {
        name: "ASHRAE 90.1",
        description: "Energy Standard for Buildings Except Low-Rise Residential",
        url: "https://www.ashrae.org/",
      },
      {
        name: "ENERGY STAR",
        description: "EPA program for energy-efficient buildings and products",
        url: "https://www.energystar.gov/",
      },
      {
        name: "Passive House US",
        description: "High-performance building standard for ultra-low energy buildings",
        url: "https://www.phius.org/",
      },
    ],
    permitProcess:
      "Building permits are issued at the local level (city or county). The typical process involves: 1) Pre-application meeting (recommended), 2) Submit plans and permit application, 3) Plan review by building, fire, and planning departments, 4) Permit issuance, 5) Inspections during construction, 6) Certificate of Occupancy. Timelines vary from 2 weeks for simple projects to several months for complex developments.",
    photos: [
      "/new-york-city-sustainable-skyscraper-green-buildin.jpg",
      "/california-modern-sustainable-home-solar-panels.jpg",
      "/seattle-green-urban-development.jpg",
      "/denver-colorado-leed-building.jpg",
    ],
    projects: [
      {
        id: 1,
        name: "Denver Solar Hub",
        location: "Denver, USA",
        type: "Solar",
        year: 2022,
        description: "Urban solar installation powering 500 homes with integrated battery storage.",
      },
      {
        id: 2,
        name: "Portland Net-Zero Community",
        location: "Portland, Oregon",
        type: "Residential",
        year: 2023,
        description: "50-unit housing development achieving net-zero energy through passive design and renewables.",
      },
      {
        id: 3,
        name: "Austin Water Recycling Center",
        location: "Austin, Texas",
        type: "Infrastructure",
        year: 2024,
        description: "Municipal facility treating and recycling 100% of wastewater for irrigation and industrial use.",
      },
    ],
  },
  cl: {
    name: "Chile",
    officialName: "Republic of Chile",
    flag: "cl",
    capital: "Santiago",
    population: "19.5 million",
    populationYear: 2023,
    area: "756,102 km²",
    founded: "September 18, 1810",
    government: {
      type: "Unitary Presidential Constitutional Republic",
      headOfState: "Gabriel Boric",
      headOfStateTitle: "President",
    },
    languages: ["Spanish (official)"],
    currency: "Chilean Peso (CLP)",
    timezone: "UTC-3 / UTC-4",
    climateOverview:
      "Chile's extreme length (4,300 km) creates one of the world's most diverse climate ranges, from the driest desert (Atacama) to glacial regions in Patagonia. This diversity requires region-specific architectural solutions.",
    climateZones: [
      {
        name: "Desert",
        description: "Norte Grande - extremely arid, high solar radiation",
        avgTemp: "15-25°C",
        precipitation: "<50mm/year",
      },
      {
        name: "Semi-arid",
        description: "Norte Chico - dry with occasional rain",
        avgTemp: "12-22°C",
        precipitation: "100-300mm/year",
      },
      {
        name: "Mediterranean",
        description: "Central Chile - dry summers, wet winters",
        avgTemp: "8-22°C",
        precipitation: "300-700mm/year",
      },
      {
        name: "Oceanic",
        description: "Southern Chile - cool, rainy year-round",
        avgTemp: "5-15°C",
        precipitation: "1500-3000mm/year",
      },
      {
        name: "Tundra",
        description: "Patagonia/Antarctic - cold, harsh conditions",
        avgTemp: "-5 to 10°C",
        precipitation: "500-1000mm/year",
      },
    ],
    regions: ["Norte Grande", "Norte Chico", "Zona Central", "Zona Sur", "Zona Austral"],
    history:
      "Chile gained independence from Spain in 1818. The country is known for its strong seismic activity, being located on the Pacific Ring of Fire, which has driven innovation in earthquake-resistant construction. Chilean architecture blends indigenous Mapuche traditions with Spanish colonial heritage and modern sustainable practices. The country is a leader in Latin American renewable energy adoption.",
    ministries: [
      {
        name: "Ministerio de Vivienda y Urbanismo (MINVU)",
        url: "https://www.minvu.gob.cl/",
        description: "Housing policy, urban planning, and building regulations",
      },
      {
        name: "Ministerio de Obras Públicas (MOP)",
        url: "https://www.mop.gob.cl/",
        description: "Public infrastructure and construction",
      },
      {
        name: "Ministerio del Medio Ambiente",
        url: "https://mma.gob.cl/",
        description: "Environmental policy and sustainability",
      },
      {
        name: "Ministerio de Energía",
        url: "https://www.energia.gob.cl/",
        description: "Energy efficiency and renewable energy programs",
      },
      {
        name: "Instituto Nacional de Normalización (INN)",
        url: "https://www.inn.cl/",
        description: "Chilean standards organization (NCh)",
      },
    ],
    buildingRegulations: [
      {
        name: "Ordenanza General de Urbanismo y Construcciones (OGUC)",
        description: "General Urban Planning and Construction Ordinance - comprehensive building regulations",
        year: 2023,
        url: "https://www.minvu.gob.cl/",
      },
      {
        name: "NCh 433",
        description: "Seismic Design of Buildings - earthquake-resistant construction requirements",
        year: 2009,
      },
      {
        name: "NCh 1079",
        description: "Architecture and Construction - Climatic Zoning for Building Design",
        year: 2019,
      },
      { name: "NCh 853", description: "Thermal Conditioning - thermal insulation requirements", year: 2007 },
    ],
    thermalStandards: [
      {
        name: "Reglamentación Térmica (Art. 4.1.10 OGUC)",
        description: "Mandatory thermal insulation requirements by climatic zone",
        url: "https://www.minvu.gob.cl/",
      },
      {
        name: "Calificación Energética de Viviendas (CEV)",
        description: "Residential Energy Rating system - mandatory for new homes",
      },
      {
        name: "Certificación de Edificio Sustentable (CES)",
        description: "Sustainable Building Certification for public buildings",
      },
      {
        name: "Estándares de Construcción Sustentable",
        description: "MINVU sustainable construction standards and guidelines",
      },
    ],
    permitProcess:
      "Building permits are obtained through municipal Direcciones de Obras (DOM). Process: 1) Consult local Plan Regulador Comunal, 2) Submit Permiso de Edificación with architectural plans signed by certified architect, 3) Review by DOM (30-90 days), 4) Pay municipal rights, 5) Receive permit. Seismic calculations must be certified by a structural engineer. Environmental impact studies required for large projects.",
    photos: [
      "/santiago-chile-modern-sustainable-architecture.jpg",
      "/atacama-desert-solar-energy-installation.jpg",
      "/patagonia-chile-eco-lodge-sustainable.jpg",
      "/valparaiso-colorful-hillside-architecture.jpg",
    ],
    projects: [
      {
        id: 1,
        name: "Sustainable Housing Chile",
        location: "Santiago",
        type: "Residential",
        year: 2023,
        description: "Social housing project incorporating passive solar design and local materials.",
      },
      {
        id: 2,
        name: "Atacama Solar Complex",
        location: "Atacama Desert",
        type: "Energy",
        year: 2022,
        description: "Large-scale solar installation providing clean energy to northern mining regions.",
      },
    ],
  },
  de: {
    name: "Germany",
    officialName: "Federal Republic of Germany",
    flag: "de",
    capital: "Berlin",
    population: "84.4 million",
    populationYear: 2023,
    area: "357,386 km²",
    founded: "1871 (unified), 1990 (reunified)",
    government: {
      type: "Federal Parliamentary Republic",
      headOfState: "Frank-Walter Steinmeier",
      headOfStateTitle: "President",
      headOfGovernment: "Olaf Scholz",
      headOfGovernmentTitle: "Chancellor",
    },
    languages: ["German (official)"],
    currency: "Euro (EUR)",
    timezone: "UTC+1 / UTC+2 (DST)",
    climateOverview:
      "Germany has a temperate seasonal climate with moderate to heavy rainfall. The country is a global leader in energy-efficient building standards, particularly the Passivhaus concept which originated here.",
    climateZones: [
      {
        name: "Maritime",
        description: "Northwest - mild, humid, cloudy",
        avgTemp: "2-18°C",
        precipitation: "700-900mm/year",
      },
      {
        name: "Continental",
        description: "East and South - colder winters, warmer summers",
        avgTemp: "-2 to 20°C",
        precipitation: "500-800mm/year",
      },
      {
        name: "Alpine",
        description: "Bavarian Alps - cold winters, cool summers, high precipitation",
        avgTemp: "-5 to 15°C",
        precipitation: "1500-2000mm/year",
      },
    ],
    regions: ["Northern Germany", "Western Germany", "Eastern Germany", "Southern Germany", "Bavaria", "Alps"],
    history:
      "Germany has been at the forefront of sustainable architecture and building technology. The Passivhaus standard was developed in Darmstadt in 1991 and has become a global benchmark for energy efficiency. The Bauhaus movement (1919-1933) revolutionized modern architecture and design. Following reunification in 1990, Germany has undertaken extensive sustainable urban renewal projects.",
    ministries: [
      {
        name: "Federal Ministry for Housing, Urban Development and Building",
        url: "https://www.bmwsb.bund.de/",
        description: "National housing and construction policy",
      },
      {
        name: "German Institute for Standardization (DIN)",
        url: "https://www.din.de/",
        description: "German standards organization",
      },
      {
        name: "Federal Ministry for Economic Affairs and Climate Action",
        url: "https://www.bmwk.de/",
        description: "Energy policy and building energy standards",
      },
      {
        name: "German Sustainable Building Council (DGNB)",
        url: "https://www.dgnb.de/",
        description: "Sustainable building certification",
      },
      {
        name: "Passivhaus Institut",
        url: "https://passivehouse.com/",
        description: "Passive house standards and certification",
      },
    ],
    buildingRegulations: [
      {
        name: "Musterbauordnung (MBO)",
        description: "Model Building Code - template for state building codes",
        year: 2023,
      },
      {
        name: "Landesbauordnungen",
        description: "State Building Codes - each of 16 states has its own version",
        year: 2023,
      },
      { name: "DIN 18040", description: "Barrier-free Construction - accessibility standards", year: 2010 },
      {
        name: "DIN 4108",
        description: "Thermal Protection in Buildings - thermal insulation requirements",
        year: 2020,
      },
    ],
    thermalStandards: [
      {
        name: "Gebäudeenergiegesetz (GEG)",
        description: "Building Energy Act - primary energy requirements for new buildings",
        year: 2020,
        url: "https://www.gesetze-im-internet.de/geg/",
      },
      {
        name: "Passivhaus Standard",
        description: "Ultra-low energy building standard (<15 kWh/m²a heating)",
        url: "https://passivehouse.com/",
      },
      {
        name: "KfW Efficiency House Standards",
        description: "Subsidized energy efficiency levels (KfW 40, 55, 70)",
        url: "https://www.kfw.de/",
      },
      {
        name: "EnEV (legacy)",
        description: "Energy Saving Ordinance - superseded by GEG but still referenced",
        year: 2014,
      },
    ],
    permitProcess:
      "Building permits (Baugenehmigung) are issued by local building authorities (Bauamt). Process: 1) Pre-consultation (Bauvoranfrage), 2) Submit Bauantrag with plans by certified architect/engineer, 3) Review period (1-3 months), 4) Permit issuance, 5) Construction inspections, 6) Final acceptance (Bauabnahme). Energy certificates (Energieausweis) required for all buildings.",
    photos: [
      "/berlin-modern-sustainable-architecture.jpg",
      "/german-passivhaus-residential-building.jpg",
      "/hamburg-hafencity-sustainable-urban-development.jpg",
      "/placeholder.svg?height=400&width=600",
    ],
    projects: [
      {
        id: 1,
        name: "Hamburg HafenCity",
        location: "Hamburg",
        type: "Urban Development",
        year: 2023,
        description: "Europe's largest inner-city development with ambitious sustainability targets.",
      },
      {
        id: 2,
        name: "Berlin Passivhaus District",
        location: "Berlin",
        type: "Residential",
        year: 2022,
        description: "Large-scale passive house development demonstrating scalability of the standard.",
      },
    ],
  },
  au: {
    name: "Australia",
    officialName: "Commonwealth of Australia",
    flag: "au",
    capital: "Canberra",
    population: "26.0 million",
    populationYear: 2023,
    area: "7,692,024 km²",
    founded: "January 1, 1901",
    government: {
      type: "Federal Parliamentary Constitutional Monarchy",
      headOfState: "King Charles III",
      headOfStateTitle: "Monarch",
      headOfGovernment: "Anthony Albanese",
      headOfGovernmentTitle: "Prime Minister",
    },
    languages: ["English (de facto official)"],
    currency: "Australian Dollar (AUD)",
    timezone: "UTC+8 to UTC+11",
    climateOverview:
      "Australia experiences diverse climates from tropical in the north to temperate in the south. The continent faces unique challenges including extreme heat, bushfire risk, and water scarcity, driving innovation in climate-responsive design.",
    climateZones: [
      {
        name: "Tropical",
        description: "Northern Australia - hot, humid, monsoon rains",
        avgTemp: "25-32°C",
        precipitation: "1500-2500mm/year",
      },
      {
        name: "Arid/Semi-arid",
        description: "Central Australia - hot days, cool nights, minimal rain",
        avgTemp: "15-35°C",
        precipitation: "<250mm/year",
      },
      {
        name: "Subtropical",
        description: "Queensland coast - warm, humid summers",
        avgTemp: "15-28°C",
        precipitation: "1000-1500mm/year",
      },
      {
        name: "Temperate",
        description: "Southeast - four seasons, moderate rainfall",
        avgTemp: "8-25°C",
        precipitation: "500-1000mm/year",
      },
      {
        name: "Mediterranean",
        description: "Southwest WA, SA - dry summers, wet winters",
        avgTemp: "10-25°C",
        precipitation: "400-800mm/year",
      },
    ],
    regions: [
      "New South Wales",
      "Victoria",
      "Queensland",
      "Western Australia",
      "South Australia",
      "Tasmania",
      "Northern Territory",
      "ACT",
    ],
    history:
      "Australia's architecture has evolved from Indigenous building traditions through colonial adaptation to contemporary climate-responsive design. The country has developed world-leading standards for energy efficiency (NatHERS) and sustainable building. Australian architects are renowned for their innovative responses to extreme climate conditions.",
    ministries: [
      {
        name: "Department of Climate Change, Energy, Environment and Water",
        url: "https://www.dcceew.gov.au/",
        description: "National environmental and energy policy",
      },
      {
        name: "Australian Building Codes Board (ABCB)",
        url: "https://www.abcb.gov.au/",
        description: "National Construction Code development",
      },
      { name: "NatHERS", url: "https://www.nathers.gov.au/", description: "Nationwide House Energy Rating Scheme" },
      {
        name: "Green Building Council of Australia",
        url: "https://new.gbca.org.au/",
        description: "Green Star certification",
      },
      {
        name: "State Planning Departments",
        url: "https://www.planning.nsw.gov.au/",
        description: "State-level planning and building approval",
      },
    ],
    buildingRegulations: [
      {
        name: "National Construction Code (NCC)",
        description: "Australia's primary building code covering all aspects of construction",
        year: 2022,
        url: "https://www.abcb.gov.au/",
      },
      {
        name: "Building Code of Australia (BCA)",
        description: "Volume 1 (commercial) and Volume 2 (residential) within NCC",
        year: 2022,
      },
      {
        name: "AS 1170",
        description: "Structural Design Actions - including wind, earthquake, and fire loads",
        year: 2021,
      },
      {
        name: "Disability Access Standards",
        description: "Access to Premises Standards under Disability Discrimination Act",
        year: 2010,
      },
    ],
    thermalStandards: [
      { name: "NCC Section J", description: "Energy Efficiency requirements for commercial buildings" },
      {
        name: "NatHERS",
        description: "6-star minimum rating for new homes (10-star scale)",
        url: "https://www.nathers.gov.au/",
      },
      { name: "BASIX (NSW)", description: "Building Sustainability Index - water and energy targets" },
      { name: "Green Star", description: "Voluntary green building rating system", url: "https://new.gbca.org.au/" },
    ],
    permitProcess:
      "Building approvals are managed at state/territory level through local councils or private certifiers. Process: 1) Development Application (DA) for planning approval, 2) Construction Certificate (CC) for building approval, 3) Critical stage inspections, 4) Occupation Certificate (OC). NatHERS assessment required for new residential buildings. Bushfire Attack Level (BAL) assessment required in bushfire-prone areas.",
    photos: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    projects: [
      {
        id: 1,
        name: "Melbourne Urban Forest",
        location: "Melbourne",
        type: "Urban",
        year: 2023,
        description: "City-wide initiative to double tree canopy cover and reduce urban heat island effect.",
      },
      {
        id: 2,
        name: "Sydney Net-Zero Precinct",
        location: "Sydney",
        type: "Mixed-Use",
        year: 2024,
        description: "Large-scale development targeting net-zero carbon in operations.",
      },
    ],
  },
  ng: {
    name: "Nigeria",
    officialName: "Federal Republic of Nigeria",
    flag: "ng",
    capital: "Abuja",
    population: "223.8 million",
    populationYear: 2023,
    area: "923,769 km²",
    founded: "October 1, 1960",
    government: {
      type: "Federal Presidential Republic",
      headOfState: "Bola Tinubu",
      headOfStateTitle: "President",
    },
    languages: ["English (official)", "Hausa", "Yoruba", "Igbo"],
    currency: "Nigerian Naira (NGN)",
    timezone: "UTC+1",
    climateOverview:
      "Nigeria has a tropical climate with two distinct seasons: wet (April-October) and dry (November-March). The climate varies from equatorial in the south to tropical savanna in the middle belt and semi-arid in the north.",
    climateZones: [
      {
        name: "Tropical Rainforest",
        description: "Southern coastal regions - high humidity year-round",
        avgTemp: "25-28°C",
        precipitation: "2000-4000mm/year",
      },
      {
        name: "Tropical Savanna",
        description: "Middle Belt - distinct wet and dry seasons",
        avgTemp: "22-32°C",
        precipitation: "1000-1500mm/year",
      },
      {
        name: "Sahel",
        description: "Northern regions - hot, semi-arid conditions",
        avgTemp: "20-40°C",
        precipitation: "500-1000mm/year",
      },
      {
        name: "Montane",
        description: "Jos Plateau - cooler highland climate",
        avgTemp: "18-25°C",
        precipitation: "1200-1500mm/year",
      },
    ],
    regions: ["North Central", "North East", "North West", "South East", "South South", "South West"],
    history:
      "Nigeria gained independence from Britain in 1960. It is Africa's most populous nation and largest economy. Nigerian architecture blends traditional building techniques from diverse ethnic groups (Hausa, Yoruba, Igbo) with colonial influences and contemporary sustainable practices. The country faces unique challenges in rapid urbanization, particularly in Lagos, driving innovation in affordable and climate-responsive housing.",
    ministries: [
      {
        name: "Federal Ministry of Housing and Urban Development",
        url: "https://www.fmhud.gov.ng/",
        description: "National housing policy and urban planning",
      },
      {
        name: "Federal Ministry of Works",
        url: "https://www.works.gov.ng/",
        description: "Public infrastructure and construction standards",
      },
      {
        name: "Federal Ministry of Environment",
        url: "https://environment.gov.ng/",
        description: "Environmental regulations and sustainability",
      },
      {
        name: "Standards Organisation of Nigeria (SON)",
        url: "https://www.son.gov.ng/",
        description: "National standards for building materials and construction",
      },
      {
        name: "Nigerian Institute of Architects (NIA)",
        url: "https://nia.ng/",
        description: "Professional body regulating architectural practice",
      },
    ],
    buildingRegulations: [
      {
        name: "National Building Code (NBC)",
        description: "Comprehensive building regulations covering design, construction, and safety standards",
        year: 2006,
        url: "https://www.fmhud.gov.ng/",
      },
      {
        name: "Urban and Regional Planning Law",
        description: "Federal and state planning regulations for land use and development control",
        year: 1992,
      },
      {
        name: "SON Building Materials Standards",
        description: "Quality standards for cement, steel, and other construction materials",
        year: 2020,
      },
      {
        name: "Fire Safety Regulations",
        description: "Requirements for fire prevention and life safety in buildings",
        year: 2015,
      },
    ],
    thermalStandards: [
      {
        name: "NBC Thermal Comfort Guidelines",
        description: "Recommendations for passive cooling and ventilation in tropical buildings",
      },
      {
        name: "EDGE Certification",
        description: "IFC's Excellence in Design for Greater Efficiencies - popular green building standard",
        url: "https://www.edgebuildings.com/",
      },
      {
        name: "Nigerian Green Building Council Standards",
        description: "Local green building certification and guidelines",
      },
      {
        name: "ECO-NERGY Guidelines",
        description: "Energy efficiency recommendations for commercial buildings",
      },
    ],
    permitProcess:
      "Building permits are obtained through state Development Control agencies. Process: 1) Land title verification and Certificate of Occupancy (C of O), 2) Architectural drawings approval by state planning authority, 3) Environmental Impact Assessment (for large projects), 4) Building permit application with structural calculations, 5) Construction supervision and inspections. Timeframes vary significantly between states, from 2 weeks to several months.",
    photos: [
      "/lagos-nigeria-modern-architecture-skyline.jpg",
      "/abuja-nigeria-sustainable-building.jpg",
      "/traditional-nigerian-architecture.jpg",
      "/nigeria-green-building-eco-housing.jpg",
    ],
    projects: [
      {
        id: 1,
        name: "Eko Atlantic City",
        location: "Lagos",
        type: "Urban Development",
        year: 2024,
        description:
          "Ambitious coastal city development on reclaimed land with sustainable infrastructure and flood defenses.",
      },
      {
        id: 2,
        name: "Abuja Solar Housing Project",
        location: "Abuja",
        type: "Residential",
        year: 2023,
        description:
          "Affordable housing development powered entirely by solar energy with rainwater harvesting systems.",
      },
      {
        id: 3,
        name: "Lagos Floating School (Makoko)",
        location: "Lagos",
        type: "Educational",
        year: 2022,
        description:
          "Innovative floating structure designed by NLÉ architects addressing sea-level rise and informal settlement challenges.",
      },
    ],
  },
  ar: {
    name: "Argentina",
    officialName: "Argentine Republic",
    flag: "ar",
    capital: "Buenos Aires",
    population: "46.2 million",
    populationYear: 2023,
    area: "2,780,400 km²",
    founded: "July 9, 1816",
    government: {
      type: "Federal Presidential Republic",
      headOfState: "Javier Milei",
      headOfStateTitle: "President",
    },
    languages: ["Spanish (official)"],
    currency: "Argentine Peso (ARS)",
    timezone: "UTC-3",
    climateOverview:
      "Argentina spans from subtropical regions in the north to subpolar conditions in Patagonia and Tierra del Fuego. This extreme latitudinal range creates diverse architectural requirements, from passive cooling in the Chaco to extreme cold resistance in the south.",
    climateZones: [
      {
        name: "Subtropical",
        description: "Northeast (Mesopotamia, Chaco) - hot, humid summers",
        avgTemp: "15-28°C",
        precipitation: "1000-2000mm/year",
      },
      {
        name: "Temperate Pampeana",
        description: "Buenos Aires and Pampas - mild, four seasons",
        avgTemp: "10-25°C",
        precipitation: "600-1200mm/year",
      },
      {
        name: "Arid/Semi-arid",
        description: "Cuyo and Northwest - dry with high thermal amplitude",
        avgTemp: "5-30°C",
        precipitation: "100-500mm/year",
      },
      {
        name: "Patagonian",
        description: "Southern Argentina - cold, windy, low precipitation",
        avgTemp: "0-15°C",
        precipitation: "200-500mm/year",
      },
      {
        name: "Subpolar",
        description: "Tierra del Fuego - cold year-round",
        avgTemp: "-5 to 10°C",
        precipitation: "500-800mm/year",
      },
    ],
    regions: ["Pampeana", "Cuyo", "NOA (Northwest)", "NEA (Northeast)", "Patagonia", "Tierra del Fuego"],
    history:
      "Argentina declared independence from Spain in 1816. Buenos Aires is renowned for its European-influenced architecture, particularly the Beaux-Arts and Art Nouveau buildings. The country has a strong tradition of modernist architecture, with significant works by Clorindo Testa and Amancio Williams. Current focus includes seismic-resistant construction in Mendoza and sustainable design addressing diverse climate challenges.",
    ministries: [
      {
        name: "Ministerio de Desarrollo Territorial y Hábitat",
        url: "https://www.argentina.gob.ar/habitat",
        description: "National housing policy and territorial development",
      },
      {
        name: "Ministerio de Obras Públicas",
        url: "https://www.argentina.gob.ar/obras-publicas",
        description: "Public infrastructure and construction",
      },
      {
        name: "Secretaría de Ambiente y Desarrollo Sustentable",
        url: "https://www.argentina.gob.ar/ambiente",
        description: "Environmental policy and sustainability",
      },
      {
        name: "IRAM (Instituto Argentino de Normalización)",
        url: "https://www.iram.org.ar/",
        description: "Argentine standards organization",
      },
      {
        name: "Consejo Profesional de Arquitectura y Urbanismo (CPAU)",
        url: "https://www.cpau.org/",
        description: "Professional architecture council of Buenos Aires",
      },
    ],
    buildingRegulations: [
      {
        name: "Código de Edificación (local)",
        description: "Each municipality has its building code - Buenos Aires code is the reference standard",
        year: 2018,
        url: "https://www.buenosaires.gob.ar/",
      },
      {
        name: "INPRES-CIRSOC 103",
        description: "Seismic-resistant construction regulations - mandatory in seismic zones",
        year: 2013,
      },
      {
        name: "CIRSOC 201",
        description: "Design of concrete structures - reinforced concrete standards",
        year: 2005,
      },
      {
        name: "Ley de Accesibilidad 24.314",
        description: "National accessibility requirements for public buildings",
        year: 1994,
      },
    ],
    thermalStandards: [
      {
        name: "IRAM 11603",
        description: "Bioclimatic Zoning - divides Argentina into 6 thermal zones",
      },
      {
        name: "IRAM 11604/11605",
        description: "Thermal insulation requirements for building envelopes",
      },
      {
        name: "Ley 13.059 Buenos Aires Province",
        description: "Mandatory thermal conditioning standards for new construction",
        year: 2003,
      },
      {
        name: "Etiquetado de Viviendas",
        description: "Residential energy labeling system being implemented nationally",
      },
    ],
    permitProcess:
      "Building permits are managed at municipal level. In Buenos Aires: 1) Consulta previa (preliminary consultation), 2) Registro de planos (plan submission to GCBA), 3) Review by urban planning office, 4) Payment of derechos de construcción, 5) Permit issuance (Permiso de Obra). Professional signatures required from registered architect and structural engineer. Typical timeline: 1-3 months for residential, longer for complex projects.",
    photos: [
      "/buenos-aires-architecture-beaux-arts.jpg",
      "/mendoza-argentina-sustainable-winery.jpg",
      "/patagonia-eco-lodge-sustainable.jpg",
      "/argentina-modern-architecture-building.jpg",
    ],
    projects: [
      {
        id: 1,
        name: "Puerto Madero Sustainable Waterfront",
        location: "Buenos Aires",
        type: "Urban Development",
        year: 2023,
        description:
          "Continued development of the iconic waterfront district with LEED-certified commercial buildings.",
      },
      {
        id: 2,
        name: "Mendoza Bioclimatic Social Housing",
        location: "Mendoza",
        type: "Residential",
        year: 2022,
        description: "Seismic-resistant affordable housing using passive solar design adapted to the arid climate.",
      },
      {
        id: 3,
        name: "Ushuaia Passive House Pilot",
        location: "Ushuaia, Tierra del Fuego",
        type: "Residential",
        year: 2024,
        description:
          "First certified Passive House in South America's southernmost city, demonstrating extreme cold climate performance.",
      },
    ],
  },
  it: {
    name: "Italy",
    officialName: "Italian Republic",
    flag: "it",
    capital: "Rome",
    population: "58.9 million",
    populationYear: 2023,
    area: "301,340 km²",
    founded: "March 17, 1861",
    government: {
      type: "Unitary Parliamentary Republic",
      headOfState: "Sergio Mattarella",
      headOfStateTitle: "President",
      headOfGovernment: "Giorgia Meloni",
      headOfGovernmentTitle: "Prime Minister",
    },
    languages: ["Italian (official)"],
    currency: "Euro (EUR)",
    timezone: "UTC+1 / UTC+2 (DST)",
    climateOverview:
      "Italy has a predominantly Mediterranean climate, with variations from Alpine in the north to hot Mediterranean in the south. The country's rich architectural heritage spanning millennia coexists with modern sustainable building practices and strict historic preservation requirements.",
    climateZones: [
      {
        name: "Alpine",
        description: "Northern mountains - cold winters, cool summers",
        avgTemp: "-5 to 20°C",
        precipitation: "1000-2000mm/year",
      },
      {
        name: "Continental",
        description: "Po Valley - cold winters, hot humid summers",
        avgTemp: "0-28°C",
        precipitation: "600-1000mm/year",
      },
      {
        name: "Mediterranean",
        description: "Central and coastal - mild winters, hot dry summers",
        avgTemp: "8-28°C",
        precipitation: "400-800mm/year",
      },
      {
        name: "Semi-arid",
        description: "Southern regions and Sicily - hot, dry conditions",
        avgTemp: "10-32°C",
        precipitation: "300-600mm/year",
      },
    ],
    regions: ["Northern Italy", "Central Italy", "Southern Italy", "Sicily", "Sardinia"],
    history:
      "Italy is the cradle of Western architecture, from Roman engineering to Renaissance masterpieces. The country unified in 1861 after centuries of city-states and foreign rule. Italian architects like Renzo Piano and Massimiliano Fuksas continue to influence global architecture. The challenge of integrating sustainable practices with historic preservation is a key focus of contemporary Italian building practice.",
    ministries: [
      {
        name: "Ministero delle Infrastrutture e dei Trasporti (MIT)",
        url: "https://www.mit.gov.it/",
        description: "Infrastructure, construction regulations, and public works",
      },
      {
        name: "Ministero della Cultura (MiC)",
        url: "https://www.beniculturali.it/",
        description: "Historic preservation and cultural heritage protection",
      },
      {
        name: "Ministero dell'Ambiente e della Sicurezza Energetica",
        url: "https://www.mase.gov.it/",
        description: "Environmental policy and energy efficiency",
      },
      {
        name: "ENEA",
        url: "https://www.enea.it/",
        description: "National agency for energy and sustainable development",
      },
      {
        name: "Consiglio Nazionale degli Architetti (CNAPPC)",
        url: "https://www.awn.it/",
        description: "National council of architects",
      },
    ],
    buildingRegulations: [
      {
        name: "Testo Unico dell'Edilizia (DPR 380/2001)",
        description: "Consolidated Building Act - primary national building legislation",
        year: 2001,
        url: "https://www.mit.gov.it/",
      },
      {
        name: "Norme Tecniche per le Costruzioni (NTC)",
        description: "Technical Standards for Construction - structural and seismic requirements",
        year: 2018,
      },
      {
        name: "Codice dei Beni Culturali (D.Lgs. 42/2004)",
        description: "Cultural Heritage Code - strict rules for historic buildings and protected areas",
        year: 2004,
      },
      {
        name: "DM 236/1989",
        description: "Accessibility requirements for buildings",
        year: 1989,
      },
    ],
    thermalStandards: [
      {
        name: "Decreto Requisiti Minimi (DM 26/06/2015)",
        description: "Minimum energy requirements for new and renovated buildings",
        year: 2015,
      },
      {
        name: "Attestato di Prestazione Energetica (APE)",
        description: "Mandatory Energy Performance Certificate for all buildings",
        url: "https://www.enea.it/",
      },
      {
        name: "Superbonus 110%/Ecobonus",
        description: "Tax incentives for energy efficiency renovations",
        year: 2020,
      },
      {
        name: "CasaClima/KlimaHaus",
        description: "South Tyrol's certification system for energy-efficient buildings",
        url: "https://www.agenziacasaclima.it/",
      },
    ],
    permitProcess:
      "Building permits vary by intervention type: CILA for minor works, SCIA for medium interventions, Permesso di Costruire for new construction. Process: 1) Preliminary check with Comune (municipality), 2) Submit project with required documentation, 3) Review by technical office (30-90 days), 4) Soprintendenza approval if in protected area, 5) Permit issuance, 6) Begin construction with certified site director. Historic centers require additional heritage approvals.",
    photos: [
      "/rome-modern-sustainable-architecture.jpg",
      "/milan-bosco-verticale-green-tower.jpg",
      "/italian-historic-building-renovation.jpg",
      "/turin-sustainable-urban-development.jpg",
    ],
    projects: [
      {
        id: 1,
        name: "Bosco Verticale",
        location: "Milan",
        type: "Residential",
        year: 2014,
        description:
          "Iconic vertical forest towers by Stefano Boeri with 900 trees and 20,000 plants, setting new standards for green architecture.",
      },
      {
        id: 2,
        name: "NZEB Social Housing Milan",
        location: "Milan",
        type: "Residential",
        year: 2023,
        description: "Nearly Zero Energy Building social housing demonstrating affordable sustainable design.",
      },
      {
        id: 3,
        name: "Venice Flood Barriers (MOSE)",
        location: "Venice",
        type: "Infrastructure",
        year: 2020,
        description: "Massive flood defense system protecting Venice's historic architecture from rising sea levels.",
      },
    ],
  },
  nz: {
    name: "New Zealand",
    officialName: "New Zealand / Aotearoa",
    flag: "nz",
    capital: "Wellington",
    population: "5.1 million",
    populationYear: 2023,
    area: "268,021 km²",
    founded: "February 6, 1840",
    government: {
      type: "Unitary Parliamentary Constitutional Monarchy",
      headOfState: "King Charles III",
      headOfStateTitle: "Monarch",
      headOfGovernment: "Christopher Luxon",
      headOfGovernmentTitle: "Prime Minister",
    },
    languages: ["English (official)", "Māori (official)", "NZ Sign Language (official)"],
    currency: "New Zealand Dollar (NZD)",
    timezone: "UTC+12 / UTC+13 (DST)",
    climateOverview:
      "New Zealand has a temperate maritime climate with high seismic activity. The country is a leader in sustainable building practices, combining Māori cultural values with cutting-edge green building technology. Earthquake-resistant design is paramount throughout the country.",
    climateZones: [
      {
        name: "Subtropical",
        description: "Northland and Auckland - warm, humid",
        avgTemp: "12-24°C",
        precipitation: "1200-1600mm/year",
      },
      {
        name: "Temperate Maritime",
        description: "Most of North Island and coastal South Island",
        avgTemp: "8-20°C",
        precipitation: "800-1500mm/year",
      },
      {
        name: "Continental",
        description: "Central Otago and Canterbury - hot summers, cold winters",
        avgTemp: "2-22°C",
        precipitation: "350-700mm/year",
      },
      {
        name: "Alpine",
        description: "Southern Alps - cold, high precipitation",
        avgTemp: "-5 to 15°C",
        precipitation: "3000-8000mm/year",
      },
    ],
    regions: ["Northland", "Auckland", "Waikato", "Wellington", "Canterbury", "Otago", "Southland"],
    history:
      "New Zealand was settled by Polynesian Māori around 1300 CE, with European colonization following the Treaty of Waitangi in 1840. Māori architecture (wharenui meeting houses) represents a significant cultural heritage. Following the devastating 2011 Christchurch earthquake, New Zealand has become a global leader in seismic engineering and innovative post-disaster reconstruction.",
    ministries: [
      {
        name: "Ministry of Business, Innovation and Employment (MBIE)",
        url: "https://www.building.govt.nz/",
        description: "Building regulations and construction policy",
      },
      {
        name: "Ministry for the Environment",
        url: "https://environment.govt.nz/",
        description: "Environmental policy and sustainability",
      },
      {
        name: "BRANZ",
        url: "https://www.branz.co.nz/",
        description: "Building research and standards development",
      },
      {
        name: "New Zealand Green Building Council (NZGBC)",
        url: "https://www.nzgbc.org.nz/",
        description: "Green Star NZ certification",
      },
      {
        name: "Te Tūāpapa Kura Kāinga (Ministry of Housing)",
        url: "https://www.hud.govt.nz/",
        description: "Housing and urban development",
      },
    ],
    buildingRegulations: [
      {
        name: "New Zealand Building Code (NZBC)",
        description: "Performance-based building regulations administered under the Building Act",
        year: 2004,
        url: "https://www.building.govt.nz/",
      },
      {
        name: "NZS 1170.5",
        description: "Earthquake Actions - seismic design requirements",
        year: 2016,
      },
      {
        name: "NZS 3604",
        description: "Timber-Framed Buildings - prescriptive standard for residential construction",
        year: 2011,
      },
      {
        name: "Healthy Homes Standards",
        description: "Minimum standards for rental housing insulation, heating, and ventilation",
        year: 2019,
      },
    ],
    thermalStandards: [
      {
        name: "NZBC Clause H1 Energy Efficiency",
        description: "Building envelope insulation and efficiency requirements by climate zone",
        url: "https://www.building.govt.nz/",
      },
      {
        name: "Homestar",
        description: "Residential green building rating tool (1-10 stars)",
        url: "https://www.nzgbc.org.nz/",
      },
      {
        name: "Green Star NZ",
        description: "Commercial and community building sustainability rating",
        url: "https://www.nzgbc.org.nz/",
      },
      {
        name: "Passive House NZ",
        description: "Growing adoption of Passive House standard for high-performance buildings",
      },
    ],
    permitProcess:
      "Building consents are issued by local councils (Territorial Authorities). Process: 1) Pre-application meeting (recommended), 2) Submit Building Consent Application with plans and specifications, 3) Council review (20 working days statutory), 4) Consent issuance, 5) Inspections during construction, 6) Code Compliance Certificate (CCC). Resource consent may also be required for land use under RMA.",
    photos: [
      "/wellington-new-zealand-sustainable-architecture.jpg",
      "/christchurch-rebuild-innovative-architecture.jpg",
      "/maori-meeting-house-wharenui.jpg",
      "/placeholder.svg?height=400&width=600",
    ],
    projects: [
      {
        id: 1,
        name: "Christchurch Central Library (Tūranga)",
        location: "Christchurch",
        type: "Cultural",
        year: 2018,
        description:
          "Award-winning post-earthquake library with base isolation seismic technology and 5-star Green Star rating.",
      },
      {
        id: 2,
        name: "Auckland City Rail Link Stations",
        location: "Auckland",
        type: "Infrastructure",
        year: 2024,
        description: "Sustainable underground stations incorporating Māori design principles and natural ventilation.",
      },
      {
        id: 3,
        name: "Wellington Living Building",
        location: "Wellington",
        type: "Commercial",
        year: 2023,
        description: "New Zealand's first Living Building Challenge project, achieving net-positive energy and water.",
      },
    ],
  },
  pe: {
    name: "Peru",
    officialName: "Republic of Peru",
    flag: "pe",
    capital: "Lima",
    population: "34.0 million",
    populationYear: 2023,
    area: "1,285,216 km²",
    founded: "July 28, 1821",
    government: {
      type: "Unitary Semi-Presidential Republic",
      headOfState: "Dina Boluarte",
      headOfStateTitle: "President",
    },
    languages: ["Spanish (official)", "Quechua (official)", "Aymara (official)"],
    currency: "Peruvian Sol (PEN)",
    timezone: "UTC-5",
    climateOverview:
      "Peru has extraordinary climate diversity due to the Andes mountains, ranging from tropical Amazon rainforest to coastal desert and high-altitude alpine conditions. This creates unique challenges and opportunities for architecture, including traditional techniques like adobe construction in the Andes.",
    climateZones: [
      {
        name: "Coastal Desert",
        description: "Lima and Pacific coast - mild, arid, foggy winters",
        avgTemp: "15-25°C",
        precipitation: "<50mm/year",
      },
      {
        name: "Highland (Sierra)",
        description: "Andean regions - cool to cold, seasonal rain",
        avgTemp: "5-18°C",
        precipitation: "500-1000mm/year",
      },
      {
        name: "High Altitude (Puna)",
        description: "Above 4000m - cold, extreme UV radiation",
        avgTemp: "-5 to 12°C",
        precipitation: "400-700mm/year",
      },
      {
        name: "Tropical Rainforest",
        description: "Amazon basin - hot, humid year-round",
        avgTemp: "24-32°C",
        precipitation: "2000-4000mm/year",
      },
    ],
    regions: ["Costa (Coast)", "Sierra (Highlands)", "Selva (Amazon)"],
    history:
      "Peru was the center of the Inca Empire and later the Spanish Viceroyalty. The country gained independence in 1821. Peruvian architecture spans from pre-Columbian wonders like Machu Picchu to colonial baroque churches and contemporary sustainable design. The country faces significant challenges from seismic activity and climate-induced disasters like El Niño flooding.",
    ministries: [
      {
        name: "Ministerio de Vivienda, Construcción y Saneamiento (MVCS)",
        url: "https://www.gob.pe/vivienda",
        description: "National housing, construction, and sanitation policy",
      },
      {
        name: "Ministerio del Ambiente (MINAM)",
        url: "https://www.gob.pe/minam",
        description: "Environmental policy and sustainability",
      },
      {
        name: "SENCICO",
        url: "https://www.sencico.gob.pe/",
        description: "National training and research center for construction industry",
      },
      {
        name: "INDECOPI",
        url: "https://www.indecopi.gob.pe/",
        description: "Peruvian technical standards (NTP)",
      },
      {
        name: "Colegio de Arquitectos del Perú (CAP)",
        url: "https://www.cap.org.pe/",
        description: "Professional architecture association",
      },
    ],
    buildingRegulations: [
      {
        name: "Reglamento Nacional de Edificaciones (RNE)",
        description: "National Building Regulations - comprehensive construction standards",
        year: 2021,
        url: "https://www.gob.pe/vivienda",
      },
      {
        name: "Norma E.030 Diseño Sismorresistente",
        description: "Seismic-resistant design requirements - critical due to high seismic activity",
        year: 2018,
      },
      {
        name: "Norma E.080 Adobe",
        description: "Standards for earthen construction - important for traditional and sustainable building",
        year: 2017,
      },
      {
        name: "Norma A.120 Accesibilidad",
        description: "Accessibility requirements for people with disabilities",
        year: 2019,
      },
    ],
    thermalStandards: [
      {
        name: "Norma EM.110 Confort Térmico",
        description: "Thermal comfort standard for buildings in Peru's diverse climates",
        year: 2014,
      },
      {
        name: "Bono Mivivienda Verde",
        description: "Green mortgage program incentivizing sustainable housing features",
        url: "https://www.mivivienda.com.pe/",
      },
      {
        name: "Código Técnico de Construcción Sostenible",
        description: "Sustainable construction technical code being developed",
      },
      {
        name: "EDGE Certification",
        description: "IFC green building standard popular for commercial buildings",
        url: "https://www.edgebuildings.com/",
      },
    ],
    permitProcess:
      "Building permits (Licencia de Edificación) are issued by municipal governments. Process: 1) Certificate of zoning and development parameters, 2) Submit project with architectural and structural plans, 3) Review by municipal technical commission, 4) Payment of fees, 5) License issuance (30-45 days), 6) Inspections during construction, 7) Declaration of Construction and Conformity of Work. Seismic calculations must be certified by structural engineer.",
    photos: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    projects: [
      {
        id: 1,
        name: "Lima LEED Platinum Office Tower",
        location: "Lima",
        type: "Commercial",
        year: 2023,
        description: "First LEED Platinum certified high-rise in Peru with water recycling and solar power.",
      },
      {
        id: 2,
        name: "Cusco Bioclimatic Social Housing",
        location: "Cusco",
        type: "Residential",
        year: 2022,
        description: "High-altitude affordable housing using improved adobe techniques and passive solar heating.",
      },
      {
        id: 3,
        name: "Amazon Eco-Lodge Research Center",
        location: "Madre de Dios",
        type: "Research",
        year: 2024,
        description:
          "Sustainable research facility using local materials and traditional construction adapted for scientific use.",
      },
    ],
  },
  ma: {
    name: "Morocco",
    officialName: "Kingdom of Morocco",
    flag: "ma",
    capital: "Rabat",
    population: "37.5 million",
    populationYear: 2023,
    area: "446,550 km²",
    founded: "788 CE (Idrisid dynasty)",
    government: {
      type: "Unitary Parliamentary Constitutional Monarchy",
      headOfState: "Mohammed VI",
      headOfStateTitle: "King",
      headOfGovernment: "Aziz Akhannouch",
      headOfGovernmentTitle: "Prime Minister",
    },
    languages: ["Arabic (official)", "Berber/Amazigh (official)", "French (widely used)"],
    currency: "Moroccan Dirham (MAD)",
    timezone: "UTC+1",
    climateOverview:
      "Morocco has a diverse climate from Mediterranean coastal areas to Saharan desert in the south and Alpine conditions in the Atlas mountains. Traditional Moroccan architecture developed sophisticated passive cooling techniques that are now being integrated with modern sustainable design.",
    climateZones: [
      {
        name: "Mediterranean",
        description: "Northern coast and Rif mountains - mild, wet winters",
        avgTemp: "12-26°C",
        precipitation: "400-900mm/year",
      },
      {
        name: "Semi-arid",
        description: "Atlantic coast and interior plains",
        avgTemp: "10-30°C",
        precipitation: "200-400mm/year",
      },
      {
        name: "Mountain",
        description: "Atlas ranges - cold winters with snow",
        avgTemp: "0-20°C",
        precipitation: "400-1000mm/year",
      },
      {
        name: "Desert",
        description: "Saharan south and southeast - hot, extremely dry",
        avgTemp: "15-40°C",
        precipitation: "<100mm/year",
      },
    ],
    regions: [
      "Tanger-Tetouan-Al Hoceima",
      "Rabat-Salé-Kénitra",
      "Casablanca-Settat",
      "Marrakech-Safi",
      "Drâa-Tafilalet",
      "Souss-Massa",
    ],
    history:
      "Morocco has a rich architectural heritage spanning Berber, Arab, Andalusian, and French colonial influences. The historic medinas of Fez and Marrakech are UNESCO World Heritage sites showcasing traditional Islamic urban planning and architecture. Morocco is now a leader in African renewable energy, hosting the world's largest concentrated solar plant (Noor-Ouarzazate).",
    ministries: [
      {
        name: "Ministère de l'Aménagement du Territoire, de l'Urbanisme et de l'Habitat",
        url: "https://www.mhpv.gov.ma/",
        description: "Urban planning, housing, and territorial development",
      },
      {
        name: "Ministère de la Transition Énergétique et du Développement Durable",
        url: "https://www.mem.gov.ma/",
        description: "Energy transition and sustainable development",
      },
      {
        name: "Agence Nationale pour le Développement des Énergies Renouvelables (ADER)",
        url: "https://www.aderee.ma/",
        description: "Renewable energy development agency",
      },
      {
        name: "IMANOR",
        url: "https://www.imanor.gov.ma/",
        description: "Moroccan standards institute",
      },
      {
        name: "Ordre National des Architectes",
        url: "https://www.architectes.org.ma/",
        description: "National order of architects",
      },
    ],
    buildingRegulations: [
      {
        name: "Règlement Général de Construction (RGC)",
        description: "General construction regulations covering safety and building standards",
        year: 2013,
        url: "https://www.mhpv.gov.ma/",
      },
      {
        name: "RPS 2011",
        description: "Seismic construction regulations - Règlement de Construction Parasismique",
        year: 2011,
      },
      {
        name: "Code de l'Urbanisme",
        description: "Urban planning code regulating land use and development",
        year: 1992,
      },
      {
        name: "Loi 12-66 Contrôle et Répression des Infractions",
        description: "Building inspection and enforcement regulations",
        year: 2016,
      },
    ],
    thermalStandards: [
      {
        name: "RTCM (Règlement Thermique de Construction au Maroc)",
        description: "Mandatory thermal building code for new construction",
        year: 2014,
        url: "https://www.amee.ma/",
      },
      {
        name: "Programme Binayate",
        description: "Green building program promoting energy efficiency in construction",
      },
      {
        name: "Haute Qualité Environnementale (HQE) Maroc",
        description: "Adaptation of French HQE green building standard",
      },
      {
        name: "EDGE Certification",
        description: "IFC green building standard increasingly adopted",
        url: "https://www.edgebuildings.com/",
      },
    ],
    permitProcess:
      "Building permits (Permis de Construire) are obtained through urban communes. Process: 1) Request for urban planning information (Note de Renseignements), 2) Submit permit application with architectural plans by registered architect, 3) Review by Agence Urbaine (30-60 days), 4) Technical committee approval, 5) Permit issuance, 6) Construction inspections, 7) Permis d'Habiter (occupancy permit). Historic medina construction requires heritage commission approval.",
    photos: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    projects: [
      {
        id: 1,
        name: "Noor-Ouarzazate Solar Complex",
        location: "Ouarzazate",
        type: "Energy",
        year: 2018,
        description:
          "World's largest concentrated solar power plant, generating 580 MW and powering over a million homes.",
      },
      {
        id: 2,
        name: "Mohammed VI Green City",
        location: "Benguerir",
        type: "Urban Development",
        year: 2024,
        description: "Africa's first sustainable city designed as a model for green urban development.",
      },
      {
        id: 3,
        name: "Marrakech Bioclimatic Social Housing",
        location: "Marrakech",
        type: "Residential",
        year: 2023,
        description: "Traditional riad-inspired affordable housing with modern passive cooling techniques.",
      },
    ],
  },
}

// Mapping from numeric codes to ISO 2-letter codes
const CODE_MAP: Record<string, string> = {
  "076": "br",
  "840": "us",
  "152": "cl",
  "276": "de",
  "036": "au",
  "566": "ng",
  "032": "ar",
  "380": "it",
  "554": "nz",
  "604": "pe",
  "504": "ma",
  // Add more mappings as needed
}

// Modified to accept params as a prop and use useState for activeTab
export default function CountryPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = React.use(params)
  const rawCode = code as string

  // Support both numeric codes (076) and ISO codes (br)
  const countryCode = CODE_MAP[rawCode] || rawCode.toLowerCase()
  const staticCountry = COUNTRY_FULL_DATA[countryCode]
  const [fetchedProjects, setFetchedProjects] = useState<Awaited<ReturnType<typeof getProjectsByCountry>>>([])
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const dbCode = countryCode === "us" ? "USA" : countryCode.toUpperCase()
    getProjectsByCountry(dbCode).then(setFetchedProjects)
  }, [countryCode])

  const country = staticCountry
    ? {
        ...staticCountry,
        projects: fetchedProjects.map((p) => ({
          id: p.id,
          name: p.name,
          location: p.location,
          type: p.type,
          year: p.year ?? 0,
          description: p.description ?? "",
          image: p.imageUrl ?? undefined,
        })),
      }
    : null

  if (!country) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
            <Globe className="w-8 h-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Country data coming soon</h1>
          <p className="text-muted-foreground max-w-md">
            We're working on adding comprehensive AEC data for this country. Check back soon or help us by contributing
            information.
          </p>
          <Link href="/explorer">
            <Button className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Explorer
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Changed to main tag and added activeTab state management
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-b from-primary/10 to-background border-b border-border"
      >
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={country.photos[0] || "/placeholder.svg"}
            alt={country.name}
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
        </div>

        {/* Navigation */}
        <div className="relative z-10 container mx-auto px-6 py-4">
          <Link href="/explorer">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Explorer
            </Button>
          </Link>
        </div>

        {/* Country Title */}
        <div className="relative z-10 container mx-auto px-6 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4"
          >
            {/* Flag */}
            <div className="w-20 h-14 rounded-lg overflow-hidden shadow-lg border border-border flex-shrink-0">
              <Image
                src={`https://flagcdn.com/w160/${country.flag}.png`}
                alt={`${country.name} flag`}
                width={80}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{country.name}</h1>
              <p className="text-muted-foreground">{country.officialName}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Quick Facts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`grid grid-cols-2 md:grid-cols-4 ${country.government.headOfGovernment ? "lg:grid-cols-7" : "lg:grid-cols-6"} gap-4 mb-8`}
        >
          <Card className="p-4 bg-card/50 backdrop-blur">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <MapPin className="w-4 h-4" />
              <span className="text-xs">Capital</span>
            </div>
            <div className="font-semibold">{country.capital}</div>
          </Card>
          <Card className="p-4 bg-card/50 backdrop-blur">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users className="w-4 h-4" />
              <span className="text-xs">Population ({country.populationYear})</span>
            </div>
            <div className="font-semibold">{country.population}</div>
          </Card>
          <Card className="p-4 bg-card/50 backdrop-blur">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Globe className="w-4 h-4" />
              <span className="text-xs">Area</span>
            </div>
            <div className="font-semibold">{country.area}</div>
          </Card>
          <Card className="p-4 bg-card/50 backdrop-blur">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-xs">Founded</span>
            </div>
            <div className="font-semibold">{country.founded}</div>
          </Card>
          <Card className="p-4 bg-card/50 backdrop-blur">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Landmark className="w-4 h-4" />
              <span className="text-xs">{country.government.headOfStateTitle}</span>
            </div>
            <div className="font-semibold">{country.government.headOfState}</div>
          </Card>
          {country.government.headOfGovernment && (
            <Card className="p-4 bg-card/50 backdrop-blur">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Users className="w-4 h-4" />
                <span className="text-xs">{country.government.headOfGovernmentTitle}</span>
              </div>
              <div className="font-semibold">{country.government.headOfGovernment}</div>
            </Card>
          )}
          <Card className="p-4 bg-card/50 backdrop-blur">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Scale className="w-4 h-4" />
              <span className="text-xs">Government</span>
            </div>
            <div className="font-semibold">{country.government.type.split(" ").slice(0, 2).join(" ")}</div>
          </Card>
        </motion.div>

        {/* Tabs for Different Sections */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          {/* Pass activeTab and onValueChange to Tabs component */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            {/* Added a div wrapper for TabsList and the indicator line */}
            <div className="relative">
              {/* Distributing tabs evenly across full width with justify-between */}
              <TabsList className="bg-card/50 backdrop-blur p-1 w-full justify-between">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="climate">Climate</TabsTrigger>
                <TabsTrigger value="regulations">Regulations</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
              </TabsList>

              <div className="flex justify-between relative mt-2">
                <div
                  className={`h-0.5 bg-teal-500/50 transition-all duration-300`}
                  style={{
                    width: "20%",
                    marginLeft:
                      activeTab === "overview"
                        ? "0%"
                        : activeTab === "climate"
                          ? "20%"
                          : activeTab === "regulations"
                            ? "40%"
                            : activeTab === "resources"
                              ? "60%"
                              : "80%",
                  }}
                />
              </div>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* History */}
                <Card className="lg:col-span-2 p-6 bg-card/50 backdrop-blur">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-bold">History & Architecture</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{country.history}</p>
                </Card>

                {/* Basic Info */}
                <Card className="p-6 bg-card/50 backdrop-blur">
                  <h2 className="text-lg font-bold mb-4">Quick Info</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Languages</span>
                      <span className="font-medium text-right">{country.languages.join(", ")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Currency</span>
                      <span className="font-medium">{country.currency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Timezone</span>
                      <span className="font-medium">{country.timezone}</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Photo Gallery */}
              <Card className="p-6 bg-card/50 backdrop-blur">
                <h2 className="text-lg font-bold mb-4">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {country.photos.map((photo, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={photo || "/placeholder.svg"}
                        alt={`${country.name} architecture ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Climate Tab */}
            <TabsContent value="climate" className="space-y-6">
              <Card className="p-6 bg-card/50 backdrop-blur">
                <div className="flex items-center gap-2 mb-4">
                  <Thermometer className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">Climate Overview</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">{country.climateOverview}</p>

                <h3 className="font-semibold mb-4">Climate Zones</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {country.climateZones.map((zone, index) => (
                    <Card key={index} className="p-4 bg-background/50">
                      <div className="flex items-start gap-3">
                        {zone.name.includes("Tropical") || zone.name.includes("Equatorial") ? (
                          <Sun className="w-5 h-5 text-yellow-500 mt-1" />
                        ) : zone.name.includes("Arid") || zone.name.includes("Desert") ? (
                          <Sun className="w-5 h-5 text-orange-500 mt-1" />
                        ) : zone.name.includes("Alpine") || zone.name.includes("Tundra") ? (
                          <Mountain className="w-5 h-5 text-blue-400 mt-1" />
                        ) : zone.name.includes("Marine") || zone.name.includes("Oceanic") ? (
                          <CloudRain className="w-5 h-5 text-blue-500 mt-1" />
                        ) : (
                          <TreePine className="w-5 h-5 text-green-500 mt-1" />
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold text-primary">{zone.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{zone.description}</p>
                          <div className="flex gap-4 text-xs">
                            <span className="text-muted-foreground">
                              Temp: <span className="text-foreground">{zone.avgTemp}</span>
                            </span>
                            <span className="text-muted-foreground">
                              Rain: <span className="text-foreground">{zone.precipitation}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>

              {/* Regions */}
              <Card className="p-6 bg-card/50 backdrop-blur">
                <h2 className="text-lg font-bold mb-4">Administrative Regions</h2>
                <div className="flex flex-wrap gap-2">
                  {country.regions.map((region) => (
                    <Badge key={region} variant="secondary" className="bg-primary/10 text-primary">
                      {region}
                    </Badge>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Regulations Tab */}
            <TabsContent value="regulations" className="space-y-6">
              {/* Building Codes */}
              <Card className="p-6 bg-card/50 backdrop-blur">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">Building Codes & Regulations</h2>
                </div>
                <div className="space-y-4">
                  {country.buildingRegulations.map((reg, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-background/50">
                      <FileText className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold">{reg.name}</h3>
                          {reg.year && reg.year > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {reg.year}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{reg.description}</p>
                        {reg.url && (
                          <a
                            href={reg.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                          >
                            Official Source <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Thermal Standards */}
              <Card className="p-6 bg-card/50 backdrop-blur">
                <div className="flex items-center gap-2 mb-4">
                  <Thermometer className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">Thermal & Energy Standards</h2>
                </div>
                <div className="space-y-4">
                  {country.thermalStandards.map((std, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-background/50">
                      <ShieldCheck className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-semibold">{std.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{std.description}</p>
                        {std.url && (
                          <a
                            href={std.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                          >
                            Learn More <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Permit Process */}
              <Card className="p-6 bg-card/50 backdrop-blur">
                <div className="flex items-center gap-2 mb-4">
                  <Ruler className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">Building Permit Process</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">{country.permitProcess}</p>
              </Card>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources" className="space-y-6">
              <Card className="p-6 bg-card/50 backdrop-blur">
                <div className="flex items-center gap-2 mb-4">
                  <Landmark className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">Government Ministries & Official Resources</h2>
                </div>
                <p className="text-muted-foreground mb-6">
                  Direct links to official government bodies responsible for housing, urban planning, construction, and
                  environmental regulations.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {country.ministries.map((ministry, index) => (
                    <a key={index} href={ministry.url} target="_blank" rel="noopener noreferrer" className="group">
                      <Card className="p-4 bg-background/50 hover:bg-primary/5 transition-colors h-full">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h3 className="font-semibold group-hover:text-primary transition-colors">
                              {ministry.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">{ministry.description}</p>
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                        </div>
                      </Card>
                    </a>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold">Sustainable Projects in {country.name}</h2>
                <Badge variant="secondary" className="bg-primary/20 text-primary">
                  {country.projects.length} Projects
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {country.projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6 bg-card/50 backdrop-blur hover:bg-card/70 transition-colors h-full">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-primary">{project.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {project.year}
                        </Badge>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {project.location}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {project.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <Card className="p-8 bg-primary/5 backdrop-blur text-center mt-8">
                <Home className="w-10 h-10 mx-auto text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Know a sustainable project in {country.name}?</h3>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                  Help us build the most comprehensive database of sustainable architecture worldwide.
                </p>
                <Link href="/explorer/submit">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
                    Submit a Project
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </main>
  )
}
