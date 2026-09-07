import { motion, useReducedMotion } from 'framer-motion'
import { projects } from '../../data/portfolio'
import { FEATURED, shortOf, categoryOf } from './groups'
import mountains from '../../assets/hero/mtn-back.svg'

/* ─────────────────────────────────────────────────────────────────────────────
   WorkHero — the statement, and the three case studies as a star trail.

   From her reference: a display line on the left, and on the right a curving
   path of stars with the featured projects numbered along it. The constellation
   idea survives from the previous pass, but it belongs HERE rather than in a
   section of its own — as a hero device it is a preview of the three sections
   below it, which is a job it can do without having to be the way anyone finds
   anything. A standalone constellation had to carry navigation it was bad at.

   So it carries three, not nine. The other six are cards further down, where a
   card is the right shape for them.

   ══ The path ═══════════════════════════════════════════════════════════════

   Hand-drawn cubics, with the three stars sitting ON the curve at the points it
   passes through. The trail is a dotted stroke — `1 14` dashes with round caps
   — rather than a solid line, because a solid line reads as a diagram and the
   dots read as sky.

   ══ The labels ═════════════════════════════════════════════════════════════

   Product name over category, from `SHORT` and `CATEGORY` in ./groups. The
   first version labelled the stars with `company` and two of the three read
   "SSL Wireless", because merchant-onboarding and zcommerz share a client — the
   label failed at the only job a map pin has, which is telling three things
   apart.

   ══ Copy ═══════════════════════════════════════════════════════════════════

   Her reference's headline is "A journey from ideas to real impact." That is
   not used here: her Experience section on /about already opens with "From
   ideas to real impact", and the two pages would be saying the same sentence.
   The existing Work headline stays, which is factual and does not collide.

   ══ Spacing ════════════════════════════════════════════════════════════════

   `pt-32 lg:pt-40` clears the fixed nav (~83px) with room to spare, because
   this is the first screen and the statement should not start hard against the
   bar. The page used to hold that padding on `<main>`; it lives here now, since
   this section is what has to clear the header.

   ══ Not carried over ═══════════════════════════════════════════════════════

   The reference annotates each project with a handwritten script line and a
   curved arrow. Skipped deliberately: the site has three families — Bricolage,
   Inter, JetBrains Mono — and none of them is a script. Adding a fourth face
   for four decorative phrases would be the loudest typographic decision on the
   site, made for the least important text on it.
   ───────────────────────────────────────────────────────────────────────────── */

const VIEW = { w: 620, h: 430 }

/* Where the trail goes, and where the three stars sit on it. The path is drawn
   to pass through each `at`, so moving a star means redrawing the curve. */
const TRAIL =
  'M 34 44 C 148 16, 246 30, 300 58 C 372 100, 412 160, 392 218 ' +
  'C 373 278, 308 328, 254 352 C 198 377, 138 390, 92 396'

const STOPS = [
  { at: [300, 58] },
  { at: [392, 218] },
  { at: [254, 352] },
]

export default function WorkHero() {
  const reduce = useReducedMotion()

  const lead = FEATURED.map((id) => projects.find((p) => p.id === id)).filter(Boolean)
  const stops = STOPS.slice(0, lead.length).map((s, i) => ({ ...s, project: lead[i] }))

  const rise = (d = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] },
        }

  return (
    <section className="relative overflow-hidden">
      {/* The range at the base of the hero, as in her reference. The page's
          atmosphere carries its own mountains far below, at the foot of the
          scroll; this is a second, local one closing the first screen. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[240px] sm:block"
        style={{
          maskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 22%, #000 55%)',
          WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 22%, #000 55%)',
        }}
      >
        <img
          src={mountains}
          alt=""
          className="h-full w-full object-cover"
          draggable="false"
          style={{ objectPosition: '50% 30%', filter: 'brightness(0.55) saturate(0.3)' }}
        />
      </div>

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-y-14 px-6 pb-24 pt-32 lg:grid-cols-[1fr_minmax(0,44%)] lg:gap-x-16 lg:px-10 lg:pb-32 lg:pt-40">

        {/* ── Statement ── */}
        <div>
          <motion.p
            {...rise()}
            className="mb-7 font-mono text-[10px] uppercase tracking-[0.24em] text-hero-mute sm:text-[11px]"
          >
            ( Selected work )
          </motion.p>

          <motion.h1
            {...rise(0.05)}
            className="font-display text-[clamp(2rem,4.4vw,3.6rem)] font-medium leading-[1.06] tracking-[-0.03em] text-hero-ink"
          >
            Banking, payments, and{' '}
            <span className="text-hero-hot">platform products</span>.
          </motion.h1>

          <motion.p
            {...rise(0.12)}
            className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-[#b9c0dd] sm:text-[16px]"
          >
            A collection of products I have designed across fintech, healthcare,
            banking, merchant services and enterprise platforms.
          </motion.p>

          <motion.div {...rise(0.18)} className="mt-11 flex items-center gap-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-hero-hot/50 text-hero-hot">
              <span aria-hidden>↓</span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-hero-mute">
              Scroll to explore
            </span>
          </motion.div>
        </div>

        {/* ── The trail ── */}
        <motion.div {...rise(0.24)} className="hidden lg:block">
          <svg
            viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
            className="block h-auto w-full overflow-visible"
            role="img"
            aria-label={`Three featured case studies: ${lead.map((p) => p.title).join(', ')}`}
          >
            <defs>
              <filter id="wh-glow" x="-400%" y="-400%" width="900%" height="900%">
                <feGaussianBlur stdDeviation="5" />
              </filter>
            </defs>

            <path
              d={TRAIL}
              fill="none"
              stroke="rgba(232,184,98,0.42)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray="1 14"
            />

            {stops.map((s, i) => (
              <g key={s.project.id}>
                <circle cx={s.at[0]} cy={s.at[1]} r="11" fill="#e8b862" opacity="0.35" filter="url(#wh-glow)" />
                <circle cx={s.at[0]} cy={s.at[1]} r="4" fill="#e8b862" />
                <text
                  x={s.at[0] + 22}
                  y={s.at[1] - 4}
                  className="font-mono"
                  style={{ fontSize: 12, letterSpacing: '0.18em', fill: '#8f96b8' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </text>
                <text
                  x={s.at[0] + 22}
                  y={s.at[1] + 15}
                  className="font-mono"
                  style={{ fontSize: 13, letterSpacing: '0.06em', fill: '#e9ecfa' }}
                >
                  {shortOf(s.project.id, s.project.company)}
                </text>
                <text
                  x={s.at[0] + 22}
                  y={s.at[1] + 31}
                  className="font-mono"
                  style={{ fontSize: 9.5, letterSpacing: '0.18em', fill: '#8f96b8', textTransform: 'uppercase' }}
                >
                  {categoryOf(s.project.id)}
                </text>
              </g>
            ))}
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
