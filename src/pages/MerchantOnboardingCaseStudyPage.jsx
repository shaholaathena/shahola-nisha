import { useEffect, useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/portfolio'
import Footer from '../components/layout/Footer'
import ScrollProgress from '../components/layout/ScrollProgress'
import logo from '../assets/logo.png'

const project = projects.find(p => p.id === 'merchant-onboarding')
const cs = project.caseStudy
const banks = cs.banks

// Real screens auto-resolve from src/assets/merchant/ — drop a PNG/JPG named
// per the convention below and it replaces the placeholder automatically:
//   bank homes  → sebl-home, ncc-home, sdbl-home, rupali-home, jbl-home
//   flow steps  → flow-1-select-store, flow-2-home, flow-3-amount, flow-4-scan-pay, flow-5-success
//   visual row  → visual-1-login, visual-2-home, visual-3-scan-pay, visual-4-transactions
// Export the frames from the SEBL/NCC/SDBL/Rupali/JBL Merchant pages in Figma.
const screenModules = import.meta.glob(
  '../assets/merchant/*.{png,jpg,jpeg,webp}',
  { eager: true, import: 'default' }
)
const screenByName = Object.fromEntries(
  Object.entries(screenModules).map(([path, url]) => {
    const file = path.split('/').pop().replace(/\.[^.]+$/, '')
    return [file, url]
  })
)

const EASE = [0.22, 1, 0.36, 1]
const VP = { once: true, margin: '-80px' }

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VP,
  transition: { duration: 0.7, ease: EASE },
}
const stagger = (i) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VP,
  transition: { duration: 0.55, delay: i * 0.06, ease: EASE },
})

const csSections = [
  { id: 'cs-cover',    num: '01', label: 'Cover' },
  { id: 'cs-brief',    num: '02', label: 'Overview' },
  { id: 'cs-features', num: '03', label: 'Features' },
  { id: 'cs-flow',     num: '04', label: 'User Flow' },
  { id: 'cs-brands',   num: '05', label: 'Multi-Bank' },
  { id: 'cs-visual',   num: '06', label: 'Visual Design' },
]

const ACCENT = '#151515'

// The crux — what the reader should grasp in one glance.
const whatIDid = [
  'Merchant onboarding — a guided create-lead sign-up: shop info → review → success',
  'Bangla QR payments — select store, enter amount, customer scans & pays',
  'PIN + OTP secured access — login, verify, forget / reset PIN, quick signup',
  'Home dashboard, transaction history, and merchant profile',
  'A themeable design system reskinned across 5 bank clients',
]

const features = [
  {
    label: 'Secure Access', desc: 'PIN login with OTP verification, plus forget / reset PIN and quick signup',
    icon: <><path d="M12 3l8 3.5v5c0 4.4-3.4 8.5-8 9.5C7.4 19.5 4 15.4 4 11V6.5L12 3z" /><path d="M9 12l2 2 4-4" /></>,
  },
  {
    label: 'Merchant Onboarding', desc: 'Guided create-lead sign-up — shop info → review → success',
    icon: <><rect x="5" y="3.5" width="14" height="17" rx="2" /><path d="M9 3.5V2.5h6v1M8.5 10h7M8.5 14h5" /></>,
  },
  {
    label: 'Store & Counter', desc: 'Pick a store and counter so multi-outlet sales attribute correctly',
    icon: <><path d="M4 9l1.2-4h13.6L20 9M5 9v10h14V9M4 9h16" /><path d="M9.5 19v-4.5h5V19" /></>,
  },
  {
    label: 'Bangla QR Payments', desc: 'Enter an amount; the customer scans one interoperable QR to pay',
    icon: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3M20 20h1M17 20v1" /></>,
  },
  {
    label: 'Transactions & Profile', desc: 'Transaction history, receipts, and the merchant profile',
    icon: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></>,
  },
  {
    label: 'Multi-brand Theming', desc: 'One engine reskinned per bank via shared design tokens',
    icon: <><circle cx="13.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="10.5" r="2.5" /><circle cx="8.5" cy="7.5" r="2.5" /><path d="M12 22a10 10 0 1 1 8-4c-2 2.5-6 1-6-2 0-1.5-1-2-2-2z" /></>,
  },
]

const flowSteps = [
  { step: 1, title: 'Select Store',    description: 'Choose store & counter',    file: 'flow-1-select-store' },
  { step: 2, title: 'Merchant Home',   description: 'Balance & Take Payment',    file: 'flow-2-home', fallback: 'rupali-home' },
  { step: 3, title: 'Enter Amount',    description: 'Amount to charge',          file: 'flow-3-amount' },
  { step: 4, title: 'Scan & Pay',      description: 'Customer scans Bangla QR',  file: 'flow-4-scan-pay' },
  { step: 5, title: 'Payment Success', description: 'Paid & recorded',           file: 'flow-5-success' },
]

function SectionLabel({ num, label }) {
  return (
    <div className="flex items-center gap-2.5 mb-6">
      <span className="text-[14px] font-mono text-zinc-300 tracking-widest tabular-nums">{num}</span>
      <span className="h-px w-8 bg-zinc-200 shrink-0" />
      <span className="text-[14px] font-mono text-zinc-400 uppercase tracking-[0.22em]">{label}</span>
    </div>
  )
}

/* ── Realistic phone mockup — real screen when `src` is set, else a placeholder ── */
function PlaceholderPhone({ label, sublabel, accent = '#cbd5e1', width = 240, src }) {
  const bezel = Math.max(5, Math.round(width * 0.028))
  const outerR = Math.round(width * 0.16)
  const innerR = Math.max(6, outerR - bezel)
  const islandW = Math.round(width * 0.26)
  const islandH = Math.round(width * 0.072)
  return (
    <div className="shrink-0" style={{ width }}>
      {/* device body */}
      <div
        className="relative bg-zinc-900"
        style={{
          padding: bezel,
          borderRadius: outerR,
          boxShadow: '0 24px 48px -20px rgba(15,23,42,0.5), inset 0 0 0 1.5px rgba(255,255,255,0.08)',
        }}
      >
        {/* side buttons */}
        <span className="absolute left-[-2px] rounded-l-sm bg-zinc-700/90" style={{ top: '20%', width: 2, height: '6%' }} />
        <span className="absolute left-[-2px] rounded-l-sm bg-zinc-700/90" style={{ top: '30%', width: 2, height: '9%' }} />
        <span className="absolute left-[-2px] rounded-l-sm bg-zinc-700/90" style={{ top: '41%', width: 2, height: '9%' }} />
        <span className="absolute right-[-2px] rounded-r-sm bg-zinc-700/90" style={{ top: '31%', width: 2, height: '13%' }} />

        {/* screen */}
        <div className="relative overflow-hidden bg-white" style={{ borderRadius: innerR, aspectRatio: '393 / 852' }}>
          {src ? (
            <img src={src} alt={label || 'App screen'} className="w-full h-full object-cover object-top" draggable="false" />
          ) : (
            <>
              <div className="w-full flex items-end px-4 pb-2" style={{ height: '15%', background: accent }}>
                <div className="h-1.5 w-14 rounded-full bg-white/70" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center gap-3 p-4" style={{ top: '15%' }}>
                <div className="w-full flex-1 rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50/60 flex items-center justify-center relative overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full text-zinc-200" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.6" />
                    <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.6" />
                  </svg>
                  <span className="relative text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-400">Screen TBD</span>
                </div>
                <div className="w-full space-y-1.5 pb-1">
                  <div className="h-1.5 w-3/4 rounded-full bg-zinc-200" />
                  <div className="h-1.5 w-1/2 rounded-full bg-zinc-100" />
                </div>
              </div>
            </>
          )}
          {/* dynamic island */}
          <div
            className="absolute left-1/2 -translate-x-1/2 bg-black rounded-full"
            style={{ top: Math.round(bezel * 1.4), width: islandW, height: islandH }}
          />
        </div>
      </div>

      {(label || sublabel) && (
        <div className="pt-3 text-center">
          {label && <div className="text-xs font-bold text-ink-primary leading-tight">{label}</div>}
          {sublabel && <div className="text-[11px] text-ink-muted leading-snug mt-0.5">{sublabel}</div>}
        </div>
      )}
    </div>
  )
}

/* ── Cover hero — the 5 bank home screens fanned like a deck ── */
function BankFan() {
  // center JBL so it sits at the front of the fan; others fan out around it
  const rest = banks.filter((b) => b.code !== 'JBL')
  const jbl = banks.find((b) => b.code === 'JBL')
  const order = jbl && rest.length === 4 ? [rest[0], rest[1], jbl, rest[2], rest[3]] : banks
  const mid = (order.length - 1) / 2
  return (
    <div className="relative w-full max-w-[540px] h-[430px]">
      {order.map((b, i) => {
        const off = i - mid
        const angle = off * 8.5
        const tx = off * 52
        const ty = Math.abs(off) * 18
        const z = order.length - Math.abs(off) // center card (JBL) sits on top
        return (
          <div
            key={b.code}
            className="absolute left-1/2 bottom-0"
            style={{
              zIndex: z,
              transform: `translateX(-50%) translateX(${tx}px) translateY(${ty}px) rotate(${angle}deg)`,
              transformOrigin: '50% 100%',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.09, duration: 0.8, ease: EASE }}
            >
              <PlaceholderPhone accent={b.accent} width={168} src={screenByName[`${b.code.toLowerCase()}-home`]} />
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}

export default function MerchantOnboardingCaseStudyPage() {
  const [activeSection, setActiveSection] = useState('cs-cover')
  const [navVisible, setNavVisible] = useState(false)
  const flowScrollRef = useRef(null)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragScrollLeft = useRef(0)

  const handleFlowWheel = useCallback((e) => {
    if (!flowScrollRef.current) return
    e.preventDefault()
    flowScrollRef.current.scrollLeft += e.deltaY * 1.2
  }, [])

  useEffect(() => {
    const el = flowScrollRef.current
    if (!el) return
    el.addEventListener('wheel', handleFlowWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleFlowWheel)
  }, [handleFlowWheel])

  const onDragStart = useCallback((e) => {
    isDragging.current = true
    dragStartX.current = e.pageX
    dragScrollLeft.current = flowScrollRef.current?.scrollLeft ?? 0
  }, [])
  const onDragMove = useCallback((e) => {
    if (!isDragging.current || !flowScrollRef.current) return
    flowScrollRef.current.scrollLeft = dragScrollLeft.current - (e.pageX - dragStartX.current)
  }, [])
  const onDragEnd = useCallback(() => { isDragging.current = false }, [])

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
            className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-2"
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
                  <div className={`rounded-full transition-all duration-200 ${isActive ? 'w-2 h-2 bg-zinc-500' : 'w-1.5 h-1.5 bg-zinc-300 group-hover:bg-zinc-400'}`} />
                </button>
              )
            })}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── Top Nav ── */}
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

        {/* ══════════ 01 COVER ══════════ */}
        <section id="cs-cover" style={{ scrollMarginTop: '64px' }} className="bg-surface-base border-b border-border-subtle">
          <div className="h-0.5 w-full bg-gradient-to-r from-zinc-800 via-zinc-400/40 to-transparent" />
          <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-16 lg:pt-28 lg:pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center mb-12">
              <div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="flex items-center gap-3 mb-8">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-ink-muted">Case Study</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-300" />
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-ink-muted">{cs.year}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-300" />
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-600">{cs.company}</span>
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
                  className="font-display font-bold text-ink-primary tracking-tight leading-[1.02] mb-6" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)' }}>
                  Merchant App
                  <span className="text-zinc-300"> —</span>
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.16, ease: EASE }}
                  className="text-lg text-ink-secondary mb-8 leading-relaxed">
                  {project.description}
                </motion.p>

                {/* Bank chips */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.22, ease: EASE }} className="flex flex-wrap gap-2">
                  {banks.map((b) => (
                    <span key={b.code} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-subtle bg-surface-1 text-xs font-semibold text-ink-secondary">
                      <span className="w-2 h-2 rounded-full" style={{ background: b.accent }} />
                      {b.code}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* Right: 5-bank fanned hero */}
              <div className="hidden lg:flex items-center justify-center lg:justify-end pr-2 xl:pr-6">
                <BankFan />
              </div>
            </div>

            {/* Metrics */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-zinc-200 pt-8">
              {cs.metrics.map((m, i) => (
                <div key={m.label} className={i === 0 ? 'pr-6' : 'px-6'}>
                  <div className="text-2xl font-display font-bold text-ink-primary tracking-tight mb-0.5">{m.value}</div>
                  <div className="text-[10px] text-ink-muted uppercase tracking-[0.14em] font-mono">{m.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════ 02 OVERVIEW ══════════ */}
        <section id="cs-brief" style={{ scrollMarginTop: '64px' }} className="border-b border-border-subtle bg-surface-base">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-14">
              <motion.div className="lg:col-span-7" {...fadeUp}>
                <SectionLabel num="02" label="Overview" />
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-primary tracking-tight mb-6 leading-[1.1]">
                  One engine, many banks, live on Bangla QR
                </h2>

                {/* What I designed — scannable crux */}
                <p className="text-[10px] font-mono font-semibold text-zinc-400 tracking-[0.18em] uppercase mb-4">What I designed</p>
                <ul className="space-y-3">
                  {whatIDid.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5 text-zinc-400">
                        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[15px] text-ink-secondary leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div className="lg:col-span-5" {...fadeUp} transition={{ duration: 0.7, delay: 0.12, ease: EASE }}>
                <div className="card-surface rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-zinc-400/50 via-zinc-200/30 to-transparent" />
                  <p className="text-[10px] font-mono font-semibold text-zinc-400 tracking-[0.18em] uppercase mb-6">Project Specs</p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                    {[
                      { label: 'Client',   value: cs.company },
                      { label: 'My Role',  value: cs.role },
                      { label: 'Bank skins', value: String(banks.length) },
                      { label: 'Year',     value: cs.year },
                      { label: 'Platform', value: 'Android & iOS' },
                      { label: 'Tool',     value: cs.tool },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.14em] mb-1.5">{item.label}</div>
                        <div className="text-sm font-semibold text-ink-primary">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="pt-14 border-t border-zinc-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 lg:gap-x-24">
                <motion.div {...fadeUp}>
                  <SectionLabel num="—" label="The Challenge" />
                  <p className="text-[1.1rem] sm:text-[1.2rem] text-ink-primary leading-[1.75] font-light">{cs.challenge}</p>
                </motion.div>
                <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.12, ease: EASE }}>
                  <SectionLabel num="—" label="The Outcome" />
                  <p className="text-[1.1rem] sm:text-[1.2rem] text-ink-primary leading-[1.75] font-light">{cs.outcome}</p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ 03 FEATURES ══════════ */}
        <section id="cs-features" style={{ scrollMarginTop: '64px' }} className="border-b border-border-subtle bg-surface-base">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div {...fadeUp} className="mb-12">
              <SectionLabel num="03" label="Features" />
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-primary tracking-tight max-w-xl leading-[1.1]">
                6 core modules, one shared engine
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((f, i) => (
                <motion.div key={f.label} {...stagger(i)} className="card-surface rounded-2xl p-6 group hover:border-zinc-300/60 hover:shadow-sm transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-zinc-400/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />
                  <div className="w-8 h-8 rounded-lg bg-surface-1 border border-border-subtle flex items-center justify-center mb-4 group-hover:bg-surface-2 transition-colors text-zinc-500">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
                  </div>
                  <div className="text-base font-bold text-ink-primary mb-2 leading-snug">{f.label}</div>
                  <div className="text-sm text-ink-muted leading-relaxed">{f.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ 04 USER FLOW ══════════ */}
        <section id="cs-flow" style={{ scrollMarginTop: '64px' }} className="border-b border-border-subtle bg-surface-base">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div {...fadeUp} className="mb-12">
              <SectionLabel num="04" label="User Flow" />
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-primary tracking-tight leading-[1.1]">
                  Lead to live QR, mapped once
                </h2>
              </div>
              <div className="flex flex-wrap gap-6">
                {[[String(cs.flowGroups.length), 'flow groups'], ['5', 'core steps'], [String(banks.length), 'bank skins']].map(([val, lbl]) => (
                  <div key={lbl} className="flex items-baseline gap-1.5">
                    <span className="font-display text-2xl font-bold text-ink-primary">{val}</span>
                    <span className="text-sm text-ink-muted">{lbl}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Flow groups grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
              {cs.flowGroups.map((group, i) => (
                <motion.div key={group.label} {...stagger(i)} className="card-surface rounded-2xl overflow-hidden group hover:border-border-default transition-colors duration-200">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-border-subtle">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono text-ink-muted tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                      <span className="w-px h-3 bg-border-subtle" />
                      <span className="text-sm font-semibold text-ink-primary">{group.label}</span>
                    </div>
                    <span className="text-xs font-mono text-ink-muted bg-surface-1 border border-border-subtle px-2 py-0.5 rounded-full">
                      {group.items.length} flows
                    </span>
                  </div>
                  <div className="p-5 flex flex-wrap gap-2">
                    {group.items.map(item => (
                      <span key={item} className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-ink-secondary bg-surface-1 border border-border-subtle leading-none">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Flow spotlight */}
            <div className="border-t border-border-subtle pt-16">
              <motion.div {...fadeUp} className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-1 border border-border-subtle mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-ink-muted" />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-ink-muted">Flow Spotlight · Take a Payment</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-bold text-ink-primary tracking-tight leading-[1.1]">
                  Take a payment in <span className="text-ink-muted">a few taps</span>
                </h3>
              </motion.div>

              {/* 5-step connector */}
              <motion.div {...fadeUp} className="mb-12">
                <div className="relative flex flex-col sm:flex-row items-stretch gap-0">
                  {flowSteps.map((s, i) => (
                    <div key={s.step} className="flex sm:flex-col flex-1 items-center sm:items-start gap-0 relative">
                      {i < flowSteps.length - 1 && (
                        <div className="hidden sm:block absolute top-4 left-[calc(100%_-_12px)] w-full h-px bg-border-subtle z-0" />
                      )}
                      <div className="flex sm:flex-col items-center sm:items-start gap-3 w-full pr-0 sm:pr-4">
                        <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full shrink-0 border border-border-default bg-surface-base text-ink-muted text-xs font-bold font-mono">
                          {String(s.step).padStart(2, '0')}
                        </div>
                        {i < flowSteps.length - 1 && <div className="sm:hidden w-px h-6 bg-border-subtle" />}
                        <div className="sm:mt-3 pb-4 sm:pb-0">
                          <div className="text-sm font-semibold text-ink-primary mb-0.5">{s.title}</div>
                          <div className="text-xs text-ink-muted leading-snug">{s.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Placeholder flow screens */}
              <div
                ref={flowScrollRef}
                className="relative -mx-6 lg:-mx-10 px-6 lg:px-10 overflow-x-auto hide-scrollbar pb-6 cursor-grab active:cursor-grabbing select-none"
                onMouseDown={onDragStart} onMouseMove={onDragMove} onMouseUp={onDragEnd} onMouseLeave={onDragEnd}
              >
                <motion.div {...fadeUp} className="flex gap-4 min-w-max">
                  {flowSteps.map((s, idx) => (
                    <div key={s.step} className="shrink-0 flex flex-col items-center gap-3">
                      <PlaceholderPhone label={s.title} sublabel={s.description} accent={ACCENT} width={216} src={screenByName[s.file] || (s.fallback ? screenByName[s.fallback] : undefined)} />
                      <span className="text-xs font-mono text-ink-muted tabular-nums">{String(idx + 1).padStart(2, '0')}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
              <p className="text-xs font-mono text-zinc-400 mt-1">↔ Drag to scroll · placeholder screens — real UI drops in later</p>
            </div>
          </div>
        </section>

        {/* ══════════ 05 MULTI-BANK THEMING ══════════ */}
        <section id="cs-brands" style={{ scrollMarginTop: '64px' }} className="border-b border-border-subtle bg-surface-1">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div {...fadeUp} className="mb-12">
              <SectionLabel num="05" label="Multi-Bank Theming" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <h2 className="lg:col-span-7 font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-primary tracking-tight leading-[1.1]">
                  Same flow, {banks.length} bank skins
                </h2>
                <p className="lg:col-span-5 text-lg text-ink-secondary leading-relaxed lg:pt-2">
                  Identical screens, re-skinned per bank via shared design tokens — brand accent, logo, and surface swap while the flow and compliance logic stay the same. A new bank client is a re-theme, not a redesign.
                </p>
              </div>
            </motion.div>

            {/* Bank skins */}
            <motion.div {...fadeUp} className="mb-10">
              <p className="text-xs font-mono text-ink-muted uppercase tracking-widest mb-8">Merchant home — re-skinned per bank</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                {banks.map((b, i) => (
                  <motion.div key={b.code} {...stagger(i)} className="flex flex-col items-center gap-3">
                    <PlaceholderPhone accent={b.accent} width={200} src={screenByName[`${b.code.toLowerCase()}-home`]} />
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-0.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: b.accent }} />
                        <span className="text-sm font-bold text-ink-primary">{b.code}</span>
                      </div>
                      {b.fullName && <div className="text-[11px] text-ink-muted">{b.fullName}</div>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Accent tokens */}
            <motion.div {...fadeUp} className="pt-8 border-t border-zinc-200/70">
              <p className="text-xs font-mono text-ink-muted uppercase tracking-widest mb-5">brand.accent — one token, swapped per bank</p>
              <div className="flex flex-wrap gap-4">
                {banks.map((b) => (
                  <div key={b.code} className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg border border-zinc-200" style={{ background: b.accent }} />
                    <div>
                      <div className="text-xs font-semibold text-ink-primary leading-none mb-1">{b.code}</div>
                      <div className="text-[11px] font-mono text-ink-muted uppercase">{b.accent}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] font-mono text-zinc-400 mt-4">* Accent values are placeholders — swap for each bank&apos;s official brand token.</p>
            </motion.div>
          </div>
        </section>

        {/* ══════════ 06 VISUAL DESIGN ══════════ */}
        <section id="cs-visual" style={{ scrollMarginTop: '64px' }} className="border-b border-border-subtle bg-surface-base">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div {...fadeUp} className="mb-12">
              <SectionLabel num="06" label="Visual Design" />
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-primary tracking-tight leading-[1.1] max-w-xl">
                  A handoff-ready, multi-bank onboarding app
                </h2>
                <p className="text-base text-ink-muted max-w-sm leading-relaxed shrink-0">
                  Onboarding, store setup, and Bangla QR payments — themed across {banks.length} banks. Android &amp; iOS.
                </p>
              </div>
            </motion.div>

            {/* Screen row placeholder */}
            <motion.div {...fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-14">
              {[
                { label: 'Splash / Login', file: 'visual-1-login' },
                { label: 'Merchant Home', file: 'visual-2-home', fallback: 'sebl-home' },
                { label: 'Scan & Pay', file: 'visual-3-scan-pay', fallback: 'flow-4-scan-pay' },
                { label: 'Transactions', file: 'visual-4-transactions' },
              ].map((s, i) => (
                <motion.div key={s.label} {...stagger(i)} className="flex flex-col items-center gap-3">
                  <PlaceholderPhone label={s.label} accent={ACCENT} width={216} src={screenByName[s.file] || (s.fallback ? screenByName[s.fallback] : undefined)} />
                </motion.div>
              ))}
            </motion.div>

            {/* Key decisions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {cs.keyDecisions.map((decision, i) => (
                <motion.div key={decision.title} {...stagger(i)} className="card-surface rounded-2xl p-7 relative overflow-hidden group hover:border-zinc-300/60 transition-colors">
                  <div className="absolute top-0 left-7 h-0.5 bg-zinc-300 transition-all duration-300 w-5 group-hover:w-12" />
                  <div className="absolute -bottom-3 -right-1 font-display font-bold leading-none select-none pointer-events-none text-zinc-100" style={{ fontSize: '7rem' }} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="relative z-10">
                    <div className="text-xs font-mono text-ink-muted mb-5 tracking-widest">{String(i + 1).padStart(2, '0')}</div>
                    <h3 className="text-base font-bold text-ink-primary mb-3 leading-snug">{decision.title}</h3>
                    <p className="text-sm text-ink-muted leading-relaxed">{decision.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative overflow-hidden bg-surface-base border-t border-border-subtle">
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-28 lg:py-36 text-center">
            <motion.div {...fadeUp}>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-ink-muted mb-6">Interested in working together?</p>
              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-ink-primary tracking-tight leading-[1.06] mb-12">
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
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
