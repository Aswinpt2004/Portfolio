"use client"

import React, { useRef, useEffect, useState, useCallback } from "react"

export interface ConnectomeNode {
  id: string
  label: string
  subtitle: string
  category: "vision" | "graph" | "neuro" | "career" | "contact"
  x: number // 0 - 100 percentage
  y: number // 0 - 100 percentage
  vx: number
  vy: number
  radius: number
  colorDark: string
  colorLight: string
}

export interface ConnectomeEdge {
  from: string
  to: string
  weight: number // 0 - 1
}

interface Props {
  activeNodeId: string
  onSelectNode: (id: string) => void
}

const BASE_NODES: ConnectomeNode[] = [
  {
    id: "fmri-connectome",
    label: "Dynamic fMRI Connectome",
    subtitle: "BrainGNN • 1,200 HCP Subjects",
    category: "neuro",
    x: 48,
    y: 26,
    vx: 0.15,
    vy: -0.1,
    radius: 22,
    colorDark: "#a855f7", // Purple
    colorLight: "#7c3aed",
  },
  {
    id: "drone-vision",
    label: "Drone Aerial Vision",
    subtitle: "YOLOv8 • CSRNet • 42 FPS",
    category: "vision",
    x: 22,
    y: 44,
    vx: -0.12,
    vy: 0.14,
    radius: 24,
    colorDark: "#22d3ee", // Cyan
    colorLight: "#0284c7",
  },
  {
    id: "fedgraph-shield",
    label: "FedGraph-Shield",
    subtitle: "Federated GNN • DP (ε=0.5)",
    category: "graph",
    x: 75,
    y: 42,
    vx: 0.1,
    vy: 0.12,
    radius: 24,
    colorDark: "#38bdf8", // Sky blue
    colorLight: "#0369a1",
  },
  {
    id: "edge-mlops",
    label: "Technical Arsenal",
    subtitle: "TensorRT • CUDA • FastAPI",
    category: "vision",
    x: 32,
    y: 72,
    vx: -0.08,
    vy: -0.12,
    radius: 20,
    colorDark: "#818cf8", // Indigo
    colorLight: "#4f46e5",
  },
  {
    id: "career-pedigree",
    label: "Career & DUK M.Sc",
    subtitle: "Quantumweave • Synbrains • DUK",
    category: "career",
    x: 65,
    y: 74,
    vx: 0.12,
    vy: -0.09,
    radius: 20,
    colorDark: "#34d399", // Emerald
    colorLight: "#059669",
  },
  {
    id: "dispatch-contact",
    label: "Dispatch Transmission",
    subtitle: "aswinpt98@gmail.com • Connect",
    category: "contact",
    x: 50,
    y: 90,
    vx: 0,
    vy: 0.08,
    radius: 18,
    colorDark: "#fb7185", // Rose
    colorLight: "#e11d48",
  },
]

const EDGES: ConnectomeEdge[] = [
  { from: "fmri-connectome", to: "fedgraph-shield", weight: 0.9 },
  { from: "fmri-connectome", to: "drone-vision", weight: 0.75 },
  { from: "drone-vision", to: "edge-mlops", weight: 0.95 },
  { from: "fedgraph-shield", to: "edge-mlops", weight: 0.8 },
  { from: "edge-mlops", to: "career-pedigree", weight: 0.85 },
  { from: "fedgraph-shield", to: "career-pedigree", weight: 0.8 },
  { from: "career-pedigree", to: "dispatch-contact", weight: 0.7 },
  { from: "drone-vision", to: "career-pedigree", weight: 0.75 },
  { from: "edge-mlops", to: "dispatch-contact", weight: 0.65 },
]

export function NeuralCanvas({ activeNodeId, onSelectNode }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const nodesRef = useRef<ConnectomeNode[]>(JSON.parse(JSON.stringify(BASE_NODES)))
  const hoveredNodeIdRef = useRef<string | null>(null)
  const draggedNodeIdRef = useRef<string | null>(null)
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)

  // Pulses representing action potentials travelling on edges
  const pulsesRef = useRef<{ edgeIdx: number; progress: number; speed: number }[]>([
    { edgeIdx: 0, progress: 0.1, speed: 0.007 },
    { edgeIdx: 1, progress: 0.5, speed: 0.009 },
    { edgeIdx: 2, progress: 0.8, speed: 0.006 },
    { edgeIdx: 4, progress: 0.3, speed: 0.008 },
    { edgeIdx: 6, progress: 0.7, speed: 0.01 },
  ])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let isDark = document.documentElement.classList.contains("dark")

    // Theme observer
    const observer = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains("dark")
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    const handleResize = () => {
      if (!canvas) return
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Render loop
    const render = () => {
      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height

      ctx.clearRect(0, 0, width, height)

      // Background subtle connectome ambient glow
      const cx = width / 2
      const cy = height / 2
      const bgGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(width, height) * 0.7)
      if (isDark) {
        bgGrad.addColorStop(0, "rgba(79, 70, 229, 0.08)")
        bgGrad.addColorStop(0.5, "rgba(6, 182, 212, 0.03)")
        bgGrad.addColorStop(1, "rgba(6, 7, 19, 0)")
      } else {
        bgGrad.addColorStop(0, "rgba(79, 70, 229, 0.05)")
        bgGrad.addColorStop(0.5, "rgba(2, 132, 199, 0.02)")
        bgGrad.addColorStop(1, "rgba(248, 250, 252, 0)")
      }
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, width, height)

      // Update node organic harmonic drift (unless being dragged)
      const nodes = nodesRef.current
      nodes.forEach((node) => {
        if (draggedNodeIdRef.current !== node.id) {
          node.x += node.vx * 0.1
          node.y += node.vy * 0.1

          // Boundary bouncing within 10% - 90%
          if (node.x <= 15 || node.x >= 85) node.vx *= -1
          if (node.y <= 15 || node.y >= 88) node.vy *= -1
        }
      })

      // Draw Synapse Edges
      EDGES.forEach((edge, idx) => {
        const fromNode = nodes.find((n) => n.id === edge.from)
        const toNode = nodes.find((n) => n.id === edge.to)
        if (!fromNode || !toNode) return

        const x1 = (fromNode.x / 100) * width
        const y1 = (fromNode.y / 100) * height
        const x2 = (toNode.x / 100) * width
        const y2 = (toNode.y / 100) * height

        const isConnectedToActive = 
          fromNode.id === activeNodeId || toNode.id === activeNodeId
        const isConnectedToHover = 
          fromNode.id === hoveredNodeIdRef.current || toNode.id === hoveredNodeIdRef.current

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)

        if (isConnectedToActive || isConnectedToHover) {
          ctx.strokeStyle = isDark ? "rgba(34, 211, 238, 0.75)" : "rgba(79, 70, 229, 0.65)"
          ctx.lineWidth = 2.2
          ctx.setLineDash([])
        } else {
          ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.14)" : "rgba(15, 23, 42, 0.12)"
          ctx.lineWidth = 1.2
          ctx.setLineDash([4, 4])
        }
        ctx.stroke()
        ctx.setLineDash([])
      })

      // Draw Action Potential Pulses
      pulsesRef.current.forEach((pulse) => {
        pulse.progress += pulse.speed
        if (pulse.progress >= 1) {
          pulse.progress = 0
          pulse.edgeIdx = Math.floor(Math.random() * EDGES.length)
        }

        const edge = EDGES[pulse.edgeIdx]
        if (!edge) return
        const fromNode = nodes.find((n) => n.id === edge.from)
        const toNode = nodes.find((n) => n.id === edge.to)
        if (!fromNode || !toNode) return

        const x1 = (fromNode.x / 100) * width
        const y1 = (fromNode.y / 100) * height
        const x2 = (toNode.x / 100) * width
        const y2 = (toNode.y / 100) * height

        const px = x1 + (x2 - x1) * pulse.progress
        const py = y1 + (y2 - y1) * pulse.progress

        ctx.beginPath()
        ctx.arc(px, py, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = isDark ? "#22d3ee" : "#4f46e5"
        ctx.shadowColor = isDark ? "#22d3ee" : "#4f46e5"
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Draw Synapse Nodes
      nodes.forEach((node) => {
        const nx = (node.x / 100) * width
        const ny = (node.y / 100) * height
        const isActive = node.id === activeNodeId
        const isHovered = node.id === hoveredNodeIdRef.current
        const color = isDark ? node.colorDark : node.colorLight

        const radius = isActive ? node.radius * 1.3 : isHovered ? node.radius * 1.15 : node.radius

        // Outer Glow Ring for active node
        if (isActive) {
          ctx.beginPath()
          ctx.arc(nx, ny, radius + 8, 0, Math.PI * 2)
          ctx.strokeStyle = color
          ctx.lineWidth = 1.5
          ctx.shadowColor = color
          ctx.shadowBlur = 15
          ctx.stroke()
          ctx.shadowBlur = 0
        }

        // Main Node Circle
        ctx.beginPath()
        ctx.arc(nx, ny, radius, 0, Math.PI * 2)
        ctx.fillStyle = isDark ? (isActive ? color : "rgba(17, 21, 42, 0.95)") : (isActive ? color : "rgba(255, 255, 255, 0.95)")
        ctx.fill()

        ctx.strokeStyle = color
        ctx.lineWidth = isActive ? 2.5 : 1.5
        ctx.stroke()

        // Inner Core dot
        ctx.beginPath()
        ctx.arc(nx, ny, isActive ? 6 : 4, 0, Math.PI * 2)
        ctx.fillStyle = isActive ? (isDark ? "#060713" : "#ffffff") : color
        ctx.fill()

        // Label typography
        const isCompact = width < 600
        const fontSize = isCompact ? (isActive ? 11 : 9.5) : (isActive ? 12.5 : 11)
        ctx.font = `600 ${fontSize}px Space Grotesk, Inter, sans-serif`
        ctx.textAlign = "center"
        ctx.fillStyle = isDark ? (isActive ? "#ffffff" : "#cbd5e1") : (isActive ? "#0f172a" : "#334155")
        ctx.fillText(node.label, nx, ny + radius + 15)

        // Subtitle (only on medium/large screens or active node)
        if (!isCompact || isActive) {
          ctx.font = `400 ${fontSize - 2}px JetBrains Mono, monospace`
          ctx.fillStyle = isDark ? (isActive ? color : "#64748b") : (isActive ? color : "#64748b")
          ctx.fillText(node.subtitle, nx, ny + radius + 28)
        }
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
      observer.disconnect()
    }
  }, [activeNodeId])

  // Mouse & Touch Interaction Helpers
  const getNodeAtCoords = (clientX: number, clientY: number): ConnectomeNode | null => {
    const canvas = canvasRef.current
    if (!canvas) return null
    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top

    for (const node of nodesRef.current) {
      const nx = (node.x / 100) * rect.width
      const ny = (node.y / 100) * rect.height
      const dist = Math.hypot(x - nx, y - ny)
      if (dist <= node.radius + 15) {
        return node
      }
    }
    return null
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    const node = getNodeAtCoords(e.clientX, e.clientY)
    if (node) {
      draggedNodeIdRef.current = node.id
      onSelectNode(node.id)
    }
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()

    if (draggedNodeIdRef.current) {
      const draggedNode = nodesRef.current.find((n) => n.id === draggedNodeIdRef.current)
      if (draggedNode) {
        draggedNode.x = Math.max(10, Math.min(90, ((e.clientX - rect.left) / rect.width) * 100))
        draggedNode.y = Math.max(10, Math.min(90, ((e.clientY - rect.top) / rect.height) * 100))
      }
    } else {
      const node = getNodeAtCoords(e.clientX, e.clientY)
      if (node?.id !== hoveredNodeIdRef.current) {
        hoveredNodeIdRef.current = node ? node.id : null
        setHoveredNodeId(hoveredNodeIdRef.current)
      }
    }
  }

  const handlePointerUp = () => {
    draggedNodeIdRef.current = null
  }

  return (
    <div className="relative w-full h-full overflow-hidden select-none cursor-grab active:cursor-grabbing">
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="w-full h-full block touch-none"
      />

      {/* Floating Canvas Quick Hint */}
      <div className="absolute top-3 left-3 pointer-events-none text-[10px] font-mono text-muted-foreground bg-card/60 backdrop-blur-sm px-2.5 py-1 rounded-md border border-border flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span>Click or Drag Synapse Nodes</span>
      </div>
    </div>
  )
}
