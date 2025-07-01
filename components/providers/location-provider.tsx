"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface LocationContextType {
  country: string
  isLoading: boolean
  error: string | null
}

const LocationContext = createContext<LocationContextType>({
  country: "LEB",
  isLoading: true,
  error: null,
})

export const useLocation = () => useContext(LocationContext)

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [country, setCountry] = useState("LEB")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const detectLocation = async () => {
      try {
        // Try to get location from IP
        const response = await fetch("https://ipapi.co/json/")
        const data = await response.json()

        if (data.country_code) {
          const countryCode = data.country_code.toUpperCase()
          if (countryCode === "AE") {
            setCountry("UAE")
          } else if (countryCode === "SA") {
            setCountry("KSA")
          } else {
            setCountry("LEB")
          }
        }
      } catch (err) {
        console.error("Failed to detect location:", err)
        setError("Failed to detect location")
        setCountry("LEB") // Default to Lebanon
      } finally {
        setIsLoading(false)
      }
    }

    detectLocation()
  }, [])

  return <LocationContext.Provider value={{ country, isLoading, error }}>{children}</LocationContext.Provider>
}
