"use client"

import React from "react"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { addToWaitlist } from "@/app/actions/waitlist"

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const validateEmail = (email: string): boolean => {
    // Check if email contains @ symbol
    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email address")
      return false
    }
    
    // Additional validation: check format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address")
      return false
    }
    
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")
    
    if (!validateEmail(email)) {
      setStatus("error")
      return
    }

    setStatus("loading")
    
    // Call server action to add email to Supabase
    const result = await addToWaitlist(email)
    
    if (result.success) {
      setStatus("success")
      setEmail("")
      
      // Auto-close after 3 seconds
      setTimeout(() => {
        onClose()
        setStatus("idle")
      }, 3000)
    } else {
      setStatus("error")
      setErrorMessage(result.error || "Something went wrong. Please try again.")
    }
  }

  if (!isOpen || !mounted) return null

  // Ensure document.body exists before creating portal
  if (typeof document === 'undefined') return null

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative bg-black border border-white/20 rounded-2xl p-8 md:p-10 max-w-md w-full shadow-2xl animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {status === "success" ? (
          // Success State
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17L4 12" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-white mb-2">You're on the list!</h3>
            <p className="text-white/60">
              We'll notify you when OpenHabitats launches.
            </p>
          </div>
        ) : (
          // Form State
          <>
            <div className="mb-6 text-center">
              <h2 className="text-2xl md:text-3xl font-medium text-white mb-3 leading-tight">
                Design better habitats
                <br />
                <span className="text-emerald-400">starts here.</span>
              </h2>
              <p className="text-white/60 text-sm md:text-base">
                Get early access to OpenHabitats when the first version goes live later this 2026.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setErrorMessage("")
                    setStatus("idle")
                  }}
                  placeholder="Email address"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  required
                  disabled={status === "loading"}
                />
                {status === "error" && errorMessage && (
                  <p className="text-red-400 text-sm mt-2">{errorMessage}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "loading" || !email}
                className="w-full px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-white/10 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Joining...</span>
                  </>
                ) : (
                  <span>Notify me</span>
                )}
              </button>
            </form>

            <p className="text-white/40 text-xs text-center mt-6">
              No spam. Just meaningful updates.
            </p>
          </>
        )}
      </div>
    </div>,
    document.body
  )
}
