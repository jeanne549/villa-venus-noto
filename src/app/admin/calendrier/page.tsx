'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type PricingDay = { date: string; price: number; available: boolean; notes?: string }
type Review     = { id: string; name: string; origin: string | null; rating: number; text: string; status: string; created_at: string }

const MONTHS = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']
const DAYS   = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim']

function getDays(year: number, month: number)     { return new Date(year, month + 1, 0).getDate() }
function getFirstDay(year: number, month: number) { return (new Date(year, month, 1).getDay() + 6) % 7 }

// ─── API helpers (toutes les clés restent côté serveur) ───────────────────────
async function apiGet(path: string) {
  const res = await fetch(path)
  if (res.status === 401) return { __unauthorized: true }
  return res.json()
}
async function apiPost(path: string, body: unknown) {
  const res = await fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  return { ok: res.ok, status: res.status }
}
async function apiPatch(path: string, body: unknown) {
  const res = await fetch(path, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  return { ok: res.ok }
}
async function apiDelete(path: string) {
  const res = await fetch(path, { method: 'DELETE' })
  return { ok: res.ok }
}

// ─── Composant principal ──────────────────────────────────────────────────────
export default function AdminCalendrier() {
  const router = useRouter()
  const today  = new Date()

  const [tab,   setTab]   = useState<'calendrier' | 'avis' | 'parametres' | 'alertes'>('calendrier')
  const [ready, setReady] = useState(false)

  // Calendrier
  const [year,  setYear]  = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [pricing, setPricing]           = useState<Record<string, PricingDay>>({})
  const [selected, setSelected]         = useState<string | null>(null)
  const [editPrice, setEditPrice]       = useState('')
  const [editAvailable, setEditAvailable] = useState(true)
  const [editNotes, setEditNotes]       = useState('')
  const [saving, setSaving]             = useState(false)
  const [saved, setSaved]               = useState(false)
  const [bulkMode, setBulkMode]         = useState(false)
  const [bulkSelected, setBulkSelected] = useState<Set<string>>(new Set())
  const [bulkPrice, setBulkPrice]       = useState('')
  const [bulkAvailable, setBulkAvailable] = useState(true)

  // Avis
  const [reviews, setReviews]             = useState<Review[]>([])
  const [reviewsLoading, setReviewsLoading] = useState(false)

  // Paramètres
  const [whatsapp, setWhatsapp]       = useState('')
  const [email, setEmail]             = useState('')
  const [settingsSaved, setSettingsSaved] = useState(false)

  // Alertes
  const [alerts, setAlerts]           = useState<{ missing: string[]; noPrice: string[] }>({ missing: [], noPrice: [] })
  const [alertsLoaded, setAlertsLoaded] = useState(false)

  // ─── Chargement initial pricing + settings ────────────────────────────────
  useEffect(() => {
    Promise.all([
      apiGet('/api/admin/pricing'),
      apiGet('/api/admin/settings'),
    ]).then(([pricingData, settingsData]) => {
      if (pricingData?.__unauthorized || settingsData?.__unauthorized) {
        router.push('/admin/login')
        return
      }
      const map: Record<string, PricingDay> = {}
      if (Array.isArray(pricingData)) pricingData.forEach((r: PricingDay) => { map[r.date] = r })
      setPricing(map)
      if (Array.isArray(settingsData)) {
        settingsData.forEach((r: { key: string; value: string }) => {
          if (r.key === 'whatsapp') setWhatsapp(r.value)
          if (r.key === 'email')    setEmail(r.value)
        })
      }
      setReady(true)
    })
  }, [router])

  // ─── Chargement avis (lazy) ───────────────────────────────────────────────
  useEffect(() => {
    if (!ready || tab !== 'avis') return
    setReviewsLoading(true)
    apiGet('/api/admin/reviews').then(data => {
      if (data?.__unauthorized) { router.push('/admin/login'); return }
      setReviews(Array.isArray(data) ? data : [])
      setReviewsLoading(false)
    })
  }, [ready, tab, router])

  // ─── Actions calendrier ───────────────────────────────────────────────────
  const openDay = (dateStr: string) => {
    if (bulkMode) {
      setBulkSelected(prev => {
        const next = new Set(prev)
        next.has(dateStr) ? next.delete(dateStr) : next.add(dateStr)
        return next
      })
      return
    }
    setSelected(dateStr)
    const info = pricing[dateStr]
    setEditPrice(info?.price ? String(info.price) : '')
    setEditAvailable(info?.available !== false)
    setEditNotes(info?.notes || '')
  }

  const saveDay = async () => {
    if (!selected) return
    setSaving(true)
    const body = { date: selected, price: editPrice ? parseInt(editPrice) : null, available: editAvailable, notes: editNotes || null }
    await apiPost('/api/admin/pricing', body)
    setPricing(prev => ({ ...prev, [selected]: body as PricingDay }))
    setSaving(false); setSaved(true)
    setTimeout(() => { setSaved(false); setSelected(null) }, 1200)
  }

  const saveBulk = async () => {
    if (bulkSelected.size === 0) return
    setSaving(true)
    const rows = Array.from(bulkSelected).map(date => ({ date, price: bulkPrice ? parseInt(bulkPrice) : null, available: bulkAvailable, notes: null }))
    await apiPost('/api/admin/pricing', rows)
    const newPricing = { ...pricing }
    rows.forEach(r => { newPricing[r.date] = r as unknown as PricingDay })
    setPricing(newPricing)
    setBulkSelected(new Set()); setBulkMode(false); setSaving(false)
    setSaved(true); setTimeout(() => setSaved(false), 1200)
  }

  // ─── Actions avis ─────────────────────────────────────────────────────────
  const approveReview = async (id: string) => {
    await apiPatch(`/api/admin/reviews?id=${id}`, { status: 'approved' })
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' } : r))
  }

  const rejectReview = async (id: string) => {
    await apiDelete(`/api/admin/reviews?id=${id}`)
    setReviews(prev => prev.filter(r => r.id !== id))
  }

  // ─── Actions paramètres ───────────────────────────────────────────────────
  const saveSettings = async () => {
    await apiPost('/api/admin/settings', [{ key: 'whatsapp', value: whatsapp }, { key: 'email', value: email }])
    setSettingsSaved(true)
    setTimeout(() => setSettingsSaved(false), 2000)
  }

  // ─── Alertes ─────────────────────────────────────────────────────────────
  const runAlerts = async () => {
    setAlertsLoaded(false)
    const data = await apiGet('/api/admin/pricing')
    if (data?.__unauthorized) { router.push('/admin/login'); return }
    const rows: { date: string; price: number | null; available: boolean }[] = Array.isArray(data) ? data : []
    const existing = new Set(rows.map((r: { date: string }) => r.date))
    const missing: string[] = []
    const noPrice: string[] = []
    const seasons = [today.getFullYear(), today.getFullYear() + 1]
    for (const y of seasons) {
      const start = new Date(`${y}-04-01`)
      const end   = new Date(`${y}-10-31`)
      for (const d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const ds = d.toISOString().slice(0, 10)
        if (!existing.has(ds)) { missing.push(ds); continue }
        const row = rows.find((r: { date: string }) => r.date === ds)
        if (row && row.available !== false && !row.price) noPrice.push(ds)
      }
    }
    setAlerts({ missing, noPrice })
    setAlertsLoaded(true)
  }

  const logout = async () => {
    await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' }),
    })
    router.push('/admin/login')
  }

  // ─── Grille calendrier ────────────────────────────────────────────────────
  const days     = getDays(year, month)
  const firstDay = getFirstDay(year, month)
  const pendingCount = reviews.filter(r => r.status === 'pending').length

  if (!ready) return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <p className="font-sans text-muted text-sm tracking-widest uppercase">Chargement…</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-navy text-white px-6 py-4 flex items-center justify-between">
        <span className="font-serif text-xl">Villa Vénus — Espace propriétaire</span>
        <div className="flex items-center gap-6">
          <a href="/" className="font-sans text-xs text-white/70 hover:text-white tracking-widest uppercase">← Voir le site</a>
          <button onClick={logout} className="font-sans text-xs text-white/50 hover:text-white tracking-widest uppercase">Déconnexion</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 px-6">
        <div className="max-w-3xl mx-auto flex gap-0">
          {([
            { id: 'calendrier', label: 'Calendrier & tarifs' },
            { id: 'avis',       label: `Avis${pendingCount > 0 ? ` (${pendingCount} en attente)` : ''}` },
            { id: 'parametres', label: 'Paramètres' },
            { id: 'alertes',    label: `Alertes${alerts.missing.length + alerts.noPrice.length > 0 ? ` ⚠️ ${alerts.missing.length + alerts.noPrice.length}` : ''}` },
          ] as { id: typeof tab; label: string }[]).map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`font-sans text-xs tracking-widest uppercase px-6 py-4 border-b-2 transition-colors ${
                tab === t.id ? 'border-gold text-gold-text' : 'border-transparent text-muted hover:text-charcoal'}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* ===== CALENDRIER ===== */}
        {tab === 'calendrier' && (
          <>
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => { setBulkMode(!bulkMode); setBulkSelected(new Set()) }}
                className={`font-sans text-xs tracking-widests uppercase px-4 py-2 border transition-all ${bulkMode ? 'bg-gold text-white border-gold' : 'border-gray-300 text-charcoal hover:border-gold'}`}>
                {bulkMode ? '✓ Mode multi-dates actif' : 'Sélectionner plusieurs dates'}
              </button>
              {saved && <span className="font-sans text-xs text-green-600">✓ Sauvegardé !</span>}
            </div>

            <div className="flex items-center justify-between mb-6">
              <button onClick={() => { if (month === 0) { setMonth(11); setYear(y => y-1) } else setMonth(m => m-1) }}
                className="w-10 h-10 flex items-center justify-center border border-gray-200 hover:border-gold text-charcoal text-xl">‹</button>
              <h2 className="font-serif text-2xl text-charcoal">{MONTHS[month]} {year}</h2>
              <button onClick={() => { if (month === 11) { setMonth(0); setYear(y => y+1) } else setMonth(m => m+1) }}
                className="w-10 h-10 flex items-center justify-center border border-gray-200 hover:border-gold text-charcoal text-xl">›</button>
            </div>

            <div className="grid grid-cols-7 mb-2">
              {DAYS.map(d => <div key={d} className="text-center font-sans text-xs text-muted tracking-widests uppercase py-2">{d}</div>)}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: days }).map((_, i) => {
                const day     = i + 1
                const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
                const info    = pricing[dateStr]
                const isSelected = selected === dateStr || bulkSelected.has(dateStr)
                return (
                  <button key={dateStr} onClick={() => openDay(dateStr)}
                    className={`aspect-square flex flex-col items-center justify-center border text-center transition-all cursor-pointer
                      ${isSelected ? 'bg-gold border-gold' :
                        info?.available === false ? 'bg-red-50 border-red-200 hover:border-red-400' :
                        info?.price ? 'bg-green-50 border-green-200 hover:border-green-400' :
                        'bg-white border-gray-100 hover:border-gold'}`}>
                    <span className={`font-sans text-xs ${isSelected ? 'text-white' : 'text-charcoal'}`}>{day}</span>
                    {info?.price && info?.available !== false && (
                      <span className={`font-sans text-[9px] leading-tight ${isSelected ? 'text-white/90' : 'text-green-700'}`}>{info.price}€</span>
                    )}
                    {info?.available === false && (
                      <span className="font-sans text-[9px] text-red-400 leading-tight">Bloqué</span>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="flex flex-wrap gap-6 mt-4">
              <div className="flex items-center gap-2"><div className="w-4 h-4 bg-green-50 border border-green-200" /><span className="font-sans text-xs text-muted">Prix renseigné</span></div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 bg-red-50 border border-red-200" /><span className="font-sans text-xs text-muted">Date bloquée</span></div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 bg-white border border-gray-100" /><span className="font-sans text-xs text-muted">Non renseigné</span></div>
            </div>

            {selected && !bulkMode && (
              <div className="mt-8 bg-white border border-gray-100 p-6">
                <h3 className="font-serif text-lg text-charcoal mb-4">
                  {new Date(selected + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="font-sans text-xs text-muted tracking-widests uppercase block mb-1">Prix / nuit (€)</label>
                    <input type="number" value={editPrice} onChange={e => setEditPrice(e.target.value)} placeholder="ex: 350"
                      className="w-full border border-gray-200 px-4 py-2 font-sans text-sm outline-none focus:border-gold" />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="font-sans text-xs text-muted tracking-widests uppercase">Date disponible ?</label>
                    <button onClick={() => setEditAvailable(!editAvailable)}
                      className={`px-4 py-1 font-sans text-xs border transition-all ${editAvailable ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-100 border-red-300 text-red-800'}`}>
                      {editAvailable ? '✓ Disponible' : '✗ Bloquée'}
                    </button>
                  </div>
                  <div>
                    <label className="font-sans text-xs text-muted tracking-widests uppercase block mb-1">Note (optionnel)</label>
                    <input type="text" value={editNotes} onChange={e => setEditNotes(e.target.value)} placeholder="ex: Semaine de Pâques"
                      className="w-full border border-gray-200 px-4 py-2 font-sans text-sm outline-none focus:border-gold" />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={saveDay} disabled={saving}
                      className="flex-1 bg-navy text-white font-sans text-xs tracking-widests uppercase py-3 hover:bg-charcoal transition-colors disabled:opacity-50">
                      {saving ? 'Sauvegarde...' : saved ? '✓ Sauvegardé !' : 'Sauvegarder'}
                    </button>
                    <button onClick={() => setSelected(null)} className="px-6 border border-gray-200 font-sans text-xs text-muted hover:border-gray-400">Annuler</button>
                  </div>
                </div>
              </div>
            )}

            {bulkMode && bulkSelected.size > 0 && (
              <div className="mt-8 bg-white border border-gray-100 p-6">
                <h3 className="font-serif text-lg text-charcoal mb-1">{bulkSelected.size} date{bulkSelected.size > 1 ? 's' : ''} sélectionnée{bulkSelected.size > 1 ? 's' : ''}</h3>
                <p className="font-sans text-xs text-muted mb-4">Appliquer le même tarif à toutes ces dates</p>
                <div className="space-y-4">
                  <div>
                    <label className="font-sans text-xs text-muted tracking-widests uppercase block mb-1">Prix / nuit (€)</label>
                    <input type="number" value={bulkPrice} onChange={e => setBulkPrice(e.target.value)} placeholder="ex: 350"
                      className="w-full border border-gray-200 px-4 py-2 font-sans text-sm outline-none focus:border-gold" />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="font-sans text-xs text-muted tracking-widests uppercase">Disponibilité</label>
                    <button onClick={() => setBulkAvailable(!bulkAvailable)}
                      className={`px-4 py-1 font-sans text-xs border transition-all ${bulkAvailable ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-100 border-red-300 text-red-800'}`}>
                      {bulkAvailable ? '✓ Disponible' : '✗ Bloquée'}
                    </button>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={saveBulk} disabled={saving}
                      className="flex-1 bg-navy text-white font-sans text-xs tracking-widests uppercase py-3 hover:bg-charcoal transition-colors disabled:opacity-50">
                      {saving ? 'Sauvegarde...' : `Appliquer aux ${bulkSelected.size} dates`}
                    </button>
                    <button onClick={() => { setBulkSelected(new Set()); setBulkMode(false) }} className="px-6 border border-gray-200 font-sans text-xs text-muted hover:border-gray-400">Annuler</button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* ===== AVIS ===== */}
        {tab === 'avis' && (
          <div>
            <h2 className="font-serif text-2xl text-charcoal mb-2">Gestion des avis</h2>
            <p className="font-sans text-sm text-muted mb-8">Validez les avis avant qu&apos;ils apparaissent sur le site.</p>
            {reviewsLoading && <p className="font-sans text-sm text-muted">Chargement...</p>}
            {!reviewsLoading && reviews.length === 0 && (
              <div className="bg-white border border-gray-100 p-8 text-center">
                <p className="font-sans text-muted text-sm">Aucun avis reçu pour le moment.</p>
              </div>
            )}
            <div className="space-y-4">
              {reviews.map(review => (
                <div key={review.id} className={`bg-white border p-6 ${review.status === 'pending' ? 'border-gold/40' : 'border-gray-100'}`}>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="font-serif text-charcoal">{review.name}</p>
                      {review.origin && <p className="font-sans text-xs text-muted">{review.origin}</p>}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-gold-text text-sm">{'★'.repeat(review.rating)}</span>
                      <span className={`font-sans text-[10px] tracking-widests uppercase px-2 py-0.5 ${
                        review.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                        {review.status === 'pending' ? 'En attente' : 'Publié'}
                      </span>
                    </div>
                  </div>
                  <p className="font-sans text-sm text-charcoal leading-relaxed mb-4 italic">&ldquo;{review.text}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs text-muted">
                      {new Date(review.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    {review.status === 'pending' && (
                      <div className="flex gap-2">
                        <button onClick={() => approveReview(review.id)}
                          className="bg-green-600 text-white font-sans text-xs tracking-widests uppercase px-4 py-2 hover:bg-green-700 transition-colors">
                          ✓ Publier
                        </button>
                        <button onClick={() => rejectReview(review.id)}
                          className="border border-red-200 text-red-500 font-sans text-xs tracking-widests uppercase px-4 py-2 hover:bg-red-50 transition-colors">
                          ✗ Supprimer
                        </button>
                      </div>
                    )}
                    {review.status === 'approved' && (
                      <button onClick={() => rejectReview(review.id)}
                        className="border border-gray-200 text-muted font-sans text-xs tracking-widests uppercase px-4 py-2 hover:border-red-300 hover:text-red-500 transition-colors">
                        Supprimer
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== PARAMÈTRES ===== */}
        {tab === 'parametres' && (
          <div>
            <h2 className="font-serif text-2xl text-charcoal mb-2">Paramètres du site</h2>
            <p className="font-sans text-sm text-muted mb-8">Modifiez vos coordonnées de contact affichées sur le site.</p>
            <div className="bg-white border border-gray-100 p-8 space-y-6">
              <div>
                <label className="font-sans text-xs tracking-widests uppercase text-muted block mb-2">Numéro WhatsApp</label>
                <input type="text" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="+33624542995"
                  className="w-full border border-gray-200 px-4 py-3 font-sans text-sm outline-none focus:border-gold" />
                <p className="font-sans text-xs text-muted mt-1">Format international sans espaces, ex : +33624542995</p>
              </div>
              <div>
                <label className="font-sans text-xs tracking-widests uppercase text-muted block mb-2">Adresse email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="contact@villavenusnoto.com"
                  className="w-full border border-gray-200 px-4 py-3 font-sans text-sm outline-none focus:border-gold" />
              </div>
              <div className="pt-2 flex items-center gap-4">
                <button onClick={saveSettings}
                  className="bg-navy text-white font-sans text-xs tracking-widests uppercase px-8 py-3 hover:bg-charcoal transition-colors">
                  Sauvegarder
                </button>
                {settingsSaved && <span className="font-sans text-xs text-green-600">✓ Paramètres sauvegardés !</span>}
              </div>
            </div>
          </div>
        )}

        {/* ===== ALERTES ===== */}
        {tab === 'alertes' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-serif text-2xl text-charcoal mb-1">Alertes saison</h2>
                <p className="font-sans text-sm text-muted">Jours sans ligne en base ou sans tarif pour la saison en cours et la suivante.</p>
              </div>
              <button onClick={runAlerts}
                className="bg-navy text-white font-sans text-xs tracking-widests uppercase px-5 py-2 hover:bg-charcoal transition-colors">
                {alertsLoaded ? '↺ Relancer' : 'Analyser'}
              </button>
            </div>

            {!alertsLoaded && (
              <div className="bg-white border border-gray-100 p-8 text-center">
                <p className="font-sans text-muted text-sm">Cliquez sur « Analyser » pour vérifier les deux saisons.</p>
              </div>
            )}

            {alertsLoaded && alerts.missing.length === 0 && alerts.noPrice.length === 0 && (
              <div className="bg-green-50 border border-green-200 p-6 text-center">
                <p className="font-sans text-green-700 text-sm">✓ Aucune alerte — toutes les dates de saison sont renseignées et tarifées.</p>
              </div>
            )}

            {alertsLoaded && alerts.missing.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 p-6 mb-4">
                <p className="font-sans text-sm font-semibold text-amber-800 mb-3">⚠ {alerts.missing.length} jour{alerts.missing.length > 1 ? 's' : ''} absent{alerts.missing.length > 1 ? 's' : ''} de la base</p>
                <div className="flex flex-wrap gap-1">
                  {alerts.missing.slice(0, 60).map(d => (
                    <span key={d} className="font-mono text-xs bg-amber-100 text-amber-900 px-2 py-0.5">{d}</span>
                  ))}
                  {alerts.missing.length > 60 && <span className="font-sans text-xs text-amber-600">+{alerts.missing.length - 60} autres</span>}
                </div>
                <p className="font-sans text-xs text-amber-700 mt-3">Utilisez le script <code className="font-mono bg-amber-100 px-1">node scripts/fill-season.js --year=XXXX</code> pour remplir.</p>
              </div>
            )}

            {alertsLoaded && alerts.noPrice.length > 0 && (
              <div className="bg-red-50 border border-red-200 p-6">
                <p className="font-sans text-sm font-semibold text-red-700 mb-3">⚠ {alerts.noPrice.length} jour{alerts.noPrice.length > 1 ? 's' : ''} disponible{alerts.noPrice.length > 1 ? 's' : ''} sans tarif</p>
                <div className="flex flex-wrap gap-1">
                  {alerts.noPrice.slice(0, 60).map(d => (
                    <span key={d} className="font-mono text-xs bg-red-100 text-red-900 px-2 py-0.5">{d}</span>
                  ))}
                  {alerts.noPrice.length > 60 && <span className="font-sans text-xs text-red-500">+{alerts.noPrice.length - 60} autres</span>}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
