import { MetadataRoute } from 'next'
import type { Lang } from '@/lib/i18n'
import { pageUrl } from '@/lib/routes'

const LOCALES: Lang[] = ['fr', 'en', 'it', 'de']
const BASE = 'https://www.villavenusnoto.com'

// Pages de contenu publiées — toutes vérifiées sans placeholder, indexables
const CONTENT_PAGES: Array<{ key: string; priority: number; modified: string }> = [
  { key: 'tarifs',     priority: 0.9, modified: '2026-09-18' }, // page de revenus, mise à jour régulière
  { key: 'villa',      priority: 0.8, modified: '2026-09-15' },
  { key: 'evenements', priority: 0.8, modified: '2026-09-15' },
  { key: 'faq',        priority: 0.8, modified: '2026-09-15' },
  { key: 'noto',       priority: 0.7, modified: '2026-09-15' },
  { key: 'acces',      priority: 0.7, modified: '2026-09-15' },
  { key: 'services',   priority: 0.7, modified: '2026-09-15' },
  { key: 'journal',    priority: 0.6, modified: '2026-09-15' },
  { key: 'plages',     priority: 0.7, modified: '2026-09-20' },
  { key: 'aeroport',   priority: 0.7, modified: '2026-09-20' },
  { key: 'itineraire', priority: 0.6, modified: '2026-09-20' },
  { key: 'courses',    priority: 0.5, modified: '2026-09-20' },
  { key: 'enfants',    priority: 0.5, modified: '2026-09-20' },
]

// Articles publiés uniquement — slugs sans placeholder vérifiés
// "où dîner" exclu (brouillon)
type ArticleEntry = { locale: Lang; slug: string; modified: string }
const JOURNAL_ARTICLES: ArticleEntry[] = [
  { locale: 'fr', slug: 'infiorata-noto-mai',        modified: '2025-04-01' },
  { locale: 'fr', slug: 'plages-sud-est-sicile',     modified: '2025-06-01' },
  { locale: 'fr', slug: 'sicile-septembre',          modified: '2025-08-01' },
  { locale: 'en', slug: 'infiorata-noto-may',        modified: '2025-04-01' },
  { locale: 'en', slug: 'beaches-southeast-sicily',  modified: '2025-06-01' },
  { locale: 'en', slug: 'sicily-in-september',       modified: '2025-08-01' },
  { locale: 'it', slug: 'infiorata-noto-maggio',     modified: '2025-04-01' },
  { locale: 'it', slug: 'spiagge-sud-est-sicilia',   modified: '2025-06-01' },
  { locale: 'it', slug: 'sicilia-settembre',         modified: '2025-08-01' },
  { locale: 'de', slug: 'infiorata-noto-mai',        modified: '2025-04-01' },
  { locale: 'de', slug: 'straende-suedost-sizilien', modified: '2025-06-01' },
  { locale: 'de', slug: 'sizilien-september',        modified: '2025-08-01' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Pages d'accueil — priorité maximale, mise à jour fréquente (calendrier)
    { url: `${BASE}/fr`, lastModified: '2026-09-20', changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/en`, lastModified: '2026-09-20', changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/it`, lastModified: '2026-09-20', changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/de`, lastModified: '2026-09-20', changeFrequency: 'weekly', priority: 1.0 },

    // Pages de contenu — slugs traduits via la table de routes
    ...CONTENT_PAGES.flatMap(({ key, priority, modified }) =>
      LOCALES.map(locale => ({
        url: pageUrl(key, locale),
        lastModified: modified,
        changeFrequency: key === 'tarifs' ? ('monthly' as const) : ('yearly' as const),
        priority,
      }))
    ),

    // Articles du journal — contenu stable après publication
    ...JOURNAL_ARTICLES.map(({ locale, slug, modified }) => ({
      url: `${BASE}/${locale}/journal/${slug}`,
      lastModified: modified,
      changeFrequency: 'never' as const,
      priority: 0.5,
    })),
  ]
}
