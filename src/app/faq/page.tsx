import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import { getFaqPageSchema, getBreadcrumbSchema, getOrganizationSchema } from '@/lib/structured-data'

const BASE = 'https://www.villavenusnoto.com'

// Page legacy — supersédée par /fr/faq. Noindex pour éviter le doublon.
export const metadata: Metadata = {
  title: 'FAQ — Questions fréquentes — Villa Vénus Noto',
  description: 'Toutes les réponses à vos questions sur la location de Villa Vénus Noto : tarifs, paiement, animaux, piscine, aéroport, distances.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: `${BASE}/fr/faq`,
  },
}

// Réponses plain-text pour le schéma FAQPage (sans balises HTML)
const SCHEMA_FAQS = [
  {
    question: 'Que comprend le tarif de location ?',
    answer: "Le tarif comprend l'usage exclusif de la villa (piscine privée 14 × 7 m, rooftop panoramique, terrasses, jardins, four à bois), le linge de lit et les serviettes, le Wi-Fi haut débit, le parking privé et le ménage de fin de séjour. La taxe de séjour communale est en supplément (montant communiqué à la réservation).",
  },
  {
    question: 'Qu\'est-ce que la taxe de séjour et comment est-elle calculée ?',
    answer: "La taxe de séjour est due à la commune de Noto pour chaque séjour, dans la limite de 6 nuits consécutives. Sont exonérés : les enfants de moins de 14 ans et les personnes de plus de 75 ans. Elle est réglée directement à la villa à l'arrivée. Le montant exact vous sera communiqué lors de la confirmation de réservation.",
  },
  {
    question: 'Quelles sont les modalités de réservation et de paiement ?',
    answer: "Un acompte de 50 % du montant total est dû dans les 72 heures suivant la confirmation de réservation. Le solde de 50 % est réglé le jour de l'arrivée, avant la remise des clés. Les modes de paiement acceptés sont précisés lors de la confirmation.",
  },
  {
    question: "Quelle est la politique d'annulation ?",
    answer: "Annulation plus de 60 jours avant l'arrivée : l'acompte est remboursé, frais de dossier déduits. Annulation 60 jours ou moins avant l'arrivée : l'acompte est conservé et non remboursable. Annulation après règlement du solde : aucun remboursement.",
  },
  {
    question: "Quels sont les horaires d'arrivée et de départ ?",
    answer: "L'arrivée (check-in) est possible à partir de 16h00. Le départ (check-out) doit s'effectuer avant 10h00. Tout aménagement d'horaire doit être convenu au préalable avec le mandataire local.",
  },
  {
    question: 'Quelle est la durée minimum de séjour ?',
    answer: 'La durée minimum est de 6 nuits. La villa est disponible à la location de saison, d\'avril à octobre.',
  },
  {
    question: 'La villa est-elle adaptée aux enfants ? Y a-t-il des mesures de sécurité autour de la piscine ?',
    answer: "La villa accueille les familles avec enfants. La piscine (14 × 7 m) est un espace de plaisir : la surveillance des enfants incombe en permanence aux adultes responsables présents sur les lieux.",
  },
  {
    question: 'Les animaux de compagnie sont-ils acceptés ?',
    answer: "Les petits animaux de compagnie sont acceptés sous réserve d'accord préalable. Ils ne sont pas autorisés dans la piscine et ne doivent pas être laissés seuls dans la villa.",
  },
  {
    question: 'Le ménage est-il inclus dans le tarif ?',
    answer: 'Oui, le ménage de fin de séjour est inclus dans le tarif de location.',
  },
  {
    question: 'Quel est l\'aéroport le plus proche ?',
    answer: "L'aéroport le plus proche est Comiso (CIY), à 55 km (environ 50 minutes en voiture). L'aéroport de Catane-Fontanarossa (CTA) est à 90 km (environ 1h20). La location de voiture est recommandée pour explorer la région.",
  },
  {
    question: 'Quelles sont les distances depuis la villa ?',
    answer: 'Noto (centre historique baroque, UNESCO) : 5 km · 10 min. Plages de Vendicari (réserve naturelle) : 8 km · 12 min. Marzamemi (village de pêcheurs) : 20 km · 22 min. Syracuse (ville antique) : 30 km · 35 min. Ragusa Ibla (baroque sicilien) : 45 km · 55 min.',
  },
]

const breadcrumb = getBreadcrumbSchema([
  { name: 'Villa Vénus Noto', item: `${BASE}/fr` },
  { name: 'FAQ', item: `${BASE}/faq` },
])

export default function FaqFr() {
  return (
    <>
      <JsonLd data={[getFaqPageSchema(SCHEMA_FAQS), breadcrumb, getOrganizationSchema()]} />

      <div className="min-h-screen bg-cream">
        <header className="bg-navy text-white px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/fr" className="font-display text-lg tracking-[0.2em] uppercase text-white hover:text-gold transition-colors">
              Villa Vénus Noto
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/faq-en" className="font-sans text-xs text-white/50 hover:text-white tracking-widest uppercase transition-colors">EN</Link>
              <Link href="/faq-it" className="font-sans text-xs text-white/50 hover:text-white tracking-widest uppercase transition-colors">IT</Link>
              <Link href="/fr" className="font-sans text-xs text-white/60 hover:text-white tracking-widest uppercase transition-colors">← Retour au site</Link>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold-text mb-4">Questions fréquentes</p>
          <h1 className="font-serif text-4xl text-charcoal mb-3">FAQ — Villa Vénus Noto</h1>
          <div className="w-12 h-px bg-gold mb-10" />

          <div className="space-y-4">

            <FaqItem
              question="Que comprend le tarif de location ?"
              answer={
                <p>Le tarif comprend l'usage exclusif de la villa — piscine privée 14 × 7 m, rooftop panoramique, terrasses, jardins, four à bois — ainsi que le linge de lit et les serviettes, le Wi-Fi haut débit, le parking privé et le <strong>ménage de fin de séjour</strong>. La taxe de séjour communale est en supplément (montant communiqué à la réservation).</p>
              }
            />

            <FaqItem
              question="Qu'est-ce que la taxe de séjour et comment est-elle calculée ?"
              answer={
                <p>La taxe de séjour est due à la commune de Noto pour chaque séjour, dans la limite de <strong>6 nuits consécutives</strong>. Sont exonérés : les enfants de moins de 14 ans et les personnes de plus de 75 ans. Elle est réglée directement à la villa à l'arrivée, en supplément du loyer. Le montant exact vous sera communiqué lors de la confirmation de réservation.</p>
              }
            />

            <FaqItem
              question="Quelles sont les modalités de réservation et de paiement ?"
              answer={
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong>Acompte de 50 %</strong> dû dans les 72 h suivant la confirmation de réservation.</li>
                  <li><strong>Solde de 50 %</strong> réglé le jour de l'arrivée, avant la remise des clés.</li>
                  <li>Les modes de paiement acceptés sont précisés lors de la confirmation.</li>
                </ul>
              }
            />

            <FaqItem
              question="Quelle est la politique d'annulation ?"
              answer={
                <ul className="space-y-2 list-disc list-inside">
                  <li>Annulation <strong>plus de 60 jours</strong> avant l'arrivée : acompte remboursé, frais de dossier déduits.</li>
                  <li>Annulation <strong>60 jours ou moins</strong> avant l'arrivée : acompte conservé, non remboursable.</li>
                  <li>Annulation après règlement du solde : aucun remboursement.</li>
                </ul>
              }
            />

            <FaqItem
              question="Quels sont les horaires d'arrivée et de départ ?"
              answer={
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong>Check-in</strong> : à partir de 16h00</li>
                  <li><strong>Check-out</strong> : avant 10h00</li>
                  <li className="text-sm text-muted">Tout aménagement d'horaire doit être convenu au préalable avec le mandataire local.</li>
                </ul>
              }
            />

            <FaqItem
              question="Quelle est la durée minimum de séjour ?"
              answer={
                <p>La durée minimum est de <strong>6 nuits</strong>. La villa est disponible à la location de saison, d'avril à octobre.</p>
              }
            />

            <FaqItem
              question="La villa est-elle adaptée aux enfants ? Y a-t-il des mesures de sécurité autour de la piscine ?"
              answer={
                <div className="space-y-2">
                  <p>La villa accueille les familles avec enfants. La piscine (14 × 7 m) est un espace de plaisir : la surveillance des enfants incombe en permanence aux adultes responsables présents sur les lieux.</p>
                </div>
              }
            />

            <FaqItem
              question="Les animaux de compagnie sont-ils acceptés ?"
              answer={
                <p>Les <strong>petits animaux de compagnie</strong> sont acceptés sous réserve d'accord préalable. Ils ne sont pas autorisés dans la piscine et ne doivent pas être laissés seuls dans la villa.</p>
              }
            />

            <FaqItem
              question="Le ménage est-il inclus dans le tarif ?"
              answer={
                <p>Oui, le <strong>ménage de fin de séjour est inclus</strong> dans le tarif de location. Les locataires sont invités à laisser la villa dans un état raisonnable de propreté à leur départ.</p>
              }
            />

            <FaqItem
              question="Y a-t-il la climatisation dans la villa ?"
              answer={
                <Confirm>À confirmer avec le propriétaire : climatisation dans toutes les suites et/ou espaces communs ?</Confirm>
              }
              needsConfirm
            />

            <FaqItem
              question="Quel est l'aéroport le plus proche ? Faut-il louer une voiture ?"
              answer={
                <div className="space-y-2">
                  <ul className="space-y-1 list-disc list-inside">
                    <li><strong>Comiso (CIY)</strong> : 55 km · environ 50 min — aéroport le plus proche</li>
                    <li><strong>Catane-Fontanarossa (CTA)</strong> : 90 km · environ 1h20</li>
                  </ul>
                  <p className="text-sm">La location de voiture est indispensable pour explorer la région. Des agences sont disponibles dans les deux aéroports.</p>
                </div>
              }
            />

            <FaqItem
              question="Quelles sont les distances depuis la villa ?"
              answer={
                <ul className="space-y-1 list-disc list-inside">
                  <li>Noto (centre historique baroque, UNESCO) : <strong>5 km · 10 min</strong></li>
                  <li>Plages de Vendicari (réserve naturelle) : <strong>8 km · 12 min</strong></li>
                  <li>Marzamemi (village de pêcheurs) : <strong>20 km · 22 min</strong></li>
                  <li>Syracuse (ville antique) : <strong>30 km · 35 min</strong></li>
                  <li>Ragusa Ibla (baroque sicilien) : <strong>45 km · 55 min</strong></li>
                </ul>
              }
            />

            <FaqItem
              question="Où faire les courses ? Y a-t-il des restaurants recommandés à proximité ?"
              answer={
                <Confirm>À compléter par le propriétaire : supermarchés les plus proches, marchés locaux, restaurants recommandés à Noto et dans la région.</Confirm>
              }
              needsConfirm
            />

          </div>

          <div className="mt-16 p-8 bg-navy text-white">
            <p className="font-display text-xl mb-2">Une question sans réponse ici ?</p>
            <p className="font-sans text-white/70 text-sm mb-4">Contactez-nous directement — nous répondons sous 24h.</p>
            <Link href="/fr#contact" className="inline-block font-sans text-xs tracking-[0.2em] uppercase border border-gold text-gold-text px-6 py-3 hover:bg-gold hover:text-navy transition-colors">
              Nous contacter
            </Link>
          </div>
        </main>

        <footer className="border-t border-gray-200 py-8 px-6 text-center">
          <p className="font-sans text-xs text-muted">
            © {new Date().getFullYear()} Villa Vénus Noto ·{' '}
            <Link href="/mentions-legales" className="hover:text-gold transition-colors">Mentions légales</Link> ·{' '}
            <Link href="/conditions-de-reservation" className="hover:text-gold transition-colors">Conditions</Link> ·{' '}
            <Link href="/faq-en" className="hover:text-gold transition-colors">FAQ EN</Link> ·{' '}
            <Link href="/faq-it" className="hover:text-gold transition-colors">FAQ IT</Link>
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
        <span className="text-gold-text text-xl font-light group-open:rotate-45 transition-transform shrink-0">+</span>
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
