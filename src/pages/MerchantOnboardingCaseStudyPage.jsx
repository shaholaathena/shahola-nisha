import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'
import { projects } from '../data/portfolio'
import Footer from '../components/layout/Footer'
import ScrollProgress from '../components/layout/ScrollProgress'
import RevealLines from '../components/ui/RevealLines'
import logo from '../assets/logo.png'

const project = projects.find(p => p.id === 'merchant-onboarding')
const cs = project.caseStudy

// Real screens auto-resolve from src/assets/merchant/.
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
// NDA gate: only screens confirmed brand-anonymized render as real images;
// everything else falls back to a neutral wireframe. Add a filename here (no
// extension) ONLY after its export has NO client branding, bank name, third-party
// wallet logos, live QR code, or real data. Empty = clean wireframes.
const APPROVED_SCREENS = new Set([
  // SSL Merchant — SSL's own reference build of the platform
  'ssl-merchant-login',
  'ssl-merchant-home',
  'ssl-merchant-select-store',
  'ssl-merchant-select-counter',
  'ssl-merchant-qr-amount',
  'ssl-merchant-qr',
  // SSL Acquiring Platform CRM — the field-agent app
  'ssl-merchant-crm-login',
  'ssl-merchant-crm-home',
  'ssl-merchant-crm-create-lead-flow-1',
  'ssl-merchant-crm-create-lead-flow-2',
  // Per-bank skins
  'jbl-home',
  'jbl-select-store',
  'jbl-select-counter',
  'jbl-enter-amount',
  'jbl-qr',
  'flow-1-create-lead',
  'sebl-home',
  'ncc-home',
  'rupali-home',
  'sdbl-home',
])
const pick = (file) => (file && APPROVED_SCREENS.has(file) ? screenByName[file] : undefined)
const resolve = (file, fallback) => pick(file) || pick(fallback)

const EASE = [0.22, 1, 0.36, 1]
const VP = { once: true, margin: '-12%' }

const csSections = [
  { id: 'cs-cover',    num: '01', label: 'Overview' },
  { id: 'cs-problem',  num: '02', label: 'The problem' },
  { id: 'cs-apps',     num: '03', label: 'Two apps' },
  { id: 'cs-flow',     num: '04', label: 'Take a payment' },
  { id: 'cs-crm',      num: '05', label: 'Onboard a merchant' },
  { id: 'cs-platform', num: '06', label: 'How it scales' },
  { id: 'cs-system',   num: '07', label: 'Decisions' },
  { id: 'cs-outcome',  num: '08', label: 'Outcome' },
]

/* ── Reveal: blur + lift. The page's single motion idiom, used everywhere. ── */
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

/* ── Phone frame. `src` renders a real screen; otherwise a neutral wireframe. ── */
function Phone({ src, width = 220, alt = '', flat = false }) {
  const bezel = Math.max(5, Math.round(width * 0.028))
  const outerR = Math.round(width * 0.16)
  const innerR = Math.max(6, outerR - bezel)
  const islandW = Math.round(width * 0.26)
  const islandH = Math.round(width * 0.072)
  return (
    <div className="shrink-0" style={{ width }}>
      <div
        className="relative bg-zinc-900"
        style={{
          padding: bezel,
          borderRadius: outerR,
          boxShadow: flat
            ? '0 14px 30px -14px rgba(15,23,42,0.45)'
            : '0 30px 60px -24px rgba(15,23,42,0.5), inset 0 0 0 1.5px rgba(255,255,255,0.08)',
        }}
      >
        <span className="absolute left-[-2px] rounded-l-sm bg-zinc-700/90" style={{ top: '22%', width: 2, height: '9%' }} />
        <span className="absolute right-[-2px] rounded-r-sm bg-zinc-700/90" style={{ top: '31%', width: 2, height: '13%' }} />
        <div className="relative overflow-hidden bg-white" style={{ borderRadius: innerR, aspectRatio: '393 / 852' }}>
          {src ? (
            <img src={src} alt={alt} className="w-full h-full object-cover object-top" draggable="false" />
          ) : (
            <div className="w-full h-full bg-zinc-50 flex items-center justify-center relative">
              <svg className="absolute inset-0 w-full h-full text-zinc-200" preserveAspectRatio="none" viewBox="0 0 100 100">
                <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" />
                <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.5" />
              </svg>
              <span className="relative text-[9px] font-mono uppercase tracking-[0.18em] text-zinc-400">Wireframe</span>
            </div>
          )}
          <div
            className="absolute left-1/2 -translate-x-1/2 bg-black rounded-full z-10"
            style={{ top: Math.round(bezel * 1.4), width: islandW, height: islandH }}
          />
        </div>
      </div>
    </div>
  )
}

/* ── Hero: the problem, animated. No screenshots by design.
   Two reasons this is not a device mockup. The page was carrying 23 phone
   renders and the old hero deck showed the exact six bank home screens that §06
   shows again. And a hero full of finished screens states the solution before
   the problem has been posed. So this draws the problem instead: the same
   product, built from scratch, once per bank. Rows are deliberately anonymous
   and identical, because the redundancy IS the point. ── */
const BUILD_STEPS = ['Accept QR', 'Sign up', 'Verify', 'Settle']
const BUILD_ROWS = 5

function HeroProblem() {
  return (
    <div style={{ width: 360 }}>
      {/* A CSS keyframe loop rather than a motion value: Framer would not keep a
          mount-time keyframe array repeating here (it settled at scaleX(1) and
          stopped), and a looping bar needs no JS state anyway. Reduced motion is
          honoured in the media query below. */}
      <style>{`
        @keyframes heroBuildFill {
          0%   { transform: scaleX(0); }
          72%  { transform: scaleX(1); }
          100% { transform: scaleX(1); }
        }
        .hero-build-fill {
          transform-origin: left center;
          animation: heroBuildFill 3.9s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-build-fill { animation: none; transform: scaleX(0.45); }
        }
      `}</style>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-400 shrink-0">
          Bank by bank
        </span>
        <span className="h-px flex-1 bg-zinc-200" />
      </div>

      {/* what every one of them has to build */}
      <div className="flex gap-1 mb-2.5 pl-9">
        {BUILD_STEPS.map((s) => (
          <span
            key={s}
            className="flex-1 text-center text-[8px] font-mono uppercase tracking-[0.06em] text-zinc-400"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="space-y-2">
        {Array.from({ length: BUILD_ROWS }).map((_, r) => (
          <div key={r} className="flex items-center gap-2">
            <span className="w-7 shrink-0 text-[9px] font-mono tabular-nums text-zinc-300">
              {String(r + 1).padStart(2, '0')}
            </span>
            <div className="relative flex-1 h-[22px] rounded-md border border-border-subtle bg-surface-1 overflow-hidden">
              {/* the identical four stages, every row */}
              <div className="absolute inset-0 flex">
                {BUILD_STEPS.map((s, i) => (
                  <div
                    key={s}
                    className={`flex-1 ${i < BUILD_STEPS.length - 1 ? 'border-r border-zinc-200/80' : ''}`}
                  />
                ))}
              </div>
              {/* progress that never gets anywhere fast */}
              <div
                className="hero-build-fill absolute inset-y-0 left-0 w-full bg-zinc-300/60"
                style={{ animationDelay: `${r * 0.45}s` }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 text-[11px] font-mono text-ink-muted text-center leading-relaxed">
        The same build, from scratch, every time.
      </p>
    </div>
  )
}

/* ── Brand switcher: the thesis, made operable.
   Six tiny phones in a row can't prove "same layout" — at that size you can't read
   them. So instead: ONE screen at full size, and the viewer switches the mode. The
   layout visibly doesn't move; only the tokens resolve differently. The readout
   makes that literal, and sets up the two-tier explanation directly below. ── */
function BrandSwitcher() {
  const reduce = useReducedMotion()
  const banks = cs.banks ?? []
  const [i, setI] = useState(0)
  const [held, setHeld] = useState(false)

  useEffect(() => {
    if (reduce || held || banks.length < 2) return
    const t = setInterval(() => setI(p => (p + 1) % banks.length), 2800)
    return () => clearInterval(t)
  }, [reduce, held, banks.length])

  const active = banks[i] ?? {}
  const label = active.fullName || active.code

  return (
    <div>
      {/* mode selector */}
      <div className="flex flex-wrap gap-2 mb-10">
        {banks.map((b, idx) => {
          const on = i === idx
          return (
            <button
              key={b.code}
              onClick={() => { setI(idx); setHeld(true) }}
              aria-pressed={on}
              className={`group relative flex items-center gap-2 rounded-full border px-3.5 py-2 text-[12px] font-semibold transition-all duration-200 ${
                on
                  ? 'border-transparent text-white'
                  : 'border-border-subtle bg-surface-1 text-ink-muted hover:text-ink-secondary hover:border-zinc-300'
              }`}
              style={on ? { background: b.accent } : undefined}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0 transition-colors"
                style={{ background: on ? 'rgba(255,255,255,0.85)' : b.accent }}
              />
              {b.fullName || b.code}
              {b.status !== 'Live' && (
                <span className={`text-[9px] font-mono uppercase tracking-wider ${on ? 'text-white/60' : 'text-zinc-400'}`}>
                  {b.status}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* the one screen, re-themed in place. It arrives in black and white and
            takes on the brand colour as the section scrolls in, so the reveal
            itself demonstrates what a mode switch does. */}
        <motion.div
          className="lg:col-span-5 flex justify-center"
          initial={{ filter: 'grayscale(1)' }}
          whileInView={{ filter: 'grayscale(0)' }}
          viewport={{ once: true, margin: '-18%' }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-10 -z-10 rounded-full blur-3xl"
              animate={{ background: `radial-gradient(circle at 50% 45%, ${active.accent}44, transparent 70%)` }}
              transition={{ duration: 0.6, ease: EASE }}
            />
            <Phone width={252} />
            <div className="absolute inset-0 pointer-events-none">
              {banks.map((b, idx) => (
                <motion.div
                  key={b.code}
                  className="absolute overflow-hidden"
                  style={{
                    inset: Math.round(252 * 0.028),
                    borderRadius: Math.round(252 * 0.16) - Math.round(252 * 0.028),
                    zIndex: i === idx ? 2 : 1,
                  }}
                  initial={false}
                  animate={{ opacity: i === idx ? 1 : 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <img
                    src={resolve(b.screen, `${b.code.toLowerCase()}-home`)}
                    alt={`${label} merchant home screen`}
                    className="w-full h-full object-cover object-top"
                    draggable="false"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* what actually changed */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-border-subtle bg-surface-1 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border-subtle">
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-400">Active mode</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={active.code}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="text-[12px] font-bold text-ink-primary"
                >
                  {active.code}
                </motion.span>
              </AnimatePresence>
            </div>

            <dl className="divide-y divide-zinc-200/70">
              {[
                ['brand / logo', label],
                ['action-primary', active.accent],
                ['rollout', active.status],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-4 px-5 py-3.5">
                  <dt className="text-[12px] font-mono text-ink-muted">{k}</dt>
                  <dd className="flex items-center gap-2 min-w-0">
                    {k === 'action-primary' && (
                      <motion.span
                        className="w-4 h-4 rounded shrink-0 border border-black/10"
                        animate={{ background: v }}
                        transition={{ duration: 0.45, ease: EASE }}
                      />
                    )}
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`${k}-${v}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25 }}
                        className={`text-[13px] font-semibold text-ink-primary truncate ${k === 'action-primary' ? 'font-mono uppercase' : ''}`}
                      >
                        {v}
                      </motion.span>
                    </AnimatePresence>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="px-5 py-3.5 bg-surface-base border-t border-border-subtle">
              <p className="text-[12px] text-ink-muted leading-relaxed">
                Everything else stays identical: layout, spacing, type, components,
                copy, every flow. Nothing above is a fork.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Product card. The screen mockup was removed on purpose: both cards showed
   screens that appear again in the flow sections directly below, and the page
   was carrying 23 phone renders in total. This states what each app is; the
   flows show it. ── */
function ProductCard({ product: p }) {
  const reduce = useReducedMotion()
  const [hover, setHover] = useState(false)
  const lift = hover && !reduce

  return (
    <motion.div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      animate={reduce ? {} : { y: hover ? -5 : 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      className="group relative h-full overflow-hidden rounded-2xl border border-border-subtle bg-surface-base min-h-[320px] sm:min-h-[300px] lg:min-h-[400px]"
    >
      {/* accent wash, keyed to the app */}
      <div
        className="absolute right-[-110px] bottom-[-140px] rounded-full blur-3xl transition-opacity duration-500 pointer-events-none"
        style={{
          width: 340, height: 340,
          background: `radial-gradient(circle, ${p.glow}, transparent 70%)`,
          opacity: lift ? 1 : 0.65,
        }}
      />

      <div className="relative z-10 p-7">
        <span className="inline-block px-2 py-0.5 rounded-full bg-zinc-900 text-white text-[9px] font-mono uppercase tracking-[0.16em] whitespace-nowrap">
          {p.role}
        </span>

        <h3 className="font-display text-2xl sm:text-[1.75rem] font-bold text-ink-primary tracking-tight mt-4 mb-1">{p.name}</h3>
        <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-zinc-400 mb-3">{p.audience}</div>
        <p className="text-[16px] font-medium text-ink-primary leading-snug mb-2.5">{p.job}</p>
        <p className="text-[13px] text-ink-muted leading-relaxed mb-5">{p.detail}</p>

        <div className="flex flex-wrap gap-1.5">
          {p.flows.map(f => (
            <span key={f} className="px-2.5 py-1 rounded-md text-[11px] font-medium text-ink-secondary bg-surface-1 border border-border-subtle">
              {f}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ── FlowRow: the whole sequence laid out at once, hover or tap to expand.
   Deliberately has NO scroll math. The two patterns before this — a pinned phone
   driven by scroll progress, then a snap-scrolling filmstrip — both broke on
   measurement: the pin depended on vh arithmetic (dead zones on tall screens),
   and the filmstrip only had ~290px of scroll for five 260px cards, so most
   cards clamped to the same offset and the position indicator could never sync.
   Here the only state is which step is focused, so there is nothing to mismeasure. ── */
function FlowRow({ flow }) {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const a = flow[active]
  const n = flow.length

  return (
    <div>
      {/* pt reserves room for the active lift. Transforms don't occupy layout
          space, so without it a lifted phone escapes upward over the intro copy. */}
      <div className="flex flex-wrap lg:flex-nowrap items-end justify-center gap-x-2 gap-y-9 pt-6">
        {flow.map((s, i) => {
          const on = active === i
          const src = resolve(s.file, s.fallback)
          return (
            <Fragment key={s.file}>
              <motion.button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={on}
                aria-label={`${s.step}: ${s.title}`}
                className="group relative flex flex-col items-center shrink-0 rounded-2xl px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                initial={reduce ? false : { opacity: 0, y: 26, filter: 'blur(5px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={VP}
                transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
              >
                {/* Phone and its label lift together as one unit, so the caption
                    never detaches from the screen it belongs to. */}
                <motion.div
                  className="flex flex-col items-center"
                  animate={reduce ? {} : { y: on ? -8 : 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                >
                  {/* Screens rest in black and white and take on colour only when
                      focused, so the active step is unmistakable and the row reads
                      as one composition rather than five competing screenshots.
                      Grayscale is applied even under reduced motion — it is a
                      styling state, not movement. */}
                  <motion.div
                    animate={{
                      scale: reduce ? 1 : (on ? 1.04 : 1),
                      opacity: on ? 1 : 0.75,
                      filter: on ? 'grayscale(0) saturate(1)' : 'grayscale(1) saturate(0.9)',
                    }}
                    transition={{
                      scale: { type: 'spring', stiffness: 260, damping: 24 },
                      opacity: { duration: 0.3, ease: EASE },
                      filter: { duration: 0.45, ease: EASE },
                    }}
                    style={{ transformOrigin: '50% 100%' }}
                  >
                    <Phone src={src} width={148} alt={s.title} flat={!on} />
                  </motion.div>

                  <div className="mt-4 flex items-center gap-2">
                    <span className={`font-mono text-[10px] tabular-nums transition-colors duration-300 ${
                      on ? 'text-zinc-400' : 'text-zinc-300'
                    }`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={`text-[11.5px] font-semibold transition-colors duration-300 ${
                      on ? 'text-ink-primary' : 'text-ink-muted'
                    }`}>
                      {s.step}
                    </span>
                  </div>

                  <motion.span
                    className="mt-1.5 block h-0.5 rounded-full bg-zinc-900"
                    animate={{ width: on ? 18 : 0, opacity: on ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  />
                </motion.div>
              </motion.button>

              {i < n - 1 && (
                <span className="hidden lg:flex self-center shrink-0 text-zinc-300 pb-8" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </span>
              )}
            </Fragment>
          )
        })}
      </div>

      {/* Fixed-height caption so switching steps never shifts the layout. */}
      <div className="mt-10 pt-8 border-t border-zinc-200/70 min-h-[124px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={a.file}
            initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(3px)' }}
            transition={{ duration: 0.32, ease: EASE }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10"
          >
            <div className="lg:col-span-5">
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 mb-2">{a.step}</div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-ink-primary tracking-tight leading-snug">
                {a.title}
              </h3>
            </div>
            <div className="lg:col-span-7">
              <p className="text-[1.02rem] text-ink-secondary leading-relaxed mb-3">{a.hint}</p>
              <p className="text-[13px] text-ink-muted leading-relaxed border-l-2 border-zinc-200 pl-3.5">{a.why}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ── useMediaQuery: SSR-safe, reactive. Used to gate the pinned horizontal flow
   to desktop only — small screens keep the tap-driven FlowRow. ── */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  )
  useEffect(() => {
    const m = window.matchMedia(query)
    const on = () => setMatches(m.matches)
    on()
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [query])
  return matches
}

/* ── HorizontalFlow: the payment flow as a pinned, cinematic side-scroll —
   robin-noguier style. One full-viewport slide per step; vertical scroll drives
   horizontal travel while the section is pinned.

   The measurement trap the old filmstrip fell into (comment on FlowRow) is
   avoided here by DECOUPLING the two quantities:
     • how LONG the pin lasts  → the outer section height (n × 100vh), a fixed
       value that never depends on child widths.
     • how FAR the track moves → measured live from the DOM (scrollWidth minus
       viewport), re-measured on resize and after assets settle.
   Because travel is measured rather than derived from the height, the indicator
   and the last slide always land exactly, on any screen size.

   Desktop + full motion only. Otherwise it returns the tested FlowRow so touch
   users and reduced-motion users get the reliable interactive row instead. ── */
function HorizontalFlow({ flow }) {
  const reduce = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const targetRef = useRef(null)
  const trackRef = useRef(null)
  const [distance, setDistance] = useState(0)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  })
  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const x = useSpring(xRaw, { stiffness: 90, damping: 26, mass: 0.4 })
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useLayoutEffect(() => {
    if (!isDesktop || reduce) return
    const measure = () => {
      const track = trackRef.current
      if (track) setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    }
    measure()
    const settle = setTimeout(measure, 400)
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    window.addEventListener('resize', measure)
    return () => {
      clearTimeout(settle)
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [isDesktop, reduce, flow])

  if (!isDesktop || reduce) {
    return (
      <div className="max-w-6xl mx-auto px-6 lg:px-10 pb-16 lg:pb-20">
        <FlowRow flow={flow} />
      </div>
    )
  }

  return (
    <section ref={targetRef} style={{ height: `${flow.length * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center bg-surface-base">
        <motion.div ref={trackRef} style={{ x }} className="flex items-center will-change-transform">
          {flow.map((s, i) => {
            const src = resolve(s.file, s.fallback)
            return (
              <article key={s.file} className="w-screen shrink-0 h-screen flex items-center">
                <div className="mx-auto grid w-full max-w-6xl grid-cols-12 items-center gap-10 lg:gap-14 px-6 lg:px-10">
                  <div className="col-span-5 flex justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
                      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      viewport={{ once: false, amount: 0.5 }}
                      transition={{ duration: 0.7, ease: EASE }}
                    >
                      <Phone src={src} width={300} alt={s.title} />
                    </motion.div>
                  </div>
                  <div className="col-span-7 max-w-xl">
                    <div className="flex items-baseline gap-4 mb-5">
                      <span className="font-display text-6xl font-bold text-zinc-200 tabular-nums leading-none">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-zinc-400">{s.step}</span>
                    </div>
                    <h3 className="font-display text-3xl sm:text-4xl xl:text-5xl font-bold text-ink-primary tracking-tight leading-[1.05] mb-6">
                      {s.title}
                    </h3>
                    <p className="text-[1.1rem] text-ink-secondary leading-relaxed mb-4">{s.hint}</p>
                    <p className="text-[13px] text-ink-muted leading-relaxed border-l-2 border-zinc-200 pl-4">{s.why}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </motion.div>

        {/* progress rail + hint, fixed within the pinned viewport */}
        <div className="pointer-events-none absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-400">
            Scroll to walk the flow →
          </span>
          <div className="h-0.5 w-44 overflow-hidden rounded-full bg-zinc-200">
            <motion.div className="h-full bg-zinc-800" style={{ width: progressWidth }} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function MerchantOnboardingCaseStudyPage() {
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
          <div className="h-0.5 w-full bg-gradient-to-r from-zinc-800 via-zinc-400/40 to-transparent" />
          <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-20 pb-16 lg:pt-28 lg:pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="flex items-center gap-3 mb-8"
                >
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink-muted">Case Study</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-300" />
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink-muted">{cs.year}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-300" />
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-600">Bangla QR · Fintech</span>
                </motion.div>

                <RevealLines
                  as="h1"
                  trigger="mount"
                  delay={0.12}
                  lines={['Bangla QR', 'Merchant App']}
                  className="font-display font-bold text-ink-primary tracking-tight leading-[1.02] mb-6"
                  style={{ fontSize: 'clamp(2.5rem, 5.4vw, 4.25rem)' }}
                />

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
                <HeroProblem />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ TL;DR — the skimmer's path, three beats ══════════ */}
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
                  Adopted, not commissioned.
                </h2>
                {/* Guard: unverified copy renders as an obvious placeholder rather
                    than shipping as fact. Kept for any future gap in this data. */}
                {cs.problem.startsWith('[NEEDS') ? (
                  <div className="rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/60 p-4">
                    <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-amber-700 mb-1.5">
                      Placeholder, not publishable
                    </div>
                    <p className="text-[14px] text-amber-900/80 leading-relaxed">{cs.problem}</p>
                  </div>
                ) : (
                  <>
                    <p className="text-[1.05rem] text-ink-secondary leading-relaxed mb-5">{cs.problem}</p>
                    <p className="text-[1.05rem] text-ink-primary leading-relaxed font-medium border-l-2 border-zinc-900 pl-4">
                      {cs.solution}
                    </p>
                  </>
                )}
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

            {/* the constraints that shaped every decision */}
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

        {/* ══════════ 03 TWO APPS ══════════ */}
        <section id="cs-apps" style={{ scrollMarginTop: '64px' }} className="border-b border-border-subtle bg-surface-1">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-24">
            <Reveal className="max-w-2xl mb-12">
              <Eyebrow num="03" label="Two apps" />
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-primary tracking-tight leading-[1.1] mb-5">
                Two sides, one system
              </h2>
              <p className="text-[1.05rem] text-ink-secondary leading-relaxed">{cs.productsIntro}</p>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
              {cs.products.map((p, i) => (
                <Reveal key={p.name} delay={i * 0.12}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>

            {/* the handoff between the two apps */}
            <Reveal delay={0.15}>
              <div className="mt-7 flex items-center justify-center gap-3">
                <span className="hidden sm:block h-px w-10 bg-zinc-200" />
                <span className="inline-flex items-center gap-2 text-[12px] font-mono text-ink-muted">
                  <span className="font-semibold text-ink-secondary">CRM</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                  <span className="font-semibold text-ink-secondary">Merchant</span>
                </span>
                <span className="hidden sm:block h-px w-10 bg-zinc-200" />
              </div>
              <p className="mt-3 text-center text-[13px] text-ink-muted">{cs.productsHandoff}</p>
            </Reveal>
          </div>
        </section>

        {/* ══════════ 04 THE FLOW ══════════ */}
        <section id="cs-flow" style={{ scrollMarginTop: '64px' }} className="border-b border-border-subtle bg-surface-base">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-16 lg:pt-20">
            <div className="max-w-2xl">
              <Reveal><Eyebrow num="04" label="The flow" /></Reveal>
              <RevealLines
                as="h2"
                trigger="inview"
                lines={['Take a payment']}
                className="font-display text-3xl sm:text-4xl font-bold text-ink-primary tracking-tight leading-[1.1] mb-5"
              />
              <Reveal delay={0.12}>
                <p className="text-[1.05rem] text-ink-secondary leading-relaxed">{cs.flowIntro}</p>
              </Reveal>
            </div>
          </div>
          {/* Signature moment: the five steps as a pinned horizontal walk (desktop),
              falling back to the interactive FlowRow on touch / reduced motion. */}
          <div className="mt-4 lg:mt-0">
            <HorizontalFlow flow={cs.flow} />
          </div>
        </section>

        {/* ══════════ 05 THE CRM FLOW ══════════ */}
        <section id="cs-crm" style={{ scrollMarginTop: '64px' }} className="border-b border-border-subtle bg-surface-1">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
            <Reveal className="max-w-2xl">
              <Eyebrow num="05" label="Onboard a merchant" />
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-primary tracking-tight leading-[1.1] mb-5">
                Sign up a shop
              </h2>
              <p className="text-[1.05rem] text-ink-secondary leading-relaxed">{cs.crmIntro}</p>
            </Reveal>
            <div className="mt-10">
              <FlowRow flow={cs.crmFlow} />
            </div>
          </div>
        </section>

        {/* ══════════ 06 HOW IT SCALES — the platform, placed after the product ══════════ */}
        <section id="cs-platform" style={{ scrollMarginTop: '64px' }} className="border-b border-border-subtle bg-surface-base">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-24">
            <Reveal className="max-w-2xl mb-12">
              <Eyebrow num="06" label="How it scales" />
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-primary tracking-tight leading-[1.1] mb-5">
                Why a bank could say yes.
              </h2>
              <p className="text-[1.05rem] text-ink-secondary leading-relaxed mb-4">{cs.platformScaleIntro}</p>
              <p className="text-[15px] text-ink-muted leading-relaxed">{cs.platformIntro}</p>
            </Reveal>

            <div className="mb-20">
              <BrandSwitcher />
            </div>

            {/* Token architecture — two tiers, one rule */}
            <div className="pt-14 border-t border-zinc-100">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                <Reveal className="lg:col-span-5">
                  <h3 className="font-display text-2xl font-bold text-ink-primary tracking-tight leading-tight mb-3">
                    How it holds together
                  </h3>
                  <p className="text-[15px] text-ink-secondary leading-relaxed mb-8">{cs.tokenIntro}</p>

                  <div className="flex flex-wrap gap-x-5 gap-y-3">
                    {cs.systemTokens.map(t => (
                      <div key={t.name} className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg border border-zinc-200 shrink-0" style={{ background: t.value }} />
                        <div>
                          <div className="text-[11px] font-semibold text-ink-primary leading-none mb-0.5">{t.name}</div>
                          <div className="text-[9px] font-mono text-ink-muted uppercase">{t.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>

                <div className="lg:col-span-7 space-y-3">
                  {cs.tokenTiers.map((t, i) => (
                    <Reveal key={t.tier} delay={i * 0.1}>
                      <div className="rounded-2xl border border-border-subtle bg-surface-1 p-5">
                        <div className="flex items-center gap-2.5 mb-2">
                          <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-zinc-400">{t.label}</span>
                          <span className="text-[15px] font-bold text-ink-primary">{t.tier}</span>
                        </div>
                        <p className="text-[13px] text-ink-muted leading-relaxed">{t.description}</p>
                      </div>
                    </Reveal>
                  ))}

                  <Reveal delay={0.2}>
                    <div className="rounded-2xl bg-zinc-900 p-5 text-white">
                      <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-zinc-500 mb-2">The one rule</div>
                      <p className="font-display text-lg font-bold leading-snug mb-2">{cs.tokenRule}</p>
                      <p className="text-[13px] text-zinc-400 leading-relaxed">{cs.tokenRuleWhy}</p>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>

            {/* what the system buys */}
            <Reveal className="pt-14 mt-14 border-t border-zinc-100">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {cs.systemPillars.map((p, i) => (
                  <Reveal key={p.title} delay={i * 0.08}>
                    <div className="h-full rounded-xl border border-border-subtle bg-surface-1 p-5">
                      <div className="text-[14px] font-bold text-ink-primary mb-2 leading-snug">{p.title}</div>
                      <p className="text-[12px] text-ink-muted leading-relaxed">{p.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════ 07 DECISIONS ══════════ */}
        <section id="cs-system" style={{ scrollMarginTop: '64px' }} className="border-b border-border-subtle bg-surface-1">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-24">
            <Reveal className="max-w-2xl mb-12">
              <Eyebrow num="07" label="Decisions" />
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
                      <li className="flex items-start gap-3">
                        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-1 text-zinc-400">
                          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
                          <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[15px] text-ink-secondary leading-relaxed">{p}</span>
                      </li>
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
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 mb-5">What we&apos;d carry forward</div>
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

                <Reveal delay={0.2}>
                  <div className="mt-8 pt-6 border-t border-zinc-100 grid grid-cols-2 gap-x-6 gap-y-4">
                    {cs.overviewSpecs.map(s => (
                      <div key={s.label}>
                        <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.14em] mb-1">{s.label}</div>
                        <div className="text-[13px] font-semibold text-ink-primary">{s.value}</div>
                      </div>
                    ))}
                  </div>
                </Reveal>
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
