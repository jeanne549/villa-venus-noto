'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const T = {
  fr: {
    h1: 'Page introuvable',
    text: "Cette page n'existe pas ou a été déplacée.",
    home: "Retour à l'accueil",
    faq: 'Questions fréquentes →',
  },
  en: {
    h1: 'Page not found',
    text: "This page doesn't exist or has been moved.",
    home: 'Back to home',
    faq: 'FAQ →',
  },
  it: {
    h1: 'Pagina non trovata',
    text: 'Questa pagina non esiste o è stata spostata.',
    home: 'Torna alla home',
    faq: 'Domande frequenti →',
  },
}

export default function LocaleNotFound() {
  const pathname = usePathname() ?? ''
  const locale = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/it') ? 'it' : 'fr'
  const t = T[locale] ?? T.fr

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-display text-xs tracking-[0.4em] uppercase text-gold mb-4">404</p>
        <h1 className="font-serif text-5xl text-charcoal mb-4">{t.h1}</h1>
        <div className="w-16 h-px bg-gold mx-auto my-6" />
        <p className="font-sans text-muted mb-8">{t.text}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/${locale}`} className="btn-primary">{t.home}</Link>
          <Link href={`/${locale}/faq`} className="font-sans text-sm text-gold hover:underline py-3">{t.faq}</Link>
        </div>
      </div>
    </div>
  )
}
