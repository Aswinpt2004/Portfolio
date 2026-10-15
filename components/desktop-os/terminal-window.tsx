"use client"

import React, { useState, useRef, useEffect } from "react"
import { Terminal, CornerDownLeft } from "lucide-react"

interface TerminalLine {
  type: "input" | "output" | "error" | "system"
  text: string
}

interface TerminalWindowProps {
  onOpenApp?: (appId: string) => void
}

export function TerminalWindow({ onOpenApp }: TerminalWindowProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "system", text: "AswinOS Kernel v2.6.4-release (x86_64-apple-darwin23)" },
    { type: "system", text: "Type 'help' to see available system commands." },
  ])
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [lines])

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim()
    if (!trimmed) return

    setLines((prev) => [...prev, { type: "input", text: `aswin@neural-os ~ % ${trimmed}` }])
    setHistory((prev) => [...prev, trimmed])
    setHistoryIndex(-1)
    setInput("")

    const args = trimmed.split(" ")
    const main = args[0].toLowerCase()

    switch (main) {
      case "help":
        setLines((prev) => [
          ...prev,
          {
            type: "output",
            text: `Available commands:
  help        - List available commands
  whoami      - Print researcher bio & credentials
  ls          - List files & desktop folders
  cat <file>  - Read content of a file (e.g. cat resume.txt, cat about.txt)
  drone       - Launch Drone Vision YOLO & CSRNet camera app
  fedgraph    - Launch FedGraph-Shield fraud simulator app
  projects    - Open Featured Projects folder
  skills      - Open Technical Arsenal folder
  contact     - Transmit email message
  clear       - Clear the terminal screen`,
          },
        ])
        break

      case "whoami":
        setLines((prev) => [
          ...prev,
          {
            type: "output",
            text: "Aswin P T — Machine Intelligence Graduate Student (DUK) & Research Assistant at Quantumweave Intelligence. Specializing in Computer Vision, Drone Aerial Surveillance, and Federated Graph Neural Networks.",
          },
        ])
        break

      case "ls":
        setLines((prev) => [
          ...prev,
          {
            type: "output",
            text: "📁 About_Aswin/   📁 Projects/   📁 Skills_Arsenal/   📁 Experience/\n🛰️ DroneVision.app  🛡️ FedGraph.app  📄 Resume.pdf  📬 Contact.app",
          },
        ])
        break

      case "cat":
        const file = (args[1] || "").toLowerCase()
        if (file.includes("about") || file.includes("bio")) {
          setLines((prev) => [
            ...prev,
            {
              type: "output",
              text: "M.Sc. in Computer Science (Machine Intelligence) @ Digital University Kerala (2024-2026)\nB.Sc. in Computer Science @ CAS IHRD Kozhikode (2024)\nResearch Assistant @ Quantumweave Intelligence (AI Drone Vision Systems)",
            },
          ])
        } else if (file.includes("resume")) {
          setLines((prev) => [
            ...prev,
            {
              type: "output",
              text: "Opening Resume.pdf viewer window...",
            },
          ])
          onOpenApp?.("resume")
        } else {
          setLines((prev) => [
            ...prev,
            {
              type: "error",
              text: `cat: ${args[1] || "unknown"}: No such file or directory. Try 'cat about.txt' or 'cat resume.txt'`,
            },
          ])
        }
        break

      case "drone":
        setLines((prev) => [
          ...prev,
          { type: "output", text: "Launching DroneVision.app..." },
        ])
        onOpenApp?.("drone")
        break

      case "fedgraph":
        setLines((prev) => [
          ...prev,
          { type: "output", text: "Launching FedGraph.app..." },
        ])
        onOpenApp?.("fedgraph")
        break

      case "projects":
        setLines((prev) => [
          ...prev,
          { type: "output", text: "Opening Projects folder..." },
        ])
        onOpenApp?.("projects")
        break

      case "skills":
        setLines((prev) => [
          ...prev,
          { type: "output", text: "Opening Skills Arsenal folder..." },
        ])
        onOpenApp?.("skills")
        break

      case "contact":
        setLines((prev) => [
          ...prev,
          {
            type: "output",
            text: "Opening Contact Transmission window...",
          },
        ])
        onOpenApp?.("contact")
        break

      case "clear":
        setLines([])
        break

      default:
        setLines((prev) => [
          ...prev,
          {
            type: "error",
            text: `zsh: command not found: ${trimmed}. Type 'help' for valid commands.`,
          },
        ])
        break
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (history.length > 0) {
        const nextIdx = historyIndex + 1 < history.length ? historyIndex + 1 : historyIndex
        setHistoryIndex(nextIdx)
        setInput(history[history.length - 1 - nextIdx] || "")
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1
        setHistoryIndex(nextIdx)
        setInput(history[history.length - 1 - nextIdx] || "")
      } else {
        setHistoryIndex(-1)
        setInput("")
      }
    }
  }

  return (
    <div className="h-full flex flex-col font-mono text-xs text-foreground/90 select-text bg-background/50">
      <div className="flex-1 overflow-y-auto space-y-1.5 p-2">
        {lines.map((line, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap leading-relaxed ${
              line.type === "input"
                ? "text-primary font-semibold"
                : line.type === "error"
                ? "text-rose-500"
                : line.type === "system"
                ? "text-muted-foreground"
                : "text-foreground"
            }`}
          >
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Line */}
      <div className="flex items-center gap-2 pt-2 border-t border-border mt-2 p-2">
        <span className="text-secondary font-bold">aswin@neural-os ~ %</span>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type a command (e.g. 'help', 'ls', 'whoami')..."
          className="flex-1 bg-transparent outline-none text-foreground font-mono placeholder:text-muted-foreground/50"
        />
        <button
          onClick={() => handleCommand(input)}
          className="p-1 rounded hover:bg-muted text-muted-foreground"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
