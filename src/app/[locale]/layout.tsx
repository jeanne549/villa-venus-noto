import { LanguageProvider } from '@/contexts/LanguageContext'
import CookieBanner from '@/components/CookieBanner'
import AnalyticsLoader from '@/components/AnalyticsLoader'
import type { Lang } from '@/lib/i18n'

type Props = {
  children: React.ReactNode
  params: { locale: string }
}

export default function LocaleLayout({ children, params }: Props) {
  const locale = (['fr', 'en', 'it', 'de'].includes(params.locale) ? params.locale : 'fr') as Lang
  return (
    <LanguageProvider initialLang={locale}>
      {children}
      <CookieBanner />
      <AnalyticsLoader />
    </LanguageProvider>
  )
}
