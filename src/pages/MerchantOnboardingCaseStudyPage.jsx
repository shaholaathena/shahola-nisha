import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../data/portfolio'
import Footer from '../components/layout/Footer'
import ScrollProgress from '../components/layout/ScrollProgress'
import logo from '../assets/logo.png'

const project = projects.find(p => p.id === 'merchant-onboarding')
const cs = project.caseStudy

const EASE = [0.22, 1, 0.36, 1]
const VP = { once: true, margin: '-80px' }

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VP,
  transition: { duration: 0.75, ease: EASE },
}
const stagger = (i) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VP,
  transition: { duration: 0.6, delay: i * 0.07, ease: EASE },
})

function SectionLabel({ num, label }) {
  return (
    <div className="flex items-center gap-2.5 mb-6">
      <span className="text-[14px] font-mono text-zinc-300 tracking-widest tabular-nums">{num}</span>
      <span className="h-px w-8 bg-zinc-200 shrink-0" />
      <span className="text-[14px] font-mono text-zinc-400 uppercase tracking-[0.22em]">{label}</span>
    </div>
  )
}

export default function MerchantOnboardingCaseStudyPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-surface-base text-ink-primary antialiased">
      <ScrollProgress />

      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-base/80 backdrop-blur-xl border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="Alimoon Nisha" className="h-14 w-auto object-contain opacity-85 group-hover:opacity-100 transition-opacity duration-300" style={{ mixBlendMode: 'multiply' }} />
          </Link>
          <Link to="/" className="group flex items-center gap-2 text-base text-ink-secondary hover:text-ink-primary transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to work
          </Link>
        </div>
      </header>

      <main className="pt-16">

        {/* ── Cover ── */}
        <section className="bg-surface-base border-b border-border-subtle">
          <div className="h-0.5 w-full bg-gradient-to-r from-zinc-800 via-zinc-400/40 to-transparent" />
          <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-16 lg:pt-28 lg:pb-20">
            <motion.div {...fadeUp} className="flex items-center gap-3 mb-8">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-ink-muted">Case Study</span>
              <span className="w-1 h-1 rounded-full bg-zinc-300" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-ink-muted">{cs.year}</span>
              <span className="w-1 h-1 rounded-full bg-zinc-300" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-600">{cs.company}</span>
            </motion.div>

            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
              className="font-display font-bold text-ink-primary tracking-tight leading-[1.05] mb-6 max-w-4xl"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}
            >
              {cs.title}
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.85, delay: 0.16, ease: EASE }}
              className="text-lg text-ink-secondary mb-8 leading-relaxed max-w-2xl"
            >
              {project.description}
            </motion.p>

            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.24, ease: EASE }} className="flex flex-wrap gap-2 mb-12">
              {cs.phases.map((phase, i) => (
                <span key={phase} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border-subtle text-xs font-mono text-ink-muted bg-surface-1">
                  <span className="text-zinc-300 text-[9px]">0{i + 1}</span>
                  {phase}
                </span>
              ))}
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.34, ease: EASE }} className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-zinc-200 pt-8">
              {cs.metrics.map((m, i) => (
                <div key={m.label} className={i === 0 ? 'pr-6' : 'px-6'}>
                  <div className="text-2xl font-display font-bold text-ink-primary tracking-tight mb-0.5">{m.value}</div>
                  <div className="text-[10px] text-ink-muted uppercase tracking-[0.14em] font-mono">{m.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Project Specs ── */}
        <section className="border-b border-border-subtle bg-surface-base">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
            <motion.div {...fadeUp} className="card-surface rounded-2xl p-6 relative overflow-hidden max-w-2xl">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-zinc-400/50 via-zinc-200/30 to-transparent" />
              <p className="text-[10px] font-mono font-semibold text-zinc-400 tracking-[0.18em] uppercase mb-6">Project Specs</p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                {[
                  { label: 'Client', value: cs.company },
                  { label: 'My Role', value: cs.role },
                  { label: 'Duration', value: cs.duration },
                  { label: 'Year', value: cs.year },
                  { label: 'Platform', value: 'Android & iOS' },
                  { label: 'Tool', value: cs.tool },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.14em] mb-1.5">{item.label}</div>
                    <div className="text-sm font-semibold text-ink-primary">{item.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Challenge + Outcome ── */}
        <section className="border-b border-border-subtle bg-surface-base">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 lg:gap-x-24">
              <motion.div {...fadeUp}>
                <SectionLabel num="01" label="The Challenge" />
                <p className="text-[1.15rem] sm:text-[1.25rem] text-ink-primary leading-[1.8] font-light">{cs.challenge}</p>
              </motion.div>
              <motion.div {...fadeUp} transition={{ duration: 0.75, delay: 0.12, ease: EASE }}>
                <SectionLabel num="02" label="The Outcome" />
                <p className="text-[1.15rem] sm:text-[1.25rem] text-ink-primary leading-[1.8] font-light">{cs.outcome}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Key Decisions ── */}
        <section className="border-b border-border-subtle bg-surface-1">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div {...fadeUp} className="mb-14">
              <SectionLabel num="03" label="Key Decisions" />
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink-primary tracking-tight leading-[1.1]">
                Designing one system for many banks
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
              {cs.keyDecisions.map((d, i) => (
                <motion.div key={d.title} {...stagger(i)} className="card-surface rounded-2xl p-7">
                  <h3 className="text-lg font-bold text-ink-primary mb-3 leading-snug">{d.title}</h3>
                  <p className="text-sm text-ink-secondary leading-relaxed">{d.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Flow Groups ── */}
        <section className="bg-surface-base">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div {...fadeUp} className="mb-14">
              <SectionLabel num="04" label="User Flows" />
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink-primary tracking-tight leading-[1.1]">
                Every flow, mapped once, reused per bank
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
              {cs.flowGroups.map((group, i) => (
                <motion.div key={group.label} {...stagger(i)}>
                  <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em] mb-4">{group.label}</p>
                  <ul className="space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="w-1 h-1 rounded-full bg-zinc-300 mt-[7px] shrink-0" />
                        <span className="text-sm text-ink-secondary leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
