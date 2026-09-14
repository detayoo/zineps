# Header Concept — "The Masthead"

The zineps header. A full-bleed, ruled bar — deliberately **not** the floating
pill of the reference (`x-itaja/HeaderVariantOne`). Where the reference floats a
centered rounded capsule over the page, the Masthead is edge to edge, squared
off, and divided into ruled zones.

> **Language:** the UI is English-first for now. The live site is Dutch-first
> with an EN / DE / ES switcher; the switcher is in place, only the default copy
> has changed.

> **Radius:** 4px for everything. The Tailwind `borderRadius` scale is overridden
> so every `rounded-*` utility resolves to 4px.

---

## Why this concept

The first pass read as "the reference with different words": a floating,
centered, rounded bar. The Masthead throws that out and takes the opposite
stance.

- **Full-bleed, not floating.** `inset-x-0 top-0`, no margin, no rounding.
- **Ruled, not contained.** Vertical hairlines split the bar into zones —
  logo · nav · (space) · language · CTA. The rules do the work a container would.
- **Left-aligned nav, not centered.** The nav sits next to the logo, so the bar
  reads left-to-right like a masthead rather than a symmetrical widget.
- **A full-height CTA block, not a pill button.** The `Sign up` block runs the
  full `h-16` and meets the right edge — a tab, not a chip.

It still reads "sleek" (thin rules, restrained type, translucent surface) but
it's structurally nothing like the reference.

---

## Anatomy

```
┌────────┬──────────────────────────────────────────────┬──────┬──────────┐
│ zineps │ Products ▾  Integrations  Pricing  Blog  KB ▾ │ 🌐 EN │ Sign up  │
└────────┴──────────────────────────────────────────────┴──────┴──────────┘
   logo          nav (left-aligned, ruled)              language  CTA block
                                                          ↑ full-height accent
```

- **Bar** — fixed, full-bleed, `h-16`, `max-w-[1440px]` inner rail. No radius.
  The bottom hairline is always visible; scrolling only firms up the fill/blur.
- **Logo** — zineps wordmark + mint orbit mark. Wordmark inherits `currentColor`;
  the mark stays mint.
- **Nav** — left-aligned, ruled off from the logo by a `border-l`. Rows are
  `h-full`, so hover fills the full bar height.
- **Language** — its own ruled zone (`border-l`), flag + code.
- **CTA** — `Sign up`, a full-height `bg-accent` block that meets the right edge.
- **Mobile** — below `lg`, nav/language/CTA collapse; logo + hamburger → a
  full-screen overlay.

### Dropdown language (chowdeck-style)

Inspired by <https://chowdeck.com> (see `docs/notes/chowdeck-dropdowns.md`).

The panel is **not a box**. It is a borderless, transparent stack of individual
pills; each pill carries its own `border-border`. The panel **unrolls from the
top edge** — `origin-top` with `scaleY 0 → 1` over `200ms` on the house ease — so
it unfolds out of the trigger instead of popping in.

On hover a pill fills **solid** with `accent-strong`, its label and description
flip to `text-background`, and it scales `1.02`. That is deliberately loud — the
white-on-white pills otherwise blend into the page. At rest each pill border is
`foreground/15` so the stack reads as a menu. The chevron rotates `180°` over
`300ms`.

**No shadows anywhere.** The pill border does the separation work.

---

## States

| State | Trigger | Change |
|-------|---------|--------|
| **Resting** | top of page | bottom `border-border` is already on; `bg-background/50` + `backdrop-blur-sm` |
| **Scrolled** | `scrollY > 12` | same bottom border, fill firms to `bg-background/85` + `backdrop-blur-xl` |
| **Nav hover** | pointer over a nav row | row fills the full bar height, `accent-soft` fill with `accent-ink` text |
| **Dropdown open** | hover / click / focus | panel unrolls from the top (`scaleY 0 → 1`); pills fade in |
| **Pill hover** | pointer over a pill | solid `accent-strong` fill, text → `background`, `1.02` scale |
| **Mobile open** | hamburger | full-screen overlay, items stagger in |

---

## Motion

- **Entrance:** `y: -16 → 0`, `opacity: 0 → 1`, `600ms`, house ease.
- **Dropdown:** `200ms`, `opacity` + `scaleY 0 → 1` from `origin-top`, house ease.
- **Chevron:** `300ms` `rotate-180`.
- **Accordion (mobile):** height auto, `280ms`.
- **Overlay:** `y: -12 → 0`, `opacity`, `280ms`.
- **Mobile list:** `45ms` stagger, `400ms` per item.
- **House ease:** `cubic-bezier(0.16, 1, 0.3, 1)` — exported as `EASE` and
  exposed to Tailwind as `ease-zineps`.

All durations stay under 300ms except the entrance. `prefers-reduced-motion`
drops the unroll.

---

## Responsive (desktop-first)

Breakpoints are **max-width** (see `tailwind.config.ts`), so base styles target
desktop and override downward.

| Width | Layout |
|-------|--------|
| `> 1180px` | full bar: logo · nav · language · CTA block |
| `≤ 1180px` (`lg`) | logo · hamburger → full-screen overlay |
| `≤ 640px` (`sm`) | bar padding tightens |

---

## Accessibility

- Nav is a `<nav aria-label="Main navigation">`; dropdown triggers are `<button>`
  with `aria-expanded` + `aria-controls` (disclosure pattern, not `role="menu"`).
- Dropdowns open on hover, click and keyboard; close on `Escape`, blur-out and
  outside click.
- Mobile overlay is `role="dialog" aria-modal="true"`, focuses the close button
  on open, traps `Tab`, returns focus to the opener on close, and closes on
  `Escape`.
- Every interactive element has a `focus-visible` ring, inset so it sits inside
  ruled zones.
- Body scroll locks while the overlay is open.
- Mint CTA uses `accent-ink` (`#123A34`) on mint (`#70CAB9`) ≈ 5.2:1 — passes
  WCAG AA for body text.

---

## Tokens used

Defined in `src/app/globals.css`, mapped in `tailwind.config.ts` as RGB channels
so opacity modifiers work.

| Token | Value | Role |
|-------|-------|------|
| `--background` | `#FFFFFF` | bar surface, pill fill |
| `--foreground` | `#0B1210` | text, logo |
| `--muted` | `#F3F7F6` | subtle neutral fills |
| `--muted-foreground` | `#5A6B66` | secondary text |
| `--border` | `#E2EBE8` | rules, pill borders |
| `--accent` | `#70CAB9` | CTA block, logo mark, active language |
| `--accent-strong` | `#0F7F75` | pill hover fill, badges, focus ring |
| `--accent-soft` | `#E6FAF5` | nav hover fill, badge surfaces |
| `--accent-ink` | `#123A34` | text on mint |

Dark-mode values live in `.dark`; components never branch on `dark:` — the
tokens flip.

---

## File map

```
src/components/Header/
├── index.tsx                      the header — "The Masthead"
├── useHeader.ts                   scroll state + mobile open + scroll lock
├── motion.ts                      house ease + unroll variants (+ reduced motion)
├── HeaderDropdown.tsx             nav group disclosure
├── LanguageSwitcher.tsx           language picker
└── MobileMenu.tsx                 full-screen overlay
```

---

## Deliberate deviations from the x-itaja pattern

1. **Full-bleed, not floating.** No centered capsule, no rounding, no margins.
2. **Ruled zones.** Vertical hairlines instead of a container.
3. **Left-aligned nav.** Not centered.
4. **Full-height CTA block.** A tab, not a pill button.
5. **4px radius everywhere.** The scale is overridden in `tailwind.config.ts`.
6. **Pills, not a flush list** (dropdowns). Borderless stack of bordered pills
   that unroll from the top.
7. **Real disclosure, not CSS-only hover.** Keyboard/escape/outside-click aware
   and honours `prefers-reduced-motion`.
8. **No variant system.** One brand, one header.

---

## Next

- The announcement strip (the site's "We've closed our post-seed round. Read
  more →") is the natural addition above the bar.
- Hero and logo marquee follow.
