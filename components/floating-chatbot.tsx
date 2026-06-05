"use client"

import type React from "react"

import { useState } from "react"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Hi! I'm Aswin's AI assistant. I can help you learn about his background, skills, projects, and experience. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const scrollToSection = (sectionId: string) => {
    console.log("[v0] Chatbot scrolling to:", sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      console.log("[v0] Element found, scrolling...")
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
      setIsOpen(false)
    } else {
      console.log("[v0] Element not found:", sectionId)
    }
  }

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("skill") || message.includes("technology") || message.includes("programming")) {
      return "🚀 Aswin is proficient in Python, Django, React, JavaScript, Machine Learning, and AI/ML technologies. He has experience with TensorFlow, PyTorch, and various web development frameworks. His technical expertise spans from backend development to AI model implementation."
    }

    if (message.includes("project") || message.includes("work") || message.includes("portfolio")) {
      return "💼 Aswin has worked on several impressive projects including a Pet Care Platform with AI-powered features, an E-commerce platform, and various machine learning applications. His projects demonstrate expertise in full-stack development and AI integration."
    }

    if (message.includes("education") || message.includes("background") || message.includes("about")) {
      return "🎓 Aswin is currently pursuing Machine Intelligence and has a strong background in software development. He combines academic knowledge with practical experience in AI/ML and web development technologies."
    }

    if (message.includes("contact") || message.includes("reach") || message.includes("hire")) {
      return "📧 You can reach Aswin through multiple channels: Email, LinkedIn, GitHub, WhatsApp (+91 8891381713), Telegram (@Aswin_PT), or Instagram. He's always open to discussing new opportunities and collaborations!"
    }

    if (message.includes("experience") || message.includes("internship") || message.includes("job")) {
      return "💡 Aswin has hands-on experience in software development, AI/ML research, and full-stack web development. He has worked on real-world projects that showcase his ability to deliver practical solutions using cutting-edge technologies."
    }

    return "🤖 That's an interesting question! I can help you learn about Aswin's skills, projects, education, experience, or how to contact him. Feel free to ask about any specific area you'd like to know more about!"
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999]">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
        <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse" />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 glow-hover"
        >
          {isOpen ? (
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <div className="relative">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce">
                <span className="text-xs">✨</span>
              </div>
            </div>
          )}
        </button>

        {!isOpen && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
            <span className="text-white text-xs font-bold">AI</span>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[calc(100vw-2rem)] max-w-sm sm:max-w-md animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-background/95 backdrop-blur-xl border-primary/20 shadow-2xl glow border-2 rounded-lg">
            <div className="p-4 border-b border-primary/20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center animate-float">
                  <span className="text-white text-sm">🤖</span>
                </div>
                <span className="text-foreground font-semibold">Aswin's AI Assistant</span>
                <div className="ml-auto flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div className="h-64 overflow-y-auto pr-2">
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p
                          className={`text-xs mt-1 opacity-70 ${
                            message.isUser ? "text-primary-foreground/70" : "text-muted-foreground"
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted text-foreground rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-primary rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-primary rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Aswin's skills, projects..."
                  className="flex-1 text-sm px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">Quick Navigation:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => scrollToSection("about")}
                    className="text-xs h-8 px-3 border border-primary/30 rounded-md bg-primary/5 hover:bg-primary/20 hover:border-primary/50 text-foreground transition-colors flex items-center gap-1"
                  >
                    <span>👤</span> About
                  </button>
                  <button
                    onClick={() => scrollToSection("skills")}
                    className="text-xs h-8 px-3 border border-primary/30 rounded-md bg-primary/5 hover:bg-primary/20 hover:border-primary/50 text-foreground transition-colors flex items-center gap-1"
                  >
                    <span>💻</span> Skills
                  </button>
                  <button
                    onClick={() => scrollToSection("projects")}
                    className="text-xs h-8 px-3 border border-primary/30 rounded-md bg-primary/5 hover:bg-primary/20 hover:border-primary/50 text-foreground transition-colors flex items-center gap-1"
                  >
                    <span>💼</span> Projects
                  </button>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-xs h-8 px-3 border border-primary/30 rounded-md bg-primary/5 hover:bg-primary/20 hover:border-primary/50 text-foreground transition-colors flex items-center gap-1"
                  >
                    <span>📧</span> Contact
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
