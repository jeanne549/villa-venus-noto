import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout from '@/components/PageLayout'
import type { Lang } from '@/lib/i18n'
import { hasPlaceholders } from '@/lib/placeholder'

const BASE = 'https://www.villavenusnoto.com'
const LOCALES: Lang[] = ['fr', 'en', 'it']

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }))
}

const META = {
  fr: { title: 'FAQ — Tout savoir avant de réserver Villa Vénus Noto', description: 'Paiement, annulation, animaux, climatisation, linge, check-in, piscine, restauration à proximité. Toutes les réponses pour réserver Villa Vénus Noto en toute confiance.' },
  en: { title: 'FAQ — Everything to Know Before Booking Villa Vénus Noto', description: 'Payment, cancellation, pets, air conditioning, linen, check-in times, pool, nearby restaurants. Full answers for booking Villa Vénus Noto with confidence.' },
  it: { title: 'FAQ — Tutto da sapere prima di prenotare Villa Vénus Noto', description: 'Pagamento, cancellazione, animali, aria condizionata, biancheria, check-in, piscina, ristoranti vicini. Risposte complete per prenotare Villa Vénus Noto con fiducia.' },
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Lang
  if (!META[locale]) return {}
  const { title, description } = META[locale]
  const robots = hasPlaceholders(FAQS[locale]) ? { index: false, follow: true } : { index: true, follow: true }
  return {
    title, description,
    robots,
    alternates: { canonical: `${BASE}/${locale}/faq`, languages: { fr: `${BASE}/fr/faq`, en: `${BASE}/en/faq`, it: `${BASE}/it/faq`, 'x-default': `${BASE}/fr/faq` } },
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
        { q: "Comment se passe le paiement ?", a: "Un acompte est demandé à la réservation, le solde est dû avant l'arrivée. Les détails (pourcentages et délais) sont précisés dans le devis. [À confirmer avec les propriétaires]" },
        { q: "Quelle est la politique d'annulation ?", a: "[À confirmer avec les propriétaires] — nous vous invitons à lire nos conditions de réservation ou à nous contacter directement." },
      ],
    },
    {
      cat: 'La villa',
      items: [
        { q: 'Combien de personnes peuvent dormir à la villa ?', a: "La villa accueille jusqu'à 9 personnes en 4 suites : Suite Agave (vue piscine), Suite Bougainvillea (vue jardin), Suite Gelsomino (vue jardin) et Suite Limone (chambre intérieure). Chaque suite dispose d'une salle de bain privée et d'une terrasse." },
        { q: 'La climatisation est-elle présente dans toutes les suites ?', a: "Oui, toutes les suites sont climatisées. [À confirmer que la climatisation est bien dans les 4 suites]" },
        { q: 'Le linge de maison est-il fourni ?', a: "Oui. Draps, serviettes de bain et serviettes de piscine sont inclus dans la location." },
        { q: 'La piscine est-elle chauffée ?', a: "[À confirmer] — Contactez-nous pour connaître les conditions exactes." },
        { q: 'Y a-t-il une cuisine équipée ?', a: "Oui. La villa dispose d'une cuisine intérieure équipée ainsi qu'une cuisine extérieure complète sur le rooftop, un four à bois, un barbecue et une plancha au bord de la piscine." },
        { q: 'Y a-t-il du Wi-Fi ?', a: "Oui, le Wi-Fi haut débit est inclus dans toute la villa." },
        { q: 'Combien de voitures peut-on garer sur le domaine ?', a: "[À confirmer] — La villa dispose d'un parking privatif." },
      ],
    },
    {
      cat: 'Pendant le séjour',
      items: [
        { q: 'À quelle heure est le check-in ?', a: "L'arrivée se fait à partir de 16h00. Un départ tardif ou une arrivée anticipée peut être envisagé selon les séjours adjacents — contactez-nous." },
        { q: 'À quelle heure est le check-out ?', a: "Le départ est avant 10h00." },
        { q: "Y a-t-il quelqu'un sur place en cas de besoin ?", a: "[À confirmer] — Les propriétaires ou un gestionnaire local restent joignables pendant tout le séjour." },
        { q: 'Les animaux sont-ils acceptés ?', a: "[À confirmer avec les propriétaires]" },
        { q: 'Peut-on fumer dans la villa ?', a: "[À confirmer] — La villa est vraisemblablement non-fumeurs à l'intérieur." },
        { q: 'Y a-t-il un ménage de fin de séjour ?', a: "Le ménage de fin de séjour est inclus. Pour un ménage en cours de séjour, voir la page Services." },
      ],
    },
    {
      cat: 'Les environs',
      items: [
        { q: 'Y a-t-il un supermarché ou une épicerie à proximité ?', a: "[À confirmer] — Noto (5 km) dispose de plusieurs supermarchés et d'un marché hebdomadaire. Des commerces de proximité pourraient être plus proches — à préciser." },
        { q: 'Peut-on se faire livrer des courses à la villa ?', a: "[À confirmer] — Des services de livraison sont disponibles depuis Noto selon les prestataires locaux." },
        { q: 'Quels restaurants recommandez-vous à Noto ?', a: "[À compléter par les propriétaires avec leurs adresses préférées à Noto et dans les environs]" },
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
        { q: 'How does payment work?', a: "A deposit is required at booking; the balance is due before arrival. Details (percentages and deadlines) are specified in the quote. [To confirm with owners]" },
        { q: 'What is the cancellation policy?', a: "[To confirm with owners] — please read our booking conditions or contact us directly." },
      ],
    },
    {
      cat: 'The villa',
      items: [
        { q: 'How many people can sleep at the villa?', a: "The villa sleeps up to 9 guests in 4 suites: Suite Agave (pool view), Suite Bougainvillea (garden view), Suite Gelsomino (garden view) and Suite Limone (interior room). Each suite has a private bathroom and terrace." },
        { q: 'Is there air conditioning in all suites?', a: "Yes, all suites are air-conditioned. [To confirm for all 4 suites]" },
        { q: 'Is bed linen provided?', a: "Yes. Sheets, bath towels and pool towels are all included in the rental." },
        { q: 'Is the pool heated?', a: "[To confirm] — Contact us for exact conditions." },
        { q: 'Is there a fully equipped kitchen?', a: "Yes. The villa has an indoor equipped kitchen plus a full outdoor kitchen on the rooftop, a wood-fired oven, a BBQ and a plancha by the pool." },
        { q: 'Is there Wi-Fi?', a: "Yes, high-speed Wi-Fi is included throughout the villa." },
        { q: 'How many cars can park on the property?', a: "[To confirm] — The villa has a private car park." },
      ],
    },
    {
      cat: 'During your stay',
      items: [
        { q: 'What time is check-in?', a: "Arrival is from 4:00 PM. A late check-out or early arrival may be possible depending on adjacent stays — contact us." },
        { q: 'What time is check-out?', a: "Departure is before 10:00 AM." },
        { q: 'Is there someone available on site if needed?', a: "[To confirm] — The owners or a local property manager are reachable throughout your stay." },
        { q: 'Are pets allowed?', a: "[To confirm with owners]" },
        { q: 'Is smoking allowed?', a: "[To confirm] — The villa is most likely non-smoking indoors." },
        { q: 'Is an end-of-stay clean included?', a: "Yes, the end-of-stay clean is included. For mid-stay cleaning, see the Services page." },
      ],
    },
    {
      cat: 'The surroundings',
      items: [
        { q: 'Is there a supermarket or grocery nearby?', a: "[To confirm] — Noto (5 km) has several supermarkets and a weekly market. Closer shops may exist — to be specified." },
        { q: 'Can groceries be delivered to the villa?', a: "[To confirm] — Delivery services from Noto may be available depending on local providers." },
        { q: 'Which restaurants do you recommend in Noto?', a: "[To be completed by the owners with their favourite addresses in Noto and the surrounding area]" },
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
        { q: 'Come funziona il pagamento?', a: "Una caparra è richiesta alla prenotazione; il saldo è dovuto prima dell'arrivo. I dettagli (percentuali e scadenze) sono specificati nel preventivo. [Da confermare con i proprietari]" },
        { q: 'Qual è la politica di cancellazione?', a: "[Da confermare con i proprietari] — vi invitiamo a leggere le nostre condizioni di prenotazione o a contattarci direttamente." },
      ],
    },
    {
      cat: 'La villa',
      items: [
        { q: 'Quante persone possono dormire alla villa?', a: "La villa ospita fino a 9 persone in 4 suite: Suite Agave (vista piscina), Suite Bougainvillea (vista giardino), Suite Gelsomino (vista giardino) e Suite Limone (camera interna). Ogni suite dispone di bagno privato e terrazza." },
        { q: "C'è l'aria condizionata in tutte le suite?", a: "Sì, tutte le suite sono climatizzate. [Da confermare per tutte le 4 suite]" },
        { q: 'La biancheria è fornita?', a: "Sì. Lenzuola, asciugamani da bagno e asciugamani da piscina sono inclusi nel noleggio." },
        { q: 'La piscina è riscaldata?', a: "[Da confermare] — Contattateci per le condizioni esatte." },
        { q: "C'è una cucina attrezzata?", a: "Sì. La villa dispone di una cucina interna attrezzata e di una cucina esterna completa sul rooftop, un forno a legna, un barbecue e una plancha a bordo piscina." },
        { q: "C'è il Wi-Fi?", a: "Sì, il Wi-Fi ad alta velocità è incluso in tutta la villa." },
        { q: 'Quante auto si possono parcheggiare?', a: "[Da confermare] — La villa dispone di un parcheggio privato." },
      ],
    },
    {
      cat: 'Durante il soggiorno',
      items: [
        { q: "A che ora è il check-in?", a: "L'arrivo è a partire dalle 16:00. Un check-out tardivo o un arrivo anticipato può essere previsto a seconda dei soggiorni adiacenti — contattateci." },
        { q: 'A che ora è il check-out?', a: 'La partenza è prima delle 10:00.' },
        { q: 'C\'è qualcuno disponibile in loco in caso di necessità?', a: "[Da confermare] — I proprietari o un gestore locale sono raggiungibili durante tutto il soggiorno." },
        { q: 'Gli animali sono accettati?', a: "[Da confermare con i proprietari]" },
        { q: 'Si può fumare?', a: "[Da confermare] — La villa è probabilmente non fumatori all'interno." },
        { q: 'Le pulizie di fine soggiorno sono incluse?', a: "Sì, le pulizie di fine soggiorno sono incluse. Per le pulizie a metà soggiorno, vedere la pagina Servizi." },
      ],
    },
    {
      cat: 'I dintorni',
      items: [
        { q: "C'è un supermercato o un negozio di alimentari nelle vicinanze?", a: "[Da confermare] — Noto (5 km) ha diversi supermercati e un mercato settimanale. Potrebbe esserci qualcosa di più vicino — da precisare." },
        { q: 'Si può ricevere la spesa a domicilio alla villa?', a: "[Da confermare] — Servizi di consegna da Noto possono essere disponibili in base ai fornitori locali." },
        { q: 'Quali ristoranti consigliate a Noto?', a: "[Da completare dai proprietari con i loro indirizzi preferiti a Noto e dintorni]" },
        { q: "L'auto è assolutamente necessaria?", a: "Sì, l'auto è indispensabile. Non esiste trasporto pubblico fino alla villa, e i borghi, le spiagge e i siti del Val di Noto sono raggiungibili solo in auto. Vedere la pagina Come arrivare." },
      ],
    },
  ],
}

const H = {
  fr: { breadcrumb: 'FAQ', h1: 'Questions fréquentes', intro: "Tout ce qu'il faut savoir avant de réserver — de la logistique d'arrivée aux détails du quotidien. Les points marqués [À confirmer] sont en attente de validation par les propriétaires et seront mis à jour prochainement.", link_conditions: 'Conditions de réservation →', link_acces: 'Comment venir →' },
  en: { breadcrumb: 'FAQ', h1: 'Frequently asked questions', intro: "Everything you need to know before booking — from arrival logistics to day-to-day details. Points marked [To confirm] are awaiting owner confirmation and will be updated shortly.", link_conditions: 'Booking conditions →', link_acces: 'Getting here →' },
  it: { breadcrumb: 'FAQ', h1: 'Domande frequenti', intro: "Tutto quello che dovete sapere prima di prenotare — dalla logistica dell'arrivo ai dettagli quotidiani. I punti contrassegnati [Da confermare] sono in attesa di conferma dai proprietari e saranno aggiornati a breve.", link_conditions: 'Condizioni di prenotazione →', link_acces: 'Come arrivare →' },
}

export default function FaqPage({ params }: { params: { locale: string } }) {
  const locale = (LOCALES.includes(params.locale as Lang) ? params.locale : 'fr') as Lang
  const h = H[locale]
  const faqs = FAQS[locale]
  const condHref = locale === 'fr' ? '/conditions-de-reservation' : locale === 'en' ? '/booking-conditions' : '/condizioni-di-prenotazione'

  return (
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
        <Link href={condHref} className="font-sans text-xs tracking-widest uppercase px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-white transition-all duration-300">{h.link_conditions}</Link>
        <Link href={`/${locale}/acces`} className="font-sans text-xs tracking-widest uppercase px-6 py-3 border border-navy text-navy hover:bg-navy hover:text-white transition-all duration-300">{h.link_acces}</Link>
      </div>

    </PageLayout>
  )
}
