import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout from '@/components/PageLayout'
import type { Lang } from '@/lib/i18n'
import { hasPlaceholders } from '@/lib/placeholder'

const BASE = 'https://www.villavenusnoto.com'
const LOCALES: Lang[] = ['fr', 'en', 'it']

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }))
}

const META = {
  fr: { title: 'Services et conciergerie — Villa Vénus Noto, Sicile', description: 'Chef privé, transferts aéroport, ménage, cours de cuisine sicilienne, excursions en bateau, location de voiture. Séjour sur mesure à Noto, Sicile.' },
  en: { title: 'Services & Concierge — Villa Vénus Noto, Sicily', description: 'Private chef, airport transfers, housekeeping, Sicilian cooking classes, boat trips, car hire. Tailored stays at Villa Vénus Noto, Sicily.' },
  it: { title: 'Servizi e concierge — Villa Vénus Noto, Sicilia', description: 'Chef privato, trasferimenti aeroporto, pulizie, corsi di cucina siciliana, escursioni in barca, noleggio auto. Soggiorno su misura a Noto, Sicilia.' },
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Lang
  if (!META[locale]) return {}
  const { title, description } = META[locale]
  const robots = hasPlaceholders(SERVICES[locale]) ? { index: false, follow: true } : { index: true, follow: true }
  return {
    title, description,
    robots,
    alternates: { canonical: `${BASE}/${locale}/services`, languages: { fr: `${BASE}/fr/services`, en: `${BASE}/en/services`, it: `${BASE}/it/services`, 'x-default': `${BASE}/fr/services` } },
    openGraph: { title, description, url: `${BASE}/${locale}/services`, siteName: 'Villa Vénus Noto', images: [{ url: '/og-image.jpg', width: 1200, height: 630 }] },
  }
}

const SERVICES = {
  fr: [
    { icon: '🍽', name: 'Chef privé à domicile', desc: "Un cuisinier sicilien vient préparer un dîner ou un repas complet dans la cuisine de la villa. Menu élaboré selon vos goûts et les produits locaux du marché de Noto — poisson du jour, légumes de saison, pâtes fraîches, cassate et cannoli maison. Idéal pour une soirée sans avoir à conduire.", note: "Tarif : sur devis · À réserver au moins 48h à l'avance" },
    { icon: '🚗', name: 'Transfert depuis Catane (CTA)', desc: "Prise en charge à la sortie des arrivées de l'aéroport de Catane Fontanarossa, trajet direct jusqu'à la villa (1h15 environ). Véhicule climatisé, chauffeur francophone disponible.", note: 'Tarif : [À confirmer] · À réserver avant votre arrivée' },
    { icon: '🚗', name: 'Transfert depuis Comiso (CIY)', desc: "L'aéroport de Comiso est le plus proche de la villa. Trajet d'environ 45-50 minutes. Idéal si vous voyagez depuis Paris (Beauvais), Londres ou d'autres destinations low-cost.", note: 'Tarif : [À confirmer] · À réserver avant votre arrivée' },
    { icon: '🧹', name: 'Ménage en cours de séjour', desc: "Pour les longs séjours, un passage de ménage intermédiaire peut être organisé : nettoyage des suites, changement du linge de maison, remise en état des espaces communs. La fréquence et le périmètre sont à définir selon vos préférences.", note: 'Tarif : [À confirmer] · Inclus ou option selon le séjour — [À confirmer]' },
    { icon: '👩‍🍳', name: 'Cours de cuisine sicilienne', desc: "Apprenez à préparer les grands classiques de la cuisine sicilienne avec un chef local : arancini, pasta alla Norma, caponata, granita, cassata. Le cours se déroule dans la cuisine de la villa ou en extérieur, suivi du repas préparé ensemble.", note: 'Tarif : [À confirmer] · Prestataire partenaire — [À confirmer]' },
    { icon: '⛵', name: 'Excursion en bateau', desc: "Depuis le port de Marzamemi ou de Portopalo, une demi-journée ou journée en mer le long de la côte du Val di Noto. Baignade en crique, snorkeling, pique-nique à bord, coucher de soleil depuis la mer.", note: 'Tarif : [À confirmer] · Prestataire partenaire — [À confirmer] · Selon météo et disponibilité' },
    { icon: '🚙', name: 'Location de voiture', desc: "Une voiture est indispensable pour explorer la région. Nous pouvons vous orienter vers des loueurs locaux fiables à Noto ou à l'aéroport. La villa dispose d'un parking privatif pour 2 à 3 véhicules — [À confirmer la capacité].", note: 'Tarif : selon le prestataire · [À confirmer]' },
  ],
  en: [
    { icon: '🍽', name: 'Private chef at home', desc: "A Sicilian cook comes to prepare dinner or a full meal in the villa's kitchen. Menu crafted to your tastes and local market produce from Noto — catch of the day, seasonal vegetables, fresh pasta, homemade cassata and cannoli. Perfect for an evening without having to drive.", note: 'Rate: on request · Book at least 48h in advance' },
    { icon: '🚗', name: 'Transfer from Catania (CTA)', desc: "Pick-up at the arrivals exit of Catania Fontanarossa airport, direct transfer to the villa (approx. 1h15). Air-conditioned vehicle, English-speaking driver available.", note: 'Rate: [To confirm] · Book before your arrival' },
    { icon: '🚗', name: 'Transfer from Comiso (CIY)', desc: "Comiso airport is the closest to the villa. Journey of approximately 45-50 minutes. Ideal if you fly from Paris Beauvais, London or other low-cost destinations.", note: 'Rate: [To confirm] · Book before your arrival' },
    { icon: '🧹', name: 'Mid-stay housekeeping', desc: "For longer stays, an interim cleaning can be arranged: suite cleaning, linen change, common area refresh. Frequency and scope are agreed to your preferences.", note: 'Rate: [To confirm] · Included or optional depending on stay — [To confirm]' },
    { icon: '👩‍🍳', name: 'Sicilian cooking class', desc: "Learn to make the great classics of Sicilian cuisine with a local chef: arancini, pasta alla Norma, caponata, granita, cassata. The class takes place in the villa's kitchen or outdoors, followed by the meal you prepared together.", note: 'Rate: [To confirm] · Partner provider — [To confirm]' },
    { icon: '⛵', name: 'Boat excursion', desc: "From the port of Marzamemi or Portopalo, a half-day or full day at sea along the Val di Noto coastline. Swimming in coves, snorkelling, on-board picnic, sunset from the sea.", note: 'Rate: [To confirm] · Partner provider — [To confirm] · Subject to weather and availability' },
    { icon: '🚙', name: 'Car hire', desc: "A car is essential for exploring the region. We can direct you to reliable local rental companies in Noto or at the airport. The villa has private parking for 2 to 3 vehicles — [To confirm capacity].", note: 'Rate: according to provider · [To confirm]' },
  ],
  it: [
    { icon: '🍽', name: 'Chef privato a domicilio', desc: "Un cuoco siciliano viene a preparare una cena o un pasto completo nella cucina della villa. Menu elaborato secondo i vostri gusti e i prodotti locali del mercato di Noto — pesce del giorno, verdure di stagione, pasta fresca, cassata e cannoli fatti in casa. Ideale per una serata senza dover guidare.", note: 'Tariffa: su richiesta · Da prenotare almeno 48h prima' },
    { icon: '🚗', name: 'Trasferimento da Catania (CTA)', desc: "Prelievo all'uscita degli arrivi dell'aeroporto di Catania Fontanarossa, trasferimento diretto alla villa (circa 1h15). Veicolo climatizzato, autista italofono disponibile.", note: "Tariffa: [Da confermare] · Da prenotare prima dell'arrivo" },
    { icon: '🚗', name: 'Trasferimento da Comiso (CIY)', desc: "L'aeroporto di Comiso è il più vicino alla villa. Percorso di circa 45-50 minuti. Ideale se si vola da Parigi Beauvais, Londra o altre destinazioni low-cost.", note: "Tariffa: [Da confermare] · Da prenotare prima dell'arrivo" },
    { icon: '🧹', name: 'Pulizie a metà soggiorno', desc: "Per soggiorni lunghi, è possibile organizzare una pulizia intermedia: pulizia delle suite, cambio biancheria, riordino degli spazi comuni. Frequenza e portata vengono concordate secondo le vostre preferenze.", note: 'Tariffa: [Da confermare] · Incluso o opzione secondo il soggiorno — [Da confermare]' },
    { icon: '👩‍🍳', name: 'Corso di cucina siciliana', desc: "Imparate a preparare i grandi classici della cucina siciliana con uno chef locale: arancini, pasta alla Norma, caponata, granita, cassata. Il corso si svolge nella cucina della villa o all'aperto, seguito dal pasto preparato insieme.", note: 'Tariffa: [Da confermare] · Fornitore partner — [Da confermare]' },
    { icon: '⛵', name: 'Escursione in barca', desc: "Dal porto di Marzamemi o Portopalo, una mezza giornata o giornata in mare lungo la costa del Val di Noto. Nuotata in caletta, snorkeling, pic-nic a bordo, tramonto dal mare.", note: 'Tariffa: [Da confermare] · Fornitore partner — [Da confermare] · In base a meteo e disponibilità' },
    { icon: '🚙', name: 'Noleggio auto', desc: "Un'auto è indispensabile per esplorare la regione. Possiamo indirizzarvi verso noleggiatori locali affidabili a Noto o in aeroporto. La villa dispone di un parcheggio privato per 2-3 veicoli — [Da confermare la capacità].", note: 'Tariffa: secondo il fornitore · [Da confermare]' },
  ],
}

const H = {
  fr: { breadcrumb: 'Services', h1: 'Services et conciergerie', intro: "La villa se loue telle quelle, avec tout le confort inclus. Pour ceux qui souhaitent aller plus loin, nous organisons des services à la carte — toujours avec des prestataires locaux de confiance. Dites-nous ce dont vous avez besoin, nous nous occupons du reste.", included_note: "Ces services sont tous optionnels et viennent en supplément de la location de la villa. Ils se réservent en avance, idéalement au moment de la demande de réservation.", link_villa: '← La villa', link_acces: 'Comment venir →' },
  en: { breadcrumb: 'Services', h1: 'Services & concierge', intro: "The villa rents as-is, with all comfort included. For those who want to go further, we arrange à la carte services — always with trusted local providers. Tell us what you need, we'll take care of the rest.", included_note: "These services are all optional and come in addition to the villa rental. They must be booked in advance, ideally at the time of the booking request.", link_villa: '← The villa', link_acces: 'Getting here →' },
  it: { breadcrumb: 'Servizi', h1: 'Servizi e concierge', intro: "La villa si affitta così com'è, con tutto il comfort incluso. Per chi vuole andare oltre, organizziamo servizi à la carte — sempre con fornitori locali di fiducia. Diteci di cosa avete bisogno, pensiamo noi al resto.", included_note: "Questi servizi sono tutti opzionali e si aggiungono al noleggio della villa. Devono essere prenotati in anticipo, idealmente al momento della richiesta di prenotazione.", link_villa: '← La villa', link_acces: 'Come arrivare →' },
}

export default function ServicesPage({ params }: { params: { locale: string } }) {
  const locale = (LOCALES.includes(params.locale as Lang) ? params.locale : 'fr') as Lang
  const h = H[locale]
  const services = SERVICES[locale]

  return (
    <PageLayout lang={locale} page="services" breadcrumb={h.breadcrumb}>

      <div className="mb-14">
        <p className="section-subtitle">{locale === 'fr' ? 'Sur mesure' : locale === 'en' ? 'Bespoke' : 'Su misura'}</p>
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
        <Link href={`/${locale}/acces`} className="font-sans text-xs tracking-widest uppercase px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-white transition-all duration-300">{h.link_acces}</Link>
      </div>

    </PageLayout>
  )
}
