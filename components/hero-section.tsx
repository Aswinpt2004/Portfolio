"use client"

import { Button } from "@/components/ui/button"
import { TypingAnimation } from "./typing-animation"
import {
  Github,
  Linkedin,
  Download,
  Eye,
  FileDown,
  ChevronDown,
  Sparkles,
  Command,
  ArrowDown,
  Compass,
  Cpu,
  Shield,
  Layers,
} from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { InteractiveWorkbench } from "./interactive-workbench"

interface Props {
  onOpenCommandPalette?: () => void
}

export function HeroSection({ onOpenCommandPalette }: Props) {
  const [showResumeMenu, setShowResumeMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const handleViewResume = () => {
    window.open("/Aswin.p.t_resume.pdf", "_blank")
    setShowResumeMenu(false)
  }

  const handleDownloadResume = () => {
    const link = document.createElement("a")
    link.href = "/Aswin.p.t_resume.pdf"
    link.download = "Aswin.p.t_resume.pdf"
    link.click()
    setShowResumeMenu(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowResumeMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <section id="home" className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto w-full">
        {/* Top OS Header Capsule */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full os-window text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-foreground">RESEARCH ASSISTANT</span>
            <span className="text-muted-foreground">@</span>
            <span className="text-primary font-bold">QUANTUMWEAVE INTELLIGENCE</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span>PRESS</span>
            <kbd
              onClick={onOpenCommandPalette}
              className="px-2 py-0.5 rounded bg-muted text-foreground border border-border cursor-pointer hover:bg-primary hover:text-white transition-colors"
            >
              ⌘K
            </kbd>
            <span>FOR COMMAND TERMINAL</span>
          </div>
        </div>

        {/* Hero Title & Identity */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 font-heading leading-tight">
            <span className="text-foreground">Hello, I&apos;m </span>
            <span className="os-gradient-text">Aswin P T</span>
          </h1>

          <div className="text-lg sm:text-2xl lg:text-3xl font-mono text-muted-foreground mb-4 min-h-[40px] flex items-center justify-center">
            <TypingAnimation
              texts={[
                "AI/ML Engineer & Researcher",
                "Drone Vision & Aerial Surveillance",
                "Federated Graph Learning (GNNs)",
                "Scalable Deep Learning Backends",
              ]}
              className="text-primary font-semibold"
            />
          </div>

          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            M.Sc. Machine Intelligence Student at Digital University Kerala (DUK). Pioneering computer vision for autonomous aerial drones and privacy-preserving federated graph architectures.
          </p>

          {/* Launcher Buttons */}
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center items-center mt-6">
            <div className="relative" ref={menuRef}>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
                onClick={() => setShowResumeMenu(!showResumeMenu)}
              >
                <Download className="mr-2 h-4 w-4" />
                Resume Dossier
                <ChevronDown className="ml-1.5 h-4 w-4 opacity-80" />
              </Button>

              {showResumeMenu && (
                <div className="absolute top-full mt-2 left-0 sm:left-auto sm:right-0 w-56 os-window rounded-xl shadow-2xl border border-primary/30 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <button
                    onClick={handleViewResume}
                    className="w-full px-4 py-3 text-left hover:bg-primary/10 transition-colors flex items-center gap-2.5 text-sm font-medium border-b border-border text-foreground"
                  >
                    <Eye className="h-4 w-4 text-primary" />
                    <span>View Resume (PDF)</span>
                  </button>
                  <button
                    onClick={handleDownloadResume}
                    className="w-full px-4 py-3 text-left hover:bg-primary/10 transition-colors flex items-center gap-2.5 text-sm font-medium text-foreground"
                  >
                    <FileDown className="h-4 w-4 text-secondary" />
                    <span>Download PDF</span>
                  </button>
                </div>
              )}
            </div>

            <Button
              size="lg"
              variant="outline"
              className="os-window rounded-xl text-foreground hover:text-primary transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="https://github.com/Aswinpt2004" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="os-window rounded-xl text-foreground hover:text-[#0077b5] transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="https://linkedin.com/in/aswinpt2004" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </a>
            </Button>

            <Button
              size="lg"
              variant="secondary"
              onClick={onOpenCommandPalette}
              className="os-window hover:bg-primary/15 rounded-xl text-foreground font-medium transition-all duration-300 hover:scale-105"
            >
              <Command className="mr-2 h-4 w-4 text-primary" />
              ⌘K Commands
            </Button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* FLAGSHIP INTERACTIVE AI WORKBENCH WINDOW                 */}
        {/* ======================================================== */}
        <div id="workbench" className="w-full max-w-4xl mx-auto my-6 scroll-mt-24">
          <InteractiveWorkbench initialTab="drone" />
        </div>

        {/* 4 Interactive OS Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mt-8">
          <div className="os-window p-4 rounded-xl flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">Drone Vision</div>
              <div className="text-[11px] text-muted-foreground font-mono">CSRNet & YOLO</div>
            </div>
          </div>

          <div className="os-window p-4 rounded-xl flex items-center gap-3">
            <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">FedGraph-Shield</div>
              <div className="text-[11px] text-muted-foreground font-mono">Differential Privacy</div>
            </div>
          </div>

          <div className="os-window p-4 rounded-xl flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10 text-accent">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">Connectome fMRI</div>
              <div className="text-[11px] text-muted-foreground font-mono">Graph Attention Net</div>
            </div>
          </div>

          <div className="os-window p-4 rounded-xl flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">AI Backends</div>
              <div className="text-[11px] text-muted-foreground font-mono">FastAPI & PyTorch</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => scrollTo("about")}
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 font-mono text-xs"
          >
            <span>SCROLL TO EXPLORE BENTO ARSENAL</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  )
}
