import LegalLayout from '@/components/LegalLayout'
import { Metadata } from 'next'
import { getBreadcrumbSchema } from '@/lib/structured-data'
import { SITE_CONFIG } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Booking Conditions — Villa Vénus Noto',
  robots: { index: false },
}

export default function BookingConditions() {
  return (
    <LegalLayout title="Booking Conditions" jsonLd={getBreadcrumbSchema([{ name: 'Villa Vénus Noto', item: 'https://www.villavenusnoto.com/en' }, { name: 'Booking Conditions', item: 'https://www.villavenusnoto.com/booking-conditions' }])}>
      <p className="text-xs text-muted">Last updated: September 2026</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">1. Subject</h2>
      <p>
        These conditions govern any booking of <strong>Villa Vénus Noto</strong>,
        owned by Deschaux Jeanne (private individual), located at Contrada Spaccazza, 96017 Noto SR — Italy.
        The owner can be reached through local manager Emanuele Di Pietro at +39 348 006 46 72.
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">2. Maximum occupancy</h2>
      <p>The villa is rented for a <strong>maximum of 9 guests</strong>. Any occupation above this limit is prohibited and will result in immediate termination of the contract without refund.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">3. Minimum stay</h2>
      <p>The minimum rental period is <strong>6 nights</strong>.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">4. Payment terms</h2>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>30% deposit</strong> of the total amount, due upon booking confirmation (within 72 hours of agreement).</li>
        <li><strong>70% balance</strong> paid on arrival day, before key handover.</li>
      </ul>
      <p className="mt-3 text-sm text-muted">Accepted payment methods will be specified at confirmation.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">5. Cancellation policy</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Cancellation <strong>more than 30 days</strong> before arrival: the 30% deposit is fully refunded.</li>
        <li>Cancellation <strong>30 days or less</strong> before arrival: the 30% deposit is forfeited and non-refundable.</li>
        <li>Cancellation after the balance has been paid: no refund.</li>
      </ul>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">6. Security deposit</h2>
      <p>No security deposit is required for the 2026–2027 season. The tenant remains responsible for any damage caused to the villa or its furnishings.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">7. Cleaning</h2>
      <p>End-of-stay cleaning is <strong>included</strong> in the rental rate. Guests are expected to leave the villa in a reasonably clean condition.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">8. Check-in and check-out times</h2>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Check-in</strong>: from 4:00 pm</li>
        <li><strong>Check-out</strong>: by 10:00 am</li>
      </ul>
      <p className="mt-2 text-sm text-muted">Any arrangement outside these hours must be agreed in advance with the local manager.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">9. Pets</h2>
      <p><strong>Small domestic animals</strong> are welcome, subject to prior agreement with the owner. They must not access the pool and must not be left alone in the villa.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">10. Parties and events</h2>
      <p>Parties, events or gatherings exceeding the capacity of 9 persons <strong>are not permitted</strong>.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">11. Tourist tax</h2>
      <p>
        In accordance with the municipality of Noto, a <strong>local tourist tax</strong> applies for each stay.
        It is due for up to 6 consecutive nights. Exemptions: children under 14 and persons over 75.
        This tax is collected on site, in addition to the rental rate. <strong>The exact amount will be confirmed at booking.</strong>
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">12. Italian legal obligations</h2>
      <p>
        In accordance with Italian law (Legislative Decree 145/2023 and the Tourism Code), the owner registers guests with public security authorities via the Alloggiati Web portal within 24 hours of arrival.
        Guests undertake to provide identity information for all occupants.
      </p>
      <p>
        {SITE_CONFIG.cin && <><strong>CIN (National Identification Code)</strong>: <span className="font-mono">{SITE_CONFIG.cin}</span><br /></>}
        {SITE_CONFIG.cir && <><strong>CIR (Regional Identification Code)</strong>: <span className="font-mono">{SITE_CONFIG.cir}</span></>}
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">13. Liability</h2>
      <p>
        The owner shall not be held liable for damage resulting from abnormal use of equipment or failure to observe safety rules, particularly around the pool.
        Supervision of children and vulnerable persons is the responsibility of the accompanying adults.
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">14. Governing law and jurisdiction</h2>
      <p>
        These conditions are governed by Italian law. Any dispute shall be submitted to the Court of Syracuse (SR), Italy.
      </p>
    </LegalLayout>
  )
}
