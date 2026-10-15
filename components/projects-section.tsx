"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  ExternalLink,
  Layers,
  Info,
  X,
  CheckCircle,
} from "lucide-react"

interface Project {
  title: string
  subtitle?: string
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

const projects: Project[] = [
  {
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

type DomainFilter = "all" | "vision" | "graph_fl" | "health" | "agents"

const filterOptions = [
  { id: "all", label: "All Projects" },
  { id: "vision", label: "Computer Vision & 3D" },
  { id: "graph_fl", label: "Graph AI & Privacy" },
  { id: "health", label: "Healthcare & BioAI" },
  { id: "agents", label: "Agents & Full-Stack" },
]

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<DomainFilter>("all")
  const [modalProject, setModalProject] = useState<Project | null>(null)

  const filteredProjects = projects.filter((project) =>
    activeFilter === "all" ? true : project.domain === activeFilter
  )

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full os-window text-primary text-xs font-mono font-medium mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>NEURAL OS // APPLICATION WINDOWS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight mb-4">
            Featured <span className="os-gradient-text">Projects</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of privacy-preserving graph architectures, computer vision models, and full-stack AI engineering.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none justify-start sm:justify-center">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setActiveFilter(opt.id as DomainFilter)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeFilter === opt.id
                  ? "bg-primary text-white shadow-md shadow-primary/25 scale-105"
                  : "os-window text-muted-foreground hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="os-window flex flex-col justify-between group"
            >
              {/* Window Header */}
              <div className="os-window-header py-2 px-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[10px] font-mono text-muted-foreground truncate max-w-[150px]">
                  {project.title}.app
                </span>
              </div>

              {/* Project Image */}
              <div className="relative aspect-video w-full overflow-hidden bg-muted/40 border-b border-border">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />

                {/* Metric Badge */}
                {project.metrics && (
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-background/90 text-primary border border-border text-[10px] font-mono font-medium backdrop-blur-md shadow-xs">
                      {project.metrics}
                    </span>
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold font-heading text-foreground group-hover:text-primary transition-colors leading-snug">
                    {project.title}
                  </h3>
                  {project.subtitle && (
                    <p className="text-xs font-mono text-muted-foreground mt-0.5">{project.subtitle}</p>
                  )}
                  <p className="text-xs text-muted-foreground leading-relaxed mt-2 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.slice(0, 4).map((tech, techIdx) => (
                    <Badge
                      key={techIdx}
                      variant="secondary"
                      className="text-[10px] font-mono px-2 py-0.5 bg-muted/60 border border-border text-muted-foreground"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <Badge
                      variant="secondary"
                      className="text-[10px] font-mono px-1.5 py-0.5 bg-muted/60 border border-border text-primary font-semibold"
                    >
                      +{project.technologies.length - 4}
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-3 border-t border-border mt-auto">
                  {project.architectureDetails && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setModalProject(project)}
                      className="text-xs font-mono w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 transition-colors"
                    >
                      <Info className="h-3.5 w-3.5 mr-1.5" />
                      Architecture
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="text-xs font-mono w-full os-window hover:bg-primary/10 border-border text-foreground"
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-3.5 w-3.5 mr-1.5" />
                      Code
                    </a>
                  </Button>

                  {project.demo && project.demo !== "#" && (
                    <Button
                      size="sm"
                      asChild
                      className="text-xs font-mono w-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-xs"
                    >
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                        Live
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* System Architecture Inspector Window Modal */}
        {modalProject && modalProject.architectureDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/70 backdrop-blur-md animate-in fade-in duration-200">
            <div className="os-window max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative border border-primary/30">
              <button
                onClick={() => setModalProject(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-muted hover:bg-primary hover:text-white text-muted-foreground transition-colors border border-border"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-[11px] font-mono text-primary font-bold uppercase tracking-wider block mb-1">
                  SYSTEM ARCHITECTURE DOSSIER
                </span>
                <h3 className="text-2xl font-bold font-heading text-foreground">
                  {modalProject.title}
                </h3>
                <p className="text-sm font-mono text-muted-foreground mt-0.5">
                  {modalProject.subtitle}
                </p>
              </div>

              <div className="space-y-6 text-sm">
                <div>
                  <h4 className="font-semibold text-xs uppercase font-mono tracking-wider mb-2 text-primary">
                    RESEARCH & ENGINEERING OVERVIEW
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {modalProject.architectureDetails.overview}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-xs uppercase font-mono tracking-wider mb-2 text-secondary">
                    KEY TECHNICAL CONTRIBUTIONS
                  </h4>
                  <ul className="space-y-2">
                    {modalProject.architectureDetails.keyInnovations.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-xs uppercase font-mono tracking-wider mb-2 text-accent">
                    PRODUCTION STACK & FRAMEWORKS
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {modalProject.architectureDetails.stack.map((s, idx) => (
                      <Badge
                        key={idx}
                        className="bg-primary/10 border border-primary/25 text-primary font-mono text-xs px-2.5 py-1"
                      >
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setModalProject(null)}
                    className="font-mono text-xs"
                  >
                    Close Window
                  </Button>
                  <Button
                    asChild
                    className="bg-primary text-white font-mono text-xs font-semibold shadow-xs"
                  >
                    <a href={modalProject.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-1.5" />
                      View Repository
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
