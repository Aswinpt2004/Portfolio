"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react"

const experiences = [
  {
    role: "Research Assistant – AI & Data Science",
    period: "Aug 2024 — Present",
    company: "Quantumweave Intelligence",
    location: "Trivandrum, India",
    type: "Research & Development",
    description:
      "Spearheading AI-based drone vision systems, computer vision pipelines, and geospatial analysis workflows for real-world drone aerial surveillance.",
    highlights: [
      "Designed and deployed computer vision pipelines for real-time crowd counting, vehicle detection, object tracking, and automated perimeter intrusion detection.",
      "Implemented deep learning models including CSRNet for dilated crowd density estimation and custom-tuned YOLO architectures for low-altitude aerial perspectives.",
      "Conducted extensive aerial video processing, dataset preparation, and integrated geospatial analysis for enhanced field drone deployment precision.",
    ],
    technologies: [
      "Python",
      "Computer Vision",
      "Drone Vision",
      "Deep Learning",
      "YOLO",
      "CSRNet",
      "Video Processing",
      "Geospatial Analysis",
      "Object Tracking",
    ],
  },
  {
    role: "AI/ML Intern",
    period: "Mar 2026 — May 2026",
    company: "Synbrains Solutions Pvt. Ltd.",
    location: "Kozhikode, India",
    type: "Industry Internship",
    description:
      "Delivered production-grade clinical AI components, automated unstructured medical report extraction, and privacy-preserving Federated Learning workflows.",
    highlights: [
      "Engineered the PI-RADS prostate AI clinical reporting platform, implementing diagnostic image handling, 3D sector mapping modules, and scoring algorithms.",
      "Built a modular zero-codebase medical scan report extraction pipeline using Pydantic validation contracts and high-precision parsing for raw PDF/DOCX diagnostic reports.",
      "Implemented Federated Learning workflows for cross-institutional clinical model training with FastAPI backend services and Docker containerization.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Flask",
      "Federated Learning",
      "Docker",
      "Postman",
      "Git Branching",
      "Pydantic",
    ],
  },
]

export function ExperienceWindow() {
  return (
    <div className="space-y-6 select-text text-foreground">
      {experiences.map((exp, idx) => (
        <div key={idx} className="p-4 sm:p-5 rounded-2xl border border-border bg-background/60 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <h3 className="font-bold text-base text-foreground font-heading">{exp.role}</h3>
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mt-0.5">
                <span className="text-secondary font-semibold">{exp.company}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {exp.location}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-mono text-[11px] self-start sm:self-auto border border-primary/20">
              <Calendar className="w-3 h-3" />
              <span>{exp.period}</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            {exp.description}
          </p>

          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase font-bold text-muted-foreground block">
              KEY ACHIEVEMENTS:
            </span>
            <ul className="space-y-1 text-xs text-muted-foreground">
              {exp.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 border-t border-border flex flex-wrap gap-1">
            {exp.technologies.map((t, i) => (
              <Badge key={i} variant="secondary" className="text-[10px] font-mono px-2 py-0 bg-muted/60">
                {t}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
