"use client"

import React, { useState } from "react"
import { Eye, ZoomIn, Crosshair, Sparkles, Activity } from "lucide-react"

interface TargetBox {
  id: number
  x: number
  y: number
  w: number
  h: number
  label: string
  confidence: number
}

export function DroneVisionWindow() {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [showBoxes, setShowBoxes] = useState(true)
  const [boxes, setBoxes] = useState<TargetBox[]>([
    { id: 1, x: 22, y: 28, w: 20, h: 22, label: "VEHICLE_AERIAL", confidence: 98.4 },
    { id: 2, x: 58, y: 22, w: 24, h: 26, label: "CROWD_CLUSTER", confidence: 96.7 },
    { id: 3, x: 40, y: 60, w: 18, h: 20, label: "INTRUSION_ALERT", confidence: 94.2 },
  ])
  const [coords, setCoords] = useState("8.5241° N, 76.9366° E")

  const handleCameraClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const xPercent = Math.round(((e.clientX - rect.left) / rect.width) * 100)
    const yPercent = Math.round(((e.clientY - rect.top) / rect.height) * 100)

    const labels = ["CROWD_CLUSTER", "VEHICLE_AERIAL", "DRONE_OBJ_TRACK", "PERIMETER_CHECK"]
    const randomLabel = labels[Math.floor(Math.random() * labels.length)]
    const randomConf = +(95 + Math.random() * 4.9).toFixed(1)

    const newBox: TargetBox = {
      id: Date.now(),
      x: Math.max(5, Math.min(85, xPercent - 8)),
      y: Math.max(5, Math.min(85, yPercent - 8)),
      w: 18,
      h: 20,
      label: randomLabel,
      confidence: randomConf,
    }

    setBoxes((prev) => [...prev.slice(-4), newBox])
    setCoords(`LAT: ${(8.5 + yPercent / 1000).toFixed(4)}° N, LON: ${(76.9 + xPercent / 1000).toFixed(4)}° E`)
  }

  return (
    <div className="h-full flex flex-col space-y-3 font-mono text-xs select-none">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-muted/40 border border-border">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 font-bold text-primary">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            LIVE DRONE TELEMETRY
          </span>
          <span className="text-muted-foreground hidden sm:inline">ALT: 120m</span>
          <span className="text-muted-foreground">{coords}</span>
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
            title="Zoom"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Camera Viewport */}
      <div
        onClick={handleCameraClick}
        className="relative flex-1 min-h-[300px] w-full rounded-2xl overflow-hidden border border-border cursor-crosshair bg-slate-950 shadow-inner"
      >
        <div
          className="absolute inset-0 transition-transform duration-500"
          style={{
            transform: `scale(${zoomLevel})`,
            backgroundImage:
              "radial-gradient(#1e293b 1px, transparent 1px), radial-gradient(#0f172a 1px, #020617 1px)",
            backgroundSize: "24px 24px, 48px 48px",
          }}
        >
          <div className="absolute top-1/4 left-1/3 w-64 h-32 rounded-full bg-blue-950/40 blur-xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-40 rounded-full bg-indigo-950/40 blur-xl" />
        </div>

        {/* Heatmap */}
        {showHeatmap && (
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/25 via-amber-500/25 to-blue-500/15 pointer-events-none animate-pulse" />
        )}

        {/* Reticle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Crosshair className="w-10 h-10 text-primary/40 animate-pulse" />
        </div>

        {/* Bounding Boxes */}
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
              <span className="text-[9px] font-mono font-bold bg-primary text-white px-1 py-0.5 rounded shadow-xs">
                {box.label} [{box.confidence}%]
              </span>
            </div>
          ))}

        <div className="absolute bottom-3 left-4 text-[11px] font-mono text-white/80 bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-sm pointer-events-none">
          🎯 Click or tap anywhere to trigger a YOLO detection box
        </div>
      </div>
    </div>
  )
}
