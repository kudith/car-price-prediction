"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PredictionForm } from "@/features/predict/prediction-form"
import { PredictionResult } from "@/features/predict/prediction-result"
import { ApiStatus } from "@/features/predict/api-status"
import { ServiceOffline } from "@/features/predict/service-offline"
import { usePredictionStore } from "@/stores/prediction-store"

export default function PredictPage() {
  const { isHealthy, checkHealth } = usePredictionStore()

  React.useEffect(() => {
    checkHealth()
  }, [checkHealth])

  return (
    <div className="relative min-h-screen pt-32 pb-20">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-foreground/[0.02] blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-foreground/[0.01] blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <AnimatePresence mode="wait">
          {isHealthy === false ? (
            <motion.div
              key="offline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <ServiceOffline />
            </motion.div>
          ) : (
            <motion.div
              key="online"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-16 flex flex-col items-start justify-between gap-8 border-b border-border/10 pb-12 md:flex-row md:items-end">
                <div className="max-w-3xl space-y-6">
                  <div className="flex items-center gap-2">
                    <span className="h-px w-8 bg-foreground/20" />
                    <span className="font-mono text-[10px] font-bold tracking-[0.4em] text-muted-foreground uppercase">
                      Predictive System
                    </span>
                  </div>
                  <h1 className="font-serif text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
                    Market <span className="italic">Valuation</span>
                  </h1>
                  <p className="text-base leading-relaxed font-light text-muted-foreground md:text-lg">
                    Enter precise vehicle specifications to generate an
                    estimated market value based on historical car sales data
                    and predictive analysis.
                  </p>
                </div>
                <div className="flex flex-col items-start gap-4 md:items-end">
                  <ApiStatus />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                {/* Form Section */}
                <div className="lg:col-span-7">
                  <div className="mb-8 flex items-center gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-[11px] font-bold text-background shadow-lg">
                      01
                    </span>
                    <div>
                      <h2 className="text-[10px] font-bold tracking-[0.3em] text-muted-foreground uppercase">
                        Input
                      </h2>
                      <p className="font-serif text-xl font-medium tracking-tight">
                        Vehicle Specifications
                      </p>
                    </div>
                  </div>
                  <PredictionForm />
                </div>

                {/* Result Section */}
                <div className="lg:col-span-5">
                  <div className="mb-8 flex items-center gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border/40 text-[11px] font-bold text-foreground shadow-sm">
                      02
                    </span>
                    <div>
                      <h2 className="text-[10px] font-bold tracking-[0.3em] text-muted-foreground uppercase">
                        Output
                      </h2>
                      <p className="font-serif text-xl font-medium tracking-tight">
                        Valuation Analysis
                      </p>
                    </div>
                  </div>
                  <div className="sticky top-32 space-y-8">
                    <PredictionResult />

                    <div className="rounded-xl border border-border/40 bg-gradient-to-br from-card/40 to-muted/20 p-8 shadow-sm backdrop-blur-md">
                      <div className="mb-4 flex items-center gap-2">
                        <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground/40" />
                        <h4 className="text-[10px] font-bold tracking-widest text-foreground uppercase">
                          Model Methodology
                        </h4>
                      </div>
                      <p className="text-xs leading-relaxed font-light text-muted-foreground italic">
                        &quot;The generated estimation is derived from a Linear
                        Regression model with an R² score of 0.792. While highly
                        accurate for the dataset parameters (N=155), actual
                        market prices may vary based on regional factors,
                        vehicle condition, and economic shifts.&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
