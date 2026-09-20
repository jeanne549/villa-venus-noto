'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackEvent } from '@/lib/track'

export default function ReviewForm() {
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: '', origin: '', rating: 5, text: '', website: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/avis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, origin: form.origin || null, rating: form.rating, text: form.text, website: form.website }),
      })
      if (!res.ok) throw new Error('server error')
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        trackEvent('review_submitted', { rating: form.rating })
      } else throw new Error('failed')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="avis" className="py-24 lg:py-32 bg-linen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-subtitle">{t.reviewform.subtitle}</p>
          <h2 className="section-title">{t.reviewform.title}</h2>
          <div className="gold-divider" />
          <p className="font-sans text-muted text-base max-w-lg mx-auto leading-relaxed">{t.reviewform.intro}</p>
        </div>

        <div className="max-w-2xl mx-auto">
          {status === 'success' ? (
            <div className="bg-white p-12 text-center">
              <p className="font-serif text-4xl text-navy mb-4">{t.reviewform.success_title}</p>
              <div className="gold-divider" />
              <p className="font-sans text-muted leading-relaxed">{t.reviewform.success_text}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 space-y-6">
              {/* Honeypot anti-bot — doit rester vide, caché aux humains */}
              <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans text-xs tracking-widests uppercase text-muted mb-2">{t.reviewform.name}</label>
                  <input type="text" name="name" required value={form.name} onChange={handleChange} className="input-field" placeholder="Sophie M." />
                </div>
                <div>
                  <label className="block font-sans text-xs tracking-widests uppercase text-muted mb-2">{t.reviewform.origin}</label>
                  <input type="text" name="origin" value={form.origin} onChange={handleChange} className="input-field" placeholder="Paris, France" />
                </div>
              </div>

              <div>
                <label className="block font-sans text-xs tracking-widests uppercase text-muted mb-3">{t.reviewform.rating}</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} type="button" onClick={() => setForm(prev => ({ ...prev, rating: n }))}
                      className={`text-3xl transition-all ${n <= form.rating ? 'text-gold-text' : 'text-gray-200'}`}>★</button>
                  ))}
                  <span className="font-sans text-muted text-sm self-center ml-2">{form.rating}/5</span>
                </div>
              </div>

              <div>
                <label className="block font-sans text-xs tracking-widests uppercase text-muted mb-2">{t.reviewform.text}</label>
                <textarea name="text" required rows={5} value={form.text} onChange={handleChange} className="input-field resize-none" placeholder={t.reviewform.text_placeholder} />
              </div>

              {status === 'error' && <p className="font-sans text-red-500 text-sm">{t.reviewform.error}</p>}

              <button type="submit" disabled={status === 'loading'} className="btn-gold w-full justify-center disabled:opacity-50">
                {status === 'loading'
                  ? <span className="flex items-center justify-center gap-2"><span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{t.reviewform.submitting}</span>
                  : t.reviewform.submit}
              </button>
              <p className="font-sans text-xs text-muted text-center">{t.reviewform.disclaimer}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
