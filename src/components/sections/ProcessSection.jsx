import { motion } from 'framer-motion'
import { process } from '../../data/portfolio'
import ProcessIndicator from '../ui/ProcessIndicator'

export default function ProcessSection() {
  return (
    <section id="process" className="py-28 lg:py-36 border-t border-border-subtle relative overflow-hidden">
      {/* Dot texture bg */}
      <div className="absolute inset-0 bg-dot-subtle opacity-50 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-6 bg-zinc-800/50" />
              <span className="text-xs font-semibold text-zinc-500 tracking-widest uppercase">Process</span>
            </div>
            <h2 className="font-display text-4xl sm:text-ink-faintxl font-semibold text-ink-primary tracking-tight leading-tight">
              How I work.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm text-ink-muted max-w-sm leading-relaxed lg:text-right"
          >
            A structured, evidence-based approach to complex UX problems. Rigorous process, not rigid process.
          </motion.p>
        </div>

        {/* Process grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          {process.map((phase, index) => (
            <ProcessIndicator
              key={phase.phase}
              phase={phase}
              index={index}
              isLast={index === process.length - 1}
            />
          ))}
        </div>

        {/* Philosophy callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 card-surface p-8 md:p-10"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-8 rounded-full bg-zinc-800/60" />
              <span className="text-xs font-semibold text-ink-muted uppercase tracking-widest">Design Philosophy</span>
            </div>
            <blockquote className="font-display text-xl sm:text-ink-faintxl text-ink-primary font-medium leading-relaxed tracking-tight mb-6">
              "Good UX at enterprise scale isn't about making things beautiful. It's about reducing cognitive load under real operational pressure."
            </blockquote>
            <p className="text-sm text-ink-muted">
              The most impactful work I do happens before any pixels are placed — in systems thinking, information architecture, and understanding the real failure modes of complex workflows.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
