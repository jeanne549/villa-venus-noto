import Link from 'next/link'
import Image from 'next/image'
import type { Lang } from '@/lib/i18n'
import { pageUrl } from '@/lib/routes'

const FLAGS: { lang: Lang; flag: string }[] = [
  { lang: 'fr', flag: '🇫🇷' },
  { lang: 'it', flag: '🇮🇹' },
  { lang: 'en', flag: '🇬🇧' },
  { lang: 'de', flag: '🇩🇪' },
]

const UI = {
  fr: { home: 'Accueil', book: 'Réserver', bookSub: 'Réservez votre séjour à Noto', bookDesc: "Dès 580 €/nuit · Jusqu'à 9 personnes · 6 nuits minimum · Sans commission", bookCta: 'Demander les disponibilités', legal: 'Mentions légales', legalHref: '/mentions-legales', cond: 'Conditions', condHref: '/conditions-de-reservation' },
  en: { home: 'Home', book: 'Book', bookSub: 'Book your stay in Noto', bookDesc: 'From €580/night · Up to 9 guests · 6-night minimum · No commission', bookCta: 'Check availability', legal: 'Legal notice', legalHref: '/legal-notice', cond: 'Booking conditions', condHref: '/booking-conditions' },
  it: { home: 'Home', book: 'Prenota', bookSub: 'Prenota il tuo soggiorno a Noto', bookDesc: 'Da 580 €/notte · Fino a 9 ospiti · Minimo 6 notti · Senza commissioni', bookCta: 'Verifica disponibilità', legal: 'Note legali', legalHref: '/note-legali', cond: 'Condizioni', condHref: '/condizioni-di-prenotazione' },
  de: { home: 'Startseite', book: 'Buchen', bookSub: 'Buchen Sie Ihren Aufenthalt in Noto', bookDesc: 'Ab 580 €/Nacht · Bis zu 9 Personen · Mindestens 6 Nächte · Ohne Provision', bookCta: 'Verfügbarkeit prüfen', legal: 'Impressum', legalHref: '/impressum', cond: 'Buchungsbedingungen', condHref: '/buchungsbedingungen' },
}

interface Props {
  lang: Lang
  page: string
  breadcrumb: string
  heroImg?: string
  heroAlt?: string
  children: React.ReactNode
}

export default function PageLayout({ lang, page, breadcrumb, heroImg, heroAlt, children }: Props) {
  const ui = UI[lang]
  return (
    <div className="min-h-screen bg-cream">

      {/* Header */}
      <header className="bg-navy text-white sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href={`/${lang}`} className="font-display text-sm tracking-[0.2em] uppercase text-white hover:text-gold transition-colors">
            Villa Vénus Noto
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 border-r border-white/20 pr-3">
              {FLAGS.map(({ lang: l, flag }) => (
                <Link key={l} href={`/${l}/${page}`}
                  className={`text-base leading-none transition-all px-1 ${lang === l ? 'opacity-100' : 'opacity-35 hover:opacity-70'}`}
                  aria-label={l.toUpperCase()}>
                  {flag}
                </Link>
              ))}
            </div>
            <Link href={`/${lang}#contact`}
              className="font-sans text-[10px] tracking-widest uppercase px-4 py-2 border border-white/60 text-white hover:bg-white hover:text-navy transition-all duration-300 hidden sm:block">
              {ui.book}
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-linen border-b border-gold/20">
        <div className="max-w-5xl mx-auto px-6 py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-sans text-xs text-muted">
            <Link href={`/${lang}`} className="hover:text-gold transition-colors">{ui.home}</Link>
            <span className="text-gold/60">›</span>
            <span className="text-charcoal">{breadcrumb}</span>
          </nav>
        </div>
      </div>

      {/* Optional hero image */}
      {heroImg && (
        <div className="relative h-64 md:h-80 overflow-hidden">
          <Image src={heroImg} alt={heroAlt ?? ''} fill sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-navy/30" />
        </div>
      )}

      {/* Page content */}
      <main className="max-w-5xl mx-auto px-6 py-14">
        {children}
      </main>

      {/* Booking CTA */}
      <section className="bg-navy py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-display text-[10px] tracking-[0.5em] uppercase text-gold mb-4">
            {lang === 'fr' ? 'Réservation directe · Sans commission' : lang === 'en' ? 'Direct booking · No commission' : lang === 'de' ? 'Direktbuchung · Ohne Provision' : 'Prenotazione diretta · Senza commissioni'}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4 leading-tight">{ui.bookSub}</h2>
          <p className="font-sans text-white/60 text-sm mb-8">{ui.bookDesc}</p>
          <Link href={`/${lang}#contact`}
            className="inline-block font-sans text-xs tracking-widest uppercase px-10 py-4 bg-gold text-white hover:bg-gold/80 transition-all duration-300">
            {ui.bookCta}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-xs text-white/40 tracking-wide">
          <p>© {new Date().getFullYear()} Villa Vénus Noto</p>
          <div className="flex flex-wrap justify-center gap-5">
            <Link href={`/${lang}`} className="hover:text-white/80 transition-colors">{ui.home}</Link>
            <Link href={`/${lang}/villa`} className="hover:text-white/80 transition-colors">Villa</Link>
            <Link href={pageUrl('tarifs', lang)} className="hover:text-white/80 transition-colors">{lang === 'fr' ? 'Tarifs' : lang === 'en' ? 'Rates' : lang === 'de' ? 'Preise' : 'Tariffe'}</Link>
            <Link href={`/${lang}#contact`} className="hover:text-white/80 transition-colors">{ui.book}</Link>
            <Link href={ui.legalHref} className="hover:text-white/80 transition-colors">{ui.legal}</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
