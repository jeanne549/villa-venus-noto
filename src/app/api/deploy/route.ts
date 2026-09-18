import { NextRequest, NextResponse } from 'next/server'

const WEBHOOK_SECRET   = process.env.GITHUB_WEBHOOK_SECRET!
const VERCEL_TOKEN     = process.env.VERCEL_DEPLOY_TOKEN!
const GITHUB_REPO_ID   = '1374707466'

async function verifySignature(req: NextRequest, body: string): Promise<boolean> {
  const sig = req.headers.get('x-hub-signature-256')
  if (!sig) return false
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(WEBHOOK_SECRET),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  )
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body))
  const expected = 'sha256=' + Array.from(new Uint8Array(mac), b => b.toString(16).padStart(2, '0')).join('')
  return sig === expected
}

export async function POST(req: NextRequest) {
  const body = await req.text()

  if (!await verifySignature(req, body)) {
    return NextResponse.json({ error: 'invalid signature' }, { status: 401 })
  }

  const event = req.headers.get('x-github-event')
  if (event !== 'push') return NextResponse.json({ ok: true, skipped: true })

  const payload = JSON.parse(body)
  if (payload.ref !== 'refs/heads/main') return NextResponse.json({ ok: true, skipped: true })

  const sha = payload.after as string

  const res = await fetch('https://api.vercel.com/v13/deployments', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'villa-sicile',
      gitSource: { type: 'github', repoId: GITHUB_REPO_ID, ref: 'main', sha },
      target: 'production',
    }),
  })

  const data = await res.json()
  return NextResponse.json({ ok: res.ok, status: res.status, deployId: data.id, url: data.url, error: data.error })
}
