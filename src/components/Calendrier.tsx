'use client'

import { useEffect, useState, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { SITE_CONFIG } from '@/lib/siteConfig'
import { trackEvent } from '@/lib/track'

const SUPABASE_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

type PricingDay = { date: string; price: number | null; available: boolean }

function addDays(dateStr: string, n: number) {
  const d = new Date(dateStr + 'T12:00:00Z')
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

function daysBetween(a: string, b: string) {
  return Math.round((new Date(b + 'T12:00:00Z').getTime() - new Date(a + 'T12:00:00Z').getTime()) / 86400000)
}

function getDays(y: number, m: number)     { return new Date(y, m + 1, 0).getDate() }
function getFirstDay(y: number, m: number) { return (new Date(y, m, 1).getDay() + 6) % 7 }

function isSaturday(dateStr: string) {
  return new Date(dateStr + 'T12:00:00Z').getUTCDay() === 6
}

function formatDateLong(dateStr: string, months: string[]) {
  const d = new Date(dateStr + 'T12:00:00Z')
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

export default function Calendrier() {
  const { t } = useLanguage()
  const tc = t.calendrier
  const today = new Date().toISOString().slice(0, 10)

  const [year, setYear]       = useState(new Date().getFullYear())
  const [month, setMonth]     = useState(new Date().getMonth())
  const [pricing, setPricing] = useState<Record<string, PricingDay>>({})
  const [loaded, setLoaded]   = useState(false)
  const [seasonEnded, setSeasonEnded] = useState(false)
  const [startDate, setStartDate]     = useState<string | null>(null)
  const [endDate, setEndDate]         = useState<string | null>(null)
  const [hovered, setHovered]         = useState<string | null>(null)
  const [guests, setGuests]           = useState(2)
  const navigatedRef = useRef(false)

  useEffect(() => {
    fetch(`${SUPABASE_URL}/rest/v1/pricing?select=*&order=date`, {
      headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` }
    })
      .then(r => r.json())
      .then((rows: PricingDay[]) => {
        const map: Record<string, PricingDay> = {}
        rows.forEach(r => { map[r.date] = r })
        setPricing(map)
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [])

  useEffect(() => {
    if (!loaded || navigatedRef.current) return
    navigatedRef.current = true
    const firstBookable = Object.entries(pricing)
      .filter(([date, info]) => date > today && info.available !== false && info.price)
      .sort(([a], [b]) => a.localeCompare(b))[0]
    if (!firstBookable) return
    const [firstDate] = firstBookable
    const fYear  = parseInt(firstDate.slice(0, 4))
    const fMonth = parseInt(firstDate.slice(5, 7)) - 1
    if (fYear > year || (fYear === year && fMonth > month)) {
      setYear(fYear); setMonth(fMonth); setSeasonEnded(true)
    }
  }, [loaded, pricing, today, year, month])

  // ─── Seuils de saison calculés depuis la base ──────────────────────────────
  const sortedPrices = Object.values(pricing)
    .filter(p => p.price)
    .map(p => p.price!)
    .sort((a, b) => a - b)

  const priceLow  = sortedPrices.length > 2 ? sortedPrices[Math.floor(sortedPrices.length / 3)]     : 0
  const priceHigh = sortedPrices.length > 2 ? sortedPrices[Math.floor(sortedPrices.length * 2 / 3)] : 0
  const priceMin  = sortedPrices[0] ?? 0
  const priceMax  = sortedPrices[sortedPrices.length - 1] ?? 0

  function seasonBg(price: number | null | undefined): string {
    if (!price) return 'bg-white border-gray-100 hover:border-gray-300'
    if (price <= priceLow)  return 'bg-white border-gray-200 hover:border-gold/50'
    if (price <= priceHigh) return 'bg-cream border-gold/30 hover:border-gold'
    return 'bg-linen border-gold/50 hover:border-gold'
  }

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1) }
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1) }

  const handleClick = (dateStr: string) => {
    const info = pricing[dateStr]
    if (info?.available === false) return
    if (dateStr < today) return
    if (!startDate || (startDate && endDate)) {
      setStartDate(dateStr); setEndDate(null)
    } else {
      if (dateStr <= startDate) { setStartDate(dateStr); setEndDate(null) }
      else setEndDate(dateStr)
    }
  }

  const isInRange = (dateStr: string) => {
    const end = endDate || hovered
    if (!startDate || !end || dateStr <= startDate) return false
    return dateStr < end
  }

  // ─── Calcul du séjour ──────────────────────────────────────────────────────
  let nights = 0, totalPrice = 0
  let nightlyPrices: number[] = [], allPriced = true, anyUnavailable = false

  if (startDate && endDate) {
    nights = daysBetween(startDate, endDate)
    for (let i = 0; i < nights; i++) {
      const d = addDays(startDate, i)
      const info = pricing[d]
      if (info?.available === false) { anyUnavailable = true; break }
      if (info?.price) { totalPrice += info.price; nightlyPrices.push(info.price) }
      else allPriced = false
    }
  }

  const uniquePrices = nightlyPrices.filter((v, i, a) => a.indexOf(v) === i)
  const singlePrice  = uniquePrices.length === 1 ? uniquePrices[0] : null

  // ─── Rendu jours ──────────────────────────────────────────────────────────
  const days     = getDays(year, month)
  const firstDay = getFirstDay(year, month)

  const handleAskDates = () => {
    if (!startDate || !endDate) return
    trackEvent('dates_selected', { nights, total_price: totalPrice, start_date: startDate, end_date: endDate, guests })
    window.dispatchEvent(new CustomEvent('villa-prefill', {
      detail: { arrival_date: startDate, departure_date: endDate, guests: String(guests) }
    }))
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const suggestedDep = startDate ? formatDateLong(addDays(startDate, 6), tc.months) : ''

  return (
    <section id="disponibilites" className="py-24 lg:py-32 bg-linen">
      <div className="max-w-4xl mx-auto px-6">

        {/* En-tête */}
        <div className="text-center mb-12">
          <p className="section-subtitle">{tc.subtitle}</p>
          <h2 className="section-title">{tc.title}</h2>
          <div className="gold-divider" />
        </div>

        {/* Bandeau saison */}
        <div className="bg-navy text-white px-8 py-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-display text-gold-light text-xs tracking-[0.4em] uppercase mb-1">Saison ouverte</p>
            <p className="font-serif text-xl">{tc.season}</p>
          </div>
          <div className="h-px w-full md:h-12 md:w-px bg-white/20" />
          <div className="text-center">
            <p className="font-sans text-white/60 text-xs tracking-widests uppercase mb-1">Séjour minimum</p>
            <p className="font-serif text-xl">{tc.min_nights}</p>
          </div>
          <div className="h-px w-full md:h-12 md:w-px bg-white/20" />
          <div className="text-center">
            <p className="font-sans text-white/60 text-xs tracking-widests uppercase mb-1">Réservation</p>
            <p className="font-serif text-xl">{tc.direct}</p>
          </div>
        </div>

        {/* Bannière fin de saison */}
        {seasonEnded && (
          <div className="bg-gold/10 border border-gold/40 px-6 py-5 mb-8 text-center">
            <p className="font-serif text-xl text-charcoal mb-1">{tc.season_ended}</p>
            <p className="font-sans text-sm text-muted">{tc.season_ended_sub}</p>
          </div>
        )}

        {/* Instruction + repère samedi */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-8">
          <p className="font-sans text-sm text-muted">
            {!startDate ? tc.select_start : !endDate ? tc.select_end : ''}
          </p>
          <p className="font-sans text-xs text-gold tracking-wide">
            ◈ {tc.saturday_preferred}
          </p>
        </div>

        {/* Navigation mois */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={prevMonth} className="w-10 h-10 flex items-center justify-center border border-gray-200 hover:border-gold text-charcoal hover:text-gold transition-all text-xl">‹</button>
          <h3 className="font-serif text-2xl text-charcoal">{tc.months[month]} {year}</h3>
          <button onClick={nextMonth} className="w-10 h-10 flex items-center justify-center border border-gray-200 hover:border-gold text-charcoal hover:text-gold transition-all text-xl">›</button>
        </div>

        {/* Jours semaine — samedi (index 5) mis en évidence */}
        <div className="grid grid-cols-7 mb-2">
          {tc.days.map((d, idx) => (
            <div key={d} className={`text-center font-sans text-xs tracking-widests uppercase py-2 ${idx === 5 ? 'text-gold font-semibold' : 'text-muted'}`}>{d}</div>
          ))}
        </div>

        {/* Grille calendrier */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
          {Array.from({ length: days }).map((_, i) => {
            const day     = i + 1
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            const info    = pricing[dateStr]
            const isPast        = dateStr < today
            const isUnavailable = info?.available === false
            const isStart  = dateStr === startDate
            const isEnd    = dateStr === endDate
            const inRange  = isInRange(dateStr)
            const hasPrice = !!info?.price && !isUnavailable
            const isSat    = isSaturday(dateStr)

            const cellClass = isPast
              ? 'opacity-20 bg-gray-50 border-gray-100 cursor-not-allowed'
              : isUnavailable
              ? 'bg-gray-200 border-gray-300 cursor-not-allowed'
              : isStart || isEnd
              ? 'bg-gold border-gold cursor-pointer'
              : inRange
              ? 'bg-gold/20 border-gold/40 cursor-pointer'
              : hasPrice
              ? `${seasonBg(info?.price)} cursor-pointer`
              : 'bg-white border-gray-100 hover:border-gray-300 cursor-pointer'

            return (
              <button
                key={dateStr}
                onClick={() => handleClick(dateStr)}
                onMouseEnter={() => startDate && !endDate && setHovered(dateStr)}
                onMouseLeave={() => setHovered(null)}
                disabled={isPast || isUnavailable}
                className={`relative aspect-square flex flex-col items-center justify-center border text-center transition-all text-[11px] ${cellClass}`}
              >
                {/* Indicateur samedi */}
                {isSat && !isPast && !isUnavailable && !isStart && !isEnd && (
                  <span className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full bg-gold/50" />
                )}
                <span className={`font-sans font-medium ${isStart || isEnd ? 'text-white' : 'text-charcoal'}`}>{day}</span>
                {hasPrice && (
                  <span className={`font-sans leading-tight ${isStart || isEnd ? 'text-white/90' : 'text-gold'}`}>
                    {info!.price}€
                  </span>
                )}
                {isUnavailable && !isPast && <span className="font-sans text-gray-400 leading-tight text-[10px]">—</span>}
              </button>
            )
          })}
        </div>

        {/* Légende saison (alimentée par la base) */}
        {loaded && sortedPrices.length > 2 && (
          <div className="flex flex-wrap gap-4 mt-4 justify-center items-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white border border-gray-200" />
              <span className="font-sans text-xs text-muted">{tc.season_low} · dès {priceMin.toLocaleString('fr-FR')} €</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-cream border border-gold/30" />
              <span className="font-sans text-xs text-muted">{tc.season_mid}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-linen border border-gold/50" />
              <span className="font-sans text-xs text-muted">{tc.season_high} · jusqu'à {priceMax.toLocaleString('fr-FR')} €</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 border border-gray-300" />
              <span className="font-sans text-xs text-muted">{tc.legend_unavailable}</span>
            </div>
          </div>
        )}
        {/* Légende simple sans données pricing */}
        {(!loaded || sortedPrices.length <= 2) && (
          <div className="flex flex-wrap gap-6 mt-4 justify-center">
            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-cream border border-gold/30" /><span className="font-sans text-xs text-muted">{tc.legend_available}</span></div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-gray-200 border border-gray-300" /><span className="font-sans text-xs text-muted">{tc.legend_unavailable}</span></div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-gold border-gold" /><span className="font-sans text-xs text-muted">{tc.legend_selected}</span></div>
          </div>
        )}

        {/* ─── Récapitulatif séjour ──────────────────────────────────────────── */}
        {startDate && endDate && (
          <div className="mt-10 bg-white border border-gold/30 p-8">
            <h4 className="font-serif text-xl text-charcoal mb-6">{tc.your_stay}</h4>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="border-l-2 border-gold pl-4">
                <p className="font-sans text-xs text-muted tracking-widests uppercase mb-1">{tc.arrival}</p>
                <p className="font-serif text-base text-charcoal leading-tight">{formatDateLong(startDate, tc.months)}</p>
                {isSaturday(startDate) && (
                  <p className="font-sans text-xs text-gold mt-1">◈ {tc.saturday_preferred.split(' ').slice(-1)[0]}</p>
                )}
              </div>
              <div className="border-l-2 border-gold pl-4">
                <p className="font-sans text-xs text-muted tracking-widests uppercase mb-1">{tc.departure}</p>
                <p className="font-serif text-base text-charcoal leading-tight">{formatDateLong(endDate, tc.months)}</p>
              </div>
              <div className="border-l-2 border-gold pl-4">
                <p className="font-sans text-xs text-muted tracking-widests uppercase mb-1">{tc.duration}</p>
                <p className="font-serif text-base text-charcoal">{nights} {nights > 1 ? tc.nights : tc.night}</p>
              </div>
            </div>

            {anyUnavailable ? (
              <div className="bg-red-50 border border-red-200 px-6 py-4 text-center">
                <p className="font-sans text-sm text-red-700">{tc.warning_unavailable}</p>
              </div>
            ) : nights < 6 ? (
              <div className="bg-amber-50 border border-amber-200 px-6 py-4 text-center">
                <p className="font-sans text-sm text-amber-700">{tc.warning_min_suggest(suggestedDep)}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Sélecteur voyageurs */}
                <div className="flex items-center justify-between bg-linen px-6 py-4 border border-gold/20">
                  <label className="font-sans text-xs tracking-widests uppercase text-muted">{tc.guests_label}</label>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setGuests(g => Math.max(1, g - 1))} className="w-8 h-8 border border-gray-300 hover:border-gold text-charcoal hover:text-gold transition-all text-lg leading-none" aria-label="Moins">−</button>
                    <span className="font-serif text-xl text-charcoal w-6 text-center">{guests}</span>
                    <button onClick={() => setGuests(g => Math.min(9, g + 1))} className="w-8 h-8 border border-gray-300 hover:border-gold text-charcoal hover:text-gold transition-all text-lg leading-none" aria-label="Plus">+</button>
                  </div>
                </div>

                {/* Tableau prix */}
                <div className="bg-cream px-6 py-5">
                  <div className="space-y-3 mb-5">
                    {/* Location — détail du calcul */}
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-sans text-xs text-muted tracking-widests uppercase mb-0.5">{tc.rental}</p>
                        {allPriced ? (
                          singlePrice ? (
                            <p className="font-sans text-sm text-muted">
                              {nights} {nights > 1 ? tc.nights : tc.night} × {singlePrice.toLocaleString('fr-FR')} €
                              <span className="mx-2 text-muted/50">=</span>
                              <strong className="text-charcoal">{totalPrice.toLocaleString('fr-FR')} €</strong>
                            </p>
                          ) : (
                            <p className="font-sans text-sm text-muted">{nights} {nights > 1 ? tc.nights : tc.night} · {tc.price_variable}</p>
                          )
                        ) : (
                          <p className="font-sans text-sm text-muted italic">{tc.price_to_confirm}</p>
                        )}
                      </div>
                      {allPriced && !singlePrice && (
                        <p className="font-serif text-2xl text-charcoal">{totalPrice.toLocaleString('fr-FR')} €</p>
                      )}
                    </div>

                    {/* Taxe de séjour */}
                    {(() => {
                      const taxNights = Math.min(nights, 6)
                      const taxRate = SITE_CONFIG.touristTaxRate
                      const taxAmount = taxRate !== null ? taxRate * guests * taxNights : null
                      return (
                        <>
                          <div className="flex items-start justify-between border-t border-gold/20 pt-3">
                            <div>
                              <p className="font-sans text-xs text-muted tracking-widests uppercase mb-0.5">{tc.tourist_tax}</p>
                              <p className="font-sans text-sm text-muted">{tc.tourist_tax_detail(guests, taxNights)}</p>
                              <p className="font-sans text-xs text-muted/70 mt-1 italic">{tc.tourist_tax_note}</p>
                            </div>
                            {taxAmount !== null && (
                              <p className="font-serif text-2xl text-charcoal">{taxAmount.toLocaleString('fr-FR')} €</p>
                            )}
                          </div>

                          {/* Total général — uniquement si le tarif de la taxe est connu */}
                          {allPriced && taxAmount !== null && (
                            <div className="flex items-center justify-between border-t-2 border-gold pt-3">
                              <p className="font-sans text-xs tracking-widests uppercase text-charcoal font-semibold">{tc.grand_total}</p>
                              <p className="font-serif text-3xl text-charcoal">
                                {(totalPrice + taxAmount).toLocaleString('fr-FR')} €
                              </p>
                            </div>
                          )}
                          {allPriced && taxAmount === null && (
                            <div className="flex items-center justify-between border-t-2 border-gold pt-3">
                              <p className="font-sans text-xs tracking-widests uppercase text-charcoal font-semibold">{tc.rental}</p>
                              <p className="font-serif text-3xl text-charcoal">{totalPrice.toLocaleString('fr-FR')} €</p>
                            </div>
                          )}
                        </>
                      )
                    })()}
                  </div>

                  <button onClick={handleAskDates} className="btn-gold w-full justify-center">
                    {tc.cta}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CTA si aucune date sélectionnée */}
        {!startDate && loaded && (
          <div className="mt-10 text-center">
            <a href="#contact" className="btn-outline">{tc.contact_us}</a>
          </div>
        )}

      </div>
    </section>
  )
}
