import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout from '@/components/PageLayout'
import type { Lang } from '@/lib/i18n'

const BASE = 'https://www.villavenusnoto.com'
const LOCALES: Lang[] = ['fr', 'en', 'it']

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }))
}

const META = {
  fr: {
    title: 'Tarifs et disponibilités — Villa Vénus Noto, Sicile',
    description: 'Location villa à partir de 580 €/nuit pour 9 personnes. Grille haute/basse saison, ce qui est inclus, minimum 6 nuits. Consultez les disponibilités.',
  },
  en: {
    title: 'Rates & Availability — Villa Vénus Noto, Sicily',
    description: 'Villa rental from €580/night for up to 9 guests. High/low season pricing, what\'s included, 6-night minimum. Check available dates.',
  },
  it: {
    title: 'Tariffe e disponibilità — Villa Vénus Noto, Sicilia',
    description: 'Affitto villa da 580 €/notte per 9 persone. Prezzi alta/bassa stagione, servizi inclusi, minimo 6 notti. Verifica le date disponibili.',
  },
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Lang
  if (!META[locale]) return {}
  const { title, description } = META[locale]
  return {
    title, description,
    alternates: {
      canonical: `${BASE}/${locale}/tarifs`,
      languages: { fr: `${BASE}/fr/tarifs`, en: `${BASE}/en/tarifs`, it: `${BASE}/it/tarifs`, 'x-default': `${BASE}/fr/tarifs` },
    },
    openGraph: { title, description, url: `${BASE}/${locale}/tarifs`, siteName: 'Villa Vénus Noto', images: [{ url: '/og-image.jpg', width: 1200, height: 630 }] },
  }
}

const CONTENT = {
  fr: {
    breadcrumb: 'Tarifs',
    h1: 'Tarifs et disponibilités',
    intro: "La villa se loue à la semaine ou plus, en réservation directe avec les propriétaires — sans commission d'agence ni frais de plateforme. Le prix que vous voyez est le prix que vous payez.",
    season_label: 'Saison ouverte',
    season_val: 'Avril à octobre',
    min_label: 'Séjour minimum',
    min_val: '6 nuits',
    cap_label: 'Capacité',
    cap_val: 'Jusqu'à 9 personnes',
    from_label: 'Tarif à partir de',
    from_val: '580 € / nuit',
    pricing_h2: 'Grille tarifaire',
    pricing_note: "Les tarifs varient selon la période et la durée du séjour. Contactez-nous pour un devis personnalisé — nous indiquons ci-dessous les fourchettes indicatives pour chaque saison.",
    seasons: [
      { label: 'Basse saison', period: 'Avril · Mai · Octobre', price: 'Dès 580 € / nuit', note: 'Idéal pour l'Infiorata (mai) ou la douceur d'octobre' },
      { label: 'Moyenne saison', period: 'Juin · Septembre', price: '[À confirmer] € / nuit', note: 'Mer à bonne température, fréquentation raisonnable' },
      { label: 'Haute saison', period: 'Juillet · Août', price: '[À confirmer] € / nuit', note: 'Plein été sicilien — réserver 6 à 12 mois à l'avance' },
    ],
    included_h2: 'Ce qui est inclus',
    included: ['Accès piscine privée (14 m × 7 m)', 'Linge de maison (draps, serviettes de bain)', 'Serviettes de piscine', 'Wi-Fi haut débit', 'Climatisation dans toutes les suites', 'Parking privé sur le domaine', 'Four à bois, barbecue, plancha', 'Cuisine extérieure sur le rooftop'],
    not_included_h2: 'Options et suppléments',
    not_included: ['Chef privé à domicile — sur devis', 'Transferts aéroport — sur devis', 'Ménage en cours de séjour — sur devis', 'Courses livrées à la villa — [À confirmer]', 'Cours de cuisine sicilienne — sur devis', 'Excursions et location de voiture — sur devis'],
    conditions_h2: 'Conditions de réservation',
    conditions_note: 'Les conditions complètes (acompte, solde, annulation) sont confirmées au moment du devis. Consultez également notre page conditions de réservation.',
    conditions: ['Acompte : [À confirmer] % à la réservation', 'Solde : [À confirmer] jours avant l'arrivée', 'Annulation : [À confirmer] — politique à confirmer avec les propriétaires', 'Taxe de séjour : 3 € / nuit / personne (max. 6 nuits par personne)'],
    cta_cal: 'Voir les disponibilités en direct →',
    cta_contact: 'Demander un devis →',
    link_villa: '← La villa',
    link_services: 'Services inclus →',
  },
  en: {
    breadcrumb: 'Rates',
    h1: 'Rates & availability',
    intro: "The villa is rented by the week or longer, through direct booking with the owners — no agency commission, no platform fees. The price you see is the price you pay.",
    season_label: 'Open season',
    season_val: 'April to October',
    min_label: 'Minimum stay',
    min_val: '6 nights',
    cap_label: 'Capacity',
    cap_val: 'Up to 9 guests',
    from_label: 'Rates from',
    from_val: '€580 / night',
    pricing_h2: 'Pricing guide',
    pricing_note: "Rates vary by period and length of stay. Contact us for a personalised quote — below are indicative ranges for each season.",
    seasons: [
      { label: 'Low season', period: 'April · May · October', price: 'From €580 / night', note: 'Perfect for the Infiorata (May) or mild October weather' },
      { label: 'Mid season', period: 'June · September', price: '[To confirm] € / night', note: 'Sea at a good temperature, reasonable crowds' },
      { label: 'High season', period: 'July · August', price: '[To confirm] € / night', note: 'Full Sicilian summer — book 6 to 12 months ahead' },
    ],
    included_h2: "What's included",
    included: ['Private pool access (14 m × 7 m)', 'Bed linen (sheets and bath towels)', 'Pool towels', 'High-speed Wi-Fi', 'Air conditioning in all suites', 'Private parking', 'Wood-fired oven, BBQ, plancha', 'Outdoor kitchen on the rooftop'],
    not_included_h2: 'Options & extras',
    not_included: ['Private chef — on request', 'Airport transfers — on request', 'Mid-stay cleaning — on request', 'Groceries delivered to the villa — [To confirm]', 'Sicilian cooking classes — on request', 'Excursions and car hire — on request'],
    conditions_h2: 'Booking conditions',
    conditions_note: 'Full conditions (deposit, balance, cancellation) are confirmed at the time of the quote. See also our booking conditions page.',
    conditions: ['Deposit: [To confirm] % at booking', 'Balance: [To confirm] days before arrival', 'Cancellation: [To confirm] — policy to confirm with owners', 'Tourist tax: €3 / night / person (max. 6 nights per person)'],
    cta_cal: 'View live availability →',
    cta_contact: 'Request a quote →',
    link_villa: '← The villa',
    link_services: 'Included services →',
  },
  it: {
    breadcrumb: 'Tariffe',
    h1: 'Tariffe e disponibilità',
    intro: "La villa si affitta a settimana o più, con prenotazione diretta con i proprietari — senza commissioni di agenzia né spese di piattaforma. Il prezzo che vedete è il prezzo che pagate.",
    season_label: 'Stagione aperta',
    season_val: 'Da aprile a ottobre',
    min_label: 'Soggiorno minimo',
    min_val: '6 notti',
    cap_label: 'Capacità',
    cap_val: 'Fino a 9 ospiti',
    from_label: 'Tariffe a partire da',
    from_val: '580 € / notte',
    pricing_h2: 'Griglia tariffaria',
    pricing_note: "Le tariffe variano in base al periodo e alla durata del soggiorno. Contattateci per un preventivo personalizzato — di seguito le indicazioni approssimative per ogni stagione.",
    seasons: [
      { label: 'Bassa stagione', period: 'Aprile · Maggio · Ottobre', price: 'Da 580 € / notte', note: 'Ideale per l'Infiorata (maggio) o la mite ottobre' },
      { label: 'Media stagione', period: 'Giugno · Settembre', price: '[Da confermare] € / notte', note: 'Mare a buona temperatura, affluenza ragionevole' },
      { label: 'Alta stagione', period: 'Luglio · Agosto', price: '[Da confermare] € / notte', note: 'Piena estate siciliana — prenotare con 6-12 mesi di anticipo' },
    ],
    included_h2: 'Incluso nel noleggio',
    included: ['Accesso piscina privata (14 m × 7 m)', 'Biancheria da letto (lenzuola e asciugamani da bagno)', 'Asciugamani da piscina', 'Wi-Fi ad alta velocità', 'Aria condizionata in tutte le suite', 'Parcheggio privato', 'Forno a legna, barbecue, plancha', 'Cucina esterna sul rooftop'],
    not_included_h2: 'Opzioni e supplementi',
    not_included: ['Chef privato — su richiesta', 'Trasferimenti aeroporto — su richiesta', 'Pulizie a metà soggiorno — su richiesta', 'Spesa consegnata alla villa — [Da confermare]', 'Corsi di cucina siciliana — su richiesta', 'Escursioni e noleggio auto — su richiesta'],
    conditions_h2: 'Condizioni di prenotazione',
    conditions_note: 'Le condizioni complete (caparra, saldo, cancellazione) sono confermate al momento del preventivo. Consultate anche la nostra pagina condizioni di prenotazione.',
    conditions: ['Caparra: [Da confermare] % alla prenotazione', 'Saldo: [Da confermare] giorni prima dell'arrivo', 'Cancellazione: [Da confermare] — politica da confermare con i proprietari', 'Tassa di soggiorno: 3 € / notte / persona (max. 6 notti per persona)'],
    cta_cal: 'Vedi disponibilità in tempo reale →',
    cta_contact: 'Richiedi un preventivo →',
    link_villa: '← La villa',
    link_services: 'Servizi inclusi →',
  },
}

export default function TarifsPage({ params }: { params: { locale: string } }) {
  const locale = (LOCALES.includes(params.locale as Lang) ? params.locale : 'fr') as Lang
  const c = CONTENT[locale]

  return (
    <PageLayout lang={locale} page="tarifs" breadcrumb={c.breadcrumb}>

      <div className="mb-14">
        <p className="section-subtitle">{locale === 'fr' ? 'Réservation directe' : locale === 'en' ? 'Direct booking' : 'Prenotazione diretta'}</p>
        <h1 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight mb-6">{c.h1}</h1>
        <div className="gold-divider" />
        <p className="font-sans text-muted text-base leading-relaxed max-w-2xl">{c.intro}</p>
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
        {[
          { label: c.season_label, value: c.season_val },
          { label: c.min_label, value: c.min_val },
          { label: c.cap_label, value: c.cap_val },
          { label: c.from_label, value: c.from_val },
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-gold/20 p-6">
            <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-gold mb-2">{stat.label}</p>
            <p className="font-serif text-lg text-charcoal leading-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Pricing seasons */}
      <section className="mb-14">
        <h2 className="font-serif text-2xl text-charcoal mb-3">{c.pricing_h2}</h2>
        <div className="w-10 h-px bg-gold mb-6" />
        <p className="font-sans text-muted text-sm mb-8 max-w-xl">{c.pricing_note}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {c.seasons.map((s, i) => (
            <div key={i} className={`p-6 border ${i === 2 ? 'border-gold bg-gold/5' : 'border-gold/20 bg-white'}`}>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold mb-2">{s.label}</p>
              <p className="font-sans text-xs text-muted mb-4 leading-relaxed">{s.period}</p>
              <p className="font-serif text-xl text-charcoal mb-3">{s.price}</p>
              <p className="font-sans text-xs text-muted italic">{s.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Included / Not included */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
        <section className="bg-linen border border-gold/20 p-6">
          <h2 className="font-serif text-xl text-charcoal mb-4">{c.included_h2}</h2>
          <ul className="space-y-2">
            {c.included.map(item => (
              <li key={item} className="font-sans text-sm text-charcoal flex items-start gap-2">
                <span className="text-gold mt-0.5 flex-shrink-0">✓</span>{item}
              </li>
            ))}
          </ul>
        </section>
        <section className="bg-white border border-gold/20 p-6">
          <h2 className="font-serif text-xl text-charcoal mb-4">{c.not_included_h2}</h2>
          <ul className="space-y-2">
            {c.not_included.map(item => (
              <li key={item} className="font-sans text-sm text-muted flex items-start gap-2">
                <span className="text-charcoal/30 mt-0.5 flex-shrink-0">+</span>{item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Conditions */}
      <section className="mb-14 border-l-4 border-gold pl-6">
        <h2 className="font-serif text-xl text-charcoal mb-3">{c.conditions_h2}</h2>
        <p className="font-sans text-sm text-muted mb-4">{c.conditions_note}</p>
        <ul className="space-y-1">
          {c.conditions.map(item => (
            <li key={item} className="font-sans text-sm text-charcoal">{item}</li>
          ))}
        </ul>
      </section>

      {/* Calendar CTA */}
      <section className="bg-navy text-white p-8 mb-8">
        <p className="font-sans text-white/60 text-sm mb-4">
          {locale === 'fr' ? 'Vérifiez les dates disponibles directement sur notre calendrier interactif.' : locale === 'en' ? 'Check available dates directly on our interactive calendar.' : 'Verificate le date disponibili direttamente sul nostro calendario interattivo.'}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href={`/${locale}#disponibilites`}
            className="font-sans text-xs tracking-widest uppercase px-8 py-3 bg-gold text-white hover:bg-gold/80 transition-all duration-300">
            {c.cta_cal}
          </Link>
          <Link href={`/${locale}#contact`}
            className="font-sans text-xs tracking-widest uppercase px-8 py-3 border border-white/60 text-white hover:bg-white hover:text-navy transition-all duration-300">
            {c.cta_contact}
          </Link>
        </div>
      </section>

      {/* Internal nav */}
      <div className="flex flex-wrap gap-4">
        <Link href={`/${locale}/villa`}
          className="font-sans text-xs tracking-widest uppercase px-6 py-3 border border-navy text-navy hover:bg-navy hover:text-white transition-all duration-300">
          {c.link_villa}
        </Link>
        <Link href={`/${locale}/services`}
          className="font-sans text-xs tracking-widest uppercase px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-white transition-all duration-300">
          {c.link_services}
        </Link>
      </div>

    </PageLayout>
  )
}
