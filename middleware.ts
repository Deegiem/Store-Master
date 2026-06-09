// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { normalizeRole } from "@/lib/roleMapper"

const PUBLIC_PATHS = [
  "/login", 
  "/register", 
  "/forgot-password", 
  "/reset-password",
  "/setup-password",
  "/request-access",
  "/_next", 
  "/favicon.ico", 
  "/api"
]
// Map old paths to new role-based paths
const LEGACY_PATH_MAP: Record<string, string> = {
  "/admin": "/dashboard/admin",
  "/manager": "/dashboard/manager",
  "/staff": "/dashboard/manager",  // Changed from store to manager
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // allow public assets and docs
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  // Handle legacy paths (backward compatibility)
  if (LEGACY_PATH_MAP[pathname]) {
    const newUrl = new URL(LEGACY_PATH_MAP[pathname], req.url)
    return NextResponse.redirect(newUrl)
  }
  // Also add a redirect for /dashboard/store to /dashboard/manager
  if (pathname.startsWith("/dashboard/store")) {
    const newUrl = new URL(pathname.replace("/dashboard/store", "/dashboard/manager"), req.url)
    return NextResponse.redirect(newUrl)
  }

  // Protect dashboard and role-specific routes
  if (pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/manager") ||
    pathname.startsWith("/staff")) {

    const token = req.cookies.get("token")?.value
    if (!token) {
      const loginUrl = new URL("/login", req.url)
      return NextResponse.redirect(loginUrl)
    }

    // Optional: Get role from cookie if your backend sets it
    const userRole = req.cookies.get("role")?.value

    // If accessing old paths, redirect to new role-based dashboards
    if (pathname === "/admin" && userRole) {
      const role = normalizeRole(userRole)
      const dashboardUrl = new URL(`/dashboard/${role}`, req.url)
      return NextResponse.redirect(dashboardUrl)
    }

    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/manager/:path*",
    "/staff/:path*",
    "/",
  ],
}