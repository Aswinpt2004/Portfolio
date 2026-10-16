"use client"

import React, { useState, useEffect } from "react"
import { 
  Crosshair, 
  Radar, 
  ShieldAlert, 
  ShieldCheck, 
  Cpu, 
  Navigation, 
  Radio, 
  Wifi, 
  Battery, 
  Download, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  Copy, 
  Check, 
  ArrowRight, 
  Eye, 
  Layers, 
  Activity, 
  Workflow, 
  CheckCircle2, 
  Sparkles, 
  X,
  Database,
  Server,
  Zap,
  Flame,
  Camera,
  Compass,
  AlertTriangle,
  Plane
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

interface TargetBox {
  id: string
  x: number
  y: number
  w: number
  h: number
  label: string
  conf: number
  speed: string
  status: "LOCKED" | "TRACKING" | "ALERT"
}

export function GroundControlStation() {
  const [activeTab, setActiveTab] = useState<"optical" | "fedgraph" | "payload" | "flight-log" | "comms">("optical")
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [selectedArchProject, setSelectedArchProject] = useState<string | null>(null)
  const [skillCategory, setSkillCategory] = useState<"all" | "vision" | "graph" | "mlops" | "web">("all")
  
  // Real-time simulated telemetry states
  const [altitude, setAltitude] = useState(120.4)
  const [pitch, setPitch] = useState(2.1)
  const [roll, setRoll] = useState(-1.4)
  const [coordinates, setCoordinates] = useState("8.5241° N, 76.9366° E")
  const [targets, setTargets] = useState<TargetBox[]>([
    { id: "TRK-01", x: 22, y: 28, w: 24, h: 26, label: "VEHICLE_AERIAL", conf: 98.4, speed: "38 km/h", status: "LOCKED" },
    { id: "TRK-02", x: 62, y: 38, w: 26, h: 28, label: "CROWD_CLUSTER", conf: 96.1, speed: "4 km/h", status: "ALERT" },
  ])

  // FedGraph Simulation State
  const [isAttackRunning, setIsAttackRunning] = useState(false)
  const [attackStatus, setAttackStatus] = useState<"idle" | "attacking" | "defended">("idle")
  const [round, setRound] = useState(48)

  // Gentle altitude & gyro vibration simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setAltitude((prev) => +(120 + Math.sin(Date.now() / 2000) * 1.8).toFixed(1))
      setPitch((prev) => +(Math.sin(Date.now() / 1500) * 2.5).toFixed(1))
      setRoll((prev) => +(Math.cos(Date.now() / 1800) * 2.0).toFixed(1))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // User click on camera viewport spawns target
  const handleCameraClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const xPct = Math.round(((e.clientX - rect.left) / rect.width) * 100)
    const yPct = Math.round(((e.clientY - rect.top) / rect.height) * 100)

    const labels = ["CONCEALED_WEAPON", "VEHICLE_SURGE", "CROWD_CLUSTER", "UAV_TARGET", "ANOMALY_OBJECT"]
    const label = labels[Math.floor(Math.random() * labels.length)]
    const conf = +(95 + Math.random() * 4.6).toFixed(1)
    const newId = `TRK-${Math.floor(10 + Math.random() * 89)}`

    const newTarget: TargetBox = {
      id: newId,
      x: Math.max(5, Math.min(75, xPct - 12)),
      y: Math.max(5, Math.min(75, yPct - 12)),
      w: 22,
      h: 24,
      label,
      conf,
      speed: `${Math.floor(12 + Math.random() * 40)} km/h`,
      status: label.includes("WEAPON") || label.includes("ANOMALY") ? "ALERT" : "TRACKING",
    }

    setTargets((prev) => [...prev.slice(-3), newTarget])
    setCoordinates(`LAT ${(8.524 + yPct / 10000).toFixed(4)}° N, LON ${(76.936 + xPct / 10000).toFixed(4)}° E`)
  }

  // Trigger FedGraph Attack
  const handleTriggerAttack = () => {
    if (isAttackRunning) return
    setIsAttackRunning(true)
    setAttackStatus("attacking")

    setTimeout(() => {
      setAttackStatus("defended")
      setIsAttackRunning(false)
      setRound((r) => r + 1)
    }, 1800)
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("aswinpt98@gmail.com")
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  // Skills Matrix
  const skillsData = [
    { name: "PyTorch & PyTorch Geometric", category: "graph", level: 95, desc: "GNNs, message-passing, HeteroData" },
    { name: "YOLOv8 / v11 & TensorRT", category: "vision", level: 96, desc: "Aerial edge detection, INT8/FP16 quantization (42 FPS)" },
    { name: "CSRNet Crowd Density", category: "vision", level: 92, desc: "Dilated CNN crowd density estimation maps" },
    { name: "ByteTrack & OC-SORT", category: "vision", level: 90, desc: "Yaw-vibration resilient aerial tracking" },
    { name: "Differential Privacy (DP-SGD)", category: "graph", level: 88, desc: "Mathematically proven privacy guarantees (ε = 0.5)" },
    { name: "NVIDIA Jetson & CUDA", category: "mlops", level: 89, desc: "Onboard drone computing, hardware acceleration" },
    { name: "FastAPI & Triton Inference", category: "mlops", level: 94, desc: "High-throughput asynchronous ML microservices" },
    { name: "Docker & CI/CD Pipelines", category: "mlops", level: 90, desc: "Reproducible containerized edge model runtime" },
    { name: "Next.js, React & TypeScript", category: "web", level: 86, desc: "Ground control UI & telemetry web applications" },
    { name: "Tailwind CSS & Canvas API", category: "web", level: 90, desc: "Fluid responsive HUD & hardware-accelerated canvas" },
  ]

  const filteredSkills = skillCategory === "all"
    ? skillsData
    : skillsData.filter((s) => s.category === skillCategory)

  // Mission Pill Tabs
  const NAV_TABS = [
    { id: "optical", label: "01 Optical PFD HUD", icon: Crosshair },
    { id: "fedgraph", label: "02 FedGraph AI", icon: ShieldCheck },
    { id: "payload", label: "03 Payload Arsenal", icon: Cpu },
    { id: "flight-log", label: "04 Flight Record", icon: Plane },
    { id: "comms", label: "05 Comms Dispatch", icon: Radio },
  ]

  return (
    <div className="h-[100dvh] w-screen overflow-hidden flex flex-col bg-background text-foreground tactical-grid select-none">
      
      {/* ========================================================
          TOP FLIGHT TELEMETRY STATUS BAR (Cockpit Header)
          ======================================================== */}
      <header className="h-14 sm:h-16 border-b border-border bg-card/85 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="w-8 h-8 rounded bg-primary/10 border border-primary/30 flex items-center justify-center font-bold text-primary font-mono text-xs">
            AP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-xs sm:text-sm tracking-tight text-foreground">
                Aswin P T
              </span>
              <span className="text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded font-semibold hidden sm:inline">
                CALLSIGN: TAIL #AP-98 // ACTIVE RA
              </span>
            </div>
            <p className="text-[10px] font-mono text-muted-foreground hidden md:block">
              UAV Ground Control Station • Aerial Edge Vision & Federated AI
            </p>
          </div>
        </div>

        {/* Tactical Mission Mode Switcher */}
        <nav className="hidden lg:flex items-center gap-1 font-mono text-xs">
          {NAV_TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1 rounded border transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary font-bold shadow-sm"
                    : "border-border bg-card/50 text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Right Cockpit Instruments */}
        <div className="flex items-center gap-2 sm:gap-3 font-mono text-xs">
          <a
            href="/aswin_pt_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-border bg-card hover:bg-muted text-foreground transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-primary" />
            <span className="hidden sm:inline">Flight Log / CV</span>
          </a>

          <ThemeToggle />
        </div>
      </header>

      {/* Sub-header Telemetry Ticker Tape */}
      <div className="h-7 border-b border-border bg-muted/30 px-3 sm:px-6 flex items-center justify-between text-[10px] font-mono text-muted-foreground shrink-0 overflow-x-auto whitespace-nowrap gap-4">
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-primary font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            MAVLINK: AES-256 OK
          </span>
          <span className="hidden sm:inline">ALT: {altitude}m AGL</span>
          <span className="hidden sm:inline">PITCH: {pitch}° // ROLL: {roll}°</span>
          <span className="hidden md:inline">GNSS: 18 SVs (RTK FIX)</span>
        </div>
        <div className="flex items-center gap-3 shrink-0 text-foreground font-semibold">
          <span className="text-primary">JETSON ORIN: 42 FPS // 12.4ms</span>
          <span className="text-secondary">DP BUDGET: ε = 0.5</span>
        </div>
      </div>

      {/* ========================================================
          MAIN COCKPIT STAGE: Split PFD HUD & Mission Drawer
          ======================================================== */}
      <main className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 relative">

        {/* ========================================================
            LEFT COLUMN: Primary Flight Display (PFD) & Optical HUD
            ======================================================== */}
        <section className="lg:col-span-7 h-[46vh] lg:h-full relative border-b lg:border-b-0 lg:border-r border-border bg-background flex flex-col justify-between overflow-hidden p-3 sm:p-4">
          
          {/* Top HUD Status Banner */}
          <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-border/80">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-primary" />
              <span className="font-bold text-foreground">CAM_01 // 4K OPTICAL STREAM</span>
              <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.2 rounded hidden sm:inline">
                TENSORRT INT8
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowHeatmap((prev) => !prev)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-colors ${
                  showHeatmap 
                    ? "bg-secondary text-secondary-foreground border-secondary font-bold" 
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                CSRNet Heatmap: {showHeatmap ? "ON" : "OFF"}
              </button>
            </div>
          </div>

          {/* Optical Camera Viewport Sandbox */}
          <div 
            onClick={handleCameraClick}
            className="flex-1 my-2 relative rounded border border-primary/30 overflow-hidden bg-slate-950/90 cursor-crosshair group flex items-center justify-center select-none shadow-inner"
          >
            {/* Crosshair Overlay */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-12 h-12 border border-primary/40 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-primary/80 rounded-full" />
              </div>
              <div className="absolute top-0 bottom-0 w-[1px] bg-primary/20" />
              <div className="absolute left-0 right-0 h-[1px] bg-primary/20" />
            </div>

            {/* Pitch / Roll Horizon Line */}
            <div 
              className="absolute w-48 h-[1px] bg-secondary/50 pointer-events-none transition-transform duration-700"
              style={{ transform: `rotate(${roll}deg) translateY(${pitch * 4}px)` }}
            />

            {/* Simulated CSRNet Crowd Heatmap */}
            {showHeatmap && (
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-rose-500/35 via-amber-500/25 to-blue-500/20 mix-blend-screen animate-pulse" />
            )}

            {/* Bounding Boxes on Targets */}
            {targets.map((tgt) => (
              <div
                key={tgt.id}
                className="absolute transition-all duration-300 pointer-events-none border-2"
                style={{
                  left: `${tgt.x}%`,
                  top: `${tgt.y}%`,
                  width: `${tgt.w}%`,
                  height: `${tgt.h}%`,
                  borderColor: tgt.status === "ALERT" ? "#ef4444" : "#10b981",
                  backgroundColor: tgt.status === "ALERT" ? "rgba(239, 68, 68, 0.12)" : "rgba(16, 185, 129, 0.08)",
                }}
              >
                {/* Target Tag */}
                <div 
                  className="absolute -top-5 left-0 px-1.5 py-0.5 text-[9px] font-mono font-bold whitespace-nowrap text-white rounded flex items-center gap-1 shadow"
                  style={{ backgroundColor: tgt.status === "ALERT" ? "#ef4444" : "#10b981" }}
                >
                  <span>{tgt.id}</span>
                  <span>[{tgt.conf}%]</span>
                </div>

                {/* Target label bottom */}
                <div className="absolute -bottom-4 left-0 text-[8px] font-mono text-emerald-400 font-bold bg-black/80 px-1 rounded">
                  {tgt.label}
                </div>
              </div>
            ))}

            {/* Click to spawn hint */}
            <div className="absolute bottom-3 left-3 pointer-events-none text-[10px] font-mono text-primary bg-black/80 border border-primary/30 px-2 py-0.5 rounded flex items-center gap-1.5">
              <Crosshair className="w-3 h-3 text-primary animate-pulse" />
              <span>CLICK TO SPAWN AERIAL TARGET</span>
            </div>

            {/* Live Telemetry Overlay in HUD */}
            <div className="absolute top-2 right-2 pointer-events-none text-[9px] font-mono text-emerald-400 bg-black/75 border border-emerald-500/20 px-2 py-1 rounded text-right space-y-0.5">
              <div>LATENCY: 12.4ms (42 FPS)</div>
              <div>{coordinates}</div>
            </div>
          </div>

          {/* Active Target Tracks Table (Telemetry Monitor) */}
          <div className="h-20 sm:h-24 border border-border rounded bg-card/60 p-2 overflow-y-auto hud-scroll text-[11px] font-mono space-y-1">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground uppercase pb-1 border-b border-border/60">
              <span>TARGET ID</span>
              <span>CLASSIFICATION</span>
              <span>CONF</span>
              <span>EST. SPEED</span>
              <span>STATE</span>
            </div>
            {targets.map((tgt) => (
              <div key={tgt.id} className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-foreground">{tgt.id}</span>
                <span className="text-primary truncate max-w-[130px]">{tgt.label}</span>
                <span>{tgt.conf}%</span>
                <span className="text-muted-foreground">{tgt.speed}</span>
                <span className={`px-1 py-0.2 rounded text-[9px] font-bold ${
                  tgt.status === "ALERT" ? "bg-red-500/20 text-red-500" : "bg-emerald-500/20 text-emerald-500"
                }`}>
                  {tgt.status}
                </span>
              </div>
            ))}
          </div>

        </section>

        {/* ========================================================
            RIGHT COLUMN: Mission Intelligence & Tactical Dossier
            ======================================================== */}
        <aside className="lg:col-span-5 h-[54vh] lg:h-full overflow-y-auto hud-scroll p-4 sm:p-6 space-y-5 bg-card/50 backdrop-blur-md">

          {/* Mobile Mission Mode Selector */}
          <div className="lg:hidden flex items-center gap-1 overflow-x-auto pb-1 text-xs font-mono">
            {NAV_TABS.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-2.5 py-1 rounded text-[11px] whitespace-nowrap flex items-center gap-1 border transition-colors ${
                    isActive 
                      ? "bg-primary text-primary-foreground border-primary font-bold" 
                      : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* ========================================================
              TAB 01: Optical PFD HUD / Drone Aerial Vision
              ======================================================== */}
          {activeTab === "optical" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
                  MISSION 01 • AERIAL COMPUTER VISION
                </span>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
                  Drone Suspicious Object Detection
                </h2>
                <p className="text-xs font-mono text-primary font-semibold">
                  Autonomous UAV Edge AI Pipeline • Quantumweave Intelligence
                </p>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Mission-critical aerial threat surveillance system running directly on onboard NVIDIA Jetson Orin Nano edge computers at 42 FPS. Overcomes drone platform yaw vibrations, aerial occlusion, and perspective distortions.
              </p>

              {/* Benchmarks Grid */}
              <div className="grid grid-cols-3 gap-2">
                <div className="hud-panel p-2.5 space-y-0.5">
                  <span className="text-base sm:text-lg font-heading font-extrabold text-emerald-500">42 FPS</span>
                  <p className="text-[10px] font-mono text-muted-foreground">Jetson TensorRT</p>
                </div>
                <div className="hud-panel p-2.5 space-y-0.5">
                  <span className="text-base sm:text-lg font-heading font-extrabold text-primary">96.2%</span>
                  <p className="text-[10px] font-mono text-muted-foreground">mAP50 Accuracy</p>
                </div>
                <div className="hud-panel p-2.5 space-y-0.5">
                  <span className="text-base sm:text-lg font-heading font-extrabold text-foreground">25ms</span>
                  <p className="text-[10px] font-mono text-muted-foreground">End-to-End Latency</p>
                </div>
              </div>

              {/* Tactical Highlights */}
              <div className="space-y-2 text-xs sm:text-sm text-foreground/90">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Fine-tuned aerial YOLOv8x models on custom drone perspective datasets.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>CSRNet dilated convolutions for continuous crowd density count heatmaps.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>ByteTrack & OC-SORT multi-object tracking resilient to UAV yaw jitter.</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-border">
                <button
                  onClick={() => setSelectedArchProject("drone-vision-intel")}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-primary hover:underline font-semibold"
                >
                  <Workflow className="w-3.5 h-3.5" />
                  <span>Inspect Pipeline Blueprint</span>
                </button>

                <Button
                  onClick={() => setActiveTab("fedgraph")}
                  className="font-mono text-xs bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                >
                  Mission 02: FedGraph AI →
                </Button>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 02: FedGraph AI Defense Network
              ======================================================== */}
          {activeTab === "fedgraph" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-secondary font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-secondary/10 border border-secondary/20">
                  MISSION 02 • FEDERATED GRAPH DEFENSE
                </span>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
                  FedGraph-Shield AI Network
                </h2>
                <p className="text-xs font-mono text-secondary font-semibold">
                  Privacy-Preserving Multi-Institutional Financial Fraud Detection
                </p>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Decentralized graph intelligence enabling 5 independent banking nodes to cooperatively train fraud syndicate detection networks with Differential Privacy ($\epsilon = 0.5$) without sharing raw customer transactions.
              </p>

              {/* Empirical Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="hud-panel p-3 space-y-0.5">
                  <span className="text-xl font-heading font-extrabold text-foreground">94.8%</span>
                  <p className="text-[10px] font-mono text-muted-foreground">Cross-Bank Detection AUC</p>
                </div>
                <div className="hud-panel p-3 space-y-0.5">
                  <span className="text-xl font-heading font-extrabold text-primary">ε = 0.5</span>
                  <p className="text-[10px] font-mono text-muted-foreground">Differential Privacy Budget</p>
                </div>
              </div>

              {/* Interactive FedGraph Simulation Box */}
              <div className="hud-panel p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-foreground">DECENTRALIZED BANKING NODES</span>
                  <span className="text-[10px] text-primary">ROUND #{round}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="p-2 rounded bg-muted/60 border border-border flex items-center justify-between">
                    <span>BANK_ALPHA</span>
                    <span className="text-emerald-500 font-bold">ONLINE</span>
                  </div>
                  <div className="p-2 rounded bg-muted/60 border border-border flex items-center justify-between">
                    <span>BANK_BETA</span>
                    <span className="text-emerald-500 font-bold">ONLINE</span>
                  </div>
                  <div className="p-2 rounded bg-muted/60 border border-border flex items-center justify-between">
                    <span>BANK_GAMMA</span>
                    <span className="text-emerald-500 font-bold">ONLINE</span>
                  </div>
                  <div className="p-2 rounded bg-muted/60 border border-border flex items-center justify-between">
                    <span>BANK_DELTA</span>
                    <span className="text-emerald-500 font-bold">ONLINE</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-mono text-muted-foreground">
                    Status: {attackStatus === "attacking" ? "Defending Perturbation..." : attackStatus === "defended" ? "Attacking Blocked (DP ε=0.5)" : "Secure Baseline"}
                  </span>

                  <Button
                    onClick={handleTriggerAttack}
                    disabled={isAttackRunning}
                    className="font-mono text-xs bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold"
                  >
                    {isAttackRunning ? "Defending..." : "Simulate Fraud Attack"}
                  </Button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-border">
                <button
                  onClick={() => setSelectedArchProject("fedgraph-shield")}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-secondary hover:underline font-semibold"
                >
                  <Workflow className="w-3.5 h-3.5" />
                  <span>Inspect GNN Blueprint</span>
                </button>

                <Button
                  onClick={() => setActiveTab("payload")}
                  className="font-mono text-xs bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                >
                  Payload & Arsenal →
                </Button>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 03: Payload Specifications & Technical Arsenal
              ======================================================== */}
          {activeTab === "payload" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
                    PAYLOAD SPECS • TECHNICAL MATRIX
                  </span>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
                    Technical Arsenal & Tools
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
                      className={`px-2 py-0.5 rounded text-[11px] border transition-colors ${
                        skillCategory === cat.id
                          ? "bg-primary text-primary-foreground border-primary font-bold"
                          : "border-border bg-card text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {filteredSkills.map((skill, idx) => (
                  <div key={idx} className="hud-panel p-3 space-y-1.5">
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
                  onClick={() => setActiveTab("flight-log")}
                  className="font-mono text-xs bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                >
                  Flight Record & History →
                </Button>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 04: Flight Record & Credentials
              ======================================================== */}
          {activeTab === "flight-log" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  PILOT LOG • CAREER & ACADEMIA
                </span>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
                  Flight Record & Qualifications
                </h2>
              </div>

              <div className="space-y-3.5">
                {/* Quantumweave */}
                <div className="hud-panel p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-sm text-foreground">
                      Research Assistant — Aerial AI Systems
                    </h3>
                    <span className="text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded font-bold">
                      Dec 2024 — Present
                    </span>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground">Quantumweave Intelligence • Trivandrum, India</p>
                  <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                    Leading the drone surveillance object detection subsystem. Formulating aerial datasets, benchmarking ByteTrack vs OC-SORT for drone yaw vibrations, and quantizing neural networks for TensorRT on Jetson Orin Nano hardware at 42 FPS.
                  </p>
                </div>

                {/* Synbrains */}
                <div className="hud-panel p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-sm text-foreground">
                      AI Engineer Intern — Medical Intelligence
                    </h3>
                    <span className="text-[10px] font-mono text-secondary bg-secondary/10 border border-secondary/20 px-2 py-0.5 rounded font-bold">
                      May 2024 — Nov 2024
                    </span>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground">Synbrains Technologies • Kerala, India</p>
                  <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                    Constructed high-throughput asynchronous FastAPI microservices and multi-model serving backends with Docker containerization and Redis task queues for clinical diagnostic analysis.
                  </p>
                </div>

                {/* DUK */}
                <div className="hud-panel p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-sm text-foreground">
                      M.Sc in Machine Intelligence (CGPA 8.08)
                    </h3>
                    <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded font-bold">
                      2023 — 2025
                    </span>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground">Digital University Kerala (formerly IIITM-K)</p>
                  <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                    Completed master's thesis on federated graph neural networks and differential privacy. Comprehensive curriculum in Geometric Deep Learning, Graph Neural Networks, and Advanced Computer Vision.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-end border-t border-border">
                <Button
                  onClick={() => setActiveTab("comms")}
                  className="font-mono text-xs bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                >
                  Comms Dispatch →
                </Button>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 05: Comms Dispatch & Contact
              ======================================================== */}
          {activeTab === "comms" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-accent font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
                  RADIO COMMS • DIRECT TRANSMISSION
                </span>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
                  Dispatch Ground Station Link
                </h2>
                <p className="text-xs font-mono text-muted-foreground">
                  Available for full-time AI/ML roles, research collaborations, and edge computing consulting.
                </p>
              </div>

              {/* Direct Channels */}
              <div className="hud-panel p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <Radio className="w-4 h-4 text-primary" />
                    <span className="text-foreground font-bold">aswinpt98@gmail.com</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground text-xs font-mono flex items-center gap-1 border border-border"
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
                    className="p-2 rounded border border-border bg-muted/40 hover:bg-muted flex items-center justify-center gap-2 text-xs font-mono text-foreground transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href="https://linkedin.com/in/aswinpt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded border border-border bg-muted/40 hover:bg-muted flex items-center justify-center gap-2 text-xs font-mono text-foreground transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-primary" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Direct Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const form = e.target as HTMLFormElement
                  const subject = (form.elements.namedItem("subject") as HTMLInputElement).value
                  const body = (form.elements.namedItem("message") as HTMLTextAreaElement).value
                  window.location.href = `mailto:aswinpt98@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
                }}
                className="hud-panel p-4 space-y-3"
              >
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-foreground">Mission Subject</label>
                  <input
                    type="text"
                    required
                    name="subject"
                    placeholder="Drone Vision Role / Research Collaboration"
                    className="w-full px-3 py-1.5 rounded border border-border bg-background text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-foreground">Message Payload</label>
                  <textarea
                    rows={3}
                    required
                    name="message"
                    placeholder="Specify project parameters or mission inquiry..."
                    className="w-full px-3 py-1.5 rounded border border-border bg-background text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs py-2 rounded font-bold flex items-center justify-center gap-2"
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>Transmit Telemetry Dispatch</span>
                </Button>
              </form>
            </div>
          )}

        </aside>
      </main>

      {/* ========================================================
          ARCHITECTURE SPECIFICATION MODAL
          ======================================================== */}
      {selectedArchProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="hud-panel w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 space-y-4 shadow-2xl border-primary/40">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider">
                  TECHNICAL BLUEPRINT SPECIFICATION
                </span>
                <h3 className="font-heading font-bold text-lg text-foreground">
                  {selectedArchProject === "fedgraph-shield" 
                    ? "FedGraph-Shield Distributed Architecture" 
                    : "UAV Telemetry & Threat Detection Pipeline"}
                </h3>
              </div>
              <button
                onClick={() => setSelectedArchProject(null)}
                className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {selectedArchProject === "fedgraph-shield" ? (
              <div className="space-y-3 text-xs text-muted-foreground">
                <div className="p-3 rounded bg-muted/40 font-mono text-xs space-y-1 border border-border">
                  <div className="font-bold text-primary flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5" />
                    1. Isolated Institutional Enclaves
                  </div>
                  <p>
                    Each bank node maintains local heterogeneous transaction graph G_i. Customer records and edge weights are strictly contained behind institutional firewalls.
                  </p>
                </div>

                <div className="p-3 rounded bg-muted/40 font-mono text-xs space-y-1 border border-border">
                  <div className="font-bold text-secondary flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    2. DP-SGD Noise Perturbation Engine
                  </div>
                  <p>
                    Local model gradients are clipped to L2 norm threshold C, followed by injection of calibrated Gaussian noise N(0, σ² C² I) to mathematically guarantee (ε=0.5, δ=10⁻⁵) privacy budget.
                  </p>
                </div>

                <div className="p-3 rounded bg-muted/40 font-mono text-xs space-y-1 border border-border">
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
                    className="font-mono text-xs bg-primary text-primary-foreground font-bold"
                  >
                    Close Specification
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-muted-foreground">
                <div className="p-3 rounded bg-muted/40 font-mono text-xs space-y-1 border border-border">
                  <div className="font-bold text-primary flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    1. Aerial Optical Stream & Stabilization
                  </div>
                  <p>
                    4K UAV optical feed with IMU gyro stabilization and geometric lens distortion correction.
                  </p>
                </div>

                <div className="p-3 rounded bg-muted/40 font-mono text-xs space-y-1 border border-border">
                  <div className="font-bold text-secondary flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    2. Dual INT8 TensorRT Engine on Jetson
                  </div>
                  <p>
                    Parallel inference: YOLOv8 for discrete suspicious targets running concurrently with CSRNet dilated convolutions for crowd density heatmaps at 42 FPS on Jetson Orin Nano.
                  </p>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    onClick={() => setSelectedArchProject(null)}
                    className="font-mono text-xs bg-primary text-primary-foreground font-bold"
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
