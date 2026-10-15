"use client"

import React, { useState } from "react"
import {
  Folder,
  Layers,
  FileCode,
  Github,
  ExternalLink,
  Info,
  CheckCircle,
  Eye,
  Shield,
  Brain,
  Sparkles,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ProjectItem {
  id: string
  title: string
  subtitle: string
  description: string
  technologies: string[]
  domain: "vision" | "graph_fl" | "health" | "agents"
  github: string
  demo: string
  image: string
  metrics?: string
  architectureDetails?: {
    overview: string
    keyInnovations: string[]
    stack: string[]
  }
}

const allProjects: ProjectItem[] = [
  {
    id: "fedgraph",
    title: "FedGraph-Shield",
    subtitle: "Hierarchical Federated Graph Learning for Fraud Detection",
    description:
      "A two-tier hierarchical federated learning framework enabling distributed banking institutions to collaboratively train Graph Neural Networks (GNNs) without sharing raw transaction data. Combines Flower framework with Differential Privacy composition.",
    technologies: ["PyTorch Geometric", "Federated Learning", "GNN", "Differential Privacy", "Flower", "NetworkX"],
    domain: "graph_fl",
    github: "https://github.com/Aswinpt2004/PRIVACY-PRESERVING-FEDERATED-GRAPH-LEARNING-FOR-CROSS-INSTITUTIONAL-FINANCIAL-FRAUD-DETECTION",
    demo: "https://github.com/Aswinpt2004",
    image: "/fl_archi.png",
    metrics: "Differential Privacy (ε=0.5) // Zero Raw Data Exposure",
    architectureDetails: {
      overview: "Models cross-institution financial transactions as directed heterogeneous graphs (clients, merchants, devices as nodes; payments as edges) to uncover cyclic fraud rings while guaranteeing Differential Privacy.",
      keyInnovations: [
        "Hierarchical 2-tier federated aggregation across distributed banking silos",
        "Topological cyclic chain detection using PyTorch Geometric (PyG)",
        "Formal Differential Privacy noise bounds preserving client confidentiality",
      ],
      stack: ["Python", "PyTorch Geometric", "Flower", "Differential Privacy", "NetworkX"],
    },
  },
  {
    id: "connectome",
    title: "Dynamic Connectome fMRI Reality Monitoring",
    subtitle: "Brain Network Instability Prediction via Graph Attention Networks",
    description:
      "Investigates how sleep deprivation disrupts dynamic functional brain connectivity. Utilizes resting-state fMRI preprocessing and Graph Attention Networks (GATs) to identify early neuro-markers of psychosis-risk and reality monitoring failure.",
    technologies: ["PyTorch Geometric (GAT)", "Nilearn", "fMRIPrep", "NetworkX", "Cognitive Neuroscience"],
    domain: "health",
    github: "https://github.com/Aswinpt2004",
    demo: "https://github.com/Aswinpt2004",
    image: "/Hallucinataion.png",
    metrics: "GAT Attention Maps // Prefrontal-Sensory Disconnection",
    architectureDetails: {
      overview: "Models dynamic functional connectomes from sliding-window blood-oxygen-level-dependent (BOLD) signals, mapping sensory-prefrontal communication disruptions using attention-weighted graph neural networks.",
      keyInnovations: [
        "Time-resolved dynamic functional connectivity (dFC) sliding-window modeling",
        "Graph Attention Network (GAT) attention matrix interpretation",
        "Neuro-imaging pipeline with fMRIPrep & Nilearn",
      ],
      stack: ["Python", "fMRIPrep", "Nilearn", "PyTorch Geometric", "NetworkX"],
    },
  },
  {
    id: "shader",
    title: "Adaptive Confidence Modeling for 3D Body Estimation",
    subtitle: "Robust Monocular Human Shape Estimation in Loose Clothing",
    description:
      "Introduced an image-driven confidence estimation layer to replace rigid global-sigma formulations in the SHADER 3D shape pipeline. Achieved a 20–25% reduction in prediction error across 9,656 dressed-human images.",
    technologies: ["PyTorch", "SMPL Model", "OpenCV", "Computer Vision", "3D Reconstruction"],
    domain: "vision",
    github: "https://github.com/Aswinpt2004",
    demo: "#",
    image: "/shader.png",
    metrics: "20-25% Error Reduction // Evaluated on 9,656 Samples",
    architectureDetails: {
      overview: "Addresses ambiguity caused by loose clothing in monocular 3D body estimation by dynamically weighting surface vertices using confidence maps predicted directly from image features.",
      keyInnovations: [
        "Dynamic vertex-level uncertainty estimation layer",
        "20-25% improvement over baseline SHADER global-sigma models",
        "SMPL parametric human body mesh alignment",
      ],
      stack: ["Python", "PyTorch", "SMPL", "OpenCV"],
    },
  },
  {
    id: "predict-asd",
    title: "AI-Enhanced PREDICT-ASD",
    subtitle: "Early Autism Screening Platform & Interactive Assessment",
    description:
      "Web-based clinical platform designed for early childhood Autism Spectrum Disorder screening. Integrates standardized clinical questionnaires, interactive game-based behavioral tasks, and AI risk evaluation.",
    technologies: ["Next.js", "React", "TypeScript", "FastAPI", "MongoDB", "Role-Based Auth"],
    domain: "health",
    github: "https://github.com/Aswinpt2004/ASD_prediction_web_miniproject",
    demo: "https://predictasd.vercel.app/",
    image: "/Asd.png",
    metrics: "Clinical Decision Support // Real-Time Communication",
  },
  {
    id: "manglish",
    title: "Manglish WhatsApp AI Agent",
    subtitle: "Regional Language Conversational Engine with Local Llama-3",
    description:
      "Offline-capable Malayalam-English (Manglish) conversational chatbot powered by local LLM inference via Ollama. Features personality tuning, semantic intent classification, and automated message flows.",
    technologies: ["Node.js", "Ollama", "Llama-3", "WhatsApp-web.js", "Semantic Search"],
    domain: "agents",
    github: "https://github.com/Aswinpt2004",
    demo: "#",
    image: "/whatsapp-chatbot-interface-conversation.jpg",
    metrics: "Local Edge LLM // Zero External API Latency",
  },
  {
    id: "fuzzy",
    title: "Aswin's Fuzzy Logic Toolbox",
    subtitle: "Interactive Web-Based Fuzzy Inference System",
    description:
      "Comprehensive interactive web application supporting fuzzy set operations, triangular/trapezoidal/Gaussian membership curves, Mamdani and Sugeno inference workflows with real-time graphical visualization.",
    technologies: ["Python", "Flask", "JavaScript", "NumPy", "Matplotlib"],
    domain: "agents",
    github: "https://github.com/Aswinpt2004/fuzzy",
    demo: "https://fuzzytoolbox.onrender.com/",
    image: "/Fuzzy.png",
    metrics: "Full Mamdani & Sugeno Engine // Hosted on Render",
  },
  {
    id: "rna",
    title: "RNA Secondary Structure Prediction",
    subtitle: "Bioinformatics Sequence-to-Structure Deep Learning",
    description:
      "Deep learning pipeline combining Convolutional Neural Networks and Bidirectional RNNs to predict RNA secondary structures directly from nucleotide sequences using dot-bracket notation format.",
    technologies: ["Python", "TensorFlow", "CNN", "RNN", "Bioinformatics"],
    domain: "health",
    github: "https://github.com/Aswinpt2004",
    demo: "#",
    image: "/rna-structure-prediction-visualization.jpg",
    metrics: "High Validation F1 // Dot-Bracket Structural Encoding",
  },
  {
    id: "air-quality",
    title: "PM2.5 Air Quality Forecasting",
    subtitle: "7-Day Multi-Step LSTM Deep Time-Series Prediction",
    description:
      "TensorFlow LSTM time-series architecture trained on historical meteorological and pollution telemetry to predict 7-day future PM2.5 levels across metropolitan Indian cities.",
    technologies: ["Python", "TensorFlow", "LSTM", "Pandas", "Scikit-Learn"],
    domain: "agents",
    github: "https://github.com/Aswinpt2004",
    demo: "#",
    image: "/air-quality-forecasting-dashboard-charts.jpg",
    metrics: "7-Day Multi-Step Horizon // Dynamic Rolling Windows",
  },
  {
    id: "petzzo",
    title: "PETZZO Pet Care Platform",
    subtitle: "Full-Stack Care Portal with AI Disease Prediction",
    description:
      "End-to-end pet healthcare portal connecting pet owners with veterinary hospitals, clinics, and automated services. Features disease risk screening, GPS pet collar tracking, and electronic health records.",
    technologies: ["Django", "MySQL", "JavaScript", "HTML5/CSS3", "Machine Learning"],
    domain: "agents",
    github: "https://github.com/Aswinpt2004",
    demo: "#",
    image: "/pet-care-platform-dashboard.jpg",
    metrics: "Full Production CRUD // Integrated AI Screening",
  },
]

export function ProjectsFolderWindow() {
  const [selectedDomain, setSelectedDomain] = useState<string>("all")
  const [selectedProject, setSelectedProject] = useState<ProjectItem>(allProjects[0])
  const [showArchitecture, setShowArchitecture] = useState(false)

  const filtered = allProjects.filter((p) =>
    selectedDomain === "all" ? true : p.domain === selectedDomain
  )

  return (
    <div className="h-full flex flex-col md:flex-row overflow-hidden select-text text-foreground">
      {/* Finder Left Sidebar */}
      <div className="w-full md:w-52 border-b md:border-b-0 md:border-r border-border p-3 space-y-3 bg-muted/30 shrink-0">
        <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold px-2 block">
          CATEGORIES
        </span>
        <div className="space-y-1 text-xs font-mono">
          <button
            onClick={() => setSelectedDomain("all")}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors ${
              selectedDomain === "all" ? "bg-primary text-white font-medium" : "hover:bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="flex items-center gap-2">
              <Folder className="w-3.5 h-3.5" />
              All Projects
            </span>
            <span className="text-[10px] opacity-75">{allProjects.length}</span>
          </button>

          <button
            onClick={() => setSelectedDomain("vision")}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors ${
              selectedDomain === "vision" ? "bg-primary text-white font-medium" : "hover:bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="flex items-center gap-2">
              <Eye className="w-3.5 h-3.5" />
              Vision & 3D
            </span>
            <span className="text-[10px] opacity-75">1</span>
          </button>

          <button
            onClick={() => setSelectedDomain("graph_fl")}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors ${
              selectedDomain === "graph_fl" ? "bg-primary text-white font-medium" : "hover:bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5" />
              Graph AI & FL
            </span>
            <span className="text-[10px] opacity-75">1</span>
          </button>

          <button
            onClick={() => setSelectedDomain("health")}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors ${
              selectedDomain === "health" ? "bg-primary text-white font-medium" : "hover:bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="flex items-center gap-2">
              <Brain className="w-3.5 h-3.5" />
              Bio & Healthcare
            </span>
            <span className="text-[10px] opacity-75">3</span>
          </button>

          <button
            onClick={() => setSelectedDomain("agents")}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors ${
              selectedDomain === "agents" ? "bg-primary text-white font-medium" : "hover:bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Agents & Fullstack
            </span>
            <span className="text-[10px] opacity-75">4</span>
          </button>
        </div>
      </div>

      {/* Main Files Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Project Files Grid */}
        <div className="flex-1 p-3 sm:p-4 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedProject(item)}
              className={`p-3 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-all ${
                selectedProject.id === item.id
                  ? "bg-primary/15 border-primary shadow-sm"
                  : "bg-background/60 border-border hover:bg-muted/50"
              }`}
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 border border-border mb-2 relative">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-bold text-foreground line-clamp-1">{item.title}</span>
              <span className="text-[10px] font-mono text-muted-foreground line-clamp-1 mt-0.5">{item.subtitle}</span>
            </div>
          ))}
        </div>

        {/* Selected Project Inspector Preview Pane */}
        {selectedProject && (
          <div className="w-full lg:w-72 border-t lg:border-t-0 lg:border-l border-border p-4 overflow-y-auto space-y-4 bg-background/70 shrink-0">
            <div className="aspect-video rounded-xl overflow-hidden border border-border bg-slate-900">
              <img
                src={selectedProject.image || "/placeholder.svg"}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h4 className="font-bold text-sm text-foreground">{selectedProject.title}</h4>
              <p className="text-xs font-mono text-primary mt-0.5">{selectedProject.subtitle}</p>
            </div>

            {selectedProject.metrics && (
              <div className="text-[10px] font-mono p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary">
                {selectedProject.metrics}
              </div>
            )}

            <p className="text-xs text-muted-foreground leading-relaxed">
              {selectedProject.description}
            </p>

            <div className="flex flex-wrap gap-1">
              {selectedProject.technologies.map((t, idx) => (
                <Badge key={idx} variant="secondary" className="text-[9px] font-mono px-1.5 py-0">
                  {t}
                </Badge>
              ))}
            </div>

            <div className="space-y-2 pt-2 border-t border-border">
              {selectedProject.architectureDetails && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setShowArchitecture(!showArchitecture)}
                  className="w-full text-xs font-mono"
                >
                  <Info className="w-3.5 h-3.5 mr-1" />
                  {showArchitecture ? "Hide Specs" : "View Architecture Specs"}
                </Button>
              )}

              {showArchitecture && selectedProject.architectureDetails && (
                <div className="p-3 rounded-xl bg-muted/60 border border-border text-[11px] space-y-2 animate-in fade-in">
                  <div className="font-semibold text-primary">Key Contributions:</div>
                  <ul className="space-y-1 text-muted-foreground">
                    {selectedProject.architectureDetails.keyInnovations.map((inn, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <CheckCircle className="w-3 h-3 text-secondary shrink-0 mt-0.5" />
                        <span>{inn}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-2">
                <Button size="sm" variant="outline" asChild className="w-full text-xs font-mono">
                  <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-3.5 h-3.5 mr-1" />
                    Code
                  </a>
                </Button>
                {selectedProject.demo && selectedProject.demo !== "#" && (
                  <Button size="sm" asChild className="w-full text-xs font-mono bg-primary text-white">
                    <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3.5 h-3.5 mr-1" />
                      Live
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
