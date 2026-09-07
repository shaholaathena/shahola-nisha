/* ─────────────────────────────────────────────────────────────────────────────
   Eyebrow — the mono label that names every section.

   It used to carry a 5px gold diamond, taken from her About mockup, where it
   was the one mark repeated down the whole page. Every mark on the About page
   has now been removed on request: first the short gold rule that SectionIntro
   used, then this. The label carries the naming on its own.

   What is left is the type register, and that is still worth a component: 10px
   mono, uppercase, 0.24em, muted ink, stepping to 11px above `sm`. Three
   sections use it and they have to agree.

   It is `text-hero-mute` rather than the gold it was. With the diamond gone,
   a gold label was the only remaining accent in the section header and it
   competed with the accent phrase inside the heading below it, which is where
   the colour is actually doing work. This also matches SectionIntro's own
   eyebrow, so all six section labels on the page are one thing.

   NOTE: the case-study pages define their own local `Eyebrow` (a numbered
   variant). It is a different component and none of this touches it.
   ───────────────────────────────────────────────────────────────────────────── */
export default function Eyebrow({ children, className = '' }) {
  return (
    <div
      className={`font-mono text-[10px] uppercase tracking-[0.24em] text-hero-mute sm:text-[11px] ${className}`}
    >
      {children}
    </div>
  )
}
