import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { stats } from '../../data/portfolio'
import heroImg from '../../assets/hero.png'
import MagneticButton from '../ui/MagneticButton'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1]
const EASE_IN_OUT_CIRC = [0.76, 0, 0.24, 1]

const stagger = {
  animate: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
}

// Per-line text reveal: text slides up from behind an overflow-hidden mask.
const lineReveal = (delay = 0) => ({
  initial: { y: '110%' },
  animate: { y: 0, transition: { duration: 0.95, delay, ease: EASE_OUT_EXPO } },
})

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 70])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-surface-base pt-28 pb-16"
    >
      {/* Faint ambient wash — kept extremely subtle for an editorial ground. */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle 700px at 78% 30%, rgba(0,0,0,0.035) 0%, transparent 62%)',
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full"
      >
        {/* ── Masthead rule: index + role + place, like a magazine header ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          className="flex items-center justify-between border-t border-ink-primary pt-4 mb-14 lg:mb-20"
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-ink-primary">
            Portfolio — Alimoon Nisha
          </span>
          <span className="hidden sm:block text-[11px] font-mono uppercase tracking-[0.24em] text-ink-muted">
            Dhaka, Bangladesh
          </span>
        </motion.div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-14 items-end">
          {/* ── Left: the statement ── */}
          <motion.div variants={stagger} initial="initial" animate="animate" className="col-span-12 lg:col-span-8">

            {/* Kicker */}
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
              <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-ink-muted tabular-nums">
                01 / Introduction
              </span>
              <span className="h-px w-12 bg-border-strong" />
              <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-ink-secondary">
                UX Analyst · Engineer · Designer
              </span>
            </motion.div>

            {/* The name — oversized editorial display */}
            <h1 className="font-display font-bold tracking-[-0.03em] text-ink-primary leading-[0.9] mb-8">
              <div className="overflow-hidden">
                <motion.span
                  className="block text-[clamp(3rem,10vw,8rem)]"
                  {...lineReveal(0.2)}
                >
                  Alimoon
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  className="block text-[clamp(3rem,10vw,8rem)]"
                  {...lineReveal(0.32)}
                >
                  Nisha
                </motion.span>
              </div>
            </h1>

            {/* The line — the philosophy, as an editorial subhead */}
            <div className="max-w-2xl mb-9">
              <div className="overflow-hidden">
                <motion.p
                  className="text-[clamp(1.25rem,2.6vw,1.9rem)] font-display font-light text-ink-secondary leading-[1.25] tracking-tight"
                  {...lineReveal(0.5)}
                >
                  I believe good design should go unnoticed.
                </motion.p>
              </div>
            </div>

            {/* Supporting bio */}
            <motion.p
              variants={fadeUp}
              className="text-[15px] text-ink-muted max-w-lg leading-relaxed mb-10"
            >
              UX Analyst at SSL Wireless, Dhaka — designing banking, healthcare,
              payment, and enterprise products.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-16">
              <MagneticButton strength={0.3}>
                <a
                  href="#work"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-ink-primary text-white text-sm font-semibold rounded-md overflow-hidden transition-all active:scale-95"
                >
                  <div className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10">View Selected Work</span>
                  <span className="relative z-10 transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                </a>
              </MagneticButton>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="group inline-flex items-center gap-2 text-sm font-semibold text-ink-primary"
              >
                <span className="border-b border-ink-primary/30 group-hover:border-ink-primary transition-colors pb-0.5">Get in touch</span>
              </a>
            </motion.div>

            {/* Stats — a hairline data strip */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-3 max-w-lg border-t border-border-default pt-6"
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={i > 0 ? 'pl-5 sm:pl-6 border-l border-border-subtle' : ''}
                >
                  <div className="text-2xl sm:text-[1.75rem] font-display font-bold text-ink-primary leading-none mb-1.5 tabular-nums">{stat.value}</div>
                  <div className="text-[11px] font-medium text-ink-muted uppercase tracking-wider leading-tight">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: the portrait, as a framed figure ── */}
          <motion.div
            className="col-span-12 lg:col-span-4 mt-16 lg:mt-0 relative hidden md:block"
          >
            <motion.figure
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.2, ease: EASE_OUT_EXPO }}
              className="relative"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-surface-2 border border-ink-primary/10">
                <motion.img
                  src={heroImg}
                  alt="Alimoon Nisha"
                  style={{ scale: imageScale }}
                  className="w-full h-full object-cover object-center grayscale contrast-[1.02] transition-[filter] duration-700 hover:grayscale-0"
                />
                {/* Mask wipe reveal */}
                <motion.div
                  className="absolute inset-0 z-20 bg-surface-3"
                  initial={{ scaleY: 1 }}
                  animate={{ scaleY: 0 }}
                  transition={{ duration: 1.1, delay: 0.35, ease: EASE_IN_OUT_CIRC }}
                  style={{ transformOrigin: 'bottom' }}
                  aria-hidden="true"
                />
              </div>
              {/* Figure caption — the editorial device that replaces the badges */}
              <motion.figcaption
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="mt-3 flex items-center justify-between"
              >
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-ink-muted">Fig. 01</span>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-ink-muted">Since 2020 · SSL Wireless</span>
              </motion.figcaption>
            </motion.figure>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <p className="text-[10px] tracking-widest text-ink-muted uppercase font-medium">Scroll</p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-ink-primary/50 to-transparent"
        />
      </motion.div>
    </section>
  )
}
