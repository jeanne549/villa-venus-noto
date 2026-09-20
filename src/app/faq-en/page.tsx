import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import { getFaqPageSchema, getBreadcrumbSchema, getOrganizationSchema } from '@/lib/structured-data'

const BASE = 'https://www.villavenusnoto.com'

// Legacy page — superseded by /en/faq. Noindex to prevent duplicate content.
export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions — Villa Vénus Noto',
  description: 'All the answers to your questions about renting Villa Vénus Noto: rates, payment, pets, pool, airport, distances.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: `${BASE}/en/faq`,
  },
}

const SCHEMA_FAQS = [
  {
    question: 'What is included in the rental rate?',
    answer: 'The rental rate includes exclusive use of the villa (private pool 14 × 7 m, panoramic rooftop, terraces, gardens, wood-fired oven), bed linen and towels, high-speed Wi-Fi, private parking and end-of-stay cleaning. A local tourist tax is charged separately (amount confirmed at booking).',
  },
  {
    question: 'What is the tourist tax and how is it calculated?',
    answer: 'The tourist tax is due to the municipality of Noto for each stay, up to a maximum of 6 consecutive nights. Children under 14 and persons over 75 are exempt. It is paid directly at the villa on arrival. The exact amount will be confirmed at booking.',
  },
  {
    question: 'What are the booking and payment conditions?',
    answer: 'A deposit of 50% of the total amount is due within 72 hours of booking confirmation. The balance of 50% is paid on the day of arrival, before key handover. Accepted payment methods are specified at confirmation.',
  },
  {
    question: 'What is the cancellation policy?',
    answer: 'Cancellation more than 60 days before arrival: the 50% deposit is refunded minus admin fees. Cancellation 60 days or less before arrival: the deposit is retained and non-refundable. Cancellation after payment of the balance: no refund.',
  },
  {
    question: 'What are the check-in and check-out times?',
    answer: 'Check-in is from 4:00 PM. Check-out must be completed by 10:00 AM. Any adjustment to these times must be agreed in advance with the local agent.',
  },
  {
    question: 'What is the minimum length of stay?',
    answer: 'The minimum stay is 6 nights. The villa is available for seasonal rental, from April to October.',
  },
  {
    question: 'Is the villa suitable for children? Are there safety measures around the pool?',
    answer: 'The villa welcomes families with children. The pool (14 × 7 m) is a leisure space: supervision of children is at all times the responsibility of the adults present.',
  },
  {
    question: 'Are pets allowed?',
    answer: 'Small pets are accepted subject to prior agreement. They are not allowed in the pool and must not be left alone in the villa.',
  },
  {
    question: 'Is cleaning included in the rental rate?',
    answer: 'Yes, end-of-stay cleaning is included in the rental rate.',
  },
  {
    question: 'Which is the nearest airport? Is a car necessary?',
    answer: 'The nearest airport is Comiso (CIY), 55 km away (approximately 50 minutes by car). Catania-Fontanarossa airport (CTA) is 90 km away (approximately 1h20). Car hire is essential to explore the region freely.',
  },
  {
    question: 'What are the distances from the villa?',
    answer: 'Noto (UNESCO Baroque historic centre): 5 km · 10 min. Vendicari beaches (nature reserve): 8 km · 12 min. Marzamemi (fishing village): 20 km · 22 min. Syracuse (ancient city): 30 km · 35 min. Ragusa Ibla (Sicilian Baroque): 45 km · 55 min.',
  },
]

const breadcrumb = getBreadcrumbSchema([
  { name: 'Villa Vénus Noto', item: `${BASE}/en` },
  { name: 'FAQ', item: `${BASE}/faq-en` },
])

export default function FaqEn() {
  return (
    <>
      <JsonLd data={[getFaqPageSchema(SCHEMA_FAQS), breadcrumb, getOrganizationSchema()]} />

      <div className="min-h-screen bg-cream">
        <header className="bg-navy text-white px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/en" className="font-display text-lg tracking-[0.2em] uppercase text-white hover:text-gold transition-colors">
              Villa Vénus Noto
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/faq" className="font-sans text-xs text-white/50 hover:text-white tracking-widest uppercase transition-colors">FR</Link>
              <Link href="/faq-it" className="font-sans text-xs text-white/50 hover:text-white tracking-widest uppercase transition-colors">IT</Link>
              <Link href="/en" className="font-sans text-xs text-white/60 hover:text-white tracking-widest uppercase transition-colors">← Back to site</Link>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold-text mb-4">Frequently asked questions</p>
          <h1 className="font-serif text-4xl text-charcoal mb-3">FAQ — Villa Vénus Noto</h1>
          <div className="w-12 h-px bg-gold mb-10" />

          <div className="space-y-4">

            <FaqItem
              question="What is included in the rental rate?"
              answer={
                <p>The rate includes exclusive use of the villa — private pool 14 × 7 m, panoramic rooftop, terraces, gardens, wood-fired oven — as well as bed linen and towels, high-speed Wi-Fi, private parking and <strong>end-of-stay cleaning</strong>. A local tourist tax is charged separately (amount confirmed at booking).</p>
              }
            />

            <FaqItem
              question="What is the tourist tax and how is it calculated?"
              answer={
                <p>The tourist tax is due to the municipality of Noto for each stay, up to a maximum of <strong>6 consecutive nights</strong>. Children under 14 and persons over 75 are exempt. It is paid directly at the villa on arrival. The exact amount will be confirmed at booking.</p>
              }
            />

            <FaqItem
              question="What are the booking and payment conditions?"
              answer={
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong>50% deposit</strong> due within 72 hours of booking confirmation.</li>
                  <li><strong>Balance of 50%</strong> paid on the day of arrival, before key handover.</li>
                  <li>Accepted payment methods are specified at confirmation.</li>
                </ul>
              }
            />

            <FaqItem
              question="What is the cancellation policy?"
              answer={
                <ul className="space-y-2 list-disc list-inside">
                  <li>Cancellation <strong>more than 60 days</strong> before arrival: deposit refunded minus admin fees.</li>
                  <li>Cancellation <strong>60 days or less</strong> before arrival: deposit retained, non-refundable.</li>
                  <li>Cancellation after payment of the balance: no refund.</li>
                </ul>
              }
            />

            <FaqItem
              question="What are the check-in and check-out times?"
              answer={
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong>Check-in</strong>: from 4:00 PM</li>
                  <li><strong>Check-out</strong>: by 10:00 AM</li>
                  <li className="text-sm text-muted">Any adjustment must be agreed in advance with the local agent.</li>
                </ul>
              }
            />

            <FaqItem
              question="What is the minimum length of stay?"
              answer={
                <p>The minimum stay is <strong>6 nights</strong>. The villa is available for seasonal rental, from April to October.</p>
              }
            />

            <FaqItem
              question="Is the villa suitable for children? Are there safety measures around the pool?"
              answer={
                <p>The villa welcomes families with children. The pool (14 × 7 m) is a leisure space: supervision of children is at all times the responsibility of the adults present.</p>
              }
            />

            <FaqItem
              question="Are pets allowed?"
              answer={
                <p><strong>Small pets are accepted</strong> subject to prior agreement. They are not allowed in the pool and must not be left alone in the villa.</p>
              }
            />

            <FaqItem
              question="Is cleaning included in the rental rate?"
              answer={
                <p>Yes, <strong>end-of-stay cleaning is included</strong> in the rental rate. Guests are asked to leave the villa in a reasonably clean state on departure.</p>
              }
            />

            <FaqItem
              question="Is there air conditioning in the villa?"
              answer={
                <Confirm>To be confirmed by the owner: air conditioning in all suites and/or common areas?</Confirm>
              }
              needsConfirm
            />

            <FaqItem
              question="Which is the nearest airport? Is a car necessary?"
              answer={
                <div className="space-y-2">
                  <ul className="space-y-1 list-disc list-inside">
                    <li><strong>Comiso (CIY)</strong>: 55 km · approx. 50 min — nearest airport</li>
                    <li><strong>Catania-Fontanarossa (CTA)</strong>: 90 km · approx. 1h20</li>
                  </ul>
                  <p className="text-sm">Car hire is essential to explore the region freely. Car hire agencies are available at both airports.</p>
                </div>
              }
            />

            <FaqItem
              question="What are the distances from the villa?"
              answer={
                <ul className="space-y-1 list-disc list-inside">
                  <li>Noto (UNESCO Baroque historic centre): <strong>5 km · 10 min</strong></li>
                  <li>Vendicari beaches (nature reserve): <strong>8 km · 12 min</strong></li>
                  <li>Marzamemi (fishing village): <strong>20 km · 22 min</strong></li>
                  <li>Syracuse (ancient city): <strong>30 km · 35 min</strong></li>
                  <li>Ragusa Ibla (Sicilian Baroque): <strong>45 km · 55 min</strong></li>
                </ul>
              }
            />

            <FaqItem
              question="Where can I do grocery shopping? Are there restaurants nearby?"
              answer={
                <Confirm>To be completed by the owner: nearest supermarkets, local markets, recommended restaurants in Noto and the surrounding area.</Confirm>
              }
              needsConfirm
            />

          </div>

          <div className="mt-16 p-8 bg-navy text-white">
            <p className="font-display text-xl mb-2">A question not answered here?</p>
            <p className="font-sans text-white/70 text-sm mb-4">Contact us directly — we reply within 24 hours.</p>
            <Link href="/en#contact" className="inline-block font-sans text-xs tracking-[0.2em] uppercase border border-gold text-gold-text px-6 py-3 hover:bg-gold hover:text-navy transition-colors">
              Contact us
            </Link>
          </div>
        </main>

        <footer className="border-t border-gray-200 py-8 px-6 text-center">
          <p className="font-sans text-xs text-muted">
            © {new Date().getFullYear()} Villa Vénus Noto ·{' '}
            <Link href="/legal-notice" className="hover:text-gold transition-colors">Legal notice</Link> ·{' '}
            <Link href="/booking-conditions" className="hover:text-gold transition-colors">Booking conditions</Link> ·{' '}
            <Link href="/faq" className="hover:text-gold transition-colors">FAQ FR</Link> ·{' '}
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
