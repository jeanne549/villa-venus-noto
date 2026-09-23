import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const RESEND_KEY = process.env.RESEND_API_KEY!
const OWNER_EMAIL = 'jd.deschaux@gmail.com'
const BASE = 'https://www.villavenusnoto.com'

type Lang = 'fr' | 'en' | 'it' | 'de'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function dateShift(base: string, days: number) {
  const d = new Date(base + 'T12:00:00Z')
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

function todayStr() { return new Date().toISOString().slice(0, 10) }

async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_KEY || RESEND_KEY === 're_COLLER_ICI_VOTRE_CLE_RESEND') return
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: 'Villa Vénus Noto <contact@villavenusnoto.com>', to: [to], subject, html }),
  })
}

// ─── J+3 — Rappel propriétaire ───────────────────────────────────────────────

async function remindOwner() {
  const today = todayStr()
  const j3From = dateShift(today, -4) // créé il y a plus de 3 jours
  const j3To   = dateShift(today, -3) // créé il y a moins de 4 jours

  const { data: requests } = await supabase
    .from('contact_requests')
    .select('id,name,email,arrival_date,departure_date,guests,lang,created_at')
    .eq('status', 'new')
    .gte('created_at', j3From + 'T00:00:00Z')
    .lt('created_at',  j3To   + 'T00:00:00Z')

  if (!requests?.length) return 0

  for (const r of requests) {
    await sendEmail(
      OWNER_EMAIL,
      `⏰ J+3 sans réponse — ${r.name} attend · Villa Vénus Noto`,
      `<div style="font-family:sans-serif;max-width:600px;padding:24px;color:#2C2C2C">
        <div style="background:#b91c1c;padding:16px 20px;margin-bottom:20px">
          <p style="color:white;font-weight:bold;font-size:16px;margin:0">⏰ Demande sans réponse depuis 3 jours</p>
        </div>
        <p><strong>Visiteur :</strong> ${r.name} — <a href="mailto:${r.email}">${r.email}</a></p>
        <p><strong>Arrivée souhaitée :</strong> ${r.arrival_date ?? '—'}</p>
        <p><strong>Départ :</strong> ${r.departure_date ?? '—'}</p>
        <p><strong>Personnes :</strong> ${r.guests}</p>
        <p><strong>Langue :</strong> ${r.lang?.toUpperCase()}</p>
        <p><strong>Demande reçue le :</strong> ${r.created_at?.slice(0, 10)}</p>
        <div style="margin-top:20px">
          <a href="mailto:${r.email}" style="background:#1a2744;color:white;padding:12px 24px;text-decoration:none;font-size:12px;letter-spacing:2px;text-transform:uppercase">Répondre maintenant</a>
        </div>
        <p style="color:#888;font-size:12px;margin-top:24px">Ce rappel est envoyé automatiquement à J+3 si le statut est encore "Nouvelle".</p>
      </div>`
    )
  }

  return requests.length
}

// ─── J+5 — Relance douce client ───────────────────────────────────────────────

const CLIENT_FOLLOW: Record<Lang, { subject: string; body: string }> = {
  fr: {
    subject: 'Votre demande de séjour — Villa Vénus Noto',
    body: `Votre demande de réservation est bien enregistrée. Si vous n'avez pas encore eu de réponse de notre part, nous en sommes désolés — votre demande ne nous a peut-être pas atteints correctement. N'hésitez pas à nous répondre directement à cet email ou via WhatsApp : <a href="https://wa.me/33624542995">+33 6 24 54 29 95</a>.`,
  },
  en: {
    subject: 'Your stay request — Villa Vénus Noto',
    body: `Your booking request is on file. If you haven't received a reply from us yet, we apologize — your message may not have reached us properly. Please reply directly to this email or reach us on WhatsApp: <a href="https://wa.me/33624542995">+33 6 24 54 29 95</a>.`,
  },
  it: {
    subject: 'La vostra richiesta di soggiorno — Villa Vénus Noto',
    body: `La vostra richiesta di prenotazione è registrata. Se non avete ancora ricevuto una risposta, ci scusiamo — il messaggio potrebbe non averci raggiunto. Rispondete a questa email o contattateci su WhatsApp: <a href="https://wa.me/33624542995">+33 6 24 54 29 95</a>.`,
  },
  de: {
    subject: 'Ihre Aufenthaltsanfrage — Villa Vénus Noto',
    body: `Ihre Buchungsanfrage liegt vor. Falls Sie noch keine Antwort erhalten haben, entschuldigen wir uns — Ihre Nachricht hat uns möglicherweise nicht erreicht. Bitte antworten Sie direkt auf diese E-Mail oder kontaktieren Sie uns per WhatsApp: <a href="https://wa.me/33624542995">+33 06 24 54 29 95</a>.`,
  },
}

async function followUpClient() {
  const today = todayStr()
  const j5From = dateShift(today, -6)
  const j5To   = dateShift(today, -5)

  const { data: requests } = await supabase
    .from('contact_requests')
    .select('id,name,email,lang,created_at')
    .eq('status', 'new')
    .gte('created_at', j5From + 'T00:00:00Z')
    .lt('created_at',  j5To   + 'T00:00:00Z')

  if (!requests?.length) return 0

  for (const r of requests) {
    const safeLang = (['fr', 'en', 'it', 'de'].includes(r.lang) ? r.lang : 'fr') as Lang
    const c = CLIENT_FOLLOW[safeLang]

    await sendEmail(
      r.email,
      c.subject,
      `<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#2C2C2C">
        <div style="background:#1a2744;padding:20px 32px"><p style="color:#C8963E;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin:0;font-family:sans-serif">Villa Vénus Noto · Noto, Sicilia</p></div>
        <div style="padding:32px;background:#fdfaf6;border:1px solid #e8e0d0">
          <p style="font-size:20px;margin:0 0 16px">Bonjour ${r.name},</p>
          <div style="width:32px;height:1px;background:#C8963E;margin:16px 0"></div>
          <p style="font-family:sans-serif;color:#555;line-height:1.8;font-size:14px">${c.body}</p>
          <div style="margin-top:28px">
            <a href="${BASE}/${safeLang}#contact" style="background:#C8963E;color:white;padding:12px 28px;text-decoration:none;font-family:sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase">
              ${safeLang === 'fr' ? 'Envoyer une nouvelle demande' : safeLang === 'en' ? 'Send a new request' : safeLang === 'it' ? 'Invia una nuova richiesta' : 'Neue Anfrage senden'}
            </a>
          </div>
        </div>
        <div style="padding:14px 32px;background:#1a2744;text-align:center">
          <p style="color:rgba(255,255,255,0.4);font-family:sans-serif;font-size:11px;margin:0">Contrada Spaccazza · 96017 Noto SR · Sicilia · contact@villavenusnoto.com</p>
        </div>
      </div>`
    )
  }

  return requests.length
}

// ─── J-7 — Informations pré-arrivée ──────────────────────────────────────────

const PRE_ARRIVAL: Record<Lang, { subject: string; greeting: string; title: string; items: string[]; closing: string }> = {
  fr: {
    subject: 'Votre séjour approche — Informations pratiques · Villa Vénus Noto',
    greeting: 'Bonjour',
    title: 'Votre séjour à Villa Vénus Noto dans 7 jours',
    items: [
      '<strong>Adresse :</strong> Contrada Spaccazza, 96017 Noto SR, Sicile',
      '<strong>GPS :</strong> <a href="https://maps.google.com/?q=36.887249,15.026392">36.887249, 15.026392</a> — utilisez ce lien depuis votre téléphone',
      '<strong>Check-in :</strong> à partir de 16h00 — contactez Emanuele pour une arrivée différente',
      '<strong>Contact sur place — Emanuele Di Pietro :</strong> il vous accueillera à la villa',
      '<strong>Taxe de séjour :</strong> 1 €/personne/nuit, plafonnée à 6 nuits — à régler en espèces sur place',
      '<strong>Pièces d\'identité :</strong> apportez les documents d\'identité de tous les voyageurs (obligation légale italienne — déclaration aux autorités)',
      '<strong>Check-out :</strong> avant 11h00',
    ],
    closing: 'À très bientôt en Sicile,\nL\'équipe de Villa Vénus Noto',
  },
  en: {
    subject: 'Your stay is approaching — Practical information · Villa Vénus Noto',
    greeting: 'Hello',
    title: 'Your stay at Villa Vénus Noto in 7 days',
    items: [
      '<strong>Address:</strong> Contrada Spaccazza, 96017 Noto SR, Sicily',
      '<strong>GPS:</strong> <a href="https://maps.google.com/?q=36.887249,15.026392">36.887249, 15.026392</a> — use this link from your phone',
      '<strong>Check-in:</strong> from 4:00 PM — contact Emanuele for a different arrival time',
      '<strong>On-site contact — Emanuele Di Pietro:</strong> he will welcome you at the villa',
      '<strong>Tourist tax:</strong> €1/person/night, capped at 6 nights — paid in cash on-site',
      '<strong>ID documents:</strong> bring identity documents for all guests (Italian legal requirement)',
      '<strong>Check-out:</strong> before 11:00 AM',
    ],
    closing: 'See you soon in Sicily,\nThe Villa Vénus Noto team',
  },
  it: {
    subject: 'Il vostro soggiorno si avvicina — Informazioni pratiche · Villa Vénus Noto',
    greeting: 'Buongiorno',
    title: 'Il vostro soggiorno a Villa Vénus Noto tra 7 giorni',
    items: [
      '<strong>Indirizzo:</strong> Contrada Spaccazza, 96017 Noto SR, Sicilia',
      '<strong>GPS:</strong> <a href="https://maps.google.com/?q=36.887249,15.026392">36.887249, 15.026392</a>',
      '<strong>Check-in:</strong> dalle 16:00 — contattate Emanuele per un orario diverso',
      '<strong>Contatto in loco — Emanuele Di Pietro:</strong> vi accoglierà alla villa',
      '<strong>Tassa di soggiorno:</strong> 1 €/persona/notte, max 6 notti — da pagare in contanti in loco',
      '<strong>Documenti d\'identità:</strong> portate i documenti di tutti i viaggiatori (obbligo legale italiano)',
      '<strong>Check-out:</strong> entro le 11:00',
    ],
    closing: 'A presto in Sicilia,\nIl team di Villa Vénus Noto',
  },
  de: {
    subject: 'Ihr Aufenthalt rückt näher — Praktische Informationen · Villa Vénus Noto',
    greeting: 'Guten Tag',
    title: 'Ihr Aufenthalt in der Villa Vénus Noto in 7 Tagen',
    items: [
      '<strong>Adresse:</strong> Contrada Spaccazza, 96017 Noto SR, Sizilien',
      '<strong>GPS:</strong> <a href="https://maps.google.com/?q=36.887249,15.026392">36.887249, 15.026392</a>',
      '<strong>Check-in:</strong> ab 16:00 Uhr — Emanuele kontaktieren für andere Ankunftszeit',
      '<strong>Ansprechpartner vor Ort — Emanuele Di Pietro:</strong> er begrüßt Sie in der Villa',
      '<strong>Kurtaxe:</strong> 1 €/Person/Nacht, max. 6 Nächte — bar vor Ort zu zahlen',
      '<strong>Ausweisdokumente:</strong> Lichtbildausweise für alle Gäste mitbringen (gesetzliche Pflicht in Italien)',
      '<strong>Check-out:</strong> vor 11:00 Uhr',
    ],
    closing: 'Bis bald in Sizilien,\nDas Team der Villa Vénus Noto',
  },
}

async function preArrivalEmails() {
  const target = dateShift(todayStr(), 7)

  const { data: requests } = await supabase
    .from('contact_requests')
    .select('id,name,email,lang,arrival_date,departure_date,guests')
    .eq('status', 'confirmed')
    .eq('arrival_date', target)

  if (!requests?.length) return 0

  for (const r of requests) {
    const safeLang = (['fr', 'en', 'it', 'de'].includes(r.lang) ? r.lang : 'fr') as Lang
    const c = PRE_ARRIVAL[safeLang]

    await sendEmail(
      r.email,
      c.subject,
      `<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#2C2C2C">
        <div style="background:#1a2744;padding:20px 32px"><p style="color:#C8963E;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin:0;font-family:sans-serif">Villa Vénus Noto · Noto, Sicilia</p></div>
        <div style="padding:32px;background:#fdfaf6;border:1px solid #e8e0d0">
          <p style="font-size:20px;margin:0 0 8px">${c.greeting} ${r.name},</p>
          <div style="width:32px;height:1px;background:#C8963E;margin:16px 0"></div>
          <p style="font-family:sans-serif;font-size:16px;font-weight:bold;color:#1a2744">${c.title}</p>
          <ul style="font-family:sans-serif;font-size:14px;color:#555;line-height:2;padding-left:20px;margin:20px 0">
            ${c.items.map(item => `<li>${item}</li>`).join('')}
          </ul>
          <div style="width:32px;height:1px;background:#C8963E;margin:24px 0"></div>
          <p style="font-family:sans-serif;white-space:pre-line;color:#555;font-size:14px">${c.closing}</p>
        </div>
        <div style="padding:14px 32px;background:#1a2744;text-align:center">
          <p style="color:rgba(255,255,255,0.4);font-family:sans-serif;font-size:11px;margin:0">Contrada Spaccazza · 96017 Noto SR · Sicilia · contact@villavenusnoto.com</p>
        </div>
      </div>`
    )
  }

  return requests.length
}

// ─── J+2 — Invitation à laisser un avis ──────────────────────────────────────

const POST_STAY: Record<Lang, { subject: string; greeting: string; body: string; cta: string; cta_google: string }> = {
  fr: {
    subject: 'Merci d\'avoir séjourné à Villa Vénus Noto',
    greeting: 'Bonjour',
    body: 'Nous espérons que votre séjour a été à la hauteur de vos attentes. Si vous avez quelques minutes, votre avis nous serait précieux — il aide d\'autres voyageurs à découvrir la villa et nous aide à nous améliorer.',
    cta: 'Laisser un avis sur le site',
    cta_google: 'Laisser un avis Google',
  },
  en: {
    subject: 'Thank you for staying at Villa Vénus Noto',
    greeting: 'Hello',
    body: 'We hope your stay was everything you expected. If you have a few minutes, a review would be greatly appreciated — it helps other travelers discover the villa and helps us improve.',
    cta: 'Leave a review on our website',
    cta_google: 'Leave a Google review',
  },
  it: {
    subject: 'Grazie per aver soggiornato a Villa Vénus Noto',
    greeting: 'Buongiorno',
    body: 'Speriamo che il vostro soggiorno sia stato all\'altezza delle aspettative. Se avete qualche minuto, la vostra recensione sarebbe molto preziosa — aiuta altri viaggiatori a scoprire la villa.',
    cta: 'Lasciare una recensione sul sito',
    cta_google: 'Lasciare una recensione su Google',
  },
  de: {
    subject: 'Vielen Dank für Ihren Aufenthalt in der Villa Vénus Noto',
    greeting: 'Guten Tag',
    body: 'Wir hoffen, dass Ihr Aufenthalt Ihren Erwartungen entsprochen hat. Falls Sie ein paar Minuten Zeit haben, würde eine Bewertung sehr geschätzt — sie hilft anderen Reisenden, die Villa zu entdecken.',
    cta: 'Bewertung auf unserer Website hinterlassen',
    cta_google: 'Google-Bewertung hinterlassen',
  },
}

async function postStayReviews() {
  const target = dateShift(todayStr(), -2)

  const { data: requests } = await supabase
    .from('contact_requests')
    .select('id,name,email,lang,departure_date')
    .eq('status', 'confirmed')
    .eq('departure_date', target)

  if (!requests?.length) return 0

  const GOOGLE_MAPS_URL = 'https://search.google.com/local/writereview?placeid=ChIJLWhEKoKHERMRvEG9Mqeb-Ow'

  for (const r of requests) {
    const safeLang = (['fr', 'en', 'it', 'de'].includes(r.lang) ? r.lang : 'fr') as Lang
    const c = POST_STAY[safeLang]

    await sendEmail(
      r.email,
      c.subject,
      `<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#2C2C2C">
        <div style="background:#1a2744;padding:20px 32px"><p style="color:#C8963E;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin:0;font-family:sans-serif">Villa Vénus Noto · Noto, Sicilia</p></div>
        <div style="padding:32px;background:#fdfaf6;border:1px solid #e8e0d0;text-align:center">
          <p style="font-size:22px;margin:0 0 8px">${c.greeting} ${r.name},</p>
          <div style="width:32px;height:1px;background:#C8963E;margin:20px auto"></div>
          <p style="font-family:sans-serif;color:#555;line-height:1.8;max-width:400px;margin:0 auto 28px">${c.body}</p>
          <a href="${BASE}/fr#avis" style="display:inline-block;background:#1a2744;color:white;padding:12px 28px;text-decoration:none;font-family:sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin-bottom:12px">${c.cta}</a>
          <br>
          <a href="${GOOGLE_MAPS_URL}" style="display:inline-block;background:#C8963E;color:white;padding:12px 28px;text-decoration:none;font-family:sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin-top:8px">${c.cta_google}</a>
        </div>
        <div style="padding:14px 32px;background:#1a2744;text-align:center">
          <p style="color:rgba(255,255,255,0.4);font-family:sans-serif;font-size:11px;margin:0">Contrada Spaccazza · 96017 Noto SR · Sicilia</p>
        </div>
      </div>`
    )
  }

  return requests.length
}

// ─── Route principale ─────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  // Protection : CRON_SECRET ou header Vercel cron
  const secret = process.env.CRON_SECRET
  if (secret) {
    const auth = req.headers.get('authorization')
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  const [j3, j5, j7, j2] = await Promise.all([
    remindOwner(),
    followUpClient(),
    preArrivalEmails(),
    postStayReviews(),
  ])

  console.log(`[cron/emails] j3=${j3} j5=${j5} j7=${j7} j2=${j2}`)

  return NextResponse.json({
    ok: true,
    date: todayStr(),
    sent: { j3_owner_reminders: j3, j5_client_followups: j5, j7_pre_arrival: j7, j2_review_requests: j2 },
  })
}
