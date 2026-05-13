import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../data/portfolio'
import Footer from '../components/layout/Footer'
import ScrollProgress from '../components/layout/ScrollProgress'

const bkb = projects.find(p => p.id === 'bkb-mobile')
const caseStudy = bkb.caseStudy
const heroImage = bkb.image

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
}

const stagger = (i) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] },
})

export default function CaseStudyPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-surface-base text-ink-primary antialiased">
      <ScrollProgress />

      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-base/80 backdrop-blur-xl border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group" aria-label="Back to home">
            <div className="w-8 h-8 rounded-md bg-zinc-900 flex items-center justify-center text-white text-xs font-semibold font-display tracking-tight group-hover:scale-105 transition-transform">
              AN
            </div>
            <span className="text-sm font-semibold text-ink-primary hidden sm:block tracking-tight">Alimoon Nisha</span>
          </Link>
          <Link
            to="/"
            className="group flex items-center gap-2 text-sm text-ink-muted hover:text-ink-primary transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to work
          </Link>
        </div>
      </header>

      <main className="pt-16">

        {/* ─── HERO ─── */}
        <section className="relative overflow-hidden bg-[#061510]" style={{ minHeight: '92vh' }}>
          {/* Layered backgrounds */}
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt={caseStudy.title}
              className="w-full h-full object-cover object-center opacity-25"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #061510 15%, #061510cc 50%, transparent 100%)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #061510 25%, transparent 75%)' }} />
          </div>
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-[55%] h-[70%] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(34,197,94,0.12) 0%, transparent 65%)' }} />
          <div className="absolute bottom-0 left-0 w-[40%] h-[50%] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 10% 90%, rgba(16,185,129,0.07) 0%, transparent 60%)' }} />

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 flex flex-col justify-center h-full py-28 lg:py-36" style={{ minHeight: '92vh' }}>
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl"
            >
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] font-bold text-green-400 uppercase tracking-[0.18em] mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                Case Study · Mobile Banking
              </div>

              {/* Headline */}
              <h1 className="font-display font-bold text-white tracking-tight leading-[1.04] mb-4" style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}>
                Bangladesh Krishi Bank
              </h1>
              <h1 className="font-display font-bold tracking-tight leading-[1.04] mb-10" style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)', background: 'linear-gradient(90deg, #86efac, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                myBKB Mobile App
              </h1>

              {/* Scope tags */}
              <div className="flex flex-wrap gap-2 mb-14">
                {['UI/UX Design', 'Figma', 'Android & iOS', 'Bangladesh Bank Compliant'].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full border border-white/10 text-[11px] text-white/50 bg-white/5">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Metrics strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10">
                {caseStudy.metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="text-3xl lg:text-4xl font-display font-bold text-white">{m.value}</div>
                    <div className="text-[10px] font-mono text-white/35 uppercase tracking-widest mt-1">{m.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 5, 0] }}
            transition={{ delay: 1.4, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            <div className="w-px h-10 bg-gradient-to-b from-green-400/50 to-transparent" />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </motion.div>
        </section>

        {/* ─── OVERVIEW ─── */}
        <section className="border-b border-border-subtle">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <motion.div className="lg:col-span-7" {...fadeUp}>
                <Label>Overview</Label>
                <p className="text-lg lg:text-xl text-ink-secondary leading-relaxed">{caseStudy.context}</p>
              </motion.div>
              <motion.div className="lg:col-span-5" {...fadeUp} transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}>
                <Label>Project Info</Label>
                <div className="card-surface rounded-2xl overflow-hidden">
                  {[
                    { label: 'Client', value: caseStudy.company },
                    { label: 'My Role', value: caseStudy.role },
                    { label: 'Duration', value: caseStudy.duration },
                    { label: 'Year', value: caseStudy.year },
                    { label: 'Platform', value: 'Android & iOS' },
                    { label: 'Tool', value: 'Figma' },
                  ].map((item, i, arr) => (
                    <div key={item.label} className={`flex justify-between items-center px-6 py-4 ${i < arr.length - 1 ? 'border-b border-border-subtle' : ''}`}>
                      <span className="text-xs text-ink-faint">{item.label}</span>
                      <span className="text-xs font-semibold text-ink-primary">{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── CHALLENGE & OUTCOME ─── */}
        <section className="border-b border-border-subtle" style={{ background: 'rgba(255,255,255,0.01)' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Challenge */}
              <motion.div {...fadeUp} className="card-surface rounded-2xl p-8 lg:p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400/70 via-amber-400/30 to-transparent" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(251,191,36,0.1)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                  </div>
                  <Label inline>The Challenge</Label>
                </div>
                <p className="text-sm text-ink-secondary leading-relaxed">{caseStudy.challenge}</p>
              </motion.div>

              {/* Outcome */}
              <motion.div {...fadeUp} transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }} className="rounded-2xl p-8 lg:p-10 relative overflow-hidden border border-green-900/50" style={{ background: 'linear-gradient(135deg, #0a2e1a 0%, #0f3f2b 100%)' }}>
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400/70 via-green-400/30 to-transparent" />
                <div className="absolute bottom-0 right-0 w-40 h-40 pointer-events-none" style={{ background: 'radial-gradient(circle at 100% 100%, rgba(34,197,94,0.12), transparent 70%)' }} />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-green-500/15">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-green-400/70">The Outcome</span>
                </div>
                <p className="text-sm text-white/80 leading-relaxed relative z-10">{caseStudy.outcome}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── DELIVERABLES STRIP ─── */}
        <section className="border-b border-border-subtle">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
            <motion.div {...fadeUp} className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-ink-faint mr-2">Deliverables</span>
              {['30+ User Flows', '100+ Screens', 'Component Library', 'Interactive Prototype', 'Design Handoff', 'Android & iOS'].map(item => (
                <span key={item} className="px-3 py-1.5 rounded-lg border border-border-subtle text-xs text-ink-muted bg-surface-1/40">
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── KEY DESIGN DECISIONS ─── */}
        <section className="border-b border-border-subtle">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div {...fadeUp} className="mb-14">
              <Label>Design Strategy</Label>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-primary tracking-tight max-w-lg leading-tight">
                Key decisions that shaped the experience
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {caseStudy.keyDecisions.map((decision, i) => (
                <motion.div
                  key={i}
                  {...stagger(i)}
                  className="card-surface rounded-2xl p-8 lg:p-10 relative overflow-hidden group hover:border-zinc-700/50 transition-all duration-300"
                >
                  {/* Ghost number watermark */}
                  <div
                    className="absolute -bottom-4 -right-2 font-display font-bold leading-none select-none pointer-events-none transition-opacity duration-300 group-hover:opacity-50"
                    style={{ fontSize: '8rem', color: 'rgba(255,255,255,0.03)' }}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  {/* Animated top accent */}
                  <div className="absolute top-0 left-8 h-0.5 bg-green-500/50 transition-all duration-300 w-6 group-hover:w-14" />
                  <div className="relative z-10">
                    <div className="text-[10px] font-mono text-ink-faint mb-6 tracking-widest">{String(i + 1).padStart(2, '0')}</div>
                    <h3 className="text-base font-bold text-ink-primary mb-3 leading-snug">{decision.title}</h3>
                    <p className="text-sm text-ink-muted leading-relaxed">{decision.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FLOWS DESIGNED ─── */}
        <section className="border-b border-border-subtle relative overflow-hidden" style={{ background: '#0a0f0a' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 90% 30%, rgba(34,197,94,0.07) 0%, transparent 70%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div {...fadeUp} className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-green-400/60 flex items-center gap-2 mb-5">
                  <div className="w-0.5 h-3.5 rounded-full bg-green-500/60" aria-hidden="true" />
                  User Flow Architecture
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  Flows designed end-to-end
                </h2>
              </div>
              <span className="text-xs font-mono text-white/30 shrink-0">30+ flows · 100+ screens</span>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {caseStudy.flowGroups.map((group, i) => (
                <motion.div
                  key={group.label}
                  {...stagger(i)}
                  className="rounded-2xl border border-white/8 overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold text-green-400 bg-green-500/10">
                        {i + 1}
                      </div>
                      <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">{group.label}</span>
                    </div>
                    <span className="text-[10px] font-mono text-white/25 bg-white/5 px-2 py-0.5 rounded-full">{group.items.length}</span>
                  </div>
                  <div className="p-5 flex flex-wrap gap-2">
                    {group.items.map(item => (
                      <span key={item} className="px-2.5 py-1 rounded-lg text-[11px] text-white/50 border border-white/8" style={{ background: 'rgba(255,255,255,0.04)' }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PROCESS ─── */}
        <section className="border-b border-border-subtle">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div {...fadeUp} className="mb-14">
              <Label>Process</Label>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-primary tracking-tight">
                From discovery to handoff
              </h2>
            </motion.div>
            <div className="relative">
              {/* Connector line */}
              <div className="hidden lg:block absolute top-11 left-10 right-10 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)' }} />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {caseStudy.phases.map((phase, i) => (
                  <motion.div
                    key={phase}
                    {...stagger(i)}
                    className="card-surface rounded-2xl p-6 flex flex-col items-center text-center gap-4 group hover:border-green-800/40 transition-colors relative"
                  >
                    <div className="w-14 h-14 rounded-2xl border border-border-subtle bg-surface-1 flex items-center justify-center relative z-10 group-hover:border-green-800/50 transition-colors">
                      <span className="text-sm font-display font-bold text-ink-muted group-hover:text-green-500 transition-colors">{i + 1}</span>
                    </div>
                    <span className="text-xs font-semibold text-ink-secondary">{phase}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(16,185,129,0.07) 0%, transparent 70%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-28 lg:py-36 text-center">
            <motion.div {...fadeUp}>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink-faint mb-6">Interested in working together?</p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-primary tracking-tight leading-tight mb-12">
                Let's build something<br />
                <span style={{ background: 'linear-gradient(90deg, #86efac, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  meaningful.
                </span>
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://www.linkedin.com/in/shahola-nisha/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-bold text-white bg-zinc-900 rounded-xl hover:bg-zinc-800 transition-all hover:-translate-y-0.5 shadow-lg"
                >
                  Get in touch
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                  </svg>
                </a>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium text-ink-muted hover:text-ink-primary border border-border-subtle rounded-xl transition-colors hover:border-zinc-700/50"
                >
                  View all work
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}

function Label({ children, inline = false }) {
  return (
    <div className={`flex items-center gap-2.5 ${inline ? '' : 'mb-5'}`}>
      <div className="w-0.5 h-3.5 rounded-full bg-green-500/60 shrink-0" aria-hidden="true" />
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-faint">{children}</span>
    </div>
  )
}
