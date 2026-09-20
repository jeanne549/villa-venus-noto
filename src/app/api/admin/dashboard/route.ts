import { NextResponse } from 'next/server'

const SB_URL     = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SB_SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY!

function sbHeaders() {
  return {
    apikey: SB_SERVICE,
    Authorization: `Bearer ${SB_SERVICE}`,
    'Content-Type': 'application/json',
  }
}

async function sbGet(path: string) {
  const res = await fetch(`${SB_URL}/rest/v1/${path}`, { headers: sbHeaders() })
  return res.json()
}

export async function GET() {
  const now = new Date()
  const year = now.getFullYear()
  const startOfMonth = `${year}-${String(now.getMonth() + 1).padStart(2, '0')}-01`
  const seasonStart  = `${year}-04-01`
  const seasonEnd    = `${year}-10-31`
  const yearStart    = `${year}-01-01`
  const yearEnd      = `${year}-12-31`

  const [
    requestsThisMonth,
    allRequests,
    respondedRequests,
    bookedDates,
    seasonDates,
    recentRequests,
    requestedDates,
  ] = await Promise.all([
    sbGet(`contact_requests?select=id&created_at=gte.${startOfMonth}`),
    sbGet('contact_requests?select=id'),
    sbGet('contact_requests?select=id&status=neq.new'),
    sbGet(`pricing?select=date&available=eq.false&date=gte.${yearStart}&date=lte.${yearEnd}`),
    sbGet(`pricing?select=available&date=gte.${seasonStart}&date=lte.${seasonEnd}`),
    sbGet('contact_requests?select=id,name,email,arrival_date,departure_date,guests,status,created_at,lang&order=created_at.desc&limit=10'),
    sbGet(`contact_requests?select=arrival_date&arrival_date=gte.${yearStart}&arrival_date=lte.${yearEnd}`),
  ])

  // Nuits réservées par mois (index 0 = janvier)
  const monthNights = new Array(12).fill(0)
  for (const row of Array.isArray(bookedDates) ? bookedDates : []) {
    const m = new Date(row.date).getMonth()
    monthNights[m]++
  }

  // Mois d'arrivée les plus demandés dans les formulaires
  const requestsByMonth = new Array(12).fill(0)
  for (const row of Array.isArray(requestedDates) ? requestedDates : []) {
    if (row.arrival_date) {
      const m = new Date(row.arrival_date).getMonth()
      requestsByMonth[m]++
    }
  }

  const seasonTotal  = Array.isArray(seasonDates) ? seasonDates.length : 0
  const seasonBooked = Array.isArray(seasonDates) ? seasonDates.filter((d: { available: boolean }) => !d.available).length : 0
  const total        = Array.isArray(allRequests) ? allRequests.length : 0
  const responded    = Array.isArray(respondedRequests) ? respondedRequests.length : 0

  return NextResponse.json({
    requests_this_month: Array.isArray(requestsThisMonth) ? requestsThisMonth.length : 0,
    total_requests:      total,
    response_rate:       total > 0 ? Math.round((responded / total) * 100) : 0,
    bookings_by_month:   monthNights,
    season_fill:         seasonTotal > 0 ? Math.round((seasonBooked / seasonTotal) * 100) : 0,
    season_booked:       seasonBooked,
    season_total:        seasonTotal,
    recent_requests:     Array.isArray(recentRequests) ? recentRequests : [],
    requests_by_month:   requestsByMonth,
  })
}
