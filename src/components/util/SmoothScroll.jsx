import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setLenis } from '../../lib/lenisInstance'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────────────────────────
   SmoothScroll — inertial scrolling, site-wide.

   The one thing all three reference sites have in common that is cheap to
   adopt. ricardochance.com carries a `lenis` class on its `<html>`; this is the
   same library, and it changes the feel of every scroll on every page without
   changing how anything renders.

   Mounted once in the app shell rather than per page, because a scroll library
   that is created and destroyed on each route change fights the router's own
   scroll restoration and loses.

   ══ Four things it has to be wired around ══════════════════════════════════

   1. GSAP. `ScrollTrigger` is already used by `Hero`, `ProcessWindows` and
      `ProjectHelix`. Lenis moves the page on its own clock, so ScrollTrigger
      has to be told to re-read on every Lenis frame, and Lenis has to be
      driven from GSAP's ticker rather than its own `requestAnimationFrame`.
      Two loops racing each other is the classic way this pairing judders.

      `lagSmoothing(0)` is part of that recipe: GSAP normally drops a frame's
      delta when the main thread stalls, which desynchronises it from Lenis's
      position. It is restored to GSAP's default on teardown, since it is a
      global setting and this component does not own it outright.

   2. `scroll-behavior: smooth`. index.css set it on `html`. Lenis and CSS
      smooth scrolling both animate the same scrollTop and the result is a
      fight, so that declaration is gone. Anyone with reduced motion now gets
      instant anchor jumps, which is the correct behaviour for them anyway.

   3. The router's scroll restoration. `ScrollToTop` in App.jsx calls
      `window.scrollTo`. Under Lenis that moves the page while Lenis still
      believes it is somewhere else, and it eases straight back — so the
      instance is published to `lib/lenisInstance` and the router uses
      `lenis.scrollTo(..., immediate)` when it exists. That singleton lives in
      its own module because exporting a plain function beside a component
      breaks React Fast Refresh.

   4. Reduced motion. No instance is created at all. Not "created and
      disabled" — a Lenis that exists still hijacks wheel events, and someone
      who asked for less motion should be getting the browser's own scrolling,
      untouched.

   ══ Touch is left alone ════════════════════════════════════════════════════

   `syncTouch` stays off, which is Lenis's default. Smoothing a touch drag
   fights the platform's own rubber-banding and momentum, and on iOS it reads as
   lag rather than polish. Inertia is for wheels and trackpads here.
   ───────────────────────────────────────────────────────────────────────────── */

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      /* A touch longer than the 1.0 default. This site has two very long pages
         and a slightly heavier glide suits them; much beyond this and the page
         starts feeling like it is on a rail. */
      duration: 1.1,
      /* Lenis's own default easing, written out so it is visible rather than
         implicit — an expo-out, which matches the `[0.22, 1, 0.36, 1]` curve
         the rest of the site animates on. */
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      syncTouch: false,
    })

    setLenis(lenis)

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => lenis.raf(time * 1000) // GSAP ticker is in seconds
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      gsap.ticker.lagSmoothing(500, 33) // GSAP's documented defaults
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  return null
}
