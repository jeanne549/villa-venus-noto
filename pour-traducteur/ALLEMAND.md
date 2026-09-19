# Traductions allemandes — Villa Vénus Noto
## À destination d'un traducteur natif germanophone

**Statut** : Traduction provisoire générée par IA — À réviser et corriger par un traducteur natif  
**Langue cible** : Allemand (Deutsch)  
**Variante** : Allemand standard (Hochdeutsch), registre formel (Sie)  
**Date de génération** : Septembre 2026  
**Site** : https://www.villavenusnoto.com  

> **Instructions pour le traducteur** : Les textes ci-dessous sont une première version générée automatiquement. Votre rôle est de les réviser pour qu'ils sonnent naturellement en allemand, notamment dans le registre du tourisme de luxe. Les slugs d'URL (en gras) ne doivent PAS être modifiés sans concertation avec l'équipe technique.

---

## 1. NAVIGATION ET SLUGS D'URL

| Page interne | Slug URL allemand |
|---|---|
| Villa & suites | `/de/villa` |
| Tarifs | `/de/preise` |
| Services | `/de/leistungen` |
| Événements | `/de/veranstaltungen` |
| Accès | `/de/anreise` |
| FAQ | `/de/faq` |
| Noto | `/de/noto` |
| Journal | `/de/journal` |

---

## 2. NAVIGATION PRINCIPALE (composant Navigation)

```
Villa | Preise | Leistungen | Veranstaltungen | Anreise | FAQ | Noto | Journal
```

Sélecteur de langue : `Deutsch` (drapeau 🇩🇪)

---

## 3. PAGE D'ACCUEIL (`/de`)

**META**
- Title : `Villa Vénus Noto — Luxusvilla Sizilien · Ab 580 €/Nacht`
- Description : `Exklusive Villa in Noto mit Privatpool, 4 Suiten und Rooftop-Terrasse. Direktbuchung ohne Zwischenhändler. Ab 580 €/Nacht im Südosten Siziliens.`

**Contenu (i18n — section nav, hero, about, etc.)**

```
nav:
  villa: "Die Villa"
  tarifs: "Preise"
  services: "Leistungen"
  evenements: "Veranstaltungen"
  acces: "Anreise"
  faq: "FAQ"
  noto: "Noto"
  journal: "Journal"
  booking: "Anfragen"

hero:
  tagline: "Privatvilla · Noto, Sizilien"
  h1: "Villa Vénus Noto"
  sub: "4 Suiten · Privater Pool · Direktbuchung"
  cta_primary: "Preise & Verfügbarkeit"
  cta_secondary: "Die Villa entdecken"

about:
  label: "Die Villa"
  h2: "Ein Anwesen ganz für Sie"
  p1: "Villa Vénus liegt am Stadtrand von Noto, 15 Minuten vom Meer entfernt, im Herzen des Val di Noto UNESCO-Welterbes. Die Villa wird exklusiv vermietet: Wenn Sie ankommen, gehört Ihnen das gesamte Anwesen."
  p2: "4 unabhängige Suiten (bis zu 9 Personen), privater Pool 14 m × 7 m, Rooftop-Terrasse mit Panoramablick, Gärten, mediterrane Küche, Parkplatz für 4 Fahrzeuge."
  link: "Die Villa entdecken →"

amenities:
  label: "Inklusive"
  items:
    - "Privatpool 14 m × 7 m"
    - "Rooftop-Terrasse · Panoramablick"
    - "4 unabhängige Suiten"
    - "Endreinigung inklusive"
    - "Privater Parkplatz · 4 Fahrzeuge"
    - "Lokaler Verwalter"

pointsforts:
  label: "Warum Villa Vénus Noto"
  items:
    - title: "Exklusivität"
      desc: "Keine anderen Gäste. Kein geteilter Pool. Die Villa, der Garten und der Rooftop gehören Ihnen vom ersten bis zum letzten Tag."
    - title: "Direktbuchung"
      desc: "Keine Plattform, keine Provision. Sie buchen direkt bei den Eigentümern — einfacher, klarer, persönlicher."
    - title: "Val di Noto"
      desc: "Noto, Ragusa, Syrakus, Modica, Scicli — fünf UNESCO-Städte in weniger als einer Stunde. Die Villa liegt im Herzen dieser Kulturlandschaft."
    - title: "Lokaler Verwalter"
      desc: "Emmanuel Di Pietro, unser lokaler Ansprechpartner, begleitet Sie von der Buchung bis zu Ihrer Abreise."

calendrier:
  label: "Verfügbarkeit"
  h2: "Verfügbarkeit prüfen"
  sub: "Direktbuchung · Keine Provision · Antwort innerhalb von 24h"
  prev: "‹"
  next: "›"
  months: ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"]
  days: ["Mo","Di","Mi","Do","Fr","Sa","So"]
  available: "Verfügbar"
  unavailable: "Nicht verfügbar"
  partial: "Teilweise"
  arrival: "Anreise"
  departure: "Abreise"
  selected_arrival: "Anreise ausgewählt"
  nights: "Nächte"
  rate_from: "ab"
  per_night: "/ Nacht"
  cta_request: "Anfragen"
  disclaimer: "Antwort innerhalb von 24 Stunden · Direktbuchung"

testimonials:
  label: "Bewertungen"
  h2: "Was unsere Gäste sagen"
  source: "Google-Bewertungen"

reviewform:
  title: "Ihre Erfahrung teilen"
  name_label: "Ihr Name"
  name_placeholder: "Vorname Nachname"
  date_label: "Aufenthaltsdatum"
  date_placeholder: "z.B. August 2025"
  review_label: "Ihre Bewertung"
  review_placeholder: "Beschreiben Sie Ihren Aufenthalt..."
  submit: "Bewertung absenden"
  success: "Vielen Dank für Ihre Bewertung!"

contact:
  label: "Kontakt"
  h2: "Anfragen & Buchung"
  sub: "Direktbuchung · Keine Provision · Antwort innerhalb von 24h"
  name: "Ihr Name"
  email: "E-Mail-Adresse"
  arrival: "Anreisedatum"
  departure: "Abreisedatum"
  guests: "Anzahl der Gäste"
  message: "Ihre Nachricht (optional)"
  submit: "Anfrage absenden"
  success_title: "Anfrage eingegangen!"
  success_msg: "Wir melden uns innerhalb von 24 Stunden."
  error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut."

footer:
  tagline: "Exklusive Villenvermietung in Noto, Sizilien"
  links_title: "Seiten"
  legal: "Rechtliches"
  privacy: "Datenschutz"
  conditions: "Buchungsbedingungen"
  copyright: "© 2024–2026 Villa Vénus Noto"
```

---

## 4. PAGE TARIFS (`/de/preise`)

**META**
- Title : `Preise & Verfügbarkeit — Villa Vénus Noto, Sizilien`
- Description : `Mietpreise der Villa Vénus Noto: ab 580 €/Nacht in der Nebensaison. Direktbuchung ohne Provision. Verfügbarkeit und Sonderpreise auf Anfrage.`

**Contenu**

```
breadcrumb: "Preise"
h1: "Preise & Verfügbarkeit"
subtitle: "Direktbuchung"
intro: "Die Villa wird direkt ohne Vermittler vermietet. Die unten aufgeführten Preise sind Richtwerte — kontaktieren Sie uns für die genaue Verfügbarkeit und ein maßgeschneidertes Angebot."

seasons:
  - name: "Nebensaison"
    period: "Oktober — April (außer Feiertage)"
    price: "Ab 580 € / Nacht"
    note: "Mindestaufenthalt: [Platzhalter — Mindestaufenthalt auf Anfrage]"
  - name: "Zwischensaison"
    period: "Mai, Juni, September"
    price: "Ab 780 € / Nacht"
    note: "Mindestaufenthalt: [Platzhalter — Mindestaufenthalt auf Anfrage]"
  - name: "Hochsaison"
    period: "Juli — August & Feiertage"
    price: "Ab 1 100 € / Nacht"
    note: "Mindestaufenthalt: [Platzhalter — Mindestaufenthalt auf Anfrage]"

included:
  title: "Im Mietpreis enthalten"
  items:
    - "Endreinigung"
    - "Bettwäsche und Handtücher (einschließlich Poolhandtücher)"
    - "Privatparkplatz für 4 Fahrzeuge"
    - "Lokaler Verwalter während des gesamten Aufenthalts"
    - "WLAN"
    - "Nutzung des privaten Pools und des Rooftops"

conditions:
  title: "Buchungsbedingungen"
  items:
    - "Kaution: [Platzhalter — Betrag auf Anfrage]"
    - "Zahlung: [Platzhalter — Zahlungsbedingungen auf Anfrage]"
    - "Stornierung: [Platzhalter — Stornierungsbedingungen auf Anfrage]"

cta:
  link_contact: "Verfügbarkeit anfragen →"
  link_villa: "← Die Villa"
```

---

## 5. PAGE VILLA (`/de/villa`)

**META**
- Title : `Die Villa & 4 Suiten — Villa Vénus Noto, Sizilien`
- Description : `Villa Vénus Noto: 4 unabhängige Suiten für bis zu 9 Personen, privater Pool 14 × 7 m, Rooftop-Terrasse, mediterrane Gärten. Exklusivvermietung in Noto, Sizilien.`

**Contenu**

```
breadcrumb: "Die Villa"
h1: "Die Villa & die 4 Suiten"
sub: "Exklusivvermietung · Noto, Sizilien"
intro: "Villa Vénus wird exklusiv vermietet: Wenn Sie ankommen, gehört Ihnen das gesamte Anwesen. 4 unabhängige Suiten, privater Pool, Rooftop-Terrasse mit Panoramablick, mediterrane Gärten."

suites:
  label: "Die Suiten"
  h2: "4 unabhängige Suiten"
  - name: "Suite Poolblick"
    desc: "Geräumige Suite mit direktem Blick auf den Pool. Kingsize-Bett, Bad en suite mit Dusche, private Terrasse."
    detail: "Kingsize-Bett · Terrasse mit Poolblick · Bad en suite"
  - name: "Suite Gartenblick"
    desc: "Suite mit Ausblick auf die mediterranen Gärten. Ruhige Lage, natürliches Licht, private Terrasse."
    detail: "Kingsize-Bett · Terrasse mit Gartenblick · Bad en suite"
  - name: "Suite Innenzimmer (× 2)"
    desc: "Zwei identische, ruhige Suiten im Herzen der Villa. Ideal für Familien oder Reisegruppen."
    detail: "Queensize-Bett oder Einzelbetten · Bad en suite"

spaces:
  label: "Die Räumlichkeiten"
  h2: "Gemeinschaftsbereiche"
  - name: "Privater Pool"
    desc: "14 m × 7 m, beheizbar auf Anfrage. Liegestühle und Sonnenschirme inklusive."
  - name: "Rooftop-Terrasse"
    desc: "360°-Panoramablick über Noto und das Ionische Meer. Esstisch für 10–12 Personen, Außenküche, Loungebereich."
  - name: "Mediterrane Gärten"
    desc: "Olivenbäume, Zitrusbäume, Oleander. Ein Ort zum Erholen im Schatten."
  - name: "Wohnküche"
    desc: "Vollausgestattete Küche, großer Gemeinschaftsbereich, Esstisch für die gesamte Gruppe."

included:
  title: "Inklusive"
  items:
    - "Endreinigung · Bettwäsche · Handtücher · Poolhandtücher"
    - "Privatparkplatz · 4 Fahrzeuge"
    - "WLAN · Klimaanlage"
    - "Lokaler Verwalter"

nav_links:
  link_tarifs: "Preise →"
  link_services: "Leistungen →"
  link_acces: "Anreise →"
  link_noto: "Die Umgebung →"
```

---

## 6. PAGE SERVICES (`/de/leistungen`)

**META**
- Title : `Praktische Informationen — Villa Vénus Noto, Sizilien`
- Description : `Was in der Miete enthalten ist, Parken, Zwischenreinigung, lokaler Verwalter, Autovermietung. Alles Wissenswerte vor Ihrer Ankunft in Villa Vénus Noto.`

**Contenu**

```
breadcrumb: "Praktische Infos"
h1: "Praktische Informationen"
subtitle: "Maßgeschneidert"
intro: "Villa Vénus wird direkt ohne Vermittler vermietet. Endreinigung, Bettwäsche und Poolhandtücher sowie Parkplatz für 4 Fahrzeuge sind inklusive. Für den Rest sind die Gäste selbstständig — und unser lokaler Verwalter ist bei Bedarf verfügbar."
included_note: "Buchungen erfolgen direkt bei den Eigentümern per E-Mail oder Telefon. Die Kontaktdaten des lokalen Verwalters und die Anreiseanweisungen werden bei Bestätigung mitgeteilt."
link_villa: "← Die Villa"
link_acces: "Anreise →"

services:
  - icon: "✓"
    name: "Endreinigung — inklusive"
    desc: "Die vollständige Reinigung der Villa ist im Mietpreis enthalten: Suiten, Wohnbereiche, Küche, Bäder, Pool und Außenbereiche. Bettwäsche, Badetücher und Poolhandtücher werden gestellt und bei Ankunft gewechselt."
    note: "Im Mietpreis enthalten · Ohne Aufpreis"
  - icon: "🧹"
    name: "Zwischenreinigung — auf Anfrage"
    desc: "Bei längeren Aufenthalten kann eine zusätzliche Reinigung organisiert werden: Suitenreinigung, Wäschewechsel, Neuordnung der Gemeinschaftsbereiche. Bitte bei Buchung anfragen."
    note: "Auf Kosten des Gastes · Preis mit den Eigentümern zu vereinbaren"
  - icon: "🚗"
    name: "Privater Parkplatz — 4 Fahrzeuge"
    desc: "Das Anwesen verfügt über einen gesicherten privaten Parkplatz für bis zu 4 Fahrzeuge. Ein Auto ist unerlässlich, um die Region zu erkunden. Die nächsten Flughäfen sind Comiso (CIY, 45 Min.) und Catania (CTA, 1h15)."
    note: "Freier Zugang · Im Mietpreis enthalten"
  - icon: "📞"
    name: "Lokaler Verwalter vor Ort"
    desc: "Emmanuel Di Pietro, unser lokaler Verwalter, ist während Ihres gesamten Aufenthalts erreichbar. Er kann praktische Fragen beantworten, Sie zu den richtigen Adressen führen und bei Bedarf helfen."
    note: "Während des gesamten Aufenthalts verfügbar · Kontaktdaten bei Buchungsbestätigung"
  - icon: "🗺"
    name: "Aktivitäten & Ausflüge — selbstständig"
    desc: "Die Villa wird ohne Catering vermietet. Restaurants, Ausflüge, Wassersport und Besichtigungen sind eigenständig zu organisieren. Noto, seine Märkte, Strände und Umgebung bieten unzählige Möglichkeiten — wir teilen gerne unsere persönlichen Empfehlungen auf Anfrage."
    note: "Selbstständig organisiert · Kontaktieren Sie uns für unsere persönlichen Empfehlungen"
```

---

## 7. PAGE ÉVÉNEMENTS (`/de/veranstaltungen`)

**META**
- Title : `Hochzeit & Feier in Noto — Villa Vénus Noto exklusiv`
- Description : `Die gesamte Villa für Ihre Gruppe: Rooftop für die Zeremonie, privater Pool, mediterrane Gärten. Bis zu 9 Personen. Privatkoch und Concierge in Noto, Sizilien.`

**Contenu**

```
breadcrumb: "Veranstaltungen"
sub: "Exklusivmiete · Noto, Sizilien"
h1: "Hochzeiten, Geburtstage\nund Familientreffen"
intro: "Die Villa eignet sich perfekt für kleine Gruppen, die etwas Außergewöhnliches teilen möchten. Eine intime Hochzeit, ein runder Geburtstag, ein Familientreffen: Wenn die Villa Ihnen gehört, gehört Ihnen das gesamte Anwesen — Pool, Rooftop, Gärten, vom Sonnenaufgang bis in die Nacht."

why_h2: "Warum die Villa für Ihre Veranstaltung"
why:
  - title: "Der Rooftop als Bühne"
    desc: "360°-Blick über die Hügel von Noto und das Ionische Meer. Tisch für 10 bis 12 Personen, vollständige Außenküche, Loungebereich. Der sizilianische Sonnenuntergang als natürliche Kulisse."
  - title: "Privater Pool und Gärten"
    desc: "Der 14 m × 7 m große Pool und die mediterranen Gärten gehören während Ihres gesamten Aufenthalts allein Ihnen. Keine Nachbarn, keine Fremden — nur Ihre Gruppe."
  - title: "4 unabhängige Suiten"
    desc: "Jede Familie oder jedes Paar hat seine eigene Suite mit eigenem Bad und Terrasse. Niemand schläft auf einem Sofa — alle haben ihren eigenen Raum."
  - title: "Maßgeschneiderter Concierge"
    desc: "Privatkoch, Florist, Fotograf, Musiker: Wir helfen Ihnen, alles nach Ihren Wünschen zu organisieren. Sagen Sie uns, was Sie sich vorstellen, und wir finden, wer es umsetzt."

ideal_h2: "Ideal für"
ideal:
  - "Intime Hochzeit (standesamtliche oder kirchliche Trauung in Noto)"
  - "Junggesellenabschied / -abschiedsfeier"
  - "Runder Geburtstag (40, 50, 60 Jahre…)"
  - "Familien- oder Klassentreffen"
  - "Kleines Firmenseminar"
  - "Verlängerte Flitterwochen"

capacity_h2: "Kapazität und Logistik"
capacity_note: "Die Villa beherbergt bis zu 9 Personen in 4 Suiten. Für Veranstaltungen mit externen Gästen (nur tagsüber) kontaktieren Sie uns direkt, um die Machbarkeit gemäß den Hausregeln zu besprechen."

cta_h2: "Erzählen Sie uns von Ihrem Projekt"
cta_text: "Jede Veranstaltung ist anders. Schicken Sie uns eine Nachricht mit Ihren Daten, der Personenzahl und Ihren Vorstellungen: Wir antworten innerhalb von 24 Stunden mit einem Vorschlag."
cta_button: "Uns schreiben →"
```

---

## 8. PAGE ACCÈS (`/de/anreise`)

**META**
- Title : `Anreise zur Villa Vénus Noto — Flughäfen, Transfers & Wegbeschreibung`
- Description : `Wie Sie Villa Vénus Noto erreichen: Flughäfen Catania (CTA, 1h15) und Comiso (CIY, 45 Min.), Mietwagen, GPS-Koordinaten und Entfernungen zu den wichtigsten Sehenswürdigkeiten.`

**Contenu**

```
breadcrumb: "Anreise"
h1: "Anreise zur Villa"
sub: "Flughäfen, Mietwagen & Wegbeschreibung"
intro: "Die Villa liegt am Stadtrand von Noto, im Südosten Siziliens. Ein Mietwagen wird empfohlen, um die Region zu erkunden. Die nächstgelegenen Flughäfen sind Comiso und Catania."

airports:
  h2: "Nächstgelegene Flughäfen"
  - code: "CIY"
    name: "Flughafen Comiso"
    dist: "55 km · ca. 45 Min."
    desc: "Der nächstgelegene Flughafen. Direktflüge aus Deutschland (Ryanair, Eurowings je nach Saison)."
  - code: "CTA"
    name: "Flughafen Catania-Fontanarossa"
    dist: "90 km · ca. 1h15"
    desc: "Der größte Flughafen Siziliens mit mehr Direktflügen. Größere Auswahl an Mietwagengesellschaften."

car_text: "Ein Mietwagen ist für die gesamte Dauer des Aufenthalts sehr empfehlenswert. Die Region ist per ÖPNV kaum erschließbar, und die schönsten Orte — Vendicari, Marzamemi, Ispica — sind nur mit dem Auto erreichbar."

gps_text: "GPS-Koordinaten"
address: "[Platzhalter — Adresse auf Anfrage]"
gps_coords: "[Platzhalter — GPS-Koordinaten auf Anfrage]"

distances:
  h2: "Entfernungen von der Villa"
  items:
    - label: "Noto (Stadtzentrum)"
      dist: "5 km · 10 Min."
    - label: "Lido di Noto (Strand)"
      dist: "7 km · 10 Min."
    - label: "Vendicari (Naturschutzgebiet)"
      dist: "8 km · 12 Min."
    - label: "Marzamemi"
      dist: "20 km · 22 Min."
    - label: "Syrakus"
      dist: "30 km · 35 Min."
    - label: "Ragusa Ibla"
      dist: "45 km · 55 Min."
    - label: "Modica"
      dist: "38 km · 45 Min."
    - label: "Catania"
      dist: "90 km · 1h15"

transfer_text: "Wir können auf Anfrage einen Transferservice vom/zum Flughafen empfehlen. Kontaktieren Sie uns bei der Buchung."
```

---

## 9. PAGE FAQ (`/de/faq`)

**META**
- Title : `FAQ — Alles Wissenswerte vor der Buchung der Villa Vénus Noto`
- Description : `Häufig gestellte Fragen zur Villa Vénus Noto: Buchung, Ankunft, Ausstattung, Haustiere, Kinder, Chef-Service, Stornierung.`

**Contenu**

```
breadcrumb: "FAQ"
h1: "Häufig gestellte Fragen"
intro: "Alle Informationen, die Sie vor der Buchung benötigen. Für weitere Fragen schreiben Sie uns direkt."
link_conditions: "Buchungsbedingungen →"
link_acces: "Anreise →"

categories:

  BUCHUNG:
    - Q: "Wie buche ich die Villa?"
      A: "Die Buchung erfolgt direkt per E-Mail oder Telefon mit den Eigentümern. Kein Zwischenhändler, keine Plattformgebühren."
    - Q: "Ist eine Mindestaufenthaltsdauer vorgeschrieben?"
      A: "[Platzhalter — Mindestaufenthalt nach Saison auf Anfrage]"
    - Q: "Wann muss ich bezahlen?"
      A: "[Platzhalter — Zahlungsmodalitäten auf Anfrage]"
    - Q: "Wie hoch ist die Kaution?"
      A: "[Platzhalter — Kautionsbetrag auf Anfrage]"
    - Q: "Was passiert bei Stornierung?"
      A: "[Platzhalter — Stornierungsbedingungen auf Anfrage]"
    - Q: "Gibt es eine Buchungsbestätigung?"
      A: "Ja, nach Erhalt der Anzahlung erhalten Sie eine schriftliche Buchungsbestätigung mit allen Details des Aufenthalts."

  DIE VILLA:
    - Q: "Wie viele Personen können in der Villa übernachten?"
      A: "Die Villa kann bis zu 9 Personen in 4 Suiten beherbergen."
    - Q: "Was ist in der Miete enthalten?"
      A: "Endreinigung, Bettwäsche, Badetücher und Poolhandtücher, privater Parkplatz für 4 Fahrzeuge, WLAN und der lokale Verwalter."
    - Q: "Ist der Pool das ganze Jahr über offen?"
      A: "[Platzhalter — Poolöffnungszeiten nach Saison auf Anfrage]"
    - Q: "Kann der Pool beheizt werden?"
      A: "[Platzhalter — Poolheizung verfügbar auf Anfrage / Aufpreis zu klären]"
    - Q: "Sind Haustiere erlaubt?"
      A: "[Platzhalter — Haustierpolitik auf Anfrage]"
    - Q: "Gibt es Rauchverbot?"
      A: "[Platzhalter — Rauchpolitik auf Anfrage]"
    - Q: "Ist die Villa für Kinder geeignet?"
      A: "Die Villa ist für Familien mit Kindern geeignet. Bitte bei der Buchung nach Kinderausstattung fragen."

  WÄHREND IHRES AUFENTHALTS:
    - Q: "Zu welcher Zeit ist Check-in und Check-out?"
      A: "[Platzhalter — Check-in / Check-out-Zeiten auf Anfrage]"
    - Q: "Gibt es einen Privatkoch-Service?"
      A: "[Platzhalter — Koch-Service verfügbar auf Anfrage]"
    - Q: "Gibt es einen Supermarkt in der Nähe?"
      A: "[Platzhalter — nächstgelegener Supermarkt auf Anfrage]"
    - Q: "Kann ich Fahrräder ausleihen?"
      A: "[Platzhalter — Fahrradverleih auf Anfrage]"
    - Q: "Gibt es WLAN?"
      A: "Ja, die Villa ist mit WLAN ausgestattet."

  DIE UMGEBUNG:
    - Q: "Wie weit ist der nächste Strand?"
      A: "Der Lido di Noto ist ca. 7 km entfernt (10 Minuten mit dem Auto)."
    - Q: "Was sind die Sehenswürdigkeiten in der Nähe?"
      A: "Noto (5 km), Syrakus (30 km), Ragusa Ibla (45 km), Modica (38 km), das Naturschutzgebiet Vendicari (8 km)."
    - Q: "Wann findet die Infiorata von Noto statt?"
      A: "[Platzhalter — genaues Datum der Infiorata (drittes Maiwochenende) zu bestätigen]"
```

---

## 10. PAGE NOTO (`/de/noto`)

**META**
- Title : `Noto & Val di Noto — Ausflüge von Villa Vénus Noto`
- Description : `Noto, Syrakus, Ragusa Ibla, Modica, Vendicari: die Sehenswürdigkeiten des Val di Noto UNESCO-Welterbes, von Villa Vénus Noto aus zu erkunden.`

**Contenu**

```
breadcrumb: "Noto & Umgebung"
h1: "Noto und die Umgebung"
sub: "Val di Noto · Provinz Syrakus · Sizilien"
intro: "Das Val di Noto ist eines der beeindruckendsten Ensembles der barocken Architektur in Europa, von der UNESCO seit 2002 als Welterbe anerkannt. Noto, Ragusa, Modica, Syrakus, Scicli — fünf außergewöhnliche Städte in weniger als einer Stunde von der Villa."
link_villa: "← Die Villa"
link_journal: "Villa-Journal →"

places:
  - name: "Noto Barock"
    dist: "5 km · 10 Min."
    desc: "Das Juwel des sizilianischen Barock. Goldener Stein, breite Promenaden, Dombezirk auf der Treppe. Ein Spaziergang bei Sonnenuntergang ist unverzichtbar."
  - name: "Vendicari"
    dist: "8 km · 12 Min."
    desc: "Naturschutzgebiet und Feuchtgebiet an der Küste. Wilde Strände, Flamingos im Herbst, kristallklares Wasser. Eines der schönsten Naturschutzgebiete Siziliens."
  - name: "Marzamemi"
    dist: "20 km · 22 Min."
    desc: "Kleines Fischerdorf mit lebhaftem Hauptplatz. Frischer Fisch, Bottarga, historische Thunfischfabrik. Authentisch und wenig überlaufen."
  - name: "Syrakus"
    dist: "30 km · 35 Min."
    desc: "Antike griechische Stadt, Heimat von Archimedes. Das griechische Theater, Ortygia-Insel, archäologisches Museum. Ein unverzichtbarer Ausflug."
  - name: "Ragusa Ibla"
    dist: "45 km · 55 Min."
    desc: "UNESCO-Barockstadt auf einem Felsvorsprung. Enge Gassen, Terrassen mit Panoramablick, Dom San Giorgio. Einer der malerischsten Orte Siziliens."
  - name: "Modica"
    dist: "38 km · 45 Min."
    desc: "Berühmt für seine traditionelle Schokolade ohne Zucker. Duomo di San Giorgio, in den Fels gehauene Altstadt, Laben der Schokolatiers."
  - name: "Cava Grande del Cassibile"
    dist: "35 km · 50 Min."
    desc: "Naturschutzgebiet mit einem spektakulären Cañon und natürlichen Becken zum Baden. Wanderung im Tal, kristallklares Wasser."
  - name: "San Lorenzo"
    dist: "15 km · 20 Min."
    desc: "Einsamer Strand, wenig besucht, von Dünen und mediterranem Buschwerk umgeben. Ideal für einen ruhigen Tag am Meer."
  - name: "Lido di Noto"
    dist: "7 km · 10 Min."
    desc: "Der nächste Strand von der Villa. Feiner Sand, ruhiges Wasser, Strandbars in der Saison."
  - name: "Nero d'Avola"
    dist: "15 km · 20 Min."
    desc: "Avola ist der Geburtsort der berühmten einheimischen Rebsorte. Weingüter in der Umgebung bieten Besichtigungen und Weinproben an."
```

---

## 11. PAGE JOURNAL (`/de/journal`)

**META**
- Title : `Journal — Villa Vénus Noto, Sizilien`
- Description : `Reiseberichte, Ideen und praktische Ratschläge für Ihren Aufenthalt im Südosten Siziliens. Aus der Villa, von den Eigentümern.`

**Contenu**

```
breadcrumb: "Journal"
h1: "Journal"
sub: "Reiseinspirationen · Villa Vénus Noto"
intro: "Reiseberichte, Ideen und praktische Ratschläge für Ihren Aufenthalt im Südosten Siziliens. Geschrieben von der Villa, von den Eigentümern."
read: "Lesen →"
link_noto: "Noto & Umgebung →"

articles:
  - date: "Mai"
    tag: "Veranstaltung"
    title: "Die Infiorata von Noto: das Maispektakel, das kaum ein Reisender sieht"
    excerpt: "Jedes dritte Maiwochenende bedecken sich die Straßen des Notoer Zentrums mit Blumenteppichen, die Szenen des sizilianischen Lebens darstellen. Ein weltweit einzigartiges Ereignis, wenige Kilometer von der Villa entfernt."
    readTime: "4 Min."

  - date: "Juli · August"
    tag: "Strände"
    title: "Die schönsten Strände Südostsiziliens von Villa Vénus Noto"
    excerpt: "Vendicari, San Lorenzo, Lido di Noto, Calamosche, Marzamemi: eine Auswahl der zugänglichsten und schönsten Strände von der Villa aus, mit Entfernungen und was Sie dort erwartet."
    readTime: "6 Min."

  - date: "September"
    tag: "Saison"
    title: "Warum September der beste Monat für Sizilien ist"
    excerpt: "Das Meer ist warm, die Massen sind verschwunden, die Landschaft erwacht nach dem Sommer zu neuem Leben, die Trauben reifen in den Weinbergen des Val di Noto. Ein besonderer Monat."
    readTime: "5 Min."
```

---

## 12. E-MAILS AUTOMATIQUES (confirmation de demande)

### Objet e-mail client
`Ihre Anfrage ist eingegangen — Villa Vénus Noto`

### Objet e-mail propriétaire
`Neue Buchungsanfrage — Villa Vénus Noto`

### Corps de l'e-mail client (auto-reply)

```
Guten Tag [Prénom],

Ihre Buchungsanfrage ist bei uns eingegangen. Wir melden uns innerhalb von 24 Stunden mit einer Bestätigung der Verfügbarkeit.

Ihr Aufenthalt
Anreise: [date]
Abreise: [date]
Nächte: [n]
Gäste: [n]
Geschätzter Gesamtbetrag: [montant]

Wir antworten an: [email]

Bis bald,
Das Team der Villa Vénus Noto
```

---

## 13. NOTES POUR LE TRADUCTEUR

### Registre et ton
- Utiliser **Sie** (forme de politesse) dans toute la communication
- Registre : formel mais chaleureux, comme dans un hôtel de luxe indépendant
- Éviter les formulations trop commerciales ou publicitaires
- Le nom **Villa Vénus Noto** ne se traduit pas

### Termes à valider
- "Privatvilla" vs "exklusive Villa" — le traducteur peut choisir le terme le plus naturel
- "Rooftop" — maintenu en anglais comme dans les versions FR/EN/IT (terme courant en allemand)
- "Pool" ou "Schwimmbad" — "Pool" est plus usuel dans ce contexte

### Platzhalter (à compléter par les propriétaires)
Les champs marqués `[Platzhalter — ...]` sont des informations que les propriétaires doivent fournir. Le traducteur peut signaler si la formulation du placeholder lui semble maladroite mais ne doit pas inventer les données.

### URL slugs (NE PAS MODIFIER)
Les slugs d'URL ont été définis par l'équipe technique et ne doivent pas être renommés :
`villa` · `preise` · `leistungen` · `veranstaltungen` · `anreise` · `faq` · `noto` · `journal`

---

*Document généré le septembre 2026 — Version provisoire IA — À réviser par traducteur natif*
