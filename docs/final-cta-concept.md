# Final CTA Concept

The closing call to action, built from the reference's "Direct aan de slag?"
block and styled the Linear way: a dark ink panel, centered promise, dual
CTAs, and the pricing/integrations cards as minimal bordered rows under a
faint mint glow.

## Copy (reference, English-first)

- **H2:** "Ready to get started?"
- **Sub:** "Create an account to get going right away, or talk to us about a
  tailored solution for your business."
- **CTAs:** `Start your trial` → app register · `Contact us` → `/contact`
- **Card 1:** "Know exactly what you pay" / "Transparent rates with no hidden
  costs." → Pricing
- **Card 2:** "Start integrating now" / "Up and running with Zineps in 10
  minutes." → Integrations

## Design

- Full-bleed `bg-foreground` band between the hero and the footer; the dark
  surface is the contrast moment of the page, like Linear's closer.
- One restrained glow: a radial mint wash (`accent/16%`) pinned to the top
  center, fading out. Token-only, no shadows.
- Cards are whole-card links: hairline `background/15` border, near-invisible
  fill, mint action line with an arrow that nudges on hover; border warms to
  `accent/60` on hover.
- Type scale matches the footer CTA (40/32/28) so the two closers rhyme.

## Motion

Scroll reveals only: `opacity 0 → 1`, `y 24 → 0`, `600ms`, house ease,
`viewport once`, cards trailing by `100ms`. Reduced motion renders static.

## Accessibility

- `section[aria-labelledby]` → one `h2`; cards are single links with full
  text, `min-h` CTA targets, `focus-visible` rings in mint for the dark
  surface.
- Body text at `background/60–70` on ink stays well above AA.

## Tokens used

`foreground` / `background` (+60/70/15/25/3% alphas), `accent` (+16/60/90%),
`accent-ink`. Radius `rounded` (4px). No shadows.
