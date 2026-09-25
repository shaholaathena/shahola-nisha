import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import Navigation from './Navigation'

/* The case studies' only chrome: the logo and a way back to /work, no nav.

   The logo sits exactly where Navigation puts it at rest (same padding, same
   h-11 box, same 36/40px mark), so opening a case study from /work moves
   nothing but the links away. The back control is the gold ring the About
   intro's "Explore my work" ends on, turned to point back.

   Scrolled, it takes Navigation's dark veil: a blur over the void at 55%, no
   rule, so the sky runs up into it. */
export default function CaseStudyBar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Below `md` the case studies use the shared Navigation too, so the mobile
     header (logo and menu button) is the same on every page. The bar with the
     back arrow is the desktop header. */
  return (
    <>
    <div className="md:hidden">
      <Navigation variant="hero" dark />
    </div>
    <header
      className={`fixed inset-x-0 top-0 z-50 hidden transition-colors duration-500 md:block ${
        scrolled ? 'bg-hero-void/55 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1440px] items-center justify-between px-6 transition-[padding] duration-500 lg:px-10 ${
          scrolled ? 'py-4' : 'pb-4 pt-7 lg:pt-9'
        }`}
      >
        <Link to="/" className="flex h-11 items-center" aria-label="Home">
          <img
            src={logo}
            alt="Alimoon Nisha"
            className="h-9 w-auto object-contain lg:h-10"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </Link>

        <Link to="/work" className="group inline-flex h-11 items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-hero-hot/50 transition-colors duration-200 group-hover:border-hero-hot group-hover:bg-hero-hot/15">
            <span
              aria-hidden="true"
              className="text-hero-hot transition-transform duration-200 group-hover:-translate-x-0.5"
            >
              ←
            </span>
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-hero-ink">
            Back to work
          </span>
        </Link>
      </div>
    </header>
    </>
  )
}
