"use client"

import React, { useState } from "react"
import { Cpu, ShieldAlert, CheckCircle2, Activity, Network } from "lucide-react"

export function FedGraphWindow() {
  const [isAttackRunning, setIsAttackRunning] = useState(false)
  const [attackStatus, setAttackStatus] = useState<"idle" | "attacking" | "defended">("idle")
  const [aggregationRound, setAggregationRound] = useState(42)

  const handleTriggerAttack = () => {
    if (isAttackRunning) return
    setIsAttackRunning(true)
    setAttackStatus("attacking")

    setTimeout(() => {
      setAttackStatus("defended")
      setIsAttackRunning(false)
      setAggregationRound((prev) => prev + 1)
    }, 2000)
  }

  return (
    <div className="h-full flex flex-col space-y-4 font-mono select-none">
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-muted/40 border border-border">
        <div>
          <h4 className="text-sm font-bold font-heading text-foreground">
            FedGraph-Shield // Differential Privacy Graph Learning
          </h4>
          <p className="text-xs text-muted-foreground font-mono">
            Cross-institutional collaborative fraud detection without raw data sharing.
          </p>
        </div>

        <button
          onClick={handleTriggerAttack}
          disabled={isAttackRunning}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-md flex items-center gap-2 ${
            isAttackRunning
              ? "bg-amber-500 text-white animate-pulse"
              : attackStatus === "defended"
              ? "bg-emerald-600 text-white"
              : "bg-primary text-white hover:bg-primary/90"
          }`}
        >
          {isAttackRunning ? (
            <>
              <Activity className="w-4 h-4 animate-spin" />
              <span>SIMULATING ATTACK...</span>
            </>
          ) : attackStatus === "defended" ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>FRAUD RING BLOCKED! (RETRY)</span>
            </>
          ) : (
            <>
              <ShieldAlert className="w-4 h-4" />
              <span>TRIGGER SIMULATED FRAUD ATTACK</span>
            </>
          )}
        </button>
      </div>

      {/* Network Visualization Viewport */}
      <div className="relative flex-1 min-h-[300px] w-full rounded-2xl overflow-hidden border border-border bg-slate-950 flex items-center justify-center p-4">
        {/* Central Aggregator Server */}
        <div className="relative z-10 w-24 h-24 rounded-2xl bg-indigo-900/60 border-2 border-indigo-400 flex flex-col items-center justify-center text-white shadow-xl">
          <Cpu className="w-6 h-6 text-indigo-300" />
          <span className="text-[10px] font-mono font-bold mt-1">FL-SERVER</span>
          <span className="text-[9px] font-mono text-indigo-300">Round #{aggregationRound}</span>
        </div>

        {/* Orbiting Satellite Bank Nodes */}
        <div
          className={`absolute top-6 left-12 p-3 rounded-xl border font-mono text-xs transition-all ${
            attackStatus === "attacking"
              ? "bg-rose-950 border-rose-500 text-rose-300 animate-bounce"
              : "bg-slate-900 border-slate-700 text-slate-300"
          }`}
        >
          <div>BANK ALPHA</div>
          <div className="text-[10px] text-muted-foreground">DP Noise: ε=0.5</div>
        </div>

        <div
          className={`absolute top-6 right-12 p-3 rounded-xl border font-mono text-xs transition-all ${
            attackStatus === "attacking"
              ? "bg-rose-950 border-rose-500 text-rose-300 animate-bounce"
              : "bg-slate-900 border-slate-700 text-slate-300"
          }`}
        >
          <div>BANK BETA</div>
          <div className="text-[10px] text-muted-foreground">Local Graph GNN</div>
        </div>

        <div
          className={`absolute bottom-6 left-12 p-3 rounded-xl border font-mono text-xs transition-all ${
            attackStatus === "defended"
              ? "bg-emerald-950 border-emerald-500 text-emerald-300"
              : "bg-slate-900 border-slate-700 text-slate-300"
          }`}
        >
          <div>BANK GAMMA</div>
          <div className="text-[10px] text-muted-foreground">Weights Encrypted</div>
        </div>

        <div
          className={`absolute bottom-6 right-12 p-3 rounded-xl border font-mono text-xs transition-all ${
            attackStatus === "defended"
              ? "bg-emerald-950 border-emerald-500 text-emerald-300"
              : "bg-slate-900 border-slate-700 text-slate-300"
          }`}
        >
          <div>BANK DELTA</div>
          <div className="text-[10px] text-muted-foreground">Fraud Ring Neutralized</div>
        </div>
      </div>
    </div>
  )
}
