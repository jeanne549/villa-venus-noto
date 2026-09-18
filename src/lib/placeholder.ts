// Détection automatique de placeholders dans le contenu des pages.
// Toute page contenant un placeholder passe en noindex et sort du sitemap.

const SUBSTRINGS = [
  'confirmer]',    // [À confirmer], [Coordonnées exactes à confirmer], etc.
  'compléter]',    // [À compléter], [À COMPLÉTER]
  'to confirm]',   // [To confirm], [Exact coordinates to confirm]
  'to complete]',  // [To complete]
  'confermare]',   // [Da confermare], [Coordinate esatte da confermare]
  'completare]',   // [Da completare]
  'be completed]', // [TO BE COMPLETED]
]

export function hasPlaceholders(data: unknown): boolean {
  const json = (typeof data === 'string' ? data : JSON.stringify(data)).toLowerCase()
  return SUBSTRINGS.some(p => json.includes(p))
}
