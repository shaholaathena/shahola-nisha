/* Shared across every page, so it is theme-aware rather than forked: `dark`
   swaps it onto the night surface the About redesign uses, and defaults off so
   the light inner pages are untouched.

   Four pages render it light and one renders it dark, which is why the two
   things the palette actually decides — the accent rule and the ink — are the
   only things branched. Everything else (measure, padding, type register) is
   shared, because a footer that is laid out differently per theme is two
   footers.

   The dark variant paints no ground of its own. It used to fill with
   `bg-hero-void`, which put a flat slab directly under the skyline at the foot
   of the About page and cut the artwork off with a hard horizontal edge. It is
   transparent now, so it sits on whatever the page beneath it is showing. The
   light variant keeps `bg-surface-base`, because those pages have nothing
   behind the footer for it to sit on.

   ── Brought into the page's own register ──

   It used to be a centred sentence in 12px body type inside a `max-w-7xl`
   container, on a page whose every other micro-label is mono, uppercase and
   tracked, and whose every other container is 1440. Three things followed:

     · The measure is theme-aware. 1440 on dark to line the copyright up with
       the section content directly above it; 7xl on light, which is what the
       light pages' own containers use. Matching the page it sits under matters
       more than the two agreeing with each other.
     · Centred, behind the site's gold dash — the same mark that opens every
       section on About.
     · Padding down from `py-8` to `py-5`. It is a colophon, not a section.

   One bug fixed in passing: the light variant asked for `text-ink-faint`, and
   there is no such token — the palette has `ink-primary`, `ink-secondary` and
   `ink-muted`. The class emitted nothing, so the copyright inherited body ink
   and had been rendering at full strength on all four light pages. It is
   `ink-secondary` now rather than `ink-muted`, which is the nearer match to the
   intent but measures 3.0:1 on the paper ground and would fail at 10px;
   `ink-secondary` reads faint and clears 7.3:1.
   ───────────────────────────────────────────────────────────────────────────── */
export default function Footer({ dark = false }) {
  const year = new Date().getFullYear()

  return (
    <footer
      className={
        dark
          ? 'border-t border-white/10'
          : 'border-t border-border-subtle bg-surface-base'
      }
    >
      <div
        className={`mx-auto flex items-center justify-center gap-4 px-6 py-5 lg:px-10 ${
          dark ? 'max-w-[1440px]' : 'max-w-7xl'
        }`}
      >
        <span
          aria-hidden
          className={`h-px w-6 shrink-0 ${dark ? 'bg-hero-hot' : 'bg-accent'}`}
        />
        <p
          className={`font-mono text-[10px] uppercase tracking-[0.22em] ${
            dark ? 'text-hero-mute' : 'text-ink-secondary'
          }`}
        >
          © {year} Alimoon Nisha
        </p>
      </div>
    </footer>
  )
}
