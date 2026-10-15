"use client"

import { useState, useEffect } from "react"
import { ThemeToggle } from "../theme-toggle"
import {
  Sparkles,
  Search,
  Wifi,
  Battery,
  Clock,
  Command,
} from "lucide-react"

interface OsMenubarProps {
  activeWindowTitle: string
  onOpenCommandPalette: () => void
  onOpenApp: (appId: string) => void
}

export function OsMenubar({
  activeWindowTitle,
  onOpenCommandPalette,
  onOpenApp,
}: OsMenubarProps) {
  const [timeStr, setTimeStr] = useState("")
  const [dateStr, setDateStr] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTimeStr(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
      setDateStr(now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-8 z-50 px-3 sm:px-4 bg-background/85 backdrop-blur-2xl border-b border-border/80 flex items-center justify-between text-xs font-mono select-none">
      {/* Left: Apple/AswinOS Logo & Menus */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onOpenApp("about")}
          className="flex items-center gap-1.5 font-bold hover:text-primary transition-colors"
          title="About AswinOS"
        >
          <div className="w-4 h-4 rounded-sm bg-primary text-white flex items-center justify-center font-bold text-[9px]">
            <Sparkles className="w-2.5 h-2.5" />
          </div>
          <span className="font-heading font-extrabold text-sm tracking-tight">
            AswinOS
          </span>
        </button>

        {/* Current Active Window Name */}
        <span className="font-semibold text-foreground border-l border-border pl-3 hidden sm:inline">
          {activeWindowTitle || "Desktop"}
        </span>

        {/* Traditional macOS Desktop Menu Options */}
        <div className="hidden md:flex items-center gap-3 text-muted-foreground ml-1">
          <button onClick={() => onOpenApp("projects")} className="hover:text-foreground transition-colors">
            Projects
          </button>
          <button onClick={() => onOpenApp("skills")} className="hover:text-foreground transition-colors">
            Skills
          </button>
          <button onClick={() => onOpenApp("drone")} className="hover:text-foreground transition-colors">
            DroneVision
          </button>
          <button onClick={() => onOpenApp("terminal")} className="hover:text-foreground transition-colors">
            Terminal
          </button>
          <button onClick={() => onOpenApp("contact")} className="hover:text-foreground transition-colors">
            Contact
          </button>
        </div>
      </div>

      {/* Right: Spotlight, Theme Toggle, Battery, Clock */}
      <div className="flex items-center gap-2.5 sm:gap-3 text-muted-foreground">
        {/* Spotlight Command Palette trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          title="Search / Command Palette (⌘K)"
        >
          <Search className="w-3.5 h-3.5 text-primary" />
          <span className="text-[10px] hidden sm:inline">⌘K</span>
        </button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* WiFi & Battery Status */}
        <div className="hidden sm:flex items-center gap-1.5 text-muted-foreground">
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-3.5 h-3.5" />
        </div>

        {/* Date and Clock */}
        <div className="flex items-center gap-1 text-[11px] font-medium text-foreground">
          <span className="hidden sm:inline text-muted-foreground">{dateStr}</span>
          <span>{timeStr || "12:00"}</span>
        </div>
      </div>
    </div>
  )
}
