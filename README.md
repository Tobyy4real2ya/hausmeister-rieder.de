# hausmeister-rieder.de

Statische Website für den Hausmeisterservice Christian Rieder, Sonthofen. Kein Build-Schritt, kein Framework: Was hier liegt, wird 1:1 über GitHub Pages ausgeliefert.

## Aufbau

| Pfad | Inhalt |
| --- | --- |
| `index.html` | Startseite (saisonaler Kopfbereich, Leistungsprotokoll, Ablauf, Zielgruppen, Sonthofen, Kontakt) |
| `impressum.html`, `datenschutz.html` | Rechtstexte |
| `404.html` | Fehlerseite |
| `css/style.css` | gesamtes Styling, Farben als Variablen in `:root` |
| `fonts/` | Barlow + Barlow Condensed lokal (SIL OFL, siehe `fonts/OFL.txt`) – bewusst kein Google-Fonts-CDN |
| `img/logo-roofs.svg` | Dächer aus dem Firmenlogo (Vektor-Nachbau, Logo-Blau `#0c2577`, Dachgrau `#b5b7af`) |
| `img/favicon.svg` | Favicon |
| `CNAME` | eigene Domain für GitHub Pages |

## Vorschau-Modus (aktuell AN)

Die Startseite zeigt zuerst eine Sperrseite „Website im Aufbau“ mit Passwortfeld und ist per `noindex` aus Google ausgeschlossen. Impressum und Datenschutz bleiben frei erreichbar. **Kein echter Zugriffsschutz** – der Inhalt steht im Quelltext und im öffentlichen Repo; es hält nur zufällige Besucher fern.

**Freischalten (Go-live):** in `index.html`
1. `<meta name="robots" content="noindex, nofollow">` entfernen
2. das `<script>` direkt darunter (setzt die Klasse `locked`) entfernen
3. den Block `<div id="gate">…</div>` und den Sperrseiten-Teil im Script am Ende entfernen
4. in `datenschutz.html` den Absatz zum Vorschau-Passwort entfernen
5. danach Search Console einrichten und `sitemap.xml` einreichen

**Passwort ändern:** neuen Hash berechnen und bei `GATE_HASH` eintragen:

```bash
node -e 'const h=s=>[...s].reduce((h,c)=>Math.imul(h^c.charCodeAt(0),16777619)>>>0,2166136261);console.log(h("NEUES-PASSWORT"))'
```

## Änderungen veröffentlichen

**Nach jeder Änderung an `css/style.css`** die Version im Link hochzählen (`style.css?v=…` in allen 4 HTML-Dateien). GitHub Pages lässt Browser Dateien 10 Minuten zwischenspeichern – ohne neue Version mischt der Browser neues HTML mit altem CSS.

```bash
git add -A
git commit -m "Kurze Beschreibung"
git push
```

GitHub Pages ist nach etwa einer Minute aktualisiert.

## Typische Änderungen

- **Telefon / E-Mail / Adresse:** kommen in `index.html` (mehrfach, inkl. JSON-LD im `<head>`), `impressum.html`, `datenschutz.html` und `404.html` vor. Immer alle Stellen ändern (Suchen & Ersetzen).
- **Orte im Einsatzgebiet:** `index.html`, Liste `.towns` und `areaServed` im JSON-LD. Stand: Sonthofen, Hofen, nähere Umgebung (Räumtraktor fährt ca. 30 km/h, weite Anfahrten lohnen sich nicht).
- **Saison der Startseite:** Script im `<head>` setzt `data-season` (Nov–März = `winter`, Apr–Okt = `summer`); Texte stehen in `.s-winter` / `.s-summer`.
- **„jetzt“-Markierung im Leistungsprotokoll:** Attribut `data-months` an jeder `.prow`.
- **Texte:** Ich-Form (Ein-Mann-Betrieb). Kommen Mitarbeiter dazu, auf „wir“ umstellen.
- **Fotos:** als WebP, max. ca. 1600 px breit und ca. 200 KB groß, in `img/` ablegen.

## DNS (bei Strato)

Die Domain liegt bei Strato (Mail-Paket). Für die Website zeigen nur A/AAAA bzw. `www` auf GitHub. **MX-, TXT- (SPF) und `_dmarc`-Einträge nicht anfassen**, sonst funktionieren die E-Mails nicht mehr.

| Typ | Name | Wert |
| --- | --- | --- |
| A | `@` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
| CNAME | `www` | `<github-benutzer>.github.io` |

## Datenschutz

Keine Cookies, kein Tracking, keine externen Ressourcen. Wenn etwas Externes dazukommt (Karte, Analyse, Formular-Dienst, WhatsApp-Widget), muss `datenschutz.html` angepasst werden.
