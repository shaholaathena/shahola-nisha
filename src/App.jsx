import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './pages/Home'
import WorkPage from './pages/WorkPage'
import AboutPage from './pages/AboutPage'
import CaseStudyPage from './pages/CaseStudyPage'
import MerchantOnboardingCaseStudyPage from './pages/MerchantOnboardingCaseStudyPage'
import ZCommerzCaseStudyPage from './pages/ZCommerzCaseStudyPage'
import Cursor from './components/ui/Cursor'
import Grain from './components/ui/Grain'

const pageVariants = {
  initial: { opacity: 0, filter: 'blur(6px)' },
  animate: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, filter: 'blur(6px)', transition: { duration: 0.3,  ease: [0.22, 1, 0.36, 1] } },
}

function PageWrapper({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  )
}

/* Route changes used to inherit the previous page's scroll position, which was
   invisible while everything lived on one page and is very visible now that it
   does not. A hash is honoured too — /about#contact has to land on the section,
   not the top — after a frame, so the target exists by the time we look for it.
   `mode="wait"` means the outgoing page has unmounted before this runs. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  /* The browser restores the previous scroll position for a history entry
     asynchronously, AFTER load — which lands on top of anything we set here and
     was why /about#contact kept snapping back to the top. In a router that owns
     its own scrolling, restoration is ours to do. */
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])

  useEffect(() => {
    if (!hash) {
      /* `instant`, not the default: index.css sets `scroll-behavior: smooth`
         on the root, and a bare scrollTo would inherit it and animate the whole
         way up a long page after the route has already changed. */
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    /* The target moves twice over: the incoming page has not mounted yet
       (AnimatePresence runs the outgoing page's exit first), and once it has,
       fonts and images keep changing section positions for another beat. A
       single scroll timed against either of those lands somewhere arbitrary —
       early on the document is barely a viewport tall and the scroll clamps to
       nothing. So: wait for the element, then re-aim on a tick until it holds.
       `instant` throughout, because the root sets `scroll-behavior: smooth` and
       a four-thousand pixel glide is not what a link click asked for. */
    let waited = 0    // ticks spent waiting for the target to exist
    let aimed = 0     // ticks spent re-aiming once it does
    let stop = false

    // The moment someone scrolls themselves, the landing is no longer ours.
    const yield_ = () => { stop = true }
    window.addEventListener('wheel', yield_, { passive: true, once: true })
    window.addEventListener('touchstart', yield_, { passive: true, once: true })
    window.addEventListener('keydown', yield_, { once: true })

    const timer = setInterval(() => {
      if (stop) return clearInterval(timer)

      const el = document.querySelector(hash)
      if (!el) {
        /* Ten seconds of patience. The exit animation is 300ms, but a tab that
           is not on screen throttles it to a standstill, and the page then
           mounts whenever the tab comes back — waiting costs one timer, while
           giving up too early drops someone at the top of a long page. */
        if (++waited > 100) clearInterval(timer)
        return
      }

      const target = Math.round(el.getBoundingClientRect().top + window.scrollY - 64)
      if (Math.abs(window.scrollY - target) > 2) window.scrollTo({ top: target, behavior: 'instant' })

      // Then re-aim for ~1.5s: late images shift a long page well after the
      // position first looks stable, so one scroll lands hundreds of pixels off.
      if (++aimed > 15) clearInterval(timer)
    }, 100)

    return () => {
      clearInterval(timer)
      window.removeEventListener('wheel', yield_)
      window.removeEventListener('touchstart', yield_)
      window.removeEventListener('keydown', yield_)
    }
  }, [pathname, hash])

  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/work" element={<PageWrapper><WorkPage /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
        <Route path="/case-study/bkb-mobile" element={<PageWrapper><CaseStudyPage /></PageWrapper>} />
        <Route path="/case-study/merchant-onboarding" element={<PageWrapper><MerchantOnboardingCaseStudyPage /></PageWrapper>} />
        <Route path="/case-study/zcommerz" element={<PageWrapper><ZCommerzCaseStudyPage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Grain />
      <Cursor />
      <ScrollToTop />
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
