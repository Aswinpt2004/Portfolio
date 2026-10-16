import { PortfolioView } from "@/components/portfolio/portfolio-view"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <>
      <PortfolioView />
      <Toaster />
    </>
  )
}
