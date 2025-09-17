"use client"

import { useEffect, useState } from "react"

interface ViewCounterProps {
  variant?: "navbar" | "fixed"
}

export function ViewCounter({ variant = "fixed" }: ViewCounterProps) {
  const [views, setViews] = useState<number>(0)

  useEffect(() => {
    // Get current views from localStorage
    const currentViews = Number.parseInt(localStorage.getItem("portfolio-views") || "0")

    // Only increment on first load (fixed variant)
    if (variant === "fixed") {
      const newViews = currentViews + 1
      localStorage.setItem("portfolio-views", newViews.toString())
      setViews(newViews)

      // Also track unique sessions
      const sessionKey = "portfolio-session-" + Date.now()
      if (!sessionStorage.getItem("portfolio-visited")) {
        sessionStorage.setItem("portfolio-visited", sessionKey)

        // Track unique visits
        const uniqueViews = Number.parseInt(localStorage.getItem("portfolio-unique-views") || "0")
        localStorage.setItem("portfolio-unique-views", (uniqueViews + 1).toString())
      }
    } else {
      // For navbar variant, just display current views
      setViews(currentViews)
    }
  }, [variant])

  if (variant === "navbar") {
    return (
      <div className="flex items-center gap-1 text-xs text-muted-foreground bg-primary/10 rounded-full px-2 py-1">
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        <span>{views.toLocaleString()}</span>
      </div>
    )
  }

  // Original fixed position version
  return (
    <div className="fixed top-20 right-4 z-40 glass rounded-lg p-2 backdrop-blur-md">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        <span>{views.toLocaleString()} views</span>
      </div>
    </div>
  )
}
