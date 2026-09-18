'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/track'

export default function PricingViewTracker({ locale }: { locale: string }) {
  useEffect(() => {
    trackEvent('pricing_viewed', { locale })
  }, [locale])
  return null
}
