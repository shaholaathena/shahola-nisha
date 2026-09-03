import { motion, useReducedMotion } from 'framer-motion'

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
   ───────────────────────────────────────────────────────────────────────────── */
export default function SectionRow({ id, label, meta, children }) {
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
              {/* The diamond is the page's section mark, from her mockup; the
                  display label is the structure the earlier reference set. The
                  mark sits ABOVE the heading rather than carrying the label
                  text itself — rendering the label in both a mono eyebrow and a
                  display heading printed every section title twice. */}
              <span aria-hidden className="mb-4 block h-[5px] w-[5px] rotate-45 bg-hero-hot" />
              <h2 className="font-display text-[clamp(1.5rem,2.6vw,2.15rem)] font-semibold leading-tight tracking-[-0.02em] text-hero-ink">
                {label}
              </h2>
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
