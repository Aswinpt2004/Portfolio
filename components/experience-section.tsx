"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase } from "lucide-react"

const experiences = [
  {
    role: "AI/ML Intern",
    period: "Mar 2026 — May 2026",
    subtitle: "Synbrains Solutions Pvt. Ltd.",
    description:
      "Developed models to parse unstructured medical scan reports into structured formats and deployed Federated Learning workflows. Responsible for model experimentation, backend development (FastAPI/Flask), Docker containerization, Postman testing, code reviews, and technical documentation.",
    highlights: [
      "Model experimentation and evaluation",
      "Parsed unstructured medical reports into structured formats",
      "Implemented Federated Learning workflows for cross-institutional training",
      "Backend APIs with FastAPI / Flask",
      "Docker containerization and Postman testing",
      "Code reviews, technical documentation and production-ready delivery",
      "Strong debugging, maintainable code and industry practices",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Flask",
      "Docker",
      "Federated Learning",
      "Postman",
      "Git",
      "AI/ML",
    ],
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Experience
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">
          {experiences.map((exp, idx) => (
            <Card key={idx} className="glass hover:glass-dark transition-all duration-300">
              <CardHeader className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 pb-2">
                <Briefcase className="h-6 w-6 text-primary" />
                <div className="min-w-0">
                  <CardTitle className="text-base sm:text-lg font-bold">{exp.role}</CardTitle>
                  <p className="text-sm text-muted-foreground break-words">{exp.subtitle} — {exp.period}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{exp.description}</p>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-2">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
