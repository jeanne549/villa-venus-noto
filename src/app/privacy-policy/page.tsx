import LegalLayout from '@/components/LegalLayout'
import { Metadata } from 'next'
import { getBreadcrumbSchema } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Privacy Policy — Villa Vénus Noto',
  robots: { index: false },
}

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" jsonLd={getBreadcrumbSchema([{ name: 'Villa Vénus Noto', item: 'https://www.villavenusnoto.com/en' }, { name: 'Privacy Policy', item: 'https://www.villavenusnoto.com/privacy-policy' }])}>
      <p className="text-xs text-muted">Last updated: September 2026 — compliant with GDPR (EU 2016/679)</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">1. Data controller</h2>
      <p>
        <strong>Deschaux Jeanne</strong> (private individual)<br />
        Codice fiscale: DSCJNN71L64F943Q<br />
        c/o Paola Deschaux Dimaio, Largo Nazario Sauro 4, 96017 Noto (SR) — Italy<br />
        Email: <a href="mailto:contact@villavenusnoto.com" className="text-gold-text hover:underline">contact@villavenusnoto.com</a>
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">2. Data collected</h2>
      <p>When submitting a booking request through the contact form, we collect:</p>
      <ul className="list-disc list-inside space-y-1 mt-2">
        <li>Full name</li>
        <li>Email address</li>
        <li>Phone number (optional)</li>
        <li>Requested stay dates and number of guests</li>
        <li>Message</li>
      </ul>
      <p className="mt-3">
        We do not collect payment data directly — payments are made by bank transfer or as separately agreed.
      </p>
      <p className="mt-3">
        Under Italian law (Alloggiati Web), identity data for all guests (ID document) must be transmitted to public security authorities within 24 hours of arrival.
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">3. Purposes and legal basis</h2>
      <table className="w-full text-sm border border-gray-200 mt-3">
        <thead>
          <tr className="bg-cream">
            <th className="text-left px-3 py-2 font-sans font-semibold text-charcoal border-b border-gray-200">Purpose</th>
            <th className="text-left px-3 py-2 font-sans font-semibold text-charcoal border-b border-gray-200">Legal basis</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-100">
            <td className="px-3 py-2">Respond to your booking enquiry</td>
            <td className="px-3 py-2">Performance of a contract (Art. 6.1.b GDPR)</td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="px-3 py-2">Alloggiati Web declaration (legal obligation)</td>
            <td className="px-3 py-2">Legal obligation (Art. 6.1.c GDPR)</td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="px-3 py-2">Sending confirmation email and booking follow-up</td>
            <td className="px-3 py-2">Performance of a contract (Art. 6.1.b GDPR)</td>
          </tr>
          <tr>
            <td className="px-3 py-2">Recording your consent to data processing</td>
            <td className="px-3 py-2">Consent (Art. 6.1.a GDPR)</td>
          </tr>
        </tbody>
      </table>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">4. Processors and recipients</h2>
      <p>Your data is processed only by:</p>
      <ul className="list-disc list-inside space-y-2 mt-2">
        <li><strong>Supabase Inc.</strong> (database hosted in Europe) — storage of booking requests</li>
        <li><strong>Resend Inc.</strong> — transactional email delivery (confirmation receipt)</li>
        <li><strong>Vercel Inc.</strong> — website hosting</li>
      </ul>
      <p className="mt-3 text-sm text-muted">
        No data is sold or transmitted to third parties for advertising purposes.
        Supabase and Resend are GDPR-compliant and sign DPAs (data processing agreements).
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">5. Retention period</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Booking requests not converted into a contract: 1 year from receipt</li>
        <li>Data related to an actual stay: 5 years (Italian statutory retention period for tax purposes)</li>
        <li>Alloggiati Web data: in accordance with Italian authority requirements</li>
      </ul>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">6. Your rights</h2>
      <p>Under the GDPR, you have the following rights:</p>
      <ul className="list-disc list-inside space-y-1 mt-2">
        <li><strong>Access</strong> — obtain a copy of your data</li>
        <li><strong>Rectification</strong> — correct inaccurate data</li>
        <li><strong>Erasure</strong> — request deletion (within legal limits)</li>
        <li><strong>Objection</strong> — object to processing</li>
        <li><strong>Portability</strong> — receive your data in a structured format</li>
        <li><strong>Withdrawal of consent</strong> — at any time, without retroactive effect</li>
      </ul>
      <p className="mt-3">
        To exercise these rights: <a href="mailto:contact@villavenusnoto.com" className="text-gold-text hover:underline">contact@villavenusnoto.com</a>.
        We respond within 30 days. In case of dispute, you may lodge a complaint with the relevant supervisory authority (in France: CNIL; in Italy: Garante Privacy).
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">7. Cookies</h2>
      <p>
        This website uses technical cookies necessary for its operation. No advertising cookies are placed without your prior consent.
        For more information, please see our <a href="/cookies" className="text-gold-text hover:underline">cookie policy</a>.
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">8. Security</h2>
      <p>
        Your data is transmitted via HTTPS (TLS encryption). Database access is secured by API keys with minimal permissions.
        No unauthorised third-party access is possible within the architecture in place.
      </p>
    </LegalLayout>
  )
}
