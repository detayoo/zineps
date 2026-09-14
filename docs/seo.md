# SEO

One homepage today, so this stays honest: everything real is covered,
nothing fake is claimed.

## Metadata (`src/app/layout.tsx`)

- `metadataBase` + canonical `/`, title template, keywords, authors.
- Full Open Graph (website, `en_US`, 1200×630 image with alt) and Twitter
  `summary_large_image` with title/description.
- `robots`: index + follow, large image previews, unlimited snippets.
- `viewport`: ink `themeColor`, device width, zoom left enabled.

## Crawlers & platforms

- `src/app/robots.ts` → `/robots.txt` (allow all, points at the sitemap).
- `src/app/sitemap.ts` → `/sitemap.xml` (only `/` — more routes get added
  here as real pages land, never before).
- `src/app/manifest.ts` → `/manifest.webmanifest` (name, ink theme, SVG
  icon).
- `poweredByHeader: false` in `next.config.mjs`.

## Structured data (JSON-LD in layout)

- `Organization` — name, url, logo, contact email/phone/address from the
  reference copy.
- `WebSite` — name + url.
- `FAQPage` — all six questions verbatim from the FAQ section, so the
  visible copy and the schema can never drift (both live off the same
  wording — keep them in sync when copy changes).

## On-page basics already in place

- `lang="en"`, one `h1` (hero), hierarchical `h2`/`h3`s, descriptive link
  text, decorative images `alt=""` + lazy, 44px targets.
