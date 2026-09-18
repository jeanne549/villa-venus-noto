// ─── Configuration unique du site — Villa Vénus Noto ─────────────────────────
// Renseigner ici et redéployer : les changements se propagent partout.

export const SITE_CONFIG = {
  // Numéros d'enregistrement obligatoires
  // Laisser '' → la ligne disparaît du footer, des mentions légales et des conditions
  // Renseigner dès réception du numéro officiel
  cin: '' as string,
  cir: '' as string,

  // Taxe de séjour — commune de Noto
  // null  → affiche un message neutre "montant communiqué à la réservation" partout
  // number → affiche le montant exact dans le calendrier, la page tarifs et les conditions
  // À mettre à jour après confirmation par l'ufficio tributi de Noto
  touristTaxRate: null as number | null,
}
