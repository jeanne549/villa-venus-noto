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
    title: 'Plages du Val di Noto — Villa Vénus Noto',
    description: 'Guide des plus belles plages du sud-est sicilien depuis Villa Vénus Noto : Vendicari, Calamosche, San Lorenzo, Lido di Noto, Marzamemi. Distances, accès, conseils.',
  },
  en: {
    title: 'Beaches of Southeast Sicily — Villa Vénus Noto',
    description: 'Guide to the best beaches of the Val di Noto from Villa Vénus Noto: Vendicari, Calamosche, San Lorenzo, Lido di Noto, Marzamemi. Distances, access, tips.',
  },
  it: {
    title: 'Spiagge del Val di Noto — Villa Vénus Noto',
    description: 'Guida alle più belle spiagge del sud-est siciliano da Villa Vénus Noto: Vendicari, Calamosche, San Lorenzo, Lido di Noto, Marzamemi. Distanze, accesso, consigli.',
  },
  de: {
    title: 'Strände des Val di Noto — Villa Vénus Noto',
    description: 'Guide zu den schönsten Stränden Südostsiziliens von Villa Vénus Noto: Vendicari, Calamosche, San Lorenzo, Lido di Noto, Marzamemi. Entfernungen, Zugang, Tipps.',
  },
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Lang
  if (!META[locale]) return {}
  const { title, description } = META[locale]
  return {
    title, description,
    robots: { index: true, follow: true },
    alternates: buildAlternates('plages', locale),
    openGraph: { title, description, url: `${BASE}/${locale}/plages`, siteName: 'Villa Vénus Noto', images: [{ url: '/og-image.jpg', width: 1200, height: 630 }] },
  }
}

type Beach = {
  name: string; dist: string; time: string; label: string
  desc: string; access: string; tip: string
}
type Content = {
  breadcrumb: string; h1: string; sub: string; intro: string
  beaches: Beach[]
  practical_title: string
  practical: Array<{ heading: string; text: string }>
  link_noto: string; link_villa: string
}

const CONTENT: Record<Lang, Content> = {
  fr: {
    breadcrumb: 'Plages',
    h1: 'Les plages du Val di Noto',
    sub: 'Cinq plages en moins de 25 minutes depuis la villa',
    intro: "La côte du Val di Noto est l'une des plus préservées de Méditerranée. Pas de constructions massives, pas de jet-ski en masse. Des réserves naturelles, des calanques de sable blanc, une eau turquoise transparente jusqu'au fond. La villa est à 5 kilomètres de Noto et à moins de 25 minutes de cinq des plus belles plages de Sicile.",
    beaches: [
      {
        name: 'Vendicari', dist: '8 km', time: '12 min', label: 'Réserve naturelle',
        desc: "La réserve de Vendicari s'étend sur 8 kilomètres de côte et abrite plusieurs plages successives séparées par des sentiers à travers la garrigue : Torre Vendicari, Eloro, Pillirina. Chacune a sa personnalité. La réserve accueille aussi des flamants roses et des hérons en automne et au printemps.",
        access: "Accès libre. Ticket d'entrée : 3,50 € (7 € famille). Parking : 2-3 €. Cinq entrées sur la SP19 Noto-Pachino.",
        tip: "En juillet-août, arrivez avant 9h — les parkings se remplissent vite. Hors saison, accès souvent gratuit.",
      },
      {
        name: 'Calamosche', dist: '12 km', time: '15 min + 20 min à pied', label: 'La plus belle — Réserve Vendicari',
        desc: "Un arc de sable parfait protégé par deux pointes rocheuses, eaux peu profondes, couleurs impossibles. Régulièrement classée parmi les dix plus belles plages d'Italie. Aucune infrastructure — ni transats, ni buvette. On y accède à pied depuis le parking de l'entrée nord de la réserve.",
        access: "Parking entrée nord Vendicari (SP19). Chemin balisé de 20 minutes. Accès piétons uniquement.",
        tip: "Apportez eau, pique-nique et crème solaire — rien sur place. La baignade est idéale le matin (eau calme, moins de monde).",
      },
      {
        name: 'San Lorenzo', dist: '12 km', time: '15 min', label: 'Sauvage et tranquille',
        desc: "Une longue plage de sable entre deux massifs calcaires. Moins connue que Vendicari, directement accessible en voiture, plus ouverte sur la mer. Quelques barques de pêcheurs à l'ancre le matin. L'une des plages les plus calmes de la région.",
        access: "Route directe depuis Noto, parking gratuit sur le bord. Plage libre, pas de ticket d'entrée.",
        tip: "Idéale pour les matins calmes ou les journées de hors-saison. Peu d'ombre naturelle — parasol recommandé.",
      },
      {
        name: 'Lido di Noto', dist: '15 km', time: '20 min', label: 'Équipée — Pratique',
        desc: "La plage de Noto proprement dite : sable fin, eau claire, plusieurs établissements balnéaires avec transats et parasols en location. Restaurants et cafés sur place. Le compromis pratique pour les journées sans effort.",
        access: "Accès direct, parking payant en saison. Transats et parasols (~15 € la journée). Douches disponibles.",
        tip: "Bien adaptée aux familles avec enfants : eau peu profonde, surveillance, commodités. Idéale aussi pour le coucher de soleil.",
      },
      {
        name: 'Marzamemi', dist: '20 km', time: '25 min', label: 'Village de pêcheurs',
        desc: "Un village historique de pêcheurs plus qu'une plage classique. Les rochers et criques autour du port offrent une eau cristalline pour les amateurs de snorkeling. Surtout : la piazza principale est entourée de restaurants de poisson exceptionnels. La pêcherie Campisi (1905) vend ses conserves sur place.",
        access: "Village en accès libre. Parking payant en saison au centre. Quelques lidos aménagés aux abords.",
        tip: "Réservez pour le déjeuner en haute saison. La piazza s'anime chaque soir — parfait pour la gelato après dîner.",
      },
    ],
    practical_title: 'Conseils pratiques',
    practical: [
      { heading: 'Meilleure période', text: "Juin à octobre pour la baignade. Septembre est le mois idéal : la mer atteint 26-27°C (son pic annuel), les plages se vident, les prix baissent. Juillet et août sont magnifiques mais très fréquentés." },
      { heading: 'Parking et accès', text: "Toutes les plages sont accessibles en voiture depuis la villa en moins de 25 minutes. Vendicari et Calamosche ont des parkings payants (2-3 €/jour). En juillet-août, arrivez tôt — les places se limitent. Les autres plages offrent un stationnement plus facile." },
      { heading: 'Ce qu\'il faut apporter', text: "Aux plages naturelles (Calamosche, Vendicari nord, San Lorenzo) : eau, pique-nique, crème solaire haute protection, chapeau. Aucune fontaine ni café. À Lido di Noto et Marzamemi, tout est sur place." },
    ],
    link_noto: 'Noto et les environs →',
    link_villa: 'La villa →',
  },
  en: {
    breadcrumb: 'Beaches',
    h1: 'Val di Noto Beaches',
    sub: 'Five beaches within 25 minutes of the villa',
    intro: "The Val di Noto coastline is one of the most preserved in the Mediterranean. No mass construction, no jet-skis in rows, no amplified music. Nature reserves, white sand coves, turquoise water clear to the bottom. The villa is 5 kilometres from Noto and within 25 minutes of five of Sicily's most beautiful beaches.",
    beaches: [
      {
        name: 'Vendicari', dist: '8 km', time: '12 min', label: 'Nature Reserve',
        desc: "The Vendicari reserve stretches 8 kilometres of coastline, holding several successive beaches separated by garrigue paths: Torre Vendicari, Eloro, Pillirina. Each has its own character. The reserve also hosts flamingos and herons in autumn and spring.",
        access: "Free access. Entry ticket: €3.50 (€7 family). Parking: €2-3. Five access points along the SP19 Noto-Pachino road.",
        tip: "In July-August, arrive before 9am — car parks fill quickly. Off-season, access is often free.",
      },
      {
        name: 'Calamosche', dist: '12 km', time: '15 min + 20 min walk', label: 'The Most Beautiful — Vendicari Reserve',
        desc: "A perfect arc of sand protected by two rocky headlands, shallow water, impossible colours. Regularly ranked among Italy's ten most beautiful beaches. No infrastructure whatsoever — no sunbeds, no snack bar. You reach it on foot from Vendicari's north entrance car park.",
        access: "Vendicari north entrance car park (SP19). 20-minute marked path. Pedestrian access only.",
        tip: "Bring water, food and sun cream — nothing available on site. Swimming is ideal in the morning (calm water, fewer people).",
      },
      {
        name: 'San Lorenzo', dist: '12 km', time: '15 min', label: 'Wild and Quiet',
        desc: "A long sandy beach between two limestone massifs. Less well-known than Vendicari, directly accessible by car, more open to the sea. A few fishing boats at anchor in the morning. One of the quietest beaches in the area.",
        access: "Direct road access, free parking at the edge. Free beach, no entry ticket.",
        tip: "Ideal for quiet mornings or off-season days. Little natural shade — bring a parasol.",
      },
      {
        name: 'Lido di Noto', dist: '15 km', time: '20 min', label: 'Equipped — Practical',
        desc: "Noto's own beach: fine sand, clear water, several beach clubs with sunbed and parasol hire. Restaurants and cafés on site. The practical option for easy, effortless beach days.",
        access: "Direct access, paid parking in season. Sunbeds and parasols (~€15 per day). Showers available.",
        tip: "Well suited for families with young children (shallow water, amenities, supervision). Good for sunset too.",
      },
      {
        name: 'Marzamemi', dist: '20 km', time: '25 min', label: 'Fishing Village',
        desc: "A historic fishing village rather than a conventional beach. The rocks and coves around the harbour offer crystal-clear snorkelling. Above all: the main square is surrounded by exceptional fish restaurants. The Campisi cannery (1905) sells its conserves on site.",
        access: "Village freely accessible. Paid parking in season (centre). Several small lidos nearby.",
        tip: "Book lunch in high season. The piazza comes alive each evening — perfect for a late gelato.",
      },
    ],
    practical_title: 'Practical Tips',
    practical: [
      { heading: 'Best season', text: "June to October for swimming. September is the ideal month: the sea peaks at 26-27°C, beaches empty out, prices drop. July and August are magnificent but busy." },
      { heading: 'Parking & access', text: "All beaches are reachable by car from the villa in under 25 minutes. Vendicari and Calamosche have paid car parks (€2-3/day). In July-August, arrive early — spaces are limited. Other beaches offer easier parking." },
      { heading: 'What to bring', text: "At natural beaches (Calamosche, Vendicari north, San Lorenzo): water, picnic, high-factor sun cream, hat. No fountains or cafés. At Lido di Noto and Marzamemi, everything is available on site." },
    ],
    link_noto: 'Noto & surroundings →',
    link_villa: 'The villa →',
  },
  it: {
    breadcrumb: 'Spiagge',
    h1: 'Le spiagge del Val di Noto',
    sub: 'Cinque spiagge a meno di 25 minuti dalla villa',
    intro: "Il litorale del Val di Noto è uno dei più preservati del Mediterraneo. Niente costruzioni massive, niente moto d'acqua in fila, niente musica amplificata. Riserve naturali, calette di sabbia bianca, acque turchesi trasparenti fino al fondo. La villa si trova a 5 chilometri da Noto e a meno di 25 minuti da cinque delle più belle spiagge della Sicilia.",
    beaches: [
      {
        name: 'Vendicari', dist: '8 km', time: '12 min', label: 'Riserva naturale',
        desc: "La riserva di Vendicari si estende per 8 chilometri di costa e ospita diverse spiagge successive separate da sentieri nella macchia: Torre Vendicari, Eloro, Pillirina. Ognuna ha la sua personalità. La riserva accoglie anche fenicotteri e aironi in autunno e in primavera.",
        access: "Accesso libero. Biglietto d'ingresso: 3,50 € (7 € famiglia). Parcheggio: 2-3 €. Cinque ingressi sulla SP19 Noto-Pachino.",
        tip: "In luglio-agosto, arrivate prima delle 9 — i parcheggi si riempiono rapidamente. Fuori stagione l'accesso è spesso gratuito.",
      },
      {
        name: 'Calamosche', dist: '12 km', time: '15 min + 20 min a piedi', label: 'La più bella — Riserva Vendicari',
        desc: "Un arco perfetto di sabbia protetto da due punte rocciose, acque poco profonde, colori impossibili. Regolarmente classificata tra le dieci spiagge più belle d'Italia. Nessuna infrastruttura — niente lettini, niente bar. Si raggiunge a piedi dal parcheggio dell'ingresso nord della riserva.",
        access: "Parcheggio ingresso nord Vendicari (SP19). Sentiero segnalato di 20 minuti. Solo accesso pedonale.",
        tip: "Portate acqua, cibo e crema solare — non c'è nulla in loco. Nuotare è ideale di mattina (acqua calma, meno gente).",
      },
      {
        name: 'San Lorenzo', dist: '12 km', time: '15 min', label: 'Selvaggia e tranquilla',
        desc: "Una lunga spiaggia di sabbia tra due massicci calcarei. Meno conosciuta di Vendicari, direttamente accessibile in auto, più aperta sul mare. Qualche barca da pesca all'ancora di mattina. Una delle spiagge più tranquille della zona.",
        access: "Strada diretta, parcheggio gratuito al bordo. Spiaggia libera, nessun biglietto d'ingresso.",
        tip: "Ideale per le mattine tranquille o le giornate fuori stagione. Poca ombra naturale — ombrellone consigliato.",
      },
      {
        name: 'Lido di Noto', dist: '15 km', time: '20 min', label: 'Attrezzata — Pratica',
        desc: "La spiaggia di Noto vera e propria: sabbia fine, acqua limpida, diversi stabilimenti con noleggio lettini e ombrelloni. Ristoranti e bar in loco. L'opzione pratica per le giornate senza sforzo.",
        access: "Accesso diretto, parcheggio a pagamento in stagione. Noleggio lettini e ombrelloni (~15 € al giorno). Docce disponibili.",
        tip: "Adatta per famiglie con bambini piccoli: acqua bassa, servizi, sorveglianza. Ottima anche per il tramonto.",
      },
      {
        name: 'Marzamemi', dist: '20 km', time: '25 min', label: 'Villaggio di pescatori',
        desc: "Un villaggio di pescatori storico più che una spiaggia classica. Le rocce e le calette intorno al porto offrono acqua cristallina per lo snorkeling. Soprattutto: la piazza principale è circondata da ristoranti di pesce eccezionali. La tonnara Campisi (1905) vende le sue conserve sul posto.",
        access: "Villaggio libero. Parcheggio a pagamento in stagione (centro). Alcuni lidi nelle vicinanze.",
        tip: "Prenotate per pranzo in alta stagione. La piazza si anima ogni sera — perfetta per il gelato dopo cena.",
      },
    ],
    practical_title: 'Consigli pratici',
    practical: [
      { heading: 'Periodo migliore', text: "Da giugno a ottobre per il bagno. Settembre è il mese ideale: il mare raggiunge 26-27°C (il massimo annuale), le spiagge si svuotano, i prezzi scendono. Luglio e agosto sono magnifici ma affollati." },
      { heading: 'Parcheggio e accesso', text: "Tutte le spiagge sono raggiungibili in auto dalla villa in meno di 25 minuti. Vendicari e Calamosche hanno parcheggi a pagamento (2-3 €/giorno). In luglio-agosto arrivate presto — i posti sono limitati. Le altre spiagge offrono parcheggio più facile." },
      { heading: 'Cosa portare', text: "Alle spiagge naturali (Calamosche, Vendicari nord, San Lorenzo): acqua, picnic, crema solare ad alta protezione, cappello. Nessuna fontana né bar. A Lido di Noto e Marzamemi tutto è disponibile in loco." },
    ],
    link_noto: 'Noto e dintorni →',
    link_villa: 'La villa →',
  },
  de: {
    breadcrumb: 'Strände',
    h1: 'Die Strände des Val di Noto',
    sub: 'Fünf Strände in weniger als 25 Minuten von der Villa',
    intro: "Die Küste des Val di Noto ist eine der am besten erhaltenen des Mittelmeers. Keine Massenbauten, keine Jet-Ski-Reihen, keine Beschallung. Naturschutzgebiete, weiße Sandbuchten, türkisfarbenes Wasser bis auf den Grund. Die Villa liegt 5 Kilometer von Noto entfernt und weniger als 25 Minuten von fünf der schönsten Strände Siziliens.",
    beaches: [
      {
        name: 'Vendicari', dist: '8 km', time: '12 Min.', label: 'Naturschutzgebiet',
        desc: "Das Vendicari-Reservat erstreckt sich über 8 Kilometer Küste und beherbergt mehrere aufeinanderfolgende Strände, getrennt durch Macchia-Pfade: Torre Vendicari, Eloro, Pillirina. Jeder Strand hat seinen eigenen Charakter. Das Reservat beherbergt auch Flamingos und Reiher im Herbst und Frühling.",
        access: "Freier Zugang. Eintrittskarte: 3,50 € (7 € Familie). Parkplatz: 2-3 €. Fünf Eingänge an der SP19 Noto-Pachino.",
        tip: "Im Juli-August: vor 9 Uhr ankommen — die Parkplätze füllen sich schnell. Außerhalb der Saison oft kostenloser Zugang.",
      },
      {
        name: 'Calamosche', dist: '12 km', time: '15 Min. + 20 Min. zu Fuß', label: 'Der schönste — Vendicari-Reservat',
        desc: "Ein perfekter Sandbogen, geschützt durch zwei Felsvorsprünge, flaches Wasser, unglaubliche Farben. Regelmäßig unter Italiens zehn schönsten Stränden. Keinerlei Infrastruktur — keine Liegen, keine Bar. Nur zu Fuß vom Nordeingang-Parkplatz des Reservats erreichbar.",
        access: "Parkplatz Nordeingang Vendicari (SP19). 20-minütiger markierter Weg. Nur für Fußgänger.",
        tip: "Wasser, Essen und Sonnenschutz mitbringen — nichts vor Ort. Morgens schwimmen ist ideal (ruhiges Wasser, weniger Besucher).",
      },
      {
        name: 'San Lorenzo', dist: '12 km', time: '15 Min.', label: 'Wild und ruhig',
        desc: "Ein langer Sandstrand zwischen zwei Kalksteinmassiven. Weniger bekannt als Vendicari, direkt per Auto erreichbar, mehr zum Meer hin offen. Einige Fischerboote am Morgen vor Anker. Einer der ruhigsten Strände der Region.",
        access: "Direkter Straßenzugang, kostenloser Randparkplatz. Freier Strand, kein Eintrittsgeld.",
        tip: "Ideal für ruhige Morgenstunden oder Ausflüge außerhalb der Saison. Wenig natürlicher Schatten — Sonnenschirm empfohlen.",
      },
      {
        name: 'Lido di Noto', dist: '15 km', time: '20 Min.', label: 'Ausgestattet — Praktisch',
        desc: "Notos eigener Strand: feiner Sand, klares Wasser, mehrere Strandbetriebe mit Liegen- und Sonnenschirmverleih. Restaurants und Bars vor Ort. Die praktische Wahl für mühelose Strandtage.",
        access: "Direktzugang, kostenpflichtiger Parkplatz in der Saison. Liegen und Sonnenschirme (~15 € pro Tag). Duschen vorhanden.",
        tip: "Gut für Familien mit kleinen Kindern: flaches Wasser, Annehmlichkeiten, Aufsicht. Auch schön zum Sonnenuntergang.",
      },
      {
        name: 'Marzamemi', dist: '20 km', time: '25 Min.', label: 'Fischerdorf',
        desc: "Ein historisches Fischerdorf, kein gewöhnlicher Strand. Die Felsen und Buchten rund um den Hafen bieten kristallklares Wasser zum Schnorcheln. Vor allem: der Hauptplatz ist von außergewöhnlichen Fischrestaurants umgeben. Die Thunfischfabrik Campisi (1905) verkauft ihre Konserven vor Ort.",
        access: "Dorf frei zugänglich. Kostenpflichtiger Parkplatz in der Saison (Zentrum). Einige kleine Strandbäder in der Nähe.",
        tip: "In der Hauptsaison zum Mittagessen reservieren. Der Platz belebt sich jeden Abend — perfekt für das abendliche Gelato.",
      },
    ],
    practical_title: 'Praktische Tipps',
    practical: [
      { heading: 'Beste Reisezeit', text: "Juni bis Oktober zum Baden. September ist der ideale Monat: das Meer erreicht mit 26-27°C seinen Jahreshöchststand, die Strände leeren sich, die Preise sinken. Juli und August sind wunderschön, aber belebt." },
      { heading: 'Parken & Zugang', text: "Alle Strände sind per Auto von der Villa in unter 25 Minuten erreichbar. Vendicari und Calamosche haben kostenpflichtige Parkplätze (2-3 €/Tag). Im Juli-August früh ankommen — die Plätze sind begrenzt. Andere Strände bieten einfacheres Parken." },
      { heading: 'Was mitnehmen', text: "An Naturstränden (Calamosche, Vendicari Nord, San Lorenzo): Wasser, Picknick, Sonnenschutz, Hut. Keine Brunnen oder Cafés vorhanden. In Lido di Noto und Marzamemi ist alles vor Ort erhältlich." },
    ],
    link_noto: 'Noto entdecken →',
    link_villa: 'Die Villa →',
  },
}

export default function PlagesPage({ params }: { params: { locale: string } }) {
  const locale = (LOCALES.includes(params.locale as Lang) ? params.locale : 'fr') as Lang
  const c = CONTENT[locale]
  const homeLabel = locale === 'fr' ? 'Accueil' : locale === 'de' ? 'Startseite' : 'Home'
  return (
    <>
      <JsonLd data={[getBreadcrumbSchema([
        { name: homeLabel, item: `${BASE}/${locale}` },
        { name: c.breadcrumb, item: `${BASE}/${locale}/plages` },
      ])]} />
      <PageLayout lang={locale} page="plages" breadcrumb={c.breadcrumb}>
        <div className="max-w-2xl">
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal leading-tight mb-3">{c.h1}</h1>
          <p className="font-sans text-xs tracking-[0.15em] uppercase text-gold-text mb-6">{c.sub}</p>
          <div className="gold-divider" />
          <p className="font-sans text-base text-muted leading-relaxed mb-14">{c.intro}</p>

          <div className="space-y-12 mb-16">
            {c.beaches.map((beach, i) => (
              <div key={i} className="border-l-2 border-gold/30 pl-6">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                  <h2 className="font-serif text-2xl text-charcoal">{beach.name}</h2>
                  <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-gold-text">{beach.dist} · {beach.time}</span>
                </div>
                <span className="inline-block font-sans text-[10px] tracking-widest uppercase bg-gold/10 text-gold-text px-2 py-1 mb-3">{beach.label}</span>
                <p className="font-sans text-sm text-muted leading-relaxed mb-2">{beach.desc}</p>
                <p className="font-sans text-xs text-muted/70 leading-relaxed mb-2">{beach.access}</p>
                <p className="font-sans text-xs text-charcoal italic border-l border-gold/40 pl-3 leading-relaxed">{beach.tip}</p>
              </div>
            ))}
          </div>

          <div className="bg-navy text-white p-8 md:p-10 mb-16">
            <h2 className="font-serif text-2xl text-gold-text mb-7">{c.practical_title}</h2>
            <div className="space-y-5">
              {c.practical.map((item, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-1 md:gap-6 border-b border-white/10 pb-5 last:border-none last:pb-0">
                  <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-gold-text/80 md:pt-0.5">{item.heading}</p>
                  <p className="font-sans text-sm leading-relaxed text-white/80">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href={`/${locale}/noto`} className="font-sans text-xs tracking-widest uppercase px-6 py-3 bg-gold text-white hover:bg-gold/80 transition-all duration-300">
              {c.link_noto}
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
