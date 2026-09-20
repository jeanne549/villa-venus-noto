import { redirect } from 'next/navigation'
import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import type { Lang } from '@/lib/i18n'
import JsonLd from '@/components/JsonLd'
import { getLodgingBusinessSchema, getWebSiteSchema, getOrganizationSchema } from '@/lib/structured-data'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import PointsForts from '@/components/PointsForts'
import About from '@/components/About'
import Amenities from '@/components/Amenities'
import PricingGrid from '@/components/PricingGrid'
import ContactRibbon from '@/components/ContactRibbon'
import WhatsAppButton from '@/components/WhatsAppButton'
import StickyBar from '@/components/StickyBar'
import Footer from '@/components/Footer'

const Gallery    = dynamic(() => import('@/components/Gallery'))
const Calendrier = dynamic(() => import('@/components/Calendrier'), { ssr: false })
const Testimonials = dynamic(() => import('@/components/Testimonials'))
const ReviewForm = dynamic(() => import('@/components/ReviewForm'), { ssr: false })
const Contact    = dynamic(() => import('@/components/Contact'),    { ssr: false })

const BASE = 'https://www.villavenusnoto.com'
const LOCALES: Lang[] = ['fr', 'en', 'it', 'de']

const META = {
  fr: {
    title: 'Villa Vénus Noto — Location Luxe Sicile · Dès 580 €/nuit',
    description: 'Location villa de luxe à Noto, Sicile. Dès 580 €/nuit · jusqu\'à 9 personnes · 4 suites, piscine privée 14×7 m, rooftop 360°. Réservation directe sans commission. À 5 km de Noto UNESCO.',
    ogLocale: 'fr_FR',
  },
  en: {
    title: 'Villa Vénus Noto — Luxury Villa Sicily · From €580/night',
    description: 'Luxury villa rental in Noto, Sicily. From €580/night · up to 9 guests · 4 suites, private pool 14×7 m, 360° rooftop. Direct booking, no platform commission. 5 km from UNESCO Noto.',
    ogLocale: 'en_US',
  },
  it: {
    title: 'Villa Vénus Noto — Villa Lusso Sicilia · Da 580 €/notte',
    description: 'Villa di lusso in affitto a Noto, Sicilia. Da 580 €/notte · fino a 9 ospiti · 4 suite, piscina privata 14×7 m, rooftop panoramico. Prenotazione diretta senza commissioni. A 5 km da Noto UNESCO.',
    ogLocale: 'it_IT',
  },
  de: {
    title: 'Villa Vénus Noto — Luxusvilla Sizilien · Ab 580 €/Nacht',
    description: 'Luxusvilla-Vermietung in Noto, Sizilien. Ab 580 €/Nacht · bis zu 9 Gäste · 4 Suiten, privater Pool 14×7 m, 360°-Rooftop. Direktbuchung ohne Provision. 5 km vom UNESCO-Noto.',
    ogLocale: 'de_DE',
  },
}

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Lang
  if (!META[locale]) return {}
  const { title, description, ogLocale } = META[locale]
  return {
    title,
    description,
    robots: locale === 'de' ? { index: false, follow: false } : { index: true, follow: true },
    alternates: {
      canonical: `${BASE}/${locale}`,
      languages: {
        fr: `${BASE}/fr`,
        en: `${BASE}/en`,
        it: `${BASE}/it`,
        'x-default': `${BASE}/fr`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE}/${locale}`,
      siteName: 'Villa Vénus Noto',
      locale: ogLocale,
      type: 'website',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.jpg'],
    },
  }
}

export default function LocalePage({ params }: { params: { locale: string } }) {
  if (!LOCALES.includes(params.locale as Lang)) redirect('/fr')
  const locale = params.locale as Lang
  return (
    <>
      <JsonLd data={[
        getLodgingBusinessSchema(locale),
        getWebSiteSchema(),
        getOrganizationSchema(),
      ]} />
      <main>
        <Navigation />
        <Hero />
        <About />
        <ContactRibbon />
        <Amenities />
        <Gallery />
        <ContactRibbon />
        <PointsForts />
        <PricingGrid locale={locale} />
        <Calendrier />
        <Testimonials />
        <ReviewForm />
        <Contact />
        <Footer />
      </main>
      <WhatsAppButton />
      <StickyBar />
    </>
  )
}
