/* ─────────────────────────────────────────────────────────────────────────────
   The live Lenis instance, in its own module.

   Two callers need it — `SmoothScroll` creates it, and App.jsx's router reads
   it to send its scroll jumps through Lenis instead of past it — and it cannot
   live in either of them. Exporting a plain function alongside a component
   breaks React Fast Refresh, which is exactly what ESLint's
   `react-refresh/only-export-components` reported when this sat inside
   SmoothScroll.jsx.

   It is null under reduced motion (no instance is ever created), before mount,
   and after teardown. Every caller has to handle that.
   ───────────────────────────────────────────────────────────────────────────── */
let instance = null

export const getLenis = () => instance
export const setLenis = (l) => {
  instance = l
}
