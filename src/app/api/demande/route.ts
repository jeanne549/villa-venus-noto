import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

type Lang = 'fr' | 'en' | 'it'

function formatDate(d: string, lang: Lang) {
  const date = new Date(d + 'T12:00:00')
  const locales = { fr: 'fr-FR', en: 'en-GB', it: 'it-IT' }
  return date.toLocaleDateString(locales[lang], { day: 'numeric', month: 'long', year: 'numeric' })
}

function nightsBetween(arrival: string, departure: string) {
  return Math.round((new Date(departure).getTime() - new Date(arrival).getTime()) / 86400000)
}

const labels = {
  fr: {
    subject_owner: 'Nouvelle demande de réservation — Villa Vénus Noto',
    subject_client: 'Votre demande a bien été reçue — Villa Vénus Noto',
    greeting: 'Bonjour',
    received: 'Votre demande de réservation a bien été reçue. Nous vous répondrons sous 24 heures pour confirmer les disponibilités.',
    your_stay: 'Votre séjour',
    arrival: 'Arrivée',
    departure: 'Départ',
    nights: 'Nuits',
    guests: 'Voyageurs',
    total: 'Montant estimé',
    message_label: 'Votre message',
    reply: 'Nous répondrons à',
    closing: 'À très bientôt,\nL\'équipe de Villa Vénus Noto',
    night: 'nuit',
    nights_plural: 'nuits',
  },
  en: {
    subject_owner: 'New booking request — Villa Vénus Noto',
    subject_client: 'Your request has been received — Villa Vénus Noto',
    greeting: 'Hello',
    received: 'Your booking request has been received. We will get back to you within 24 hours to confirm availability.',
    your_stay: 'Your stay',
    arrival: 'Arrival',
    departure: 'Departure',
    nights: 'Nights',
    guests: 'Guests',
    total: 'Estimated total',
    message_label: 'Your message',
    reply: 'We will reply to',
    closing: 'See you soon,\nThe Villa Vénus Noto team',
    night: 'night',
    nights_plural: 'nights',
  },
  it: {
    subject_owner: 'Nuova richiesta di prenotazione — Villa Vénus Noto',
    subject_client: 'La tua richiesta è stata ricevuta — Villa Vénus Noto',
    greeting: 'Buongiorno',
    received: 'La tua richiesta di prenotazione è stata ricevuta. Vi risponderemo entro 24 ore per confermare la disponibilità.',
    your_stay: 'Il tuo soggiorno',
    arrival: 'Arrivo',
    departure: 'Partenza',
    nights: 'Notti',
    guests: 'Ospiti',
    total: 'Totale stimato',
    message_label: 'Il tuo messaggio',
    reply: 'Risponderemo a',
    closing: 'A presto,\nIl team di Villa Vénus Noto',
    night: 'notte',
    nights_plural: 'notti',
  },
}

function buildOwnerHtml(data: Record<string, string>, nights: number, estimatedTotal: number | null) {
  return `
<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#2C2C2C">
  <div style="background:#1a2744;padding:24px 32px;">
    <p style="color:#C8963E;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin:0">Villa Vénus Noto · Nouvelle demande</p>
  </div>
  <div style="padding:32px;background:#fdfaf6;border:1px solid #e8e0d0">
    <table style="width:100%;border-collapse:collapse">
      <tr><td style="padding:8px 0;border-bottom:1px solid #e8e0d0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:2px;font-family:sans-serif">Nom</td><td style="padding:8px 0;border-bottom:1px solid #e8e0d0;font-weight:bold">${data.name}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #e8e0d0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:2px;font-family:sans-serif">Email</td><td style="padding:8px 0;border-bottom:1px solid #e8e0d0"><a href="mailto:${data.email}" style="color:#C8963E">${data.email}</a></td></tr>
      ${data.phone ? `<tr><td style="padding:8px 0;border-bottom:1px solid #e8e0d0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:2px;font-family:sans-serif">Téléphone</td><td style="padding:8px 0;border-bottom:1px solid #e8e0d0">${data.phone}</td></tr>` : ''}
      <tr><td style="padding:8px 0;border-bottom:1px solid #e8e0d0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:2px;font-family:sans-serif">Arrivée</td><td style="padding:8px 0;border-bottom:1px solid #e8e0d0">${data.arrival_date}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #e8e0d0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:2px;font-family:sans-serif">Départ</td><td style="padding:8px 0;border-bottom:1px solid #e8e0d0">${data.departure_date}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #e8e0d0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:2px;font-family:sans-serif">Nuits</td><td style="padding:8px 0;border-bottom:1px solid #e8e0d0">${nights}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #e8e0d0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:2px;font-family:sans-serif">Voyageurs</td><td style="padding:8px 0;border-bottom:1px solid #e8e0d0">${data.guests}</td></tr>
      ${estimatedTotal ? `<tr><td style="padding:8px 0;border-bottom:1px solid #e8e0d0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:2px;font-family:sans-serif">Total estimé</td><td style="padding:8px 0;border-bottom:1px solid #e8e0d0;color:#C8963E;font-weight:bold">${estimatedTotal.toLocaleString('fr-FR')} €</td></tr>` : ''}
      ${data.message ? `<tr><td colspan="2" style="padding:16px 0 0"><p style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:2px;font-family:sans-serif;margin:0 0 8px">Message</p><p style="margin:0;font-style:italic">${data.message}</p></td></tr>` : ''}
    </table>
    <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e8e0d0">
      <a href="mailto:${data.email}" style="background:#1a2744;color:white;padding:12px 24px;text-decoration:none;font-family:sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase">Répondre au client</a>
    </div>
  </div>
</div>`
}

function buildClientHtml(data: Record<string, string>, nights: number, estimatedTotal: number | null, lang: Lang) {
  const l = labels[lang]
  return `
<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#2C2C2C">
  <div style="background:#1a2744;padding:24px 32px;">
    <p style="color:#C8963E;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin:0">Villa Vénus Noto · Noto, Sicilia</p>
  </div>
  <div style="padding:32px;background:#fdfaf6;border:1px solid #e8e0d0">
    <p style="font-size:22px;margin:0 0 8px">${l.greeting} ${data.name},</p>
    <div style="width:40px;height:1px;background:#C8963E;margin:16px 0"></div>
    <p style="font-family:sans-serif;color:#555;line-height:1.8">${l.received}</p>

    <div style="background:white;border:1px solid #e8e0d0;padding:20px;margin:24px 0">
      <p style="color:#C8963E;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-family:sans-serif;margin:0 0 16px">${l.your_stay}</p>
      <table style="width:100%;border-collapse:collapse;font-family:sans-serif;font-size:14px">
        <tr><td style="padding:6px 0;color:#888">${l.arrival}</td><td style="padding:6px 0;font-weight:bold">${formatDate(data.arrival_date, lang)}</td></tr>
        <tr><td style="padding:6px 0;color:#888">${l.departure}</td><td style="padding:6px 0;font-weight:bold">${formatDate(data.departure_date, lang)}</td></tr>
        <tr><td style="padding:6px 0;color:#888">${l.nights}</td><td style="padding:6px 0">${nights} ${nights > 1 ? l.nights_plural : l.night}</td></tr>
        <tr><td style="padding:6px 0;color:#888">${l.guests}</td><td style="padding:6px 0">${data.guests}</td></tr>
        ${estimatedTotal ? `<tr><td style="padding:6px 0;color:#888">${l.total}</td><td style="padding:6px 0;color:#C8963E;font-weight:bold">${estimatedTotal.toLocaleString('fr-FR')} €</td></tr>` : ''}
      </table>
    </div>

    ${data.message ? `<p style="font-family:sans-serif;color:#555;font-style:italic;font-size:14px">${l.message_label} : « ${data.message} »</p>` : ''}

    <p style="font-family:sans-serif;color:#555;font-size:13px">${l.reply} <strong>${data.email}</strong></p>
    <div style="width:40px;height:1px;background:#C8963E;margin:24px 0"></div>
    <p style="font-family:sans-serif;white-space:pre-line;color:#555;font-size:14px">${l.closing}</p>
  </div>
  <div style="padding:16px 32px;background:#1a2744;text-align:center">
    <p style="color:rgba(255,255,255,0.4);font-family:sans-serif;font-size:11px;letter-spacing:2px;margin:0">Contrada Spaccazza · 96017 Noto SR · Sicilia · contact@villavenusnoto.com</p>
  </div>
</div>`
}

export async function POST(req: NextRequest) {
  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { name, email, phone, arrival_date, departure_date, guests, message, lang = 'fr', consent_gdpr } = body
  const safelang = (['fr', 'en', 'it'].includes(lang) ? lang : 'fr') as Lang

  // Validation serveur
  if (!name || !email || !arrival_date || !departure_date || !guests) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  const nights = nightsBetween(arrival_date, departure_date)
  if (nights < 6) {
    return NextResponse.json({ error: 'Minimum 6 nights' }, { status: 400 })
  }

  // Calculer le total estimé depuis pricing si possible
  let estimatedTotal: number | null = null
  try {
    const { data: pricingRows } = await supabaseAdmin
      .from('pricing')
      .select('date, price, available')
      .gte('date', arrival_date)
      .lt('date', departure_date)

    if (pricingRows && pricingRows.length === nights) {
      const allAvailable = pricingRows.every((r: { available: boolean }) => r.available !== false)
      if (allAvailable) {
        const total = pricingRows.reduce((sum: number, r: { price: number | null }) => sum + (r.price || 0), 0)
        if (total > 0) estimatedTotal = total
      }
    }
  } catch { /* ignore — total reste null */ }

  // 1. Enregistrement en base (indépendant de l'email)
  let dbOk = false
  let dbError: string | null = null
  try {
    const { error } = await supabaseAdmin.from('contact_requests').insert([{
      name, email, phone: phone || null,
      arrival_date, departure_date,
      guests: parseInt(guests),
      message: message || null,
      status: 'new',
      lang: safelang,
      consent_gdpr: consent_gdpr === 'true' || String(consent_gdpr) === 'true',
    }])
    if (error) throw error
    dbOk = true
  } catch (e: unknown) {
    dbError = e instanceof Error ? e.message : 'DB error'
  }

  // 2. Envoi des emails (indépendant de la DB)
  let emailOk = false
  let emailError: string | null = null

  const resendKey = process.env.RESEND_API_KEY
  if (resendKey && resendKey !== 're_COLLER_ICI_VOTRE_CLE_RESEND') {
    try {
      const ownerHtml = buildOwnerHtml(body, nights, estimatedTotal)
      const clientHtml = buildClientHtml(body, nights, estimatedTotal, safelang)

      const [ownerRes, clientRes] = await Promise.all([
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: 'Villa Vénus Noto <contact@villavenusnoto.com>',
            to: ['jd.deschaux@gmail.com'],
            reply_to: email,
            subject: labels[safelang].subject_owner,
            html: ownerHtml,
          }),
        }),
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: 'Villa Vénus Noto <contact@villavenusnoto.com>',
            to: [email],
            subject: labels[safelang].subject_client,
            html: clientHtml,
          }),
        }),
      ])

      if (ownerRes.ok && clientRes.ok) {
        emailOk = true
      } else {
        const e1 = await ownerRes.text()
        const e2 = await clientRes.text()
        emailError = `owner:${ownerRes.status} ${e1} | client:${clientRes.status} ${e2}`
      }
    } catch (e: unknown) {
      emailError = e instanceof Error ? e.message : 'Email error'
    }
  } else {
    emailError = 'RESEND_API_KEY not configured'
  }

  // Alerte propriétaire si la DB a échoué (demande potentiellement perdue)
  if (!dbOk) {
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey && resendKey !== 're_COLLER_ICI_VOTRE_CLE_RESEND') {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: 'Villa Vénus Noto <contact@villavenusnoto.com>',
            to: ['jd.deschaux@gmail.com'],
            subject: '⚠️ ALERTE — Demande de réservation non enregistrée',
            html: `<div style="font-family:sans-serif;padding:24px;max-width:600px">
              <p style="color:#b91c1c;font-size:18px;font-weight:bold">⚠️ Demande perdue en base de données</p>
              <p>Une demande de réservation n'a PAS été enregistrée dans Supabase.</p>
              <table style="border-collapse:collapse;width:100%;font-size:14px">
                <tr><td style="padding:4px 8px;color:#888">Nom</td><td style="padding:4px 8px">${name}</td></tr>
                <tr><td style="padding:4px 8px;color:#888">Email</td><td style="padding:4px 8px">${email}</td></tr>
                ${phone ? `<tr><td style="padding:4px 8px;color:#888">Tél.</td><td style="padding:4px 8px">${phone}</td></tr>` : ''}
                <tr><td style="padding:4px 8px;color:#888">Arrivée</td><td style="padding:4px 8px">${arrival_date}</td></tr>
                <tr><td style="padding:4px 8px;color:#888">Départ</td><td style="padding:4px 8px">${departure_date}</td></tr>
                <tr><td style="padding:4px 8px;color:#888">Personnes</td><td style="padding:4px 8px">${guests}</td></tr>
                ${message ? `<tr><td style="padding:4px 8px;color:#888">Message</td><td style="padding:4px 8px">${message}</td></tr>` : ''}
                <tr><td style="padding:4px 8px;color:#888">Erreur DB</td><td style="padding:4px 8px;color:#b91c1c">${dbError}</td></tr>
              </table>
              <p style="margin-top:16px;color:#888;font-size:12px">Contactez ce client manuellement — sa demande n'est pas dans votre tableau de bord.</p>
            </div>`,
          }),
        })
      } catch { /* alerte non bloquante */ }
    }
  }

  // Réponse : succès si au moins la DB est OK
  if (dbOk) {
    return NextResponse.json({
      success: true,
      db: true,
      email: emailOk,
      emailError: emailOk ? null : emailError,
    })
  }

  return NextResponse.json({
    success: false,
    db: false,
    dbError,
    email: emailOk,
  }, { status: 500 })
}
