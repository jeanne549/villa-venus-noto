import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout from '@/components/PageLayout'
import type { Lang } from '@/lib/i18n'
import { hasPlaceholders } from '@/lib/placeholder'
import JsonLd from '@/components/JsonLd'
import { getBreadcrumbSchema } from '@/lib/structured-data'
import PageTracker from '@/components/PageTracker'

const BASE = 'https://www.villavenusnoto.com'
const LOCALES: Lang[] = ['fr', 'en', 'it', 'de']

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }))
}

const META = {
  fr: { title: 'Journal — Séjours, saisons et idées autour de Villa Vénus Noto', description: "L'Infiorata de Noto en mai, les plages du sud-est sicilien en été, la Sicile en septembre. Inspirations de séjour depuis Villa Vénus Noto." },
  en: { title: 'Journal — Stays, Seasons & Ideas around Villa Vénus Noto', description: "Noto's Infiorata in May, southeast Sicily's beaches in summer, Sicily in September. Travel inspiration from Villa Vénus Noto." },
  it: { title: 'Diario — Soggiorni, stagioni e idee intorno a Villa Vénus Noto', description: "L'Infiorata di Noto a maggio, le spiagge del sud-est siciliano in estate, la Sicilia a settembre. Ispirazione di viaggio da Villa Vénus Noto." },
  de: { title: 'Journal — Villa Vénus Noto, Sizilien', description: "Reiseberichte, Ideen und praktische Ratschläge für Ihren Aufenthalt im Südosten Siziliens. Aus der Villa, von den Eigentümern." },
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Lang
  if (!META[locale]) return {}
  const { title, description } = META[locale]
  const robots = hasPlaceholders(ARTICLES[locale]) ? { index: false, follow: true } : { index: true, follow: true }
  return {
    title, description,
    robots,
    alternates: { canonical: `${BASE}/${locale}/journal`, languages: { fr: `${BASE}/fr/journal`, en: `${BASE}/en/journal`, it: `${BASE}/it/journal`, de: `${BASE}/de/journal`, 'x-default': `${BASE}/fr/journal` } },
    openGraph: { title, description, url: `${BASE}/${locale}/journal`, siteName: 'Villa Vénus Noto', images: [{ url: '/og-image.jpg', width: 1200, height: 630 }] },
  }
}

const ARTICLES = {
  fr: [
    { slug: 'infiorata-noto-mai', date: 'Mai', tag: 'Événement', title: "L'Infiorata de Noto : le spectacle de mai que peu de voyageurs voient", excerpt: "Chaque troisième week-end de mai, les rues du centre de Noto se couvrent de tapis de fleurs représentant des scènes de la vie sicilienne. Un événement unique au monde, à deux pas de la villa.", readTime: '4 min' },
    { slug: 'plages-sud-est-sicile', date: 'Juillet · Août', tag: 'Plages', title: "Les plus belles plages du sud-est sicilien depuis Villa Vénus Noto", excerpt: "Vendicari, San Lorenzo, Lido di Noto, Calamosche, Marzamemi : une sélection des plages les plus accessibles et les plus belles depuis la villa, avec les distances et ce qu'on y trouve.", readTime: '6 min' },
    { slug: 'sicile-septembre', date: 'Septembre', tag: 'Saison', title: "Pourquoi septembre est le meilleur mois pour la Sicile", excerpt: "La mer est chaude, les foules ont disparu, la campagne reprend ses couleurs après l'été, les raisins mûrissent dans les vignes du Val di Noto. Un mois à part.", readTime: '5 min' },
  ],
  en: [
    { slug: 'infiorata-noto-may', date: 'May', tag: 'Event', title: "Noto's Infiorata: the May spectacle few travellers see", excerpt: "Every third weekend of May, the streets of Noto's centre are covered with carpets of flowers depicting scenes of Sicilian life. A unique event in the world, just a few kilometres from the villa.", readTime: '4 min' },
    { slug: 'beaches-southeast-sicily', date: 'July · August', tag: 'Beaches', title: "The best beaches of southeast Sicily from Villa Vénus Noto", excerpt: "Vendicari, San Lorenzo, Lido di Noto, Calamosche, Marzamemi: a selection of the most accessible and beautiful beaches from the villa, with distances and what you'll find there.", readTime: '6 min' },
    { slug: 'sicily-in-september', date: 'September', tag: 'Season', title: "Why September is the best month for Sicily", excerpt: "The sea is warm, the crowds have gone, the countryside comes back to life after summer, the grapes ripen in the Val di Noto vineyards. A month apart.", readTime: '5 min' },
  ],
  it: [
    { slug: 'infiorata-noto-maggio', date: 'Maggio', tag: 'Evento', title: "L'Infiorata di Noto: lo spettacolo di maggio che pochi viaggiatori vedono", excerpt: "Ogni terzo weekend di maggio, le strade del centro di Noto si ricoprono di tappeti di fiori raffiguranti scene di vita siciliana. Un evento unico al mondo, a pochi chilometri dalla villa.", readTime: '4 min' },
    { slug: 'spiagge-sud-est-sicilia', date: 'Luglio · Agosto', tag: 'Spiagge', title: "Le più belle spiagge del sud-est siciliano da Villa Vénus Noto", excerpt: "Vendicari, San Lorenzo, Lido di Noto, Calamosche, Marzamemi: una selezione delle spiagge più accessibili e più belle dalla villa, con le distanze e cosa si trova.", readTime: '6 min' },
    { slug: 'sicilia-settembre', date: 'Settembre', tag: 'Stagione', title: "Perché settembre è il mese migliore per la Sicilia", excerpt: "Il mare è caldo, le folle sono sparite, la campagna riprende i suoi colori dopo l'estate, i grappoli maturano nei vigneti del Val di Noto. Un mese a parte.", readTime: '5 min' },
  ],
  de: [
    { slug: 'infiorata-noto-mai', date: 'Mai', tag: 'Veranstaltung', title: "Die Infiorata von Noto: das Maispektakel, das kaum ein Reisender sieht", excerpt: "Jedes dritte Maiwochenende bedecken sich die Straßen des Notoer Zentrums mit Blumenteppichen, die Szenen des sizilianischen Lebens darstellen. Ein weltweit einzigartiges Ereignis, wenige Kilometer von der Villa entfernt.", readTime: '4 Min.' },
    { slug: 'straende-suedost-sizilien', date: 'Juli · August', tag: 'Strände', title: "Die schönsten Strände Südostsiziliens von Villa Vénus Noto", excerpt: "Vendicari, San Lorenzo, Lido di Noto, Calamosche, Marzamemi: eine Auswahl der zugänglichsten und schönsten Strände von der Villa aus, mit Entfernungen und was Sie dort erwartet.", readTime: '6 Min.' },
    { slug: 'sizilien-september', date: 'September', tag: 'Saison', title: "Warum September der beste Monat für Sizilien ist", excerpt: "Das Meer ist warm, die Massen sind verschwunden, die Landschaft erwacht nach dem Sommer zu neuem Leben, die Trauben reifen in den Weinbergen des Val di Noto. Ein besonderer Monat.", readTime: '5 Min.' },
  ],
}

const H = {
  fr: { breadcrumb: 'Journal', h1: 'Journal', sub: 'Inspirations de séjour · Villa Vénus Noto', intro: "Des récits, des idées et des conseils pratiques pour préparer votre séjour dans le sud-est de la Sicile. Écrits depuis la villa, par les propriétaires.", read: 'Lire →', link_noto: 'Noto et les environs →' },
  en: { breadcrumb: 'Journal', h1: 'Journal', sub: 'Travel inspiration · Villa Vénus Noto', intro: "Stories, ideas and practical advice to prepare your stay in southeast Sicily. Written from the villa, by the owners.", read: 'Read →', link_noto: 'Noto & surroundings →' },
  it: { breadcrumb: 'Diario', h1: 'Diario', sub: 'Ispirazione di viaggio · Villa Vénus Noto', intro: "Racconti, idee e consigli pratici per preparare il vostro soggiorno nel sud-est della Sicilia. Scritti dalla villa, dai proprietari.", read: 'Leggi →', link_noto: 'Noto e dintorni →' },
  de: { breadcrumb: 'Journal', h1: 'Journal', sub: 'Reiseinspirationen · Villa Vénus Noto', intro: "Reiseberichte, Ideen und praktische Ratschläge für Ihren Aufenthalt im Südosten Siziliens. Geschrieben von der Villa, von den Eigentümern.", read: 'Lesen →', link_noto: 'Noto & Umgebung →' },
}

export default function JournalPage({ params }: { params: { locale: string } }) {
  const locale = (LOCALES.includes(params.locale as Lang) ? params.locale : 'fr') as Lang
  const h = H[locale]
  const articles = ARTICLES[locale]

  const homeLabel = locale === 'fr' ? 'Accueil' : locale === 'de' ? 'Startseite' : 'Home'
  return (
    <>
      <PageTracker page="journal" lang={locale} />
      <JsonLd data={[getBreadcrumbSchema([
        { name: homeLabel, item: `${BASE}/${locale}` },
        { name: h.breadcrumb, item: `${BASE}/${locale}/journal` },
      ])]} />
      <PageLayout lang={locale} page="journal" breadcrumb={h.breadcrumb}>

      <div className="mb-14">
        <p className="section-subtitle">{h.sub}</p>
        <h1 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight mb-6">{h.h1}</h1>
        <div className="gold-divider" />
        <p className="font-sans text-muted text-base leading-relaxed max-w-xl">{h.intro}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
        {articles.map(article => (
          <Link key={article.slug} href={`/${locale}/journal/${article.slug}`}
            className="group bg-white border border-gold/20 hover:border-gold transition-all duration-300 block">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-sans text-[10px] tracking-[0.15em] uppercase bg-gold/10 text-gold px-2 py-1">{article.tag}</span>
                <span className="font-sans text-[10px] text-muted tracking-wide">{article.date}</span>
              </div>
              <h2 className="font-serif text-xl text-charcoal mb-3 leading-snug group-hover:text-gold transition-colors">{article.title}</h2>
              <p className="font-sans text-muted text-sm leading-relaxed mb-4">{article.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs text-gold tracking-wide">{h.read}</span>
                <span className="font-sans text-[10px] text-muted">{article.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link href={`/${locale}/noto`}
        className="font-sans text-xs tracking-widest uppercase px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-white transition-all duration-300 inline-block">
        {h.link_noto}
      </Link>

    </PageLayout>
    </>
  )
}
