'use client'

import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

const photos = [
  '/photos/pf-piscine.jpg',
  '/photos/pf-vue360.jpg',
  '/photos/villa.jpg',
  '/photos/jardins.jpg',
]
const photoAlts = [
  'Piscine privée 14m × 7m de Villa Vénus',
  'Vue panoramique 360° depuis le rooftop de Villa Vénus',
  'Suites parentales de Villa Vénus',
  'Jardins et situation de Villa Vénus près de Noto',
]

export default function PointsForts() {
  const { t } = useLanguage()

  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="section-subtitle">{t.pointsforts.subtitle}</p>
          <h2 className="section-title whitespace-pre-line">{t.pointsforts.title}</h2>
          <div className="gold-divider" />
          <p className="font-sans text-muted text-base max-w-lg mx-auto leading-relaxed">{t.pointsforts.intro}</p>
        </div>

        <div className="space-y-20">
          {t.pointsforts.points.map((point, i) => (
            <div key={i} className={`grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch ${i % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}>
              <div className={`relative h-[580px] overflow-hidden ${i % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
                <Image src={photos[i]} alt={photoAlts[i]} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-center" />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2">
                  <span className="font-display text-navy text-[10px] tracking-[0.4em] uppercase">{point.label}</span>
                </div>
              </div>
              <div className={`bg-white flex flex-col justify-center px-10 py-14 lg:px-16 ${i % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
                <span className="font-display text-gold-text text-[10px] tracking-[0.5em] uppercase mb-6 block">{point.detail}</span>
                <h3 className="font-serif text-3xl md:text-4xl text-charcoal leading-tight mb-6 whitespace-pre-line">{point.titre}</h3>
                <div className="w-8 h-px bg-gold mb-6" />
                <p className="font-sans text-muted text-base leading-relaxed">{point.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center border-t border-gold/30 pt-16">
          <p className="font-serif text-2xl md:text-3xl text-charcoal mb-4 leading-snug whitespace-pre-line">{t.pointsforts.finale_title}</p>
          <p className="font-sans text-muted text-sm mb-8 max-w-md mx-auto">{t.pointsforts.finale_desc}</p>
          <a href="#contact" className="btn-gold">{t.pointsforts.cta}</a>
        </div>
      </div>
    </section>
  )
}
