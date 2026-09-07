import { motion, useReducedMotion } from 'framer-motion'
import Eyebrow from './Eyebrow'

/* ─────────────────────────────────────────────────────────────────────────────
   SectionRow — the About page's one structural idea.

   Every section below the intro is the same shape: a label in the left margin
   and the content in a wide column beside it. That is what makes a long page of
   very different material (strengths, clients, credentials, jobs) read as one
   document rather than a stack of unrelated blocks.

   The label is sticky on wide screens, so while you read a long list the thing
   you are reading stays named. It stops being sticky below `lg`, where the
   label sits above the content and there is no margin to hold it in.

   The rule on top is the separator between sections, so sections do not each
   need their own; a page of these produces one consistent set of horizontal
   rules down the whole scroll.

   The heading clamp is `1.95rem → 2.95rem`. It was `1.5rem → 2.15rem`, which
   was simply too small to hold a page whose hero runs to 4.6rem and whose
   closing statement runs to 8rem: the entire middle of the scroll sat a full
   register below both ends of it and read as small print between two posters.
   The rail is three columns wide, so this is close to the ceiling before
   two-word headings start breaking badly.

   `eyebrow` and `lede` are both optional and both widen the rail from a label
   into a small piece of writing. Pass `eyebrow` ONLY when it says something the
   heading does not — "Experience" over "From ideas to real impact." is two
   different registers, category then claim, and earns its line. Passing the
   heading's own words back as an eyebrow prints the section title twice, which
   is the thing the bare diamond exists to avoid.
   ───────────────────────────────────────────────────────────────────────────── */
export default function SectionRow({ id, label, eyebrow, lede, meta, children }) {
  const reduce = useReducedMotion()
  const reveal = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-12%' },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      }

  return (
    <section id={id} className="relative border-t border-white/10">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid grid-cols-12 gap-y-8 lg:gap-x-16">
          <div className="col-span-12 lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              {/* No mark either way. The bare gold diamond that used to sit
                  above an unlabelled heading went with the rest of the page's
                  marks; without an eyebrow the heading simply leads. */}
              {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
              <h2 className="font-display text-[clamp(1.95rem,3.5vw,2.95rem)] font-semibold leading-[1.04] tracking-[-0.028em] text-hero-ink">
                {label}
              </h2>
              {lede && (
                <p className="mt-4 max-w-[30ch] text-[14px] leading-relaxed text-[#aeb6d6] lg:max-w-[24ch]">
                  {lede}
                </p>
              )}
              {meta && (
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-hero-mute">
                  {meta}
                </p>
              )}
            </div>
          </div>
          <motion.div {...reveal} className="col-span-12 lg:col-span-9">
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
