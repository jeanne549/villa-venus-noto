import { MetadataRoute } from 'next'

const BASE = 'https://www.villavenusnoto.com'

const CONTENT_PAGES = ['villa', 'tarifs', 'noto', 'evenements', 'services', 'acces', 'faq', 'journal']
const LOCALES = ['fr', 'en', 'it']

const JOURNAL_SLUGS: Record<string, string[]> = {
  fr: ['infiorata-noto-mai', 'plages-sud-est-sicile', 'sicile-septembre', 'ou-diner-noto'],
  en: ['infiorata-noto-may', 'beaches-southeast-sicily', 'sicily-in-september', 'where-to-eat-noto'],
  it: ['infiorata-noto-maggio', 'spiagge-sud-est-sicilia', 'sicilia-settembre', 'dove-mangiare-noto'],
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    // Pages principales — une par langue
    { url: `${BASE}/fr`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/en`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/it`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },

    // Pages de contenu SEO (8 pages × 3 langues = 24 URLs)
    ...CONTENT_PAGES.flatMap(page =>
      LOCALES.map(locale => ({
        url: `${BASE}/${locale}/${page}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: page === 'villa' || page === 'tarifs' ? 0.9 : 0.8,
      }))
    ),

    // Articles du journal (4 articles × 3 langues = 12 URLs)
    ...LOCALES.flatMap(locale =>
      JOURNAL_SLUGS[locale].map(slug => ({
        url: `${BASE}/${locale}/journal/${slug}`,
        lastModified: now,
        changeFrequency: 'yearly' as const,
        priority: 0.7,
      }))
    ),

    // Conditions de réservation
    { url: `${BASE}/conditions-de-reservation`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/booking-conditions`,         lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/condizioni-di-prenotazione`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    // Mentions légales
    { url: `${BASE}/mentions-legales`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/legal-notice`,     lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/note-legali`,      lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    // Confidentialité
    { url: `${BASE}/confidentialite`,    lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/privacy-policy`,     lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/informativa-privacy`,lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    // Cookies
    { url: `${BASE}/cookies`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ]
}
