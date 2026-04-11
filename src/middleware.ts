import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ─── In-memory rate limiter (demo — in production use Upstash Redis) ──────────
const rateMap = new Map<string, { count: number; resetAt: number }>()

function rateLimit(ip: string, limit = 60, windowMs = 60_000): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (entry.count >= limit) return false
  entry.count++
  return true
}

// ─── Security headers ─────────────────────────────────────────────────────────
const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options':    'nosniff',
  'X-Frame-Options':           'DENY',
  'X-XSS-Protection':          '1; mode=block',
  'Referrer-Policy':           'strict-origin-when-cross-origin',
  'Permissions-Policy':        'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
}

// ─── Admin route guard ────────────────────────────────────────────────────────
// In production: check JWT cookie / session token properly
function isAdminAuthenticated(req: NextRequest): boolean {
  const adminToken = req.cookies.get('admin_token')?.value
  // Simple demo guard — replace with real JWT verification in production
  return !!adminToken || process.env.NODE_ENV === 'development'
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? '127.0.0.1'

  // ── Rate limiting on API routes ──────────────────────────────────────────
  if (pathname.startsWith('/api/')) {
    const apiLimit = pathname.startsWith('/api/import') ? 10 : 120
    if (!rateLimit(ip, apiLimit, 60_000)) {
      return new NextResponse(
        JSON.stringify({ error: 'Demasiadas solicitudes. Intenta de nuevo en un minuto.' }),
        { status: 429, headers: { 'Content-Type': 'application/json', 'Retry-After': '60' } }
      )
    }
  }

  // ── Admin route protection ───────────────────────────────────────────────
  if (pathname.startsWith('/admin') && !isAdminAuthenticated(req)) {
    const loginUrl = new URL('/auth/login', req.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // ── Build response with security headers ─────────────────────────────────
  const response = NextResponse.next()
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*',
    '/perfil/:path*',
    '/checkout/:path*',
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images/).*)',
  ],
}
