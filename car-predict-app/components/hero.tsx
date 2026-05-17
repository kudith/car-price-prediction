"use client"

import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SITE_CONFIG } from "@/config/site"

export function HeroSection() {
  const scrollToContent = () => {
    document.getElementById("metrics")?.scrollIntoView({ behavior: "smooth" })
  }

  // Refined transitions for an elegant, steady cinematic feel
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  }

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  }

  return (
    <section
      className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden border-b border-border bg-background px-6 text-foreground"
      aria-label="Hero section"
    >
      {/* Content Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        {/* Architectural Eyebrow Badge with Medium Rounding */}
        <motion.div variants={itemVariants} className="mb-8 inline-block">
          <Badge
            variant="outline"
            className="rounded-md border-border bg-muted/40 px-4 py-1.5 font-mono text-[10px] tracking-widest text-muted-foreground uppercase shadow-none"
          >
            Analysis Platform — Linear Regression
          </Badge>
        </motion.div>

        {/* Premium Typographic Headline using Playfair Display Serif */}
        <motion.h1
          variants={itemVariants}
          className="mb-8 font-serif text-4xl leading-[1.15] font-light tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Evaluate vehicle pricing <br />
          <span className="font-normal text-muted-foreground italic">
            with clear market data.
          </span>
        </motion.h1>

        {/* Natural & Grounded Copywriting */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mb-12 max-w-2xl text-base leading-relaxed font-light text-muted-foreground sm:text-lg md:text-xl"
        >
          {SITE_CONFIG.description ||
            "A straightforward analytical tool designed to estimate current automobile pricing trends. Assess historical sales, manufacturing timelines, and mileage records to generate clean estimations."}
        </motion.p>

        {/* Action Blocks utilizing Medium Rounding and Solid Colors */}
        <motion.div
          variants={itemVariants}
          className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            id="hero-cta-predict"
            className="group h-14 w-full rounded-md bg-foreground px-8 text-xs font-semibold tracking-widest text-background uppercase transition-colors duration-300 hover:bg-foreground/90 sm:w-auto"
          >
            <Link href="/predict">
              Calculate Price
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            id="hero-cta-about"
            className="h-14 w-full rounded-md border-border bg-background px-8 text-xs font-semibold tracking-widest text-foreground uppercase transition-colors duration-300 hover:bg-muted sm:w-auto"
          >
            <Link href="/about">Our Methodology</Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* Minimalist Scroll Cue Button */}
      <motion.button
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        onClick={scrollToContent}
        aria-label="Scroll down to metrics content"
        className="group absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground/60 transition-colors duration-300 hover:text-foreground"
      >
        <span className="font-mono text-[10px] font-semibold tracking-[0.2em] uppercase">
          Scroll to insights
        </span>
        <ChevronDown className="mt-0.5 h-4 w-4 animate-pulse" />
      </motion.button>
    </section>
  )
}
