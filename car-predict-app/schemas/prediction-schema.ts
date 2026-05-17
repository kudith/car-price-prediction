import { z } from "zod"

export const predictionSchema = z.object({
  Manufacturer: z.string().min(1, "Manufacturer is required"),
  Vehicle_type: z.string().min(1, "Vehicle type is required"),
  Engine_size: z.coerce
    .number()
    .min(1.0, "Engine_size must be at least 1.0")
    .max(8.0, "Engine_size cannot exceed 8.0"),
  Horsepower: z.coerce
    .number()
    .min(50, "Horsepower must be at least 50")
    .max(600, "Horsepower cannot exceed 600"),
  Wheelbase: z.coerce
    .number()
    .min(90, "Wheelbase must be at least 90")
    .max(140, "Wheelbase cannot exceed 140"),
  Width: z.coerce
    .number()
    .min(60, "Width must be at least 60")
    .max(90, "Width cannot exceed 90"),
  Length: z.coerce
    .number()
    .min(140, "Length must be at least 140")
    .max(240, "Length cannot exceed 240"),
  Curb_weight: z.coerce
    .number()
    .min(1.5, "Curb_weight must be at least 1.5")
    .max(6.0, "Curb_weight cannot exceed 6.0"),
  Fuel_capacity: z.coerce
    .number()
    .min(10, "Fuel_capacity must be at least 10")
    .max(40, "Fuel_capacity cannot exceed 40"),
  Fuel_efficiency: z.coerce
    .number()
    .min(10, "Fuel_efficiency must be at least 10")
    .max(60, "Fuel_efficiency cannot exceed 60"),
})

export type PredictionPayload = z.infer<typeof predictionSchema>
