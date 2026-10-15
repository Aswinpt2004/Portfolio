"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Bot, Send, X, Sparkles } from "lucide-react"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

const quickPrompts = [
  "Tell me about his Drone Vision research",
  "Explain FedGraph-Shield project",
  "What is his backend & ML stack?",
  "How can I contact Aswin?",
]

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Hi there! I'm Aswin's AI Assistant. Ask me anything about his work in Drone Computer Vision, Federated GNNs, or backend engineering.",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isOpen])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
      setIsOpen(false)
    }
  }

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (
      message.includes("drone") ||
      message.includes("vision") ||
      message.includes("csrnet") ||
      message.includes("yolo") ||
      message.includes("quantumweave")
    ) {
      return "🛰️ At Quantumweave Intelligence, Aswin develops AI-based drone vision systems. He engineers computer vision pipelines using CSRNet (for dilated crowd density estimation) and YOLO architectures for aerial surveillance, vehicle detection, real-time object tracking, and automated intrusion monitoring."
    }

    if (
      message.includes("fedgraph") ||
      message.includes("federated") ||
      message.includes("graph") ||
      message.includes("fraud") ||
      message.includes("privacy")
    ) {
      return "🛡️ FedGraph-Shield is Aswin's ongoing research in Hierarchical Federated Graph Learning. It allows distributed banking institutions to collaboratively train GNNs to uncover cyclic financial fraud rings without sharing raw customer data, coordinated via Flower with Differential Privacy (ε=0.5)."
    }

    if (
      message.includes("connectome") ||
      message.includes("fmri") ||
      message.includes("brain") ||
      message.includes("gat")
    ) {
      return "🧠 In his Dynamic Connectome project, Aswin investigates reality-monitoring failures under sleep deprivation. He models resting-state fMRI scans using Graph Attention Networks (GATs) to identify early markers of psychosis-risk and prefrontal-sensory disconnects."
    }

    if (
      message.includes("skill") ||
      message.includes("stack") ||
      message.includes("tech") ||
      message.includes("backend")
    ) {
      return "⚡ Aswin's core stack combines PyTorch, PyTorch Geometric, TensorFlow, OpenCV, and YOLO with high-performance backends in FastAPI, Docker, Django, and PostgreSQL. He also codes in Python, C++, and TypeScript/Next.js."
    }

    if (
      message.includes("contact") ||
      message.includes("email") ||
      message.includes("phone") ||
      message.includes("hire")
    ) {
      return "📬 You can reach Aswin directly via email at aswinsureshpt@gmail.com, or phone at +91 88913 81713 / +91 85899 17134. He's active on LinkedIn and GitHub (@Aswinpt2004) and open to AI research collaborations and engineering roles!"
    }

    if (
      message.includes("education") ||
      message.includes("college") ||
      message.includes("duk")
    ) {
      return "🎓 Aswin is pursuing an M.Sc. in Computer Science (Machine Intelligence) at Kerala University of Digital Sciences, Innovation and Technology (DUK, 2024-2026). He holds a B.Sc. in Computer Science from CAS IHRD Kozhikode (2024)."
    }

    return "🤖 Command received! Aswin specializes in Drone Vision (CSRNet/YOLO), Federated Graph Learning (FedGraph-Shield), and high-throughput AI backends. Feel free to ask about his specific architectures or click any section to navigate!"
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    if (!textToSend) setInputValue("")
    setIsTyping(true)

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(text),
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 800)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999]">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary text-white shadow-xl shadow-primary/30 flex items-center justify-center transition-all duration-300 hover:scale-105 group"
          aria-label="Open AI Copilot"
        >
          {isOpen ? (
            <X className="h-6 w-6 transition-transform group-hover:rotate-90" />
          ) : (
            <div className="relative flex items-center justify-center">
              <Bot className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-secondary rounded-full animate-pulse" />
            </div>
          )}
        </button>

        {!isOpen && (
          <div className="absolute -top-1.5 -right-1.5 px-2 py-0.5 bg-accent text-white text-[9px] font-mono font-bold rounded-full shadow-md pointer-events-none">
            AI
          </div>
        )}
      </div>

      {isOpen && (
        <div className="absolute bottom-16 sm:bottom-20 right-0 w-[calc(100vw-2rem)] max-w-sm sm:max-w-md animate-in slide-in-from-bottom-5 duration-300">
          <div className="glass-prism rounded-3xl overflow-hidden border border-border shadow-2xl">
            {/* Header */}
            <div className="p-4 bg-muted/60 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold font-heading text-foreground">
                    Aswin AI Copilot
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                    <span>ONLINE & READY</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 space-y-3">
              <div className="h-60 sm:h-72 overflow-y-auto pr-1 space-y-3 text-xs">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                        message.isUser
                          ? "bg-primary text-white font-medium shadow-sm"
                          : "bg-muted/70 text-foreground border border-border"
                      }`}
                    >
                      <p>{message.text}</p>
                      <p
                        className={`text-[9px] mt-1 font-mono ${
                          message.isUser ? "text-white/70" : "text-muted-foreground"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted/70 border border-border rounded-2xl p-3 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                      <div
                        className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.15s" }}
                      />
                      <div
                        className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.3s" }}
                      />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts Bar */}
              <div className="space-y-1.5 pt-2 border-t border-border">
                <span className="text-[10px] font-mono text-muted-foreground block">
                  SUGGESTED INQUIRIES:
                </span>
                <div className="flex flex-wrap gap-1">
                  {quickPrompts.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="text-[10px] font-mono px-2 py-1 rounded-lg bg-background hover:bg-muted border border-border text-muted-foreground hover:text-foreground transition-colors text-left"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Form */}
              <div className="flex gap-2 pt-1">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Drone Vision, GNNs..."
                  className="flex-1 text-xs px-3 py-2 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:border-primary font-sans"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  className="px-3.5 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 transition-all font-mono text-xs font-semibold flex items-center justify-center shadow-sm"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Quick Jump Buttons */}
              <div className="grid grid-cols-4 gap-1.5 pt-1 text-[10px] font-mono text-center">
                <button
                  onClick={() => scrollToSection("about")}
                  className="py-1 rounded-lg bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("skills")}
                  className="py-1 rounded-lg bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border"
                >
                  Arsenal
                </button>
                <button
                  onClick={() => scrollToSection("experience")}
                  className="py-1 rounded-lg bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border"
                >
                  Career
                </button>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="py-1 rounded-lg bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border"
                >
                  Projects
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
