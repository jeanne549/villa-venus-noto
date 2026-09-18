import LegalLayout from '@/components/LegalLayout'
import { Metadata } from 'next'
import { getBreadcrumbSchema } from '@/lib/structured-data'
import { SITE_CONFIG } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Mentions légales — Villa Vénus Noto',
  robots: { index: false },
}

export default function MentionsLegales() {
  return (
    <LegalLayout title="Mentions légales" jsonLd={getBreadcrumbSchema([{ name: 'Villa Vénus Noto', item: 'https://www.villavenusnoto.com/fr' }, { name: 'Mentions légales', item: 'https://www.villavenusnoto.com/mentions-legales' }])}>
      <p className="text-xs text-muted">Dernière mise à jour : septembre 2026</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">Éditeur du site</h2>
      <p>
        Le site <strong>villavenusnoto.com</strong> est édité par :<br />
        <strong>Deschaux Jeanne</strong>, particulière<br />
        Codice fiscale : DSCJNN71L64F943Q<br />
        c/o Mme Paola Deschaux Dimaio, Largo Nazario Sauro 4, 96017 Noto (SR) — Italie<br />
        Email : <a href="mailto:contact@villavenusnoto.com" className="text-gold hover:underline">contact@villavenusnoto.com</a><br />
        WhatsApp : +33 6 24 54 29 95
      </p>

      {(SITE_CONFIG.cin || SITE_CONFIG.cir) && (
        <>
          <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">Numéros d'enregistrement obligatoires</h2>
          {SITE_CONFIG.cin && (
            <p>
              <strong>CIN (Codice Identificativo Nazionale)</strong> : <span className="font-mono">{SITE_CONFIG.cin}</span><br />
              <em>Obligatoire sur toute annonce depuis le 02/01/2025 — D.Lgs 145/2023.</em>
            </p>
          )}
          {SITE_CONFIG.cir && (
            <p>
              <strong>CIR (Codice Identificativo Regionale)</strong> : <span className="font-mono">{SITE_CONFIG.cir}</span>
            </p>
          )}
        </>
      )}

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">Hébergement</h2>
      <p>
        Ce site est hébergé par <strong>Vercel Inc.</strong>, 340 Pine Street Suite 900, San Francisco, CA 94104, États-Unis.<br />
        Les données sont traitées sur des serveurs situés en Europe (région eu-west).
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">Propriété intellectuelle</h2>
      <p>
        L'ensemble du contenu de ce site (textes, photographies, mise en page) est la propriété exclusive de Deschaux Jeanne.
        Toute reproduction, même partielle, est interdite sans autorisation écrite préalable.
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">Droit applicable</h2>
      <p>
        La villa étant située en Italie, les conditions de location sont régies par le droit italien (Codice Civile, artt. 1571 et suivants) et par la réglementation nationale en matière de locazioni turistiche.
        Tout litige sera soumis à la compétence des tribunaux de Syracuse (SR), Italie.
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">Liens utiles</h2>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><a href="/confidentialite" className="text-gold hover:underline">Politique de confidentialité</a></li>
        <li><a href="/cookies" className="text-gold hover:underline">Politique cookies</a></li>
        <li><a href="/conditions-de-reservation" className="text-gold hover:underline">Conditions de réservation</a></li>
      </ul>
    </LegalLayout>
  )
}
