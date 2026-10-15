"use client"

import React, { useState, useRef, useEffect } from "react"
import { X, Minus, Square, Maximize2 } from "lucide-react"

export interface WindowState {
  id: string
  title: string
  icon: React.ReactNode
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
  position: { x: number; y: number }
  size: { width: number; height: number }
}

interface WindowFrameProps {
  window: WindowState
  onClose: (id: string) => void
  onMinimize: (id: string) => void
  onMaximize: (id: string) => void
  onFocus: (id: string) => void
  onPositionChange: (id: string, pos: { x: number; y: number }) => void
  children: React.ReactNode
}

export function WindowFrame({
  window: win,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
  children,
}: WindowFrameProps) {
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; startX: number; startY: number }>({
    mouseX: 0,
    mouseY: 0,
    startX: 0,
    startY: 0,
  })

  // Mouse drag handles
  const handleMouseDown = (e: React.MouseEvent) => {
    if (win.isMaximized) return
    onFocus(win.id)
    setIsDragging(true)
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: win.position.x,
      startY: win.position.y,
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const dx = e.clientX - dragStartRef.current.mouseX
      const dy = e.clientY - dragStartRef.current.mouseY
      const newX = Math.max(0, Math.min(window.innerWidth - 200, dragStartRef.current.startX + dx))
      const newY = Math.max(30, Math.min(window.innerHeight - 150, dragStartRef.current.startY + dy))
      onPositionChange(win.id, { x: newX, y: newY })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, win.id, onPositionChange])

  if (!win.isOpen || win.isMinimized) return null

  // On mobile screens (< 768px), force full-screen window for optimal ergonomics
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768

  const windowStyle: React.CSSProperties = isMobile || win.isMaximized
    ? {
        position: "fixed",
        top: isMobile ? "32px" : "32px",
        left: 0,
        right: 0,
        bottom: isMobile ? "0px" : "68px",
        width: "100%",
        height: "auto",
        zIndex: win.zIndex,
        borderRadius: isMobile ? "0" : "14px",
      }
    : {
        position: "fixed",
        top: `${win.position.y}px`,
        left: `${win.position.x}px`,
        width: `${Math.min(win.size.width, typeof window !== "undefined" ? window.innerWidth - 40 : 800)}px`,
        height: `${Math.min(win.size.height, typeof window !== "undefined" ? window.innerHeight - 120 : 550)}px`,
        zIndex: win.zIndex,
      }

  return (
    <div
      style={windowStyle}
      onClick={() => onFocus(win.id)}
      className="os-desktop-window animate-in fade-in zoom-in-95 duration-150 shadow-2xl"
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        onDoubleClick={() => onMaximize(win.id)}
        className="os-desktop-window-header"
      >
        {/* Traffic Light Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose(win.id)
            }}
            className="traffic-btn traffic-close group"
            title="Close"
          >
            <X className="w-2.5 h-2.5 text-black/60 opacity-0 group-hover:opacity-100" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onMinimize(win.id)
            }}
            className="traffic-btn traffic-min group"
            title="Minimize"
          >
            <Minus className="w-2.5 h-2.5 text-black/60 opacity-0 group-hover:opacity-100" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onMaximize(win.id)
            }}
            className="traffic-btn traffic-max group"
            title="Maximize"
          >
            <Maximize2 className="w-2 h-2 text-black/60 opacity-0 group-hover:opacity-100" />
          </button>
        </div>

        {/* Window Title & Icon */}
        <div className="flex items-center gap-2 text-xs font-mono font-medium text-foreground truncate max-w-[50vw]">
          <span className="text-primary">{win.icon}</span>
          <span className="truncate">{win.title}</span>
        </div>

        {/* Right side spacer */}
        <div className="w-14" />
      </div>

      {/* Window Body Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 bg-background/60">
        {children}
      </div>
    </div>
  )
}
