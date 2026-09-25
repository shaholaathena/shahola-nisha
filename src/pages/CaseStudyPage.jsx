import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import { projects } from '../data/portfolio'
import Footer from '../components/layout/Footer'
import Navigation from '../components/layout/Navigation'
import CTASection from '../components/sections/CTASection'
import AboutAtmosphere from '../components/about/AboutAtmosphere'
import ScrollProgress from '../components/layout/ScrollProgress'
import { getLenis } from '../lib/lenisInstance'
import myBkbAppImg from '../assets/mybkb app.png'
import homeBkbImg from '../assets/home-bkb.png'

import imgFT1 from '../assets/fund transfer flow bkb/fund transfer.png'
import imgFT3 from '../assets/fund transfer flow bkb/bkb to bkb.png'
import imgFT4 from '../assets/fund transfer flow bkb/beneficiary list.png'
import imgFT5 from '../assets/fund transfer flow bkb/Verify OTP.png'
import imgFT7 from '../assets/fund transfer flow bkb/Fund Transfer Summary.png'
import imgFT8 from '../assets/fund transfer flow bkb/Success.png'

const bkb = projects.find(p => p.id === 'bkb-mobile')
const cs = bkb.caseStudy
/* The next project that has a case study page, wrapping round, so finishing
   this one leads somewhere other than back to the list. */
const linked = projects.filter(p => p.link)
const nextProject = linked[(linked.indexOf(bkb) + 1) % linked.length]

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
  { id: 'cs-cover',    num: '01', label: 'Cover' },
  { id: 'cs-brief',    num: '02', label: 'Brief' },
  { id: 'cs-role',     num: '03', label: 'Role' },
  { id: 'cs-research', num: '04', label: 'Research' },
  { id: 'cs-flow',     num: '05', label: 'User Flow' },
  { id: 'cs-visual',   num: '06', label: 'Visual Design' },
]

/* One finding per category, the one that most directly shaped the design.
   The rest of the desk research is in the source notes, not on the page. */
const researchCards = [
  { category: 'Market Landscape',   point: 'State-owned bank apps lag behind MFS in UX maturity' },
  { category: 'Target Users',       point: 'Bengali support critical — English-only labels create friction' },
  { category: 'Regulatory Context', point: 'Bangladesh Bank mandates 2FA for transactions above ৳10,000' },
  { category: 'Competitive Gaps',   point: 'bKash & Nagad: Simple but MFS-only, no bank account management' },
]

/* One screen per step, so the list and the phone say the same thing. The
   strip used to show eight screens in a row with no step names; "select
   account" and the filled-in OTP state were dropped as near-duplicates of the
   screens either side of them. */
const transferSteps = [
  { step: 1, title: 'Select Type',      description: '3 transfer types based on destination', img: imgFT1 },
  { step: 2, title: 'Pick Beneficiary', description: 'Saved contact or add new',              img: imgFT4 },
  { step: 3, title: 'Enter Amount',     description: 'Amount + optional reference note',      img: imgFT3 },
  { step: 4, title: 'Review',           description: 'Verify all details and fee',            img: imgFT7 },
  { step: 5, title: 'Authenticate',     description: 'OTP or 6-digit PIN',                    img: imgFT5 },
  { step: 6, title: 'Done',             description: 'Receipt and real-time confirmation',    img: imgFT8 },
]

/* Same four phases the Role section always listed, now drawn as a track. */
const timelinePhases = [
  { weeks: 'Week 1–2', name: 'Research & Discovery' },
  { weeks: 'Week 3–4', name: 'IA & User Flows' },
  { weeks: 'Week 5–6', name: 'Visual Design & Components' },
  { weeks: 'Week 7–8', name: 'Prototype & Handoff' },
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

export default function CaseStudyPage() {
  const [activeSection, setActiveSection] = useState('cs-cover')
  const [navVisible, setNavVisible] = useState(false)

  /* No scrollTo(0, 0) here: App's ScrollToTop owns route scrolling, and a bare
     window.scrollTo moves the page out from under Lenis, which eases back. */
  useEffect(() => {
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
    <div className="theme-night min-h-screen bg-hero-void text-ink-primary antialiased">
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
            {/* On wide screens the lit section keeps its name showing, so the
                dots say where you are without hovering each one. Below 2xl
                the label would crowd the content column, so it waits for hover. */}
            {csSections.map(({ id, num, label }) => {
              const isActive = activeSection === id
              return (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  aria-label={`${num} ${label}`}
                  aria-current={isActive ? 'location' : undefined}
                  className="group flex items-center justify-end gap-2 py-1"
                >
                  <span className={`text-[11px] font-mono transition-all duration-200 ${isActive ? 'opacity-0 2xl:opacity-70 group-hover:opacity-100 text-ink-secondary' : 'opacity-0 group-hover:opacity-70 text-ink-muted'}`}>
                    {num} {label}
                  </span>
                  <div className={`rounded-full transition-all duration-200 ${isActive ? 'w-2 h-2 bg-hero-hot' : 'w-1.5 h-1.5 bg-white/20 group-hover:bg-white/40'}`} />
                </button>
              )
            })}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* The site's shared header and, at the foot, About's contact band and
          footer: a case study wears the same chrome as every other page. */}
      <Navigation variant="hero" dark />

      <div className="relative">
        <AboutAtmosphere topStars={0.38} />
        <div className="relative z-10">
      <main className="pt-24 lg:pt-28">

        {/* ══════════════════════════════════════════
            01  COVER
        ══════════════════════════════════════════ */}
        <section id="cs-cover" style={{ scrollMarginTop: '64px' }}>
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-16 pb-16 lg:pt-20 lg:pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-x-16 items-center">
              <div className="lg:col-span-7">
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="mb-7 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted"
                >
                  Case study · {cs.year} · <span className="text-ink-secondary">{cs.company}</span>
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
                  className="font-display font-semibold text-ink-primary tracking-[-0.035em] leading-[1.0]"
                  style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
                >
                  my<span className="text-hero-hot">BKB</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.16, ease: EASE }}
                  className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-secondary sm:text-xl"
                >
                  BKB is a state-owned agricultural bank serving millions across Bangladesh, from government employees to rural farmers. With MFS adoption accelerating, they needed a mobile banking app to stay competitive.
                </motion.p>

                <motion.dl
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                  className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4"
                >
                  {cs.metrics.map((m) => (
                    <div key={m.label}>
                      <dd className="whitespace-nowrap font-display text-2xl font-semibold tracking-tight text-ink-primary sm:text-[1.75rem]">{m.value}</dd>
                      <dt className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">{m.label}</dt>
                    </div>
                  ))}
                </motion.dl>
              </div>

              {/* Shown on phones too, under the facts: without it a phone
                  reader scrolls five sections before seeing the product. */}
              <div className="flex justify-center lg:col-span-5">
                <HeroPhone />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            02  PROJECT BRIEF / OVERVIEW
        ══════════════════════════════════════════ */}
        <section id="cs-brief" style={{ scrollMarginTop: '64px' }}>
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
            <Split label={<SectionLabel num="02" label="Project Brief" />} heading={<>Building Bangladesh&apos;s agricultural bank <span className="text-hero-hot">into mobile</span>.</>}>
              {/* The challenge leads: it is the problem the rest of the page
                  answers, so it gets the size. The outcome follows as its
                  resolution, a step down, rather than two equal paragraphs
                  side by side where neither leads. */}
              <motion.div {...fadeUp}>
                <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">The challenge</p>
                <p className="max-w-3xl text-pretty text-[clamp(1.375rem,1.9vw,1.75rem)] leading-[1.45] tracking-[-0.01em] text-ink-primary">
                  {cs.challenge}
                </p>
              </motion.div>
              <motion.div {...stagger(1)} className="mt-12 max-w-2xl">
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">The outcome</p>
                <p className="text-pretty text-lg leading-relaxed text-ink-secondary">{cs.outcome}</p>
              </motion.div>
            </Split>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            03  ROLE · TIMELINE · TOOLS
            The page's quick-reference facts. It used to be a tinted band with
            gold rules, bled wider than the grid: a card by another name, and
            the box made the empty column under its label read as a hole.
            Now plain type on the page grid, and the timeline, which is a
            sequence, is drawn as one instead of written as a list.
        ══════════════════════════════════════════ */}
        <section id="cs-role" style={{ scrollMarginTop: '64px' }}>
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
            <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-16">
              <motion.div {...fadeUp} className="lg:col-span-4">
                <SectionLabel num="03" label="Role · Timeline · Tools" />
              </motion.div>

              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-14">
                  {[
                    ['My role', 'UI/UX Designer', 'Competitive research & benchmarking, user flows & IA, visual design & component system, Figma prototyping, developer handoff.'],
                    ['Tools', 'Figma, FigJam, Notion', 'Design, components & prototype; user flow mapping & IA; research notes & documentation.'],
                  ].map(([label, value, detail], i) => (
                    <motion.div key={label} {...stagger(i)}>
                      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">{label}</p>
                      <p className="text-xl font-semibold tracking-tight text-ink-primary">{value}</p>
                      <p className="mt-2 max-w-sm text-base leading-relaxed text-ink-secondary">{detail}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-14">
                  <motion.p {...fadeUp} className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                    Timeline <span className="text-ink-secondary">· {cs.duration}</span>
                  </motion.p>
                  <ol className="grid grid-cols-2 gap-x-1.5 gap-y-8 sm:grid-cols-4">
                    {timelinePhases.map((phase, i) => (
                      <motion.li key={phase.weeks} {...stagger(i)}>
                        <div className="relative h-px bg-white/15">
                          <motion.span
                            aria-hidden
                            className="absolute inset-0 origin-left bg-hero-hot/60"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={VP}
                            transition={{ duration: 0.6, delay: 0.2 + i * 0.18, ease: EASE }}
                          />
                          <span aria-hidden className="absolute -top-[3px] left-0 h-[7px] w-[7px] rounded-full bg-hero-hot" />
                        </div>
                        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] tabular-nums text-ink-muted">{phase.weeks}</p>
                        <p className="mt-1.5 pr-4 text-base font-medium leading-snug text-ink-primary">{phase.name}</p>
                      </motion.li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            04  SECONDARY RESEARCH / DESK RESEARCH
        ══════════════════════════════════════════ */}
        <section id="cs-research" style={{ scrollMarginTop: '64px' }}>
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-24">

            {/* Read as an argument rather than a board of boxes: the insight
                it led to first, the four findings that back it, then what it
                meant for the design. Heading held on the left, as in the flow
                map further down. */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-16">
              <motion.div {...fadeUp} className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <SectionLabel num="04" label="Secondary Research · Desk Research" />
                  <h2 className="font-display text-[clamp(2rem,3.6vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-ink-primary text-balance">
                    Understanding <span className="text-hero-hot">the ecosystem</span> before designing.
                  </h2>
                </div>
              </motion.div>

              <div className="lg:col-span-8">
                {/* The insight */}
                <motion.div {...fadeUp}>
                  <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">Key insight</p>
                  <p className="text-xl leading-relaxed text-ink-primary">
                    First-time mobile banking users span BKB&apos;s base, from rural farmers to urban government employees.{' '}
                    Clarity and guided flows were non-negotiable.
                  </p>
                </motion.div>

                {/* The findings behind it, one per category */}
                <div className="mt-12 grid grid-cols-1 gap-x-12 sm:grid-cols-2">
                  {researchCards.map((card, i) => (
                    <motion.div
                      key={card.category}
                      {...stagger(i % 2)}
                      className={`py-6 ${i > 1 ? 'border-t border-border-subtle' : i === 1 ? 'border-t border-border-subtle sm:border-t-0' : ''}`}
                    >
                      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                        {card.category}
                      </p>
                      <p className="text-base leading-relaxed text-ink-primary">
                        <Figures text={card.point} />
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* What it meant */}
                <motion.div {...fadeUp} className="mt-10 border-l-2 border-hero-hot pl-6">
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">What this means</p>
                  <p className="max-w-2xl text-xl leading-relaxed text-ink-primary">
                    Our design needs to be simple, trustworthy, and local-first, helping first-time users feel confident while meeting regulatory standards and competing with leading MFS apps.
                  </p>
                </motion.div>

                {/* The decisions that followed. These are structure and
                    security calls, not visual ones, so they finish the
                    research argument instead of sitting under Visual Design.
                    "One decision per screen" is the flow spotlight's headline
                    below, so it is not repeated here. */}
                <motion.p {...fadeUp} className="mb-6 mt-16 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
                  Decisions it led to
                </motion.p>
                <Rows>
                  {cs.keyDecisions.filter((d) => d.title !== 'One decision per screen').map((d, i) => (
                    <Row key={d.title} i={i} marker={String(i + 1).padStart(2, '0')}>
                      <p className="text-lg font-semibold text-ink-primary">{d.title}</p>
                      <p className="mt-1.5 max-w-2xl text-base leading-relaxed text-ink-secondary">{d.description}</p>
                    </Row>
                  ))}
                </Rows>
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════
            05  USER FLOW
        ══════════════════════════════════════════ */}
        <section id="cs-flow" style={{ scrollMarginTop: '64px' }}>
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
            <Split
              label={<SectionLabel num="05" label="User Flow" />}
              heading={<><span className="text-hero-hot">30+ flows</span>, designed end to end.</>}
            >
              {/* The map: every flow group, as an index. */}
              <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
                {cs.flowGroups.map((group, i) => (
                  <motion.div key={group.label} {...stagger(i % 3)} className="border-t border-border-subtle pt-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                      {group.items.length} flows
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-ink-primary">{group.label}</h3>
                    <p className="mt-1.5 text-base leading-relaxed text-ink-secondary">{group.items.join(', ')}</p>
                  </motion.div>
                ))}
              </div>

            </Split>

            {/* The spotlight: one flow, step by step, on the real screens.
                On the full grid rather than inside the Split's content column:
                by here the sticky heading has scrolled away, and nested in the
                right two-thirds it left the left third empty. Now the phone
                takes that third and the steps keep the map's left edge. */}
            <div className="mt-24 lg:mt-32">
              <TransferSpotlight />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            06  VISUAL DESIGN
        ══════════════════════════════════════════ */}
        <section id="cs-visual" style={{ scrollMarginTop: '64px' }}>
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
            <Split
              label={<SectionLabel num="06" label="Visual Design" />}
              heading={<>A complete, <span className="text-hero-hot">handoff-ready</span> mobile banking experience.</>}
            >
              {/* The screens lead: this is the visual section, so the first
                  thing in it is the visuals. Unframed on the sky, in the same
                  column as everything else. Capped at 760px: the source is
                  1361px wide and goes soft on retina any larger (a 2x Figma
                  export would lift this). 80% brightness, true colour on hover. */}
              <motion.div {...fadeUp} className="relative">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-10 max-w-[840px]"
                  style={{ background: 'radial-gradient(closest-side, rgba(232,184,98,0.07), transparent)' }}
                />
                <img
                  src={myBkbAppImg}
                  alt="myBKB final visual design screens"
                  className="relative w-full max-w-[760px] brightness-[.8] transition-[filter] duration-500 hover:brightness-100"
                />
              </motion.div>

              {/* The style guide, as one line under the screens. */}
              <motion.div {...fadeUp} className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5">
                <div className="flex items-center gap-2" role="list" aria-label="Colour palette">
                  {styleColors.map((c) => (
                    <span
                      key={c.hex}
                      role="listitem"
                      aria-label={`${c.name} ${c.hex}, ${c.role}`}
                      title={`${c.name} ${c.hex} · ${c.role}`}
                      className="h-6 w-6 rounded-full ring-1 ring-white/10"
                      style={{ background: c.hex }}
                    />
                  ))}
                </div>
                <p className="text-base text-ink-secondary">
                  Set in{' '}
                  <span className="font-bold text-ink-primary" style={{ fontFamily: '"DM Sans", ui-sans-serif, system-ui, sans-serif' }}>
                    Circular Std
                  </span>
                </p>
              </motion.div>
            </Split>
          </div>
        </section>

        {/* Somewhere to go next that is not back to the list. */}
        <section className="relative">
          <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-16 text-center lg:px-10 lg:py-20">
            <motion.div {...fadeUp}>
              <Link to={nextProject.link} className="group inline-flex flex-col items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
                  Next case study
                </span>
                <span className="inline-flex items-center gap-3 font-display text-xl font-semibold tracking-tight text-ink-primary transition-colors duration-300 group-hover:text-hero-hot sm:text-2xl">
                  {nextProject.caseStudy?.title ?? nextProject.title}
                  <span aria-hidden="true" className="text-hero-hot transition-transform duration-200 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </motion.div>
          </div>
        </section>

        <CTASection />

      </main>
      <Footer dark />
        </div>
      </div>
    </div>
  )
}

/* ── Hero phone: the real guest dashboard ──

   It used to be a wireframe of a phone, crossed-out image boxes and all, while
   the finished screens sat further down the page; the first thing a reader saw
   looked unfinished. This is the actual pre-login home screen, device frame
   and all (the PNG carries its own).

   Graded into the night, not recoloured: 80% brightness and slightly
   desaturated so the green does not glare out of the sky, a gold glow behind,
   and the lower third sunk into the navy. Pointing at it shows it in true
   colour. It tilts in once and then drifts; under reduced motion it just
   appears. */
function HeroPhone() {
  const reduce = useReducedMotion()

  /* Only the phone tilts; the caption sits outside the 3D transform, which
     otherwise skews and smears its small mono type. */
  return (
    <figure className="group relative w-[220px] sm:w-[260px] lg:w-[300px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-20 rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(232,184,98,0.12), transparent)' }}
      />
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 40, rotateY: 18, rotateX: 6 }}
        animate={{ opacity: 1, y: 0, rotateY: -8, rotateX: 3 }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformPerspective: 1200 }}
      >
        <motion.img
          src={homeBkbImg}
          alt="myBKB guest dashboard, before login: a promotional banner above a grid of banking services and a bottom tab bar"
          draggable="false"
          animate={reduce ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="relative block w-full brightness-[.8] saturate-[.9] drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)] transition-[filter] duration-500 group-hover:brightness-100 group-hover:saturate-100"
          style={{
            maskImage: 'linear-gradient(to bottom, #000 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, #000 80%, transparent 100%)',
          }}
        />
      </motion.div>
      <figcaption className="relative -mx-12 mt-5 whitespace-nowrap text-center font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
        Guest dashboard · before login
      </figcaption>
    </figure>
  )
}

/* Through Lenis when it exists, for the same reason as App's ScrollToTop:
   scrollIntoView moves the page behind Lenis's back and it eases away again.
   Both honour each section's scroll-margin-top, which clears the fixed bar. */
function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  const lenis = getLenis()
  if (lenis) lenis.scrollTo(el)
  else el.scrollIntoView({ behavior: 'smooth' })
}

/* ── Helper: Section labels ── */
/* The page's one label: a gold number and a muted name, both mono — the same
   register as the About page's eyebrows. */
function SectionLabel({ num, label }) {
  return (
    <p className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
      {num && <span className="tabular-nums text-hero-hot">{num}</span>}
      <span className="text-ink-muted">{label}</span>
    </p>
  )
}

/* Every section is the same shape, as on the About page: label and heading
   held on the left third, the content in the two-thirds beside it. One heading
   size for all of them, so the page reads as one document. */
const H2 = 'font-display text-[clamp(2rem,3.6vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-ink-primary text-balance'

function Split({ label, heading, children }) {
  return (
    <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-16">
      <motion.div {...fadeUp} className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          {label}
          <h2 className={H2}>{heading}</h2>
        </div>
      </motion.div>
      <div className="lg:col-span-8">{children}</div>
    </div>
  )
}

function Rows({ children, className = '' }) {
  return <ol className={className}>{children}</ol>
}

/* A ruled row: a mono marker on the left (a week, a number, a label), the
   content beside it. The first row carries no rule. */
function Row({ i, marker, children }) {
  return (
    <motion.li
      {...stagger(i)}
      className={`grid grid-cols-1 gap-y-2 py-6 sm:grid-cols-[9rem_1fr] sm:items-baseline sm:gap-x-8 ${i === 0 ? 'pt-0' : 'border-t border-border-subtle'}`}
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">{marker}</span>
      <div>{children}</div>
    </motion.li>
  )
}



/* Picks the figures out of a research line (30%+, 65M+, ৳10,000, 2FA) in
   full ink, so the evidence scans before the sentence is read. */
const FIGURE = /(৳[\d,]+|\d[\d,.]*\s?(?:%\+?|M\+|K\+|\+|FA)?)/g

function Figures({ text }) {
  return text.split(FIGURE).map((part, i) =>
    i % 2 ? <span key={i} className="font-medium text-ink-primary">{part}</span> : part
  )
}

/* ── Fund transfer spotlight ──

   The steps and the screens used to be two separate strips: six numbered
   bubbles, then eight phones in a drag-to-scroll row with no names under them,
   so nothing said which screen was which step. Here they are one thing: the
   list on the left, the phone showing the step that is lit.

   It walks itself while in view, so the flow plays like the transfer it is;
   pointing at or tapping a step takes over and stops the walk. Under reduced
   motion nothing advances on its own and the swap is a plain cut.

   The phone leads on the left, and its screen is graded into the night rather
   than recoloured: held at 80% brightness under a faint navy shade, so the
   app's white and green do not glare out of the sky. Pointing at the phone
   lifts both, and the screens show in their true colour. */
const STEP_MS = 3200

function TransferPhone({ step, reduce }) {
  return (
    <div className="group relative mx-auto w-[240px] sm:w-[260px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-16 rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(232,184,98,0.10), transparent)' }}
      />
      <div className="relative rounded-[40px] border border-white/10 bg-[#0b1426] p-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
        <div className="relative overflow-hidden rounded-[32px]">
          {/* Sizes the frame to the screenshots' own ratio. */}
          <img src={transferSteps[0].img} alt="" aria-hidden className="invisible block w-full" />
          <AnimatePresence initial={false}>
            <motion.img
              key={step.step}
              src={step.img}
              alt={`${step.title} screen`}
              draggable="false"
              className="absolute inset-0 h-full w-full object-cover object-top brightness-[.8] transition-[filter] duration-500 group-hover:brightness-100"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: EASE }}
            />
          </AnimatePresence>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-hero-void/10 via-transparent to-hero-void/35 transition-opacity duration-500 group-hover:opacity-0"
          />
        </div>
      </div>
    </div>
  )
}

function TransferSpotlight() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-25% 0px -25% 0px' })
  const [active, setActive] = useState(0)
  const [held, setHeld] = useState(false)
  const walking = inView && !held && !reduce

  useEffect(() => {
    if (!walking) return
    const t = setTimeout(() => setActive((a) => (a + 1) % transferSteps.length), STEP_MS)
    return () => clearTimeout(t)
  }, [walking, active])

  const pick = (i) => {
    setHeld(true)
    setActive(i)
  }
  const step = transferSteps[active]

  return (
    <div ref={ref} className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-16 lg:items-center">
      <div className="hidden lg:col-span-4 lg:block">
        <TransferPhone step={step} reduce={reduce} />
      </div>

      <div className="lg:col-span-8">
        <motion.div {...fadeUp}>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
            Flow spotlight · Fund transfer
          </p>
          <h3 className="font-display text-2xl font-semibold tracking-tight text-ink-primary sm:text-3xl">
            One decision per screen.
          </h3>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-secondary">
            Transfers broken into micro-steps: Who to → How much → Confirm. One question per screen reduces errors.
          </p>
        </motion.div>

        {/* On phones the screen sits between the claim and the steps, so a
            tapped step and its screen stay on the same screenful. */}
        <div className="mt-12 lg:hidden">
          <TransferPhone step={step} reduce={reduce} />
        </div>

        {/* Six steps in the flow map's rhythm: a rule over each, three to a
            row, so the list sits at the phone's height instead of running a
            screen past it. The lit step's rule is the progress bar. */}
        <ol
          className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-10 xl:grid-cols-3"
          onMouseLeave={() => setHeld(false)}
        >
          {transferSteps.map((s, i) => {
            const on = i === active
            return (
              <li key={s.step}>
                <button
                  type="button"
                  onClick={() => pick(i)}
                  onMouseEnter={() => pick(i)}
                  aria-current={on ? 'step' : undefined}
                  className="group/step block w-full text-left"
                >
                  <span className="relative block h-px bg-white/10 transition-colors duration-300 group-hover/step:bg-white/25">
                    {/* While the flow walks itself, the lit step's rule fills
                        over its time on screen, so the next step never comes
                        as a surprise. Taking over leaves it solid. */}
                    {on && (
                      <motion.span
                        key={`${active}-${walking}`}
                        aria-hidden
                        className="absolute inset-0 origin-left bg-hero-hot"
                        initial={{ scaleX: walking ? 0 : 1 }}
                        animate={{ scaleX: 1 }}
                        transition={walking ? { duration: STEP_MS / 1000, ease: 'linear' } : { duration: 0 }}
                      />
                    )}
                  </span>
                  <span className={`mt-4 block font-mono text-[11px] tabular-nums tracking-[0.18em] transition-colors duration-300 ${on ? 'text-hero-hot' : 'text-ink-muted'}`}>
                    {String(s.step).padStart(2, '0')}
                  </span>
                  <span className={`mt-1.5 block text-base font-semibold transition-colors duration-300 sm:text-lg ${on ? 'text-ink-primary' : 'text-ink-secondary'}`}>
                    {s.title}
                  </span>
                  <span className={`mt-1 block text-sm leading-snug transition-colors duration-300 sm:text-base ${on ? 'text-ink-secondary' : 'text-ink-muted'}`}>
                    {s.description}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
