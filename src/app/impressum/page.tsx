import LegalLayout from '@/components/LegalLayout'
import { Metadata } from 'next'
import { getBreadcrumbSchema } from '@/lib/structured-data'
import { SITE_CONFIG } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Impressum — Villa Vénus Noto',
  robots: { index: false },
}

export default function Impressum() {
  return (
    <LegalLayout title="Impressum" jsonLd={getBreadcrumbSchema([{ name: 'Villa Vénus Noto', item: 'https://www.villavenusnoto.com/de' }, { name: 'Impressum', item: 'https://www.villavenusnoto.com/impressum' }])}>
      <p className="text-xs text-muted">Stand: September 2026</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">Anbieter</h2>
      <p>
        Die Website <strong>villavenusnoto.com</strong> wird betrieben von:<br />
        <strong>Deschaux Jeanne</strong>, Privatperson<br />
        Codice fiscale: DSCJNN71L64F943Q<br />
        c/o Mme Paola Deschaux Dimaio, Largo Nazario Sauro 4, 96017 Noto (SR) — Italien<br />
        E-Mail: <a href="mailto:contact@villavenusnoto.com" className="text-gold hover:underline">contact@villavenusnoto.com</a><br />
        WhatsApp: +33 6 24 54 29 95
      </p>

      {(SITE_CONFIG.cin || SITE_CONFIG.cir) && (
        <>
          <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">Registrierungsnummern</h2>
          {SITE_CONFIG.cin && (
            <p>
              <strong>CIN (Codice Identificativo Nazionale)</strong>: <span className="font-mono">{SITE_CONFIG.cin}</span><br />
              <em>Pflichtangabe gemäß D.Lgs 145/2023 (italienisches Tourismusgesetz).</em>
            </p>
          )}
          {SITE_CONFIG.cir && (
            <p>
              <strong>CIR (Codice Identificativo Regionale)</strong>: <span className="font-mono">{SITE_CONFIG.cir}</span>
            </p>
          )}
        </>
      )}

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">Hosting</h2>
      <p>
        Diese Website wird gehostet von <strong>Vercel Inc.</strong>, 340 Pine Street Suite 900, San Francisco, CA 94104, USA.<br />
        Die Daten werden auf Servern in Europa (Region eu-west) verarbeitet.
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">Urheberrecht</h2>
      <p>
        Alle Inhalte dieser Website (Texte, Fotos, Layout) sind das ausschließliche Eigentum von Deschaux Jeanne.
        Jede Vervielfältigung, auch auszugsweise, ist ohne vorherige schriftliche Genehmigung untersagt.
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">Anwendbares Recht</h2>
      <p>
        Da die Villa in Italien gelegen ist, unterliegen die Mietbedingungen dem italienischen Recht (Codice Civile, Artt. 1571 ff.) sowie den nationalen Vorschriften über touristische Vermietungen.
        Alle Streitigkeiten unterliegen der ausschließlichen Zuständigkeit der Gerichte in Syrakus (SR), Italien.
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">Weiterführende Links</h2>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><a href="/datenschutz" className="text-gold hover:underline">Datenschutzerklärung</a></li>
        <li><a href="/cookies" className="text-gold hover:underline">Cookie-Richtlinie</a></li>
        <li><a href="/buchungsbedingungen" className="text-gold hover:underline">Buchungsbedingungen</a></li>
      </ul>
    </LegalLayout>
  )
}
