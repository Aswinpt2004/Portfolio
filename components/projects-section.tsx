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
  { title: "Adaptive Confidence Modeling for SHADER-Based 3D Human Body Shape Estimation",
    description:
      "Implemented an adaptive confidence modeling approach to enhance SHADER-based 3D human body shape estimation from monocular images. Improved accuracy and robustness in diverse scenarios.",
    technologies: ["Python", "PyTorch", "OpenCV", "SMPL"],
    github: "https://github.com/Aswinpt2004",
    demo: "#",
    image: "/shader.png",
  },
  { title: "Aswin's Fuzzy Logic Toolbox",
    description:
      "A comprehensive web-based interactive fuzzy logic system built with Flask and Python. This toolbox provides complete support for fuzzy set operations, membership functions, relations, implications, and full fuzzy inference workflows.",
    technologies: ["Python", "Flask", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/Aswinpt2004/fuzzy",
    demo: "https://fuzzytoolbox.onrender.com/",
    image: "/Fuzzy.png",
  },
  { title: "AI Enhanced PREDICT-ASD: Preliminary Risk Evaluation & Digital Intervention for Childhood ASD",
    description:
      "AI-Enhanced PREDICT-ASD is a web-based platform designed to support early screening and management of Autism Spectrum Disorder (ASD) in children. It integrates standardized questionnaires, interactive game-based assessments, AI-assisted preliminary risk evaluation, and real-time caregiver–clinician communication within a secure, role-based system. The platform aims to improve accessibility, engagement, and coordination in early ASD screening and intervention.",
    technologies: ["Next.js","React","TypeScript","Backend APIs","MongoDB (Cloud Database)","Role-Based Authentication","Real-Time Chat Integration"],
    github: "https://github.com/Aswinpt2004/ASD_prediction_web_miniproject",
    demo: "https://predictasd.vercel.app/",
    image: "/Asd.png",
  },
  { title: "Dynamic Connectome-Based Prediction of Reality-Monitoring Failure (On Going)",
    description:
      "This project investigates how sleep deprivation disrupts brain network stability by modeling the brain as a dynamic functional connectome. Using time-resolved fMRI connectivity and Graph Attention Networks, the study aims to predict hallucination-prone states and identify critical prefrontal–sensory disconnections responsible for reality-monitoring failure.",
    technologies: ["Python","fMRIPrep","Nilearn","PyTorch Geometric (GAT)","NetworkX","GNN"],
    github: "https://github.com/Aswinpt2004",
    demo: "https://github.com/Aswinpt2004",
    image: "Hallucinataion.png",
  },
  { title: "FEDGRAPH-SHIELD: PRIVACY-PRESERVING FEDERATED GRAPH LEARNING FOR CROSS-INSTITUTIONAL FINANCIALFRAUD DETECTION",
    description:
      "This work presents a privacy-preserving framework evaluated on a fraud detection dataset to enable secure and collaborative analysis without exposing sensitive data. The framework integrates privacy protection techniques with distributed model learning to maintain data confidentiality while supporting effective fraud identification. Experimental evaluation demonstrates its ability to preserve privacy while achieving reliable performance across different data conditions.",
    technologies: ["Python", "Federated Learning", "PyTorch", "PyTorch Geometric (GNN)", "Graph Neural Networks (GNN)", "Differential Privacy", "Secure Aggregation", "NetworkX"],
    github: "https://github.com/Aswinpt2004/PRIVACY-PRESERVING-FEDERATED-GRAPH-LEARNING-FOR-CROSS-INSTITUTIONAL-FINANCIAL-FRAUD-DETECTION",
    demo: "https://github.com/Aswinpt2004",
    image: "fl_archi.png",
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="glass hover:glass-dark transition-all duration-300 transform hover:scale-105 overflow-hidden flex flex-col"
            >
              <div className="aspect-video overflow-hidden shrink-0">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg lg:text-xl font-bold leading-snug">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 flex-grow flex flex-col">
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2 pt-2 mt-auto">
                  <Button size="sm" variant="outline" asChild className="text-xs">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" asChild className="text-xs">
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
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
