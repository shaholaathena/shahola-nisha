import { motion } from 'framer-motion'
import { meta } from '../../data/portfolio'

export default function CTASection() {
  return (
    <section id="contact" className="py-28 lg:py-40 border-t border-border-subtle relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(30,58,120,0.12) 0%, transparent 70%)',
        }}
      />
      <div className="absolute inset-0 bg-grid-subtle opacity-60 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <div className="h-px w-8 bg-zinc-800/40" />
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium text-green-400/80 tracking-wide">Based in Dhaka, Bangladesh</span>
          </div>
          <div className="h-px w-8 bg-zinc-800/40" />
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        >
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-ink-primary tracking-tight leading-[1.06] mb-6 text-balance">
            Let's connect and create useful products.
          </h2>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-base sm:text-lg text-ink-muted mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          I design clear, thoughtful experiences for mobile banking, healthcare, education, social platforms,
          and web applications through research, visual design, and prototyping.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={meta.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 px-7 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium rounded-md transition-all duration-200 hover:shadow-xl hover:shadow-zinc-800/25 min-w-[200px] justify-center"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M1 5L8 9.5L15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Connect on LinkedIn
          </a>
          <a
            href="#work"
            onClick={(e) => { e.preventDefault(); document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-ink-secondary border border-border-strong rounded-md hover:border-border-strong hover:text-ink-primary transition-all duration-200"
          >
            Browse work first
          </a>
        </motion.div>

        {/* Meta info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-16 pt-10 border-t border-border-subtle flex flex-wrap items-center justify-center gap-6 text-xs text-ink-faint font-mono"
        >
          <span>{meta.location}</span>
          <div className="w-1 h-1 rounded-full bg-black/[0.1]" aria-hidden="true" />
          <span>Usually replies within 24h</span>
          <div className="w-1 h-1 rounded-full bg-black/[0.1]" aria-hidden="true" />
          <span>NDA available</span>
        </motion.div>
      </div>
    </section>
  )
}
