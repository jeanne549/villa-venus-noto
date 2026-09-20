import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  let body: Record<string, string>
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  const { email, period, lang = 'fr' } = body

  if (!email || !period) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  // Store as a special contact_request entry with status='waitlist'
  const { error } = await supabase.from('contact_requests').insert([{
    name: 'Liste d\'attente',
    email,
    phone: null,
    arrival_date: null,
    departure_date: null,
    guests: 1,
    message: `Période souhaitée : ${period}`,
    status: 'waitlist',
    lang,
    consent_gdpr: true,
  }])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Confirmation email
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey && resendKey !== 're_COLLER_ICI_VOTRE_CLE_RESEND') {
    const subjects: Record<string, string> = {
      fr: 'Votre alerte disponibilité — Villa Vénus Noto',
      en: 'Your availability alert — Villa Vénus Noto',
      it: 'Il vostro avviso di disponibilità — Villa Vénus Noto',
    }
    const bodies: Record<string, string> = {
      fr: `Nous avons bien enregistré votre demande d'alerte pour la période : <strong>${period}</strong>.<br>Nous vous contacterons dès que ces dates se libèrent.`,
      en: `We have recorded your availability alert for the period: <strong>${period}</strong>.<br>We will contact you as soon as these dates become available.`,
      it: `Abbiamo registrato la vostra richiesta di avviso per il periodo: <strong>${period}</strong>.<br>Vi contatteremo non appena queste date saranno disponibili.`,
    }
    const safeLang = ['fr', 'en', 'it'].includes(lang) ? lang : 'fr'

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Villa Vénus Noto <contact@villavenusnoto.com>',
        to: [email],
        subject: subjects[safeLang] ?? subjects.fr,
        html: `<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#2C2C2C">
          <div style="background:#1a2744;padding:20px 32px"><p style="color:#C8963E;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin:0;font-family:sans-serif">Villa Vénus Noto</p></div>
          <div style="padding:32px;background:#fdfaf6;border:1px solid #e8e0d0">
            <p style="font-size:20px;margin:0 0 16px">Bonjour,</p>
            <p style="font-family:sans-serif;color:#555;line-height:1.8">${bodies[safeLang] ?? bodies.fr}</p>
          </div>
        </div>`,
      }),
    }).catch(() => null)

    // Notify owner
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Villa Vénus Noto <contact@villavenusnoto.com>',
        to: ['jd.deschaux@gmail.com'],
        subject: '🔔 Nouvelle alerte disponibilité — Villa Vénus Noto',
        html: `<div style="font-family:sans-serif;max-width:600px;padding:24px;color:#2C2C2C">
          <p style="font-size:16px;font-weight:bold">Nouvelle demande de liste d'attente</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Période souhaitée :</strong> ${period}</p>
          <p><strong>Langue :</strong> ${lang}</p>
          <p style="color:#888;font-size:12px">Visible dans le tableau de bord → dernières demandes (statut "waitlist").</p>
        </div>`,
      }),
    }).catch(() => null)
  }

  return NextResponse.json({ success: true })
}
