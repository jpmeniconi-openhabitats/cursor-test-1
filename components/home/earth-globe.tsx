"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Html, useTexture } from "@react-three/drei"
import { useRef, useState, Suspense, useEffect } from "react"
import type * as THREE from "three"
import { getProjects } from "@/app/actions/projects"
import { getFallbackProjects } from "@/lib/projects-fallback"

export interface ProjectDotItem {
  id: number
  lat: number
  lng: number
  name: string
  architect: string
  focus: string
}

// Convert lat/lng to 3D sphere coordinates
function latLngToVector3(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const y = radius * Math.cos(phi)
  const z = radius * Math.sin(phi) * Math.sin(theta)
  return [x, y, z]
}

function ProjectDot({ 
  position, 
  project, 
  isHovered, 
  onHover, 
  onUnhover 
}: { 
  position: [number, number, number]
  project: ProjectDotItem
  isHovered: boolean
  onHover: () => void
  onUnhover: () => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      const scale = isHovered ? 1.5 : 1 + Math.sin(state.clock.elapsedTime * 2 + project.id) * 0.1
      meshRef.current.scale.setScalar(scale)
    }
  })

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerEnter={(e) => {
          e.stopPropagation()
          onHover()
        }}
        onPointerLeave={onUnhover}
      >
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#14b8a6" />
      </mesh>
      {/* Glow effect */}
      <mesh>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#14b8a6" transparent opacity={0.3} />
      </mesh>
      {/* Tooltip */}
      {isHovered && (
        <Html
          position={[0.15, 0.1, 0]}
          center
          style={{
            pointerEvents: 'none',
            transform: 'translateX(0)',
          }}
        >
          <div className="bg-black/90 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 w-48 shadow-xl">
            <span className="text-xs font-mono text-teal-400 block mb-1 uppercase tracking-wider">
              {project.name}
            </span>
            <span className="text-[11px] text-white/70 block">
              {project.architect}
            </span>
            <span className="text-[10px] text-white/40 block mt-1">
              Focus: {project.focus}
            </span>
          </div>
        </Html>
      )}
    </group>
  )
}

function Earth({ projectDots }: { projectDots: ProjectDotItem[] }) {
  const earthRef = useRef<THREE.Group>(null)
  const [hoveredDot, setHoveredDot] = useState<number | null>(null)
  const texture = useTexture("https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg")

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <group ref={earthRef}>
      {/* Earth sphere */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial 
          map={texture}
          roughness={1}
          metalness={0}
        />
      </mesh>
      
      {/* Atmosphere glow */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial color="#14b8a6" transparent opacity={0.05} />
      </mesh>

      {/* Project dots */}
      {projectDots.map((project) => {
        const position = latLngToVector3(project.lat, project.lng, 2.05)
        return (
          <ProjectDot
            key={project.id}
            position={position}
            project={project}
            isHovered={hoveredDot === project.id}
            onHover={() => setHoveredDot(project.id)}
            onUnhover={() => setHoveredDot(null)}
          />
        )
      })}
    </group>
  )
}

export function EarthGlobe() {
  const [projectDots, setProjectDots] = useState<ProjectDotItem[]>([])

  useEffect(() => {
    getProjects().then((projects) => {
      const data = projects.length > 0 ? projects : getFallbackProjects()
      setProjectDots(
        data.map((p) => ({
          id: p.id,
          lat: p.coordinates[1],
          lng: p.coordinates[0],
          name: p.name,
          architect: "",
          focus: p.type,
        })),
      )
    })
  }, [])

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 3, 5]} intensity={2} />
        <directionalLight position={[-5, -3, -5]} intensity={0.8} />
        <Suspense fallback={null}>
          <Earth projectDots={projectDots} />
        </Suspense>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
