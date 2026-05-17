"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NAV_LINKS, SITE_CONFIG } from "@/config/site"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
      className={cn(
        "fixed right-0 left-0 z-50 mx-auto w-full px-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:px-8",
        isScrolled ? "top-4 max-w-7xl" : "top-0 max-w-full"
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-16 items-center justify-between border px-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isScrolled
            ? "rounded-md border-border/80 bg-background/60 shadow-xl shadow-foreground/[0.02] backdrop-blur-xl"
            : "rounded-none border-transparent bg-transparent backdrop-blur-none"
        )}
      >
        {/* Brand Emblem — Premium Serif Presentation */}
        <Link
          href="/"
          className="rounded-md font-serif text-base font-normal tracking-wide text-foreground normal-case transition-opacity hover:opacity-80"
        >
          {SITE_CONFIG.name}
        </Link>

        {/* Desktop Navigation Menu */}
        <nav className="hidden items-center gap-1 rounded-md md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-md px-4 py-1.5 text-xs font-medium tracking-wider uppercase transition-colors duration-300",
                  isActive
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavBackground"
                    className="absolute inset-0 -z-10 rounded-md bg-muted"
                    transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  />
                )}
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop Interface Utilities */}
        <div className="hidden items-center gap-4 rounded-md md:flex">
          {/* Strict Monochromatic Theme Selector */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-md text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Change dashboard theme color structure"
          >
            <Sun className="h-[1.1rem] w-[1.1rem] scale-100 rotate-0 transition-transform duration-500 dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.1rem] w-[1.1rem] scale-0 rotate-90 transition-transform duration-500 dark:scale-100 dark:rotate-0" />
          </Button>

          <Button
            asChild
            size="sm"
            className="group h-9 rounded-md bg-foreground px-5 text-[11px] font-semibold tracking-wider text-background uppercase transition-colors duration-300 hover:bg-foreground/90"
          >
            <Link href="/predict">
              Predict now
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>

        {/* Mobile Layout Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-md text-muted-foreground"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle structural theme template"
          >
            <Sun className="h-[1.1rem] w-[1.1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.1rem] w-[1.1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          </Button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle structural menu layout overlay"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border/40 bg-background/30 text-foreground transition-colors hover:bg-muted"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Deep Frosted Glass Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
            className="absolute top-20 right-4 left-4 z-40 overflow-hidden rounded-md border border-border/80 bg-background/70 p-6 shadow-xl backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col space-y-4 rounded-md">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "rounded-md px-4 py-3 text-sm font-medium tracking-widest uppercase transition-colors duration-200",
                      isActive
                        ? "bg-muted font-semibold text-foreground"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <div className="rounded-md pt-2">
                <Button
                  asChild
                  className="h-12 w-full rounded-md bg-foreground text-xs font-semibold tracking-widest text-background uppercase transition-colors duration-300 hover:bg-foreground/90"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/predict">Launch Predictor</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
