'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { SITE_CONFIG } from '@/lib/siteConfig'

const hrefLinks = ['#villa', '#galerie', '#equipements', '#disponibilites', '#contact']

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-charcoal text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="font-display text-lg tracking-[0.2em] uppercase mb-1">Villa Vénus Noto</p>
            <p className="font-sans text-white/50 text-xs tracking-widests uppercase mb-4">{t.footer.tagline}</p>
            <p className="font-sans text-white/60 text-sm leading-relaxed">{t.footer.desc}</p>
          </div>
          <div>
            <h4 className="font-sans text-xs tracking-widests uppercase text-gold mb-4">{t.footer.nav_title}</h4>
            <ul className="space-y-2">
              {t.footer.nav_links.map((label, i) => (
                <li key={i}>
                  <a href={hrefLinks[i]} className="font-sans text-white/60 text-sm hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-xs tracking-widests uppercase text-gold mb-4">{t.footer.contact_title}</h4>
            <div className="space-y-2 font-sans text-white/60 text-sm">
              <a href="mailto:contact@villavenusnoto.com" className="block hover:text-white transition-colors">contact@villavenusnoto.com</a>
              <a href="https://wa.me/33624542995" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">WhatsApp : +33 6 24 54 29 95</a>
              <p className="mt-4 whitespace-pre-line">{t.footer.address}</p>
            </div>
          </div>
        </div>
        {/* Identité légale + CIN/CIR */}
        <div className="border-t border-white/10 pt-6 mb-4">
          <div className="flex flex-wrap gap-x-6 gap-y-1 font-sans text-white/40 text-xs">
            <span>Deschaux Jeanne · Codice fiscale DSCJNN71L64F943Q</span>
            {SITE_CONFIG.cin && <span>CIN : <span className="font-mono">{SITE_CONFIG.cin}</span></span>}
            {SITE_CONFIG.cir && <span>CIR : <span className="font-mono">{SITE_CONFIG.cir}</span></span>}
            <span>Contact local : Emanuele Di Pietro · +39 348 006 46 72</span>
          </div>
        </div>

        {/* Liens légaux */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
          {[
            { href: '/mentions-legales', label: 'Mentions légales' },
            { href: '/confidentialite', label: 'Confidentialité' },
            { href: '/cookies', label: 'Cookies' },
            { href: '/conditions-de-reservation', label: 'Conditions' },
          ].map(link => (
            <a key={link.href} href={link.href} className="font-sans text-white/40 text-xs hover:text-white/70 transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-white/40 text-xs">© {year} Villa Vénus Noto · {t.footer.rights}</p>
          <a href="/admin/calendrier" className="font-sans text-white/30 text-xs hover:text-white/60 transition-colors">{t.footer.admin}</a>
        </div>
      </div>
    </footer>
  )
}
