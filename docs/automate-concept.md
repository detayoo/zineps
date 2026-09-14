# Automate Concept

"Automate shipping and B2B transport", from the reference's twin panels —
English-first. Two bordered panels: e-commerce fulfilment and business
consignments, each with tag, title, body, checklist, ideal-for chips, and a
learn-more link.

## Copy (reference, English-first)

Heading + a one-line bridge ("parcels and pallets"). E-commerce: "Smart
shipping, from label to return" + six points + ideal-for retailers, stores,
dropshipping → `/shipping`. B2B: "Ship your business consignments" + five
points + ideal-for distributors, factories, suppliers → partner platform.

## Design

- 2-col panels (stack below `lg`); checklist divided by a hairline with mint
  square markers; chips echo the header language pill.

## Motion

Scroll reveals only: `opacity 0 → 1`, `y 24 → 0`, `600ms`, house ease,
second panel trailing by `100ms`. Reduced motion renders static.

## Accessibility

- `section[aria-labelledby]` → one `h2`; panels are `article`s with `h3`s.
- Real lists for points and chips; links have `focus-visible` rings.

## Tokens used

Surfaces `background`, hairlines `border`, fills `accent-soft`,
text `foreground` / `foreground/90` / `muted-foreground` / `accent-strong`.
Radius `rounded` (4px). No shadows.
