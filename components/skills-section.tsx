"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Globe, Brain, Database, Star, Zap } from "lucide-react"

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code,
    description: "Proficient in multiple programming paradigms with strong problem-solving abilities",
    skills: [
      { name: "Python", level: "Expert", years: "3+", projects: "15+", color: "bg-yellow-500" },
      { name: "JavaScript", level: "Advanced", years: "2+", projects: "10+", color: "bg-yellow-400" },
      { name: "C", level: "Intermediate", years: "2+", projects: "8+", color: "bg-blue-500" },
      { name: "C++", level: "Intermediate", years: "2+", projects: "6+", color: "bg-blue-400" },
    ],
  },
  {
    title: "Web Development",
    icon: Globe,
    description: "Full-stack development with modern frameworks and responsive design principles",
    skills: [
      { name: "HTML/CSS", level: "Expert", years: "3+", projects: "20+", color: "bg-orange-500" },
      { name: "Django", level: "Advanced", years: "2+", projects: "8+", color: "bg-green-600" },
      { name: "React", level: "Intermediate", years: "1+", projects: "5+", color: "bg-cyan-500" },
      { name: "Node.js", level: "Intermediate", years: "1+", projects: "4+", color: "bg-green-500" },
    ],
  },
  {
    title: "AI/ML & Data",
    icon: Brain,
    description: "Specialized in machine learning, deep learning, and data analysis with practical applications",
    skills: [
      { name: "Deep Learning", level: "Advanced", years: "2+", projects: "12+", color: "bg-purple-600" },
      { name: "TensorFlow", level: "Intermediate", years: "1+", projects: "6+", color: "bg-orange-600" },
      { name: "Computer Vision", level: "Intermediate", years: "1+", projects: "4+", color: "bg-pink-500" },
      { name: "Data Analytics", level: "Advanced", years: "2+", projects: "10+", color: "bg-indigo-500" },
      { name: "Cognitive Computing", level: "Intermediate", years: "1+", projects: "1+", color: "bg-pink-500" },
    ],
  },
  {
    title: "Tools & Databases",
    icon: Database,
    description: "Experienced with development tools, database management, and cloud platforms",
    skills: [
      { name: "PostgreSQL", level: "Intermediate", years: "1+", projects: "6+", color: "bg-blue-600" },
      { name: "MySQL", level: "Advanced", years: "2+", projects: "8+", color: "bg-blue-500" },
      { name: "VS Code", level: "Expert", years: "3+", projects: "All", color: "bg-blue-400" },
      { name: "Google Colab", level: "Advanced", years: "2+", projects: "15+", color: "bg-yellow-600" },
    ],
  },
]

const levelStars = {
  Expert: 5,
  Advanced: 4,
  Intermediate: 3,
}

export function SkillsSection() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 gradient-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">Technical Skills</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hover over each category to explore my expertise and experience
          </p>
        </div>

        <div className="space-y-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ease-in-out ${
                hoveredCategory !== null && hoveredCategory !== index
                  ? "transform translate-y-4 opacity-50 scale-95"
                  : "transform translate-y-0 opacity-100 scale-100"
              }`}
              onMouseEnter={() => setHoveredCategory(index)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Card className="glass hover:glass-dark transition-all duration-500 border-primary/20 overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-3 rounded-lg bg-primary/10 mr-4">
                          <category.icon className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold gradient-text">{category.title}</h3>
                          <p className="text-muted-foreground mt-1">{category.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-primary">
                        <Zap className="h-5 w-5 mr-2" />
                        <span className="font-semibold">{category.skills.length} Skills</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      hoveredCategory === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {category.skills.map((skill, skillIndex) => (
                          <div
                            key={skillIndex}
                            className="group relative p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                          >
                            <div className="relative mb-3">
                              <div
                                className={`w-14 h-14 rounded-full ${skill.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                              >
                                <span className="text-white font-bold text-lg">{skill.name.charAt(0)}</span>
                              </div>
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                <Star className="h-3 w-3 text-white fill-current" />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h4 className="font-bold text-lg">{skill.name}</h4>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-xs">
                                  {skill.level}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{skill.years} experience</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="flex gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-3 w-3 transition-colors duration-200 ${
                                        i < levelStars[skill.level as keyof typeof levelStars]
                                          ? "text-yellow-400 fill-current"
                                          : "text-muted-foreground"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs font-medium text-primary">{skill.projects} projects</span>
                              </div>
                            </div>

                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
