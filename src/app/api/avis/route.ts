import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_URL = 'https://villavenusnoto.com/admin/calendrier'
const MAX_NAME   = 100
const MAX_TEXT   = 2000
const RATE_WINDOW_MS = 30 * 60 * 1000  // 30 minutes
const URL_PATTERN = /https?:\/\/|www\./i

function buildNotifHtml(name: string, origin: string | null, rating: number, text: string) {
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating)
  return `
<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#2C2C2C">
  <div style="background:#1a2744;padding:24px 32px;">
    <p style="color:#C8963E;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin:0">Villa Vénus Noto · Nouvel avis en attente</p>
  </div>
  <div style="padding:32px;background:#fdfaf6;border:1px solid #e8e0d0">
    <p style="font-size:22px;margin:0 0 16px">Nouvel avis à valider</p>
    <table style="width:100%;border-collapse:collapse;font-family:sans-serif;font-size:14px">
      <tr><td style="padding:8px 0;border-bottom:1px solid #e8e0d0;color:#888;width:30%">Auteur</td><td style="padding:8px 0;border-bottom:1px solid #e8e0d0;font-weight:bold">${name}</td></tr>
      ${origin ? `<tr><td style="padding:8px 0;border-bottom:1px solid #e8e0d0;color:#888">Origine</td><td style="padding:8px 0;border-bottom:1px solid #e8e0d0">${origin}</td></tr>` : ''}
      <tr><td style="padding:8px 0;border-bottom:1px solid #e8e0d0;color:#888">Note</td><td style="padding:8px 0;border-bottom:1px solid #e8e0d0;color:#C8963E;font-size:18px">${stars} (${rating}/5)</td></tr>
      <tr><td colspan="2" style="padding:16px 0 0"><p style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:2px;font-family:sans-serif;margin:0 0 8px">Avis</p><p style="margin:0;font-style:italic">${text}</p></td></tr>
    </table>
    <div style="margin-top:28px;padding-top:16px;border-top:1px solid #e8e0d0">
      <a href="${ADMIN_URL}" style="background:#1a2744;color:white;padding:12px 24px;text-decoration:none;font-family:sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase">Valider ou rejeter dans l'admin</a>
    </div>
  </div>
</div>`
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Honeypot : champ caché qui doit rester vide — les bots le remplissent
  if (body.website !== undefined && body.website !== '') {
    return NextResponse.json({ success: true })  // Silencieux pour ne pas alerter le bot
  }

  const name   = typeof body.name   === 'string' ? body.name.trim()   : ''
  const text   = typeof body.text   === 'string' ? body.text.trim()   : ''
  const origin = typeof body.origin === 'string' ? body.origin.trim() : null
  const rating = Number(body.rating)

  // Validation des champs
  if (!name || name.length > MAX_NAME) {
    return NextResponse.json({ error: 'Nom invalide' }, { status: 400 })
  }
  if (!text || text.length > MAX_TEXT) {
    return NextResponse.json({ error: `Le texte doit faire entre 1 et ${MAX_TEXT} caractères` }, { status: 400 })
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Note invalide (1 à 5)' }, { status: 400 })
  }

  // Refus des liens dans le texte (spam SEO)
  if (URL_PATTERN.test(text) || URL_PATTERN.test(name)) {
    return NextResponse.json({ error: 'Les liens ne sont pas autorisés dans les avis' }, { status: 400 })
  }

  // Rate limiting par IP : 1 avis par 30 minutes
  const ip = getClientIp(req)
  if (ip !== 'unknown') {
    const since = new Date(Date.now() - RATE_WINDOW_MS).toISOString()
    const { count } = await supabaseAdmin
      .from('reviews')
      .select('*', { count: 'exact', head: true })
      .eq('submission_ip', ip)
      .gte('created_at', since)
    if ((count ?? 0) > 0) {
      return NextResponse.json({ error: 'Un seul avis peut être soumis par tranche de 30 minutes' }, { status: 429 })
    }
  }

  // Insertion — status forcé à 'pending' côté serveur, jamais modifiable par le formulaire
  try {
    const { error } = await supabaseAdmin.from('reviews').insert([{
      name,
      origin: origin || null,
      rating,
      text,
      status: 'pending',
      submission_ip: ip,
    }])
    if (error) throw error
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'DB error' }, { status: 500 })
  }

  // Notification email au propriétaire (non bloquante)
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey && resendKey !== 're_COLLER_ICI_VOTRE_CLE_RESEND') {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Villa Vénus Noto <contact@villavenusnoto.com>',
          to: ['jd.deschaux@gmail.com'],
          subject: `Nouvel avis en attente — ${name} (${rating}/5)`,
          html: buildNotifHtml(name, origin, rating, text),
        }),
      })
    } catch { /* notification non bloquante */ }
  }

  return NextResponse.json({ success: true })
}
