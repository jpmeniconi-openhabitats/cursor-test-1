"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Projects", href: "/explorer/projects" },
  { name: "Map", href: "/explorer/map" },
  { name: "Chat", href: "/explorer/chat" },
  { name: "About", href: "/explorer/about" },
]

export function Navigation({ isHidden = false }: { isHidden?: boolean }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-4 left-0 right-0 z-50 transition-all duration-500 transform flex justify-center px-6",
        isHidden ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100",
      )}
    >
      <nav
        className={cn(
          "flex items-center px-6 h-14 rounded-full transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20"
            : "bg-background/60 backdrop-blur-lg border border-white/5",
        )}
      >
        {/* Logo - con margin derecho para separar de nav */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity mr-10">
          <Image src="/openhabitats-logo.png" alt="OpenHabitats" width={28} height={28} className="rounded-full" />
          <span className="text-base font-semibold tracking-tight">OpenHabitats</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center ml-6">
          <div className="h-6 w-px bg-white/20 mx-4" />
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-sm font-medium h-9 px-4">
              Log In
            </Button>
            <Button
              size="sm"
              className="text-sm font-medium rounded-full h-9 px-5 text-white hover:opacity-90"
              style={{ backgroundColor: "#008080" }}
            >
              Sign Up
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-xl">
            <div className="flex flex-col gap-6 mt-8">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href} className="text-lg hover:text-primary transition-colors">
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-4">
                <Button variant="outline" className="w-full bg-transparent">
                  Log In
                </Button>
                <Button className="w-full text-white hover:opacity-90" style={{ backgroundColor: "#008080" }}>
                  Sign Up
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
