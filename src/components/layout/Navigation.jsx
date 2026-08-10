import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../../assets/logo.png'

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Certifications', href: '#certifications' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id)
      }),
      { threshold: 0.25, rootMargin: '-80px 0px 0px 0px' }
    )
    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const handleLinkClick = (href) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'border-b border-black/10 bg-[#f7f6f2]/92 backdrop-blur-md' : 'bg-transparent'}`}
      >
        <div className="mx-auto flex h-[76px] max-w-[1540px] items-center justify-between px-6 sm:px-8 lg:px-12">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileOpen(false) }}
            className="block shrink-0"
            aria-label="Shahola — home"
          >
            <img src={logo} alt="Shahola" className="h-9 w-auto object-contain opacity-90" style={{ mixBlendMode: 'multiply' }} />
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            {navLinks.map((link) => {
              const active = activeSection === link.href.slice(1)
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleLinkClick(link.href) }}
                  className={`relative py-2 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors ${active ? 'text-black' : 'text-black/45 hover:text-black'}`}
                >
                  {link.label}
                  {active && <motion.span layoutId="nav-dot" className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-black" />}
                </a>
              )
            })}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleLinkClick('#contact') }}
              className="ml-3 border-b border-black/35 pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:border-black"
            >
              Say hello ↗
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span className="flex w-5 flex-col gap-1.5">
              <motion.span animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} className="block h-px w-full bg-black origin-center" />
              <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="block h-px w-full bg-black" />
              <motion.span animate={mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} className="block h-px w-full bg-black origin-center" />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[76px] z-40 border-b border-black/10 bg-[#f7f6f2] md:hidden"
          >
            <nav className="mx-auto flex max-w-[1540px] flex-col px-6 py-5 sm:px-8" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} onClick={(e) => { e.preventDefault(); handleLinkClick(link.href) }} className="border-b border-black/10 py-4 text-sm font-medium">
                  {link.label}
                </a>
              ))}
              <a href="#contact" onClick={(e) => { e.preventDefault(); handleLinkClick('#contact') }} className="py-4 text-sm font-medium">Say hello ↗</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
