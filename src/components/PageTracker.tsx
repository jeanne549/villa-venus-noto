'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/track'

export default function PageTracker({ page, lang }: { page: string; lang: string }) {
  useEffect(() => {
    trackEvent('page_viewed', { page, lang })
  }, [page, lang])
  return null
}
