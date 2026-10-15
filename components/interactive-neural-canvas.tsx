"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

export type CanvasMode = "neural" | "vision" | "federated"

interface Props {
  mode: CanvasMode
  className?: string
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  baseX: number
  baseY: number
}

export function InteractiveNeuralCanvas({ mode, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const mouseRef = useRef<{ x: number | null; y: number | null; isDown: boolean }>({
    x: null,
    y: null,
    isDown: false,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800)
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400)

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      width = canvas.width = canvas.parentElement.clientWidth
      height = canvas.height = canvas.parentElement.clientHeight
    }
    window.addEventListener("resize", handleResize)

    const isDark = resolvedTheme === "dark" || !mounted

    // Initialize particles for Neural mode
    const particleCount = width < 640 ? 35 : 65
    const particles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 2,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
      })
    }

    // Vision mode bounding boxes
    const boxes = [
      { x: 0.2 * width, y: 0.3 * height, w: 90, h: 60, label: "DRONE_OBJ_01", conf: "98.4%" },
      { x: 0.65 * width, y: 0.25 * height, w: 110, h: 80, label: "CROWD_CLUSTER", conf: "96.2%" },
      { x: 0.45 * width, y: 0.6 * height, w: 85, h: 55, label: "VEHICLE_AERIAL", conf: "99.1%" },
    ]

    let angle = 0
    let scanLineY = 0

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // ==========================================
      // MODE 1: NEURAL CONNECTOME
      // ==========================================
      if (mode === "neural") {
        const primaryColor = isDark ? "rgba(129, 140, 248," : "rgba(79, 70, 229,"
        const secondaryColor = isDark ? "rgba(56, 189, 248," : "rgba(14, 165, 233,"

        // Draw connecting edges
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const maxDist = width < 640 ? 75 : 110

            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * 0.45
              ctx.strokeStyle = `${primaryColor} ${alpha})`
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.stroke()
            }
          }

          // Mouse/Touch attraction & connection
          if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
            const mdx = particles[i].x - mouseRef.current.x
            const mdy = particles[i].y - mouseRef.current.y
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy)
            const mouseRadius = 140

            if (mDist < mouseRadius) {
              const alpha = (1 - mDist / mouseRadius) * 0.7
              ctx.strokeStyle = `${secondaryColor} ${alpha})`
              ctx.lineWidth = 1.5
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(mouseRef.current.x, mouseRef.current.y)
              ctx.stroke()

              // Gentle repulsion / attraction
              particles[i].x += (mdx / mDist) * 0.4
              particles[i].y += (mdy / mDist) * 0.4
            }
          }

          // Update & draw particle
          particles[i].x += particles[i].vx
          particles[i].y += particles[i].vy

          if (particles[i].x < 0 || particles[i].x > width) particles[i].vx *= -1
          if (particles[i].y < 0 || particles[i].y > height) particles[i].vy *= -1

          ctx.fillStyle = i % 3 === 0 ? `${secondaryColor} 0.8)` : `${primaryColor} 0.85)`
          ctx.beginPath()
          ctx.arc(particles[i].x, particles[i].y, particles[i].radius, 0, Math.PI * 2)
          ctx.fill()
        }

        // Draw Touch/Cursor Aura
        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
          ctx.strokeStyle = `${secondaryColor} 0.5)`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(mouseRef.current.x, mouseRef.current.y, 24, 0, Math.PI * 2)
          ctx.stroke()
        }
      }

      // ==========================================
      // MODE 2: VISION HUD & AERIAL BOUNDING BOXES
      // ==========================================
      else if (mode === "vision") {
        const cyanColor = isDark ? "#38bdf8" : "#0284c7"
        const roseColor = isDark ? "#fb7185" : "#e11d48"

        // Moving Scan Line
        scanLineY = (scanLineY + 1.5) % height
        ctx.strokeStyle = isDark ? "rgba(56, 189, 248, 0.4)" : "rgba(2, 132, 199, 0.3)"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0, scanLineY)
        ctx.lineTo(width, scanLineY)
        ctx.stroke()

        // Draw Bounding Boxes with targeting brackets
        boxes.forEach((box, idx) => {
          const isTargeted =
            mouseRef.current.x !== null &&
            mouseRef.current.y !== null &&
            mouseRef.current.x > box.x - 20 &&
            mouseRef.current.x < box.x + box.w + 20 &&
            mouseRef.current.y > box.y - 20 &&
            mouseRef.current.y < box.y + box.h + 20

          const boxColor = isTargeted ? roseColor : cyanColor
          ctx.strokeStyle = boxColor
          ctx.lineWidth = isTargeted ? 2 : 1.5

          // Box rectangle
          ctx.strokeRect(box.x, box.y, box.w, box.h)

          // Background fill
          ctx.fillStyle = isTargeted
            ? isDark
              ? "rgba(251, 113, 133, 0.15)"
              : "rgba(225, 29, 72, 0.08)"
            : isDark
            ? "rgba(56, 189, 248, 0.08)"
            : "rgba(2, 132, 199, 0.05)"
          ctx.fillRect(box.x, box.y, box.w, box.h)

          // Label text
          ctx.font = "10px monospace"
          ctx.fillStyle = boxColor
          ctx.fillText(`${box.label} [${box.conf}]`, box.x, box.y - 5)
        })

        // Draw interactive targeting reticle on cursor / touch
        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const mx = mouseRef.current.x
          const my = mouseRef.current.y
          ctx.strokeStyle = roseColor
          ctx.lineWidth = 1.5

          // Reticle ring
          ctx.beginPath()
          ctx.arc(mx, my, 22, 0, Math.PI * 2)
          ctx.stroke()

          // Crosshair lines
          ctx.beginPath()
          ctx.moveTo(mx - 28, my)
          ctx.lineTo(mx - 8, my)
          ctx.moveTo(mx + 8, my)
          ctx.lineTo(mx + 28, my)
          ctx.moveTo(mx, my - 28)
          ctx.lineTo(mx, my - 8)
          ctx.moveTo(mx, my + 8)
          ctx.lineTo(mx, my + 28)
          ctx.stroke()

          ctx.font = "10px monospace"
          ctx.fillStyle = roseColor
          ctx.fillText(`TARGET LOCKED: ${Math.round(mx)}, ${Math.round(my)}`, mx + 30, my - 10)
        }
      }

      // ==========================================
      // MODE 3: FEDERATED GRAPH SWARM
      // ==========================================
      else if (mode === "federated") {
        angle += 0.015
        const centerX = width / 2
        const centerY = height / 2
        const primaryColor = isDark ? "#818cf8" : "#4f46e5"
        const cyanColor = isDark ? "#38bdf8" : "#0ea5e9"
        const greenColor = isDark ? "#34d399" : "#10b981"

        // Center Aggregator Node
        ctx.fillStyle = isDark ? "rgba(99, 102, 241, 0.25)" : "rgba(79, 70, 229, 0.15)"
        ctx.beginPath()
        ctx.arc(centerX, centerY, 38, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = primaryColor
        ctx.lineWidth = 2
        ctx.stroke()

        ctx.font = "bold 11px monospace"
        ctx.fillStyle = isDark ? "#ffffff" : "#0f172a"
        ctx.textAlign = "center"
        ctx.fillText("FL-SERVER", centerX, centerY + 4)
        ctx.textAlign = "start"

        // Orbiting Client Nodes
        const clientCount = 5
        const orbitRadius = Math.min(width, height) * 0.35

        for (let i = 0; i < clientCount; i++) {
          const clientAngle = angle + (i * (Math.PI * 2)) / clientCount
          const cx = centerX + Math.cos(clientAngle) * orbitRadius
          const cy = centerY + Math.sin(clientAngle) * orbitRadius

          // Edge line from client to server
          ctx.strokeStyle = isDark ? "rgba(99, 102, 241, 0.25)" : "rgba(79, 70, 229, 0.2)"
          ctx.lineWidth = 1
          ctx.setLineDash([4, 4])
          ctx.beginPath()
          ctx.moveTo(centerX, centerY)
          ctx.lineTo(cx, cy)
          ctx.stroke()
          ctx.setLineDash([])

          // Client Node
          ctx.fillStyle = isDark ? "rgba(56, 189, 248, 0.3)" : "rgba(14, 165, 233, 0.2)"
          ctx.beginPath()
          ctx.arc(cx, cy, 18, 0, Math.PI * 2)
          ctx.fill()
          ctx.strokeStyle = cyanColor
          ctx.lineWidth = 1.5
          ctx.stroke()

          // Differential Privacy Pulse traveling along edge
          const pulseT = (angle * 2 + i * 0.7) % 1
          const pulseX = cx + (centerX - cx) * pulseT
          const pulseY = cy + (centerY - cy) * pulseT
          ctx.fillStyle = greenColor
          ctx.beginPath()
          ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2)
          ctx.fill()

          ctx.font = "9px monospace"
          ctx.fillStyle = isDark ? "#94a3b8" : "#475569"
          ctx.fillText(`BANK_0${i + 1}`, cx - 20, cy + 30)
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [mode, resolvedTheme, mounted])

  // Mouse Handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseRef.current.x = e.clientX - rect.left
    mouseRef.current.y = e.clientY - rect.top
  }

  const handleMouseLeave = () => {
    mouseRef.current.x = null
    mouseRef.current.y = null
  }

  // Touch Handlers for Smartphones and Tablets
  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect || !e.touches[0]) return
    mouseRef.current.x = e.touches[0].clientX - rect.left
    mouseRef.current.y = e.touches[0].clientY - rect.top
  }

  const handleTouchEnd = () => {
    mouseRef.current.x = null
    mouseRef.current.y = null
  }

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`w-full h-full cursor-crosshair touch-none select-none ${className}`}
    />
  )
}
