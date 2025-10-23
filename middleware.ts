// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PUBLIC_PATHS = ["/auth", "/auth/login", "/auth/register", "/auth/forgot-password", "/auth/reset-password", "/_next", "/favicon.ico", "/api"]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // allow public assets and docs
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  // protect dashboard and api client pages
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin") || pathname.startsWith("/manager") || pathname.startsWith("/staff")) {
    const token = req.cookies.get("token")?.value
    if (!token) {
      const loginUrl = new URL("/auth/login", req.url)
      return NextResponse.redirect(loginUrl)
    }
    // token exists -> allow. (Optional: If the backend provides role info as cookie,
    // you can read req.cookies.get('role') and redirect accordingly.)
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/manager/:path*", "/staff/:path*"],
}
