# Partners Concept

"For logistics partners", from the reference's operating-system section —
English-first. Heading, subcopy, and CTA on the left; capability checklist
and built-for chips on the right.

## Copy (reference, English-first)

Heading: "The operating system for logistics service providers". Sub: publish
rates, manage contracts and margins, invoice, support, onboard your merchants —
they ship in Zineps, you keep the relationship. Five capabilities verbatim in
spirit; CTA "Become a partner" → `/logistics-operating-system`. Built for:
logistics service providers · freight forwarders · 3PLs.

## Design

- 12-col split (5/7, stacking below `lg`); eyebrow tag matches the hero's.
- Checklist rows expand on hover *and* on click/keyboard (`open ∪ hover`),
  each revealing a one-line explanation with a plus that rotates open —
  disclosure-wired (`aria-expanded` + `aria-controls`) like the FAQ.

## Motion

Scroll reveals only: `opacity 0 → 1`, `y 24 → 0`, `600ms`, house ease, right
column trailing by `100ms`. Reduced motion renders static.

## Accessibility

- `section[aria-labelledby]` → one `h2`; capabilities are a real list.
- CTA meets the 44px target with a `focus-visible` ring.

## Tokens used

Surfaces `background`, hairlines `border`, fills `accent` / `accent-soft`,
text `foreground` / `muted-foreground` / `accent-strong` / `accent-ink`.
Radius `rounded` (4px). No shadows.
