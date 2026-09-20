import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-display text-xs tracking-[0.4em] uppercase text-gold-text mb-4">404</p>
        <h1 className="font-serif text-5xl text-charcoal mb-4">Page introuvable</h1>
        <div className="w-16 h-px bg-gold mx-auto my-6" />
        <p className="font-sans text-muted mb-8">Cette page n&apos;existe pas ou a été déplacée.</p>
        <Link href="/" className="btn-primary">
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}
