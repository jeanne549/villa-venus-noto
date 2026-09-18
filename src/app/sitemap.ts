import { MetadataRoute } from 'next'

const BASE = 'https://www.villavenusnoto.com'

// Pages de contenu propres (sans placeholder) — indexables
// villa, tarifs, services, evenements, acces, faq retirés jusqu'à complétion
const CLEAN_CONTENT_PAGES = ['noto', 'journal']
const LOCALES = ['fr', 'en', 'it']

// Articles publiés — "où dîner" retiré (brouillon, contenu incomplet)
const JOURNAL_SLUGS: Record<string, string[]> = {
  fr: ['infiorata-noto-mai', 'plages-sud-est-sicile', 'sicile-septembre'],
  en: ['infiorata-noto-may', 'beaches-southeast-sicily', 'sicily-in-september'],
  it: ['infiorata-noto-maggio', 'spiagge-sud-est-sicilia', 'sicilia-settembre'],
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    // Pages d'accueil — une par langue
    { url: `${BASE}/fr`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/en`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/it`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },

    // Pages de contenu propres (noto + journal index)
    ...CLEAN_CONTENT_PAGES.flatMap(page =>
      LOCALES.map(locale => ({
        url: `${BASE}/${locale}/${page}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }))
    ),

    // Articles du journal publiés (3 articles × 3 langues = 9 URLs)
    ...LOCALES.flatMap(locale =>
      JOURNAL_SLUGS[locale].map(slug => ({
        url: `${BASE}/${locale}/journal/${slug}`,
        lastModified: now,
        changeFrequency: 'yearly' as const,
        priority: 0.7,
      }))
    ),
  ]
}
