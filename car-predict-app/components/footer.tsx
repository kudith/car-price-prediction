"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SITE_CONFIG } from "@/config/site"

// Inline SVG replacement to fix the missing Lucide export error
const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

export function Footer() {
  return (
    <footer
      className="border-t border-border/60 bg-background text-foreground"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 items-start justify-between gap-12 sm:grid-cols-2">
          {/* Column 1: Academic Branding & Description */}
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="font-serif text-base font-normal tracking-wide text-foreground transition-opacity hover:opacity-80"
            >
              {SITE_CONFIG.name}
            </Link>
            <p className="max-w-xs text-xs leading-relaxed font-light text-muted-foreground">
              Developed as a Final Project for the Data Science course,
              utilizing clean market processing models.
            </p>
          </div>

          {/* Column 2: Simplified Resources */}
          <div className="flex flex-col space-y-4 sm:items-end">
            <span className="font-mono text-[11px] font-medium tracking-[0.25em] text-muted-foreground uppercase">
              Resources
            </span>
            <ul
              className="flex flex-col space-y-3 font-sans text-xs sm:items-end"
              role="list"
            >
              <li>
                <a
                  href="https://github.com/kudith/car-price-prediction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 font-light text-muted-foreground transition-colors hover:text-foreground"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  <span>GitHub Repository</span>
                  <ArrowUpRight className="h-3 w-3 text-muted-foreground/60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://colab.research.google.com/drive/1jW3XulM4pnXyzBEbwOdJeKih0gSjROee?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 font-light text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="origin-left scale-90 rounded-md border border-border/40 bg-muted px-1.5 py-0.5 font-mono text-[9px] font-bold">
                    CO
                  </span>
                  <span>Google Colab Notebook</span>
                  <ArrowUpRight className="h-3 w-3 text-muted-foreground/60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Simplified Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 font-mono text-[10px] tracking-wider text-muted-foreground uppercase md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
            reserved.
          </p>
          <p className="flex items-center gap-1.5">
            <span>Created by</span>
            <a
              href="https://github.com/kudith"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-foreground underline-offset-4 transition-all hover:underline"
            >
              Ginanjar Aditiya Prianata
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
