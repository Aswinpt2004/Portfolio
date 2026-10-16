"use client"

import React, { useState, useRef, useEffect } from "react"
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  ExternalLink,
  Download,
  Phone,
  Mail,
  CheckCircle2,
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatMessage {
  id: string
  sender: "bot" | "user"
  text: string
  timestamp: string
  chips?: { label: string; action: string }[]
  actions?: { label: string; url?: string; isDownload?: boolean }[]
}

export function InteractiveChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasUnread, setHasUnread] = useState(true)
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const initialMessages: ChatMessage[] = [
    {
      id: "msg-1",
      sender: "bot",
      text: "Hi there! 👋 I am Aswin's portfolio assistant. I can answer questions about his drone vision research, federated graph models, work experience, or connect you directly with him via WhatsApp, Telegram, or Email.",
      timestamp: "Just now",
      chips: [
        { label: "🛸 Drone Vision Work", action: "drone" },
        { label: "🛡️ FedGraph-Shield", action: "fedgraph" },
        { label: "💼 Experience & Roles", action: "experience" },
        { label: "📱 WhatsApp & Contact", action: "contact" },
        { label: "📄 Download Resume", action: "resume" }
      ]
    }
  ]

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      setHasUnread(false)
    }
  }, [isOpen, messages, isTyping])

  // Rule-based intent matcher
  const generateBotResponse = (userText: string): ChatMessage => {
    const text = userText.toLowerCase().trim()
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    // 1. WhatsApp / Direct Chat
    if (text.includes("whatsapp") || text.includes("wa.me") || text.includes("text him") || text.includes("chat on whatsapp")) {
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "You can reach Aswin directly on WhatsApp! His direct number is +91 88913 81713. Tap below to launch a chat:",
        timestamp: now,
        actions: [
          { label: "Open WhatsApp Chat (+91 88913 81713)", url: "https://wa.me/918891381713" }
        ],
        chips: [
          { label: "Send Email instead", action: "email" },
          { label: "View Telegram", action: "telegram" },
          { label: "Download Resume", action: "resume" }
        ]
      }
    }

    // 2. Telegram
    if (text.includes("telegram") || text.includes("t.me")) {
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "Aswin is active on Telegram at @Aswin_PT. Feel free to send him a direct message:",
        timestamp: now,
        actions: [
          { label: "Message on Telegram (@Aswin_PT)", url: "https://t.me/Aswin_PT" }
        ],
        chips: [
          { label: "WhatsApp", action: "whatsapp" },
          { label: "LinkedIn", action: "linkedin" }
        ]
      }
    }

    // 3. Instagram
    if (text.includes("instagram") || text.includes("insta") || text.includes("social")) {
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "You can find Aswin on Instagram at @aswin.p.t:",
        timestamp: now,
        actions: [
          { label: "Follow on Instagram (@aswin.p.t)", url: "https://www.instagram.com/aswin.p.t/" }
        ],
        chips: [
          { label: "LinkedIn Profile", action: "linkedin" },
          { label: "GitHub Profile", action: "github" }
        ]
      }
    }

    // 4. Contact / Hire / Phone / Email
    if (
      text.includes("contact") ||
      text.includes("hire") ||
      text.includes("email") ||
      text.includes("phone") ||
      text.includes("call") ||
      text.includes("reach") ||
      text.includes("touch")
    ) {
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "Here are all of Aswin's direct communication channels:\n\n• WhatsApp: +91 88913 81713\n• Email: aswinsureshpt@gmail.com\n• Telegram: @Aswin_PT\n• Instagram: @aswin.p.t\n• Location: Kerala, India (Open to Remote & Global Relocation)",
        timestamp: now,
        actions: [
          { label: "💬 Chat on WhatsApp", url: "https://wa.me/918891381713" },
          { label: "✉️ Send Email", url: "mailto:aswinsureshpt@gmail.com" },
          { label: "✈️ Telegram", url: "https://t.me/Aswin_PT" }
        ],
        chips: [
          { label: "Download Resume", action: "resume" },
          { label: "View Drone Projects", action: "drone" }
        ]
      }
    }

    // 5. Resume / CV
    if (text.includes("resume") || text.includes("cv") || text.includes("curriculum vitae") || text.includes("download")) {
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "You can review and download Aswin's comprehensive engineering & research resume below:",
        timestamp: now,
        actions: [
          { label: "📄 Download Aswin_PT_Resume_.pdf", url: "/Aswin_PT_Resume_.pdf", isDownload: true }
        ],
        chips: [
          { label: "Tell me about his experience", action: "experience" },
          { label: "Contact Aswin", action: "contact" }
        ]
      }
    }

    // 6. Drone Vision / Aerial Surveillance / Jetson / YOLO / CSRNet
    if (
      text.includes("drone") ||
      text.includes("vision") ||
      text.includes("yolo") ||
      text.includes("csrnet") ||
      text.includes("jetson") ||
      text.includes("surveillance") ||
      text.includes("aerial") ||
      text.includes("orin") ||
      text.includes("bytetrack")
    ) {
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "Aswin develops real-time aerial drone computer vision pipelines at Quantumweave Intelligence:\n\n• High-throughput inference: Sustains 42 FPS on NVIDIA Jetson Orin Nano with INT8 TensorRT quantization.\n• Multi-Model Architecture: Combines YOLOv8 for tactical threat detection, CSRNet for dilated convolutional crowd counting, and ByteTrack / OC-SORT for robust aerial tracking.\n• Robustness: Includes real-time alert gating rules to eliminate false triggers from drone jitter and rapid viewpoint changes.",
        timestamp: now,
        actions: [
          { label: "View Drone Project in Portfolio", url: "#projects" }
        ],
        chips: [
          { label: "Tell me about FedGraph-Shield", action: "fedgraph" },
          { label: "What is his tech stack?", action: "stack" },
          { label: "Contact for Drone Roles", action: "contact" }
        ]
      }
    }

    // 7. FedGraph / Federated Learning / Graph Neural Networks / Privacy / Differential Privacy
    if (
      text.includes("fedgraph") ||
      text.includes("federated") ||
      text.includes("fl") ||
      text.includes("gnn") ||
      text.includes("graph") ||
      text.includes("privacy") ||
      text.includes("differential") ||
      text.includes("fraud") ||
      text.includes("flower")
    ) {
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "FedGraph-Shield is Aswin's research on Hierarchical Federated Graph Learning for Banking Fraud Detection:\n\n• Two-Tier Architecture: Coordinates distributed bank clients through regional aggregators using Flower (FL) and PyTorch Geometric.\n• Zero Raw Data Sharing: Heterogeneous transaction graphs are trained locally with Differential Privacy (ε = 0.5).\n• Results: Achieved 94.6% AUC on cross-institution fraud detection benchmarks, isolating circular smurfing rings across institutions.",
        timestamp: now,
        actions: [
          { label: "Inspect FedGraph Architecture Diagram", url: "#projects" }
        ],
        chips: [
          { label: "View Technical Skills", action: "stack" },
          { label: "Download Resume", action: "resume" }
        ]
      }
    }

    // 8. Work Experience & Roles
    if (
      text.includes("experience") ||
      text.includes("work") ||
      text.includes("quantumweave") ||
      text.includes("synbrains") ||
      text.includes("job") ||
      text.includes("intern")
    ) {
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "Aswin's professional track record:\n\n1. Quantumweave Intelligence (Present): Research Assistant – AI & Data Science. Leading aerial drone vision pipelines (CSRNet, YOLOv8, ByteTrack, INT8 TensorRT on Jetson Orin).\n2. Synbrains Solutions Pvt Ltd (Mar 2026 – May 2026): AI/ML Intern. Built PI-RADS prostate reporting engines with 3D sector mapping and automated medical report parsers with Pydantic.\n3. Digital University Kerala (DUK): M.Sc. in Machine Intelligence (2024–2026).",
        timestamp: now,
        actions: [
          { label: "Scroll to Experience Section", url: "#experience" }
        ],
        chips: [
          { label: "Download Full CV", action: "resume" },
          { label: "Contact Aswin", action: "contact" }
        ]
      }
    }

    // 9. Education & Degrees
    if (text.includes("education") || text.includes("degree") || text.includes("university") || text.includes("duk") || text.includes("college") || text.includes("m.sc")) {
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "Aswin is pursuing his Master of Science (M.Sc.) in Machine Intelligence at the Kerala University of Digital Sciences, Innovation and Technology (DUK) (2024 – 2026). His specialization covers Deep Learning, Edge Computer Vision, Graph Neural Networks, and Distributed AI systems.",
        timestamp: now,
        chips: [
          { label: "View Experience", action: "experience" },
          { label: "View Projects", action: "projects" }
        ]
      }
    }

    // 10. Technical Stack / Skills
    if (
      text.includes("skill") ||
      text.includes("stack") ||
      text.includes("tech") ||
      text.includes("languages") ||
      text.includes("pytorch") ||
      text.includes("python") ||
      text.includes("fastapi")
    ) {
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "Aswin's primary engineering toolkit:\n\n• Languages: Python, C++, C, JavaScript, TypeScript, SQL\n• AI/Vision: PyTorch, YOLOv8, CSRNet, ByteTrack, OpenCV, TensorRT, Jetson Orin Nano\n• Graph & FL: PyTorch Geometric (PyG), Flower (FL), Differential Privacy, NetworkX\n• Backend & Cloud: FastAPI, Docker, Django, Flask, Next.js, PostgreSQL, MySQL, GCP",
        timestamp: now,
        actions: [
          { label: "View Interactive Skills Matrix", url: "#skills" }
        ],
        chips: [
          { label: "View Projects", action: "projects" },
          { label: "Contact on WhatsApp", action: "whatsapp" }
        ]
      }
    }

    // 11. Greetings
    if (
      text.startsWith("hi") ||
      text.startsWith("hello") ||
      text.startsWith("hey") ||
      text.includes("good morning") ||
      text.includes("good evening") ||
      text.includes("who are you")
    ) {
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "Hello! Great to meet you. I can assist you with details about Aswin's research in Drone Vision, Federated Graph Learning, or put you in direct touch with him.",
        timestamp: now,
        chips: [
          { label: "Drone Vision Work", action: "drone" },
          { label: "FedGraph-Shield", action: "fedgraph" },
          { label: "WhatsApp & Contact", action: "contact" },
          { label: "Download Resume", action: "resume" }
        ]
      }
    }

    // Default Fallback
    return {
      id: `bot-${Date.now()}`,
      sender: "bot",
      text: "I want to make sure you find what you need! You can ask about his Drone Vision pipelines, FedGraph-Shield research, professional experience, or reach out to him directly.",
      timestamp: now,
      chips: [
        { label: "🛸 Drone Vision Work", action: "drone" },
        { label: "🛡️ FedGraph-Shield", action: "fedgraph" },
        { label: "📱 WhatsApp (+91 88913 81713)", action: "whatsapp" },
        { label: "📄 Download Resume", action: "resume" }
      ]
    }
  }

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage
    if (!text.trim()) return

    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: text,
      timestamp: now
    }

    setMessages((prev) => [...prev, userMsg])
    setInputMessage("")
    setIsTyping(true)

    // Simulate natural typing delay (350ms)
    setTimeout(() => {
      const botResponse = generateBotResponse(text)
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 400)
  }

  const handleChipClick = (action: string) => {
    switch (action) {
      case "drone":
        handleSendMessage("Tell me about your Drone Vision research")
        break
      case "fedgraph":
        handleSendMessage("How does FedGraph-Shield work?")
        break
      case "experience":
        handleSendMessage("What is your work experience?")
        break
      case "contact":
        handleSendMessage("How can I contact Aswin?")
        break
      case "whatsapp":
        handleSendMessage("Give me your WhatsApp link")
        break
      case "telegram":
        handleSendMessage("Give me your Telegram handle")
        break
      case "email":
        handleSendMessage("What is your email address?")
        break
      case "resume":
        handleSendMessage("Where can I download your resume?")
        break
      case "stack":
        handleSendMessage("What is your technical skills stack?")
        break
      case "projects":
        handleSendMessage("Show me your featured projects")
        break
      default:
        handleSendMessage(action)
    }
  }

  const resetChat = () => {
    setMessages(initialMessages)
  }

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-5 right-5 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-xs sm:text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border border-primary-foreground/20"
            aria-label="Open portfolio AI assistant"
          >
            <div className="relative">
              <Bot className="w-5 h-5" />
              {hasUnread && (
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-mono">Ask AI Assistant</span>
          </button>
        )}
      </div>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-5 right-4 sm:right-6 z-50 w-[92vw] sm:w-[380px] md:w-[400px] h-[520px] max-h-[85vh] rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="p-3.5 bg-muted/80 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-foreground">Aswin AI Assistant</span>
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">
                  Interactive & Instant
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={resetChat}
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
                title="Restart conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs font-sans">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-2`}>
                  <div
                    className={`p-3 rounded-2xl whitespace-pre-line leading-relaxed shadow-xs ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-xs font-medium"
                        : "bg-muted text-foreground rounded-tl-xs border border-border"
                    }`}
                  >
                    {msg.text}

                    {/* Action buttons if attached */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="mt-2.5 space-y-1.5 pt-2 border-t border-border/60">
                        {msg.actions.map((act, i) => (
                          <a
                            key={i}
                            href={act.url}
                            target={act.url?.startsWith("#") ? "_self" : "_blank"}
                            rel="noopener noreferrer"
                            download={act.isDownload ? true : undefined}
                            className="block"
                          >
                            <Button
                              size="sm"
                              className="w-full h-8 text-[11px] font-mono font-bold bg-primary text-primary-foreground hover:bg-primary/90 justify-center gap-1.5 shadow-xs"
                            >
                              {act.isDownload ? <Download className="w-3.5 h-3.5" /> : <ExternalLink className="w-3.5 h-3.5" />}
                              {act.label}
                            </Button>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Suggestion Chips */}
                  {msg.chips && msg.chips.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.chips.map((chip, i) => (
                        <button
                          key={i}
                          onClick={() => handleChipClick(chip.action)}
                          className="px-2.5 py-1 rounded-full bg-card border border-border text-foreground hover:border-primary/50 hover:bg-primary/5 text-[10px] font-mono font-medium transition-all shadow-xs"
                        >
                          {chip.label}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className={`text-[9px] font-mono text-muted-foreground px-1 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === "user" && (
                  <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-muted-foreground text-xs font-mono">
                <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="p-2.5 rounded-2xl bg-muted border border-border flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.15s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.3s]"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-muted/50 border-t border-border">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about WhatsApp, Drone Vision, CV..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 text-xs px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputMessage.trim()}
                className="h-8 w-8 bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </Button>
            </form>
          </div>

        </div>
      )}
    </>
  )
}
