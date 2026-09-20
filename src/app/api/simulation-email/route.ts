import { NextRequest, NextResponse } from 'next/server'

type Lang = 'fr' | 'en' | 'it'

const L = {
  fr: {
    subject: 'Votre simulation de séjour — Villa Vénus Noto',
    greeting: 'Bonjour',
    intro: 'Voici le récapitulatif du séjour que vous avez simulé sur villavenusnoto.com.',
    stay_title: 'Votre simulation',
    arrival: 'Arrivée', departure: 'Départ', nights: 'Nuits', guests: 'Voyageurs',
    rental: 'Location villa', tax: 'Taxe de séjour (max 6 nuits)', total: 'Total estimé',
    saving_title: 'Économie vs plateforme',
    saving_body: 'En réservant directement ici, vous évitez les frais de service voyageur (14–16 %). Sur ce séjour, cela représente environ',
    included_title: 'Ce qui est inclus',
    included: ['4 suites parentales avec salle de bain privative', 'Piscine privée 14 × 7 m, chauffée', 'Rooftop 360° avec vue sur la mer', 'Cuisine équipée, barbecue, jardin', 'Wi-Fi haut débit', 'Ménage fin de séjour', 'Linge de maison et serviettes de piscine'],
    cta: 'Réserver ces dates directement',
    closing: 'Des questions ? Répondez simplement à cet email ou contactez-nous sur WhatsApp.',
    unsubscribe: 'Se désinscrire de ces emails',
    tax_note: 'Taxe de séjour : 1 €/personne/nuit, plafonnée à 6 nuits — réglée sur place.',
    night: 'nuit', nights_pl: 'nuits',
  },
  en: {
    subject: 'Your stay simulation — Villa Vénus Noto',
    greeting: 'Hello',
    intro: 'Here is the summary of the stay you simulated on villavenusnoto.com.',
    stay_title: 'Your simulation',
    arrival: 'Arrival', departure: 'Departure', nights: 'Nights', guests: 'Guests',
    rental: 'Villa rental', tax: 'Tourist tax (max 6 nights)', total: 'Estimated total',
    saving_title: 'Savings vs platform',
    saving_body: 'By booking directly here, you avoid the platform service fee (14–16%). For this stay, that represents approximately',
    included_title: "What's included",
    included: ['4 master suites with private bathrooms', 'Private heated pool 14 × 7 m', '360° rooftop with sea views', 'Equipped kitchen, BBQ, garden', 'High-speed Wi-Fi', 'End-of-stay cleaning', 'Household linen and pool towels'],
    cta: 'Book these dates directly',
    closing: 'Questions? Simply reply to this email or reach us on WhatsApp.',
    unsubscribe: 'Unsubscribe from these emails',
    tax_note: 'Tourist tax: €1/person/night, capped at 6 nights — paid on-site.',
    night: 'night', nights_pl: 'nights',
  },
  it: {
    subject: 'La vostra simulazione di soggiorno — Villa Vénus Noto',
    greeting: 'Buongiorno',
    intro: 'Ecco il riepilogo del soggiorno che avete simulato su villavenusnoto.com.',
    stay_title: 'La vostra simulazione',
    arrival: 'Arrivo', departure: 'Partenza', nights: 'Notti', guests: 'Ospiti',
    rental: 'Affitto villa', tax: 'Tassa di soggiorno (max 6 notti)', total: 'Totale stimato',
    saving_title: 'Risparmio rispetto alla piattaforma',
    saving_body: 'Prenotando direttamente qui, evitate le commissioni di servizio (14–16 %). Per questo soggiorno, ciò rappresenta circa',
    included_title: 'Cosa è incluso',
    included: ['4 suite con bagno privato', 'Piscina privata riscaldata 14 × 7 m', 'Rooftop 360° con vista sul mare', 'Cucina attrezzata, barbecue, giardino', 'Wi-Fi ad alta velocità', 'Pulizie fine soggiorno', 'Biancheria e asciugamani da piscina'],
    cta: 'Prenotare queste date direttamente',
    closing: 'Domande? Rispondete a questa email o contattateci su WhatsApp.',
    unsubscribe: 'Annullare l\'iscrizione',
    tax_note: 'Tassa di soggiorno: 1 €/persona/notte, max 6 notti — pagata in loco.',
    night: 'notte', nights_pl: 'notti',
  },
}

function formatDate(d: string, lang: Lang) {
  const date = new Date(d + 'T12:00:00')
  const locales = { fr: 'fr-FR', en: 'en-GB', it: 'it-IT' }
  return date.toLocaleDateString(locales[lang], { day: 'numeric', month: 'long', year: 'numeric' })
}

function fmt(n: number) { return n.toLocaleString('fr-FR') + ' €' }

function buildHtml(data: {
  email: string; lang: Lang; arrival: string; departure: string; nights: number
  guests: number; totalRental: number; taxAmount: number; grandTotal: number
  saving: number; unsubToken: string
}) {
  const l = L[data.lang] ?? L.fr
  const BASE = 'https://www.villavenusnoto.com'
  const ctaHref = `${BASE}/${data.lang}#contact`
  const unsubHref = `${BASE}/api/unsubscribe?token=${data.unsubToken}`

  return `
<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#2C2C2C;background:#fdfaf6">
  <div style="background:#1a2744;padding:24px 32px">
    <p style="color:#C8963E;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin:0;font-family:sans-serif">Villa Vénus Noto · Noto, Sicilia</p>
  </div>
  <div style="padding:32px;border:1px solid #e8e0d0;border-top:none">
    <p style="font-size:22px;margin:0 0 8px">${l.greeting},</p>
    <div style="width:40px;height:1px;background:#C8963E;margin:16px 0"></div>
    <p style="font-family:sans-serif;color:#555;line-height:1.8;font-size:14px">${l.intro}</p>

    <!-- Séjour -->
    <div style="background:white;border:1px solid #e8e0d0;padding:20px;margin:24px 0">
      <p style="color:#C8963E;font-size:10px;letter-spacing:3px;text-transform:uppercase;font-family:sans-serif;margin:0 0 16px">${l.stay_title}</p>
      <table style="width:100%;border-collapse:collapse;font-family:sans-serif;font-size:14px">
        <tr><td style="padding:5px 0;color:#888">${l.arrival}</td><td style="padding:5px 0;font-weight:bold">${formatDate(data.arrival, data.lang)}</td></tr>
        <tr><td style="padding:5px 0;color:#888">${l.departure}</td><td style="padding:5px 0;font-weight:bold">${formatDate(data.departure, data.lang)}</td></tr>
        <tr><td style="padding:5px 0;color:#888">${l.nights}</td><td style="padding:5px 0">${data.nights} ${data.nights > 1 ? l.nights_pl : l.night}</td></tr>
        <tr><td style="padding:5px 0;color:#888">${l.guests}</td><td style="padding:5px 0">${data.guests}</td></tr>
      </table>
    </div>

    <!-- Total -->
    <div style="background:#f5f0e8;border:1px solid #e8e0d0;padding:20px;margin:0 0 24px">
      <p style="color:#C8963E;font-size:10px;letter-spacing:3px;text-transform:uppercase;font-family:sans-serif;margin:0 0 16px">${l.total}</p>
      <table style="width:100%;border-collapse:collapse;font-family:sans-serif;font-size:14px">
        <tr>
          <td style="padding:5px 0;color:#555">${l.rental}</td>
          <td style="padding:5px 0;text-align:right;font-weight:bold">${fmt(data.totalRental)}</td>
        </tr>
        <tr>
          <td style="padding:5px 0;color:#555">${l.tax}</td>
          <td style="padding:5px 0;text-align:right">${fmt(data.taxAmount)}</td>
        </tr>
        <tr style="border-top:2px solid #C8963E">
          <td style="padding:10px 0 5px;font-size:16px;font-weight:bold">${l.total}</td>
          <td style="padding:10px 0 5px;text-align:right;font-size:24px;color:#C8963E;font-weight:bold">${fmt(data.grandTotal)}</td>
        </tr>
      </table>
      <p style="font-family:sans-serif;font-size:11px;color:#888;margin:12px 0 0;font-style:italic">${l.tax_note}</p>
    </div>

    <!-- Économie -->
    <div style="background:#1a2744;padding:16px 20px;margin:0 0 24px;display:flex;align-items:center;gap:16px">
      <p style="font-family:sans-serif;font-size:13px;color:rgba(255,255,255,0.7);margin:0;flex:1">
        ${l.saving_body} <strong style="color:#C8963E">${fmt(data.saving)}</strong>.
      </p>
    </div>

    <!-- Ce qui est inclus -->
    <div style="margin:0 0 24px">
      <p style="color:#C8963E;font-size:10px;letter-spacing:3px;text-transform:uppercase;font-family:sans-serif;margin:0 0 12px">${l.included_title}</p>
      <ul style="font-family:sans-serif;font-size:13px;color:#555;line-height:2;margin:0;padding-left:20px">
        ${l.included.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin:32px 0 24px">
      <a href="${ctaHref}" style="background:#C8963E;color:white;padding:14px 36px;text-decoration:none;font-family:sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;display:inline-block">${l.cta}</a>
    </div>

    <div style="width:40px;height:1px;background:#C8963E;margin:24px auto"></div>
    <p style="font-family:sans-serif;font-size:13px;color:#555;text-align:center">${l.closing}</p>
  </div>
  <div style="padding:16px 32px;background:#1a2744;text-align:center">
    <p style="color:rgba(255,255,255,0.4);font-family:sans-serif;font-size:11px;letter-spacing:2px;margin:0">Contrada Spaccazza · 96017 Noto SR · Sicilia</p>
    <p style="margin:8px 0 0"><a href="${unsubHref}" style="color:rgba(255,255,255,0.3);font-family:sans-serif;font-size:10px">${l.unsubscribe}</a></p>
  </div>
</div>`
}

export async function POST(req: NextRequest) {
  let body: Record<string, string | number>
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  const { email, lang = 'fr', arrival, departure, nights, guests, totalRental, taxAmount } = body as {
    email: string; lang: string; arrival: string; departure: string
    nights: number; guests: number; totalRental: number; taxAmount: number
  }

  if (!email || !arrival || !departure) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const safeLang = (['fr', 'en', 'it'].includes(lang) ? lang : 'fr') as Lang
  const grandTotal = (totalRental || 0) + (taxAmount || 0)
  const saving = Math.round((totalRental || 0) * 0.15)
  const unsubToken = Buffer.from(`${email}:${Date.now()}`).toString('base64url')

  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey || resendKey === 're_COLLER_ICI_VOTRE_CLE_RESEND') {
    return NextResponse.json({ error: 'Email not configured' }, { status: 500 })
  }

  const html = buildHtml({
    email, lang: safeLang,
    arrival: String(arrival), departure: String(departure),
    nights: Number(nights), guests: Number(guests),
    totalRental: Number(totalRental), taxAmount: Number(taxAmount),
    grandTotal, saving, unsubToken,
  })

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Villa Vénus Noto <contact@villavenusnoto.com>',
      to: [email],
      subject: (L[safeLang] ?? L.fr).subject,
      html,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: err }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
