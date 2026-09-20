/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },

  // ─── 301 : anciennes URLs indexées → nouvelles URLs traduites ────────────
  // Ces redirections sont permanentes (permanent: true).
  // Elles couvrent les URLs déjà soumises au sitemap Google.
  async redirects() {
    return [
      { source: '/en/tarifs',     destination: '/en/rates',          permanent: true },
      { source: '/en/acces',      destination: '/en/getting-here',   permanent: true },
      { source: '/en/evenements', destination: '/en/events',         permanent: true },
      { source: '/it/tarifs',     destination: '/it/tariffe',        permanent: true },
      { source: '/it/acces',      destination: '/it/come-arrivare',  permanent: true },
      { source: '/it/evenements', destination: '/it/eventi',         permanent: true },
      { source: '/it/services',  destination: '/it/servizi',         permanent: true },
    ]
  },

  // ─── Rewrites internes : slugs traduits → dossiers App Router (FR) ──────
  // L'URL visible reste traduite (/en/rates) mais Next.js sert
  // src/app/[locale]/tarifs/page.tsx avec locale='en'.
  async rewrites() {
    return [
      { source: '/en/rates',         destination: '/en/tarifs' },
      { source: '/en/getting-here',  destination: '/en/acces' },
      { source: '/en/events',        destination: '/en/evenements' },
      { source: '/it/tariffe',       destination: '/it/tarifs' },
      { source: '/it/come-arrivare', destination: '/it/acces' },
      { source: '/it/eventi',        destination: '/it/evenements' },
      { source: '/it/servizi',       destination: '/it/services' },
      { source: '/de/preise',         destination: '/de/tarifs' },
      { source: '/de/anreise',        destination: '/de/acces' },
      { source: '/de/veranstaltungen', destination: '/de/evenements' },
      { source: '/de/leistungen',      destination: '/de/services' },
      // Nouvelles pages — slugs traduits
      { source: '/en/beaches',          destination: '/en/plages' },
      { source: '/en/airport',          destination: '/en/aeroport' },
      { source: '/en/itinerary',        destination: '/en/itineraire' },
      { source: '/en/shopping',         destination: '/en/courses' },
      { source: '/en/children',         destination: '/en/enfants' },
      { source: '/it/spiagge',          destination: '/it/plages' },
      { source: '/it/aeroporto',        destination: '/it/aeroport' },
      { source: '/it/itinerario',       destination: '/it/itineraire' },
      { source: '/it/spesa',            destination: '/it/courses' },
      { source: '/it/bambini',          destination: '/it/enfants' },
      { source: '/de/straende',         destination: '/de/plages' },
      { source: '/de/flughafen',        destination: '/de/aeroport' },
      { source: '/de/reiseroute',       destination: '/de/itineraire' },
      { source: '/de/einkaufen',        destination: '/de/courses' },
      { source: '/de/kinder',           destination: '/de/enfants' },
    ]
  },
}

module.exports = nextConfig
