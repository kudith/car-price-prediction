"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { usePredictionStore } from "@/stores/prediction-store"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, RefreshCw } from "lucide-react"

export function ApiStatus() {
  const { isHealthy, checkHealth, isLoading } = usePredictionStore()

  React.useEffect(() => {
    checkHealth()
  }, [checkHealth])

  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
        API Status
      </span>
      {isHealthy === null ? (
        <Badge variant="outline" className="gap-1.5 px-2 py-0.5 text-[10px]">
          <RefreshCw className="h-3 w-3 animate-spin" />
          Checking...
        </Badge>
      ) : isHealthy ? (
        <Badge
          variant="outline"
          className="gap-1.5 border-emerald-500/30 bg-emerald-500/5 px-2 py-0.5 text-[10px] text-emerald-500"
        >
          <CheckCircle2 className="h-3 w-3" />
          Operational
        </Badge>
      ) : (
        <Badge
          variant="outline"
          className="gap-1.5 border-destructive/30 bg-destructive/5 px-2 py-0.5 text-[10px] text-destructive"
        >
          <XCircle className="h-3 w-3" />
          Unavailable
        </Badge>
      )}
      <button
        onClick={() => checkHealth()}
        disabled={isLoading}
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        <RefreshCw className="h-3 w-3" />
      </button>
    </div>
  )
}
