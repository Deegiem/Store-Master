// src/components/DashboardLayout.tsx
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"
import { normalizeRole } from "@/lib/roleMapper"
import Navigation from "./Navigation"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { profile, isLoading } = useAuthStore()
  const router = useRouter()
  const role = normalizeRole(profile?.role)
  
  useEffect(() => {
    if (!isLoading && !profile) {
      router.push("/login")
    }
  }, [profile, isLoading, router])
  
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#003e9d] border-t-transparent mx-auto"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    )
  }
  
  if (!profile) return null
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation />
      <main className="flex-1 md:ml-[280px]">
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}