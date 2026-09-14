# Integrations Concept

"100+ integrations", from the reference's integration marquee. Heading row
with the promise and a view-all link, over a ruled wall of platform names —
text set in place of logo assets, which the revamp doesn't carry.

## Copy (reference, English-first)

Heading: "100+ integrations". Sub compressed from the source (marketplaces,
platforms, partners; workflow, costs, seamless experience). Link: "View
integrations" → `/integrations`. Eighteen names from the source marquee:
Shopify, WooCommerce, Bol.com, Amazon, PostNL, DHL, DPD, UPS, FedEx, GLS,
Magento, Correos, Bpost, Temu, DB Schenker, CCV Shop, SnelStart, Exact.

## Design

- Hairline grid via the `gap-px` + `bg-border` trick inside a rounded,
  overflow-hidden frame — dividers without nesting borders.
- 6 columns → 4 below `lg` → 2 below `sm`.
- Each cell shows the platform name at rest; on hover the name lifts out and
  the real brand logo (fetched from the reference site into `public/logos`)
  settles in — `opacity` + `translate` + `scale`, so entering and leaving
  animate symmetrically. Logos are decorative (`alt=""`, lazy); the name
  stays the accessible content, and touch/keyboard users simply see names.

## Motion

Scroll reveals only: `opacity 0 → 1`, `y 24 → 0`, `600ms`, house ease, grid
trailing by `100ms`. Reduced motion renders static.

## Accessibility

- `section[aria-labelledby]` → one `h2`; platforms are a real list.
- Names are text, never images without alt — nothing to miss.

## Tokens used

Surfaces `background`, hairlines `border`, hover `accent-soft` / `accent-ink`,
text `foreground` / `muted-foreground` / `accent-strong`. Radius `rounded`
(4px). No shadows.
