'use client'

// Map custom event → GA4 event name
const GA4_MAP: Record<string, string> = {
  reservation_sent:     'form_submit',
  whatsapp_click:       'click',
  email_click:          'click',
  hero_cta_click:       'click',
  ribbon_cta_click:     'click',
  sticky_bar_cta_click: 'click',
  pricing_cta_click:    'click',
  pricing_viewed:       'view_item',
  gallery_browsed:      'view_item_list',
  dates_selected:       'select_content',
  language_changed:     'select_content',
  review_submitted:     'generate_lead',
}

// Map custom event → Meta Pixel event (only the ones worth tracking in Ads)
const FBQ_MAP: Record<string, string> = {
  reservation_sent: 'Lead',
  whatsapp_click:   'Contact',
  email_click:      'Contact',
}

export function trackEvent(event: string, data?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any

  // dataLayer — GTM compatibility layer
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event, ...data })
  }

  // GA4 direct (loaded by AnalyticsLoader after consent)
  if (typeof w.gtag === 'function') {
    w.gtag('event', GA4_MAP[event] ?? event, { custom_event: event, ...data })
  }

  // Meta Pixel (loaded by AnalyticsLoader after consent)
  if (typeof w.fbq === 'function' && FBQ_MAP[event]) {
    w.fbq('track', FBQ_MAP[event], { custom_event: event, ...data })
  }
}
