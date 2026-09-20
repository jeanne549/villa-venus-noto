import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout from '@/components/PageLayout'
import type { Lang } from '@/lib/i18n'
import JsonLd from '@/components/JsonLd'
import { getBreadcrumbSchema, getBlogPostingSchema } from '@/lib/structured-data'

const BASE = 'https://www.villavenusnoto.com'
const LOCALES: Lang[] = ['fr', 'en', 'it', 'de']

// Slugs publiés — "où dîner" retiré (brouillon, contenu incomplet)
const SLUGS_BY_LOCALE: Record<Lang, string[]> = {
  fr: ['infiorata-noto-mai', 'plages-sud-est-sicile', 'sicile-septembre'],
  en: ['infiorata-noto-may', 'beaches-southeast-sicily', 'sicily-in-september'],
  it: ['infiorata-noto-maggio', 'spiagge-sud-est-sicilia', 'sicilia-settembre'],
  de: ['infiorata-noto-mai', 'straende-suedost-sizilien', 'sizilien-september'],
}

export function generateStaticParams() {
  return LOCALES.flatMap(locale =>
    SLUGS_BY_LOCALE[locale].map(slug => ({ locale, slug }))
  )
}

type ArticleContent = {
  title: string
  date: string
  publishedAt: string
  tag: string
  readTime: string
  intro: string
  body: { heading: string; text: string }[]
  related_title: string
  related_link: string
  related_slug: string
}

const ARTICLES: Record<Lang, Record<string, ArticleContent>> = {
  de: {
    'infiorata-noto-mai': {
      title: "Die Infiorata von Noto: das Maispektakel, das kaum ein Reisender sieht",
      date: 'Mai · Jedes dritte Wochenende',
      publishedAt: '2025-04-01',
      tag: 'Veranstaltung',
      readTime: '4 Min.',
      intro: "Seit 1980 bedecken die Bewohner von Noto an jedem dritten Maiwochenende die Via Nicolaci und die Gässchen des Barockzentrums mit riesigen Blumenteppichen. Hunderttausende von Blütenblättern, Nacht für Nacht von Hand ausgelegt, um Szenen des sizilianischen Lebens, religiöse Symbole und Porträts darzustellen. Die Infiorata von Noto ist als immaterielles UNESCO-Kulturerbe eingetragen. Und sie findet 5 Kilometer von der Villa entfernt statt.",
      body: [
        { heading: 'Wann genau?', text: "Die Infiorata findet immer am dritten Maiwochenende statt. Die infioratores (die Handwerker, die die Blumen auslegen) arbeiten in der Nacht von Freitag auf Samstag, manchmal bis Sonntagmorgen. Die offizielle Eröffnung findet Samstagmorgen statt. Der Sonntag ist der belebteste Tag. Wenn Sie wählen können, kommen Sie Freitagabend, um die nächtliche Arbeit zu beobachten — das ist oft der bewegendste Moment." },
        { heading: 'Was man sieht', text: "Die Via Nicolaci, die spektakulärste Barockstraße Notos, wird mit einem durchgehenden Teppich von etwa 100 Metern bedeckt. Aber das gesamte historische Zentrum verwandelt sich: Dutzende von Kompositionen, einige von nur wenigen Quadratmetern, andere ganze Plätze füllend. Die Künstler wetteifern in der Technik: frische Blumen, getrocknete Blütenblätter, Körner, Blätter, Rinden, Farbpulver." },
        { heading: 'Anfahrt von der Villa', text: "Die Villa liegt 5 Kilometer von Noto entfernt. Mit dem Auto dauert die Fahrt 10 Minuten. Während des Infiorata-Wochenendes ist das Zentrum von Noto teilweise für den Verkehr gesperrt. Wir empfehlen, auf den Außenparkplätzen zu parken (Piazzale Marconi oder am Ende der Via Roma) und zu Fuß ins historische Zentrum zu gehen. Abends ist die beleuchtete Via Nicolaci mit den Kompositionen besonders schön." },
        { heading: 'Buchung während der Infiorata', text: "Wenn Sie während der Infiorata in der Villa Vénus übernachten möchten, buchen Sie mehrere Monate im Voraus: Dies ist unsere am meisten nachgefragte Woche des Jahres. Der Mindestaufenthalt von 6 Nächten gilt. Kontaktieren Sie uns direkt, um die Verfügbarkeit zu prüfen." },
      ],
      related_title: 'Noto & Umgebung',
      related_link: 'Noto entdecken →',
      related_slug: 'noto',
    },
    'straende-suedost-sizilien': {
      title: "Die schönsten Strände Südostsiziliens von Villa Vénus Noto",
      date: 'Juli · August · September',
      publishedAt: '2025-06-01',
      tag: 'Strände',
      readTime: '6 Min.',
      intro: "Die Küste des Val di Noto ist eine der am besten erhaltenen des Mittelmeers. Keine massiven Strandanlagen, keine Reihen von Tretbooten, keine verstärkte Musik. Naturschutzgebiete, Goldsandbuchten, türkisfarbenes Wasser. Die Villa ist ideal gelegen, um die schönsten Strände in weniger als 30 Minuten zu erreichen.",
      body: [
        { heading: 'Vendicari (8 km · 12 Min.)', text: "Das Naturschutzgebiet Vendicari ist die absolute Referenz. Mehrere aufeinanderfolgende Buchten — Torre Vendicari, Eloro, Pillirina — durch Küstenpfade durch die Macchia getrennt. Freier Zugang, kostenpflichtiger Parkplatz am Eingang. Vermeiden Sie den August, wenn Sie keine großen Menschenmengen mögen." },
        { heading: 'San Lorenzo (12 km · 15 Min.)', text: "Ein langer Sandstrand zwischen zwei Kalksteinmassiven. Weniger frequentiert als Vendicari, weiter zum Meer hin offen. Einige Fischerboote vor Anker. Ideal für ruhige Morgenstunden." },
        { heading: 'Lido di Noto (15 km · 20 Min.)', text: "Notos eigener Strand: feiner Sand, klares Wasser, einige Strandbetriebe mit Liegestühlen und Sonnenschirmen. Der praktische Kompromiss für Tage, an denen man sich ohne langes Suchen niederlassen möchte." },
        { heading: 'Calamosche (Vendicari, 12 km)', text: "Die geschützteste Bucht im Vendicari-Reservat. Nur zu Fuß vom Nordeingang-Parkplatz erreichbar (ca. 20 Minuten). Einer der schönsten Strände Siziliens: ein perfekter Sandbogen, flaches Wasser, Dünen im Hintergrund. Keine Liegestühle, keine Strandbar — bringen Sie Wasser und ein Picknick mit." },
        { heading: 'Marzamemi (20 km · 22 Min.)', text: "Technisch gesehen eher ein Fischerdorf als ein Strand. Aber die Felsen und Buchten rund um den Hafen sind einen Umweg wert. Und vor allem ist es der beste Ort der Region zum Mittagessen: Die Hauptpiazza ist von Fischrestaurants umgeben. Die Tonnara Campisi, seit 1905 eine lokale Institution, ist sehenswert." },
      ],
      related_title: 'Services & Concierge',
      related_link: 'Bootsausflug →',
      related_slug: 'services',
    },
    'sizilien-september': {
      title: "Warum September der beste Monat für Sizilien ist",
      date: 'September · Anfang Oktober',
      publishedAt: '2025-08-01',
      tag: 'Saison',
      readTime: '5 Min.',
      intro: "Juni, Juli, August: Sizilien ist wunderschön, aber auch überfüllt, trocken, und die Preise sind auf ihrem Höchststand. Der September ändert alles. Das Meer erreicht 26–27°C — tatsächlich sein thermischer Jahreshöchststand. Die Touristen sind abgereist. Die Weinlese beginnt im Val di Noto. Und die Preise sinken. Es ist ein besonderer Monat.",
      body: [
        { heading: 'Das Meer im September', text: "Kontraintuitiv, aber wahr: Das Mittelmeer ist im September wärmer als im Juli. Es speichert die Sommerwärme und gibt sie allmählich wieder ab. Die Wassertemperatur bei Noto übersteigt im September oft 26°C, manchmal 27°C. Die Tage bleiben lang (Sonnenuntergang gegen 19:30 Uhr) und die Sonne ist weniger intensiv als im August." },
        { heading: 'Die sizilianische Landschaft', text: "Nach der sommerlichen Trockenheit erwecken die ersten Septemberregen die Farben. Die Landschaft zwischen der Villa und Noto — Weinreben, Mandelbäume, Feigenkakteen — nimmt Gold- und Ockertöne an. Es ist die Zeit der Weinlese für den Nero d'Avola und andere Rebsorten des Val di Noto. Einige Weingüter öffnen ihre Türen für partizipative Weinlese-Veranstaltungen." },
        { heading: 'Noto ohne Menschenmassen', text: "Im August ist die Via Nicolaci am späten Nachmittag praktisch unpassierbar. Im September spazieren Sie frei durch das Barockzentrum. Die Restaurants haben Platz. Die Piazza del Municipio findet ihre Ruhe zurück. Die Stadt, so wie sie den Rest des Jahres ist." },
        { heading: 'Preise und Verfügbarkeit', text: "September gehört zu unserer Nebensaison — die Preise beginnen bei 580 €/Nacht. Wenn Sie das beste Preis-Leistungs-Verhältnis für einen Sizilien-Aufenthalt suchen, ist dies wahrscheinlich der optimale Zeitraum." },
      ],
      related_title: 'Preise & Verfügbarkeit',
      related_link: 'Preise ansehen →',
      related_slug: 'tarifs',
    },
  },
  fr: {
    'infiorata-noto-mai': {
      title: "L'Infiorata de Noto : le spectacle de mai que peu de voyageurs voient",
      date: 'Mai · Chaque troisième week-end',
      publishedAt: '2025-04-01',
      tag: 'Événement',
      readTime: '4 min',
      intro: "Chaque troisième week-end de mai depuis 1980, les habitants de Noto couvrent la Via Nicolaci et les ruelles du centre baroque d'immenses tapis de fleurs. Des centaines de milliers de pétales disposés à la main, nuit après nuit, pour représenter des scènes de la vie sicilienne, des symboles religieux, des portraits. L'Infiorata de Noto est inscrite au patrimoine immatériel de l'UNESCO. Et elle se passe à 5 kilomètres de la villa.",
      body: [
        { heading: 'Quand exactement ?', text: "L'Infiorata a toujours lieu le troisième week-end de mai. Les infioratores (les artisans qui posent les fleurs) travaillent pendant la nuit du vendredi au samedi, parfois jusqu'au dimanche matin. L'inauguration officielle a lieu le samedi matin. Le dimanche est le jour le plus fréquenté. Si vous pouvez choisir, arrivez le vendredi soir pour voir le travail de nuit se mettre en place : c'est souvent le moment le plus émouvant." },
        { heading: "Ce qu'on voit", text: "La Via Nicolaci, la rue la plus spectaculaire du baroque nébli, se couvre d'un tapis continu de 100 mètres environ. Mais c'est l'ensemble du centre historique qui se transforme : des dizaines de compositions, certaines de quelques mètres carrés, d'autres occupant des places entières. Les artistes rivalisent de techniques : fleurs fraîches, pétales séchés, grains, feuilles, écorces, poudres colorées." },
        { heading: 'Comment y aller depuis la villa', text: "La villa est à 5 kilomètres de Noto. En voiture, le trajet dure 10 minutes. Pendant le week-end de l'Infiorata, le centre de Noto est partiellement fermé à la circulation. Nous vous conseillons de vous garer sur les parkings en périphérie (Piazzale Marconi ou en bas de la Via Roma) et de monter à pied jusqu'au centre historique. Le soir, l'éclairage de la Via Nicolaci avec les compositions est particulièrement beau." },
        { heading: "Réserver pendant l'Infiorata", text: "Si vous souhaitez séjourner à Villa Vénus pendant l'Infiorata, réservez plusieurs mois à l'avance : c'est notre semaine la plus demandée de l'année. La durée minimale de 6 nuits s'applique. Contactez-nous directement pour vérifier les disponibilités." },
      ],
      related_title: 'Noto et les environs',
      related_link: 'Découvrir Noto →',
      related_slug: 'noto',
    },
    'plages-sud-est-sicile': {
      title: "Les plus belles plages du sud-est sicilien depuis Villa Vénus Noto",
      date: 'Juillet · Août · Septembre',
      publishedAt: '2025-06-01',
      tag: 'Plages',
      readTime: '6 min',
      intro: "Le littoral du Val di Noto est l'un des plus préservés de la Méditerranée. Pas de constructions balnéaires massives, pas de pédalos en rangée, pas de musique amplifiée. Des réserves naturelles, des calanques de sable blond, des eaux turquoise dans les tons Pantone 3125C. La villa est idéalement placée pour atteindre les meilleures plages en moins de 30 minutes.",
      body: [
        { heading: 'Vendicari (8 km · 12 min)', text: "La réserve naturelle de Vendicari est la référence absolue. Plusieurs criques successives — Torre Vendicari, Eloro, Pillirina — séparées par des sentiers côtiers à travers la garrigue. Accès libre, parking payant à l'entrée. Évitez le mois d'août si vous êtes allergiques aux foules." },
        { heading: 'San Lorenzo (12 km · 15 min)', text: "Une longue plage de sable entre deux massifs de roche calcaire. Moins fréquentée que Vendicari, plus ouverte sur la mer. Quelques barques de pêcheurs à l'ancre. Idéale pour les matins calmes." },
        { heading: 'Lido di Noto (15 km · 20 min)', text: "La plage de Noto même : sable fin, eaux claires, quelques établissements balnéaires avec transats et parasols. Le compromis pratique pour les journées où l'on veut se poser sans chercher." },
        { heading: 'Calamosche (Vendicari, 12 km)', text: "La crique la plus protégée de la réserve de Vendicari. Accessible uniquement à pied depuis le parking de l'entrée nord (environ 20 minutes de marche). Une des plus belles plages de Sicile : arc de sable parfait, eaux peu profondes, dunes derrière. Pas de transats, pas de buvette — apportez eau et pique-nique." },
        { heading: 'Marzamemi (20 km · 22 min)', text: "Techniquement un village de pêcheurs plutôt qu'une plage. Mais les rochers et les criques autour du port valent le détour. Et surtout, c'est le meilleur endroit de la région pour déjeuner : la piazza principale est entourée de restaurants de poisson. La pêcherie Campisi, référence locale depuis 1905, vaut le détour." },
      ],
      related_title: 'Services et conciergerie',
      related_link: 'Excursion en bateau →',
      related_slug: 'services',
    },
    'sicile-septembre': {
      title: "Pourquoi septembre est le meilleur mois pour la Sicile",
      date: 'Septembre · Début octobre',
      publishedAt: '2025-08-01',
      tag: 'Saison',
      readTime: '5 min',
      intro: "Juin, juillet, août : la Sicile est magnifique, mais elle est aussi bondée, sèche, et les prix sont à leur maximum. Septembre change tout. La mer atteint 26-27°C — son pic thermique de l'année, en fait. Les touristes sont rentrés. Les vendanges commencent dans le Val di Noto. Et les prix baissent. C'est un mois à part.",
      body: [
        { heading: 'La mer en septembre', text: "Contre-intuitif mais vrai : la Méditerranée est plus chaude en septembre qu'en juillet. Elle accumule la chaleur de l'été et ne restitue que progressivement. La température de l'eau à Noto dépasse souvent 26°C en septembre, parfois 27°C. Les journées restent longues (coucher à 19h30) et le soleil est moins violent qu'en août." },
        { heading: 'La campagne sicilienne', text: "Après la sécheresse estivale, les premières pluies de septembre réveillent les couleurs. La campagne entre la villa et Noto — vignes, amandiers, figuiers de Barbarie — prend des teintes d'or et d'ocre. C'est la période des vendanges pour le Nero d'Avola et les autres cépages du Val di Noto. Certains domaines viticoles ouvrent leurs portes pour les vendanges participatives." },
        { heading: 'Noto sans la foule', text: "En août, Via Nicolaci est pratiquement impraticable en fin de journée. En septembre, vous vous promenez librement dans le centre baroque. Les restaurants ont de la place. La piazza del Municipio retrouve sa sérénité. C'est la ville telle qu'elle est le reste de l'année." },
        { heading: 'Tarifs et disponibilité', text: "Septembre appartient à notre basse saison — les tarifs partent de 580 €/nuit. Si vous cherchez le meilleur rapport qualité-expérience pour un séjour en Sicile, c'est probablement la période optimale." },
      ],
      related_title: 'Tarifs et disponibilités',
      related_link: 'Voir les tarifs →',
      related_slug: 'tarifs',
    },
  },
  en: {
    'infiorata-noto-may': {
      title: "Noto's Infiorata: the May spectacle few travellers see",
      date: 'May · Every third weekend',
      publishedAt: '2025-04-01',
      tag: 'Event',
      readTime: '4 min',
      intro: "Every third weekend of May since 1980, the people of Noto cover Via Nicolaci and the lanes of the Baroque centre with vast carpets of flowers. Hundreds of thousands of petals arranged by hand, night after night, depicting scenes of Sicilian life, religious symbols, portraits. Noto's Infiorata is inscribed on UNESCO's intangible cultural heritage list. And it takes place 5 kilometres from the villa.",
      body: [
        { heading: 'When exactly?', text: "The Infiorata always falls on the third weekend of May. The infioratores (the craftspeople who lay the flowers) work through the night from Friday to Saturday, sometimes until Sunday morning. The official inauguration takes place Saturday morning. Sunday is the busiest day. If you can choose, arrive Friday evening to watch the night work being set up — it's often the most moving moment." },
        { heading: 'What you see', text: "Via Nicolaci, Noto's most spectacular Baroque street, is covered with a continuous carpet of roughly 100 metres. But the entire historic centre is transformed: dozens of compositions, some covering a few square metres, others filling entire squares. Artists compete in technique: fresh flowers, dried petals, grains, leaves, bark, coloured powders." },
        { heading: 'Getting there from the villa', text: "The villa is 5 kilometres from Noto. By car, the journey takes 10 minutes. During the Infiorata weekend, the centre of Noto is partly closed to traffic. We recommend parking in the peripheral car parks (Piazzale Marconi or at the bottom of Via Roma) and walking up into the historic centre. In the evening, the illuminated Via Nicolaci with the compositions is particularly beautiful." },
        { heading: 'Booking during the Infiorata', text: "If you wish to stay at Villa Vénus during the Infiorata, book several months in advance: this is our most sought-after week of the year. The minimum 6-night stay applies. Contact us directly to check availability." },
      ],
      related_title: 'Noto & surroundings',
      related_link: 'Discover Noto →',
      related_slug: 'noto',
    },
    'beaches-southeast-sicily': {
      title: "The best beaches of southeast Sicily from Villa Vénus Noto",
      date: 'July · August · September',
      publishedAt: '2025-06-01',
      tag: 'Beaches',
      readTime: '6 min',
      intro: "The Val di Noto coastline is one of the most preserved in the Mediterranean. No mass beach developments, no rows of pedal boats, no amplified music. Nature reserves, golden sand coves, turquoise waters. The villa is ideally positioned to reach the best beaches in under 30 minutes.",
      body: [
        { heading: 'Vendicari (8 km · 12 min)', text: "The Vendicari nature reserve is the absolute benchmark. Several successive coves — Torre Vendicari, Eloro, Pillirina — separated by coastal paths through the garrigue. Free access, paid parking at the entrance. Avoid August if you're allergic to crowds." },
        { heading: 'San Lorenzo (12 km · 15 min)', text: "A long sandy beach between two limestone rock massifs. Less visited than Vendicari, more open to the sea. A few fishing boats at anchor. Ideal for quiet mornings." },
        { heading: 'Lido di Noto (15 km · 20 min)', text: "Noto's own beach: fine sand, clear waters, a few beach establishments with sunbeds and parasols. The practical compromise for days when you want to settle without searching." },
        { heading: 'Calamosche (Vendicari, 12 km)', text: "The most sheltered cove in the Vendicari reserve. Accessible only on foot from the north entrance car park (about 20 minutes' walk). One of Sicily's most beautiful beaches: a perfect arc of sand, shallow waters, dunes behind. No sunbeds, no snack bar — bring water and a picnic." },
        { heading: 'Marzamemi (20 km · 22 min)', text: "Technically a fishing village rather than a beach. But the rocks and coves around the port are worth a detour. And above all, it's the best place in the area for lunch: the main piazza is surrounded by fish restaurants. The Campisi cannery, a local institution since 1905, is worth a visit." },
      ],
      related_title: 'Services & concierge',
      related_link: 'Boat excursion →',
      related_slug: 'services',
    },
    'sicily-in-september': {
      title: "Why September is the best month for Sicily",
      date: 'September · Early October',
      publishedAt: '2025-08-01',
      tag: 'Season',
      readTime: '5 min',
      intro: "June, July, August: Sicily is magnificent, but it's also packed, dry, and prices are at their peak. September changes everything. The sea reaches 26-27°C — actually its thermal peak of the year. Tourists have gone home. The harvest begins in the Val di Noto. And prices drop. It's a month apart.",
      body: [
        { heading: 'The sea in September', text: "Counter-intuitive but true: the Mediterranean is warmer in September than in July. It accumulates summer heat and releases it gradually. The water temperature at Noto often exceeds 26°C in September, sometimes 27°C. The days remain long (sunset at 7:30pm) and the sun is less harsh than in August." },
        { heading: 'The Sicilian countryside', text: "After the summer drought, September's first rains wake the colours. The countryside between the villa and Noto — vines, almond trees, prickly pears — takes on shades of gold and ochre. This is harvest time for Nero d'Avola and other Val di Noto grape varieties. Some wine estates open their doors for participatory harvest activities." },
        { heading: 'Noto without the crowd', text: "In August, Via Nicolaci is practically impassable by late afternoon. In September, you stroll freely through the Baroque centre. Restaurants have room. The Piazza del Municipio regains its serenity. The city as it is for the rest of the year." },
        { heading: 'Rates and availability', text: "September falls in our low season — rates start from €580/night. If you're looking for the best value experience for a stay in Sicily, this is probably the optimal time." },
      ],
      related_title: 'Rates & availability',
      related_link: 'See rates →',
      related_slug: 'tarifs',
    },
  },
  it: {
    'infiorata-noto-maggio': {
      title: "L'Infiorata di Noto: lo spettacolo di maggio che pochi viaggiatori vedono",
      date: 'Maggio · Ogni terzo weekend',
      publishedAt: '2025-04-01',
      tag: 'Evento',
      readTime: '4 min',
      intro: "Ogni terzo weekend di maggio dal 1980, gli abitanti di Noto ricoprono Via Nicolaci e i vicoli del centro barocco di immense tappeti di fiori. Centinaia di migliaia di petali disposti a mano, notte dopo notte, per raffigurare scene di vita siciliana, simboli religiosi, ritratti. L'Infiorata di Noto è iscritta al patrimonio immateriale dell'UNESCO. E si svolge a 5 chilometri dalla villa.",
      body: [
        { heading: 'Quando esattamente?', text: "L'Infiorata cade sempre il terzo weekend di maggio. Gli infioratores (gli artigiani che posano i fiori) lavorano nella notte tra venerdì e sabato, a volte fino a domenica mattina. L'inaugurazione ufficiale si tiene il sabato mattina. La domenica è il giorno più frequentato. Se potete scegliere, arrivate venerdì sera per vedere il lavoro notturno che prende forma: è spesso il momento più emozionante." },
        { heading: 'Cosa si vede', text: "Via Nicolaci, la via più spettacolare del barocco noto, si copre di un tappeto continuo di circa 100 metri. Ma è l'intero centro storico a trasformarsi: decine di composizioni, alcune di pochi metri quadrati, altre che occupano intere piazze. Gli artisti competono in tecnica: fiori freschi, petali secchi, granaglie, foglie, cortecce, polveri colorate." },
        { heading: 'Come arrivare dalla villa', text: "La villa si trova a 5 chilometri da Noto. In auto, il tragitto dura 10 minuti. Durante il weekend dell'Infiorata, il centro di Noto è parzialmente chiuso al traffico. Consigliamo di parcheggiare nei parcheggi periferici (Piazzale Marconi o in fondo a Via Roma) e salire a piedi fino al centro storico. La sera, l'illuminazione di Via Nicolaci con le composizioni è particolarmente bella." },
        { heading: "Prenotare durante l'Infiorata", text: "Se desiderate soggiornare a Villa Vénus durante l'Infiorata, prenotate con molti mesi di anticipo: è la nostra settimana più richiesta dell'anno. Si applica il soggiorno minimo di 6 notti. Contattateci direttamente per verificare la disponibilità." },
      ],
      related_title: 'Noto e dintorni',
      related_link: 'Scoprire Noto →',
      related_slug: 'noto',
    },
    'spiagge-sud-est-sicilia': {
      title: "Le più belle spiagge del sud-est siciliano da Villa Vénus Noto",
      date: 'Luglio · Agosto · Settembre',
      publishedAt: '2025-06-01',
      tag: 'Spiagge',
      readTime: '6 min',
      intro: "Il litorale del Val di Noto è uno dei più preservati del Mediterraneo. Niente grandi costruzioni balneari, niente file di pedalò, niente musica amplificata. Riserve naturali, calette di sabbia dorata, acque turchesi. La villa è idealmente posizionata per raggiungere le migliori spiagge in meno di 30 minuti.",
      body: [
        { heading: 'Vendicari (8 km · 12 min)', text: "La riserva naturale di Vendicari è il riferimento assoluto. Diverse calette successive — Torre Vendicari, Eloro, Pillirina — separate da sentieri costieri attraverso la macchia. Accesso libero, parcheggio a pagamento all'ingresso. Evitate agosto se siete allergici alle folle." },
        { heading: 'San Lorenzo (12 km · 15 min)', text: "Una lunga spiaggia di sabbia tra due massicci di roccia calcarea. Meno frequentata di Vendicari, più aperta sul mare. Qualche barca da pesca all'ancora. Ideale per le mattine tranquille." },
        { heading: 'Lido di Noto (15 km · 20 min)', text: "La spiaggia di Noto vera e propria: sabbia fine, acque limpide, alcuni stabilimenti balneari con lettini e ombrelloni. Il compromesso pratico per le giornate in cui si vuole stare fermi senza cercare." },
        { heading: 'Calamosche (Vendicari, 12 km)', text: "La caletta più protetta della riserva di Vendicari. Accessibile solo a piedi dal parcheggio dell'ingresso nord (circa 20 minuti a piedi). Una delle più belle spiagge della Sicilia: un arco di sabbia perfetto, acque poco profonde, dune alle spalle. Niente lettini, niente bar — portate acqua e pic-nic." },
        { heading: 'Marzamemi (20 km · 22 min)', text: "Tecnicamente un villaggio di pescatori più che una spiaggia. Ma le rocce e le calette intorno al porto valgono la deviazione. E soprattutto è il posto migliore della zona per pranzo: la piazza principale è circondata da ristoranti di pesce. La tonnara Campisi, riferimento locale dal 1905, merita una visita." },
      ],
      related_title: 'Servizi e concierge',
      related_link: 'Escursione in barca →',
      related_slug: 'services',
    },
    'sicilia-settembre': {
      title: "Perché settembre è il mese migliore per la Sicilia",
      date: 'Settembre · Inizio ottobre',
      publishedAt: '2025-08-01',
      tag: 'Stagione',
      readTime: '5 min',
      intro: "Giugno, luglio, agosto: la Sicilia è magnifica, ma è anche piena di turisti, secca, e i prezzi sono al massimo. Settembre cambia tutto. Il mare raggiunge i 26-27°C — in realtà il suo picco termico dell'anno. I turisti sono tornati a casa. La vendemmia inizia nel Val di Noto. E i prezzi scendono. È un mese a parte.",
      body: [
        { heading: 'Il mare a settembre', text: "Controintuitivo ma vero: il Mediterraneo è più caldo a settembre che a luglio. Accumula il calore estivo e lo rilascia gradualmente. La temperatura dell'acqua a Noto supera spesso i 26°C a settembre, a volte i 27°C. Le giornate rimangono lunghe (tramonto alle 19:30) e il sole è meno violento che ad agosto." },
        { heading: 'La campagna siciliana', text: "Dopo la siccità estiva, le prime piogge di settembre risvegliano i colori. La campagna tra la villa e Noto — vigneti, mandorli, fichidindia — prende sfumature di oro e ocra. È il periodo della vendemmia per il Nero d'Avola e gli altri vitigni del Val di Noto. Alcune cantine aprono le porte per la vendemmia partecipativa." },
        { heading: 'Noto senza folla', text: "Ad agosto, Via Nicolaci è praticamente impraticabile nel tardo pomeriggio. A settembre, si passeggia liberamente nel centro barocco. I ristoranti hanno posto. Piazza del Municipio ritrova la sua serenità. La città come è per il resto dell'anno." },
        { heading: 'Tariffe e disponibilità', text: "Settembre rientra nella nostra bassa stagione — le tariffe partono da 580 €/notte. Se cercate il miglior rapporto qualità-esperienza per un soggiorno in Sicilia, questo è probabilmente il periodo ottimale." },
      ],
      related_title: 'Tariffe e disponibilità',
      related_link: 'Vedi le tariffe →',
      related_slug: 'tarifs',
    },
  },
}

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const locale = params.locale as Lang
  const article = ARTICLES[locale]?.[params.slug]
  if (!article) return {}
  return {
    title: `${article.title} — Villa Vénus Noto`,
    description: article.intro.slice(0, 160),
    alternates: {
      canonical: `${BASE}/${locale}/journal/${params.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.intro.slice(0, 160),
      url: `${BASE}/${locale}/journal/${params.slug}`,
      siteName: 'Villa Vénus Noto',
    },
  }
}

const BACK: Record<Lang, string> = { fr: '← Journal', en: '← Journal', it: '← Diario', de: '← Journal' }

export default function ArticlePage({ params }: { params: { locale: string; slug: string } }) {
  const locale = (LOCALES.includes(params.locale as Lang) ? params.locale : 'fr') as Lang
  const article = ARTICLES[locale]?.[params.slug]

  if (!article) {
    return (
      <PageLayout lang={locale} page="journal" breadcrumb="Journal">
        <p className="font-sans text-muted">Article non trouvé.</p>
      </PageLayout>
    )
  }

  const homeLabel = locale === 'fr' ? 'Accueil' : 'Home'
  const journalLabel = locale === 'it' ? 'Diario' : 'Journal'
  const langCode = locale === 'fr' ? 'fr-FR' : locale === 'en' ? 'en-GB' : locale === 'de' ? 'de-DE' : 'it-IT'
  return (
    <>
      <JsonLd data={[
        getBreadcrumbSchema([
          { name: homeLabel, item: `${BASE}/${locale}` },
          { name: journalLabel, item: `${BASE}/${locale}/journal` },
          { name: article.tag, item: `${BASE}/${locale}/journal/${params.slug}` },
        ]),
        getBlogPostingSchema({
          headline: article.title,
          description: article.intro.slice(0, 200),
          datePublished: article.publishedAt,
          url: `${BASE}/${locale}/journal/${params.slug}`,
          inLanguage: langCode,
        }),
      ]} />
      <PageLayout lang={locale} page="journal" breadcrumb={`Journal · ${article.tag}`}>

      <div className="max-w-2xl">

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-sans text-[10px] tracking-[0.15em] uppercase bg-gold/10 text-gold-text px-2 py-1">{article.tag}</span>
            <span className="font-sans text-[10px] text-muted tracking-wide">{article.date}</span>
            <span className="font-sans text-[10px] text-muted">{article.readTime}</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal leading-tight mb-6">{article.title}</h1>
          <div className="gold-divider" />
          <p className="font-sans text-base text-muted leading-relaxed italic">{article.intro}</p>
        </div>

        <div className="space-y-8 mb-14">
          {article.body.map(section => (
            <div key={section.heading}>
              <h2 className="font-serif text-xl text-charcoal mb-3">{section.heading}</h2>
              <p className="font-sans text-sm text-muted leading-relaxed">{section.text}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-gold/20 pt-8 flex flex-col sm:flex-row gap-4">
          <Link href={`/${locale}/journal`}
            className="font-sans text-xs tracking-widest uppercase px-6 py-3 border border-navy text-navy hover:bg-navy hover:text-white transition-all duration-300 inline-block">
            {BACK[locale]}
          </Link>
          <Link href={`/${locale}/${article.related_slug}`}
            className="font-sans text-xs tracking-widest uppercase px-6 py-3 border border-gold text-gold-text hover:bg-gold hover:text-white transition-all duration-300 inline-block">
            {article.related_link}
          </Link>
        </div>

      </div>

    </PageLayout>
    </>
  )
}
