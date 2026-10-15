"use client"

import { DesktopEnvironment } from "@/components/desktop-os/desktop-environment"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden">
      <DesktopEnvironment />
      <Toaster />
    </main>
  )
}
