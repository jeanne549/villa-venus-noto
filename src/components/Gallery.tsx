'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'
import Lightbox from '@/components/Lightbox'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Lang } from '@/lib/i18n'

const PHOTOS_BY_LANG: Record<Lang, { src: string; alt: string }[]> = {
  fr: [
    { src: '/photos/piscine.jpg',             alt: 'Piscine privée et pergola avec drapés blancs' },
    { src: '/photos/histoire.jpg',            alt: 'Salon extérieur et vue sur la piscine au coucher du soleil' },
    { src: '/photos/photo2.jpg',              alt: 'Vue panoramique piscine depuis la véranda' },
    { src: '/photos/photo3.jpg',              alt: 'Terrasse avec salon en rotin et vue jardins' },
    { src: '/photos/rooftop.jpg',             alt: 'Rooftop au coucher du soleil' },
    { src: '/photos/jardins.jpg',             alt: 'Jardins méditerranéens au soleil couchant' },
    { src: '/photos/veranda.jpg',             alt: 'Terrasse avec mobilier rotin et vue piscine' },
    { src: '/photos/salon.jpg',               alt: 'Salon intérieur de Villa Vénus' },
    { src: '/photos/facade.jpg',              alt: 'Jardins et bougainvillées de la villa' },
    { src: '/photos/pf-coucher-soleil.jpg',   alt: 'Coucher de soleil depuis le rooftop de Villa Vénus' },
    { src: '/photos/vue-sur-pergola.jpg',     alt: 'Vue sur la pergola et le jardin' },
  ],
  en: [
    { src: '/photos/piscine.jpg',             alt: 'Private pool and pergola with white drapes' },
    { src: '/photos/histoire.jpg',            alt: 'Outdoor lounge and pool view at sunset' },
    { src: '/photos/photo2.jpg',              alt: 'Panoramic pool view from the veranda' },
    { src: '/photos/photo3.jpg',              alt: 'Terrace with rattan furniture and garden view' },
    { src: '/photos/rooftop.jpg',             alt: 'Rooftop at sunset' },
    { src: '/photos/jardins.jpg',             alt: 'Mediterranean gardens at dusk' },
    { src: '/photos/veranda.jpg',             alt: 'Terrace with rattan furniture and pool view' },
    { src: '/photos/salon.jpg',               alt: 'Interior lounge of Villa Vénus' },
    { src: '/photos/facade.jpg',              alt: 'Villa gardens and bougainvillea' },
    { src: '/photos/pf-coucher-soleil.jpg',   alt: 'Sunset from the Villa Vénus rooftop' },
    { src: '/photos/vue-sur-pergola.jpg',     alt: 'View of the pergola and garden' },
  ],
  it: [
    { src: '/photos/piscine.jpg',             alt: 'Piscina privata e pergola con tende bianche' },
    { src: '/photos/histoire.jpg',            alt: 'Salotto esterno e vista piscina al tramonto' },
    { src: '/photos/photo2.jpg',              alt: 'Vista panoramica piscina dalla veranda' },
    { src: '/photos/photo3.jpg',              alt: 'Terrazza con divani in rattan e vista giardino' },
    { src: '/photos/rooftop.jpg',             alt: 'Rooftop al tramonto' },
    { src: '/photos/jardins.jpg',             alt: 'Giardini mediterranei al tramonto' },
    { src: '/photos/veranda.jpg',             alt: 'Terrazza con mobili in rattan e vista piscina' },
    { src: '/photos/salon.jpg',               alt: 'Salotto interno di Villa Vénus' },
    { src: '/photos/facade.jpg',              alt: 'Giardini e bouganville della villa' },
    { src: '/photos/pf-coucher-soleil.jpg',   alt: 'Tramonto dal rooftop di Villa Vénus' },
    { src: '/photos/vue-sur-pergola.jpg',     alt: 'Vista sulla pergola e il giardino' },
  ],
  de: [
    { src: '/photos/piscine.jpg',             alt: 'Privater Pool und Pergola mit weißen Vorhängen' },
    { src: '/photos/histoire.jpg',            alt: 'Außenwohnbereich und Poolblick bei Sonnenuntergang' },
    { src: '/photos/photo2.jpg',              alt: 'Panoramablick auf den Pool von der Veranda' },
    { src: '/photos/photo3.jpg',              alt: 'Terrasse mit Rattanmöbeln und Gartenblick' },
    { src: '/photos/rooftop.jpg',             alt: 'Rooftop bei Sonnenuntergang' },
    { src: '/photos/jardins.jpg',             alt: 'Mediterrane Gärten in der Abenddämmerung' },
    { src: '/photos/veranda.jpg',             alt: 'Terrasse mit Rattanmöbeln und Poolblick' },
    { src: '/photos/salon.jpg',               alt: 'Wohnzimmer der Villa Vénus' },
    { src: '/photos/facade.jpg',              alt: 'Gärten und Bougainvilleen der Villa' },
    { src: '/photos/pf-coucher-soleil.jpg',   alt: 'Sonnenuntergang vom Rooftop der Villa Vénus' },
    { src: '/photos/vue-sur-pergola.jpg',     alt: 'Blick auf die Pergola und den Garten' },
  ],
}

export default function Gallery() {
  const { t, lang } = useLanguage()
  const photos = PHOTOS_BY_LANG[lang] ?? PHOTOS_BY_LANG.fr
  const [current, setCurrent] = useState(0)
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const total = photos.length
  const touchStartX = useRef(0)

  const prev = () => setCurrent((c) => (c - 1 + total) % total)
  const next = () => setCurrent((c) => (c + 1) % total)
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.targetTouches[0].clientX }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
  }

  return (
    <section id="galerie" className="py-24 lg:py-32 bg-linen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-subtitle">{t.gallery.subtitle}</p>
          <h2 className="section-title">{t.gallery.title}</h2>
          <div className="gold-divider" />
        </div>

        <div className="relative overflow-hidden mb-3 cursor-zoom-in" style={{ aspectRatio: '16/9' }}
          onClick={() => setLightbox({ src: photos[current].src, alt: photos[current].alt })}
          onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <Image key={current} src={photos[current].src} alt={photos[current].alt} fill sizes="(max-width: 1280px) calc(100vw - 48px), 1184px" className="object-cover object-center transition-opacity duration-500" />
          <button onClick={(e) => { e.stopPropagation(); prev() }} aria-label="Précédent"
            className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-charcoal w-12 h-12 flex items-center justify-center text-2xl shadow-md transition-all duration-200">‹</button>
          <button onClick={(e) => { e.stopPropagation(); next() }} aria-label="Suivant"
            className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-charcoal w-12 h-12 flex items-center justify-center text-2xl shadow-md transition-all duration-200">›</button>
          <div className="absolute bottom-5 right-5 bg-black/40 text-white font-sans text-xs px-4 py-2 tracking-widest">{current + 1} / {total}</div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-6 pb-5 pt-10">
            <p className="font-sans text-white/90 text-sm tracking-wide">{photos[current].alt}</p>
          </div>
        </div>

        <div className="flex gap-2">
          {photos.map((photo, i) => (
            <button key={photo.src} onClick={() => setCurrent(i)}
              className={`relative flex-1 overflow-hidden transition-all duration-200 ${i === current ? 'ring-2 ring-gold' : 'opacity-50 hover:opacity-80'}`}
              style={{ aspectRatio: '1/1' }}>
              <Image src={photo.src} alt={photo.alt} fill sizes="100px" className="object-cover object-center" />
            </button>
          ))}
        </div>
      </div>
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
    </section>
  )
}
