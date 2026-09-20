import LegalLayout from '@/components/LegalLayout'
import { Metadata } from 'next'
import { getBreadcrumbSchema } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — Villa Vénus Noto',
  robots: { index: false },
}

export default function Confidentialite() {
  return (
    <LegalLayout title="Politique de confidentialité" jsonLd={getBreadcrumbSchema([{ name: 'Villa Vénus Noto', item: 'https://www.villavenusnoto.com/fr' }, { name: 'Politique de confidentialité', item: 'https://www.villavenusnoto.com/confidentialite' }])}>
      <p className="text-xs text-muted">Dernière mise à jour : septembre 2026 — conforme au RGPD (UE 2016/679)</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">1. Responsable du traitement</h2>
      <p>
        <strong>Deschaux Jeanne</strong> (particulière)<br />
        Codice fiscale : DSCJNN71L64F943Q<br />
        c/o Paola Deschaux Dimaio, Largo Nazario Sauro 4, 96017 Noto (SR) — Italie<br />
        Email : <a href="mailto:contact@villavenusnoto.com" className="text-gold-text hover:underline">contact@villavenusnoto.com</a>
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">2. Données collectées</h2>
      <p>Lors d'une demande de réservation via le formulaire de contact, nous collectons :</p>
      <ul className="list-disc list-inside space-y-1 mt-2">
        <li>Nom et prénom</li>
        <li>Adresse email</li>
        <li>Numéro de téléphone (facultatif)</li>
        <li>Dates de séjour souhaitées et nombre de personnes</li>
        <li>Message libre</li>
      </ul>
      <p className="mt-3">
        Nous ne collectons pas de données de paiement directement — les règlements se font par virement ou selon les modalités convenues séparément.
      </p>
      <p className="mt-3">
        Conformément aux obligations légales italiennes (Alloggiati Web), les données d'identité de tous les séjournants (pièce d'identité) sont transmises aux autorités de sécurité publique dans les 24h suivant l'arrivée.
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">3. Finalités et bases légales</h2>
      <table className="w-full text-sm border border-gray-200 mt-3">
        <thead>
          <tr className="bg-cream">
            <th className="text-left px-3 py-2 font-sans font-semibold text-charcoal border-b border-gray-200">Finalité</th>
            <th className="text-left px-3 py-2 font-sans font-semibold text-charcoal border-b border-gray-200">Base légale</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-100">
            <td className="px-3 py-2">Répondre à votre demande de réservation</td>
            <td className="px-3 py-2">Exécution d'un contrat (art. 6.1.b RGPD)</td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="px-3 py-2">Déclaration Alloggiati Web (obligations légales)</td>
            <td className="px-3 py-2">Obligation légale (art. 6.1.c RGPD)</td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="px-3 py-2">Envoi de l'email de confirmation et suivi de réservation</td>
            <td className="px-3 py-2">Exécution d'un contrat (art. 6.1.b RGPD)</td>
          </tr>
          <tr>
            <td className="px-3 py-2">Collecte de votre consentement au traitement de vos données</td>
            <td className="px-3 py-2">Consentement (art. 6.1.a RGPD)</td>
          </tr>
        </tbody>
      </table>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">4. Sous-traitants et destinataires</h2>
      <p>Vos données sont traitées uniquement par :</p>
      <ul className="list-disc list-inside space-y-2 mt-2">
        <li><strong>Supabase Inc.</strong> (base de données hébergée en Europe) — stockage des demandes de réservation</li>
        <li><strong>Resend Inc.</strong> — envoi des emails transactionnels (confirmation de réception)</li>
        <li><strong>Vercel Inc.</strong> — hébergement du site web</li>
      </ul>
      <p className="mt-3 text-sm text-muted">
        Aucune donnée n'est vendue ni transmise à des tiers à des fins publicitaires.
        Supabase et Resend sont conformes au RGPD et signent des DPA (accords de traitement des données).
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">5. Durée de conservation</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Demandes de réservation non converties en contrat : 1 an après la réception</li>
        <li>Données liées à un séjour effectif : 5 ans (durée légale de conservation en matière fiscale italienne)</li>
        <li>Données Alloggiati Web : conformément aux exigences des autorités italiennes</li>
      </ul>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">6. Vos droits</h2>
      <p>Conformément au RGPD, vous disposez des droits suivants :</p>
      <ul className="list-disc list-inside space-y-1 mt-2">
        <li><strong>Accès</strong> — obtenir une copie de vos données</li>
        <li><strong>Rectification</strong> — corriger des données inexactes</li>
        <li><strong>Effacement</strong> — demander la suppression de vos données (dans les limites légales)</li>
        <li><strong>Opposition</strong> — vous opposer à un traitement</li>
        <li><strong>Portabilité</strong> — recevoir vos données dans un format structuré</li>
        <li><strong>Retrait du consentement</strong> — à tout moment, sans rétroactivité</li>
      </ul>
      <p className="mt-3">
        Pour exercer ces droits : <a href="mailto:contact@villavenusnoto.com" className="text-gold-text hover:underline">contact@villavenusnoto.com</a>.
        Nous répondons sous 30 jours. En cas de litige, vous pouvez introduire une réclamation auprès de l'autorité de contrôle compétente (en France : CNIL ; en Italie : Garante Privacy).
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">7. Cookies</h2>
      <p>
        Ce site utilise des cookies techniques nécessaires à son fonctionnement. Aucun cookie publicitaire n'est déposé sans votre consentement préalable.
        Pour en savoir plus, consultez notre <a href="/cookies" className="text-gold-text hover:underline">politique cookies</a>.
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">8. Sécurité</h2>
      <p>
        Vos données sont transmises via HTTPS (chiffrement TLS). L'accès à la base de données est sécurisé par des clés API avec des permissions minimales.
        Aucun accès tiers non autorisé n'est possible dans l'architecture mise en place.
      </p>
    </LegalLayout>
  )
}
