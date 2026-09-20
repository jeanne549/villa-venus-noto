import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout from '@/components/PageLayout'
import type { Lang } from '@/lib/i18n'
import { hasPlaceholders } from '@/lib/placeholder'
import { pageUrl } from '@/lib/routes'
import JsonLd from '@/components/JsonLd'
import { getBreadcrumbSchema, getFaqPageSchema } from '@/lib/structured-data'
import PageTracker from '@/components/PageTracker'

const BASE = 'https://www.villavenusnoto.com'
const LOCALES: Lang[] = ['fr', 'en', 'it', 'de']

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }))
}

const META = {
  fr: { title: 'FAQ — Tout savoir avant de réserver Villa Vénus Noto', description: 'Paiement, annulation, animaux, climatisation, linge, check-in, piscine, restauration à proximité. Toutes les réponses pour réserver Villa Vénus Noto en toute confiance.' },
  en: { title: 'FAQ — Everything to Know Before Booking Villa Vénus Noto', description: 'Payment, cancellation, pets, air conditioning, linen, check-in times, pool, nearby restaurants. Full answers for booking Villa Vénus Noto with confidence.' },
  it: { title: 'FAQ — Tutto da sapere prima di prenotare Villa Vénus Noto', description: 'Pagamento, cancellazione, animali, aria condizionata, biancheria, check-in, piscina, ristoranti vicini. Risposte complete per prenotare Villa Vénus Noto con fiducia.' },
  de: { title: 'FAQ — Alles Wissenswerte vor der Buchung der Villa Vénus Noto', description: 'Zahlung, Stornierung, Haustiere, Klimaanlage, Wäsche, Check-in-Zeiten, Pool, Restaurants in der Nähe. Vollständige Antworten für die Buchung der Villa Vénus Noto.' },
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Lang
  if (!META[locale]) return {}
  const { title, description } = META[locale]
  const robots = hasPlaceholders(FAQS[locale]) ? { index: false, follow: true } : { index: true, follow: true }
  return {
    title, description,
    robots,
    alternates: { canonical: `${BASE}/${locale}/faq`, languages: { fr: `${BASE}/fr/faq`, en: `${BASE}/en/faq`, it: `${BASE}/it/faq`, de: `${BASE}/de/faq`, 'x-default': `${BASE}/fr/faq` } },
    openGraph: { title, description, url: `${BASE}/${locale}/faq`, siteName: 'Villa Vénus Noto', images: [{ url: '/og-image.jpg', width: 1200, height: 630 }] },
  }
}

type FAQ = { q: string; a: string }
type Category = { cat: string; items: FAQ[] }

const FAQS: Record<Lang, Category[]> = {
  fr: [
    {
      cat: 'Réservation',
      items: [
        { q: 'Comment réserver ?', a: "Remplissez le formulaire de contact avec vos dates, le nombre de personnes et vos questions. Nous vous répondons dans les 24h avec les disponibilités et un devis. La réservation est confirmée après versement de l'acompte." },
        { q: 'Quelle est la durée minimum de séjour ?', a: "6 nuits. La villa se loue du samedi au samedi ou selon un autre jour de début selon la disponibilité." },
        { q: 'Quand la villa est-elle ouverte ?', a: "La saison est ouverte d'avril à octobre. En dehors de cette période, contactez-nous — des séjours exceptionnels peuvent être envisagés selon les conditions." },
        { q: "Y a-t-il une commission d'agence ?", a: "Non. Vous réservez directement avec les propriétaires. Aucune commission de plateforme, aucun intermédiaire." },
        { q: 'Comment se passe le paiement ?', a: "Un acompte de 50 % est demandé à la réservation. Le solde de 50 % est dû le jour de l'arrivée." },
        { q: "Quelle est la politique d'annulation ?", a: "La politique est stricte. En cas d'annulation plus de 60 jours avant l'arrivée, l'acompte est remboursé, déduction faite des frais de dossier. En deçà de 60 jours avant l'arrivée, l'acompte n'est pas remboursé." },
      ],
    },
    {
      cat: 'La villa',
      items: [
        { q: 'Combien de personnes peuvent dormir à la villa ?', a: "La villa accueille jusqu'à 9 personnes en 4 suites : Suite Agave (vue piscine), Suite Bougainvillea (vue jardin), Suite Gelsomino (vue jardin) et Suite Limone (chambre intérieure). Chaque suite dispose d'une salle de bain privée et d'une terrasse." },
        { q: 'La climatisation est-elle présente dans toutes les suites ?', a: "Oui, toutes les suites sont climatisées." },
        { q: 'Le linge de maison est-il fourni ?', a: "Oui. Draps, serviettes de bain et serviettes de piscine sont inclus dans la location." },
        { q: 'La piscine est-elle chauffée ?', a: "Non, la piscine n'est pas chauffée. Elle est alimentée par eau naturelle et maintient une température agréable de mai à octobre grâce au soleil sicilien." },
        { q: 'Y a-t-il une cuisine équipée ?', a: "Oui. La villa dispose d'une cuisine intérieure équipée (lave-vaisselle, micro-ondes, machine à expresso, machine à laver) ainsi qu'une cuisine extérieure complète sur le rooftop, un four à bois, un barbecue et une plancha au bord de la piscine." },
        { q: 'Y a-t-il du Wi-Fi ?', a: "Oui, le Wi-Fi haut débit est inclus dans toute la villa." },
        { q: 'Combien de voitures peut-on garer sur le domaine ?', a: "Le domaine dispose d'un parking privatif sécurisé pouvant accueillir jusqu'à 4 voitures." },
      ],
    },
    {
      cat: 'Pendant le séjour',
      items: [
        { q: 'À quelle heure est le check-in ?', a: "L'arrivée se fait à partir de 16h00. Un départ tardif ou une arrivée anticipée peut être envisagé selon les séjours adjacents — contactez-nous." },
        { q: 'À quelle heure est le check-out ?', a: "Le départ est avant 10h00." },
        { q: "Y a-t-il quelqu'un sur place en cas de besoin ?", a: "Oui. Emmanuel Di Pietro, notre gestionnaire local, est joignable pendant toute la durée de votre séjour. Ses coordonnées vous sont transmises à la confirmation de réservation." },
        { q: 'Les animaux sont-ils acceptés ?', a: "Les petits animaux de compagnie sont acceptés. Merci de nous le signaler lors de la réservation." },
        { q: 'Y a-t-il un ménage de fin de séjour ?', a: "Oui, le ménage de fin de séjour est inclus dans le tarif. Pour un ménage en cours de séjour, il est possible sur demande, aux frais du voyageur." },
      ],
    },
    {
      cat: 'Les environs',
      items: [
        { q: 'Y a-t-il un supermarché à proximité ?', a: "Noto (5 km) dispose de plusieurs supermarchés et d'un marché, le lundi matin. Un second marché se tient à Avola le jeudi. À Syracuse (30 km), le marché aux poissons d'Ortigia est une expérience à part entière. Des courses peuvent également être commandées depuis Noto." },
        { q: 'Quels restaurants recommandez-vous à Noto ?', a: "Contactez-nous directement — nous partageons volontiers nos adresses favorites à Noto et dans les environs avec nos hôtes." },
        { q: "A-t-on besoin d'une voiture absolument ?", a: "Oui, la voiture est indispensable. Il n'y a pas de transport en commun jusqu'à la villa, et les villages, plages et sites du Val di Noto ne sont accessibles qu'en voiture. Voir la page Comment venir." },
      ],
    },
  ],
  en: [
    {
      cat: 'Booking',
      items: [
        { q: 'How do I book?', a: "Fill in the contact form with your dates, number of guests and questions. We'll reply within 24 hours with availability and a quote. Booking is confirmed after the deposit is paid." },
        { q: 'What is the minimum stay?', a: "6 nights. The villa rents Saturday to Saturday, or from another start day depending on availability." },
        { q: 'When is the villa open?', a: "The season runs from April to October. Outside this period, contact us — exceptional stays may be possible depending on conditions." },
        { q: 'Is there an agency commission?', a: "No. You book directly with the owners. No platform commission, no middleman." },
        { q: 'How does payment work?', a: "A 50% deposit is required at booking. The remaining 50% is due on the day of arrival." },
        { q: 'What is the cancellation policy?', a: "The policy is strict. If cancelled more than 60 days before arrival, the deposit is refunded minus an admin fee. Within 60 days of arrival, the deposit is non-refundable." },
      ],
    },
    {
      cat: 'The villa',
      items: [
        { q: 'How many people can sleep at the villa?', a: "The villa sleeps up to 9 guests in 4 suites: Suite Agave (pool view), Suite Bougainvillea (garden view), Suite Gelsomino (garden view) and Suite Limone (interior room). Each suite has a private bathroom and terrace." },
        { q: 'Is there air conditioning in all suites?', a: "Yes, all suites are air-conditioned." },
        { q: 'Is bed linen provided?', a: "Yes. Sheets, bath towels and pool towels are all included in the rental." },
        { q: 'Is the pool heated?', a: "No, the pool is not heated. It is fed by natural water and stays at a pleasant temperature from May to October thanks to the Sicilian sun." },
        { q: 'Is there a fully equipped kitchen?', a: "Yes. The villa has a fully equipped indoor kitchen (dishwasher, microwave, espresso machine, washing machine) plus a full outdoor kitchen on the rooftop, a wood-fired oven, a BBQ and a plancha by the pool." },
        { q: 'Is there Wi-Fi?', a: "Yes, high-speed Wi-Fi is included throughout the villa." },
        { q: 'How many cars can park on the property?', a: "The property has a secure private car park with space for up to 4 vehicles." },
      ],
    },
    {
      cat: 'During your stay',
      items: [
        { q: 'What time is check-in?', a: "Arrival is from 4:00 PM. A late check-out or early arrival may be possible depending on adjacent stays — contact us." },
        { q: 'What time is check-out?', a: "Departure is before 10:00 AM." },
        { q: 'Is there someone available on site if needed?', a: "Yes. Emmanuel Di Pietro, our local manager, is reachable throughout your stay. His contact details are provided at booking confirmation." },
        { q: 'Are pets allowed?', a: "Small pets are welcome. Please let us know at the time of booking." },
        { q: 'Is an end-of-stay clean included?', a: "Yes, end-of-stay cleaning is included in the rate. A mid-stay clean is available on request, at the guest's expense." },
      ],
    },
    {
      cat: 'The surroundings',
      items: [
        { q: 'Is there a supermarket nearby?', a: "Noto (5 km) has several supermarkets and a weekly market on Monday mornings. A second market takes place in Avola on Thursdays. In Syracuse (30 km), the Ortigia fish market is an unmissable experience. Groceries can also be ordered from Noto." },
        { q: 'Which restaurants do you recommend in Noto?', a: "Contact us directly — we are happy to share our personal favourite addresses in Noto and the surrounding area with our guests." },
        { q: 'Is a car absolutely necessary?', a: "Yes, a car is essential. There is no public transport to the villa, and the villages, beaches and sites of the Val di Noto are only accessible by car. See the Getting Here page." },
      ],
    },
  ],
  it: [
    {
      cat: 'Prenotazione',
      items: [
        { q: 'Come si prenota?', a: "Compilate il modulo di contatto con le date, il numero di ospiti e le vostre domande. Vi risponderemo entro 24 ore con la disponibilità e un preventivo. La prenotazione è confermata dopo il versamento della caparra." },
        { q: 'Qual è la durata minima del soggiorno?', a: "6 notti. La villa si affitta dal sabato al sabato, o da un altro giorno di inizio a seconda della disponibilità." },
        { q: 'Quando è aperta la villa?', a: "La stagione va da aprile a ottobre. Al di fuori di questo periodo, contattateci — soggiorni eccezionali possono essere previsti secondo le condizioni." },
        { q: "C'è una commissione di agenzia?", a: "No. Prenotate direttamente con i proprietari. Nessuna commissione di piattaforma, nessun intermediario." },
        { q: 'Come funziona il pagamento?', a: "Una caparra del 50% è richiesta alla prenotazione. Il saldo del 50% è dovuto il giorno dell'arrivo." },
        { q: 'Qual è la politica di cancellazione?', a: "La politica è rigida. In caso di cancellazione oltre 60 giorni prima dell'arrivo, la caparra viene rimborsata meno le spese di gestione. Entro 60 giorni dall'arrivo, la caparra non è rimborsabile." },
      ],
    },
    {
      cat: 'La villa',
      items: [
        { q: 'Quante persone possono dormire alla villa?', a: "La villa ospita fino a 9 persone in 4 suite: Suite Agave (vista piscina), Suite Bougainvillea (vista giardino), Suite Gelsomino (vista giardino) e Suite Limone (camera interna). Ogni suite dispone di bagno privato e terrazza." },
        { q: "C'è l'aria condizionata in tutte le suite?", a: "Sì, tutte le suite sono climatizzate." },
        { q: 'La biancheria è fornita?', a: "Sì. Lenzuola, asciugamani da bagno e asciugamani da piscina sono inclusi nel noleggio." },
        { q: 'La piscina è riscaldata?', a: "No, la piscina non è riscaldata. È alimentata ad acqua naturale e mantiene una temperatura piacevole da maggio a ottobre grazie al sole siciliano." },
        { q: "C'è una cucina attrezzata?", a: "Sì. La villa dispone di una cucina interna completamente attrezzata (lavastoviglie, microonde, macchina da espresso, lavatrice) e di una cucina esterna completa sul rooftop, un forno a legna, un barbecue e una plancha a bordo piscina." },
        { q: "C'è il Wi-Fi?", a: "Sì, il Wi-Fi ad alta velocità è incluso in tutta la villa." },
        { q: 'Quante auto si possono parcheggiare?', a: "La proprietà dispone di un parcheggio privato sicuro che può ospitare fino a 4 veicoli." },
      ],
    },
    {
      cat: 'Durante il soggiorno',
      items: [
        { q: "A che ora è il check-in?", a: "L'arrivo è a partire dalle 16:00. Un check-out tardivo o un arrivo anticipato può essere previsto a seconda dei soggiorni adiacenti — contattateci." },
        { q: 'A che ora è il check-out?', a: 'La partenza è prima delle 10:00.' },
        { q: "C'è qualcuno disponibile in loco in caso di necessità?", a: "Sì. Emmanuel Di Pietro, il nostro gestore locale, è raggiungibile per tutta la durata del soggiorno. I suoi contatti vengono comunicati alla conferma della prenotazione." },
        { q: 'Gli animali sono accettati?', a: "I piccoli animali domestici sono accettati. Vi chiediamo di segnalarcelo al momento della prenotazione." },
        { q: 'Le pulizie di fine soggiorno sono incluse?', a: "Sì, le pulizie di fine soggiorno sono incluse nella tariffa. Le pulizie a metà soggiorno sono disponibili su richiesta, a carico dell'ospite." },
      ],
    },
    {
      cat: 'I dintorni',
      items: [
        { q: "C'è un supermercato nelle vicinanze?", a: "Noto (5 km) ha diversi supermercati e un mercato il lunedì mattina. Un secondo mercato si tiene ad Avola il giovedì. A Siracusa (30 km), il mercato del pesce di Ortigia è un'esperienza da non perdere. È possibile ordinare la spesa anche da Noto." },
        { q: 'Quali ristoranti consigliate a Noto?', a: "Contattateci direttamente — siamo lieti di condividere con i nostri ospiti i nostri indirizzi preferiti a Noto e dintorni." },
        { q: "L'auto è assolutamente necessaria?", a: "Sì, l'auto è indispensabile. Non esiste trasporto pubblico fino alla villa, e i borghi, le spiagge e i siti del Val di Noto sono raggiungibili solo in auto. Vedere la pagina Come arrivare." },
      ],
    },
  ],
  de: [
    {
      cat: 'Buchung',
      items: [
        { q: 'Wie buche ich?', a: "Füllen Sie das Kontaktformular mit Ihren Daten, der Gästezahl und Ihren Fragen aus. Wir antworten innerhalb von 24 Stunden mit Verfügbarkeit und Angebot. Die Buchung wird nach Zahlung der Anzahlung bestätigt." },
        { q: 'Was ist der Mindestaufenthalt?', a: "6 Nächte. Die Villa wird samstags bis samstags vermietet, oder ab einem anderen Starttag je nach Verfügbarkeit." },
        { q: 'Wann ist die Villa geöffnet?', a: "Die Saison geht von April bis Oktober. Außerhalb dieser Zeit kontaktieren Sie uns — außergewöhnliche Aufenthalte können je nach Bedingungen möglich sein." },
        { q: 'Gibt es eine Agenturprovision?', a: "Nein. Sie buchen direkt bei den Eigentümern. Keine Plattformprovision, kein Vermittler." },
        { q: 'Wie funktioniert die Zahlung?', a: "Bei Buchung wird eine Anzahlung von 50 % verlangt. Der Restbetrag von 50 % ist am Anreisetag fällig." },
        { q: 'Was sind die Stornierungsbedingungen?', a: "Die Bedingungen sind streng. Bei Stornierung mehr als 60 Tage vor Anreise wird die Anzahlung abzüglich einer Bearbeitungsgebühr erstattet. Innerhalb von 60 Tagen vor Anreise ist die Anzahlung nicht erstattungsfähig." },
      ],
    },
    {
      cat: 'Die Villa',
      items: [
        { q: 'Wie viele Personen können in der Villa schlafen?', a: "Die Villa beherbergt bis zu 9 Gäste in 4 Suiten: Suite Agave (Poolblick), Suite Bougainvillea (Gartenblick), Suite Gelsomino (Gartenblick) und Suite Limone (Innenzimmer). Jede Suite verfügt über ein eigenes Bad und eine Terrasse." },
        { q: 'Gibt es Klimaanlage in allen Suiten?', a: "Ja, alle Suiten sind klimatisiert." },
        { q: 'Ist Bettwäsche inklusive?', a: "Ja. Laken, Badetücher und Poolhandtücher sind alle im Mietpreis enthalten." },
        { q: 'Ist der Pool beheizt?', a: "Nein, der Pool ist nicht beheizt. Er wird mit natürlichem Wasser gespeist und bleibt dank der sizilianischen Sonne von Mai bis Oktober auf einer angenehmen Temperatur." },
        { q: 'Gibt es eine vollständig ausgestattete Küche?', a: "Ja. Die Villa verfügt über eine vollständig ausgestattete Innenküche (Geschirrspüler, Mikrowelle, Espressomaschine, Waschmaschine) sowie eine vollständige Außenküche auf dem Rooftop, einen Holzbackofen, einen Grill und eine Plancha am Pool." },
        { q: 'Gibt es WLAN?', a: "Ja, Hochgeschwindigkeits-WLAN ist in der gesamten Villa inklusive." },
        { q: 'Wie viele Autos können auf dem Gelände parken?', a: "Das Anwesen verfügt über einen gesicherten privaten Parkplatz mit Platz für bis zu 4 Fahrzeuge." },
      ],
    },
    {
      cat: 'Während Ihres Aufenthalts',
      items: [
        { q: 'Wann ist der Check-in?', a: "Die Anreise ist ab 16:00 Uhr möglich. Ein später Check-out oder eine frühe Ankunft kann je nach benachbarten Aufenthalten möglich sein — kontaktieren Sie uns." },
        { q: 'Wann ist der Check-out?', a: "Die Abreise ist vor 10:00 Uhr." },
        { q: 'Gibt es jemanden vor Ort, der bei Bedarf helfen kann?', a: "Ja. Emanuele Di Pietro, unser lokaler Verwalter, ist während Ihres gesamten Aufenthalts erreichbar. Seine Kontaktdaten werden bei Buchungsbestätigung mitgeteilt." },
        { q: 'Sind Haustiere erlaubt?', a: "Kleine Haustiere sind willkommen. Bitte teilen Sie uns dies bei der Buchung mit." },
        { q: 'Ist eine Endreinigung inklusive?', a: "Ja, die Endreinigung ist im Mietpreis enthalten. Eine Zwischenreinigung ist auf Anfrage möglich, auf Kosten des Gastes." },
      ],
    },
    {
      cat: 'Die Umgebung',
      items: [
        { q: 'Gibt es einen Supermarkt in der Nähe?', a: "Noto (5 km) hat mehrere Supermärkte und einen Markt, montags. Ein weiterer Markt findet donnerstags in Avola statt. In Syrakus (30 km) ist der Fischmarkt von Ortigia ein unvergessliches Erlebnis. Lebensmittel können auch aus Noto bestellt werden." },
        { q: 'Welche Restaurants empfehlen Sie in Noto?', a: "Kontaktieren Sie uns direkt — wir teilen gerne unsere persönlichen Lieblingsadressen in Noto und Umgebung mit unseren Gästen." },
        { q: 'Ist ein Auto wirklich notwendig?', a: "Ja, ein Auto ist unverzichtbar. Es gibt keinen öffentlichen Nahverkehr zur Villa, und die Dörfer, Strände und Sehenswürdigkeiten des Val di Noto sind nur mit dem Auto erreichbar. Siehe Seite Anreise." },
      ],
    },
  ],
}

const H = {
  fr: { breadcrumb: 'FAQ', h1: 'Questions fréquentes', intro: "Tout ce qu'il faut savoir avant de réserver — de la logistique d'arrivée aux détails du quotidien.", link_conditions: 'Conditions de réservation →', link_acces: 'Comment venir →' },
  en: { breadcrumb: 'FAQ', h1: 'Frequently asked questions', intro: "Everything you need to know before booking — from arrival logistics to day-to-day details.", link_conditions: 'Booking conditions →', link_acces: 'Getting here →' },
  it: { breadcrumb: 'FAQ', h1: 'Domande frequenti', intro: "Tutto quello che dovete sapere prima di prenotare — dalla logistica dell'arrivo ai dettagli quotidiani.", link_conditions: 'Condizioni di prenotazione →', link_acces: 'Come arrivare →' },
  de: { breadcrumb: 'FAQ', h1: 'Häufig gestellte Fragen', intro: "Alles Wissenswerte vor der Buchung — von der Anreise-Logistik bis zu den täglichen Details.", link_conditions: 'Buchungsbedingungen →', link_acces: 'Anreise →' },
}

export default function FaqPage({ params }: { params: { locale: string } }) {
  const locale = (LOCALES.includes(params.locale as Lang) ? params.locale : 'fr') as Lang
  const h = H[locale]
  const faqs = FAQS[locale]
  const condHref = locale === 'fr' ? '/conditions-de-reservation' : locale === 'en' ? '/booking-conditions' : locale === 'de' ? '/buchungsbedingungen' : '/condizioni-di-prenotazione'

  const homeLabel = locale === 'fr' ? 'Accueil' : locale === 'de' ? 'Startseite' : 'Home'
  const allFaqs = faqs.flatMap(cat => cat.items.map(item => ({ question: item.q, answer: item.a })))
  return (
    <>
      <PageTracker page="faq" lang={locale} />
      <JsonLd data={[
        getBreadcrumbSchema([
          { name: homeLabel, item: `${BASE}/${locale}` },
          { name: h.breadcrumb, item: `${BASE}/${locale}/faq` },
        ]),
        getFaqPageSchema(allFaqs),
      ]} />
      <PageLayout lang={locale} page="faq" breadcrumb={h.breadcrumb}>

      <div className="mb-14">
        <p className="section-subtitle">FAQ</p>
        <h1 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight mb-6">{h.h1}</h1>
        <div className="gold-divider" />
        <p className="font-sans text-muted text-base leading-relaxed max-w-2xl">{h.intro}</p>
      </div>

      <div className="space-y-12 mb-14">
        {faqs.map(cat => (
          <section key={cat.cat}>
            <h2 className="font-serif text-xl text-charcoal mb-1 border-b border-gold/30 pb-3">{cat.cat}</h2>
            <div className="divide-y divide-gold/15">
              {cat.items.map(item => (
                <div key={item.q} className="py-5 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-3 md:gap-8">
                  <p className="font-sans text-sm font-medium text-charcoal">{item.q}</p>
                  <p className="font-sans text-sm text-muted leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        <Link href={condHref} className="font-sans text-xs tracking-widest uppercase px-6 py-3 border border-gold text-gold-text hover:bg-gold hover:text-white transition-all duration-300">{h.link_conditions}</Link>
        <Link href={pageUrl('acces', locale)} className="font-sans text-xs tracking-widest uppercase px-6 py-3 border border-navy text-navy hover:bg-navy hover:text-white transition-all duration-300">{h.link_acces}</Link>
      </div>

    </PageLayout>
    </>
  )
}
