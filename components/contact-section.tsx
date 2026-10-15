"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Send,
  Instagram,
  MessageCircle,
  Radio,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const subject = `Portfolio Inquiry from ${formData.name}`
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    const mailtoLink = `mailto:aswinsureshpt@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`

    window.location.href = mailtoLink

    toast({
      title: "Opening Mail Client...",
      description: "Default email client triggered with pre-formatted payload.",
    })

    setFormData({ name: "", email: "", message: "" })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full os-window text-primary text-xs font-mono font-medium mb-3">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>NEURAL OS // TRANSMISSION CHANNEL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight mb-4">
            Initiate <span className="os-gradient-text">Contact</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Open for AI research collaborations, machine intelligence engineering, or technical inquiries.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Direct Channels */}
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="os-window p-5 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">EMAIL DISPATCH</span>
                </div>
                <a
                  href="mailto:aswinsureshpt@gmail.com"
                  className="text-sm font-mono text-foreground hover:text-primary transition-colors break-all font-semibold"
                >
                  aswinsureshpt@gmail.com
                </a>
              </div>

              <div className="os-window p-5 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-secondary/10 text-secondary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">PHONE DIRECT</span>
                </div>
                <div className="space-y-0.5 text-sm font-mono text-foreground font-semibold">
                  <div>+91 88913 81713</div>
                  <div className="text-xs text-muted-foreground">+91 85899 17134</div>
                </div>
              </div>
            </div>

            {/* Social Networks Grid */}
            <div className="os-window p-6 rounded-2xl space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                NETWORKS & SOCIAL PRESENCE
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="w-full os-window hover:bg-primary/10 border-border text-xs font-mono justify-start hover:text-[#0077b5]"
                  asChild
                >
                  <a
                    href="https://www.linkedin.com/in/aswinpt2004/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-4 w-4 mr-2 text-[#0077b5]" />
                    LinkedIn
                  </a>
                </Button>

                <Button
                  variant="outline"
                  className="w-full os-window hover:bg-primary/10 border-border text-xs font-mono justify-start hover:text-primary"
                  asChild
                >
                  <a
                    href="https://github.com/Aswinpt2004"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </a>
                </Button>

                <Button
                  variant="outline"
                  className="w-full os-window hover:bg-primary/10 border-border text-xs font-mono justify-start hover:text-[#25d366]"
                  asChild
                >
                  <a
                    href="https://wa.me/918891381713"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Phone className="h-4 w-4 mr-2 text-[#25d366]" />
                    WhatsApp
                  </a>
                </Button>

                <Button
                  variant="outline"
                  className="w-full os-window hover:bg-primary/10 border-border text-xs font-mono justify-start hover:text-[#229ed9]"
                  asChild
                >
                  <a
                    href="https://t.me/Aswin_PT"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Send className="h-4 w-4 mr-2 text-[#229ed9]" />
                    Telegram
                  </a>
                </Button>

                <Button
                  variant="outline"
                  className="w-full os-window hover:bg-primary/10 border-border text-xs font-mono justify-start hover:text-[#e4405f]"
                  asChild
                >
                  <a
                    href="https://www.instagram.com/aswin.p.t/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="h-4 w-4 mr-2 text-[#e4405f]" />
                    Instagram
                  </a>
                </Button>

                <Button
                  variant="outline"
                  className="w-full os-window hover:bg-primary/10 border-border text-xs font-mono justify-start hover:text-[#5865f2]"
                  asChild
                >
                  <a
                    href="https://discord.gg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4 mr-2 text-[#5865f2]" />
                    Discord
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Dispatch Form */}
          <div className="os-window rounded-2xl overflow-hidden shadow-md">
            <div className="os-window-header py-2.5 px-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <span className="text-[10px] font-mono text-muted-foreground">Message_Transmission.app</span>
            </div>

            <div className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs font-mono text-muted-foreground">
                    IDENTIFIER / NAME
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Dr. Researcher / Engineering Lead"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-background/80 border-border focus:border-primary text-sm font-sans rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-mono text-muted-foreground">
                    EMAIL ADDRESS
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="contact@organization.ai"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-background/80 border-border focus:border-primary text-sm font-sans rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-xs font-mono text-muted-foreground">
                    MESSAGE / PROJECT DETAILS
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Discussing drone computer vision pipelines, federated GNN implementations, or engineering roles..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="bg-background/80 border-border focus:border-primary text-sm font-sans resize-none rounded-xl"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-mono text-xs font-semibold shadow-md shadow-primary/25 mt-2 rounded-xl"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Transmit Message Payload
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
