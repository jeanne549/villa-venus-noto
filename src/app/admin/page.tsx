'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

type Request = {
  id: string
  name: string
  email: string
  phone?: string
  arrival_date: string
  departure_date: string
  guests: number
  message?: string
  status: string
  lang?: string
  created_at: string
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  new:       { label: 'Nouveau',    color: 'bg-gold text-white' },
  read:      { label: 'Lu',         color: 'bg-navy text-white' },
  replied:   { label: 'Répondu',    color: 'bg-blue-600 text-white' },
  confirmed: { label: 'Confirmé',   color: 'bg-green-600 text-white' },
  waitlist:  { label: 'Liste att.', color: 'bg-amber-500 text-white' },
  cancelled: { label: 'Annulé',     color: 'bg-gray-400 text-white' },
}

function nights(a: string, b: string) {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000)
}

export default function AdminPage() {
  const [requests, setRequests]           = useState<Request[]>([])
  const [loading, setLoading]             = useState(true)
  const [error, setError]                 = useState('')
  const [filter, setFilter]               = useState<string>('all')
  const [contractId, setContractId]       = useState<string | null>(null)
  const [contractTotal, setContractTotal] = useState('')
  const [contractStatus, setContractStatus] = useState<'idle'|'loading'|'sent'|'error'>('idle')
  const router = useRouter()

  const fetchRequests = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/requests')
    if (res.status === 401) { router.push('/admin/login'); return }
    if (!res.ok) { setError('Erreur de chargement'); setLoading(false); return }
    setRequests(await res.json())
    setLoading(false)
  }, [router])

  useEffect(() => { fetchRequests() }, [fetchRequests])

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/requests?id=${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    fetchRequests()
  }

  const sendContract = async (id: string) => {
    setContractStatus('loading')
    const totalRental = contractTotal ? parseInt(contractTotal) : undefined
    const res = await fetch('/api/admin/send-contract', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requestId: id, totalRental }),
    })
    if (res.ok) {
      setContractStatus('sent')
      setContractId(null)
      setContractTotal('')
      fetchRequests()
      setTimeout(() => setContractStatus('idle'), 4000)
    } else {
      setContractStatus('error')
    }
  }

  const logout = async () => {
    await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' }),
    })
    router.push('/admin/login')
  }

  const filtered = filter === 'all' ? requests : requests.filter(r => r.status === filter)
  const newCount = requests.filter(r => r.status === 'new').length

  return (
    <div className="min-h-screen bg-linen">
      <header className="bg-navy text-white px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="font-serif text-xl">Villa Vénus Noto — Administration</h1>
          <p className="font-sans text-white/60 text-xs">
            {requests.length} demande(s) · {newCount > 0 && <span className="text-gold-text font-semibold">{newCount} nouvelle(s)</span>}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <a href="/admin/dashboard" className="font-sans text-xs text-white/70 hover:text-white tracking-widest uppercase">Dashboard</a>
          <a href="/admin/calendrier" className="font-sans text-xs text-white/70 hover:text-white tracking-widests uppercase">Calendrier</a>
          <button onClick={logout} className="font-sans text-xs text-white/60 hover:text-white uppercase tracking-widests">
            Déconnexion
          </button>
        </div>
      </header>

      {/* Toast contrat envoyé */}
      {contractStatus === 'sent' && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-5 py-3 font-sans text-sm shadow-lg">
          ✓ Contrat envoyé par email
        </div>
      )}
      {contractStatus === 'error' && (
        <div className="fixed top-4 right-4 z-50 bg-red-600 text-white px-5 py-3 font-sans text-sm shadow-lg">
          Erreur — vérifiez la clé Resend
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-8">
        {loading && <p className="font-sans text-muted text-center py-12">Chargement…</p>}
        {error && <p className="font-sans text-red-500 text-center py-4">{error}</p>}

        {/* Filtres par statut */}
        {!loading && requests.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-6">
            {['all', 'new', 'read', 'replied', 'confirmed', 'waitlist', 'cancelled'].map(s => {
              const count = s === 'all' ? requests.length : requests.filter(r => r.status === s).length
              if (s !== 'all' && count === 0) return null
              return (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`font-sans text-xs px-4 py-2 uppercase tracking-widests transition-colors border ${
                    filter === s ? 'bg-navy text-white border-navy' : 'bg-white text-muted border-gray-200 hover:border-navy hover:text-navy'
                  }`}
                >
                  {s === 'all' ? 'Toutes' : STATUS_LABELS[s]?.label ?? s} ({count})
                </button>
              )
            })}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-serif text-3xl text-charcoal mb-2">Aucune demande</p>
            <p className="font-sans text-muted">
              {filter === 'all' ? 'Les demandes de réservation apparaîtront ici.' : `Aucune demande avec le statut "${filter}".`}
            </p>
          </div>
        )}

        <div className="space-y-4">
          {filtered.map((req) => {
            const n = nights(req.arrival_date, req.departure_date)
            const isContractOpen = contractId === req.id
            const s = STATUS_LABELS[req.status] ?? { label: req.status, color: 'bg-gray-400 text-white' }

            return (
              <div key={req.id} className={`bg-white p-6 border-l-4 ${req.status === 'new' ? 'border-gold' : req.status === 'confirmed' ? 'border-green-500' : 'border-navy/30'}`}>
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                  <div>
                    <h2 className="font-serif text-xl text-charcoal">{req.name}</h2>
                    <p className="font-sans text-sm text-muted">
                      <a href={`mailto:${req.email}`} className="hover:text-navy">{req.email}</a>
                      {req.phone && <> · <a href={`tel:${req.phone}`} className="hover:text-navy">{req.phone}</a></>}
                      {req.lang && <span className="ml-2 text-xs text-muted/60 uppercase">[{req.lang}]</span>}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`font-sans text-xs px-3 py-1 uppercase tracking-widests ${s.color}`}>
                      {s.label}
                    </span>
                    <span className="font-sans text-xs text-muted">
                      {new Date(req.created_at).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="font-sans text-xs text-muted uppercase tracking-widests">Arrivée</p>
                    <p className="font-sans text-sm text-charcoal font-medium">
                      {new Date(req.arrival_date + 'T12:00:00').toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div>
                    <p className="font-sans text-xs text-muted uppercase tracking-widests">Départ</p>
                    <p className="font-sans text-sm text-charcoal font-medium">
                      {new Date(req.departure_date + 'T12:00:00').toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div>
                    <p className="font-sans text-xs text-muted uppercase tracking-widests">Durée</p>
                    <p className="font-sans text-sm text-charcoal font-medium">{n} nuit{n > 1 ? 's' : ''}</p>
                  </div>
                  <div>
                    <p className="font-sans text-xs text-muted uppercase tracking-widests">Personnes</p>
                    <p className="font-sans text-sm text-charcoal font-medium">{req.guests}</p>
                  </div>
                </div>

                {req.message && (
                  <div className="bg-linen px-4 py-3 mb-4">
                    <p className="font-sans text-sm text-muted italic">&ldquo;{req.message}&rdquo;</p>
                  </div>
                )}

                {/* Bloc envoi de contrat */}
                {isContractOpen && (
                  <div className="mb-4 bg-cream border border-gold/30 px-5 py-4">
                    <p className="font-sans text-xs text-muted uppercase tracking-widests mb-3">Montant total location (optionnel)</p>
                    <div className="flex gap-3 items-center flex-wrap">
                      <input
                        type="number"
                        placeholder={`Calculé automatiquement (~${n * 730} €)`}
                        value={contractTotal}
                        onChange={e => setContractTotal(e.target.value)}
                        className="border border-gray-300 px-3 py-2 font-sans text-sm w-56 focus:border-gold focus:outline-none"
                      />
                      <button
                        onClick={() => sendContract(req.id)}
                        disabled={contractStatus === 'loading'}
                        className="bg-navy text-white font-sans text-xs uppercase tracking-widests px-5 py-2 hover:bg-navy/80 transition-colors disabled:opacity-50"
                      >
                        {contractStatus === 'loading' ? 'Envoi…' : 'Confirmer l\'envoi'}
                      </button>
                      <button
                        onClick={() => { setContractId(null); setContractTotal('') }}
                        className="font-sans text-xs text-muted hover:text-charcoal"
                      >
                        Annuler
                      </button>
                    </div>
                    <p className="font-sans text-xs text-muted/60 mt-2">
                      Le contrat sera envoyé à {req.email}. Le montant par défaut est {n} nuits × 730 € = {(n * 730).toLocaleString('fr-FR')} €.
                    </p>
                  </div>
                )}

                <div className="flex gap-3 flex-wrap">
                  <a
                    href={`mailto:${req.email}?subject=Villa Vénus Noto — Votre demande de réservation`}
                    className="font-sans text-xs tracking-widests uppercase border border-navy text-navy px-4 py-2 hover:bg-navy hover:text-white transition-colors"
                    onClick={() => { if (req.status === 'new' || req.status === 'read') updateStatus(req.id, 'replied') }}
                  >
                    Répondre par email
                  </a>

                  {/* Bouton contrat — uniquement si pas waitlist/cancelled */}
                  {!['waitlist', 'cancelled'].includes(req.status) && (
                    <button
                      onClick={() => {
                        setContractId(isContractOpen ? null : req.id)
                        setContractTotal('')
                        setContractStatus('idle')
                      }}
                      className="font-sans text-xs tracking-widests uppercase border border-gold text-gold-dark px-4 py-2 hover:bg-gold hover:text-white transition-colors"
                    >
                      {isContractOpen ? '✕ Fermer' : 'Envoyer le contrat'}
                    </button>
                  )}

                  {/* Bouton confirmer */}
                  {req.status !== 'confirmed' && req.status !== 'waitlist' && req.status !== 'cancelled' && (
                    <button
                      onClick={() => updateStatus(req.id, 'confirmed')}
                      className="font-sans text-xs tracking-widests uppercase border border-green-600 text-green-700 px-4 py-2 hover:bg-green-600 hover:text-white transition-colors"
                    >
                      Marquer confirmé
                    </button>
                  )}

                  {req.status === 'new' && (
                    <button
                      onClick={() => updateStatus(req.id, 'read')}
                      className="font-sans text-xs tracking-widests uppercase border border-gray-300 text-muted px-4 py-2 hover:border-navy hover:text-navy transition-colors"
                    >
                      Marquer lu
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
