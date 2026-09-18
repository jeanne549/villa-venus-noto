'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type AnalyticsData =
  | { configured: false }
  | { configured: true; error: string }
  | { configured: true; visitors: number; sessions: number; pageviews: number; topPages: { path: string; views: number }[] }

type DashboardData = {
  requests_this_month: number
  total_requests: number
  response_rate: number
  bookings_by_month: number[]
  season_fill: number
  season_booked: number
  season_total: number
  recent_requests: Array<{
    id: string
    name: string
    email: string
    arrival_date: string
    departure_date: string
    guests: number
    status: string
    created_at: string
    lang: string
  }>
}

const MONTHS = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc']

const STATUS_STYLES: Record<string, string> = {
  new:       'bg-blue-100 text-blue-800',
  replied:   'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  rejected:  'bg-red-100 text-red-700',
}
const STATUS_LABELS: Record<string, string> = {
  new: 'Nouvelle', replied: 'Répondu', confirmed: 'Confirmé', rejected: 'Refusé',
}

function StatCard({ title, value, subtitle, color }: { title: string; value: string | number; subtitle: string; color: string }) {
  const colors: Record<string, string> = {
    blue:   'bg-blue-50 border-blue-200 text-blue-700',
    green:  'bg-green-50 border-green-200 text-green-700',
    amber:  'bg-amber-50 border-amber-200 text-amber-700',
    orange: 'bg-orange-50 border-orange-200 text-orange-700',
    gray:   'bg-gray-50 border-gray-200 text-gray-700',
  }
  return (
    <div className={`rounded-xl border p-5 ${colors[color] ?? colors.gray}`}>
      <p className="text-xs font-medium uppercase tracking-widest opacity-60 mb-2">{title}</p>
      <p className="text-3xl font-bold leading-none">{value}</p>
      <p className="text-xs opacity-50 mt-2">{subtitle}</p>
    </div>
  )
}

function GuideCard({ n, title, description, color }: { n: string; title: string; description: string; color: 'blue' | 'green' | 'amber' }) {
  const badge = { blue: 'bg-blue-600', green: 'bg-green-600', amber: 'bg-amber-500' }
  const bg    = { blue: 'bg-blue-50 border-blue-200', green: 'bg-green-50 border-green-200', amber: 'bg-amber-50 border-amber-200' }
  return (
    <div className={`rounded-lg border p-4 ${bg[color]}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white ${badge[color]}`}>{n}</span>
        <h3 className="font-semibold text-sm text-gray-900">{title}</h3>
      </div>
      <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
}

export default function AdminDashboard() {
  const router = useRouter()
  const [data, setData]         = useState<DashboardData | null>(null)
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(false)

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/dashboard').then(res => {
        if (res.status === 401) { router.push('/admin/login'); return null }
        return res.json()
      }),
      fetch('/api/admin/analytics').then(r => r.ok ? r.json() : null).catch(() => null),
    ])
      .then(([d, a]) => { if (d) setData(d); if (a) setAnalytics(a) })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [router])

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-400 text-sm">Chargement…</p>
    </div>
  )
  if (error || !data) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-red-500 text-sm">Erreur. <a href="/admin/login" className="underline">Se reconnecter</a></p>
    </div>
  )

  const year = new Date().getFullYear()
  const maxNights = Math.max(...data.bookings_by_month, 1)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Tableau de bord — Villa Vénus Noto</h1>
            <p className="text-xs text-gray-400 mt-0.5">Saison {year}</p>
          </div>
          <Link href="/admin/calendrier" className="text-sm text-gray-500 hover:text-gray-900 border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors">
            ← Calendrier &amp; Avis
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Demandes ce mois" value={data.requests_this_month} subtitle="nouvelles demandes" color="blue" />
          <StatCard title="Total demandes" value={data.total_requests} subtitle="depuis l'ouverture" color="gray" />
          <StatCard title="Taux de réponse" value={`${data.response_rate} %`} subtitle="demandes traitées" color={data.response_rate >= 80 ? 'green' : 'orange'} />
          <StatCard title="Remplissage saison" value={`${data.season_fill} %`} subtitle={`${data.season_booked} / ${data.season_total} nuits`} color={data.season_fill >= 60 ? 'green' : data.season_fill >= 30 ? 'amber' : 'gray'} />
        </div>

        {/* Traffic GA4 */}
        {analytics && 'visitors' in analytics ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Trafic — mois en cours</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Visiteurs', value: analytics.visitors },
                  { label: 'Sessions', value: analytics.sessions },
                  { label: 'Pages vues', value: analytics.pageviews },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <p className="text-2xl font-bold text-gray-900 tabular-nums">{value.toLocaleString('fr-FR')}</p>
                    <p className="text-xs text-gray-400 mt-1">{label}</p>
                  </div>
                ))}
              </div>
              {analytics.visitors > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Taux de transformation :{' '}
                    <strong className="text-gray-900">
                      {analytics.sessions > 0
                        ? ((data.requests_this_month / analytics.sessions) * 100).toFixed(1)
                        : '—'} %
                    </strong>
                    <span className="text-gray-400"> (demandes / sessions)</span>
                  </p>
                </div>
              )}
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Pages les plus vues ce mois</h2>
              <ol className="space-y-2">
                {analytics.topPages.map((p, i) => (
                  <li key={p.path} className="flex items-center gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                    <span className="flex-1 text-gray-600 truncate font-mono text-xs">{p.path}</span>
                    <span className="text-gray-900 font-semibold tabular-nums shrink-0">{p.views.toLocaleString('fr-FR')}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ) : analytics && !('visitors' in analytics) ? (
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
            <h2 className="text-sm font-semibold text-blue-900 mb-2">Données de trafic non disponibles</h2>
            <p className="text-xs text-blue-700 mb-3">
              Pour afficher les visiteurs et les pages vues ici, ajoutez deux variables dans Vercel :<br />
              <strong>GA4_PROPERTY_ID</strong> (numérique, ex. 123456789) et <strong>GA4_SERVICE_ACCOUNT_JSON</strong> (le JSON complet du compte de service Google Analytics).<br />
              Puis dans Google Analytics → Admin → Gestion des accès à la propriété, ajoutez l&apos;email du compte de service avec le rôle Lecteur.
            </p>
            {'error' in analytics && analytics.error === 'token_failed' && (
              <p className="text-xs text-red-600">⚠️ Le compte de service est configuré mais le token est invalide — vérifiez le JSON.</p>
            )}
          </div>
        ) : null}

        {/* Season fill gauge */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-1">Remplissage saison — avril à octobre {year}</h2>
          <p className="text-xs text-gray-400 mb-4">{data.season_booked} nuits réservées sur {data.season_total} disponibles</p>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-700"
                style={{ width: `${data.season_fill}%` }}
              />
            </div>
            <span className="text-lg font-bold text-gray-800 w-14 text-right">{data.season_fill}%</span>
          </div>
        </div>

        {/* Monthly bar chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-6">Nuits réservées par mois ({year})</h2>
          <div className="flex items-end gap-1.5 h-36">
            {data.bookings_by_month.map((n, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-medium text-gray-500">{n > 0 ? n : ''}</span>
                <div
                  className="w-full bg-amber-400 rounded-t"
                  style={{ height: `${n > 0 ? Math.max((n / maxNights) * 100, 6) : 3}px`, opacity: n > 0 ? 1 : 0.2 }}
                />
                <span className="text-[10px] text-gray-400">{MONTHS[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent requests */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Dernières demandes</h2>
            <Link href="/admin/calendrier" className="text-xs text-amber-600 hover:text-amber-700">Gérer toutes →</Link>
          </div>
          {data.recent_requests.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">Aucune demande reçue pour l'instant.</p>
          ) : (
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-sm min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    {['Nom', 'Arrivée', 'Départ', 'Pers.', 'Statut', 'Lang', 'Date demande'].map(h => (
                      <th key={h} className="text-left text-[10px] text-gray-400 uppercase tracking-wider pb-2 pr-4 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data.recent_requests.map(r => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="py-2.5 pr-4 font-medium text-gray-900 whitespace-nowrap">{r.name}</td>
                      <td className="py-2.5 pr-4 text-gray-600 whitespace-nowrap">{r.arrival_date?.slice(0, 10) ?? '—'}</td>
                      <td className="py-2.5 pr-4 text-gray-600 whitespace-nowrap">{r.departure_date?.slice(0, 10) ?? '—'}</td>
                      <td className="py-2.5 pr-4 text-gray-600">{r.guests}</td>
                      <td className="py-2.5 pr-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${STATUS_STYLES[r.status] ?? 'bg-gray-100 text-gray-600'}`}>
                          {STATUS_LABELS[r.status] ?? r.status}
                        </span>
                      </td>
                      <td className="py-2.5 pr-4 text-gray-400 uppercase text-xs">{r.lang}</td>
                      <td className="py-2.5 text-gray-400 text-xs whitespace-nowrap">{r.created_at?.slice(0, 10) ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Search Console Guide */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-1">Search Console — 3 écrans à surveiller chaque semaine</h2>
          <p className="text-xs text-gray-400 mb-5">
            Accès :{' '}
            <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">
              search.google.com/search-console
            </a>{' '}
            · Propriété sélectionnée : <strong>villavenusnoto.com</strong>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <GuideCard n="1" color="blue" title="Performances → Requêtes"
              description="Voyez sur quels mots-clés Google vous affiche. Repérez les requêtes avec beaucoup d'impressions mais peu de clics (CTR faible) : ce sont celles où votre titre/description doit être plus accrocheur." />
            <GuideCard n="2" color="green" title="Indexation → Pages"
              description='Vérifiez que "Pages valides" augmente et "Erreurs" reste à zéro. Les anciennes URL /en et /contact y seront listées si Google les cherche encore — cliquez pour voir la raison exacte.' />
            <GuideCard n="3" color="amber" title="Expérience → Données structurées"
              description='Confirme que vos schémas JSON-LD (LodgingBusiness, FAQ, BreadcrumbList) sont valides. Toute erreur ici empêche les rich snippets dans les résultats Google.' />
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-xs text-amber-800">
            <strong>Sitemap soumis :</strong>{' '}
            <code className="bg-amber-100 px-1 rounded font-mono">https://www.villavenusnoto.com/sitemap.xml</code>
            {' '}— visible dans le menu "Sitemaps". Si le statut n'est pas <em>Succès</em>, cliquez "Soumettre à nouveau".
          </div>
        </div>

        {/* Analytics activation guide */}
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
          <h2 className="text-sm font-semibold text-blue-900 mb-1">Activer Google Analytics 4 &amp; Meta Pixel</h2>
          <p className="text-xs text-blue-700 mb-4">
            Le code est en place et respecte le bandeau de consentement. Il ne manque que vos IDs dans Vercel :<br />
            <strong>Vercel → votre projet → Settings → Environment Variables</strong>, puis redéployez.
          </p>
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white rounded-lg px-4 py-3 border border-blue-100">
              <code className="font-mono text-xs text-gray-800 sm:flex-1">NEXT_PUBLIC_GA4_ID</code>
              <span className="text-xs text-gray-400">Format : G-XXXXXXXXXX — trouvez-le dans Analytics → Admin → Flux de données</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white rounded-lg px-4 py-3 border border-blue-100">
              <code className="font-mono text-xs text-gray-800 sm:flex-1">NEXT_PUBLIC_META_PIXEL_ID</code>
              <span className="text-xs text-gray-400">Format : 123456789012 — dans Meta Business → Gestionnaire d'événements</span>
            </div>
          </div>
          <p className="text-xs text-blue-600 mt-3">
            Événements GA4 suivis (après consentement) : <strong>reservation_sent</strong> · <strong>whatsapp_click</strong> · <strong>email_click</strong> · <strong>dates_selected</strong> · <strong>pricing_viewed</strong> · <strong>language_changed</strong> · <strong>review_submitted</strong>.
            Événement Meta Pixel : <strong>Lead</strong> sur reservation_sent.
          </p>
        </div>

      </main>
    </div>
  )
}
