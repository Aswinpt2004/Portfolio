"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, Github, Linkedin, Send, Instagram, MessageCircle } from "lucide-react"
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

    // Create mailto link
    const subject = `Portfolio Contact from ${formData.name}`
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    const mailtoLink = `mailto:aswinsureshpt@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    window.location.href = mailtoLink

    toast({
      title: "Opening email client...",
      description: "Your default email client will open with the message pre-filled.",
    })

    // Reset form
    setFormData({ name: "", email: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 gradient-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">Get In Touch</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, or just having a chat about technology
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="glass border-primary/20 glow-hover">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-2" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="mailto:aswinsureshpt@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors break-all"
                >
                  aswinsureshpt@gmail.com
                </a>
              </CardContent>
            </Card>

            <Card className="glass border-primary/20 glow-hover">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-2" />
                  Phone
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">+91 88913 81713</p>
                <p className="text-muted-foreground">+91 8589917134</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Button size="lg" variant="outline" className="w-full bg-transparent border-primary/20 glow-hover" asChild>
                <a href="https://www.linkedin.com/in/aswinpt2004/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5 mr-2" />
                  LinkedIn
                </a>
              </Button>
              <Button size="lg" variant="outline" className="w-full bg-transparent border-primary/20 glow-hover" asChild>
                <a href="https://github.com/Aswinpt2004" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button size="lg" variant="outline" className="w-full bg-transparent border-primary/20 glow-hover" asChild>
                <a href="https://wa.me/918891381713" target="_blank" rel="noopener noreferrer">
                  <Phone className="h-5 w-5 mr-2" />
                  WhatsApp
                </a>
              </Button>
              <Button size="lg" variant="outline" className="w-full bg-transparent border-primary/20 glow-hover" asChild>
                <a href="https://t.me/Aswin_PT" target="_blank" rel="noopener noreferrer">
                  <Send className="h-5 w-5 mr-2" />
                  Telegram
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Button size="lg" variant="outline" className="w-full bg-transparent border-primary/20 glow-hover" asChild>
                <a href="https://discord.gg/your-discord-server" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Discord
                </a>
              </Button>
              <Button size="lg" variant="outline" className="w-full bg-transparent border-primary/20 glow-hover" asChild>
                <a href="https://www.instagram.com/aswin.p.t/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5 mr-2" />
                  Instagram
                </a>
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="glass border-primary/20 glow-hover">
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="glass border-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="glass border-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="glass resize-none border-primary/20"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full glow-hover">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
