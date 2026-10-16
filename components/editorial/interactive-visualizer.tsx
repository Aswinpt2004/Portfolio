"use client"

import React, { useState } from "react"
import { Eye, Shield, Brain, ZoomIn, Activity, CheckCircle2, ShieldAlert, Crosshair, Sparkles } from "lucide-react"

export type VisualizerMode = "drone" | "fedgraph" | "connectome"

interface TargetBox {
  id: number
  x: number
  y: number
  w: number
  h: number
  label: string
  confidence: number
}

export function InteractiveVisualizer() {
  const [mode, setMode] = useState<VisualizerMode>("drone")

  // DRONE VISION STATE
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [showBoxes, setShowBoxes] = useState(true)
  const [boxes, setBoxes] = useState<TargetBox[]>([
    { id: 1, x: 20, y: 24, w: 22, h: 24, label: "VEHICLE_AERIAL", confidence: 98.4 },
    { id: 2, x: 58, y: 35, w: 26, h: 28, label: "CROWD_CLUSTER", confidence: 96.1 },
  ])
  const [coords, setCoords] = useState("8.5241° N, 76.9366° E")

  // FEDGRAPH STATE
  const [isAttackRunning, setIsAttackRunning] = useState(false)
  const [attackStatus, setAttackStatus] = useState<"idle" | "attacking" | "defended">("idle")
  const [round, setRound] = useState(42)

  const handleCameraClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const xPercent = Math.round(((e.clientX - rect.left) / rect.width) * 100)
    const yPercent = Math.round(((e.clientY - rect.top) / rect.height) * 100)

    const labels = ["VEHICLE_AERIAL", "CROWD_CLUSTER", "DRONE_TARGET", "INTRUSION_CHECK"]
    const label = labels[Math.floor(Math.random() * labels.length)]
    const confidence = +(95 + Math.random() * 4.8).toFixed(1)

    const newBox: TargetBox = {
      id: Date.now(),
      x: Math.max(5, Math.min(80, xPercent - 10)),
      y: Math.max(5, Math.min(80, yPercent - 10)),
      w: 20,
      h: 22,
      label,
      confidence,
    }

    setBoxes((prev) => [...prev.slice(-3), newBox])
    setCoords(`LAT: ${(8.5 + yPercent / 1000).toFixed(4)}° N, LON: ${(76.9 + xPercent / 1000).toFixed(4)}° E`)
  }

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

  return (
    <div className="editorial-card overflow-hidden select-none shadow-sm">
      {/* Top Tabs */}
      <div className="p-2 border-b border-border bg-muted/30 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMode("drone")}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              mode === "drone" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Drone Vision
          </button>
          <button
            onClick={() => setMode("fedgraph")}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              mode === "fedgraph" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            FedGraph AI
          </button>
        </div>

        <span className="text-[10px] text-muted-foreground hidden sm:inline">
          INTERACTIVE SIMULATOR
        </span>
      </div>

      {/* Viewport: Drone Vision */}
      {mode === "drone" && (
        <div className="p-3 bg-background/50 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
            <div className="flex items-center gap-1.5 text-primary font-bold">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>YOLOv8 + CSRNet</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowBoxes(!showBoxes)}
                className={`px-2 py-0.5 rounded text-[10px] border ${
                  showBoxes ? "bg-primary text-white border-primary" : "border-border"
                }`}
              >
                Boxes: {showBoxes ? "ON" : "OFF"}
              </button>
              <button
                onClick={() => setShowHeatmap(!showHeatmap)}
                className={`px-2 py-0.5 rounded text-[10px] border ${
                  showHeatmap ? "bg-accent text-white border-accent" : "border-border"
                }`}
              >
                Heatmap
              </button>
            </div>
          </div>

          <div
            onClick={handleCameraClick}
            className="relative h-44 sm:h-52 w-full rounded-xl overflow-hidden border border-border cursor-crosshair bg-slate-950 shadow-inner"
          >
            {/* Background Map Contours */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(#1e293b 1px, transparent 1px), radial-gradient(#0f172a 1px, #020617 1px)",
                backgroundSize: "20px 20px, 40px 40px",
              }}
            />

            {/* CSRNet Heatmap */}
            {showHeatmap && (
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/30 via-amber-500/25 to-blue-500/20 animate-pulse pointer-events-none" />
            )}

            {/* Crosshair */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Crosshair className="w-8 h-8 text-primary/40 animate-pulse" />
            </div>

            {/* Dynamic Target Bounding Boxes */}
            {showBoxes &&
              boxes.map((b) => (
                <div
                  key={b.id}
                  className="absolute border-2 border-primary bg-primary/10 rounded transition-all duration-300 p-0.5 pointer-events-none"
                  style={{
                    left: `${b.x}%`,
                    top: `${b.y}%`,
                    width: `${b.w}%`,
                    height: `${b.h}%`,
                  }}
                >
                  <span className="text-[8px] font-mono font-bold bg-primary text-white px-1 py-0.2 rounded shadow-xs block truncate">
                    {b.label} [{b.confidence}%]
                  </span>
                </div>
              ))}

            <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm pointer-events-none">
              🎯 Tap to trigger YOLO target
            </div>
          </div>
        </div>
      )}

      {/* Viewport: FedGraph AI */}
      {mode === "fedgraph" && (
        <div className="p-3 bg-background/50 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-secondary font-bold">DP-Guaranteed FL (ε=0.5)</span>
            <button
              onClick={handleTriggerAttack}
              disabled={isAttackRunning}
              className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold transition-all ${
                isAttackRunning
                  ? "bg-amber-500 text-white animate-pulse"
                  : attackStatus === "defended"
                  ? "bg-emerald-600 text-white"
                  : "bg-primary text-white"
              }`}
            >
              {isAttackRunning
                ? "Attacking..."
                : attackStatus === "defended"
                ? "Blocked! (Test Again)"
                : "Simulate Fraud Attack"}
            </button>
          </div>

          <div className="relative h-44 sm:h-52 w-full rounded-xl overflow-hidden border border-border bg-slate-950 flex items-center justify-center p-2 text-xs font-mono">
            {/* Center FL Server */}
            <div className="relative z-10 w-20 h-20 rounded-xl bg-indigo-900/70 border border-indigo-400 flex flex-col items-center justify-center text-white shadow-md">
              <span className="text-[10px] font-bold">FL-SERVER</span>
              <span className="text-[8px] text-indigo-300">Round #{round}</span>
            </div>

            {/* Orbiting Bank Nodes */}
            <div
              className={`absolute top-3 left-4 p-2 rounded-lg border text-[10px] transition-colors ${
                attackStatus === "attacking"
                  ? "bg-rose-950 border-rose-500 text-rose-300 animate-bounce"
                  : "bg-slate-900 border-slate-700 text-slate-300"
              }`}
            >
              BANK ALPHA
            </div>

            <div
              className={`absolute top-3 right-4 p-2 rounded-lg border text-[10px] transition-colors ${
                attackStatus === "attacking"
                  ? "bg-rose-950 border-rose-500 text-rose-300 animate-bounce"
                  : "bg-slate-900 border-slate-700 text-slate-300"
              }`}
            >
              BANK BETA
            </div>

            <div
              className={`absolute bottom-3 left-4 p-2 rounded-lg border text-[10px] transition-colors ${
                attackStatus === "defended"
                  ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                  : "bg-slate-900 border-slate-700 text-slate-300"
              }`}
            >
              BANK GAMMA
            </div>

            <div
              className={`absolute bottom-3 right-4 p-2 rounded-lg border text-[10px] transition-colors ${
                attackStatus === "defended"
                  ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                  : "bg-slate-900 border-slate-700 text-slate-300"
              }`}
            >
              BANK DELTA
            </div>
          </div>
        </div>
      )}

      {/* Telemetry Footer */}
      <div className="px-3 py-1.5 bg-muted/40 border-t border-border flex items-center justify-between text-[10px] font-mono text-muted-foreground">
        <span>QUANTUMWEAVE AI LAB</span>
        <span>LATENCY: 12.4ms</span>
      </div>
    </div>
  )
}
