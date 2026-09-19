import { NextRequest, NextResponse } from 'next/server'

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET!
const SESSION_COOKIE = 'villa_admin'
const LOCALES = ['fr', 'en', 'it', 'de']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // ── 301 redirects pour anciennes URL indexées ──────────────────────────────
  if (pathname === '/contact' || pathname === '/contact/') {
    return NextResponse.redirect(new URL('/fr#contact', req.url), 301)
  }

  // ── Auth admin ─────────────────────────────────────────────────────────────
  if (pathname === '/admin/login' || pathname.startsWith('/api/admin/auth')) {
    return setLocaleHeader(NextResponse.next(), pathname)
  }
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const cookie = req.cookies.get(SESSION_COOKIE)
    if (!cookie || cookie.value !== SESSION_SECRET) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      const loginUrl = req.nextUrl.clone()
      loginUrl.pathname = '/admin/login'
      return NextResponse.redirect(loginUrl)
    }
    return setLocaleHeader(NextResponse.next(), pathname)
  }

  // ── Header x-locale pour le root layout ───────────────────────────────────
  return setLocaleHeader(NextResponse.next(), pathname)
}

function setLocaleHeader(res: NextResponse, pathname: string): NextResponse {
  const locale = LOCALES.find(l => pathname === `/${l}` || pathname.startsWith(`/${l}/`)) ?? 'fr'
  res.headers.set('x-locale', locale)
  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon|photos|og-image|site\\.webmanifest|robots\\.txt|sitemap\\.xml).*)',
  ],
}
