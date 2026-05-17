"use client"

import { INSIGHT_CARDS } from "@/config/site"
import { Trophy, Brain, Workflow } from "lucide-react"

const ICONS = {
  trophy: Trophy,
  brain: Brain,
  workflow: Workflow,
} as const

export function InsightSection() {
  return (
    <section
      id="insight"
      className="border-b border-border bg-background px-6 py-32 text-foreground md:px-12 lg:px-16"
      aria-label="Core analytical discoveries"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Minimalist Section Header */}
        <div className="mb-24 flex max-w-2xl flex-col items-start space-y-3 text-left">
          <span className="font-mono text-[11px] font-medium tracking-[0.3em] text-muted-foreground uppercase">
            Core Findings
          </span>
          <h2 className="text-3xl leading-tight font-light tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Analytical Insights
          </h2>
          <p className="pt-2 text-sm leading-relaxed font-light text-muted-foreground">
            Key structural observations identified during the exploratory data
            analysis and modeling phases of the vehicle marketplace.
          </p>
        </div>

        {/* Architectural Grid Layout — Divided by Minimal Top Rules */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-3">
          {INSIGHT_CARDS.map((card, index) => {
            const Icon = ICONS[card.icon as keyof typeof ICONS]
            return (
              <article
                key={index}
                className="group flex flex-col items-start border-t border-border/60 pt-8 transition-colors duration-300 hover:border-foreground"
              >
                {/* Clean Structural Accent & Metadata */}
                <div className="mb-8 flex w-full items-center justify-between font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                  <div className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5 stroke-[1.2]" />
                    <span>{card.title}</span>
                  </div>
                  <span className="opacity-40">
                    [{String(index + 1).padStart(2, "0")}]
                  </span>
                </div>

                {/* Content Block */}
                <div className="w-full space-y-4">
                  <h3 className="text-2xl leading-none font-light tracking-tight text-foreground sm:text-3xl">
                    {card.value}
                  </h3>

                  {/* Highlight Meta Container with Medium Rounding */}
                  <div className="inline-block rounded-md border border-border/40 bg-muted px-2.5 py-1 font-mono text-[10px] tracking-wider text-foreground/80 uppercase">
                    {card.meta}
                  </div>

                  <p className="max-w-sm pt-2 text-xs leading-relaxed font-light text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
