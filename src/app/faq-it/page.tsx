import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import { getFaqPageSchema, getBreadcrumbSchema, getOrganizationSchema } from '@/lib/structured-data'

const BASE = 'https://www.villavenusnoto.com'

// Pagina legacy — sostituita da /it/faq. Noindex per evitare contenuti duplicati.
export const metadata: Metadata = {
  title: 'FAQ — Domande frequenti — Villa Vénus Noto',
  description: 'Tutte le risposte alle vostre domande sul noleggio di Villa Vénus Noto: tariffe, pagamento, animali, piscina, aeroporto, distanze.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: `${BASE}/it/faq`,
  },
}

const SCHEMA_FAQS = [
  {
    question: 'Cosa comprende la tariffa di noleggio?',
    answer: 'La tariffa comprende l\'uso esclusivo della villa (piscina privata 14 × 7 m, rooftop panoramico, terrazze, giardini, forno a legna), biancheria da letto e asciugamani, Wi-Fi ad alta velocità, parcheggio privato e pulizie di fine soggiorno. La tassa di soggiorno comunale è a parte (importo comunicato alla prenotazione).',
  },
  {
    question: "Cos'è la tassa di soggiorno e come si calcola?",
    answer: 'La tassa di soggiorno è dovuta al comune di Noto per ogni soggiorno, fino a un massimo di 6 notti consecutive. Sono esenti i bambini sotto i 14 anni e le persone sopra i 75 anni. Viene pagata direttamente alla villa all\'arrivo. L\'importo esatto verrà comunicato alla conferma della prenotazione.',
  },
  {
    question: 'Quali sono le modalità di prenotazione e pagamento?',
    answer: 'Un acconto del 30% dell\'importo totale è dovuto entro 72 ore dalla conferma della prenotazione. Il saldo del 70% viene pagato il giorno dell\'arrivo, prima della consegna delle chiavi. I metodi di pagamento accettati sono specificati alla conferma.',
  },
  {
    question: 'Qual è la politica di cancellazione?',
    answer: 'Cancellazione più di 30 giorni prima dell\'arrivo: l\'acconto del 30% viene rimborsato integralmente. Cancellazione 30 giorni o meno prima dell\'arrivo: l\'acconto viene trattenuto e non è rimborsabile. Cancellazione dopo il pagamento del saldo: nessun rimborso.',
  },
  {
    question: 'Quali sono gli orari di check-in e check-out?',
    answer: 'Il check-in è possibile dalle 16:00. Il check-out deve essere effettuato entro le 10:00. Qualsiasi modifica agli orari deve essere concordata preventivamente con l\'agente locale.',
  },
  {
    question: 'Qual è la durata minima del soggiorno?',
    answer: 'La durata minima è di 6 notti. La villa è disponibile per affitti stagionali, da aprile a ottobre.',
  },
  {
    question: 'La villa è adatta ai bambini? Ci sono misure di sicurezza intorno alla piscina?',
    answer: 'La villa accoglie le famiglie con bambini. La piscina (14 × 7 m) è uno spazio di piacere: la sorveglianza dei bambini è in ogni momento responsabilità degli adulti presenti.',
  },
  {
    question: 'Sono accettati gli animali domestici?',
    answer: 'I piccoli animali domestici sono accettati previo accordo. Non sono ammessi in piscina e non devono essere lasciati soli nella villa.',
  },
  {
    question: 'Le pulizie sono incluse nella tariffa?',
    answer: 'Sì, le pulizie di fine soggiorno sono incluse nella tariffa di noleggio.',
  },
  {
    question: "Qual è l'aeroporto più vicino? È necessaria un'auto?",
    answer: "L'aeroporto più vicino è Comiso (CIY), a 55 km (circa 50 minuti in auto). L'aeroporto di Catania-Fontanarossa (CTA) è a 90 km (circa 1h20). Il noleggio auto è indispensabile per esplorare liberamente la regione.",
  },
  {
    question: 'Quali sono le distanze dalla villa?',
    answer: 'Noto (centro storico barocco, UNESCO): 5 km · 10 min. Spiagge di Vendicari (riserva naturale): 8 km · 12 min. Marzamemi (villaggio di pescatori): 20 km · 22 min. Siracusa (città antica): 30 km · 35 min. Ragusa Ibla (barocco siciliano): 45 km · 55 min.',
  },
]

const breadcrumb = getBreadcrumbSchema([
  { name: 'Villa Vénus Noto', item: `${BASE}/it` },
  { name: 'Domande frequenti', item: `${BASE}/faq-it` },
])

export default function FaqIt() {
  return (
    <>
      <JsonLd data={[getFaqPageSchema(SCHEMA_FAQS), breadcrumb, getOrganizationSchema()]} />

      <div className="min-h-screen bg-cream">
        <header className="bg-navy text-white px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/it" className="font-display text-lg tracking-[0.2em] uppercase text-white hover:text-gold transition-colors">
              Villa Vénus Noto
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/faq" className="font-sans text-xs text-white/50 hover:text-white tracking-widest uppercase transition-colors">FR</Link>
              <Link href="/faq-en" className="font-sans text-xs text-white/50 hover:text-white tracking-widest uppercase transition-colors">EN</Link>
              <Link href="/it" className="font-sans text-xs text-white/60 hover:text-white tracking-widest uppercase transition-colors">← Torna al sito</Link>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-4">Domande frequenti</p>
          <h1 className="font-serif text-4xl text-charcoal mb-3">FAQ — Villa Vénus Noto</h1>
          <div className="w-12 h-px bg-gold mb-10" />

          <div className="space-y-4">

            <FaqItem
              question="Cosa comprende la tariffa di noleggio?"
              answer={
                <p>La tariffa comprende l&apos;uso esclusivo della villa — piscina privata 14 × 7 m, rooftop panoramico, terrazze, giardini, forno a legna — nonché biancheria da letto e asciugamani, Wi-Fi ad alta velocità, parcheggio privato e <strong>pulizie di fine soggiorno</strong>. La tassa di soggiorno comunale è a parte (importo comunicato alla prenotazione).</p>
              }
            />

            <FaqItem
              question="Cos'è la tassa di soggiorno e come si calcola?"
              answer={
                <p>La tassa di soggiorno è dovuta al comune di Noto per ogni soggiorno, fino a un massimo di <strong>6 notti consecutive</strong>. Sono esenti i bambini sotto i 14 anni e le persone sopra i 75 anni. Viene pagata direttamente alla villa all&apos;arrivo, in aggiunta al canone. L&apos;importo esatto verrà comunicato alla conferma della prenotazione.</p>
              }
            />

            <FaqItem
              question="Quali sono le modalità di prenotazione e pagamento?"
              answer={
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong>Acconto del 30%</strong> dovuto entro 72 ore dalla conferma della prenotazione.</li>
                  <li><strong>Saldo del 70%</strong> il giorno dell&apos;arrivo, prima della consegna delle chiavi.</li>
                  <li>I metodi di pagamento accettati vengono specificati alla conferma.</li>
                </ul>
              }
            />

            <FaqItem
              question="Qual è la politica di cancellazione?"
              answer={
                <ul className="space-y-2 list-disc list-inside">
                  <li>Cancellazione <strong>più di 30 giorni</strong> prima dell&apos;arrivo: acconto del 30% rimborsato integralmente.</li>
                  <li>Cancellazione <strong>30 giorni o meno</strong> prima dell&apos;arrivo: acconto trattenuto, non rimborsabile.</li>
                  <li>Cancellazione dopo il pagamento del saldo: nessun rimborso.</li>
                </ul>
              }
            />

            <FaqItem
              question="Quali sono gli orari di check-in e check-out?"
              answer={
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong>Check-in</strong>: dalle 16:00</li>
                  <li><strong>Check-out</strong>: entro le 10:00</li>
                  <li className="text-sm text-muted">Qualsiasi modifica agli orari deve essere concordata preventivamente con l&apos;agente locale.</li>
                </ul>
              }
            />

            <FaqItem
              question="Qual è la durata minima del soggiorno?"
              answer={
                <p>La durata minima è di <strong>6 notti</strong>. La villa è disponibile per affitti stagionali, da aprile a ottobre.</p>
              }
            />

            <FaqItem
              question="La villa è adatta ai bambini? Ci sono misure di sicurezza intorno alla piscina?"
              answer={
                <p>La villa accoglie le famiglie con bambini. La piscina (14 × 7 m) è uno spazio di piacere: la sorveglianza dei bambini è in ogni momento responsabilità degli adulti responsabili presenti in loco.</p>
              }
            />

            <FaqItem
              question="Sono accettati gli animali domestici?"
              answer={
                <p>I <strong>piccoli animali domestici sono accettati</strong> previo accordo. Non sono ammessi in piscina e non devono essere lasciati soli nella villa.</p>
              }
            />

            <FaqItem
              question="Le pulizie sono incluse nella tariffa?"
              answer={
                <p>Sì, le <strong>pulizie di fine soggiorno sono incluse</strong> nella tariffa di noleggio. Gli ospiti sono invitati a lasciare la villa in condizioni ragionevoli di pulizia alla partenza.</p>
              }
            />

            <FaqItem
              question="C'è l'aria condizionata nella villa?"
              answer={
                <Confirm>Da confermare con il proprietario: aria condizionata in tutte le suite e/o negli spazi comuni?</Confirm>
              }
              needsConfirm
            />

            <FaqItem
              question="Qual è l'aeroporto più vicino? È necessaria un'auto?"
              answer={
                <div className="space-y-2">
                  <ul className="space-y-1 list-disc list-inside">
                    <li><strong>Comiso (CIY)</strong>: 55 km · circa 50 min — aeroporto più vicino</li>
                    <li><strong>Catania-Fontanarossa (CTA)</strong>: 90 km · circa 1h20</li>
                  </ul>
                  <p className="text-sm">Il noleggio auto è indispensabile per esplorare liberamente la regione. Agenzie di noleggio sono disponibili in entrambi gli aeroporti.</p>
                </div>
              }
            />

            <FaqItem
              question="Quali sono le distanze dalla villa?"
              answer={
                <ul className="space-y-1 list-disc list-inside">
                  <li>Noto (centro storico barocco, UNESCO): <strong>5 km · 10 min</strong></li>
                  <li>Spiagge di Vendicari (riserva naturale): <strong>8 km · 12 min</strong></li>
                  <li>Marzamemi (villaggio di pescatori): <strong>20 km · 22 min</strong></li>
                  <li>Siracusa (città antica): <strong>30 km · 35 min</strong></li>
                  <li>Ragusa Ibla (barocco siciliano): <strong>45 km · 55 min</strong></li>
                </ul>
              }
            />

            <FaqItem
              question="Dove fare la spesa? Ci sono ristoranti consigliati nelle vicinanze?"
              answer={
                <Confirm>Da completare dal proprietario: supermercati più vicini, mercati locali, ristoranti consigliati a Noto e nei dintorni.</Confirm>
              }
              needsConfirm
            />

          </div>

          <div className="mt-16 p-8 bg-navy text-white">
            <p className="font-display text-xl mb-2">Una domanda senza risposta qui?</p>
            <p className="font-sans text-white/70 text-sm mb-4">Contattateci direttamente — rispondiamo entro 24 ore.</p>
            <Link href="/it#contact" className="inline-block font-sans text-xs tracking-[0.2em] uppercase border border-gold text-gold px-6 py-3 hover:bg-gold hover:text-navy transition-colors">
              Contattaci
            </Link>
          </div>
        </main>

        <footer className="border-t border-gray-200 py-8 px-6 text-center">
          <p className="font-sans text-xs text-muted">
            © {new Date().getFullYear()} Villa Vénus Noto ·{' '}
            <Link href="/note-legali" className="hover:text-gold transition-colors">Note legali</Link> ·{' '}
            <Link href="/condizioni-di-prenotazione" className="hover:text-gold transition-colors">Condizioni</Link> ·{' '}
            <Link href="/faq" className="hover:text-gold transition-colors">FAQ FR</Link> ·{' '}
            <Link href="/faq-en" className="hover:text-gold transition-colors">FAQ EN</Link>
          </p>
        </footer>
      </div>
    </>
  )
}

function FaqItem({
  question,
  answer,
  needsConfirm = false,
}: {
  question: string
  answer: React.ReactNode
  needsConfirm?: boolean
}) {
  return (
    <details className="group border border-sand bg-white" open>
      <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none select-none">
        <span className={`font-serif text-lg pr-4 ${needsConfirm ? 'text-amber-700' : 'text-charcoal'}`}>
          {needsConfirm && <span className="inline-block mr-2 text-amber-500">⚠</span>}
          {question}
        </span>
        <span className="text-gold text-xl font-light group-open:rotate-45 transition-transform shrink-0">+</span>
      </summary>
      <div className="px-6 pb-6 pt-2 font-sans text-charcoal/80 leading-relaxed text-sm border-t border-sand">
        {answer}
      </div>
    </details>
  )
}

function Confirm({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded px-4 py-3">
      <span className="text-amber-500 mt-0.5 shrink-0">⚠</span>
      <p className="text-amber-800 text-sm font-medium">{children}</p>
    </div>
  )
}
