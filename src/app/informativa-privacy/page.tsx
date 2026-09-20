import LegalLayout from '@/components/LegalLayout'
import { Metadata } from 'next'
import { getBreadcrumbSchema } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Informativa sulla privacy — Villa Vénus Noto',
  robots: { index: false },
}

export default function InformativaPrivacy() {
  return (
    <LegalLayout title="Informativa sulla privacy" jsonLd={getBreadcrumbSchema([{ name: 'Villa Vénus Noto', item: 'https://www.villavenusnoto.com/it' }, { name: 'Informativa sulla privacy', item: 'https://www.villavenusnoto.com/informativa-privacy' }])}>
      <p className="text-xs text-muted">Ultimo aggiornamento: settembre 2026 — conforme al GDPR (UE 2016/679)</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">1. Titolare del trattamento</h2>
      <p>
        <strong>Deschaux Jeanne</strong> (privato)<br />
        Codice fiscale: DSCJNN71L64F943Q<br />
        c/o Paola Deschaux Dimaio, Largo Nazario Sauro 4, 96017 Noto (SR) — Italia<br />
        Email: <a href="mailto:contact@villavenusnoto.com" className="text-gold-text hover:underline">contact@villavenusnoto.com</a>
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">2. Dati raccolti</h2>
      <p>Tramite il modulo di contatto raccogliamo:</p>
      <ul className="list-disc list-inside space-y-1 mt-2">
        <li>Nome e cognome</li>
        <li>Indirizzo email</li>
        <li>Numero di telefono (facoltativo)</li>
        <li>Date di soggiorno richieste e numero di ospiti</li>
        <li>Messaggio</li>
      </ul>
      <p className="mt-3">
        Non raccogliamo direttamente dati di pagamento — i pagamenti avvengono tramite bonifico o secondo le modalità concordate separatamente.
      </p>
      <p className="mt-3">
        Ai sensi della normativa italiana (Alloggiati Web), i dati identificativi di tutti gli ospiti (documento d'identità) devono essere trasmessi alle autorità di pubblica sicurezza entro 24 ore dall'arrivo.
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">3. Finalità e basi giuridiche</h2>
      <table className="w-full text-sm border border-gray-200 mt-3">
        <thead>
          <tr className="bg-cream">
            <th className="text-left px-3 py-2 font-sans font-semibold text-charcoal border-b border-gray-200">Finalità</th>
            <th className="text-left px-3 py-2 font-sans font-semibold text-charcoal border-b border-gray-200">Base giuridica</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-100">
            <td className="px-3 py-2">Rispondere alla richiesta di prenotazione</td>
            <td className="px-3 py-2">Esecuzione di un contratto (art. 6.1.b GDPR)</td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="px-3 py-2">Comunicazione Alloggiati Web (obbligo legale)</td>
            <td className="px-3 py-2">Obbligo legale (art. 6.1.c GDPR)</td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="px-3 py-2">Invio email di conferma e gestione prenotazione</td>
            <td className="px-3 py-2">Esecuzione di un contratto (art. 6.1.b GDPR)</td>
          </tr>
          <tr>
            <td className="px-3 py-2">Registrazione del consenso al trattamento dei dati</td>
            <td className="px-3 py-2">Consenso (art. 6.1.a GDPR)</td>
          </tr>
        </tbody>
      </table>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">4. Responsabili del trattamento e destinatari</h2>
      <p>I tuoi dati sono trattati esclusivamente da:</p>
      <ul className="list-disc list-inside space-y-2 mt-2">
        <li><strong>Supabase Inc.</strong> (database ospitato in Europa) — archiviazione delle richieste di prenotazione</li>
        <li><strong>Resend Inc.</strong> — invio di email transazionali (conferma di ricezione)</li>
        <li><strong>Vercel Inc.</strong> — hosting del sito web</li>
      </ul>
      <p className="mt-3 text-sm text-muted">
        Nessun dato viene venduto né trasmesso a terzi per scopi pubblicitari.
        Supabase e Resend sono conformi al GDPR e firmano DPA (accordi di trattamento dei dati).
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">5. Periodo di conservazione</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Richieste di prenotazione non convertite in contratto: 1 anno dalla ricezione</li>
        <li>Dati relativi a un soggiorno effettivo: 5 anni (periodo legale di conservazione fiscale italiana)</li>
        <li>Dati Alloggiati Web: secondo i requisiti delle autorità italiane</li>
      </ul>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">6. I tuoi diritti</h2>
      <p>Ai sensi del GDPR, hai i seguenti diritti:</p>
      <ul className="list-disc list-inside space-y-1 mt-2">
        <li><strong>Accesso</strong> — ottenere una copia dei tuoi dati</li>
        <li><strong>Rettifica</strong> — correggere dati inesatti</li>
        <li><strong>Cancellazione</strong> — richiedere la cancellazione (nei limiti di legge)</li>
        <li><strong>Opposizione</strong> — opporti al trattamento</li>
        <li><strong>Portabilità</strong> — ricevere i tuoi dati in formato strutturato</li>
        <li><strong>Revoca del consenso</strong> — in qualsiasi momento, senza effetto retroattivo</li>
      </ul>
      <p className="mt-3">
        Per esercitare questi diritti: <a href="mailto:contact@villavenusnoto.com" className="text-gold-text hover:underline">contact@villavenusnoto.com</a>.
        Rispondiamo entro 30 giorni. In caso di controversia, puoi presentare un reclamo al Garante per la protezione dei dati personali (Garante Privacy).
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">7. Cookie</h2>
      <p>
        Questo sito utilizza cookie tecnici necessari al suo funzionamento. Nessun cookie pubblicitario viene installato senza il tuo previo consenso.
        Per ulteriori informazioni, consulta la nostra <a href="/cookies" className="text-gold-text hover:underline">politica dei cookie</a>.
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">8. Sicurezza</h2>
      <p>
        I tuoi dati sono trasmessi via HTTPS (cifratura TLS). L'accesso al database è protetto da chiavi API con permessi minimi.
        Nessun accesso non autorizzato di terzi è possibile nell'architettura implementata.
      </p>
    </LegalLayout>
  )
}
