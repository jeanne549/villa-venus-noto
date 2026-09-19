'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { trackEvent } from '@/lib/track'

const LABELS = {
  fr: {
    left: 'Dès 580 € / nuit · Jusqu\'à 9 personnes · 6 nuits minimum',
    cta: 'Vérifier les disponibilités',
    whatsapp: 'WhatsApp',
    direct: 'Réservation directe — sans commission',
  },
  en: {
    left: 'From €580 / night · Up to 9 guests · 6 nights minimum',
    cta: 'Check availability',
    whatsapp: 'WhatsApp',
    direct: 'Direct booking — no commission',
  },
  it: {
    left: 'Da 580 € / notte · Fino a 9 ospiti · 6 notti minimo',
    cta: 'Verifica disponibilità',
    whatsapp: 'WhatsApp',
    direct: 'Prenotazione diretta — senza commissioni',
  },
  de: {
    left: 'Ab 580 € / Nacht · Bis zu 9 Personen · Mindestens 6 Nächte',
    cta: 'Verfügbarkeit prüfen',
    whatsapp: 'WhatsApp',
    direct: 'Direktbuchung — ohne Provision',
  },
}

const WHATSAPP_MESSAGES = {
  fr: encodeURIComponent('Bonjour ! Je souhaite réserver Villa Vénus Noto. Pouvez-vous vérifier les disponibilités ?'),
  en: encodeURIComponent('Hello! I would like to book Villa Vénus Noto. Could you please check availability?'),
  it: encodeURIComponent('Buongiorno! Vorrei prenotare Villa Vénus Noto. Potete verificare la disponibilità?'),
  de: encodeURIComponent('Hallo! Ich möchte die Villa Vénus Noto buchen. Können Sie die Verfügbarkeit prüfen?'),
}

export default function ContactRibbon() {
  const { lang } = useLanguage()
  const l = LABELS[lang]

  return (
    <div className="bg-cream border-y border-sand py-5 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-serif text-charcoal text-base">{l.left}</p>
          <p className="font-sans text-muted text-xs tracking-widest uppercase mt-0.5">{l.direct}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`https://wa.me/33624542995?text=${WHATSAPP_MESSAGES[lang]}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { source: 'ribbon', lang })}
            className="flex items-center gap-2 bg-[#25D366] text-white font-sans text-xs tracking-widest uppercase px-4 py-3 hover:bg-[#20c05e] transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4 shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {l.whatsapp}
          </a>
          <a
            href="#calendrier"
            onClick={() => trackEvent('ribbon_cta_click', { lang })}
            className="bg-navy text-white font-sans text-xs tracking-widest uppercase px-4 py-3 hover:bg-charcoal transition-colors"
          >
            {l.cta}
          </a>
        </div>
      </div>
    </div>
  )
}
