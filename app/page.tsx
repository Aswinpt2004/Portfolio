import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { FloatingChatbot } from "@/components/floating-chatbot"
import { Toaster } from "@/components/ui/toaster"



export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <div id="home">
        <HeroSection />
      </div>

      <div id="about">
        <AboutSection />
      </div>

      <div id="skills">
        <SkillsSection />
      </div>

      <div id="projects">
        <ProjectsSection />
      </div>

      <div id="contact">
        <ContactSection />
      </div>

      <Footer />
      <Toaster />
      <FloatingChatbot />
    </main>
  )
}
