// src/app/dashboard/[role]/layout.tsx
"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { usePermissions } from "@/hooks/usePermissions"
import Navigation from "@/components/Navigation"

export default function RoleLayout({ children }: { children: React.ReactNode }) {
  const params = useParams()
  const router = useRouter()
  const { role, isLoading } = usePermissions()
  const currentRole = params.role as string
  
  // Redirect if role doesn't match the URL
  useEffect(() => {
    if (!isLoading && role !== "guest" && role !== currentRole) {
      router.replace(`/dashboard/${role}`)
    }
  }, [role, currentRole, router, isLoading])
  
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F9FAFB]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#003e9d] border-t-transparent"></div>
          <p className="text-sm text-slate-500">Loading dashboard...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Navigation />
      <main className="flex-1 md:ml-[280px]">
        {children}
      </main>
    </div>
  )
}