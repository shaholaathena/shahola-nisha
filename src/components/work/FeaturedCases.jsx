import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { projects } from '../../data/portfolio'
import { FEATURED, categoryOf } from './groups'
import MerchantCoverQR from '../ui/MerchantCoverQR'

/* ─────────────────────────────────────────────────────────────────────────────
   FeaturedCases — the three case studies, one band each.

   Built to her reference: a large ghost numeral, the category in gold above the
   title, a one-line subtitle, the description, tag pills, and a circular arrow
   control reading "View case study" — with the cover holding the other half of
   the band.

   It replaces the old `FeaturedWork` index. What changed and why:

     · Each project gets a band instead of a row in a list. The list gave three
       very different pieces of work the same three lines of type; a band has
       room for the category, the client and what the thing actually was.
     · The covers alternate sides. Three identical left-text/right-image rows
       read as a table, and the alternation is what makes them read as chapters.
     · The numerals are large and low-contrast, and they continue into MoreWork
       below, so the page numbers 01 through 09 in one sequence.

   ── Entrance ──

   `whileInView`, from the top right, matching what the previous version did and
   for the same recorded reason: a `useScroll`-scrubbed version of this could not
   be verified in the harness, and it fails to `opacity: 0` — invisible work.
   A triggered entrance settles visible or not at all.

   Covers mirror their side, so a band whose image is on the left enters from
   the top LEFT. An entrance that always came from the same corner would fight
   the alternation it is supposed to support.
   ───────────────────────────────────────────────────────────────────────────── */

const EASE = [0.22, 1, 0.36, 1]

/* Editorial lines for the three, kept here rather than in the data file: these
   are how the index describes the work, and the data file's `title` is the
   project's own name. The old index carried the same idea. */
const LEDE = {
  'merchant-onboarding': 'One merchant experience, every bank’s brand',
  zcommerz: 'An online store, live in minutes',
  'bkb-mobile': 'Complex banking, made calm',
}

function Cover({ project }) {
  if (project.coverQR) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white/[0.05] p-10">
        <div className="w-[46%] max-w-[210px]">
          <MerchantCoverQR />
        </div>
      </div>
    )
  }
  if (project.image) {
    return <img src={project.image} alt="" className="h-full w-full object-cover" draggable="false" />
  }
  return (
    <div className="flex h-full w-full flex-col justify-between bg-white/[0.05] p-6">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-hero-mute">Case study</span>
      <span className="font-display text-[2rem] font-semibold leading-none text-hero-ink">{project.company}</span>
    </div>
  )
}

export default function FeaturedCases() {
  const reduce = useReducedMotion()
  const lead = FEATURED.map((id) => projects.find((p) => p.id === id)).filter(Boolean)

  return (
    <section id="work" className="relative">
      {lead.map((p, i) => {
        const flip = i % 2 === 1
        const enter = (from, delay = 0) =>
          reduce
            ? {}
            : {
                initial: from,
                whileInView: { x: 0, y: 0, scale: 1, opacity: 1 },
                viewport: { once: true, margin: '-12%' },
                transition: { duration: 0.9, delay, ease: EASE },
              }

        return (
          <div key={p.id} className="border-t border-white/10">
            <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10 lg:py-24">
              <div className="grid grid-cols-1 items-center gap-y-10 lg:grid-cols-2 lg:gap-x-16">

                {/* ── Copy ── */}
                <motion.div
                  {...enter({ x: flip ? 34 : -34, y: -20, opacity: 0 }, 0.06)}
                  className={flip ? 'lg:order-2' : ''}
                >
                  <div className="flex items-start gap-5 lg:gap-7">
                    <span className="shrink-0 font-display text-[clamp(2.6rem,4.6vw,4.4rem)] font-light leading-[0.8] tabular-nums text-white/[0.14]">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-hero-hot">
                        {categoryOf(p.id)}
                      </p>

                      <h3 className="mt-3 font-display text-[clamp(1.5rem,2.8vw,2.35rem)] font-medium leading-[1.06] tracking-[-0.025em] text-hero-ink">
                        {LEDE[p.id] || p.title}
                      </h3>

                      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-hero-mute">
                        {p.company}
                        {p.year ? ` · ${p.year}` : ''}
                      </p>

                      {p.description && (
                        <p className="mt-5 max-w-[46ch] text-[14.5px] leading-relaxed text-[#b9c0dd] sm:text-[15px]">
                          {p.description}
                        </p>
                      )}

                      {p.tags?.length > 0 && (
                        <ul className="mt-6 flex flex-wrap gap-2.5">
                          {p.tags.slice(0, 4).map((t) => (
                            <li
                              key={t}
                              className="rounded-full border border-white/[0.14] bg-white/[0.03] px-3.5 py-1.5 text-[12.5px] leading-none text-[#b9c0dd]"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                      )}

                      {p.link && (
                        <Link
                          to={p.link}
                          className="group mt-8 inline-flex items-center gap-4"
                        >
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-hero-hot/50 text-hero-hot transition-colors duration-200 group-hover:border-hero-hot group-hover:bg-hero-hot/15">
                            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
                              →
                            </span>
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-hero-ink">
                            View case study
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* ── Cover. Clipped by the wrapper so the entrance travel
                       cannot widen the page. ── */}
                <div className={`w-full overflow-hidden rounded-sm ${flip ? 'lg:order-1' : ''}`}>
                  <motion.div
                    {...enter({ x: flip ? -110 : 110, y: -80, scale: 1.08, opacity: 0 })}
                    className="aspect-[4/3] w-full"
                  >
                    <Cover project={p} />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
