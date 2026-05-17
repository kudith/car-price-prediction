/**
 * Environment configuration.
 * All environment variables are centralized and validated here.
 */

export const ENV = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000",
  API_KEY: process.env.NEXT_PUBLIC_API_KEY || "your_api_key_here",
} as const
