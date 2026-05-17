"use client"

import { motion } from "framer-motion"
import { usePredictionStore } from "@/stores/prediction-store"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw, WifiOff } from "lucide-react"

export function ServiceOffline() {
  const { checkHealth, isLoading } = usePredictionStore()

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8 rounded-full bg-destructive/5 p-8"
      >
        <WifiOff className="h-16 w-16 text-destructive" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="mb-4 font-serif text-3xl font-light tracking-tight text-foreground md:text-4xl">
          System <span className="italic">Offline</span>
        </h2>
        <p className="mx-auto mb-10 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
          The prediction engine is currently unreachable. Our market valuation 
          models require an active connection to the core API to ensure 
          data integrity and precision.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            onClick={() => checkHealth()}
            disabled={isLoading}
            size="lg"
            className="h-12 min-w-[200px] rounded-md bg-foreground px-8 text-[11px] font-semibold tracking-widest text-background uppercase transition-all hover:bg-foreground/90"
          >
            {isLoading ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Retry Connection
          </Button>
          
          <div className="flex items-center gap-2 rounded-md border border-border/50 bg-muted/30 px-4 py-3">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
              Check local backend (FastAPI)
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
