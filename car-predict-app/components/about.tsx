"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { getModelInfo, type ModelInfo } from "@/services/prediction-service"
import { MODEL_METRICS } from "@/config/site"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Terminal, 
  Cpu, 
  FileCode, 
  Calendar, 
  Database, 
  BarChart4,
  Layers
} from "lucide-react"

const CRISP_DM_STEPS = [
  {
    phase: "01",
    title: "Business Understanding",
    desc: "Aligning data structures with industrial automotive valuation goals.",
  },
  {
    phase: "02",
    title: "Data Understanding",
    desc: "Profiling car sales records, identifying feature types, and analyzing integrity.",
  },
  {
    phase: "03",
    title: "Data Preparation",
    desc: "Executing feature selection, dropping missing entries, and partitioning records.",
  },
  {
    phase: "04",
    title: "Modeling",
    desc: "Fitting a multivariate Linear Regression model using classical optimization.",
  },
  {
    phase: "05",
    title: "Evaluation",
    desc: "Measuring baseline errors against unseen test parameters using RMSE and R².",
  },
  {
    phase: "06",
    title: "Deployment",
    desc: "Integrating the saved model weights into an accessible interactive web interface.",
  },
] as const

export function AboutContent() {
  const [modelInfo, setModelInfo] = React.useState<ModelInfo | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchInfo = async () => {
      try {
        const info = await getModelInfo()
        setModelInfo(info)
      } catch (error) {
        console.error("Failed to fetch model info:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchInfo()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const },
    },
  }

  // Ticker animation variants
  const tickerLeft = {
    animate: {
      x: [0, -1500],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop" as const,
          duration: 45,
          ease: "linear" as const,
        },
      },
    },
  }

  const tickerRight = {
    animate: {
      x: [-1500, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop" as const,
          duration: 45,
          ease: "linear" as const,
        },
      },
    },
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="h-10 w-10 rounded-full border-t-2 border-foreground"
        />
      </div>
    )
  }

  const info = modelInfo?.data

  return (
    <main className="min-h-screen bg-background px-6 pt-32 pb-24 text-foreground md:px-12 lg:px-16">
      <motion.div
        className="mx-auto w-full max-w-6xl space-y-24"
      >
        {/* Section 1: Project Background */}
        <motion.section
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-6"
          aria-labelledby="heading-background"
        >
          <div className="flex items-center gap-3">
             <span className="block font-mono text-[11px] font-medium tracking-[0.3em] text-muted-foreground uppercase">
              Data Science • Final Project
            </span>
            {info && (
              <Badge variant="outline" className="font-mono text-[9px] uppercase tracking-tighter">
                v{info.version}
              </Badge>
            )}
          </div>
          <h1
            id="heading-background"
            className="font-serif text-4xl leading-tight font-light tracking-tight text-foreground sm:text-5xl"
          >
            Project Background
          </h1>
          <p className="text-base leading-relaxed font-light text-muted-foreground">
            This vehicle price prediction system was developed as a Final Project for the Data Science course. The project aims to analyze multiple conflicting automotive parameters simultaneously to estimate market rates accurately. By leveraging historical market indicators, the system isolates statistical patterns within vehicle configurations to establish stable, data-driven, and standardized evaluations.
          </p>
        </motion.section>

        <Separator className="bg-border/60" />

        {/* Section 2: CRISP-DM Framework */}
        <motion.section
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-10"
          aria-labelledby="heading-methodology"
        >
          <div className="space-y-3">
            <span className="block font-mono text-[11px] font-medium tracking-[0.3em] text-muted-foreground uppercase">
              Execution Paradigm
            </span>
            <h2
              id="heading-methodology"
              className="font-serif text-3xl font-light tracking-tight text-foreground sm:text-4xl"
            >
              The CRISP-DM Framework
            </h2>
          </div>

          <div
            className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2"
            role="list"
          >
            {CRISP_DM_STEPS.map((step) => (
              <div
                key={step.phase}
                className="space-y-2 border-l border-border/80 pl-4 transition-colors duration-200 hover:border-foreground"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs tracking-wider text-muted-foreground/60">
                    {step.phase}
                  </span>
                  <h3 className="text-sm font-medium tracking-wide text-foreground">
                    {step.title}
                  </h3>
                </div>
                <p className="text-xs leading-relaxed font-light text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        <Separator className="bg-border/60" />

        {/* Section 4: Feature Importance Analysis (NEW) */}
        <motion.section
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
          aria-labelledby="heading-importance"
        >
          <div className="space-y-3">
            <span className="block font-mono text-[11px] font-medium tracking-[0.3em] text-muted-foreground uppercase">
              Model Logic
            </span>
            <h2
              id="heading-importance"
              className="font-serif text-3xl font-light tracking-tight text-foreground sm:text-4xl"
            >
              Global Feature Importance
            </h2>
          </div>

          <p className="text-sm leading-relaxed font-light text-muted-foreground">
            The chart below illustrates the relative weight each parameter holds within the regression algorithm.
            A higher magnitude indicates a stronger influence on the final price valuation.
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 pt-4">
            {info && Object.entries(info.feature_importance)
              .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
              .map(([feature, importance], idx) => (
              <div key={feature} className="space-y-2 p-4 rounded-md border border-border/20 bg-card/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-foreground/80">{feature}</span>
                  <span className={`text-[10px] font-mono ${importance >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {importance.toFixed(3)}
                  </span>
                </div>
                <div className="h-1 w-full bg-muted/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.min(Math.abs(importance) * 10, 100)}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: idx * 0.05 }}
                    className={`h-full ${importance >= 0 ? 'bg-emerald-500/50' : 'bg-rose-500/50'}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <Separator className="bg-border/60" />

        {/* Section 5: Model Evaluation Matrix (RE-ADDED) */}
        <motion.section
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
          aria-labelledby="heading-evaluation"
        >
          <div className="space-y-3">
            <span className="block font-mono text-[11px] font-medium tracking-[0.3em] text-muted-foreground uppercase">
              Verification Outcomes
            </span>
            <h2
              id="heading-evaluation"
              className="font-serif text-3xl font-light tracking-tight text-foreground sm:text-4xl"
            >
              Evaluation Summary
            </h2>
          </div>

          <p className="text-sm leading-relaxed font-light text-muted-foreground">
            The multivariate {MODEL_METRICS.model} model was validated using a 20% hold-out test set to ensure performance consistency.
          </p>

          <div className="grid w-full grid-cols-1 gap-6 pt-2 sm:grid-cols-2">
            {/* RMSE Output Block */}
            <div className="flex flex-col justify-between space-y-4 rounded-md border border-border/80 bg-card/40 p-6">
              <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                Root Mean Square Error (RMSE)
              </span>
              <div className="flex items-baseline gap-1.5 font-mono">
                <span className="text-4xl font-light text-foreground">
                  {MODEL_METRICS.rmse.toFixed(3)}
                </span>
                <span className="text-xs text-muted-foreground lowercase">
                  k USD
                </span>
              </div>
              <p className="text-xs leading-relaxed font-light text-muted-foreground">
                Represents the standard deviation of residual pricing variances
                produced by the regression pipeline during blind test
                validations.
              </p>
            </div>

            {/* R2 Output Block */}
            <div className="flex flex-col justify-between space-y-4 rounded-md border border-border/80 bg-card/40 p-6">
              <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                Coefficient of Determination (R²)
              </span>
              <div className="flex items-baseline gap-1.5 font-mono">
                <span className="text-4xl font-light text-foreground">
                  {MODEL_METRICS.r2Score.toFixed(3)}
                </span>
              </div>
              <p className="text-xs leading-relaxed font-light text-muted-foreground">
                Indicates that the model systematically accounts for exactly{" "}
                {(MODEL_METRICS.r2Score * 100).toFixed(1)}% of observed vehicle
                pricing deviations.
              </p>
            </div>
          </div>
        </motion.section>

        <Separator className="bg-border/60" />

        {/* Section 6: Model Coverage with Infinite Ticker */}
        <motion.section
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12 overflow-hidden pb-12"
          aria-labelledby="heading-manufacturers"
        >
           <div className="space-y-3">
            <span className="block font-mono text-[11px] font-medium tracking-[0.3em] text-muted-foreground uppercase">
              Supported Scope
            </span>
            <h2
              id="heading-manufacturers"
              className="font-serif text-3xl font-light tracking-tight text-foreground sm:text-4xl"
            >
              Model Coverage
            </h2>
          </div>

          <div className="space-y-8">
            {/* Infinite Scrolling Ticker - ROW 1 (Left) */}
            <div className="relative space-y-4">
              <h3 className="font-mono text-xs font-semibold tracking-widest text-foreground uppercase flex items-center gap-2 px-1">
                <BarChart4 className="h-3 w-3" />
                Training Brands ({info?.manufacturers.length})
              </h3>
              
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
              
              <div className="flex overflow-hidden py-4">
                <motion.div 
                  className="flex gap-8 whitespace-nowrap"
                  variants={tickerLeft}
                  animate="animate"
                >
                  {[...(info?.manufacturers || []), ...(info?.manufacturers || []), ...(info?.manufacturers || []), ...(info?.manufacturers || [])].map((m, i) => (
                    <Badge 
                      key={`left-${m}-${i}`} 
                      variant="outline" 
                      className="text-[16px] font-medium py-3 px-8 border-border/40 bg-card/10 backdrop-blur-md hover:border-foreground hover:bg-foreground/5 transition-all duration-500 cursor-default rounded-full shadow-md"
                    >
                      {m}
                    </Badge>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Infinite Scrolling Ticker - ROW 2 (Right) */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
              
              <div className="flex overflow-hidden py-4">
                <motion.div 
                  className="flex gap-8 whitespace-nowrap"
                  variants={tickerRight}
                  animate="animate"
                >
                  {[...(info?.manufacturers || []).reverse(), ...(info?.manufacturers || []).reverse(), ...(info?.manufacturers || []).reverse(), ...(info?.manufacturers || []).reverse()].map((m, i) => (
                    <Badge 
                      key={`right-${m}-${i}`} 
                      variant="outline" 
                      className="text-[16px] font-medium py-3 px-8 border-border/40 bg-card/10 backdrop-blur-md hover:border-foreground hover:bg-foreground/5 transition-all duration-500 cursor-default rounded-full shadow-md"
                    >
                      {m}
                    </Badge>
                  ))}
                </motion.div>
              </div>
            </div>
            
            <div className="space-y-6 pt-4">
               <h3 className="font-mono text-xs font-semibold tracking-widest text-foreground uppercase flex items-center gap-2 px-1">
                <Cpu className="h-3 w-3" />
                Vehicle Categories
              </h3>
              <div className="flex flex-wrap gap-6">
                 {info?.vehicle_types.map((t, idx) => (
                  <motion.div
                    key={t}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                  >
                    <Badge className="text-[16px] uppercase font-bold tracking-[0.15em] py-3 px-10 shadow-2xl bg-foreground text-background hover:scale-110 hover:-rotate-1 transition-all duration-500">
                      {t}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </main>
  )
}

