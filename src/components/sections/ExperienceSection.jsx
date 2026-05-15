import { motion } from 'framer-motion'
import { experience } from '../../data/portfolio'

const EASE = [0.22, 1, 0.36, 1]
const VP = { once: true, margin: '-80px' }

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 lg:py-24 border-t border-border-subtle bg-surface-base">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-px w-6 bg-zinc-800/50" />
              <span className="text-xs font-semibold text-zinc-500 tracking-widest uppercase">Career</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={VP}
                transition={{ duration: 0.75, ease: EASE, delay: 0.07 }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-primary tracking-tight leading-[1.1]"
              >
                Experience.
              </motion.h2>
            </div>
          </div>
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.5, ease: EASE, delay: 0.14 }}
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="text-sm font-medium text-zinc-400 hover:text-zinc-700 transition-colors self-end sm:self-auto"
          >
            Request full CV →
          </motion.a>
        </div>

        {/* Experience rows */}
        <div className="divide-y divide-zinc-100">
          {experience.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={VP}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              className="py-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:gap-24 items-start group"
            >
              <div>
                {/* Role + Company */}
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
                  <span className="font-display text-xl sm:text-2xl font-semibold text-zinc-900 tracking-tight">
                    {item.role}
                  </span>
                  <span className="text-zinc-300">at</span>
                  <span className="font-display text-xl sm:text-2xl font-light text-zinc-500 tracking-tight">
                    {item.company}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl mb-5">
                  {item.description}
                </p>

                {/* Highlights */}
                {item.highlights && (
                  <div className="flex flex-wrap gap-2">
                    {item.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-[11px] font-medium text-zinc-500 bg-zinc-50 border border-zinc-100 px-3 py-1 rounded-full"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Period + Location */}
              <div className="lg:text-right flex-shrink-0 flex lg:flex-col gap-3 lg:gap-1.5">
                <span className="text-sm font-mono text-zinc-400">{item.period}</span>
                <span className="text-sm text-zinc-400">{item.location}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
