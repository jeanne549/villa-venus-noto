'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'
import Lightbox from '@/components/Lightbox'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Lang } from '@/lib/i18n'

type Photo = { src: string; alt: string; pos: string }

const ESPACES_BY_LANG: Record<Lang, Photo[]> = {
  fr: [
    { src: '/photos/esp-piscine-rooftop.jpg', alt: 'Vue sur la piscine et les jardins depuis le rooftop au coucher du soleil', pos: 'object-center' },
    { src: '/photos/piscine.jpg',             alt: 'Piscine et pergola avec transats balinais', pos: 'object-top' },
    { src: '/photos/esp-gelsomino.jpg',        alt: 'Véranda suite Gelsomino — fauteuil à bascule et vue sur le jardin', pos: 'object-center' },
    { src: '/photos/esp-bougainvillea.jpg',   alt: 'Véranda suite Bougainvillea avec vue sur le jardin', pos: 'object-center' },
    { src: '/photos/esp-bougainvillea-2.jpg', alt: 'Véranda suite Bougainvillea — hamac et terrasse privée', pos: 'object-center' },
    { src: '/photos/esp-patio.jpg',           alt: 'Véranda patio en pierre avec lanternes en rotin', pos: 'object-center' },
    { src: '/photos/esp-patio-jardin.jpg',    alt: 'Patio couvert de vigne avec table et vue sur les jardins', pos: 'object-center' },
    { src: '/photos/esp-lit-rooftop.jpg',     alt: 'Lit rooftop avec coussins colorés et vue coucher de soleil', pos: 'object-center' },
    { src: '/photos/esp-rooftop-table.jpg',   alt: 'Grande table et cuisine extérieure sur le rooftop', pos: 'object-center' },
    { src: '/photos/esp-vue-rooftop.jpg',     alt: 'Vue panoramique depuis le rooftop — palmiers et collines siciliennes', pos: 'object-center' },
    { src: '/photos/photo2.jpg',              alt: 'Vue piscine depuis la véranda au coucher du soleil', pos: 'object-center' },
    { src: '/photos/jardins.jpg',             alt: 'Jardins méditerranéens au soleil couchant', pos: 'object-top' },
  ],
  en: [
    { src: '/photos/esp-piscine-rooftop.jpg', alt: 'Pool and garden view from the rooftop at sunset', pos: 'object-center' },
    { src: '/photos/piscine.jpg',             alt: 'Pool and pergola with Balinese sun loungers', pos: 'object-top' },
    { src: '/photos/esp-gelsomino.jpg',        alt: 'Gelsomino suite veranda — rocking chair and garden view', pos: 'object-center' },
    { src: '/photos/esp-bougainvillea.jpg',   alt: 'Bougainvillea suite veranda with garden view', pos: 'object-center' },
    { src: '/photos/esp-bougainvillea-2.jpg', alt: 'Bougainvillea suite veranda — hammock and private terrace', pos: 'object-center' },
    { src: '/photos/esp-patio.jpg',           alt: 'Stone patio veranda with rattan lanterns', pos: 'object-center' },
    { src: '/photos/esp-patio-jardin.jpg',    alt: 'Vine-covered patio with table and garden view', pos: 'object-center' },
    { src: '/photos/esp-lit-rooftop.jpg',     alt: 'Rooftop daybed with colourful cushions and sunset view', pos: 'object-center' },
    { src: '/photos/esp-rooftop-table.jpg',   alt: 'Large table and outdoor kitchen on the rooftop', pos: 'object-center' },
    { src: '/photos/esp-vue-rooftop.jpg',     alt: 'Panoramic rooftop view — palm trees and Sicilian hills', pos: 'object-center' },
    { src: '/photos/photo2.jpg',              alt: 'Pool view from the veranda at sunset', pos: 'object-center' },
    { src: '/photos/jardins.jpg',             alt: 'Mediterranean gardens at dusk', pos: 'object-top' },
  ],
  it: [
    { src: '/photos/esp-piscine-rooftop.jpg', alt: 'Vista sulla piscina e i giardini dal rooftop al tramonto', pos: 'object-center' },
    { src: '/photos/piscine.jpg',             alt: 'Piscina e pergola con lettini balinesi', pos: 'object-top' },
    { src: '/photos/esp-gelsomino.jpg',        alt: 'Veranda suite Gelsomino — sedia a dondolo e vista giardino', pos: 'object-center' },
    { src: '/photos/esp-bougainvillea.jpg',   alt: 'Veranda suite Bougainvillea con vista giardino', pos: 'object-center' },
    { src: '/photos/esp-bougainvillea-2.jpg', alt: 'Veranda suite Bougainvillea — amaca e terrazza privata', pos: 'object-center' },
    { src: '/photos/esp-patio.jpg',           alt: 'Veranda patio in pietra con lanterne in rattan', pos: 'object-center' },
    { src: '/photos/esp-patio-jardin.jpg',    alt: 'Patio coperto di vite con tavolo e vista giardino', pos: 'object-center' },
    { src: '/photos/esp-lit-rooftop.jpg',     alt: 'Letto rooftop con cuscini colorati e vista tramonto', pos: 'object-center' },
    { src: '/photos/esp-rooftop-table.jpg',   alt: 'Grande tavolo e cucina esterna sul rooftop', pos: 'object-center' },
    { src: '/photos/esp-vue-rooftop.jpg',     alt: 'Vista panoramica dal rooftop — palme e colline siciliane', pos: 'object-center' },
    { src: '/photos/photo2.jpg',              alt: 'Vista piscina dalla veranda al tramonto', pos: 'object-center' },
    { src: '/photos/jardins.jpg',             alt: 'Giardini mediterranei al tramonto', pos: 'object-top' },
  ],
  de: [
    { src: '/photos/esp-piscine-rooftop.jpg', alt: 'Blick auf Pool und Gärten vom Rooftop bei Sonnenuntergang', pos: 'object-center' },
    { src: '/photos/piscine.jpg',             alt: 'Pool und Pergola mit balinesischen Liegestühlen', pos: 'object-top' },
    { src: '/photos/esp-gelsomino.jpg',        alt: 'Veranda der Suite Gelsomino — Schaukelstuhl und Gartenblick', pos: 'object-center' },
    { src: '/photos/esp-bougainvillea.jpg',   alt: 'Veranda der Suite Bougainvillea mit Gartenblick', pos: 'object-center' },
    { src: '/photos/esp-bougainvillea-2.jpg', alt: 'Veranda der Suite Bougainvillea — Hängematte und private Terrasse', pos: 'object-center' },
    { src: '/photos/esp-patio.jpg',           alt: 'Steinveranda mit Rattanlaternen', pos: 'object-center' },
    { src: '/photos/esp-patio-jardin.jpg',    alt: 'Weinberankte Veranda mit Tisch und Gartenblick', pos: 'object-center' },
    { src: '/photos/esp-lit-rooftop.jpg',     alt: 'Rooftop-Tagesbett mit bunten Kissen und Sonnenuntergang', pos: 'object-center' },
    { src: '/photos/esp-rooftop-table.jpg',   alt: 'Großer Tisch und Außenküche auf dem Rooftop', pos: 'object-center' },
    { src: '/photos/esp-vue-rooftop.jpg',     alt: 'Panoramablick vom Rooftop — Palmen und sizilianische Hügel', pos: 'object-center' },
    { src: '/photos/photo2.jpg',              alt: 'Poolblick von der Veranda bei Sonnenuntergang', pos: 'object-center' },
    { src: '/photos/jardins.jpg',             alt: 'Mediterrane Gärten in der Abenddämmerung', pos: 'object-top' },
  ],
}

const HISTOIRE_ALT: Record<Lang, string> = {
  fr: 'Vue depuis le salon extérieur sur la piscine et la villa au coucher du soleil',
  en: 'View from the outdoor lounge over the pool and villa at sunset',
  it: 'Vista dal salotto esterno sulla piscina e la villa al tramonto',
  de: 'Blick vom Außenwohnbereich auf Pool und Villa bei Sonnenuntergang',
}

export default function About() {
  const { t, lang } = useLanguage()
  const espacesPhotos = ESPACES_BY_LANG[lang] ?? ESPACES_BY_LANG.fr
  const [current, setCurrent] = useState(0)
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const total = espacesPhotos.length
  const touchStartX = useRef(0)
  const prev = () => setCurrent((c) => (c - 1 + total) % total)
  const next = () => setCurrent((c) => (c + 1) % total)
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.targetTouches[0].clientX }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
  }

  return (
    <section id="villa" className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-subtitle">{t.about.subtitle}</p>
          <h2 className="section-title whitespace-pre-line">{t.about.title}</h2>
          <div className="gold-divider" />
          <p className="font-sans text-muted text-base leading-relaxed max-w-2xl mx-auto">{t.about.intro}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
            <div className="relative h-[720px] overflow-hidden">
              <Image src="/photos/histoire.jpg" alt={HISTOIRE_ALT[lang]} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-center" />
            </div>
          </div>

          <div className="lg:pl-8">
            <p className="section-subtitle">{t.about.histoire_subtitle}</p>
            <h3 className="font-serif text-3xl md:text-4xl text-charcoal mb-6 leading-tight whitespace-pre-line">{t.about.histoire_title}</h3>
            <p className="font-sans text-muted leading-relaxed mb-6">{t.about.histoire_p1}</p>
            <p className="font-sans text-muted leading-relaxed mb-4">{t.about.histoire_p2}</p>
            <p className="font-sans text-muted leading-relaxed mb-4">{t.about.histoire_p3}</p>
            <p className="font-sans text-muted leading-relaxed mb-8">{t.about.histoire_p4}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {t.about.stats.map((value, i) => (
                <div key={i} className="border-l-2 border-gold pl-4">
                  <p className="font-serif text-2xl text-charcoal">{value}</p>
                  <p className="font-sans text-xs text-muted tracking-wide uppercase">{t.about.stats_labels[i]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="espaces" className="max-w-3xl mx-auto text-center mb-6">
          <p className="section-subtitle">{t.about.espaces_subtitle}</p>
          <h3 className="font-serif text-3xl md:text-4xl text-charcoal mb-6 leading-tight whitespace-pre-line">{t.about.espaces_title}</h3>
          <p className="font-sans text-muted leading-relaxed mb-10">{t.about.espaces_desc}</p>
        </div>

        {/* Carrousel des espaces */}
        <div className="relative mb-10 max-w-4xl mx-auto">
          {/* Photo principale */}
          <div
            className="relative overflow-hidden cursor-zoom-in"
            style={{ aspectRatio: '4/3' }}
            onClick={() => setLightbox({ src: espacesPhotos[current].src, alt: espacesPhotos[current].alt })}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              key={current}
              src={espacesPhotos[current].src}
              alt={espacesPhotos[current].alt}
              fill
              sizes="(max-width: 896px) calc(100vw - 48px), 848px"
              className={`object-cover ${espacesPhotos[current].pos} transition-opacity duration-500`}
            />
            {/* Flèche gauche */}
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-charcoal w-10 h-10 flex items-center justify-center transition-all duration-200 shadow-md"
              aria-label="Photo précédente"
            >
              ‹
            </button>
            {/* Flèche droite */}
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-charcoal w-10 h-10 flex items-center justify-center transition-all duration-200 shadow-md"
              aria-label="Photo suivante"
            >
              ›
            </button>
            {/* Compteur */}
            <div className="absolute bottom-4 right-4 bg-black/40 text-white font-sans text-xs px-3 py-1 tracking-widest">
              {current + 1} / {total}
            </div>
          </div>

          {/* Vignettes */}
          <div className="flex gap-2 mt-2">
            {espacesPhotos.map((photo, i) => (
              <button
                key={photo.src}
                onClick={() => setCurrent(i)}
                className={`relative flex-1 overflow-hidden transition-all duration-200 ${i === current ? 'ring-2 ring-gold' : 'opacity-60 hover:opacity-100'}`}
                style={{ aspectRatio: '1/1' }}
              >
                <Image src={photo.src} alt={photo.alt} fill sizes="80px" className={`object-cover ${photo.pos}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="text-center">
          <a href="#equipements" className="btn-outline">{t.about.cta_equipements}</a>
        </div>

      </div>
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
    </section>
  )
}
