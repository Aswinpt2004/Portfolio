"use client"

import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Mail, Phone } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Motivated and innovative Machine Intelligence student at Digital University Kerala with a solid foundation
            in computer science and a passion for solving real-world problems using AI/ML technologies. Skilled in
            Python programming, deep learning, data analytics, and web development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="glass hover:glass-dark transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <GraduationCap className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold">Current Education</h3>
              </div>
              <div className="space-y-2">
                <p className="font-medium">M.Sc. in Computer Science (Machine Intelligence)</p>
                <p className="text-muted-foreground">
                  Kerala University of Digital Sciences, Innovation and Technology
                </p>
                <p className="text-sm text-muted-foreground">2024 – 2026 (Ongoing)</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass hover:glass-dark transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <GraduationCap className="h-6 w-6 text-accent mr-3" />
                <h3 className="text-xl font-semibold">Previous Education</h3>
              </div>
              <div className="space-y-2">
                <p className="font-medium">B.Sc. in Computer Science</p>
                <p className="text-muted-foreground">College of Applied Science IHRD, Kozhikode</p>
                <p className="text-sm text-muted-foreground">Completed: 2024</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-center">Contact Information</h3>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-2" />
                <span className="text-muted-foreground">+91 88913 81713</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-2" />
                <span className="text-muted-foreground">+91 96455 99051</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-accent mr-2" />
                <span className="text-muted-foreground">aswinsureshpt@gmail.com</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
