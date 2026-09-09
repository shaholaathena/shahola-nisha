import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../../assets/logo.png'

/* Routes, not anchors. This header is only rendered on the inner pages — the
   homepage is a single locked frame carrying its own editorial nav — so it no
   longer has to hide behind a hero or track which section is on screen. It is
   present from the top; active state comes from the URL.

   ── One nav, two palettes ──

   There used to be two: a `hero` editorial nav on About, and a `default` pill
   nav with a bordered "Get in touch" button on Work and the case studies. They
   shared nothing — different links, different type, different logo size, a
   different container width — so moving between /about and /work changed the
   furniture, not just the page.

   It is one layout now, and only the palette branches. Dark gets the knockout
   wordmark and gold hover; light gets the mark as drawn and the paper theme's
   accent. The destinations are the homepage's own three, so the menu is the
   same on every page of the site.

   The "Get in touch" button went with the pill nav. It duplicated the Contact
   link two positions to its left, and the homepage's nav has no button. */
const NAV_LINKS = [
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/about#contact' },
]

export default function Navigation({ dark = false, variant = 'default' }) {
  /* `variant="hero"` now only means "this page is dark". The layout no longer
     forks on it; it is kept so AboutPage's existing call site still reads
     correctly and so a caller can opt into the night palette without also
     passing `dark`. */
  const isDark = dark || variant === 'hero'
  const links = NAV_LINKS
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Two links share /about, so pathname alone lights both. A link with a hash
     is active only when that hash is the one in the URL; a link without one is
     active only when the URL has none. */
  const isActive = (to) => {
    const [path, frag] = to.split('#')
    return pathname === path && (frag ? hash === `#${frag}` : !hash)
  }

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[900] transition-colors duration-500 ${
          scrolled
            ? isDark
              ? 'bg-hero-void/90 backdrop-blur-xl border-b border-white/10 shadow-[0_1px_28px_rgba(0,0,0,0.4)]'
              : 'bg-surface-base/90 backdrop-blur-xl border-b border-border-subtle shadow-[0_1px_28px_rgba(0,0,0,0.07)]'
            : 'bg-transparent shadow-none'
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 lg:px-10">
          <Link to="/" className="group" aria-label="Home">
            <img
              src={logo}
              alt="Alimoon Nisha"
              className="h-9 w-auto object-contain transition-opacity duration-300 lg:h-10"
              /* 36px, not the 56px the pill nav used. That logo stood 56px tall
                 inside a 64px bar, leaving 4px of air above and below it, and it
                 was the single loudest thing on the Work page. */
              style={isDark ? { filter: 'brightness(0) invert(1)' } : undefined}
            />
          </Link>

          {/* Desktop nav.

              ul/li, not bare links: the homepage's nav is a list, and matching
              the structure matters because the two are measured against each
              other — a bare <a> sat 3px narrower than its <li> equivalent. */}
          <ul className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {links.map((link) => {
              const active = isActive(link.to)
              return (
                <li key={link.label}>
                  <Link to={link.to} className="hero-navlink group relative block py-3">
                    <span
                      className={`block font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-200 lg:text-[12px] ${
                        isDark
                          ? active
                            ? 'text-hero-hot'
                            : 'text-[#c9cfe9] group-hover:text-hero-hot'
                          : active
                            ? 'text-accent'
                            : 'text-ink-secondary group-hover:text-accent'
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* `md:hidden` on the WRAPPER, not just the button inside it.

              The button alone was hidden and this div stayed, zero-width but
              still a flex item — so `justify-between` had three children to
              space out and parked the links in the middle of the bar, 542px
              short of the right edge, where the homepage right-aligns them.
              Hidden entirely, the bar has two children and the links sit where
              they belong. */}
          <div className="flex items-center md:hidden">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden w-9 h-9 flex items-center justify-center rounded-md transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/[0.04]'}`}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <div className="w-4 flex flex-col gap-1">
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  className={`block h-px origin-center transition-all ${isDark ? 'bg-hero-ink' : 'bg-ink-primary'}`}
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  className={`block h-px ${isDark ? 'bg-hero-ink' : 'bg-ink-primary'}`}
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  className={`block h-px origin-center transition-all ${isDark ? 'bg-hero-ink' : 'bg-ink-primary'}`}
                />
              </div>
            </button>
          </div>
        </div>

          {/* Mobile menu.

              Rendered INSIDE the header and pinned to `top-full`, so it always
              begins exactly where the bar ends. It used to be a sibling with a
              hardcoded `top-16`, tuned to a 64px pill bar that no longer exists —
              the bar is 76px on mobile and 80px above `lg`, so the panel sat
              12px up inside it and the two overlapped. A measurement that has to
              be kept in sync with a padding value in another element will drift;
              `top-full` cannot. */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              /* Fade, not slide. The panel is pinned to `top-full`, directly
                 against the bar, so a translate has nowhere to travel from
                 except underneath it — and any frame where the animation has
                 not settled shows the menu overlapping the header. It was
                 measured resting at `matrix(1,0,0,1,0,-8)`, 8px inside the bar.
                 Opacity has no geometry to get wrong. */
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className={`absolute inset-x-0 top-full backdrop-blur-xl border-b md:hidden ${isDark ? 'bg-hero-void border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.55)]' : 'bg-surface-base/96 border-border-subtle'}`}
            >
              <nav className="mx-auto flex max-w-[1440px] flex-col gap-1 px-6 py-4 lg:px-10">
                {links.map((link) => {
                  const active = isActive(link.to)
                  return (
                    <Link
                      key={link.label}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={`px-1 py-3.5 font-mono text-[12px] uppercase tracking-[0.2em] transition-colors ${
                        isDark
                          ? active
                            ? 'text-hero-hot'
                            : 'text-[#c9cfe9] hover:text-hero-hot'
                          : active
                            ? 'text-accent'
                            : 'text-ink-secondary hover:text-accent'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

    </>
  )
}
