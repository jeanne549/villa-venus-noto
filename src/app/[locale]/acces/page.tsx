import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout from '@/components/PageLayout'
import type { Lang } from '@/lib/i18n'
import { hasPlaceholders } from '@/lib/placeholder'
import JsonLd from '@/components/JsonLd'
import { getBreadcrumbSchema } from '@/lib/structured-data'
import { buildAlternates, pageUrl } from '@/lib/routes'

const BASE = 'https://www.villavenusnoto.com'
const LOCALES: Lang[] = ['fr', 'en', 'it']

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }))
}

const META = {
  fr: { title: 'Comment venir à Villa Vénus Noto — Aéroports, transferts, accès', description: 'Aéroport de Catane à 1h15, Comiso à 45 min. Voiture indispensable. Transferts privés disponibles. Plan d\'accès et coordonnées GPS pour la villa.' },
  en: { title: 'Getting to Villa Vénus Noto — Airports, Transfers & Directions', description: 'Catania airport 1h15, Comiso 45 min. A car is essential. Private airport transfers available. Directions and GPS coordinates for the villa.' },
  it: { title: 'Come arrivare a Villa Vénus Noto — Aeroporti, trasferimenti, accesso', description: 'Aeroporto di Catania a 1h15, Comiso a 45 min. Auto indispensabile. Trasferimenti privati disponibili. Indicazioni stradali e coordinate GPS.' },
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Lang
  if (!META[locale]) return {}
  const { title, description } = META[locale]
  const robots = hasPlaceholders(C[locale]) ? { index: false, follow: true } : { index: true, follow: true }
  return {
    title, description,
    robots,
    alternates: buildAlternates('acces', locale),
    openGraph: { title, description, url: pageUrl('acces', locale), siteName: 'Villa Vénus Noto', images: [{ url: '/og-image.jpg', width: 1200, height: 630 }] },
  }
}

const C = {
  fr: {
    breadcrumb: 'Comment venir',
    sub: 'Accès et transferts',
    h1: 'Comment venir à Villa Vénus Noto',
    intro: "La villa est dans la campagne entre Noto et la mer, à Contrada Spaccazza. La voiture est indispensable — il n'existe pas de transport en commun jusqu'à la villa, et même pour visiter la région. Prévoir de louer ou de venir avec votre véhicule.",
    airports_h2: 'Les deux aéroports',
    airports: [
      { code: 'CIY', name: 'Catane — Fontanarossa', dist: '90 km', time: '1 h 15 environ', desc: "Le plus grand aéroport de Sicile, avec le plus grand nombre de liaisons directes depuis Paris (CDG, ORY), Londres (LHR, LGW, STN), Amsterdam, Bruxelles, Genève et de nombreuses villes françaises en saison. Fortement recommandé pour les vols Air France, British Airways et compagnies classiques.", tag: 'Plus de vols directs' },
      { code: 'CIY', name: 'Comiso — Pio La Torre', dist: '55 km', time: '45–50 min', desc: "L'aéroport le plus proche de la villa. Desservi principalement par Ryanair depuis Paris Beauvais, Rome, Milan, Londres Stansted. Peu de liaisons mais trajet très court jusqu'à la villa.", tag: 'Plus proche' },
    ],
    car_h2: 'La voiture : indispensable',
    car_text: "Il n'existe pas de bus ni de taxi collectif depuis les aéroports jusqu'à la villa. De plus, les villages, les plages et les sites du Val di Noto ne sont accessibles qu'en voiture. Vous pouvez louer une voiture directement à l'aéroport (préférez une réservation en ligne à l'avance) ou nous demander de vous recommander un loueur local à Noto.",
    gps_h2: 'Adresse et GPS',
    gps_text: "Entrez l'adresse suivante dans Google Maps ou Waze avant de partir — la connectivité peut être variable en campagne sicilienne.",
    address: 'Contrada Spaccazza, 96017 Noto (SR), Sicilia',
    gps_coords: '36.887249° N · 15.026392° E',
    gps_note: 'À votre confirmation de réservation, vous recevrez un lien Maps et les instructions d\'arrivée détaillées.',
    distances_h2: 'Distances depuis la villa',
    distances: [
      { place: 'Centre de Noto', dist: '5 km · 10 min' },
      { place: 'Plages (Lido di Noto)', dist: '7 km · 10 min' },
      { place: 'Réserve de Vendicari', dist: '8 km · 12 min' },
      { place: 'Marzamemi', dist: '20 km · 22 min' },
      { place: 'Syracuse / Ortygie', dist: '30 km · 35 min' },
      { place: 'Ragusa Ibla', dist: '45 km · 55 min' },
      { place: 'Aéroport de Comiso', dist: '55 km · 50 min' },
      { place: 'Aéroport de Catane', dist: '90 km · 1 h 15' },
    ],
    transfer_h2: 'Transferts privés',
    transfer_text: 'Si vous préférez ne pas louer de voiture à l\'arrivée ou si vous arrivez tard le soir, nous proposons des transferts privés depuis les deux aéroports. Voir la page Services pour plus de détails.',
    link_services: 'Voir les services →',
    link_villa: '← La villa',
  },
  en: {
    breadcrumb: 'Getting here',
    sub: 'Access & transfers',
    h1: 'Getting to Villa Vénus Noto',
    intro: "The villa is set in the countryside between Noto and the sea, at Contrada Spaccazza. A car is essential — there is no public transport to the villa, and you'll need one to explore the region too. Plan to rent a car or come with your own vehicle.",
    airports_h2: 'The two airports',
    airports: [
      { code: 'CTA', name: 'Catania — Fontanarossa', dist: '90 km', time: 'approx. 1h15', desc: "Sicily's largest airport, with the most direct routes from Paris (CDG, ORY), London (LHR, LGW, STN), Amsterdam, Brussels, Geneva and many European cities year-round. Strongly recommended for Air France, British Airways and traditional airline flights.", tag: 'More direct flights' },
      { code: 'CIY', name: 'Comiso — Pio La Torre', dist: '55 km', time: '45–50 min', desc: "The closest airport to the villa. Served mainly by Ryanair from Paris Beauvais, Rome, Milan, London Stansted. Fewer routes but a very short drive to the villa.", tag: 'Closest' },
    ],
    car_h2: 'A car: essential',
    car_text: "There are no buses or shared taxis from the airports to the villa. What's more, the villages, beaches and sites of the Val di Noto are only accessible by car. You can rent a car directly at the airport (book online in advance) or ask us to recommend a local rental company in Noto.",
    gps_h2: 'Address and GPS',
    gps_text: "Enter the following address in Google Maps or Waze before setting off — connectivity can be patchy in the Sicilian countryside.",
    address: 'Contrada Spaccazza, 96017 Noto (SR), Sicilia',
    gps_coords: '36.887249° N · 15.026392° E',
    gps_note: 'Upon booking confirmation, you will receive a Maps link and detailed arrival instructions.',
    distances_h2: 'Distances from the villa',
    distances: [
      { place: 'Noto town centre', dist: '5 km · 10 min' },
      { place: 'Beaches (Lido di Noto)', dist: '7 km · 10 min' },
      { place: 'Vendicari reserve', dist: '8 km · 12 min' },
      { place: 'Marzamemi', dist: '20 km · 22 min' },
      { place: 'Syracuse / Ortygia', dist: '30 km · 35 min' },
      { place: 'Ragusa Ibla', dist: '45 km · 55 min' },
      { place: 'Comiso airport', dist: '55 km · 50 min' },
      { place: 'Catania airport', dist: '90 km · 1h15' },
    ],
    transfer_h2: 'Private transfers',
    transfer_text: "If you'd rather not rent a car on arrival, or if you arrive late in the evening, we offer private transfers from both airports. See the Services page for details.",
    link_services: 'See services →',
    link_villa: '← The villa',
  },
  it: {
    breadcrumb: 'Come arrivare',
    sub: 'Accesso e trasferimenti',
    h1: 'Come arrivare a Villa Vénus Noto',
    intro: "La villa si trova nella campagna tra Noto e il mare, a Contrada Spaccazza. L'auto è indispensabile — non esiste trasporto pubblico fino alla villa, e ne avrete bisogno anche per esplorare la regione. Prevedete di noleggiare un'auto o di venire con il vostro veicolo.",
    airports_h2: 'I due aeroporti',
    airports: [
      { code: 'CTA', name: 'Catania — Fontanarossa', dist: '90 km', time: 'circa 1h15', desc: "Il più grande aeroporto della Sicilia, con il maggior numero di voli diretti da Parigi, Londra, Amsterdam, Bruxelles, Ginevra e molte città europee tutto l'anno. Consigliato per voli Air France, British Airways e compagnie tradizionali.", tag: 'Più voli diretti' },
      { code: 'CIY', name: 'Comiso — Pio La Torre', dist: '55 km', time: '45–50 min', desc: "L'aeroporto più vicino alla villa. Servito principalmente da Ryanair da Parigi Beauvais, Roma, Milano, Londra Stansted. Meno collegamenti ma percorso molto breve fino alla villa.", tag: 'Il più vicino' },
    ],
    car_h2: "L'auto: indispensabile",
    car_text: "Non esistono autobus né taxi collettivi dagli aeroporti alla villa. Inoltre, i borghi, le spiagge e i siti del Val di Noto sono raggiungibili solo in auto. Potete noleggiare un'auto direttamente in aeroporto (meglio prenotare online in anticipo) o chiederci di consigliarvi un noleggiatore locale a Noto.",
    gps_h2: 'Indirizzo e GPS',
    gps_text: "Inserite il seguente indirizzo in Google Maps o Waze prima di partire — la connettività può essere variabile nella campagna siciliana.",
    address: 'Contrada Spaccazza, 96017 Noto (SR), Sicilia',
    gps_coords: '36.887249° N · 15.026392° E',
    gps_note: 'Alla conferma della prenotazione riceverete un link Maps preciso e le istruzioni per l\'arrivo.',
    distances_h2: 'Distanze dalla villa',
    distances: [
      { place: 'Centro di Noto', dist: '5 km · 10 min' },
      { place: 'Spiagge (Lido di Noto)', dist: '7 km · 10 min' },
      { place: 'Riserva di Vendicari', dist: '8 km · 12 min' },
      { place: 'Marzamemi', dist: '20 km · 22 min' },
      { place: 'Siracusa / Ortigia', dist: '30 km · 35 min' },
      { place: 'Ragusa Ibla', dist: '45 km · 55 min' },
      { place: 'Aeroporto di Comiso', dist: '55 km · 50 min' },
      { place: 'Aeroporto di Catania', dist: '90 km · 1h15' },
    ],
    transfer_h2: 'Trasferimenti privati',
    transfer_text: "Se preferite non noleggiare un'auto all'arrivo o se arrivate tardi la sera, proponiamo trasferimenti privati da entrambi gli aeroporti. Vedere la pagina Servizi per i dettagli.",
    link_services: 'Vedi servizi →',
    link_villa: '← La villa',
  },
}

export default function AccesPage({ params }: { params: { locale: string } }) {
  const locale = (LOCALES.includes(params.locale as Lang) ? params.locale : 'fr') as Lang
  const c = C[locale]

  const homeLabel = locale === 'fr' ? 'Accueil' : 'Home'
  return (
    <>
      <JsonLd data={[getBreadcrumbSchema([
        { name: homeLabel, item: `${BASE}/${locale}` },
        { name: c.breadcrumb, item: pageUrl('acces', locale) },
      ])]} />
      <PageLayout lang={locale} page="acces" breadcrumb={c.breadcrumb}>

      <div className="mb-14">
        <p className="section-subtitle">{c.sub}</p>
        <h1 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight mb-6">{c.h1}</h1>
        <div className="gold-divider" />
        <p className="font-sans text-muted text-base leading-relaxed max-w-2xl">{c.intro}</p>
      </div>

      {/* Airports */}
      <section className="mb-14">
        <h2 className="font-serif text-2xl text-charcoal mb-3">{c.airports_h2}</h2>
        <div className="w-10 h-px bg-gold mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {c.airports.map(ap => (
            <div key={ap.name} className="bg-white border border-gold/20 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-display text-gold text-sm tracking-[0.2em] mb-1">{ap.code}</p>
                  <h3 className="font-serif text-lg text-charcoal">{ap.name}</h3>
                </div>
                <span className="font-sans text-[10px] tracking-[0.1em] uppercase bg-gold/10 text-gold px-2 py-1">{ap.tag}</span>
              </div>
              <div className="flex gap-6 mb-4">
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-muted">{locale === 'fr' ? 'Distance' : 'Distance'}</p>
                  <p className="font-serif text-xl text-charcoal">{ap.dist}</p>
                </div>
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-muted">{locale === 'fr' ? 'Trajet' : locale === 'en' ? 'Journey' : 'Percorso'}</p>
                  <p className="font-serif text-xl text-charcoal">{ap.time}</p>
                </div>
              </div>
              <p className="font-sans text-muted text-sm leading-relaxed">{ap.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Car essential */}
      <section className="mb-14 bg-linen border border-gold/20 p-6">
        <h2 className="font-serif text-xl text-charcoal mb-3">{c.car_h2}</h2>
        <p className="font-sans text-muted text-sm leading-relaxed">{c.car_text}</p>
      </section>

      {/* GPS */}
      <section className="mb-14">
        <h2 className="font-serif text-2xl text-charcoal mb-3">{c.gps_h2}</h2>
        <div className="w-10 h-px bg-gold mb-6" />
        <p className="font-sans text-muted text-sm mb-4">{c.gps_text}</p>
        <div className="bg-navy text-white p-5 font-sans text-sm space-y-2">
          <p className="font-semibold tracking-wide">{c.address}</p>
          <p className="text-white/60 text-xs">{c.gps_coords}</p>
        </div>
        <p className="font-sans text-xs text-muted mt-3 italic">{c.gps_note}</p>
      </section>

      {/* Distances */}
      <section className="mb-14">
        <h2 className="font-serif text-2xl text-charcoal mb-6">{c.distances_h2}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {c.distances.map(d => (
            <div key={d.place} className="flex justify-between items-center bg-white border border-gold/15 px-5 py-3">
              <span className="font-sans text-sm text-charcoal">{d.place}</span>
              <span className="font-sans text-sm text-gold font-medium">{d.dist}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Transfers */}
      <section className="mb-10 border-l-4 border-gold pl-6">
        <h2 className="font-serif text-xl text-charcoal mb-2">{c.transfer_h2}</h2>
        <p className="font-sans text-muted text-sm mb-4">{c.transfer_text}</p>
        <Link href={`/${locale}/services`}
          className="font-sans text-xs tracking-widest uppercase px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-white transition-all duration-300 inline-block">
          {c.link_services}
        </Link>
      </section>

      <Link href={`/${locale}/villa`}
        className="font-sans text-xs tracking-widest uppercase px-6 py-3 border border-navy text-navy hover:bg-navy hover:text-white transition-all duration-300 inline-block">
        {c.link_villa}
      </Link>

    </PageLayout>
    </>
  )
}
