# MAISON KOREL — Design System

Editorial luxury jewelry site for a fictional Antwerp atelier. Quiet, slow, considered. Serif-led, asymmetric, hairline-bordered. The aesthetic is *gallery catalogue* — pages should breathe.

---

## 1. Brand voice

- Tone: hushed, confident, slightly literary. Half-sentences over slogans.
- Visual register: cream paper, ink-charcoal type, warm gold metal, soft daylight photography.
- No drop shadows. No gradients except photographic ones. No icons except a single dot bullet.

---

## 2. Color tokens

```
--paper      #efe8db   // primary background — warm bone / oatmeal
--paper-2    #e8e0d0   // subtle alt block (rare; mostly use paper)
--ink        #1c1814   // primary text / brand
--ink-2      #3b342d   // body copy
--ink-mute   #7a6f60   // captions, eyebrow labels
--rule       #c8bda9   // hairline borders
--accent     #8a6b3a   // muted antique gold (links, accents)
--shell      #faf6ef   // lightest tone — card highlight only
```

Backgrounds are paper (#efe8db) everywhere. Photography supplies all the warmth, color, and texture — the chrome itself is intentionally flat and dry.

---

## 3. Typography

Two families. No more.

- **Display / Serif**: `"Cormorant Garamond"` (Google Fonts) — 400 weight for body, 500 for display. Italic for the "Korel" wordmark accents and editorial pull-quotes.
- **UI / Sans**: `"Inter"` — 400 / 500. Used ONLY in uppercase tracked labels, nav, eyebrows, prices, footer columns.

Scale:
```
--fs-hero      clamp(56px, 8.5vw, 128px)   // "Worn quietly."
--fs-display   clamp(40px, 5.5vw, 84px)    // "Made by four hands."
--fs-section   clamp(32px, 4vw, 56px)      // "The full spring index."
--fs-product   28px                        // "Korel No. 12"
--fs-body      16px                        // serif body
--fs-eyebrow   11px                        // uppercase Inter, tracked 0.18em
--fs-meta      12px                        // uppercase Inter, tracked 0.14em
```

Line-height: 1.05 for display, 1.5 for body. Letter-spacing on all uppercase labels: 0.14–0.2em.

---

## 4. Layout grid

- Max page width: **1440px**, with 56px gutters at desktop.
- Section internal grid: 12 columns, 32px gutter.
- Vertical rhythm: every section separated by a **1px hairline** (`--rule`) — no extra padding above/below the rule. Section internal padding = 96px top/bottom desktop, 56px mobile.
- Asymmetry is the point: one side carries type, the other carries image. Never centered hero copy. Bottom-left anchoring for headlines.

---

## 5. Section-by-section spec + asset notes

### Section 1 — Hero (`s-1-bg-hero.png` 709×529)
- Full-bleed dark photograph (model with chain necklace).
- **Asset is too small** for full-bleed. Use `object-fit: cover; object-position: center 30%` on a 100vw × 88vh container so we see the necklace, not the face. Image is "luxury" not "portrait" — the jewelry is the subject. Will appear slightly soft on 4K — that's fine, reads as film.
- Overlay: linear-gradient from `rgba(0,0,0,0.35)` (bottom-left) to transparent (top-right) — gives the headline read room without dimming the necklace. **Critical**: gradient origin bottom-left so the bottom-left headline pops.
- Top: thin top bar with brand left, nav center-right, "BRACELET · 047-2009 · LMD" pinned right (sample serial number — gives the catalog feel).
- Bottom-left: hero serif headline + small body line + "Enter the collection" link with underline that has a 1px gap from text (custom underline via border-bottom on inline-block).
- Mobile: nav collapses to brand + hamburger. Headline drops to ~56px. Image keeps 88vh.

### Section 2 — Opening atelier (two products) (`s-2-p-1.png` 419×368, `s-2-p-2.png` 424×368)
- Eyebrow row: "OPENING ATELIER · 814 PIECES" left, "View the full index →" right. Both 11px uppercase Inter.
- Two product cards, 50/50 split, hairline vertical divider between.
- Asset images render at **container width / aspect-ratio: 4/3.5** with `object-fit: cover`. Both source images are basically the right ratio so no major resize needed. Center-position.
- Below each image: product name (serif 28px), meta line (Inter uppercase 11px), price (serif 18px).

### Section 3 — "Made by four hands" + Journal card (`s-3-bg.png` 759×411)
- Two columns: LEFT = large serif headline "Made by four hands in Antwerp." + small Inter caption; RIGHT = a "journal card" with image on top, then a beige card body with "FROM THE ARCHIVE · JOURNAL №2" eyebrow, serif headline, body, "Read in the journal →" link.
- Asset s-3-bg is wide landscape (759×411 ≈ 1.85:1). It sits as the top of the journal card — set `height: 240px desktop / 180px mobile`, `object-fit: cover`, `object-position: center`. The wider crop nicely shows the open journal + dried flower + ring vignette.
- Use `paper-2` background (#e8e0d0) on the journal card text body so it stands out very subtly from the section paper.

### Section 4 — The Halve Collar feature (`s-4-bg.png` 752×427)
- Full-bleed editorial image of the collar. Asset is landscape 752×427 (~1.76:1).
- Container: `height: clamp(520px, 64vh, 760px); width: 100vw`. Asset is small — use `object-fit: cover; object-position: center 40%` so the collar stays in frame. Will look a little soft at desktop but reads as a printed lookbook page.
- **Add a div with linear-gradient from rgba(239,232,219,0.65) at bottom-left to transparent at top-right** (paper-tinted vignette) so the bottom-left headline "The Halve Collar." sits on a soft beige wash without us darkening the gold of the collar.
- Top-right corner: small meta block (Inter 11px) — "OBJECT №014 · 02 / MAISON KOREL · SPRING ATELIER / EDITION OF 22. NUMBERED & SIGNED." — three lines, right-aligned.
- Bottom-left: serif title + thin body + "Reserve from the atelier" link. Bottom-right: "Price on application" small Inter caption.

### Section 5 — Atelier workshop (`s-5-p-1.png` 555×354, `s-5-p-2.png` 274×420)
- Two-column 60/40 split. LEFT = workshop hands photo (s-5-p-1, landscape) with headline overlay at bottom; RIGHT = rings on wood photo (s-5-p-2, portrait) with meta panel below.
- **s-5-p-1** is landscape (555×354) — use as full bleed in left column, `aspect-ratio: 16/10`, object-fit cover. Headline & body sit BELOW the image, on paper, not overlaid (cleaner editorial feel).
- **s-5-p-2** is portrait (274×420 ≈ 0.65:1) — perfect for the right column. Use `aspect-ratio: 5/7` or natural ratio. Asset is small so on retina will be soft — accept; pad container so it doesn't try to upscale beyond ~340px wide.
- Top eyebrow row on the section: "THE ATELIER · ANTWERP" left, "On the making →" right.
- Bottom of right column: a `paper-2` meta card with "TOOLS / BENCH 02 / KOREL M.O. / EST. 2019" stacked.

### Section 6 — The full spring index (`s-6-p-1..p-4.png` ~263×145 each)
- Section title "The full spring index." left, with a category filter row right: ALL · NECKLACES · EARRINGS · CUFFS · RINGS (dot separators, 11px uppercase Inter, active = ink-color + underline).
- 2×2 grid of products. Image cells alternate sides per row to make it editorial (image-left, image-right on row 1; flipped on row 2 — matches mock).
- **All s-6 assets are tiny (262×145)** — they were exported small. Containers are `aspect-ratio: 4/3` and `object-fit: cover`. We'll force image width to fit container and accept the slight blur — at the displayed size (~280–340px wide) it reads fine. Don't try to upscale past 380px container width.
- Below grid: centered "VIEW THE COMPLETE INDEX" eyebrow, then "All fourteen pieces →" serif link.

### Section 7 — Footer
- 5-column layout: brand block (with tagline + "Read the atelier manifesto →") then four nav columns COLLECTION / ATELIER / JOURNAL / ATELIER (the second ATELIER is the contact column — mock shows this duplicate; we'll label the address column "ATELIER" as in the mock).
- Bottom strip: copyright left, "EDITION OF 22. NUMBERED & SIGNED / MADE IN ANTWERP." center, social right.

---

## 6. Components

### Eyebrow label
```
font: 500 11px/1 Inter;
letter-spacing: 0.18em;
text-transform: uppercase;
color: var(--ink-mute);
```

### Editorial link
Inline serif text with a 1px `border-bottom` of `currentColor`, `padding-bottom: 4px`. On hover, the underline thickens to 2px.

### Hairline divider
`<hr>` or `border-top: 1px solid var(--rule)` — used between sections and inside the product grid.

### Product card
- Image with `aspect-ratio` enforced (4/3 or 1/1).
- Below: serif name (28px) + Inter meta (11px uppercase) + price (serif 18px).
- No background, no border on the card body itself — only on the image cell if needed.

### Top nav
- Sticky on scroll? No — fixed transparent over hero, switches to paper background after 100vh scroll (JS toggle).
- Center: ATELIER · ARCHIVE · JOURNAL · ACCOUNT (Inter 11px uppercase, tracked).
- Right: a serial number / cart marker for "catalog" feel.

---

## 7. Responsive strategy (mobile-first thinking applied)

- **<= 720px (mobile)**:
  - 2-col grids collapse to 1-col (stacked).
  - Hero headline shrinks to clamp() floor.
  - Nav center links hide; brand + menu button only.
  - Section padding: 56px y-axis, 20px x-axis.
  - The 2×2 product grid in S6 becomes 1-col stacked.
  - Footer: brand block on top, then 2-col link grid (collection+atelier / journal+atelier).

- **720px–1024px (tablet)**:
  - Same as desktop but 2-col where desktop is 2-col; keep 2×2 in S6.
  - Reduce hero font to ~80px.
  - Nav center links visible but condensed.

- **>= 1025px (desktop)**: full spec.

Use `clamp()` aggressively for type so no breakpoint chunkiness.

---

## 8. Motion

Subtle only:
- Fade-up reveals on section enter (translateY 24px → 0, opacity 0 → 1, 600ms ease).
- Hero headline letter-spacing tightens 0.02em on mount.
- Link underlines grow on hover (200ms).
- Filter pills: color crossfade on click, 150ms.

No scroll parallax. No big GSAP timelines. This brand is *quiet*.

---

## 9. Implementation notes / asset cheat-sheet

| Asset | Native | Renders at | object-fit | Notes |
|---|---|---|---|---|
| s-1-bg-hero | 709×529 | 100vw × 88vh | cover, center 30% | Adds dark BL→TR gradient overlay |
| s-2-p-1 | 419×368 | ~50% col × 4/3.5 | cover, center | Native ratio close, minimal upscale |
| s-2-p-2 | 424×368 | ~50% col × 4/3.5 | cover, center | Same |
| s-3-bg | 759×411 | 100% card × 240px | cover, center | Crops nicely to journal vignette |
| s-4-bg | 752×427 | 100vw × ~70vh | cover, center 40% | Add paper-gradient overlay BL→TR |
| s-5-p-1 | 555×354 | 60% col × 16/10 | cover, center | Headline BELOW image, not overlaid |
| s-5-p-2 | 274×420 | 40% col × 5/7 | cover, center | Cap container at 340px wide |
| s-6-p-1..4 | ~263×145 | 50% col × 4/3 | cover, center | Tiny source — accept slight blur, don't exceed 380px |

Common rule: never let a container exceed **1.5×** the asset's native width or it will fall apart. All caps above respect this.
