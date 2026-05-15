import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/portfolio'
import Footer from '../components/layout/Footer'
import ScrollProgress from '../components/layout/ScrollProgress'
import myBkbAppImg from '../assets/mybkb app.png'
import homeBkbImg from '../assets/home-bkb.png'

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
  transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
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
    color: '#9ca3af',
    points: [
      'Bangladesh MFS market growing 30%+ YoY; bKash exceeded 65M users by 2023',
      'State-owned bank apps lag behind private MFS providers in UX maturity',
      'Rural smartphone adoption accelerating, expanding first-time digital banking users',
    ],
  },
  {
    category: 'Target Users',
    color: '#6b7280',
    points: [
      'BKB serves government employees, farmers, NPS holders, and rural households',
      'Significant portion of users are first-time mobile banking adopters',
      'Bengali language support is critical — English-only labels create friction',
    ],
  },
  {
    category: 'Regulatory Context',
    color: '#52525b',
    points: [
      'Bangladesh Bank mandates 2FA for transactions above ৳10,000',
      'BEFTN & RTGS channel requirements govern inter-bank transfers',
      'NPS integration must follow National Pension Authority guidelines',
    ],
  },
  {
    category: 'Competitive Gaps',
    color: '#d1d5db',
    points: [
      'bKash & Nagad: Simple flows but limited to MFS — no bank account management',
      'DBBL Nexus Pay: Feature-rich but visually cluttered for new users',
      'Existing BKB portal: Not mobile-optimised; high abandonment on small screens',
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
  { name: 'Primary',      hex: '#1a1a1a', role: 'CTA, active states' },
  { name: 'Secondary',    hex: '#374151', role: 'Hover & pressed states' },
  { name: 'Highlight',    hex: '#9ca3af', role: 'Accents, labels' },
  { name: 'Background',   hex: '#0a0a0a', role: 'Primary dark background' },
  { name: 'Card Surface', hex: '#1f2937', role: 'Cards and elevated surfaces' },
  { name: 'Border',       hex: '#374151', role: 'Dividers and strokes' },
]

const styleType = [
  { role: 'Display / H1', family: 'Plus Jakarta Sans', weight: '700', size: '40–48px', sample: 'myBKB' },
  { role: 'Heading / H2', family: 'Plus Jakarta Sans', weight: '600', size: '28–32px', sample: 'Fund Transfer' },
  { role: 'Body',         family: 'Inter',             weight: '400', size: '14–16px', sample: 'Send money securely' },
  { role: 'Label / Mono', family: 'Inter Mono',        weight: '500', size: '10–11px', sample: 'USER FLOW · 01' },
]

export default function CaseStudyPage() {
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
                  <span className={`text-[11px] font-mono transition-all duration-200 ${isActive ? 'opacity-100 text-zinc-600' : 'opacity-0 group-hover:opacity-50 text-slate-400'}`}>
                    {num} {label}
                  </span>
                  <div className={`rounded-full transition-all duration-200 ${isActive ? 'w-2 h-2 bg-zinc-500' : 'w-1.5 h-1.5 bg-slate-300 group-hover:bg-slate-400'}`} />
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
            <div className="w-8 h-8 rounded-md bg-zinc-900 flex items-center justify-center text-white text-sm font-semibold font-display tracking-tight group-hover:scale-105 transition-transform">AN</div>
            <span className="text-base font-semibold text-ink-primary hidden sm:block tracking-tight">Alimoon Nisha</span>
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
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400">Case Study</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400">{cs.year}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
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
                  <span className="text-slate-300"> —</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="text-lg text-ink-secondary mb-10 leading-relaxed"
                >
                  Designing a full-featured mobile banking app for Bangladesh Krishi Bank — serving farmers, government employees, and first-time digital banking users across Bangladesh.
                </motion.p>

                {/* Meta strip */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-wrap gap-x-8 gap-y-4 items-center pt-8 border-t border-border-subtle"
                >
                  {[
                    { label: 'Role',      value: cs.role },
                    { label: 'Duration',  value: cs.duration },
                    { label: 'Platform',  value: 'Android & iOS' },
                    { label: 'Tool',      value: 'Figma' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-2.5">
                      <span className="text-xs font-mono uppercase tracking-[0.15em] text-slate-400">{item.label}</span>
                      <span className="text-sm font-semibold text-ink-primary">{item.value}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right: abstract app mockup */}
              <div className="hidden lg:flex items-center justify-center lg:justify-end pr-4 xl:pr-8">
                <AbstractAppMockup />
              </div>

            </div>

            {/* Metrics — full width below */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border-subtle rounded-2xl overflow-hidden border border-border-subtle"
            >
              {cs.metrics.map((m) => (
                <div key={m.label} className="bg-surface-base px-6 py-5">
                  <div className="text-2xl lg:text-3xl font-display font-bold text-ink-primary mb-1 tracking-tight">{m.value}</div>
                  <div className="text-xs text-slate-400 uppercase tracking-[0.12em] font-mono">{m.label}</div>
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-16">
              <motion.div className="lg:col-span-7" {...fadeUp}>
                <SectionLabel num="02" label="Project Brief" />
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink-primary tracking-tight mb-6 leading-tight">
                  Building Bangladesh's agricultural bank into mobile
                </h2>
                <p className="text-lg lg:text-xl text-ink-secondary leading-relaxed">{cs.context}</p>
              </motion.div>
              <motion.div className="lg:col-span-5" {...fadeUp} transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}>
                <SectionLabel num="" label="Project Info" />
                <div className="card-surface rounded-2xl overflow-hidden">
                  {[
                    { label: 'Client',    value: cs.company },
                    { label: 'My Role',   value: cs.role },
                    { label: 'Duration',  value: cs.duration },
                    { label: 'Year',      value: cs.year },
                    { label: 'Platform',  value: 'Android & iOS' },
                    { label: 'Tool',      value: 'Figma' },
                  ].map((item, i, arr) => (
                    <div key={item.label} className={`flex justify-between items-center px-6 py-4 ${i < arr.length - 1 ? 'border-b border-border-subtle' : ''}`}>
                      <span className="text-sm text-slate-400">{item.label}</span>
                      <span className="text-sm font-semibold text-ink-primary">{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Challenge + Outcome */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <motion.div {...fadeUp} className="card-surface rounded-2xl p-8 lg:p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-zinc-400/70 via-zinc-400/25 to-transparent" />
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-zinc-100">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">The Challenge</span>
                </div>
                <p className="text-base text-ink-secondary leading-relaxed">{cs.challenge}</p>
              </motion.div>

              <motion.div {...fadeUp} transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl p-8 lg:p-10 relative overflow-hidden border border-zinc-700/50"
                style={{ background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)' }}>
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-zinc-500/70 via-zinc-500/25 to-transparent" />
                <div className="absolute bottom-0 right-0 w-36 h-36 pointer-events-none" style={{ background: 'radial-gradient(circle at 100% 100%, rgba(255,255,255,0.04), transparent 70%)' }} />
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-white/10">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400/70">The Outcome</span>
                </div>
                <p className="text-base text-white/80 leading-relaxed relative z-10">{cs.outcome}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            03  TIMELINE / TOOLS / ROLE
        ══════════════════════════════════════════ */}
        <section id="cs-timeline" style={{ background: '#0a0a0a', scrollMarginTop: '64px' }} className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div {...fadeUp} className="mb-14">
              <DarkSectionLabel num="03" label="Timeline · Tools · Role" />
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
                2-month sprint from discovery to handoff
              </h2>
            </motion.div>

            {/* Timeline bar */}
            <motion.div {...fadeUp} className="mb-14">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-white/30 uppercase tracking-widest">Sep 2024</span>
                <span className="text-xs font-mono text-white/30 uppercase tracking-widest">Nov 2024</span>
              </div>
              <div className="relative h-2 rounded-full overflow-hidden mb-8" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: 'linear-gradient(to right, #374151, #9ca3af)' }}
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { phase: 'Week 1–2',  title: 'Research & Discovery',        color: '#374151' },
                  { phase: 'Week 3–4',  title: 'IA & User Flows',             color: '#4b5563' },
                  { phase: 'Week 5–6',  title: 'Visual Design & Components',  color: '#6b7280' },
                  { phase: 'Week 7–8',  title: 'Prototype & Handoff',         color: '#9ca3af' },
                ].map((t, i) => (
                  <motion.div key={i} {...stagger(i)} className="rounded-xl p-4 border border-white/6" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <div className="w-2 h-2 rounded-full mb-3" style={{ background: t.color }} />
                    <div className="text-xs font-mono text-white/30 mb-1">{t.phase}</div>
                    <div className="text-sm font-semibold text-white/75">{t.title}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Role */}
              <motion.div {...stagger(0)} className="rounded-2xl p-6 border border-white/6" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">My Role</div>
                <div className="text-xl font-bold text-white mb-2">UI/UX Designer</div>
                <p className="text-base text-white/40 leading-relaxed">
                  End-to-end ownership — from competitive research and user flows through visual design, prototyping, and developer handoff.
                </p>
              </motion.div>
              {/* Tools */}
              <motion.div {...stagger(1)} className="rounded-2xl p-6 border border-white/6" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">Tools</div>
                {[
                  { name: 'Figma',    note: 'Design, components, prototype' },
                  { name: 'FigJam',   note: 'User flow mapping & IA' },
                  { name: 'Notion',   note: 'Research notes & content doc' },
                ].map((t, i) => (
                  <div key={i} className={`flex items-center justify-between py-2.5 ${i < 2 ? 'border-b border-white/6' : ''}`}>
                    <span className="text-base font-semibold text-white/80">{t.name}</span>
                    <span className="text-sm text-white/30">{t.note}</span>
                  </div>
                ))}
              </motion.div>
              {/* Deliverables */}
              <motion.div {...stagger(2)} className="rounded-2xl p-6 border border-white/6" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">Deliverables</div>
                <div className="flex flex-wrap gap-2">
                  {['30+ User Flows', '100+ Screens', 'Component Library', 'Prototype', 'Design Handoff', 'Android & iOS'].map(d => (
                    <span key={d} className="px-2.5 py-1 rounded-lg text-sm text-white/50 border border-white/8" style={{ background: 'rgba(255,255,255,0.04)' }}>{d}</span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            04  DESIGN PROCESS
        ══════════════════════════════════════════ */}
        <section id="cs-process" style={{ scrollMarginTop: '64px' }} className="border-b border-border-subtle bg-surface-base">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div {...fadeUp} className="mb-14">
              <SectionLabel num="04" label="Design Process" />
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink-primary tracking-tight max-w-lg leading-tight">
                A structured approach, applied end-to-end
              </h2>
            </motion.div>

            <div className="relative">
              <div className="hidden lg:block absolute top-[54px] left-[54px] right-[54px] h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.06) 15%, rgba(0,0,0,0.06) 85%, transparent)' }} />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { num: '01', phase: 'Research',    desc: 'User needs, business goals, pain points' },
                  { num: '02', phase: 'Define',       desc: 'IA, user flows, feature priorities' },
                  { num: '03', phase: 'Design',       desc: 'Visual system, screens, components' },
                  { num: '04', phase: 'Prototype',    desc: 'Figma prototype, real navigation' },
                  { num: '05', phase: 'Validate',     desc: 'Stakeholder review, iteration' },
                  { num: '06', phase: 'Handoff',      desc: 'Assets, specs, dev collaboration' },
                ].map((p, i) => (
                  <motion.div key={i} {...stagger(i)} className="card-surface rounded-2xl p-5 flex flex-col gap-4 group hover:border-zinc-300/60 transition-colors">
                    <div className="w-12 h-12 rounded-xl border border-border-subtle bg-surface-1 flex items-center justify-center group-hover:border-zinc-300 group-hover:bg-zinc-50 transition-colors">
                      <span className="text-sm font-display font-bold text-slate-400 group-hover:text-zinc-700 transition-colors">{p.num}</span>
                    </div>
                    <div>
                      <div className="text-base font-bold text-ink-primary mb-1">{p.phase}</div>
                      <div className="text-sm text-slate-400 leading-snug">{p.desc}</div>
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
        <section id="cs-research" style={{ background: '#0d0d0d', scrollMarginTop: '64px' }} className="border-b border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 60% at 85% 20%, rgba(255,255,255,0.02) 0%, transparent 70%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div {...fadeUp} className="mb-14">
              <DarkSectionLabel num="05" label="Secondary Research · Desk Research" />
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight max-w-2xl leading-tight">
                Understanding the ecosystem before designing
              </h2>
            </motion.div>

            {/* Key insight callout */}
            <motion.div {...fadeUp} className="mb-10 rounded-2xl p-6 lg:p-8 border border-zinc-700/40 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-zinc-400/60 via-zinc-400/30 to-transparent rounded-l-2xl" />
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-400/60 mb-3">Key Insight</div>
              <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
                First-time mobile banking users make up a large portion of BKB's customer base, spanning rural farmers to urban government employees. This made clarity, progressive disclosure, and a guided flow non-negotiable design principles.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {researchCards.map((card, i) => (
                <motion.div key={i} {...stagger(i)} className="rounded-2xl p-6 border border-white/6 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: `linear-gradient(to right, ${card.color}60, transparent)` }} />
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: card.color }} />
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">{card.category}</span>
                  </div>
                  <ul className="space-y-3">
                    {card.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: card.color, opacity: 0.5 }} />
                        <span className="text-base text-white/55 leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            06  FEATURES
        ══════════════════════════════════════════ */}
        <section id="cs-features" style={{ scrollMarginTop: '64px' }} className="border-b border-border-subtle bg-surface-base">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div {...fadeUp} className="mb-14">
              <SectionLabel num="06" label="Features" />
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink-primary tracking-tight max-w-xl leading-tight">
                8 core modules, 100+ screens
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((f, i) => (
                <motion.div key={i} {...stagger(i)} className="card-surface rounded-2xl p-6 group hover:border-zinc-300/60 hover:shadow-sm transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-zinc-400/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center mb-4 group-hover:bg-zinc-200 transition-colors">
                    <FeatureIcon name={f.icon} />
                  </div>
                  <div className="text-base font-bold text-ink-primary mb-2 leading-snug">{f.label}</div>
                  <div className="text-sm text-slate-400 leading-relaxed">{f.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            07  USER FLOW
        ══════════════════════════════════════════ */}
        <section id="cs-flow" style={{ background: '#0a0a0a', scrollMarginTop: '64px' }} className="border-b border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 10% 70%, rgba(255,255,255,0.02) 0%, transparent 65%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">

            <motion.div {...fadeUp} className="mb-14">
              <DarkSectionLabel num="07" label="User Flow" />
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
                  30+ flows designed end-to-end
                </h2>
                <span className="text-sm font-mono text-white/25 shrink-0">6 flow groups · 100+ screens</span>
              </div>
            </motion.div>

            {/* Flow groups grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
              {cs.flowGroups.map((group, i) => (
                <motion.div key={group.label} {...stagger(i)} className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-bold text-zinc-400 bg-zinc-500/10">{i + 1}</div>
                      <span className="text-sm font-semibold text-white/75 uppercase tracking-wider">{group.label}</span>
                    </div>
                    <span className="text-xs font-mono text-white/25 bg-white/5 px-2 py-0.5 rounded-full">{group.items.length}</span>
                  </div>
                  <div className="p-5 flex flex-wrap gap-2">
                    {group.items.map(item => (
                      <span key={item} className="px-2.5 py-1 rounded-lg text-sm text-white/45 border border-white/8" style={{ background: 'rgba(255,255,255,0.04)' }}>{item}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Fund Transfer Spotlight */}
            <div className="border-t border-white/8 pt-20">
              <motion.div {...fadeUp} className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-0.5 h-4 rounded-full bg-zinc-500/60" />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400/60">Flow Spotlight: Fund Transfer</span>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                  <h3 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                    Sending money in{' '}
                    <span style={{ color: '#9ca3af' }}>
                      3 taps or less
                    </span>
                  </h3>
                  <p className="text-base text-white/35 max-w-xs leading-relaxed shrink-0">
                    Once a beneficiary is saved, every subsequent transfer collapses to select → amount → confirm.
                  </p>
                </div>
              </motion.div>

              {/* Real App Flow Screens */}
              <motion.div {...fadeUp} className="mb-12 relative -mx-6 lg:-mx-10 px-6 lg:px-10 overflow-x-auto hide-scrollbar pb-6">
                <div className="flex gap-5 min-w-max">
                  {[imgFT1, imgFT4, imgFT2, imgFT3, imgFT7, imgFT5, imgFT6, imgFT8].map((imgSrc, idx) => (
                    <div key={idx} className="w-[240px] sm:w-[260px] md:w-[280px] shrink-0 rounded-[32px] overflow-hidden border-[6px] border-[#1a1a1a] shadow-2xl bg-white relative">
                      <img src={imgSrc} alt={`Fund Transfer Step ${idx + 1}`} className="w-full h-auto object-cover" />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Transfer types */}
              <motion.div {...fadeUp} className="mb-12">
                <p className="text-xs font-mono text-white/25 uppercase tracking-widest mb-4">5 transfer types</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {transferTypes.map((type, i) => (
                    <motion.div key={type.id} {...stagger(i)} className="rounded-xl border p-4 relative overflow-hidden"
                      style={{ borderColor: `${type.color}20`, background: `${type.color}08` }}>
                      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl" style={{ background: `linear-gradient(to right, ${type.color}60, transparent)` }} />
                      <div className="w-2 h-2 rounded-full mb-3" style={{ background: type.color }} />
                      <div className="text-sm font-bold text-white/80 mb-1">{type.label}</div>
                      <div className="text-sm text-white/35 leading-snug">{type.description}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* 6-step phone mockup flow */}
              <motion.div {...fadeUp} className="mb-10">
                <p className="text-xs font-mono text-white/25 uppercase tracking-widest mb-8">6-step transfer flow</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 lg:gap-4">
                  {transferSteps.map((step, i) => (
                    <motion.div key={i} {...stagger(i)} className="flex flex-col items-center gap-4">
                      <div className="relative">
                        <PhoneScreen step={step.step} />
                        {i < transferSteps.length - 1 && (
                          <div className="hidden lg:block absolute top-[60px] -right-5 pointer-events-none" aria-hidden="true">
                            <svg viewBox="0 0 20 10" width="20" height="10"><path d="M0 5 L14 5 M10 2 L14 5 L10 8" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </div>
                        )}
                        <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-lg"
                          style={{ background: i === 5 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: i === 5 ? '#0a0a0a' : '#9ca3af' }}>
                          {step.step}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-white/75 mb-0.5">{step.title}</div>
                        <div className="text-xs text-white/28 leading-snug">{step.description}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Principles strip */}
              <motion.div {...fadeUp} className="pt-8 border-t border-white/8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { title: 'Bangladesh Bank compliant', body: 'TOTP OTP for high-value transactions; PIN for standard transfers' },
                  { title: 'Beneficiary-first',         body: 'Save once — every future transfer to the same contact skips 2 steps' },
                  { title: 'One decision per screen',   body: 'Reduces errors for first-time mobile banking users' },
                ].map((p, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-md bg-white/8 flex items-center justify-center shrink-0 mt-0.5 border border-white/12">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white/65 mb-0.5">{p.title}</div>
                      <div className="text-sm text-white/30 leading-relaxed">{p.body}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            08  WIREFRAME / HAND-SKETCH
        ══════════════════════════════════════════ */}
        <section id="cs-wireframe" style={{ background: '#f8fafc', scrollMarginTop: '64px' }} className="border-b border-border-subtle">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div {...fadeUp} className="mb-14">
              <SectionLabel num="08" label="Wireframe · Hand Sketch" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-6">
                  <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink-primary tracking-tight mb-4 leading-tight">
                    Layout validated before pixels
                  </h2>
                  <p className="text-lg text-ink-secondary leading-relaxed">
                    Before opening Figma, key screens were sketched by hand — focusing on layout hierarchy, information density, and navigation patterns. Low-fidelity wireframes were then created to validate structure with stakeholders early, before visual design began.
                  </p>
                </div>
                <div className="lg:col-span-6 flex flex-col gap-3">
                  {[
                    'Sketched the dashboard layout first — where to put balance, quick actions, and recent transactions',
                    'Wireframed the transfer flow as a linear sequence to test step count and decision points',
                    'Ran a quick internal review of wireframes before committing to the visual system',
                  ].map((note, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-md border border-zinc-200 bg-zinc-50 flex items-center justify-center shrink-0 mt-0.5">
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <p className="text-base text-ink-secondary leading-relaxed">{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Wireframe screens */}
            <motion.div {...fadeUp}>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-8">Key screens — low-fidelity</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { label: 'Dashboard',      sublabel: 'Home screen overview' },
                  { label: 'Transfer Types', sublabel: 'Select destination type' },
                  { label: 'Enter Amount',   sublabel: 'Input + numpad' },
                  { label: 'Review',         sublabel: 'Confirm before sending' },
                ].map((screen, i) => (
                  <motion.div key={i} {...stagger(i)} className="flex flex-col items-center gap-3">
                    <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
                      <WireframePhone screen={i + 1} />
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-ink-primary mb-0.5">{screen.label}</div>
                      <div className="text-sm text-slate-400">{screen.sublabel}</div>
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
        <section id="cs-styleguide" style={{ background: '#0d0d0d', scrollMarginTop: '64px' }} className="border-b border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 80% 80%, rgba(255,255,255,0.02) 0%, transparent 65%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div {...fadeUp} className="mb-14">
              <DarkSectionLabel num="09" label="Style Guide" />
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
                Visual language rooted in BKB's identity
              </h2>
            </motion.div>

            {/* Color palette */}
            <motion.div {...fadeUp} className="mb-14">
              <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-6">Color System</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {styleColors.map((c, i) => (
                  <motion.div key={i} {...stagger(i)} className="flex flex-col gap-3">
                    <div
                      className="w-full h-16 rounded-xl border border-white/8"
                      style={{ background: c.hex, boxShadow: `0 4px 20px ${c.hex}30` }}
                    />
                    <div>
                      <div className="text-sm font-semibold text-white/80 mb-0.5">{c.name}</div>
                      <div className="text-xs font-mono text-white/30 mb-1">{c.hex}</div>
                      <div className="text-xs text-white/25 leading-snug">{c.role}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Typography */}
            <motion.div {...fadeUp}>
              <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-6">Typography</p>
              <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
                {styleType.map((t, i) => (
                  <div key={i} className={`flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-5 ${i < styleType.length - 1 ? 'border-b border-white/6' : ''}`}>
                    <div className="sm:w-36 shrink-0">
                      <div className="text-xs font-mono text-white/30 mb-0.5">{t.role}</div>
                      <div className="text-sm text-white/40">{t.family} · {t.weight} · {t.size}</div>
                    </div>
                    <div
                      className="text-white/85"
                      style={{
                        fontFamily: t.family.includes('Jakarta') ? 'Plus Jakarta Sans, Inter, sans-serif' : t.family.includes('Mono') ? 'JetBrains Mono, monospace' : 'Inter, sans-serif',
                        fontWeight: t.weight,
                        fontSize: i === 0 ? '28px' : i === 1 ? '20px' : i === 2 ? '14px' : '11px',
                        letterSpacing: i === 3 ? '0.1em' : undefined,
                        textTransform: i === 3 ? 'uppercase' : undefined,
                      }}
                    >
                      {t.sample}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            10  VISUAL DESIGN
        ══════════════════════════════════════════ */}
        <section id="cs-visual" style={{ background: '#0a0a0a', scrollMarginTop: '64px' }} className="border-b border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 40%, rgba(255,255,255,0.02) 0%, transparent 70%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div {...fadeUp} className="mb-14">
              <DarkSectionLabel num="10" label="Visual Design" />
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight max-w-xl">
                  A complete, handoff-ready mobile banking experience
                </h2>
                <p className="text-base text-white/35 max-w-sm leading-relaxed shrink-0">
                  30+ flows, 100+ screens — spanning authentication, transfers, payments, beneficiaries, and account management. Built for Android and iOS.
                </p>
              </div>
            </motion.div>

            {/* Full app image */}
            <motion.div {...fadeUp} className="mb-10 rounded-2xl overflow-hidden border border-white/8">
              <img src={myBkbAppImg} alt="myBKB final visual design screens" className="w-full object-cover object-top" />
            </motion.div>

            {/* Design decisions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {cs.keyDecisions.map((decision, i) => (
                <motion.div key={i} {...stagger(i)} className="rounded-2xl p-7 border border-white/8 relative overflow-hidden group hover:border-zinc-600/60 transition-colors" style={{ background: 'rgba(255,255,255,0.025)' }}>
                  <div className="absolute top-0 left-7 h-0.5 bg-zinc-500/40 transition-all duration-300 w-5 group-hover:w-12" />
                  <div className="absolute -bottom-3 -right-1 font-display font-bold leading-none select-none pointer-events-none" style={{ fontSize: '7rem', color: 'rgba(255,255,255,0.025)' }} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="relative z-10">
                    <div className="text-xs font-mono text-white/20 mb-5 tracking-widest">{String(i + 1).padStart(2, '0')}</div>
                    <h3 className="text-base font-bold text-white/85 mb-3 leading-snug">{decision.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{decision.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative overflow-hidden bg-surface-base">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(16,185,129,0.06) 0%, transparent 70%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-28 lg:py-36 text-center">
            <motion.div {...fadeUp}>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400 mb-6">Interested in working together?</p>
              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-ink-primary tracking-tight leading-tight mb-12">
                Let&apos;s build something<br />
                <span style={{ color: '#9ca3af' }}>
                  meaningful.
                </span>
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="https://www.linkedin.com/in/shahola-nisha/" target="_blank" rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-4 text-base font-bold text-white bg-zinc-900 rounded-xl hover:bg-zinc-800 transition-all hover:-translate-y-0.5 shadow-lg">
                  Get in touch
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                  </svg>
                </a>
                <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-ink-secondary hover:text-ink-primary border border-border-default rounded-xl transition-colors hover:border-slate-300">
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
                     <div className="w-12 h-1.5 bg-slate-300" />
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
                      <svg className="absolute inset-0 w-full h-full text-slate-300" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="1" />
                        <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="1" />
                      </svg>
                   </div>
                   {/* Text skeleton */}
                   <div className="flex flex-col gap-2 flex-1">
                      <div className="w-full h-1.5 bg-slate-300" />
                      <div className="w-2/3 h-1.5 bg-slate-300" />
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
                     {i === 1 ? (
                        <div className="w-5 h-4 border-2 border-slate-400 border-b-0 rounded-t-sm relative">
                           <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 border-t-2 border-l-2 border-slate-400 rotate-45" />
                        </div>
                     ) : (
                        <div className="w-5 h-4 border-2 border-slate-300 rounded-sm" />
                     )}
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
                  <div className="w-2/3 h-1.5 bg-slate-300" />
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
                  <div className="w-full h-1.5 bg-slate-300" />
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
    <div className="flex items-center gap-2.5 mb-5">
      {num && <span className="text-xs font-mono text-slate-300">{num}</span>}
      <div className="w-0.5 h-3.5 rounded-full bg-zinc-400/50 shrink-0" />
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{label}</span>
    </div>
  )
}
function DarkSectionLabel({ num, label }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      {num && <span className="text-xs font-mono text-white/20">{num}</span>}
      <div className="w-0.5 h-3.5 rounded-full bg-zinc-400/50 shrink-0" />
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400/55">{label}</span>
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
