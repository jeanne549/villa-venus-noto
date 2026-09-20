import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout from '@/components/PageLayout'
import type { Lang } from '@/lib/i18n'
import JsonLd from '@/components/JsonLd'
import { getBreadcrumbSchema } from '@/lib/structured-data'
import { buildAlternates } from '@/lib/routes'

const BASE = 'https://www.villavenusnoto.com'
const LOCALES: Lang[] = ['fr', 'en', 'it', 'de']

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }))
}

const META: Record<Lang, { title: string; description: string }> = {
  fr: {
    title: 'Aéroport et accès — Villa Vénus Noto, Sicile',
    description: "Comment rejoindre Villa Vénus Noto depuis l'aéroport de Catane (CTA) : location de voiture, transfert privé, taxi. Distance, temps de trajet, adresse GPS.",
  },
  en: {
    title: 'Airport & Getting Here — Villa Vénus Noto, Sicily',
    description: 'How to reach Villa Vénus Noto from Catania Airport (CTA): car rental, private transfer, taxi. Distance, driving time, GPS address.',
  },
  it: {
    title: 'Aeroporto e come arrivare — Villa Vénus Noto, Sicilia',
    description: "Come raggiungere Villa Vénus Noto dall'aeroporto di Catania (CTA): noleggio auto, trasferimento privato, taxi. Distanza, tempi di percorrenza, indirizzo GPS.",
  },
  de: {
    title: 'Flughafen & Anreise — Villa Vénus Noto, Sizilien',
    description: 'So erreichen Sie Villa Vénus Noto vom Flughafen Catania (CTA): Mietwagen, privater Transfer, Taxi. Entfernung, Fahrtzeit, GPS-Adresse.',
  },
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Lang
  if (!META[locale]) return {}
  const { title, description } = META[locale]
  return {
    title, description,
    robots: { index: true, follow: true },
    alternates: buildAlternates('aeroport', locale),
    openGraph: { title, description, url: `${BASE}/${locale}/aeroport`, siteName: 'Villa Vénus Noto', images: [{ url: '/og-image.jpg', width: 1200, height: 630 }] },
  }
}

type Transport = { title: string; text: string; detail?: string }
type Content = {
  breadcrumb: string; h1: string; sub: string; intro: string
  airport_title: string
  airport_name: string; airport_code: string; airport_dist: string; airport_drive: string
  airport_note: string
  other_title: string
  other_airports: Array<{ name: string; code: string; dist: string; drive: string; note: string }>
  how_title: string
  transport: Transport[]
  address_title: string
  address_lines: string[]
  gps: string
  gps_label: string
  arrival_title: string; arrival_text: string
  link_acces: string; link_villa: string
}

const CONTENT: Record<Lang, Content> = {
  fr: {
    breadcrumb: 'Aéroport',
    h1: "Depuis l'aéroport de Catane",
    sub: "75 km — environ 1 heure de route",
    intro: "L'aéroport international de Catane-Fontanarossa (CTA) est la porte d'entrée naturelle pour rejoindre la villa. Toutes les grandes compagnies aériennes desservent Catane depuis Paris, Lyon, Nantes et les principales villes européennes. La villa est à environ 75 kilomètres de l'aéroport, soit une heure de route par l'autoroute A18 puis la SS115.",
    airport_title: "L'aéroport recommandé",
    airport_name: 'Catane-Fontanarossa',
    airport_code: 'CTA',
    airport_dist: '75 km',
    airport_drive: '~1h de route',
    airport_note: "Le plus grand aéroport de Sicile. Vols directs depuis toutes les grandes villes françaises, européennes et intercontinentales (via Rome ou Milan). Location de voiture sur place — toutes les grandes enseignes présentes. Autoroute jusqu'à Noto.",
    other_title: 'Autres options',
    other_airports: [
      {
        name: 'Comiso',
        code: 'CIY',
        dist: '65 km',
        drive: '~1h15',
        note: "Aéroport régional (Ryanair). Parfois moins cher mais moins de vols. Location de voiture disponible. Route plus petite jusqu'à Noto (SS115).",
      },
      {
        name: 'Palerme',
        code: 'PMO',
        dist: '316 km',
        drive: '~3h30',
        note: "Déconseillé sauf si vous prévoyez de traverser l'île. Trajet trop long pour un simple aller-retour depuis la villa.",
      },
    ],
    how_title: 'Comment rejoindre la villa depuis Catane',
    transport: [
      {
        title: 'Location de voiture (recommandé)',
        text: "La voiture est indispensable pour profiter de la région — les plages, les villages et les excursions s'y font en voiture. Toutes les grandes agences sont présentes à l'aéroport de Catane (Europcar, Hertz, Avis, Sixt, Enterprise). Réservez à l'avance en été.",
        detail: "Comptez 40-60 €/jour en saison pour une citadine. Une berline ou un SUV est à l'aise sur les routes secondaires siciliennes.",
      },
      {
        title: 'Transfert privé',
        text: "Des services de transfert privé relient l'aéroport de Catane à la villa directement. Confort garanti, idéal à l'arrivée après un long voyage. Prix : environ 70-80 € pour le véhicule (tarif dégressif par passager).",
        detail: "Prestataires recommandés : sicilytransfer.it, cerratolimo.com. Réservez 48h à l'avance.",
      },
      {
        title: 'Taxi',
        text: "Des taxis sont disponibles à la sortie de l'aéroport. Négociez le prix avant de monter (pas de compteur sur les trajets longue distance). Comptez environ 80-100 € jusqu'à Noto.",
      },
      {
        title: 'Bus (option économique)',
        text: "InterBus propose deux liaisons quotidiennes entre l'aéroport de Catane et Noto (arrêt centre-ville). Trajet : 1h25. Prix : ~9-12 €/personne. Horaires à vérifier sur interbus.it.",
        detail: "Option pratique si vous n'avez pas besoin de voiture à l'arrivée. Pour les plages et les excursions, une voiture sera nécessaire.",
      },
    ],
    address_title: 'Adresse et GPS',
    address_lines: [
      'Villa Vénus Noto',
      'Contrada Spaccazza',
      '96017 Noto (SR) — Sicile, Italie',
    ],
    gps: '36.887249, 15.026392',
    gps_label: 'Coordonnées GPS',
    arrival_title: 'À votre arrivée',
    arrival_text: "Un code d'accès à la boîte à clés vous sera envoyé par email avant votre arrivée. Un parking privatif est disponible à la villa pour plusieurs véhicules. Pour toute question d'accès, contactez-nous directement.",
    link_acces: 'Accès et directions détaillées →',
    link_villa: 'La villa →',
  },
  en: {
    breadcrumb: 'Airport',
    h1: 'From Catania Airport',
    sub: '75 km — approximately 1 hour by road',
    intro: "Catania-Fontanarossa International Airport (CTA) is the natural gateway to reach the villa. All major airlines serve Catania from London, Paris, Amsterdam, and most European cities. The villa is approximately 75 kilometres from the airport — one hour by road via the A18 motorway and SS115.",
    airport_title: 'The recommended airport',
    airport_name: 'Catania-Fontanarossa',
    airport_code: 'CTA',
    airport_dist: '75 km',
    airport_drive: '~1h by road',
    airport_note: "Sicily's largest airport. Direct flights from all major European cities and intercontinental connections via Rome or Milan. Car rental on site — all major companies. Motorway access to Noto.",
    other_title: 'Other options',
    other_airports: [
      {
        name: 'Comiso',
        code: 'CIY',
        dist: '65 km',
        drive: '~1h15',
        note: "Regional airport (Ryanair). Sometimes cheaper but fewer flights. Car rental available. Smaller road to Noto via the SS115.",
      },
      {
        name: 'Palermo',
        code: 'PMO',
        dist: '316 km',
        drive: '~3h30',
        note: "Not recommended unless you plan to cross the island. Too far for a simple return journey from the villa.",
      },
    ],
    how_title: 'Getting to the villa from Catania',
    transport: [
      {
        title: 'Car rental (recommended)',
        text: "A car is essential for exploring the region — beaches, villages and day trips all require one. All major agencies are at Catania Airport (Europcar, Hertz, Avis, Sixt, Enterprise). Book ahead in summer.",
        detail: "Expect €40-60/day in season for a small car. A saloon or SUV handles Sicilian back roads comfortably.",
      },
      {
        title: 'Private transfer',
        text: "Private transfer services run directly from Catania Airport to the villa. Comfortable and stress-free after a long journey. Fare: approximately €70-80 per vehicle (per-person rate decreases with more passengers).",
        detail: "Recommended providers: sicilytransfer.it, cerratolimo.com. Book at least 48 hours ahead.",
      },
      {
        title: 'Taxi',
        text: "Taxis are available at the airport exit. Agree on the price before getting in (no meter on long-distance routes). Expect approximately €80-100 to Noto.",
      },
      {
        title: 'Bus (budget option)',
        text: "InterBus runs two daily services between Catania Airport and Noto (town centre stop). Journey: 1h25. Fare: ~€9-12 per person. Check timetables at interbus.it.",
        detail: "Practical if you don't need a car on arrival. For beaches and day trips, a car will be necessary.",
      },
    ],
    address_title: 'Address & GPS',
    address_lines: [
      'Villa Vénus Noto',
      'Contrada Spaccazza',
      '96017 Noto (SR) — Sicily, Italy',
    ],
    gps: '36.887249, 15.026392',
    gps_label: 'GPS coordinates',
    arrival_title: 'On arrival',
    arrival_text: "A key box access code will be sent to you by email before your arrival. Private parking is available at the villa for several vehicles. For any access questions, contact us directly.",
    link_acces: 'Detailed directions →',
    link_villa: 'The villa →',
  },
  it: {
    breadcrumb: 'Aeroporto',
    h1: "Dall'aeroporto di Catania",
    sub: '75 km — circa 1 ora di strada',
    intro: "L'aeroporto internazionale di Catania-Fontanarossa (CTA) è il punto d'ingresso naturale per raggiungere la villa. Tutte le principali compagnie aeree servono Catania dalle principali città italiane ed europee. La villa si trova a circa 75 chilometri dall'aeroporto — un'ora di strada via l'autostrada A18 e la SS115.",
    airport_title: "L'aeroporto consigliato",
    airport_name: 'Catania-Fontanarossa',
    airport_code: 'CTA',
    airport_dist: '75 km',
    airport_drive: '~1h di strada',
    airport_note: "Il più grande aeroporto della Sicilia. Voli diretti da tutte le principali città europee e connessioni intercontinentali via Roma o Milano. Noleggio auto in loco — tutte le principali compagnie presenti. Accesso autostradale fino a Noto.",
    other_title: 'Altre opzioni',
    other_airports: [
      {
        name: 'Comiso',
        code: 'CIY',
        dist: '65 km',
        drive: '~1h15',
        note: "Aeroporto regionale (Ryanair). A volte più economico ma meno voli. Noleggio auto disponibile. Strada più piccola per Noto via SS115.",
      },
      {
        name: 'Palermo',
        code: 'PMO',
        dist: '316 km',
        drive: '~3h30',
        note: "Sconsigliato salvo se prevedete di attraversare l'isola. Troppo lontano per un semplice trasferimento dalla villa.",
      },
    ],
    how_title: 'Come raggiungere la villa da Catania',
    transport: [
      {
        title: 'Noleggio auto (consigliato)',
        text: "L'auto è indispensabile per godere della regione — spiagge, borghi ed escursioni si raggiungono in auto. Tutte le principali agenzie sono presenti all'aeroporto di Catania (Europcar, Hertz, Avis, Sixt, Enterprise). Prenotate in anticipo d'estate.",
        detail: "Stimate 40-60 €/giorno in stagione per una utilitaria. Una berlina o un SUV è comodo sulle strade secondarie siciliane.",
      },
      {
        title: 'Trasferimento privato',
        text: "Servizi di trasferimento privato collegano direttamente l'aeroporto di Catania alla villa. Comodo e senza stress dopo un lungo viaggio. Prezzo: circa 70-80 € per veicolo.",
        detail: "Fornitori consigliati: sicilytransfer.it, cerratolimo.com. Prenotate con almeno 48 ore di anticipo.",
      },
      {
        title: 'Taxi',
        text: "I taxi sono disponibili all'uscita dell'aeroporto. Concordate il prezzo prima di salire (nessun tassametro per i lunghi percorsi). Stimate circa 80-100 € fino a Noto.",
      },
      {
        title: 'Bus (opzione economica)',
        text: "InterBus offre due corse quotidiane tra l'aeroporto di Catania e Noto (fermata centro città). Tragitto: 1h25. Prezzo: ~9-12 €/persona. Verificate gli orari su interbus.it.",
        detail: "Pratico se non avete bisogno di auto all'arrivo. Per le spiagge e le escursioni, un'auto sarà necessaria.",
      },
    ],
    address_title: 'Indirizzo e GPS',
    address_lines: [
      'Villa Vénus Noto',
      'Contrada Spaccazza',
      '96017 Noto (SR) — Sicilia, Italia',
    ],
    gps: '36.887249, 15.026392',
    gps_label: 'Coordinate GPS',
    arrival_title: 'Al vostro arrivo',
    arrival_text: "Un codice di accesso alla cassetta delle chiavi vi sarà inviato per email prima dell'arrivo. Un parcheggio privato è disponibile alla villa per più veicoli. Per qualsiasi domanda sull'accesso, contattateci direttamente.",
    link_acces: 'Indicazioni dettagliate →',
    link_villa: 'La villa →',
  },
  de: {
    breadcrumb: 'Flughafen',
    h1: 'Vom Flughafen Catania',
    sub: '75 km — ca. 1 Stunde Fahrt',
    intro: "Der internationale Flughafen Catania-Fontanarossa (CTA) ist das natürliche Eingangstor zur Villa. Alle großen Fluggesellschaften bedienen Catania von Frankfurt, München, Wien und den meisten europäischen Städten aus. Die Villa liegt etwa 75 Kilometer vom Flughafen entfernt — eine Stunde Fahrt über die Autobahn A18 und die SS115.",
    airport_title: 'Der empfohlene Flughafen',
    airport_name: 'Catania-Fontanarossa',
    airport_code: 'CTA',
    airport_dist: '75 km',
    airport_drive: '~1 Std. Fahrt',
    airport_note: "Siziliens größter Flughafen. Direktflüge aus allen großen europäischen Städten sowie Interkontinentalverbindungen über Rom oder Mailand. Mietwagen vor Ort — alle großen Anbieter vertreten. Autobahnzugang nach Noto.",
    other_title: 'Weitere Optionen',
    other_airports: [
      {
        name: 'Comiso',
        code: 'CIY',
        dist: '65 km',
        drive: '~1 Std. 15 Min.',
        note: "Regionalflughafen (Ryanair). Manchmal günstiger, aber weniger Flüge. Mietwagen verfügbar. Kleinere Straße nach Noto über die SS115.",
      },
      {
        name: 'Palermo',
        code: 'PMO',
        dist: '316 km',
        drive: '~3 Std. 30 Min.',
        note: "Nicht empfohlen, außer Sie planen, die Insel zu überqueren. Zu weit für eine einfache Transferfahrt zur Villa.",
      },
    ],
    how_title: 'Von Catania zur Villa',
    transport: [
      {
        title: 'Mietwagen (empfohlen)',
        text: "Ein Auto ist unverzichtbar, um die Region zu erkunden — Strände, Dörfer und Ausflüge erfordern eines. Alle großen Anbieter am Flughafen Catania (Europcar, Hertz, Avis, Sixt, Enterprise). Im Sommer frühzeitig buchen.",
        detail: "Rechnen Sie mit 40-60 €/Tag in der Saison für einen Kleinwagen. Eine Limousine oder ein SUV bewältigt Siziliens Nebenstraßen komfortabel.",
      },
      {
        title: 'Privater Transfer',
        text: "Private Transferdienste fahren direkt vom Flughafen Catania zur Villa. Komfortabel und stressfrei nach einer langen Reise. Preis: ca. 70-80 € pro Fahrzeug.",
        detail: "Empfohlene Anbieter: sicilytransfer.it, cerratolimo.com. Mindestens 48 Stunden im Voraus buchen.",
      },
      {
        title: 'Taxi',
        text: "Taxis stehen am Flughafenausgang bereit. Preis vor der Fahrt vereinbaren (kein Taxameter für Langstrecken). Rechnen Sie mit ca. 80-100 € bis Noto.",
      },
      {
        title: 'Bus (günstige Option)',
        text: "InterBus bietet täglich zwei Verbindungen zwischen dem Flughafen Catania und Noto (Haltestelle Stadtzentrum). Fahrtzeit: 1 Std. 25 Min. Preis: ~9-12 €/Person. Fahrpläne auf interbus.it prüfen.",
        detail: "Praktisch, wenn Sie bei der Ankunft kein Auto benötigen. Für Strände und Ausflüge wird jedoch ein Auto nötig sein.",
      },
    ],
    address_title: 'Adresse & GPS',
    address_lines: [
      'Villa Vénus Noto',
      'Contrada Spaccazza',
      '96017 Noto (SR) — Sizilien, Italien',
    ],
    gps: '36.887249, 15.026392',
    gps_label: 'GPS-Koordinaten',
    arrival_title: 'Bei Ihrer Ankunft',
    arrival_text: "Ein Zugangscode für die Schlüsselbox wird Ihnen vor der Ankunft per E-Mail zugesandt. Privatparkplätze für mehrere Fahrzeuge stehen an der Villa zur Verfügung. Bei Fragen zur Anreise kontaktieren Sie uns direkt.",
    link_acces: 'Detaillierte Wegbeschreibung →',
    link_villa: 'Die Villa →',
  },
}

export default function AeroportPage({ params }: { params: { locale: string } }) {
  const locale = (LOCALES.includes(params.locale as Lang) ? params.locale : 'fr') as Lang
  const c = CONTENT[locale]
  const homeLabel = locale === 'fr' ? 'Accueil' : locale === 'de' ? 'Startseite' : 'Home'
  return (
    <>
      <JsonLd data={[getBreadcrumbSchema([
        { name: homeLabel, item: `${BASE}/${locale}` },
        { name: c.breadcrumb, item: `${BASE}/${locale}/aeroport` },
      ])]} />
      <PageLayout lang={locale} page="aeroport" breadcrumb={c.breadcrumb}>
        <div className="max-w-2xl">
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal leading-tight mb-3">{c.h1}</h1>
          <p className="font-sans text-xs tracking-[0.15em] uppercase text-gold-text mb-6">{c.sub}</p>
          <div className="gold-divider" />
          <p className="font-sans text-base text-muted leading-relaxed mb-12">{c.intro}</p>

          {/* Aéroport principal */}
          <div className="bg-gold/5 border border-gold/20 p-6 mb-8">
            <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-gold-text mb-3">{c.airport_title}</p>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
              <h2 className="font-serif text-2xl text-charcoal">{c.airport_name}</h2>
              <span className="font-sans text-xs tracking-widest text-muted">{c.airport_code}</span>
              <span className="font-sans text-xs text-gold-text font-medium">{c.airport_dist} · {c.airport_drive}</span>
            </div>
            <p className="font-sans text-sm text-muted leading-relaxed">{c.airport_note}</p>
          </div>

          {/* Autres aéroports */}
          <div className="mb-12">
            <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-muted mb-4">{c.other_title}</p>
            <div className="space-y-3">
              {c.other_airports.map((ap, i) => (
                <div key={i} className="border-l border-muted/20 pl-4">
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 mb-1">
                    <span className="font-sans text-sm text-charcoal font-medium">{ap.name}</span>
                    <span className="font-sans text-xs text-muted">{ap.code}</span>
                    <span className="font-sans text-xs text-muted">{ap.dist} · {ap.drive}</span>
                  </div>
                  <p className="font-sans text-xs text-muted/70 leading-relaxed">{ap.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Comment rejoindre */}
          <h2 className="font-serif text-2xl text-charcoal mb-6">{c.how_title}</h2>
          <div className="space-y-7 mb-14">
            {c.transport.map((t, i) => (
              <div key={i} className="border-l-2 border-gold/30 pl-5">
                <p className="font-sans text-sm font-semibold text-charcoal mb-1">{t.title}</p>
                <p className="font-sans text-sm text-muted leading-relaxed">{t.text}</p>
                {t.detail && <p className="font-sans text-xs text-muted/70 leading-relaxed mt-1 italic">{t.detail}</p>}
              </div>
            ))}
          </div>

          {/* Adresse + GPS */}
          <div className="bg-navy text-white p-8 mb-12">
            <h2 className="font-serif text-xl text-gold-text mb-5">{c.address_title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                {c.address_lines.map((line, i) => (
                  <p key={i} className={`font-sans text-sm text-white/90 leading-relaxed ${i === 0 ? 'font-semibold' : ''}`}>{line}</p>
                ))}
              </div>
              <div>
                <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-gold-text/70 mb-1">{c.gps_label}</p>
                <p className="font-sans text-sm text-white/90 font-mono">{c.gps}</p>
              </div>
            </div>
            <div className="border-t border-white/10 mt-6 pt-6">
              <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-gold-text/70 mb-2">{c.arrival_title}</p>
              <p className="font-sans text-sm text-white/80 leading-relaxed">{c.arrival_text}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href={`/${locale}/acces`} className="font-sans text-xs tracking-widest uppercase px-6 py-3 bg-gold text-white hover:bg-gold/80 transition-all duration-300">
              {c.link_acces}
            </Link>
            <Link href={`/${locale}`} className="font-sans text-xs tracking-widest uppercase px-6 py-3 border border-gold text-gold-text hover:bg-gold hover:text-white transition-all duration-300">
              {c.link_villa}
            </Link>
          </div>
        </div>
      </PageLayout>
    </>
  )
}
