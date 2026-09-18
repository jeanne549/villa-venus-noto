import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET!
const SESSION_COOKIE = 'villa_admin'
const GA4_PROPERTY_ID    = process.env.GA4_PROPERTY_ID       // numeric, e.g. "123456789"
const GA4_SERVICE_ACCOUNT = process.env.GA4_SERVICE_ACCOUNT_JSON // full JSON string

// ── Auth guard ─────────────────────────────────────────────────────────────────
function isAuthed(): boolean {
  try {
    const c = cookies().get(SESSION_COOKIE)
    return !!c && c.value === SESSION_SECRET
  } catch { return false }
}

// ── Minimal JWT for Google service account (no external package) ───────────────
async function getGoogleAccessToken(saJson: string): Promise<string | null> {
  try {
    const sa = JSON.parse(saJson)
    const now   = Math.floor(Date.now() / 1000)
    const claim = { iss: sa.client_email, scope: 'https://www.googleapis.com/auth/analytics.readonly', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 }

    const header  = btoa(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
    const payload = btoa(JSON.stringify(claim)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
    const toSign  = `${header}.${payload}`

    // Import RSA private key
    const pem     = sa.private_key.replace(/\\n/g, '\n')
    const pemBody = pem.replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\n/g, '')
    const der     = Uint8Array.from(atob(pemBody), c => c.charCodeAt(0))
    const key     = await crypto.subtle.importKey('pkcs8', der, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign'])

    const sig     = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(toSign))
    const sigArr  = new Uint8Array(sig)
    const sigB64  = btoa(Array.from(sigArr, b => String.fromCharCode(b)).join('')).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
    const jwt     = `${toSign}.${sigB64}`

    const res  = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
    })
    const data = await res.json()
    return data.access_token ?? null
  } catch { return null }
}

// ── GA4 Data API query ──────────────────────────────────────────────────────────
async function queryGA4(propertyId: string, token: string, body: object) {
  const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return res.json()
}

export async function GET() {
  if (!isAuthed()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // No credentials → return empty state so dashboard shows setup card
  if (!GA4_PROPERTY_ID || !GA4_SERVICE_ACCOUNT) {
    return NextResponse.json({ configured: false })
  }

  const token = await getGoogleAccessToken(GA4_SERVICE_ACCOUNT)
  if (!token) return NextResponse.json({ configured: true, error: 'token_failed' })

  const now   = new Date()
  const y     = now.getFullYear()
  const m     = String(now.getMonth() + 1).padStart(2, '0')
  const start = `${y}-${m}-01`
  const end   = 'today'

  try {
    // Monthly visitors + pageviews
    const overview = await queryGA4(GA4_PROPERTY_ID, token, {
      dateRanges: [{ startDate: start, endDate: end }],
      metrics: [{ name: 'activeUsers' }, { name: 'sessions' }, { name: 'screenPageViews' }],
    })

    // Top 5 pages
    const topPages = await queryGA4(GA4_PROPERTY_ID, token, {
      dateRanges: [{ startDate: start, endDate: end }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 5,
    })

    const row0 = overview.rows?.[0]?.metricValues ?? []
    const visitors = parseInt(row0[0]?.value ?? '0')
    const sessions = parseInt(row0[1]?.value ?? '0')
    const pageviews = parseInt(row0[2]?.value ?? '0')

    const pages = (topPages.rows ?? []).map((r: { dimensionValues: {value:string}[]; metricValues: {value:string}[] }) => ({
      path: r.dimensionValues[0]?.value,
      views: parseInt(r.metricValues[0]?.value ?? '0'),
    }))

    return NextResponse.json({ configured: true, visitors, sessions, pageviews, topPages: pages })
  } catch {
    return NextResponse.json({ configured: true, error: 'query_failed' })
  }
}
