import { motion } from 'framer-motion'
import { projects } from '../../data/portfolio'
import MerchantCoverQR from '../ui/MerchantCoverQR'

const EASE = [0.22, 1, 0.36, 1]
const VP = { once: true, margin: '-100px' }
const featuredIds = ['bkb-internet', 'merchant-onboarding', 'bkb-mobile']

function ProjectVisual({ project }) {
  if (project.coverQR) {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#eeeae3]">
        <div className="absolute left-[12%] top-[12%] text-[10px] uppercase tracking-[0.22em] text-ink-muted">Merchant product</div>
        <div className="w-[32%] min-w-[150px] max-w-[230px] translate-y-10 transition-transform duration-700 ease-out group-hover:-translate-y-1 group-hover:scale-[1.035]">
          <MerchantCoverQR />
        </div>
        <div className="absolute bottom-[9%] right-[10%] max-w-[150px] text-right font-display text-sm italic leading-5 text-ink-muted">
          One system.<br />Multiple banks.
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#eeeae3]">
      <img
        src={project.image}
        alt=""
        className="h-full w-full object-contain object-center px-8 py-10 transition-transform duration-1000 ease-out group-hover:scale-[1.035] sm:px-14 sm:py-14"
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" />
    </div>
  )
}

function Project({ project, index }) {
  const reverse = index % 2 === 1
  const label = project.id === 'merchant-onboarding' ? 'BANGLA QR · PLATFORM' : project.id === 'bkb-mobile' ? 'MOBILE BANKING' : 'INTERNET BANKING'
  const title = project.id === 'bkb-internet' ? 'Bangladesh\nKrishi Bank' : project.id === 'merchant-onboarding' ? 'Bangla QR\nMerchant App' : 'myBKB\nMobile Banking'
  const intro = project.id === 'merchant-onboarding'
    ? 'One merchant experience, built to travel across multiple banks and brands.'
    : project.id === 'bkb-internet'
      ? 'A clearer way through complex banking tasks, from transfers to everyday account management.'
      : 'A mobile banking experience that turns a large service set into simple, confident flows.'

  return (
    <motion.article
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.8, ease: EASE }}
      className="group border-t border-ink-primary/15 py-14 sm:py-20 lg:py-28"
    >
      <a href={project.link || `/case-study/${project.id}`} className="block">
        <div className={`grid items-center gap-12 lg:grid-cols-12 lg:gap-16 ${reverse ? '' : ''}`}>
          <div className={`lg:col-span-4 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
            <div className="mb-10 flex items-start justify-between lg:block">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">{String(index + 1).padStart(2, '0')}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted lg:mt-4 lg:block">{label}</span>
            </div>

            <h3 className="whitespace-pre-line font-display text-[clamp(3.5rem,6vw,6.5rem)] font-medium leading-[0.88] tracking-[-0.065em] text-ink-primary">
              {title}
            </h3>

            <p className="mt-8 max-w-sm text-base leading-7 text-ink-muted">{intro}</p>

            <div className="mt-10 flex items-center gap-6">
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-primary underline decoration-ink-primary/30 underline-offset-8 transition-all group-hover:decoration-ink-primary">
                View case study ↗
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">{project.year}</span>
            </div>
          </div>

          <div className={`lg:col-span-8 ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
            <div className="relative aspect-[1.38/1] overflow-hidden">
              <ProjectVisual project={project} />
              <div className="pointer-events-none absolute bottom-5 left-5 font-mono text-[9px] uppercase tracking-[0.18em] text-black/45">
                Selected project · {String(index + 1).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>
      </a>
    </motion.article>
  )
}

export default function FeaturedWork() {
  const featured = featuredIds.map((id) => projects.find((project) => project.id === id)).filter(Boolean)

  return (
    <section id="work" className="relative bg-surface-base py-28 lg:py-40">
      <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
        <header className="mb-20 grid gap-8 border-t border-ink-primary/15 pt-5 sm:grid-cols-12 lg:mb-28">
          <div className="sm:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">01 / Selected work</p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.75, ease: EASE }}
              className="mt-5 font-display text-[clamp(4rem,8vw,8.5rem)] font-medium leading-[0.86] tracking-[-0.07em] text-ink-primary"
            >
              Things I’ve<br />made.
            </motion.h2>
          </div>
          <div className="sm:col-span-4 sm:flex sm:items-end sm:justify-end">
            <p className="max-w-xs text-sm leading-6 text-ink-muted sm:text-right">
              Banking, payments and digital products — designed to make complicated systems feel obvious.
            </p>
          </div>
        </header>

        <div>
          {featured.map((project, index) => <Project key={project.id} project={project} index={index} />)}
        </div>

        <div className="flex items-center justify-between border-t border-ink-primary/15 pt-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">03 / More work</span>
          <a href="#about" className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-primary underline underline-offset-8">About me ↗</a>
        </div>
      </div>
    </section>
  )
}
