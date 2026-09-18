import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import PageLayout from '@/components/PageLayout'
import type { Lang } from '@/lib/i18n'
import { hasPlaceholders } from '@/lib/placeholder'

const BASE = 'https://www.villavenusnoto.com'
const LOCALES: Lang[] = ['fr', 'en', 'it']

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }))
}

const META = {
  fr: { title: 'Mariage et anniversaire à Noto — Villa Vénus Noto privatisée', description: 'Villa entière pour votre groupe : rooftop pour la cérémonie, jardins, piscine privée. Jusqu\'à 9 personnes. Chef et conciergerie sur mesure à Noto, Sicile.' },
  en: { title: 'Weddings & Celebrations in Noto — Villa Vénus Noto Exclusive Hire', description: 'Exclusive use of the villa: rooftop for ceremonies, private pool, Mediterranean gardens. Up to 9 guests. Private chef and concierge in Noto, Sicily.' },
  it: { title: 'Matrimoni e celebrazioni a Noto — Villa Vénus Noto in esclusiva', description: 'Villa intera per il vostro gruppo: rooftop per la cerimonia, piscina privata, giardini. Fino a 9 persone. Chef privato e concierge a Noto, Sicilia.' },
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Lang
  if (!META[locale]) return {}
  const { title, description } = META[locale]
  const robots = hasPlaceholders(C[locale]) ? { index: false, follow: true } : { index: true, follow: true }
  return {
    title, description,
    robots,
    alternates: { canonical: `${BASE}/${locale}/evenements`, languages: { fr: `${BASE}/fr/evenements`, en: `${BASE}/en/evenements`, it: `${BASE}/it/evenements`, 'x-default': `${BASE}/fr/evenements` } },
    openGraph: { title, description, url: `${BASE}/${locale}/evenements`, siteName: 'Villa Vénus Noto', images: [{ url: '/og-image.jpg', width: 1200, height: 630 }] },
  }
}

const C = {
  fr: {
    breadcrumb: 'Événements',
    sub: 'Villa privatisée · Noto, Sicile',
    h1: 'Mariages, anniversaires\net retrouvailles en famille',
    intro: "La villa se prête naturellement aux petits groupes qui souhaitent partager quelque chose d'exceptionnel. Mariage intime, anniversaire marquant, retrouvailles de famille : quand la villa est la vôtre, tout le domaine l'est aussi — piscine, rooftop, jardins, du lever du soleil jusqu'à la nuit.",
    why_h2: 'Pourquoi la villa pour votre événement',
    why: [
      { title: 'Le rooftop comme scène', desc: "Vue à 360° sur les collines de Noto et la mer Ionienne. Table pour 10 à 12 personnes, cuisine extérieure complète, espace lounge. Le coucher de soleil sicilien comme décor naturel." },
      { title: 'Piscine et jardins privatisés', desc: "La piscine de 14 m × 7 m et les jardins méditerranéens sont pour vous seuls pendant tout votre séjour. Aucun voisin, aucun inconnu — juste votre groupe." },
      { title: '4 suites indépendantes', desc: "Chaque famille ou couple dispose de sa propre suite avec salle de bain et terrasse. Personne ne dort sur un canapé — tout le monde a son espace." },
      { title: 'Conciergerie sur mesure', desc: "Chef privé, fleuriste, photographe, musicien : nous vous aidons à organiser selon vos souhaits. Dites-nous ce que vous imaginez, nous trouvons qui le fait." },
    ],
    ideal_h2: 'Idéal pour',
    ideal: ['Mariage intime (cérémonie laïque ou religieuse à Noto)', 'Enterrement de vie de jeune fille / garçon', 'Anniversaire important (40, 50, 60 ans…)', 'Retrouvailles de famille ou de lycée', 'Séminaire résidentiel en petit comité', 'Voyage de noces prolongé'],
    capacity_h2: 'Capacité et logistique',
    capacity_note: "La villa héberge jusqu'à 9 personnes en 4 suites. Pour des événements avec des invités extérieurs (en journée uniquement), contactez-nous pour discuter de la faisabilité — [À confirmer selon le cadre de la propriété].",
    cta_h2: 'Parlez-nous de votre projet',
    cta_text: "Chaque événement est différent. Envoyez-nous un message avec vos dates, le nombre de personnes et ce que vous imaginez : nous vous répondons dans les 24h avec une proposition.",
  },
  en: {
    breadcrumb: 'Events',
    sub: 'Exclusive hire · Noto, Sicily',
    h1: 'Weddings, birthdays\nand family gatherings',
    intro: "The villa naturally lends itself to small groups who want to share something exceptional. An intimate wedding, a milestone birthday, a family reunion: when the villa is yours, the whole estate is too — pool, rooftop, gardens, from sunrise to night.",
    why_h2: 'Why the villa for your event',
    why: [
      { title: 'The rooftop as a stage', desc: "360° views over Noto's hills and the Ionian Sea. Table for 10 to 12 people, full outdoor kitchen, lounge area. The Sicilian sunset as your natural backdrop." },
      { title: 'Private pool and gardens', desc: "The 14 m × 7 m pool and Mediterranean gardens are yours alone throughout your stay. No neighbours, no strangers — just your group." },
      { title: '4 independent suites', desc: "Each family or couple has their own suite with private bathroom and terrace. No one sleeps on a sofa — everyone has their own space." },
      { title: 'Bespoke concierge', desc: "Private chef, florist, photographer, musician: we help you organise according to your wishes. Tell us what you have in mind and we'll find who makes it happen." },
    ],
    ideal_h2: 'Perfect for',
    ideal: ['Intimate wedding (civil or religious ceremony in Noto)', 'Hen party or stag do', 'Milestone birthday (40, 50, 60…)', 'Family or school reunion', 'Small corporate retreat', 'Extended honeymoon'],
    capacity_h2: 'Capacity and logistics',
    capacity_note: 'The villa sleeps up to 9 people in 4 suites. For events with outside guests (daytime only), contact us to discuss feasibility — [To confirm based on property framework].',
    cta_h2: 'Tell us about your project',
    cta_text: "Every event is different. Send us a message with your dates, number of people and what you have in mind: we'll reply within 24 hours with a proposal.",
  },
  it: {
    breadcrumb: 'Eventi',
    sub: 'Villa in esclusiva · Noto, Sicilia',
    h1: 'Matrimoni, compleanni\ne riunioni di famiglia',
    intro: "La villa si presta naturalmente ai piccoli gruppi che vogliono condividere qualcosa di eccezionale. Un matrimonio intimo, un compleanno importante, una riunione di famiglia: quando la villa è vostra, lo è anche l'intero dominio — piscina, rooftop, giardini, dall'alba alla notte.",
    why_h2: 'Perché la villa per il vostro evento',
    why: [
      { title: 'Il rooftop come palcoscenico', desc: "Vista a 360° sulle colline di Noto e il Mar Ionio. Tavolo per 10-12 persone, cucina esterna completa, area lounge. Il tramonto siciliano come scenario naturale." },
      { title: 'Piscina e giardini in esclusiva', desc: "La piscina di 14 m × 7 m e i giardini mediterranei sono solo vostri per tutta la durata del soggiorno. Nessun vicino, nessuno sconosciuto — solo il vostro gruppo." },
      { title: '4 suite indipendenti', desc: "Ogni famiglia o coppia ha la propria suite con bagno privato e terrazza. Nessuno dorme sul divano — tutti hanno il proprio spazio." },
      { title: 'Concierge su misura', desc: "Chef privato, fiorista, fotografo, musicista: vi aiutiamo a organizzare secondo i vostri desideri. Diteci cosa immaginate e troveremo chi lo realizzerà." },
    ],
    ideal_h2: 'Ideale per',
    ideal: ['Matrimonio intimo (cerimonia civile o religiosa a Noto)', 'Addio al nubilato / celibato', 'Compleanno importante (40, 50, 60 anni…)', 'Riunione di famiglia o ex compagni', 'Piccolo seminario residenziale', 'Luna di miele prolungata'],
    capacity_h2: 'Capacità e logistica',
    capacity_note: 'La villa ospita fino a 9 persone in 4 suite. Per eventi con ospiti esterni (solo in giornata), contattateci per discutere la fattibilità — [Da confermare in base al regolamento della proprietà].',
    cta_h2: 'Parlateci del vostro progetto',
    cta_text: "Ogni evento è diverso. Inviateci un messaggio con le date, il numero di persone e cosa avete in mente: risponderemo entro 24 ore con una proposta.",
  },
}

export default function EvenementsPage({ params }: { params: { locale: string } }) {
  const locale = (LOCALES.includes(params.locale as Lang) ? params.locale : 'fr') as Lang
  const c = C[locale]

  return (
    <PageLayout lang={locale} page="evenements" breadcrumb={c.breadcrumb} heroImg="/photos/esp-rooftop-table.jpg" heroAlt="Rooftop de Villa Vénus Noto au coucher du soleil">

      <div className="mb-14">
        <p className="section-subtitle">{c.sub}</p>
        <h1 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight mb-6 whitespace-pre-line">{c.h1}</h1>
        <div className="gold-divider" />
        <p className="font-sans text-muted text-base leading-relaxed max-w-2xl">{c.intro}</p>
      </div>

      <section className="mb-14">
        <h2 className="font-serif text-2xl text-charcoal mb-3">{c.why_h2}</h2>
        <div className="w-10 h-px bg-gold mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {c.why.map(w => (
            <div key={w.title} className="bg-white border border-gold/20 p-6">
              <h3 className="font-serif text-lg text-charcoal mb-3">{w.title}</h3>
              <p className="font-sans text-muted text-sm leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
        <section className="bg-linen border border-gold/20 p-6">
          <h2 className="font-serif text-xl text-charcoal mb-4">{c.ideal_h2}</h2>
          <ul className="space-y-2">
            {c.ideal.map(item => (
              <li key={item} className="font-sans text-sm text-charcoal flex items-start gap-2">
                <span className="text-gold flex-shrink-0">›</span>{item}
              </li>
            ))}
          </ul>
        </section>
        <section className="bg-white border border-gold/20 p-6">
          <h2 className="font-serif text-xl text-charcoal mb-3">{c.capacity_h2}</h2>
          <p className="font-sans text-sm text-muted leading-relaxed">{c.capacity_note}</p>
          <div className="mt-6 relative h-48 overflow-hidden">
            <Image src="/photos/pf-vue360.jpg" alt="Vue panoramique rooftop" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-center" />
          </div>
        </section>
      </div>

      <section className="bg-navy text-white p-8">
        <h2 className="font-serif text-2xl mb-4">{c.cta_h2}</h2>
        <p className="font-sans text-white/70 text-sm mb-6 max-w-xl">{c.cta_text}</p>
        <Link href={`/${locale}#contact`}
          className="inline-block font-sans text-xs tracking-widest uppercase px-8 py-3 bg-gold text-white hover:bg-gold/80 transition-all duration-300">
          {locale === 'fr' ? 'Nous écrire →' : locale === 'en' ? 'Write to us →' : 'Scrivici →'}
        </Link>
      </section>

    </PageLayout>
  )
}
