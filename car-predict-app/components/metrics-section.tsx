"use client"

import { DATASET_HIGHLIGHTS } from "@/config/site"
import { Database, Layers, Target, TrendingUp } from "lucide-react"

const ICONS = {
  database: Database,
  layers: Layers,
  target: Target,
  "trending-up": TrendingUp,
} as const

export function MetricsSection() {
  return (
    <section
      id="metrics"
      className="border-b border-border bg-background px-6 py-32 text-foreground md:px-12 lg:px-16"
      aria-label="Model performance specifications"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Tesla-Style Minimalist Section Header */}
        <div className="mb-24 flex flex-col items-start space-y-3 text-left">
          <span className="font-mono text-[11px] font-medium tracking-[0.3em] text-muted-foreground uppercase">
            System Diagnostics
          </span>
          <h2 className="text-3xl font-light tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Performance Specifications
          </h2>
        </div>

        {/* Typographic Specification Grid */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {DATASET_HIGHLIGHTS.map((item, index) => {
            const Icon = ICONS[item.icon as keyof typeof ICONS]
            return (
              <div
                key={index}
                className="group flex flex-col items-start space-y-6 border-l border-border/60 pl-6 transition-colors duration-300 hover:border-foreground"
              >
                {/* Ultra-Clean Icon Accent */}
                <div className="text-muted-foreground/80 transition-colors duration-300 group-hover:text-foreground">
                  <Icon className="h-4 w-4" strokeWidth={1.2} />
                </div>

                {/* Massive Typographic Spec Callout */}
                <div className="space-y-1.5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-light tracking-tighter text-foreground tabular-nums sm:text-6xl">
                      {item.value}
                    </span>
                    {item.unit && (
                      <span className="font-sans text-sm font-light tracking-wide text-muted-foreground lowercase">
                        {item.unit}
                      </span>
                    )}
                  </div>

                  <h3 className="pt-1 font-sans text-[11px] font-medium tracking-[0.25em] text-foreground/90 uppercase">
                    {item.label}
                  </h3>
                </div>

                {/* Grounded Descriptive Block with Medium-Rounded Interactive Elements if expanded */}
                <p className="max-w-xs rounded-md text-xs leading-relaxed font-light text-muted-foreground">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
