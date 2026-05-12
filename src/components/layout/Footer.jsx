import { meta } from '../../data/portfolio'

const footerLinks = {
  Work: [
    { label: 'Featured Projects', href: '#work' },
    { label: 'Case Studies', href: '#contact' },
    { label: 'Design System', href: '#work' },
  ],
  Process: [
    { label: 'How I Work', href: '#process' },
    { label: 'Approach', href: '#process' },
    { label: 'Tools & Stack', href: '#about' },
  ],
  Connect: [
    { label: 'LinkedIn', href: meta.linkedin },
    { label: 'Dribbble', href: meta.dribbble },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  const handleNav = (e, href) => {
    if (href.startsWith('http')) return
    e.preventDefault()
    if (href === '#') return
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-border-subtle bg-surface-base">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-md bg-zinc-800 flex items-center justify-center text-white text-xs font-semibold font-display">
                AN
              </div>
              <span className="text-sm font-medium text-ink-primary font-display">Alimoon Nisha</span>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed max-w-xs mb-6">
              UX Analyst and UX Engineer designing mobile banking, healthcare, education, and social platform experiences.
            </p>
            <div className="flex items-center gap-2 text-xs text-ink-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
              {meta.availability}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-xs font-semibold text-ink-muted uppercase tracking-widest mb-4">
                {category}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNav(e, link.href)}
                      className="text-sm text-ink-secondary hover:text-ink-primary transition-colors duration-150"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border-subtle pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-ink-faint">
            © {year} Alimoon Nisha Portfolio. Crafted with care.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-ink-faint">{meta.location}</span>
            <a
              href={meta.dribbble}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-ink-muted hover:text-ink-secondary transition-colors"
            >
              Dribbble
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
