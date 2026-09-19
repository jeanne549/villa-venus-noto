import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const OWNER_EMAIL = 'jd.deschaux@gmail.com'

function nextSeasonWindow(): { from: string; to: string } {
  const d = new Date()
  const year = d.getMonth() >= 10 ? d.getFullYear() + 1 : d.getFullYear()
  return { from: `${year}-04-01`, to: `${year}-10-31` }
}

export async function GET(req: NextRequest) {
  // Protection : Vercel Cron envoie un Authorization header avec CRON_SECRET
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { from, to } = nextSeasonWindow()

  const { data: rows, error } = await supabaseAdmin
    .from('pricing')
    .select('date, price, available')
    .gte('date', from)
    .lte('date', to)
    .order('date')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Jours attendus (avr–oct de la saison)
  const expectedDates = new Set<string>()
  const cursor = new Date(from + 'T12:00:00Z')
  const end = new Date(to + 'T12:00:00Z')
  while (cursor <= end) {
    expectedDates.add(cursor.toISOString().slice(0, 10))
    cursor.setUTCDate(cursor.getUTCDate() + 1)
  }

  const inDB = new Set((rows ?? []).map(r => r.date))

  const missing = Array.from(expectedDates).filter(d => !inDB.has(d))
  const pricedButClosed = (rows ?? []).filter(r => r.price && r.price > 0 && r.available === false)
  const openWithoutPrice = (rows ?? []).filter(r => (!r.price || r.price <= 0) && r.available !== false)

  const anomalies = [
    ...missing.map(d => `❌ Absent de la table : ${d}`),
    ...pricedButClosed.map(r => `🔒 Tarifé (${r.price} €) mais fermé : ${r.date}`),
    ...openWithoutPrice.map(r => `⚠️ Ouvert sans tarif : ${r.date}`),
  ]

  if (anomalies.length === 0) {
    return NextResponse.json({ ok: true, message: 'Aucune anomalie détectée.' })
  }

  // Envoi email via Resend
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey && !resendKey.includes('COLLER')) {
    const html = `
<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#2C2C2C">
  <div style="background:#1a2744;padding:24px 32px;">
    <p style="color:#C8963E;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin:0">Villa Vénus Noto · Alerte tarification</p>
  </div>
  <div style="padding:32px;background:#fdfaf6;border:1px solid #e8e0d0">
    <p style="font-size:18px;margin:0 0 16px">⚠️ ${anomalies.length} anomalie(s) détectée(s) dans la saison réservable</p>
    <pre style="font-family:monospace;font-size:13px;background:#f5f0e8;padding:16px;line-height:1.8">${anomalies.join('\n')}</pre>
    <div style="margin-top:24px">
      <a href="https://www.villavenusnoto.com/admin/calendrier" style="background:#1a2744;color:white;padding:12px 24px;text-decoration:none;font-family:sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase">Corriger dans l'admin</a>
    </div>
  </div>
</div>`

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Villa Vénus Noto <contact@villavenusnoto.com>',
        to: [OWNER_EMAIL],
        subject: `⚠️ Villa Vénus — ${anomalies.length} anomalie(s) tarifaires détectées`,
        html,
      }),
    }).catch(() => {/* non bloquant */})
  }

  return NextResponse.json({ ok: true, anomalies })
}
