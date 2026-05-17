"use client"

import { usePredictionStore } from "@/stores/prediction-store"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Info,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  Car,
  ChevronRight,
  Target,
  ShieldCheck,
} from "lucide-react"

export function PredictionResult() {
  const { result, isLoading, error } = usePredictionStore()

  if (isLoading) {
    return (
      <Card className="overflow-hidden border-border/50 bg-card/30 backdrop-blur-sm">
        <CardContent className="flex flex-col items-center justify-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mb-4 h-12 w-12 rounded-full border-t-2 border-r-2 border-foreground"
          />
          <p className="font-serif text-lg tracking-wide text-muted-foreground">
            Analyzing Vehicle Specifications...
          </p>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-destructive/30 bg-destructive/5 backdrop-blur-sm">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <AlertTriangle className="mb-4 h-10 w-10 text-destructive" />
          <h3 className="mb-2 font-serif text-xl font-medium text-destructive">
            Prediction Error
          </h3>
          <p className="max-w-md text-sm text-destructive/80">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (!result || !result.data) {
    return (
      <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
        <CardContent className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 rounded-full bg-muted/50 p-4">
            <Info className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2 font-serif text-xl font-medium text-foreground">
            Ready for Analysis
          </h3>
          <p className="max-w-xs text-sm text-muted-foreground">
            Complete the vehicle specification form to receive a data-driven
            price valuation.
          </p>
        </CardContent>
      </Card>
    )
  }

  const {
    predicted_price,
    lower_bound,
    upper_bound,
    confidence_interval,
    model_name,
    explanation,
    closest_models,
  } = result.data

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      {/* Primary Valuation Card */}
      <Card className="overflow-hidden border-border/50 bg-card/30 backdrop-blur-sm">
        <CardHeader className="border-b border-border/10 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="font-serif text-2xl font-light tracking-tight">
              Valuation Result
            </CardTitle>
            <Badge
              variant="outline"
              className="font-mono text-[10px] uppercase"
            >
              v1.0.0
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          <div className="mb-10 text-center">
            <p className="mb-2 text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              Estimated Market Value
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="font-serif text-5xl font-light tracking-tighter text-foreground">
                $
                {predicted_price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span className="mb-[-12px] font-serif text-2xl font-light text-muted-foreground">
                k
              </span>
            </div>
            <div className="mt-4 flex flex-col items-center gap-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-3 w-3" />
                <span>Confidence Range: </span>
                <span className="font-medium text-foreground">
                  $
                  {lower_bound.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                  k - $
                  {upper_bound.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                  k
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground/60 italic">
                Interval: ±{confidence_interval.toFixed(2)}%
              </p>
            </div>
          </div>

          <Separator className="mb-8 opacity-50" />

          {/* Explanation Section */}
          <div className="grid gap-6">
            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-md bg-foreground/5 p-2">
                <TrendingUp className="h-4 w-4 text-foreground" />
              </div>
              <div>
                <h4 className="text-sm font-medium">AI Insight</h4>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {explanation.summary}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-md bg-foreground/5 p-2">
                <Target className="h-4 w-4 text-foreground" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Interpretation</h4>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {explanation.interpretation}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Contributions */}
      <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm font-medium tracking-wider uppercase">
              Feature Impact Analysis
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {explanation.feature_contributions.map((feat, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground/80">
                    {feat.feature}
                  </span>
                  <span
                    className={
                      feat.type === "positive"
                        ? "text-emerald-500"
                        : "text-rose-500"
                    }
                  >
                    {feat.type === "positive" ? "+" : ""}
                    {feat.impact.toFixed(2)}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/30">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min(Math.abs(feat.impact) / 20, 100)}%`,
                    }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    className={`h-full ${feat.type === "positive" ? "bg-emerald-500/60" : "bg-rose-500/60"}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Closest Models */}
      <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Car className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm font-medium tracking-wider uppercase">
              Market Benchmarks
            </CardTitle>
          </div>
          <p className="text-[10px] text-muted-foreground">
            Most similar vehicles identified in our historical database
          </p>
        </CardHeader>
        <CardContent className="px-0 pb-2">
          <div className="divide-y divide-border/10">
            {closest_models.map((model, idx) => (
              <div
                key={idx}
                className="group flex items-center justify-between px-6 py-4 transition-colors hover:bg-foreground/5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background/50 text-[10px] font-bold text-muted-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                    {idx + 1}
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold">
                      {model.Manufacturer} {model.Model}
                    </h5>
                    <p className="text-[10px] text-muted-foreground">
                      Match Score: {model.Similarity_Score.toFixed(3)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-mono text-xs font-bold">
                      ${model.Price_in_thousands.toFixed(2)}k
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase">
                      Historical Price
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/30 transition-colors group-hover:text-foreground" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
