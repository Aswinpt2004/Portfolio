"use client"

import { useState, useRef, useEffect } from "react"
import {
  Eye,
  Layers,
  Terminal,
  Play,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Crosshair,
  ShieldAlert,
  Activity,
  CheckCircle2,
  Sparkles,
  Cpu,
} from "lucide-react"

export type WorkbenchTab = "drone" | "fedgraph" | "terminal"

interface TargetBox {
  id: number
  x: number
  y: number
  w: number
  h: number
  label: string
  confidence: number
}

interface Props {
  initialTab?: WorkbenchTab
}

export function InteractiveWorkbench({ initialTab = "drone" }: Props) {
  const [activeTab, setActiveTab] = useState<WorkbenchTab>(initialTab)

  // DRONE VISION STATE
  const [zoomLevel, setZoomLevel] = useState(1)
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [showBoxes, setShowBoxes] = useState(true)
  const [boxes, setBoxes] = useState<TargetBox[]>([
    { id: 1, x: 22, y: 28, w: 20, h: 22, label: "VEHICLE_AERIAL", confidence: 98.4 },
    { id: 2, x: 58, y: 22, w: 24, h: 26, label: "CROWD_CLUSTER", confidence: 96.7 },
    { id: 3, x: 40, y: 60, w: 18, h: 20, label: "INTRUSION_ALERT", confidence: 94.2 },
  ])
  const [lastDetectedCoords, setLastDetectedCoords] = useState<string>("8.5241° N, 76.9366° E")

  // FEDGRAPH STATE
  const [isAttackRunning, setIsAttackRunning] = useState(false)
  const [attackStatus, setAttackStatus] = useState<"idle" | "attacking" | "defended">("idle")
  const [aggregationRound, setAggregationRound] = useState(42)

  // TERMINAL STATE
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "AswinOS Kernel v2.6.4 [Machine Intelligence Subsystem]",
    "PyTorch Geometric + CUDA 12.2 environment initialized.",
    "Ready. Click 'Run Live Inference' to execute model pipeline.",
  ])
  const [isRunningInference, setIsRunningInference] = useState(false)

  // Click on drone camera view to spawn YOLO detection box at click position
  const handleCameraClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const xPercent = Math.round(((e.clientX - rect.left) / rect.width) * 100)
    const yPercent = Math.round(((e.clientY - rect.top) / rect.height) * 100)

    const labels = ["CROWD_CLUSTER", "VEHICLE_TRACK", "PERIMETER_TARGET", "DRONE_OBJ"]
    const randomLabel = labels[Math.floor(Math.random() * labels.length)]
    const randomConf = +(95 + Math.random() * 4.9).toFixed(1)

    const newBox: TargetBox = {
      id: Date.now(),
      x: Math.max(5, Math.min(85, xPercent - 8)),
      y: Math.max(5, Math.min(85, yPercent - 8)),
      w: 16,
      h: 18,
      label: randomLabel,
      confidence: randomConf,
    }

    setBoxes((prev) => [...prev.slice(-4), newBox])
    setLastDetectedCoords(`LAT: ${(8.5 + (yPercent / 1000)).toFixed(4)}° N, LON: ${(76.9 + (xPercent / 1000)).toFixed(4)}° E`)
  }

  // Trigger Fraud Attack Simulation
  const handleTriggerAttack = () => {
    if (isAttackRunning) return
    setIsAttackRunning(true)
    setAttackStatus("attacking")

    setTimeout(() => {
      setAttackStatus("defended")
      setIsAttackRunning(false)
      setAggregationRound((prev) => prev + 1)
    }, 2200)
  }

  // Run Inference Terminal
  const handleRunInference = () => {
    if (isRunningInference) return
    setIsRunningInference(true)
    setTerminalLogs((prev) => [
      ...prev,
      "> python -m aswin_ai.inference --model drone_vision_yolo_csrnet",
      "[*] Streaming video feed: 1920x1080 @ 60 FPS...",
      "[*] CSRNet Dilated Feature Maps calculated: MAE 4.82",
      "[*] YOLOv8 Aerial Detection: 3 Bounding Targets identified.",
      "[*] Model Latency: 12.4ms (RTX TensorRT accelerated)",
      "[✓] Pipeline complete. Zero anomaly drift.",
    ])
    setTimeout(() => {
      setIsRunningInference(false)
    }, 1500)
  }

  return (
    <div className="os-window w-full shadow-2xl relative select-none">
      {/* visionOS Window Header Bar */}
      <div className="os-window-header">
        {/* Traffic Light Buttons */}
        <div className="flex items-center gap-2">
          <div className="os-btn-close" />
          <div className="os-btn-min" />
          <div className="os-btn-max" />
          <span className="ml-3 hidden sm:inline text-xs font-mono font-medium text-foreground/80">
            Aswin AI Workbench — {activeTab === "drone" ? "Aerial Drone Camera Feed" : activeTab === "fedgraph" ? "FedGraph-Shield Simulator" : "Neural Code Terminal"}
          </span>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl border border-border">
          <button
            onClick={() => setActiveTab("drone")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
              activeTab === "drone"
                ? "bg-background text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Drone Vision</span>
          </button>

          <button
            onClick={() => setActiveTab("fedgraph")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
              activeTab === "fedgraph"
                ? "bg-background text-secondary shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">FedGraph AI</span>
          </button>

          <button
            onClick={() => setActiveTab("terminal")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
              activeTab === "terminal"
                ? "bg-background text-accent shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Terminal</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: INTERACTIVE DRONE CAMERA VIEWPORT                 */}
      {/* ======================================================== */}
      {activeTab === "drone" && (
        <div className="relative p-4 sm:p-6 bg-background/50">
          {/* Top Camera Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-primary font-bold">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                REC [LIVE DRONE FEED]
              </span>
              <span className="text-muted-foreground">ALT: 120m</span>
              <span className="text-muted-foreground">{lastDetectedCoords}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowBoxes(!showBoxes)}
                className={`px-2.5 py-1 rounded-lg border text-xs transition-colors ${
                  showBoxes ? "bg-primary text-white border-primary" : "border-border text-muted-foreground"
                }`}
              >
                Boxes: {showBoxes ? "ON" : "OFF"}
              </button>
              <button
                onClick={() => setShowHeatmap(!showHeatmap)}
                className={`px-2.5 py-1 rounded-lg border text-xs transition-colors ${
                  showHeatmap ? "bg-accent text-white border-accent" : "border-border text-muted-foreground"
                }`}
              >
                CSRNet Heatmap
              </button>
              <button
                onClick={() => setZoomLevel((z) => (z >= 1.4 ? 1 : z + 0.2))}
                className="p-1 rounded-lg border border-border hover:bg-muted text-muted-foreground"
                title="Zoom Camera"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Camera Viewport Screen */}
          <div
            onClick={handleCameraClick}
            className="relative h-64 sm:h-80 md:h-96 w-full rounded-2xl overflow-hidden border border-border cursor-crosshair group shadow-inner bg-slate-900"
          >
            {/* Scanline Effect */}
            <div className="absolute inset-0 terminal-scanline pointer-events-none opacity-40 z-20" />

            {/* Aerial Background Simulation Graphic */}
            <div
              className="absolute inset-0 transition-transform duration-500"
              style={{
                transform: `scale(${zoomLevel})`,
                backgroundImage:
                  "radial-gradient(#1e293b 1px, transparent 1px), radial-gradient(#0f172a 1px, #020617 1px)",
                backgroundSize: "24px 24px, 48px 48px",
              }}
            >
              {/* Simulated Aerial Landscape Contours */}
              <div className="absolute top-1/4 left-1/3 w-64 h-32 rounded-full bg-blue-950/40 blur-xl" />
              <div className="absolute bottom-1/3 right-1/4 w-80 h-40 rounded-full bg-indigo-950/40 blur-xl" />
            </div>

            {/* CSRNet Heatmap Overlay Simulation */}
            {showHeatmap && (
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/25 via-amber-500/25 to-blue-500/15 pointer-events-none animate-pulse" />
            )}

            {/* Central Drone Reticle */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Crosshair className="w-10 h-10 text-primary/40 animate-pulse" />
            </div>

            {/* Dynamic Bounding Boxes */}
            {showBoxes &&
              boxes.map((box) => (
                <div
                  key={box.id}
                  className="absolute border-2 border-primary bg-primary/10 rounded transition-all duration-300 p-1 pointer-events-none"
                  style={{
                    left: `${box.x}%`,
                    top: `${box.y}%`,
                    width: `${box.w}%`,
                    height: `${box.h}%`,
                  }}
                >
                  <span className="text-[9px] font-mono font-bold bg-primary text-white px-1 py-0.5 rounded shadow-sm">
                    {box.label} [{box.confidence}%]
                  </span>
                </div>
              ))}

            {/* Tap instruction */}
            <div className="absolute bottom-3 left-4 text-[11px] font-mono text-white/80 bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-sm pointer-events-none">
              🎯 Click / tap anywhere to test live YOLO detection
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: FEDGRAPH-SHIELD FRAUD ATTACK SIMULATOR            */}
      {/* ======================================================== */}
      {activeTab === "fedgraph" && (
        <div className="p-4 sm:p-6 bg-background/50">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h4 className="text-sm font-bold font-heading text-foreground">
                FedGraph-Shield // Differential Privacy Graph Learning
              </h4>
              <p className="text-xs text-muted-foreground font-mono">
                Cross-institutional collaborative fraud detection without raw data sharing.
              </p>
            </div>

            <button
              onClick={handleTriggerAttack}
              disabled={isAttackRunning}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-md flex items-center gap-2 ${
                isAttackRunning
                  ? "bg-amber-500 text-white animate-pulse"
                  : attackStatus === "defended"
                  ? "bg-emerald-600 text-white"
                  : "bg-primary text-white hover:bg-primary/90"
              }`}
            >
              {isAttackRunning ? (
                <>
                  <Activity className="w-4 h-4 animate-spin" />
                  <span>SIMULATING FRAUD ATTACK...</span>
                </>
              ) : attackStatus === "defended" ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>FRAUD RING BLOCKED! (RUN AGAIN)</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-4 h-4" />
                  <span>TRIGGER SIMULATED FRAUD ATTACK</span>
                </>
              )}
            </button>
          </div>

          {/* Network Visualization Box */}
          <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-border bg-slate-950 flex items-center justify-center p-4">
            {/* Central Aggregator Server */}
            <div className="relative z-10 w-24 h-24 rounded-2xl bg-indigo-900/60 border-2 border-indigo-400 flex flex-col items-center justify-center text-white shadow-xl">
              <Cpu className="w-6 h-6 text-indigo-300" />
              <span className="text-[10px] font-mono font-bold mt-1">FL-SERVER</span>
              <span className="text-[9px] font-mono text-indigo-300">Round #{aggregationRound}</span>
            </div>

            {/* Orbiting Satellite Bank Nodes */}
            <div
              className={`absolute top-6 left-12 p-3 rounded-xl border font-mono text-xs transition-all ${
                attackStatus === "attacking"
                  ? "bg-rose-950 border-rose-500 text-rose-300 animate-bounce"
                  : "bg-slate-900 border-slate-700 text-slate-300"
              }`}
            >
              <div>BANK ALPHA</div>
              <div className="text-[10px] text-muted-foreground">DP Noise: ε=0.5</div>
            </div>

            <div
              className={`absolute top-6 right-12 p-3 rounded-xl border font-mono text-xs transition-all ${
                attackStatus === "attacking"
                  ? "bg-rose-950 border-rose-500 text-rose-300 animate-bounce"
                  : "bg-slate-900 border-slate-700 text-slate-300"
              }`}
            >
              <div>BANK BETA</div>
              <div className="text-[10px] text-muted-foreground">Local Graph GNN</div>
            </div>

            <div
              className={`absolute bottom-6 left-12 p-3 rounded-xl border font-mono text-xs transition-all ${
                attackStatus === "defended"
                  ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                  : "bg-slate-900 border-slate-700 text-slate-300"
              }`}
            >
              <div>BANK GAMMA</div>
              <div className="text-[10px] text-muted-foreground">Weights Encrypted</div>
            </div>

            <div
              className={`absolute bottom-6 right-12 p-3 rounded-xl border font-mono text-xs transition-all ${
                attackStatus === "defended"
                  ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                  : "bg-slate-900 border-slate-700 text-slate-300"
              }`}
            >
              <div>BANK DELTA</div>
              <div className="text-[10px] text-muted-foreground">Fraud Ring Neutralized</div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: NEURAL INFERENCE TERMINAL                         */}
      {/* ======================================================== */}
      {activeTab === "terminal" && (
        <div className="p-4 sm:p-6 bg-slate-950 text-emerald-400 font-mono text-xs leading-relaxed">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
            <span className="text-slate-400 text-xs">AswinOS Interactive Python Subshell</span>
            <button
              onClick={handleRunInference}
              disabled={isRunningInference}
              className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all disabled:opacity-50"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{isRunningInference ? "INFERRING..." : "RUN INFERENCE"}</span>
            </button>
          </div>

          <div className="space-y-1.5 h-64 overflow-y-auto pr-2">
            {terminalLogs.map((log, index) => (
              <div key={index} className={log.startsWith(">") ? "text-cyan-300 font-bold" : log.startsWith("[✓]") ? "text-emerald-300 font-bold" : "text-slate-300"}>
                {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Window Status Footer Bar */}
      <div className="px-4 py-2.5 bg-muted/40 border-t border-border flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-primary">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NEURAL OS READY</span>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">FRAMEWORK: PYTORCH / FASTAPI / FLOWER</span>
        </div>
        <div className="flex items-center gap-2">
          <span>LATENCY: <strong className="text-foreground">12.4ms</strong></span>
          <span>FPS: <strong className="text-secondary">60.0</strong></span>
        </div>
      </div>
    </div>
  )
}
