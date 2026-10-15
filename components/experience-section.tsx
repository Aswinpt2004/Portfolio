"use client"

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

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full os-window text-primary text-xs font-mono font-medium mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>NEURAL OS // CAREER TRACK RECORD</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight mb-4">
            Professional <span className="os-gradient-text">Experience</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Hands-on research and industry engineering in computer vision, deep learning, and federated systems.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-primary/30 ml-4 sm:ml-8 space-y-12">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-10 group">
              {/* Telemetry Node Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary group-hover:scale-125 transition-all duration-300 shadow-md shadow-primary/30" />

              <div className="os-window transition-all duration-300">
                <div className="os-window-header py-2 px-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-primary font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-foreground group-hover:text-primary transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-mono text-muted-foreground mt-1">
                      <span className="text-secondary font-semibold">{exp.company}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-foreground/90 font-medium leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">
                      KEY ACHIEVEMENTS & CONTRIBUTIONS:
                    </span>
                    <ul className="space-y-2">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="text-[11px] font-mono bg-muted/60 border border-border text-muted-foreground hover:text-foreground"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
