"use client"

import { useState, useEffect } from "react"
import { ThemeToggle } from "./theme-toggle"
import {
  Sparkles,
  Command,
  Search,
  Wifi,
  Battery,
  Clock,
  Menu,
  X,
  Cpu,
} from "lucide-react"

interface Props {
  onOpenCommandPalette: () => void
}

export function NeuralOsMenubar({ onOpenCommandPalette }: Props) {
  const [timeStr, setTimeStr] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTimeStr(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-2 px-3 sm:px-6 bg-background/80 backdrop-blur-xl border-b border-border shadow-xs select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-9 text-xs font-mono">
        {/* Left Side: Brand Logo & Virtual Desktops */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => scrollTo("home")}
            className="flex items-center gap-2 cursor-pointer font-bold text-foreground hover:text-primary transition-colors"
          >
            <div className="w-5 h-5 rounded-md bg-primary text-white flex items-center justify-center font-bold text-[10px]">
              <Sparkles className="w-3 h-3" />
            </div>
            <span className="font-heading font-extrabold text-sm tracking-tight text-foreground">
              AswinOS
            </span>
            <span className="text-[10px] text-muted-foreground hidden sm:inline">
              v2.6.4
            </span>
          </div>

          {/* Quick Desktops on Desktop */}
          <div className="hidden lg:flex items-center gap-1 border-l border-border pl-3 text-muted-foreground">
            <button
              onClick={() => scrollTo("home")}
              className="px-2.5 py-1 rounded-md hover:bg-muted hover:text-foreground transition-colors"
            >
              Workbench
            </button>
            <button
              onClick={() => scrollTo("skills")}
              className="px-2.5 py-1 rounded-md hover:bg-muted hover:text-foreground transition-colors"
            >
              Arsenal
            </button>
            <button
              onClick={() => scrollTo("experience")}
              className="px-2.5 py-1 rounded-md hover:bg-muted hover:text-foreground transition-colors"
            >
              Experience
            </button>
            <button
              onClick={() => scrollTo("projects")}
              className="px-2.5 py-1 rounded-md hover:bg-muted hover:text-foreground transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="px-2.5 py-1 rounded-md hover:bg-muted hover:text-foreground transition-colors"
            >
              Contact
            </button>
          </div>
        </div>

        {/* Center: Interactive Spotlight Command Trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2 px-3 py-1 rounded-lg bg-muted/60 hover:bg-muted border border-border text-muted-foreground hover:text-foreground transition-all shadow-xs"
        >
          <Search className="w-3.5 h-3.5 text-primary" />
          <span className="hidden sm:inline text-[11px]">Command Palette</span>
          <kbd className="text-[10px] bg-background px-1.5 py-0.2 rounded border border-border">
            ⌘K
          </kbd>
        </button>

        {/* Right Side: Status Utilities */}
        <div className="flex items-center gap-2 sm:gap-3 text-muted-foreground">
          {/* Active Status Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI SYSTEM ONLINE</span>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Clock */}
          <div className="flex items-center gap-1 text-[11px] font-medium text-foreground">
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            <span>{timeStr || "12:00"}</span>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1 rounded-md text-foreground hover:bg-muted"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-2 p-3 os-window border border-border space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => scrollTo("home")}
            className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono text-foreground hover:bg-primary/10"
          >
            🏠 Workbench
          </button>
          <button
            onClick={() => scrollTo("about")}
            className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono text-foreground hover:bg-primary/10"
          >
            👤 About Aswin
          </button>
          <button
            onClick={() => scrollTo("skills")}
            className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono text-foreground hover:bg-primary/10"
          >
            ⚡ Technical Arsenal
          </button>
          <button
            onClick={() => scrollTo("experience")}
            className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono text-foreground hover:bg-primary/10"
          >
            💼 Career Track
          </button>
          <button
            onClick={() => scrollTo("projects")}
            className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono text-foreground hover:bg-primary/10"
          >
            🚀 Key Projects
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono text-foreground hover:bg-primary/10"
          >
            📬 Transmit Transmission
          </button>
        </div>
      )}
    </header>
  )
}
