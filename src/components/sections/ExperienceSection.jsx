import SectionIntro from '../about/SectionIntro'
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

   ───────────────────────────────────────────────────────────────────────────── */
export default function ExperienceSection() {
  return (
    <section id="experience" className="relative border-t border-white/10">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[35%_1fr] gap-y-12 lg:gap-x-16">
          <div >
          <SectionIntro eyebrow="Experience">
            From ideas to <span className="text-hero-hot">real impact</span>.
          </SectionIntro>
          </div>

          <div >
          <ol className="relative flex flex-col">
              {/* The spine. Gold at the top where the current role is, fading out
                  as the career goes back — the same read as the ladder that lived
                  in the deleted Approach section, which is where this page's only
                  visual sense of chronology used to be. Hidden below `sm`, where
                  the indent it needs would cost more width than the line is worth. */}
              <span
                aria-hidden
                className="absolute left-0 top-2 bottom-8 hidden w-px bg-gradient-to-b from-hero-hot/70 via-hero-hot/20 to-transparent sm:block"
              />

              {experience.map((job, i) => {
                const current = /present/i.test(job.period)
                return (
                  <li
                    key={job.company}
                    className={`relative py-8 sm:pl-10 ${i > 0 ? 'border-t border-white/[0.08]' : 'pt-0'}`}
                  >
                    {/* Node on the spine: filled for the role she holds now,
                        hollow for the ones she does not. */}
                    <span
                      aria-hidden
                      className={`absolute left-0 hidden h-[9px] w-[9px] -translate-x-1/2 rounded-full border sm:block ${
                        current
                          ? 'border-hero-hot bg-hero-hot'
                          : 'border-white/30 bg-hero-void'
                      }`}
                      style={{ top: i === 0 ? '0.55rem' : '2.55rem' }}
                    />
                    {/* Company and period are the row's two anchors, so they share a
                        baseline rather than a box. Below `sm` there is no width to
                        hold both, and the period drops under the company. */}
                    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                      <h3 className="font-display text-[1.45rem] font-semibold leading-tight tracking-[-0.02em] text-hero-ink sm:text-[1.6rem]">
                        {job.company}
                      </h3>
                      <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-hero-mute">
                        {current && (
                          <span
                            aria-hidden
                            className="mr-2 inline-block h-[5px] w-[5px] rounded-full bg-hero-hot align-middle"
                          />
                        )}
                        {job.period}
                        {current && <span className="sr-only"> (current role)</span>}
                      </span>
                    </div>

                    <p className="mt-2 text-[13px] font-semibold tracking-[0.01em] text-hero-hot">
                      {job.role}
                    </p>
                    <p className="mt-3.5 max-w-2xl text-[14.5px] leading-relaxed text-[#aeb6d6]">
                      {job.description}
                    </p>

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
                  </li>
                )
              })}
          </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
