import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Routes that require beta access
const PROTECTED_ROUTES = ["/explorer", "/chat", "/projects", "/map", "/project", "/country", "/submit", "/about"]

const COOKIE_NAME = "oh-beta-access"
const COOKIE_VALUE = "beta-authorized-2026"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path matches any protected route
  const isProtected = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )

  if (!isProtected) {
    return NextResponse.next()
  }

  // Check for the beta access cookie
  const betaCookie = request.cookies.get(COOKIE_NAME)

  if (betaCookie?.value === COOKIE_VALUE) {
    return NextResponse.next()
  }

  // No valid cookie - redirect to the beta gate page
  const gateUrl = new URL("/beta", request.url)
  gateUrl.searchParams.set("redirect", pathname)
  return NextResponse.redirect(gateUrl)
}

export const config = {
  matcher: [
    "/explorer/:path*",
    "/chat/:path*",
    "/projects/:path*",
    "/map/:path*",
    "/project/:path*",
    "/country/:path*",
    "/submit/:path*",
    "/about/:path*",
  ],
}
