import { motion, useReducedMotion } from 'framer-motion'
import SectionIntro from './SectionIntro'
import { SPLIT, MAIN } from './columns'

/* ─────────────────────────────────────────────────────────────────────────────
   WhatIDo — the process, as three rows.

   Same split as the rest of the page: the heading holds the first third, the
   rows the other two. Each row is the stage's name in display type and its
   three things on one line beside it, ruled like the Certifications list below
   so the two read as one family. The AI tools close the list as a quieter row:
   they run through every stage rather than being a fourth one.

   It was a constellation for a while — stars joined by a line that drew on
   scroll, numbered stages, four-item lists, the tools in pills — then three
   plain columns. Both were cut back on request: no lede, three items a stage,
   and one shape for everything. The row order already says it is a sequence.
   ───────────────────────────────────────────────────────────────────────────── */

const STAGES = [
  { title: 'Understand', items: ['User research', 'Journey mapping', 'Information architecture'] },
  { title: 'Shape', items: ['Interface design', 'Design systems', 'Prototyping'] },
  { title: 'Bring to life', items: ['HTML & CSS', 'React', 'Tailwind'] },
]

const AI_TOOLS = ['Claude', 'Cursor', 'Antigravity', 'Gemini', 'ChatGPT']

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

  const row = 'grid grid-cols-1 gap-y-2 py-7 sm:grid-cols-[13rem_1fr] sm:items-baseline sm:gap-x-8'

  return (
    <section id="what-i-do" className="relative">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10 lg:py-24">
        <div className={SPLIT}>
          <div>
            <SectionIntro eyebrow="What I do">
              I work across the <span className="text-hero-hot">whole product</span> journey.
            </SectionIntro>
          </div>

          <ul className={MAIN}>
            {STAGES.map((s, i) => (
              <motion.li
                key={s.title}
                {...reveal(0.06 + i * 0.06)}
                className={`group ${row} ${i === 0 ? 'pt-0' : 'border-t border-white/[0.08]'}`}
              >
                <h3 className="font-display text-[clamp(1.6rem,2.4vw,2.2rem)] font-semibold leading-none tracking-[-0.025em] text-hero-ink transition-colors duration-300 group-hover:text-hero-hot">
                  {s.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-[#b9c0dd] transition-transform duration-300 ease-out group-hover:translate-x-1 sm:text-[16px]">
                  {s.items.join(', ')}
                </p>
              </motion.li>
            ))}

            <motion.li {...reveal(0.24)} className={`${row} border-t border-white/[0.08]`}>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-hero-mute sm:text-[11px]">
                AI in my workflow
              </h3>
              <p className="text-[14px] leading-relaxed text-hero-mute sm:text-[15px]">
                {AI_TOOLS.join(', ')}
              </p>
            </motion.li>
          </ul>
        </div>
      </div>
    </section>
  )
}
