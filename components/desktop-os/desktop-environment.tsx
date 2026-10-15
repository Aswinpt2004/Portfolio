"use client"

import React, { useState, useEffect } from "react"
import {
  Folder,
  Layers,
  Cpu,
  Briefcase,
  Eye,
  Shield,
  Terminal,
  FileText,
  Mail,
  Sparkles,
} from "lucide-react"
import { OsMenubar } from "./os-menubar"
import { OsDock } from "./os-dock"
import { DesktopIcon } from "./desktop-icon"
import { WindowFrame, WindowState } from "./window-frame"
import { AboutWindow } from "./about-window"
import { ProjectsFolderWindow } from "./projects-folder-window"
import { SkillsWindow } from "./skills-window"
import { ExperienceWindow } from "./experience-window"
import { DroneVisionWindow } from "./drone-vision-window"
import { FedGraphWindow } from "./fedgraph-window"
import { TerminalWindow } from "./terminal-window"
import { ResumeWindow } from "./resume-window"
import { ContactWindow } from "./contact-window"
import { CommandPalette } from "../command-palette"
import { FloatingChatbot } from "../floating-chatbot"

export function DesktopEnvironment() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [topZ, setTopZ] = useState(10)

  // Initial Window States
  const [windows, setWindows] = useState<Record<string, WindowState>>({
    about: {
      id: "about",
      title: "About_Aswin.txt",
      icon: <Folder className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />,
      isOpen: true, // Opened by default to welcome visitors!
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: 70, y: 55 },
      size: { width: 720, height: 520 },
    },
    projects: {
      id: "projects",
      title: "Projects / Research Dossiers",
      icon: <Layers className="w-3.5 h-3.5 text-blue-500" />,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 11,
      position: { x: 120, y: 70 },
      size: { width: 840, height: 560 },
    },
    skills: {
      id: "skills",
      title: "Technical_Arsenal.app",
      icon: <Cpu className="w-3.5 h-3.5 text-emerald-500" />,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 12,
      position: { x: 140, y: 80 },
      size: { width: 780, height: 530 },
    },
    experience: {
      id: "experience",
      title: "Career_Timeline.app",
      icon: <Briefcase className="w-3.5 h-3.5 text-purple-500" />,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 13,
      position: { x: 100, y: 75 },
      size: { width: 720, height: 530 },
    },
    drone: {
      id: "drone",
      title: "DroneVision_Simulator.app",
      icon: <Eye className="w-3.5 h-3.5 text-cyan-500" />,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 14,
      position: { x: 160, y: 65 },
      size: { width: 760, height: 540 },
    },
    fedgraph: {
      id: "fedgraph",
      title: "FedGraph_Shield_Simulator.app",
      icon: <Shield className="w-3.5 h-3.5 text-indigo-500" />,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 15,
      position: { x: 180, y: 85 },
      size: { width: 760, height: 520 },
    },
    terminal: {
      id: "terminal",
      title: "Terminal — aswin@neural-os",
      icon: <Terminal className="w-3.5 h-3.5 text-slate-400" />,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 16,
      position: { x: 200, y: 95 },
      size: { width: 660, height: 440 },
    },
    resume: {
      id: "resume",
      title: "Aswin.p.t_resume.pdf",
      icon: <FileText className="w-3.5 h-3.5 text-rose-500" />,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 17,
      position: { x: 220, y: 90 },
      size: { width: 620, height: 420 },
    },
    contact: {
      id: "contact",
      title: "Message_Transmission.app",
      icon: <Mail className="w-3.5 h-3.5 text-teal-500" />,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 18,
      position: { x: 240, y: 80 },
      size: { width: 640, height: 520 },
    },
  })

  // Open App or bring to front
  const handleOpenApp = (id: string) => {
    const nextZ = topZ + 1
    setTopZ(nextZ)
    setWindows((prev) => {
      const current = prev[id]
      if (!current) return prev
      return {
        ...prev,
        [id]: {
          ...current,
          isOpen: true,
          isMinimized: false,
          zIndex: nextZ,
        },
      }
    })
  }

  const handleClose = (id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false },
    }))
  }

  const handleMinimize = (id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }))
  }

  const handleMaximize = (id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized },
    }))
  }

  const handleFocus = (id: string) => {
    const nextZ = topZ + 1
    setTopZ(nextZ)
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], zIndex: nextZ },
    }))
  }

  const handlePositionChange = (id: string, pos: { x: number; y: number }) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], position: pos },
    }))
  }

  // Find active window for menubar
  const activeWindow = Object.values(windows)
    .filter((w) => w.isOpen && !w.isMinimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0]

  // Dock items
  const dockItems = [
    {
      id: "about",
      label: "About Aswin",
      icon: <Folder className="w-8 h-8 text-amber-500 fill-amber-500/20" />,
      isOpen: windows.about.isOpen && !windows.about.isMinimized,
      onClick: () => handleOpenApp("about"),
    },
    {
      id: "projects",
      label: "Projects",
      icon: (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-xs">
          <Layers className="w-4 h-4" />
        </div>
      ),
      isOpen: windows.projects.isOpen && !windows.projects.isMinimized,
      onClick: () => handleOpenApp("projects"),
    },
    {
      id: "skills",
      label: "Skills Arsenal",
      icon: (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-xs">
          <Cpu className="w-4 h-4" />
        </div>
      ),
      isOpen: windows.skills.isOpen && !windows.skills.isMinimized,
      onClick: () => handleOpenApp("skills"),
    },
    {
      id: "experience",
      label: "Experience",
      icon: (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-xs">
          <Briefcase className="w-4 h-4" />
        </div>
      ),
      isOpen: windows.experience.isOpen && !windows.experience.isMinimized,
      onClick: () => handleOpenApp("experience"),
    },
    {
      id: "drone",
      label: "DroneVision.app",
      icon: (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-xs">
          <Eye className="w-4 h-4" />
        </div>
      ),
      isOpen: windows.drone.isOpen && !windows.drone.isMinimized,
      onClick: () => handleOpenApp("drone"),
    },
    {
      id: "fedgraph",
      label: "FedGraph.app",
      icon: (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-xs">
          <Shield className="w-4 h-4" />
        </div>
      ),
      isOpen: windows.fedgraph.isOpen && !windows.fedgraph.isMinimized,
      onClick: () => handleOpenApp("fedgraph"),
    },
    {
      id: "terminal",
      label: "Terminal",
      icon: (
        <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-emerald-400 font-mono text-xs font-bold shadow-xs">
          &gt;_
        </div>
      ),
      isOpen: windows.terminal.isOpen && !windows.terminal.isMinimized,
      onClick: () => handleOpenApp("terminal"),
    },
    {
      id: "resume",
      label: "Resume (PDF)",
      icon: (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-xs">
          <FileText className="w-4 h-4" />
        </div>
      ),
      isOpen: windows.resume.isOpen && !windows.resume.isMinimized,
      onClick: () => handleOpenApp("resume"),
    },
    {
      id: "contact",
      label: "Contact",
      icon: (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 to-teal-500 flex items-center justify-center text-white shadow-xs">
          <Mail className="w-4 h-4" />
        </div>
      ),
      isOpen: windows.contact.isOpen && !windows.contact.isMinimized,
      onClick: () => handleOpenApp("contact"),
    },
  ]

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col relative os-desktop">
      {/* Top Menu Bar */}
      <OsMenubar
        activeWindowTitle={activeWindow?.title || "Desktop"}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenApp={handleOpenApp}
      />

      {/* Main Desktop Area */}
      <div className="flex-1 relative pt-10 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Desktop Icons Grid (Folders & Apps) */}
        <div className="grid grid-flow-col auto-cols-max grid-rows-6 sm:grid-rows-5 gap-3 sm:gap-4 relative z-10">
          <DesktopIcon
            id="about"
            title="About Me"
            type="folder"
            icon={<Folder className="w-10 h-10 text-amber-500 fill-amber-500/25 drop-shadow-md" />}
            onClick={() => handleOpenApp("about")}
          />

          <DesktopIcon
            id="projects"
            title="Projects"
            type="folder"
            badge="9"
            icon={
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md">
                <Layers className="w-5 h-5" />
              </div>
            }
            onClick={() => handleOpenApp("projects")}
          />

          <DesktopIcon
            id="skills"
            title="Skills Arsenal"
            type="folder"
            badge="14"
            icon={
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md">
                <Cpu className="w-5 h-5" />
              </div>
            }
            onClick={() => handleOpenApp("skills")}
          />

          <DesktopIcon
            id="experience"
            title="Experience"
            type="folder"
            icon={
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-md">
                <Briefcase className="w-5 h-5" />
              </div>
            }
            onClick={() => handleOpenApp("experience")}
          />

          <DesktopIcon
            id="drone"
            title="DroneVision"
            type="app"
            badge="YOLO"
            icon={
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                <Eye className="w-5 h-5" />
              </div>
            }
            onClick={() => handleOpenApp("drone")}
          />

          <DesktopIcon
            id="fedgraph"
            title="FedGraph AI"
            type="app"
            badge="DP-ε"
            icon={
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md">
                <Shield className="w-5 h-5" />
              </div>
            }
            onClick={() => handleOpenApp("fedgraph")}
          />

          <DesktopIcon
            id="terminal"
            title="Terminal"
            type="app"
            icon={
              <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-emerald-400 font-mono text-sm font-bold shadow-md">
                &gt;_
              </div>
            }
            onClick={() => handleOpenApp("terminal")}
          />

          <DesktopIcon
            id="resume"
            title="Resume.pdf"
            type="file"
            icon={
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md">
                <FileText className="w-5 h-5" />
              </div>
            }
            onClick={() => handleOpenApp("resume")}
          />

          <DesktopIcon
            id="contact"
            title="Contact"
            type="app"
            icon={
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 to-teal-500 flex items-center justify-center text-white shadow-md">
                <Mail className="w-5 h-5" />
              </div>
            }
            onClick={() => handleOpenApp("contact")}
          />
        </div>

        {/* Windows Rendering Area */}
        <WindowFrame
          window={windows.about}
          onClose={handleClose}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
          onFocus={handleFocus}
          onPositionChange={handlePositionChange}
        >
          <AboutWindow />
        </WindowFrame>

        <WindowFrame
          window={windows.projects}
          onClose={handleClose}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
          onFocus={handleFocus}
          onPositionChange={handlePositionChange}
        >
          <ProjectsFolderWindow />
        </WindowFrame>

        <WindowFrame
          window={windows.skills}
          onClose={handleClose}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
          onFocus={handleFocus}
          onPositionChange={handlePositionChange}
        >
          <SkillsWindow />
        </WindowFrame>

        <WindowFrame
          window={windows.experience}
          onClose={handleClose}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
          onFocus={handleFocus}
          onPositionChange={handlePositionChange}
        >
          <ExperienceWindow />
        </WindowFrame>

        <WindowFrame
          window={windows.drone}
          onClose={handleClose}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
          onFocus={handleFocus}
          onPositionChange={handlePositionChange}
        >
          <DroneVisionWindow />
        </WindowFrame>

        <WindowFrame
          window={windows.fedgraph}
          onClose={handleClose}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
          onFocus={handleFocus}
          onPositionChange={handlePositionChange}
        >
          <FedGraphWindow />
        </WindowFrame>

        <WindowFrame
          window={windows.terminal}
          onClose={handleClose}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
          onFocus={handleFocus}
          onPositionChange={handlePositionChange}
        >
          <TerminalWindow onOpenApp={handleOpenApp} />
        </WindowFrame>

        <WindowFrame
          window={windows.resume}
          onClose={handleClose}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
          onFocus={handleFocus}
          onPositionChange={handlePositionChange}
        >
          <ResumeWindow />
        </WindowFrame>

        <WindowFrame
          window={windows.contact}
          onClose={handleClose}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
          onFocus={handleFocus}
          onPositionChange={handlePositionChange}
        >
          <ContactWindow />
        </WindowFrame>
      </div>

      {/* macOS Bottom Dock */}
      <OsDock items={dockItems} />

      {/* Spotlight Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectAction={(actionId) => {
          if (actionId === "open-palette") setIsCommandPaletteOpen(true)
          else if (actionId === "switch-tab-drone") handleOpenApp("drone")
          else if (actionId === "switch-tab-fedgraph") handleOpenApp("fedgraph")
          else if (actionId === "switch-tab-terminal") handleOpenApp("terminal")
        }}
      />

      {/* Floating AI Mission Copilot */}
      <FloatingChatbot />
    </div>
  )
}
