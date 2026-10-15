import { Github, Linkedin, Mail, Sparkles } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border bg-background/60 backdrop-blur-md relative overflow-hidden mb-12 sm:mb-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-extrabold font-heading text-foreground tracking-tight">
                ASWIN P T
              </span>
              <span className="text-[10px] font-mono text-primary px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 font-medium">
                NEURAL OS v2.6
              </span>
            </div>
            <p className="text-xs font-mono text-muted-foreground">
              Autonomous Aerial Vision • Federated Graph Learning • Machine Intelligence
            </p>
            <p className="text-[11px] text-muted-foreground pt-1">
              © 2026 Aswin P T. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Aswinpt2004"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl os-window border border-border text-muted-foreground hover:text-primary transition-all shadow-xs"
              aria-label="GitHub Profile"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/aswinpt2004/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl os-window border border-border text-muted-foreground hover:text-[#0077b5] transition-all shadow-xs"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="mailto:aswinsureshpt@gmail.com"
              className="p-2.5 rounded-xl os-window border border-border text-muted-foreground hover:text-secondary transition-all shadow-xs"
              aria-label="Send Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
