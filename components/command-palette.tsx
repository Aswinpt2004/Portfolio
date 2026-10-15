"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Command,
  X,
  FileText,
  Eye,
  Cpu,
  Layers,
  Briefcase,
  Mail,
  Sun,
  Moon,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { useTheme } from "next-themes"

interface Props {
  isOpen: boolean
  onClose: () => void
  onSelectAction?: (actionId: string) => void
}

export function CommandPalette({ isOpen, onClose, onSelectAction }: Props) {
  const [query, setQuery] = useState("")
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        if (isOpen) onClose()
        else onSelectAction?.("open-palette")
      }
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, onSelectAction])

  if (!isOpen) return null

  const commands = [
    {
      id: "drone",
      title: "Launch Drone Vision Simulator",
      category: "Interactive Sandbox",
      icon: Eye,
      action: () => {
        const el = document.getElementById("workbench")
        el?.scrollIntoView({ behavior: "smooth" })
        onSelectAction?.("switch-tab-drone")
        onClose()
      },
    },
    {
      id: "fedgraph",
      title: "Run FedGraph-Shield Fraud Ring Attack",
      category: "Interactive Sandbox",
      icon: Layers,
      action: () => {
        const el = document.getElementById("workbench")
        el?.scrollIntoView({ behavior: "smooth" })
        onSelectAction?.("switch-tab-fedgraph")
        onClose()
      },
    },
    {
      id: "terminal",
      title: "Open Neural Code Terminal",
      category: "Interactive Sandbox",
      icon: Cpu,
      action: () => {
        const el = document.getElementById("workbench")
        el?.scrollIntoView({ behavior: "smooth" })
        onSelectAction?.("switch-tab-terminal")
        onClose()
      },
    },
    {
      id: "resume-view",
      title: "View Resume Dossier (PDF)",
      category: "Credentials",
      icon: FileText,
      action: () => {
        window.open("/Aswin.p.t_resume.pdf", "_blank")
        onClose()
      },
    },
    {
      id: "theme-toggle",
      title: `Switch to ${resolvedTheme === "dark" ? "Light" : "Dark"} Mode`,
      category: "System Settings",
      icon: resolvedTheme === "dark" ? Sun : Moon,
      action: () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
        onClose()
      },
    },
    {
      id: "jump-skills",
      title: "Inspect Technical Arsenal & Bento Widgets",
      category: "Navigation",
      icon: Cpu,
      action: () => {
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })
        onClose()
      },
    },
    {
      id: "jump-projects",
      title: "Explore Deployed Projects & Architecture",
      category: "Navigation",
      icon: Layers,
      action: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
        onClose()
      },
    },
    {
      id: "jump-experience",
      title: "View Quantumweave & Synbrains Experience",
      category: "Navigation",
      icon: Briefcase,
      action: () => {
        document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })
        onClose()
      },
    },
    {
      id: "jump-contact",
      title: "Transmit Encrypted Message / Contact",
      category: "Navigation",
      icon: Mail,
      action: () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
        onClose()
      },
    },
  ]

  const filtered = commands.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 bg-background/60 backdrop-blur-md animate-in fade-in duration-150">
      <div className="os-window w-full max-w-xl shadow-2xl overflow-hidden border border-primary/30">
        {/* Search Input Bar */}
        <div className="p-4 flex items-center gap-3 border-b border-border bg-background/50">
          <Search className="w-5 h-5 text-primary shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands, simulator, projects (e.g. 'drone', 'fedgraph', 'resume')..."
            className="w-full bg-transparent text-sm sm:text-base outline-none text-foreground placeholder:text-muted-foreground font-sans"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs font-mono text-muted-foreground">
              No system command matches &quot;{query}&quot;. Try &apos;drone&apos;, &apos;resume&apos;, or &apos;theme&apos;.
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-primary/10 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </div>
                      <div className="text-[10px] font-mono text-muted-foreground">
                        {item.category}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>
              )
            })
          )}
        </div>

        {/* Footer Hint Bar */}
        <div className="px-4 py-2.5 bg-muted/40 border-t border-border flex items-center justify-between text-[11px] font-mono text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>NeuralOS Command Terminal</span>
          </div>
          <div>Press ↵ to Execute</div>
        </div>
      </div>
    </div>
  )
}
