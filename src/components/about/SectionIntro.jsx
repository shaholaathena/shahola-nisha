import { motion, useReducedMotion } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────────────────────
   SectionIntro — the full-width section header from her mockups.

   It fills whatever column it is given rather than setting its own width. The
   three sections using it now place it in the left half of a two-column grid,
   with their content in the right — so the statement and the thing it
   introduces sit side by side instead of stacked. It replaces `SectionRow`'s
   header for those sections; SectionRow itself is still the right primitive
   anywhere the label should stay pinned beside a long list, so it is not going
   away.

   The lede was on its own column at the far right for a while, which is how the
   mockup had it. It reads better under the headline: at the right-hand position
   it was a second entry point competing with the statement, and the eye had to
   cross the whole measure to find it. Under the line it is plainly the same
   thought continued, and it is capped at 54 characters so the two do not become
   one indistinguishable block.

   Extracted the moment the second section needed it, and three now use it. They
   differ only in their words, and a header this specific — a dash of a fixed
   length, a headline whose accent phrase is coloured mid-sentence, a capped
   measure under it — is exactly the kind of thing that silently drifts apart
   when it is copied instead of shared. Changing the type size here changed it
   in all three at once, which is the whole point.

   The headline arrives as `children` rather than as a string, because the gold
   phrase sits inside the sentence and only the caller knows which words it is.

   ── No mark ──

   The eyebrow used to open with a short gold rule, taken from her mockups.
   Removed on request, and the shared `Eyebrow` lost its gold diamond straight
   after, so there is now no mark anywhere on the About page — hero, gallery and
   certifications included. Every section label is the same thing: mono,
   uppercase, tracked, muted.
   ───────────────────────────────────────────────────────────────────────────── */
export default function SectionIntro({ eyebrow, lede, children }) {
  const reduce = useReducedMotion()
  const reveal = (d = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-12%' },
          transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
        }

  return (
    <div>
      <motion.div {...reveal()}>
        <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.24em] text-hero-mute sm:text-[11px]">
          {eyebrow}
        </div>

        <h2 className="font-display text-[clamp(1.85rem,3.4vw,3rem)] font-medium leading-[1.1] tracking-[-0.028em] text-hero-ink">
          {children}
        </h2>
      </motion.div>

      {lede && (
        <motion.p
          {...reveal(0.08)}
          className="mt-5 max-w-[54ch] text-[15px] leading-relaxed text-[#b9c0dd] sm:text-[16px]"
        >
          {lede}
        </motion.p>
      )}
    </div>
  )
}
