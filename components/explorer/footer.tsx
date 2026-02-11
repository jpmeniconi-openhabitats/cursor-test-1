import Link from "next/link"
import Image from "next/image"
import { Linkedin, Twitter, Instagram, Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 pb-8 border-b border-border">
          <h3 className="text-sm font-semibold text-muted-foreground mb-6">Backed by</h3>
          <div className="flex items-center">
            <Image
              src="/images/design-mode/bv-logo-white-jp%20%28calcado%29.png"
              alt="Bevisioneers - The Mercedes-Benz Fellowship"
              width={140}
              height={42}
              className="opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 pb-12 border-b border-border">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image 
                src="/openhabitats-logo.png" 
                alt="OpenHabitats" 
                width={36} 
                height={36}
                className="rounded-full"
              />
              <span className="text-lg font-semibold">OpenHabitats</span>
            </div>
            {/* </CHANGE> */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discover sustainable architecture through interactive AI-powered network.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm">Platform</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/explorer/projects" className="hover:text-foreground transition-colors">
                  Explore Projects
                </Link>
              </li>
              <li>
                <Link href="/explorer/map" className="hover:text-foreground transition-colors">
                  Interactive Map
                </Link>
              </li>
              <li>
                <Link href="/explorer/chat" className="hover:text-foreground transition-colors">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link href="/explorer/submit" className="hover:text-foreground transition-colors">
                  Submit Project
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/explorer/about" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  BeVisioneers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm">Community</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors flex items-center gap-2">
                  <Twitter className="w-4 h-4" />
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors flex items-center gap-2">
                  <Instagram className="w-4 h-4" />
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  GitHub
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2025 OpenHabitats. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Built from Chile for the world</span>
            <span className="text-2xl">🇨🇱</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
