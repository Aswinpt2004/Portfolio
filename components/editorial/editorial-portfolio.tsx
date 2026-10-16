"use client"

import React, { useState, useEffect } from "react"
import { 
  Terminal, 
  Cpu, 
  Brain, 
  Eye, 
  ShieldCheck, 
  Layers, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  FileText, 
  ArrowUpRight, 
  Sparkles, 
  ChevronRight, 
  Check, 
  Copy, 
  Radio, 
  Activity, 
  X, 
  Code2, 
  Database, 
  Server, 
  Smartphone,
  Navigation,
  CheckCircle2,
  Workflow
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { InteractiveVisualizer } from "@/components/editorial/interactive-visualizer"
import { Button } from "@/components/ui/button"

export function EditorialPortfolio() {
  const [activeSection, setActiveSection] = useState("focus")
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [selectedArchProject, setSelectedArchProject] = useState<string | null>(null)
  const [skillCategory, setSkillCategory] = useState<"all" | "vision" | "graph" | "mlops" | "web">("all")

  // Copy email handler
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("aswinpt98@gmail.com")
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  // Scroll spy for chapters
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["focus", "arsenal", "trajectory", "initiatives", "dispatch"]
      const scrollPos = window.scrollY + 200

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Skills Data
  const skillsData = [
    { name: "PyTorch & PyTorch Geometric", category: "graph", level: 95, desc: "GNNs, Custom message-passing, Autograd" },
    { name: "YOLOv8 / YOLOv11 & TensorRT", category: "vision", level: 96, desc: "Aerial edge detection, INT8/FP16 quantization" },
    { name: "CSRNet Crowd Density", category: "vision", level: 92, desc: "Dilated CNNs, crowd density heatmaps" },
    { name: "ByteTrack & DeepSORT", category: "vision", level: 90, desc: "Real-time aerial multi-object tracking" },
    { name: "Differential Privacy & FedAvg", category: "graph", level: 88, desc: "Private multi-client graph defense (ε=0.5)" },
    { name: "NVIDIA Jetson & CUDA", category: "mlops", level: 89, desc: "Edge AI hardware acceleration, 42 FPS pipeline" },
    { name: "FastAPI & Triton Inference", category: "mlops", level: 94, desc: "High-throughput asynchronous ML microservices" },
    { name: "Docker & CI/CD Pipelines", category: "mlops", level: 90, desc: "Containerized reproducible model deployment" },
    { name: "Next.js, React & TypeScript", category: "web", level: 86, desc: "Modern interactive scientific web applications" },
    { name: "Tailwind CSS & Canvas API", category: "web", level: 90, desc: "Fluid responsive UI and interactive canvas data viz" },
  ]

  const filteredSkills = skillCategory === "all" 
    ? skillsData 
    : skillsData.filter(s => s.category === skillCategory)

  // Projects Data
  const projects = [
    {
      id: "fedgraph-shield",
      title: "FedGraph-Shield: Privacy-Preserving Federated GNN for Fraud Detection",
      subtitle: "Multi-Institutional Financial Security via Differential Privacy & GNNs",
      badge: "Federated Learning & GNNs",
      metrics: "94.8% Detection Rate • ε=0.5 Privacy Budget • 0 Client Data Leakage",
      desc: "Architected a decentralized graph intelligence system enabling financial institutions to collaboratively identify cross-bank money laundering and fraudulent syndicates without revealing proprietary customer transactions.",
      highlights: [
        "Constructed decentralized graph neural networks across 5 independent virtual banking nodes using PyTorch Geometric.",
        "Engineered formal Differential Privacy (DP-SGD) with gradient perturbation, mathematically guaranteeing confidentiality.",
        "Built Sybil attack resilient consensus aggregator that flags and purges malicious gradient poison attempts.",
      ],
      stack: ["PyTorch Geometric", "Differential Privacy", "Homomorphic Encryption", "FastAPI", "Docker"],
      codeLink: "https://github.com/aswinpt/fedgraph-shield",
      hasArch: true,
    },
    {
      id: "drone-vision-intel",
      title: "Drone Suspicious Object & Aerial Density Estimation Pipeline",
      subtitle: "Autonomous Real-Time Aerial Threat Detection on NVIDIA Jetson Edge",
      badge: "Aerial Computer Vision",
      metrics: "42 FPS on Jetson Orin • 96.2% mAP50 • Sub-25ms Latency",
      desc: "Developed an end-to-end edge AI vision system mounted on UAV drones for high-altitude suspicious object classification, concealed weapon recognition, and dense crowd counting.",
      highlights: [
        "Fine-tuned custom aerial YOLOv8 models on drone perspective datasets with geometric augmentations.",
        "Integrated CSRNet dilated convolutional networks to generate continuous density maps over crowded venues.",
        "Compiled models using TensorRT with INT8 quantization, achieving 42 FPS on edge Jetson hardware.",
      ],
      stack: ["YOLOv8", "CSRNet", "ByteTrack", "TensorRT", "Jetson Orin Nano", "OpenCV"],
      codeLink: "https://github.com/aswinpt",
      hasArch: true,
    },
    {
      id: "fmri-connectome",
      title: "Dynamic Functional Connectome & Cognitive State Prediction",
      subtitle: "Spatiotemporal fMRI Brain Graph Analysis using BrainGNN",
      badge: "Neuroimaging AI",
      metrics: "1,200 HCP Subjects • 89.4% State Accuracy • Brain Network Biomarkers",
      desc: "Investigated dynamic functional connectivity fluctuations in human brain scans, translating high-dimensional 4D fMRI resting-state signals into topological brain graph representations.",
      highlights: [
        "Transformed functional MRI blood-oxygen-level-dependent (BOLD) signals into correlation graph adjacency matrices.",
        "Formulated BrainGNN architectures with ROI-aware pooling to pinpoint neurological hubs governing cognitive tasks.",
        "Discovered key biomarkers correlating with working memory and attention processing across HCP datasets.",
      ],
      stack: ["BrainGNN", "PyTorch", "fMRI Analysis", "Nilearn", "SciPy"],
      codeLink: "https://github.com/aswinpt",
      hasArch: false,
    },
    {
      id: "pose-morphometry",
      title: "Real-Time 3D Human Pose & Morphometry Estimation",
      subtitle: "Biomechanical Edge Analysis using MediaPipe & SMPL Body Models",
      badge: "Edge Biometrics",
      metrics: "30+ FPS CPU/Edge • 3D Joint Kinematics • Zero Calibration Required",
      desc: "Engineered a markerless 3D body pose estimation and spatial morphometric tracking pipeline from monocular RGB camera streams for gait assessment and ergonomic risk analysis.",
      highlights: [
        "Implemented 33-point 3D keypoint landmark extraction with anatomical kinematic constraints.",
        "Fitted parametric SMPL mesh topology to extract dimensional anthropometric measurements.",
        "Deployed as an ultra-lightweight client-side inference worker running in browser and edge compute.",
      ],
      stack: ["MediaPipe", "SMPL Models", "Python", "OpenCV", "Three.js"],
      codeLink: "https://github.com/aswinpt",
      hasArch: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Top Editorial Navigation */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary font-mono text-sm">
              AP
            </div>
            <div>
              <span className="font-heading font-bold text-sm tracking-tight sm:text-base">
                Aswin P T
              </span>
              <span className="hidden md:inline-block ml-2 text-xs text-muted-foreground font-mono">
                / AI/ML Engineer & Drone Vision Researcher
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-1 text-xs font-mono">
              <button 
                onClick={() => scrollTo("focus")}
                className={`px-3 py-1.5 rounded-md transition-colors ${activeSection === "focus" ? "text-primary font-bold bg-primary/10" : "text-muted-foreground hover:text-foreground"}`}
              >
                01 Focus
              </button>
              <button 
                onClick={() => scrollTo("arsenal")}
                className={`px-3 py-1.5 rounded-md transition-colors ${activeSection === "arsenal" ? "text-primary font-bold bg-primary/10" : "text-muted-foreground hover:text-foreground"}`}
              >
                02 Arsenal
              </button>
              <button 
                onClick={() => scrollTo("trajectory")}
                className={`px-3 py-1.5 rounded-md transition-colors ${activeSection === "trajectory" ? "text-primary font-bold bg-primary/10" : "text-muted-foreground hover:text-foreground"}`}
              >
                03 Trajectory
              </button>
              <button 
                onClick={() => scrollTo("initiatives")}
                className={`px-3 py-1.5 rounded-md transition-colors ${activeSection === "initiatives" ? "text-primary font-bold bg-primary/10" : "text-muted-foreground hover:text-foreground"}`}
              >
                04 Initiatives
              </button>
              <button 
                onClick={() => scrollTo("dispatch")}
                className={`px-3 py-1.5 rounded-md transition-colors ${activeSection === "dispatch" ? "text-primary font-bold bg-primary/10" : "text-muted-foreground hover:text-foreground"}`}
              >
                05 Contact
              </button>
            </nav>

            {/* Resume Button */}
            <a 
              href="/aswin_pt_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium border border-border bg-card hover:bg-muted text-foreground transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-primary" />
              <span>Resume</span>
            </a>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Two-Column Editorial Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ========================================================
              LEFT COLUMN: Sticky Identity & Interactive Visualizer
              ======================================================== */}
          <aside className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            
            {/* Identity Card */}
            <div className="editorial-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="chapter-label">RESEARCH DOSSIER • 2026</span>
                <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available for Research / Roles
                </span>
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight text-foreground">
                  Aswin P T
                </h1>
                <p className="mt-1 text-sm font-medium text-primary font-mono">
                  AI/ML Engineer & Drone Vision Researcher
                </p>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                Specializing in real-time edge computer vision for autonomous UAVs, privacy-preserving federated graph neural networks, and spatiotemporal deep neuroimaging.
              </p>

              {/* Verified Meta Info */}
              <div className="pt-2 border-t border-border/80 space-y-2 text-xs font-mono text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-medium">Current Affiliation:</span>
                  <span>Quantumweave Intelligence (RA)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-medium">Academic Pedigree:</span>
                  <span>M.Sc MI, Digital Univ. Kerala</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-medium">Location:</span>
                  <span>Trivandrum, Kerala, India</span>
                </div>
              </div>

              {/* Direct Channels */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <a
                  href="https://github.com/aswinpt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono border border-border bg-muted/40 hover:bg-muted text-foreground transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-muted-foreground" />
                </a>

                <a
                  href="https://linkedin.com/in/aswinpt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono border border-border bg-muted/40 hover:bg-muted text-foreground transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-muted-foreground" />
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono border border-border bg-muted/40 hover:bg-muted text-foreground transition-colors"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? "Copied!" : "Copy Email"}</span>
                </button>
              </div>
            </div>

            {/* Interactive Sticky Visualizer */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-mono font-medium text-foreground flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-primary" />
                  Interactive Research Simulator
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  LIVE COMPUTE
                </span>
              </div>
              <InteractiveVisualizer />
            </div>

            {/* Quick Chapter Navigation for Desktop */}
            <div className="hidden lg:block editorial-card p-4 space-y-2">
              <span className="chapter-label block text-[10px]">TABLE OF CONTENTS</span>
              <div className="space-y-1 text-xs font-mono">
                {[
                  { id: "focus", label: "01. Research Focus & Foundations" },
                  { id: "arsenal", label: "02. Technical Arsenal & Skills" },
                  { id: "trajectory", label: "03. Career Trajectory" },
                  { id: "initiatives", label: "04. Selected Research Projects" },
                  { id: "dispatch", label: "05. Dispatch Transmission" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center justify-between transition-colors ${
                      activeSection === item.id 
                        ? "bg-primary/10 text-primary font-bold" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>{item.label}</span>
                    {activeSection === item.id && <ChevronRight className="w-3 h-3 text-primary" />}
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* ========================================================
              RIGHT COLUMN: Narrative Chapters (Smooth Vertical Flow)
              ======================================================== */}
          <div className="lg:col-span-7 space-y-16">

            {/* CHAPTER 01: Core Research Focus */}
            <section id="focus" className="space-y-6 scroll-mt-24">
              <div>
                <span className="chapter-label">CHAPTER 01</span>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mt-1">
                  Research Focus & Scientific Foundations
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  My work bridges the gap between theoretical deep learning architectures and mission-critical edge deployments, addressing three core paradigms:
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {/* Pillar 1 */}
                <div className="editorial-card p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-primary">
                      <Eye className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base text-foreground">
                        Aerial Computer Vision & Edge Systems
                      </h3>
                      <p className="text-xs font-mono text-muted-foreground">
                        YOLOv8 • CSRNet Density • ByteTrack • Jetson TensorRT
                      </p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Developing real-time aerial object detection and crowd density estimation pipelines capable of operating on resource-constrained UAV onboard computers at 42+ FPS with low latency.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted text-muted-foreground">42 FPS Inference</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted text-muted-foreground">96.2% mAP50</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted text-muted-foreground">Sub-25ms Latency</span>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="editorial-card p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-secondary">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base text-foreground">
                        Federated Learning & Graph Neural Networks
                      </h3>
                      <p className="text-xs font-mono text-muted-foreground">
                        PyTorch Geometric • Differential Privacy • Fraud Detection
                      </p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Engineering privacy-preserving multi-institutional graph intelligence. Deploying DP-SGD (Differential Privacy with ε=0.5) to train GNNs across distributed banks without raw transaction exchange.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted text-muted-foreground">ε = 0.5 DP Budget</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted text-muted-foreground">94.8% Cross-Bank AUC</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted text-muted-foreground">Sybil Resilient</span>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="editorial-card p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-accent">
                      <Brain className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base text-foreground">
                        Spatiotemporal Neuroimaging & Biometrics
                      </h3>
                      <p className="text-xs font-mono text-muted-foreground">
                        BrainGNN • fMRI Connectomes • MediaPipe 3D Kinematics
                      </p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Analyzing high-dimensional resting-state 4D fMRI brain scans to map dynamic functional connectome networks, coupled with edge 3D markerless human kinematic reconstruction.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted text-muted-foreground">1,200 HCP Subjects</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted text-muted-foreground">33-Joint 3D Kinematics</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted text-muted-foreground">89.4% State Acc</span>
                  </div>
                </div>
              </div>
            </section>

            {/* CHAPTER 02: Technical Arsenal */}
            <section id="arsenal" className="space-y-6 scroll-mt-24">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="chapter-label">CHAPTER 02</span>
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mt-1">
                    Technical Arsenal & Tools
                  </h2>
                </div>

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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredSkills.map((skill, idx) => (
                  <div key={idx} className="editorial-card p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-semibold text-sm text-foreground">
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

                    <p className="text-xs text-muted-foreground font-mono">
                      {skill.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* CHAPTER 03: Career Trajectory */}
            <section id="trajectory" className="space-y-6 scroll-mt-24">
              <div>
                <span className="chapter-label">CHAPTER 03</span>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mt-1">
                  Career Trajectory & Academic Record
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Chronological progression of research responsibilities, industrial engineering roles, and academic achievements.
                </p>
              </div>

              <div className="space-y-6 border-l-2 border-border pl-4 sm:pl-6 ml-2">
                
                {/* Position 1 */}
                <div className="relative space-y-2">
                  <div className="absolute -left-[23px] sm:-left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-primary border-4 border-background" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-heading font-bold text-base text-foreground">
                      Research Assistant — Aerial AI Systems
                    </h3>
                    <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded w-fit">
                      Dec 2024 — Present
                    </span>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground">
                    Quantumweave Intelligence • Trivandrum, India
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
                    Leading the development of the autonomous drone surveillance object detection subsystem. Formulating custom aerial datasets, benchmarking ByteTrack against OC-SORT for drone yaw vibrations, and quantizing neural networks for TensorRT on Jetson Orin Nano hardware.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted text-muted-foreground">YOLOv8 Edge</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted text-muted-foreground">CSRNet</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted text-muted-foreground">Jetson Orin 42 FPS</span>
                  </div>
                </div>

                {/* Position 2 */}
                <div className="relative space-y-2">
                  <div className="absolute -left-[23px] sm:-left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-secondary border-4 border-background" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-heading font-bold text-base text-foreground">
                      AI Engineer Intern — Medical Intelligence
                    </h3>
                    <span className="text-xs font-mono text-secondary bg-secondary/10 px-2 py-0.5 rounded w-fit">
                      May 2024 — Nov 2024
                    </span>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground">
                    Synbrains Technologies • Kerala, India
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
                    Engineered asynchronous FastAPI microservices and high-throughput inference backends for clinical healthcare classification. Optimized Docker containers and integrated Redis task queues for scalable processing.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted text-muted-foreground">FastAPI</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted text-muted-foreground">Docker</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted text-muted-foreground">PyTorch Inference</span>
                  </div>
                </div>

                {/* Academic Degree */}
                <div className="relative space-y-2">
                  <div className="absolute -left-[23px] sm:-left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-muted-foreground border-4 border-background" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-heading font-bold text-base text-foreground">
                      M.Sc in Machine Intelligence (CGPA 8.08)
                    </h3>
                    <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded w-fit">
                      2023 — 2025
                    </span>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground">
                    Digital University Kerala (formerly IIITM-K) • India
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
                    Rigorous curriculum covering Deep Learning, Geometric Deep Learning, Graph Neural Networks, Bayesian Learning, and Computer Vision. Completed master's thesis on federated graph neural networks and privacy defenses.
                  </p>
                </div>

              </div>
            </section>

            {/* CHAPTER 04: Selected Research Initiatives */}
            <section id="initiatives" className="space-y-6 scroll-mt-24">
              <div>
                <span className="chapter-label">CHAPTER 04</span>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mt-1">
                  Selected Research & Engineering Initiatives
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Deep-dives into systems with verified source repositories, architecture diagrams, and empirical benchmark evaluations.
                </p>
              </div>

              <div className="space-y-6">
                {projects.map((proj) => (
                  <article key={proj.id} className="editorial-card p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-xs font-mono font-bold text-primary px-2.5 py-0.5 rounded bg-primary/10 w-fit">
                        {proj.badge}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {proj.metrics}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-heading font-bold text-foreground">
                        {proj.title}
                      </h3>
                      <p className="text-xs font-mono text-muted-foreground mt-0.5">
                        {proj.subtitle}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {proj.desc}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 pt-1">
                      {proj.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/90">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.stack.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="pt-3 border-t border-border flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {proj.hasArch && (
                          <button
                            onClick={() => setSelectedArchProject(proj.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                          >
                            <Workflow className="w-3.5 h-3.5" />
                            <span>Inspect Architecture</span>
                          </button>
                        )}
                      </div>

                      <a
                        href={proj.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-foreground hover:text-primary transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* CHAPTER 05: Dispatch Transmission */}
            <section id="dispatch" className="space-y-6 scroll-mt-24">
              <div>
                <span className="chapter-label">CHAPTER 05</span>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mt-1">
                  Direct Transmission & Dispatch
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Open for full-time engineering roles, AI research assistantships, and consulting collaborations in computer vision and applied machine intelligence.
                </p>
              </div>

              <div className="editorial-card p-6 space-y-6">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault()
                    const form = e.target as HTMLFormElement
                    const subject = (form.elements.namedItem("subject") as HTMLInputElement).value
                    const body = (form.elements.namedItem("message") as HTMLTextAreaElement).value
                    window.location.href = `mailto:aswinpt98@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-medium text-foreground">
                        Your Name / Organization
                      </label>
                      <input 
                        type="text" 
                        required
                        name="sender"
                        placeholder="Dr. Jane Doe / AI Lab"
                        className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-medium text-foreground">
                        Subject Line
                      </label>
                      <input 
                        type="text" 
                        required
                        name="subject"
                        placeholder="Research Inquiry / Project Proposal"
                        className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-foreground">
                      Transmission Content
                    </label>
                    <textarea 
                      rows={4}
                      required
                      name="message"
                      placeholder="Outline your inquiry, opportunity, or research collaboration..."
                      className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-mono resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                      <Mail className="w-3.5 h-3.5 text-primary" />
                      <span>aswinpt98@gmail.com</span>
                    </div>

                    <Button 
                      type="submit"
                      className="bg-primary hover:bg-primary/90 text-white font-mono text-xs px-5 py-2.5 rounded-md"
                    >
                      Transmit via Mail Client
                      <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </div>
                </form>
              </div>
            </section>

            {/* Editorial Footer */}
            <footer className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
              <div>
                © {new Date().getFullYear()} Aswin P T. Curated Research Portfolio.
              </div>
              <div className="flex items-center gap-4">
                <a href="https://github.com/aswinpt" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  GitHub
                </a>
                <a href="https://linkedin.com/in/aswinpt" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  LinkedIn
                </a>
                <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-primary">
                  Top ↑
                </button>
              </div>
            </footer>

          </div>
        </div>
      </main>

      {/* ========================================================
          ARCHITECTURE INSPECTION MODAL (Drawer / Modal)
          ======================================================== */}
      {selectedArchProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="editorial-card w-full max-w-3xl max-h-[85vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <span className="chapter-label">TECHNICAL SPECIFICATION</span>
                <h3 className="font-heading font-bold text-xl text-foreground mt-0.5">
                  {selectedArchProject === "fedgraph-shield" 
                    ? "FedGraph-Shield Architecture Blueprint" 
                    : "Drone Vision Telemetry & Detection Architecture"}
                </h3>
              </div>
              <button
                onClick={() => setSelectedArchProject(null)}
                className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedArchProject === "fedgraph-shield" ? (
              <div className="space-y-4 text-xs sm:text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-muted/40 font-mono text-xs space-y-2 border border-border">
                  <div className="font-bold text-primary flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    1. Distributed Local Bank Graph Enclaves
                  </div>
                  <p>
                    Each bank node (Node A, B, C) maintains its local heterogeneous transaction graph: G_i = (V_i, E_i). No customer identity or edge features ever cross the institutional firewall.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-muted/40 font-mono text-xs space-y-2 border border-border">
                  <div className="font-bold text-secondary flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    2. Differential Privacy Perturbation Engine
                  </div>
                  <p>
                    Gradient updates g_i are bounded via L2-norm clipping: ḡ_i = g_i / max(1, ||g_i||_2 / C). Calibrated Gaussian noise N(0, σ² C² I) is injected to satisfy (ε=0.5, δ=10^-5) differential privacy guarantees.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-muted/40 font-mono text-xs space-y-2 border border-border">
                  <div className="font-bold text-accent flex items-center gap-2">
                    <Server className="w-4 h-4" />
                    3. Robust Secure Consensus Aggregator
                  </div>
                  <p>
                    Central coordinator computes FedAvg update while running cosine similarity outlier detection to identify and neutralize malicious Sybil gradient poison attacks.
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
              <div className="space-y-4 text-xs sm:text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-muted/40 font-mono text-xs space-y-2 border border-border">
                  <div className="font-bold text-primary flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    1. Aerial Optical Stream & Distortion Rectification
                  </div>
                  <p>
                    UAV 4K camera payload at 30/60 FPS. Real-time lens undistortion and pitch/yaw stabilization via IMU sensor fusion.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-muted/40 font-mono text-xs space-y-2 border border-border">
                  <div className="font-bold text-secondary flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    2. TensorRT INT8 Quantized Dual Backbone
                  </div>
                  <p>
                    Parallel inference streams: YOLOv8 for discrete target bounding boxes, running concurrently with CSRNet dilated convolutions for crowd density heatmap estimation at 42 FPS on Jetson Orin Nano.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-muted/40 font-mono text-xs space-y-2 border border-border">
                  <div className="font-bold text-accent flex items-center gap-2">
                    <Radio className="w-4 h-4" />
                    3. Telemetry Ground Station Dispatch
                  </div>
                  <p>
                    Anomalous threat detections and crowd threshold triggers dispatched via encrypted MAVLink telemetry channel to emergency dispatch dashboard.
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
