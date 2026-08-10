import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../../data/portfolio'
import MerchantCoverQR from '../ui/MerchantCoverQR'

const featuredIds = ['bkb-internet', 'merchant-onboarding', 'bkb-mobile']
const EASE = [0.22, 1, 0.36, 1]

const copy = {
  'bkb-internet': {
    title: 'Making complex banking tasks feel simpler',
    meta: 'Internet Banking · Product Design · Shipped',
    description: 'Redesigning core banking journeys around the tasks people actually need to complete — transfers, bills, accounts and beneficiaries.',
  },
  'merchant-onboarding': {
    title: 'Designing one merchant experience for multiple banks',
    meta: 'Bangla QR · Product UX · Design System · Multi-bank',
    description: 'A scalable merchant experience designed to adapt across bank brands without rebuilding the product from scratch.',
  },
  'bkb-mobile': {
    title: 'Turning everyday banking into clearer mobile flows',
    meta: 'Mobile Banking · UX/UI · Product Design',
    description: 'Simplifying a broad set of banking services into a more understandable and usable mobile experience.',
  },
}

function Preview({ project }) {
  if (project.coverQR) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#eeeae3] p-8 sm:p-10">
        <div className="w-[46%] max-w-[210px] drop-shadow-[0_28px_45px_rgba(0,0,0,0.14)]">
          <MerchantCoverQR />
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-[#eeeae3] p-6 sm:p-9">
      <img
        src={project.image}
        alt=""
        className="h-full w-full object-contain transition-transform duration-700"
      />
    </div>
  )
}

export default function FeaturedWork() {
  const [activeId, setActiveId] = useState(null)
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const featured = featuredIds.map((id) => projects.find((project) => project.id === id)).filter(Boolean)
  const activeProject = featured.find((project) => project.id === activeId)

  const handleMove = (event) => {
    setPointer({ x: event.clientX + 28, y: event.clientY + 28 })
  }

  return (
    <section id="work" className="relative bg-surface-base py-28 lg:py-40">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <header className="mb-20 border-t border-ink-primary/15 pt-5 lg:mb-28">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">01 / Selected work</p>
              <h2 className="mt-6 max-w-4xl font-display text-[clamp(4rem,9vw,9rem)] font-medium leading-[0.82] tracking-[-0.075em] text-ink-primary">
                Selected<br />work.
              </h2>
            </div>
            <p className="max-w-[300px] pb-1 text-sm leading-6 text-ink-muted sm:text-right">
              A selection of products, systems and experiences I’ve worked on across banking and payments.
            </p>
          </div>
        </header>

        <div className="relative border-t border-ink-primary/15" onMouseMove={handleMove}>
          {featured.map((project, index) => {
            const item = copy[project.id]
            const active = activeId === project.id

            return (
              <a
                key={project.id}
                href={project.link || `/case-study/${project.id}`}
                onMouseEnter={() => setActiveId(project.id)}
                onMouseLeave={() => setActiveId(null)}
                onFocus={() => setActiveId(project.id)}
                className="group relative block border-b border-ink-primary/15 py-9 sm:py-12 lg:py-14"
              >
                <div className="grid grid-cols-[42px_minmax(0,1fr)_auto] items-start gap-4 sm:grid-cols-[56px_minmax(0,1fr)_180px] sm:gap-6 lg:grid-cols-[70px_minmax(0,1fr)_240px] lg:gap-8">
                  <span className="pt-2 font-mono text-[10px] tracking-[0.16em] text-ink-muted">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div>
                    <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted sm:mb-4">
                      {item.meta}
                    </div>
                    <h3 className="max-w-4xl font-display text-[clamp(2rem,4.7vw,5.2rem)] font-medium leading-[0.92] tracking-[-0.055em] text-ink-primary transition-transform duration-500 ease-out group-hover:translate-x-1">
                      {item.title}
                    </h3>
                    <AnimatePresence initial={false}>
                      {active && (
                        <motion.p
                          initial={{ opacity: 0, height: 0, y: -8 }}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -8 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="mt-4 max-w-2xl overflow-hidden text-sm leading-6 text-ink-muted sm:text-base"
                        >
                          {item.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex justify-end pt-1">
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted transition-colors duration-300 group-hover:text-ink-primary">
                      {project.year || 'Case study'}
                    </span>
                    <span className="ml-4 text-base opacity-30 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">↗</span>
                  </div>
                </div>
              </a>
            )
          })}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted">Hover a project to preview</span>
          <a href="#about" className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink-primary underline underline-offset-8">About me ↗</a>
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 4 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="pointer-events-none fixed z-50 hidden h-[260px] w-[370px] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.16)] lg:block"
            style={{ left: pointer.x, top: pointer.y }}
          >
            <Preview project={activeProject} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
