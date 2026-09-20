import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageLayout from '@/components/PageLayout'
import type { Lang } from '@/lib/i18n'
import { hasPlaceholders } from '@/lib/placeholder'
import JsonLd from '@/components/JsonLd'
import { getBreadcrumbSchema } from '@/lib/structured-data'

const BASE = 'https://www.villavenusnoto.com'
const LOCALES: Lang[] = ['fr', 'en', 'it', 'de']

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }))
}

const META = {
  fr: {
    title: 'La villa et les 4 suites — Villa Vénus Noto, Sicile',
    description: '4 suites parentales indépendantes avec véranda privée, piscine 14×7 m et rooftop 360°. Villa privée pour 9 personnes à 5 km de Noto UNESCO. Plans et équipements.',
  },
  en: {
    title: 'The Villa & 4 Suites — Villa Vénus Noto, Sicily',
    description: '4 independent en-suite bedrooms with private verandas, 14×7 m pool and 360° rooftop. Private villa for 9 guests, 5 km from UNESCO Noto. Layout and amenities.',
  },
  it: {
    title: 'La villa e le 4 suite — Villa Vénus Noto, Sicilia',
    description: '4 suite parentali indipendenti con veranda, piscina 14×7 m e rooftop 360°. Villa privata per 9 persone a 5 km da Noto UNESCO. Planimetria e servizi.',
  },
  de: {
    title: 'Die Villa & 4 Suiten — Villa Vénus Noto, Sizilien',
    description: '4 unabhängige Master-Suiten mit privater Veranda, Pool 14×7 m und 360°-Rooftop. Privatvilla für 9 Personen, 5 km vom UNESCO-Noto. Grundriss und Ausstattung.',
  },
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Lang
  if (!META[locale]) return {}
  const { title, description } = META[locale]
  const robots = hasPlaceholders(CONTENT[locale]) ? { index: false, follow: true } : { index: true, follow: true }
  return {
    title, description,
    robots,
    alternates: {
      canonical: `${BASE}/${locale}/villa`,
      languages: { fr: `${BASE}/fr/villa`, en: `${BASE}/en/villa`, it: `${BASE}/it/villa`, de: `${BASE}/de/villa`, 'x-default': `${BASE}/fr/villa` },
    },
    openGraph: { title, description, url: `${BASE}/${locale}/villa`, siteName: 'Villa Vénus Noto', images: [{ url: '/og-image.jpg', width: 1200, height: 630 }] },
  }
}

const CONTENT = {
  fr: {
    breadcrumb: 'La villa',
    h1: 'La villa et les 4 suites',
    intro: "Construite en pierre de tuf locale, Villa Vénus Noto est une propriété privée pour 9 personnes nichée dans la campagne sicilienne, à 5 km du centre baroque de Noto classé au Patrimoine Mondial UNESCO. Elle réunit sur un seul domaine ce que la Sicile offre de plus rare : l'espace, le silence, la lumière — et une piscine de 14 m × 7 m.",
    suites_h2: 'Les 4 suites parentales',
    suites_intro: "Chaque suite est autonome, avec sa propre salle de bain et sa terrasse ou véranda privée donnant sur les jardins ou la piscine. Personne ne partage rien — c'est le principe de la villa.",
    suites: [
      { name: 'Suite Agave', vue: 'Vue piscine', desc: "Ouverte sur la piscine, la suite Agave bénéficie de la meilleure exposition. Le matin, la lumière entre directement depuis la terrasse.", img: '/photos/esp-piscine-rooftop.jpg', alt: 'Suite Agave — véranda face à la piscine' },
      { name: 'Suite Bougainvillea', vue: 'Vue jardin', desc: "Côté jardins, la suite Bougainvillea s'ouvre sur une véranda ombragée. Calme absolu et parfum de bougainvilliers.", img: '/photos/esp-bougainvillea.jpg', alt: 'Suite Bougainvillea — véranda sur le jardin' },
      { name: 'Suite Gelsomino', vue: 'Vue jardin', desc: "Exposition jardins également, la suite Gelsomino est baignée du parfum des fleurs le soir. Véranda privée.", img: '/photos/esp-gelsomino.jpg', alt: 'Suite Gelsomino — véranda et jardin' },
      { name: 'Suite Limone', vue: 'Chambre intérieure', desc: "Plus intime, la suite Limone est la chambre la plus fraîche en été. Idéale pour les nuits de forte chaleur.", img: '/photos/esp-patio.jpg', alt: 'Suite Limone — chambre intérieure' },
    ],
    included_h3: 'Dans chaque suite',
    included: ['Salle de bain privée', 'Véranda ou terrasse', 'Climatisation', 'Linge de maison fourni', 'Rangements spacieux'],
    spaces_h2: 'Les espaces communs',
    spaces: [
      { name: 'Piscine · 14 m × 7 m', desc: "Grande piscine privée entourée de bains de soleil balinais, d'un salon sous pergola avec drapés blancs et d'un four à bois. L'axe principal de la villa, où se passent les journées.", img: '/photos/piscine.jpg', alt: 'Piscine 14x7m et pergola' },
      { name: 'Rooftop · Vue 360°', desc: "Au sommet de la villa : salon lounge, lit de repos, grande table et cuisine extérieure. Le soir, vue imprenable sur les collines de Noto, les oliviers et, par temps clair, la mer Ionienne.", img: '/photos/rooftop.jpg', alt: 'Rooftop panoramique au coucher du soleil' },
      { name: 'Jardins méditerranéens', desc: "Oliviers centenaires, amandiers, citronniers et bougainvilliers entourent la villa. Les jardins sont libres d'accès à toute heure — une invitation permanente à la promenade.", img: '/photos/jardins.jpg', alt: 'Jardins méditerranéens de la villa' },
    ],
    villa_included_h2: 'Inclus dans la location',
    villa_included: ['Piscine privée (accès illimité)', 'Linge de maison et serviettes de piscine', 'Wi-Fi haut débit', 'Climatisation dans toutes les suites', 'Parking privé sur le domaine', 'Four à bois · Barbecue · Plancha', 'Cuisine extérieure sur le rooftop'],
    nav_h2: 'Explorer la villa',
    nav_links: [
      { href: '/fr/tarifs', label: 'Tarifs et disponibilités →' },
      { href: '/fr/services', label: 'Services et conciergerie →' },
      { href: '/fr/acces', label: 'Comment venir →' },
      { href: '/fr/noto', label: 'Noto et les environs →' },
    ],
  },
  en: {
    breadcrumb: 'The villa',
    h1: 'The villa and the 4 suites',
    intro: "Built in local tuff stone, Villa Vénus Noto is a private property for 9 people, nestled in the Sicilian countryside 5 km from the UNESCO-listed baroque centre of Noto. In one estate, it brings together what Sicily offers at its rarest: space, silence, light — and a 14 m × 7 m private pool.",
    suites_h2: 'The 4 master suites',
    suites_intro: "Each suite is self-contained, with its own bathroom and private terrace or veranda overlooking the gardens or pool. No one shares anything — that's the villa's principle.",
    suites: [
      { name: 'Suite Agave', vue: 'Pool view', desc: "Opening onto the pool, Suite Agave has the best exposure. In the morning, light comes directly from the terrace.", img: '/photos/esp-piscine-rooftop.jpg', alt: 'Suite Agave — veranda facing the pool' },
      { name: 'Suite Bougainvillea', vue: 'Garden view', desc: "On the garden side, Suite Bougainvillea opens onto a shaded veranda. Absolute calm and the scent of bougainvilleas.", img: '/photos/esp-bougainvillea.jpg', alt: 'Suite Bougainvillea — garden veranda' },
      { name: 'Suite Gelsomino', vue: 'Garden view', desc: "Also facing the gardens, Suite Gelsomino is filled with the scent of flowers in the evening. Private veranda.", img: '/photos/esp-gelsomino.jpg', alt: 'Suite Gelsomino — veranda and garden' },
      { name: 'Suite Limone', vue: 'Interior room', desc: "More intimate, Suite Limone is the coolest room in summer. Ideal for hot nights.", img: '/photos/esp-patio.jpg', alt: 'Suite Limone — interior room' },
    ],
    included_h3: 'In every suite',
    included: ['Private bathroom', 'Veranda or private terrace', 'Air conditioning', 'Bed linen and towels provided', 'Spacious storage'],
    spaces_h2: 'Common spaces',
    spaces: [
      { name: 'Pool · 14 m × 7 m', desc: "Large private pool surrounded by Balinese sun loungers, a lounge under a white-draped pergola and a wood-fired oven. The main axis of the villa, where days unfold.", img: '/photos/piscine.jpg', alt: '14x7m pool and pergola' },
      { name: 'Rooftop · 360° view', desc: "At the top of the villa: lounge, daybed, large table and outdoor kitchen. In the evening, sweeping views over Noto's hills, olive groves and, on clear days, the Ionian Sea.", img: '/photos/rooftop.jpg', alt: 'Panoramic rooftop at sunset' },
      { name: 'Mediterranean gardens', desc: "Century-old olive trees, almond trees, lemon trees and bougainvilleas surround the villa. The gardens are accessible at all hours — a permanent invitation to wander.", img: '/photos/jardins.jpg', alt: 'Villa Mediterranean gardens' },
    ],
    villa_included_h2: 'Included in the rental',
    villa_included: ['Private pool (unlimited access)', 'Bed linen and pool towels', 'High-speed Wi-Fi', 'Air conditioning in all suites', 'Private parking', 'Wood-fired oven · BBQ · Plancha', 'Outdoor kitchen on the rooftop'],
    nav_h2: 'Explore the villa',
    nav_links: [
      { href: '/en/rates', label: 'Rates & availability →' },
      { href: '/en/services', label: 'Services & concierge →' },
      { href: '/en/getting-here', label: 'Getting here →' },
      { href: '/en/noto', label: 'Noto & surroundings →' },
    ],
  },
  it: {
    breadcrumb: 'La villa',
    h1: 'La villa e le 4 suite',
    intro: "Costruita in pietra di tufo locale, Villa Vénus Noto è una proprietà privata per 9 persone immersa nella campagna siciliana, a 5 km dal centro barocco di Noto, patrimonio mondiale UNESCO. Riunisce in un unico dominio ciò che la Sicilia offre di più raro: spazio, silenzio, luce — e una piscina privata di 14 m × 7 m.",
    suites_h2: 'Le 4 suite parentali',
    suites_intro: "Ogni suite è autonoma, con il proprio bagno e la propria terrazza o veranda privata che si affaccia sui giardini o sulla piscina. Nessuno condivide nulla — è il principio della villa.",
    suites: [
      { name: 'Suite Agave', vue: 'Vista piscina', desc: "Aperta sulla piscina, la suite Agave ha la migliore esposizione. Al mattino, la luce entra direttamente dalla terrazza.", img: '/photos/esp-piscine-rooftop.jpg', alt: 'Suite Agave — veranda fronte piscina' },
      { name: 'Suite Bougainvillea', vue: 'Vista giardino', desc: "Sul lato dei giardini, la suite Bougainvillea si apre su una veranda ombrosa. Silenzio assoluto e profumo di bouganville.", img: '/photos/esp-bougainvillea.jpg', alt: 'Suite Bougainvillea — veranda sul giardino' },
      { name: 'Suite Gelsomino', vue: 'Vista giardino', desc: "Anche affacciata sui giardini, la suite Gelsomino è profumata di fiori la sera. Veranda privata.", img: '/photos/esp-gelsomino.jpg', alt: 'Suite Gelsomino — veranda e giardino' },
      { name: 'Suite Limone', vue: 'Camera interna', desc: "Più intima, la suite Limone è la camera più fresca d'estate. Ideale per le notti di grande caldo.", img: '/photos/esp-patio.jpg', alt: 'Suite Limone — camera interna' },
    ],
    included_h3: 'In ogni suite',
    included: ['Bagno privato', 'Veranda o terrazza privata', 'Aria condizionata', 'Biancheria da letto e asciugamani inclusi', 'Spazio armadio ampio'],
    spaces_h2: 'Spazi comuni',
    spaces: [
      { name: 'Piscina · 14 m × 7 m', desc: "Grande piscina privata circondata da lettini balinesi, un salotto sotto un pergolato con drappeggi bianchi e un forno a legna. L'asse principale della villa, dove si trascorrono le giornate.", img: '/photos/piscine.jpg', alt: 'Piscina 14x7m e pergolato' },
      { name: 'Rooftop · Vista 360°', desc: "In cima alla villa: salotto lounge, letto relax, grande tavolo e cucina esterna. La sera, vista mozzafiato sulle colline di Noto, gli uliveti e, con cielo sereno, il Mar Ionio.", img: '/photos/rooftop.jpg', alt: 'Rooftop panoramico al tramonto' },
      { name: 'Giardini mediterranei', desc: "Ulivi centenari, mandorli, limoni e bouganville circondano la villa. I giardini sono accessibili a qualsiasi ora — un invito permanente a passeggiare.", img: '/photos/jardins.jpg', alt: 'Giardini mediterranei della villa' },
    ],
    villa_included_h2: 'Incluso nel noleggio',
    villa_included: ['Piscina privata (accesso illimitato)', 'Biancheria da letto e asciugamani da piscina', 'Wi-Fi ad alta velocità', 'Aria condizionata in tutte le suite', 'Parcheggio privato', 'Forno a legna · Barbecue · Plancha', 'Cucina esterna sul rooftop'],
    nav_h2: 'Scopri la villa',
    nav_links: [
      { href: '/it/tariffe', label: 'Tariffe e disponibilità →' },
      { href: '/it/services', label: 'Servizi e concierge →' },
      { href: '/it/come-arrivare', label: 'Come arrivare →' },
      { href: '/it/noto', label: 'Noto e dintorni →' },
    ],
  },
  de: {
    breadcrumb: 'Die Villa',
    h1: 'Die Villa und die 4 Suiten',
    intro: "Aus lokalem Tuffstein erbaut ist Villa Vénus Noto ein Privatanwesen für 9 Personen, eingebettet in die sizilianische Landschaft, 5 km vom UNESCO-Welterbe-Barockzentrum von Noto entfernt. Auf einem einzigen Domäne vereint es, was Sizilien an Seltenem bietet: Raum, Stille, Licht — und einen privaten Pool von 14 m × 7 m.",
    suites_h2: 'Die 4 Master-Suiten',
    suites_intro: "Jede Suite ist selbstständig, mit eigenem Bad und eigener Terrasse oder Veranda mit Blick auf die Gärten oder den Pool. Niemand teilt irgendetwas — das ist das Prinzip der Villa.",
    suites: [
      { name: 'Suite Agave', vue: 'Poolblick', desc: "Mit Blick auf den Pool hat die Suite Agave die beste Ausrichtung. Am Morgen fällt das Licht direkt von der Terrasse.", img: '/photos/esp-piscine-rooftop.jpg', alt: 'Suite Agave — Veranda mit Poolblick' },
      { name: 'Suite Bougainvillea', vue: 'Gartenblick', desc: "Zur Gartenseite hin öffnet sich die Suite Bougainvillea auf eine schattige Veranda. Absolute Ruhe und der Duft der Bougainvilleen.", img: '/photos/esp-bougainvillea.jpg', alt: 'Suite Bougainvillea — Gartenveranda' },
      { name: 'Suite Gelsomino', vue: 'Gartenblick', desc: "Ebenfalls zum Garten hin, ist die Suite Gelsomino abends vom Blumenduft erfüllt. Private Veranda.", img: '/photos/esp-gelsomino.jpg', alt: 'Suite Gelsomino — Veranda und Garten' },
      { name: 'Suite Limone', vue: 'Innenzimmer', desc: "Die intimere Suite Limone ist das kühlste Zimmer im Sommer. Ideal für heiße Nächte.", img: '/photos/esp-patio.jpg', alt: 'Suite Limone — Innenzimmer' },
    ],
    included_h3: 'In jeder Suite',
    included: ['Eigenes Bad', 'Veranda oder private Terrasse', 'Klimaanlage', 'Bettwäsche und Handtücher inklusive', 'Geräumige Schränke'],
    spaces_h2: 'Gemeinschaftsbereiche',
    spaces: [
      { name: 'Pool · 14 m × 7 m', desc: "Großer privater Pool umgeben von balinesischen Liegestühlen, einem Salon unter einer weißen Pergola und einem Holzbackofen. Die Hauptachse der Villa, wo die Tage verbracht werden.", img: '/photos/piscine.jpg', alt: 'Pool 14x7m und Pergola' },
      { name: 'Rooftop · 360°-Aussicht', desc: "An der Spitze der Villa: Lounge, Liegebett, großer Tisch und Außenküche. Abends unverbaubare Sicht über die Hügel von Noto, die Olivenhaine und bei klarem Wetter das Ionische Meer.", img: '/photos/rooftop.jpg', alt: 'Panorama-Rooftop bei Sonnenuntergang' },
      { name: 'Mediterrane Gärten', desc: "Jahrhundertealte Olivenbäume, Mandelbäume, Zitronenbäume und Bougainvilleen umgeben die Villa. Die Gärten sind jederzeit zugänglich — eine ständige Einladung zum Spazierengehen.", img: '/photos/jardins.jpg', alt: 'Mediterrane Gärten der Villa' },
    ],
    villa_included_h2: 'Im Mietpreis enthalten',
    villa_included: ['Privater Pool (unbegrenzter Zugang)', 'Bettwäsche und Poolhandtücher', 'Hochgeschwindigkeits-WLAN', 'Klimaanlage in allen Suiten', 'Privater Parkplatz', 'Holzbackofen · Grill · Plancha', 'Außenküche auf dem Rooftop'],
    nav_h2: 'Die Villa erkunden',
    nav_links: [
      { href: '/de/preise', label: 'Preise und Verfügbarkeit →' },
      { href: '/de/leistungen', label: 'Leistungen & Concierge →' },
      { href: '/de/anreise', label: 'Anreise →' },
      { href: '/de/noto', label: 'Noto & Umgebung →' },
    ],
  },
}

export default function VillaPage({ params }: { params: { locale: string } }) {
  const locale = (LOCALES.includes(params.locale as Lang) ? params.locale : 'fr') as Lang
  const c = CONTENT[locale]

  const homeLabel = locale === 'fr' ? 'Accueil' : locale === 'de' ? 'Startseite' : 'Home'
  return (
    <>
      <JsonLd data={[getBreadcrumbSchema([
        { name: homeLabel, item: `${BASE}/${locale}` },
        { name: c.breadcrumb, item: `${BASE}/${locale}/villa` },
      ])]} />
      <PageLayout lang={locale} page="villa" breadcrumb={c.breadcrumb}>

      {/* Hero heading */}
      <div className="mb-14">
        <p className="section-subtitle">{locale === 'fr' ? 'La villa' : locale === 'en' ? 'The villa' : 'La villa'}</p>
        <h1 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight mb-6">{c.h1}</h1>
        <div className="gold-divider" />
        <p className="font-sans text-muted text-base leading-relaxed max-w-2xl">{c.intro}</p>
      </div>

      {/* Hero image */}
      <div className="relative h-72 md:h-96 overflow-hidden mb-16">
        <Image src="/photos/histoire.jpg" alt="Villa Vénus Noto — vue depuis le salon extérieur" fill sizes="(max-width: 1024px) 100vw, 980px" className="object-cover object-center" />
      </div>

      {/* Suites */}
      <section className="mb-16">
        <h2 className="font-serif text-3xl text-charcoal mb-3">{c.suites_h2}</h2>
        <div className="w-10 h-px bg-gold mb-6" />
        <p className="font-sans text-muted text-sm leading-relaxed mb-10 max-w-xl">{c.suites_intro}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {c.suites.map((suite) => (
            <div key={suite.name} className="bg-white border border-gold/20">
              <div className="relative h-52 overflow-hidden">
                <Image src={suite.img} alt={suite.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-center" />
                <div className="absolute top-4 left-4 bg-navy text-white font-sans text-[10px] tracking-[0.2em] uppercase px-3 py-1">
                  {suite.vue}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl text-charcoal mb-2">{suite.name}</h3>
                <p className="font-sans text-muted text-sm leading-relaxed mb-4">{suite.desc}</p>
                <div className="border-t border-gold/20 pt-4">
                  <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-muted mb-2">{c.included_h3}</p>
                  <ul className="grid grid-cols-2 gap-1">
                    {c.included.map(item => (
                      <li key={item} className="font-sans text-xs text-charcoal flex items-center gap-1.5">
                        <span className="text-gold-text text-[10px]">✓</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Common spaces */}
      <section className="mb-16">
        <h2 className="font-serif text-3xl text-charcoal mb-3">{c.spaces_h2}</h2>
        <div className="w-10 h-px bg-gold mb-10" />
        <div className="space-y-10">
          {c.spaces.map((space, i) => (
            <div key={space.name} className={`grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch ${i % 2 === 1 ? 'md:[direction:rtl]' : ''}`}>
              <div className={`relative h-64 overflow-hidden ${i % 2 === 1 ? 'md:[direction:ltr]' : ''}`}>
                <Image src={space.img} alt={space.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-center" />
              </div>
              <div className={`bg-white flex flex-col justify-center px-8 py-10 ${i % 2 === 1 ? 'md:[direction:ltr]' : ''}`}>
                <h3 className="font-serif text-xl text-charcoal mb-4">{space.name}</h3>
                <p className="font-sans text-muted text-sm leading-relaxed">{space.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Included */}
      <section className="bg-linen border border-gold/20 p-8 mb-16">
        <h2 className="font-serif text-2xl text-charcoal mb-6">{c.villa_included_h2}</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {c.villa_included.map(item => (
            <li key={item} className="font-sans text-sm text-charcoal flex items-center gap-2">
              <span className="text-gold-text font-semibold">✓</span>{item}
            </li>
          ))}
        </ul>
      </section>

      {/* Internal nav */}
      <section>
        <h2 className="font-serif text-2xl text-charcoal mb-6">{c.nav_h2}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {c.nav_links.map(link => (
            <Link key={link.href} href={link.href}
              className="block bg-white border border-gold/30 px-6 py-4 font-sans text-sm text-navy hover:border-gold hover:bg-gold/5 transition-all duration-200">
              {link.label}
            </Link>
          ))}
        </div>
      </section>

    </PageLayout>
    </>
  )
}
