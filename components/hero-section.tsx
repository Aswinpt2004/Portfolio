"use client"

import { Button } from "@/components/ui/button"
import { TypingAnimation } from "./typing-animation"
import { Github, Linkedin, Download, ArrowDown } from "lucide-react"

export function HeroSection() {
  const scrollToAbout = () => {
    const element = document.querySelector("#about")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="min-h-[85vh] flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-bg" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="glass rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-xl border-primary/20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 gradient-text animate-fade-in">Aswin P T</h1>

          <div className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-6 h-16 flex items-center justify-center">
            <TypingAnimation
              texts={["Software Developer", "Machine Intelligence Student", "AI/ML Enthusiast", "Full-stack Innovator"]}
              className="font-medium"
            />
          </div>

          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
            Passionate about solving real-world problems using AI/ML technologies. Building innovative solutions with
            Python, deep learning, and modern web technologies.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 transform hover:scale-105 text-white"
              asChild
            >
              <a href="https://www.linkedin.com/in/aswinpt2004/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-5 w-5" />
                LinkedIn
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="glass hover:glass-dark transition-all duration-300 transform hover:scale-105 bg-transparent border-primary/20"
              asChild
            >
              <a href="https://github.com/Aswinpt2004" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </a>
            </Button>

            <Button
              size="lg"
              variant="secondary"
              className="transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <a href="/Aswin%20P%20T_Research.pdf" download="Aswin P T_Research.pdf">
                <Download className="mr-2 h-5 w-5" />
                Resume
              </a>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="lg"
            onClick={scrollToAbout}
            className="animate-bounce hover:animate-none transition-all duration-300"
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}
