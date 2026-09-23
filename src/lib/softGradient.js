/* ─────────────────────────────────────────────────────────────────────────────
   Gradient stops with no visible edge.

   A two-stop gradient (colour → transparent) fades in a straight line, and a
   straight-line fade has a start and an end the eye can find: a pool of light
   reads as a lit ellipse with a rim, a vignette as a stripe. These stops follow
   an inverted smoothstep instead — slow to leave full strength, slow to arrive
   at nothing — which is how light actually falls off.

   `rgb` is space-separated channels ('99 132 230'), `a` the alpha at the
   centre, `reach` the % of the gradient line by which it has fully faded.
   Returns the stop list only, to drop into any linear- or radial-gradient().
   ───────────────────────────────────────────────────────────────────────────── */
export const softStops = (rgb, a, reach = 100) =>
  [0, 0.12, 0.25, 0.38, 0.5, 0.62, 0.75, 0.88, 1]
    .map((t) => {
      const k = 1 - t * t * (3 - 2 * t)
      return `rgb(${rgb} / ${(a * k).toFixed(4)}) ${(t * reach).toFixed(1)}%`
    })
    .join(', ')
