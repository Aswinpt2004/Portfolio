"use client"

import React from "react"
import {
  Folder,
  Layers,
  Cpu,
  Briefcase,
  Eye,
  Shield,
  Terminal,
  FileText,
  Mail,
  Trash2,
} from "lucide-react"

interface DockItem {
  id: string
  label: string
  icon: React.ReactNode
  isOpen: boolean
  onClick: () => void
}

interface OsDockProps {
  items: DockItem[]
}

export function OsDock({ items }: OsDockProps) {
  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 px-3 py-2 os-desktop-dock shadow-2xl max-w-[95vw] overflow-x-auto scrollbar-none">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={item.onClick}
          className="group relative p-2 rounded-2xl hover:bg-primary/15 transition-all duration-200 hover:scale-125 flex flex-col items-center justify-center shrink-0"
          aria-label={item.label}
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center">
            {item.icon}
          </div>

          {/* Running Application Indicator Dot */}
          <span
            className={`w-1 h-1 rounded-full mt-0.5 transition-colors ${
              item.isOpen ? "bg-primary" : "opacity-0"
            }`}
          />

          {/* Tooltip */}
          <span className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-popover text-popover-foreground text-[10px] font-mono px-2 py-0.5 rounded-lg border border-border pointer-events-none whitespace-nowrap shadow-md z-50">
            {item.label}
          </span>
        </button>
      ))}

      <div className="w-[1px] h-7 bg-border mx-1 shrink-0" />

      {/* Trash */}
      <div
        className="group relative p-2 rounded-2xl hover:bg-primary/15 transition-all duration-200 hover:scale-125 flex flex-col items-center justify-center text-muted-foreground shrink-0 cursor-pointer"
        title="Trash"
      >
        <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center">
          <Trash2 className="w-5 h-5" />
        </div>
        <span className="w-1 h-1 opacity-0" />
      </div>
    </div>
  )
}
