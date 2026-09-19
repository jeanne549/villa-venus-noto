import { notFound } from 'next/navigation'
import { LanguageProvider } from '@/contexts/LanguageContext'
import CookieBanner from '@/components/CookieBanner'
import AnalyticsLoader from '@/components/AnalyticsLoader'
import type { Lang } from '@/lib/i18n'

const VALID_LOCALES: readonly string[] = ['fr', 'en', 'it', 'de']

type Props = {
  children: React.ReactNode
  params: { locale: string }
}

export default function LocaleLayout({ children, params }: Props) {
  if (!VALID_LOCALES.includes(params.locale)) notFound()
  const locale = params.locale as Lang
  return (
    <LanguageProvider initialLang={locale}>
      {children}
      <CookieBanner />
      <AnalyticsLoader />
    </LanguageProvider>
  )
}
