"use client"

import React, { useState } from "react"
import { Badge } from "@/components/ui/badge"
import {
  Eye,
  Network,
  Brain,
  Server,
  Terminal,
  Layers,
} from "lucide-react"

type CategoryFilter = "all" | "vision" | "graph_fl" | "ai_ml" | "backend" | "core"

interface SkillItem {
  name: string
  level: "Expert" | "Advanced" | "Proficient"
  years: string
  projects: string
  category: "vision" | "graph_fl" | "ai_ml" | "backend" | "core"
  description: string
  color: string
}

const skillsData: SkillItem[] = [
  {
    name: "Computer Vision & Drone Vision",
    level: "Expert",
    years: "2+ yrs",
    projects: "6+ projects",
    category: "vision",
    description: "Aerial surveillance, crowd counting, object tracking, intrusion detection",
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "YOLO (v8/v11)",
    level: "Expert",
    years: "2+ yrs",
    projects: "5+ projects",
    category: "vision",
    description: "Vehicle detection, real-time edge deployment, aerial dataset fine-tuning",
    color: "from-cyan-500 to-blue-600",
  },
  {
    name: "CSRNet Architecture",
    level: "Advanced",
    years: "1+ yrs",
    projects: "2+ projects",
    category: "vision",
    description: "Dilated convolutional networks for high-density crowd estimation",
    color: "from-teal-500 to-emerald-600",
  },
  {
    name: "OpenCV & Video Pipelines",
    level: "Expert",
    years: "3+ yrs",
    projects: "8+ projects",
    category: "vision",
    description: "Video stream processing, frame extraction, geospatial contour mapping",
    color: "from-indigo-500 to-cyan-600",
  },
  {
    name: "3D Body Estimation (SMPL)",
    level: "Advanced",
    years: "1+ yrs",
    projects: "2+ projects",
    category: "vision",
    description: "Adaptive confidence modeling for monocular shape estimation",
    color: "from-purple-500 to-pink-600",
  },
  {
    name: "Federated Learning (Flower)",
    level: "Advanced",
    years: "1.5+ yrs",
    projects: "3+ projects",
    category: "graph_fl",
    description: "Hierarchical cross-institutional model aggregation with privacy guarantees",
    color: "from-emerald-500 to-teal-600",
  },
  {
    name: "Graph Neural Networks (GNN / GAT)",
    level: "Advanced",
    years: "1.5+ yrs",
    projects: "4+ projects",
    category: "graph_fl",
    description: "Heterogeneous transaction graphs, dynamic connectome fMRI modeling",
    color: "from-teal-500 to-green-600",
  },
  {
    name: "PyTorch Geometric (PyG)",
    level: "Advanced",
    years: "1+ yrs",
    projects: "3+ projects",
    category: "graph_fl",
    description: "Message passing algorithms, topological fraud ring detection",
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "Differential Privacy",
    level: "Proficient",
    years: "1+ yrs",
    projects: "2+ projects",
    category: "graph_fl",
    description: "Noise composition, gradient protection in collaborative banking models",
    color: "from-cyan-500 to-teal-600",
  },
  {
    name: "PyTorch",
    level: "Expert",
    years: "3+ yrs",
    projects: "14+ projects",
    category: "ai_ml",
    description: "Custom loss functions, training loops, tensor optimization",
    color: "from-rose-500 to-orange-600",
  },
  {
    name: "FastAPI & Pydantic",
    level: "Expert",
    years: "2+ yrs",
    projects: "8+ projects",
    category: "backend",
    description: "High-throughput asynchronous ML inference endpoints, schemas",
    color: "from-teal-600 to-cyan-600",
  },
  {
    name: "Docker & Containers",
    level: "Advanced",
    years: "2+ yrs",
    projects: "10+ projects",
    category: "backend",
    description: "Isolated reproducible ML runtimes, multi-stage production builds",
    color: "from-blue-600 to-cyan-600",
  },
  {
    name: "Python",
    level: "Expert",
    years: "3+ yrs",
    projects: "20+ projects",
    category: "core",
    description: "Primary engineering & research language; scientific libraries ecosystem",
    color: "from-amber-500 to-yellow-600",
  },
  {
    name: "C / C++",
    level: "Proficient",
    years: "2+ yrs",
    projects: "6+ projects",
    category: "core",
    description: "Data structures, memory management, algorithmic problem solving",
    color: "from-blue-600 to-slate-700",
  },
]

const filterTabs = [
  { id: "all", label: "All Arsenal", icon: Layers },
  { id: "vision", label: "Vision & Drones", icon: Eye },
  { id: "graph_fl", label: "Graph AI & FL", icon: Network },
  { id: "ai_ml", label: "Deep Learning", icon: Brain },
  { id: "backend", label: "Backend", icon: Server },
  { id: "core", label: "Languages", icon: Terminal },
]

export function SkillsWindow() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all")

  const filtered = skillsData.filter((skill) =>
    activeCategory === "all" ? true : skill.category === activeCategory
  )

  return (
    <div className="space-y-4 select-text">
      {/* Category Pills Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {filterTabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeCategory === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as CategoryFilter)}
              className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white shadow-xs"
                  : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Grid of Skills Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((skill, index) => (
          <div
            key={index}
            className="p-3.5 rounded-xl border border-border bg-background/60 hover:bg-muted/30 transition-all flex flex-col justify-between space-y-2"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-lg bg-gradient-to-br ${skill.color} flex items-center justify-center text-white font-bold text-xs shadow-xs`}
                >
                  {skill.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-xs text-foreground line-clamp-1">{skill.name}</div>
                  <div className="text-[10px] font-mono text-muted-foreground">
                    {skill.years} • <span className="text-primary font-medium">{skill.projects}</span>
                  </div>
                </div>
              </div>

              <Badge variant="outline" className="text-[9px] font-mono uppercase px-1.5 py-0 border-primary/40 text-primary">
                {skill.level}
              </Badge>
            </div>

            <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
              {skill.description}
            </p>

            <div className="pt-1.5 border-t border-border/40">
              <div className="flex justify-between items-center text-[9px] font-mono text-muted-foreground mb-1">
                <span>PROFICIENCY</span>
                <span className="text-foreground font-semibold">
                  {skill.level === "Expert" ? "95%" : skill.level === "Advanced" ? "85%" : "75%"}
                </span>
              </div>
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                  style={{
                    width: skill.level === "Expert" ? "95%" : skill.level === "Advanced" ? "85%" : "75%",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
