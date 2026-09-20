import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout from '@/components/PageLayout'
import type { Lang } from '@/lib/i18n'
import { hasPlaceholders } from '@/lib/placeholder'
import { pageUrl } from '@/lib/routes'
import JsonLd from '@/components/JsonLd'
import { getBreadcrumbSchema } from '@/lib/structured-data'

const BASE = 'https://www.villavenusnoto.com'
const LOCALES: Lang[] = ['fr', 'en', 'it', 'de']

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }))
}

const META = {
  fr: { title: 'Informations pratiques — Villa Vénus Noto, Sicile', description: 'Ce qui est inclus dans la location, parking, ménage intermédiaire, gestionnaire local, location de voiture. Tout ce qu\'il faut savoir avant d\'arriver à Villa Vénus Noto.' },
  en: { title: 'Practical information — Villa Vénus Noto, Sicily', description: 'What\'s included in the rental, parking, mid-stay cleaning, local manager, car hire. Everything to know before arriving at Villa Vénus Noto.' },
  it: { title: 'Informazioni pratiche — Villa Vénus Noto, Sicilia', description: 'Cosa è incluso nell\'affitto, parcheggio, pulizie a metà soggiorno, gestore locale, noleggio auto. Tutto quello che c\'è da sapere prima di arrivare a Villa Vénus Noto.' },
  de: { title: 'Praktische Informationen — Villa Vénus Noto, Sizilien', description: 'Was in der Miete enthalten ist, Parken, Zwischenreinigung, lokaler Verwalter, Autovermietung. Alles Wissenswerte vor Ihrer Ankunft in Villa Vénus Noto.' },
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Lang
  if (!META[locale]) return {}
  const { title, description } = META[locale]
  const robots = hasPlaceholders(SERVICES[locale]) ? { index: false, follow: true } : { index: true, follow: true }
  return {
    title, description,
    robots,
    alternates: { canonical: `${BASE}/${locale}/services`, languages: { fr: `${BASE}/fr/services`, en: `${BASE}/en/services`, it: `${BASE}/it/services`, de: `${BASE}/de/services`, 'x-default': `${BASE}/fr/services` } },
    openGraph: { title, description, url: `${BASE}/${locale}/services`, siteName: 'Villa Vénus Noto', images: [{ url: '/og-image.jpg', width: 1200, height: 630 }] },
  }
}

const SERVICES = {
  fr: [
    { icon: '✓', name: 'Ménage de fin de séjour — inclus', desc: "Le nettoyage complet de la villa est inclus dans le tarif de location : suites, espaces de vie, cuisine, salle de bains, piscine, extérieurs. Le linge de maison (draps, serviettes de bain et de piscine) est fourni et changé à l'arrivée.", note: 'Inclus dans le tarif · Sans supplément' },
    { icon: '🧹', name: 'Ménage intermédiaire — sur demande', desc: "Pour les longs séjours, un passage de ménage supplémentaire peut être organisé : nettoyage des suites, changement du linge, remise en état des espaces communs. À demander au moment de la réservation.", note: 'À la charge du voyageur · Tarif à convenir avec les propriétaires' },
    { icon: '🚗', name: 'Parking privatif — 4 voitures', desc: "Le domaine dispose d'un parking privatif sécurisé pouvant accueillir jusqu'à 4 véhicules. Une voiture est indispensable pour explorer la région. Les aéroports les plus proches sont Comiso (CIY, 45 min) et Catane (CTA, 1h15).", note: 'Accès libre · Inclus dans la location' },
    { icon: '📞', name: 'Gestionnaire local sur place', desc: "Emmanuel Di Pietro, notre gestionnaire local, est joignable pendant toute la durée de votre séjour. Il peut répondre à vos questions pratiques, vous orienter vers les bonnes adresses et intervenir en cas de besoin.", note: 'Disponible pendant tout le séjour · Coordonnées transmises à la réservation' },
    { icon: '🗺', name: 'Activités et découverte en autonomie', desc: "La villa se loue en location directe. Les restaurants, excursions, activités nautiques et visites sont à organiser librement. Noto, ses marchés, ses plages et ses environs offrent une multitude de possibilités — nous vous conseillons nos adresses favorites à la demande.", note: 'En autonomie · Contactez-nous pour nos recommandations personnelles' },
  ],
  en: [
    { icon: '✓', name: 'End-of-stay cleaning — included', desc: "Full villa cleaning is included in the rental rate: suites, living areas, kitchen, bathrooms, pool and outdoor spaces. Bed linen, bath towels and pool towels are provided and changed at arrival.", note: 'Included in the rate · No extra charge' },
    { icon: '🧹', name: 'Mid-stay cleaning — on request', desc: "For longer stays, an additional cleaning can be arranged: suite cleaning, linen change, common area refresh. Please request at the time of booking.", note: "At the guest's expense · Rate to be agreed with the owners" },
    { icon: '🚗', name: 'Private parking — 4 cars', desc: "The property has a secure private car park with space for up to 4 vehicles. A car is essential for exploring the region. The nearest airports are Comiso (CIY, 45 min) and Catania (CTA, 1h15).", note: 'Free access · Included in the rental' },
    { icon: '📞', name: 'Local manager on site', desc: "Emmanuel Di Pietro, our local manager, is reachable throughout your stay. He can answer practical questions, point you to the right local addresses, and help if anything is needed.", note: 'Available throughout your stay · Contact details provided at booking' },
    { icon: '🗺', name: 'Activities & exploration — independently', desc: "The villa is rented on a self-catering basis. Restaurants, excursions, water sports and visits are yours to organise freely. Noto, its markets, beaches and surroundings offer countless options — we are happy to share our personal recommendations on request.", note: 'Independently organised · Contact us for our personal recommendations' },
  ],
  it: [
    { icon: '✓', name: 'Pulizie di fine soggiorno — incluse', desc: "La pulizia completa della villa è inclusa nella tariffa di noleggio: suite, aree comuni, cucina, bagni, piscina e spazi esterni. Biancheria da letto, asciugamani da bagno e da piscina sono forniti e cambiati all'arrivo.", note: 'Incluso nella tariffa · Senza supplemento' },
    { icon: '🧹', name: 'Pulizie a metà soggiorno — su richiesta', desc: "Per soggiorni lunghi, è possibile organizzare una pulizia aggiuntiva: pulizia delle suite, cambio biancheria, riordino degli spazi comuni. Si prega di richiedere al momento della prenotazione.", note: "A carico dell'ospite · Tariffa da concordare con i proprietari" },
    { icon: '🚗', name: 'Parcheggio privato — 4 auto', desc: "La proprietà dispone di un parcheggio privato sicuro che può ospitare fino a 4 veicoli. Un'auto è indispensabile per esplorare la regione. Gli aeroporti più vicini sono Comiso (CIY, 45 min) e Catania (CTA, 1h15).", note: 'Accesso libero · Incluso nel noleggio' },
    { icon: '📞', name: 'Gestore locale disponibile', desc: "Emmanuel Di Pietro, il nostro gestore locale, è raggiungibile per tutta la durata del soggiorno. Può rispondere a domande pratiche, indicare i posti giusti e intervenire in caso di necessità.", note: 'Disponibile durante tutto il soggiorno · Contatti comunicati alla prenotazione' },
    { icon: '🗺', name: 'Attività ed escursioni — in autonomia', desc: "La villa si affitta in formula di autogestione. Ristoranti, escursioni, attività nautiche e visite sono da organizzare liberamente. Noto, i suoi mercati, le spiagge e i dintorni offrono infinite possibilità — siamo lieti di condividere i nostri indirizzi preferiti su richiesta.", note: 'In autonomia · Contattateci per i nostri consigli personali' },
  ],
  de: [
    { icon: '✓', name: 'Endreinigung — inklusive', desc: "Die vollständige Reinigung der Villa ist im Mietpreis enthalten: Suiten, Wohnbereiche, Küche, Bäder, Pool und Außenbereiche. Bettwäsche, Badetücher und Poolhandtücher werden gestellt und bei Ankunft gewechselt.", note: 'Im Mietpreis enthalten · Ohne Aufpreis' },
    { icon: '🧹', name: 'Zwischenreinigung — auf Anfrage', desc: "Bei längeren Aufenthalten kann eine zusätzliche Reinigung organisiert werden: Suitenreinigung, Wäschewechsel, Neuordnung der Gemeinschaftsbereiche. Bitte bei Buchung anfragen.", note: 'Auf Kosten des Gastes · Preis mit den Eigentümern zu vereinbaren' },
    { icon: '🚗', name: 'Privater Parkplatz — 4 Fahrzeuge', desc: "Das Anwesen verfügt über einen gesicherten privaten Parkplatz für bis zu 4 Fahrzeuge. Ein Auto ist unerlässlich, um die Region zu erkunden. Die nächsten Flughäfen sind Comiso (CIY, 45 Min.) und Catania (CTA, 1h15).", note: 'Freier Zugang · Im Mietpreis enthalten' },
    { icon: '📞', name: 'Lokaler Verwalter vor Ort', desc: "Emmanuel Di Pietro, unser lokaler Verwalter, ist während Ihres gesamten Aufenthalts erreichbar. Er kann praktische Fragen beantworten, Sie zu den richtigen Adressen führen und bei Bedarf helfen.", note: 'Während des gesamten Aufenthalts verfügbar · Kontaktdaten bei Buchungsbestätigung' },
    { icon: '🗺', name: 'Aktivitäten & Ausflüge — selbstständig', desc: "Die Villa wird ohne Catering vermietet. Restaurants, Ausflüge, Wassersport und Besichtigungen sind eigenständig zu organisieren. Noto, seine Märkte, Strände und Umgebung bieten unzählige Möglichkeiten — wir teilen gerne unsere persönlichen Empfehlungen auf Anfrage.", note: 'Selbstständig organisiert · Kontaktieren Sie uns für unsere persönlichen Empfehlungen' },
  ],
}

const H = {
  fr: { breadcrumb: 'Infos pratiques', h1: 'Informations pratiques', intro: "La villa Vénus se loue en location directe, sans intermédiaire. Un ménage de fin de séjour, le linge de maison et le parking pour 4 voitures sont inclus. Pour le reste, vous êtes en autonomie — et notre gestionnaire local est disponible si besoin.", included_note: "La réservation se fait directement avec les propriétaires, par email ou téléphone. Les coordonnées du gestionnaire local et les instructions d'arrivée sont transmises à la confirmation.", link_villa: '← La villa', link_acces: 'Comment venir →' },
  en: { breadcrumb: 'Practical info', h1: 'Practical information', intro: "Villa Vénus is a direct rental with no intermediary. End-of-stay cleaning, bed and pool linen, and parking for 4 cars are all included. For the rest, guests are independent — and our local manager is available if needed.", included_note: "Bookings are made directly with the owners by email or phone. The local manager's contact details and arrival instructions are provided at confirmation.", link_villa: '← The villa', link_acces: 'Getting here →' },
  it: { breadcrumb: 'Info pratiche', h1: 'Informazioni pratiche', intro: "Villa Vénus si affitta direttamente, senza intermediari. Pulizie di fine soggiorno, biancheria da letto e da piscina e parcheggio per 4 auto sono inclusi. Per il resto, gli ospiti sono in piena autonomia — e il nostro gestore locale è disponibile se necessario.", included_note: "Le prenotazioni avvengono direttamente con i proprietari via email o telefono. I contatti del gestore locale e le istruzioni di arrivo vengono comunicati alla conferma.", link_villa: '← La villa', link_acces: 'Come arrivare →' },
  de: { breadcrumb: 'Praktische Infos', h1: 'Praktische Informationen', intro: "Villa Vénus wird direkt ohne Vermittler vermietet. Endreinigung, Bettwäsche und Poolhandtücher sowie Parkplatz für 4 Fahrzeuge sind inklusive. Für den Rest sind die Gäste selbstständig — und unser lokaler Verwalter ist bei Bedarf verfügbar.", included_note: "Buchungen erfolgen direkt bei den Eigentümern per E-Mail oder Telefon. Die Kontaktdaten des lokalen Verwalters und die Anreiseanweisungen werden bei Bestätigung mitgeteilt.", link_villa: '← Die Villa', link_acces: 'Anreise →' },
}

export default function ServicesPage({ params }: { params: { locale: string } }) {
  const locale = (LOCALES.includes(params.locale as Lang) ? params.locale : 'fr') as Lang
  const h = H[locale]
  const services = SERVICES[locale]

  const homeLabel = locale === 'fr' ? 'Accueil' : locale === 'de' ? 'Startseite' : 'Home'
  return (
    <>
      <JsonLd data={[getBreadcrumbSchema([
        { name: homeLabel, item: `${BASE}/${locale}` },
        { name: h.breadcrumb, item: `${BASE}/${locale}/services` },
      ])]} />
      <PageLayout lang={locale} page="services" breadcrumb={h.breadcrumb}>

      <div className="mb-14">
        <p className="section-subtitle">{locale === 'fr' ? 'Sur mesure' : locale === 'en' ? 'Bespoke' : locale === 'de' ? 'Maßgeschneidert' : 'Su misura'}</p>
        <h1 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight mb-6">{h.h1}</h1>
        <div className="gold-divider" />
        <p className="font-sans text-muted text-base leading-relaxed max-w-2xl">{h.intro}</p>
      </div>

      <div className="space-y-6 mb-14">
        {services.map((s) => (
          <div key={s.name} className="bg-white border border-gold/20 p-6 grid grid-cols-[40px_1fr] gap-4">
            <div className="text-2xl leading-none pt-0.5">{s.icon}</div>
            <div>
              <h2 className="font-serif text-lg text-charcoal mb-2">{s.name}</h2>
              <p className="font-sans text-muted text-sm leading-relaxed mb-3">{s.desc}</p>
              <p className="font-sans text-xs text-gold/80 italic">{s.note}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-linen border-l-4 border-gold p-6 mb-10">
        <p className="font-sans text-sm text-muted leading-relaxed">{h.included_note}</p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link href={`/${locale}/villa`} className="font-sans text-xs tracking-widest uppercase px-6 py-3 border border-navy text-navy hover:bg-navy hover:text-white transition-all duration-300">{h.link_villa}</Link>
        <Link href={pageUrl('acces', locale)} className="font-sans text-xs tracking-widest uppercase px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-white transition-all duration-300">{h.link_acces}</Link>
      </div>

    </PageLayout>
    </>
  )
}
