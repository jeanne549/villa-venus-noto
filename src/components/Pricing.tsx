const seasons = [
  {
    name: 'Basse saison',
    period: 'Octobre — Avril',
    price: 'Sur demande',
    color: 'border-gray-200',
    features: ['Jusqu\'à 9 personnes', '4 suites parentales', 'Piscine privée', 'WiFi & climatisation', 'Four à bois'],
  },
  {
    name: 'Moyenne saison',
    period: 'Mai, Juin & Septembre',
    price: 'Sur demande',
    color: 'border-navy',
    featured: true,
    features: ['Jusqu\'à 9 personnes', '4 suites parentales', 'Piscine privée', 'WiFi & climatisation', 'Four à bois', 'Rooftop 360°'],
  },
  {
    name: 'Haute saison',
    period: 'Juillet & Août',
    price: 'Sur demande',
    color: 'border-gold',
    features: ['Jusqu\'à 9 personnes', '4 suites parentales', 'Piscine privée', 'WiFi & climatisation', 'Four à bois', 'Rooftop 360°'],
  },
]

export default function Pricing() {
  return (
    <section id="tarifs" className="py-24 lg:py-32 bg-linen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-subtitle">Tarifs</p>
          <h2 className="section-title">Location à la semaine</h2>
          <div className="gold-divider" />
          <p className="font-sans text-muted text-base max-w-xl mx-auto">
            Séjour minimum 6 nuits. Contactez-nous pour recevoir nos tarifs et vérifier les disponibilités.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {seasons.map((season) => (
            <div
              key={season.name}
              className={`bg-white border-t-4 ${season.color} p-8 relative ${season.featured ? 'shadow-xl scale-105' : ''}`}
            >
              {season.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-navy text-white font-sans text-xs tracking-widest uppercase px-4 py-1">
                  Populaire
                </div>
              )}
              <p className="font-sans text-xs tracking-widest uppercase text-muted mb-2">{season.period}</p>
              <h3 className="font-serif text-2xl text-charcoal mb-1">{season.name}</h3>
              <div className="my-6">
                <span className="font-serif text-3xl text-charcoal">{season.price}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {season.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 font-sans text-sm text-muted">
                    <span className="text-gold-text">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`w-full text-center block py-3 font-sans text-xs tracking-widest uppercase transition-all duration-300 ${
                  season.featured
                    ? 'bg-navy text-white hover:bg-navy-dark'
                    : 'border border-navy text-navy hover:bg-navy hover:text-white'
                }`}
              >
                Demander un devis
              </a>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 text-center border border-gray-100">
          <p className="font-sans text-sm text-muted">
            💳 Conditions et tarifs détaillés communiqués sur demande ·
            <a href="#contact" className="text-navy underline ml-1">Nous contacter</a>
          </p>
        </div>
      </div>
    </section>
  )
}
