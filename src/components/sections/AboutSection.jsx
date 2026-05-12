import { motion } from 'framer-motion'
import { meta, experience } from '../../data/portfolio'
import Timeline from '../ui/Timeline'

const skills = [
  { category: 'Design', items: ['Figma', 'Prototyping', 'Visual Design', 'User Flows', 'Usability Research'] },
  { category: 'Product', items: ['Problem Solving', 'Research', 'Mobile App UX', 'Web Application UX', 'Design Handoff'] },
  { category: 'Domain', items: ['Mobile Banking', 'Healthcare', 'Education LMS', 'Social Media', 'Merchant Services'] },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-28 lg:py-36 border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-6 bg-zinc-800/50" />
            <span className="text-xs font-semibold text-zinc-500 tracking-widest uppercase">Background</span>
          </div>
          <h2 className="font-display text-4xl sm:text-ink-faintxl font-semibold text-ink-primary tracking-tight leading-tight">
            Who I am.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left: Bio + Skills */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-10"
          >
            {/* Bio */}
            <div>
              <p className="text-base text-ink-secondary leading-relaxed mb-4">
                {meta.bio}
              </p>
              <p className="text-sm text-ink-muted leading-relaxed">
                Currently working as a UX Analyst at SSL Wireless since April 2020, with 7+ years of experience across UX and product design.
              </p>
            </div>

            {/* Status */}
            <div className="card-surface p-5 flex items-center gap-4">
              <div className="w-9 h-9 rounded-md bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-medium text-ink-primary">{meta.availability}</div>
                <div className="text-xs text-ink-muted">Select engagements · {meta.location}</div>
              </div>
            </div>

            {/* Skills grid */}
            <div className="space-y-6">
              {skills.map(({ category, items }) => (
                <div key={category}>
                  <div className="text-[10px] font-semibold text-ink-faint uppercase tracking-widest mb-3">
                    {category}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-2.5 py-1 rounded-md text-ink-secondary border border-border-default bg-surface-1 hover:border-border-strong hover:text-ink-primary transition-all duration-150 cursor-default"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Experience Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-semibold text-ink-primary font-display">Experience</h3>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="text-xs text-ink-muted hover:text-zinc-500 transition-colors"
              >
                Request full CV →
              </a>
            </div>
            <Timeline items={experience} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
