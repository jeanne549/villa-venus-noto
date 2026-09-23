// ─── Configuration unique du site — Villa Vénus Noto ─────────────────────────
// Renseigner ici et redéployer : les changements se propagent partout.

export const SITE_CONFIG = {
  // Numéros d'enregistrement obligatoires
  // Laisser '' → la ligne disparaît du footer, des mentions légales et des conditions
  // Renseigner dès réception du numéro officiel
  // CIN non obligatoire pour cette structure → laissé vide volontairement (n'apparaît nulle part)
  cin: '' as string,
  cir: '19089013C263731' as string,

  // Taxe de séjour — commune de Noto
  // null  → affiche un message neutre "montant communiqué à la réservation" partout
  // number → affiche le montant exact dans le calendrier, la page tarifs et les conditions
  // Confirmé par Jeanne le 23/09/2026 : 3 € par personne et par nuit
  touristTaxRate: 3 as number | null,
}
