'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'
import Lightbox from '@/components/Lightbox'
import { useLanguage } from '@/contexts/LanguageContext'

const amenities = [
  {
    category: 'Piscine & jardins',
    icon: '🏊',
    items: ['Piscine privée 14 m × 7 m', 'Bains de soleil balinais', 'Salon extérieur au bord de la piscine', 'Pergola avec drapés blancs', 'Four à bois', 'Parking privé'],
    photos: [
      { src: '/photos/piscine.jpg',          alt: 'Piscine et transats balinais' },
      { src: '/photos/pergola-piscine.jpg',  alt: 'Pergola au bord de la piscine' },
      { src: '/photos/vue-sur-pergola.jpg',  alt: 'Vue sur la pergola' },
      { src: '/photos/jardin-oliviers.jpg',  alt: 'Allée des jardins entre les oliviers' },
      { src: '/photos/patio-vigne.jpg',      alt: 'Patio couvert de vigne — espace ombragé' },
      { src: '/photos/jardin-palmiers.jpg',  alt: 'Vue sur les jardins et les palmiers' },
    ],
  },
  {
    category: '4 suites parentales',
    icon: '🛏',
    items: ['Suite Agave — devant la piscine', 'Suite Bougainvillea — devant le jardin', 'Suite Gelsomino — devant le jardin', 'Suite Limone — chambre intérieure', 'Salle de bain privée dans chaque suite', 'Terrasse privative dans chaque suite'],
    photos: [
      { src: '/photos/suite1.jpg',               alt: 'Suite parentale — lit double vue jardin' },
      { src: '/photos/suite-parent-piscine2.jpg',alt: 'Suite Agave — vue sur la piscine' },
      { src: '/photos/sdb-suite-parent.jpg',     alt: 'Salle de bain suite parentale' },
      { src: '/photos/suite-gelsomino.jpg',       alt: 'Chambre suite Gelsomino' },
      { src: '/photos/suite-gelsomino-2.jpg',    alt: 'Suite Gelsomino — vue terrasse' },
      { src: '/photos/sdb-gelsomino.jpg',        alt: 'Salle de bain suite Gelsomino' },
      { src: '/photos/suite-bougainvillea.jpg',  alt: 'Chambre suite Bougainvillea' },
      { src: '/photos/suite-enfant.jpg',          alt: 'Suite Bougainvillea — espace enfant' },
      { src: '/photos/sdb-bougainvillea.jpg',    alt: 'Salle de bain suite Bougainvillea' },
      { src: '/photos/suite-limone.jpg',          alt: 'Chambre suite Limone' },
      { src: '/photos/sdb-limone.jpg',            alt: 'Salle de bain suite Limone' },
    ],
  },
  {
    category: 'Rooftop',
    icon: '☀️',
    items: ['Rooftop panoramique 360°', 'Lit rooftop avec coussins', 'Grande table & cuisine extérieure', 'Salon lounge rooftop', 'Espace barbecue & plancha', 'Vue sur les collines de Noto'],
    photos: [
      { src: '/photos/lit-rooftop-vue.jpg', alt: 'Lit rooftop — vue sur la campagne sicilienne' },
      { src: '/photos/salon-rooftop.jpg',   alt: 'Salon lounge rooftop' },
      { src: '/photos/repas-rooftop.jpg',   alt: 'Repas en terrasse sur le rooftop' },
      { src: '/photos/rooftop.jpg',         alt: 'Rooftop — coussins et coucher de soleil' },
      { src: '/photos/vue-rooftop.jpg',     alt: 'Vue panoramique depuis le rooftop' },
      { src: '/photos/barbecue.jpg',        alt: 'Espace barbecue et plancha' },
    ],
  },
]

function MiniCarousel({ photos }: { photos: { src: string; alt: string }[] }) {
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
    <div className="mt-6 border-t border-gray-100 pt-6">
      <div
        className="relative overflow-hidden cursor-zoom-in"
        style={{ aspectRatio: '4/3' }}
        onClick={() => setLightbox({ src: photos[current].src, alt: photos[current].alt })}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          key={current}
          src={photos[current].src}
          alt={photos[current].alt}
          fill
          className="object-cover object-center transition-opacity duration-300"
        />
        <button onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-charcoal w-8 h-8 flex items-center justify-center text-xl shadow transition-all">‹</button>
        <button onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-charcoal w-8 h-8 flex items-center justify-center text-xl shadow transition-all">›</button>
        <div className="absolute bottom-2 right-2 bg-black/40 text-white font-sans text-[10px] px-2 py-0.5 tracking-widest">
          {current + 1} / {total}
        </div>
      </div>
      <div className="flex gap-1 mt-1">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setCurrent(i)}
            className={`relative flex-1 overflow-hidden transition-all ${i === current ? 'ring-2 ring-gold' : 'opacity-40 hover:opacity-70'}`}
            style={{ aspectRatio: '1/1' }}
          >
            <Image src={photo.src} alt={photo.alt} fill className="object-cover object-center" />
          </button>
        ))}
      </div>
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
    </div>
  )
}

const icons = ['🏊', '🛏', '☀️']

export default function Amenities() {
  const { t } = useLanguage()

  const groups = amenities.map((g, i) => ({
    ...g,
    category: t.amenities.categories[i],
    items: t.amenities.items[i],
    icon: icons[i],
  }))

  return (
    <section id="equipements" className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-subtitle">{t.amenities.subtitle}</p>
          <h2 className="section-title">{t.amenities.title}</h2>
          <div className="gold-divider" />
          <p className="font-sans text-muted text-base max-w-xl mx-auto">{t.amenities.intro}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {groups.map((group) => (
            <div key={group.category} className="bg-white border border-gray-100 overflow-hidden">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{group.icon}</span>
                  <h3 className="font-serif text-xl text-charcoal">{group.category}</h3>
                </div>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 font-sans text-sm text-muted">
                      <span className="text-gold mt-0.5 flex-shrink-0">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <MiniCarousel photos={group.photos} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-navy text-white p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif text-2xl mb-4 text-gold-light">La villa inclut</h3>
              <ul className="space-y-2 font-sans text-sm text-white/80">
                <li>✓ Linge de maison fourni</li>
                <li>✓ WiFi haut débit</li>
                <li>✓ Climatisation</li>
                <li>✓ Four à bois</li>
                <li>✓ Parking privé</li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-2xl mb-4 text-gold-light">{t.amenities.info_title}</h3>
              <ul className="space-y-2 font-sans text-sm text-white/80">
                <li>🌵 Suite Agave</li>
                <li>🌸 Suite Bougainvillea</li>
                <li>🌿 Suite Gelsomino</li>
                <li>🍋 Suite Limone</li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-2xl mb-4 text-gold-light">À proximité</h3>
              <ul className="space-y-2 font-sans text-white/80 text-sm">
                <li>🏛 Noto baroque UNESCO — 5 km</li>
                <li>🏖 Plages de Vendicari — 5 km</li>
                <li>🏙 Syracuse / Ortygie — 30 km</li>
                <li>🏰 Ragusa Ibla UNESCO — 45 km</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
