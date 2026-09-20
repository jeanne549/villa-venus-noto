'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackEvent } from '@/lib/track'

type FormData = {
  name: string; email: string; phone: string
  arrival_date: string; departure_date: string
  guests: string; message: string
  consent_gdpr: boolean
}

const WHATSAPP = '+33 6 24 54 29 95'
const EMAIL = 'contact@villavenusnoto.com'

const validationMessages = {
  fr: {
    departure_before_arrival: 'La date de départ doit être après la date d\'arrivée.',
    min_nights: 'La durée minimum est de 6 nuits.',
    max_guests: 'La villa accueille 9 personnes maximum.',
    consent_required: 'Veuillez accepter la politique de confidentialité pour continuer.',
  },
  en: {
    departure_before_arrival: 'Departure date must be after arrival date.',
    min_nights: 'The minimum stay is 6 nights.',
    max_guests: 'The villa accommodates a maximum of 9 guests.',
    consent_required: 'Please accept the privacy policy to continue.',
  },
  it: {
    departure_before_arrival: 'La data di partenza deve essere successiva alla data di arrivo.',
    min_nights: 'Il soggiorno minimo è di 6 notti.',
    max_guests: 'La villa accoglie un massimo di 9 ospiti.',
    consent_required: 'Si prega di accettare l\'informativa sulla privacy per continuare.',
  },
}

export default function Contact() {
  const { t, lang } = useLanguage()
  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '',
    arrival_date: '', departure_date: '',
    guests: '2', message: '',
    consent_gdpr: false,
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [validationError, setValidationError] = useState<string | null>(null)

  // Pré-remplissage depuis le calendrier
  useEffect(() => {
    const handler = (e: Event) => {
      const { arrival_date, departure_date, guests } = (e as CustomEvent).detail
      setForm(prev => ({
        ...prev,
        arrival_date: arrival_date ?? '',
        departure_date: departure_date ?? '',
        ...(guests ? { guests } : {}),
      }))
      setStatus('idle')
      setValidationError(null)
    }
    window.addEventListener('villa-prefill', handler)
    return () => window.removeEventListener('villa-prefill', handler)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    setValidationError(null)
  }

  const validate = (): string | null => {
    const vm = validationMessages[lang as keyof typeof validationMessages] || validationMessages.fr
    if (form.arrival_date && form.departure_date) {
      const arr = new Date(form.arrival_date)
      const dep = new Date(form.departure_date)
      if (dep <= arr) return vm.departure_before_arrival
      const nights = Math.round((dep.getTime() - arr.getTime()) / 86400000)
      if (nights < 6) return vm.min_nights
    }
    if (parseInt(form.guests) > 9) return vm.max_guests
    if (!form.consent_gdpr) return vm.consent_required ?? 'Veuillez accepter la politique de confidentialité.'
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const err = validate()
    if (err) { setValidationError(err); return }
    setStatus('loading')
    try {
      const res = await fetch('/api/demande', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang }),
      })
      if (!res.ok) throw new Error('server error')
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        trackEvent('reservation_sent', { lang, guests: parseInt(form.guests) })
      } else throw new Error('failed')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Colonne gauche — infos */}
          <div>
            <p className="section-subtitle">{t.contact.subtitle}</p>
            <h2 className="section-title mb-6 whitespace-pre-line">{t.contact.title}</h2>
            <div className="w-16 h-px bg-gold mb-8" />
            <p className="font-sans text-muted leading-relaxed mb-10">{t.contact.intro}</p>
            <div className="space-y-6">
              {[
                { icon: '📍', title: t.contact.location, text: t.contact.location_val, href: null },
                { icon: '📧', title: 'Email', text: EMAIL, href: `mailto:${EMAIL}` },
                { icon: '📱', title: 'WhatsApp', text: WHATSAPP, href: 'https://wa.me/33624542995' },
                { icon: '🕐', title: t.contact.response, text: t.contact.response_val, href: null },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <span className="text-xl mt-1">{item.icon}</span>
                  <div>
                    <p className="font-sans text-xs tracking-widests uppercase text-gold mb-1">{item.title}</p>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith('https') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        onClick={() => item.href?.startsWith('mailto:') && trackEvent('email_click', { lang })}
                        className="font-sans text-charcoal text-sm hover:text-gold transition-colors">
                        {item.text}
                      </a>
                    ) : (
                      <p className="font-sans text-charcoal text-sm">{item.text}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Colonne droite — formulaire */}
          <div className="bg-white p-8 md:p-10">
            {status === 'success' ? (
              <div className="text-center py-12">
                <p className="font-serif text-4xl text-navy mb-4">{t.contact.success_title}</p>
                <div className="gold-divider" />
                <p className="font-sans text-muted leading-relaxed">{t.contact.success_text}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <h3 className="font-serif text-2xl text-charcoal mb-6">{t.contact.form_title}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block font-sans text-xs tracking-widests uppercase text-muted mb-2">{t.contact.name}</label>
                    <input id="contact-name" type="text" name="name" required value={form.name} onChange={handleChange} className="input-field" placeholder="Jean Dupont" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block font-sans text-xs tracking-widests uppercase text-muted mb-2">{t.contact.email}</label>
                    <input id="contact-email" type="email" name="email" required value={form.email} onChange={handleChange} className="input-field" placeholder="jean@exemple.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="block font-sans text-xs tracking-widests uppercase text-muted mb-2">{t.contact.phone}</label>
                    <input id="contact-phone" type="tel" name="phone" value={form.phone} onChange={handleChange} className="input-field" placeholder="+33 6 00 00 00 00" />
                  </div>
                  <div>
                    <label htmlFor="contact-guests" className="block font-sans text-xs tracking-widests uppercase text-muted mb-2">{t.contact.guests}</label>
                    <select id="contact-guests" name="guests" required value={form.guests} onChange={handleChange} className="input-field">
                      {Array.from({ length: 9 }, (_, i) => i + 1).map(n => (
                        <option key={n} value={n}>{t.contact.persons(n)}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-arrival" className="block font-sans text-xs tracking-widests uppercase text-muted mb-2">{t.contact.arrival}</label>
                    <input id="contact-arrival" type="date" name="arrival_date" required value={form.arrival_date} onChange={handleChange} className="input-field" />
                  </div>
                  <div>
                    <label htmlFor="contact-departure" className="block font-sans text-xs tracking-widests uppercase text-muted mb-2">{t.contact.departure}</label>
                    <input id="contact-departure" type="date" name="departure_date" required value={form.departure_date} onChange={handleChange} className="input-field" />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block font-sans text-xs tracking-widests uppercase text-muted mb-2">{t.contact.message}</label>
                  <textarea id="contact-message" name="message" rows={4} value={form.message} onChange={handleChange} className="input-field resize-none" placeholder={t.contact.message_placeholder} />
                </div>

                {/* Erreur de validation */}
                {validationError && (
                  <div className="bg-amber-50 border border-amber-200 px-4 py-3">
                    <p className="font-sans text-amber-800 text-sm">{validationError}</p>
                  </div>
                )}

                {/* Erreur technique avec repli */}
                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 px-4 py-4">
                    <p className="font-sans text-red-700 text-sm mb-3">{t.contact.error}</p>
                    <p className="font-sans text-sm text-charcoal font-medium mb-1">{t.contact.error_fallback}</p>
                    <a href={`mailto:${EMAIL}`} className="font-sans text-sm text-gold underline block">📧 {EMAIL}</a>
                    <a href="https://wa.me/33624542995" target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-gold underline block">📱 WhatsApp {WHATSAPP}</a>
                  </div>
                )}

                {/* Consentement RGPD */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent_gdpr"
                    name="consent_gdpr"
                    required
                    checked={form.consent_gdpr}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 accent-gold shrink-0 cursor-pointer"
                  />
                  <label htmlFor="consent_gdpr" className="font-sans text-xs text-muted leading-relaxed cursor-pointer">
                    {lang === 'en' ? (
                      <>I have read and accept the <a href="/privacy-policy" target="_blank" className="text-gold underline">privacy policy</a>. My data will be used solely to process this booking request.</>
                    ) : lang === 'it' ? (
                      <>Ho letto e accetto la <a href="/informativa-privacy" target="_blank" className="text-gold underline">informativa sulla privacy</a>. I miei dati saranno utilizzati esclusivamente per elaborare questa richiesta.</>
                    ) : (
                      <>J&apos;ai lu et j&apos;accepte la <a href="/confidentialite" target="_blank" className="text-gold underline">politique de confidentialité</a>. Mes données seront utilisées uniquement pour traiter cette demande de réservation.</>
                    )}
                  </label>
                </div>

                <button type="submit" disabled={status === 'loading'}
                  className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                  {status === 'loading'
                    ? <span className="flex items-center gap-2"><span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{t.contact.submitting}</span>
                    : t.contact.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
