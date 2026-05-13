import { motion } from 'framer-motion'
import { projects } from '../../data/portfolio'
import ProjectCard from '../ui/ProjectCard'

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-50 border border-zinc-100 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 animate-pulse" />
              <span className="text-[11px] font-semibold text-zinc-900 tracking-widest uppercase">Selected Work</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-primary tracking-tight leading-[1.1]">
              Products shipped.
            </h2>
          </div>
          <p className="text-base text-ink-muted max-w-sm leading-relaxed sm:text-right">
            A curated selection of mobile banking, healthcare, education, and social platform experiences.
          </p>
        </motion.div>

        {/* Two equal size grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 bg-white border border-zinc-100 shadow-sm hover:shadow-md px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-1"
          >
            Request full case studies
            <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
