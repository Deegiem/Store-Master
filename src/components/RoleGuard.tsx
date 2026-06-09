// src/components/RoleGuard.tsx
"use client"

import React from "react"
import { usePermissions } from "@/hooks/usePermissions"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { AccessDenied } from "@/components/AccessDenied"
import App from "next/app"
import { AppRole } from "@/lib/roleMapper"

interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles?: AppRole[]
  fallback?: React.ReactNode
  customMessage?: string
}

export function RoleGuard({ children, allowedRoles, fallback, customMessage }: RoleGuardProps) {
  const { role, hasRole } = usePermissions()
  const router = useRouter()
  
  useEffect(() => {
    if (allowedRoles && !hasRole(allowedRoles[0])) {
      // Optional: redirect to dashboard
      // router.push(`/dashboard/${role}`)
    }
  }, [role, allowedRoles, hasRole, router])
  
  if (!allowedRoles) return <>{children}</>
  
  const hasAccess = allowedRoles.some(allowedRole => hasRole(allowedRole))
  
  if (!hasAccess) {
    if (fallback) return <>{fallback}</>
    // Now using your AccessDenied component with consistent styling
    return <AccessDenied message={customMessage} />
  }
  
  return <>{children}</>
}