# Design Reference

Source of truth: tokens live in [src/index.css](src/index.css) `@theme` block (Tailwind v4 — no separate `tailwind.config.js`). Use these instead of hardcoding values in components.

## Colors

| Token | Value | Use |
|---|---|---|
| `surface-base` | `#ffffff` | page background |
| `surface-1` | `#f8fafc` | subtle section bg |
| `surface-2` | `#f1f5f9` | card / pill bg |
| `surface-3` | `#e2e8f0` | stronger surface |
| `surface-hover` | `#f1f5f9` | hover state |
| `ink-primary` | `#0f172a` | headings, primary text |
| `ink-secondary` | `#475569` | body text |
| `ink-muted` | `#94a3b8` | captions, metadata |
| `border-subtle` | `rgba(0,0,0,.05)` | hairline borders |
| `border-default` | `rgba(0,0,0,.1)` | default borders |
| `border-strong` | `rgba(0,0,0,.15)` | emphasized borders |
| `border-accent` | `rgba(0,0,0,.25)` | active/focus borders |

Usable as Tailwind classes: `bg-surface-1`, `text-ink-secondary`, `border-border-subtle`, etc.

**Drift found:** [CaseStudyPage.jsx](src/pages/CaseStudyPage.jsx) has ~30+ raw hex values (`#0a0a0a`, `#1c1c1c`, `zinc-*` grays, brand colors like Figma's `#F24E1E`/`#0ACF83`/`#A259FF`/`#1ABCFE`, and a green `#1B6320`). Some of these are legitimate (third-party brand logos, a dark-mode case-study section that intentionally breaks from the light theme) — but worth a pass to confirm each one is intentional rather than copy-pasted, and to fold anything reusable back into a token.

## Typography

- `font-sans` → Inter (body default)
- `font-display` → Plus Jakarta Sans (headings) — apply via `.font-display` or `font-display` class
- Arbitrary sizes like `text-[10px]`, `text-[11px]`, `text-[9px]`, `text-[14px]` are used heavily and consistently for metadata/labels — this is the de facto "micro" type scale even though it's not tokenized. If a new micro-label is needed, reuse `text-[10px]` rather than inventing `text-[10.5px]` etc.

## Border radius

Dominant scale in actual use: `rounded-full` (pills/avatars), `rounded-md`, `rounded-xl`, `rounded-2xl` for cards. A handful of one-off arbitrary values exist (`rounded-[16px]`, `rounded-[24px]`, `rounded-[28px]`, `rounded-[36px]`, `rounded-[1.5rem]`, `rounded-[2rem]`). Prefer the standard scale (`rounded-lg/xl/2xl`) unless matching a specific screenshot/mock size exactly.

## Reusable surface/shadow classes (already in index.css)

- `.card-surface` / `.card-surface-elevated` — standard card background + border + radius
- `.glow-zinc-sm` / `.glow-zinc-md` — soft drop shadows
- `.bg-grid-subtle` / `.bg-dot-subtle` — background textures
- `.divider` — hairline horizontal rule
- `.noise` — grain overlay (apply to a `position: relative` parent)

Use these instead of re-writing `border + border-radius + box-shadow` inline on new cards.

## Before adding a new section/component

1. Check [src/components/ui/](src/components/ui/) for an existing component that already does what you need (ProjectCard, MetricsCard, DashboardCard, Timeline, FloatingModule, ProcessIndicator, StickyNav, MagneticButton, ImageShowcase).
2. Reuse color/spacing/radius tokens above instead of new hex/px values.
3. Match the existing micro-copy type scale (`text-[9px]`–`text-[15px]`) for labels rather than introducing new sizes.
4. Run `npm run dev` and eyeball the change in the browser before committing — spacing/alignment bugs aren't caught by lint or build.
