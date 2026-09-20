'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useLanguage } from '@/contexts/LanguageContext'

const AIRBNB_URL = 'https://www.airbnb.com/rooms/10029361'

type Review = { id: string; name: string; origin: string | null; rating: number; text: string; created_at: string }

export default function Testimonials() {
  const { t } = useLanguage()
  const tt = t.testimonials
  const [reviews, setReviews] = useState<Review[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    supabase.from('reviews').select('*').eq('status', 'approved').order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setReviews(data)
        setLoaded(true)
      })
  }, [])

  const avgRating = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null

  return (
    <section className="py-24 lg:py-32 bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="font-display text-xs tracking-[0.3em] uppercase text-gold-text mb-4">{tt.subtitle}</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white">{tt.title}</h2>
          <div className="w-16 h-px bg-gold mx-auto my-6" />
        </div>

        {/* Cas 1 : aucun avis approuvé → bloc honnête + lien Airbnb */}
        {loaded && reviews.length === 0 && (
          <div className="max-w-2xl mx-auto text-center border border-white/10 px-10 py-14">
            <p className="font-serif text-2xl text-white mb-4">{tt.airbnb_title}</p>
            <div className="w-10 h-px bg-gold mx-auto mb-6" />
            <p className="font-sans text-white/70 leading-relaxed mb-8">{tt.airbnb_text}</p>
            <a
              href={AIRBNB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-gold text-gold-text font-sans text-xs tracking-widest uppercase px-8 py-4 hover:bg-gold hover:text-white transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 6.628 5.374 12 12 12 6.627 0 12-5.372 12-12C24 5.373 18.627 0 12 0zm5.491 16.784c-.182.312-.47.512-.79.55-.32.04-.644-.09-.877-.35l-3.1-3.54-.793.91v2.09c0 .414-.336.75-.75.75s-.75-.336-.75-.75V7.5c0-.414.336-.75.75-.75s.75.336.75.75v4.636l3.564-4.084c.232-.266.558-.398.885-.358.327.04.616.241.793.55.177.308.192.678.04.999l-2.365 2.71 2.605 2.977c.24.275.304.655.14.972l-.052.082z"/>
              </svg>
              {tt.airbnb_cta}
            </a>
            <p className="font-sans text-white/30 text-xs mt-6 tracking-wide">{tt.airbnb_source}</p>
          </div>
        )}

        {/* Cas 2 : vrais avis approuvés */}
        {reviews.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map(r => (
                <div key={r.id} className="border border-white/10 p-8 flex flex-col">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <span key={j} className="text-gold-text text-lg">★</span>
                    ))}
                  </div>
                  <p className="font-sans text-white/80 leading-relaxed flex-1 mb-6 text-sm italic">&ldquo;{r.text}&rdquo;</p>
                  <div className="border-t border-white/10 pt-4">
                    <p className="font-serif text-white">{r.name}</p>
                    {r.origin && <p className="font-sans text-white/50 text-xs tracking-wide">{r.origin}</p>}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`text-xl ${i < Math.round(parseFloat(avgRating!)) ? 'text-gold-text' : 'text-white/20'}`}>★</span>
                ))}
              </div>
              <p className="font-sans text-white/60 text-sm">{tt.note_avg(avgRating!, reviews.length)}</p>
            </div>
          </>
        )}

        {/* CTA "Laisser un avis" — toujours visible */}
        <div className="text-center mt-10">
          <a href="#avis" className="inline-block border border-gold text-gold-text font-sans text-xs tracking-widest uppercase px-8 py-3 hover:bg-gold hover:text-white transition-all duration-300">
            {tt.cta}
          </a>
        </div>

      </div>
    </section>
  )
}
