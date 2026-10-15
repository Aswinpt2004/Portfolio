import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Aswin P T | AI/ML Engineer & Drone Vision Researcher",
  description:
    "Portfolio of Aswin P T — Machine Intelligence Graduate Student & AI/ML Engineer specializing in Computer Vision, Drone Aerial Surveillance, Federated Graph Learning, and Deep Learning.",
  keywords: [
    "Aswin P T",
    "Computer Vision",
    "Drone Vision",
    "CSRNet",
    "YOLO",
    "Federated Learning",
    "Graph Neural Networks",
    "Machine Intelligence",
    "Quantumweave",
    "PyTorch",
    "FastAPI",
  ],
  authors: [{ name: "Aswin P T" }],
  openGraph: {
    title: "Aswin P T | AI/ML Engineer & Drone Vision Researcher",
    description:
      "Research Assistant at Quantumweave Intelligence. Building intelligent drone vision systems and privacy-preserving federated graph networks.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground selection:bg-primary/20 selection:text-primary`}
      >
        {/* Aurora Prism Dual Ambient Backdrop (Light & Dark Responsive) */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* Subtle Ambient Mesh & Dot Matrix */}
          <div className="absolute inset-0 aurora-mesh" />
          <div className="absolute inset-0 dot-matrix opacity-40 dark:opacity-30" />

          {/* Glowing Spectrum Orbs */}
          <div className="absolute top-[-10%] left-[20%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] bg-primary/15 dark:bg-primary/20 rounded-full blur-[140px] pointer-events-none animate-pulse" />
          <div className="absolute top-[40%] right-[-10%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] bg-secondary/15 dark:bg-secondary/20 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[10%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] bg-accent/10 dark:bg-accent/15 rounded-full blur-[150px] pointer-events-none" />
        </div>

        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
            {children}
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}

