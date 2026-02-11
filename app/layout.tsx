import React from "react"
import type { Metadata } from 'next'
import { Inter, Playfair_Display, Bricolage_Grotesque } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'
import { WaitlistProvider } from '@/components/waitlist-provider'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600']
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic']
});

const bricolage = Bricolage_Grotesque({ 
  subsets: ["latin"],
  variable: '--font-bricolage',
  weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'OpenHabitats — AI-Powered Sustainable Architecture Platform',
  description: 'AI-powered search and exploration for real climate-positive building projects worldwide. Find built projects, materials, and strategies by climate, performance, and context.',
  generator: 'v0.app',
  icons: {
    icon: '/openhabitats-logo.png',
    shortcut: '/openhabitats-logo.png',
    apple: '/openhabitats-logo.png',
  },
  openGraph: {
    title: 'OpenHabitats',
    description: 'AI-powered search and exploration for real climate-positive building projects worldwide.',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OpenHabitats - Sustainable Architecture Database',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenHabitats',
    description: 'AI-powered search and exploration for real climate-positive building projects worldwide.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <Script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js" strategy="beforeInteractive" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${bricolage.variable} font-sans antialiased bg-neutral-950 text-neutral-50`}>
        <WaitlistProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </WaitlistProvider>
      </body>
    </html>
  )
}
