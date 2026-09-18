import LegalLayout from '@/components/LegalLayout'
import { Metadata } from 'next'
import { getBreadcrumbSchema } from '@/lib/structured-data'
import { SITE_CONFIG } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Legal Notice — Villa Vénus Noto',
  robots: { index: false },
}

export default function LegalNotice() {
  return (
    <LegalLayout title="Legal Notice" jsonLd={getBreadcrumbSchema([{ name: 'Villa Vénus Noto', item: 'https://www.villavenusnoto.com/en' }, { name: 'Legal Notice', item: 'https://www.villavenusnoto.com/legal-notice' }])}>
      <p className="text-xs text-muted">Last updated: September 2026</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">Publisher</h2>
      <p>
        The website <strong>villavenusnoto.com</strong> is published by:<br />
        <strong>Deschaux Jeanne</strong>, private individual<br />
        Codice fiscale: DSCJNN71L64F943Q<br />
        c/o Ms. Paola Deschaux Dimaio, Largo Nazario Sauro 4, 96017 Noto (SR) — Italy<br />
        Email: <a href="mailto:contact@villavenusnoto.com" className="text-gold hover:underline">contact@villavenusnoto.com</a><br />
        WhatsApp: +33 6 24 54 29 95
      </p>

      {(SITE_CONFIG.cin || SITE_CONFIG.cir) && (
        <>
          <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">Mandatory registration numbers</h2>
          {SITE_CONFIG.cin && (
            <p>
              <strong>CIN (National Identification Code)</strong>: <span className="font-mono">{SITE_CONFIG.cin}</span><br />
              <em>Mandatory on all listings since 02/01/2025 — Legislative Decree 145/2023.</em>
            </p>
          )}
          {SITE_CONFIG.cir && (
            <p>
              <strong>CIR (Regional Identification Code)</strong>: <span className="font-mono">{SITE_CONFIG.cir}</span>
            </p>
          )}
        </>
      )}

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">Hosting</h2>
      <p>
        This website is hosted by <strong>Vercel Inc.</strong>, 340 Pine Street Suite 900, San Francisco, CA 94104, United States.<br />
        Data is processed on servers located in Europe (eu-west region).
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">Intellectual property</h2>
      <p>
        All content on this website (text, photographs, layout) is the exclusive property of Deschaux Jeanne.
        Any reproduction, even partial, is prohibited without prior written authorisation.
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">Applicable law</h2>
      <p>
        As the villa is located in Italy, the rental conditions are governed by Italian law (Codice Civile, artt. 1571 et seq.) and national regulations on tourist rentals (<em>locazioni turistiche</em>).
        Any dispute shall be submitted to the jurisdiction of the courts of Syracuse (SR), Italy.
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">Related pages</h2>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><a href="/privacy-policy" className="text-gold hover:underline">Privacy Policy</a></li>
        <li><a href="/cookies" className="text-gold hover:underline">Cookie Policy</a></li>
        <li><a href="/booking-conditions" className="text-gold hover:underline">Booking Conditions</a></li>
      </ul>
    </LegalLayout>
  )
}
