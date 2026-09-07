import { motion, useReducedMotion } from 'framer-motion'
import SectionIntro from './SectionIntro'

/* ─────────────────────────────────────────────────────────────────────────────
   WhatIDo — the process, full width.

   Lifted out of ExperienceSection and given its own file, because it stopped
   sharing that file's shape. It no longer uses SectionRow at all: the statement
   runs across the top instead of sitting in a left rail, and the three stages
   run beneath it as equal columns. Leaving it inside a component whose other
   half is a rail-and-content timeline would have meant one file holding two
   unrelated layouts.

   It is also the one section that stayed full width when Experience, Who I am
   and Contact all moved to a 35%/65% two-column split. It was tried that way
   and put back: the three stages read as a row, and stacked into a 65% column
   they became three lines of a list instead — the numerals stopped being a
   sequence you take in at a glance. Full width is also what keeps this section
   and the gallery from letting the middle of the scroll settle into five
   variations on one grid.

   The header is `SectionIntro`, shared with Experience and Who I am.

   A closing band used to sit at the foot of this section — "People · Ideas ·
   Better products" against "Always learning. Always building." — echoing the
   opening dash. It is gone: it restated the three stages above it in adjective
   form and then added a slogan, so the section ended on its weakest line. The
   AI tools row now occupies that position and keeps the opening dash answered,
   but with something the reader did not already know.

   ── Copy ──

   Verbatim from her mockup with one edit: the lede's em dash is a comma here,
   because this project does not use em dashes. WhoIAm carries the same note for
   the same reason.
   ───────────────────────────────────────────────────────────────────────────── */

/* Trimmed to the mockup. Against what the data file previously listed, this
   drops "Flow design" from 01, "Design tokens" and "Usability review" from 02,
   and shortens "Design-to-code handoff" to "Design handoff". The lists are
   load-bearing now — the layout wants each one to land in two lines, and a
   fifth or sixth entry pushes a column to three and breaks the row's rhythm. */
/* Moved here from Who I am. It sat there as a personal aside next to reading
   habits and playlists, which is the wrong neighbourhood: these are things she
   builds with, and this is the section that says what she builds with. It is
   set apart from the three stages rather than made a fourth, because it is not
   a phase of the work — it runs through all three. */
const AI_TOOLS = ['Claude', 'Antigravity', 'Cursor', 'Gemini', 'ChatGPT']

const STAGES = [
  {
    n: '01',
    title: 'Understand',
    items: ['User research', 'Stakeholder interviews', 'Journey mapping', 'Information architecture'],
  },
  {
    n: '02',
    title: 'Shape',
    items: ['Interface design', 'Design systems', 'Prototyping', 'Accessibility'],
  },
  {
    n: '03',
    title: 'Bring to life',
    items: ['HTML & CSS', 'JavaScript', 'React', 'Tailwind', 'Framer Motion', 'Design handoff'],
  },
]

export default function WhatIDo() {
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
    <section id="what-i-do" className="relative border-t border-white/10">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10 lg:py-24">

        <div className="max-w-3xl">
          <SectionIntro
            eyebrow="What I do"
            lede="I turn complex problems into simple, meaningful digital experiences, from understanding people to building solutions that make a real impact."
          >
            I work across the <span className="text-hero-hot">whole product</span>{' '}
            journey.
          </SectionIntro>
        </div>

        {/* ── The three stages ── */}
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-x-9">
            {STAGES.map((s, i) => (
              <motion.div key={s.n} {...reveal(0.06 + i * 0.07)} className="flex items-start gap-3.5">
                {/* Light weight and low contrast: at this size a numeral set in
                    the page's usual semibold would outweigh the stage it labels.

                    Its size, the dash width and the column gap are all tuned
                    together against one target: each stage's items must land in
                    two lines, as they do in her mockup. The longest pair,
                    "Journey mapping · Information architecture", measures 313px,
                    so the list column has to clear that — at the first attempt
                    the numeral and dash left it only 280px and every stage
                    spilled to three lines. */}
                <span className="shrink-0 font-display text-[clamp(2.6rem,3.2vw,3.1rem)] font-light leading-[0.8] tabular-nums text-white/[0.16]">
                  {s.n}
                </span>

                {/* The dash sits between the numeral and the title, and the item
                    list hangs under the TITLE rather than under the numeral —
                    which is why the title and list share a block and the dash
                    does not. */}
                <span aria-hidden className="mt-[0.55rem] h-px w-6 shrink-0 bg-white/25" />

                <div className="min-w-0">
                  <h3 className="text-[1.05rem] font-medium uppercase leading-none tracking-[0.05em] text-hero-ink lg:text-[1.15rem]">
                    {s.title}
                  </h3>

                  <ul className="mt-4 flex flex-wrap items-baseline gap-x-2.5 gap-y-2 text-[13.5px] leading-snug text-[#b9c0dd] lg:text-[14px]">
                    {s.items.map((it, j) => (
                      <li key={it} className="flex items-baseline gap-2.5">
                        {j > 0 && (
                          <span aria-hidden className="text-white/25">
                            ·
                          </span>
                        )}
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
        </div>

        <motion.div
          {...reveal(0.28)}
          className="mt-14 border-t border-white/[0.08] pt-10 lg:mt-20"
        >
          <div className="flex items-center gap-4">
            <span aria-hidden className="h-px w-6 bg-hero-hot" />
            <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-hero-mute">
              AI in my workflow
            </h3>
          </div>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {AI_TOOLS.map((t) => (
              <li
                key={t}
                className="rounded-full border border-white/[0.14] bg-white/[0.03] px-4 py-2 text-[13px] leading-none text-[#b9c0dd]"
              >
                {t}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
