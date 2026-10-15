"use client"

import React from "react"

interface DesktopIconProps {
  id: string
  title: string
  icon: React.ReactNode
  type?: "folder" | "app" | "file"
  badge?: string
  onClick: () => void
}

export function DesktopIcon({
  title,
  icon,
  type = "app",
  badge,
  onClick,
}: DesktopIconProps) {
  return (
    <div
      onClick={onClick}
      className="desktop-icon-btn group select-none relative focus:outline-none focus:ring-1 focus:ring-primary/40"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick()
        }
      }}
    >
      {/* Icon Graphic Container */}
      <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-md">
        {icon}
        {badge && (
          <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-primary text-white text-[9px] font-mono font-bold rounded-full shadow-sm">
            {badge}
          </span>
        )}
      </div>

      {/* Icon Label with Shadow */}
      <span className="text-[11px] font-medium text-foreground text-center line-clamp-2 px-1 mt-1.5 leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
        {title}
      </span>
    </div>
  )
}
