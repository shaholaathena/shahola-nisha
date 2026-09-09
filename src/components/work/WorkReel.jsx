import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useTransform,
} from 'framer-motion'
import { getLenis } from '../../lib/lenisInstance'
import { projects } from '../../data/portfolio'
import { categoryOf, shortOf } from './groups'
import MerchantCoverQR from '../ui/MerchantCoverQR'

/* ─────────────────────────────────────────────────────────────────────────────
   WorkReel — the work index as a scroll-driven reel of nine covers.

   ── A flat vertical cascade ──

   The covers sit on ONE vertical track. Card i rests `gap` viewport-heights
   below card i-1, and the whole track is translated by the scroll position, so
   each cover rises through a fixed focal region in turn. Y is the movement; the
   small x offset and the couple of degrees of rotation are seasoning.

   This replaced a WebGL scene with an orthographic camera and planes turning on
   a spine. That produced a 3D composition — covers fanned into corners, heavy
   overlap, dramatic foreshortening — which is not what this page is. It is an
   editorial index: the work has to read flat and legibly, in sequence.

   ── Input ──

   The page does not scroll. It is one viewport tall and locked, and the wheel,
   touch and arrow keys drive `target` directly. That is deliberate: as a tall
   scrolling document the header and the night sky had to be `position: fixed`
   to stay put, and an ancestor of this page carries `filter: blur(0px)`, which
   makes it the containing block for fixed descendants — both scrolled away.
   With nothing scrolling, nothing can drift.

   `pos` eases toward `target` every frame, so the track has weight. It is never
   snapped: the position stays fractional.

   ── Type ──

   Dossier, index column and counter are DOM, one layer per project, all mounted
   and crossfaded by the same `pos` that drives the covers. Nothing here is React
   state: state in the motion path is what used to unmount and remount the
   dossier on every crossing and leave the column blank.

   ── Reduced motion ──

   The whole apparatus is dropped: the nine become plain stacked panels, every
   one visible in order. An effect that fails to `opacity: 0` hides the work.
   ───────────────────────────────────────────────────────────────────────────── */

const N = projects.length
const ROW = 56 // right-hand column row height, px

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))

const SMOOTH = 0.12 // how hard `pos` chases `target` each frame

/* Crossfade weight for the text layers.

   Every per-project text block (dossier, counter) is rendered ONCE and stays
   mounted; this is what decides how visible it is. Full while the project owns
   the centre, handing over across a narrow band either side of the boundary so
   the pair always sums to about 1 — never a blank frame, never a hard swap. */
const textWeight = (d) => clamp((0.56 - Math.abs(d)) / 0.12, 0, 1)

/* The layout, in one place.

   The camera angle IS the composition — the diagonal run, the overlap and the
   apparent turn of each cover all come from looking at a straight line of planes
   from off-axis, orthographically. The rest of these are just spacing along that
   line. `?tune=1` puts every one of them on a live slider. */
/* The track. Distances are in viewport units so the cascade keeps its
   proportions at any window size. */
const POSE = {
  /* Measured off the reference. A cover is ~37% of the viewport wide; the step
     to the next one is about 38% of the height and 20% of the width, so the run
     is a DIAGONAL — bottom-left, through the centre, out top-right — not the
     near-vertical column a literal reading of "x = 20px" produced. */
  cw: 34, // cover width, % of viewport width
  cwMin: 270, // px floor, so a phone still shows a real cover
  cwMax: 560, // px ceiling
  /* The vertical step is in vh, the horizontal in vw.

     vh because this distance is about the VIEWPORT, not the cover: at 50 the
     neighbour's centre lands exactly on the top or bottom edge, so it is cut
     precisely in half whatever the window shape. Tying it to the cover instead
     (vw) made the amount left showing drift with the window's proportions. */
  gap: 52, // vh between one cover and the next
  xStep: 23, // vw of horizontal offset per step — the diagonal
  rotBase: 0, // the focal cover sits straight
  rot: -6, // degrees per step for the covers still to come, bottom-left
  rotTop: -6, // and for the ones already read, top-right — tilted harder, so the
  // corner they are stuck in reads as a tossed pile rather than a neat column
  scaleStep: 0.05, // a neighbour is 0.95 — measured
  /* Has to clear the cover in front. That one's half-width is cw/2 = 17vw and a
     squashed one's is about 11.6vw, so anything under ~5.4vw leaves the sliver
     hidden behind it entirely — which is what 2.6 was doing. */
  pile: 8, // vw each cover behind the first one peeks out by, sideways only
  /* Positive now, which slides BOTH piles right — it scales with l squared, so
     it is the only term that moves them the same way; xStep pushes them apart. */
  bow: 2, // sideways bend of the run — negative is concave
  deepScale: 0.03, // each cover further back in a pile is a touch smaller
  squash: 0.32, // and a good deal narrower — this is what makes the slivers
  /* Zero on purpose. Any vertical stagger pushes the covers behind further out
     of frame — the pile is already half-cut by the viewport edge — so the
     slivers were showing 165px, then 117, then 69 and reading as nothing. Level
     with the cover in front, they show the same band of it and read as edges of
     one stack. */
  deepY: 0, // vh of vertical stagger down the pile
  hover: 1.4, // how far the covers drift with the pointer
  fade: 3.6, // steps out before a cover is gone — three or four per corner
}

/* Where a cover sits relative to the focal position. The track is a loop, so
   there is always something arriving from below and something leaving above,
   including on the first frame. */
const around = (u) => ((((u + N / 2) % N) + N) % N) - N / 2

/* A cover's place is two pieces.

   `lead` is the first full step out of focus, and only the nearest cover on each
   side takes all of it — that is what puts one cover in each corner. `deep` is
   how far the ones behind it are, and they are stacked rather than spaced: they
   move a little, along ONE axis only, so all you see of them is a sliver down
   one edge of the cover in front. Offsetting them diagonally showed two edges
   and read as a fan instead of a stack. */
const lead = (u) => Math.sign(u) * Math.min(Math.abs(u), 1)
const deep = (u) => Math.sign(u) * Math.max(0, Math.abs(u) - 1)

function Media({ p }) {
  if (p.image) {
    return <img src={p.image} alt="" className="h-full w-full object-cover" draggable="false" />
  }
  if (p.coverQR) {
    return (
      <div
        className="flex h-full w-full items-center justify-center"
        style={{ background: `radial-gradient(120% 90% at 50% 28%, ${p.color} 0%, #05101f 100%)` }}
      >
        <div className="w-[46%] max-w-[190px]">
          <MerchantCoverQR />
        </div>
      </div>
    )
  }
  return (
    <div
      className="flex h-full w-full items-center justify-center px-6 text-center"
      style={{ background: `radial-gradient(120% 90% at 50% 28%, ${p.color} 0%, #05101f 100%)` }}
    >
      <span className="font-display text-[clamp(1.4rem,3.4vw,2.6rem)] font-semibold leading-none tracking-[-0.03em] text-white/90">
        {shortOf(p.id, p.company)}
      </span>
    </div>
  )
}

/* One cover on the track. Everything is a motion value derived from `pos`, so
   the cascade never re-renders React and the image is never remounted. */
function TrackCard({ p, i, pos, c, mx, my }) {
  const transform = useTransform([pos, mx, my], ([v, px, py]) => {
    const u = around(i - v)
    const l = lead(u)
    const d = deep(u)
    const near = Math.abs(l)
    const sy = 1 - near * c.scaleStep - Math.abs(d) * c.deepScale
    return (
      /* Past covers go up and to the RIGHT, coming ones down and to the LEFT,
         which is why x is negated against u. */
      /* `bow` bends the run sideways by the SQUARE of the distance, so both
         corners pull the same way while the focal cover stays put. Negative is
         concave — the two ends swing out and the middle sits inside the curve. */
      /* The peek always goes RIGHT, for both piles — hence abs(d).

         Signed, it followed the pile's own direction, so the bottom-left stack
         peeked further LEFT and ran straight off the edge it was already sitting
         on: its slivers measured x 33, 6, -25. Peeking into the open middle
         instead means both stacks actually show their edges. */
      `translate(-50%, -50%) translate3d(${(-l * c.xStep + Math.abs(d) * c.pile + c.bow * l * l).toFixed(
        3,
      )}vw, ${(l * c.gap + d * c.deepY).toFixed(3)}vh, 0)` +
      /* Pointer parallax, on the FOCAL cover only. The weight is 1 at focus and
         0 by one project out, so the piles in the corners stay put — they are
         scenery, and having them drift too made the whole frame feel loose. */
      ` translate3d(${(px * c.hover * Math.max(0, 1 - near)).toFixed(3)}vw, ${(
        py * c.hover * Math.max(0, 1 - near)
      ).toFixed(3)}vh, 0)` +
      /* Two scales, not one.

         A cover deeper in a pile is SQUASHED HORIZONTALLY, not just shifted. In
         the reference those are thin vertical slivers — the page-edges of a
         stack — and that narrowness is what makes it read as a stack at all. It
         comes from the cover turning edge-on in 3D; here scaleX does the same
         job with no perspective. Offsetting them at full width, which is what
         this did before, just laid out more whole cards side by side. */
      ` rotate(${(c.rotBase + l * (l < 0 ? c.rotTop : c.rot)).toFixed(2)}deg)` +
      ` scale(${(sy * Math.max(0.04, 1 - Math.abs(d) * c.squash)).toFixed(3)}, ${sy.toFixed(3)})`
    )
  })
  /* Paint order. Without this the covers stacked purely by DOM order, so the
     last project in the array sat on top of everything no matter where it was —
     which is why the piles looked shuffled rather than stacked. Nearest to focus
     paints last, and it is rounded so it only changes when the order really
     does. */
  const zIndex = useTransform(pos, (v) => 100 - Math.abs(Math.round(around(i - v))))

  const opacity = useTransform(pos, (v) => {
    const a = Math.abs(around(i - v))
    return a <= c.fade - 1 ? 1 : clamp(c.fade - a, 0, 1)
  })

  return (
    <motion.div
      aria-hidden
      className="absolute left-1/2 top-1/2 aspect-[5/4] overflow-hidden bg-hero-void shadow-[0_18px_40px_-18px_rgba(0,0,0,0.95)] ring-1 ring-white/[0.14]"
      /* Clamped, not a bare vw.

         34vw is a good proportion on a desktop and 128px on a phone, which is
         what made the reel look empty on a narrow window — nine covers were
         there, all of them thumbnail-sized. The floor keeps a cover readable at
         any width; the ceiling stops it swallowing a very wide monitor. */
      style={{
        width: `clamp(${c.cwMin}px, ${c.cw}vw, ${c.cwMax}px)`,
        transform,
        opacity,
        zIndex,
        willChange: 'transform, opacity',
      }}
    >
      <Media p={p} />
    </motion.div>
  )
}

/* One name in the right-hand column. Names only — the description belonged to
   the reference's wider column and here it just crowded the flight; the dossier
   on the left already carries the detail for whichever project is centred. */
function ListRow({ p, i, pos, onJump }) {
  const opacity = useTransform(pos, (v) => clamp(1 - Math.abs(v - i) * 0.3, 0.12, 1))
  /* Interpolated, not switched. This was a ternary flipping at |d| < 0.5, which
     made the gold snap on at the halfway point while everything else was still
     gliding — the one hard edge in the whole column. */
  const nameColor = useTransform(pos, [i - 0.85, i, i + 0.85], ['#e7ebf7', '#e8b862', '#e7ebf7'])

  return (
    <motion.li style={{ height: ROW, opacity }} className="flex items-center justify-center">
      <button type="button" onClick={() => onJump(i)} className="pointer-events-auto block w-full">
        <motion.span
          style={{ color: nameColor }}
          className="block font-display text-[clamp(1.05rem,1.6vw,1.5rem)] font-medium uppercase leading-none tracking-[0.02em]"
        >
          {shortOf(p.id, p.company)}
        </motion.span>
      </button>
    </motion.li>
  )
}

/* The dossier for ONE project, always mounted, its visibility driven by how
   close that project is to the centre. Nine of these are stacked; at any moment
   one is solid and at most one other is fading past it. */
function DossierLayer({ p, i, pos }) {
  const opacity = useTransform(pos, (v) => textWeight(v - i))
  const pointerEvents = useTransform(pos, (v) => (Math.abs(v - i) < 0.4 ? 'auto' : 'none'))
  const visibility = useTransform(pos, (v) => (Math.abs(v - i) > 0.7 ? 'hidden' : 'visible'))

  return (
    <motion.div
      className="absolute left-6 top-1/2 hidden w-[200px] -translate-y-1/2 lg:left-10 lg:block xl:w-[230px]"
      style={{ opacity, pointerEvents, visibility }}
    >
      <Dossier p={p} />
    </motion.div>
  )
}

/* On a narrow screen the dossier and the index column are both hidden, which
   left a phone showing covers with nothing to say what any of them were. This is
   the minimum that fixes that: category and name, under the focal cover, on the
   same crossfade as everything else. */
function MobileLabel({ p, i, pos }) {
  const opacity = useTransform(pos, (v) => textWeight(v - i))
  const visibility = useTransform(pos, (v) => (Math.abs(v - i) > 0.7 ? 'hidden' : 'visible'))

  return (
    <motion.div
      className="absolute inset-x-0 top-[64%] px-6 text-center lg:hidden"
      style={{ opacity, visibility }}
    >
      <p className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-hero-hot">
        {categoryOf(p.id)}
      </p>
      <h3 className="mt-2 font-display text-[clamp(1.3rem,6vw,1.9rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-hero-ink">
        {shortOf(p.id, p.company)}
      </h3>
    </motion.div>
  )
}

/* Live tuning, behind `?tune=1`. Never rendered otherwise, and the production
   path is byte-for-byte what it was without it. */
const TUNE_FIELDS = [
  ['Track', [
    ['gap', 'spacing (vh)', 20, 90, 1],
    ['cw', 'cover width (%)', 14, 55, 1],
    ['cwMin', 'width floor (px)', 160, 420, 10],
    ['cwMax', 'width cap (px)', 320, 900, 20],
    ['pile', 'stack peek (vw)', 0, 12, 0.2],
    ['bow', 'bow (− concave)', -20, 20, 0.5],
    ['fade', 'visible span', 1.2, 4.4, 0.1],
  ]],
  ['Seasoning', [
    ['xStep', 'x offset (vw)', 0, 40, 0.5],
    ['rot', 'rotation ↙ (deg)', -12, 12, 0.2],
    ['rotTop', 'rotation ↗ (deg)', -16, 16, 0.2],
    ['rotBase', 'focal tilt (deg)', -6, 6, 0.5],
    ['scaleStep', 'scale falloff', 0, 0.3, 0.01],
    ['deepScale', 'stack falloff', 0, 0.12, 0.005],
    ['squash', 'sliver squash', 0, 0.6, 0.02],
    ['deepY', 'stack drop (vh)', -10, 10, 0.5],
    ['hover', 'pointer drift', 0, 6, 0.1],
  ]],
]

function TunePanel({ cfg, setCfg }) {
  return (
    <div className="pointer-events-auto fixed bottom-3 right-3 z-[1000] max-h-[92vh] w-[268px] overflow-auto rounded-md border border-white/15 bg-black/85 p-3 font-mono text-[10px] text-white backdrop-blur">
      {TUNE_FIELDS.map(([group, fields]) => (
        <div key={group} className="mb-3">
          <p className="mb-1.5 uppercase tracking-[0.18em] text-hero-hot">{group}</p>
          {fields.map(([key, label, min, max, step]) => (
            <label key={key} className="mb-1 flex items-center gap-2">
              <span className="w-[74px] shrink-0 text-white/60">{label}</span>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={cfg[key]}
                onChange={(e) => setCfg((c) => ({ ...c, [key]: parseFloat(e.target.value) }))}
                className="h-1 flex-1 accent-[#e8b862]"
              />
              <span className="w-[36px] shrink-0 text-right tabular-nums">{cfg[key]}</span>
            </label>
          ))}
        </div>
      ))}
      <button
        type="button"
        onClick={() => navigator.clipboard?.writeText(JSON.stringify(cfg, null, 2))}
        className="w-full rounded border border-white/25 py-1.5 uppercase tracking-[0.16em] hover:bg-white/10"
      >
        Copy values
      </button>
      <p className="mt-2 leading-relaxed text-white/45">
        Tune by eye, hit copy, paste the JSON back to Claude.
      </p>
    </div>
  )
}

export default function WorkReel() {
  const reduce = useReducedMotion()
  const stageRef = useRef(null)
  const tuning = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('tune')
  const [cfg, setCfg] = useState(POSE)

  /* The page does not scroll. The reel does.

     This used to be a `N * 100vh` section with a sticky stage, letting the
     browser's own scroll drive everything. That is the safer pattern, but it
     has one consequence that broke the brief: the document really is nine
     viewports tall, so the header and the night sky have to be `position:
     fixed` to stay put — and an ancestor of this page carries `filter:
     blur(0px)`, which makes it the containing block for fixed descendants. Both
     scrolled away.

     So the stage is one viewport, nothing scrolls, and the wheel is read
     directly into `target`. Nothing on the page moves except the covers, which
     is what was asked for. */
  /* Two values: `target` is where the input has asked to be, `pos` is where the
     reel actually is, easing toward it.

     This was a `useSpring(target, …)`. It silently stopped tracking `target` —
     the wheel handler kept firing and setting a value nothing was listening to,
     and the reel sat frozen mid-project. Rather than keep guessing at that API,
     the easing is four lines below and there is nothing left to misbehave. */
  const target = useMotionValue(0)
  const pos = useMotionValue(0)
  /* Pointer position over the stage, -1..1 on each axis. Motion values, so the
     parallax costs no renders. */
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  useEffect(() => {
    let raf = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const to = target.get()
      const at = pos.get()
      const d = to - at
      pos.set(Math.abs(d) < 0.0005 ? to : at + d * SMOOTH)
    }
    raf = requestAnimationFrame(tick)
    if (import.meta.env.DEV) window.__reel = { target, pos }
    return () => cancelAnimationFrame(raf)
  }, [target, pos])

  useEffect(() => {
    if (reduce) return undefined
    const el = stageRef.current
    if (!el) return undefined

    /* Lenis owns the wheel for the rest of the site. While this page is up it
       has nothing to scroll and would only fight for the same events. */
    const lenis = getLenis()
    lenis?.stop()

    /* Settle on a project once the input stops.

       With the page locked the reel rests wherever the wheel left it, and
       halfway between two projects is a valid state for the covers but not for
       the text: the dossier crossfade sits at 50/50 and two blocks of copy stand
       on top of each other. Snapping after a beat of stillness keeps every
       resting frame clean. It is not a jump — the spring carries it there, the
       same way it carries everything else. */
    /* The input steps by whole projects; the MOTION between them stays
       continuous.

       Feeding raw wheel delta straight into `target` left it resting on values
       like 1.98, so the focal cover sat permanently 12px off centre while the
       dossier and the index column — which centre themselves — were exactly on
       it. Snapping the position afterwards was the other way to fix that, and it
       is the one that produces a visible jerk. Quantising the INPUT has neither
       problem: `pos` still eases across fractional values, so two covers are
       genuinely mid-transition, but it always comes to rest on a project. */
    let acc = 0
    const STEP = 260 // wheel delta that counts as one project

    const nudge = (dy) => {
      acc += dy
      while (Math.abs(acc) >= STEP) {
        const dir = Math.sign(acc)
        acc -= dir * STEP
        target.set(clamp(Math.round(target.get()) + dir, 0, N - 1))
      }
    }

    const onWheel = (e) => {
      e.preventDefault()
      nudge(e.deltaY)
    }

    let lastTouch = null
    const onTouchStart = (e) => {
      lastTouch = e.touches[0].clientY
    }
    const onTouchMove = (e) => {
      if (lastTouch === null) return
      const y = e.touches[0].clientY
      e.preventDefault()
      nudge((lastTouch - y) * 2.2)
      lastTouch = y
    }

    const onKey = (e) => {
      const step = { ArrowDown: 1, PageDown: 1, ArrowRight: 1, ArrowUp: -1, PageUp: -1, ArrowLeft: -1 }[e.key]
      if (step) {
        e.preventDefault()
        target.set(clamp(Math.round(target.get()) + step, 0, N - 1))
      } else if (e.key === 'Home') {
        target.set(0)
      } else if (e.key === 'End') {
        target.set(N - 1)
      }
    }

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      mx.set(clamp(((e.clientX - r.left) / r.width - 0.5) * 2, -1, 1))
      my.set(clamp(((e.clientY - r.top) / r.height - 0.5) * 2, -1, 1))
    }
    const onLeave = () => {
      mx.set(0)
      my.set(0)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('keydown', onKey)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('keydown', onKey)
      lenis?.start()
    }
  }, [reduce, target, mx, my])

  const listY = useTransform(pos, (v) => -(ROW / 2) - v * ROW)
  const railScale = useTransform(pos, (v) => clamp(v / (N - 1), 0, 1))

  const jumpTo = (i) => target.set(clamp(i, 0, N - 1))

  if (reduce) {
    return (
      <section id="all-work" className="relative border-t border-white/10">
        {projects.map((p) => (
          <div key={p.id} className="relative flex h-screen items-center overflow-hidden">
            <div className="absolute right-0 top-0 h-full w-[52%] overflow-hidden">
              <Media p={p} />
            </div>
            <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 lg:px-10">
              <Dossier p={p} />
            </div>
          </div>
        ))}
      </section>
    )
  }

  return (
    <section id="all-work" className="relative h-screen w-full overflow-hidden">
      <div
        ref={stageRef}
        className="absolute inset-0 h-full w-full touch-none overflow-hidden"
        style={{ perspective: '1800px', perspectiveOrigin: '46% 46%' }}
      >
        {/* Two soft pools, one under each stack. Without them the covers sit
            directly on the star field and read as pasted on rather than as
            objects resting in the same space. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(46% 42% at 12% 96%, rgba(3,9,20,0.85) 0%, transparent 70%),' +
              'radial-gradient(44% 40% at 84% 4%, rgba(3,9,20,0.78) 0%, transparent 70%)',
          }}
        />

        {/* ── The covers, as planes in a real 3D scene ── */}
        <div className="absolute inset-0 z-[10]">
          {projects.map((proj, i) => (
            <TrackCard key={proj.id} p={proj} i={i} pos={pos} c={cfg} mx={mx} my={my} />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 z-[400]">
          {projects.map((proj, i) => (
            <MobileLabel key={proj.id} p={proj} i={i} pos={pos} />
          ))}
        </div>

        {/* ── LEFT: the active project's dossier ──

            All nine are mounted and stacked. Previously this was one slot fed by
            React state inside `AnimatePresence mode="wait"`, so the block
            unmounted and remounted on every crossing: exit had to finish before
            enter began and the column went blank, then popped. Now the same
            scroll value that flies the cards fades these across each other. */}
        <div className="pointer-events-none absolute inset-0 z-[400]">
          {projects.map((proj, i) => (
            <DossierLayer key={proj.id} p={proj} i={i} pos={pos} />
          ))}
        </div>

        {/* ── RIGHT: the full index, scrolling to keep the active one centred ── */}
        <div className="pointer-events-none absolute right-6 top-1/2 z-[400] hidden w-[240px] -translate-y-1/2 md:block lg:right-10 xl:w-[290px]">
          <div
            className="relative h-[78vh] overflow-hidden"
            style={{
              maskImage: 'linear-gradient(180deg, transparent 0%, #000 22%, #000 78%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 22%, #000 78%, transparent 100%)',
            }}
          >
            <motion.ul className="absolute inset-x-0 top-1/2" style={{ y: listY }}>
              {projects.map((proj, i) => (
                <ListRow key={proj.id} p={proj} i={i} pos={pos} onJump={jumpTo} />
              ))}
            </motion.ul>
          </div>
        </div>

        {/* ── BOTTOM LEFT: the numeral, laid over the deck ── */}
        <p className="pointer-events-none absolute bottom-8 right-6 z-[400] font-mono text-[9.5px] uppercase tracking-[0.26em] text-hero-mute lg:right-10">
          Scroll
        </p>

        {tuning && <TunePanel cfg={cfg} setCfg={setCfg} />}

        <div className="absolute inset-x-0 bottom-0 z-[400] h-[3px] bg-white/10">
          <motion.div className="h-full origin-left bg-hero-hot" style={{ scaleX: railScale }} />
        </div>
      </div>
    </section>
  )
}

/* Role / Launch / Recognition in the reference. Here: the fields this data
   actually has, in that same three-block shape. */
function Dossier({ p }) {
  return (
    <>
      <p className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-hero-hot">
        {categoryOf(p.id)}
      </p>
      <h3 className="mt-2.5 font-display text-[clamp(1.35rem,1.9vw,1.9rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-hero-ink">
        {shortOf(p.id, p.company)}
      </h3>

      <dl className="mt-6 space-y-3.5">
        <div>
          <dt className="font-mono text-[9px] uppercase tracking-[0.22em] text-hero-mute">Client</dt>
          <dd className="mt-1 text-[12.5px] leading-snug text-[#c9cfe9]">{p.company}</dd>
        </div>
        {(p.year || p.impact) && (
          <div>
            <dt className="font-mono text-[9px] uppercase tracking-[0.22em] text-hero-mute">Launch</dt>
            <dd className="mt-1 text-[12.5px] text-[#c9cfe9]">{p.year || p.impact}</dd>
          </div>
        )}
        {p.tags?.length > 0 && (
          <div>
            <dt className="font-mono text-[9px] uppercase tracking-[0.22em] text-hero-mute">Scope</dt>
            <dd className="mt-1 flex flex-col gap-0.5 text-[12.5px] leading-snug text-[#c9cfe9]">
              {p.tags.slice(0, 4).map((t) => (
                <span key={t}>{t}</span>
              ))}
            </dd>
          </div>
        )}
      </dl>

      {p.link && (
        <Link to={p.link} className="group mt-6 inline-flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hero-hot/60 text-hero-hot transition-colors duration-200 group-hover:border-hero-hot group-hover:bg-hero-hot/15">
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </span>
          <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-hero-ink">
            View case study
          </span>
        </Link>
      )}
    </>
  )
}
