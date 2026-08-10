import { motion } from 'framer-motion'
import { projects } from '../../data/portfolio'
import MerchantCoverQR from '../ui/MerchantCoverQR'

const EASE = [0.22, 1, 0.36, 1]
const VP = { once: true, margin: '-80px' }

const featuredIds = ['bkb-internet', 'merchant-onboarding', 'bkb-mobile']

function ProjectVisual({ project }) {
  if (project.coverQR) {
    return (
      <div className="h-full w-full flex items-center justify-center overflow-hidden bg-[#f3f1ec]">
        <div className="w-[38%] min-w-[145px] max-w-[210px] translate-y-8 transition-transform duration-700 group-hover:-translate-y-1 group-hover:scale-[1.035]">
          <MerchantCoverQR />
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full overflow-hidden bg-[#f3f1ec] flex items-center justify-center p-5 sm:p-8">
      <img
        src={project.image}
        alt=""
        className="h-full w-full object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        loading="lazy"
      />
    </div>
  )
}

export default function FeaturedWork() {
  const featured = featuredIds
    .map((id) => projects.find((project) => project.id === id))
    .filter(Boolean)

  return (
    <section id="work" className="relative bg-surface-base py-28 lg:py-36">
      <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
        <div className="mb-16 flex flex-col gap-8 border-t border-ink-primary/15 pt-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.55, ease: EASE }}
              className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted"
            >
              01 / Selected work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.7, ease: EASE, delay: 0.06 }}
              className="mt-4 max-w-3xl font-display text-5xl font-medium leading-[0.98] tracking-[-0.055em] text-ink-primary sm:text-6xl lg:text-[5.5rem]"
            >
              Things I’ve made.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.55, ease: EASE, delay: 0.12 }}
            className="max-w-xs pt-1 text-sm leading-6 text-ink-muted sm:text-right"
          >
            Banking, payments and digital products — designed for people who have better things to do than figure out software.
          </motion.div>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          {featured.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.7, ease: EASE, delay: index * 0.08 }}
              className={`group ${index === 0 ? 'lg:col-span-7' : index === 1 ? 'lg:col-span-5 lg:pt-24' : 'lg:col-span-7 lg:col-start-6'}`}
            >
              <a href={project.link || `/case-study/${project.id}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#f3f1ec]">
                  <ProjectVisual project={project} />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" />
                </div>

                <div className="mt-5 flex items-start justify-between gap-6 border-t border-ink-primary/15 pt-4">
                  <div className="min-w-0">
                    <div className="mb-2 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-ink-muted">
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <span>·</span>
                      <span>{project.tags?.[0] || project.type}</span>
                    </div>
                    <h3 className="font-display text-2xl font-medium tracking-[-0.035em] text-ink-primary sm:text-3xl">
                      {project.title.replace(' - Internet Banking', '').replace(' - myBKB App', '')}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-ink-muted">
                      {project.description}
                    </p>
                  </div>

                  <span className="mt-1 shrink-0 text-xs font-medium uppercase tracking-[0.16em] text-ink-primary transition-transform duration-300 group-hover:translate-x-1">
                    View case study ↗
                  </span>
                </div>
              </a>
            </motion.article>
          ))}
        </div>

        <div className="mt-20 flex items-center justify-between border-t border-ink-primary/15 pt-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">More work, more experiments</span>
          <a href="#about" className="text-xs font-medium uppercase tracking-[0.16em] text-ink-primary underline underline-offset-8">
            About me ↗
          </a>
        </div>
      </div>
    </section>
  )
}
