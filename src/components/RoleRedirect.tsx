// src/components/RoleRedirect.tsx
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"
import { normalizeRole } from "@/lib/roleMapper"

export function RoleRedirect() {
  const { profile, isLoading } = useAuthStore()
  const router = useRouter()
  
  useEffect(() => {
    if (!isLoading && profile) {
      const role = normalizeRole(profile?.role)
      router.replace(`/dashboard/${role}`)
    }
  }, [profile, isLoading, router])
  
  return null
}