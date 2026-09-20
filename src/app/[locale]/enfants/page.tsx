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
    title: 'Sicile en famille — Villa Vénus Noto avec enfants',
    description: "Activités et conseils pour un séjour en famille à Villa Vénus Noto : plages accessibles, sorties en bateau, flamants roses à Vendicari, Marzamemi le soir. Infos pratiques.",
  },
  en: {
    title: 'Sicily with Kids — Villa Vénus Noto Family Guide',
    description: "Activities and tips for a family stay at Villa Vénus Noto: accessible beaches, boat trips, flamingos at Vendicari, Marzamemi evenings. Practical information.",
  },
  it: {
    title: 'Sicilia in famiglia — Villa Vénus Noto con bambini',
    description: "Attività e consigli per un soggiorno in famiglia a Villa Vénus Noto: spiagge accessibili, gite in barca, fenicotteri a Vendicari, Marzamemi la sera. Informazioni pratiche.",
  },
  de: {
    title: 'Sizilien mit Kindern — Villa Vénus Noto Familienguide',
    description: "Aktivitäten und Tipps für einen Familienaufenthalt in Villa Vénus Noto: zugängliche Strände, Bootsausflüge, Flamingos in Vendicari, Marzamemi abends. Praktische Informationen.",
  },
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Lang
  if (!META[locale]) return {}
  const { title, description } = META[locale]
  return {
    title, description,
    robots: { index: true, follow: true },
    alternates: buildAlternates('enfants', locale),
    openGraph: { title, description, url: `${BASE}/${locale}/enfants`, siteName: 'Villa Vénus Noto', images: [{ url: '/og-image.jpg', width: 1200, height: 630 }] },
  }
}

type Item = { title: string; text: string; tip?: string }
type Section = { heading: string; items: Item[] }
type Content = {
  breadcrumb: string; h1: string; sub: string; intro: string
  sections: Section[]
  practical_title: string
  practical: Array<{ label: string; text: string }>
  link_plages: string; link_services: string
}

const CONTENT: Record<Lang, Content> = {
  fr: {
    breadcrumb: 'Enfants',
    h1: 'La villa en famille',
    sub: 'Activités et conseils pour un séjour avec enfants',
    intro: "La région de Noto est idéale pour les familles. Des plages aux eaux peu profondes, des activités nautiques adaptées, des villages où les enfants courent en toute liberté le soir. Voici ce que nous recommandons depuis la villa.",
    sections: [
      {
        heading: 'Les meilleures plages avec enfants',
        items: [
          {
            title: 'Lido di Noto (15 km)',
            text: "La plage la plus adaptée aux familles avec de jeunes enfants : eau peu profonde sur une longue distance, établissements balnéaires avec transats et parasols, douches, restauration. Surveillance en haute saison. Le tout à 20 minutes de la villa.",
            tip: "Idéale pour les enfants qui ne savent pas encore nager. L'entrée dans l'eau est très progressive.",
          },
          {
            title: 'Vendicari nord — Plage Eloro (8 km)',
            text: "La partie nord de la réserve de Vendicari est plus accessible que Calamosche (pas de marche). Eau claire, fond sableux, pas de courants. La réserve naturelle elle-même est un terrain de découverte : sentiers côtiers, oiseaux, tortues marines parfois observées.",
            tip: "Apportez masque et tuba — l'eau est suffisamment transparente pour observer les poissons depuis la surface.",
          },
          {
            title: 'Marzamemi — rochers et snorkeling (20 km)',
            text: "Les criques et rochers autour du port de Marzamemi sont parfaits pour le snorkeling avec les enfants. L'eau est peu profonde et cristalline. Des poissons colorés sont visibles dès 30 cm de fond. En soirée, le village est l'endroit idéal pour se promener avec les enfants.",
          },
        ],
      },
      {
        heading: 'Activités nautiques',
        items: [
          {
            title: "Sortie en bateau depuis Marzamemi",
            text: "Des excursions en bateau au départ de Marzamemi longent la côte de Vendicari jusqu'au cap Passero et à Portopalo. Durée : 2-3 heures. Snorkeling en route, équipement fourni. Enfants acceptés dès 4-5 ans. Prévoir une réservation en haute saison.",
            tip: "Le Capitano Peppe propose des sorties sur barques traditionnelles pour petits groupes. Renseignez-vous au port de Marzamemi.",
          },
          {
            title: "Snorkeling à Vendicari",
            text: "L'eau de la réserve de Vendicari est suffisamment claire pour le snorkeling de surface. Poissons, oursins, étoiles de mer. Pas besoin de bouteille — masque et tuba suffisent. Un des rares endroits où le snorkeling en famille est accessible sans bateau.",
          },
        ],
      },
      {
        heading: 'Sorties et soirées',
        items: [
          {
            title: "La piazza de Marzamemi le soir",
            text: "Marzamemi est probablement l'endroit le plus convivial pour les familles en soirée. La petite piazza principale est entourée de restaurants, les enfants jouent librement entre les tables pendant que les adultes dînent. Gelato incontournable.",
          },
          {
            title: "Noto : granita et centre baroque",
            text: "Noto est à 5 minutes de la villa. La promenade du soir sur le Corso Vittorio Emanuele est accessible à tous les âges — larges trottoirs, pas de voiture, éclairage chaleureux. Arrêt obligatoire au Caffè Sicilia pour la granita ou les pâtisseries.",
          },
          {
            title: "Flamants roses à Vendicari (automne-printemps)",
            text: "De septembre à mai environ, les étangs intérieurs de la réserve de Vendicari accueillent des flamants roses, hérons cendrés et autres migrateurs. Un spectacle naturel unique accessible à pied depuis les entrées de la réserve. Jumelles recommandées.",
          },
        ],
      },
    ],
    practical_title: 'Infos pratiques',
    practical: [
      { label: "Lit bébé / chaise haute", text: "Sur demande préalable, nous pouvons mettre à disposition un lit bébé ou une chaise haute. Précisez-le dans votre demande de réservation." },
      { label: "Siège auto", text: "Les loueurs de voiture à Catane proposent des sièges enfant en supplément. Réservez-le au moment de la réservation du véhicule pour être sûr d'en avoir un disponible." },
      { label: "Piscine", text: "La villa dispose d'une piscine privée extérieure. Les enfants doivent être surveillés à tout moment. Précisez l'âge des enfants si vous souhaitez des informations spécifiques sur la sécurité." },
      { label: "Pharmacies", text: "Plusieurs pharmacies à Noto sont ouvertes tous les jours. Un hôpital se trouve à Syracuse (40 min). Médecin généraliste disponible à Noto." },
    ],
    link_plages: 'Guide des plages →',
    link_services: 'Services et conciergerie →',
  },
  en: {
    breadcrumb: 'Children',
    h1: 'The villa with a family',
    sub: 'Activities and tips for a stay with children',
    intro: "The Noto area is ideal for families. Shallow beaches, child-friendly water activities, villages where children can roam freely in the evening. Here is what we recommend from the villa.",
    sections: [
      {
        heading: 'Best beaches for children',
        items: [
          {
            title: 'Lido di Noto (15 km)',
            text: "The most family-friendly beach for young children: shallow water over a long stretch, beach clubs with sunbeds and parasols, showers, food. Lifeguard in high season. All 20 minutes from the villa.",
            tip: "Ideal for children who can't yet swim. The sea floor slopes very gradually.",
          },
          {
            title: 'Vendicari north — Eloro beach (8 km)',
            text: "The northern part of the Vendicari reserve is more accessible than Calamosche (no long walk required). Clear water, sandy bottom, no currents. The nature reserve itself is an adventure for children: coastal paths, birds, sea turtles occasionally spotted.",
            tip: "Bring mask and snorkel — the water is clear enough to watch fish from the surface.",
          },
          {
            title: 'Marzamemi — rocks and snorkelling (20 km)',
            text: "The coves and rocks around Marzamemi harbour are perfect for snorkelling with children. The water is shallow and crystal-clear. Colourful fish are visible from just 30 cm deep. In the evening, the village is the perfect place for a family stroll.",
          },
        ],
      },
      {
        heading: 'Water activities',
        items: [
          {
            title: "Boat trips from Marzamemi",
            text: "Boat excursions from Marzamemi follow the coast from Vendicari to Capo Passero and Portopalo. Duration: 2-3 hours. Snorkelling en route, equipment provided. Children accepted from 4-5 years old. Book ahead in high season.",
            tip: "Capitano Peppe runs trips on traditional small boats for small groups. Ask at Marzamemi harbour.",
          },
          {
            title: "Snorkelling at Vendicari",
            text: "The water in the Vendicari reserve is clear enough for surface snorkelling. Fish, sea urchins, starfish. No tank needed — mask and snorkel are sufficient. One of the few places where family snorkelling is accessible without a boat.",
          },
        ],
      },
      {
        heading: 'Outings and evenings',
        items: [
          {
            title: "Marzamemi's piazza in the evening",
            text: "Marzamemi is probably the most family-friendly spot for evening outings. The small main square is surrounded by restaurants; children play freely between the tables while adults dine. Gelato is compulsory.",
          },
          {
            title: "Noto: granita and baroque centre",
            text: "Noto is 5 minutes from the villa. The evening stroll along the Corso Vittorio Emanuele works for all ages — wide pavements, no cars, warm lighting. A stop at Caffè Sicilia for granita or pastries is non-negotiable.",
          },
          {
            title: "Flamingos at Vendicari (autumn–spring)",
            text: "From roughly September to May, the inland lagoons of the Vendicari reserve host flamingos, grey herons and other migratory birds. A unique natural spectacle accessible on foot from the reserve's entrances. Binoculars recommended.",
          },
        ],
      },
    ],
    practical_title: 'Practical information',
    practical: [
      { label: "Cot / high chair", text: "On advance request, we can provide a baby cot or high chair. Please mention it in your booking enquiry." },
      { label: "Car seat", text: "Catania car hire companies offer child seats for a supplement. Book one at the time of vehicle reservation to ensure availability." },
      { label: "Pool", text: "The villa has a private outdoor pool. Children must be supervised at all times. Please mention children's ages if you need specific safety information." },
      { label: "Pharmacies", text: "Several pharmacies in Noto are open daily. A hospital is in Syracuse (40 min). General practitioner available in Noto." },
    ],
    link_plages: 'Beach guide →',
    link_services: 'Services & concierge →',
  },
  it: {
    breadcrumb: 'Bambini',
    h1: 'La villa in famiglia',
    sub: 'Attività e consigli per un soggiorno con bambini',
    intro: "La zona di Noto è ideale per le famiglie. Spiagge con acque basse, attività nautiche adatte, borghi dove i bambini corrono liberi la sera. Ecco cosa consigliamo dalla villa.",
    sections: [
      {
        heading: 'Le spiagge migliori per i bambini',
        items: [
          {
            title: 'Lido di Noto (15 km)',
            text: "La spiaggia più adatta per le famiglie con bambini piccoli: acqua bassa per un lungo tratto, stabilimenti con lettini e ombrelloni, docce, ristorazione. Sorveglianza in alta stagione. A soli 20 minuti dalla villa.",
            tip: "Ideale per i bambini che non sanno ancora nuotare. Il fondale degrada in modo molto graduale.",
          },
          {
            title: 'Vendicari nord — Spiaggia Eloro (8 km)',
            text: "La parte nord della riserva di Vendicari è più accessibile di Calamosche (nessuna lunga camminata). Acqua limpida, fondale sabbioso, nessuna corrente. La riserva naturale stessa è un terreno di scoperta per i bambini: sentieri costieri, uccelli, tartarughe marine talvolta avvistate.",
            tip: "Portate maschera e boccaglio — l'acqua è abbastanza trasparente per osservare i pesci dalla superficie.",
          },
          {
            title: 'Marzamemi — rocce e snorkeling (20 km)',
            text: "Le calette e le rocce intorno al porto di Marzamemi sono perfette per lo snorkeling con i bambini. L'acqua è bassa e cristallina. Pesci colorati visibili già da 30 cm di profondità. La sera, il villaggio è il posto ideale per una passeggiata in famiglia.",
          },
        ],
      },
      {
        heading: 'Attività nautiche',
        items: [
          {
            title: "Gita in barca da Marzamemi",
            text: "Le escursioni in barca da Marzamemi costeggiamo da Vendicari fino a Capo Passero e Portopalo. Durata: 2-3 ore. Snorkeling durante il percorso, attrezzatura fornita. Bambini ammessi dai 4-5 anni. Prenotare in alta stagione.",
            tip: "Il Capitano Peppe organizza uscite su barche tradizionali per piccoli gruppi. Informatevi al porto di Marzamemi.",
          },
          {
            title: "Snorkeling a Vendicari",
            text: "L'acqua della riserva di Vendicari è abbastanza limpida per lo snorkeling in superficie. Pesci, ricci di mare, stelle marine. Nessun'attrezzatura subacquea necessaria — maschera e boccaglio bastano. Uno dei rari posti dove lo snorkeling in famiglia è accessibile senza barca.",
          },
        ],
      },
      {
        heading: 'Uscite e serate',
        items: [
          {
            title: "La piazza di Marzamemi la sera",
            text: "Marzamemi è probabilmente il posto più conviviale per le serate in famiglia. La piccola piazza principale è circondata da ristoranti; i bambini giocano liberamente tra i tavoli mentre gli adulti cenano. Gelato obbligatorio.",
          },
          {
            title: "Noto: granita e centro barocco",
            text: "Noto si trova a 5 minuti dalla villa. La passeggiata serale sul Corso Vittorio Emanuele è accessibile a tutte le età — ampi marciapiedi, niente auto, illuminazione calda. Tappa obbligatoria al Caffè Sicilia per granita o pasticceria.",
          },
          {
            title: "Fenicotteri a Vendicari (autunno-primavera)",
            text: "Da settembre a maggio circa, le lagune interne della riserva di Vendicari ospitano fenicotteri rosa, aironi cenerini e altri uccelli migratori. Uno spettacolo naturale unico accessibile a piedi dagli ingressi della riserva. Binocolo consigliato.",
          },
        ],
      },
    ],
    practical_title: 'Informazioni pratiche',
    practical: [
      { label: "Lettino / seggiolone", text: "Su richiesta preventiva, possiamo mettere a disposizione un lettino o un seggiolone. Indicatelo nella vostra richiesta di prenotazione." },
      { label: "Seggiolino auto", text: "Le società di noleggio a Catania offrono seggiolini per bambini a noleggio. Prenotatelo al momento della prenotazione del veicolo per garantirne la disponibilità." },
      { label: "Piscina", text: "La villa dispone di una piscina privata esterna. I bambini devono essere sorvegliati in ogni momento. Indicate l'età dei bambini se avete bisogno di informazioni specifiche sulla sicurezza." },
      { label: "Farmacie", text: "Diverse farmacie a Noto sono aperte tutti i giorni. Un ospedale si trova a Siracusa (40 min). Medico di base disponibile a Noto." },
    ],
    link_plages: 'Guida alle spiagge →',
    link_services: 'Servizi e concierge →',
  },
  de: {
    breadcrumb: 'Kinder',
    h1: 'Die Villa mit der Familie',
    sub: 'Aktivitäten und Tipps für einen Aufenthalt mit Kindern',
    intro: "Die Region um Noto ist ideal für Familien. Flache Strände, kindergerechte Wasseraktivitäten, Dörfer, in denen Kinder abends frei herumlaufen können. Hier sind unsere Empfehlungen von der Villa aus.",
    sections: [
      {
        heading: 'Die besten Strände für Kinder',
        items: [
          {
            title: 'Lido di Noto (15 km)',
            text: "Der familienfreundlichste Strand für kleine Kinder: flaches Wasser auf einem langen Abschnitt, Strandbetriebe mit Liegen und Sonnenschirmen, Duschen, Verpflegung. Aufsicht in der Hauptsaison. Alles 20 Minuten von der Villa entfernt.",
            tip: "Ideal für Kinder, die noch nicht schwimmen können. Der Meeresgrund fällt sehr allmählich ab.",
          },
          {
            title: 'Vendicari Nord — Eloro-Strand (8 km)',
            text: "Der nördliche Teil des Vendicari-Reservats ist zugänglicher als Calamosche (kein langer Fußweg). Klares Wasser, sandiger Boden, keine Strömungen. Das Naturschutzgebiet selbst ist ein Entdeckungsgelände für Kinder: Küstenpfade, Vögel, gelegentlich gesichtete Meeresschildkröten.",
            tip: "Maske und Schnorchel mitbringen — das Wasser ist klar genug, um Fische von der Oberfläche aus zu beobachten.",
          },
          {
            title: 'Marzamemi — Felsen und Schnorcheln (20 km)',
            text: "Die Buchten und Felsen rund um den Hafen von Marzamemi sind perfekt zum Schnorcheln mit Kindern. Das Wasser ist flach und kristallklar. Bunte Fische sind schon ab 30 cm Tiefe sichtbar. Abends ist das Dorf der ideale Ort für einen Familienspaziergang.",
          },
        ],
      },
      {
        heading: 'Wasseraktivitäten',
        items: [
          {
            title: "Bootsausflüge ab Marzamemi",
            text: "Bootsexkursionen ab Marzamemi folgen der Küste von Vendicari bis Capo Passero und Portopalo. Dauer: 2-3 Stunden. Schnorcheln unterwegs, Ausrüstung inklusive. Kinder ab 4-5 Jahren willkommen. In der Hauptsaison im Voraus buchen.",
            tip: "Capitano Peppe bietet Fahrten auf traditionellen kleinen Booten für kleine Gruppen an. Am Hafen von Marzamemi nachfragen.",
          },
          {
            title: "Schnorcheln in Vendicari",
            text: "Das Wasser im Vendicari-Reservat ist klar genug für Oberflächen-Schnorcheln. Fische, Seeigel, Seesterne. Keine Tauchausrüstung nötig — Maske und Schnorchel reichen. Einer der wenigen Orte, wo Familien-Schnorcheln ohne Boot möglich ist.",
          },
        ],
      },
      {
        heading: 'Ausflüge und Abende',
        items: [
          {
            title: "Die Piazza von Marzamemi am Abend",
            text: "Marzamemi ist wahrscheinlich der familienfreundlichste Abendtreff. Der kleine Hauptplatz ist von Restaurants umgeben; Kinder spielen frei zwischen den Tischen, während Erwachsene speisen. Gelato ist Pflicht.",
          },
          {
            title: "Noto: Granita und Barockzentrum",
            text: "Noto liegt 5 Minuten von der Villa entfernt. Der Abendspaziergang auf dem Corso Vittorio Emanuele ist für alle Altersgruppen geeignet — breite Bürgersteige, keine Autos, warme Beleuchtung. Ein Halt im Caffè Sicilia für Granita oder Gebäck ist unverzichtbar.",
          },
          {
            title: "Flamingos in Vendicari (Herbst–Frühling)",
            text: "Von etwa September bis Mai beherbergen die Binnenlagungen des Vendicari-Reservats Flamingos, Graureiher und andere Zugvögel. Ein einzigartiges Naturschauspiel, zu Fuß von den Reservatseingängen aus zugänglich. Fernglas empfohlen.",
          },
        ],
      },
    ],
    practical_title: 'Praktische Informationen',
    practical: [
      { label: "Reisebett / Hochstuhl", text: "Auf Voranfrage können wir ein Reisebett oder einen Hochstuhl zur Verfügung stellen. Bitte in der Buchungsanfrage erwähnen." },
      { label: "Kindersitz", text: "Mietwagengesellschaften in Catania bieten Kindersitze gegen Aufpreis an. Bei der Fahrzeugbuchung reservieren, um die Verfügbarkeit zu sichern." },
      { label: "Pool", text: "Die Villa verfügt über einen privaten Außenpool. Kinder müssen jederzeit beaufsichtigt werden. Bitte das Alter der Kinder angeben, wenn Sie spezifische Sicherheitsinformationen benötigen." },
      { label: "Apotheken", text: "Mehrere Apotheken in Noto sind täglich geöffnet. Ein Krankenhaus befindet sich in Syrakus (40 Min.). Hausarzt in Noto verfügbar." },
    ],
    link_plages: 'Strand-Guide →',
    link_services: 'Services & Concierge →',
  },
}

export default function EnfantsPage({ params }: { params: { locale: string } }) {
  const locale = (LOCALES.includes(params.locale as Lang) ? params.locale : 'fr') as Lang
  const c = CONTENT[locale]
  const homeLabel = locale === 'fr' ? 'Accueil' : locale === 'de' ? 'Startseite' : 'Home'
  return (
    <>
      <JsonLd data={[getBreadcrumbSchema([
        { name: homeLabel, item: `${BASE}/${locale}` },
        { name: c.breadcrumb, item: `${BASE}/${locale}/enfants` },
      ])]} />
      <PageLayout lang={locale} page="enfants" breadcrumb={c.breadcrumb}>
        <div className="max-w-2xl">
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal leading-tight mb-3">{c.h1}</h1>
          <p className="font-sans text-xs tracking-[0.15em] uppercase text-gold mb-6">{c.sub}</p>
          <div className="gold-divider" />
          <p className="font-sans text-base text-muted leading-relaxed mb-14">{c.intro}</p>

          {c.sections.map((section, si) => (
            <div key={si} className="mb-14">
              <h2 className="font-serif text-2xl text-charcoal mb-7">{section.heading}</h2>
              <div className="space-y-8">
                {section.items.map((item, ii) => (
                  <div key={ii} className="border-l-2 border-gold/30 pl-5">
                    <p className="font-sans text-sm font-semibold text-charcoal mb-1">{item.title}</p>
                    <p className="font-sans text-sm text-muted leading-relaxed">{item.text}</p>
                    {item.tip && (
                      <p className="font-sans text-xs italic text-muted/70 mt-2 pl-3 border-l border-gold/30 leading-relaxed">{item.tip}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-navy text-white p-8 mb-12">
            <h2 className="font-serif text-xl text-gold mb-6">{c.practical_title}</h2>
            <div className="space-y-4">
              {c.practical.map((item, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-1 md:gap-6 border-b border-white/10 pb-4 last:border-none last:pb-0">
                  <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-gold/80">{item.label}</p>
                  <p className="font-sans text-sm text-white/80 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href={`/${locale}/plages`} className="font-sans text-xs tracking-widest uppercase px-6 py-3 bg-gold text-white hover:bg-gold/80 transition-all duration-300">
              {c.link_plages}
            </Link>
            <Link href={`/${locale}/services`} className="font-sans text-xs tracking-widest uppercase px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-white transition-all duration-300">
              {c.link_services}
            </Link>
          </div>
        </div>
      </PageLayout>
    </>
  )
}
