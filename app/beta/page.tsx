"use client"

import React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { validateBetaAccess } from "@/app/actions/beta-access"

export default function BetaGatePage() {
  const [key, setKey] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect") || "/explorer"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    const result = await validateBetaAccess(key)

    if (result.success) {
      router.push(redirectTo)
    } else {
      setStatus("error")
      setErrorMessage(result.error || "Invalid access key.")
      setKey("")
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Subtle background grain */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")' }} />
      
      <div className="relative z-10 flex flex-col items-center max-w-sm w-full">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/openhabitats-logo.png"
            alt="OpenHabitats"
            width={48}
            height={48}
            className="mb-8 opacity-80 hover:opacity-100 transition-opacity"
          />
        </Link>

        {/* Title */}
        <div className="text-center mb-8">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-400/80 mb-3">
            Early Access
          </p>
          <h1 className="text-2xl font-light text-white/90 mb-2">
            OpenHabitats
          </h1>
          <p className="text-sm text-white/40 leading-relaxed">
            This area is currently in private beta.
            <br />
            Enter your access key to continue.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="relative">
            <input
              type="password"
              value={key}
              onChange={(e) => {
                setKey(e.target.value)
                if (status === "error") setStatus("idle")
              }}
              placeholder="Access key"
              className={`w-full px-4 py-3 bg-white/[0.05] border rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.07] transition-all ${
                status === "error" 
                  ? "border-red-500/50" 
                  : "border-white/10"
              }`}
              autoFocus
              disabled={status === "loading"}
            />
          </div>

          {status === "error" && (
            <p className="text-xs text-red-400 text-center">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading" || key.trim() === ""}
            className="w-full py-3 bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 text-white text-sm font-medium rounded-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" />
                Verifying...
              </span>
            ) : (
              "Enter"
            )}
          </button>
        </form>

        {/* Back link */}
        <Link 
          href="/"
          className="mt-8 text-xs text-white/30 hover:text-white/60 transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
