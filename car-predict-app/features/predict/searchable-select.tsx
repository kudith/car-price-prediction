"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ChevronDown, Check, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SearchableSelectProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label: string
  error?: string
}

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Search...",
  label,
  error,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const containerRef = React.useRef<HTMLDivElement>(null)

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  )

  const popularBrands = ["Toyota", "Honda", "Ford", "BMW", "Mercedes-B", "Chevrolet"].filter(b => options.includes(b))

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative space-y-2 rounded-md border border-border/20 bg-background/30 p-4 transition-all duration-300 hover:border-border/60" ref={containerRef}>
      <label className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">
        {label}
      </label>
      
      <div 
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-border/40 bg-background/50 px-3 py-2 text-sm cursor-pointer transition-colors hover:bg-background/80",
          isOpen && "border-foreground/40 ring-1 ring-foreground/20"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={cn("truncate", !value && "text-muted-foreground")}>
          {value || placeholder}
        </span>
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform duration-300", isOpen && "rotate-180")} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border/60 bg-card shadow-2xl backdrop-blur-xl"
          >
            <div className="p-3 border-b border-border/20">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  className="h-9 pl-9 bg-muted/20 border-border/20 focus-visible:ring-foreground/20"
                  placeholder="Type to filter..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            <div className="max-h-[300px] overflow-y-auto p-2 custom-scrollbar">
              {!search && popularBrands.length > 0 && (
                <div className="mb-4 px-2 pt-1">
                  <p className="mb-2 text-[9px] font-bold tracking-widest text-muted-foreground uppercase">Popular</p>
                  <div className="flex flex-wrap gap-1.5">
                    {popularBrands.map(brand => (
                      <Badge 
                        key={brand} 
                        variant="secondary" 
                        className="cursor-pointer hover:bg-foreground hover:text-background transition-colors text-[10px] font-medium"
                        onClick={(e) => {
                          e.stopPropagation()
                          onChange(brand)
                          setIsOpen(false)
                        }}
                      >
                        {brand}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <p className="mb-2 px-2 text-[9px] font-bold tracking-widest text-muted-foreground uppercase">
                {search ? `Found ${filteredOptions.length} brands` : "All Brands"}
              </p>
              
              <div className="space-y-1">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((opt) => (
                    <div
                      key={opt}
                      className={cn(
                        "flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors cursor-pointer hover:bg-foreground/5",
                        value === opt && "bg-foreground/5 font-medium"
                      )}
                      onClick={() => {
                        onChange(opt)
                        setIsOpen(false)
                        setSearch("")
                      }}
                    >
                      <span>{opt}</span>
                      {value === opt && <Check className="h-4 w-4 text-foreground" />}
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-xs text-muted-foreground italic">No brands found.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <p className="text-[10px] text-destructive animate-in fade-in slide-in-from-top-1">{error}</p>
      )}
    </div>
  )
}
