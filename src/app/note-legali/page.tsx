import LegalLayout from '@/components/LegalLayout'
import { Metadata } from 'next'
import { getBreadcrumbSchema } from '@/lib/structured-data'
import { SITE_CONFIG } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Note legali — Villa Vénus Noto',
  robots: { index: false },
}

export default function NoteLegali() {
  return (
    <LegalLayout title="Note legali" jsonLd={getBreadcrumbSchema([{ name: 'Villa Vénus Noto', item: 'https://www.villavenusnoto.com/it' }, { name: 'Note legali', item: 'https://www.villavenusnoto.com/note-legali' }])}>
      <p className="text-xs text-muted">Ultimo aggiornamento: settembre 2026</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">Editore del sito</h2>
      <p>
        Il sito <strong>villavenusnoto.com</strong> è pubblicato da:<br />
        <strong>Deschaux Jeanne</strong>, privato<br />
        Codice fiscale: DSCJNN71L64F943Q<br />
        c/o Sig.ra Paola Deschaux Dimaio, Largo Nazario Sauro 4, 96017 Noto (SR) — Italia<br />
        Email: <a href="mailto:contact@villavenusnoto.com" className="text-gold-text hover:underline">contact@villavenusnoto.com</a><br />
        WhatsApp: +33 6 24 54 29 95
      </p>

      {(SITE_CONFIG.cin || SITE_CONFIG.cir) && (
        <>
          <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">Numeri di registrazione obbligatori</h2>
          {SITE_CONFIG.cin && (
            <p>
              <strong>CIN (Codice Identificativo Nazionale)</strong>: <span className="font-mono">{SITE_CONFIG.cin}</span><br />
              <em>Obbligatorio su tutti gli annunci dal 02/01/2025 — D.Lgs. 145/2023.</em>
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
        Questo sito è ospitato da <strong>Vercel Inc.</strong>, 340 Pine Street Suite 900, San Francisco, CA 94104, Stati Uniti.<br />
        I dati sono trattati su server situati in Europa (regione eu-west).
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">Proprietà intellettuale</h2>
      <p>
        Tutto il contenuto di questo sito (testi, fotografie, layout) è di proprietà esclusiva di Deschaux Jeanne.
        Qualsiasi riproduzione, anche parziale, è vietata senza previa autorizzazione scritta.
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">Legge applicabile</h2>
      <p>
        Poiché la villa è situata in Italia, le condizioni di locazione sono disciplinate dal diritto italiano (Codice Civile, artt. 1571 e seguenti) e dalla normativa nazionale sulle locazioni turistiche.
        Qualsiasi controversia sarà sottoposta alla competenza dei tribunali di Siracusa (SR), Italia.
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">Pagine collegate</h2>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><a href="/informativa-privacy" className="text-gold-text hover:underline">Informativa sulla privacy</a></li>
        <li><a href="/cookies" className="text-gold-text hover:underline">Politica dei cookie</a></li>
        <li><a href="/condizioni-di-prenotazione" className="text-gold-text hover:underline">Condizioni di prenotazione</a></li>
      </ul>
    </LegalLayout>
  )
}
