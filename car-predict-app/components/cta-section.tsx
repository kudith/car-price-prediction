"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const EVALUATION_FEATURES = [
  "10 unique parameters",
  "Automated verification",
  "Instant matrix evaluation",
] as const

export function CtaSection() {
  // Balanced spring transition for smooth visual loading
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section
      id="cta"
      className="bg-background px-6 py-32 text-foreground"
      aria-label="Valuation call to action engine"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="relative overflow-hidden rounded-md border border-border/80 bg-card/40 px-8 py-20 text-center shadow-sm backdrop-blur-md sm:px-16"
        >
          {/* Architectural Top Meta Placement */}
          <motion.span
            variants={itemVariants}
            className="mb-6 block font-mono text-[11px] font-medium tracking-[0.3em] text-muted-foreground uppercase"
          >
            Instant Processing
          </motion.span>

          {/* Premium Typographic Headline using Playfair Display */}
          <motion.h2
            variants={itemVariants}
            className="mx-auto mb-6 max-w-3xl font-serif text-3xl leading-[1.15] font-light tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            Calculate the current market value <br />
            <span className="font-normal text-muted-foreground italic">
              of your vehicle asset.
            </span>
          </motion.h2>

          {/* Grounded & Natural Descriptive Block */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-12 max-w-xl text-sm leading-relaxed font-light text-muted-foreground"
          >
            Provide your vehicle specification array below to generate an
            estimated price distribution computed directly from historical
            market trends.
          </motion.p>

          {/* Clean Functional Specification Badges */}
          <motion.div
            variants={itemVariants}
            className="mb-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
          >
            {EVALUATION_FEATURES.map((feat, i) => (
              <span
                key={i}
                className="flex items-center gap-2.5 font-mono text-xs tracking-wider text-muted-foreground uppercase"
              >
                <span
                  className="h-1.5 w-1.5 rounded-md bg-foreground/30"
                  aria-hidden="true"
                />
                {feat}
              </span>
            ))}
          </motion.div>

          {/* High-Contrast Interactive CTA Trigger */}
          <motion.div
            variants={itemVariants}
            className="inline-block w-full sm:w-auto"
          >
            <Button
              asChild
              size="lg"
              id="cta-predict-button"
              className="group h-14 w-full rounded-md bg-foreground text-xs font-semibold tracking-widest text-background uppercase transition-colors duration-300 hover:bg-foreground/90 sm:w-64"
            >
              <Link href="/predict">
                Begin Valuation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
