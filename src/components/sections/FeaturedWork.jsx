import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../../data/portfolio'
import MerchantCoverQR from '../ui/MerchantCoverQR'

const featuredIds = ['bkb-internet', 'merchant-onboarding', 'bkb-mobile']
const EASE = [0.22, 1, 0.36, 1]

function ProjectPreview({ project }) {
  if (project.coverQR) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#eeeae3] p-10">
        <div className="w-[48%] max-w-[220px] drop-shadow-[0_24px_40px_rgba(0,0,0,0.12)]">
          <MerchantCoverQR />
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-[#eeeae3] p-7 sm:p-10">
      <img
        src={project.image}
        alt=""
        className="h-full w-full object-contain transition-transform duration-700 ease-out"
      />
    </div>
  )
}

function projectMeta(project) {
  if (project.id === 'merchant-onboarding') return 'Fintech · Product UX · Design System · 2026'
  if (project.id === 'bkb-mobile') return 'Mobile Banking · Product Design · 2024'
  return 'Internet Banking · Product Design · 2024'
}

function projectDescription(project) {
  if (project.id === 'merchant-onboarding') return 'One merchant experience, designed to scale across multiple banks and brands.'
  if (project.id === 'bkb-mobile') return 'A simpler mobile banking experience for everyday financial tasks.'
  return 'Making complex banking tasks easier to understand, navigate and complete.'
}

export default function FeaturedWork() {
  const [activeId, setActiveId] = useState(featuredIds[0])
  const featured = featuredIds.map((id) => projects.find((project) => project.id === id)).filter(Boolean)
  const activeProject = featured.find((project) => project.id === activeId) || featured[0]

  return (
    <section id="work" className="relative bg-surface-base py-28 lg:py-40">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <header className="mb-16 flex flex-col justify-between gap-8 border-t border-ink-primary/15 pt-5 sm:flex-row sm:items-end lg:mb-20">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">01 / Selected work</p>
            <h2 className="mt-5 max-w-3xl font-display text-[clamp(3.5rem,7vw,7rem)] font-medium leading-[0.88] tracking-[-0.065em] text-ink-primary">
              Work worth<br />looking at.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-ink-muted sm:text-right">
            A few products I’ve helped shape across banking, payments and digital services.
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.82fr)] lg:gap-20">
          <div className="border-t border-ink-primary/15">
            {featured.map((project, index) => {
              const active = project.id === activeId
              const title = project.id === 'bkb-internet'
                ? 'Bangladesh Krishi Bank'
                : project.id === 'merchant-onboarding'
                  ? 'Bangla QR Merchant App'
                  : 'myBKB Mobile Banking'

              return (
                <a
                  key={project.id}
                  href={project.link || `/case-study/${project.id}`}
                  onMouseEnter={() => setActiveId(project.id)}
                  onFocus={() => setActiveId(project.id)}
                  className="group block border-b border-ink-primary/15 py-8 sm:py-10"
                >
                  <div className="flex items-start gap-5 sm:gap-8">
                    <span className="pt-2 font-mono text-[10px] tracking-[0.16em] text-ink-muted">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted">
                        <span>{projectMeta(project)}</span>
                      </div>
                      <div className="flex items-start justify-between gap-6">
                        <h3 className={`font-display text-[clamp(2rem,4vw,4.25rem)] font-medium leading-[0.95] tracking-[-0.055em] transition-colors duration-300 ${active ? 'text-ink-primary' : 'text-ink-primary/45 group-hover:text-ink-primary'}`}>
                          {title}
                        </h3>
                        <span className={`hidden pt-2 text-lg transition-transform duration-300 sm:block ${active ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'} group-hover:translate-x-0 group-hover:opacity-100`}>
                          ↗
                        </span>
                      </div>
                      <AnimatePresence initial={false}>
                        {active && (
                          <motion.p
                            initial={{ opacity: 0, height: 0, y: -8 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -8 }}
                            transition={{ duration: 0.35, ease: EASE }}
                            className="mt-4 max-w-lg overflow-hidden text-sm leading-6 text-ink-muted"
                          >
                            {projectDescription(project)}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>

          <div className="hidden lg:sticky lg:top-28 lg:block lg:h-[520px]">
            <AnimatePresence mode="wait">
              <motion.a
                key={activeProject.id}
                href={activeProject.link || `/case-study/${activeProject.id}`}
                initial={{ opacity: 0, scale: 0.97, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -10 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="group block h-full"
              >
                <div className="relative h-[460px] overflow-hidden bg-[#eeeae3]">
                  <ProjectPreview project={activeProject} />
                  <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-6">
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/50">
                      Hover a project to preview
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-black/70">
                      Open ↗
                    </span>
                  </div>
                </div>
              </motion.a>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-ink-primary/15 pt-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">More projects in the archive</span>
          <a href="#about" className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-primary underline underline-offset-8">
            About me ↗
          </a>
        </div>
      </div>
    </section>
  )
}