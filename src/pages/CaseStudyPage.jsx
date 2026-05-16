import { useEffect, useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/portfolio'
import Footer from '../components/layout/Footer'
import ScrollProgress from '../components/layout/ScrollProgress'
import myBkbAppImg from '../assets/mybkb app.png'
import homeBkbImg from '../assets/home-bkb.png'
import logo from '../assets/logo.png'

import imgFT1 from '../assets/fund transfer flow bkb/fund transfer.png'
import imgFT2 from '../assets/fund transfer flow bkb/select account.png'
import imgFT3 from '../assets/fund transfer flow bkb/bkb to bkb.png'
import imgFT4 from '../assets/fund transfer flow bkb/beneficiary list.png'
import imgFT5 from '../assets/fund transfer flow bkb/Verify OTP.png'
import imgFT6 from '../assets/fund transfer flow bkb/Verify OTP-1.png'
import imgFT7 from '../assets/fund transfer flow bkb/Fund Transfer Summary.png'
import imgFT8 from '../assets/fund transfer flow bkb/Success.png'

const bkb = projects.find(p => p.id === 'bkb-mobile')
const cs = bkb.caseStudy
const heroImage = bkb.image

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

const csSections = [
  { id: 'cs-cover',      num: '01', label: 'Cover' },
  { id: 'cs-brief',      num: '02', label: 'Brief' },
  { id: 'cs-timeline',   num: '03', label: 'Timeline' },
  { id: 'cs-process',    num: '04', label: 'Process' },
  { id: 'cs-research',   num: '05', label: 'Research' },
  { id: 'cs-features',   num: '06', label: 'Features' },
  { id: 'cs-flow',       num: '07', label: 'User Flow' },
  { id: 'cs-wireframe',  num: '08', label: 'Wireframe' },
  { id: 'cs-styleguide', num: '09', label: 'Style Guide' },
  { id: 'cs-visual',     num: '10', label: 'Visual Design' },
]

const researchCards = [
  {
    category: 'Market Landscape',
    color: '#oklch(70.5% 0.015 286.067)',
    points: [
      'MFS market growing 30%+ YoY; bKash at 65M+ users',
      'State-owned bank apps lag behind MFS in UX maturity',
      'Rural smartphone adoption expanding first-time digital banking users',
    ],
  },
  {
    category: 'Target Users',
    color: '#oklch(70.5% 0.015 286.067)',
    points: [
      'BKB serves government employees, farmers, and rural households',
      'Large portion are first-time mobile banking users',
      'Bengali support critical — English-only labels create friction',
    ],
  },
  {
    category: 'Regulatory Context',
    color: '#oklch(70.5% 0.015 286.067)',
    points: [
      'Bangladesh Bank mandates 2FA for transactions above ৳10,000',
      'BEFTN & RTGS requirements govern inter-bank transfers',
      'NPS integration follows National Pension Authority guidelines',
    ],
  },
  {
    category: 'Competitive Gaps',
    color: '#oklch(70.5% 0.015 286.067)',
    points: [
      'bKash & Nagad: Simple but MFS-only, no bank account management',
      'DBBL Nexus Pay: Feature-rich but cluttered for new users',
      'Existing BKB portal: Not mobile-optimised; high abandonment',
    ],
  },
]

const features = [
  { icon: 'lock',     label: 'Secure Authentication',  desc: 'Password login, 6-digit PIN, and TOTP-based OTP for high-value transactions' },
  { icon: 'transfer', label: 'Fund Transfers',          desc: '5 types: Own account, BKB-to-BKB, Other bank (BEFTN/RTGS), NPS, Mobile recharge' },
  { icon: 'receipt',  label: 'Bill Payments',           desc: 'Utility, education, insurance, and government fee payments in one place' },
  { icon: 'users',    label: 'Beneficiary Management',  desc: 'Save, edit, categorise, and delete transfer contacts across all 5 transfer types' },
  { icon: 'chart',    label: 'Account Dashboard',       desc: 'Multi-account overview, live balance, and mini-statement at a glance' },
  { icon: 'file',     label: 'Bank Statement',          desc: 'Date-range filter, on-screen history, and downloadable PDF export' },
  { icon: 'map',      label: 'ATM & Branch Locator',    desc: 'GPS-based map to find nearby BKB ATMs and branches across Bangladesh' },
  { icon: 'settings', label: 'Profile & Settings',      desc: 'PIN setup, transaction limits, notification preferences, and helpline access' },
]

const transferTypes = [
  { id: 'own',      label: 'Own Account',     color: '#9ca3af', description: 'Between your own BKB accounts' },
  { id: 'bkb',      label: 'BKB to BKB',      color: '#6b7280', description: 'Send to another BKB holder' },
  { id: 'other',    label: 'Other Bank',       color: '#a1a1aa', description: 'BEFTN / RTGS to any bank' },
  { id: 'nps',      label: 'NPS',              color: '#52525b', description: 'National Pension Scheme' },
  { id: 'recharge', label: 'Mobile Recharge',  color: '#d4d4d8', description: 'Top up any mobile number' },
]

const transferSteps = [
  { step: 1, title: 'Select Type',      description: '5 transfer types based on destination' },
  { step: 2, title: 'Pick Beneficiary', description: 'Saved contact or add new' },
  { step: 3, title: 'Enter Amount',     description: 'Amount + optional reference note' },
  { step: 4, title: 'Review',           description: 'Verify all details and fee' },
  { step: 5, title: 'Authenticate',     description: 'OTP or 6-digit PIN' },
  { step: 6, title: 'Done',             description: 'Receipt and real-time confirmation' },
]

const styleColors = [
  { name: 'Primary',    hex: '#1B6320', role: 'Brand primary · CTA' },
  { name: 'Dark',       hex: '#1B1B1B', role: 'Primary text' },
  { name: 'Black',      hex: '#000000', role: 'Headings · High contrast' },
  { name: 'Gray',       hex: '#989898', role: 'Secondary text · Muted' },
  { name: 'Light Gray', hex: '#D1D1D1', role: 'Borders · Dividers' },
  { name: 'White',      hex: '#FFFFFF', role: 'Backgrounds · Surfaces' },
  { name: 'Green',      hex: '#46B679', role: 'Success · Active states' },
  { name: 'Yellow',     hex: '#FFD80C', role: 'Warning · Highlight' },
  { name: 'Orange',     hex: '#F98A17', role: 'Alerts · Accents' },
]

const styleType = [
  { role: 'Display / H1', family: 'Circular Std', weight: '700', size: '40–48px', sample: 'myBKB Banking' },
  { role: 'Heading / H2', family: 'Circular Std', weight: '500', size: '28–32px', sample: 'Fund Transfer' },
  { role: 'Body',         family: 'Circular Std', weight: '400', size: '14–16px', sample: 'Send money securely to anyone, anywhere.' },
  { role: 'Label / Cap',  family: 'Circular Std', weight: '400', size: '10–11px', sample: 'USER FLOW · 01' },
]

export default function CaseStudyPage() {
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

        {/* ══════════════════════════════════════════
            01  COVER
        ══════════════════════════════════════════ */}
        <section id="cs-cover" style={{ scrollMarginTop: '64px' }} className="bg-surface-base border-b border-border-subtle">
          {/* Top accent */}
          <div className="h-0.5 w-full bg-gradient-to-r from-zinc-800 via-zinc-400/40 to-transparent" />

          <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-16 lg:pt-28 lg:pb-20">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center mb-12">

              {/* Left: text */}
              <div>
                {/* Label row */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-3 mb-8"
                >
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-ink-muted">Case Study</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-300" />
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-ink-muted">{cs.year}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-300" />
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-600">{cs.company}</span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display font-bold text-ink-primary tracking-tight leading-[1.0] mb-6"
                  style={{ fontSize: 'clamp(2.75rem, 6vw, 4.5rem)' }}
                >
                  myBKB
                  <span className="text-zinc-300"> —</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="text-lg text-ink-secondary mb-8 leading-relaxed"
                >BKB is a state-owned agricultural bank serving millions across Bangladesh — from government employees to rural farmers. With MFS adoption accelerating, they needed a mobile banking app to stay competitive.
                </motion.p>

                {/* Phase tags */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-wrap gap-2"
                >
                  {cs.phases.map((phase, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border-subtle text-xs font-mono text-ink-muted bg-surface-1">
                      <span className="text-zinc-300 text-[9px]">0{i + 1}</span>
                      {phase}
                    </span>
                  ))}
                </motion.div>

              </div>

              {/* Right: abstract app mockup */}
              <div className="hidden lg:flex items-center justify-center lg:justify-end pr-4 xl:pr-8">
                <AbstractAppMockup />
              </div>

            </div>

            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-zinc-200 pt-8"
            >
              {cs.metrics.map((m, i) => (
                <div key={m.label} className={i === 0 ? 'pr-6' : 'px-6'}>
                  <div className="text-2xl font-display font-bold text-ink-primary tracking-tight mb-0.5">{m.value}</div>
                  <div className="text-[10px] text-ink-muted uppercase tracking-[0.14em] font-mono">{m.label}</div>
                </div>
              ))}
            </motion.div>

          </div>
        </section>

        {/* ══════════════════════════════════════════
            02  PROJECT BRIEF / OVERVIEW
        ══════════════════════════════════════════ */}
        <section id="cs-brief" style={{ scrollMarginTop: '64px' }} className="border-b border-border-subtle bg-surface-base">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">

            {/* Top: Title + Specs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-10">
              <motion.div className="lg:col-span-7" {...fadeUp}>
                <SectionLabel num="02" label="Project Brief" />
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-primary tracking-tight mb-5 leading-[1.1]">
                  Building Bangladesh's agricultural bank into mobile
                </h2>
                <p className="text-base text-ink-secondary leading-relaxed max-w-xl">{cs.context}</p>
              </motion.div>

              <motion.div className="lg:col-span-5" {...fadeUp} transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}>
                <div className="card-surface rounded-2xl p-6 relative overflow-hidden h-full">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-zinc-400/50 via-zinc-200/30 to-transparent" />
                  <p className="text-[10px] font-mono font-semibold text-zinc-400 tracking-[0.18em] uppercase mb-6">Project Specs</p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                    {[
                      { label: 'Client',   value: cs.company },
                      { label: 'My Role',  value: cs.role },
                      { label: 'Duration', value: cs.duration },
                      { label: 'Year',     value: cs.year },
                      { label: 'Platform', value: 'Android & iOS' },
                      { label: 'Tool',     value: 'Figma' },
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

            {/* Challenge + Outcome */}
            <div className="pt-14 border-t border-zinc-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 lg:gap-x-24">

                <motion.div {...fadeUp}>
                  <div className="flex items-center gap-2.5 mb-7">
                    <span className="text-[14px] font-mono text-zinc-300 tracking-widest tabular-nums">01</span>
                    <span className="h-px w-8 bg-zinc-200 shrink-0" />
                    <span className="text-[14px] font-mono text-zinc-400 uppercase tracking-[0.22em]">The Challenge</span>
                  </div>
                  <p className="text-[1.15rem] sm:text-[1.25rem] text-ink-primary leading-[1.8] font-light">{cs.challenge}</p>
                </motion.div>

                <motion.div {...fadeUp} transition={{ duration: 0.75, delay: 0.12, ease: EASE }}>
                  <div className="flex items-center gap-2.5 mb-7">
                    <span className="text-[14px] font-mono text-zinc-300 tracking-widest tabular-nums">02</span>
                    <span className="h-px w-8 bg-zinc-200 shrink-0" />
                    <span className="text-[14px] font-mono text-zinc-400 uppercase tracking-[0.22em]">The Outcome</span>
                  </div>
                  <p className="text-[1.15rem] sm:text-[1.25rem] text-ink-primary leading-[1.8] font-light">{cs.outcome}</p>
                </motion.div>

              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════
            03  TIMELINE / TOOLS / ROLE
        ══════════════════════════════════════════ */}
        <section id="cs-timeline" style={{ scrollMarginTop: '64px' }} className="bg-surface-base">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">

            {/* Header: heading left + descriptor right */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-16">
              <motion.div {...fadeUp}>
                <SectionLabel num="03" label="Timeline · Tools · Role" />
                <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-ink-primary tracking-tight leading-[1.0]">
                  2-month sprint
                </h2>
                <p className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-zinc-300 tracking-tight leading-[1.1] mt-1">
                  from discovery to handoff
                </p>
              </motion.div>
              <motion.p
                {...fadeUp}
                transition={{ duration: 0.75, delay: 0.14, ease: EASE }}
                className="text-base text-ink-secondary leading-[1.75] max-w-[22rem] lg:text-right lg:pt-3"
              >
                A focused 8-week journey from research to handoff, designed to solve real user problems and deliver impactful solutions.
              </motion.p>
            </div>

            {/* Horizontal timeline */}
            <motion.div {...fadeUp} className="mb-16">
              <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-y-10 gap-x-0">


                {[
                  { num: '01', week: 'Week 1–2', title: 'Research &\nDiscovery'         },
                  { num: '02', week: 'Week 3–4', title: 'IA &\nUser Flows'              },
                  { num: '03', week: 'Week 5–6', title: 'Visual Design\n& Components'   },
                  { num: '04', week: 'Week 7–8', title: 'Prototype\n& Handoff'          },
                ].map((t, i, arr) => (
                  <motion.div key={i} {...stagger(i)} className="flex flex-col items-start pl-4 sm:pl-0">

                    {/* Content */}
                    <div className="sm:pr-6">
                      <div className="text-[10px] font-mono text-zinc-400 tracking-[0.16em] mb-2">{t.week}</div>
                      <div className="text-base font-bold text-ink-primary leading-snug whitespace-pre-line">{t.title}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Divider */}
            <div className="border-t border-zinc-100 mb-14" />

            {/* Role · Tools · Deliverables — flat, no cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

              {/* My Role */}
              <motion.div {...stagger(0)}>
                <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-[0.24em] mb-6">My Role</p>
                <h3 className="text-2xl font-bold text-ink-primary mb-6 leading-tight">UI/UX Designer</h3>
                <ul className="space-y-3">
                  {[
                    'Competitive research & benchmarking',
                    'User flows & information architecture',
                    'Visual design & component system',
                    'Figma prototyping',
                    'Developer handoff',
                  ].map(r => (
                    <li key={r} className="flex items-start gap-3">
                      <span className="w-1 h-1 rounded-full bg-zinc-300 mt-[7px] shrink-0" />
                      <span className="text-sm text-ink-secondary leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Tools Used */}
              <motion.div {...stagger(1)}>
                <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-[0.24em] mb-6">Tools Used</p>
                <div className="space-y-5">
                  {[
                    {
                      name: 'Figma', note: 'Design, components & prototype',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 38 57" fill="none">
                          <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
                          <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0ACF83"/>
                          <path d="M19 0v19H9.5a9.5 9.5 0 0 1 0-19H19z" fill="#FF7262"/>
                          <path d="M19 0h9.5a9.5 9.5 0 0 1 0 19H19V0z" fill="#F24E1E"/>
                          <path d="M19 19h9.5a9.5 9.5 0 0 1 0 19H19V19z" fill="#A259FF"/>
                        </svg>
                      ),
                    },
                    {
                      name: 'FigJam', note: 'User flow mapping & IA',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 38 57" fill="none">
                          <rect width="38" height="38" rx="8" fill="#9747FF" opacity="0.15"/>
                          <path d="M19 0v19H9.5a9.5 9.5 0 0 1 0-19H19z" fill="#9747FF"/>
                          <path d="M19 19h9.5a9.5 9.5 0 0 1 0 19H19V19z" fill="#9747FF" opacity="0.6"/>
                          <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#9747FF" opacity="0.4"/>
                        </svg>
                      ),
                    },
                    {
                      name: 'Notion', note: 'Research notes & documentation',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 100 100" fill="none">
                          <rect width="100" height="100" rx="14" fill="#fff"/>
                          <rect width="100" height="100" rx="14" fill="#000" opacity="0.06"/>
                          <path d="M24 18h36l16 16v52H24V18z" fill="white" stroke="#e5e7eb" strokeWidth="3"/>
                          <path d="M60 18v16h16" fill="none" stroke="#e5e7eb" strokeWidth="3"/>
                          <path d="M34 42h32M34 54h32M34 66h20" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round"/>
                        </svg>
                      ),
                    },
                  ].map((t) => (
                    <div key={t.name} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl border border-border-subtle bg-surface-1 flex items-center justify-center shrink-0 overflow-hidden">
                        {t.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-ink-primary leading-none mb-1">{t.name}</div>
                        <div className="text-xs text-ink-muted leading-snug">{t.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Deliverables */}
              <motion.div {...stagger(2)}>
                <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-[0.24em] mb-6">Deliverables</p>
                <ul className="space-y-3.5">
                  {['30+ User Flows', '100+ Screens', 'Component Library', 'Figma Prototype', 'Design Handoff doc', 'Android & iOS'].map(d => (
                    <li key={d} className="flex items-center gap-3">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-zinc-400">
                        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/>
                        <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm text-ink-secondary">{d}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            04  DESIGN PROCESS
        ══════════════════════════════════════════ */}
        <section id="cs-process" style={{ scrollMarginTop: '64px' }} className="border-b border-border-subtle bg-surface-base">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">

            {/* Header: heading left + descriptor right */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
              <motion.div {...fadeUp}>
                <SectionLabel num="04" label="Design Process" />
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-primary tracking-tight leading-[1.08] max-w-lg">
                  A structured approach,{' '}
                  <span className="italic font-light text-zinc-400">applied end-to-end</span>
                </h2>
              </motion.div>
              <motion.p
                {...fadeUp}
                transition={{ duration: 0.75, delay: 0.14, ease: EASE }}
                className="text-base text-ink-secondary leading-[1.75] max-w-[22rem] lg:text-right"
              >
                From user research to final handoff, every step is intentional, driven by clarity, collaboration, and impact.
              </motion.p>
            </div>

            {/* Timeline + cards */}
            <div className="relative">
              {/* Connecting line (desktop only) */}
              <div className="hidden lg:block absolute top-[27px] left-[27px] right-[27px] h-px bg-zinc-100 z-0" />

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-3">
                {[
                  {
                    num: '01', phase: 'Research', desc: 'User needs, business goals, pain points',
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9.5" cy="9.5" r="6" />
                        <path d="M14 14l4 4" />
                      </svg>
                    ),
                  },
                  {
                    num: '02', phase: 'Define', desc: 'IA, user flows, feature priorities',
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="2" width="12" height="18" rx="2" />
                        <path d="M8 7h6M8 11h6M8 15h4" />
                      </svg>
                    ),
                  },
                  {
                    num: '03', phase: 'Design', desc: 'Visual system, screens, components',
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 17l3-1 9-9-2-2-9 9-1 3z" />
                        <path d="M14 5l2 2" />
                      </svg>
                    ),
                  },
                  {
                    num: '04', phase: 'Prototype', desc: 'Figma prototype, real navigation',
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="16" height="16" rx="2" />
                        <rect x="7" y="7" width="8" height="8" rx="1" />
                      </svg>
                    ),
                  },
                  {
                    num: '05', phase: 'Validate', desc: 'Stakeholder review, iteration',
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M7.5 11l2.5 2.5 4.5-4.5" />
                      </svg>
                    ),
                  },
                  {
                    num: '06', phase: 'Handoff', desc: 'Assets, specs, dev collaboration',
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 2L9 13" />
                        <path d="M20 2l-6 18-5-8-8-5 19-5z" />
                      </svg>
                    ),
                  },
                ].map((p, i) => (
                  <motion.div key={i} {...stagger(i)} className="flex flex-col">
                    {/* Number node — sits on top of the connecting line */}
                    <div className="relative z-10 w-14 h-14 rounded-full border border-border-subtle bg-surface-base flex items-center justify-center mb-5 shrink-0 self-start">
                      <span className="text-[11px] font-mono text-zinc-400 tabular-nums">{p.num}</span>
                    </div>

                    {/* Card */}
                    <div className="card-surface rounded-2xl p-5 flex flex-col gap-4 flex-1 group hover:border-zinc-300/60 transition-colors duration-200">
                      <div className="text-zinc-400 group-hover:text-zinc-600 transition-colors">
                        {p.icon}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-ink-primary mb-2">{p.phase}</div>
                        <div className="w-6 h-px bg-zinc-200 mb-3" />
                        <div className="text-xs text-ink-muted leading-relaxed">{p.desc}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════
            05  SECONDARY RESEARCH / DESK RESEARCH
        ══════════════════════════════════════════ */}
        <section id="cs-research" style={{ scrollMarginTop: '64px' }} className="border-b border-border-subtle bg-surface-base">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">

            {/* Header: heading left + key insight card right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start mb-12">
              <motion.div {...fadeUp}>
                <SectionLabel num="05" label="Secondary Research · Desk Research" />
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-primary tracking-tight leading-[1.08]">
                  Understanding the ecosystem before designing.
                </h2>
              </motion.div>

              {/* Key Insight card */}
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.75, delay: 0.14, ease: EASE }}
                className="card-surface rounded-2xl p-6 lg:p-7 flex items-start gap-5"
              >
                <div className="w-11 h-11 rounded-full border border-border-subtle bg-surface-1 flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B6320" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18h6M12 2a7 7 0 0 1 4 12.9V16a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-1.1A7 7 0 0 1 12 2z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.22em] mb-2.5" style={{ color: '#1B6320' }}>Key Insight</p>
                  <p className="text-sm text-ink-secondary leading-[1.75]">
                    First-time mobile banking users span BKB's base — from rural farmers to urban government employees. Clarity and guided flows were non-negotiable.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Research cards 2×2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {[
                {
                  num: '01', category: 'Market Landscape', points: researchCards[0].points,
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="12" width="4" height="9"/><rect x="10" y="7" width="4" height="14"/><rect x="17" y="3" width="4" height="18"/>
                    </svg>
                  ),
                },
                {
                  num: '02', category: 'Target Users', points: researchCards[1].points,
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="7" r="3"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
                      <circle cx="17" cy="7" r="2.5" opacity="0.5"/><path d="M21 21v-2a3 3 0 0 0-3-3" opacity="0.5"/>
                    </svg>
                  ),
                },
                {
                  num: '03', category: 'Regulatory Context', points: researchCards[2].points,
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3l8 3.5v5c0 4.4-3.4 8.5-8 9.5C7.4 19.5 4 15.4 4 11V6.5L12 3z"/>
                      <path d="M9 12l2 2 4-4"/>
                    </svg>
                  ),
                },
                {
                  num: '04', category: 'Competitive Gaps', points: researchCards[3].points,
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>
                      <rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
                    </svg>
                  ),
                },
              ].map((card, i) => (
                <motion.div key={i} {...stagger(i)} className="card-surface rounded-2xl p-6">
                  {/* Card header: icon + category */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-xl border border-border-subtle bg-surface-1 flex items-center justify-center shrink-0 text-zinc-400">
                      {card.icon}
                    </div>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em]" style={{ color: '#1B6320' }}>
                      {card.category}
                    </span>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-3">
                    {card.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 mt-[7px] shrink-0" />
                        <span className="text-sm text-ink-secondary leading-[1.7]">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* What This Means — full-width bottom banner */}
            <motion.div
              {...fadeUp}
              className="card-surface rounded-2xl p-6 lg:p-7 flex items-center gap-5 lg:gap-7"
            >
              <div className="w-12 h-12 rounded-full border border-border-subtle bg-surface-1 flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B6320" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
                  <path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>
                </svg>
              </div>
              <div className="w-px h-10 bg-zinc-100 shrink-0 hidden sm:block" />
              <div>
                <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.22em] mb-2" style={{ color: '#1B6320' }}>What This Means</p>
                <p className="text-sm text-ink-secondary leading-[1.75]">
                  Our design needs to be simple, trustworthy, and local-first — helping first-time users feel confident while meeting regulatory standards and competing with leading MFS apps.
                </p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ══════════════════════════════════════════
            06  FEATURES
        ══════════════════════════════════════════ */}
        <section id="cs-features" style={{ scrollMarginTop: '64px' }} className="border-b border-border-subtle bg-surface-base">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div {...fadeUp} className="mb-14">
              <SectionLabel num="06" label="Features" />
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-primary tracking-tight max-w-xl leading-[1.1]">
                8 core modules, 100+ screens
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((f, i) => (
                <motion.div key={i} {...stagger(i)} className="card-surface rounded-2xl p-6 group hover:border-zinc-300/60 hover:shadow-sm transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-zinc-400/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />
                  <div className="w-8 h-8 rounded-lg bg-surface-1 border border-border-subtle flex items-center justify-center mb-4 group-hover:bg-surface-2 transition-colors">
                    <FeatureIcon name={f.icon} />
                  </div>
                  <div className="text-base font-bold text-ink-primary mb-2 leading-snug">{f.label}</div>
                  <div className="text-sm text-ink-muted leading-relaxed">{f.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            07  USER FLOW
        ══════════════════════════════════════════ */}
        <section id="cs-flow" style={{ scrollMarginTop: '64px' }} className="border-b border-border-subtle bg-surface-base">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">

            {/* Header */}
            <motion.div {...fadeUp} className="mb-16">
              <SectionLabel num="07" label="User Flow" />
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-primary tracking-tight leading-[1.1]">
                  30+ flows designed end-to-end
                </h2>
              </div>
              <div className="flex flex-wrap gap-6">
                {[['6', 'flow groups'], ['30+', 'user flows'], ['100+', 'screens']].map(([val, lbl]) => (
                  <div key={lbl} className="flex items-baseline gap-1.5">
                    <span className="font-display text-2xl font-bold text-ink-primary">{val}</span>
                    <span className="text-sm text-ink-muted">{lbl}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Flow groups grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-24">
              {cs.flowGroups.map((group, i) => (
                <motion.div key={group.label} {...stagger(i)} className="card-surface rounded-2xl overflow-hidden group hover:border-border-default transition-colors duration-200">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-border-subtle">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono text-ink-muted tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="w-px h-3 bg-border-subtle" />
                      <span className="text-sm font-semibold text-ink-primary">{group.label}</span>
                    </div>
                    <span className="text-xs font-mono text-ink-muted bg-surface-1 border border-border-subtle px-2 py-0.5 rounded-full">
                      {group.items.length} flows
                    </span>
                  </div>
                  <div className="p-5 flex flex-wrap gap-2">
                    {group.items.map(item => (
                      <span key={item} className="px-2.5 py-1 rounded-lg text-xs font-medium text-ink-secondary bg-surface-1 border border-border-subtle leading-none py-1.5">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Fund Transfer Spotlight */}
            <div className="border-t border-border-subtle pt-20">

              {/* Spotlight Header */}
              <motion.div {...fadeUp} className="mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-1 border border-border-subtle mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-ink-muted" />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-ink-muted">Flow Spotlight · Fund Transfer</span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-primary tracking-tight leading-[1.1]">
                    Sending money in<br />
                    <span className="text-ink-muted">3 taps or less</span>
                  </h3>
                  <p className="text-base text-ink-secondary leading-relaxed lg:max-w-sm lg:mb-1">
                    Once a beneficiary is saved, every subsequent transfer collapses to select → amount → confirm.
                  </p>
                </div>
              </motion.div>



              {/* Step-by-step flow connector */}
              <motion.div {...fadeUp} className="mb-14">
                <p className="text-xs font-mono text-ink-muted uppercase tracking-widest mb-5">6-step transfer flow</p>
                <div className="relative flex flex-col sm:flex-row items-stretch gap-0">
                  {transferSteps.map((s, i) => (
                    <div key={s.step} className="flex sm:flex-col flex-1 items-center sm:items-start gap-0 relative">
                      {/* Connector line */}
                      {i < transferSteps.length - 1 && (
                        <div className="hidden sm:block absolute top-4 left-[calc(100%_-_12px)] w-full h-px bg-border-subtle z-0" />
                      )}
                      <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-3 w-full pr-0 sm:pr-4">
                        {/* Step bubble */}
                        <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full shrink-0 border border-border-default bg-surface-base text-ink-muted text-xs font-bold font-mono transition-colors">
                          {String(s.step).padStart(2, '0')}
                        </div>
                        {/* Vertical line for mobile */}
                        {i < transferSteps.length - 1 && (
                          <div className="sm:hidden w-px h-6 bg-border-subtle ml-0" />
                        )}
                        <div className="sm:mt-3 pb-4 sm:pb-0">
                          <div className="text-sm font-semibold text-ink-primary mb-0.5">{s.title}</div>
                          <div className="text-xs text-ink-muted leading-snug">{s.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Real App Flow Screens */}
              <div
                ref={flowScrollRef}
                className="mb-14 relative -mx-6 lg:-mx-10 px-6 lg:px-10 overflow-x-auto hide-scrollbar pb-6 cursor-grab active:cursor-grabbing select-none"
                onMouseDown={onDragStart}
                onMouseMove={onDragMove}
                onMouseUp={onDragEnd}
                onMouseLeave={onDragEnd}
              >
                <motion.div {...fadeUp} className="flex gap-4 min-w-max">
                  {[imgFT1, imgFT4, imgFT2, imgFT3, imgFT7, imgFT5, imgFT6, imgFT8].map((imgSrc, idx) => (
                    <div key={idx} className="shrink-0 flex flex-col items-center gap-3">
                      <div className="w-[220px] sm:w-[240px] rounded-[28px] overflow-hidden border-[5px] border-zinc-200 shadow-xl bg-white">
                        <img src={imgSrc} alt={`Fund Transfer Step ${idx + 1}`} className="w-full h-auto object-cover" />
                      </div>
                      <span className="text-xs font-mono text-ink-muted tabular-nums">{String(idx + 1).padStart(2, '0')}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Transfer types */}
              <motion.div {...fadeUp} className="mb-12">
                <p className="text-xs font-mono text-ink-muted uppercase tracking-widest mb-5">5 transfer types</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {transferTypes.map((type, i) => (
                    <motion.div key={type.id} {...stagger(i)} className="card-surface rounded-xl p-4 relative overflow-hidden hover:border-border-default transition-colors duration-150">
                      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl" style={{ background: `linear-gradient(90deg, ${type.color}80 0%, transparent 100%)` }} />
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: type.color }} />
                        <span className="text-xs font-mono text-ink-muted">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <div className="text-sm font-bold text-ink-primary mb-1.5">{type.label}</div>
                      <div className="text-xs text-ink-muted leading-snug">{type.description}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Principles strip */}
              <motion.div {...fadeUp} className="pt-8 border-t border-border-subtle">
                <p className="text-xs font-mono text-ink-muted uppercase tracking-widest mb-6">Design principles</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { num: '01', title: 'Bangladesh Bank compliant', body: 'TOTP OTP for high-value transactions; PIN for standard transfers' },
                    { num: '02', title: 'Beneficiary-first',         body: 'Save once — every future transfer to the same contact skips 2 steps' },
                    { num: '03', title: 'One decision per screen',   body: 'Reduces errors for first-time mobile banking users' },
                  ].map((p, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="text-xs font-mono text-ink-muted tabular-nums shrink-0 mt-0.5">{p.num}</span>
                      <div>
                        <div className="text-sm font-semibold text-ink-primary mb-1">{p.title}</div>
                        <div className="text-sm text-ink-muted leading-relaxed">{p.body}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            08  WIREFRAME / HAND-SKETCH
        ══════════════════════════════════════════ */}
        <section id="cs-wireframe" style={{ scrollMarginTop: '64px' }} className="border-b border-border-subtle bg-surface-base">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div {...fadeUp} className="mb-14">
              <SectionLabel num="08" label="Wireframe · Hand Sketch" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-6">
                  <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-primary tracking-tight mb-4 leading-[1.1]">
                    Layout validated before pixels
                  </h2>
                  <p className="text-lg text-ink-secondary leading-relaxed">
                    Key screens sketched by hand before Figma — testing layout hierarchy and navigation. Low-fidelity wireframes validated structure with stakeholders before visual design.
                  </p>
                </div>
                <div className="lg:col-span-6 flex flex-col gap-3">
                  {[
                    'Sketched dashboard layout — balance, quick actions, and recent transactions',
                    'Wireframed transfer flow as linear steps to test step count and decisions',
                    'Internal review of wireframes before committing to visual design',
                  ].map((note, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-md border border-border-subtle bg-surface-1 flex items-center justify-center shrink-0 mt-0.5">
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink-muted"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <p className="text-base text-ink-secondary leading-relaxed">{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Wireframe screens */}
            <motion.div {...fadeUp}>
              <p className="text-xs font-mono text-ink-muted uppercase tracking-widest mb-8">Key screens — low-fidelity</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { label: 'Dashboard',      sublabel: 'Home screen overview' },
                  { label: 'Transfer Types', sublabel: 'Select destination type' },
                  { label: 'Enter Amount',   sublabel: 'Input + numpad' },
                  { label: 'Review',         sublabel: 'Confirm before sending' },
                ].map((screen, i) => (
                  <motion.div key={i} {...stagger(i)} className="flex flex-col items-center gap-3">
                    <div className="rounded-2xl border border-border-subtle overflow-hidden bg-surface-base shadow-sm">
                      <WireframePhone screen={i + 1} />
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-ink-primary mb-0.5">{screen.label}</div>
                      <div className="text-sm text-ink-muted">{screen.sublabel}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            09  STYLE GUIDE
        ══════════════════════════════════════════ */}
        <section id="cs-styleguide" style={{ scrollMarginTop: '64px' }} className="border-b border-border-subtle bg-surface-base">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div {...fadeUp} className="mb-14">
              <SectionLabel num="09" label="Style Guide" />
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-primary tracking-tight leading-[1.1]">
                Visual language rooted in BKB's identity
              </h2>
            </motion.div>

            {/* Color palette */}
            <motion.div {...fadeUp} className="mb-14">
              <p className="text-xs font-mono text-ink-muted uppercase tracking-widest mb-6">Color System</p>
              <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
                {styleColors.map((c, i) => (
                  <motion.div key={i} {...stagger(i)} className="flex flex-col gap-2.5">
                    <div
                      className="w-full aspect-square rounded-2xl border border-zinc-100"
                      style={{ background: c.hex, boxShadow: c.hex === '#FFFFFF' ? 'inset 0 0 0 1px #e5e7eb' : `0 4px 16px ${c.hex}28` }}
                    />
                    <div>
                      <div className="text-xs font-semibold text-ink-primary mb-0.5">{c.name}</div>
                      <div className="text-[11px] font-mono text-ink-muted mb-1 uppercase">{c.hex}</div>
                      <div className="text-[11px] text-ink-muted leading-snug">{c.role}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Typography */}
            <motion.div {...fadeUp}>
              <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-[0.24em] mb-6">Typography</p>
              <div className="rounded-xl border border-border-subtle bg-surface-base px-8 py-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <p className="text-xs font-mono text-ink-muted mb-2">Primary typeface</p>
                  <div
                    className="text-4xl sm:text-5xl font-bold text-ink-primary tracking-tight"
                    style={{ fontFamily: '"DM Sans", ui-sans-serif, system-ui, sans-serif' }}
                  >
                    Circular Std
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 sm:justify-end">
                  {['Light', 'Book', 'Medium', 'Bold', 'Black'].map(w => (
                    <span key={w} className="px-3 py-1.5 rounded-lg text-xs font-medium text-ink-secondary bg-surface-1 border border-border-subtle">
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            10  VISUAL DESIGN
        ══════════════════════════════════════════ */}
        <section id="cs-visual" style={{ scrollMarginTop: '64px' }} className="border-b border-border-subtle bg-surface-base">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div {...fadeUp} className="mb-14">
              <SectionLabel num="10" label="Visual Design" />
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-primary tracking-tight leading-[1.1] max-w-xl">
                  A complete, handoff-ready mobile banking experience
                </h2>
                <p className="text-base text-ink-muted max-w-sm leading-relaxed shrink-0">
                  30+ flows, 100+ screens — authentication, transfers, payments, and account management. Android & iOS.
                </p>
              </div>
            </motion.div>

            {/* Full app image */}
            <motion.div {...fadeUp} className="mb-10 rounded-2xl overflow-hidden border border-border-subtle">
              <img src={myBkbAppImg} alt="myBKB final visual design screens" className="w-full object-cover object-top" />
            </motion.div>

            {/* Design decisions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {cs.keyDecisions.map((decision, i) => (
                <motion.div key={i} {...stagger(i)} className="card-surface rounded-2xl p-7 relative overflow-hidden group hover:border-zinc-300/60 transition-colors">
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
                Let&apos;s build something<br />
                <span className="text-zinc-400">meaningful.</span>
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="https://www.linkedin.com/in/shahola-nisha/" target="_blank" rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-7 py-3.5 text-sm font-semibold text-white bg-zinc-900 rounded-md hover:bg-zinc-800 transition-all hover:-translate-y-0.5 shadow-sm">
                  Get in touch
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
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

/* ── Helper: Abstract Minimal UI Animation ── */
function AbstractAppMockup() {
  return (
    <div className="relative w-full max-w-[360px] h-[560px] flex items-center justify-center perspective-[1200px] group">
      
      {/* 3D Stage Wrapper */}
      <motion.div
        initial={{ opacity: 0, rotateY: 25, rotateX: 10, y: 40, rotateZ: -2 }}
        animate={{ opacity: 1, rotateY: -12, rotateX: 5, y: 0, rotateZ: 2 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ rotateY: 0, rotateX: 0, rotateZ: 0, scale: 1.05 }}
        className="relative flex items-center justify-center w-full h-full cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
      >
        
        {/* Continuous Floating Animation */}
        <motion.div 
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative flex items-center justify-center w-full h-full"
        >
          {/* Main Phone Frame */}
          <div className="relative z-10 w-[250px] h-[500px] bg-white rounded-[36px] border-[2px] border-slate-400 overflow-hidden flex flex-col shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]" style={{ transform: 'translateZ(0px)' }}>
            
            <div className="w-full h-full flex flex-col relative z-10 bg-white">
              
              {/* Top Header Box */}
              <div className="absolute top-0 left-0 right-0 h-[150px] border-b-2 border-slate-200 z-0 bg-white" />
              
              {/* Status Bar */}
              <div className="flex items-center justify-between pt-3 px-5 mb-2 relative z-10">
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full border border-slate-400" />
                  <div className="w-1.5 h-1.5 rounded-full border border-slate-400" />
                </div>
                <div className="w-14 h-2 border border-slate-400 rounded-full" />
                <div className="flex gap-1">
                   <div className="w-3 h-2 border border-slate-400" />
                   <div className="w-2 h-2 border border-slate-400" />
                </div>
              </div>

              <div className="px-4 relative z-10">
                {/* Header: Login & Profile */}
                <div className="flex justify-between items-center mb-4 mt-1">
                   <div className="flex items-center gap-2.5">
                     <div className="w-8 h-8 rounded-full border-2 border-slate-400 flex items-center justify-center relative overflow-hidden bg-white">
                        <div className="w-3 h-3 rounded-full border-[1.5px] border-slate-400 mb-1" />
                        <div className="absolute bottom-0 w-6 h-3 border-t-[1.5px] border-l-[1.5px] border-r-[1.5px] border-slate-400 rounded-t-full" />
                     </div>
                     <div className="w-12 h-1.5 bg-zinc-300" />
                   </div>
                   <motion.div whileHover={{ rotate: 15, scale: 1.1 }}>
                      {/* Bell outline */}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                   </motion.div>
                </div>

                {/* Banner Card Placeholder */}
                <motion.div 
                  className="w-full h-[90px] bg-white rounded-lg p-3 flex items-center relative overflow-hidden border-2 border-slate-300 border-dashed"
                  whileHover={{ scale: 1.02 }}
                >
                   {/* Image Placeholder cross */}
                   <div className="w-[80px] h-[60px] mr-3 relative border-2 border-slate-200 bg-slate-50 overflow-hidden flex-shrink-0">
                      <svg className="absolute inset-0 w-full h-full text-zinc-300" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="1" />
                        <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="1" />
                      </svg>
                   </div>
                   {/* Text skeleton */}
                   <div className="flex flex-col gap-2 flex-1">
                      <div className="w-full h-1.5 bg-zinc-300" />
                      <div className="w-2/3 h-1.5 bg-zinc-300" />
                      <div className="w-1/2 h-1.5 bg-slate-200 mt-1" />
                   </div>
                </motion.div>
                
                {/* Pagination Dots */}
                <div className="flex justify-center gap-1.5 mt-3">
                   <div className="w-1.5 h-1.5 rounded-full border border-slate-400" />
                   <div className="w-3.5 h-1.5 rounded-full bg-slate-400" />
                   <div className="w-1.5 h-1.5 rounded-full border border-slate-400" />
                </div>
              </div>

              {/* 3x4 Feature Grid Wireframe */}
              <div className="grid grid-cols-3 gap-y-5 gap-x-2 mt-5 px-3 relative z-10 flex-1 content-start">
                {[...Array(12)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    className="flex flex-col items-center gap-2 cursor-pointer"
                    whileHover={{ y: -4, rotateZ: [-2, 2, 0], scale: 1.05 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                  >
                    <div className="w-10 h-10 rounded-full border-2 border-slate-300 flex items-center justify-center bg-white relative">
                      <div className="w-3.5 h-3.5 border-[1.5px] border-slate-400" />
                      {[1, 6, 8].includes(i) && <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} className="absolute -top-1 -right-1 w-2 h-2 rounded-full border border-slate-400 bg-white" />}
                    </div>
                    <div className="w-10 h-1 bg-slate-200" />
                  </motion.div>
                ))}
              </div>

              {/* Fixed Bottom Nav Wireframe */}
              <div className="absolute bottom-0 left-0 right-0 h-[56px] bg-white border-t-2 border-slate-200 flex justify-around items-center px-1 z-40">
                 {[1, 2, 3, 4].map((i) => (
                   <motion.div key={i} whileHover={{ y: -3 }} className="flex flex-col items-center justify-center gap-1.5 w-14 h-12 cursor-pointer">
                     <div className={`w-5 h-4 border-2 rounded-sm ${i === 1 ? 'border-slate-400' : 'border-slate-300'}`} />
                     <div className={`w-8 h-1 ${i === 1 ? 'bg-slate-400' : 'bg-slate-200'}`} />
                   </motion.div>
                 ))}
              </div>
            </div>
          </div>

          {/* Floating Wireframe Widget 1 */}
          <motion.div
            initial={{ opacity: 0, x: 50, y: 120, z: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 130, y: 80, z: 80, scale: 1 }}
            transition={{ delay: 1.5, duration: 1, type: 'spring', bounce: 0.4 }}
            className="absolute pointer-events-none"
            style={{ transformStyle: 'preserve-3d' }}
          >
             <motion.div 
               animate={{ y: [0, -8, 0] }} 
               transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
               className="w-44 h-16 bg-white/70 backdrop-blur-md rounded-xl border-2 border-slate-300 flex items-center p-3 gap-3 shadow-md"
             >
                <div className="w-10 h-10 rounded-full border-2 border-slate-400 flex items-center justify-center shrink-0 border-dashed">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <div className="w-full h-1.5 bg-slate-400" />
                  <div className="w-2/3 h-1.5 bg-zinc-300" />
                </div>
             </motion.div>
          </motion.div>

          {/* Floating Wireframe Widget 2 */}
          <motion.div
            initial={{ opacity: 0, x: -50, y: -80, z: 10, scale: 0.8 }}
            animate={{ opacity: 1, x: -100, y: -40, z: 60, scale: 1 }}
            transition={{ delay: 1.8, duration: 1, type: 'spring', bounce: 0.4 }}
            className="absolute pointer-events-none"
            style={{ transformStyle: 'preserve-3d' }}
          >
             <motion.div 
               animate={{ y: [0, -6, 0] }} 
               transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
               className="w-36 h-14 bg-white/70 backdrop-blur-md rounded-xl border-2 border-slate-300 flex items-center p-2.5 gap-3 border-dashed shadow-md"
             >
                <div className="w-9 h-9 rounded-full border-2 border-slate-300 flex items-center justify-center shrink-0">
                   <div className="w-4 h-5 border-2 border-slate-400 rounded-sm" />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <div className="w-full h-1.5 bg-zinc-300" />
                  <div className="w-1/2 h-1.5 bg-slate-200" />
                </div>
             </motion.div>
          </motion.div>

          {/* Floating Alert / Badge Wireframe */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: -200, z: 0, scale: 0 }}
            animate={{ opacity: 1, x: 90, y: -160, z: 100, scale: 1 }}
            transition={{ delay: 2.2, duration: 0.8, type: 'spring', bounce: 0.6 }}
            className="absolute pointer-events-none"
            style={{ transformStyle: 'preserve-3d' }}
          >
             <motion.div 
               animate={{ y: [0, -4, 0], scale: [1, 1.05, 1] }} 
               transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
               className="w-12 h-12 bg-white/70 backdrop-blur-md rounded-full border-2 border-slate-400 flex items-center justify-center shadow-md"
             >
                <div className="relative">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-white border-2 border-slate-400 rounded-full" />
                </div>
             </motion.div>
          </motion.div>

        </motion.div>
      </motion.div>
    </div>
  )
}

/* ── Helper: Section labels ── */
function SectionLabel({ num, label }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      {num && <span className="text-xs font-mono text-ink-muted">{num}</span>}
      <div className="w-0.5 h-3.5 rounded-full bg-border-default shrink-0" />
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">{label}</span>
    </div>
  )
}



/* ── Helper: Feature icons ── */
function FeatureIcon({ name }) {
  const s = { width: 15, height: 15, viewBox: '0 0 24 24', fill: 'none', stroke: '#6b7280', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
  const icons = {
    lock:     <svg {...s}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    transfer: <svg {...s}><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>,
    receipt:  <svg {...s}><path d="M14 2H6a2 2 0 0 0-2 2v16l4-2 4 2 4-2 4 2V8z"/><line x1="16" y1="8" x2="8" y2="8"/><line x1="16" y1="12" x2="8" y2="12"/></svg>,
    users:    <svg {...s}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    chart:    <svg {...s}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    file:     <svg {...s}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    map:      <svg {...s}><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>,
    settings: <svg {...s}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  }
  return icons[name] || null
}

/* ── Wireframe Phone SVG ── */
function WireframePhone({ screen }) {
  const fr = '#c8cdd5'     // frame stroke
  const bl = '#d4d8de'     // block fill
  const bg = '#f0f2f5'     // screen bg
  const sel = 'rgba(100,116,139,0.2)'
  const selStr = 'rgba(100,116,139,0.5)'
  const line = '#c4c9d1'

  const screens = {
    1: ( // Dashboard
      <>
        <rect x="4" y="16" width="72" height="15" rx="0" fill="#e2e5ea"/>
        <rect x="8" y="17" width="20" height="7" rx="2" fill={bl}/>
        <text x="55" y="26" textAnchor="middle" fill="#9ca3af" fontSize="5" fontFamily="Inter,sans-serif">●●●●</text>
        <rect x="8" y="36" width="64" height="28" rx="4" fill={bl}/>
        <rect x="14" y="42" width="20" height="4" rx="1" fill="#c8cdd5"/>
        <rect x="14" y="49" width="30" height="7" rx="1.5" fill="#b8bec8"/>
        <div/>
        <circle cx="20" cy="76" r="7" fill={bl} stroke={fr} strokeWidth="0.7"/>
        <circle cx="34" cy="76" r="7" fill={bl} stroke={fr} strokeWidth="0.7"/>
        <circle cx="48" cy="76" r="7" fill={bl} stroke={fr} strokeWidth="0.7"/>
        <circle cx="62" cy="76" r="7" fill={bl} stroke={fr} strokeWidth="0.7"/>
        <rect x="8" y="90" width="64" height="9" rx="2.5" fill={bl}/>
        <rect x="8" y="103" width="64" height="9" rx="2.5" fill={bl}/>
        <rect x="8" y="116" width="50" height="9" rx="2.5" fill={bl}/>
      </>
    ),
    2: ( // Transfer Type
      <>
        <rect x="4" y="16" width="72" height="15" rx="0" fill="#e2e5ea"/>
        <rect x="32" y="20" width="20" height="7" rx="2" fill={bl}/>
        <rect x="8" y="36" width="30" height="4" rx="1" fill={bl}/>
        <rect x="8" y="45" width="64" height="12" rx="3" fill={sel} stroke={selStr} strokeWidth="0.7"/>
        <circle cx="14" cy="51" r="3" fill={selStr}/>
        <rect x="21" y="49" width="28" height="4" rx="1" fill="rgba(100,116,139,0.35)"/>
        <rect x="8" y="61" width="64" height="12" rx="3" fill={bl} stroke={fr} strokeWidth="0.5"/>
        <circle cx="14" cy="67" r="3" fill="none" stroke={fr} strokeWidth="0.7"/>
        <rect x="21" y="65" width="28" height="4" rx="1" fill={line}/>
        <rect x="8" y="77" width="64" height="12" rx="3" fill={bl} stroke={fr} strokeWidth="0.5"/>
        <circle cx="14" cy="83" r="3" fill="none" stroke={fr} strokeWidth="0.7"/>
        <rect x="21" y="81" width="22" height="4" rx="1" fill={line}/>
        <rect x="8" y="93" width="64" height="12" rx="3" fill={bl} stroke={fr} strokeWidth="0.5"/>
        <circle cx="14" cy="99" r="3" fill="none" stroke={fr} strokeWidth="0.7"/>
        <rect x="21" y="97" width="16" height="4" rx="1" fill={line}/>
        <rect x="8" y="109" width="64" height="12" rx="3" fill={bl} stroke={fr} strokeWidth="0.5"/>
        <circle cx="14" cy="115" r="3" fill="none" stroke={fr} strokeWidth="0.7"/>
        <rect x="21" y="113" width="32" height="4" rx="1" fill={line}/>
        <rect x="8" y="128" width="64" height="12" rx="4" fill={selStr}/>
      </>
    ),
    3: ( // Enter Amount
      <>
        <rect x="4" y="16" width="72" height="15" rx="0" fill="#e2e5ea"/>
        <rect x="30" y="20" width="24" height="7" rx="2" fill={bl}/>
        <rect x="20" y="36" width="40" height="4" rx="1" fill={bl}/>
        <rect x="15" y="50" width="50" height="16" rx="2" fill={bl}/>
        <rect x="15" y="69" width="50" height="1.5" rx="0.75" fill={selStr}/>
        <rect x="8" y="76" width="64" height="10" rx="3" fill={bl} stroke={fr} strokeWidth="0.5"/>
        <rect x="8" y="92" width="19" height="10" rx="2.5" fill={bl} stroke={fr} strokeWidth="0.5"/>
        <rect x="30.5" y="92" width="19" height="10" rx="2.5" fill={bl} stroke={fr} strokeWidth="0.5"/>
        <rect x="53" y="92" width="19" height="10" rx="2.5" fill={bl} stroke={fr} strokeWidth="0.5"/>
        <rect x="8" y="106" width="19" height="10" rx="2.5" fill={bl} stroke={fr} strokeWidth="0.5"/>
        <rect x="30.5" y="106" width="19" height="10" rx="2.5" fill={bl} stroke={fr} strokeWidth="0.5"/>
        <rect x="53" y="106" width="19" height="10" rx="2.5" fill={bl} stroke={fr} strokeWidth="0.5"/>
        <rect x="8" y="120" width="19" height="10" rx="2.5" fill={bl} stroke={fr} strokeWidth="0.5"/>
        <rect x="30.5" y="120" width="19" height="10" rx="2.5" fill={bl} stroke={fr} strokeWidth="0.5"/>
        <rect x="53" y="120" width="19" height="10" rx="2.5" fill={bl} stroke={fr} strokeWidth="0.5"/>
        <rect x="8" y="134" width="64" height="10" rx="4" fill={selStr}/>
      </>
    ),
    4: ( // Review
      <>
        <rect x="4" y="16" width="72" height="15" rx="0" fill="#e2e5ea"/>
        <rect x="28" y="20" width="24" height="7" rx="2" fill={bl}/>
        <rect x="8" y="36" width="64" height="20" rx="4" fill={sel} stroke={selStr} strokeWidth="0.7"/>
        <rect x="22" y="40" width="36" height="5" rx="1.5" fill="rgba(156,163,175,0.4)"/>
        <rect x="28" y="48" width="24" height="5" rx="1.5" fill="rgba(156,163,175,0.3)"/>
        <rect x="8" y="62" width="64" height="52" rx="4" fill={bl} stroke={fr} strokeWidth="0.5"/>
        <rect x="14" y="70" width="18" height="3.5" rx="1" fill={line}/>
        <rect x="50" y="70" width="16" height="3.5" rx="1" fill={line}/>
        <line x1="14" y1="77" x2="66" y2="77" stroke={fr} strokeWidth="0.5"/>
        <rect x="14" y="81" width="22" height="3.5" rx="1" fill={line}/>
        <rect x="44" y="81" width="22" height="3.5" rx="1" fill={line}/>
        <line x1="14" y1="88" x2="66" y2="88" stroke={fr} strokeWidth="0.5"/>
        <rect x="14" y="92" width="14" height="3.5" rx="1" fill={line}/>
        <rect x="58" y="92" width="8" height="3.5" rx="1" fill={line}/>
        <line x1="14" y1="99" x2="66" y2="99" stroke={fr} strokeWidth="0.5"/>
        <rect x="14" y="103" width="12" height="3.5" rx="1" fill={line}/>
        <rect x="50" y="103" width="16" height="3.5" rx="1" fill="rgba(156,163,175,0.5)"/>
        <rect x="8" y="120" width="64" height="12" rx="4" fill={selStr}/>
      </>
    ),
  }

  return (
    <svg viewBox="0 0 80 148" width="100" height="185" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="79" height="147" rx="13" fill={bg} stroke={fr} strokeWidth="1"/>
      <rect x="3.5" y="3.5" width="73" height="141" rx="10.5" fill={bg}/>
      <rect x="26" y="5.5" width="28" height="7" rx="3.5" fill={fr}/>
      <rect x="28" y="139" width="24" height="3" rx="1.5" fill={fr}/>
      {screens[screen]}
    </svg>
  )
}

/* ── Phone Screen SVG (fund transfer flow) ── */
function PhoneScreen({ step }) {
  const green = '#9ca3af'
  const greenDim = 'rgba(156,163,175,0.14)'
  const greenBorder = 'rgba(156,163,175,0.28)'
  const itemBg = 'rgba(255,255,255,0.05)'
  const itemBorder = 'rgba(255,255,255,0.09)'
  const textWhite = 'rgba(255,255,255,0.88)'
  const textMuted = 'rgba(255,255,255,0.42)'
  const textDim = 'rgba(255,255,255,0.22)'
  const headerBg = '#0f0f0f'

  const screens = {
    1: (<>
      <rect x="4" y="16" width="92" height="21" fill={headerBg}/>
      <text x="50" y="30" textAnchor="middle" fill={textWhite} fontSize="7" fontWeight="700" fontFamily="Inter,sans-serif">Fund Transfer</text>
      <text x="12" y="50" fill={textMuted} fontSize="5.5" fontFamily="Inter,sans-serif">Select transfer type</text>
      <rect x="8" y="55" width="84" height="18" rx="4.5" fill={greenDim} stroke={greenBorder} strokeWidth="0.75"/>
      <circle cx="16.5" cy="64" r="3.5" fill={green}/>
      <path d="M15 64 L16 65.2 L18.5 62.5" stroke="#0a0a0a" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="25" y="67" fill={textWhite} fontSize="6.5" fontWeight="600" fontFamily="Inter,sans-serif">Own Account</text>
      <circle cx="87" cy="64" r="2.5" fill={green}/>
      <rect x="8" y="77" width="84" height="16" rx="4" fill={itemBg} stroke={itemBorder} strokeWidth="0.75"/>
      <circle cx="16.5" cy="85" r="3.5" fill="none" stroke={itemBorder} strokeWidth="0.9"/>
      <text x="25" y="88" fill={textMuted} fontSize="6.5" fontFamily="Inter,sans-serif">BKB Account</text>
      <rect x="8" y="97" width="84" height="16" rx="4" fill={itemBg} stroke={itemBorder} strokeWidth="0.75"/>
      <circle cx="16.5" cy="105" r="3.5" fill="none" stroke={itemBorder} strokeWidth="0.9"/>
      <text x="25" y="108" fill={textMuted} fontSize="6.5" fontFamily="Inter,sans-serif">Other Bank</text>
      <rect x="8" y="117" width="84" height="16" rx="4" fill={itemBg} stroke={itemBorder} strokeWidth="0.75"/>
      <circle cx="16.5" cy="125" r="3.5" fill="none" stroke={itemBorder} strokeWidth="0.9"/>
      <text x="25" y="128" fill={textMuted} fontSize="6.5" fontFamily="Inter,sans-serif">NPS Transfer</text>
      <rect x="8" y="137" width="84" height="16" rx="4" fill={itemBg} stroke={itemBorder} strokeWidth="0.75"/>
      <circle cx="16.5" cy="145" r="3.5" fill="none" stroke={itemBorder} strokeWidth="0.9"/>
      <text x="25" y="148" fill={textMuted} fontSize="6.5" fontFamily="Inter,sans-serif">Mobile Recharge</text>
      <rect x="8" y="161" width="84" height="17" rx="5" fill={green}/>
      <text x="50" y="173" textAnchor="middle" fill="#0a0a0a" fontSize="6.5" fontWeight="700" fontFamily="Inter,sans-serif">Continue</text>
    </>),
    2: (<>
      <rect x="4" y="16" width="92" height="21" fill={headerBg}/>
      <text x="17" y="30" fill={textMuted} fontSize="10" fontFamily="Inter,sans-serif">‹</text>
      <text x="50" y="30" textAnchor="middle" fill={textWhite} fontSize="7" fontWeight="700" fontFamily="Inter,sans-serif">Beneficiaries</text>
      <rect x="8" y="43" width="84" height="14" rx="4" fill={itemBg} stroke={itemBorder} strokeWidth="0.75"/>
      <text x="34" y="53" fill={textDim} fontSize="5.5" fontFamily="Inter,sans-serif">Search name or account...</text>
      <text x="14" y="53" fill={textDim} fontSize="7" fontFamily="Inter,sans-serif">⌕</text>
      <text x="12" y="70" fill={textDim} fontSize="5" fontFamily="Inter,sans-serif" letterSpacing="0.06em">SAVED (3)</text>
      <rect x="8" y="75" width="84" height="22" rx="5" fill={itemBg} stroke={itemBorder} strokeWidth="0.75"/>
      <rect x="13" y="80" width="13" height="13" rx="3.5" fill="rgba(156,163,175,0.18)"/>
      <text x="19.5" y="90" textAnchor="middle" fill={green} fontSize="5.5" fontWeight="700" fontFamily="Inter,sans-serif">AR</text>
      <text x="31" y="84" fill={textWhite} fontSize="6" fontWeight="600" fontFamily="Inter,sans-serif">Ahmed Rahman</text>
      <text x="31" y="93" fill={textMuted} fontSize="5.5" fontFamily="Inter,sans-serif">BKB  ••••4521</text>
      <text x="89" y="89" textAnchor="end" fill={green} fontSize="9" fontFamily="Inter,sans-serif">›</text>
      <rect x="8" y="101" width="84" height="22" rx="5" fill={itemBg} stroke={itemBorder} strokeWidth="0.75"/>
      <rect x="13" y="106" width="13" height="13" rx="3.5" fill="rgba(156,163,175,0.15)"/>
      <text x="19.5" y="116" textAnchor="middle" fill="rgba(209,213,219,0.9)" fontSize="5.5" fontWeight="700" fontFamily="Inter,sans-serif">KH</text>
      <text x="31" y="110" fill={textWhite} fontSize="6" fontWeight="600" fontFamily="Inter,sans-serif">Karim Hossain</text>
      <text x="31" y="119" fill={textMuted} fontSize="5.5" fontFamily="Inter,sans-serif">DBBL  ••••9032</text>
      <text x="89" y="115" textAnchor="end" fill={green} fontSize="9" fontFamily="Inter,sans-serif">›</text>
      <rect x="8" y="127" width="84" height="22" rx="5" fill={itemBg} stroke={itemBorder} strokeWidth="0.75"/>
      <rect x="13" y="132" width="13" height="13" rx="3.5" fill="rgba(156,163,175,0.12)"/>
      <text x="19.5" y="142" textAnchor="middle" fill="rgba(209,213,219,0.7)" fontSize="5.5" fontWeight="700" fontFamily="Inter,sans-serif">SB</text>
      <text x="31" y="136" fill={textWhite} fontSize="6" fontWeight="600" fontFamily="Inter,sans-serif">Sumaiya Begum</text>
      <text x="31" y="145" fill={textMuted} fontSize="5.5" fontFamily="Inter,sans-serif">BKB  ••••7788</text>
      <text x="89" y="141" textAnchor="end" fill={green} fontSize="9" fontFamily="Inter,sans-serif">›</text>
      <rect x="8" y="157" width="84" height="17" rx="5" fill="none" stroke={greenBorder} strokeWidth="0.75" strokeDasharray="3,2.5"/>
      <text x="50" y="168.5" textAnchor="middle" fill="rgba(156,163,175,0.6)" fontSize="6" fontWeight="600" fontFamily="Inter,sans-serif">+ Add New Beneficiary</text>
    </>),
    3: (<>
      <rect x="4" y="16" width="92" height="21" fill={headerBg}/>
      <text x="17" y="30" fill={textMuted} fontSize="10" fontFamily="Inter,sans-serif">‹</text>
      <text x="50" y="30" textAnchor="middle" fill={textWhite} fontSize="7" fontWeight="700" fontFamily="Inter,sans-serif">Enter Amount</text>
      <text x="50" y="52" textAnchor="middle" fill={textMuted} fontSize="5.5" fontFamily="Inter,sans-serif">To: Ahmed Rahman · BKB</text>
      <text x="26" y="80" fill={textWhite} fontSize="18" fontWeight="300" fontFamily="Inter,sans-serif">৳</text>
      <text x="42" y="80" fill={textWhite} fontSize="20" fontWeight="700" fontFamily="Inter,sans-serif">5,000</text>
      <rect x="26" y="84" width="64" height="1.5" rx="0.75" fill="rgba(156,163,175,0.5)"/>
      <rect x="8" y="94" width="84" height="14" rx="4" fill={itemBg} stroke={itemBorder} strokeWidth="0.75"/>
      <text x="14" y="104" fill={textDim} fontSize="5.5" fontFamily="Inter,sans-serif">Add note (optional)</text>
      <rect x="8" y="115" width="25" height="14" rx="3.5" fill={itemBg} stroke={itemBorder} strokeWidth="0.5"/>
      <text x="20.5" y="125" textAnchor="middle" fill={textWhite} fontSize="7.5" fontFamily="Inter,sans-serif">1</text>
      <rect x="37" y="115" width="25" height="14" rx="3.5" fill={itemBg} stroke={itemBorder} strokeWidth="0.5"/>
      <text x="49.5" y="125" textAnchor="middle" fill={textWhite} fontSize="7.5" fontFamily="Inter,sans-serif">2</text>
      <rect x="66" y="115" width="25" height="14" rx="3.5" fill={itemBg} stroke={itemBorder} strokeWidth="0.5"/>
      <text x="78.5" y="125" textAnchor="middle" fill={textWhite} fontSize="7.5" fontFamily="Inter,sans-serif">3</text>
      <rect x="8" y="133" width="25" height="14" rx="3.5" fill={itemBg} stroke={itemBorder} strokeWidth="0.5"/>
      <text x="20.5" y="143" textAnchor="middle" fill={textWhite} fontSize="7.5" fontFamily="Inter,sans-serif">4</text>
      <rect x="37" y="133" width="25" height="14" rx="3.5" fill={itemBg} stroke={itemBorder} strokeWidth="0.5"/>
      <text x="49.5" y="143" textAnchor="middle" fill={textWhite} fontSize="7.5" fontFamily="Inter,sans-serif">5</text>
      <rect x="66" y="133" width="25" height="14" rx="3.5" fill={itemBg} stroke={itemBorder} strokeWidth="0.5"/>
      <text x="78.5" y="143" textAnchor="middle" fill={textWhite} fontSize="7.5" fontFamily="Inter,sans-serif">6</text>
      <rect x="8" y="151" width="25" height="14" rx="3.5" fill={itemBg} stroke={itemBorder} strokeWidth="0.5"/>
      <text x="20.5" y="161" textAnchor="middle" fill={textWhite} fontSize="7.5" fontFamily="Inter,sans-serif">7</text>
      <rect x="37" y="151" width="25" height="14" rx="3.5" fill={itemBg} stroke={itemBorder} strokeWidth="0.5"/>
      <text x="49.5" y="161" textAnchor="middle" fill={textWhite} fontSize="7.5" fontFamily="Inter,sans-serif">8</text>
      <rect x="66" y="151" width="25" height="14" rx="3.5" fill={itemBg} stroke={itemBorder} strokeWidth="0.5"/>
      <text x="78.5" y="161" textAnchor="middle" fill={textWhite} fontSize="7.5" fontFamily="Inter,sans-serif">9</text>
    </>),
    4: (<>
      <rect x="4" y="16" width="92" height="21" fill={headerBg}/>
      <text x="17" y="30" fill={textMuted} fontSize="10" fontFamily="Inter,sans-serif">‹</text>
      <text x="50" y="30" textAnchor="middle" fill={textWhite} fontSize="7" fontWeight="700" fontFamily="Inter,sans-serif">Review Transfer</text>
      <rect x="8" y="43" width="84" height="32" rx="7" fill={greenDim} stroke={greenBorder} strokeWidth="0.75"/>
      <text x="50" y="55" textAnchor="middle" fill="rgba(156,163,175,0.65)" fontSize="5.5" fontFamily="Inter,sans-serif">Transfer Amount</text>
      <text x="50" y="70" textAnchor="middle" fill={green} fontSize="15" fontWeight="700" fontFamily="Inter,sans-serif">৳ 5,000</text>
      <rect x="8" y="82" width="84" height="66" rx="6" fill={itemBg} stroke={itemBorder} strokeWidth="0.75"/>
      <text x="14" y="95" fill={textMuted} fontSize="5.5" fontFamily="Inter,sans-serif">To</text>
      <text x="88" y="95" textAnchor="end" fill={textWhite} fontSize="5.5" fontWeight="600" fontFamily="Inter,sans-serif">Ahmed Rahman</text>
      <line x1="14" y1="99" x2="88" y2="99" stroke={itemBorder} strokeWidth="0.5"/>
      <text x="14" y="111" fill={textMuted} fontSize="5.5" fontFamily="Inter,sans-serif">Account</text>
      <text x="88" y="111" textAnchor="end" fill={textWhite} fontSize="5.5" fontWeight="600" fontFamily="Inter,sans-serif">BKB ••••4521</text>
      <line x1="14" y1="115" x2="88" y2="115" stroke={itemBorder} strokeWidth="0.5"/>
      <text x="14" y="127" fill={textMuted} fontSize="5.5" fontFamily="Inter,sans-serif">Fee</text>
      <text x="88" y="127" textAnchor="end" fill={textWhite} fontSize="5.5" fontWeight="600" fontFamily="Inter,sans-serif">৳ 0.00</text>
      <line x1="14" y1="131" x2="88" y2="131" stroke={itemBorder} strokeWidth="0.5"/>
      <text x="14" y="143" fill={textMuted} fontSize="5.5" fontFamily="Inter,sans-serif">Total</text>
      <text x="88" y="143" textAnchor="end" fill={green} fontSize="5.5" fontWeight="700" fontFamily="Inter,sans-serif">৳ 5,000</text>
      <rect x="8" y="157" width="84" height="17" rx="5" fill={green}/>
      <text x="50" y="169" textAnchor="middle" fill="#0a0a0a" fontSize="6.5" fontWeight="700" fontFamily="Inter,sans-serif">Confirm Transfer</text>
    </>),
    5: (<>
      <rect x="4" y="16" width="92" height="21" fill={headerBg}/>
      <text x="17" y="30" fill={textMuted} fontSize="10" fontFamily="Inter,sans-serif">‹</text>
      <text x="50" y="30" textAnchor="middle" fill={textWhite} fontSize="7" fontWeight="700" fontFamily="Inter,sans-serif">Verify Identity</text>
      <circle cx="50" cy="72" r="18" fill="rgba(156,163,175,0.08)" stroke={greenBorder} strokeWidth="0.75"/>
      <rect x="43" y="63" width="14" height="12" rx="3" fill="none" stroke={green} strokeWidth="1.2"/>
      <path d="M46.5 63 L46.5 60 Q50 56.5 53.5 60 L53.5 63" fill="none" stroke={green} strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="50" cy="70" r="1.8" fill={green}/>
      <text x="50" y="102" textAnchor="middle" fill={textWhite} fontSize="7" fontWeight="700" fontFamily="Inter,sans-serif">Enter 6-digit PIN</text>
      <circle cx="27" cy="116" r="4.5" fill={green}/>
      <circle cx="37" cy="116" r="4.5" fill={green}/>
      <circle cx="47" cy="116" r="4.5" fill={green}/>
      <circle cx="57" cy="116" r="4.5" fill={green}/>
      <circle cx="67" cy="116" r="4.5" fill="none" stroke={itemBorder} strokeWidth="0.9"/>
      <circle cx="77" cy="116" r="4.5" fill="none" stroke={itemBorder} strokeWidth="0.9"/>
      <rect x="8" y="129" width="25" height="14" rx="3.5" fill={itemBg} stroke={itemBorder} strokeWidth="0.5"/>
      <text x="20.5" y="139" textAnchor="middle" fill={textWhite} fontSize="7.5" fontFamily="Inter,sans-serif">1</text>
      <rect x="37" y="129" width="25" height="14" rx="3.5" fill={itemBg} stroke={itemBorder} strokeWidth="0.5"/>
      <text x="49.5" y="139" textAnchor="middle" fill={textWhite} fontSize="7.5" fontFamily="Inter,sans-serif">2</text>
      <rect x="66" y="129" width="25" height="14" rx="3.5" fill={itemBg} stroke={itemBorder} strokeWidth="0.5"/>
      <text x="78.5" y="139" textAnchor="middle" fill={textWhite} fontSize="7.5" fontFamily="Inter,sans-serif">3</text>
      <rect x="8" y="147" width="25" height="14" rx="3.5" fill={itemBg} stroke={itemBorder} strokeWidth="0.5"/>
      <text x="20.5" y="157" textAnchor="middle" fill={textWhite} fontSize="7.5" fontFamily="Inter,sans-serif">4</text>
      <rect x="37" y="147" width="25" height="14" rx="3.5" fill={itemBg} stroke={itemBorder} strokeWidth="0.5"/>
      <text x="49.5" y="157" textAnchor="middle" fill={textWhite} fontSize="7.5" fontFamily="Inter,sans-serif">5</text>
      <rect x="66" y="147" width="25" height="14" rx="3.5" fill="rgba(156,163,175,0.08)" stroke="rgba(156,163,175,0.2)" strokeWidth="0.5"/>
      <text x="78.5" y="157" textAnchor="middle" fill="rgba(209,213,219,0.7)" fontSize="6.5" fontFamily="Inter,sans-serif">⌫</text>
    </>),
    6: (<>
      <circle cx="50" cy="85" r="48" fill="rgba(156,163,175,0.04)"/>
      <circle cx="50" cy="76" r="24" fill="rgba(156,163,175,0.12)" stroke={green} strokeWidth="1.2"/>
      <circle cx="50" cy="76" r="18" fill="rgba(156,163,175,0.18)"/>
      <path d="M40.5 76 L47 82.5 L60 69" fill="none" stroke={green} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="50" y="112" textAnchor="middle" fill={textWhite} fontSize="8" fontWeight="700" fontFamily="Inter,sans-serif">Transfer Successful!</text>
      <text x="50" y="125" textAnchor="middle" fill={green} fontSize="14" fontWeight="700" fontFamily="Inter,sans-serif">৳ 5,000</text>
      <text x="50" y="136" textAnchor="middle" fill={textMuted} fontSize="5.5" fontFamily="Inter,sans-serif">sent to Ahmed Rahman</text>
      <rect x="18" y="143" width="64" height="14" rx="7" fill={itemBg} stroke={itemBorder} strokeWidth="0.75"/>
      <text x="50" y="153" textAnchor="middle" fill={textDim} fontSize="5.5" fontFamily="Inter,sans-serif">Ref: BKB240511043</text>
      <rect x="8" y="163" width="38" height="14" rx="4.5" fill={itemBg} stroke={itemBorder} strokeWidth="0.75"/>
      <text x="27" y="173" textAnchor="middle" fill={textMuted} fontSize="5.5" fontWeight="600" fontFamily="Inter,sans-serif">Receipt</text>
      <rect x="54" y="163" width="38" height="14" rx="4.5" fill={green}/>
      <text x="73" y="173" textAnchor="middle" fill="#0a0a0a" fontSize="6.5" fontWeight="700" fontFamily="Inter,sans-serif">Done</text>
    </>),
  }

  return (
    <svg viewBox="0 0 100 192" width="112" height="215" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.5))' }}>
      <rect x="0.5" y="0.5" width="99" height="191" rx="17" fill="#0a0a0a" stroke="#1c1c1c" strokeWidth="1"/>
      <rect x="3.5" y="3.5" width="93" height="185" rx="14.5" fill="#0d0d0d"/>
      <rect x="30" y="7" width="40" height="9" rx="4.5" fill="#0a0a0a"/>
      <circle cx="13" cy="11.5" r="1.5" fill="#1c1c1c"/>
      <circle cx="18" cy="11.5" r="1.5" fill="#1c1c1c"/>
      <rect x="80" y="8.5" width="11" height="6" rx="1.5" fill="none" stroke="#2a2a2a" strokeWidth="0.7"/>
      <rect x="80.5" y="9" width="7.5" height="5" rx="1" fill="rgba(255,255,255,0.2)"/>
      <rect x="38" y="185" width="24" height="2.5" rx="1.25" fill="rgba(255,255,255,0.12)"/>
      {screens[step]}
    </svg>
  )
}
