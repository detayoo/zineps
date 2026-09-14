# Differentiation Concept

"What sets us apart", from the reference's "Dit maakt ons anders" — four
reasons, English-first. Centered heading over a ruled 2×2 grid, giving the
page a centered beat between the left-led FAQ and whatever lands above.

## Copy (reference, English-first)

Heading: "An approach that goes beyond the standard" + the innovation /
collaboration / customer-focus subline. Items: Building together · Personal
contact · Strong partnerships · Focus on technology — bodies compressed from
the source.

## Design

- Numbered `01–04` cells in accent, title + body; hover tints `accent-soft/50`.
- Uneven 12-col rhythm (`7 / 5 / 5 / 7`, stacking below `md`) so the grid
  doesn't read as four identical boxes.
- Each card carries its numeral as a giant ghost background (`10rem`,
  `foreground/7%`, cropped bottom-right, deepening on hover) — ink like the
  header wordmark, never the accent. Content sits above it; the ghost is
  `aria-hidden`.

## Motion

Scroll reveals only: `opacity 0 → 1`, `y 24 → 0`, `600ms`, house ease, grid
trailing by `100ms`. Reduced motion renders static.

## Accessibility

- `section[aria-labelledby]` → one `h2`; items are a real list with `h3`s.
- Numbers are decorative-adjacent text with `tabular-nums`; meaning never
  depends on them.

## Tokens used

Surfaces `background`, hairlines `border`, hover `accent-soft/50`, text
`foreground` / `muted-foreground` / `accent-strong`. Radius `rounded` (4px).
No shadows.
