"use client"

import { GraduationCap, Mail, Phone, Sparkles, Award, BookOpen, Compass } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full os-window text-primary text-xs font-mono font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NEURAL OS // ACADEMIC PROFILE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight mb-4">
            About <span className="os-gradient-text">Aswin P T</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Machine Intelligence graduate student at Kerala University of Digital Sciences, Innovation and Technology (DUK) and AI Research Assistant at Quantumweave Intelligence. Driven by scientific inquiry and production-grade engineering discipline.
          </p>
        </div>

        {/* 3 Core Research Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="os-window p-6 rounded-2xl">
            <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-foreground mb-2">
              Autonomous Aerial Vision
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Designing deep learning architectures (CSRNet, YOLO) and video processing workflows for drone-based crowd estimation, intrusion monitoring, and aerial tracking.
            </p>
          </div>

          <div className="os-window p-6 rounded-2xl">
            <div className="p-3 rounded-xl bg-secondary/10 text-secondary w-fit mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-foreground mb-2">
              Privacy-Preserving Graphs
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Developing federated learning protocols (FedGraph-Shield) that train Graph Neural Networks across siloed financial & medical institutions with Differential Privacy.
            </p>
          </div>

          <div className="os-window p-6 rounded-2xl">
            <div className="p-3 rounded-xl bg-accent/10 text-accent w-fit mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-foreground mb-2">
              Production AI Backends
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Architecting containerized FastAPI/Docker microservices capable of low-latency inference, dynamic report parsers, and robust validation contracts.
            </p>
          </div>
        </div>

        {/* Education Windows */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="os-window rounded-2xl overflow-hidden">
            <div className="os-window-header py-2 px-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <span className="text-[10px] font-mono text-muted-foreground">DUK_Master_Degree.app</span>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-primary font-semibold uppercase tracking-wider block">
                    POSTGRADUATE PROGRAM
                  </span>
                  <h3 className="text-lg font-bold text-foreground font-heading">
                    M.Sc. in Computer Science (Machine Intelligence)
                  </h3>
                </div>
              </div>
              <div className="space-y-1 text-sm pl-2 border-l-2 border-primary/40">
                <p className="font-medium text-foreground">
                  Kerala University of Digital Sciences, Innovation and Technology (DUK)
                </p>
                <p className="text-xs font-mono text-muted-foreground">2024 – 2026 (Ongoing)</p>
                <p className="text-xs text-muted-foreground pt-1">
                  Specializing in Deep Learning, Graph Analytics, Computer Vision, and Cognitive AI.
                </p>
              </div>
            </div>
          </div>

          <div className="os-window rounded-2xl overflow-hidden">
            <div className="os-window-header py-2 px-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <span className="text-[10px] font-mono text-muted-foreground">CAS_Bachelor_Degree.app</span>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-secondary/10 text-secondary">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-secondary font-semibold uppercase tracking-wider block">
                    UNDERGRADUATE DEGREE
                  </span>
                  <h3 className="text-lg font-bold text-foreground font-heading">
                    B.Sc. in Computer Science
                  </h3>
                </div>
              </div>
              <div className="space-y-1 text-sm pl-2 border-l-2 border-secondary/40">
                <p className="font-medium text-foreground">
                  College of Applied Science IHRD, Kozhikode
                </p>
                <p className="text-xs font-mono text-muted-foreground">Graduated: 2024</p>
                <p className="text-xs text-muted-foreground pt-1">
                  Strong foundational training in algorithms, systems architecture, data structures, and database systems.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Communication Window */}
        <div className="os-window rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="text-[11px] font-mono text-primary font-bold uppercase tracking-wider block mb-1">
                COMMUNICATION CHANNELS
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
                Get In Touch For Collaboration
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-md">
                Available for AI research collaborations, consulting, and forward-thinking engineering opportunities.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
              <a
                href="mailto:aswinsureshpt@gmail.com"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-background/80 hover:bg-background border border-border text-foreground hover:text-primary transition-all shadow-xs"
              >
                <Mail className="h-4 w-4 text-primary" />
                <span>aswinsureshpt@gmail.com</span>
              </a>

              <a
                href="tel:+918891381713"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-background/80 hover:bg-background border border-border text-foreground hover:text-secondary transition-all shadow-xs"
              >
                <Phone className="h-4 w-4 text-secondary" />
                <span>+91 88913 81713</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
