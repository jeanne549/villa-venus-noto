'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackEvent } from '@/lib/track'

const DIRECT_BADGE = {
  fr: 'Réservation directe · Sans commission',
  en: 'Direct booking · No commission',
  it: 'Prenotazione diretta · Senza commissioni',
  de: 'Direktbuchung · Ohne Provision',
}

const PRICE_FROM = {
  fr: 'Dès 580 € / nuit · jusqu\'à 9 personnes',
  en: 'From €580 / night · up to 9 guests',
  it: 'Da 580 € / notte · fino a 9 ospiti',
  de: 'Ab 580 € / Nacht · bis zu 9 Personen',
}

export default function Hero() {
  const { t, lang } = useLanguage()
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      <div ref={parallaxRef} className="absolute inset-0 scale-110">
        <Image src="/photos/hero.jpg" alt={lang === 'en' ? 'Villa Vénus Noto — private pool and gardens in Sicily' : lang === 'it' ? 'Villa Vénus Noto — piscina privata e giardini in Sicilia' : lang === 'de' ? 'Villa Vénus Noto — privater Pool und Gärten in Sizilien' : 'Villa Vénus Noto — piscine et jardins en Sicile'} fill sizes="100vw" className="object-cover object-center" priority />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/60" />

      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
        <div className="w-px h-24 bg-white/30" />
        <span className="text-white/60 font-sans text-[10px] tracking-[0.4em] uppercase rotate-90 my-4 whitespace-nowrap">Scroll</span>
        <div className="w-px h-24 bg-white/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
        <div className="max-w-3xl">
          <p className="font-display text-gold-light text-xs tracking-[0.5em] uppercase mb-6">{t.hero.location}</p>
          <h1 className="font-serif text-white text-5xl md:text-7xl lg:text-8xl leading-none mb-6">
            Villa Vénus<br /><em className="not-italic text-gold-light">Noto</em>
          </h1>
          <div className="w-16 h-px bg-gold my-8" />
          <p className="font-sans text-white/80 text-lg md:text-xl leading-relaxed max-w-xl mb-4">{t.hero.description}</p>

          {/* Prix dès le premier écran */}
          <p className="font-serif text-gold-light text-base md:text-lg mb-2">{PRICE_FROM[lang]}</p>
          <p className="font-sans text-white/50 text-xs tracking-[0.25em] uppercase mb-8">{DIRECT_BADGE[lang]}</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#calendrier"
              onClick={() => trackEvent('hero_cta_click', { source: 'primary', lang })}
              className="btn-gold"
            >
              {t.hero.cta_book}
            </a>
            <a href="#villa" className="border border-white/70 text-white px-8 py-4 font-sans text-sm tracking-widest uppercase hover:bg-white hover:text-navy transition-all duration-300 inline-flex items-center gap-2">
              {t.hero.cta_discover}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-8 justify-center md:justify-between">
          {[
            { label: t.hero.stats_suites, value: '4' },
            { label: t.hero.stats_capacity, value: lang === 'en' ? '9 guests' : lang === 'de' ? '9 Pers.' : '9 pers.' },
            { label: t.hero.stats_pool, value: '14 m × 7 m' },
            { label: t.hero.stats_rooftop, value: '360°' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="font-serif text-white text-xl">{item.value}</p>
              <p className="font-sans text-white/60 text-xs tracking-widest uppercase">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
