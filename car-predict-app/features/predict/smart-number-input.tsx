"use client"

import * as React from "react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

interface SmartNumberInputProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  min: number
  max: number
  step?: number
  unit?: string
}

export function SmartNumberInput<T extends FieldValues>({
  control,
  name,
  label,
  min,
  max,
  step = 1,
  unit,
}: SmartNumberInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        // Ensure value is a number for the slider and input
        const numValue = typeof value === "number" ? value : parseFloat(value) || min

        const handleSliderChange = (vals: number[]) => {
          onChange(vals[0])
        }

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const val = parseFloat(e.target.value)
          if (!isNaN(val)) {
            onChange(val)
          } else if (e.target.value === "") {
            onChange("") // Allow clearing
          }
        }

        return (
          <div className="space-y-4 rounded-md border border-border/20 bg-background/30 p-4 transition-colors hover:border-border/60">
            <div className="flex items-center justify-between">
              <Label
                htmlFor={name}
                className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase"
              >
                {label} {unit && <span className="lowercase text-muted-foreground/60">({unit})</span>}
              </Label>
              <div className="relative flex items-center">
                <Input
                  id={name}
                  type="number"
                  step={step}
                  value={value}
                  onChange={handleInputChange}
                  className="h-7 w-20 rounded-sm border-border/40 bg-background/50 px-2 py-0 text-right font-mono text-xs focus-visible:ring-1"
                />
              </div>
            </div>

            <div className="px-1 pt-2">
              <Slider
                value={[numValue]}
                min={min}
                max={max}
                step={step}
                onValueChange={handleSliderChange}
                className="py-2"
              />
              <div className="mt-2 flex justify-between text-[9px] font-medium tracking-tighter text-muted-foreground/40 uppercase">
                <span>{min}</span>
                <span>{max}</span>
              </div>
            </div>

            {error && (
              <p className="mt-1 text-[10px] text-destructive">{error.message}</p>
            )}
          </div>
        )
      }}
    />
  )
}
