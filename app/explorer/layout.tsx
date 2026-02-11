"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { Navigation } from "@/components/explorer/navigation"
import { Footer } from "@/components/explorer/footer"

export default function ExplorerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  // Don't show footer on map and explorer main pages (they're full-screen)
  const showFooter = pathname !== "/explorer/map" && pathname !== "/explorer"

  return (
    <>
      <Navigation isHidden={false} />
      {children}
      {showFooter && <Footer />}
    </>
  )
}
