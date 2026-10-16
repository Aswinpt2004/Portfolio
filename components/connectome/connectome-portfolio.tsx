"use client"

import React, { useState } from "react"
import { 
  NeuralCanvas, 
  ConnectomeNode 
} from "@/components/connectome/neural-canvas"
import { InteractiveVisualizer } from "@/components/editorial/interactive-visualizer"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { 
  Brain, 
  Eye, 
  ShieldCheck, 
  Cpu, 
  Briefcase, 
  Mail, 
  Download, 
  Github, 
  Linkedin, 
  Copy, 
  Check, 
  ArrowRight, 
  ExternalLink, 
  Workflow, 
  CheckCircle2, 
  Sparkles, 
  Activity, 
  X,
  Database,
  Server,
  Radio,
  Share2
} from "lucide-react"

export function ConnectomePortfolio() {
  const [activeNodeId, setActiveNodeId] = useState<string>("fmri-connectome")
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [selectedArchProject, setSelectedArchProject] = useState<string | null>(null)
  const [skillCategory, setSkillCategory] = useState<"all" | "vision" | "graph" | "mlops" | "web">("all")

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

  // Node Pill definitions
  const NAV_PILLS = [
    { id: "fmri-connectome", label: "fMRI Connectome", icon: Brain },
    { id: "drone-vision", label: "Drone Vision", icon: Eye },
    { id: "fedgraph-shield", label: "FedGraph AI", icon: ShieldCheck },
    { id: "edge-mlops", label: "Arsenal", icon: Cpu },
    { id: "career-pedigree", label: "Trajectory", icon: Briefcase },
    { id: "dispatch-contact", label: "Dispatch", icon: Mail },
  ]

  return (
    <div className="h-[100dvh] w-screen overflow-hidden flex flex-col bg-background text-foreground select-none">
      
      {/* Top Header & Connectome Telemetry Bar */}
      <header className="h-14 sm:h-16 border-b border-border bg-card/70 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary font-mono text-xs">
            AP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-xs sm:text-sm tracking-tight text-foreground">
                Aswin P T
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active RA
              </span>
            </div>
            <p className="text-[10px] font-mono text-muted-foreground hidden md:block">
              Neural Connectome • AI/ML & Drone Vision Researcher
            </p>
          </div>
        </div>

        {/* Quick Synapse Node Jumps */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_PILLS.map((pill) => {
            const Icon = pill.icon
            const isActive = activeNodeId === pill.id
            return (
              <button
                key={pill.id}
                onClick={() => setActiveNodeId(pill.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-mono flex items-center gap-1.5 transition-all ${
                  isActive
                    ? "bg-primary text-white font-medium shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{pill.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Action Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/aswin_pt_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono border border-border bg-card hover:bg-muted text-foreground transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-primary" />
            <span className="hidden sm:inline">Resume</span>
          </a>

          <ThemeToggle />
        </div>
      </header>

      {/* Main Split Interface */}
      <main className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 relative">

        {/* ========================================================
            LEFT / TOP PANE: Real-Time Interactive Neural Canvas
            ======================================================== */}
        <section className="lg:col-span-7 h-[42vh] lg:h-full relative border-b lg:border-b-0 lg:border-r border-border bg-background flex flex-col justify-between overflow-hidden">
          {/* Top Quick Status Overlay */}
          <div className="absolute top-2.5 right-3 z-10 flex items-center gap-2 pointer-events-none">
            <span className="text-[10px] font-mono text-muted-foreground bg-card/75 backdrop-blur-sm px-2 py-0.5 rounded border border-border hidden sm:inline">
              SPATIOTEMPORAL CONNECTOME GRAPH
            </span>
          </div>

          {/* Interactive Canvas Canvas */}
          <div className="w-full h-full relative">
            <NeuralCanvas
              activeNodeId={activeNodeId}
              onSelectNode={(id) => setActiveNodeId(id)}
            />
          </div>

          {/* Bottom Telemetry Status Bar */}
          <div className="h-8 border-t border-border bg-card/60 backdrop-blur-sm px-3 flex items-center justify-between text-[10px] font-mono text-muted-foreground shrink-0 z-10">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              <span>GNN ADJACENCY MATRIX // 60 FPS PHYSICS</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline">DP: ε = 0.5</span>
              <span>EDGE: 42 FPS</span>
            </div>
          </div>
        </section>

        {/* ========================================================
            RIGHT / BOTTOM PANE: Active Node Inspector & Dossier
            ======================================================== */}
        <aside className="lg:col-span-5 h-[58vh] lg:h-full overflow-y-auto connectome-scroll p-4 sm:p-6 lg:p-8 space-y-6 bg-card/40 backdrop-blur-md">

          {/* Mobile Synapse Quick Navigator */}
          <div className="lg:hidden flex items-center gap-1 overflow-x-auto pb-1 text-xs font-mono">
            {NAV_PILLS.map((pill) => {
              const Icon = pill.icon
              const isActive = activeNodeId === pill.id
              return (
                <button
                  key={pill.id}
                  onClick={() => setActiveNodeId(pill.id)}
                  className={`px-2 py-1 rounded text-[11px] whitespace-nowrap flex items-center gap-1 transition-colors ${
                    isActive ? "bg-primary text-white font-medium" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{pill.label}</span>
                </button>
              )
            })}
          </div>

          {/* ========================================================
              NODE 1: fMRI Dynamic Connectome
              ======================================================== */}
          {activeNodeId === "fmri-connectome" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10">
                  Node • Spatiotemporal Neuroimaging
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                  Dynamic Functional Connectome
                </h2>
                <p className="text-xs font-mono text-primary font-medium">
                  Spatiotemporal fMRI Brain Graph Analysis using BrainGNN
                </p>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Investigated dynamic functional connectivity fluctuations in human brain scans, translating high-dimensional 4D fMRI resting-state signals into topological brain graph representations to map cognitive state shifts.
              </p>

              {/* Empirical Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="connectome-card p-3 space-y-0.5">
                  <span className="text-xl font-heading font-extrabold text-foreground">1,200</span>
                  <p className="text-[10px] font-mono text-muted-foreground">HCP Dataset Subjects</p>
                </div>
                <div className="connectome-card p-3 space-y-0.5">
                  <span className="text-xl font-heading font-extrabold text-primary">89.4%</span>
                  <p className="text-[10px] font-mono text-muted-foreground">Cognitive State Accuracy</p>
                </div>
              </div>

              {/* Key Highlights */}
              <div className="space-y-2 pt-1 text-xs sm:text-sm text-foreground/90">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Transformed BOLD functional signals into regional correlation adjacency matrices.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Formulated BrainGNN with ROI-aware pooling to pinpoint neurological cognitive hubs.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Discovered network biomarkers correlating with working memory and attention processing.</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {["BrainGNN", "PyTorch Geometric", "fMRI Analysis", "Nilearn", "SciPy"].map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-border">
                <a
                  href="https://github.com/aswinpt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-foreground hover:text-primary transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>View Repository</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <Button
                  onClick={() => setActiveNodeId("drone-vision")}
                  className="font-mono text-xs bg-primary hover:bg-primary/90 text-white"
                >
                  Next: Drone Vision →
                </Button>
              </div>
            </div>
          )}

          {/* ========================================================
              NODE 2: Drone Aerial Vision
              ======================================================== */}
          {activeNodeId === "drone-vision" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-secondary font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-secondary/10">
                  Node • Aerial Computer Vision
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                  Drone Threat & Crowd Density
                </h2>
                <p className="text-xs font-mono text-secondary font-medium">
                  Autonomous Edge AI Surveillance on NVIDIA Jetson Orin
                </p>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                End-to-end edge AI vision subsystem mounted on UAVs for high-altitude suspicious object classification, concealed weapon recognition, and dilated convolution crowd density estimation.
              </p>

              {/* Empirical Stats */}
              <div className="grid grid-cols-3 gap-2">
                <div className="connectome-card p-2.5 space-y-0.5">
                  <span className="text-lg font-heading font-extrabold text-emerald-500">42 FPS</span>
                  <p className="text-[10px] font-mono text-muted-foreground">Jetson TensorRT</p>
                </div>
                <div className="connectome-card p-2.5 space-y-0.5">
                  <span className="text-lg font-heading font-extrabold text-primary">96.2%</span>
                  <p className="text-[10px] font-mono text-muted-foreground">mAP50 Accuracy</p>
                </div>
                <div className="connectome-card p-2.5 space-y-0.5">
                  <span className="text-lg font-heading font-extrabold text-foreground">25ms</span>
                  <p className="text-[10px] font-mono text-muted-foreground">Sub-frame Latency</p>
                </div>
              </div>

              {/* Embedded Interactive Camera Sandbox */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-medium text-foreground flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-secondary" />
                  Live Drone Camera Sandbox
                </span>
                <InteractiveVisualizer />
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-border">
                <button
                  onClick={() => setSelectedArchProject("drone-vision-intel")}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-secondary hover:underline"
                >
                  <Workflow className="w-3.5 h-3.5" />
                  <span>Inspect Architecture</span>
                </button>

                <Button
                  onClick={() => setActiveNodeId("fedgraph-shield")}
                  className="font-mono text-xs bg-primary hover:bg-primary/90 text-white"
                >
                  Next: FedGraph AI →
                </Button>
              </div>
            </div>
          )}

          {/* ========================================================
              NODE 3: FedGraph-Shield
              ======================================================== */}
          {activeNodeId === "fedgraph-shield" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10">
                  Node • Federated Learning & GNNs
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                  FedGraph-Shield Fraud Defense
                </h2>
                <p className="text-xs font-mono text-primary font-medium">
                  Privacy-Preserving Multi-Bank Graph Intelligence
                </p>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Decentralized graph intelligence enabling 5 financial institutions to collaboratively train fraud and money laundering detection networks without leaking raw customer transaction records.
              </p>

              {/* Empirical Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="connectome-card p-3 space-y-0.5">
                  <span className="text-xl font-heading font-extrabold text-primary">94.8%</span>
                  <p className="text-[10px] font-mono text-muted-foreground">Cross-Bank AUC</p>
                </div>
                <div className="connectome-card p-3 space-y-0.5">
                  <span className="text-xl font-heading font-extrabold text-emerald-500">ε = 0.5</span>
                  <p className="text-[10px] font-mono text-muted-foreground">Differential Privacy</p>
                </div>
              </div>

              {/* Embedded Interactive FedGraph Sandbox */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-medium text-foreground flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  Federated Attack Simulation Sandbox
                </span>
                <InteractiveVisualizer />
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-border">
                <button
                  onClick={() => setSelectedArchProject("fedgraph-shield")}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-primary hover:underline"
                >
                  <Workflow className="w-3.5 h-3.5" />
                  <span>Inspect Architecture</span>
                </button>

                <Button
                  onClick={() => setActiveNodeId("edge-mlops")}
                  className="font-mono text-xs bg-primary hover:bg-primary/90 text-white"
                >
                  Next: Arsenal →
                </Button>
              </div>
            </div>
          )}

          {/* ========================================================
              NODE 4: Technical Arsenal
              ======================================================== */}
          {activeNodeId === "edge-mlops" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10">
                    Node • Technical Arsenal
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                    Applied Frameworks & Skills
                  </h2>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap gap-1 text-xs font-mono">
                  {[
                    { id: "all", label: "All" },
                    { id: "vision", label: "Vision" },
                    { id: "graph", label: "GNN" },
                    { id: "mlops", label: "MLOps" },
                    { id: "web", label: "Web" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSkillCategory(cat.id as any)}
                      className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
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

              <div className="grid grid-cols-1 gap-2.5">
                {filteredSkills.map((skill, idx) => (
                  <div key={idx} className="connectome-card p-3 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-heading font-semibold text-foreground">{skill.name}</span>
                      <span className="font-mono font-bold text-primary">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-primary h-full rounded-full transition-all duration-300"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <p className="text-[11px] font-mono text-muted-foreground">{skill.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-end border-t border-border">
                <Button
                  onClick={() => setActiveNodeId("career-pedigree")}
                  className="font-mono text-xs bg-primary hover:bg-primary/90 text-white"
                >
                  Next: Career Trajectory →
                </Button>
              </div>
            </div>
          )}

          {/* ========================================================
              NODE 5: Career Trajectory & Education
              ======================================================== */}
          {activeNodeId === "career-pedigree" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10">
                  Node • Career Record
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                  Experience & Academia
                </h2>
              </div>

              <div className="space-y-4">
                {/* Quantumweave */}
                <div className="connectome-card p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-sm text-foreground">
                      Research Assistant — Aerial AI
                    </h3>
                    <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                      Dec 2024 — Present
                    </span>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground">Quantumweave Intelligence • Trivandrum</p>
                  <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                    Leading the development of the autonomous drone surveillance object detection subsystem. Formulating aerial datasets, benchmarking ByteTrack vs OC-SORT, and compiling TensorRT INT8 models at 42 FPS.
                  </p>
                </div>

                {/* Synbrains */}
                <div className="connectome-card p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-sm text-foreground">
                      AI Engineer Intern — Medical AI
                    </h3>
                    <span className="text-[10px] font-mono text-secondary bg-secondary/10 px-2 py-0.5 rounded">
                      May 2024 — Nov 2024
                    </span>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground">Synbrains Technologies • Kerala</p>
                  <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                    Engineered FastAPI microservices and multi-model serving backends with Docker containerization and Redis queues for clinical diagnostic analysis.
                  </p>
                </div>

                {/* DUK */}
                <div className="connectome-card p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-sm text-foreground">
                      M.Sc in Machine Intelligence (CGPA 8.08)
                    </h3>
                    <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      2023 — 2025
                    </span>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground">Digital University Kerala (formerly IIITM-K)</p>
                  <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                    Advanced curriculum in Geometric Deep Learning, GNNs, Bayesian Learning, and Computer Vision. Master's thesis on federated graph neural networks and privacy defenses.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-end border-t border-border">
                <Button
                  onClick={() => setActiveNodeId("dispatch-contact")}
                  className="font-mono text-xs bg-primary hover:bg-primary/90 text-white"
                >
                  Next: Dispatch Contact →
                </Button>
              </div>
            </div>
          )}

          {/* ========================================================
              NODE 6: Dispatch Transmission
              ======================================================== */}
          {activeNodeId === "dispatch-contact" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-accent font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-accent/10">
                  Node • Direct Transmission
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                  Connect & Collaborate
                </h2>
                <p className="text-xs font-mono text-muted-foreground">
                  Available for full-time AI/ML roles and research collaborations.
                </p>
              </div>

              {/* Direct Channels */}
              <div className="connectome-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>aswinpt98@gmail.com</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground text-xs font-mono flex items-center gap-1"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border">
                  <a
                    href="https://github.com/aswinpt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md bg-muted/50 hover:bg-muted flex items-center justify-center gap-2 text-xs font-mono text-foreground transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href="https://linkedin.com/in/aswinpt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md bg-muted/50 hover:bg-muted flex items-center justify-center gap-2 text-xs font-mono text-foreground transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-primary" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const form = e.target as HTMLFormElement
                  const subject = (form.elements.namedItem("subject") as HTMLInputElement).value
                  const body = (form.elements.namedItem("message") as HTMLTextAreaElement).value
                  window.location.href = `mailto:aswinpt98@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
                }}
                className="connectome-card p-4 space-y-3"
              >
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-foreground">Subject Line</label>
                  <input
                    type="text"
                    required
                    name="subject"
                    placeholder="Research Collaboration / Opportunity"
                    className="w-full px-3 py-1.5 rounded-md border border-border bg-background text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-foreground">Transmission Message</label>
                  <textarea
                    rows={3}
                    required
                    name="message"
                    placeholder="Outline your inquiry or research scope..."
                    className="w-full px-3 py-1.5 rounded-md border border-border bg-background text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-mono text-xs py-2 rounded-md flex items-center justify-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Transmit via Mail Client</span>
                </Button>
              </form>
            </div>
          )}

        </aside>
      </main>

      {/* ========================================================
          ARCHITECTURE BLUEPRINT MODAL
          ======================================================== */}
      {selectedArchProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="connectome-card w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider">
                  TECHNICAL BLUEPRINT SPECIFICATION
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
                    1. Isolated Institutional Enclaves
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
