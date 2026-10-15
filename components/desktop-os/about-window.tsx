"use client"

import React from "react"
import {
  GraduationCap,
  Mail,
  Phone,
  Compass,
  BookOpen,
  Award,
  Sparkles,
  ExternalLink,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function AboutWindow() {
  return (
    <div className="space-y-6 select-text text-foreground text-xs sm:text-sm">
      {/* Bio Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-muted/40 border border-border flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold font-heading shadow-md shrink-0">
          A
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading">Aswin P T</h2>
          <p className="text-xs font-mono text-primary font-medium">
            AI/ML Engineer • Computer Vision & Drone Sensing • Federated GNNs
          </p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            M.Sc. Machine Intelligence Graduate Student at Kerala University of Digital Sciences, Innovation and Technology (DUK) and Research Assistant at Quantumweave Intelligence.
          </p>
        </div>
      </div>

      {/* 3 Core Pillars */}
      <div>
        <h4 className="font-bold text-xs font-mono uppercase text-muted-foreground mb-3">
          CORE RESEARCH PILLARS
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl border border-border bg-background/60 space-y-1">
            <div className="p-2 rounded-lg bg-primary/10 text-primary w-fit mb-2">
              <Compass className="w-4 h-4" />
            </div>
            <div className="font-bold text-xs text-foreground">Autonomous Drone Vision</div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Developing deep learning pipelines (CSRNet, YOLO) for aerial crowd counting, tracking, and intrusion detection.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-border bg-background/60 space-y-1">
            <div className="p-2 rounded-lg bg-secondary/10 text-secondary w-fit mb-2">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="font-bold text-xs text-foreground">Privacy-Preserving Graphs</div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Hierarchical federated GNN frameworks with formal Differential Privacy guarantees across financial silos.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-border bg-background/60 space-y-1">
            <div className="p-2 rounded-lg bg-accent/10 text-accent w-fit mb-2">
              <Award className="w-4 h-4" />
            </div>
            <div className="font-bold text-xs text-foreground">Production AI Backends</div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Deploying containerized microservices in FastAPI, PyTorch, Docker, and high-throughput real-world pipelines.
            </p>
          </div>
        </div>
      </div>

      {/* Education */}
      <div>
        <h4 className="font-bold text-xs font-mono uppercase text-muted-foreground mb-3">
          ACADEMIC QUALIFICATIONS
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl border border-border bg-background/60 space-y-1">
            <div className="flex items-center gap-2 text-primary font-bold text-xs">
              <GraduationCap className="w-4 h-4" />
              <span>POSTGRADUATE DEGREE</span>
            </div>
            <div className="font-bold text-sm text-foreground">M.Sc. in Machine Intelligence</div>
            <div className="text-xs text-muted-foreground">
              Kerala University of Digital Sciences, Innovation and Technology (DUK)
            </div>
            <div className="text-[10px] font-mono text-primary font-medium">2024 – 2026 (Ongoing)</div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-background/60 space-y-1">
            <div className="flex items-center gap-2 text-secondary font-bold text-xs">
              <GraduationCap className="w-4 h-4" />
              <span>UNDERGRADUATE DEGREE</span>
            </div>
            <div className="font-bold text-sm text-foreground">B.Sc. in Computer Science</div>
            <div className="text-xs text-muted-foreground">
              College of Applied Science IHRD, Kozhikode
            </div>
            <div className="text-[10px] font-mono text-secondary font-medium">Completed: 2024</div>
          </div>
        </div>
      </div>

      {/* Direct Contact Buttons */}
      <div className="pt-2 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <a
            href="mailto:aswinsureshpt@gmail.com"
            className="flex items-center gap-1.5 text-primary hover:underline font-semibold"
          >
            <Mail className="w-3.5 h-3.5" />
            aswinsureshpt@gmail.com
          </a>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">+91 88913 81713</span>
        </div>

        <Button size="sm" asChild className="bg-primary text-white text-xs">
          <a href="/Aswin.p.t_resume.pdf" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-3.5 h-3.5 mr-1" />
            Open Full PDF Resume
          </a>
        </Button>
      </div>
    </div>
  )
}
