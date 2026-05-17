"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BarChart3, ArrowUpRight } from "lucide-react"
import { MODEL_METRICS } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const PROJECT_STEPS = [
  {
    phase: "01",
    title: "Business Understanding",
    desc: "Defining core vehicle pricing optimization objectives.",
  },
  {
    phase: "02",
    title: "Data Understanding",
    desc: "Exploratory analysis and data profiling of the marketplace.",
  },
  {
    phase: "03",
    title: "Data Preparation",
    desc: "Handling outliers, missing values, and feature scaling pipelines.",
  },
  {
    phase: "04",
    title: "Modeling",
    desc: "Training multivariate Linear Regression architectures.",
  },
  {
    phase: "05",
    title: "Evaluation",
    desc: "Validating price variance against unseen test splits.",
  },
  {
    phase: "06",
    title: "Deployment",
    desc: "Production API hosting to deliver real-time evaluations.",
  },
] as const

export function ProjectSummarySection() {
  return (
    <section
      id="project-summary"
      className="border-b border-border bg-background px-6 py-32 text-foreground md:px-12 lg:px-16"
      aria-label="Project methodology and framework specifications"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Left Column: Premium Typographic Framework Flow */}
          <div className="flex flex-col items-start space-y-8 lg:col-span-7">
            <div className="space-y-3">
              <span className="block font-mono text-[11px] font-medium tracking-[0.3em] text-muted-foreground uppercase">
                Lifecycle Architecture
              </span>
              <h2 className="font-serif text-3xl leading-tight font-light tracking-tight text-foreground sm:text-4xl md:text-5xl">
                The CRISP-DM <br />
                <span className="font-normal text-muted-foreground italic">
                  Methodology
                </span>
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-relaxed font-light text-muted-foreground">
              This system is engineered following the Cross-Industry Standard
              Process for Data Mining (CRISP-DM). This structured approach
              translates complex statistical metrics into reproducible,
              high-performance vehicle evaluations.
            </p>

            {/* Architectural Timeline Sequence */}
            <div className="w-full space-y-4 pt-4" role="list">
              {PROJECT_STEPS.map((step, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between border-b border-border/40 py-3 transition-colors duration-300 hover:border-foreground"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs tracking-wider text-muted-foreground opacity-60">
                      {step.phase}
                    </span>
                    <span className="text-sm font-medium tracking-wide text-foreground">
                      {step.title}
                    </span>
                  </div>
                  <span className="hidden text-right text-xs font-light tracking-wide text-muted-foreground opacity-80 sm:inline">
                    {step.desc}
                  </span>
                </div>
              ))}
            </div>

            <Button
              asChild
              variant="link"
              className="group px-0 pt-4 text-xs font-semibold tracking-widest text-foreground uppercase transition-colors hover:text-muted-foreground"
            >
              <Link href="/about" id="summary-cta-about">
                Explore More
                <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>

          {/* Right Column: Minimalist Performance Diagnostics Summary Panel */}
          <div className="w-full lg:col-span-5">
            <div className="space-y-6 rounded-md border border-border bg-card/40 p-6 backdrop-blur-sm">
              {/* Diagnostics Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BarChart3 className="h-4 w-4 stroke-[1.2]" />
                  <span className="font-mono text-[11px] font-medium tracking-widest uppercase">
                    Model Verification
                  </span>
                </div>
                <span className="rounded-md border border-border/60 bg-muted px-2 py-0.5 font-mono text-[9px] text-muted-foreground uppercase">
                  Validated
                </span>
              </div>

              <Separator className="bg-border/60" />

              {/* Data Specifications Display Block */}
              <div className="space-y-4 font-sans text-xs">
                {[
                  {
                    label: "Predictive Architecture",
                    value: MODEL_METRICS.model,
                  },
                  {
                    label: "Training Split Data",
                    value: `${Math.round(MODEL_METRICS.modelingData * 0.8)} rows`,
                  },
                  {
                    label: "Validation Split Data",
                    value: `${Math.round(MODEL_METRICS.modelingData * 0.2)} rows`,
                  },
                  {
                    label: "Root Mean Square Error",
                    value: MODEL_METRICS.rmse.toFixed(3),
                    unit: "k USD",
                  },
                  {
                    label: "Variance Coefficient (R²)",
                    value: MODEL_METRICS.r2Score.toFixed(3),
                    highlight: true,
                  },
                ].map((row, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center justify-between rounded-md px-3 py-2 transition-colors",
                      row.highlight
                        ? "bg-muted font-medium text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    <span className="font-light tracking-wide">
                      {row.label}
                    </span>
                    <div className="flex items-baseline gap-1 font-mono text-foreground">
                      <span
                        className={cn(
                          row.highlight
                            ? "text-sm font-semibold"
                            : "text-xs font-medium"
                        )}
                      >
                        {row.value}
                      </span>
                      {"unit" in row && row.unit && (
                        <span className="text-[10px] text-muted-foreground lowercase">
                          {row.unit}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="bg-border/60" />

              {/* Functional Summary Summary Footer */}
              <div className="rounded-md border border-border/40 bg-muted/40 p-3">
                <p className="text-[11px] leading-relaxed font-light text-muted-foreground">
                  Statistical regression analysis indicates that the model
                  accounts for{" "}
                  <span className="font-mono font-medium text-foreground">
                    {(MODEL_METRICS.r2Score * 100).toFixed(1)}%
                  </span>{" "}
                  of the target vehicle pricing variance observed within
                  validation records.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
