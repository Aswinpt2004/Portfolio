"use client"

import {
  Home,
  User,
  Cpu,
  Briefcase,
  Layers,
  Mail,
  Command,
  FileText,
} from "lucide-react"

interface Props {
  onOpenCommandPalette: () => void
}

export function NeuralOsDock({ onOpenCommandPalette }: Props) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  const dockItems = [
    { id: "home", label: "Workbench", icon: Home, onClick: () => scrollTo("home") },
    { id: "about", label: "About Aswin", icon: User, onClick: () => scrollTo("about") },
    { id: "skills", label: "Technical Arsenal", icon: Cpu, onClick: () => scrollTo("skills") },
    { id: "experience", label: "Career Timeline", icon: Briefcase, onClick: () => scrollTo("experience") },
    { id: "projects", label: "Project Dossiers", icon: Layers, onClick: () => scrollTo("projects") },
    { id: "contact", label: "Transmission", icon: Mail, onClick: () => scrollTo("contact") },
  ]

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 hidden sm:flex items-center gap-1.5 p-2 os-dock">
      {dockItems.map((item) => {
        const Icon = item.icon
        return (
          <button
            key={item.id}
            onClick={item.onClick}
            className="group relative p-2.5 rounded-2xl hover:bg-primary/15 transition-all duration-300 hover:scale-125 text-foreground/80 hover:text-primary"
            aria-label={item.label}
          >
            <Icon className="w-5 h-5" />
            {/* Tooltip */}
            <span className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-popover text-popover-foreground text-[10px] font-mono px-2 py-0.5 rounded-lg border border-border pointer-events-none whitespace-nowrap shadow-md">
              {item.label}
            </span>
          </button>
        )
      })}

      <div className="w-[1px] h-6 bg-border mx-1" />

      {/* Command Palette Trigger in Dock */}
      <button
        onClick={onOpenCommandPalette}
        className="group relative p-2.5 rounded-2xl bg-primary text-white hover:bg-primary/90 transition-all duration-300 hover:scale-125 shadow-md"
        aria-label="Command Palette (Cmd+K)"
      >
        <Command className="w-5 h-5" />
        <span className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-popover text-popover-foreground text-[10px] font-mono px-2 py-0.5 rounded-lg border border-border pointer-events-none whitespace-nowrap shadow-md">
          Command Palette (⌘K)
        </span>
      </button>

      {/* Resume Quick Trigger */}
      <a
        href="/Aswin.p.t_resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative p-2.5 rounded-2xl hover:bg-secondary/15 transition-all duration-300 hover:scale-125 text-foreground/80 hover:text-secondary"
        aria-label="Resume Dossier"
      >
        <FileText className="w-5 h-5" />
        <span className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-popover text-popover-foreground text-[10px] font-mono px-2 py-0.5 rounded-lg border border-border pointer-events-none whitespace-nowrap shadow-md">
          Resume (PDF)
        </span>
      </a>
    </div>
  )
}
