import LegalLayout from '@/components/LegalLayout'
import { Metadata } from 'next'
import { getBreadcrumbSchema } from '@/lib/structured-data'
import { SITE_CONFIG } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Buchungsbedingungen — Villa Vénus Noto',
  robots: { index: false },
}

export default function Buchungsbedingungen() {
  return (
    <LegalLayout title="Buchungsbedingungen" jsonLd={getBreadcrumbSchema([{ name: 'Villa Vénus Noto', item: 'https://www.villavenusnoto.com/de' }, { name: 'Buchungsbedingungen', item: 'https://www.villavenusnoto.com/buchungsbedingungen' }])}>
      <p className="text-xs text-muted">Stand: September 2026</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">1. Gegenstand</h2>
      <p>
        Diese Bedingungen regeln jede Buchung der <strong>Villa Vénus Noto</strong>,
        Eigentum von Deschaux Jeanne (Privatperson), gelegen in Contrada Spaccazza, 96017 Noto SR — Italien.
        Die Eigentümerin ist über den lokalen Verwalter Emanuele Di Pietro erreichbar: +39 348 006 46 72.
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">2. Maximale Belegung</h2>
      <p>Die Villa wird für <strong>maximal 9 Personen</strong> vermietet. Eine Überschreitung dieser Anzahl ist untersagt und führt zur sofortigen Vertragsauflösung ohne Rückerstattung.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">3. Mindestaufenthalt</h2>
      <p>Der Mindestmietzeitraum beträgt <strong>6 Nächte</strong>.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">4. Zahlungsbedingungen</h2>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Anzahlung: 50 %</strong> des Gesamtbetrags, fällig innerhalb von 72 Stunden nach Buchungsbestätigung.</li>
        <li><strong>Restbetrag: 50 %</strong>, fällig am Anreisetag vor der Schlüsselübergabe.</li>
      </ul>
      <p className="mt-3 text-sm text-muted">Die akzeptierten Zahlungsmethoden werden bei der Buchungsbestätigung mitgeteilt.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">5. Stornierungsbedingungen</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Stornierung <strong>mehr als 60 Tage</strong> vor Anreise: Die Anzahlung von 50 % wird erstattet, abzüglich einer Bearbeitungsgebühr.</li>
        <li>Stornierung <strong>60 Tage oder weniger</strong> vor Anreise: Die Anzahlung von 50 % wird einbehalten und ist nicht erstattungsfähig.</li>
        <li>Stornierung nach Zahlung des Restbetrags: keine Rückerstattung.</li>
      </ul>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">6. Kaution</h2>
      <p>Für die Saison 2026–2027 wird keine Kaution erhoben. Der Mieter bleibt für etwaige Schäden an der Villa oder ihrer Einrichtung verantwortlich.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">7. Endreinigung</h2>
      <p>Die Endreinigung ist im Mietpreis <strong>inbegriffen</strong>. Die Gäste sind angehalten, die Villa in einem ordentlichen Zustand zu hinterlassen.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">8. An- und Abreisezeiten</h2>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Check-in</strong>: ab 16:00 Uhr</li>
        <li><strong>Check-out</strong>: bis 10:00 Uhr</li>
      </ul>
      <p className="mt-2 text-sm text-muted">Abweichende Zeiten sind vorab mit dem lokalen Verwalter abzustimmen.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">9. Haustiere</h2>
      <p><strong>Kleine Haustiere</strong> sind nach vorheriger Absprache mit der Eigentümerin willkommen. Sie dürfen nicht den Pool benutzen und dürfen nicht allein in der Villa gelassen werden.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">10. Veranstaltungen und Feiern</h2>
      <p>Partys, Veranstaltungen oder Feiern mit mehr als 9 Personen <strong>sind nicht gestattet</strong>.</p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">11. Kurtaxe</h2>
      <p>
        Gemäß den Vorschriften der Gemeinde Noto gilt für jeden Aufenthalt eine <strong>lokale Kurtaxe</strong>.
        Sie wird für bis zu 6 aufeinanderfolgende Nächte erhoben. Ausnahmen: Kinder unter 14 Jahren und Personen über 75 Jahren.
        Die Kurtaxe wird vor Ort zusätzlich zum Mietpreis erhoben. <strong>Sie beträgt 3 € pro Person und Nacht.</strong>
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">12. Italienische gesetzliche Pflichten</h2>
      <p>
        Gemäß italienischem Recht (D.Lgs 145/2023 und Tourismusgesetzbuch) meldet die Eigentümerin die Gäste innerhalb von 24 Stunden nach Anreise über das Portal <em>Alloggiati Web</em> bei den zuständigen Sicherheitsbehörden an.
        Die Gäste verpflichten sich, die Ausweisdaten aller Unterkunftsgäste bereitzustellen.
      </p>
      <p>
        {SITE_CONFIG.cin && <><strong>CIN (Nationaler Identifikationscode)</strong>: <span className="font-mono">{SITE_CONFIG.cin}</span><br /></>}
        {SITE_CONFIG.cir && <><strong>CIR (Regionaler Identifikationscode)</strong>: <span className="font-mono">{SITE_CONFIG.cir}</span></>}
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">13. Haftung</h2>
      <p>
        Die Eigentümerin haftet nicht für Schäden, die durch missbräuchliche Nutzung der Einrichtungen oder Nichteinhaltung der Sicherheitsvorschriften, insbesondere am Pool, entstehen.
        Die Aufsicht über Kinder und schutzbedürftige Personen obliegt den begleitenden Erwachsenen.
      </p>

      <h2 className="font-serif text-xl text-charcoal mt-8 mb-3">14. Anwendbares Recht und Gerichtsstand</h2>
      <p>
        Diese Bedingungen unterliegen dem italienischen Recht. Alle Streitigkeiten unterliegen der ausschließlichen Zuständigkeit der Gerichte in Syrakus (SR), Italien.
      </p>
    </LegalLayout>
  )
}
