import { create } from "zustand"
import type { PredictionPayload } from "@/schemas/prediction-schema"
import {
  predictCarPrice,
  checkApiHealth,
  getPredictionMetadata,
  type PredictionResponse,
} from "@/services/prediction-service"

interface PredictionState {
  form: PredictionPayload | null
  result: PredictionResponse | null
  isLoading: boolean
  isHealthy: boolean | null
  error: string | null
  manufacturers: string[]
  vehicleTypes: string[]
  setForm: (form: PredictionPayload) => void
  resetForm: () => void
  checkHealth: () => Promise<void>
  fetchMetadata: () => Promise<void>
  submitPrediction: (payload: PredictionPayload) => Promise<void>
}

export const usePredictionStore = create<PredictionState>((set, get) => ({
  form: null,
  result: null,
  isLoading: false,
  isHealthy: null,
  error: null,
  manufacturers: [],
  vehicleTypes: [],

  setForm: (form) => set({ form }),

  resetForm: () => set({ form: null, result: null, error: null }),

  checkHealth: async () => {
    // Reset to null briefly to show "Checking..." if user manually refreshes
    set({ isHealthy: null })
    const isHealthy = await checkApiHealth()
    set({ isHealthy })
  },

  fetchMetadata: async () => {
    const { manufacturers, vehicle_types } = await getPredictionMetadata()
    set({ manufacturers, vehicleTypes: vehicle_types })
  },

  submitPrediction: async (payload) => {
    set({ isLoading: true, error: null })
    try {
      const result = await predictCarPrice(payload)
      set({ result, isLoading: false, form: payload })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An unknown error occurred",
        isLoading: false,
      })
    }
  },
}))
