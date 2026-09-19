// ─── Table de correspondance des slugs par langue ────────────────────────────
// Clé interne = slug français (nom du dossier App Router).
// Toute nouvelle page doit être ajoutée ici pour hériter du mécanisme automatiquement.

import type { Lang } from '@/lib/i18n'

export const PAGE_SLUGS: Record<string, Record<Lang, string>> = {
  villa:      { fr: 'villa',       en: 'villa',           it: 'villa',         de: 'villa' },
  tarifs:     { fr: 'tarifs',      en: 'rates',            it: 'tariffe',       de: 'preise' },
  services:   { fr: 'services',    en: 'services',         it: 'servizi',       de: 'leistungen' },
  evenements: { fr: 'evenements',  en: 'events',           it: 'eventi',        de: 'veranstaltungen' },
  acces:      { fr: 'acces',       en: 'getting-here',     it: 'come-arrivare', de: 'anreise' },
  faq:        { fr: 'faq',         en: 'faq',              it: 'faq',           de: 'faq' },
  noto:       { fr: 'noto',        en: 'noto',             it: 'noto',          de: 'noto' },
  journal:    { fr: 'journal',     en: 'journal',          it: 'journal',       de: 'journal' },
}

const BASE = 'https://www.villavenusnoto.com'
const LANGS: Lang[] = ['fr', 'en', 'it']

/** URL canonique traduite d'une page pour une langue donnée */
export function pageUrl(page: string, lang: Lang | string): string {
  const slug = (PAGE_SLUGS[page] as Record<string, string> | undefined)?.[lang] ?? page
  return `${BASE}/${lang}/${slug}`
}

/** Objet alternates prêt pour Next.js generateMetadata */
export function buildAlternates(page: string, locale: Lang) {
  const languages: Record<string, string> = {}
  for (const l of LANGS) languages[l] = pageUrl(page, l)
  languages['x-default'] = pageUrl(page, 'fr')
  return {
    canonical: pageUrl(page, locale),
    languages,
  }
}
