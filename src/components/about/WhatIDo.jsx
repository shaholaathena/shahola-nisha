import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import SectionIntro from './SectionIntro'
import Star from './Star'

/* ─────────────────────────────────────────────────────────────────────────────
   WhatIDo — the process, as a constellation.

   The heading says "the whole product journey", and this page is a night sky.
   So the three stages are three stars joined by one line: as the section
   scrolls into view the line draws from the first star to the next, and each
   star lights as the line reaches it. The journey is something that happens
   in front of the reader rather than three columns that are simply there.

   It replaced three columns of dim numerals over dot-separated lists. That read
   as a spec sheet — nothing ranked, nothing connected the stages, and the
   dot separators broke badly wherever a list wrapped (a line could open on
   "· React"). Here each stage has a clear order of reading — its number, its
   name in display type, then its items one to a line — and the line between
   the stars is what says they are one process.

   Across on desktop; on a phone the same line runs down the left edge, like a
   timeline, with each stage hanging off its star.

   No mark before any label: the gold rules and diamonds were taken off every
   label on this page at her request, and that includes the AI row here, which
   carried the last one.

   Motion is the scroll itself — the line's length and each star's light are
   read straight off the section's scroll progress, so it is always exactly as
   far along as the reader is, never an animation playing at them. Transform and
   opacity only. Under reduced motion the whole constellation is simply lit.

   ── Copy ──

   The heading, the lede and the three stages are hers; the item lists were
   trimmed to four each at her request (see STAGES). The lede's em dash is a
   comma because this project does not use em dashes.
   ───────────────────────────────────────────────────────────────────────────── */

/* Four items a stage at most, so the three columns end level. "Bring to life"
   had six: Framer Motion went, and JavaScript and React share a line. */
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
    items: ['HTML & CSS', 'JavaScript & React', 'Tailwind', 'Design handoff'],
  },
]

/* Not a fourth stage: it runs through all three, so it sits under the
   constellation rather than on it. */
const AI_TOOLS = ['Claude', 'Antigravity', 'Cursor', 'Gemini', 'ChatGPT']

/* Where along the line each star sits, as a share of the scroll progress. */
const AT = [0, 0.5, 1]

function Stage({ s, i, progress, reduce }) {
  // Both ranges end by 1: the scroll progress stops there, and a range that
  // runs past it leaves the last star stuck part-lit.
  const lit = useTransform(progress, [AT[i] - 0.06, Math.min(1, AT[i] + 0.02)], [0, 1])
  // The stage's text brightens with its star, from present-but-quiet to full.
  const text = useTransform(progress, [AT[i] - 0.1, Math.min(1, AT[i] + 0.04)], [0.45, 1])

  return (
    <div className="relative pl-9 lg:pl-0">
      <div className="absolute left-0 top-[4px] lg:static">
        <Star lit={reduce ? 1 : lit} />
      </div>

      <motion.div style={{ opacity: reduce ? 1 : text }} className="lg:mt-8">
        <p className="font-mono text-[11px] tabular-nums tracking-[0.2em] text-hero-hot">{s.n}</p>
        <h3 className="mt-3 font-display text-[clamp(1.55rem,2.2vw,2rem)] font-semibold leading-none tracking-[-0.025em] text-hero-ink">
          {s.title}
        </h3>
        <ul className="mt-6 space-y-3">
          {s.items.map((it) => (
            <li key={it} className="flex items-center gap-3 text-[14px] leading-snug text-[#b9c0dd] lg:text-[15px]">
              <span aria-hidden className="h-px w-3 shrink-0 bg-white/25" />
              {it}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

export default function WhatIDo() {
  const reduce = useReducedMotion()
  const stagesRef = useRef(null)

  /* 0 as the constellation's top reaches the lower part of the screen, 1 as its
     foot passes the middle — so the last star lights while the reader is still
     looking at it, not after it has scrolled away. */
  const { scrollYProgress } = useScroll({ target: stagesRef, offset: ['start 78%', 'end 58%'] })
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1])

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
    <section id="what-i-do" className="relative">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10 lg:py-24">
        <div className="max-w-3xl">
          <SectionIntro
            eyebrow="What I do"
            lede="I turn complex problems into simple, meaningful digital experiences, from understanding people to building solutions that make a real impact."
          >
            I work across the <span className="text-hero-hot">whole product</span> journey.
          </SectionIntro>
        </div>

        {/* ── The constellation ── */}
        <div ref={stagesRef} className="relative mt-16 lg:mt-24">
          {/* Desktop: across, from the first star's centre to the third's.
              Stars sit at each column's left edge; with three columns and a
              2.5rem gap the third begins at 66.667% + 1.667rem. Past the last
              star the line keeps going, faintly, and fades — the journey does
              not stop at "hand-off". */}
          <div aria-hidden className="pointer-events-none absolute left-[5px] top-[5px] hidden h-px w-[calc(66.667%+1.667rem)] bg-white/10 lg:block">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-hero-hot/80 to-hero-hot/60"
              style={{ scaleX: reduce ? 1 : draw }}
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-[5px] hidden h-px bg-gradient-to-r from-white/10 to-transparent lg:block"
            style={{ left: 'calc(66.667% + 1.667rem + 5px)' }}
          />

          {/* Phone and tablet: down the left edge. */}
          <div aria-hidden className="pointer-events-none absolute bottom-0 left-[5px] top-[5px] w-px bg-gradient-to-b from-white/10 via-white/10 to-transparent lg:hidden">
            <motion.div
              className="h-full origin-top bg-gradient-to-b from-hero-hot/80 via-hero-hot/60 to-transparent"
              style={{ scaleY: reduce ? 1 : draw }}
            />
          </div>

          <div className="grid grid-cols-1 gap-y-14 lg:grid-cols-3 lg:gap-x-10">
            {STAGES.map((s, i) => (
              <Stage key={s.n} s={s} i={i} progress={scrollYProgress} reduce={reduce} />
            ))}
          </div>
        </div>

        {/* ── The tools that run through all three ── */}
        <motion.div
          {...reveal(0.1)}
          className="mt-20 flex flex-col gap-5 lg:mt-28 lg:flex-row lg:items-center lg:gap-10"
        >
          <h3 className="shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-hero-mute sm:text-[11px]">
            AI in my workflow
          </h3>
          <ul className="flex flex-wrap gap-2.5">
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
