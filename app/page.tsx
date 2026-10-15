"use client"

import { useState } from "react"
import { NeuralOsMenubar } from "@/components/neural-os-menubar"
import { NeuralOsDock } from "@/components/neural-os-dock"
import { CommandPalette } from "@/components/command-palette"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { FloatingChatbot } from "@/components/floating-chatbot"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)

  const handleOpenCommandPalette = () => {
    setIsCommandPaletteOpen(true)
  }

  const handleSelectPaletteAction = (actionId: string) => {
    if (actionId === "open-palette") {
      setIsCommandPaletteOpen(true)
    }
  }

  return (
    <main className="min-h-screen relative pb-16 selection:bg-primary/20 selection:text-primary">
      {/* Top visionOS Menubar */}
      <NeuralOsMenubar onOpenCommandPalette={handleOpenCommandPalette} />

      {/* Spotlight / Command Palette Dialog */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectAction={handleSelectPaletteAction}
      />

      {/* Desktop Virtual Workspace Sections */}
      <div id="home">
        <HeroSection onOpenCommandPalette={handleOpenCommandPalette} />
      </div>

      <div id="about">
        <AboutSection />
      </div>

      <div id="skills">
        <SkillsSection />
      </div>

      <div id="experience">
        <ExperienceSection />
      </div>

      <div id="projects">
        <ProjectsSection />
      </div>

      <div id="contact">
        <ContactSection />
      </div>

      <Footer />
      <Toaster />

      {/* Bottom visionOS Floating Dock */}
      <NeuralOsDock onOpenCommandPalette={handleOpenCommandPalette} />

      {/* Floating AI Mission Copilot */}
      <FloatingChatbot />
    </main>
  )
}
