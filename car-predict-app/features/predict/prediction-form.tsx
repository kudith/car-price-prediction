"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import {
  predictionSchema,
  type PredictionPayload,
} from "@/schemas/prediction-schema"
import { usePredictionStore } from "@/stores/prediction-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, RotateCcw, Calculator } from "lucide-react"

import { SearchableSelect } from "./searchable-select"
import { SmartNumberInput } from "./smart-number-input"
import { Controller } from "react-hook-form"

export function PredictionForm() {
  const { 
    submitPrediction, 
    isLoading, 
    resetForm, 
    manufacturers, 
    vehicleTypes, 
    fetchMetadata 
  } = usePredictionStore()

  React.useEffect(() => {
    fetchMetadata()
  }, [fetchMetadata])

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<PredictionPayload>({
    resolver: zodResolver(predictionSchema),
    defaultValues: {
      Manufacturer: "",
      Vehicle_type: "Passenger",
      Engine_size: 2.5,
      Horsepower: 180,
      Wheelbase: 108,
      Width: 72,
      Length: 185,
      Curb_weight: 3.2,
      Fuel_capacity: 18,
      Fuel_efficiency: 24,
    },
  })

  const onSubmit = async (data: PredictionPayload) => {
    await submitPrediction(data)
  }

  const handleReset = () => {
    reset()
    resetForm()
  }

  const manufacturerValue = watch("Manufacturer")
  const vehicleTypeValue = watch("Vehicle_type")

  return (
    <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Manufacturer - Searchable Experience */}
            <Controller
              control={control}
              name="Manufacturer"
              render={({ field }) => (
                <SearchableSelect
                  options={manufacturers}
                  value={field.value}
                  onChange={field.onChange}
                  label="Manufacturer"
                  placeholder="Select or search brand"
                  error={errors.Manufacturer?.message}
                />
              )}
            />

            {/* Vehicle Type */}
            <div className="space-y-2 rounded-md border border-border/20 bg-background/30 p-4">
              <Label htmlFor="Vehicle_type" className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">
                Vehicle Type
              </Label>
              <Select
                onValueChange={(value) => setValue("Vehicle_type", value)}
                value={vehicleTypeValue}
              >
                <SelectTrigger className="h-10 rounded-md border-border/40 bg-background/50">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {vehicleTypes.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.Vehicle_type && (
                <p className="text-[10px] text-destructive">{errors.Vehicle_type.message}</p>
              )}
            </div>

            {/* Smart Numerical Inputs */}
            <SmartNumberInput
              control={control}
              name="Engine_size"
              label="Engine Size"
              unit="L"
              min={1.0}
              max={8.0}
              step={0.1}
            />
            
            <SmartNumberInput
              control={control}
              name="Horsepower"
              label="Horsepower"
              unit="HP"
              min={50}
              max={600}
              step={1}
            />

            <SmartNumberInput
              control={control}
              name="Wheelbase"
              label="Wheelbase"
              unit="in"
              min={90}
              max={140}
              step={0.1}
            />

            <SmartNumberInput
              control={control}
              name="Width"
              label="Width"
              unit="in"
              min={60}
              max={90}
              step={0.1}
            />

            <SmartNumberInput
              control={control}
              name="Length"
              label="Length"
              unit="in"
              min={140}
              max={240}
              step={0.1}
            />

            <SmartNumberInput
              control={control}
              name="Curb_weight"
              label="Curb Weight"
              unit="lbs x1000"
              min={1.5}
              max={6.0}
              step={0.001}
            />

            <SmartNumberInput
              control={control}
              name="Fuel_capacity"
              label="Fuel Capacity"
              unit="gal"
              min={10}
              max={40}
              step={0.1}
            />

            <SmartNumberInput
              control={control}
              name="Fuel_efficiency"
              label="Fuel Efficiency"
              unit="mpg"
              min={10}
              max={60}
              step={1}
            />
          </div>

          <div className="flex flex-col gap-4 pt-4 md:flex-row">
            <Button
              type="submit"
              disabled={isLoading}
              className="group flex-1 h-12 rounded-md bg-foreground text-xs font-semibold tracking-widest text-background uppercase transition-all duration-300 hover:bg-foreground/90"
            >
              {isLoading ? (
                <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Calculator className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              )}
              {isLoading ? "Analyzing..." : "Calculate Price"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="h-12 rounded-md border-border/40 text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-muted"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset Form
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
