import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter, Cinzel } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-cinzel',
  display: 'swap',
})

const BASE_URL = 'https://www.villavenusnoto.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Villa Vénus Noto — Location de Luxe en Sicile',
  description: 'Villa de luxe à louer à Noto, Sicile. 4 suites parentales, piscine privée 14×7 m, rooftop 360°, jardins méditerranéens. À 5 km de Noto baroque UNESCO. Location saisonnière jusqu\'à 9 personnes.',
  keywords: ['villa noto sicily', 'villa venus noto', 'luxury villa sicily', 'villa piscine noto', 'contrada spaccazza noto'],
  authors: [{ name: 'Villa Vénus Noto' }],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: 'Villa Vénus Noto — Location de Luxe en Sicile',
    description: 'Villa d\'exception à Noto, Sicile. 4 suites, piscine privée 14×7 m, rooftop 360°. À 5 km de Noto UNESCO.',
    url: BASE_URL,
    siteName: 'Villa Vénus Noto',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Villa Vénus Noto — Piscine et rooftop en Sicile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Villa Vénus Noto — Location de Luxe en Sicile',
    description: 'Villa d\'exception à Noto, Sicile. Piscine privée, rooftop 360°, jardins méditerranéens.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [{ rel: 'manifest', url: '/site.webmanifest' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  verification: {
    google: ['dy02-liORD9vNJTbETBLvPPKtxwRLUWVNHmY7LSk30E', 'JxKa5V2-ANgCfe5g4n12J-SBgcCHRy_RC-d-_nW0SRI'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable} ${cinzel.variable}`}>
      <head>
        {/* Set html.lang from URL before hydration — avoids dynamic headers() in root layout */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){var p=location.pathname;document.documentElement.lang=p.startsWith('/en')?'en':p.startsWith('/it')?'it':p.startsWith('/de')?'de':'fr';})()` }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
