"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeToggle = () => {
    const currentTheme = resolvedTheme || theme
    const newTheme = currentTheme === "light" ? "dark" : "light"
    console.log("[v0] Theme toggle clicked, current:", currentTheme, "switching to:", newTheme)
    setTheme(newTheme)
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="glass">
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  const currentTheme = resolvedTheme || theme

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleThemeToggle}
      className="glass hover:glass-dark transition-all duration-300 text-foreground hover:text-foreground"
      title={`Switch to ${currentTheme === "light" ? "dark" : "light"} mode`}
    >
      {currentTheme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
