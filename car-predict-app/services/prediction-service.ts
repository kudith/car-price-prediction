import { ENV } from "@/config/env"
import type { PredictionPayload } from "@/schemas/prediction-schema"

export interface FeatureContribution {
  feature: string
  impact: number
  type: "positive" | "negative"
}

export interface ClosestModel {
  index: number
  Manufacturer: string
  Model: string
  Price_in_thousands: number
  Similarity_Score: number
}

export interface PredictionResponse {
  success: boolean
  message: string
  data: {
    predicted_price: number
    confidence_interval: number
    lower_bound: number
    upper_bound: number
    currency: string
    model_name: string
    explanation: {
      summary: string
      interpretation: string
      feature_contributions: FeatureContribution[]
    }
    closest_models: ClosestModel[]
  }
}

export interface PredictionMetadata {
  manufacturers: string[]
  vehicle_types: string[]
}

export interface ModelInfo {
  success: boolean
  data: {
    name: string
    type: string
    version: string
    library_versions: {
      [key: string]: string
    }
    file_info: {
      size_bytes: number
      last_modified: string
    }
    features: string[]
    feature_importance: {
      [key: string]: number
    }
    parameters: Record<string, unknown>
    pipeline_steps: string[]
    manufacturers: string[]
    vehicle_types: string[]
  }
}

export async function checkApiHealth(): Promise<boolean> {
  try {
    // Adding a cache-busting timestamp to ensure we get a fresh status
    const response = await fetch(`${ENV.API_BASE_URL}/api/v1/health?t=${Date.now()}`, {
      method: "GET",
      headers: {
        "X-API-Key": ENV.API_KEY,
        "Accept": "application/json",
      },
      // Short timeout to prevent hanging UI
      signal: AbortSignal.timeout(5000),
    })
    
    // We strictly check for 200 OK. 
    // If the server returns 404, 500, or others, it's not "Operational".
    return response.status === 200
  } catch (error) {
    // Network errors (refused connection, DNS failure) correctly return false
    return false
  }
}

/**
 * Fetches available manufacturers and vehicle types from the API.
 * Falls back to default lists if the endpoint is not yet available.
 */
export async function getPredictionMetadata(): Promise<PredictionMetadata> {
  try {
    const response = await fetch(`${ENV.API_BASE_URL}/api/v1/metadata`, {
      method: "GET",
      headers: {
        "X-API-Key": ENV.API_KEY,
      },
    })

    if (response.ok) {
      return await response.json()
    }
  } catch (e) {
    // Silently fail and use defaults
  }

  // Default values as fallback
  return {
    manufacturers: [
      "Acura", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", 
      "Dodge", "Ford", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", 
      "Lexus", "Lincoln", "Mazda", "Mercedes-B", "Mercury", "Mitsubishi", 
      "Nissan", "Oldsmobile", "Plymouth", "Pontiac", "Porsche", "Saab", 
      "Saturn", "Subaru", "Toyota", "Volkswagen", "Volvo"
    ].sort(),
    vehicle_types: ["Passenger", "Car"],
  }
}

export async function getModelInfo(): Promise<ModelInfo> {
  const response = await fetch(`${ENV.API_BASE_URL}/api/v1/info`, {
    method: "GET",
    headers: {
      "X-API-Key": ENV.API_KEY,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch model information")
  }

  return response.json()
}

export async function predictCarPrice(
  payload: PredictionPayload
): Promise<PredictionResponse> {
  const response = await fetch(`${ENV.API_BASE_URL}/api/v1/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": ENV.API_KEY,
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Invalid or missing API key.")
    }

    if (response.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.")
    }

    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.detail || "Failed to predict car price.")
  }

  return response.json()
}
