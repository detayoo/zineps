# Zineps — Website Revamp

A revamp of <https://www.zineps.com/>. Starting with the header.
UI copy is English-first for now.

## Stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS v3.4 (tokens as CSS custom properties)
- Framer Motion
- Manrope (via `next/font`)

## Getting started

```bash
npm install
npm run dev        # http://localhost:4900
```

Other scripts: `npm run build`, `npm start`, `npm run lint`, `npm run typecheck`.

## Docs

- `docs/zineps-content.md` — all site copy, nav and brand captured from the live
  site. Source of truth for content.
- `docs/header-concept.md` — the header concept ("The Capsule"), anatomy,
  states, motion, responsive rules, a11y and the file map.

## Layout

```
src/
├── app/                     layout + demo page (the header's stage)
├── components/
│   ├── Header/              variant architecture (see below)
│   ├── ZinepsLogo.tsx
│   └── icons.tsx
└── lib/nav.ts               nav + language data
docs/                        content reference + header concept
```

### Header variants

The header follows the variant architecture used across these projects:

```
Header/
├── index.tsx                resolver — falls back to "one"
├── useHeader.ts             shared state
└── variants/
    └── HeaderVariantOne.tsx "The Capsule"
```

Add a new variant as `variants/HeaderVariantTwo.tsx` and register it in
`index.tsx`. Never branch a large block of header JSX with a ternary.
