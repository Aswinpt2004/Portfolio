"use client"

import React, { useState, useEffect } from "react"
import {
  Brain,
  Cpu,
  Layers,
  Shield,
  Code2,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ChevronRight,
  Copy,
  Check,
  Download,
  Menu,
  X,
  Sparkles,
  ArrowUpRight,
  Terminal,
  Activity,
  Eye,
  Database,
  Server,
  Plane,
  ChevronDown,
  Send,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Phone
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { InteractiveChatbot } from "@/components/portfolio/interactive-chatbot"

// Brand SVG Icons
function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.972.582 1.838.923 2.796.924h.005c3.182 0 5.767-2.587 5.768-5.766 0-3.181-2.587-5.767-5.768-5.767zm3.394 8.205c-.144.405-.838.774-1.171.823-.325.048-.745.074-1.205-.073-.298-.095-.679-.241-1.171-.453-2.072-.894-3.415-3.003-3.52-3.143-.104-.14-.84-1.118-.84-2.133 0-1.015.534-1.516.724-1.724.19-.208.416-.26.555-.26.139 0 .278.002.399.008.127.006.297-.048.465.354.174.417.59 1.442.642 1.547.052.104.087.226.017.365-.07.14-.104.226-.208.347-.104.122-.218.272-.312.365-.104.104-.213.218-.091.427.121.208.539.89 1.157 1.441.795.708 1.464.927 1.673 1.031.208.104.33-.087.452-.226.121-.139.521-.608.66-.816.139-.209.278-.174.469-.104.191.07 1.216.574 1.424.678.208.104.347.156.399.243.052.087.052.503-.092.908z" />
    </svg>
  )
}

function TelegramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z" />
    </svg>
  )
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

interface ProjectItem {
  id: string
  title: string
  category: "vision" | "graph" | "genai" | "web"
  badge: string
  image: string
  summary: string
  description: string
  highlights: string[]
  metrics?: { label: string; value: string }[]
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
}

export function PortfolioView() {
  const { toast } = useToast()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [activeProjectTab, setActiveProjectTab] = useState<"all" | "vision" | "graph" | "genai" | "web">("all")
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const [skillSearch, setSkillSearch] = useState("")
  const [activeSkillCategory, setActiveSkillCategory] = useState<"all" | "vision" | "graph" | "backend" | "edge">("all")
  const [heroFocusTab, setHeroFocusTab] = useState<"drone" | "fedgraph" | "clinical">("drone")

  // Form State
  const [formName, setFormName] = useState("")
  const [formEmail, setFormEmail] = useState("")
  const [formSubject, setFormSubject] = useState("")
  const [formMessage, setFormMessage] = useState("")
  const [formSent, setFormSent] = useState(false)

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("aswinsureshpt@gmail.com")
    setCopiedEmail(true)
    toast({
      title: "Email Copied",
      description: "aswinsureshpt@gmail.com copied to your clipboard.",
    })
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formEmail || !formMessage) {
      toast({
        title: "Required Fields",
        description: "Please enter your email and a message.",
        variant: "destructive"
      })
      return
    }
    setFormSent(true)
    toast({
      title: "Message Prepared",
      description: "Opening your email client to send your message to Aswin P T.",
    })
    const mailtoUri = `mailto:aswinsureshpt@gmail.com?subject=${encodeURIComponent(
      formSubject || `Portfolio Inquiry from ${formName || "Visitor"}`
    )}&body=${encodeURIComponent(`Name: ${formName}\nEmail: ${formEmail}\n\n${formMessage}`)}`
    window.open(mailtoUri, "_blank")
    setTimeout(() => {
      setFormSent(false)
      setFormName("")
      setFormEmail("")
      setFormSubject("")
      setFormMessage("")
    }, 4000)
  }

  const projects: ProjectItem[] = [
    {
      id: "drone-vision",
      title: "Suspicious Object & Intrusion Detection for UAV Surveillance",
      category: "vision",
      badge: "Real-time Edge Vision",
      image: "/drone_surveillance_preview.jpg",
      summary: "End-to-end aerial computer vision pipeline with real-time crowd counting and object tracking optimized for drone edge deployments.",
      description: "Engineered an aerial intelligence pipeline combining YOLOv8 for tactical object detection, CSRNet for dilated convolutional crowd counting, and ByteTrack / OC-SORT for multi-object tracking across dynamic aerial perspectives. Deployed on NVIDIA Jetson Orin Nano with INT8 TensorRT acceleration.",
      highlights: [
        "Sustained 42 FPS real-time aerial inference on NVIDIA Jetson Orin Nano with under 25ms end-to-end latency.",
        "Integrated dual-model processing: discrete bounding boxes + continuous CSRNet crowd density heatmaps.",
        "Real-time alert gating rules engine preventing false alarms from transient occlusions and high wind jitter.",
        "Geospatial coordinate mapping converting aerial pixel detections to GPS bounding sectors."
      ],
      metrics: [
        { label: "Edge Throughput", value: "42 FPS" },
        { label: "Detection mAP50", value: "96.2%" },
        { label: "End-to-End Latency", value: "24.8 ms" },
        { label: "Target Recovery", value: "99.1%" }
      ],
      technologies: ["PyTorch", "YOLOv8", "CSRNet", "ByteTrack", "TensorRT", "Jetson Orin", "OpenCV", "FastAPI"],
      githubUrl: "https://github.com/Aswinpt2004",
      liveUrl: "https://codedbyaswinpt.vercel.app"
    },
    {
      id: "fedgraph-shield",
      title: "FedGraph-Shield: Hierarchical Federated Graph Learning",
      category: "graph",
      badge: "Privacy-Preserving AI",
      image: "/fl_archi.png",
      summary: "Two-tier hierarchical federated framework enabling distributed banking institutions to detect fraud rings without exposing customer data.",
      description: "Designed a collaborative graph machine learning framework modeling multi-bank transactions as directed heterogeneous graphs (customers, merchants, accounts, devices as nodes; payments as edges). Implemented localized Graph Neural Networks (GNNs) with Flower federated orchestration and Differential Privacy (DP).",
      highlights: [
        "Constructed directed heterogeneous graph models isolating circular transaction chains and smurfing rings.",
        "Two-tier hierarchical aggregation (regional clusters to global server) with DP noise injection (ε = 0.5).",
        "Achieved 94.6% AUC on cross-institution fraud detection benchmarks while zero raw client data leaves bank premises.",
        "Benchmarked against centralized GNN baselines with less than 2.3% drop in detection recall."
      ],
      metrics: [
        { label: "Detection AUC", value: "94.6%" },
        { label: "Privacy Budget", value: "ε = 0.5" },
        { label: "Data Leakage", value: "0 bytes" },
        { label: "Ring Discovery", value: "97.8%" }
      ],
      technologies: ["PyTorch Geometric", "Flower (FL)", "NetworkX", "Differential Privacy", "FastAPI", "Docker"],
      githubUrl: "https://github.com/Aswinpt2004"
    },
    {
      id: "kuto-marketplace",
      title: "KuTo: AI-Powered Tour Guide Marketplace",
      category: "genai",
      badge: "Marketplace & GenAI",
      image: "/kuto_travel_marketplace.jpg",
      summary: "Intelligent travel marketplace connecting travelers with verified local guides via real-time reverse bidding and AI itinerary planning.",
      description: "Built a travel ecosystem enabling travelers to post bespoke trip requirements while certified local guides bid in real time. Features an integrated multimodal itinerary planner powered by the Google Gemini API that synthesizes personalized travel guides based on traveler preferences and budget constraints.",
      highlights: [
        "Engineered real-time reverse-bidding system with WebSocket live quote updates and rating verification.",
        "Integrated Gemini API to generate customized multi-day itineraries with historical context and local insights.",
        "Built responsive, accessible UI using Next.js 14, React, TypeScript, and Tailwind CSS."
      ],
      metrics: [
        { label: "Bid Latency", value: "< 120ms" },
        { label: "Itinerary Gen", value: "2.4s" },
        { label: "Client Platform", value: "Next.js 14" }
      ],
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Gemini API", "FastAPI", "PostgreSQL"],
      githubUrl: "https://github.com/Aswinpt2004",
      liveUrl: "https://codedbyaswinpt.vercel.app"
    },
    {
      id: "ecommerce-agent",
      title: "Autonomous Generative E-Commerce Storefront Agent",
      category: "genai",
      badge: "Agentic Systems",
      image: "/ecommerce_agent_preview.jpg",
      summary: "Autonomous agent pipeline transforming natural language prompts into complete, production-ready storefronts and catalog taxonomies.",
      description: "Developed an agentic pipeline utilizing Vision-Language Models (VLMs) and LLMs to autonomously parse raw supplier product photos, generate SEO-optimized titles and specifications, construct category trees, and synthesize tailored landing page layouts.",
      highlights: [
        "Multimodal catalog pipeline processing high-resolution product imagery and extracting structured technical specs.",
        "Automated SEO metadata and JSON-LD schema generation with zero human manual data entry.",
        "Modular microservice architecture built with FastAPI, Redis caching, and vector similarity search."
      ],
      metrics: [
        { label: "Catalog Speed", value: "10x faster" },
        { label: "Accuracy", value: "98.2%" },
        { label: "Stack", value: "FastAPI + VLMs" }
      ],
      technologies: ["FastAPI", "Python", "Vision-Language Models", "LangChain", "Redis", "Next.js"],
      githubUrl: "https://github.com/Aswinpt2004"
    },
    {
      id: "connectome-fmri",
      title: "Dynamic Connectome fMRI Reality Monitoring Predictor",
      category: "graph",
      badge: "Neuro-Graph AI",
      image: "/Hallucinataion.png",
      summary: "Graph Attention Networks (GATs) modeling resting-state functional brain connectivity to detect cognitive fatigue and reality monitoring failure.",
      description: "Formulated dynamic connectome graphs from fMRI blood-oxygen-level-dependent (BOLD) signals. Applied temporal Graph Attention Networks to isolate transient disruptions in prefrontal-parietal sensory binding networks under sleep deprivation.",
      highlights: [
        "Modelled 116 cortical and subcortical regions as graph nodes with dynamic Pearson correlation edges.",
        "Isolated neuro-correlates of reality monitoring failure under severe cognitive fatigue.",
        "Implemented graph attention mechanisms providing interpretable node attribution for neuroscientists."
      ],
      metrics: [
        { label: "Prediction Acc", value: "89.4%" },
        { label: "Brain ROIs", value: "116 nodes" },
        { label: "Model", value: "GAT + PyG" }
      ],
      technologies: ["PyTorch Geometric", "fMRI Analysis", "Graph Attention Networks", "SciPy", "Python"],
      githubUrl: "https://github.com/Aswinpt2004"
    },
    {
      id: "shape-confidence",
      title: "Adaptive Confidence Modeling for 3D Dressed Human Shape",
      category: "vision",
      badge: "3D Deep Learning",
      image: "/shader.png",
      summary: "Image-driven confidence estimation layer resolving monocular 3D body estimation errors caused by loose clothing and occlusions.",
      description: "Replaced uniform global-sigma assumptions in the SHADER 3D parametric pipeline with an adaptive confidence network predicting vertex-level uncertainty. Evaluated across 9,656 dressed human scans with SMPL ground truth.",
      highlights: [
        "Achieved a 20–25% reduction in 3D shape prediction error on challenging loose-garment datasets.",
        "Formulated multi-task loss penalizing overconfident predictions in occluded regions.",
        "Benchmarked on large-scale datasets with PyTorch and SMPL parametric body model."
      ],
      metrics: [
        { label: "Error Reduction", value: "20–25%" },
        { label: "Dataset Size", value: "9,656 scans" },
        { label: "Framework", value: "PyTorch + SMPL" }
      ],
      technologies: ["PyTorch", "3D Computer Vision", "SMPL Model", "Mesh Processing", "Python"],
      githubUrl: "https://github.com/Aswinpt2004"
    },
    {
      id: "petzzo",
      title: "PETZZO: Comprehensive Pet Care Platform",
      category: "web",
      badge: "Full-Stack & Health",
      image: "/pet-care-platform-dashboard.jpg",
      summary: "Full-stack pet healthcare management ecosystem connecting pet parents with hospitals, veterinary clinics, and GPS pet tracking.",
      description: "Architected a comprehensive pet care platform featuring AI-assisted pet disease prediction, GPS tracking telemetry, digital vaccination health records, and automated veterinary appointment dispatching.",
      highlights: [
        "Developed end-to-end full-stack portal with Django, MySQL, and asynchronous task workers.",
        "Integrated interactive medical diagnostic forms and instant veterinary appointment booking.",
        "Constructed responsive client portal with vaccination tracking and health event notifications."
      ],
      metrics: [
        { label: "Architecture", value: "Django + MySQL" },
        { label: "Modules", value: "Health + GPS + Booking" },
        { label: "Security", value: "Role-Based Auth" }
      ],
      technologies: ["Django", "Python", "MySQL", "JavaScript", "HTML5", "CSS3"],
      githubUrl: "https://github.com/Aswinpt2004"
    },
    {
      id: "predict-asd",
      title: "PREDICT-ASD: Autism Spectrum Screening Platform",
      category: "web",
      badge: "Clinical Diagnostic Tool",
      image: "/Asd.png",
      summary: "Comprehensive assessment & diagnostic tool with standardized clinical questionnaires, automated risk scoring, and multi-role access.",
      description: "A clinical platform featuring standardized screening instruments (M-CHAT, SCQ, TABC) with automated machine learning risk scoring, secure media upload for specialist evaluation, and HIPAA-compliant data contracts.",
      highlights: [
        "Automated diagnostic scoring engines implementing clinical questionnaire protocols.",
        "Multi-role role-based dashboard for parents, pediatric specialists, and clinicians.",
        "Secure end-to-end media upload pipeline for pediatric diagnostic recordings."
      ],
      metrics: [
        { label: "Screening", value: "M-CHAT / SCQ / TABC" },
        { label: "Compliance", value: "HIPAA-ready" },
        { label: "Scoring", value: "Automated ML" }
      ],
      technologies: ["Python", "FastAPI", "React", "Tailwind CSS", "PostgreSQL"],
      githubUrl: "https://github.com/Aswinpt2004"
    }
  ]

  const filteredProjects = activeProjectTab === "all" 
    ? projects 
    : projects.filter(p => p.category === activeProjectTab)

  const skillCategories = [
    {
      id: "vision",
      title: "Computer Vision & Edge AI",
      skills: [
        { name: "PyTorch", level: "Advanced", desc: "Model architecture, training & fine-tuning" },
        { name: "YOLOv8 / YOLO", level: "Expert", desc: "Aerial detection, custom training & quantization" },
        { name: "CSRNet", level: "Advanced", desc: "Dilated convolution crowd counting" },
        { name: "ByteTrack / OC-SORT", level: "Advanced", desc: "Multi-object trajectory tracking" },
        { name: "OpenCV", level: "Expert", desc: "Image transformation & spatial filtering" },
        { name: "NVIDIA TensorRT", level: "Advanced", desc: "INT8/FP16 quantization & engine optimization" },
        { name: "Jetson Orin Nano", level: "Advanced", desc: "Edge deployment & hardware acceleration" },
        { name: "Geospatial Analysis", level: "Proficient", desc: "GPS mapping & bounding coordinate transforms" }
      ]
    },
    {
      id: "graph",
      title: "Graph Neural Networks & Federated Learning",
      skills: [
        { name: "PyTorch Geometric (PyG)", level: "Advanced", desc: "GCN, GAT, GraphSAGE heterogeneous graphs" },
        { name: "Flower (FL)", level: "Advanced", desc: "Hierarchical federated client-server coordination" },
        { name: "Differential Privacy", level: "Advanced", desc: "RDP composition & Gaussian noise mechanisms" },
        { name: "NetworkX", level: "Expert", desc: "Topological graph metrics & cycle detection" },
        { name: "Graph Attention Networks", level: "Advanced", desc: "Dynamic connectome & node attribution" }
      ]
    },
    {
      id: "backend",
      title: "Backend, APIs & Cloud Systems",
      skills: [
        { name: "FastAPI", level: "Expert", desc: "Async microservices, high-throughput endpoints" },
        { name: "Python", level: "Expert", desc: "Primary production & research language" },
        { name: "Docker", level: "Advanced", desc: "Multi-stage containerization & edge images" },
        { name: "PostgreSQL / MySQL", level: "Advanced", desc: "Relational schema design & indexing" },
        { name: "C / C++", level: "Proficient", desc: "Low-level optimization & algorithms" },
        { name: "Django / Flask", level: "Advanced", desc: "Full-stack web services & ORM" },
        { name: "Google Cloud (GCP)", level: "Proficient", desc: "Compute instances & storage buckets" },
        { name: "Next.js / TypeScript", level: "Advanced", desc: "Modern performant client interfaces" }
      ]
    }
  ]

  const allSkillsFlat = skillCategories.flatMap(c => c.skills)
  const filteredSkills = skillSearch 
    ? allSkillsFlat.filter(s => s.name.toLowerCase().includes(skillSearch.toLowerCase()) || s.desc.toLowerCase().includes(skillSearch.toLowerCase()))
    : []

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      {/* ========================================================
          STICKY NAVBAR (Responsive for all screen sizes)
          ======================================================== */}
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo / Brand */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold font-mono text-base group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
              AP
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-foreground group-hover:text-primary transition-colors">
                Aswin P T
              </span>
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                AI/ML Engineer · Vision
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="#experience" className="text-muted-foreground hover:text-foreground transition-colors">
              Experience
            </a>
            <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </a>
            <a href="#skills" className="text-muted-foreground hover:text-foreground transition-colors">
              Skills
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {/* Resume Download in Header */}
            <a 
              href="/Aswin_PT_Resume_.pdf" 
              download
              className="hidden sm:inline-flex"
            >
              <Button variant="outline" size="sm" className="h-9 px-3 text-xs font-mono font-medium gap-1.5 border-border hover:bg-muted text-foreground">
                <Download className="w-3.5 h-3.5 text-primary" />
                Resume PDF
              </Button>
            </a>

            {/* Direct WhatsApp in Header */}
            <a 
              href="https://wa.me/918891381713" 
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex"
            >
              <Button size="sm" className="bg-[#25D366] hover:bg-[#20ba59] text-white font-medium text-xs h-9 px-3.5 gap-1.5 shadow-sm">
                <WhatsAppIcon className="w-3.5 h-3.5" />
                WhatsApp
              </Button>
            </a>

            <a 
              href="mailto:aswinsureshpt@gmail.com" 
              className="hidden sm:inline-flex"
            >
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs h-9 px-4 gap-1.5 shadow-sm">
                <Mail className="w-3.5 h-3.5" />
                Email
              </Button>
            </a>

            {/* Mobile Hamburger Button */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden h-9 w-9 border-border"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-border bg-card/95 backdrop-blur-lg px-4 py-4 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-150">
            <nav className="flex flex-col space-y-2 text-sm font-medium">
              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-muted text-foreground transition-colors"
              >
                About Me
              </a>
              <a 
                href="#experience" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-muted text-foreground transition-colors"
              >
                Experience & Education
              </a>
              <a 
                href="#projects" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-muted text-foreground transition-colors"
              >
                Featured Projects
              </a>
              <a 
                href="#skills" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-muted text-foreground transition-colors"
              >
                Technical Toolkit
              </a>
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-muted text-foreground transition-colors"
              >
                Contact & Socials
              </a>
            </nav>
            <div className="pt-2 border-t border-border flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                <a 
                  href="https://wa.me/918891381713"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button size="sm" className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs gap-1.5 justify-center">
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    WhatsApp
                  </Button>
                </a>
                <a 
                  href="/Aswin_PT_Resume_.pdf" 
                  download
                  className="w-full"
                >
                  <Button variant="outline" size="sm" className="w-full text-xs gap-1.5 justify-center">
                    <Download className="w-3.5 h-3.5 text-primary" />
                    Resume PDF
                  </Button>
                </a>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  onClick={copyEmailToClipboard}
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs gap-1.5 justify-center"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedEmail ? "Copied" : "Copy Email"}
                </Button>
                <a 
                  href="mailto:aswinsureshpt@gmail.com" 
                  className="w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button size="sm" className="w-full bg-primary text-primary-foreground text-xs gap-1.5 justify-center">
                    <Send className="w-3.5 h-3.5" />
                    Email
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================
          HERO SECTION (Intro, Quick Focus, Socials)
          ======================================================== */}
      <section className="relative overflow-hidden py-14 sm:py-20 md:py-24 border-b border-border/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Bio & Core Pitch */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Availability Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Research Assistant @ Quantumweave Intelligence
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                  Hi, I&apos;m <span className="text-primary">Aswin P T</span>
                </h1>
                <p className="text-lg sm:text-xl font-medium text-muted-foreground">
                  AI/ML Engineer & Drone Vision Researcher
                </p>
              </div>

              {/* Pitch Description */}
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
                Graduate student in Machine Intelligence at <strong className="text-foreground">Digital University Kerala (DUK)</strong>. I develop real-time computer vision pipelines for aerial drone surveillance (<strong className="text-foreground">YOLOv8, CSRNet</strong> on Jetson Orin Nano at 42 FPS) and privacy-preserving <strong className="text-foreground">Federated Graph Neural Networks</strong> with Differential Privacy (ε = 0.5).
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <a href="#projects">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs sm:text-sm h-10 px-4 sm:px-5 gap-2 shadow-sm">
                    View Selected Projects
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </a>
                
                {/* Direct WhatsApp Button in Hero */}
                <a 
                  href="https://wa.me/918891381713" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button className="bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs sm:text-sm h-10 px-4 gap-2 shadow-sm">
                    <WhatsAppIcon className="w-4 h-4" />
                    Chat on WhatsApp
                  </Button>
                </a>

                {/* Direct Resume Download */}
                <a 
                  href="/Aswin_PT_Resume_.pdf" 
                  download
                >
                  <Button variant="outline" className="border-border text-foreground hover:bg-muted text-xs sm:text-sm h-10 px-4 gap-1.5 font-mono">
                    <Download className="w-4 h-4 text-primary" />
                    Download CV
                  </Button>
                </a>

                <Button 
                  variant="ghost" 
                  onClick={copyEmailToClipboard}
                  className="text-xs sm:text-sm h-10 px-3 text-muted-foreground hover:text-foreground gap-1.5"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedEmail ? "Copied" : "aswinsureshpt@gmail.com"}</span>
                </Button>
              </div>

              {/* Complete Social Media Channels Row */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs font-mono uppercase text-muted-foreground tracking-wider mr-1">
                  Connect:
                </span>
                
                {/* WhatsApp */}
                <a
                  href="https://wa.me/918891381713"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border hover:border-[#25D366] hover:bg-[#25D366]/10 text-muted-foreground hover:text-[#25D366] transition-all text-xs font-mono"
                  title="WhatsApp: +91 88913 81713"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>

                {/* Telegram */}
                <a
                  href="https://t.me/Aswin_PT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border hover:border-[#229ED9] hover:bg-[#229ED9]/10 text-muted-foreground hover:text-[#229ED9] transition-all text-xs font-mono"
                  title="Telegram: @Aswin_PT"
                >
                  <TelegramIcon className="w-3.5 h-3.5 text-[#229ED9]" />
                  <span className="hidden sm:inline">Telegram</span>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/aswin.p.t/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border hover:border-[#E4405F] hover:bg-[#E4405F]/10 text-muted-foreground hover:text-[#E4405F] transition-all text-xs font-mono"
                  title="Instagram: @aswin.p.t"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-[#E4405F]" />
                  <span className="hidden sm:inline">Instagram</span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/aswinpt2004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border hover:border-[#0077B5] hover:bg-[#0077B5]/10 text-muted-foreground hover:text-[#0077B5] transition-all text-xs font-mono"
                  title="LinkedIn: in/aswinpt2004"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />
                  <span className="hidden sm:inline">LinkedIn</span>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/Aswinpt2004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border hover:border-primary/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all text-xs font-mono"
                  title="GitHub: Aswinpt2004"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">GitHub</span>
                </a>

                {/* LeetCode */}
                <a
                  href="https://leetcode.com/u/AswinPT/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border hover:border-[#FFA116] hover:bg-[#FFA116]/10 text-muted-foreground hover:text-[#FFA116] transition-all text-xs font-mono font-bold"
                  title="LeetCode: AswinPT"
                >
                  <span>LC</span>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Quick Focus Terminal Card */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-border bg-card shadow-md overflow-hidden">
                {/* Card Top bar with tabs */}
                <div className="bg-muted/60 border-b border-border px-4 py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400/80"></div>
                    <span className="ml-2 font-mono text-xs text-muted-foreground hidden sm:inline">
                      aswin@workstation:~$
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-primary font-bold">
                    ACTIVE DOMAINS
                  </span>
                </div>

                {/* Domain Selector Tabs */}
                <div className="grid grid-cols-3 border-b border-border bg-muted/20 text-xs font-mono">
                  <button
                    onClick={() => setHeroFocusTab("drone")}
                    className={`py-2 px-2 text-center transition-colors border-r border-border ${
                      heroFocusTab === "drone"
                        ? "bg-card text-primary font-bold border-b-2 border-b-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Aerial Vision
                  </button>
                  <button
                    onClick={() => setHeroFocusTab("fedgraph")}
                    className={`py-2 px-2 text-center transition-colors border-r border-border ${
                      heroFocusTab === "fedgraph"
                        ? "bg-card text-primary font-bold border-b-2 border-b-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Fed-GNN
                  </button>
                  <button
                    onClick={() => setHeroFocusTab("clinical")}
                    className={`py-2 px-2 text-center transition-colors ${
                      heroFocusTab === "clinical"
                        ? "bg-card text-primary font-bold border-b-2 border-b-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Clinical AI
                  </button>
                </div>

                {/* Tab Content Body */}
                <div className="p-5 font-mono text-xs space-y-4">
                  {heroFocusTab === "drone" && (
                    <div className="space-y-3 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Framework:</span>
                        <span className="text-foreground font-semibold">YOLOv8 + CSRNet + ByteTrack</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Target Hardware:</span>
                        <span className="text-primary font-semibold">NVIDIA Jetson Orin Nano</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Throughput:</span>
                        <span className="text-emerald-500 font-bold">42 FPS (INT8 TensorRT)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Capabilities:</span>
                        <span className="text-foreground">Crowd counting + Tracking</span>
                      </div>
                      <div className="mt-3 p-3 rounded-lg bg-muted/40 border border-border/80 font-mono text-[11px] text-muted-foreground leading-relaxed">
                        &quot;Real-time edge aerial surveillance detecting concealed threats and dynamic crowds under low-altitude drone perspectives.&quot;
                      </div>
                    </div>
                  )}

                  {heroFocusTab === "fedgraph" && (
                    <div className="space-y-3 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Architecture:</span>
                        <span className="text-foreground font-semibold">Hierarchical FedGraph-Shield</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Federated Framework:</span>
                        <span className="text-primary font-semibold">Flower (FL) + PyTorch Geometric</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Privacy Guarantee:</span>
                        <span className="text-emerald-500 font-bold">Differential Privacy (ε = 0.5)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Domain:</span>
                        <span className="text-foreground">Cross-bank fraud ring detection</span>
                      </div>
                      <div className="mt-3 p-3 rounded-lg bg-muted/40 border border-border/80 font-mono text-[11px] text-muted-foreground leading-relaxed">
                        &quot;Collaborative machine learning for financial fraud rings where raw banking transactions remain strictly on-premise.&quot;
                      </div>
                    </div>
                  )}

                  {heroFocusTab === "clinical" && (
                    <div className="space-y-3 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Experience:</span>
                        <span className="text-foreground font-semibold">Synbrains Solutions AI Intern</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Projects:</span>
                        <span className="text-primary font-semibold">PI-RADS & Elastography Parser</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Backend Stack:</span>
                        <span className="text-emerald-500 font-bold">FastAPI + Pydantic contracts</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Focus:</span>
                        <span className="text-foreground">3D Sector Mapping & PDF Parsing</span>
                      </div>
                      <div className="mt-3 p-3 rounded-lg bg-muted/40 border border-border/80 font-mono text-[11px] text-muted-foreground leading-relaxed">
                        &quot;Engineered medical diagnostic pipelines structuring unstructured ultrasound and MRI reports into validated schemas.&quot;
                      </div>
                    </div>
                  )}

                  {/* Quick Code Snippet Preview */}
                  <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>Active Workspace</span>
                    <span className="text-primary font-mono font-medium">DUK & Quantumweave</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          ABOUT ME SECTION
          ======================================================== */}
      <section id="about" className="py-16 sm:py-20 border-b border-border/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-primary font-bold">
              <Brain className="w-3.5 h-3.5" />
              01. Background & Philosophy
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Bridging Research Rigor with Production Engineering
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7 space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                I am a Machine Intelligence graduate student at the <strong className="text-foreground">Kerala University of Digital Sciences, Innovation and Technology (DUK)</strong> and a Research Assistant at <strong className="text-foreground">Quantumweave Intelligence</strong>. My work focuses on building robust computer vision systems that run in resource-constrained environments and scalable distributed AI frameworks.
              </p>
              <p>
                At Quantumweave, I engineer end-to-end UAV surveillance pipelines—combining real-time object tracking (YOLOv8 + ByteTrack) with crowd density estimation (CSRNet), optimized for low-latency onboard inference on <strong className="text-foreground">NVIDIA Jetson Orin Nano</strong> hardware.
              </p>
              <p>
                In parallel, my research delves into <strong className="text-foreground">Federated Graph Learning</strong>, where I design privacy-preserving algorithms enabling multi-institutional fraud detection under strict Differential Privacy budgets without exposing raw records.
              </p>
            </div>

            {/* 4 Key Impact Metric Cards */}
            <div className="md:col-span-5 grid grid-cols-2 gap-3.5">
              <div className="p-4 rounded-xl border border-border bg-card shadow-sm space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-primary">
                  42 FPS
                </div>
                <div className="text-xs font-medium text-foreground">
                  Edge Inference
                </div>
                <div className="text-[11px] text-muted-foreground">
                  YOLOv8 + ByteTrack on Jetson Orin Nano
                </div>
              </div>

              <div className="p-4 rounded-xl border border-border bg-card shadow-sm space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-primary">
                  96.2%
                </div>
                <div className="text-xs font-medium text-foreground">
                  Detection mAP50
                </div>
                <div className="text-[11px] text-muted-foreground">
                  Aerial surveillance test accuracy
                </div>
              </div>

              <div className="p-4 rounded-xl border border-border bg-card shadow-sm space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-primary">
                  ε = 0.5
                </div>
                <div className="text-xs font-medium text-foreground">
                  Differential Privacy
                </div>
                <div className="text-[11px] text-muted-foreground">
                  Guaranteed privacy in FedGraph-Shield
                </div>
              </div>

              <div className="p-4 rounded-xl border border-border bg-card shadow-sm space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-primary">
                  25%
                </div>
                <div className="text-xs font-medium text-foreground">
                  Error Reduction
                </div>
                <div className="text-[11px] text-muted-foreground">
                  3D dressed human confidence modeling
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          EXPERIENCE & EDUCATION TIMELINE
          ======================================================== */}
      <section id="experience" className="py-16 sm:py-20 border-b border-border/40 bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-primary font-bold">
              <Briefcase className="w-3.5 h-3.5" />
              02. Professional Track Record
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Work Experience & Academic Foundation
            </h2>
          </div>

          <div className="mt-10 space-y-6">
            
            {/* Experience Item 1: Quantumweave Intelligence */}
            <div className="p-6 rounded-xl border border-border bg-card shadow-sm hover:border-primary/40 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-foreground">
                      Research Assistant – AI & Data Science
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-bold">
                      CURRENT
                    </span>
                  </div>
                  <div className="text-sm font-medium text-primary">
                    Quantumweave Intelligence
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  Present · Trivandrum, India
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p>
                  Leading development of real-world drone computer vision systems and aerial surveillance pipelines:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-1">
                  <li>
                    Architecting end-to-end vision pipelines for real-time crowd counting (CSRNet), vehicle tracking, and suspicious object detection (YOLOv8 + ByteTrack).
                  </li>
                  <li>
                    Optimizing deep learning inference pipelines with INT8 TensorRT for execution on onboard low-power edge compute (NVIDIA Jetson Orin Nano at 42 FPS).
                  </li>
                  <li>
                    Developing video ingestion, frame deduplication, alert gating, and geospatial coordinate mapping for field drone deployments.
                  </li>
                </ul>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5 pt-2">
                {["Computer Vision", "YOLOv8", "CSRNet", "ByteTrack", "TensorRT", "Jetson Orin Nano", "FastAPI", "OpenCV", "Geospatial"].map((t) => (
                  <span key={t} className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-muted text-muted-foreground border border-border">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience Item 2: Synbrains Solutions */}
            <div className="p-6 rounded-xl border border-border bg-card shadow-sm hover:border-primary/40 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    AI/ML Intern
                  </h3>
                  <div className="text-sm font-medium text-primary">
                    Synbrains Solutions Pvt Ltd
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  Mar 2026 – May 2026 · 12-Week Intensive
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p>
                  Delivered production-grade clinical AI components and automated medical document intelligence:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-1">
                  <li>
                    <strong>PI-RADS Prostate AI Platform:</strong> Built clinical prostate scoring logic, diagnostic image sector handling, and 3D sector mapping modules with FastAPI.
                  </li>
                  <li>
                    <strong>Shear Wave Elastography Parser:</strong> Created a zero-codebase modular medical report extraction pipeline with strict Pydantic contracts and regex normalization.
                  </li>
                </ul>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5 pt-2">
                {["FastAPI", "Pydantic", "Medical AI", "PI-RADS", "Python", "Docker", "Git Flow"].map((t) => (
                  <span key={t} className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-muted text-muted-foreground border border-border">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Education Item: Digital University Kerala */}
            <div className="p-6 rounded-xl border border-border bg-card shadow-sm hover:border-primary/40 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold text-foreground">
                      Master of Science (M.Sc.) in Machine Intelligence
                    </h3>
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Kerala University of Digital Sciences, Innovation and Technology (DUK)
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  2024 – 2026 · Kerala, India
                </div>
              </div>

              <div className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Specialized coursework and advanced laboratory research in Deep Learning, Computer Vision, Graph Neural Networks, Mathematical Foundations of Machine Learning, and Distributed AI systems.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          FEATURED PROJECTS SECTION
          ======================================================== */}
      <section id="projects" className="py-16 sm:py-20 border-b border-border/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-primary font-bold">
                <Code2 className="w-3.5 h-3.5" />
                03. Selected Works
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Featured Engineering & Research Projects
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-muted border border-border overflow-x-auto text-xs font-mono">
              <button
                onClick={() => setActiveProjectTab("all")}
                className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                  activeProjectTab === "all"
                    ? "bg-primary text-primary-foreground font-bold shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                All ({projects.length})
              </button>
              <button
                onClick={() => setActiveProjectTab("vision")}
                className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                  activeProjectTab === "vision"
                    ? "bg-primary text-primary-foreground font-bold shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Vision & Drones
              </button>
              <button
                onClick={() => setActiveProjectTab("graph")}
                className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                  activeProjectTab === "graph"
                    ? "bg-primary text-primary-foreground font-bold shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Federated & Graphs
              </button>
              <button
                onClick={() => setActiveProjectTab("genai")}
                className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                  activeProjectTab === "genai"
                    ? "bg-primary text-primary-foreground font-bold shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                GenAI & Web
              </button>
            </div>
          </div>

          {/* Project Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-xl border border-border bg-card p-4 sm:p-5 flex flex-col justify-between shadow-sm hover:border-primary/50 hover:shadow-md transition-all duration-200 group"
              >
                <div className="space-y-3">
                  {/* Card Image Banner */}
                  <div 
                    onClick={() => setSelectedProject(project)}
                    className="relative w-full h-44 sm:h-48 overflow-hidden rounded-lg bg-muted/60 border border-border/80 cursor-pointer"
                  >
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      loading="lazy" 
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded bg-background/90 text-primary border border-primary/30 text-[11px] font-mono font-bold shadow-sm backdrop-blur-sm">
                        {project.badge}
                      </span>
                    </div>
                  </div>

                  {/* Category & Badge */}
                  <div className="flex items-center justify-between text-xs font-mono pt-1">
                    <span className="text-muted-foreground uppercase text-[10px] font-semibold">
                      Category: {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => setSelectedProject(project)}
                    className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug cursor-pointer"
                  >
                    {project.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Key Metrics Snippet */}
                  {project.metrics && (
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/60">
                      {project.metrics.slice(0, 2).map((m, idx) => (
                        <div key={idx} className="bg-muted/40 p-2 rounded border border-border/50">
                          <div className="text-[10px] text-muted-foreground font-mono">{m.label}</div>
                          <div className="text-xs font-bold font-mono text-foreground">{m.value}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom tech tags & actions */}
                <div className="pt-4 mt-4 border-t border-border/60 space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-semibold text-primary hover:text-primary/80 hover:bg-primary/10 px-2 h-8 gap-1 -ml-2"
                    >
                      Read Case Study
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Button>

                    <div className="flex items-center gap-1.5">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                          title="View on GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                          title="Open Live Preview"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          PROJECT DETAILS MODAL (Interactive deep dive)
          ======================================================== */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-card border border-border rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                  {selectedProject.badge}
                </span>
                <h3 className="text-xl font-bold text-foreground pt-1">
                  {selectedProject.title}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedProject(null)}
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Architecture / Preview Visual in Modal */}
            <div className="relative rounded-lg overflow-hidden border border-border bg-muted/40">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="w-full max-h-72 object-contain bg-background/60"
              />
              <div className="absolute bottom-2 right-2">
                <a 
                  href={selectedProject.image} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-2.5 py-1 rounded bg-background/90 text-[11px] font-mono text-muted-foreground hover:text-foreground border border-border shadow-sm flex items-center gap-1 backdrop-blur-sm"
                >
                  <ExternalLink className="w-3 h-3" />
                  View Full Image
                </a>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>{selectedProject.description}</p>

              {/* Highlights */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                  Key Technical Achievements:
                </h4>
                <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm pl-1">
                  {selectedProject.highlights.map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </div>

              {/* Metrics */}
              {selectedProject.metrics && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  {selectedProject.metrics.map((m, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-muted/50 border border-border text-center">
                      <div className="text-base font-bold font-mono text-primary">{m.value}</div>
                      <div className="text-[10px] text-muted-foreground font-mono mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech Stack */}
              <div className="space-y-2 pt-2 border-t border-border">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                  Technologies & Frameworks:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-muted text-foreground border border-border"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" variant="outline" className="text-xs gap-1.5 h-8">
                      <Github className="w-3.5 h-3.5" />
                      View Code
                    </Button>
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" variant="outline" className="text-xs gap-1.5 h-8">
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Demo
                    </Button>
                  </a>
                )}
              </div>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground text-xs font-medium h-8"
                onClick={() => setSelectedProject(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TECHNICAL SKILLS MATRIX SECTION
          ======================================================== */}
      <section id="skills" className="py-16 sm:py-20 border-b border-border/40 bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-primary font-bold">
                <Cpu className="w-3.5 h-3.5" />
                04. Capabilities
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Technical Toolkit & Engineering Arsenal
              </h2>
            </div>

            {/* Quick Filter Input */}
            <div className="w-full sm:w-64">
              <input
                type="text"
                placeholder="Filter skill (e.g. YOLO, PyTorch)..."
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                className="w-full text-xs font-mono px-3 py-2 rounded-lg bg-card border border-border focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Searched Skills View */}
          {skillSearch ? (
            <div className="mt-8 space-y-3">
              <div className="text-xs font-mono text-muted-foreground">
                Found {filteredSkills.length} matches for &quot;{skillSearch}&quot;:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {filteredSkills.map((s, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg border border-border bg-card shadow-sm space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-foreground">{s.name}</span>
                      <span className="text-[10px] font-mono text-primary font-semibold">{s.level}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Categorized Skills View */
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {skillCategories.map((category) => (
                <div
                  key={category.id}
                  className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-sm"
                >
                  <div className="border-b border-border pb-3 flex items-center justify-between">
                    <h3 className="text-base font-bold text-foreground">
                      {category.title}
                    </h3>
                    <span className="text-xs font-mono text-muted-foreground">
                      {category.skills.length} tools
                    </span>
                  </div>

                  <div className="space-y-3">
                    {category.skills.map((skill, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-muted/40 border border-border/50 hover:border-primary/40 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm font-semibold text-foreground">
                            {skill.name}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold">
                            {skill.level}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
                          {skill.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          CONTACT SECTION (Direct info & interactive form)
          ======================================================== */}
      <section id="contact" className="py-16 sm:py-24 border-b border-border/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Contact Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-primary font-bold">
                  <Mail className="w-3.5 h-3.5" />
                  05. Get In Touch
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                  Let&apos;s Build Something Intelligent Together
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I am actively open to discussions regarding AI/ML Engineering opportunities, Aerial Computer Vision projects, and research collaborations.
                </p>
              </div>

              {/* Contact Information Cards Grid */}
              <div className="space-y-3">
                {/* WhatsApp Priority Card */}
                <div className="p-4 rounded-xl border border-[#25D366]/40 bg-[#25D366]/5 shadow-sm flex items-center justify-between hover:border-[#25D366] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#25D366]/20 border border-[#25D366]/30 flex items-center justify-center text-[#25D366]">
                      <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-[#25D366] font-bold uppercase">WhatsApp Direct</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#25D366]/20 text-[#25D366] font-mono font-bold">FASTEST</span>
                      </div>
                      <div className="text-sm font-semibold text-foreground">
                        +91 88913 81713
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/918891381713"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" className="bg-[#25D366] hover:bg-[#20ba59] text-white text-xs h-8 px-3 gap-1 shadow-sm font-medium">
                      <span>Chat Now</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Button>
                  </a>
                </div>

                {/* Email Card */}
                <div className="p-4 rounded-xl border border-border bg-card shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-muted-foreground uppercase">Email Dispatch</div>
                      <a href="mailto:aswinsureshpt@gmail.com" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                        aswinsureshpt@gmail.com
                      </a>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copyEmailToClipboard}
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>

                {/* Telegram & Instagram Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Telegram */}
                  <div className="p-3.5 rounded-xl border border-border bg-card shadow-sm flex items-center justify-between hover:border-[#229ED9]/50 transition-all">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#229ED9]/15 border border-[#229ED9]/30 flex items-center justify-center text-[#229ED9]">
                        <TelegramIcon className="w-4 h-4 text-[#229ED9]" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-muted-foreground uppercase">Telegram</div>
                        <div className="text-xs font-semibold text-foreground font-mono">@Aswin_PT</div>
                      </div>
                    </div>
                    <a
                      href="https://t.me/Aswin_PT"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-[#229ED9] transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Instagram */}
                  <div className="p-3.5 rounded-xl border border-border bg-card shadow-sm flex items-center justify-between hover:border-[#E4405F]/50 transition-all">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#E4405F]/15 border border-[#E4405F]/30 flex items-center justify-center text-[#E4405F]">
                        <InstagramIcon className="w-4 h-4 text-[#E4405F]" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-muted-foreground uppercase">Instagram</div>
                        <div className="text-xs font-semibold text-foreground font-mono">@aswin.p.t</div>
                      </div>
                    </div>
                    <a
                      href="https://www.instagram.com/aswin.p.t/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-[#E4405F] transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Direct Phone Call */}
                <div className="p-4 rounded-xl border border-border bg-card shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary/15 border border-secondary/30 flex items-center justify-center text-secondary">
                      <Phone className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-muted-foreground uppercase">Direct Phone</div>
                      <div className="text-sm font-semibold font-mono text-foreground flex items-center gap-2">
                        <a href="tel:+918891381713" className="hover:text-primary transition-colors">
                          +91 88913 81713
                        </a>
                        <span className="text-xs text-muted-foreground font-normal">/ +91 85899 17134</span>
                      </div>
                    </div>
                  </div>
                  <a href="tel:+918891381713">
                    <Button variant="outline" size="sm" className="h-8 text-xs font-mono gap-1">
                      Call
                    </Button>
                  </a>
                </div>

                {/* Professional Profiles: LinkedIn & GitHub & Resume */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <a
                    href="https://linkedin.com/in/aswinpt2004"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-border bg-card hover:border-[#0077B5] hover:bg-[#0077B5]/5 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-[#0077B5]" />
                      <span className="text-xs font-semibold text-foreground">LinkedIn</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </a>

                  <a
                    href="https://github.com/Aswinpt2004"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-muted transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Github className="w-4 h-4 text-foreground" />
                      <span className="text-xs font-semibold text-foreground">GitHub</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </a>

                  <a
                    href="/Aswin_PT_Resume_.pdf"
                    download
                    className="p-3 rounded-lg border border-border bg-card hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-primary" />
                      <span className="text-xs font-semibold text-primary">Resume PDF</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
                  </a>
                </div>

                {/* Location Card */}
                <div className="p-3.5 rounded-xl border border-border bg-card shadow-sm flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-muted-foreground uppercase">Base Location</div>
                    <div className="text-xs sm:text-sm font-semibold text-foreground">
                      Kerala, India · Open to Remote & Worldwide Relocation
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact Message Form */}
            <div className="lg:col-span-7">
              <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                <div className="space-y-1 mb-6">
                  <h3 className="text-lg font-bold text-foreground">
                    Send a Direct Message
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Fill out the form below to initiate correspondence directly with Aswin P T.
                  </p>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-muted-foreground">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-muted-foreground">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-muted-foreground">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                      placeholder="Opportunity / AI Collaboration / Question"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-muted-foreground">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Hi Aswin, I came across your work in drone vision and federated learning..."
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary text-foreground resize-none"
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs sm:text-sm h-11 gap-2 shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    {formSent ? "Preparing Email Client..." : "Send Message to Aswin"}
                  </Button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          COMPREHENSIVE PROFESSIONAL FOOTER
          ======================================================== */}
      <footer className="bg-card border-t border-border/80 pt-14 pb-8 text-muted-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Main 4-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-border/60">
            
            {/* Col 1: Bio & Mission (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold font-mono text-sm">
                  AP
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-foreground text-sm tracking-tight">
                    Aswin P T
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    AI/ML Engineer & Researcher
                  </span>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Graduate student in Machine Intelligence at Digital University Kerala and Research Assistant at Quantumweave Intelligence. Building high-performance real-time aerial drone computer vision and privacy-preserving federated graph algorithms.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-foreground font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Open for Research & Engineering Roles</span>
              </div>
            </div>

            {/* Col 2: Navigation Links (2 cols) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                Navigation
              </h4>
              <ul className="space-y-2 text-xs font-medium">
                <li>
                  <a href="#about" className="hover:text-primary transition-colors">
                    About Me
                  </a>
                </li>
                <li>
                  <a href="#experience" className="hover:text-primary transition-colors">
                    Work Experience
                  </a>
                </li>
                <li>
                  <a href="#projects" className="hover:text-primary transition-colors">
                    Selected Projects
                  </a>
                </li>
                <li>
                  <a href="#skills" className="hover:text-primary transition-colors">
                    Technical Arsenal
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-primary transition-colors">
                    Contact & Channels
                  </a>
                </li>
                <li>
                  <a href="/Aswin_PT_Resume_.pdf" download className="text-primary hover:underline font-mono">
                    Resume PDF ↓
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Research Domains (3 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                Research & Tech
              </h4>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span>Aerial Drone Vision & YOLOv8</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span>Dilated CNN Crowd Counting (CSRNet)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span>Hierarchical FedGraph & DP (ε = 0.5)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span>INT8 TensorRT on Jetson Orin Nano</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span>Clinical Diagnostics & 3D Mapping</span>
                </li>
              </ul>
            </div>

            {/* Col 4: Direct Channels (3 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                Direct Channels
              </h4>
              <div className="space-y-2 text-xs font-mono">
                <div>
                  <a
                    href="https://wa.me/918891381713"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-foreground hover:text-[#25D366] transition-colors"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>WhatsApp: +91 88913 81713</span>
                  </a>
                </div>
                <div>
                  <a
                    href="https://t.me/Aswin_PT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-foreground hover:text-[#229ED9] transition-colors"
                  >
                    <TelegramIcon className="w-3.5 h-3.5 text-[#229ED9]" />
                    <span>Telegram: @Aswin_PT</span>
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.instagram.com/aswin.p.t/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-foreground hover:text-[#E4405F] transition-colors"
                  >
                    <InstagramIcon className="w-3.5 h-3.5 text-[#E4405F]" />
                    <span>Instagram: @aswin.p.t</span>
                  </a>
                </div>
                <div>
                  <a
                    href="mailto:aswinsureshpt@gmail.com"
                    className="flex items-center gap-1.5 text-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-primary" />
                    <span>aswinsureshpt@gmail.com</span>
                  </a>
                </div>
                <div>
                  <a
                    href="https://linkedin.com/in/aswinpt2004"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-foreground hover:text-[#0077B5] transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />
                    <span>LinkedIn: aswinpt2004</span>
                  </a>
                </div>
                <div>
                  <a
                    href="https://github.com/Aswinpt2004"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-foreground hover:text-primary transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub: Aswinpt2004</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Back-to-Top Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-2 text-center sm:text-left">
              <span>© 2026 Aswin P T. All rights reserved.</span>
              <span>·</span>
              <span>Kerala, India</span>
              <span>·</span>
              <span>Engineered with Next.js, Tailwind CSS & TypeScript</span>
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted hover:bg-primary hover:text-primary-foreground text-foreground transition-all font-mono font-medium"
            >
              Back to Top ↑
            </a>
          </div>

        </div>
      </footer>

      {/* Floating Rule-Based AI Assistant Chatbot */}
      <InteractiveChatbot />
    </div>
  )
}
