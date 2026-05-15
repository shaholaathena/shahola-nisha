import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { caseStudy } from '../../data/portfolio'

const EASE = [0.22, 1, 0.36, 1]
const VP = { once: true, margin: '-80px' }

export default function CaseStudyPreview() {
  return (
    <section id="case-study" className="py-28 lg:py-36 border-t border-border-subtle relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 70% at 80% 50%, rgba(0,0,0,0.04) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-px w-6 bg-zinc-800/50" />
              <span className="text-xs font-semibold text-zinc-500 tracking-widest uppercase">Case Study</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={VP}
                transition={{ duration: 0.75, ease: EASE, delay: 0.07 }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-primary tracking-tight leading-[1.1]"
              >
                Featured deep-dive.
              </motion.h2>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.5, ease: EASE, delay: 0.13 }}
            className="flex items-center gap-3"
          >
            <span className="text-xs font-mono text-ink-muted">{caseStudy.duration} engagement</span>
            <div className="h-px w-12 bg-zinc-200" />
            <span className="text-xs font-mono text-ink-muted">{caseStudy.year}</span>
          </motion.div>
        </div>

        {/* Teaser card */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={VP}
          transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
          className="card-surface overflow-hidden"
        >
          {/* Hero image */}
          <div className="relative overflow-hidden bg-zinc-900" style={{ height: 320 }}>
            <img
              src="https://shaholanisha.xyz/wp-content/uploads/2026/04/krishi-scaled.png"
              alt="myBKB App screens"
              className="w-full h-full object-cover object-center opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Left — challenge + outcome + process */}
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

            {/* Right — metrics + CTA */}
            <div className="p-8 md:p-10 flex flex-col">
              <div className="text-[10px] font-semibold text-ink-muted uppercase tracking-widest mb-6">Key Results</div>
              <div className="space-y-5 flex-1">
                {caseStudy.metrics.map((m) => (
                  <div key={m.label} className="border-b border-border-subtle pb-5 last:border-0 last:pb-0">
                    <div className="text-2xl font-display font-semibold text-ink-primary tracking-tight mb-1">{m.value}</div>
                    <div className="text-xs text-ink-muted">{m.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-border-subtle">
                <Link
                  to="/case-study/bkb-mobile"
                  className="group flex items-center justify-center gap-2 text-sm font-semibold text-zinc-900 bg-white border border-zinc-800/20 shadow-sm hover:shadow-md px-5 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
                >
                  View full case study
                  <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
