import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { projects } from '../data/portfolio'
import Footer from '../components/layout/Footer'
import ScrollProgress from '../components/layout/ScrollProgress'
import logo from '../assets/logo.png'

const project = projects.find(p => p.id === 'zcommerz')
const cs = project.caseStudy

// Real screens auto-resolve from src/assets/zcommerz/.
const screenModules = import.meta.glob(
  '../assets/zcommerz/*.{png,jpg,jpeg,webp}',
  { eager: true, import: 'default' }
)
const screenByName = Object.fromEntries(
  Object.entries(screenModules).map(([path, url]) => {
    const file = path.split('/').pop().replace(/\.[^.]+$/, '')
    return [file, url]
  })
)
// Disclosure gate: a screen renders as a real image only once its export is
// vetted (no real phone numbers, emails, names, or payment identifiers) and
// its filename added here. Everything else falls back to a labelled wireframe.
// See src/assets/zcommerz/README.md for the masking rules.
const APPROVED_SCREENS = new Set([
  // Add a filename (no extension) ONLY after the export is masked and vetted:
  // 'zc-signup', 'zc-setup-identity', 'zc-setup-logistics',
  // 'zc-setup-payments', 'zc-setup-plan', 'zc-dashboard', 'zc-storefront',
])
const pick = (file) => (file && APPROVED_SCREENS.has(file) ? screenByName[file] : undefined)

const EASE = [0.22, 1, 0.36, 1]
const VP = { once: true, margin: '-12%' }

// A gated string is unverified copy that must not ship as fact.
const isGate = (s) => typeof s === 'string' && s.startsWith('[NEEDS')

const csSections = [
  { id: 'cs-cover',    num: '01', label: 'Overview' },
  { id: 'cs-problem',  num: '02', label: 'The problem' },
  { id: 'cs-journey',  num: '03', label: 'Onboarding' },
  { id: 'cs-store',    num: '04', label: 'Build the store' },
  { id: 'cs-payments', num: '05', label: 'Payments' },
  { id: 'cs-decisions',num: '06', label: 'Decisions' },
  { id: 'cs-build',    num: '07', label: 'Design + build' },
  { id: 'cs-outcome',  num: '08', label: 'Outcome' },
]

/* ── Reveal: blur + lift. The page's single motion idiom. ── */
function Reveal({ children, delay = 0, y = 20, className = '' }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={VP}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

function Eyebrow({ num, label }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-[11px] font-mono text-zinc-400 tracking-widest tabular-nums">{num}</span>
      <span className="h-px w-10 bg-zinc-200 shrink-0" />
      <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-[0.24em]">{label}</span>
    </div>
  )
}

/* ── Placeholder gate. Unverified copy renders as an obvious block, never as
   fact. Mirrors the pattern in the Merchant case study. ── */
function Gate({ text }) {
  return (
    <div className="rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/60 p-4">
      <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-amber-700 mb-1.5">
        Placeholder, not publishable
      </div>
      <p className="text-[13px] text-amber-900/80 leading-relaxed">{text}</p>
    </div>
  )
}

/* ── BrowserFrame. Renders a real web screen inside a browser chrome, or a
   neutral wireframe if the screen isn't exported/approved yet. ── */
function BrowserFrame({ src, alt = '', label = 'zcommerz', tall = false }) {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-border-subtle bg-white shadow-[0_30px_60px_-30px_rgba(15,23,42,0.4)]">
      {/* chrome */}
      <div className="flex items-center gap-2 px-3.5 h-9 bg-surface-2 border-b border-border-subtle">
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
        <div className="ml-2 flex-1 h-5 rounded-md bg-white border border-border-subtle flex items-center px-2.5">
          <span className="text-[9px] font-mono text-zinc-400 truncate">{label}.zcommerz.app</span>
        </div>
      </div>
      {/* viewport */}
      <div className="relative bg-surface-1 overflow-hidden" style={{ aspectRatio: tall ? '16 / 13' : '16 / 10' }}>
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover object-top" draggable="false" />
        ) : (
          <div className="w-full h-full flex items-center justify-center relative">
            <svg className="absolute inset-0 w-full h-full text-zinc-200" preserveAspectRatio="none" viewBox="0 0 100 100">
              <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.4" />
              <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.4" />
            </svg>
            <span className="relative text-[9px] font-mono uppercase tracking-[0.18em] text-zinc-400">Wireframe</span>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── HeroBuild: a phone-number → live-store motif. No screenshots by design —
   the hero states the problem/promise, the journey section shows the screens.
   A four-step bar fills to mirror the four-step setup at the case study's core. ── */
const HERO_STEPS = ['Sign up', 'Identity', 'Delivery', 'Payments', 'Live']

function HeroBuild() {
  return (
    <div style={{ width: 360 }} className="max-w-full">
      <style>{`
        @keyframes zcFill { 0% { transform: scaleX(0);} 70% { transform: scaleX(1);} 100% { transform: scaleX(1);} }
        .zc-fill { transform-origin: left center; animation: zcFill 4.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .zc-fill { animation: none; transform: scaleX(1); } }
      `}</style>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-400 shrink-0">One sitting</span>
        <span className="h-px flex-1 bg-zinc-200" />
      </div>

      <div className="rounded-2xl border border-border-subtle bg-surface-1 p-5">
        {/* the start: a single field */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-[10px] font-mono text-zinc-400 shrink-0">+880</span>
          <div className="flex-1 h-8 rounded-md bg-white border border-border-subtle flex items-center px-3">
            <span className="text-[11px] font-mono text-zinc-400 tracking-[0.2em]">1XXXXXXXXX</span>
          </div>
        </div>

        {/* the steps that follow */}
        <div className="space-y-2.5">
          {HERO_STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <span className="w-14 shrink-0 text-[9px] font-mono uppercase tracking-[0.12em] text-ink-muted">{s}</span>
              <div className="relative flex-1 h-[10px] rounded-full bg-surface-3 overflow-hidden">
                <div
                  className={`zc-fill absolute inset-y-0 left-0 w-full rounded-full ${i === HERO_STEPS.length - 1 ? 'bg-emerald-400/70' : 'bg-indigo-400/60'}`}
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 text-[11px] font-mono text-ink-muted text-center leading-relaxed">
          Phone number → payment-ready store.
        </p>
      </div>
    </div>
  )
}

/* ── JourneyTabs: the onboarding sequence. A step list drives one large browser
   frame — the right pattern for web (landscape) screens, where a row of five
   frames would be unreadable. Only the active step's caption shows. ── */
function JourneyTabs({ steps }) {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const a = steps[active]
  const src = pick(a.file)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      {/* step selector */}
      <div className="lg:col-span-4">
        <ol className="space-y-1.5">
          {steps.map((s, i) => {
            const on = active === i
            return (
              <li key={s.file}>
                <button
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  aria-pressed={on}
                  className={`group w-full text-left rounded-xl border px-4 py-3.5 transition-all duration-200 ${
                    on
                      ? 'border-transparent bg-zinc-900 text-white'
                      : 'border-border-subtle bg-surface-base hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-mono tabular-nums ${on ? 'text-white/50' : 'text-zinc-400'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={`text-[10px] font-mono uppercase tracking-[0.16em] ${on ? 'text-white/60' : 'text-zinc-400'}`}>
                      {s.step}
                    </span>
                  </div>
                  <div className={`mt-1.5 text-[15px] font-semibold leading-snug ${on ? 'text-white' : 'text-ink-primary'}`}>
                    {s.title}
                  </div>
                </button>
              </li>
            )
          })}
        </ol>
      </div>

      {/* active screen + caption */}
      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={a.file}
            initial={reduce ? false : { opacity: 0, y: 14, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <BrowserFrame src={src} alt={a.title} label={`app`} tall />
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-8">
              <div className="sm:col-span-5">
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 mb-2">{a.step}</div>
                <h3 className="font-display text-xl font-bold text-ink-primary tracking-tight leading-snug">{a.title}</h3>
              </div>
              <div className="sm:col-span-7">
                <p className="text-[15px] text-ink-secondary leading-relaxed mb-3">{a.hint}</p>
                <p className="text-[13px] text-ink-muted leading-relaxed border-l-2 border-zinc-200 pl-3.5">{a.why}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function ZCommerzCaseStudyPage() {
  const [activeSection, setActiveSection] = useState('cs-cover')
  const [navVisible, setNavVisible] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const onScroll = () => setNavVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }),
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    )
    csSections.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const showYear = !isGate(cs.year)

  return (
    <div className="min-h-screen bg-surface-base text-ink-primary antialiased">
      <ScrollProgress />

      {/* ── Sticky Section Nav ── */}
      <AnimatePresence>
        {navVisible && (
          <motion.nav
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.3 }}
            className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-2.5"
            aria-label="Case study sections"
          >
            {csSections.map(({ id, num, label }) => {
              const isActive = activeSection === id
              return (
                <button
                  key={id}
                  onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                  title={label}
                  className="group flex items-center justify-end gap-2"
                >
                  <span className={`text-[11px] font-mono transition-all duration-200 ${isActive ? 'opacity-100 text-zinc-600' : 'opacity-0 group-hover:opacity-50 text-ink-muted'}`}>
                    {num} {label}
                  </span>
                  <div className={`rounded-full transition-all duration-300 ${isActive ? 'w-2 h-2 bg-zinc-800' : 'w-1.5 h-1.5 bg-zinc-300 group-hover:bg-zinc-400'}`} />
                </button>
              )
            })}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── Top Nav ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-base/80 backdrop-blur-xl border-b border-border-subtle">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
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

        {/* ══════════ 01 HERO ══════════ */}
        <section id="cs-cover" style={{ scrollMarginTop: '64px' }} className="bg-surface-base">
          <div className="h-0.5 w-full bg-gradient-to-r from-indigo-500 via-indigo-300/40 to-transparent" />
          <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-20 pb-16 lg:pt-28 lg:pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="flex items-center gap-3 mb-8"
                >
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink-muted">Case Study</span>
                  {showYear && <>
                    <span className="w-1 h-1 rounded-full bg-zinc-300" />
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink-muted">{cs.year}</span>
                  </>}
                  <span className="w-1 h-1 rounded-full bg-zinc-300" />
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-600">E-commerce · SaaS</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1, delay: 0.08, ease: EASE }}
                  className="font-display font-bold text-ink-primary tracking-tight leading-[1.02] mb-3"
                  style={{ fontSize: 'clamp(2.5rem, 5.4vw, 4.25rem)' }}
                >
                  {cs.title}
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
                  className="text-[15px] font-mono uppercase tracking-[0.18em] text-indigo-500 mb-6"
                >
                  {cs.subtitle}
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                  className="text-[1.2rem] text-ink-secondary leading-relaxed max-w-xl mb-9"
                >
                  {cs.heroSub}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
                  className="flex flex-wrap items-start gap-x-9 gap-y-4"
                >
                  {cs.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="text-lg font-display font-bold text-ink-primary tracking-tight">{m.value}</div>
                      <div className="text-[10px] text-ink-muted uppercase tracking-[0.14em] font-mono mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              <div className="hidden lg:flex lg:col-span-5 items-center justify-center">
                <HeroBuild />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ TL;DR ══════════ */}
        <section className="border-y border-border-subtle bg-surface-1">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-14 lg:py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {cs.tldr.map((t, i) => (
                <Reveal key={t.label} delay={i * 0.1}>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 mb-3">{t.label}</div>
                  <p className="text-[15px] text-ink-secondary leading-relaxed">{t.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ 02 THE PROBLEM ══════════ */}
        <section id="cs-problem" style={{ scrollMarginTop: '64px' }} className="border-b border-border-subtle bg-surface-base">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16">
              <Reveal className="lg:col-span-7">
                <Eyebrow num="02" label="The problem" />
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-primary tracking-tight leading-[1.1] mb-6">
                  Three signups, one abandoned idea.
                </h2>
                <p className="text-[1.05rem] text-ink-secondary leading-relaxed mb-5">{cs.problem}</p>
                <p className="text-[1.05rem] text-ink-primary leading-relaxed font-medium border-l-2 border-zinc-900 pl-4">
                  {cs.solution}
                </p>
              </Reveal>

              <Reveal className="lg:col-span-5" delay={0.12}>
                <div className="rounded-2xl bg-zinc-900 p-6 text-white h-full flex flex-col justify-center">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-3">
                    The design challenge
                  </div>
                  <p className="font-display text-[1.15rem] font-semibold leading-snug">
                    {cs.designChallenge}
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 pt-14 border-t border-zinc-100">
              {cs.frictions.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.1}>
                  <div className="font-display text-4xl font-bold text-ink-primary tracking-tight mb-3">{f.stat}</div>
                  <div className="text-[15px] font-bold text-ink-primary mb-1.5">{f.title}</div>
                  <p className="text-[13px] text-ink-muted leading-relaxed">{f.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ 03 ONBOARDING JOURNEY — the star ══════════ */}
        <section id="cs-journey" style={{ scrollMarginTop: '64px' }} className="border-b border-border-subtle bg-surface-1">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-24">
            <Reveal className="max-w-2xl mb-12">
              <Eyebrow num="03" label="Onboarding" />
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-primary tracking-tight leading-[1.1] mb-5">
                From a phone number to a live store
              </h2>
              <p className="text-[1.05rem] text-ink-secondary leading-relaxed">{cs.journeyIntro}</p>
            </Reveal>
            <JourneyTabs steps={cs.journey} />
          </div>
        </section>

        {/* ══════════ 04 BUILD THE STORE — the "in a minute" half ══════════ */}
        <section id="cs-store" style={{ scrollMarginTop: '64px' }} className="border-b border-border-subtle bg-surface-base">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-24">
            <Reveal className="max-w-2xl mb-12">
              <Eyebrow num="04" label="Build the store" />
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-primary tracking-tight leading-[1.1] mb-5">
                A storefront in minutes, not weeks
              </h2>
              <p className="text-[1.05rem] text-ink-secondary leading-relaxed">{cs.buildFlowIntro}</p>
            </Reveal>
            <JourneyTabs steps={cs.buildFlow} />
          </div>
        </section>

        {/* ══════════ 05 PAYMENTS & ECOSYSTEM ══════════ */}
        <section id="cs-payments" style={{ scrollMarginTop: '64px' }} className="border-b border-border-subtle bg-surface-1">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-24">
            <Reveal className="max-w-2xl mb-12">
              <Eyebrow num="05" label="Payments" />
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-primary tracking-tight leading-[1.1] mb-5">
                Launch means it can take money
              </h2>
              <p className="text-[1.05rem] text-ink-secondary leading-relaxed">{cs.paymentsIntro}</p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cs.paymentRails.map((r, i) => (
                <Reveal key={r.name} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-border-subtle bg-surface-1 p-6">
                    <div className="flex items-baseline justify-between gap-3 mb-2">
                      <h3 className="text-[17px] font-bold text-ink-primary">{r.name}</h3>
                      <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-zinc-400 shrink-0">{r.role}</span>
                    </div>
                    <p className="text-[13px] text-ink-muted leading-relaxed">{r.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ 06 DECISIONS ══════════ */}
        <section id="cs-decisions" style={{ scrollMarginTop: '64px' }} className="border-b border-border-subtle bg-surface-base">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-24">
            <Reveal className="max-w-2xl mb-12">
              <Eyebrow num="06" label="Decisions" />
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-primary tracking-tight leading-[1.1]">
                The calls worth defending
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cs.keyDecisions.map((d, i) => (
                <Reveal key={d.title} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                    className="h-full rounded-2xl border border-border-subtle bg-surface-base p-6"
                  >
                    <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-400 mb-4">{d.tag}</div>
                    <h3 className="text-[16px] font-bold text-ink-primary mb-2.5 leading-snug">{d.title}</h3>
                    <p className="text-[13px] text-ink-muted leading-relaxed">{d.description}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ 07 DESIGNED + BUILT ══════════ */}
        <section id="cs-build" style={{ scrollMarginTop: '64px' }} className="border-b border-border-subtle bg-surface-1">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              <Reveal className="lg:col-span-6">
                <Eyebrow num="07" label="Design + build" />
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-primary tracking-tight leading-[1.1] mb-6">
                  Designed it, then built it
                </h2>
                <p className="text-[1.05rem] text-ink-secondary leading-relaxed mb-8">{cs.buildIntro}</p>
                <ul className="space-y-3.5">
                  {cs.buildPoints.map((p, i) => (
                    <Reveal key={p} delay={i * 0.07}>
                      <li className="flex items-start gap-3">
                        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-1 text-indigo-400">
                          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
                          <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[15px] text-ink-secondary leading-relaxed">{p}</span>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="lg:col-span-6" delay={0.12}>
                <div className="rounded-2xl border border-border-subtle bg-surface-1 p-6 h-full">
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 mb-5">At a glance</div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                    {cs.overviewSpecs.map(s => (
                      <div key={s.label}>
                        <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.14em] mb-1">{s.label}</div>
                        <div className="text-[14px] font-semibold text-ink-primary">{s.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-5 border-t border-zinc-100 flex flex-wrap gap-2">
                    {project.tags.map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-md text-[11px] font-medium text-ink-secondary bg-surface-base border border-border-subtle">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══════════ 08 OUTCOME ══════════ */}
        <section id="cs-outcome" style={{ scrollMarginTop: '64px' }} className="border-b border-border-subtle bg-surface-base">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-24">
            <Reveal className="max-w-2xl mb-12">
              <Eyebrow num="08" label="Outcome" />
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-primary tracking-tight leading-[1.15]">
                {cs.outcomeIntro}
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-6">
                <ul className="space-y-3.5">
                  {cs.outcomePoints.map((p, i) => (
                    <Reveal key={p} delay={i * 0.07}>
                      {isGate(p) ? (
                        <Gate text={p} />
                      ) : (
                        <li className="flex items-start gap-3">
                          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-1 text-zinc-400">
                            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
                            <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="text-[15px] text-ink-secondary leading-relaxed">{p}</span>
                        </li>
                      )}
                    </Reveal>
                  ))}
                </ul>

                <Reveal delay={0.2}>
                  <div className="mt-10 flex gap-3 rounded-xl border border-border-subtle bg-surface-base p-4">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="shrink-0 mt-0.5 text-zinc-400" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
                    </svg>
                    <p className="text-[12px] text-ink-muted leading-relaxed">{cs.nda}</p>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-6">
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 mb-5">What I&apos;d carry forward</div>
                <div className="space-y-3">
                  {cs.learnings.map((l, i) => (
                    <Reveal key={l} delay={i * 0.08}>
                      <div className="flex gap-4 rounded-xl border border-border-subtle bg-surface-base p-5">
                        <div className="font-display text-lg font-bold text-zinc-200 leading-none tabular-nums shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <p className="text-[13px] text-ink-secondary leading-relaxed">{l}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative overflow-hidden bg-surface-base">
          <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-28 text-center">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-ink-muted mb-6">Interested in working together?</p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink-primary tracking-tight leading-[1.06] mb-10">
                Let&apos;s build something<br /><span className="text-zinc-400">meaningful.</span>
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="https://www.linkedin.com/in/shahola-nisha/" target="_blank" rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-7 py-3.5 text-sm font-semibold text-white bg-zinc-900 rounded-md hover:bg-zinc-800 transition-all hover:-translate-y-0.5 shadow-sm">
                  Get in touch
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
                <Link to="/" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-ink-secondary hover:text-ink-primary border border-border-strong rounded-md transition-colors">
                  View all work
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
