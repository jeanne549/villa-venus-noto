import LegalLayout from '@/components/LegalLayout'
import { Metadata } from 'next'
import { getBreadcrumbSchema } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung — Villa Vénus Noto',
  robots: { index: false },
}

export default function Datenschutz() {
  return (
    <LegalLayout title="Datenschutzerklärung" jsonLd={getBreadcrumbSchema([{ name: 'Villa Vénus Noto', item: 'https://www.villavenusnoto.com/de' }, { name: 'Datenschutzerklärung', item: 'https://www.villavenusnoto.com/datenschutz' }])}>
      <p className="text-xs text-muted">Stand: September 2026</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">1. Verantwortliche Person</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der DSGVO:<br />
        <strong>Deschaux Jeanne</strong><br />
        c/o Mme Paola Deschaux Dimaio, Largo Nazario Sauro 4, 96017 Noto (SR) — Italien<br />
        E-Mail: <a href="mailto:contact@villavenusnoto.com" className="text-gold-text hover:underline">contact@villavenusnoto.com</a><br />
        WhatsApp: +33 6 24 54 29 95
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">2. Erhobene Daten</h2>
      <p>Im Rahmen einer Buchungsanfrage erheben wir folgende personenbezogene Daten:</p>
      <ul className="list-disc list-inside space-y-1 text-sm mt-2">
        <li>Vor- und Nachname</li>
        <li>E-Mail-Adresse</li>
        <li>Telefonnummer</li>
        <li>Anreise- und Abreisedatum sowie Anzahl der Gäste</li>
        <li>Eventuell mitgeteilte Nachrichten und besondere Anfragen</li>
      </ul>
      <p className="mt-3">
        Darüber hinaus erhebt der Hostinganbieter Vercel Inc. technische Daten (Server-Logs, IP-Adressen) für den Betrieb der Website.
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">3. Zweck und Rechtsgrundlage der Verarbeitung</h2>
      <p>
        Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Buchungsanfrage und zur Durchführung des Mietvertrags verarbeitet (Art. 6 Abs. 1 lit. b DSGVO).
        Wir verwenden Ihre Kontaktdaten nicht für Werbezwecke, es sei denn, Sie haben ausdrücklich zugestimmt.
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">4. Weitergabe an Dritte</h2>
      <p>
        Ihre Daten werden nicht an Dritte verkauft. Im Rahmen der gesetzlichen Pflichten (D.Lgs 145/2023) werden die Gästenamen und Ausweisdaten der zuständigen italienischen Sicherheitsbehörde über das Portal <em>Alloggiati Web</em> übermittelt.
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">5. Speicherdauer</h2>
      <p>
        Buchungsdaten werden für den Zeitraum aufbewahrt, der zur Erfüllung steuerlicher und rechtlicher Verpflichtungen erforderlich ist (in der Regel 5 Jahre), danach werden sie gelöscht.
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">6. Ihre Rechte</h2>
      <p>Sie haben das Recht auf:</p>
      <ul className="list-disc list-inside space-y-1 text-sm mt-2">
        <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
        <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
      </ul>
      <p className="mt-3">
        Um diese Rechte geltend zu machen, wenden Sie sich bitte per E-Mail an: <a href="mailto:contact@villavenusnoto.com" className="text-gold-text hover:underline">contact@villavenusnoto.com</a>.
      </p>
      <p className="mt-3">
        Sie haben außerdem das Recht, bei einer Datenschutz-Aufsichtsbehörde Beschwerde einzulegen. Die zuständige Behörde in Italien ist der <em>Garante per la protezione dei dati personali</em> (<a href="https://www.garanteprivacy.it" className="text-gold-text hover:underline" target="_blank" rel="noopener noreferrer">www.garanteprivacy.it</a>).
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">7. Cookies</h2>
      <p>
        Diese Website verwendet technisch notwendige Cookies sowie optionale Analyse-Cookies.
        Weitere Informationen finden Sie in unserer <a href="/cookies" className="text-gold-text hover:underline">Cookie-Richtlinie</a>.
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">8. Anwendbares Recht</h2>
      <p>
        Diese Datenschutzerklärung unterliegt der DSGVO (EU 2016/679) sowie dem italienischen Datenschutzrecht (D.Lgs 196/2003 in seiner aktuellen Fassung).
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">Weiterführende Links</h2>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><a href="/impressum" className="text-gold-text hover:underline">Impressum</a></li>
        <li><a href="/cookies" className="text-gold-text hover:underline">Cookie-Richtlinie</a></li>
        <li><a href="/buchungsbedingungen" className="text-gold-text hover:underline">Buchungsbedingungen</a></li>
      </ul>
    </LegalLayout>
  )
}
