import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { getLenis } from './lenisInstance'

/* ─────────────────────────────────────────────────────────────────────────────
   useVelocitySkew — bend an element with how fast the page is moving.

   The move from jesperlandberg.com: images lean into the scroll, straighten
   when it settles, and lean the other way when it reverses. On his site it is
   done in WebGL; a skew on the element gets most of the read for none of the
   rendering stack.

   ══ Why this one is safe to build unseen ═══════════════════════════════════

   Four scroll effects were attempted on this project before it and all four
   failed the same way — they could not be verified, because the harness they
   were built in has `document.hidden` true and fires ZERO
   requestAnimationFrame callbacks. One of them shipped a 1600px hole in the
   page.

   This one cannot do that. Its resting state is no transform at all: if the
   ticker never runs, if Lenis does not exist, if reduced motion is set, the
   element renders exactly as its CSS says. The animation only ever ADDS a
   lean to something already visible and correctly laid out. That is the
   property the pinned helix did not have, and the reason this is worth
   shipping without eyes on it.

   ══ Notes ══════════════════════════════════════════════════════════════════

   · Velocity comes from `lenis.velocity`, which is why this pairs with Lenis
     rather than reading scroll deltas by hand — Lenis already smooths it, so
     the value does not spike on every wheel notch.
   · It is driven off `gsap.ticker`, the same clock SmoothScroll drives Lenis
     from, so there is one loop for the page rather than a second rAF.
   · The value is eased toward its target rather than set, so a hard flick
     bends the element over a few frames instead of snapping it.
   · `max` is deliberately small. Past about 5 degrees a skewed photograph
     stops reading as momentum and starts reading as broken.
   · Apply it to an element NOTHING ELSE transforms. framer-motion's
     `whileInView` writes to `transform` too, and the two will overwrite each
     other on the same node — so this wants its own inner wrapper.
   ───────────────────────────────────────────────────────────────────────────── */
export function useVelocitySkew({ max = 4, strength = 0.32, ease = 0.12 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const el = ref.current
    if (!el) return

    let current = 0

    const tick = () => {
      const lenis = getLenis()
      const v = lenis ? lenis.velocity || 0 : 0
      const target = gsap.utils.clamp(-max, max, v * strength)

      current += (target - current) * ease

      /* Below a twentieth of a degree the transform is invisible and only
         costs the compositor a layer, so it is cleared rather than held. */
      if (Math.abs(current) < 0.05) {
        current = 0
        gsap.set(el, { clearProps: 'transform' })
        return
      }

      gsap.set(el, { skewY: current, force3D: true })
    }

    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      gsap.set(el, { clearProps: 'transform' })
    }
  }, [max, strength, ease])

  return ref
}
