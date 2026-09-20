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
    description: 'Noto baroque UNESCO à 5 km, Vendicari à 12 min, Syracuse à 35 min. Astuces pratiques, itinéraire 3 jours et tout ce que le Val di Noto a à offrir depuis Villa Vénus Noto.',
  },
  en: {
    title: 'Noto & Val di Noto — Things to Do from Villa Vénus Noto',
    description: 'Baroque Noto UNESCO 5 km away, Vendicari 12 minutes, Syracuse 35 minutes. Practical tips, a 3-day itinerary and everything the Val di Noto has to offer from Villa Vénus Noto.',
  },
  it: {
    title: 'Noto e il Val di Noto — Cosa fare da Villa Vénus Noto',
    description: 'Noto barocca UNESCO a 5 km, Vendicari a 12 minuti, Siracusa a 35 minuti. Consigli pratici, itinerario di 3 giorni e tutto ciò che il Val di Noto offre da Villa Vénus Noto.',
  },
  de: {
    title: 'Noto & Val di Noto — Ausflüge von Villa Vénus Noto',
    description: 'Barockes Noto UNESCO 5 km entfernt, Vendicari 12 Minuten, Syrakus 35 Minuten. Praktische Tipps, ein 3-Tage-Programm und alles, was das Val di Noto von der Villa Vénus Noto aus zu bieten hat.',
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

type Place = {
  cat: string
  name: string
  desc: string
  extra?: string
  tip?: string
}

type Day = { label: string; text: string }

type Headings = {
  breadcrumb: string
  h1: string
  sub: string
  intro: string
  distances: Array<{ place: string; dist: string }>
  itinerary3_title: string
  itinerary3: Day[]
  link_beaches: string
  link_itinerary: string
  link_villa: string
  link_journal: string
}

const PLACES: Record<Lang, Place[]> = {
  fr: [
    {
      cat: 'Noto · 5 km · 10 min',
      name: 'Noto baroque',
      desc: "Reconstruite après le tremblement de terre de 1693 selon un plan urbanistique unique, Noto est considérée comme le chef-d'œuvre du baroque sicilien. Son Corso Vittorio Emanuele, bordé de palais en pierre d'or, figure au Patrimoine Mondial UNESCO depuis 2002. À explorer le soir, quand la lumière est douce et que les façades semblent brûler.",
      extra: "L'Infiorata (3e weekend de mai) : les rues du centre sont recouvertes de tapis de fleurs représentant des tableaux vivants. Événement unique au monde, à ne pas manquer si vous êtes là en mai.",
      tip: "Garer la voiture en dehors du centre historique et rejoindre le Corso à pied (10 min). Pour les façades dans leur meilleure lumière, visiter à partir de 16h plutôt qu'en pleine journée.",
    },
    {
      cat: 'Vendicari · 8 km · 12 min',
      name: 'Réserve naturelle de Vendicari',
      desc: "L'une des plus belles réserves naturelles de Méditerranée. Des sentiers longeant la côte entre lagunes, ruines de tonnara et criques de sable blanc. On y croise des flamants roses, des hérons et en septembre les premières cigognes. La plage de Calamosche est régulièrement élue l'une des plus belles d'Italie.",
      extra: "Arriver tôt le matin ou en fin d'après-midi pour éviter la foule en juillet-août.",
      tip: "Le parking de Calamosche est payant en haute saison (env. 5 €). Arriver avant 9h pour trouver une place et avoir la plage presque pour soi. Compter 15 min de marche depuis le parking.",
    },
    {
      cat: 'Marzamemi · 20 km · 22 min',
      name: 'Marzamemi',
      desc: "Ancien village de pêcheurs au charme intact, avec sa piazza centrale, ses barques colorées et ses restaurants de poisson autour de l'ancienne tonnara. L'endroit pour un déjeuner de poulpe et de vino bianco, les pieds presque dans l'eau. Le soir, le village s'anime davantage et la terrasse du café central vaut à elle seule le déplacement.",
      tip: "Marzamemi est plus agréable pour le déjeuner que le soir en haute saison — le village se remplit de touristes dès 19h en juillet-août. Si vous venez le soir, réservez à l'avance.",
    },
    {
      cat: 'Syracuse et Ortygie · 30 km · 35 min',
      name: 'Syracuse et Ortygie',
      desc: "Fondée par les Grecs en 734 avant J.-C., Syracuse est l'une des plus vieilles villes du monde. Le théâtre grec antique (Vᵉ siècle av. J.-C.) est encore utilisé pour des représentations en été. Ortygie, l'île baroque au cœur de la ville, concentre les plus beaux palais, la cathédrale transformée depuis un temple grec, et la Fontana Aretusa. Compter une journée entière.",
      tip: "Laisser la voiture sur le continent et rejoindre Ortygie à pied par le Ponte Umbertino. Pour le Théâtre grec, réserver les billets en ligne la veille en juillet-août — les files peuvent être longues.",
    },
    {
      cat: 'Ragusa Ibla · 45 km · 55 min',
      name: 'Ragusa Ibla',
      desc: "Ville baroque perchée sur un promontoire rocheux, décor des séries Montalbano. Ses ruelles en pente, ses balcons sculptés et le jardin Ibleo au bout de la ville méritent l'ascension à pied. Le Palazzo Cosentini, avec ses balcons aux atlantes grotesques, est le monument le plus photographié de la ville.",
      tip: "Le GPS dirige souvent vers Ragusa Superiore — suivre les panneaux 'Ragusa Ibla' une fois dans le centre. L'accès à pied depuis la ville haute, par les escaliers baroques, vaut le coucher de soleil sur la vallée.",
    },
    {
      cat: 'Modica · 38 km · 45 min',
      name: 'Modica et le chocolat',
      desc: "Modica est mondialement connue pour son chocolat froid, préparé à froid selon une recette d'origine aztèque transmise par les Espagnols. Acheté directement aux petits fabricants du Corso Umberto, c'est l'un des meilleurs souvenirs de Sicile. La ville baroque elle-même, étagée sur deux vallées, vaut aussi la visite pour ses églises et ses panoramas.",
      tip: "Pour le chocolat, les petits ateliers artisanaux du Corso Umberto sont préférables aux boutiques de l'entrée de ville. Visiter le matin — les ruelles escarpées sont éprouvantes sous le soleil de l'après-midi.",
    },
    {
      cat: 'Cava Grande del Cassibile · 35 km · 50 min',
      name: 'Cava Grande — les piscines naturelles',
      desc: "Un canyon sauvage avec des piscines naturelles d'eau douce émeraude accessible par un sentier de descente (40 min à pied). L'endroit reste peu connu des touristes étrangers et offre une baignade en pleine nature exceptionnelle. À éviter par très forte chaleur — le sentier de retour est raide.",
      tip: "Partir avant 9h : la descente est ombragée le matin, la remontée devient éprouvante si vous attendez la chaleur. Prévoir au minimum 1,5 L d'eau par personne. Déconseillé aux très jeunes enfants (sentier exposé).",
    },
    {
      cat: 'Plage San Lorenzo · 22 km · 25 min',
      name: 'Plage San Lorenzo',
      desc: "Une longue bande de sable fin entourée de dunes, avec peu de services sur place — ce qui lui préserve un caractère sauvage appréciable. La mer y est peu profonde sur les premiers mètres, idéale pour les enfants. Idéale en juin ou septembre quand les autres plages sont plus fréquentées.",
      tip: "Plage sans services — apporter parasol, eau et pique-nique. Le parking longe la route et est gratuit. Pour les plages équipées ou des conseils par type de visiteur, voir notre guide des plages.",
    },
    {
      cat: 'Lido di Noto · 7 km · 10 min',
      name: 'Lido di Noto',
      desc: "La plage de Noto — proche, facile, familiale. Des lidos organisés avec transats et restauration côtoient des zones libres. Idéale pour une fin d'après-midi après une journée en ville ou pour une première baignade à l'arrivée.",
      tip: "En juillet-août, les lidos privés sont complets dès 10h. Arriver tôt ou se diriger vers la zone libre au nord de la plage, moins aménagée mais plus tranquille.",
    },
    {
      cat: 'Vins · Province de Syracuse',
      name: "Nero d'Avola et les vignobles",
      desc: "La province de Syracuse est le cœur de production du Nero d'Avola, le cépage rouge le plus emblématique de Sicile. Plusieurs domaines ouverts à la visite entre Noto et Avola proposent des dégustations directement au chai. Demandez-nous les adresses que nous recommandons.",
      tip: "La période des vendanges (fin septembre–octobre) est idéale pour visiter. La plupart des domaines accueillent sans réservation en semaine. Les vins 'Noto DOC' sont à chercher spécifiquement — l'appellation est distincte du générique Nero d'Avola IGT.",
    },
  ],
  en: [
    {
      cat: 'Noto · 5 km · 10 min',
      name: 'Baroque Noto',
      desc: "Rebuilt after the 1693 earthquake to a unique urban plan, Noto is considered the masterpiece of Sicilian baroque. Its Corso Vittorio Emanuele, lined with golden stone palaces, has been a UNESCO World Heritage Site since 2002. Best explored in the evening, when the light softens and the facades seem to glow.",
      extra: "The Infiorata (3rd weekend of May): the streets of the centre are covered with carpets of flowers depicting living paintings. A unique event in the world — not to be missed if you're there in May.",
      tip: "Park outside the historic centre and walk to the Corso (10 min). For the facades in their best light, visit from 4pm rather than midday.",
    },
    {
      cat: 'Vendicari · 8 km · 12 min',
      name: 'Vendicari Nature Reserve',
      desc: "One of the most beautiful nature reserves in the Mediterranean. Coastal trails wind between lagoons, old tonnara ruins and white sand coves. Flamingos, herons and September's first storks are regular visitors. Calamosche beach is regularly voted one of the most beautiful in Italy.",
      extra: "Go early in the morning or late afternoon to avoid crowds in July and August.",
      tip: "The Calamosche car park charges in high season (around €5). Arrive before 9am to be sure of a space and have the beach almost to yourself. Allow 15 minutes' walk from the car park.",
    },
    {
      cat: 'Marzamemi · 20 km · 22 min',
      name: 'Marzamemi',
      desc: "An old fishing village with intact charm — its central square, colourful boats and fish restaurants around the ancient tonnara. The place for a lunch of octopus and white wine with your feet almost in the water. In the evening, the village comes alive and the terrace of the central café is worth the trip alone.",
      tip: "Marzamemi is more pleasant for lunch than dinner in high season — the village fills with tourists from 7pm in July and August. If you come in the evening, book ahead.",
    },
    {
      cat: 'Syracuse and Ortygia · 30 km · 35 min',
      name: 'Syracuse and Ortygia',
      desc: "Founded by the Greeks in 734 BC, Syracuse is one of the oldest cities in the world. The ancient Greek theatre (5th century BC) is still used for performances in summer. Ortygia, the baroque island at the heart of the city, concentrates the finest palaces, a cathedral converted from a Greek temple, and the Fontana Aretusa. Allow a full day.",
      tip: "Leave the car on the mainland and walk to Ortygia across the Ponte Umbertino. For the Greek theatre, book tickets online the day before in July–August — queues can be long.",
    },
    {
      cat: 'Ragusa Ibla · 45 km · 55 min',
      name: 'Ragusa Ibla',
      desc: "A baroque town perched on a rocky promontory, setting for the Montalbano TV series. Its sloping lanes, sculpted balconies and the Ibleo gardens at the town's edge reward the walk uphill. The Palazzo Cosentini, with its balconies of grotesque atlantes, is the most photographed monument in the city.",
      tip: "GPS often routes to Ragusa Superiore — follow signs for 'Ragusa Ibla' once in the upper town. The walk down via the baroque staircase, timed for sunset over the valley, is one of the finest views in Sicily.",
    },
    {
      cat: 'Modica · 38 km · 45 min',
      name: 'Modica and its chocolate',
      desc: "Modica is world-famous for its cold chocolate, made using an Aztec recipe passed down via the Spanish. Bought directly from small producers on the Corso Umberto, it's one of the best souvenirs of Sicily. The baroque town itself, spread across two valleys, is also worth visiting for its churches and panoramas.",
      tip: "For the chocolate, the artisan workshops on the Corso Umberto are far better than the souvenir shops near the town entrance. Visit in the morning — the steep lanes are punishing in afternoon heat.",
    },
    {
      cat: 'Cava Grande del Cassibile · 35 km · 50 min',
      name: 'Cava Grande — natural swimming pools',
      desc: "A wild canyon with emerald freshwater natural pools, reached by a descent trail (40 min on foot). Still little known to foreign tourists, it offers exceptional swimming in nature. Avoid in extreme heat — the return trail is steep.",
      tip: "Leave before 9am: the descent is shaded in the morning and the climb back becomes gruelling once the heat sets in. Bring at least 1.5 L of water per person. Not recommended for very young children (exposed path).",
    },
    {
      cat: 'San Lorenzo Beach · 22 km · 25 min',
      name: 'San Lorenzo beach',
      desc: "A long stretch of fine sand surrounded by dunes, with few facilities on site — which preserves its wild character. The sea is shallow for the first few metres, ideal for children. Best in June or September when the other beaches are busier.",
      tip: "No facilities — bring a sun umbrella, water and food. Parking along the roadside is free. For equipped beaches or recommendations by type of visitor, see our beach guide.",
    },
    {
      cat: 'Lido di Noto · 7 km · 10 min',
      name: 'Lido di Noto',
      desc: "Noto's beach — close, easy, family-friendly. Organised lidos with sun loungers and food share the coast with free areas. Perfect for a late afternoon after a day in town or a first swim on arrival.",
      tip: "In July–August, private lidos fill up by 10am. Arrive early or head to the free zone at the northern end of the beach, less organised but quieter.",
    },
    {
      cat: 'Wines · Syracuse Province',
      name: "Nero d'Avola and the vineyards",
      desc: "The Syracuse province is the heartland of Nero d'Avola production, Sicily's most emblematic red grape variety. Several estates open to visitors between Noto and Avola offer tastings directly at the cellar. Ask us for our recommended addresses.",
      tip: "The harvest period (late September–October) is the best time to visit. Most estates welcome visitors without a booking on weekdays. Look specifically for 'Noto DOC' wines — the appellation is distinct from the generic Nero d'Avola IGT.",
    },
  ],
  it: [
    {
      cat: 'Noto · 5 km · 10 min',
      name: 'Noto barocca',
      desc: "Ricostruita dopo il terremoto del 1693 secondo un piano urbanistico unico, Noto è considerata il capolavoro del barocco siciliano. Il suo Corso Vittorio Emanuele, fiancheggiato da palazzi in pietra dorata, è Patrimonio Mondiale UNESCO dal 2002. Da visitare la sera, quando la luce si ammorbidisce e le facciate sembrano ardere.",
      extra: "L'Infiorata (3° weekend di maggio): le strade del centro sono ricoperte di tappeti di fiori che raffigurano quadri viventi. Evento unico al mondo, da non perdere se siete lì in maggio.",
      tip: "Parcheggiare fuori dal centro storico e raggiungere il Corso a piedi (10 min). Per le facciate nella luce migliore, visitare dalle 16 in poi piuttosto che a metà giornata.",
    },
    {
      cat: 'Vendicari · 8 km · 12 min',
      name: 'Riserva naturale di Vendicari',
      desc: "Una delle più belle riserve naturali del Mediterraneo. Sentieri costieri tra lagune, rovine di tonnara e calette di sabbia bianca. Fenicotteri, aironi e le prime cicogne di settembre sono ospiti abituali. La spiaggia di Calamosche è regolarmente eletta tra le più belle d'Italia.",
      extra: "Arrivare presto al mattino o nel tardo pomeriggio per evitare la folla in luglio e agosto.",
      tip: "Il parcheggio di Calamosche è a pagamento in alta stagione (circa 5 €). Arrivare prima delle 9 per trovare posto e avere la spiaggia quasi per sé. Dal parcheggio alla spiaggia sono circa 15 minuti a piedi.",
    },
    {
      cat: 'Marzamemi · 20 km · 22 min',
      name: 'Marzamemi',
      desc: "Antico borgo di pescatori dal fascino intatto — la sua piazza centrale, le barche colorate e i ristoranti di pesce intorno all'antica tonnara. Il posto giusto per un pranzo a base di polpo e vino bianco con i piedi quasi in acqua. La sera il paese si anima e la terrazza del bar centrale vale da sola il viaggio.",
      tip: "Marzamemi è più piacevole per il pranzo che per la cena in alta stagione — il paese si riempie di turisti dalle 19 in luglio e agosto. Se venite la sera, prenotate in anticipo.",
    },
    {
      cat: 'Siracusa e Ortigia · 30 km · 35 min',
      name: 'Siracusa e Ortigia',
      desc: "Fondata dai Greci nel 734 a.C., Siracusa è una delle città più antiche del mondo. Il teatro greco antico (V sec. a.C.) è ancora utilizzato per rappresentazioni in estate. Ortigia, l'isola barocca al cuore della città, concentra i palazzi più belli, la cattedrale ricavata da un tempio greco e la Fontana Aretusa. Prevedere una giornata intera.",
      tip: "Lasciare l'auto sul continente e raggiungere Ortigia a piedi attraverso il Ponte Umbertino. Per il teatro greco, prenotare i biglietti online il giorno prima in luglio-agosto — le file possono essere lunghe.",
    },
    {
      cat: 'Ragusa Ibla · 45 km · 55 min',
      name: 'Ragusa Ibla',
      desc: "Città barocca arroccata su un promontorio roccioso, scenario delle serie di Montalbano. I suoi vicoli in pendenza, i balconi scolpiti e il giardino Ibleo in fondo alla città ricompensano la salita a piedi. Il Palazzo Cosentini, con i suoi balconi di atlanti grotteschi, è il monumento più fotografato della città.",
      tip: "Il GPS spesso porta a Ragusa Superiore — seguire le indicazioni 'Ragusa Ibla' una volta in città. La discesa a piedi tramite la scalinata barocca, calcolata per il tramonto sulla vallata, regala uno dei panorami più belli della Sicilia.",
    },
    {
      cat: 'Modica · 38 km · 45 min',
      name: 'Modica e il cioccolato',
      desc: "Modica è famosa in tutto il mondo per il suo cioccolato a freddo, preparato secondo una ricetta di origine azteca tramandata dagli Spagnoli. Acquistato direttamente dai piccoli produttori del Corso Umberto, è uno dei migliori ricordi di Sicilia. La città barocca stessa, distribuita su due vallate, merita la visita per le sue chiese e i panorami.",
      tip: "Per il cioccolato, i laboratori artigianali del Corso Umberto sono molto meglio delle boutique turistiche all'ingresso della città. Visitare la mattina — i vicoli ripidi sono faticosi nel pomeriggio soleggiato.",
    },
    {
      cat: 'Cava Grande del Cassibile · 35 km · 50 min',
      name: 'Cava Grande — piscine naturali',
      desc: "Un canyon selvaggio con piscine naturali di acqua dolce color smeraldo, raggiungibili attraverso un sentiero di discesa (40 min a piedi). Ancora poco conosciuto dai turisti stranieri, offre una nuotata nella natura eccezionale. Da evitare con caldo intenso — il sentiero di ritorno è ripido.",
      tip: "Partire prima delle 9: la discesa è in ombra al mattino, la risalita diventa faticosa se si aspetta il caldo. Portare almeno 1,5 L d'acqua a persona. Sconsigliato con bambini piccoli (sentiero esposto).",
    },
    {
      cat: 'Spiaggia San Lorenzo · 22 km · 25 min',
      name: 'Spiaggia San Lorenzo',
      desc: "Una lunga striscia di sabbia fine circondata da dune, con pochi servizi sul posto — il che preserva il suo carattere selvaggio. Il mare è basso nei primi metri, ideale per i bambini. Consigliata in giugno o settembre quando le altre spiagge sono più affollate.",
      tip: "Spiaggia senza servizi — portare ombrellone, acqua e cibo. Il parcheggio lungo la strada è gratuito. Per spiagge attrezzate o consigli per tipo di visitatore, consultate la nostra guida alle spiagge.",
    },
    {
      cat: 'Lido di Noto · 7 km · 10 min',
      name: 'Lido di Noto',
      desc: "La spiaggia di Noto — vicina, semplice, adatta alle famiglie. Lidi attrezzati con lettini e ristorazione affiancano zone libere. Perfetta per un tardo pomeriggio dopo una giornata in città o per un primo bagno all'arrivo.",
      tip: "In luglio-agosto i lidi privati si riempiono entro le 10. Arrivare presto o dirigersi verso la zona libera a nord della spiaggia, meno attrezzata ma più tranquilla.",
    },
    {
      cat: 'Vini · Provincia di Siracusa',
      name: "Nero d'Avola e i vigneti",
      desc: "La provincia di Siracusa è il cuore della produzione del Nero d'Avola, il vitigno rosso più emblematico della Sicilia. Diverse tenute aperte alle visite tra Noto e Avola propongono degustazioni direttamente in cantina. Chiedeteci gli indirizzi che consigliamo.",
      tip: "Il periodo della vendemmia (fine settembre–ottobre) è il momento migliore per visitare. La maggior parte delle tenute accoglie senza prenotazione durante la settimana. Cercare specificamente i vini 'Noto DOC' — la denominazione è diversa dal generico Nero d'Avola IGT.",
    },
  ],
  de: [
    {
      cat: 'Noto · 5 km · 10 Min.',
      name: 'Noto Barock',
      desc: "Nach dem Erdbeben von 1693 nach einem einzigartigen Stadtplan wieder aufgebaut, gilt Noto als Meisterwerk des sizilianischen Barocks. Sein Corso Vittorio Emanuele, gesäumt von goldsteinigen Palästen, steht seit 2002 auf der UNESCO-Welterbeliste. Am besten abends zu erkunden, wenn das Licht sanft wird und die Fassaden zu leuchten scheinen.",
      extra: "Die Infiorata (3. Maiwochenende): Die Straßen des Stadtzentrums sind mit Blumenteppichen bedeckt, die lebende Gemälde darstellen. Ein einzigartiges Ereignis der Welt — nicht verpassen, wenn Sie im Mai dort sind.",
      tip: "Parken Sie außerhalb der Altstadt und gehen Sie zum Corso zu Fuß (10 Min.). Um die Fassaden im besten Licht zu sehen, kommen Sie ab 16 Uhr — nicht in der Mittagshitze.",
    },
    {
      cat: 'Vendicari · 8 km · 12 Min.',
      name: 'Naturreservat Vendicari',
      desc: "Eines der schönsten Naturreservate des Mittelmeers. Küstenwege zwischen Lagunen, Ruinen alter Tonnare und weißen Sandbuchten. Flamingos, Reiher und die ersten Störche im September sind regelmäßige Gäste. Der Strand Calamosche wird regelmäßig als einer der schönsten Italiens gekürt.",
      extra: "Früh morgens oder am späten Nachmittag kommen, um die Menschenmassen im Juli und August zu vermeiden.",
      tip: "Der Parkplatz Calamosche ist in der Hochsaison kostenpflichtig (ca. 5 €). Vor 9 Uhr anreisen, um einen Platz zu finden und den Strand fast für sich zu haben. Vom Parkplatz zum Strand ca. 15 Minuten zu Fuß.",
    },
    {
      cat: 'Marzamemi · 20 km · 22 Min.',
      name: 'Marzamemi',
      desc: "Ein altes Fischerdorf mit unberührtem Charme — sein zentraler Platz, bunte Boote und Fischrestaurants rund um die alte Tonnara. Der richtige Ort für ein Mittagessen mit Tintenfisch und Weißwein, fast mit den Füßen im Wasser. Abends belebt sich das Dorf und die Terrasse des zentralen Cafés ist die Reise allein wert.",
      tip: "Marzamemi ist im Hochsommer zum Mittag angenehmer als abends — das Dorf füllt sich ab 19 Uhr im Juli und August mit Touristen. Abends: im Voraus reservieren.",
    },
    {
      cat: 'Syrakus & Ortygia · 30 km · 35 Min.',
      name: 'Syrakus und Ortygia',
      desc: "Von den Griechen 734 v. Chr. gegründet, ist Syrakus eine der ältesten Städte der Welt. Das antike griechische Theater (5. Jh. v. Chr.) wird im Sommer noch für Aufführungen genutzt. Ortygia, die Barockinseln im Herzen der Stadt, vereint die schönsten Paläste, eine aus einem griechischen Tempel umgewandelte Kathedrale und die Fontana Aretusa. Planen Sie einen ganzen Tag ein.",
      tip: "Lassen Sie das Auto auf dem Festland und gehen Sie über die Ponte Umbertino zu Fuß nach Ortygia. Für das griechische Theater in Juli–August: Tickets am Vortag online buchen — die Schlangen können lang sein.",
    },
    {
      cat: 'Ragusa Ibla · 45 km · 55 Min.',
      name: 'Ragusa Ibla',
      desc: "Eine Barockstadt auf einem felsigen Vorsprung, Kulisse der Montalbano-TV-Serie. Seine Gassen, skulptierten Balkone und der Ibleo-Garten am Stadtrand lohnen den Aufstieg zu Fuß. Der Palazzo Cosentini mit seinen Balkonen grotesker Atlanten ist das meistfotografierte Denkmal der Stadt.",
      tip: "Das GPS führt oft nach Ragusa Superiore — im Stadtzentrum den Schildern 'Ragusa Ibla' folgen. Der Abstieg über die barocke Treppe zum Sonnenuntergang über dem Tal ist einer der schönsten Ausblicke Siziliens.",
    },
    {
      cat: 'Modica · 38 km · 45 Min.',
      name: 'Modica und seine Schokolade',
      desc: "Modica ist weltweit bekannt für seine Kaltschokolade, hergestellt nach einem aztekischen Rezept, das von den Spaniern weitergegeben wurde. Direkt bei den kleinen Herstellern am Corso Umberto gekauft, ist sie eine der besten Souvenirs Siziliens. Die Barockstadt selbst, über zwei Täler verteilt, ist auch einen Besuch wert.",
      tip: "Für die Schokolade: die Handwerksbetriebe am Corso Umberto sind weit besser als die Souvenirläden am Stadteingang. Morgens besuchen — die steilen Gassen sind in der Nachmittagshitze anstrengend.",
    },
    {
      cat: 'Cava Grande del Cassibile · 35 km · 50 Min.',
      name: 'Cava Grande — natürliche Schwimmbecken',
      desc: "Eine wilde Schlucht mit smaragdgrünen natürlichen Süßwasserbecken, erreichbar über einen Abstiegspfad (40 Min. zu Fuß). Noch wenig bekannt bei ausländischen Touristen, bietet er außergewöhnliches Schwimmen in der Natur. Bei extremer Hitze meiden — der Rückweg ist steil.",
      tip: "Vor 9 Uhr aufbrechen: der Abstieg ist morgens schattig, der Rückweg wird anstrengend, wenn die Hitze einsetzt. Mindestens 1,5 L Wasser pro Person mitbringen. Nicht empfohlen für sehr kleine Kinder.",
    },
    {
      cat: 'Strand San Lorenzo · 22 km · 25 Min.',
      name: 'Strand San Lorenzo',
      desc: "Ein langer Streifen feinen Sandes umgeben von Dünen, mit wenigen Einrichtungen vor Ort — was seinen wilden Charakter erhält. Das Meer ist flach auf den ersten Metern, ideal für Kinder. Am schönsten im Juni oder September, wenn andere Strände voller sind.",
      tip: "Kein Service vor Ort — Sonnenschirm, Wasser und Essen mitbringen. Parkplatz entlang der Straße ist kostenlos. Für Strände mit Ausstattung oder Empfehlungen nach Besuchertyp: unsere Strandübersicht.",
    },
    {
      cat: 'Lido di Noto · 7 km · 10 Min.',
      name: 'Lido di Noto',
      desc: "Der Strand von Noto — nah, einfach, familienfreundlich. Organisierte Badeanstalten mit Liegestühlen und Gastronomie teilen sich die Küste mit freien Zonen. Ideal für einen späten Nachmittag nach einem Tag in der Stadt oder für das erste Bad nach der Ankunft.",
      tip: "Im Juli–August sind private Lidos bis 10 Uhr ausgebucht. Früh kommen oder zum freien Bereich am nördlichen Ende des Strandes gehen — weniger ausgestattet, aber ruhiger.",
    },
    {
      cat: 'Weine · Provinz Syrakus',
      name: "Nero d'Avola und die Weinberge",
      desc: "Die Provinz Syrakus ist das Herzland der Nero d'Avola-Produktion, der emblematischsten roten Rebsorte Siziliens. Mehrere Weingüter zwischen Noto und Avola bieten Verkostungen direkt im Keller an. Fragen Sie uns nach unseren empfohlenen Adressen.",
      tip: "Die Erntezeit (Ende September–Oktober) ist ideal für Besuche. Die meisten Weingüter empfangen ohne Reservierung unter der Woche. Achten Sie speziell auf 'Noto DOC'-Weine — die Bezeichnung unterscheidet sich vom generischen Nero d'Avola IGT.",
    },
  ],
}

const HEADINGS: Record<Lang, Headings> = {
  fr: {
    breadcrumb: 'Noto et les environs',
    h1: 'Noto et les environs',
    sub: 'Val di Noto · Province de Syracuse · Sicile',
    intro: "Cinq kilomètres séparent la villa du centre de Noto. Ce n'est pas une coïncidence — la villa est posée au cœur du Val di Noto, l'un des territoires baroques les plus remarquables du monde, inscrit au Patrimoine Mondial UNESCO depuis 2002. Chaque matin, vous choisissez votre journée : Vendicari et ses flamants roses à douze minutes, les ruelles de Modica à quarante-cinq, Ortygie et la mer à trente-cinq. En une semaine, vous pouvez tout voir sans jamais passer deux heures consécutives dans la voiture. La voiture est indispensable — mais les routes de campagne sicilienne font partie du voyage.",
    distances: [
      { place: 'Noto', dist: '5 km' },
      { place: 'Vendicari', dist: '8 km' },
      { place: 'Marzamemi', dist: '20 km' },
      { place: 'Syracuse', dist: '30 km' },
      { place: 'Modica', dist: '38 km' },
      { place: 'Ragusa Ibla', dist: '45 km' },
    ],
    itinerary3_title: "Si vous n'avez que 3 jours",
    itinerary3: [
      {
        label: 'Jour 1 — Noto',
        text: "Arrivée en fin de matinée. Déposez les bagages à la villa et rejoignez Noto en voiture (10 minutes). Promenez-vous le long du Corso Vittorio Emanuele, montez les escaliers de la Cathédrale pour voir la ville depuis les hauteurs. Déjeuner dans le centre historique. Retour à la villa pour l'après-midi à la piscine. Dîner dehors.",
      },
      {
        label: 'Jour 2 — Vendicari · Marzamemi',
        text: "Lever tôt. Départ à 8h pour Calamosche (12 minutes) avant l'afflux. Matinée sur la plage. Déjeuner de poisson à Marzamemi (22 minutes de Vendicari). Balade dans le village l'après-midi, retour à la villa pour le coucher de soleil.",
      },
      {
        label: 'Jour 3 — Syracuse · Ortygie',
        text: "Journée entière. Départ à 9h pour Syracuse (35 minutes). Théâtre grec le matin, déjeuner à Ortygie, après-midi dans les ruelles de l'île baroque, café devant la Fontana Aretusa. Retour à la villa pour l'apéritif au coucher du soleil.",
      },
    ],
    link_beaches: 'Guide des plages →',
    link_itinerary: 'Itinéraire 7 jours →',
    link_villa: '← La villa',
    link_journal: 'Journal de la villa →',
  },
  en: {
    breadcrumb: 'Noto & surroundings',
    h1: 'Noto and the surroundings',
    sub: 'Val di Noto · Syracuse Province · Sicily',
    intro: "Five kilometres separate the villa from the centre of Noto. That's not a coincidence — the villa sits at the heart of the Val di Noto, one of the finest concentrations of baroque architecture in the world, inscribed as a UNESCO World Heritage Site in 2002. Each morning you choose your day: Vendicari and its flamingos twelve minutes away, the lanes of Modica at forty-five, Ortygia and the sea at thirty-five. In a week, you can see everything without ever spending more than an hour in the car at a stretch. A car is essential — but Sicily's country roads are part of the journey.",
    distances: [
      { place: 'Noto', dist: '5 km' },
      { place: 'Vendicari', dist: '8 km' },
      { place: 'Marzamemi', dist: '20 km' },
      { place: 'Syracuse', dist: '30 km' },
      { place: 'Modica', dist: '38 km' },
      { place: 'Ragusa Ibla', dist: '45 km' },
    ],
    itinerary3_title: 'If you only have 3 days',
    itinerary3: [
      {
        label: 'Day 1 — Noto',
        text: "Arrive late morning. Drop luggage at the villa and drive to Noto (10 minutes). Walk the length of Corso Vittorio Emanuele, climb the Cathedral steps for a view over the city. Lunch in the historic centre. Back to the villa for an afternoon by the pool. Dinner outdoors.",
      },
      {
        label: 'Day 2 — Vendicari · Marzamemi',
        text: "Early start. Leave at 8am for Calamosche beach (12 minutes) before the crowds. Morning on the beach. Fish lunch in Marzamemi (22 minutes from Vendicari). Stroll through the village in the afternoon, back to the villa for sunset.",
      },
      {
        label: 'Day 3 — Syracuse · Ortygia',
        text: "A full day. Leave at 9am for Syracuse (35 minutes). Greek theatre in the morning, lunch on Ortygia, afternoon in the baroque island's lanes, coffee by the Fontana Aretusa. Back to the villa for a sunset aperitivo.",
      },
    ],
    link_beaches: 'Beach guide →',
    link_itinerary: '7-day itinerary →',
    link_villa: '← The villa',
    link_journal: 'Villa journal →',
  },
  it: {
    breadcrumb: 'Noto e dintorni',
    h1: 'Noto e i dintorni',
    sub: 'Val di Noto · Provincia di Siracusa · Sicilia',
    intro: "Cinque chilometri separano la villa dal centro di Noto. Non è una coincidenza — la villa è situata nel cuore del Val di Noto, una delle più straordinarie concentrazioni di architettura barocca del mondo, iscritta al Patrimonio Mondiale UNESCO dal 2002. Ogni mattina scegliete la vostra giornata: Vendicari e i suoi fenicotteri a dodici minuti, i vicoli di Modica a quarantacinque, Ortigia e il mare a trentacinque. In una settimana potete vedere tutto senza mai trascorrere più di un'ora consecutiva in auto. L'auto è indispensabile — ma le strade di campagna siciliane fanno parte del viaggio.",
    distances: [
      { place: 'Noto', dist: '5 km' },
      { place: 'Vendicari', dist: '8 km' },
      { place: 'Marzamemi', dist: '20 km' },
      { place: 'Siracusa', dist: '30 km' },
      { place: 'Modica', dist: '38 km' },
      { place: 'Ragusa Ibla', dist: '45 km' },
    ],
    itinerary3_title: 'Se avete solo 3 giorni',
    itinerary3: [
      {
        label: 'Giorno 1 — Noto',
        text: "Arrivo in tarda mattinata. Posate i bagagli in villa e raggiungete Noto in auto (10 minuti). Passeggiate lungo il Corso Vittorio Emanuele, salite i gradini della Cattedrale per vedere la città dall'alto. Pranzo nel centro storico. Ritorno in villa per il pomeriggio in piscina. Cena all'aperto.",
      },
      {
        label: 'Giorno 2 — Vendicari · Marzamemi',
        text: "Alzatevi presto. Partenza alle 8 per Calamosche (12 minuti) prima della folla. Mattinata in spiaggia. Pranzo di pesce a Marzamemi (22 minuti da Vendicari). Passeggiata nel borgo nel pomeriggio, ritorno in villa per il tramonto.",
      },
      {
        label: 'Giorno 3 — Siracusa · Ortigia',
        text: "Giornata intera. Partenza alle 9 per Siracusa (35 minuti). Teatro greco al mattino, pranzo a Ortigia, pomeriggio nei vicoli dell'isola barocca, caffè davanti alla Fontana Aretusa. Ritorno in villa per l'aperitivo al tramonto.",
      },
    ],
    link_beaches: 'Guida alle spiagge →',
    link_itinerary: 'Itinerario 7 giorni →',
    link_villa: '← La villa',
    link_journal: 'Diario della villa →',
  },
  de: {
    breadcrumb: 'Noto & Umgebung',
    h1: 'Noto und die Umgebung',
    sub: 'Val di Noto · Provinz Syrakus · Sizilien',
    intro: "Fünf Kilometer trennen die Villa vom Zentrum Notos. Das ist kein Zufall — die Villa liegt im Herzen des Val di Noto, einer der bemerkenswertesten Konzentrationen barocker Architektur der Welt, seit 2002 UNESCO-Welterbe. Jeden Morgen wählen Sie Ihren Tag: Vendicari mit seinen Flamingos zwölf Minuten entfernt, die Gassen von Modica in fünfundvierzig, Ortygia und das Meer in fünfunddreißig. In einer Woche können Sie alles sehen, ohne je mehr als eine Stunde am Stück im Auto zu verbringen. Ein Auto ist unverzichtbar — aber Siziliens Landstraßen sind Teil der Reise.",
    distances: [
      { place: 'Noto', dist: '5 km' },
      { place: 'Vendicari', dist: '8 km' },
      { place: 'Marzamemi', dist: '20 km' },
      { place: 'Syrakus', dist: '30 km' },
      { place: 'Modica', dist: '38 km' },
      { place: 'Ragusa Ibla', dist: '45 km' },
    ],
    itinerary3_title: 'Wenn Sie nur 3 Tage haben',
    itinerary3: [
      {
        label: 'Tag 1 — Noto',
        text: "Ankunft am späten Vormittag. Gepäck in der Villa ablegen und mit dem Auto nach Noto fahren (10 Minuten). Spaziergang entlang des Corso Vittorio Emanuele, die Domtreppe hinauf für einen Blick über die Stadt. Mittagessen in der Altstadt. Zurück zur Villa für den Nachmittag am Pool. Abendessen im Freien.",
      },
      {
        label: 'Tag 2 — Vendicari · Marzamemi',
        text: "Früh aufstehen. Abfahrt um 8 Uhr nach Calamosche (12 Minuten) vor dem Andrang. Vormittag am Strand. Fischessen in Marzamemi (22 Minuten von Vendicari). Nachmittagsbummel durch das Dorf, zurück zur Villa zum Sonnenuntergang.",
      },
      {
        label: 'Tag 3 — Syrakus · Ortygia',
        text: "Ein ganzer Tag. Abfahrt um 9 Uhr nach Syrakus (35 Minuten). Griechisches Theater am Morgen, Mittagessen auf Ortygia, Nachmittag in den Gassen der Barockinseln, Kaffee an der Fontana Aretusa. Zurück zur Villa für einen Sundowner.",
      },
    ],
    link_beaches: 'Strandübersicht →',
    link_itinerary: '7-Tage-Reiseroute →',
    link_villa: '← Die Villa',
    link_journal: 'Villa-Journal →',
  },
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
      <div className="bg-navy text-white p-8 mb-14 grid grid-cols-2 md:grid-cols-3 gap-6">
        {c.distances.map(d => (
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
              {place.tip && (
                <p className="font-sans text-xs text-muted/80 mt-3 pl-3 border-l border-muted/30 leading-relaxed italic">{place.tip}</p>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* 3-day mini-itinerary */}
      <div className="mb-16 bg-navy text-white p-8 md:p-10">
        <h2 className="font-serif text-2xl md:text-3xl text-gold mb-8">{c.itinerary3_title}</h2>
        <div className="space-y-7">
          {c.itinerary3.map((day, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-6 border-b border-white/10 pb-7 last:border-none last:pb-0">
              <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-gold/80 md:pt-1">{day.label}</p>
              <p className="font-sans text-sm leading-relaxed text-white/80">{day.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cross-links to related pages */}
      <div className="mb-10 flex flex-wrap gap-4">
        <Link href={`/${locale}/plages`}
          className="font-sans text-xs tracking-widest uppercase px-6 py-3 bg-gold text-white hover:bg-gold/80 transition-all duration-300">
          {c.link_beaches}
        </Link>
        <Link href={`/${locale}/itineraire`}
          className="font-sans text-xs tracking-widest uppercase px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-white transition-all duration-300">
          {c.link_itinerary}
        </Link>
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
