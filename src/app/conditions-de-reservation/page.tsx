import LegalLayout from '@/components/LegalLayout'
import { Metadata } from 'next'
import { getBreadcrumbSchema } from '@/lib/structured-data'
import { SITE_CONFIG } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Conditions de réservation — Villa Vénus Noto',
  robots: { index: false },
}

export default function ConditionsDeReservation() {
  return (
    <LegalLayout title="Conditions de réservation" jsonLd={getBreadcrumbSchema([{ name: 'Villa Vénus Noto', item: 'https://www.villavenusnoto.com/fr' }, { name: 'Conditions de réservation', item: 'https://www.villavenusnoto.com/conditions-de-reservation' }])}>
      <p className="text-xs text-muted">Dernière mise à jour : septembre 2026</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">1. Objet</h2>
      <p>
        Les présentes conditions régissent toute réservation de la <strong>Villa Vénus Noto</strong>,
        propriété de Deschaux Jeanne (particulière), sise Contrada Spaccazza, 96017 Noto SR — Italie.
        Le bailleur est joignable via Emanuele Di Pietro, mandataire local, au +39 348 006 46 72.
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">2. Capacité maximale</h2>
      <p>La villa est louée pour <strong>9 personnes maximum</strong>. Toute occupation supérieure est interdite et entraîne la résiliation immédiate du contrat sans remboursement.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">3. Durée minimale de séjour</h2>
      <p>La durée minimale de location est de <strong>6 nuits</strong>.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">4. Modalités de paiement</h2>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Acompte de 30 %</strong> du montant total, dû lors de la confirmation de réservation (dans les 72h suivant l'accord).</li>
        <li><strong>Solde de 70 %</strong> réglé le jour de l'arrivée, avant la remise des clés.</li>
      </ul>
      <p className="mt-3 text-sm text-muted">Les modes de paiement acceptés seront précisés lors de la confirmation.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">5. Politique d'annulation</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Annulation <strong>plus de 30 jours</strong> avant l'arrivée : l'acompte de 30 % est remboursé intégralement.</li>
        <li>Annulation <strong>30 jours ou moins</strong> avant l'arrivée : l'acompte de 30 % est conservé et non remboursable.</li>
        <li>En cas d'annulation après le versement du solde : aucun remboursement.</li>
      </ul>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">6. Caution</h2>
      <p>Aucune caution n'est demandée pour la saison 2026–2027. Le locataire reste responsable de tout dommage causé à la villa ou à son mobilier.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">7. Ménage</h2>
      <p>Le ménage de fin de séjour est <strong>inclus</strong> dans le tarif de location. Le locataire est tenu de laisser la villa dans un état raisonnable de propreté.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">8. Horaires d'arrivée et de départ</h2>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Check-in</strong> : à partir de 16h00</li>
        <li><strong>Check-out</strong> : jusqu'à 10h00</li>
      </ul>
      <p className="mt-2 text-sm text-muted">Tout aménagement d'horaire doit être convenu à l'avance avec le mandataire local.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">9. Animaux domestiques</h2>
      <p>Les <strong>petits animaux domestiques</strong> sont acceptés, sous réserve d'accord préalable du bailleur. Ils ne doivent pas accéder à la piscine et ne doivent pas être laissés seuls dans la villa.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">10. Fêtes et événements</h2>
      <p>Les fêtes, événements ou rassemblements dépassant la capacité de 9 personnes <strong>ne sont pas autorisés</strong>.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">11. Taxe de séjour</h2>
      <p>
        Conformément à la réglementation de la commune de Noto, une <strong>taxe de séjour communale</strong> est due pour chaque séjour.
        Elle s'applique dans la limite de 6 nuits consécutives. Sont exemptés les enfants de moins de 14 ans et les personnes de plus de 75 ans.
        Cette taxe est collectée sur place, en supplément du loyer. <strong>Le montant exact vous sera communiqué lors de la confirmation de réservation.</strong>
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">12. Obligations légales italiennes</h2>
      <p>
        Conformément à la législation italienne (D.Lgs 145/2023 et Testo Unico sul Turismo), le bailleur déclare les séjournants auprès des autorités de sécurité publique via le portail Alloggiati Web dans les 24h suivant l'arrivée.
        Le locataire s'engage à communiquer les informations d'identité de tous les occupants.
      </p>
      <p>
        {SITE_CONFIG.cin && <><strong>CIN (Codice Identificativo Nazionale)</strong> : <span className="font-mono">{SITE_CONFIG.cin}</span><br /></>}
        {SITE_CONFIG.cir && <><strong>CIR (Codice Identificativo Regionale)</strong> : <span className="font-mono">{SITE_CONFIG.cir}</span></>}
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">13. Responsabilité</h2>
      <p>
        Le bailleur ne saurait être tenu responsable des dommages résultant d'une utilisation anormale des équipements ou d'un non-respect des règles de sécurité, notamment autour de la piscine.
        Il est rappelé que la surveillance des enfants et des personnes vulnérables incombe aux adultes responsables présents sur place.
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">14. Droit applicable et juridiction</h2>
      <p>
        Les présentes conditions sont régies par le droit italien. Tout litige sera soumis à la juridiction du Tribunal de Syracuse (SR), Italie.
      </p>
    </LegalLayout>
  )
}
