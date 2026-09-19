import type { Metadata } from 'next'
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
    title: 'Noto et le Val di Noto — Que faire depuis Villa Vénus Noto',
    description: 'Noto baroque UNESCO, Infiorata de mai, Vendicari, Marzamemi, Syracuse et Ortygie, Ragusa Ibla, Modica, plages et vins Nero d\'Avola. Tout depuis Villa Vénus Noto.',
  },
  en: {
    title: 'Noto & Val di Noto — Things to Do from Villa Vénus Noto',
    description: 'UNESCO baroque Noto, Vendicari nature reserve, Marzamemi, Syracuse and Ortygia, Ragusa Ibla, Modica, beaches and Nero d\'Avola wines. All within reach of Villa Vénus Noto.',
  },
  it: {
    title: 'Noto e il Val di Noto — Cosa fare da Villa Vénus Noto',
    description: 'Noto barocca UNESCO, Infiorata di maggio, Vendicari, Marzamemi, Siracusa e Ortigia, Ragusa Ibla, Modica, spiagge e vini Nero d\'Avola. Tutto vicino a Villa Vénus Noto.',
  },
  de: {
    title: 'Noto & Val di Noto — Ausflüge von Villa Vénus Noto',
    description: 'UNESCO-Barockstadt Noto, Vendicari-Naturreservat, Marzamemi, Syrakus und Ortygia, Ragusa Ibla, Modica, Strände und Nero d\'Avola-Weine. Alles von Villa Vénus Noto aus erreichbar.',
  },
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Lang
  if (!META[locale]) return {}
  const { title, description } = META[locale]
  const robots = locale === 'de'
    ? { index: false, follow: false }
    : hasPlaceholders(PLACES[locale]) ? { index: false, follow: true } : { index: true, follow: true }
  return {
    title, description,
    robots,
    alternates: {
      canonical: `${BASE}/${locale}/noto`,
      languages: { fr: `${BASE}/fr/noto`, en: `${BASE}/en/noto`, it: `${BASE}/it/noto`, 'x-default': `${BASE}/fr/noto` },
    },
    openGraph: { title, description, url: `${BASE}/${locale}/noto`, siteName: 'Villa Vénus Noto', images: [{ url: '/og-image.jpg', width: 1200, height: 630 }] },
  }
}

const PLACES = {
  fr: [
    {
      cat: 'Noto · 5 km · 10 min',
      name: "Noto baroque",
      desc: "Reconstruite après le tremblement de terre de 1693 selon un plan urbanistique unique, Noto est considérée comme le chef-d'œuvre du baroque sicilien. Son Corso Vittorio Emanuele, bordé de palais en pierre d'or, figure au Patrimoine Mondial UNESCO depuis 2002. À explorer le soir, quand la lumière est douce et que les façades semblent brûler.",
      extra: "L'Infiorata (3e weekend de mai) : les rues du centre sont recouvertes de tapis de fleurs représentant des tableaux vivants. Événement unique au monde, à ne pas manquer si vous êtes là en mai.",
    },
    {
      cat: 'Vendicari · 8 km · 12 min',
      name: "Réserve naturelle de Vendicari",
      desc: "L'une des plus belles réserves naturelles de Méditerranée. Des sentiers longeant la côte entre lagunes, ruines de tonnara et criques de sable blanc. On y croise des flamants roses, des hérons et en septembre les premières cigognes. La plage de Calamosche est régulièrement élue l'une des plus belles d'Italie.",
      extra: "Arriver tôt le matin ou en fin d'après-midi pour éviter la foule en juillet-août.",
    },
    {
      cat: 'Marzamemi · 20 km · 22 min',
      name: "Marzamemi",
      desc: "Ancien village de pêcheurs au charme intact, avec sa piazza centrale, ses barques colorées et ses restaurants de poisson autour de l'ancienne tonnara. L'endroit pour un déjeuner de poulpe et de vino bianco, les pieds presque dans l'eau. Le soir, le village s'anime davantage et la terrasse du café central vaut à elle seule le déplacement.",
    },
    {
      cat: 'Syracuse et Ortygie · 30 km · 35 min',
      name: "Syracuse et Ortygie",
      desc: "Fondée par les Grecs en 734 avant J.-C., Syracuse est l'une des plus vieilles villes du monde. Le théâtre grec antique (Vᵉ siècle av. J.-C.) est encore utilisé pour des représentations en été. Ortygie, l'île baroque au cœur de la ville, concentre les plus beaux palais, la cathédrale transformée depuis un temple grec, et la Fontana Aretusa. Compter une journée entière.",
    },
    {
      cat: 'Ragusa Ibla · 45 km · 55 min',
      name: "Ragusa Ibla",
      desc: "Ville baroque perchée sur un promontoire rocheux, décor des séries Montalbano. Ses ruelles en pente, ses balcons sculptés et le jardin Ibleo au bout de la ville méritent l'ascension à pied. Le Palazzo Cosentini, avec ses balcons aux atlantes grotesques, est le monument le plus photographié de la ville.",
    },
    {
      cat: 'Modica · 38 km · 45 min',
      name: "Modica et le chocolat",
      desc: "Modica est mondialement connue pour son chocolat froid, préparé à froid selon une recette d'origine aztèque transmise par les Espagnols. Acheté directement aux petits fabricants du Corso Umberto, c'est l'un des meilleurs souvenirs de Sicile. La ville baroque elle-même, étagée sur deux vallées, vaut aussi la visite pour ses églises et ses panoramas.",
    },
    {
      cat: 'Cava Grande del Cassibile · 35 km · 50 min',
      name: "Cava Grande — les piscines naturelles",
      desc: "Un canyon sauvage avec des piscines naturelles d'eau douce émeraude accessible par un sentier de descente (40 min à pied). L'endroit reste peu connu des touristes étrangers et offre une baignade en pleine nature exceptionnelle. À éviter par très forte chaleur — le sentier de retour est raide.",
    },
    {
      cat: 'Plage San Lorenzo · 15 km · 20 min',
      name: "Plage San Lorenzo",
      desc: "La plus accessible des grandes plages depuis la villa — une longue bande de sable fin entourée de dunes. Peu de services sur place, ce qui lui préserve un caractère sauvage appréciable. Prévoir un parasol.",
    },
    {
      cat: 'Lido di Noto · 7 km · 10 min',
      name: "Lido di Noto",
      desc: "La plage de Noto — proche, facile, familiale. Des lidos organisés avec transats et restauration côtoient des zones libres. Idéale pour une fin d'après-midi après une journée en ville.",
    },
    {
      cat: 'Vins · Province de Syracuse',
      name: "Nero d'Avola et les vignobles",
      desc: "La province de Syracuse est le cœur de production du Nero d'Avola, le cépage rouge le plus emblématique de Sicile. Plusieurs domaines ouverts à la visite entre Noto et Avola proposent des dégustations directement au chai. Demandez-nous les adresses que nous recommandons.",
    },
  ],
  en: [
    {
      cat: 'Noto · 5 km · 10 min',
      name: "Baroque Noto",
      desc: "Rebuilt after the 1693 earthquake to a unique urban plan, Noto is considered the masterpiece of Sicilian baroque. Its Corso Vittorio Emanuele, lined with golden stone palaces, has been a UNESCO World Heritage Site since 2002. Best explored in the evening, when the light softens and the facades seem to glow.",
      extra: "The Infiorata (3rd weekend of May): the streets of the centre are covered with carpets of flowers depicting living paintings. A unique event in the world — not to be missed if you're there in May.",
    },
    {
      cat: 'Vendicari · 8 km · 12 min',
      name: "Vendicari Nature Reserve",
      desc: "One of the most beautiful nature reserves in the Mediterranean. Coastal trails wind between lagoons, old tonnara ruins and white sand coves. Flamingos, herons and September's first storks are regular visitors. Calamosche beach is regularly voted one of the most beautiful in Italy.",
      extra: "Go early in the morning or late afternoon to avoid crowds in July and August.",
    },
    {
      cat: 'Marzamemi · 20 km · 22 min',
      name: "Marzamemi",
      desc: "An old fishing village with intact charm — its central square, colourful boats and fish restaurants around the ancient tonnara. The place for a lunch of octopus and white wine with your feet almost in the water. In the evening, the village comes alive and the terrace of the central café is worth the trip alone.",
    },
    {
      cat: 'Syracuse and Ortygia · 30 km · 35 min',
      name: "Syracuse and Ortygia",
      desc: "Founded by the Greeks in 734 BC, Syracuse is one of the oldest cities in the world. The ancient Greek theatre (5th century BC) is still used for performances in summer. Ortygia, the baroque island at the heart of the city, concentrates the finest palaces, a cathedral converted from a Greek temple, and the Fontana Aretusa. Allow a full day.",
    },
    {
      cat: 'Ragusa Ibla · 45 km · 55 min',
      name: "Ragusa Ibla",
      desc: "A baroque town perched on a rocky promontory, setting for the Montalbano TV series. Its sloping lanes, sculpted balconies and the Ibleo gardens at the town's edge reward the walk uphill. The Palazzo Cosentini, with its balconies of grotesque atlantes, is the most photographed monument in the city.",
    },
    {
      cat: 'Modica · 38 km · 45 min',
      name: "Modica and its chocolate",
      desc: "Modica is world-famous for its cold chocolate, made using an Aztec recipe passed down via the Spanish. Bought directly from small producers on the Corso Umberto, it's one of the best souvenirs of Sicily. The baroque town itself, spread across two valleys, is also worth visiting for its churches and panoramas.",
    },
    {
      cat: 'Cava Grande del Cassibile · 35 km · 50 min',
      name: "Cava Grande — natural swimming pools",
      desc: "A wild canyon with emerald freshwater natural pools, reached by a descent trail (40 min on foot). Still little known to foreign tourists, it offers exceptional swimming in nature. Avoid in extreme heat — the return trail is steep.",
    },
    {
      cat: 'San Lorenzo Beach · 15 km · 20 min',
      name: "San Lorenzo beach",
      desc: "The most accessible of the large beaches from the villa — a long stretch of fine sand surrounded by dunes. Few facilities on site, which preserves its wild character. Bring your own umbrella.",
    },
    {
      cat: 'Lido di Noto · 7 km · 10 min',
      name: "Lido di Noto",
      desc: "Noto's beach — close, easy, family-friendly. Organised lidos with sun loungers and food share the coast with free areas. Perfect for a late afternoon after a day in town.",
    },
    {
      cat: 'Wines · Syracuse Province',
      name: "Nero d'Avola and the vineyards",
      desc: "The Syracuse province is the heartland of Nero d'Avola production, Sicily's most emblematic red grape variety. Several estates open to visitors between Noto and Avola offer tastings directly at the cellar. Ask us for our recommended addresses.",
    },
  ],
  it: [
    {
      cat: 'Noto · 5 km · 10 min',
      name: "Noto barocca",
      desc: "Ricostruita dopo il terremoto del 1693 secondo un piano urbanistico unico, Noto è considerata il capolavoro del barocco siciliano. Il suo Corso Vittorio Emanuele, fiancheggiato da palazzi in pietra dorata, è Patrimonio Mondiale UNESCO dal 2002. Da visitare la sera, quando la luce si ammorbidisce e le facciate sembrano ardere.",
      extra: "L'Infiorata (3° weekend di maggio): le strade del centro sono ricoperte di tappeti di fiori che raffigurano quadri viventi. Evento unico al mondo, da non perdere se siete lì in maggio.",
    },
    {
      cat: 'Vendicari · 8 km · 12 min',
      name: "Riserva naturale di Vendicari",
      desc: "Una delle più belle riserve naturali del Mediterraneo. Sentieri costieri tra lagune, rovine di tonnara e calette di sabbia bianca. Fenicotteri, aironi e le prime cicogne di settembre sono ospiti abituali. La spiaggia di Calamosche è regolarmente eletta tra le più belle d'Italia.",
      extra: "Arrivare presto al mattino o nel tardo pomeriggio per evitare la folla in luglio e agosto.",
    },
    {
      cat: 'Marzamemi · 20 km · 22 min',
      name: "Marzamemi",
      desc: "Antico borgo di pescatori dal fascino intatto — la sua piazza centrale, le barche colorate e i ristoranti di pesce intorno all'antica tonnara. Il posto giusto per un pranzo a base di polpo e vino bianco con i piedi quasi in acqua. La sera il paese si anima e la terrazza del bar centrale vale da sola il viaggio.",
    },
    {
      cat: 'Siracusa e Ortigia · 30 km · 35 min',
      name: "Siracusa e Ortigia",
      desc: "Fondata dai Greci nel 734 a.C., Siracusa è una delle città più antiche del mondo. Il teatro greco antico (V sec. a.C.) è ancora utilizzato per rappresentazioni in estate. Ortigia, l'isola barocca al cuore della città, concentra i palazzi più belli, la cattedrale ricavata da un tempio greco e la Fontana Aretusa. Prevedere una giornata intera.",
    },
    {
      cat: 'Ragusa Ibla · 45 km · 55 min',
      name: "Ragusa Ibla",
      desc: "Città barocca arroccata su un promontorio roccioso, scenario delle serie di Montalbano. I suoi vicoli in pendenza, i balconi scolpiti e il giardino Ibleo in fondo alla città ricompensano la salita a piedi. Il Palazzo Cosentini, con i suoi balconi di atlanti grotteschi, è il monumento più fotografato della città.",
    },
    {
      cat: 'Modica · 38 km · 45 min',
      name: "Modica e il cioccolato",
      desc: "Modica è famosa in tutto il mondo per il suo cioccolato a freddo, preparato secondo una ricetta di origine azteca tramandata dagli Spagnoli. Acquistato direttamente dai piccoli produttori del Corso Umberto, è uno dei migliori ricordi di Sicilia. La città barocca stessa, distribuita su due vallate, merita la visita per le sue chiese e i panorami.",
    },
    {
      cat: 'Cava Grande del Cassibile · 35 km · 50 min',
      name: "Cava Grande — piscine naturali",
      desc: "Un canyon selvaggio con piscine naturali di acqua dolce color smeraldo, raggiungibili attraverso un sentiero di discesa (40 min a piedi). Ancora poco conosciuto dai turisti stranieri, offre una nuotata nella natura eccezionale. Da evitare con caldo intenso — il sentiero di ritorno è ripido.",
    },
    {
      cat: 'Spiaggia San Lorenzo · 15 km · 20 min',
      name: "Spiaggia San Lorenzo",
      desc: "La più accessibile delle grandi spiagge dalla villa — una lunga striscia di sabbia fine circondata da dune. Pochi servizi sul posto, il che preserva il suo carattere selvaggio. Portare un ombrellone.",
    },
    {
      cat: 'Lido di Noto · 7 km · 10 min',
      name: "Lido di Noto",
      desc: "La spiaggia di Noto — vicina, semplice, adatta alle famiglie. Lidi attrezzati con lettini e ristorazione affiancano zone libere. Perfetta per un tardo pomeriggio dopo una giornata in città.",
    },
    {
      cat: 'Vini · Provincia di Siracusa',
      name: "Nero d'Avola e i vigneti",
      desc: "La provincia di Siracusa è il cuore della produzione del Nero d'Avola, il vitigno rosso più emblematico della Sicilia. Diverse tenute aperte alle visite tra Noto e Avola propongono degustazioni direttamente in cantina. Chiedeteci gli indirizzi che consigliamo.",
    },
  ],
  de: [
    {
      cat: 'Noto · 5 km · 10 Min.',
      name: "Noto Barock",
      desc: "Nach dem Erdbeben von 1693 nach einem einzigartigen Stadtplan wieder aufgebaut, gilt Noto als Meisterwerk des sizilianischen Barocks. Sein Corso Vittorio Emanuele, gesäumt von goldsteinigen Palästen, steht seit 2002 auf der UNESCO-Welterbeliste. Am besten abends zu erkunden, wenn das Licht sanft wird und die Fassaden zu leuchten scheinen.",
      extra: "Die Infiorata (3. Maiwochenende): Die Straßen des Stadtzentrums sind mit Blumenteppichen bedeckt, die lebende Gemälde darstellen. Ein einzigartiges Ereignis der Welt — nicht verpassen, wenn Sie im Mai dort sind.",
    },
    {
      cat: 'Vendicari · 8 km · 12 Min.',
      name: "Naturreservat Vendicari",
      desc: "Eines der schönsten Naturreservate des Mittelmeers. Küstenwege zwischen Lagunen, Ruinen alter Tonnare und weißen Sandbuchen. Flamingos, Reiher und die ersten Störche im September sind regelmäßige Gäste. Der Strand Calamosche wird regelmäßig als einer der schönsten Italiens gekürt.",
      extra: "Früh morgens oder am späten Nachmittag kommen, um die Menschenmassen im Juli und August zu vermeiden.",
    },
    {
      cat: 'Marzamemi · 20 km · 22 Min.',
      name: "Marzamemi",
      desc: "Ein altes Fischerdorf mit unberührtem Charme — sein zentraler Platz, bunte Boote und Fischrestaurants rund um die alte Tonnare. Der richtige Ort für ein Mittagessen mit Tintenfisch und Weißwein, fast mit den Füßen im Wasser. Abends belebt sich das Dorf und die Terrasse des zentralen Cafés ist die Reise allein wert.",
    },
    {
      cat: 'Syrakus & Ortygia · 30 km · 35 Min.',
      name: "Syrakus und Ortygia",
      desc: "Von den Griechen 734 v. Chr. gegründet, ist Syrakus eine der ältesten Städte der Welt. Das antike griechische Theater (5. Jh. v. Chr.) wird im Sommer noch für Aufführungen genutzt. Ortygia, die Barockinseln im Herzen der Stadt, vereint die schönsten Paläste, eine aus einem griechischen Tempel umgewandelte Kathedrale und die Fontana Aretusa. Planen Sie einen ganzen Tag ein.",
    },
    {
      cat: 'Ragusa Ibla · 45 km · 55 Min.',
      name: "Ragusa Ibla",
      desc: "Eine Barockstadt auf einem felsigen Vorsprung, Kulisse der Montalbano-TV-Serie. Seine Gassen, skulptierten Balkone und der Ibleo-Garten am Stadtrand lohnen den Aufstieg zu Fuß. Der Palazzo Cosentini mit seinen Balkonen grotesker Atlanten ist das meistfotografierte Denkmal der Stadt.",
    },
    {
      cat: 'Modica · 38 km · 45 Min.',
      name: "Modica und seine Schokolade",
      desc: "Modica ist weltweit bekannt für seine Kaltschokolade, hergestellt nach einem aztekischen Rezept, das von den Spaniern weitergegeben wurde. Direkt bei den kleinen Herstellern am Corso Umberto gekauft, ist sie eine der besten Souvenirs Siziliens. Die Barockstadt selbst, über zwei Täler verteilt, ist auch einen Besuch wert.",
    },
    {
      cat: 'Cava Grande del Cassibile · 35 km · 50 Min.',
      name: "Cava Grande — natürliche Schwimmbecken",
      desc: "Eine wilde Schlucht mit smaragdgrünen natürlichen Süßwasserbecken, erreichbar über einen Abstiegspfad (40 Min. zu Fuß). Noch wenig bekannt bei ausländischen Touristen, bietet er außergewöhnliches Schwimmen in der Natur. Bei extremer Hitze meiden — der Rückweg ist steil.",
    },
    {
      cat: 'Strand San Lorenzo · 15 km · 20 Min.',
      name: "Strand San Lorenzo",
      desc: "Der zugänglichste der großen Strände von der Villa — ein langer Streifen feinen Sandes umgeben von Dünen. Wenige Einrichtungen vor Ort, was seinen wilden Charakter erhält. Sonnenschirm mitbringen.",
    },
    {
      cat: 'Lido di Noto · 7 km · 10 Min.',
      name: "Lido di Noto",
      desc: "Der Strand von Noto — nah, einfach, familienfreundlich. Organisierte Badeanstalten mit Liegestühlen und Gastronomie teilen sich die Küste mit freien Zonen. Ideal für einen späten Nachmittag nach einem Tag in der Stadt.",
    },
    {
      cat: 'Weine · Provinz Syrakus',
      name: "Nero d'Avola und die Weinberge",
      desc: "Die Provinz Syrakus ist das Herzland der Nero d'Avola-Produktion, der emblematischsten roten Rebsorte Siziliens. Mehrere Weingüter zwischen Noto und Avola bieten Verkostungen direkt im Keller an. Fragen Sie uns nach unseren empfohlenen Adressen.",
    },
  ],
}

const HEADINGS = {
  fr: { breadcrumb: 'Noto et les environs', h1: 'Noto et les environs', sub: 'Val di Noto · Province de Syracuse · Sicile', intro: "La villa est idéalement placée pour explorer le cœur du Val di Noto, l'une des concentrations de baroque sicilien les plus denses au monde. En voiture, tout est accessible : les plus beaux villages, les plages sauvages, les vignobles — sans jamais dépasser 1h30 de route.", link_villa: '← La villa', link_journal: 'Journal de la villa →' },
  en: { breadcrumb: 'Noto & surroundings', h1: 'Noto and the surroundings', sub: 'Val di Noto · Syracuse Province · Sicily', intro: "The villa is ideally placed to explore the heart of the Val di Noto, one of the densest concentrations of Sicilian baroque in the world. By car, everything is within reach: the finest villages, wild beaches, vineyards — never more than 1h30 away.", link_villa: '← The villa', link_journal: 'Villa journal →' },
  it: { breadcrumb: 'Noto e dintorni', h1: 'Noto e i dintorni', sub: 'Val di Noto · Provincia di Siracusa · Sicilia', intro: "La villa è posizionata idealmente per esplorare il cuore del Val di Noto, una delle concentrazioni di barocco siciliano più dense al mondo. In auto, tutto è raggiungibile: i borghi più belli, le spiagge selvagge, i vigneti — senza mai superare 1h30 di strada.", link_villa: '← La villa', link_journal: 'Diario della villa →' },
  de: { breadcrumb: 'Noto & Umgebung', h1: 'Noto und die Umgebung', sub: 'Val di Noto · Provinz Syrakus · Sizilien', intro: "Die Villa liegt ideal, um das Herz des Val di Noto zu erkunden, einer der dichtesten Konzentrationen sizilianischen Barocks der Welt. Mit dem Auto ist alles erreichbar: die schönsten Dörfer, wilde Strände, Weinberge — nie mehr als 1,5 Stunden entfernt.", link_villa: '← Die Villa', link_journal: 'Villa-Journal →' },
}

export default function NotoPage({ params }: { params: { locale: string } }) {
  const locale = (LOCALES.includes(params.locale as Lang) ? params.locale : 'fr') as Lang
  const c = HEADINGS[locale]
  const places = PLACES[locale]

  const homeLabel = locale === 'fr' ? 'Accueil' : locale === 'de' ? 'Startseite' : 'Home'
  return (
    <>
      <JsonLd data={[getBreadcrumbSchema([
        { name: homeLabel, item: `${BASE}/${locale}` },
        { name: c.breadcrumb, item: `${BASE}/${locale}/noto` },
      ])]} />
      <PageLayout lang={locale} page="noto" breadcrumb={c.breadcrumb}>

      <div className="mb-14">
        <p className="section-subtitle">{c.sub}</p>
        <h1 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight mb-6">{c.h1}</h1>
        <div className="gold-divider" />
        <p className="font-sans text-muted text-base leading-relaxed max-w-2xl">{c.intro}</p>
      </div>

      {/* Distances summary */}
      <div className="bg-navy text-white p-8 mb-14 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { place: 'Noto', dist: '5 km' },
          { place: 'Vendicari', dist: '8 km' },
          { place: 'Syracuse', dist: '30 km' },
          { place: 'Ragusa Ibla', dist: '45 km' },
        ].map(d => (
          <div key={d.place} className="text-center">
            <p className="font-serif text-2xl text-gold">{d.dist}</p>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/60 mt-1">{d.place}</p>
          </div>
        ))}
      </div>

      {/* Places list */}
      <div className="space-y-12 mb-16">
        {places.map((place, i) => (
          <article key={i} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-0 border-b border-gold/20 pb-12 last:border-none">
            <div className="md:pt-1 mb-4 md:mb-0">
              <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-gold leading-relaxed">{place.cat}</p>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-3">{place.name}</h2>
              <p className="font-sans text-muted text-sm leading-relaxed">{place.desc}</p>
              {place.extra && (
                <p className="font-sans text-sm text-charcoal mt-4 border-l-2 border-gold pl-4 leading-relaxed">{place.extra}</p>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Internal nav */}
      <div className="flex flex-wrap gap-4">
        <Link href={`/${locale}/villa`}
          className="font-sans text-xs tracking-widest uppercase px-6 py-3 border border-navy text-navy hover:bg-navy hover:text-white transition-all duration-300">
          {c.link_villa}
        </Link>
        <Link href={`/${locale}/journal`}
          className="font-sans text-xs tracking-widest uppercase px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-white transition-all duration-300">
          {c.link_journal}
        </Link>
      </div>

    </PageLayout>
    </>
  )
}
