// src/lib/roleMapper.ts
import { type Role as BackendRole } from "@/types/role"

export type AppRole = 
  | "admin" 
  | "manager" 
  | "finance" 
  | "purchase" 
  | "store"      // Keep for backward compatibility, will map to manager
  | "sales" 
  | "guest"

// Map backend roles to frontend role keys
const ROLE_MAP: Record<BackendRole, AppRole> = {
  "System Administrator": "admin",
  "Finance Manager": "finance",
  "Purchase Manager": "purchase",
  "Store Manager": "manager",
  "Store Staff": "manager",      // ← Changed: Store Staff now maps to manager
  "Sales Staff": "sales",
}

// Reverse map for display names
const DISPLAY_NAMES: Record<AppRole, string> = {
  admin: "System Administrator",
  manager: "Store Manager",      // ← Updated display name
  finance: "Finance Manager",
  purchase: "Purchase Manager",
  store: "Store Manager",        // ← Updated display name for backward compatibility
  sales: "Sales Staff",
  guest: "Guest",
}

export function normalizeRole(role?: BackendRole | string): AppRole {
  if (!role) return "guest"
  
  // If it's already a frontend role key, return it
  if (role === "admin" || role === "manager" || role === "finance" || 
      role === "purchase" || role === "store" || role === "sales" || role === "guest") {
    return role as AppRole
  }
  
  // Map backend role to frontend key
  return ROLE_MAP[role as BackendRole] || "guest"
}

export function getDisplayRole(role: AppRole): string {
  // Handle backward compatibility - if role is "store", return "Store Manager"
  if (role === "store") {
    return "Store Manager"
  }
  return DISPLAY_NAMES[role] || role
}

// Helper to check role access (backward compatible)
export function isAuthorized(role: BackendRole | string | undefined, allowedRoles: AppRole[]): boolean {
  const normalizedRole = normalizeRole(role)
  return allowedRoles.includes(normalizedRole)
}