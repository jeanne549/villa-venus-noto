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
    title: 'Itinéraire 7 nuits — Sicile baroque depuis Villa Vénus Noto',
    description: "Programme suggéré pour un séjour de 7 nuits à Villa Vénus Noto : Noto, Ragusa, Syracuse, Vendicari, Marzamemi, vignobles. Plages, patrimoine et gastronomie.",
  },
  en: {
    title: '7-Night Itinerary — Baroque Sicily from Villa Vénus Noto',
    description: "Suggested programme for a 7-night stay at Villa Vénus Noto: Noto, Ragusa, Syracuse, Vendicari, Marzamemi, vineyards. Beaches, heritage and gastronomy.",
  },
  it: {
    title: 'Itinerario 7 notti — Sicilia barocca da Villa Vénus Noto',
    description: "Programma suggerito per un soggiorno di 7 notti a Villa Vénus Noto: Noto, Ragusa, Siracusa, Vendicari, Marzamemi, vigneti. Spiagge, patrimonio e gastronomia.",
  },
  de: {
    title: '7-Nächte-Reiseroute — Barockes Sizilien von Villa Vénus Noto',
    description: "Vorgeschlagenes Programm für einen 7-Nächte-Aufenthalt in Villa Vénus Noto: Noto, Ragusa, Syrakus, Vendicari, Marzamemi, Weingüter. Strände, Kultur und Gastronomie.",
  },
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Lang
  if (!META[locale]) return {}
  const { title, description } = META[locale]
  return {
    title, description,
    robots: { index: true, follow: true },
    alternates: buildAlternates('itineraire', locale),
    openGraph: { title, description, url: `${BASE}/${locale}/itineraire`, siteName: 'Villa Vénus Noto', images: [{ url: '/og-image.jpg', width: 1200, height: 630 }] },
  }
}

type Day = { label: string; title: string; text: string; tip?: string }
type Content = {
  breadcrumb: string; h1: string; sub: string; intro: string
  days: Day[]
  note_title: string
  notes: string[]
  link_plages: string; link_noto: string
}

const CONTENT: Record<Lang, Content> = {
  fr: {
    breadcrumb: 'Itinéraire',
    h1: 'Une semaine dans le Val di Noto',
    sub: 'Programme suggéré pour 7 nuits à la villa',
    intro: "La villa impose un séjour minimum de 6 nuits — c'est le bon rythme pour explorer le Val di Noto sans précipitation. Voici un programme suggéré pour 7 nuits : des plages le matin, des villes baroques l'après-midi, des tables locales le soir. La voiture est indispensable.",
    days: [
      {
        label: 'Jour 1 · Arrivée',
        title: 'Noto au coucher du soleil',
        text: "Prenez le temps de vous installer. En fin d'après-midi, descendez à Noto à pied ou en voiture (5 min). Le Corso Vittorio Emanuele s'éclaire en fin de journée et les façades dorées prennent une couleur incomparable. Dîner dans un des restaurants du centre historique — réservez à l'avance en haute saison.",
        tip: "Caffè Sicilia (Corso Vittorio Emanuele) pour la granita du soir — l'une des plus réputées de Sicile.",
      },
      {
        label: 'Jour 2 · Plages',
        title: 'Calamosche et Marzamemi',
        text: "Départ tôt (9h) pour Calamosche : l'arc de sable parfait de la réserve de Vendicari. Arrivez avant que les parkings se remplissent. Baignade jusqu'à midi. Déjeuner à Marzamemi (20 min) : plateau de poisson à la pêcherie Campisi ou à la piazza. Retour à la villa en fin d'après-midi, coucher de soleil sur la terrasse.",
        tip: "Marzamemi : réservez votre table pour le déjeuner si vous y êtes en août.",
      },
      {
        label: 'Jour 3 · Baroque',
        title: 'Ragusa Ibla',
        text: "À 30 minutes de la villa, Ragusa Ibla est l'une des plus belles villes baroques du Val di Noto. Laissez la voiture au parking et descendez à pied dans la ville basse. Le Duomo San Giorgio et ses marches, la Via del Mercato, la terrasse du Giardino Ibleo. Déjeuner ou dîner dans la vieille ville. Retour en soirée.",
        tip: "Le trajet Noto-Ragusa par la route des crêtes offre des paysages de vallées et de vignobles remarquables.",
      },
      {
        label: 'Jour 4 · Nature',
        title: 'Journée à Vendicari',
        text: "Journée entière dans la réserve de Vendicari (8 km). Tour Vendicari, plages Eloro et Pillirina, sentiers côtiers. En septembre-mai, les flamants roses sont visibles sur les étangs intérieurs. Pique-nique sur la plage ou déjeuner léger au retour à Noto. Après-midi libre à la villa.",
      },
      {
        label: 'Jour 5 · Syracuse',
        title: 'Ortigia et le théâtre grec',
        text: "À 40 minutes, Syracuse est l'une des plus grandes villes de l'Antiquité grecque. Matinée à l'île d'Ortigia : la fontaine d'Aréthuse, la cathédrale construite sur les colonnes d'un temple grec, le marché aux poissons. Après-midi au parc archéologique (théâtre grec, amphithéâtre romain). Retour en soirée.",
        tip: "Le marché d'Ortigia le matin est l'un des plus beaux marchés de Sicile.",
      },
      {
        label: 'Jour 6 · Vignobles',
        title: 'Avola, amandes et Nero d\'Avola',
        text: "Matinée à Avola (15 km) : ville baroque méconnue, productrice des meilleures amandes du monde (Pizzuta d'Avola). Achetez directement chez les producteurs. Après-midi : visite d'une cave viticole du terroir Noto DOC — Cantina Zisola (famille Planeta) ou Cantina Marilina. Dégustation Nero d'Avola sur place. Dîner à la villa.",
      },
      {
        label: 'Jour 7 · Détente',
        title: 'Piscine et dernière soirée à Noto',
        text: "Journée libre à la villa : piscine, terrasse, lecture. Dernière soirée à Noto pour un dîner d'adieu. La ville est particulièrement belle la nuit, éclairée en jaune sur le calcaire doré. Les restaurants ferment tard — pas de précipitation.",
      },
    ],
    note_title: 'Pour préparer votre séjour',
    notes: [
      "Une voiture de location est indispensable — à réserver avant l'arrivée à Catane.",
      "Les restaurants en haute saison se réservent 24-48h à l'avance.",
      "Le marché de Noto a lieu le vendredi matin à la Villa Comunale.",
      "La durée minimale à la villa est de 6 nuits. Ce programme est prévu pour 7 nuits.",
    ],
    link_plages: 'Les plages en détail →',
    link_noto: 'Noto et les environs →',
  },
  en: {
    breadcrumb: 'Itinerary',
    h1: 'A Week in the Val di Noto',
    sub: 'Suggested programme for 7 nights at the villa',
    intro: "The villa requires a minimum 6-night stay — the right pace for exploring the Val di Noto without rushing. Here is a suggested 7-night programme: beaches in the morning, baroque towns in the afternoon, local tables in the evening. A car is essential.",
    days: [
      {
        label: 'Day 1 · Arrival',
        title: 'Noto at sunset',
        text: "Take time to settle in. In the late afternoon, walk or drive down to Noto (5 minutes). The Corso Vittorio Emanuele lights up towards evening and the golden façades take on an extraordinary colour. Dinner in one of the historic centre's restaurants — book ahead in high season.",
        tip: "Caffè Sicilia (Corso Vittorio Emanuele) for the evening granita — one of the most celebrated in Sicily.",
      },
      {
        label: 'Day 2 · Beaches',
        title: 'Calamosche and Marzamemi',
        text: "Leave early (9am) for Calamosche: the perfect sand arc of the Vendicari reserve. Arrive before the car parks fill. Swim until noon. Lunch at Marzamemi (20 minutes): a fish platter at the Campisi cannery or on the piazza. Back to the villa in late afternoon, sunset on the terrace.",
        tip: "Marzamemi: book your table for lunch if you're visiting in August.",
      },
      {
        label: 'Day 3 · Baroque',
        title: 'Ragusa Ibla',
        text: "30 minutes from the villa, Ragusa Ibla is one of the most beautiful baroque towns in the Val di Noto. Leave the car in the car park and walk down into the lower town. The Duomo San Giorgio and its steps, the Via del Mercato, the terrace of the Giardino Ibleo. Lunch or dinner in the old town. Return in the evening.",
        tip: "The Noto-Ragusa ridge road offers remarkable views over valleys and vineyards.",
      },
      {
        label: 'Day 4 · Nature',
        title: 'A day at Vendicari',
        text: "A full day in the Vendicari nature reserve (8 km). Vendicari tower, Eloro and Pillirina beaches, coastal paths. From September to May, flamingos are visible on the inland lagoons. Picnic on the beach or a light lunch back in Noto. Free afternoon at the villa.",
      },
      {
        label: 'Day 5 · Syracuse',
        title: 'Ortigia and the Greek theatre',
        text: "40 minutes away, Syracuse was one of the greatest cities of the ancient Greek world. Morning on the island of Ortigia: the Arethusa fountain, the cathedral built over the columns of a Greek temple, the fish market. Afternoon in the archaeological park (Greek theatre, Roman amphitheatre). Return in the evening.",
        tip: "The Ortigia morning market is one of the finest in Sicily.",
      },
      {
        label: 'Day 6 · Vineyards',
        title: 'Avola, almonds and Nero d\'Avola',
        text: "Morning in Avola (15 km): an underrated baroque town, producer of the world's finest almonds (Pizzuta d'Avola). Buy directly from producers. Afternoon: visit a Noto DOC winery — Cantina Zisola (Planeta family) or Cantina Marilina. Tasting Nero d'Avola on site. Dinner at the villa.",
      },
      {
        label: 'Day 7 · Relaxation',
        title: 'Pool and last evening in Noto',
        text: "Free day at the villa: pool, terrace, reading. Last evening in Noto for a farewell dinner. The town is particularly beautiful at night, lit in yellow against the golden limestone. Restaurants close late — no rush.",
      },
    ],
    note_title: 'Planning your stay',
    notes: [
      "A hire car is essential — book before arriving in Catania.",
      "In high season, restaurants should be booked 24-48 hours ahead.",
      "The Noto market runs on Friday mornings at the Villa Comunale.",
      "The minimum stay at the villa is 6 nights. This itinerary is planned for 7 nights.",
    ],
    link_plages: 'Beaches in detail →',
    link_noto: 'Noto & surroundings →',
  },
  it: {
    breadcrumb: 'Itinerario',
    h1: 'Una settimana nel Val di Noto',
    sub: 'Programma suggerito per 7 notti alla villa',
    intro: "La villa richiede un soggiorno minimo di 6 notti — il ritmo giusto per esplorare il Val di Noto senza fretta. Ecco un programma suggerito per 7 notti: spiagge al mattino, città barocche nel pomeriggio, tavole locali la sera. Un'auto è indispensabile.",
    days: [
      {
        label: 'Giorno 1 · Arrivo',
        title: 'Noto al tramonto',
        text: "Prendetevi il tempo per sistemarvi. Nel tardo pomeriggio, scendete a Noto a piedi o in auto (5 min). Il Corso Vittorio Emanuele si illumina verso sera e le facciate dorate prendono un colore incomparabile. Cena in uno dei ristoranti del centro storico — prenotate in anticipo in alta stagione.",
        tip: "Caffè Sicilia (Corso Vittorio Emanuele) per la granita serale — una delle più celebrate della Sicilia.",
      },
      {
        label: 'Giorno 2 · Spiagge',
        title: 'Calamosche e Marzamemi',
        text: "Partenza presto (9h) per Calamosche: l'arco di sabbia perfetto della riserva di Vendicari. Arrivate prima che i parcheggi si riempiano. Bagno fino a mezzogiorno. Pranzo a Marzamemi (20 min): piatto di pesce alla tonnara Campisi o in piazza. Rientro alla villa nel tardo pomeriggio, tramonto sulla terrazza.",
        tip: "Marzamemi: prenotate il tavolo per pranzo se siete lì in agosto.",
      },
      {
        label: 'Giorno 3 · Barocco',
        title: 'Ragusa Ibla',
        text: "A 30 minuti dalla villa, Ragusa Ibla è una delle più belle città barocche del Val di Noto. Lasciate l'auto al parcheggio e scendete a piedi nella città bassa. Il Duomo San Giorgio e i suoi gradini, la Via del Mercato, la terrazza del Giardino Ibleo. Pranzo o cena nel borgo antico. Rientro la sera.",
        tip: "Il percorso Noto-Ragusa sulla strada delle creste offre paesaggi di valli e vigneti straordinari.",
      },
      {
        label: 'Giorno 4 · Natura',
        title: 'Giornata a Vendicari',
        text: "Giornata intera nella riserva di Vendicari (8 km). Torre Vendicari, spiagge Eloro e Pillirina, sentieri costieri. Da settembre a maggio, i fenicotteri rosa sono visibili sulle lagune interne. Picnic in spiaggia o pranzo leggero al rientro a Noto. Pomeriggio libero alla villa.",
      },
      {
        label: 'Giorno 5 · Siracusa',
        title: 'Ortigia e il teatro greco',
        text: "A 40 minuti, Siracusa fu una delle più grandi città del mondo greco antico. Mattinata sull'isola di Ortigia: la fontana di Aretusa, la cattedrale costruita sulle colonne di un tempio greco, il mercato del pesce. Pomeriggio al parco archeologico (teatro greco, anfiteatro romano). Rientro in serata.",
        tip: "Il mercato di Ortigia al mattino è uno dei più belli della Sicilia.",
      },
      {
        label: 'Giorno 6 · Vigneti',
        title: 'Avola, mandorle e Nero d\'Avola',
        text: "Mattinata ad Avola (15 km): città barocca poco conosciuta, produttrice delle migliori mandorle del mondo (Pizzuta d'Avola). Acquistate direttamente dai produttori. Pomeriggio: visita a una cantina del territorio Noto DOC — Cantina Zisola (famiglia Planeta) o Cantina Marilina. Degustazione Nero d'Avola in loco. Cena alla villa.",
      },
      {
        label: 'Giorno 7 · Relax',
        title: 'Piscina e ultima serata a Noto',
        text: "Giornata libera alla villa: piscina, terrazza, lettura. Ultima serata a Noto per una cena d'addio. La città è particolarmente bella di notte, illuminata in giallo sul calcare dorato. I ristoranti chiudono tardi — nessuna fretta.",
      },
    ],
    note_title: 'Per preparare il soggiorno',
    notes: [
      "Un'auto a noleggio è indispensabile — prenotatela prima di arrivare a Catania.",
      "In alta stagione, i ristoranti si prenotano con 24-48 ore di anticipo.",
      "Il mercato di Noto si tiene il venerdì mattina alla Villa Comunale.",
      "Il soggiorno minimo alla villa è di 6 notti. Questo programma è pensato per 7 notti.",
    ],
    link_plages: 'Le spiagge in dettaglio →',
    link_noto: 'Noto e dintorni →',
  },
  de: {
    breadcrumb: 'Reiseroute',
    h1: 'Eine Woche im Val di Noto',
    sub: 'Vorgeschlagenes Programm für 7 Nächte in der Villa',
    intro: "Die Villa erfordert einen Mindestaufenthalt von 6 Nächten — das richtige Tempo, um das Val di Noto ohne Hast zu erkunden. Hier ein vorgeschlagenes Programm für 7 Nächte: morgens Strände, nachmittags Barockstädte, abends lokale Küche. Ein Auto ist unverzichtbar.",
    days: [
      {
        label: 'Tag 1 · Ankunft',
        title: 'Noto bei Sonnenuntergang',
        text: "Nehmen Sie sich Zeit zum Einrichten. Am späten Nachmittag fahren oder spazieren Sie nach Noto (5 Min.). Der Corso Vittorio Emanuele erwacht gegen Abend und die goldenen Fassaden nehmen eine unvergleichliche Farbe an. Abendessen in einem der Restaurants des historischen Zentrums — in der Hauptsaison im Voraus reservieren.",
        tip: "Caffè Sicilia (Corso Vittorio Emanuele) für die Abend-Granita — eine der berühmtesten Siziliens.",
      },
      {
        label: 'Tag 2 · Strände',
        title: 'Calamosche und Marzamemi',
        text: "Früh aufbrechen (9 Uhr) nach Calamosche: der perfekte Sandbogen des Vendicari-Reservats. Vor dem Füllen der Parkplätze ankommen. Schwimmen bis mittags. Mittagessen in Marzamemi (20 Min.): Fischplatte in der Campisi-Thunfischfabrik oder auf der Piazza. Am späten Nachmittag zurück zur Villa, Sonnenuntergang auf der Terrasse.",
        tip: "Marzamemi: Tisch zum Mittagessen reservieren, wenn Sie im August kommen.",
      },
      {
        label: 'Tag 3 · Barock',
        title: 'Ragusa Ibla',
        text: "30 Minuten von der Villa: Ragusa Ibla ist eine der schönsten Barockstädte des Val di Noto. Auto parken und zu Fuß in die Unterstadt hinabsteigen. Der Duomo San Giorgio und seine Stufen, die Via del Mercato, die Terrasse des Giardino Ibleo. Mittag- oder Abendessen in der Altstadt. Abends zurück.",
        tip: "Die Bergkammstraße Noto-Ragusa bietet außergewöhnliche Ausblicke auf Täler und Weinberge.",
      },
      {
        label: 'Tag 4 · Natur',
        title: 'Ein Tag in Vendicari',
        text: "Ganztägig im Vendicari-Naturschutzgebiet (8 km). Vendicari-Turm, Eloro- und Pillirina-Strände, Küstenpfade. Von September bis Mai sind Flamingos auf den Binnenlagungen sichtbar. Picknick am Strand oder leichtes Mittagessen zurück in Noto. Freier Nachmittag in der Villa.",
      },
      {
        label: 'Tag 5 · Syrakus',
        title: 'Ortigia und das griechische Theater',
        text: "40 Minuten entfernt: Syrakus war eine der größten Städte der antiken griechischen Welt. Morgens auf der Insel Ortigia: der Arethusa-Brunnen, die Kathedrale auf den Säulen eines griechischen Tempels, der Fischmarkt. Nachmittags im archäologischen Park (griechisches Theater, römisches Amphitheater). Abends zurück.",
        tip: "Der Ortigia-Morgenmarkt ist einer der schönsten Siziliens.",
      },
      {
        label: 'Tag 6 · Weinberge',
        title: 'Avola, Mandeln und Nero d\'Avola',
        text: "Morgens in Avola (15 km): eine unterschätzte Barockstadt, Produzent der weltbesten Mandeln (Pizzuta d'Avola). Direkt bei Produzenten kaufen. Nachmittags: Besuch eines Weinguts des Noto-DOC-Terroirs — Cantina Zisola (Familie Planeta) oder Cantina Marilina. Nero-d'Avola-Verkostung vor Ort. Abendessen in der Villa.",
      },
      {
        label: 'Tag 7 · Entspannung',
        title: 'Pool und letzter Abend in Noto',
        text: "Freier Tag in der Villa: Pool, Terrasse, Lesen. Letzter Abend in Noto für ein Abschiedsessen. Die Stadt ist nachts besonders schön, in Gelb auf dem goldenen Kalkstein beleuchtet. Restaurants schließen spät — kein Stress.",
      },
    ],
    note_title: 'Für Ihre Planung',
    notes: [
      "Ein Mietwagen ist unverzichtbar — vor der Ankunft in Catania buchen.",
      "In der Hauptsaison sollten Restaurants 24-48 Stunden im Voraus reserviert werden.",
      "Der Noto-Markt findet freitags morgens an der Villa Comunale statt.",
      "Der Mindestaufenthalt in der Villa beträgt 6 Nächte. Diese Reiseroute ist für 7 Nächte geplant.",
    ],
    link_plages: 'Strände im Detail →',
    link_noto: 'Noto & Umgebung →',
  },
}

export default function ItinerairePage({ params }: { params: { locale: string } }) {
  const locale = (LOCALES.includes(params.locale as Lang) ? params.locale : 'fr') as Lang
  const c = CONTENT[locale]
  const homeLabel = locale === 'fr' ? 'Accueil' : locale === 'de' ? 'Startseite' : 'Home'
  return (
    <>
      <JsonLd data={[getBreadcrumbSchema([
        { name: homeLabel, item: `${BASE}/${locale}` },
        { name: c.breadcrumb, item: `${BASE}/${locale}/itineraire` },
      ])]} />
      <PageLayout lang={locale} page="itineraire" breadcrumb={c.breadcrumb}>
        <div className="max-w-2xl">
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal leading-tight mb-3">{c.h1}</h1>
          <p className="font-sans text-xs tracking-[0.15em] uppercase text-gold mb-6">{c.sub}</p>
          <div className="gold-divider" />
          <p className="font-sans text-base text-muted leading-relaxed mb-14">{c.intro}</p>

          <div className="space-y-8 mb-16">
            {c.days.map((day, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-8 border-b border-charcoal/10 pb-8 last:border-none last:pb-0">
                <div>
                  <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-gold/80">{day.label}</p>
                  <p className="font-serif text-lg text-charcoal mt-1 leading-snug">{day.title}</p>
                </div>
                <div>
                  <p className="font-sans text-sm text-muted leading-relaxed">{day.text}</p>
                  {day.tip && (
                    <p className="font-sans text-xs italic text-muted/70 mt-2 pl-3 border-l border-gold/30 leading-relaxed">{day.tip}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-navy text-white p-8 mb-12">
            <h2 className="font-serif text-xl text-gold mb-5">{c.note_title}</h2>
            <ul className="space-y-2">
              {c.notes.map((note, i) => (
                <li key={i} className="font-sans text-sm text-white/80 leading-relaxed flex gap-3">
                  <span className="text-gold mt-0.5 shrink-0">—</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href={`/${locale}/plages`} className="font-sans text-xs tracking-widest uppercase px-6 py-3 bg-gold text-white hover:bg-gold/80 transition-all duration-300">
              {c.link_plages}
            </Link>
            <Link href={`/${locale}/noto`} className="font-sans text-xs tracking-widest uppercase px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-white transition-all duration-300">
              {c.link_noto}
            </Link>
          </div>
        </div>
      </PageLayout>
    </>
  )
}
