/* ─────────────────────────────────────────────────────────────────────────────
   Eyebrow — the gold diamond and mono label that names every section.

   Taken from her About mockup, where it is the one mark repeated down the whole
   page and does most of the work of making very different sections feel like
   one document. It is also already the homepage hero's eyebrow, so adopting it
   here closes the loop between the two pages rather than inventing a third
   style.

   The diamond is a rotated square, not a glyph: at 5px a real character renders
   differently across fonts and platforms, and this has to sit on the same
   baseline every time.
   ───────────────────────────────────────────────────────────────────────────── */
export default function Eyebrow({ children, className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span aria-hidden className="h-[5px] w-[5px] shrink-0 rotate-45 bg-hero-hot" />
      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-hero-hot sm:text-[11px]">
        {children}
      </span>
    </div>
  )
}
