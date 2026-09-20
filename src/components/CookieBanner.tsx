'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const STORAGE_KEY = 'villa_cookie_consent'

const texts = {
  fr: {
    message: "Ce site peut utiliser Google Analytics et Meta Pixel pour mesurer son audience. Ces outils ne s'activent qu'avec votre accord.",
    accept: 'Accepter',
    refuse: 'Refuser',
    policy: 'Politique cookies',
  },
  en: {
    message: 'This site may use Google Analytics and Meta Pixel to measure its audience. These tools activate only with your consent.',
    accept: 'Accept',
    refuse: 'Decline',
    policy: 'Cookie policy',
  },
  it: {
    message: "Questo sito può utilizzare Google Analytics e Meta Pixel per misurare l'audience. Questi strumenti si attivano solo con il tuo consenso.",
    accept: 'Accetta',
    refuse: 'Rifiuta',
    policy: 'Politica cookie',
  },
}

export function hasAnalyticsConsent(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'accepted'
  } catch {
    return false
  }
}

export default function CookieBanner() {
  const { lang } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) setVisible(true)
    } catch {
      // localStorage blocked — don't show banner
    }
  }, [])

  const choose = (value: 'accepted' | 'refused') => {
    try {
      localStorage.setItem(STORAGE_KEY, value)
      if (value === 'accepted') {
        window.dispatchEvent(new Event('villa:consent:accepted'))
      }
    } catch {
      // ignore
    }
    setVisible(false)
  }

  if (!visible) return null

  const tc = texts[lang as keyof typeof texts] ?? texts.fr

  return (
    <div
      role="dialog"
      aria-label="Consentement aux cookies"
      className="fixed bottom-0 left-0 right-0 z-50 bg-navy text-white px-6 py-4 shadow-2xl"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="font-sans text-sm text-white/80 flex-1">
          {tc.message}{' '}
          <Link href="/cookies" className="text-gold-text hover:underline whitespace-nowrap">
            {tc.policy}
          </Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => choose('refused')}
            className="font-sans text-xs tracking-widest uppercase text-white border border-white px-5 py-2 hover:bg-white/10 transition-colors"
          >
            {tc.refuse}
          </button>
          <button
            onClick={() => choose('accepted')}
            className="font-sans text-xs tracking-widest uppercase bg-gold text-navy border border-gold hover:bg-gold/90 px-5 py-2 font-semibold transition-colors"
          >
            {tc.accept}
          </button>
        </div>
      </div>
    </div>
  )
}
