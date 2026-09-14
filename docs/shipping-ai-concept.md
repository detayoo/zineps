# Shipping AI Concept

The intelligence pitch, from the reference's "Voorspel vertragingen. Kies
betere routes. Betaal minder." — English-first. A mint-tinted band so it
reads as a product moment between the white sections.

## Copy (reference, English-first)

Badge: Shipping AI + Beta. Heading kept verbatim in spirit: "Predict delays.
Choose better routes. Pay less." Sub: the intelligence in the layer,
recommending the better carrier, route, and rate per shipment. CTA "Discover
Shipping AI" → `/ai-shipping-intelligence`.

## Design

- Centered column; the three promises as a hairline-divided strip (same
  `gap-px` trick as the integrations wall).
- Deep-teal CTA (`accent-strong` on `background`) — the one inverted button on
  the page, marking this as the AI moment.

## Motion

Scroll reveals only: `opacity 0 → 1`, `y 24 → 0`, `600ms`, house ease, strip
trailing by `100ms`. Reduced motion renders static.

## Accessibility

- `section[aria-labelledby]` → one `h2`; promises are a real list.
- White on deep teal ≈ 5.9:1.

## Tokens used

Band `accent-soft/50`, surfaces `background`, hairlines `border`, fills
`accent-strong` / `accent-soft`, text `foreground` / `muted-foreground` /
`accent-strong` / `background`. Radius `rounded` (4px). No shadows.
