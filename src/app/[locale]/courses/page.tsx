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
    title: 'Courses et marchés locaux — Noto, Sicile',
    description: "Où faire ses courses près de Villa Vénus Noto : marché du vendredi, supermarchés, amandes d'Avola, Nero d'Avola, conserves Campisi. Produits locaux et spécialités siciliennes.",
  },
  en: {
    title: 'Local Shopping & Markets — Noto, Sicily',
    description: "Where to shop near Villa Vénus Noto: Friday market, supermarkets, Avola almonds, Nero d'Avola wine, Campisi conserves. Local products and Sicilian specialities.",
  },
  it: {
    title: 'Spesa e mercati locali — Noto, Sicilia',
    description: "Dove fare la spesa vicino a Villa Vénus Noto: mercato del venerdì, supermercati, mandorle di Avola, Nero d'Avola, conserve Campisi. Prodotti locali e specialità siciliane.",
  },
  de: {
    title: 'Einkaufen & lokale Märkte — Noto, Sizilien',
    description: "Wo man in der Nähe von Villa Vénus Noto einkauft: Freitagsmarkt, Supermärkte, Avola-Mandeln, Nero d'Avola-Wein, Campisi-Konserven. Lokale Produkte und sizilianische Spezialitäten.",
  },
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Lang
  if (!META[locale]) return {}
  const { title, description } = META[locale]
  return {
    title, description,
    robots: { index: true, follow: true },
    alternates: buildAlternates('courses', locale),
    openGraph: { title, description, url: `${BASE}/${locale}/courses`, siteName: 'Villa Vénus Noto', images: [{ url: '/og-image.jpg', width: 1200, height: 630 }] },
  }
}

type Section = { title: string; items: Array<{ name: string; desc: string; detail?: string }> }
type Content = {
  breadcrumb: string; h1: string; sub: string; intro: string
  sections: Section[]
  link_itineraire: string; link_services: string
}

const CONTENT: Record<Lang, Content> = {
  fr: {
    breadcrumb: 'Courses',
    h1: 'Marché, épiceries et spécialités locales',
    sub: 'Tout ce qu\'il faut savoir pour se ravitailler',
    intro: "La villa est entièrement équipée pour cuisiner. Voici les meilleures adresses pour faire vos courses, trouver des produits locaux de qualité et rapporter les spécialités du Val di Noto.",
    sections: [
      {
        title: 'Marché et alimentation',
        items: [
          {
            name: 'Marché de Noto — vendredi matin',
            desc: "Le marché hebdomadaire se tient à la Villa Comunale (les jardins publics de Noto) chaque vendredi de 8h à 13h environ. Fruits et légumes de saison, herbes, fromages, poissons et produits locaux. Le meilleur endroit pour acheter en direct aux producteurs de la région.",
            detail: "Villa Comunale, Noto. Accès facile à pied depuis le centre historique.",
          },
          {
            name: 'Interspar c/o Il Giardino (Noto)',
            desc: "Le supermarché le plus complet de la zone. Ouvert tous les jours, bonnes heures d'ouverture. Idéal pour les courses de la semaine : tous les produits de base, charcuteries, vins, articles ménagers.",
            detail: "À 8 km de la villa, sur la route de Noto.",
          },
          {
            name: 'Sessa Superstore (Noto)',
            desc: "Autre grande surface à Noto pour les courses courantes. Large gamme de produits italiens et locaux.",
          },
        ],
      },
      {
        title: 'Spécialités à rapporter',
        items: [
          {
            name: "Amandes Pizzuta d'Avola",
            desc: "Avola (15 km) est la capitale mondiale de l'amande. La variété Pizzuta d'Avola — grande, plate, bilobée — est considérée comme la meilleure amande du monde. Achetez directement chez les producteurs à Avola ou au marché de Noto. En confiserie, en sachet, en pâte d'amandes.",
            detail: "Saison : août-septembre (récolte). Disponibles en vente toute l'année chez les producteurs.",
          },
          {
            name: "Nero d'Avola — Noto DOC",
            desc: "Le cépage emblématique du Val di Noto. Les meilleurs flacons : Zisola (famille Planeta, propriété à 5 km de la villa), Cantina Marilina (vins naturels), Feudo Maccari. Visites et dégustations possibles sur rendez-vous.",
            detail: "Cave Zisola : sur la route de la villa. Cave Marilina : route de Pachino. Certaines caves vendent directement.",
          },
          {
            name: 'Conserves Campisi — Marzamemi',
            desc: "La pêcherie Campisi, fondée en 1905 à Marzamemi, est une institution régionale. Thon à l'huile d'olive, bottarga de thon, filets d'anchois, espadon mariné. Vente directe sur place et en ligne.",
            detail: "Boutique à Marzamemi (20 km). Produits aussi disponibles dans certaines épiceries fines de Noto.",
          },
          {
            name: "Huile d'olive, câpres et câpriers",
            desc: "La Sicile produit certaines des meilleures huiles d'olive d'Italie. Les câpres de Pantelleria sont distribuées dans toute la Sicile. Cherchez les épiceries fines (alimentari) dans le centre de Noto pour une sélection locale.",
          },
          {
            name: "Granita et pâtisseries siciliennes",
            desc: "Caffè Sicilia (Noto, depuis 1892) — granitas artisanales primées, manicaretti siciliens. Pâte d'amandes, cassate, cannoli : achetez directement chez le pâtissier plutôt qu'en supermarché pour la qualité authentique.",
            detail: "Corso Vittorio Emanuele, Noto. Commandez à l'avance pour de grandes quantités.",
          },
        ],
      },
    ],
    link_itineraire: 'Voir l\'itinéraire suggéré →',
    link_services: 'Services et conciergerie →',
  },
  en: {
    breadcrumb: 'Shopping',
    h1: 'Market, shops and local specialities',
    sub: 'Everything you need to know for stocking up',
    intro: "The villa is fully equipped for cooking. Here are the best addresses for groceries, quality local produce and Sicilian specialities to bring home.",
    sections: [
      {
        title: 'Market & groceries',
        items: [
          {
            name: 'Noto market — Friday mornings',
            desc: "The weekly market is held at the Villa Comunale (Noto's public gardens) every Friday, approximately 8am-1pm. Seasonal fruit and vegetables, herbs, cheeses, fish and local produce. The best place to buy directly from regional producers.",
            detail: "Villa Comunale, Noto. Easy walking access from the historic centre.",
          },
          {
            name: 'Interspar c/o Il Giardino (Noto)',
            desc: "The most complete supermarket in the area. Open daily with good opening hours. Ideal for weekly shopping: all essentials, charcuterie, wines, household items.",
            detail: "8 km from the villa, on the Noto road.",
          },
          {
            name: 'Sessa Superstore (Noto)',
            desc: "Another large supermarket in Noto for everyday shopping. Wide range of Italian and local products.",
          },
        ],
      },
      {
        title: 'Specialities to bring home',
        items: [
          {
            name: "Pizzuta d'Avola almonds",
            desc: "Avola (15 km) is the world capital of the almond. The Pizzuta d'Avola variety — large, flat, two-lobed — is considered the world's finest almond. Buy directly from producers in Avola or at the Noto market. Available as confectionery, bags, almond paste.",
            detail: "Season: August-September (harvest). Available year-round from producers.",
          },
          {
            name: "Nero d'Avola — Noto DOC",
            desc: "The emblematic grape variety of the Val di Noto. Best bottles: Zisola (Planeta family, estate 5 km from the villa), Cantina Marilina (natural wines), Feudo Maccari. Visits and tastings available by appointment.",
            detail: "Zisola winery: on the villa road. Marilina winery: Pachino road. Some wineries sell direct.",
          },
          {
            name: 'Campisi conserves — Marzamemi',
            desc: "The Campisi cannery, founded in 1905 at Marzamemi, is a regional institution. Tuna in olive oil, tuna bottarga, anchovy fillets, marinated swordfish. Direct sales on site and online.",
            detail: "Shop at Marzamemi (20 km). Products also available in some Noto delicatessens.",
          },
          {
            name: "Olive oil, capers and caper leaves",
            desc: "Sicily produces some of Italy's finest olive oils. Pantelleria capers are distributed throughout Sicily. Look for delicatessens (alimentari) in central Noto for a local selection.",
          },
          {
            name: "Granita and Sicilian pastries",
            desc: "Caffè Sicilia (Noto, since 1892) — award-winning artisan granitas, Sicilian delicacies. Almond paste, cassata, cannoli: buy directly from the pastry shop rather than a supermarket for authentic quality.",
            detail: "Corso Vittorio Emanuele, Noto. Order in advance for large quantities.",
          },
        ],
      },
    ],
    link_itineraire: 'Suggested itinerary →',
    link_services: 'Services & concierge →',
  },
  it: {
    breadcrumb: 'Spesa',
    h1: 'Mercato, negozi e specialità locali',
    sub: 'Tutto quello che serve sapere per fare la spesa',
    intro: "La villa è completamente attrezzata per cucinare. Ecco i migliori indirizzi per fare la spesa, trovare prodotti locali di qualità e portare a casa le specialità del Val di Noto.",
    sections: [
      {
        title: 'Mercato e alimentari',
        items: [
          {
            name: 'Mercato di Noto — venerdì mattina',
            desc: "Il mercato settimanale si tiene alla Villa Comunale (i giardini pubblici di Noto) ogni venerdì, dalle 8 alle 13 circa. Frutta e verdura di stagione, erbe aromatiche, formaggi, pesce e prodotti locali. Il posto migliore per acquistare direttamente dai produttori della zona.",
            detail: "Villa Comunale, Noto. Facilmente raggiungibile a piedi dal centro storico.",
          },
          {
            name: 'Interspar c/o Il Giardino (Noto)',
            desc: "Il supermercato più completo della zona. Aperto tutti i giorni con buoni orari. Ideale per la spesa settimanale: tutti i prodotti di base, salumi, vini, articoli per la casa.",
            detail: "A 8 km dalla villa, sulla strada per Noto.",
          },
          {
            name: 'Sessa Superstore (Noto)',
            desc: "Altro grande supermercato a Noto per la spesa quotidiana. Ampia gamma di prodotti italiani e locali.",
          },
        ],
      },
      {
        title: 'Specialità da portare a casa',
        items: [
          {
            name: "Mandorle Pizzuta d'Avola",
            desc: "Avola (15 km) è la capitale mondiale della mandorla. La varietà Pizzuta d'Avola — grande, piatta, bilobata — è considerata la migliore mandorla al mondo. Acquistate direttamente dai produttori ad Avola o al mercato di Noto. Disponibili come dolciumi, in sacchetto, come pasta di mandorle.",
            detail: "Stagione: agosto-settembre (raccolta). Disponibili tutto l'anno dai produttori.",
          },
          {
            name: "Nero d'Avola — Noto DOC",
            desc: "Il vitigno emblematico del Val di Noto. Le migliori bottiglie: Zisola (famiglia Planeta, tenuta a 5 km dalla villa), Cantina Marilina (vini naturali), Feudo Maccari. Visite e degustazioni su appuntamento.",
            detail: "Cantina Zisola: sulla strada della villa. Cantina Marilina: strada per Pachino. Alcune cantine vendono direttamente.",
          },
          {
            name: 'Conserve Campisi — Marzamemi',
            desc: "La tonnara Campisi, fondata nel 1905 a Marzamemi, è un'istituzione regionale. Tonno sott'olio, bottarga di tonno, filetti di acciughe, pesce spada marinato. Vendita diretta in loco e online.",
            detail: "Negozio a Marzamemi (20 km). Prodotti disponibili anche in alcune gastronomie di Noto.",
          },
          {
            name: "Olio d'oliva, capperi e fiori di cappero",
            desc: "La Sicilia produce alcuni dei migliori oli d'oliva d'Italia. I capperi di Pantelleria sono distribuiti in tutta la Sicilia. Cercate le gastronomie (alimentari) nel centro di Noto per una selezione locale.",
          },
          {
            name: "Granita e pasticceria siciliana",
            desc: "Caffè Sicilia (Noto, dal 1892) — granite artigianali premiate, dolci siciliani. Pasta di mandorle, cassate, cannoli: acquistate direttamente in pasticceria piuttosto che al supermercato per la qualità autentica.",
            detail: "Corso Vittorio Emanuele, Noto. Ordinate in anticipo per grandi quantità.",
          },
        ],
      },
    ],
    link_itineraire: 'Vedere l\'itinerario suggerito →',
    link_services: 'Servizi e concierge →',
  },
  de: {
    breadcrumb: 'Einkaufen',
    h1: 'Markt, Geschäfte und lokale Spezialitäten',
    sub: 'Alles Wissenswerte zum Einkaufen',
    intro: "Die Villa ist vollständig zum Kochen ausgestattet. Hier sind die besten Adressen für Lebensmittel, hochwertige lokale Produkte und sizilianische Spezialitäten zum Mitnehmen.",
    sections: [
      {
        title: 'Markt & Lebensmittelgeschäfte',
        items: [
          {
            name: 'Noto-Markt — Freitagmorgen',
            desc: "Der Wochenmarkt findet jeden Freitag von ca. 8 bis 13 Uhr an der Villa Comunale (dem öffentlichen Garten von Noto) statt. Saisonales Obst und Gemüse, Kräuter, Käse, Fisch und lokale Produkte. Der beste Ort, um direkt bei regionalen Erzeugern einzukaufen.",
            detail: "Villa Comunale, Noto. Einfach zu Fuß vom historischen Zentrum erreichbar.",
          },
          {
            name: 'Interspar c/o Il Giardino (Noto)',
            desc: "Der umfassendste Supermarkt in der Gegend. Täglich mit guten Öffnungszeiten geöffnet. Ideal für den Wocheneinkauf: alle Grundprodukte, Wurstwaren, Weine, Haushaltswaren.",
            detail: "8 km von der Villa entfernt, auf der Straße nach Noto.",
          },
          {
            name: 'Sessa Superstore (Noto)',
            desc: "Ein weiterer großer Supermarkt in Noto für den täglichen Einkauf. Breites Sortiment an italienischen und lokalen Produkten.",
          },
        ],
      },
      {
        title: 'Spezialitäten zum Mitnehmen',
        items: [
          {
            name: "Pizzuta-d'Avola-Mandeln",
            desc: "Avola (15 km) ist die Welthauptstadt der Mandel. Die Sorte Pizzuta d'Avola — groß, flach, zweilappig — gilt als die weltbeste Mandel. Direkt bei Erzeugern in Avola oder auf dem Noto-Markt kaufen. Als Konfekt, in Tüten, als Mandelpaste erhältlich.",
            detail: "Saison: August-September (Ernte). Ganzjährig bei Erzeugern erhältlich.",
          },
          {
            name: "Nero d'Avola — Noto DOC",
            desc: "Die emblematische Rebsorte des Val di Noto. Beste Flaschen: Zisola (Familie Planeta, Gut 5 km von der Villa), Cantina Marilina (Naturweine), Feudo Maccari. Besuche und Verkostungen nach Voranmeldung.",
            detail: "Weingut Zisola: auf der Straße zur Villa. Cantina Marilina: Straße nach Pachino. Einige Weingüter verkaufen direkt.",
          },
          {
            name: 'Campisi-Konserven — Marzamemi',
            desc: "Die Thunfischfabrik Campisi, 1905 in Marzamemi gegründet, ist eine regionale Institution. Thunfisch in Olivenöl, Thunfisch-Bottarga, Sardellenfilets, marinierter Schwertfisch. Direktverkauf vor Ort und online.",
            detail: "Geschäft in Marzamemi (20 km). Produkte auch in einigen Feinkostläden in Noto erhältlich.",
          },
          {
            name: "Olivenöl, Kapern und Kapernblüten",
            desc: "Sizilien produziert einige der besten Olivenöle Italiens. Pantelleria-Kapern sind in ganz Sizilien erhältlich. Suchen Sie in Feinkostläden (alimentari) im Zentrum von Noto nach einer lokalen Auswahl.",
          },
          {
            name: "Granita und sizilianische Süßigkeiten",
            desc: "Caffè Sicilia (Noto, seit 1892) — preisgekrönte handwerkliche Granitas, sizilianische Delikatessen. Mandelpaste, Cassata, Cannoli: kaufen Sie direkt beim Konditor statt im Supermarkt für authentische Qualität.",
            detail: "Corso Vittorio Emanuele, Noto. Für größere Mengen im Voraus bestellen.",
          },
        ],
      },
    ],
    link_itineraire: 'Vorgeschlagene Reiseroute →',
    link_services: 'Services & Concierge →',
  },
}

export default function CoursesPage({ params }: { params: { locale: string } }) {
  const locale = (LOCALES.includes(params.locale as Lang) ? params.locale : 'fr') as Lang
  const c = CONTENT[locale]
  const homeLabel = locale === 'fr' ? 'Accueil' : locale === 'de' ? 'Startseite' : 'Home'
  return (
    <>
      <JsonLd data={[getBreadcrumbSchema([
        { name: homeLabel, item: `${BASE}/${locale}` },
        { name: c.breadcrumb, item: `${BASE}/${locale}/courses` },
      ])]} />
      <PageLayout lang={locale} page="courses" breadcrumb={c.breadcrumb}>
        <div className="max-w-2xl">
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal leading-tight mb-3">{c.h1}</h1>
          <p className="font-sans text-xs tracking-[0.15em] uppercase text-gold-text mb-6">{c.sub}</p>
          <div className="gold-divider" />
          <p className="font-sans text-base text-muted leading-relaxed mb-14">{c.intro}</p>

          {c.sections.map((section, si) => (
            <div key={si} className="mb-14">
              <h2 className="font-serif text-2xl text-charcoal mb-7">{section.title}</h2>
              <div className="space-y-8">
                {section.items.map((item, ii) => (
                  <div key={ii} className="border-l-2 border-gold/30 pl-5">
                    <p className="font-sans text-sm font-semibold text-charcoal mb-1">{item.name}</p>
                    <p className="font-sans text-sm text-muted leading-relaxed">{item.desc}</p>
                    {item.detail && (
                      <p className="font-sans text-xs text-muted/70 italic mt-1 leading-relaxed">{item.detail}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex flex-wrap gap-4 mt-4">
            <Link href={`/${locale}/itineraire`} className="font-sans text-xs tracking-widest uppercase px-6 py-3 bg-gold text-white hover:bg-gold/80 transition-all duration-300">
              {c.link_itineraire}
            </Link>
            <Link href={`/${locale}/services`} className="font-sans text-xs tracking-widest uppercase px-6 py-3 border border-gold text-gold-text hover:bg-gold hover:text-white transition-all duration-300">
              {c.link_services}
            </Link>
          </div>
        </div>
      </PageLayout>
    </>
  )
}
