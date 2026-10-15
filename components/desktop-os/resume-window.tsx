"use client"

import React from "react"
import { FileText, Download, Eye, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ResumeWindow() {
  return (
    <div className="space-y-4 select-text text-foreground text-xs sm:text-sm">
      <div className="p-4 rounded-xl border border-border bg-background/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-primary/10 text-primary">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-sm text-foreground">Aswin.p.t_resume.pdf</div>
            <div className="text-[11px] font-mono text-muted-foreground">
              Official Curriculum Vitae • Updated 2026
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" asChild className="text-xs font-mono">
            <a href="/Aswin.p.t_resume.pdf" target="_blank" rel="noopener noreferrer">
              <Eye className="w-3.5 h-3.5 mr-1" />
              View PDF
            </a>
          </Button>

          <Button size="sm" asChild className="bg-primary text-white text-xs font-mono">
            <a href="/Aswin.p.t_resume.pdf" download="Aswin.p.t_resume.pdf">
              <Download className="w-3.5 h-3.5 mr-1" />
              Download
            </a>
          </Button>
        </div>
      </div>

      {/* Embedded Summary Preview */}
      <div className="p-4 rounded-xl border border-border bg-muted/30 font-mono text-xs space-y-3">
        <div className="font-bold text-primary">DOSSIER EXECUTIVE SUMMARY:</div>
        <p className="text-muted-foreground leading-relaxed">
          • <strong>Current:</strong> Research Assistant – AI & Data Science at Quantumweave Intelligence.<br />
          • <strong>Education:</strong> M.Sc. in Machine Intelligence (DUK, 2024–2026); B.Sc. in Computer Science (CAS IHRD, 2024).<br />
          • <strong>Specializations:</strong> Computer Vision (YOLO, CSRNet, 3D SMPL), Federated Learning (Flower, Differential Privacy), Graph Neural Networks (PyG, GATs), High-throughput Backends (FastAPI, Docker, PyTorch).
        </p>
      </div>
    </div>
  )
}
