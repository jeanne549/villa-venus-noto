import LegalLayout from '@/components/LegalLayout'
import { Metadata } from 'next'
import { getBreadcrumbSchema } from '@/lib/structured-data'
import { SITE_CONFIG } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Condizioni di prenotazione — Villa Vénus Noto',
  robots: { index: false },
}

export default function CondizioniDiPrenotazione() {
  return (
    <LegalLayout title="Condizioni di prenotazione" jsonLd={getBreadcrumbSchema([{ name: 'Villa Vénus Noto', item: 'https://www.villavenusnoto.com/it' }, { name: 'Condizioni di prenotazione', item: 'https://www.villavenusnoto.com/condizioni-di-prenotazione' }])}>
      <p className="text-xs text-muted">Ultimo aggiornamento: settembre 2026</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">1. Oggetto</h2>
      <p>
        Le presenti condizioni disciplinano qualsiasi prenotazione della <strong>Villa Vénus Noto</strong>,
        di proprietà di Deschaux Jeanne (privato), sita in Contrada Spaccazza, 96017 Noto SR — Italia.
        Il locatore è contattabile tramite il referente locale Emanuele Di Pietro al +39 348 006 46 72.
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">2. Capienza massima</h2>
      <p>La villa è affittata per un massimo di <strong>9 persone</strong>. Qualsiasi occupazione superiore è vietata e comporterà la risoluzione immediata del contratto senza rimborso.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">3. Soggiorno minimo</h2>
      <p>Il periodo minimo di locazione è di <strong>6 notti</strong>.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">4. Modalità di pagamento</h2>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Acconto del 30%</strong> dell'importo totale, dovuto alla conferma della prenotazione (entro 72 ore dall'accordo).</li>
        <li><strong>Saldo del 70%</strong> da pagare il giorno dell'arrivo, prima della consegna delle chiavi.</li>
      </ul>
      <p className="mt-3 text-sm text-muted">I metodi di pagamento accettati saranno specificati alla conferma.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">5. Politica di cancellazione</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Cancellazione <strong>più di 30 giorni</strong> prima dell'arrivo: l'acconto del 30% viene rimborsato integralmente.</li>
        <li>Cancellazione <strong>30 giorni o meno</strong> prima dell'arrivo: l'acconto del 30% è trattenuto e non rimborsabile.</li>
        <li>Cancellazione dopo il versamento del saldo: nessun rimborso.</li>
      </ul>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">6. Deposito cauzionale</h2>
      <p>Nessun deposito cauzionale è richiesto per la stagione 2026–2027. Il conduttore rimane responsabile di qualsiasi danno causato alla villa o ai suoi arredi.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">7. Pulizie</h2>
      <p>Le pulizie di fine soggiorno sono <strong>incluse</strong> nel canone di locazione. Gli ospiti sono tenuti a lasciare la villa in condizioni ragionevolmente pulite.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">8. Orari di check-in e check-out</h2>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Check-in</strong>: dalle ore 16:00</li>
        <li><strong>Check-out</strong>: entro le ore 10:00</li>
      </ul>
      <p className="mt-2 text-sm text-muted">Qualsiasi variazione degli orari deve essere concordata in anticipo con il referente locale.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">9. Animali domestici</h2>
      <p>I <strong>piccoli animali domestici</strong> sono accettati, previa autorizzazione del locatore. Non devono accedere alla piscina e non devono essere lasciati soli in villa.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">10. Feste ed eventi</h2>
      <p>Feste, eventi o riunioni che superino la capienza di 9 persone <strong>non sono autorizzati</strong>.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">11. Tassa di soggiorno</h2>
      <p>
        In conformità con la normativa del Comune di Noto, è dovuta una <strong>tassa di soggiorno comunale</strong> per ogni soggiorno.
        Si applica per un massimo di 6 notti consecutive. Sono esenti i minori di 14 anni e le persone di età superiore a 75 anni.
        Questa tassa viene riscossa in loco, in aggiunta al canone di locazione. <strong>È pari a 3 € a persona a notte.</strong>
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">12. Obblighi di legge italiani</h2>
      <p>
        In conformità con la legislazione italiana (D.Lgs. 145/2023 e Codice del Turismo), il locatore comunica i dati degli ospiti alle autorità di pubblica sicurezza tramite il portale Alloggiati Web entro 24 ore dall'arrivo.
        Gli ospiti si impegnano a fornire i dati identificativi di tutti gli occupanti.
      </p>
      <p>
        {SITE_CONFIG.cin && <><strong>CIN (Codice Identificativo Nazionale)</strong>: <span className="font-mono">{SITE_CONFIG.cin}</span><br /></>}
        {SITE_CONFIG.cir && <><strong>CIR (Codice Identificativo Regionale)</strong>: <span className="font-mono">{SITE_CONFIG.cir}</span></>}
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">13. Responsabilità</h2>
      <p>
        Il locatore non è responsabile per danni derivanti da un uso anomalo delle attrezzature o dalla mancata osservanza delle norme di sicurezza, in particolare in piscina.
        La sorveglianza dei bambini e delle persone vulnerabili è a carico degli adulti presenti.
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">14. Legge applicabile e giurisdizione</h2>
      <p>
        Le presenti condizioni sono disciplinate dal diritto italiano. Qualsiasi controversia sarà sottoposta alla competenza del Tribunale di Siracusa (SR), Italia.
      </p>
    </LegalLayout>
  )
}
