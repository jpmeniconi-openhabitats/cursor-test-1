"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { Navigation } from "@/components/explorer/navigation"
import { Footer } from "@/components/explorer/footer"

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const showFooter = pathname !== "/explorer/map" && pathname !== "/explorer"
  const hideNavigation = false

  return (
    <>
      <Navigation isHidden={hideNavigation} />
      {children}
      {showFooter && <Footer />}
    </>
  )
}
