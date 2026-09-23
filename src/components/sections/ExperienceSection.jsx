import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import SectionIntro from '../about/SectionIntro'
import Star from '../about/Star'
import { experience } from '../../data/portfolio'

/* ─────────────────────────────────────────────────────────────────────────────
   Experience.

   The capabilities half of this file moved out to `about/WhatIDo.jsx` when it
   stopped being a rail-and-content row and became a full-width statement with
   three columns under it; keeping the two together would have meant one file
   holding two unrelated layouts.

   This half then followed it. The header is `SectionIntro`, the same component
   WhatIDo uses, so the two sections open identically: dash, statement with one
   phrase in gold, supporting line set against it on the right. That also means
   the timeline no longer sits in SectionRow's nine columns — it runs the full
   measure, with the company and the period as its two outer anchors. The
   descriptions stay capped at `max-w-2xl`, because the container got wider but
   a comfortable line length did not.

   The experience list is built to her second reference, and the change that
   reference makes is where the date goes. It used to sit in a narrow column on
   the left, which sounded right — dates as a scannable column — but on this
   page the left rail is already a column, holding the section's own label. Two
   stacked left columns meant the eye had to pass a gutter of small mono text
   before reaching a single company name. Pushing the period to the right edge
   gives each entry two anchors instead, company on the left and period on the
   right, and the row between them reads in one movement.

   The rail grew to match: an eyebrow naming the section, a display line that
   makes a claim, and one quiet sentence under it. That is the reference's
   proportion — the left side is a small piece of writing, not a tab.

   One thing added on top of the reference. The current role carries a gold dot
   before its period, because "Apr 2020 - Present" and "Apr 2018 - Apr 2020" are
   the same shape at a glance and which job she holds now is the single fact a
   reader is looking for.

   ── The spine draws itself ──

   The same motion as What I do, at her request: the spine is a faint track,
   and a gold line draws down it as the page scrolls, lighting each role's star
   as it arrives. It used to be a static gradient, gold at the top fading to
   nothing, which said "recent at the top" and nothing else.

   The gold runs from the first star to the last, not the length of the list —
   so a star lights at the moment the line actually reaches it — and those
   positions are measured, not assumed, because the roles are different
   heights. Past the last star the track carries on faintly and fades: the
   career goes further back than the list does. The scroll range is the drawn
   segment itself passing a reading line two-thirds of the way down the screen,
   so each star lights as it crosses that line.

   The spine now shows on phones too, as What I do's does; it was hidden there
   to save the indent, and the two sections should not disagree about it.

   ───────────────────────────────────────────────────────────────────────────── */
/* One role on the spine. Its star lights, and its text comes up from quiet to
   full, as the drawn line reaches it. */
function Role({ job, i, at, progress, reduce }) {
  const current = /present/i.test(job.period)
  // Both ranges end by 1: the scroll progress stops there, and a range that
  // runs past it leaves the last star stuck part-lit.
  const lit = useTransform(progress, [at - 0.04, Math.min(1, at + 0.02)], [0, 1])
  const text = useTransform(progress, [at - 0.12, Math.min(1, at + 0.03)], [0.45, 1])

  return (
    <li className={`relative py-8 pl-9 sm:pl-10 ${i > 0 ? 'border-t border-white/[0.08]' : 'pt-0'}`}>
      <span
        data-star
        className="absolute left-0 block"
        style={{ top: i === 0 ? '0.5rem' : '2.5rem' }}
      >
        <Star lit={reduce ? 1 : lit} />
      </span>

      <motion.div style={{ opacity: reduce ? 1 : text }}>
        {/* Company and period are the row's two anchors, so they share a
            baseline rather than a box. Below `sm` there is no width to hold
            both, and the period drops under the company. */}
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
          <h3 className="font-display text-[1.45rem] font-semibold leading-tight tracking-[-0.02em] text-hero-ink sm:text-[1.6rem]">
            {job.company}
          </h3>
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-hero-mute">
            {current && (
              <span aria-hidden className="mr-2 inline-block h-[5px] w-[5px] rounded-full bg-hero-hot align-middle" />
            )}
            {job.period}
            {current && <span className="sr-only"> (current role)</span>}
          </span>
        </div>

        <p className="mt-2 text-[13px] font-semibold tracking-[0.01em] text-hero-hot">{job.role}</p>
        <p className="mt-3.5 max-w-2xl text-[14.5px] leading-relaxed text-[#aeb6d6]">{job.description}</p>

        {job.highlights?.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {job.highlights.map((h) => (
              <li
                key={h}
                className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9aa2c4]"
              >
                {h}
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </li>
  )
}

export default function ExperienceSection() {
  const reduce = useReducedMotion()
  const listRef = useRef(null)
  const drawnRef = useRef(null)
  /* Each star's centre, in px down the list, measured after layout and again
     whenever the list reflows. */
  const [stars, setStars] = useState(null)

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return undefined
    const measure = () => {
      const ys = [...list.querySelectorAll('[data-star]')].map(
        (el) => el.parentElement.offsetTop + el.offsetTop + el.offsetHeight / 2,
      )
      setStars(ys.length ? ys : null)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(list)
    return () => ro.disconnect()
  }, [])

  const first = stars?.[0] ?? 0
  const last = stars?.[stars.length - 1] ?? 0
  const span = Math.max(1, last - first)
  // Where each star sits along the drawn segment, 0 at the first, 1 at the last.
  const at = experience.map((_, i) => (stars ? (stars[i] - first) / span : i / Math.max(1, experience.length - 1)))

  const { scrollYProgress } = useScroll({ target: drawnRef, offset: ['start 66%', 'end 66%'] })

  return (
    <section id="experience" className="relative">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[35%_1fr] gap-y-12 lg:gap-x-16">
          <div>
            <SectionIntro eyebrow="Experience">
              From ideas to <span className="text-hero-hot">real impact</span>.
            </SectionIntro>
          </div>

          <div>
            <ol ref={listRef} className="relative flex flex-col">
              {/* The track: from the first star down, fading out past the last. */}
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-0 left-[5px] w-px bg-gradient-to-b from-white/10 via-white/10 to-transparent"
                style={{ top: first }}
              />
              {/* The drawn gold, first star to last. */}
              <span
                ref={drawnRef}
                aria-hidden
                className="pointer-events-none absolute left-[5px] block w-px"
                style={{ top: first, height: span }}
              >
                <motion.span
                  className="block h-full origin-top bg-gradient-to-b from-hero-hot/80 to-hero-hot/60"
                  style={{ scaleY: reduce ? 1 : scrollYProgress }}
                />
              </span>

              {experience.map((job, i) => (
                <Role key={job.company} job={job} i={i} at={at[i]} progress={scrollYProgress} reduce={reduce} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
