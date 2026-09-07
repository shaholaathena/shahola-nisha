import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { projects } from '../../data/portfolio'
import MerchantCoverQR from '../ui/MerchantCoverQR'

const EASE = [0.22, 1, 0.36, 1]
const VP = { once: true, margin: '-80px' }

/* The three flagship case studies, foregrounded. Editorial copy lives here so
   the list reads as a curated index, not a data dump of raw project titles.

   ── Palette ──

   Night, not paper. This was built on the light theme — `surface-base` ground,
   `ink-primary` type, the `#93511b` accent — back when /work was a paper page.
   It is on the site's night surface now, matching the homepage and About, and
   every token here moved with it: ink to `hero-ink`, muted to `hero-mute`, the
   accent to the antique gold.

   The section paints no ground of its own (`bg-transparent`) so the page's
   atmosphere shows through it, the same arrangement every section on About
   uses.

   ── Structure ──

   Each featured project is a row with the copy on the left and its cover on the
   right, and the cover is now part of the layout rather than something only a
   mouse could summon.

   It used to be an index of titles with a preview panel that followed the
   cursor. That was the better half of a good idea and the worse half of a bad
   one: on a fine pointer it was genuinely nice, and on every touch device the
   work was invisible — a portfolio index showing no work. There was a `lg:hidden`
   thumbnail patching the gap, which is the tell that the primary treatment did
   not cover the primary case. One cover, in the layout, on every device.

   The cursor-follower is gone with it, along with `activeId`, the two motion
   values and the springs driving it. Hover still does something: the title
   shifts, the meta brightens, the arrow slides.

   ── Motion ──

   Scroll-linked, not triggered. See ProjectRow. */
const FEATURED = [
  {
    id: 'merchant-onboarding',
    title: 'One merchant experience,\nevery bank’s brand',
    meta: 'Bangla QR · Platform UX · Design System',
  },
  {
    id: 'zcommerz',
    title: 'An online store,\nlive in minutes',
    meta: 'E-commerce · Designed & Built · Web',
  },
  {
    id: 'bkb-mobile',
    title: 'Complex banking,\nmade calm',
    meta: 'Mobile Banking · UX/UI · 100+ screens',
  },
]

/* ── The floating preview that trails the cursor on desktop. Handles the three
   different cover types gracefully so no row ever shows a broken image. ── */
function Preview({ project }) {
  if (!project) return null
  if (project.coverQR) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white/[0.05] p-8">
        <div className="w-[46%] max-w-[190px] drop-shadow-[0_24px_40px_rgba(0,0,0,0.18)]">
          <MerchantCoverQR />
        </div>
      </div>
    )
  }
  if (project.image) {
    return <img src={project.image} alt="" className="h-full w-full object-cover" draggable="false" />
  }
  // Imageless (e.g. ZCOMMERZ before screens land): an intentional type panel.
  return (
    <div className="flex h-full w-full flex-col justify-between bg-hero-void p-6 text-hero-ink">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-hero-mute">Case study</span>
      <span className="font-display text-[2rem] font-semibold leading-none tracking-tight">{project.company}</span>
    </div>
  )
}

/* ── One row, split out for readability. ── */
function ProjectRow({ f, i, reduce }) {
  /* Enters from the top right, on scroll.

     `whileInView`, not `useScroll`. The first build scrubbed this against
     scroll progress, which is the nicer effect — the cover tracks the reader's
     own movement and reverses if they scroll back. It was replaced because it
     could not be verified here and its failure mode is unacceptable: when the
     progress value never updates, the cover stays at `x:110 y:-80 opacity:0`
     and the work is invisible at every scroll position. Measured exactly that,
     at five different scroll offsets.

     A triggered entrance cannot fail that way. It is the same mechanism every
     section on About uses, so it is also the pattern this codebase already
     proves out. If the scrubbed version is wanted later it needs a visible
     resting state — transform and opacity defaulting to settled, with the
     offset applied only while the hook is actually reporting.

     `once: true` so the row does not replay every time it re-enters, and a
     `-12%` margin so it begins before the row is fully on screen. */
  const enter = (from, delay = 0) =>
    reduce
      ? {}
      : {
          initial: from,
          whileInView: { x: 0, y: 0, scale: 1, opacity: 1 },
          viewport: { once: true, margin: '-12%' },
          transition: { duration: 0.9, delay, ease: EASE },
        }

  const cover = enter({ x: 110, y: -80, scale: 1.08, opacity: 0 })
  /* A third of the travel and slightly ahead of the cover. The offset between
     them is what stops the row landing as one flat card. */
  const text = enter({ x: 34, y: -24, scale: 1, opacity: 0 }, 0.08)

  return (
    <div>
      <Link
        to={f.project.link || `/case-study/${f.id}`}
        className="group relative block border-b border-white/[0.12] py-10 lg:py-14"
      >
        <div className="grid grid-cols-1 items-center gap-y-8 lg:grid-cols-[1fr_auto] lg:gap-x-14">

          <motion.div {...text} className="min-w-0">
            <div className="mb-5 flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-[0.16em] text-hero-hot tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-hero-mute">
                {f.project.year || 'Case study'}
              </span>
            </div>

            <h3 className="font-display text-[clamp(1.75rem,3.6vw,3.1rem)] font-medium leading-[1.02] tracking-[-0.02em] text-hero-ink transition-transform duration-500 ease-out lg:group-hover:translate-x-2">
              {f.title.split('\n').map((line, li) => (
                <span key={li} className="block">{line}</span>
              ))}
            </h3>

            <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-hero-mute transition-colors duration-300 group-hover:text-[#b9c0dd]">
              {f.meta}
            </div>

            <span className="mt-6 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-hero-hot">
              Read the case study
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                ↗
              </span>
            </span>
          </motion.div>

          {/* The clip lives on this wrapper and the movement on the child: a
              transform cannot clip itself, and without the clip the cover's 110px
              of travel would widen the page while it is off to the right. */}
          <div className="w-full overflow-hidden rounded-sm lg:w-[clamp(20rem,34vw,30rem)]">
            <motion.div {...cover} className="aspect-[4/3] w-full">
              <Preview project={f.project} />
            </motion.div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default function FeaturedWork() {
  const reduce = useReducedMotion()

  const featured = FEATURED.map((f) => ({ ...f, project: projects.find((p) => p.id === f.id) })).filter((f) => f.project)
  const archive = projects.filter((p) => !FEATURED.some((f) => f.id === p.id))

  return (
    <section id="work" className="relative bg-transparent pb-24 pt-0 lg:pb-36 lg:pt-0">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">

        {/* ── Masthead ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VP}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14 flex items-end justify-between border-t border-white/[0.12] pt-4 lg:mb-20"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] tabular-nums text-hero-mute">
            Selected Work
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] tabular-nums text-hero-mute">
            {String(featured.length).padStart(2, '0')} Case Studies
          </span>
        </motion.div>

        {/* ── The index ── */}
        <div className="border-t border-white/[0.12]">
          {featured.map((f, i) => (
            <ProjectRow key={f.id} f={f} i={i} reduce={reduce} />
          ))}
        </div>

        {/* ── Archive: the lighter projects, as a compact typographic list ── */}
        <div className="mt-20 lg:mt-28">
          <div className="mb-8 flex items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-hero-mute">Archive</span>
            <span className="h-px flex-1 bg-white/[0.12]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] tabular-nums text-hero-mute">
              {String(archive.length).padStart(2, '0')}
            </span>
          </div>
          <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
            {archive.map((p) => (
              <li key={p.id} className="group flex items-baseline justify-between gap-4 border-b border-white/[0.08] py-4">
                <span className="font-display text-[1.15rem] font-medium text-hero-ink transition-colors group-hover:text-hero-hot">
                  {p.title.split(' - ')[0].split(':')[0]}
                </span>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-hero-mute">
                  {p.tags?.[0]} · {p.year || '—'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
