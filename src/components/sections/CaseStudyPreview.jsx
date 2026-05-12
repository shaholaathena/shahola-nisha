import { motion } from 'framer-motion'
import { caseStudy } from '../../data/portfolio'
import ImageShowcase from '../ui/ImageShowcase'

export default function CaseStudyPreview() {
  return (
    <section id="case-study" className="py-28 lg:py-36 border-t border-border-subtle relative overflow-hidden">
      {/* Background treatment */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 70% at 80% 50%, rgba(30,58,120,0.1) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-6 bg-zinc-800/50" />
              <span className="text-xs font-semibold text-zinc-500 tracking-widest uppercase">Case Study</span>
            </div>
            <h2 className="font-display text-4xl sm:text-ink-faintxl font-semibold text-ink-primary tracking-tight leading-tight max-w-lg">
              Featured deep-dive.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <span className="text-xs font-mono text-ink-muted">{caseStudy.duration} engagement</span>
            <div className="h-px w-12 bg-white/[0.1]" />
            <span className="text-xs font-mono text-ink-muted">{caseStudy.year}</span>
          </motion.div>
        </div>

        {/* Main case study card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="card-surface overflow-hidden"
        >
          {/* Interactive product showcase */}
          <div className="border-b border-border-subtle">
            <ImageShowcase />
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Problem + Outcome */}
            <div className="lg:col-span-2 p-8 md:p-10 border-r border-border-subtle">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="text-[10px] font-semibold text-ink-muted uppercase tracking-widest mb-3">The Challenge</div>
                  <p className="text-sm text-ink-secondary leading-relaxed">{caseStudy.challenge}</p>
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-ink-muted uppercase tracking-widest mb-3">The Outcome</div>
                  <p className="text-sm text-ink-secondary leading-relaxed">{caseStudy.outcome}</p>
                </div>
              </div>

              {/* Process phases */}
              <div>
                <div className="text-[10px] font-semibold text-ink-faint uppercase tracking-widest mb-4">Process</div>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.phases.map((phase, i) => (
                    <div key={phase} className="flex items-center gap-2">
                      <span className="text-xs text-ink-muted">{phase}</span>
                      {i < caseStudy.phases.length - 1 && (
                        <span className="text-ink-faint" aria-hidden="true">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics sidebar */}
            <div className="p-8 md:p-10">
              <div className="text-[10px] font-semibold text-ink-muted uppercase tracking-widest mb-6">Key Results</div>
              <div className="space-y-5">
                {caseStudy.metrics.map((m) => (
                  <div key={m.label} className="border-b border-border-subtle pb-5 last:border-0 last:pb-0">
                    <div className="text-ink-faintxl font-display font-semibold text-ink-primary tracking-tight mb-1">
                      {m.value}
                    </div>
                    <div className="text-xs text-ink-muted">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 pt-6 border-t border-border-subtle">
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                  className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors font-medium"
                >
                  Request full case study
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
