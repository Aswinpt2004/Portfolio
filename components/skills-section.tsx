"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Code,
  Globe,
  Brain,
  Database,
  Cpu,
  Eye,
  Network,
  Server,
  Terminal,
  Zap,
  Sparkles,
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
  // Computer Vision & Drone Sensing
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

  // Federated Learning & Graph Neural Networks
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

  // AI/ML Foundations
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
    name: "TensorFlow & Keras",
    level: "Advanced",
    years: "2+ yrs",
    projects: "7+ projects",
    category: "ai_ml",
    description: "Time-series LSTM forecasting, CNN classification pipelines",
    color: "from-amber-500 to-orange-600",
  },
  {
    name: "Agentic & Generative AI",
    level: "Advanced",
    years: "1.5+ yrs",
    projects: "5+ projects",
    category: "ai_ml",
    description: "Multimodal catalog agents, Gemini API, local Llama-3 via Ollama",
    color: "from-indigo-600 to-purple-600",
  },

  // Backend & Systems
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
    name: "Docker & Containerization",
    level: "Advanced",
    years: "2+ yrs",
    projects: "10+ projects",
    category: "backend",
    description: "Isolated reproducible ML runtimes, multi-stage production builds",
    color: "from-blue-600 to-cyan-600",
  },
  {
    name: "Django & Flask",
    level: "Advanced",
    years: "3+ yrs",
    projects: "9+ projects",
    category: "backend",
    description: "Full-stack portals, CRUD database architecture, RESTful APIs",
    color: "from-emerald-600 to-green-700",
  },
  {
    name: "PostgreSQL & MySQL",
    level: "Advanced",
    years: "2.5+ yrs",
    projects: "10+ projects",
    category: "backend",
    description: "Relational modeling, indexing, query optimization for AI backends",
    color: "from-blue-600 to-indigo-700",
  },

  // Core Languages
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
  {
    name: "JavaScript / TypeScript",
    level: "Advanced",
    years: "2+ yrs",
    projects: "8+ projects",
    category: "core",
    description: "Next.js, React, modern asynchronous UI/UX development",
    color: "from-yellow-500 to-amber-600",
  },
  {
    name: "Git & Linux Devops",
    level: "Expert",
    years: "3+ yrs",
    projects: "All",
    category: "core",
    description: "Git branching protocols, bash scripting, remote GPU server workflows",
    color: "from-rose-500 to-red-600",
  },
]

const filterTabs = [
  { id: "all", label: "All Arsenal", icon: Layers },
  { id: "vision", label: "Computer Vision & Drones", icon: Eye },
  { id: "graph_fl", label: "Federated Learning & GNNs", icon: Network },
  { id: "ai_ml", label: "Deep Learning & AI", icon: Brain },
  { id: "backend", label: "Backend & Systems", icon: Server },
  { id: "core", label: "Languages & Tools", icon: Terminal },
]

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all")

  const filteredSkills = skillsData.filter((skill) =>
    activeCategory === "all" ? true : skill.category === activeCategory
  )

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full os-window text-primary text-xs font-mono font-medium mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>NEURAL OS // APPLICATION STACK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight mb-4">
            Technical <span className="os-gradient-text">Arsenal</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            From aerial drone computer vision models to privacy-preserving federated graph networks and production backends.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none justify-start sm:justify-center">
          {filterTabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeCategory === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as CategoryFilter)}
                className={`whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/25 scale-105"
                    : "os-window text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* visionOS Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="os-window flex flex-col justify-between group"
            >
              {/* Mini Window Bar */}
              <div className="os-window-header py-2 px-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <Badge
                  variant="outline"
                  className={`text-[9px] font-mono uppercase px-2 py-0 border ${
                    skill.level === "Expert"
                      ? "border-primary/50 text-primary bg-primary/10"
                      : skill.level === "Advanced"
                      ? "border-secondary/50 text-secondary bg-secondary/10"
                      : "border-accent/50 text-accent bg-accent/10"
                  }`}
                >
                  {skill.level}
                </Badge>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-110 transition-transform`}
                  >
                    {skill.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors leading-snug">
                      {skill.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mt-0.5">
                      <span>{skill.years}</span>
                      <span>•</span>
                      <span className="text-primary font-semibold">{skill.projects}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {skill.description}
                </p>

                {/* Proficiency Gauge */}
                <div className="pt-2 border-t border-border/40">
                  <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground mb-1.5">
                    <span>PROFICIENCY</span>
                    <span className="text-foreground font-semibold">
                      {skill.level === "Expert" ? "95%" : skill.level === "Advanced" ? "85%" : "75%"}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                      style={{
                        width:
                          skill.level === "Expert" ? "95%" : skill.level === "Advanced" ? "85%" : "75%",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom OS Widget */}
        <div className="mt-12 os-window p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-foreground font-heading">
                Comprehensive Multi-Disciplinary Stack
              </h4>
              <p className="text-xs text-muted-foreground">
                Integrating scientific research rigor with containerized, high-throughput microservices.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-muted-foreground">NODES: <strong className="text-primary">{skillsData.length}</strong></span>
            <span className="text-muted-foreground">CORE: <strong className="text-secondary">PyTorch / YOLO / FastAPI</strong></span>
          </div>
        </div>
      </div>
    </section>
  )
}
