"use client"

import React, { useState } from "react"
import { Mail, Phone, Github, Linkedin, Send, Radio } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export function ContactWindow() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `Portfolio Inquiry from ${formData.name}`
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    const mailtoLink = `mailto:aswinsureshpt@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoLink

    toast({
      title: "Opening Email Client...",
      description: "Default email client pre-filled with your message.",
    })
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <div className="space-y-5 select-text text-foreground">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-xl border border-border bg-background/60">
          <div className="flex items-center gap-2 text-primary font-bold mb-1">
            <Mail className="w-4 h-4" />
            <span>EMAIL DISPATCH</span>
          </div>
          <a href="mailto:aswinsureshpt@gmail.com" className="text-foreground hover:underline break-all">
            aswinsureshpt@gmail.com
          </a>
        </div>

        <div className="p-3.5 rounded-xl border border-border bg-background/60">
          <div className="flex items-center gap-2 text-secondary font-bold mb-1">
            <Phone className="w-4 h-4" />
            <span>DIRECT PHONE</span>
          </div>
          <div>+91 88913 81713 / +91 85899 17134</div>
        </div>
      </div>

      {/* Social Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" asChild className="text-xs font-mono">
          <a href="https://linkedin.com/in/aswinpt2004" target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-3.5 h-3.5 mr-1 text-[#0077b5]" />
            LinkedIn
          </a>
        </Button>
        <Button variant="outline" size="sm" asChild className="text-xs font-mono">
          <a href="https://github.com/Aswinpt2004" target="_blank" rel="noopener noreferrer">
            <Github className="w-3.5 h-3.5 mr-1" />
            GitHub
          </a>
        </Button>
        <Button variant="outline" size="sm" asChild className="text-xs font-mono">
          <a href="https://wa.me/918891381713" target="_blank" rel="noopener noreferrer">
            <Phone className="w-3.5 h-3.5 mr-1 text-[#25d366]" />
            WhatsApp
          </a>
        </Button>
      </div>

      {/* Message Form */}
      <form onSubmit={handleSubmit} className="space-y-3 p-4 rounded-2xl border border-border bg-background/60">
        <div className="space-y-1">
          <Label className="text-xs font-mono text-muted-foreground">YOUR NAME</Label>
          <Input
            required
            value={formData.name}
            onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
            placeholder="Dr. Scientist / Hiring Manager"
            className="text-xs h-9 bg-background/80"
          />
        </div>

        <div className="space-y-1">
          <Label className="text-xs font-mono text-muted-foreground">YOUR EMAIL</Label>
          <Input
            required
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
            placeholder="contact@organization.ai"
            className="text-xs h-9 bg-background/80"
          />
        </div>

        <div className="space-y-1">
          <Label className="text-xs font-mono text-muted-foreground">MESSAGE PAYLOAD</Label>
          <Textarea
            required
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
            placeholder="Let's discuss drone computer vision, federated GNN research, or engineering roles..."
            className="text-xs resize-none bg-background/80"
          />
        </div>

        <Button type="submit" size="sm" className="w-full bg-primary text-white text-xs font-mono font-bold">
          <Send className="w-3.5 h-3.5 mr-1.5" />
          Transmit Message Payload
        </Button>
      </form>
    </div>
  )
}
