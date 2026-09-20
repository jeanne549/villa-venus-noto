type Lang = 'fr' | 'en' | 'it' | 'de'

const TITLES: Record<Lang, { subtitle: string; title: string }> = {
  fr: { subtitle: 'Réservation directe', title: 'Réservez en toute confiance' },
  en: { subtitle: 'Direct booking',      title: 'Book with complete confidence' },
  it: { subtitle: 'Prenotazione diretta',title: 'Prenotate in tutta tranquillità' },
  de: { subtitle: 'Direktbuchung',       title: 'Sorgenfrei buchen' },
}

const BLOCKS: Record<Lang, { icon: string; title: string; body: string }[]> = {
  fr: [
    {
      icon: '📄',
      title: 'Contrat de location écrit',
      body: 'Un contrat de location complet vous est envoyé par email avant tout versement. Il détaille les dates, le montant total, les conditions d\'annulation et les règles de la villa. Vous signez, vous payez.',
    },
    {
      icon: '💶',
      title: '50 % à la réservation · 50 % à l\'arrivée',
      body: 'L\'acompte confirme votre séjour. Le solde est réglé le jour de votre arrivée, une fois sur place — vous vérifiez la villa avant de payer le reste. Par virement bancaire IBAN.',
    },
    {
      icon: '↩',
      title: 'Annulation claire et équitable',
      body: 'Annulation avant 60 jours : remboursement de l'acompte, frais de dossier déduits. À moins de 60 jours de l'arrivée, l'acompte n'est pas remboursable.',
    },
    {
      icon: '🏡',
      title: 'Emanuele Di Pietro — sur place',
      body: 'Emanuele vous accueille à la villa et reste disponible pendant tout votre séjour. Panne, question, recommandation de restaurant : il est là.',
    },
    {
      icon: '✉',
      title: 'Vous traitez avec le propriétaire',
      body: 'Aucune plateforme entre vous et nous. Vous posez vos questions directement, vous recevez des réponses rapides. Et vous économisez les 15 % de frais de service au passage.',
    },
  ],
  en: [
    {
      icon: '📄',
      title: 'Written rental contract',
      body: 'A complete rental agreement is emailed to you before any payment. It details the dates, total amount, cancellation terms, and house rules. You sign, then you pay.',
    },
    {
      icon: '💶',
      title: '50% at booking · 50% on arrival',
      body: 'The deposit confirms your stay. The balance is paid on arrival day, once on-site — you inspect the villa before settling the remainder. Bank transfer (IBAN).',
    },
    {
      icon: '↩',
      title: 'Fair and clear cancellation policy',
      body: 'Cancellation more than 60 days before arrival: deposit refunded minus admin fees. Within 60 days of arrival, the deposit is non-refundable.',
    },
    {
      icon: '🏡',
      title: 'Emanuele Di Pietro — on-site',
      body: 'Emanuele welcomes you at the villa and is available throughout your stay. Breakdown, question, restaurant recommendation: he is there.',
    },
    {
      icon: '✉',
      title: 'You deal directly with the owner',
      body: 'No platform between you and us. Ask your questions directly, get direct answers — and save the 15% platform service fee in the process.',
    },
  ],
  it: [
    {
      icon: '📄',
      title: 'Contratto di locazione scritto',
      body: 'Un contratto di locazione completo vi viene inviato via email prima di qualsiasi versamento. Dettaglia le date, l\'importo totale, le condizioni di cancellazione e le regole della villa. Firmate, poi pagate.',
    },
    {
      icon: '💶',
      title: '50 % alla prenotazione · 50 % all\'arrivo',
      body: 'Il deposito conferma il vostro soggiorno. Il saldo viene pagato il giorno dell\'arrivo, una volta in loco — verificate la villa prima di saldare il resto. Bonifico bancario (IBAN).',
    },
    {
      icon: '↩',
      title: 'Politica di cancellazione equa e chiara',
      body: 'Cancellazione oltre 60 giorni prima dell'arrivo: acconto rimborsato meno le spese di gestione. Entro 60 giorni dall'arrivo, l'acconto non è rimborsabile.',
    },
    {
      icon: '🏡',
      title: 'Emanuele Di Pietro — sul posto',
      body: 'Emanuele vi accoglie alla villa e rimane disponibile durante tutto il soggiorno. Guasto, domanda, consiglio su ristoranti: lui è lì.',
    },
    {
      icon: '✉',
      title: 'Trattate direttamente con il proprietario',
      body: 'Nessuna piattaforma tra voi e noi. Fate le vostre domande direttamente, ricevete risposte rapide — e risparmiate il 15 % di commissioni.',
    },
  ],
  de: [
    {
      icon: '📄',
      title: 'Schriftlicher Mietvertrag',
      body: 'Ein vollständiger Mietvertrag wird Ihnen vor jeder Zahlung per E-Mail zugesandt. Er enthält Daten, Gesamtbetrag, Stornierungsbedingungen und Hausregeln. Sie unterschreiben, dann zahlen Sie.',
    },
    {
      icon: '💶',
      title: '50 % bei Buchung · 50 % bei Anreise',
      body: 'Die Anzahlung bestätigt Ihren Aufenthalt. Der Restbetrag wird am Anreisetag vor Ort bezahlt — Sie prüfen die Villa, bevor Sie den Rest begleichen. Banküberweisung (IBAN).',
    },
    {
      icon: '↩',
      title: 'Faire und klare Stornobedingungen',
      body: 'Stornierung mehr als 60 Tage vor Anreise: Anzahlung erstattet abzüglich Bearbeitungsgebühr. Innerhalb von 60 Tagen vor Anreise ist die Anzahlung nicht erstattungsfähig.',
    },
    {
      icon: '🏡',
      title: 'Emanuele Di Pietro — vor Ort',
      body: 'Emanuele begrüßt Sie in der Villa und steht während Ihres gesamten Aufenthalts zur Verfügung. Panne, Frage, Restaurantempfehlung: Er ist für Sie da.',
    },
    {
      icon: '✉',
      title: 'Sie verhandeln direkt mit dem Eigentümer',
      body: 'Keine Plattform zwischen Ihnen und uns. Stellen Sie Ihre Fragen direkt, erhalten Sie schnelle Antworten — und sparen Sie die 15 % Plattformgebühren.',
    },
  ],
}

export default function ConfidenceBlock({ lang }: { lang: Lang }) {
  const t = TITLES[lang] ?? TITLES.fr
  const blocks = BLOCKS[lang] ?? BLOCKS.fr

  return (
    <section className="py-16 bg-linen border-t border-gold/20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-10 text-center">
          <p className="section-subtitle">{t.subtitle}</p>
          <h2 className="section-title">{t.title}</h2>
          <div className="gold-divider" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blocks.map((block, i) => (
            <div key={i} className="bg-white border border-gold/20 p-6 flex gap-4 items-start">
              <span className="text-2xl mt-0.5 shrink-0">{block.icon}</span>
              <div>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold-text font-semibold mb-2 leading-snug">{block.title}</p>
                <p className="font-sans text-sm text-muted leading-relaxed">{block.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
