/* ─────────────────────────────────────────────────────────────────────────────
   Can this visitor have the WebGL gallery?

   Probed once, synchronously, at first render — deliberately not discovered
   inside an effect. The first version had the canvas component call
   `setActive(true)` from its own effect and tell its parent through a callback,
   which ESLint flagged as `react-hooks/set-state-in-effect`: it schedules a
   second render pass for something that was knowable before the first.

   Answering it up front means the parent renders the right thing immediately —
   grid alone, or canvas plus a quieter index — with no flash of the wrong
   layout and no cascade.

   Three gates, and all three are about not imposing:
     · width, because the row of planes needs room and a phone has none
     · reduced motion, because this thing's whole point is movement
     · an actual WebGL context, proven by asking for one rather than assuming
   ───────────────────────────────────────────────────────────────────────────── */
export function canUse3D() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(max-width: 1023px)').matches) return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    const c = document.createElement('canvas')
    return Boolean(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}
