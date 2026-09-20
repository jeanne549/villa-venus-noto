import Link from 'next/link'

const PLATFORM_FEE_PCT = 15

type Lang = 'fr' | 'en' | 'it' | 'de'

const EXAMPLES = [
  {
    nights: 6, rate: 580,
    labels: { fr: '6 nuits · basse saison', en: '6 nights · low season', it: '6 notti · bassa stagione', de: '6 Nächte · Nebensaison' },
  },
  {
    nights: 7, rate: 730,
    labels: { fr: '7 nuits · mi-saison', en: '7 nights · mid-season', it: '7 notti · mezza stagione', de: '7 Nächte · Mittelsaison' },
  },
  {
    nights: 10, rate: 880,
    labels: { fr: '10 nuits · haute saison', en: '10 nights · high season', it: '10 notti · alta stagione', de: '10 Nächte · Hochsaison' },
  },
]

const T: Record<Lang, {
  subtitle: string; title: string; note: string
  col_stay: string; col_direct: string; col_platform: string; col_saving: string
  cta: string; caption: string
}> = {
  fr: {
    subtitle: 'Économie directe',
    title: 'Ce que vous économisez en réservant ici',
    note: 'Les plateformes de location appliquent aux voyageurs des frais de service de 14 à 16 %. Ces exemples utilisent 15 % — la fourchette basse. Votre économie réelle peut être supérieure.',
    col_stay: 'Séjour type', col_direct: 'Ici, en direct', col_platform: 'Via plateforme (+ 15 %)', col_saving: 'Vous économisez',
    cta: 'Vérifier mes dates',
    caption: 'Tarifs indicatifs basés sur les fourchettes de la villa (580 € à 880 €/nuit). Consultez le calendrier pour le montant exact de votre séjour.',
  },
  en: {
    subtitle: 'Direct savings',
    title: 'How much you save by booking here',
    note: 'Booking platforms charge travelers service fees of 14–16%. These examples use 15% — the lower bound. Your actual savings may be higher.',
    col_stay: 'Sample stay', col_direct: 'Here, direct', col_platform: 'Via platform (+15%)', col_saving: 'You save',
    cta: 'Check my dates',
    caption: 'Indicative rates based on the villa\'s pricing range (€580 to €880/night). Check the calendar for your exact stay total.',
  },
  it: {
    subtitle: 'Risparmio diretto',
    title: 'Quanto risparmiate prenotando qui',
    note: 'Le piattaforme di prenotazione applicano ai viaggiatori commissioni di servizio del 14–16 %. Questi esempi usano il 15 % — il minimo. Il risparmio reale può essere superiore.',
    col_stay: 'Soggiorno tipo', col_direct: 'Qui, direttamente', col_platform: 'Tramite piattaforma (+15 %)', col_saving: 'Risparmiate',
    cta: 'Verificare le date',
    caption: 'Prezzi indicativi basati sulle tariffe della villa (580 €–880 €/notte). Consultate il calendario per il totale esatto.',
  },
  de: {
    subtitle: 'Direktersparnis',
    title: 'Ihre Ersparnis bei Direktbuchung',
    note: 'Buchungsplattformen berechnen Reisenden Servicegebühren von 14–16 %. Diese Beispiele verwenden 15 % — den unteren Grenzwert. Ihre tatsächliche Ersparnis kann höher sein.',
    col_stay: 'Beispielaufenthalt', col_direct: 'Direkt hier', col_platform: 'Über Plattform (+15 %)', col_saving: 'Sie sparen',
    cta: 'Termine prüfen',
    caption: 'Richtwerte basierend auf den Preisspannen der Villa (580 €–880 €/Nacht). Prüfen Sie den Kalender für Ihren genauen Gesamtbetrag.',
  },
}

function fmt(n: number) { return n.toLocaleString('fr-FR') + ' €' }

export default function DirectSaving({ lang }: { lang: Lang }) {
  const t = T[lang] ?? T.fr

  return (
    <section className="py-16 bg-navy text-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-10">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold-light mb-3">{t.subtitle}</p>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">{t.title}</h2>
          <div className="w-12 h-px bg-gold mb-5" />
          <p className="font-sans text-sm text-white/60 max-w-xl leading-relaxed">{t.note}</p>
        </div>

        {/* Desktop — tableau */}
        <div className="hidden md:block mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {[t.col_stay, t.col_direct, t.col_platform, t.col_saving].map((h, i) => (
                  <th key={i} className={`pb-3 font-sans text-[10px] tracking-widest uppercase ${i === 3 ? 'text-gold text-right pl-6' : i === 0 ? 'text-white/40 text-left pr-6' : 'text-white/40 text-right px-6'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {EXAMPLES.map(ex => {
                const direct = ex.nights * ex.rate
                const platform = Math.round(direct * (1 + PLATFORM_FEE_PCT / 100))
                const saving = platform - direct
                return (
                  <tr key={`${ex.nights}-${ex.rate}`}>
                    <td className="py-4 pr-6 font-sans text-white/80 text-sm">{ex.labels[lang] ?? ex.labels.fr}</td>
                    <td className="py-4 px-6 font-serif text-2xl text-right text-white">{fmt(direct)}</td>
                    <td className="py-4 px-6 text-right">
                      <span className="font-serif text-xl text-white/30 line-through">{fmt(platform)}</span>
                    </td>
                    <td className="py-4 pl-6 text-right">
                      <span className="inline-block bg-gold text-navy font-sans font-bold text-base px-3 py-1">{fmt(saving)}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile — cartes */}
        <div className="md:hidden space-y-3 mb-8">
          {EXAMPLES.map(ex => {
            const direct = ex.nights * ex.rate
            const platform = Math.round(direct * (1 + PLATFORM_FEE_PCT / 100))
            const saving = platform - direct
            return (
              <div key={`${ex.nights}-${ex.rate}`} className="border border-white/10 p-5">
                <p className="font-sans text-xs text-white/50 mb-4">{ex.labels[lang] ?? ex.labels.fr}</p>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="font-sans text-[10px] tracking-widest uppercase text-white/40 mb-1">{t.col_direct}</p>
                    <p className="font-serif text-2xl text-white">{fmt(direct)}</p>
                    <p className="font-sans text-xs text-white/25 line-through mt-1">{fmt(platform)}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-sans text-[10px] tracking-widest uppercase text-gold mb-1">{t.col_saving}</p>
                    <span className="inline-block bg-gold text-navy font-bold text-xl px-3 py-1">{fmt(saving)}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4 border-t border-white/10">
          <p className="font-sans text-xs text-white/40 leading-relaxed max-w-md">{t.caption}</p>
          <Link href="#disponibilites"
            className="shrink-0 font-sans text-xs tracking-widest uppercase px-8 py-3 bg-gold text-navy hover:bg-gold/90 transition-colors">
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  )
}
