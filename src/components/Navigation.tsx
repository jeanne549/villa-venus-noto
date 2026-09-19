'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Lang } from '@/lib/i18n'
import { trackEvent } from '@/lib/track'

const flags: { lang: Lang; flag: string; label: string }[] = [
  { lang: 'fr', flag: '🇫🇷', label: 'Français' },
  { lang: 'it', flag: '🇮🇹', label: 'Italiano' },
  { lang: 'en', flag: '🇬🇧', label: 'English' },
  { lang: 'de', flag: '🇩🇪', label: 'Deutsch' },
]

export default function Navigation() {
  const { t, lang, setLang } = useLanguage()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const switchLang = (l: Lang) => {
    trackEvent('language_changed', { from: lang, to: l })
    setLang(l)
    router.push(`/${l}`)
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = [
    { href: '#villa', label: t.nav.villa },
    { href: '#espaces', label: t.nav.espaces },
    { href: '#galerie', label: t.nav.galerie },
    { href: '#equipements', label: t.nav.equipements },
    { href: '#disponibilites', label: t.nav.tarifs },
    { href: '#contact', label: t.nav.reserver },
  ]

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href={`/${lang}`} className="flex flex-col items-start">
            <span className={`font-display text-lg tracking-[0.2em] uppercase transition-colors duration-300 ${scrolled && !menuOpen ? 'text-navy' : 'text-white'}`}>
              Villa Vénus Noto
            </span>
            <span className={`font-sans text-[10px] tracking-[0.4em] uppercase transition-colors duration-300 ${scrolled && !menuOpen ? 'text-gold' : 'text-gold-light'}`}>
              {t.hero.location}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}
                className={`font-sans text-xs tracking-widest uppercase transition-colors duration-300 ${scrolled ? 'text-charcoal hover:text-navy' : 'text-white/90 hover:text-white'}`}>
                {link.label}
              </a>
            ))}

            {/* Drapeaux desktop */}
            <div className="flex items-center gap-1 ml-2 border-l border-white/20 pl-4">
              {flags.map(({ lang: l, flag }) => (
                <button key={l} onClick={() => switchLang(l)} title={l.toUpperCase()}
                  className={`text-lg leading-none transition-all duration-200 ${lang === l ? 'opacity-100 scale-110' : 'opacity-40 hover:opacity-80'}`}>
                  {flag}
                </button>
              ))}
            </div>

            <a href="#disponibilites"
              className={`font-sans text-xs tracking-widest uppercase px-5 py-3 border transition-all duration-300 ${scrolled ? 'border-navy text-navy hover:bg-navy hover:text-white' : 'border-white/70 text-white hover:bg-white hover:text-navy'}`}>
              {t.nav.disponibilites}
            </a>
          </nav>

          {/* Mobile: drapeaux + burger */}
          <div className="md:hidden flex items-center gap-3">
            <div className="flex items-center gap-1">
              {flags.map(({ lang: l, flag }) => (
                <button key={l} onClick={() => switchLang(l)}
                  className={`text-lg leading-none transition-all ${lang === l ? 'opacity-100' : 'opacity-30 hover:opacity-70'}`}>
                  {flag}
                </button>
              ))}
            </div>
            <button className="flex flex-col gap-1.5 p-2 z-10" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <span className={`w-6 h-px transition-all duration-300 bg-white ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-px transition-all duration-300 bg-white ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-px transition-all duration-300 bg-white ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile plein écran */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'rgba(16, 28, 55, 0.98)' }}>
        <div className="flex flex-col items-center justify-center h-full gap-0 px-8">
          <p className="font-display text-white/40 text-[10px] tracking-[0.5em] uppercase mb-12">
            {t.hero.location}
          </p>
          <nav className="flex flex-col items-center gap-6 w-full">
            {navLinks.map((link, i) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                className="font-serif text-white text-3xl hover:text-gold transition-colors duration-300 text-center"
                style={{ transitionDelay: menuOpen ? `${i * 50}ms` : '0ms' }}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="w-16 h-px bg-gold my-10" />
          <a href="#contact" onClick={() => setMenuOpen(false)}
            className="border border-gold text-gold font-sans text-xs tracking-widest uppercase px-10 py-4 hover:bg-gold hover:text-white transition-all duration-300">
            {t.nav.reserver}
          </a>
          <p className="font-sans text-white/30 text-xs tracking-widest uppercase mt-12 text-center">
            Contrada Spaccazza · Noto, Sicile
          </p>
        </div>
      </div>
    </>
  )
}
