import { meta } from '../../data/portfolio'

/* Shared across every page, so it is theme-aware rather than forked: `dark`
   swaps it onto the night surface the About redesign uses, and defaults off so
   the light inner pages are untouched. */
export default function Footer({ dark = false }) {
  const year = new Date().getFullYear()

  return (
    <footer
      className={
        dark
          ? 'border-t border-white/10 bg-hero-void'
          : 'border-t border-border-subtle bg-surface-base'
      }
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex items-center justify-center">
        <p className={dark ? 'text-xs text-hero-mute' : 'text-xs text-ink-faint'}>
          © {year} Alimoon Nisha Portfolio.
        </p>
      </div>
    </footer>
  )
}
