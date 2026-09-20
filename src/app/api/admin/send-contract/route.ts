import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function formatDate(d: string | null) {
  if (!d) return '—'
  return new Date(d + 'T12:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function nightsBetween(a: string, b: string) {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000)
}

function buildContractHtml(r: Record<string, unknown>, nights: number, total: number) {
  const deposit = Math.round(total * 0.5)
  const balance = total - deposit
  const taxNights = Math.min(nights, 6)
  const taxAmount = 1 * Number(r.guests) * taxNights

  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><style>
  body{font-family:Georgia,serif;max-width:700px;margin:0 auto;color:#1a1a1a;background:#fdfaf6}
  .header{background:#1a2744;padding:28px 36px}
  .header p{color:#C8963E;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin:0;font-family:sans-serif}
  .body{padding:36px;border:1px solid #e8e0d0;border-top:none}
  h1{font-size:22px;color:#1a2744;margin:0 0 6px}
  .sub{font-family:sans-serif;font-size:12px;color:#888;margin:0 0 32px}
  .divider{width:40px;height:1px;background:#C8963E;margin:24px 0}
  h2{font-size:14px;font-family:sans-serif;text-transform:uppercase;letter-spacing:3px;color:#888;margin:32px 0 12px;padding-top:24px;border-top:1px solid #e8e0d0}
  h2:first-of-type{border-top:none;padding-top:0;margin-top:0}
  table{width:100%;border-collapse:collapse;font-family:sans-serif;font-size:13px;margin-bottom:12px}
  td{padding:6px 0;border-bottom:1px solid #f0ebe0;vertical-align:top}
  td:first-child{color:#888;width:45%}
  .total-row td{border-bottom:none;border-top:2px solid #C8963E;padding-top:10px;font-weight:bold;font-size:15px}
  .total-row td:last-child{color:#C8963E}
  .clause{font-family:sans-serif;font-size:13px;color:#444;line-height:1.7;margin-bottom:12px}
  .sign-box{border:1px solid #e8e0d0;padding:20px;margin-top:8px;background:white}
  .sign-line{border-bottom:1px solid #ccc;width:100%;height:32px;margin:8px 0}
  .footer{padding:16px 36px;background:#1a2744;text-align:center}
  .footer p{color:rgba(255,255,255,0.4);font-family:sans-serif;font-size:10px;letter-spacing:2px;margin:0}
</style></head>
<body>
<div class="header"><p>Villa Vénus Noto · Contrat de Location Saisonnière</p></div>
<div class="body">

  <h1>Contrat de Location</h1>
  <p class="sub">Référence : VVN-${new Date().getFullYear()}-${String(r.id).slice(-6).toUpperCase()}</p>
  <div class="divider"></div>

  <h2>Article 1 — Parties</h2>
  <table>
    <tr><td>Bailleur</td><td><strong>Jeanne Deschaux</strong>, propriétaire de Villa Vénus Noto, Contrada Spaccazza, 96017 Noto SR, Italie</td></tr>
    <tr><td>Locataire</td><td><strong>${r.name}</strong><br>${r.email}${r.phone ? `<br>${r.phone}` : ''}</td></tr>
  </table>

  <h2>Article 2 — Bien loué</h2>
  <p class="clause">Villa Vénus Noto, Contrada Spaccazza, 96017 Noto SR (Sicile, Italie). Villa individuelle comprenant 4 suites parentales avec salles de bains privatives, piscine privée 14 × 7 m chauffée, rooftop panoramique, cuisine équipée, jardins méditerranéens. Capacité maximale : 9 personnes.</p>

  <h2>Article 3 — Période de location</h2>
  <table>
    <tr><td>Arrivée</td><td><strong>${formatDate(String(r.arrival_date))}</strong> à partir de 16h00</td></tr>
    <tr><td>Départ</td><td><strong>${formatDate(String(r.departure_date))}</strong> avant 11h00</td></tr>
    <tr><td>Durée</td><td><strong>${nights} nuits</strong></td></tr>
    <tr><td>Voyageurs</td><td><strong>${r.guests} personne${Number(r.guests) > 1 ? 's' : ''}</strong> (maximum 9)</td></tr>
  </table>

  <h2>Article 4 — Loyer et conditions de paiement</h2>
  <table>
    <tr><td>Loyer total</td><td><strong>${total.toLocaleString('fr-FR')} €</strong></td></tr>
    <tr><td>Acompte (50 % · dû à la signature)</td><td><strong>${deposit.toLocaleString('fr-FR')} €</strong></td></tr>
    <tr><td>Solde (50 % · dû le jour de l'arrivée)</td><td><strong>${balance.toLocaleString('fr-FR')} €</strong></td></tr>
    <tr><td>Mode de paiement</td><td>Virement bancaire (IBAN fourni séparément)</td></tr>
  </table>
  <p class="clause">La réservation est confirmée à réception de l'acompte et du présent contrat signé. Le solde est versé le jour de l'arrivée, sur place, avant la remise des clés.</p>

  <h2>Article 5 — Taxe de séjour</h2>
  <p class="clause">La taxe de séjour en vigueur dans la commune de Noto est de 1 € par personne et par nuit, plafonnée à 6 nuits. Pour ce séjour : ${r.guests} personne${Number(r.guests) > 1 ? 's' : ''} × ${taxNights} nuits = <strong>${taxAmount} €</strong>. Cette somme est réglée en espèces sur place, directement à l'interlocuteur local.</p>

  <h2>Article 6 — Annulation</h2>
  <p class="clause">Toute annulation doit être notifiée par email à <strong>contact@villavenusnoto.com</strong>.</p>
  <table>
    <tr><td>Plus de 60 jours avant l'arrivée</td><td>Remboursement intégral de l'acompte</td></tr>
    <tr><td>Entre 60 et 30 jours avant l'arrivée</td><td>Remboursement de 50 % de l'acompte</td></tr>
    <tr><td>Moins de 30 jours avant l'arrivée</td><td>Acompte conservé intégralement</td></tr>
  </table>
  <p class="clause">En cas d'annulation par le Bailleur (force majeure exceptée), l'intégralité des sommes versées est remboursée dans un délai de 5 jours ouvrés.</p>

  <h2>Article 7 — État des lieux &amp; dépôt de garantie</h2>
  <p class="clause">Un état des lieux d'entrée et de sortie est réalisé en présence de l'interlocuteur local. Un dépôt de garantie dont le montant sera communiqué séparément peut être demandé au moment de la remise des clés. Il est restitué dans les 7 jours suivant le départ, déduction faite d'éventuels dommages constatés.</p>

  <h2>Article 8 — Règlement intérieur</h2>
  <ul class="clause" style="padding-left:20px">
    <li>Occupation strictement limitée à ${r.guests} personnes. Toute personne supplémentaire doit faire l'objet d'un accord écrit préalable.</li>
    <li>Animaux : non autorisés sauf accord écrit préalable.</li>
    <li>Respect du voisinage : interdiction de nuisances sonores entre 22h00 et 8h00.</li>
    <li>Piscine : usage exclusif des occupants de la villa ; enfants sous surveillance adulte.</li>
    <li>Interdiction de fumer à l'intérieur des espaces clos.</li>
    <li>Le Locataire s'engage à laisser la villa dans l'état dans lequel il l'a trouvée.</li>
  </ul>

  <h2>Article 9 — Obligations légales italiennes</h2>
  <p class="clause">Conformément à la législation italienne, le Locataire est tenu de fournir les pièces d'identité (passeport ou carte nationale d'identité) de tous les occupants majeurs à l'arrivée. Ces données sont transmises aux autorités de police locales via le système Alloggiati Web.</p>

  <h2>Article 10 — Interlocuteur local</h2>
  <p class="clause">M. <strong>Emanuele Di Pietro</strong> est l'interlocuteur local. Il procède à l'accueil, remet les clés et reste disponible pendant toute la durée du séjour pour toute question pratique ou intervention technique.</p>

  <h2>Article 11 — Droit applicable</h2>
  <p class="clause">Le présent contrat est régi par le droit français. En cas de litige, les parties s'engagent à rechercher une solution amiable. À défaut, les tribunaux compétents de Paris sont seuls compétents.</p>

  <div class="divider"></div>

  <p style="font-family:sans-serif;font-size:13px;color:#444;margin-bottom:24px">En signant ce contrat, les deux parties reconnaissent avoir pris connaissance de l'ensemble des conditions ci-dessus et les acceptent.</p>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px">
    <div class="sign-box">
      <p style="font-family:sans-serif;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px">Le Bailleur</p>
      <p style="font-family:sans-serif;font-size:13px;margin:0 0 4px"><strong>Jeanne Deschaux</strong></p>
      <p style="font-family:sans-serif;font-size:12px;color:#888;margin:0 0 16px">Date : ____________________</p>
      <div class="sign-line"></div>
      <p style="font-family:sans-serif;font-size:11px;color:#ccc;margin:4px 0 0">Signature</p>
    </div>
    <div class="sign-box">
      <p style="font-family:sans-serif;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px">Le Locataire</p>
      <p style="font-family:sans-serif;font-size:13px;margin:0 0 4px"><strong>${r.name}</strong></p>
      <p style="font-family:sans-serif;font-size:12px;color:#888;margin:0 0 16px">Date : ____________________</p>
      <div class="sign-line"></div>
      <p style="font-family:sans-serif;font-size:11px;color:#ccc;margin:4px 0 0">Signature</p>
    </div>
  </div>

  <p style="font-family:sans-serif;font-size:11px;color:#aaa;text-align:center;margin-top:32px">
    Pour signer ce contrat : imprimez-le, signez-le et retournez-le par email à contact@villavenusnoto.com<br>
    — ou répondez à cet email en confirmant votre acceptation par écrit.
  </p>
</div>
<div class="footer"><p>Contrada Spaccazza · 96017 Noto SR · Sicilia · contact@villavenusnoto.com</p></div>
</body></html>`
}

export async function POST(req: NextRequest) {
  // Auth basique : même cookie que le reste de l'admin
  const cookie = req.headers.get('cookie') ?? ''
  if (!cookie.includes('villa_admin=')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { requestId: string; totalRental?: number }
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  const { requestId, totalRental } = body
  if (!requestId) return NextResponse.json({ error: 'Missing requestId' }, { status: 400 })

  // Charger la demande
  const { data: r, error: dbErr } = await supabase
    .from('contact_requests')
    .select('*')
    .eq('id', requestId)
    .single()

  if (dbErr || !r) return NextResponse.json({ error: 'Request not found' }, { status: 404 })

  const nights = r.arrival_date && r.departure_date
    ? nightsBetween(r.arrival_date, r.departure_date) : 7
  const total = totalRental ?? (nights * 730) // fallback mi-saison si pas de tarif précis

  const html = buildContractHtml(r, nights, total)

  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey || resendKey === 're_COLLER_ICI_VOTRE_CLE_RESEND') {
    return NextResponse.json({ error: 'Email not configured' }, { status: 500 })
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Villa Vénus Noto <contact@villavenusnoto.com>',
      to: [r.email],
      reply_to: 'contact@villavenusnoto.com',
      subject: `Contrat de location — Villa Vénus Noto · ${formatDate(r.arrival_date)} au ${formatDate(r.departure_date)}`,
      html,
    }),
  })

  if (!res.ok) {
    return NextResponse.json({ error: await res.text() }, { status: 500 })
  }

  // Mettre à jour le statut en 'replied' si encore 'new'
  if (r.status === 'new') {
    await supabase.from('contact_requests').update({ status: 'replied' }).eq('id', requestId)
  }

  return NextResponse.json({ success: true, to: r.email })
}
