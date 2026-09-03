import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../../assets/logo.png'

/* Routes, not anchors. This header is only rendered on the inner pages — the
   homepage is a single locked frame carrying its own editorial nav — so it no
   longer has to hide behind a hero or track which section is on screen. It is
   present from the top; active state comes from the URL. */
const navLinks = [
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Certifications', to: '/about#certifications' },
]

/* The homepage's own nav, reproduced exactly: same three destinations, same
   order. `hero` variant uses this so the menu does not change between the
   homepage and About — the mark, the type and the targets all match. */
const heroNavLinks = [
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/about#contact' },
]

export default function Navigation({ dark = false, variant = 'default' }) {
  /* `hero` mirrors the homepage's editorial nav — wordmark knockout + mono
     uppercase links with the gold hover, no pill — and implies the dark
     surface it lives on. `default` is the inner-page pill nav. */
  const hero = variant === 'hero'
  const links = variant === 'hero' ? heroNavLinks : navLinks
  const isDark = dark || hero
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
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled
            ? isDark
              ? 'bg-hero-void/90 backdrop-blur-xl border-b border-white/10 shadow-[0_1px_28px_rgba(0,0,0,0.4)]'
              : 'bg-surface-base/90 backdrop-blur-xl border-b border-border-subtle shadow-[0_1px_28px_rgba(0,0,0,0.07)]'
            : 'bg-transparent shadow-none'
        }`}
      >
        <div
          className={
            hero
              ? 'mx-auto flex max-w-[1440px] items-center px-6 pt-7 pb-5 lg:px-10 lg:pt-9'
              : 'max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between'
          }
        >
          <Link to="/" className="group" aria-label="Home">
            <img
              src={logo}
              alt="Alimoon Nisha"
              className={
                hero
                  ? 'h-9 w-auto object-contain lg:h-10'
                  : 'h-14 w-auto object-contain opacity-85 group-hover:opacity-100 transition-opacity duration-300'
              }
              style={hero ? { filter: 'brightness(0) invert(1) drop-shadow(0 0 18px rgba(232,184,98,0.35))' } : isDark ? { filter: 'brightness(0) invert(1)' } : undefined}
            />
          </Link>

          {/* Desktop nav */}
          {hero ? (
            /* ul/li, not bare links: the homepage's nav is a list, and matching
               the structure matters because the two are measured against each
               other — a bare <a> sat 3px narrower than its <li> equivalent. */
            <ul
              className="absolute right-6 top-7 hidden items-center gap-7 md:flex lg:right-10 lg:top-9"
              aria-label="Primary"
            >
              {links.map((link) => {
                const active = isActive(link.to)
                return (
                  <li key={link.label}>
                    <Link to={link.to} className="hero-navlink group relative block py-3">
                      <span
                        className={`block font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-200 lg:text-[12px] ${
                          active ? 'text-hero-hot' : 'text-[#c9cfe9] group-hover:text-hero-hot'
                        }`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : (
            <nav className="hidden md:flex items-center gap-1" role="navigation">
              {links.map((link) => {
                const active = isActive(link.to)
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={`relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      active
                        ? (dark ? 'text-hero-ink font-semibold' : 'text-ink-primary font-semibold')
                        : (dark ? 'text-hero-mute hover:text-hero-ink' : 'text-ink-secondary hover:text-ink-primary')
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-indicator"
                        className={`absolute inset-0 rounded-md ${dark ? 'bg-white/[0.08]' : 'bg-black/[0.05]'}`}
                        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                )
              })}
            </nav>
          )}

          {/* Right CTA */}
          <div
            className={
              hero
                ? 'absolute right-6 top-7 flex items-center gap-3 lg:right-10 lg:top-9'
                : 'flex items-center gap-3'
            }
          >
            {!hero && <Link
              to="/about#contact"
              className={`hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                dark
                  ? 'text-hero-ink border border-white/20 hover:bg-white/5 hover:border-hero-hot/60 hover:text-hero-hot'
                  : 'text-zinc-900 border border-zinc-800/30 hover:bg-zinc-800/5 hover:border-zinc-800/50'
              }`}
            >
              Get in touch
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>}

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
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ y: -8 }}
            animate={{ y: 0 }}
            exit={{ y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`fixed top-16 left-0 right-0 z-40 backdrop-blur-xl border-b md:hidden ${isDark ? 'bg-hero-void border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.55)]' : 'bg-surface-base/96 border-border-subtle'}`}
          >
            <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {links.map((link) => {
                const active = isActive(link.to)
                if (hero) {
                  return (
                    <Link
                      key={link.label}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={`px-4 py-3.5 font-mono text-[12px] uppercase tracking-[0.2em] transition-colors ${
                        active ? 'text-hero-hot' : 'text-[#c9cfe9] hover:text-hero-hot'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                }
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 text-sm font-medium rounded-md transition-all ${isDark ? 'text-hero-mute hover:text-hero-ink hover:bg-white/[0.05]' : 'text-ink-secondary hover:text-ink-primary hover:bg-black/[0.03]'}`}
                  >
                    {link.label}
                  </Link>
                )
              })}
              {!hero && <div className={`mt-2 pt-3 border-t ${isDark ? 'border-white/10' : 'border-border-subtle'}`}>
                <Link
                  to="/about#contact"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium ${isDark ? 'text-hero-hot' : 'text-zinc-500'}`}
                >
                  Get in touch →
                </Link>
              </div>}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
