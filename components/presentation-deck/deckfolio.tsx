"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  Copy, 
  Check, 
  Eye, 
  ShieldCheck, 
  Brain, 
  Cpu, 
  Activity, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Workflow, 
  Layers, 
  Terminal, 
  X,
  Database,
  Radio,
  Server,
  Zap,
  Code2
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { InteractiveVisualizer } from "@/components/editorial/interactive-visualizer"
import { Button } from "@/components/ui/button"

interface SlideConfig {
  id: string
  label: string
  category: string
}

const SLIDES: SlideConfig[] = [
  { id: "overview", label: "01 Overview", category: "EXECUTIVE BRIEF" },
  { id: "drone-lab", label: "02 Drone Lab", category: "AERIAL VISION" },
  { id: "fedgraph", label: "03 FedGraph AI", category: "FEDERATED LEARNING" },
  { id: "arsenal", label: "04 Arsenal", category: "SKILLS MATRIX" },
  { id: "trajectory", label: "05 Trajectory", category: "CAREER & ACADEMIA" },
  { id: "initiatives", label: "06 Initiatives", category: "SELECTED PROJECTS" },
  { id: "contact", label: "07 Dispatch", category: "TRANSMISSION" },
]

export function Deckfolio() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [selectedArchProject, setSelectedArchProject] = useState<string | null>(null)
  const [skillCategory, setSkillCategory] = useState<"all" | "vision" | "graph" | "mlops" | "web">("all")
  
  // Touch swipe handling
  const touchStartX = useRef<number | null>(null)

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, SLIDES.length - 1))
  }, [])

  const goToPrev = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0))
  }, [])

  const goToSlide = (index: number) => {
    if (index >= 0 && index < SLIDES.length) {
      setCurrentSlide(index)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger slide switch if user is typing in an input
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        return
      }

      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault()
        goToNext()
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault()
        goToPrev()
      } else if (e.key >= "1" && e.key <= "7") {
        goToSlide(parseInt(e.key) - 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToNext, goToPrev])

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext()
      } else {
        goToPrev()
      }
    }
    touchStartX.current = null
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("aswinpt98@gmail.com")
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  // Skills Data
  const skillsData = [
    { name: "PyTorch & PyTorch Geometric", category: "graph", level: 95, desc: "Message-passing GNNs, Autograd, HeteroData" },
    { name: "YOLOv8 / v11 & TensorRT", category: "vision", level: 96, desc: "Aerial edge detection, INT8/FP16 quantization (42 FPS)" },
    { name: "CSRNet Crowd Density", category: "vision", level: 92, desc: "Dilated convolutional crowd density estimation" },
    { name: "ByteTrack & DeepSORT", category: "vision", level: 90, desc: "Aerial real-time multi-target trajectory tracking" },
    { name: "Differential Privacy (DP-SGD)", category: "graph", level: 88, desc: "Private multi-client graph defense (ε = 0.5)" },
    { name: "NVIDIA Jetson & CUDA", category: "mlops", level: 89, desc: "Onboard drone computing, hardware acceleration" },
    { name: "FastAPI & Triton Inference", category: "mlops", level: 94, desc: "Asynchronous high-throughput ML microservices" },
    { name: "Docker & CI/CD Pipelines", category: "mlops", level: 90, desc: "Reproducible containerized edge model runtime" },
    { name: "Next.js, React & TypeScript", category: "web", level: 86, desc: "Interactive presentation apps & scientific tooling" },
    { name: "Tailwind CSS & Canvas API", category: "web", level: 90, desc: "Fluid responsive UI, hardware-accelerated canvas" },
  ]

  const filteredSkills = skillCategory === "all" 
    ? skillsData 
    : skillsData.filter(s => s.category === skillCategory)

  // Projects Data
  const projects = [
    {
      id: "fedgraph-shield",
      title: "FedGraph-Shield",
      tagline: "Privacy-Preserving Federated GNN for Fraud Detection",
      metrics: "94.8% Detection Rate • ε=0.5 DP Budget • 0 Leakage",
      desc: "Cross-institutional graph neural network system enabling distributed banking nodes to detect multi-bank fraud syndicates without sharing raw proprietary customer data.",
      stack: ["PyTorch Geometric", "Differential Privacy", "Homomorphic Encryption", "FastAPI", "Docker"],
      hasArch: true,
      link: "https://github.com/aswinpt/fedgraph-shield",
    },
    {
      id: "drone-vision-intel",
      title: "Drone Suspicious Object Detection",
      tagline: "Edge AI Aerial Vision & Crowd Density Pipeline",
      metrics: "42 FPS on Jetson Orin • 96.2% mAP50 • Sub-25ms Latency",
      desc: "Autonomous UAV edge surveillance pipeline combining fine-tuned aerial YOLOv8 models with CSRNet dilated convolutions for real-time weapon recognition and dense crowd counts.",
      stack: ["YOLOv8", "CSRNet", "ByteTrack", "TensorRT", "Jetson Orin Nano"],
      hasArch: true,
      link: "https://github.com/aswinpt",
    },
    {
      id: "fmri-connectome",
      title: "Dynamic Functional Connectome",
      tagline: "Spatiotemporal fMRI Brain Graph Analysis using BrainGNN",
      metrics: "1,200 HCP Subjects • 89.4% State Acc • Neuro Biomarkers",
      desc: "High-dimensional resting-state 4D fMRI brain graph analysis identifying topological functional connectivity networks and cognitive state biomarkers.",
      stack: ["BrainGNN", "PyTorch", "fMRI Nilearn", "SciPy", "Graph Theory"],
      hasArch: false,
      link: "https://github.com/aswinpt",
    },
    {
      id: "pose-morphometry",
      title: "Real-Time 3D Human Pose & Morphometry",
      tagline: "Edge Biomechanical Analysis with SMPL Body Models",
      metrics: "30+ FPS Edge • 3D Joint Kinematics • Zero Calibration",
      desc: "Markerless 3D body pose estimation and spatial morphometric tracking from monocular RGB camera feeds for ergonomic risk analysis.",
      stack: ["MediaPipe", "SMPL Models", "Python", "OpenCV", "Three.js"],
      hasArch: false,
      link: "https://github.com/aswinpt",
    },
  ]

  const progressPercent = ((currentSlide + 1) / SLIDES.length) * 100

  return (
    <div 
      className="h-[100dvh] w-screen overflow-hidden flex flex-col bg-background text-foreground select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Presentation Progress Strip */}
      <div className="w-full bg-muted/40 h-1">
        <div 
          className="bg-primary h-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Top Header & Slide Navigation Pills */}
      <header className="h-14 sm:h-16 border-b border-border bg-card/60 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary font-mono text-xs">
            AP
          </div>
          <div>
            <span className="font-heading font-bold text-xs sm:text-sm tracking-tight">
              Aswin P T
            </span>
            <span className="hidden md:inline ml-2 text-[11px] font-mono text-muted-foreground">
              Pitch Deckfolio
            </span>
          </div>
        </div>

        {/* Slide Quick Jump Pills */}
        <nav className="hidden lg:flex items-center gap-1">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(idx)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                currentSlide === idx
                  ? "bg-primary text-white font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {slide.label}
            </button>
          ))}
        </nav>

        {/* Right Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/aswin_pt_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono border border-border bg-card hover:bg-muted text-foreground transition-all"
          >
            <Download className="w-3.5 h-3.5 text-primary" />
            <span className="hidden sm:inline">Resume</span>
          </a>

          <ThemeToggle />
        </div>
      </header>

      {/* Main Slide Stage (Fills Viewport, Internal Scroll on Small Heights) */}
      <main className="flex-1 overflow-hidden relative p-3 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="w-full max-w-6xl h-full flex flex-col justify-center">

          {/* ========================================================
              SLIDE 01: Executive Overview / Pitch Intro
              ======================================================== */}
          {currentSlide === 0 && (
            <div className="deck-scroll overflow-y-auto max-h-full py-2 space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold px-2 py-0.5 rounded bg-primary/10">
                  Slide 01 • Executive Summary
                </span>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available for Research / Roles
                </span>
              </div>

              <div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-foreground leading-[1.1]">
                  Engineering Autonomous Drone Vision & Privacy-Preserving AI
                </h1>
                <p className="mt-3 text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl leading-relaxed">
                  I am <strong className="text-foreground">Aswin P T</strong>, an AI/ML Engineer and Graduate Researcher specializing in edge computer vision for autonomous UAVs, federated graph neural networks with differential privacy, and spatiotemporal neuroimaging.
                </p>
              </div>

              {/* 4 Keynote Metric Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="deck-card p-4 space-y-1">
                  <span className="text-2xl sm:text-3xl font-heading font-extrabold text-primary">
                    42 FPS
                  </span>
                  <p className="text-xs font-mono text-muted-foreground">
                    Jetson Orin TensorRT Edge Inference
                  </p>
                </div>

                <div className="deck-card p-4 space-y-1">
                  <span className="text-2xl sm:text-3xl font-heading font-extrabold text-secondary">
                    ε = 0.5
                  </span>
                  <p className="text-xs font-mono text-muted-foreground">
                    Differential Privacy Fraud Defense
                  </p>
                </div>

                <div className="deck-card p-4 space-y-1">
                  <span className="text-2xl sm:text-3xl font-heading font-extrabold text-accent">
                    1,200
                  </span>
                  <p className="text-xs font-mono text-muted-foreground">
                    HCP Subjects fMRI Connectome
                  </p>
                </div>

                <div className="deck-card p-4 space-y-1">
                  <span className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground">
                    8.08
                  </span>
                  <p className="text-xs font-mono text-muted-foreground">
                    CGPA • M.Sc Machine Intelligence
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  onClick={goToNext}
                  className="bg-primary hover:bg-primary/90 text-white font-mono text-xs px-5 py-2 rounded-md flex items-center gap-2"
                >
                  <span>Launch Drone Vision Lab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>

                <a
                  href="https://github.com/aswinpt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-mono border border-border bg-card hover:bg-muted text-foreground transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>

                <a
                  href="https://linkedin.com/in/aswinpt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-mono border border-border bg-card hover:bg-muted text-foreground transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-mono border border-border bg-card hover:bg-muted text-foreground transition-colors"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? "Copied" : "aswinpt98@gmail.com"}</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              SLIDE 02: Aerial Drone Vision Lab (Live Interactive Simulation)
              ======================================================== */}
          {currentSlide === 1 && (
            <div className="deck-scroll overflow-y-auto max-h-full py-2 space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold px-2 py-0.5 rounded bg-primary/10">
                  Slide 02 • Aerial Drone Vision Lab
                </span>
                <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
                  Interactive Simulator
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Left Description */}
                <div className="lg:col-span-5 space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                    Real-Time UAV Threat Detection & Crowd Density
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Mounted on autonomous drones, this pipeline performs real-time suspicious object detection, weapon recognition, and dilated convolution crowd density estimation at 42 FPS on NVIDIA Jetson Orin Nano edge computers.
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-xs text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Custom aerial-perspective YOLOv8x fine-tuned on UAV footage</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>CSRNet dilated convolutions for continuous crowd density heatmaps</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>ByteTrack multi-object tracking resilient to yaw jitter</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/40 border border-border text-xs font-mono space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Inference Speed:</span>
                      <span className="font-bold text-emerald-500">42 FPS (INT8 TensorRT)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Accuracy:</span>
                      <span className="font-bold text-primary">96.2% mAP50</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Latency:</span>
                      <span className="font-bold text-foreground">Sub-25ms</span>
                    </div>
                  </div>
                </div>

                {/* Right Interactive Visualizer */}
                <div className="lg:col-span-7">
                  <InteractiveVisualizer />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              SLIDE 03: FedGraph-Shield Distributed Intelligence
              ======================================================== */}
          {currentSlide === 2 && (
            <div className="deck-scroll overflow-y-auto max-h-full py-2 space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold px-2 py-0.5 rounded bg-primary/10">
                  Slide 03 • FedGraph-Shield
                </span>
                <button
                  onClick={() => setSelectedArchProject("fedgraph-shield")}
                  className="text-xs font-mono text-primary hover:underline flex items-center gap-1"
                >
                  <Workflow className="w-3.5 h-3.5" />
                  <span>Inspect Architecture Blueprint</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Left Description */}
                <div className="lg:col-span-5 space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                    Privacy-Preserving Federated GNN for Fraud Defense
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Decentralized graph intelligence enabling 5 independent banking institutions to train cross-bank money laundering detection models collaboratively without exposing sensitive customer transaction records.
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-xs text-foreground">
                      <ShieldCheck className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      <span>Formal (ε=0.5, δ=10⁻⁵) Differential Privacy via Gaussian perturbation</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-foreground">
                      <ShieldCheck className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      <span>Sybil attack resilient aggregator purging malicious gradient poison</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-foreground">
                      <ShieldCheck className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      <span>Zero raw data exchange across institutional firewalls</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/40 border border-border text-xs font-mono space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Detection AUC:</span>
                      <span className="font-bold text-primary">94.8% Cross-Bank AUC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Privacy Guarantee:</span>
                      <span className="font-bold text-emerald-500">Mathematically Proven (ε=0.5)</span>
                    </div>
                  </div>
                </div>

                {/* Right Interactive Visualizer (FedGraph Mode) */}
                <div className="lg:col-span-7">
                  <InteractiveVisualizer />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              SLIDE 04: Technical Arsenal & Skills Matrix
              ======================================================== */}
          {currentSlide === 3 && (
            <div className="deck-scroll overflow-y-auto max-h-full py-2 space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold px-2 py-0.5 rounded bg-primary/10 w-fit">
                  Slide 04 • Technical Arsenal
                </span>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-1 text-xs font-mono">
                  {[
                    { id: "all", label: "All" },
                    { id: "vision", label: "Vision" },
                    { id: "graph", label: "GNN & DP" },
                    { id: "mlops", label: "MLOps & Edge" },
                    { id: "web", label: "Fullstack" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSkillCategory(cat.id as any)}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        skillCategory === cat.id 
                          ? "bg-primary text-white font-medium" 
                          : "border border-border bg-card text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                  Applied Methodologies & Technical Matrix
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Benchmarked proficiencies across deep learning research, edge deployment, and production engineering.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredSkills.map((skill, idx) => (
                  <div key={idx} className="deck-card p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-semibold text-xs sm:text-sm text-foreground">
                        {skill.name}
                      </span>
                      <span className="text-xs font-mono text-primary font-bold">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-primary h-full rounded-full transition-all duration-500" 
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-muted-foreground font-mono">
                      {skill.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              SLIDE 05: Career Trajectory & Education
              ======================================================== */}
          {currentSlide === 4 && (
            <div className="deck-scroll overflow-y-auto max-h-full py-2 space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold px-2 py-0.5 rounded bg-primary/10 w-fit">
                Slide 05 • Career Trajectory
              </span>

              <div>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                  Industry Engineering & Academic Pedigree
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Demonstrated record in production computer vision, medical intelligence, and machine intelligence research.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Quantumweave */}
                <div className="deck-card p-5 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                      Dec 2024 — Present
                    </span>
                    <h3 className="font-heading font-bold text-base text-foreground">
                      Research Assistant
                    </h3>
                    <p className="text-xs font-mono text-muted-foreground">
                      Quantumweave Intelligence • Trivandrum
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                      Directing the aerial drone suspicious object detection subsystem. Formulating aerial datasets, benchmarking ByteTrack vs OC-SORT, and quantizing models to TensorRT INT8 for 42 FPS execution on Jetson Orin Nano.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/60">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground">YOLOv8</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground">CSRNet</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground">Jetson Orin 42 FPS</span>
                  </div>
                </div>

                {/* Synbrains */}
                <div className="deck-card p-5 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-secondary bg-secondary/10 px-2 py-0.5 rounded">
                      May 2024 — Nov 2024
                    </span>
                    <h3 className="font-heading font-bold text-base text-foreground">
                      AI Engineer Intern
                    </h3>
                    <p className="text-xs font-mono text-muted-foreground">
                      Synbrains Technologies • Kerala
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                      Constructed high-throughput FastAPI microservices and inference services for clinical diagnostic workflows. Containerized multi-model serving backends with Docker and Redis queues.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/60">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground">FastAPI</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground">Docker</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground">PyTorch Inference</span>
                  </div>
                </div>

                {/* DUK Degree */}
                <div className="deck-card p-5 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      2023 — 2025
                    </span>
                    <h3 className="font-heading font-bold text-base text-foreground">
                      M.Sc in Machine Intelligence
                    </h3>
                    <p className="text-xs font-mono text-muted-foreground">
                      Digital University Kerala (CGPA: 8.08)
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                      Advanced curriculum in Geometric Deep Learning, Graph Neural Networks, Bayesian Learning, and Computer Vision. Master's thesis on federated graph neural networks and privacy defenses.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/60">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground">CGPA 8.08</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground">GNN Thesis</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              SLIDE 06: Selected Engineering Initiatives
              ======================================================== */}
          {currentSlide === 5 && (
            <div className="deck-scroll overflow-y-auto max-h-full py-2 space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold px-2 py-0.5 rounded bg-primary/10 w-fit">
                Slide 06 • Selected Research Projects
              </span>

              <div>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                  Architected Systems & Verified Codebases
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Empirical benchmarks and technical repositories created for edge AI and federated systems.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="deck-card p-5 space-y-3 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-heading font-bold text-base text-foreground">
                          {proj.title}
                        </h3>
                        {proj.hasArch && (
                          <button
                            onClick={() => setSelectedArchProject(proj.id)}
                            className="text-[11px] font-mono text-primary hover:underline flex items-center gap-1"
                          >
                            <Workflow className="w-3 h-3" />
                            <span>Blueprint</span>
                          </button>
                        )}
                      </div>
                      <p className="text-xs font-mono text-primary font-medium">
                        {proj.tagline}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                        {proj.desc}
                      </p>
                      <p className="text-[11px] font-mono text-muted-foreground bg-muted/40 p-1.5 rounded border border-border">
                        {proj.metrics}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-border flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {proj.stack.slice(0, 3).map((s, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground">
                            {s}
                          </span>
                        ))}
                      </div>

                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-foreground hover:text-primary transition-colors"
                      >
                        <Github className="w-3 h-3" />
                        <span>Source</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              SLIDE 07: Direct Transmission / Contact
              ======================================================== */}
          {currentSlide === 6 && (
            <div className="deck-scroll overflow-y-auto max-h-full py-2 space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold px-2 py-0.5 rounded bg-primary/10 w-fit">
                Slide 07 • Dispatch Transmission
              </span>

              <div>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                  Connect & Collaborate
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Available for full-time AI/ML engineering roles, drone vision research assistantships, and technical consulting.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Contact Form */}
                <div className="lg:col-span-7 deck-card p-5 space-y-4">
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault()
                      const form = e.target as HTMLFormElement
                      const subject = (form.elements.namedItem("subject") as HTMLInputElement).value
                      const body = (form.elements.namedItem("message") as HTMLTextAreaElement).value
                      window.location.href = `mailto:aswinpt98@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
                    }}
                    className="space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-foreground">Name / Lab</label>
                        <input
                          type="text"
                          required
                          name="sender"
                          placeholder="Dr. Jane Doe / AI Lab"
                          className="w-full px-3 py-1.5 rounded-md border border-border bg-background text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-foreground">Subject</label>
                        <input
                          type="text"
                          required
                          name="subject"
                          placeholder="Research Opportunity"
                          className="w-full px-3 py-1.5 rounded-md border border-border bg-background text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-foreground">Message</label>
                      <textarea
                        rows={3}
                        required
                        name="message"
                        placeholder="Outline your project scope or role inquiry..."
                        className="w-full px-3 py-1.5 rounded-md border border-border bg-background text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-white font-mono text-xs py-2 rounded-md flex items-center justify-center gap-2"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Transmit Message via Email</span>
                    </Button>
                  </form>
                </div>

                {/* Direct Channels */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="deck-card p-4 space-y-2">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">Direct Email</span>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-foreground font-medium">aswinpt98@gmail.com</span>
                      <button
                        onClick={handleCopyEmail}
                        className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                      >
                        {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="deck-card p-4 space-y-2">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">Location & Affiliation</span>
                    <p className="text-xs font-mono text-foreground">
                      Trivandrum, Kerala, India • Quantumweave Intelligence
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="https://github.com/aswinpt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="deck-card p-3 flex items-center justify-center gap-2 text-xs font-mono hover:border-primary/50 transition-colors"
                    >
                      <Github className="w-4 h-4 text-foreground" />
                      <span>GitHub</span>
                    </a>

                    <a
                      href="https://linkedin.com/in/aswinpt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="deck-card p-3 flex items-center justify-center gap-2 text-xs font-mono hover:border-primary/50 transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-primary" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Bottom Keynote Navigation Dock */}
      <footer className="h-14 sm:h-16 border-t border-border bg-card/60 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between shrink-0 z-30">
        {/* Slide Counter */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-primary">
            {String(currentSlide + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            / {String(SLIDES.length).padStart(2, "0")}
          </span>
          <span className="hidden md:inline ml-2 text-[11px] font-mono text-muted-foreground">
            • {SLIDES[currentSlide].category}
          </span>
        </div>

        {/* Slide Indicator Dots */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx
                  ? "w-6 sm:w-8 bg-primary"
                  : "w-1.5 sm:w-2 bg-muted hover:bg-muted-foreground"
              }`}
              title={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Previous & Next Control Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={goToPrev}
            disabled={currentSlide === 0}
            className="p-1.5 sm:p-2 rounded-md border border-border bg-card hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all text-foreground"
            title="Previous Slide (← key)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={goToNext}
            disabled={currentSlide === SLIDES.length - 1}
            className="p-1.5 sm:p-2 rounded-md border border-border bg-card hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all text-foreground"
            title="Next Slide (→ key)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>

      {/* ========================================================
          ARCHITECTURE SPECIFICATION MODAL
          ======================================================== */}
      {selectedArchProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="deck-card w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider">
                  ARCHITECTURE SPECIFICATION
                </span>
                <h3 className="font-heading font-bold text-lg text-foreground">
                  {selectedArchProject === "fedgraph-shield" 
                    ? "FedGraph-Shield Distributed Architecture" 
                    : "Drone Vision Telemetry & Detection Pipeline"}
                </h3>
              </div>
              <button
                onClick={() => setSelectedArchProject(null)}
                className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {selectedArchProject === "fedgraph-shield" ? (
              <div className="space-y-3 text-xs text-muted-foreground">
                <div className="p-3 rounded-lg bg-muted/40 font-mono text-xs space-y-1 border border-border">
                  <div className="font-bold text-primary flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5" />
                    1. Isolated Financial Institutional Enclaves
                  </div>
                  <p>
                    Each bank node maintains local heterogeneous transaction graph G_i. Customer records and edge weights are strictly contained behind institutional firewalls.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-muted/40 font-mono text-xs space-y-1 border border-border">
                  <div className="font-bold text-secondary flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    2. DP-SGD Noise Perturbation Engine
                  </div>
                  <p>
                    Local model gradients are clipped to L2 norm threshold C, followed by injection of calibrated Gaussian noise N(0, σ² C² I) to mathematically guarantee (ε=0.5, δ=10⁻⁵) privacy budget.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-muted/40 font-mono text-xs space-y-1 border border-border">
                  <div className="font-bold text-accent flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5" />
                    3. Byzantine / Sybil Resilient Aggregator
                  </div>
                  <p>
                    Central coordinator computes FedAvg update with cosine similarity anomaly filtering to neutralize malicious gradient poisoning attempts from compromised clients.
                  </p>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    onClick={() => setSelectedArchProject(null)}
                    className="font-mono text-xs bg-primary text-white"
                  >
                    Close Specification
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-muted-foreground">
                <div className="p-3 rounded-lg bg-muted/40 font-mono text-xs space-y-1 border border-border">
                  <div className="font-bold text-primary flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    1. Aerial Optical Stream & Stabilization
                  </div>
                  <p>
                    4K UAV optical feed with IMU gyro stabilization and geometric lens distortion correction.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-muted/40 font-mono text-xs space-y-1 border border-border">
                  <div className="font-bold text-secondary flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    2. Dual INT8 TensorRT Engine on Jetson
                  </div>
                  <p>
                    Parallel inference: YOLOv8 for discrete suspicious targets running concurrently with CSRNet dilated convolutions for crowd density heatmaps at 42 FPS.
                  </p>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    onClick={() => setSelectedArchProject(null)}
                    className="font-mono text-xs bg-primary text-white"
                  >
                    Close Specification
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
