import { motion } from 'framer-motion'
import { projects } from '../../data/portfolio'
import ProjectCard from '../ui/ProjectCard'

const EASE = [0.22, 1, 0.36, 1]
const VP = { once: true, margin: '-80px' }

export default function FeaturedWork() {
  return (
    <section id="work" className="py-32 lg:py-40 relative bg-surface-1">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-grid-subtle opacity-50" />
         <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-zinc-800/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-50 border border-zinc-100 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 animate-pulse" />
              <span className="text-[11px] font-semibold text-zinc-900 tracking-widest uppercase">Selected Work</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: 32, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={VP}
                transition={{ duration: 0.75, ease: EASE, delay: 0.07 }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-primary tracking-tight leading-[1.1]"
              >
                Products shipped.
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.55, ease: EASE, delay: 0.13 }}
            className="text-base text-ink-muted max-w-sm leading-relaxed sm:text-right"
          >
            A curated selection of mobile banking, healthcare, education, and social platform experiences.
          </motion.p>
        </div>

        {/* Grid — ProjectCard handles its own entrance animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View all CTA */}
     
      </div>
    </section>
  )
}
