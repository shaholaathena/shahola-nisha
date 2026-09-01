import { motion } from 'framer-motion'
import { projects } from '../../data/portfolio'
import ProjectCard from '../ui/ProjectCard'

const EASE = [0.16, 1, 0.3, 1]
const VP = { once: true, margin: '-80px' }

export default function FeaturedWork() {
  return (
    <section id="work" className="py-24 lg:py-32 relative bg-surface-base">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">

        {/* ── Masthead rule ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VP}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex items-center justify-between border-t border-ink-primary pt-4 mb-12 lg:mb-16"
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-ink-primary tabular-nums">
            02 / Selected Work
          </span>
          <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-ink-muted tabular-nums">
            {String(projects.length).padStart(2, '0')} Projects
          </span>
        </motion.div>

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 lg:mb-16">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={VP}
              transition={{ duration: 0.85, ease: EASE }}
              className="font-display font-bold text-ink-primary tracking-[-0.03em] leading-[0.95] text-[clamp(2.75rem,6vw,5rem)]"
            >
              Products shipped.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
            className="text-[15px] text-ink-muted max-w-sm leading-relaxed lg:text-right lg:pb-2"
          >
            Mobile banking, healthcare, payments, e-commerce, education, and
            enterprise experiences — research through to shipped product.
          </motion.p>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
