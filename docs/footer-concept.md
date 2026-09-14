# Footer Concept

Refurbished from the ramblings `SiteFooter` type
(`ramblings/components/site-footer.tsx`): a centered closing CTA, a ruled
link-columns block, a compact legal row, and a giant ghost wordmark to close
the page. All copy is the captured zineps reference, English-first.

## What was kept from the type

- **Closing CTA block** — badge pill, big two-line headline with the second
  line as a styled marker: tilted `-1deg`, mint face over an offset deep-teal
  backing, wiping in (`scaleX`, origin-left, staggered) when scrolled into
  view, with the line typing itself out character by character (`55ms`
  cadence, discrete pops) while a caret blinks and dies as it finishes. Subcopy, actions, all over a faint token grid (`border`
  hairlines at 48px, radially masked so it breathes out at the edges).
  Ramblings captures an email for a waitlist; zineps has no waitlist, so the
  form becomes the reference's own CTAs: `Start your trial` (primary, mint)
  and `Talk to sales` (secondary, bordered).
- **Ruled sections** — hairline dividers between CTA, link columns, and legal
  row, matching the masthead's ruled language.
- **Link columns** — Products / Company / Contact, straight from the reference
  footer, plus a © line with the dynamic year and privacy/terms links.
- **Ghost wordmark** — `zineps` lowercase at `clamp(4rem, 18vw, 17rem)` in
  `foreground/10`, cropped at the fold. Ramblings renders its wordmark the same
  way; ours uses Manrope extrabold instead of the logo SVG.

## What was dropped

- Email capture, toasts, report modal — no backend on this revamp.
- Infinite ambient loops — the reveal is once-only (`whileInView`, `once`).
- The experimental `footer.tsx` variant (bent letters, gradient band, chat
  button) — that file isn't rendered in ramblings either.

## Motion

Scroll reveals only: `opacity 0 → 1`, `y 24 → 0`, `600ms`, house ease,
`viewport once` with an `-80px` margin. Reduced motion renders everything
static. No loops, transform/opacity only.

## Accessibility

- `nav[aria-label="Footer"]` for the link columns; headings are plain text
  labels, links are real links with `focus-visible` rings.
- Ghost wordmark is `aria-hidden` and `select-none`.
- Contact links use `mailto:`/`tel:` and the maps URL from the reference.
- Mint CTA uses `accent-ink` (≈6.5:1); muted body text ≈5.6:1.

## Tokens used

Surfaces `background`, hairlines `border`, fills `accent` / `accent-soft`,
text `foreground` / `foreground/80` / `muted-foreground` / `accent-strong` /
`accent-ink`. Radius `rounded` (4px). No shadows.
