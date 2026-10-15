"use client"

import { useState, useEffect } from "react"
import { ViewCounter } from "./view-counter"
import { ThemeToggle } from "./theme-toggle"
import { Sparkles, Menu, X } from "lucide-react"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Arsenal", href: "#skills" },
  { name: "Career", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo with Aurora Mark */}
          <div
            onClick={() => scrollToSection("#home")}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary/10 border border-primary/30 group-hover:bg-primary group-hover:text-white transition-all text-primary shadow-sm">
              <Sparkles className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight font-heading text-foreground group-hover:text-primary transition-colors">
                ASWIN P T
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                AI/ML
              </span>
            </div>
          </div>

          {/* Desktop Navigation Capsule */}
          <div className="hidden md:flex items-center space-x-1 glass-prism px-4 py-1.5 rounded-full border border-border shadow-sm">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="px-3 py-1 text-xs font-mono font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Desktop Utilities */}
          <div className="hidden md:flex items-center space-x-3">
            <ViewCounter variant="navbar" />
            <ThemeToggle />
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl glass-prism border border-border text-foreground hover:text-primary transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass-prism rounded-2xl mt-3 p-5 border border-border animate-in fade-in slide-in-from-top-3 duration-200 space-y-3 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="text-xs font-mono text-muted-foreground">NAVIGATION</span>
              <ViewCounter variant="navbar" />
            </div>
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-3 py-2.5 rounded-xl text-sm font-mono text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
