const BASE = 'https://www.villavenusnoto.com'

const GEO_LAT = 36.891
const GEO_LNG = 15.068

const PHOTOS = [
  `${BASE}/photos/hero.jpg`,
  `${BASE}/photos/facade.jpg`,
  `${BASE}/photos/esp-piscine-rooftop.jpg`,
  `${BASE}/photos/esp-rooftop-table.jpg`,
  `${BASE}/photos/suite-bougainvillea.jpg`,
  `${BASE}/photos/suite-gelsomino.jpg`,
  `${BASE}/photos/esp-vue-rooftop.jpg`,
  `${BASE}/photos/jardins.jpg`,
]

const AMENITIES = {
  fr: [
    'Piscine privée 14 m × 7 m',
    'Climatisation',
    'Wi-Fi haut débit',
    'Parking privé',
    'Four à bois',
    'Rooftop panoramique 360°',
    'Terrasse privative par suite',
    'Jardins méditerranéens',
    'Cuisine extérieure',
    'Barbecue & plancha',
    'Bains de soleil balinais',
    'Linge de lit et serviettes',
  ],
  en: [
    'Private pool 14 m × 7 m',
    'Air conditioning',
    'High-speed Wi-Fi',
    'Private parking',
    'Wood-fired oven',
    'Panoramic 360° rooftop',
    'Private terrace per suite',
    'Mediterranean gardens',
    'Outdoor kitchen',
    'BBQ & plancha',
    'Balinese sun loungers',
    'Bed linen and towels',
  ],
  it: [
    'Piscina privata 14 m × 7 m',
    'Aria condizionata',
    'Wi-Fi ad alta velocità',
    'Parcheggio privato',
    'Forno a legna',
    'Rooftop panoramico 360°',
    'Terrazza privata per suite',
    'Giardini mediterranei',
    'Cucina esterna',
    'Barbecue & plancha',
    'Lettini balinesi',
    'Biancheria da letto e asciugamani',
  ],
}

const DESCRIPTIONS = {
  fr: "Villa de luxe à louer à Noto, Sicile. 4 suites avec salle de bain privée, piscine privée 14 × 7 m, rooftop panoramique 360°, jardins méditerranéens. À 5 km de Noto baroque UNESCO. Jusqu'à 9 personnes. Saison avril–octobre, minimum 6 nuits.",
  en: 'Luxury villa for rent in Noto, Sicily. 4 master suites with private bathroom, private pool 14 × 7 m, panoramic 360° rooftop, Mediterranean gardens. 5 km from UNESCO Baroque Noto. Up to 9 guests. Season April–October, minimum 6 nights.',
  it: 'Villa di lusso in affitto a Noto, Sicilia. 4 suite matrimoniali con bagno privato, piscina privata 14 × 7 m, rooftop panoramico 360°, giardini mediterranei. A 5 km da Noto patrimonio UNESCO. Fino a 9 ospiti. Stagione aprile–ottobre, minimo 6 notti.',
}

// Returns the next bookable season year.
// From July onward, the relevant season is next year (advance bookings are open).
function nextSeasonYear(): number {
  const now = new Date()
  return now.getMonth() >= 6 ? now.getFullYear() + 1 : now.getFullYear()
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE}/#organization`,
    name: 'Villa Vénus Noto',
    url: BASE,
    email: 'contact@villavenusnoto.com',
    telephone: '+33 6 24 54 29 95',
    logo: {
      '@type': 'ImageObject',
      url: `${BASE}/og-image.jpg`,
      width: 1200,
      height: 630,
    },
  }
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE}/#website`,
    name: 'Villa Vénus Noto',
    url: BASE,
    inLanguage: ['fr', 'en', 'it'],
    publisher: { '@id': `${BASE}/#organization` },
  }
}

export function getLodgingBusinessSchema(locale: 'fr' | 'en' | 'it') {
  const seasonYear = nextSeasonYear()
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': `${BASE}/#villa`,
    name: 'Villa Vénus Noto',
    alternateName: 'Villa Venus Noto',
    description: DESCRIPTIONS[locale],
    url: `${BASE}/${locale}`,
    email: 'contact@villavenusnoto.com',
    telephone: '+33 6 24 54 29 95',
    sameAs: [
      'https://www.airbnb.com/rooms/10029361',
    ],
    image: PHOTOS,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Contrada Spaccazza',
      addressLocality: 'Noto',
      postalCode: '96017',
      addressRegion: 'SR',
      addressCountry: 'IT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: GEO_LAT,
      longitude: GEO_LNG,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${GEO_LAT},${GEO_LNG}`,
    numberOfRooms: 4,
    maximumAttendeeCapacity: 9,
    amenityFeature: AMENITIES[locale].map((name: string) => ({
      '@type': 'LocationFeatureSpecification',
      name,
      value: true,
    })),
    availableLanguage: [
      { '@type': 'Language', name: 'French' },
      { '@type': 'Language', name: 'Italian' },
      { '@type': 'Language', name: 'English' },
    ],
    priceRange: '€€€',
    currenciesAccepted: 'EUR',
    checkinTime: '16:00',
    checkoutTime: '10:00',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
        validFrom: `${seasonYear}-04-01`,
        validThrough: `${seasonYear}-10-31`,
      },
    ],
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        minPrice: 580,
        maxPrice: 880,
        priceCurrency: 'EUR',
        unitCode: 'DAY',
      },
      availability: 'https://schema.org/LimitedAvailability',
      url: `${BASE}/${locale}#reserver`,
    },
  }
}

export type FaqItem = { question: string; answer: string }

export function getFaqPageSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }
}

export function getBreadcrumbSchema(items: Array<{ name: string; item: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((el, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: el.name,
      item: el.item,
    })),
  }
}

export type BlogPostingInput = {
  headline: string
  description: string
  datePublished: string
  url: string
  inLanguage: string
  image?: string
}

export function getBlogPostingSchema(post: BlogPostingInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.headline,
    description: post.description,
    datePublished: post.datePublished,
    url: post.url,
    inLanguage: post.inLanguage,
    author: {
      '@type': 'Organization',
      name: 'Villa Vénus Noto',
      url: BASE,
    },
    publisher: { '@id': `${BASE}/#organization` },
    isPartOf: { '@id': `${BASE}/#website` },
    ...(post.image ? { image: { '@type': 'ImageObject', url: post.image } } : {}),
  }
}

export function getOfferSchema(locale: 'fr' | 'en' | 'it') {
  const seasonYear = nextSeasonYear()
  const label = {
    low:  { fr: 'Basse saison · Avr – Mai – Oct', en: 'Low season · Apr – May – Oct', it: 'Bassa stagione · Apr – Mag – Ott' },
    mid:  { fr: 'Moyenne saison · Juin – Sep',    en: 'Mid season · Jun – Sep',       it: 'Media stagione · Giu – Set' },
    high: { fr: 'Haute saison · Juil – Août',     en: 'High season · Jul – Aug',      it: 'Alta stagione · Lug – Ago' },
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: locale === 'fr' ? 'Location villa de luxe · Noto, Sicile'
      : locale === 'en' ? 'Luxury villa rental · Noto, Sicily'
      : 'Affitto villa di lusso · Noto, Sicilia',
    url: `${BASE}/${locale}/tarifs`,
    priceCurrency: 'EUR',
    availability: 'https://schema.org/LimitedAvailability',
    validFrom: `${seasonYear}-04-01`,
    validThrough: `${seasonYear}-10-31`,
    itemOffered: { '@id': `${BASE}/#villa` },
    priceSpecification: [
      {
        '@type': 'UnitPriceSpecification',
        name: label.low[locale],
        price: 580,
        priceCurrency: 'EUR',
        unitCode: 'DAY',
      },
      {
        '@type': 'UnitPriceSpecification',
        name: label.mid[locale],
        price: 680,
        priceCurrency: 'EUR',
        unitCode: 'DAY',
      },
      {
        '@type': 'UnitPriceSpecification',
        name: label.high[locale],
        minPrice: 780,
        maxPrice: 880,
        priceCurrency: 'EUR',
        unitCode: 'DAY',
      },
    ],
  }
}
