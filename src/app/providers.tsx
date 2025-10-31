"use client"

import { useEffect } from "react"
import { useAuthStore } from "@/store/useAuthStore"

export default function Providers({ children }: { children: React.ReactNode }) {
  const hydrate = useAuthStore((state) => state.hydrate)

  useEffect(() => {
    hydrate()
  }, [hydrate])

  return <>{children}</>
}
