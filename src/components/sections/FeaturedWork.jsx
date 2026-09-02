import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { projects } from '../../data/portfolio'
import MerchantCoverQR from '../ui/MerchantCoverQR'

const EASE = [0.22, 1, 0.36, 1]
const VP = { once: true, margin: '-80px' }

// The three flagship case studies, foregrounded. Editorial copy lives here so
// the list reads as a curated index, not a data dump of raw project titles.
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
      <div className="flex h-full w-full items-center justify-center bg-surface-2 p-8">
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
    <div className="flex h-full w-full flex-col justify-between bg-ink-primary p-6 text-paper">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/50">Case study</span>
      <span className="font-display text-[2rem] font-semibold leading-none tracking-tight">{project.company}</span>
    </div>
  )
}

export default function FeaturedWork() {
  const reduce = useReducedMotion()
  const [activeId, setActiveId] = useState(null)

  // Cursor-following preview position (desktop only).
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 350, damping: 32, mass: 0.6 })
  const py = useSpring(my, { stiffness: 350, damping: 32, mass: 0.6 })

  const featured = FEATURED.map((f) => ({ ...f, project: projects.find((p) => p.id === f.id) })).filter((f) => f.project)
  const archive = projects.filter((p) => !FEATURED.some((f) => f.id === p.id))
  const active = featured.find((f) => f.id === activeId)?.project

  const handleMove = (e) => { mx.set(e.clientX + 24); my.set(e.clientY - 130) }

  return (
    <section id="work" className="relative bg-surface-base py-24 lg:py-36" onMouseMove={handleMove}>
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">

        {/* ── Masthead ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VP}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14 flex items-end justify-between border-t border-ink-primary pt-4 lg:mb-20"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted tabular-nums">
            Selected Work
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted tabular-nums">
            {String(featured.length).padStart(2, '0')} Case Studies
          </span>
        </motion.div>

        {/* ── The index list ── */}
        <div className="border-t border-border-default">
          {featured.map((f, i) => {
            const on = activeId === f.id
            return (
              <Link
                key={f.id}
                to={f.project.link || `/case-study/${f.id}`}
                onMouseEnter={() => setActiveId(f.id)}
                onMouseLeave={() => setActiveId(null)}
                onFocus={() => setActiveId(f.id)}
                onBlur={() => setActiveId(null)}
                className="group relative block border-b border-border-default py-8 sm:py-11 lg:py-14"
              >
                <div className="grid grid-cols-[2.5rem_1fr] items-start gap-x-4 sm:grid-cols-[4rem_1fr_auto] sm:gap-x-8">
                  {/* index */}
                  <span className="pt-2.5 font-mono text-[11px] tracking-[0.16em] text-accent tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* title + meta */}
                  <div className="min-w-0">
                    <h3 className="font-display text-[clamp(1.9rem,4.6vw,4.25rem)] font-medium leading-[0.98] tracking-[-0.02em] text-ink-primary transition-transform duration-500 ease-out sm:group-hover:translate-x-2">
                      {f.title.split('\n').map((line, li) => (
                        <span key={li} className="block">{line}</span>
                      ))}
                    </h3>
                    <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted transition-colors duration-300 group-hover:text-ink-secondary">
                      {f.meta}
                    </div>
                    {/* Inline thumbnail — the reveal path below lg, where the
                        cursor-following preview does not run (touch / tablet). */}
                    <div className="mt-5 h-40 w-full max-w-xs overflow-hidden rounded-sm lg:hidden">
                      <Preview project={f.project} />
                    </div>
                  </div>

                  {/* year + arrow */}
                  <div className="col-start-2 mt-3 flex items-center gap-4 sm:col-start-3 sm:mt-2 sm:justify-end">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                      {f.project.year || 'Case study'}
                    </span>
                    <span className={`text-lg text-accent transition-all duration-300 ${on ? 'translate-x-1 opacity-100' : 'opacity-40'}`} aria-hidden="true">↗</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* ── Archive: the lighter projects, as a compact typographic list ── */}
        <div className="mt-20 lg:mt-28">
          <div className="mb-8 flex items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">Archive</span>
            <span className="h-px flex-1 bg-border-default" />
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted tabular-nums">
              {String(archive.length).padStart(2, '0')}
            </span>
          </div>
          <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
            {archive.map((p) => (
              <li key={p.id} className="group flex items-baseline justify-between gap-4 border-b border-border-subtle py-4">
                <span className="font-display text-[1.15rem] font-medium text-ink-primary transition-colors group-hover:text-accent">
                  {p.title.split(' - ')[0].split(':')[0]}
                </span>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                  {p.tags?.[0]} · {p.year || '—'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Cursor-following preview (desktop, fine-pointer only) ── */}
      {!reduce && (
        <AnimatePresence>
          {active && (
            <motion.div
              key={activeId}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3, ease: EASE }}
              style={{ x: px, y: py }}
              className="pointer-events-none fixed left-0 top-0 z-40 hidden h-[260px] w-[360px] overflow-hidden rounded-sm shadow-[0_30px_70px_rgba(28,24,19,0.22)] lg:block"
            >
              <Preview project={active} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  )
}
