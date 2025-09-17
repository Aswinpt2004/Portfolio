"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"

const projects = [
  {
    title: "PETZZO – Pet Care Platform",
    description:
      "Built a comprehensive platform for booking appointments, tracking pets, and managing medical records. Integrated AI-based disease prediction and CRUD operations for seamless pet care management.",
    technologies: ["Django", "HTML", "CSS", "JavaScript", "MySQL", "AI/ML"],
    github: "https://github.com/Aswinpt2004",
    demo: "#",
    image: "/pet-care-platform-dashboard.jpg",
  },
  {
    title: "RNA Secondary Structure Prediction",
    description:
      "Designed a deep learning model to predict RNA secondary structures from sequences using CNN and RNN architectures. Achieved good training accuracy and F1-score on validation using dot-bracket notation.",
    technologies: ["Python", "CNN", "RNN", "TensorFlow", "Bioinformatics"],
    github: "https://github.com/Aswinpt2004",
    demo: "#",
    image: "/rna-structure-prediction-visualization.jpg",
  },
  {
    title: "PM2.5 Air Quality Forecasting",
    description:
      "Developed a TensorFlow-based LSTM model to forecast 7-day PM2.5 levels in major Indian cities. Applied advanced data preprocessing techniques and conducted comprehensive exploratory data analysis.",
    technologies: ["Python", "TensorFlow", "LSTM", "Pandas", "Seaborn"],
    github: "https://github.com/Aswinpt2004",
    demo: "#",
    image: "/air-quality-forecasting-dashboard-charts.jpg",
  },
  {
    title: "Manglish WhatsApp Chatbot",
    description:
      "Built an offline Manglish (Malayalam-English) WhatsApp chatbot using locally hosted Llama-3 model. Features real-time messaging, personality engine, and automated chat flow with emoji-rich responses.",
    technologies: ["Node.js", "Ollama", "Llama-3", "WhatsApp-web.js"],
    github: "https://github.com/Aswinpt2004",
    demo: "#",
    image: "/whatsapp-chatbot-interface-conversation.jpg",
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work in AI/ML, web development, and innovative tech solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="glass hover:glass-dark transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  <Button size="sm" variant="outline" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
