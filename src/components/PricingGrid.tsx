import { createClient } from '@supabase/supabase-js'
import type { Lang } from '@/lib/i18n'

// ─── Traductions inline (composant serveur — pas de LanguageContext) ──────────

const T = {
  fr: {
    subtitle: 'Tarifs',
    title: 'À partir de 580 € / nuit',
    tagline: "Jusqu'à 9 personnes · 6 nuits minimum · Saison avril – octobre",
    direct: 'Réservation directe · Sans commission de plateforme',
    direct_sub: "Réservez ici et économisez les 15–20 % de commission Airbnb.",
    period: 'Période',
    per_night: '/ nuit',
    min6: 'Minimum (6 nuits)',
    week7: 'Semaine (7 nuits)',
    included_title: 'Tout est inclus dans le tarif',
    included: [
      'Linge de lit et serviettes',
      'Wi-Fi haut débit',
      'Parking privé',
      'Eau',
      'Électricité',
      'Climatisation',
      'Ménage de fin de séjour',
    ],
    extra_title: 'En supplément',
    extra: [
      'Taxe de séjour communale · 3 € / personne / nuit · réglée sur place',
      'Enfants de moins de 14 ans et personnes de plus de 75 ans : exonérés',
    ],
    deposit: (year: number) => `Caution : aucune (saison ${year})`,
    cta: 'Vérifier les disponibilités',
    fallback_low: 'Début & fin de saison',
    fallback_mid: 'Saison intermédiaire',
    fallback_high: 'Haute saison',
    fallback_peak: 'Pleine saison',
  },
  en: {
    subtitle: 'Rates',
    title: 'From €580 / night',
    tagline: 'Up to 9 guests · 6 nights minimum · Season April – October',
    direct: 'Direct booking · No platform commission',
    direct_sub: 'Book here and save the 15–20% Airbnb commission.',
    period: 'Period',
    per_night: '/ night',
    min6: 'Minimum (6 nights)',
    week7: 'Week (7 nights)',
    included_title: 'Everything is included in the rate',
    included: [
      'Bed linen & towels',
      'High-speed Wi-Fi',
      'Private parking',
      'Water',
      'Electricity',
      'Air conditioning',
      'End-of-stay cleaning',
    ],
    extra_title: 'Not included',
    extra: [
      'Local tourist tax · €3 / person / night · payable on site',
      'Children under 14 and persons over 75: exempt',
    ],
    deposit: (year: number) => `Security deposit: none (${year} season)`,
    cta: 'Check availability',
    fallback_low: 'Early & late season',
    fallback_mid: 'Mid season',
    fallback_high: 'High season',
    fallback_peak: 'Peak season',
  },
  it: {
    subtitle: 'Tariffe',
    title: 'Da 580 € / notte',
    tagline: 'Fino a 9 ospiti · 6 notti minimo · Stagione aprile – ottobre',
    direct: 'Prenotazione diretta · Senza commissioni di piattaforma',
    direct_sub: 'Prenotate qui e risparmiate le commissioni Airbnb (15–20%).',
    period: 'Periodo',
    per_night: '/ notte',
    min6: 'Minimo (6 notti)',
    week7: 'Settimana (7 notti)',
    included_title: 'Tutto incluso nella tariffa',
    included: [
      'Biancheria da letto e asciugamani',
      'Wi-Fi ad alta velocità',
      'Parcheggio privato',
      'Acqua',
      'Elettricità',
      'Aria condizionata',
      'Pulizie di fine soggiorno',
    ],
    extra_title: 'Non incluso',
    extra: [
      'Tassa di soggiorno comunale · 3 € / persona / notte · pagata in loco',
      'Bambini sotto i 14 anni e persone sopra i 75 anni: esenti',
    ],
    deposit: (year: number) => `Caparra: nessuna (stagione ${year})`,
    cta: 'Verifica disponibilità',
    fallback_low: 'Inizio & fine stagione',
    fallback_mid: 'Stagione intermedia',
    fallback_high: 'Alta stagione',
    fallback_peak: 'Piena stagione',
  },
}

// ─── Fetch pricing data from Supabase ────────────────────────────────────────

type PricingRow = { date: string; price: number }
type Period = { label: string; startDate: string; endDate: string; price: number }

function groupIntoPeriods(rows: PricingRow[], lang: Lang): Period[] {
  if (!rows.length) return []
  const t = T[lang]
  const periods: Period[] = []
  let cur: PricingRow & { start: string } = { ...rows[0], start: rows[0].date }

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    const prev = rows[i - 1]
    const gap = (new Date(row.date).getTime() - new Date(prev.date).getTime()) / 86400000
    if (row.price !== cur.price || gap > 2) {
      periods.push({ label: labelForPrice(cur.price, t), startDate: cur.start, endDate: cur.date, price: cur.price })
      cur = { ...row, start: row.date }
    } else {
      cur.date = row.date
    }
  }
  periods.push({ label: labelForPrice(cur.price, t), startDate: cur.start, endDate: cur.date, price: cur.price })
  return periods
}

function labelForPrice(price: number, t: typeof T.fr): string {
  if (price <= 580) return t.fallback_low
  if (price <= 680) return t.fallback_mid
  if (price <= 780) return t.fallback_high
  return t.fallback_peak
}

function formatDateRange(start: string, end: string, lang: Lang): string {
  const locale = lang === 'fr' ? 'fr-FR' : lang === 'it' ? 'it-IT' : 'en-GB'
  const s = new Date(start + 'T12:00:00')
  const e = new Date(end + 'T12:00:00')
  const fmt = (d: Date) => d.toLocaleDateString(locale, { day: 'numeric', month: 'short' })
  return `${fmt(s)} – ${fmt(e)}`
}

function nextSeasonYear(): number {
  const d = new Date()
  return d.getMonth() >= 10 ? d.getFullYear() + 1 : d.getFullYear()
}

function staticPeriods(lang: Lang, year: number): Period[] {
  const t = T[lang]
  return [
    { label: t.fallback_low,  startDate: `${year}-04-01`, endDate: `${year}-05-15`, price: 580 },
    { label: t.fallback_mid,  startDate: `${year}-05-16`, endDate: `${year}-06-30`, price: 680 },
    { label: t.fallback_high, startDate: `${year}-07-01`, endDate: `${year}-08-14`, price: 780 },
    { label: t.fallback_peak, startDate: `${year}-08-15`, endDate: `${year}-08-31`, price: 880 },
    { label: t.fallback_mid,  startDate: `${year}-09-01`, endDate: `${year}-09-30`, price: 680 },
    { label: t.fallback_low,  startDate: `${year}-10-01`, endDate: `${year}-10-31`, price: 580 },
  ]
}

type PricingResult = { periods: Period[]; seasonYear: number }

async function fetchPricingData(lang: Lang): Promise<PricingResult> {
  const fallbackYear = nextSeasonYear()
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const today = new Date().toISOString().slice(0, 10)
    const maxYear = new Date().getFullYear() + 2
    const { data, error } = await supabase
      .from('pricing')
      .select('date, price')
      .gte('date', today)
      .lte('date', `${maxYear}-10-31`)
      .not('price', 'is', null)
      .gt('price', 0)
      .order('date')

    if (error || !data?.length) return { periods: staticPeriods(lang, fallbackYear), seasonYear: fallbackYear }

    // Trouver la première saison (avr–oct) avec assez de jours tarifés
    const years = [...new Set(data.map(r => +r.date.slice(0, 4)))].sort()
    let seasonYear = fallbackYear
    for (const y of years) {
      const count = data.filter(r => {
        const mo = +r.date.slice(5, 7)
        return +r.date.slice(0, 4) === y && mo >= 4 && mo <= 10
      }).length
      if (count >= 7) { seasonYear = y; break }
    }

    const seasonRows = data.filter(r => {
      const mo = +r.date.slice(5, 7)
      return +r.date.slice(0, 4) === seasonYear && mo >= 4 && mo <= 10
    }) as PricingRow[]

    const periods = groupIntoPeriods(seasonRows, lang).filter(p => p.price > 0)
    return { periods, seasonYear }
  } catch {
    return { periods: staticPeriods(lang, fallbackYear), seasonYear: fallbackYear }
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export default async function PricingGrid({ locale }: { locale: Lang }) {
  const t = T[locale]
  const { periods, seasonYear } = await fetchPricingData(locale)

  return (
    <section id="tarifs" className="py-24 lg:py-32 bg-navy text-white">
      <div className="max-w-5xl mx-auto px-6">

        {/* Badge direct booking */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-3 bg-gold/10 border border-gold/40 px-6 py-3">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gold shrink-0">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
            </svg>
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold">{t.direct}</span>
          </div>
        </div>

        {/* En-tête */}
        <div className="text-center mb-12">
          <p className="font-sans text-xs tracking-[0.35em] uppercase text-gold/70 mb-4">{t.subtitle}</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">{t.title}</h2>
          <p className="font-sans text-white/60 text-sm tracking-wide">{t.tagline}</p>
        </div>

        {/* Grille tarifaire */}
        <div className="overflow-x-auto mb-12">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left font-sans text-xs tracking-[0.2em] uppercase text-white/50 pb-4 pr-6">{t.period}</th>
                <th className="text-right font-sans text-xs tracking-[0.2em] uppercase text-white/50 pb-4 px-4">{t.per_night}</th>
                <th className="text-right font-sans text-xs tracking-[0.2em] uppercase text-white/50 pb-4 px-4">{t.min6}</th>
                <th className="text-right font-sans text-xs tracking-[0.2em] uppercase text-white/50 pb-4 pl-4">{t.week7}</th>
              </tr>
            </thead>
            <tbody>
              {periods.map((p, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 pr-6">
                    <p className="font-serif text-base text-white">{p.label}</p>
                    <p className="font-sans text-xs text-white/40 mt-0.5">{formatDateRange(p.startDate, p.endDate, locale)}</p>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="font-serif text-xl text-gold">{(p.price ?? 0).toLocaleString('fr-FR')} €</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="font-sans text-sm text-white/70">{((p.price ?? 0) * 6).toLocaleString('fr-FR')} €</span>
                  </td>
                  <td className="py-4 pl-4 text-right">
                    <span className="font-sans text-sm text-white/70">{((p.price ?? 0) * 7).toLocaleString('fr-FR')} €</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Inclus / non inclus */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 p-6">
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-gold mb-5">{t.included_title}</p>
            <ul className="space-y-3">
              {t.included.map((item) => (
                <li key={item} className="flex items-start gap-3 font-sans text-sm text-white/80">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gold shrink-0 mt-0.5">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 p-6">
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-white/40 mb-5">{t.extra_title}</p>
            <ul className="space-y-3 mb-6">
              {t.extra.map((item) => (
                <li key={item} className="flex items-start gap-3 font-sans text-sm text-white/60">
                  <span className="text-white/30 font-bold shrink-0 leading-none mt-0.5">+</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="font-sans text-xs text-white/40 border-t border-white/10 pt-4">{t.deposit(seasonYear)}</p>
            <p className="font-sans text-xs text-gold/60 mt-2">{t.direct_sub}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#calendrier"
            data-track="pricing_cta_click"
            className="inline-block bg-gold text-navy font-sans text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-gold-light transition-colors"
          >
            {t.cta}
          </a>
        </div>

      </div>
    </section>
  )
}
