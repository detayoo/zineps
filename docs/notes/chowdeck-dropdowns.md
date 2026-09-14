# Notes — Chowdeck dropdowns

Inspiration pass on <https://chowdeck.com> (2026-09-14). **Observations only — no
implementation.** Reference for a future header variant.

## What's there

Three dropdowns in the navbar:

1. **Country selector** (`NG` pill) — flag + code + chevron.
2. **Products** — Chowpass / Relay / Ads / Chowstore.
3. **More** — Contact Us / FAQs / Blog.

## Why they feel sleek

### 1. Pure CSS, no JS

Every panel is driven by Tailwind's `group-hover` — no state, no portal, no
positioning library. The trigger carries `group`, the panel toggles
`hidden` → `group-hover:flex`.

```
<span class="block relative group">
  <span class="… rounded-full …">🇳🇬 NG ⌄</span>
  <span class="hidden group-hover:flex flex-col items-end
               absolute top-[100%] right-0 pt-2 min-w-max
               animate__animated animate__fadeIn animate__faster">
    …items…
  </span>
</span>
```

### 2. The reveal is an origin-top "unroll"

This is the signature move. The panel scales on the Y axis from the top edge, so
it looks like it unfolds out of the trigger rather than popping in:

```
rounded-2xl transform origin-top transition-all duration-200 ease-out
scale-y-0 group-hover:scale-y-100
```

- `origin-top` + `scale-y-0 → 100` = unroll downward.
- `200ms ease-out` — quick, settles, no bounce.
- The "More" panel adds `opacity-0 invisible → group-hover:opacity-100 group-hover:visible`
  on top of the scale, so it fades *and* unrolls.
- Panel is clipped by `overflow-hidden` so the unroll has clean edges.

### 3. The chevron rotates

```
ml-2 transition-transform duration-300 group-hover:rotate-180
```

300ms, independent of the 200ms panel — the arrow leads slightly.

### 4. Invisible hover bridge

The absolutely-positioned wrapper carries the vertical gap as padding instead of
`margin`/`gap`, so the pointer never leaves the hover target while crossing from
trigger to panel:

- Country selector: `absolute top-[100%] … pt-2`
- Products: `absolute top-0 pt-14 left-0 w-max`
- More: `absolute top-[100%] right-[-10px] min-w-max`

### 5. Items are individual pills, not a flush list

Each item is its own white pill with a per-item accent on hover:

```
py-2 px-5 rounded-full w-fit bg-white border border-slate-200
font-semibold capitalize
hover:text-[#8C77EC] hover:border-[#8C77EC]
transition-all duration-200 transform hover:scale-105 hover:shadow-md
```

- Hover = **border + text colour swap to the item's own brand colour** (Chowpass
  purple, Relay, Ads blue, …). Each product keeps its identity.
- Plus `scale-105` + `shadow-md` for lift.
- Stacked with `space-y-3` / `mb-2` — deliberate air between pills.

### 6. Asymmetric / zig-zag alignment

The Products panel puts the first pill left and `ml-auto`s the rest, so the stack
zig-zags. Reads as designed, not as a default list.

### 7. Panels hug their content

`w-max` / `min-w-max` everywhere — no fixed widths, no full-bleed menu.

## Alignment per trigger

| Dropdown | Anchor | Items |
|----------|--------|-------|
| Country | `right-0`, `items-end` | right-aligned pills |
| Products | `left-0` | first left, rest `ml-auto` |
| More | `right-[-10px]`, `ml-auto` | right-aligned pills |

## Takeaways worth stealing

- The **origin-top scaleY unroll at 200ms ease-out** is the whole trick — cheap,
  GPU-friendly, and reads as "unfolding from the trigger".
- **Padding-as-hover-bridge** on the wrapper keeps hover alive across the gap.
- **Per-item accent colour** on border + text makes a generic menu feel branded.
- **`w-max` + asymmetric alignment** keeps it light instead of a big panel.
- All of it is CSS-only — no JS state, so it can't jank.

## Contrast with our current header

Ours is the opposite philosophy: flush rows inside a borderless panel, one
radius (4px), one shared hover (`bg-muted`), soft shadow. Chowdeck is pills,
large radii (`rounded-full` / `rounded-2xl`), per-item colour, unroll motion.
Worth keeping both in mind as a future variant — not a replacement.
