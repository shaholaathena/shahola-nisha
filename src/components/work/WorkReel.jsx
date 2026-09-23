import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useMotionValueEvent,
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
   and crossfaded by the same `pos` that drives the covers. None of that is
   React state: state in the motion path is what used to unmount and remount the
   dossier on every crossing and leave the column blank. The one piece of state
   is which cover is in focus, for clicks — an index that changes only when a
   crossing completes, and never mounts or unmounts anything.

   ── Reduced motion ──

   The whole apparatus is dropped: the nine become plain stacked panels, every
   one visible in order. An effect that fails to `opacity: 0` hides the work.
   ───────────────────────────────────────────────────────────────────────────── */

const N = projects.length
const ROW = 56 // right-hand column row height, px

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))

/* How hard `pos` chases `target`, per SECOND rather than per frame.

   This was `pos += d * 0.12` on every frame, which is a different speed on
   every screen: twice as fast on a 120Hz display as on a 60Hz one, and a
   visible lurch whenever a frame was dropped. `1 - exp(-rate * dt)` closes the
   same share of the gap per unit of time however often the frame lands. 9/s is
   the old 0.12 at 60fps. The finger gets a much stiffer rate so a drag feels
   held rather than towed. */
const DAMP = 9
const DAMP_TOUCH = 22
const DAMP_PARALLAX = 5 // the pointer drift, slower still — it is ambience

const WHEEL_PX = 300 // wheel delta that travels one project — continuous now
const SETTLE_MS = 140 // stillness before the reel comes to rest on a project
/* Past either end the input is resisted rather than stopped, so the first and
   last cover give a little and spring back instead of hitting a wall. */
const OVERSCROLL = 0.22
const RESIST = 0.3

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
     near-vertical column a literal reading of "x = 20px" produced.

     Then taken down ~18% (34 → 28, cap 560 → 460): at the reference size the
     focal cover filled the middle of the frame and crowded the dossier and the
     index either side of it. The steps are unchanged, so the neighbours still
     land in the corners; they just sit a little further from the focal one. */
  cw: 28, // cover width, % of viewport width
  cwMin: 240, // px floor, so a phone still shows a real cover
  cwMax: 460, // px ceiling
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
  /* Has to clear the cover in front. That one's half-width is cw/2 = 14vw and a
     squashed one's is about 9.5vw, so anything under ~4.5vw leaves the sliver
     hidden behind it entirely — which is what 2.6 was doing. Scaled with cw. */
  pile: 6.6, // vw each cover behind the first one peeks out by, sideways only
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
    return <img src={p.image} alt="" decoding="async" className="h-full w-full object-cover" draggable="false" />
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
function TrackCard({ p, i, pos, c, mx, my, focal, onPick, navigate }) {
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
  // A cover faded out in a corner must not catch clicks meant for what is on top.
  const pointerEvents = useTransform(opacity, (o) => (o > 0.3 ? 'auto' : 'none'))

  /* Clickable, two ways. The cover in focus opens its case study; one in a
     corner pile is brought to the centre first. The focal cover of a project
     with no case study does nothing, so it carries no pointer and no swell of
     the custom cursor — a target that looks live and is not is worse than none.

     Still `aria-hidden` and out of the tab order: this is a shortcut for the
     pointer. The dossier's "View case study" link and the index buttons are the
     same two actions, and they are the ones a keyboard and a screen reader use. */
  const opens = focal && p.link
  const clickable = !focal || opens

  return (
    <motion.div
      aria-hidden
      data-cursor={clickable ? '' : undefined}
      onClick={() => {
        if (opens) navigate(p.link)
        else if (!focal) onPick(i)
      }}
      className={`group absolute left-1/2 top-1/2 aspect-[5/4] overflow-hidden bg-hero-void shadow-[0_18px_40px_-18px_rgba(0,0,0,0.95)] ring-1 ring-white/[0.14] ${
        clickable ? 'cursor-pointer' : ''
      }`}
      /* Clamped, not a bare vw.

         28vw is a good proportion on a desktop and 105px on a phone, which is
         what made the reel look empty on a narrow window — nine covers were
         there, all of them thumbnail-sized. The floor keeps a cover readable at
         any width; the ceiling stops it swallowing a very wide monitor. */
      style={{
        width: `clamp(${c.cwMin}px, ${c.cw}vw, ${c.cwMax}px)`,
        transform,
        opacity,
        zIndex,
        pointerEvents,
        willChange: 'transform, opacity',
      }}
    >
      {/* The hover lives on an inner layer. The outer transform is written by
          the reel every frame, so a CSS scale on it would be overwritten. */}
      <div
        className={`h-full w-full transition-transform duration-500 ease-out-quint ${
          opens ? 'group-hover:scale-[1.035] group-active:scale-[1.01]' : ''
        }`}
      >
        <Media p={p} />
      </div>

      {/* Just the words, centred along the foot of the cover. No button shape:
          the cover itself is the target, so the label only has to name what the
          click does. A gradient up from the bottom edge, rather than a veil over
          the whole cover, keeps the artwork unchanged above it while still
          giving the type a dark ground on a white dashboard shot. */}
      {opens && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-1.5 justify-center bg-gradient-to-t from-hero-void/95 via-hero-void/60 to-transparent pb-4 pt-12 opacity-0 transition-[opacity,transform] duration-200 ease-out-quint group-hover:translate-y-0 group-hover:opacity-100">
          <span className="font-mono text-[10px] uppercase leading-none tracking-[0.28em] text-hero-hot">
            View case study
          </span>
        </div>
      )}
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
    <motion.li style={{ height: ROW, opacity }} className="flex items-center justify-end">
      <button
        type="button"
        onClick={() => onJump(i)}
        className="pointer-events-auto flex w-full items-baseline justify-end gap-3 text-right"
      >
        <span className="font-mono text-[9.5px] tabular-nums tracking-[0.18em] text-hero-mute">
          {String(i + 1).padStart(2, '0')}
        </span>
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
      className="absolute left-6 top-1/2 hidden w-[200px] -translate-y-1/2 lg:left-[max(2.5rem,calc((100%_-_1440px)/2_+_2.5rem))] lg:block xl:w-[230px]"
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
  /* Where the pointer actually is. `mx`/`my` ease toward these, so leaving the
     stage drifts the focal cover home instead of snapping it there. */
  const pointer = useRef({ x: 0, y: 0 })
  const damp = useRef(DAMP)
  const wake = useRef(() => {})

  /* One loop, and only while something is moving. It used to run every frame
     for the life of the page, setting values that had long since arrived. */
  useEffect(() => {
    let raf = 0
    let last = 0
    const ease = (mv, to, rate, dt, eps) => {
      const at = mv.get()
      const d = to - at
      if (Math.abs(d) < eps) {
        if (at !== to) mv.set(to)
        return false
      }
      mv.set(at + d * (1 - Math.exp(-rate * dt)))
      return true
    }
    const tick = (now) => {
      // Capped, so a backgrounded tab coming back does not land in one step.
      // The frame's timestamp can predate the `performance.now()` read at wake.
      const dt = clamp((now - last) / 1000, 0, 1 / 20)
      last = now
      // `|`, not `||`: all three have to advance, not just the first that moves.
      const moving =
        ease(pos, target.get(), damp.current, dt, 0.0004) |
        ease(mx, pointer.current.x, DAMP_PARALLAX, dt, 0.001) |
        ease(my, pointer.current.y, DAMP_PARALLAX, dt, 0.001)
      raf = moving ? requestAnimationFrame(tick) : 0
    }
    wake.current = () => {
      if (raf) return
      last = performance.now()
      raf = requestAnimationFrame(tick)
    }
    const unsub = target.on('change', () => wake.current())
    if (import.meta.env.DEV) window.__reel = { target, pos }
    return () => {
      unsub()
      cancelAnimationFrame(raf)
    }
  }, [target, pos, mx, my])

  /* The covers are remote PNGs up to 1700px wide. Left to the browser, each one
     decodes the first time it rises into view — mid-flight, on the main
     thread, which is exactly when a dropped frame shows. Decoding all nine up
     front moves that cost to the moment the page loads. */
  useEffect(() => {
    projects.forEach((p) => {
      if (!p.image) return
      const img = new Image()
      img.src = p.image
      img.decode?.().catch(() => {})
    })
  }, [])

  useEffect(() => {
    if (reduce) return undefined
    const el = stageRef.current
    if (!el) return undefined

    /* Lenis owns the wheel for the rest of the site. While this page is up it
       has nothing to scroll and would only fight for the same events. */
    const lenis = getLenis()
    lenis?.stop()

    /* ── Follow, then settle ──

       The input used to be quantised: wheel delta piled up in a bucket and
       nothing moved until 260px of it had arrived, then the reel lurched a
       whole project. On a trackpad that is the first third of a second of every
       gesture spent motionless, followed by a jump — the opposite of smooth.

       Now `target` follows the input continuously, so the covers move the
       instant the fingers do. The old reason for quantising still holds, though
       — a reel resting at 1.98 leaves the focal cover off centre and two
       dossiers half-faded over each other — so once the input has been still
       for SETTLE_MS, `target` is moved to a whole project and `pos` eases the
       last stretch. That is `target` moving, not `pos`, so there is no jump:
       it is the same glide as everything else, just aimed at a round number.

       Where it settles leans toward the direction of travel. From the project
       the gesture started on, any real movement means the next one — so a
       single mouse-wheel notch (100px, a third of a project) advances one
       instead of drifting and springing back, and a nudge that barely registers
       returns home. */
    let anchor = null
    let settleTimer = 0

    const settle = (fling = 0) => {
      clearTimeout(settleTimer)
      damp.current = DAMP
      const from = anchor ?? Math.round(target.get())
      const d = target.get() + fling - from
      /* +0.2 in the direction of travel: four quick notches (1.33 projects)
         rounded down to one, which read as the wheel being ignored. */
      const to = Math.abs(d) > 0.12 ? from + Math.sign(d) * Math.max(1, Math.round(Math.abs(d) + 0.2)) : from
      target.set(clamp(to, 0, N - 1))
      anchor = null
    }

    const move = (delta) => {
      if (anchor === null) anchor = Math.round(target.get())
      const t = target.get()
      // Rubber band: past either end, the same input goes a third as far.
      const k = (t < 0 && delta < 0) || (t > N - 1 && delta > 0) ? RESIST : 1
      target.set(clamp(t + delta * k, -OVERSCROLL, N - 1 + OVERSCROLL))
    }

    const onWheel = (e) => {
      e.preventDefault()
      // Firefox reports lines and pages for mouse wheels, not pixels.
      const px = e.deltaY * (e.deltaMode === 1 ? 33 : e.deltaMode === 2 ? window.innerHeight : 1)
      move(px / WHEEL_PX)
      clearTimeout(settleTimer)
      settleTimer = setTimeout(settle, SETTLE_MS)
    }

    /* Touch drags the reel directly and keeps its velocity, so a flick carries
       on past the finger instead of stopping dead where it lifted. */
    let touch = null
    const onTouchStart = (e) => {
      clearTimeout(settleTimer)
      damp.current = DAMP_TOUCH
      touch = { y: e.touches[0].clientY, t: performance.now(), v: 0 }
    }
    const onTouchMove = (e) => {
      if (!touch) return
      e.preventDefault()
      const y = e.touches[0].clientY
      const now = performance.now()
      const per = window.innerHeight * 0.55 // a drag this long is one project
      const delta = (touch.y - y) / per
      const dt = Math.max(now - touch.t, 1)
      touch.v = touch.v * 0.6 + (delta / dt) * 0.4 // projects per ms, smoothed
      touch.y = y
      touch.t = now
      move(delta)
    }
    const onTouchEnd = () => {
      if (!touch) return
      // A stale velocity from a drag that stopped before lifting is not a flick.
      const v = performance.now() - touch.t > 80 ? 0 : touch.v
      touch = null
      settle(clamp(v * 220, -2.5, 2.5))
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
      pointer.current.x = clamp(((e.clientX - r.left) / r.width - 0.5) * 2, -1, 1)
      pointer.current.y = clamp(((e.clientY - r.top) / r.height - 0.5) * 2, -1, 1)
      wake.current()
    }
    const onLeave = () => {
      pointer.current.x = 0
      pointer.current.y = 0
      wake.current()
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd)
    el.addEventListener('touchcancel', onTouchEnd)
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(settleTimer)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('touchcancel', onTouchEnd)
      window.removeEventListener('keydown', onKey)
      lenis?.start()
    }
  }, [reduce, target, mx, my])

  const listY = useTransform(pos, (v) => -(ROW / 2) - v * ROW)
  const railScale = useTransform(pos, (v) => clamp(v / (N - 1), 0, 1))
  const counter = useTransform(pos, (v) => String(clamp(Math.round(v), 0, N - 1) + 1).padStart(2, '0'))

  const jumpTo = (i) => target.set(clamp(i, 0, N - 1))

  /* Which cover is in focus, as state — but only the index, and it only changes
     when the reel crosses a halfway point, so this renders nine times across the
     whole reel, never per frame. The motion itself stays in motion values. */
  const navigate = useNavigate()
  const [focal, setFocal] = useState(0)
  useMotionValueEvent(pos, 'change', (v) => setFocal(clamp(Math.round(v), 0, N - 1)))

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

        {/* The light the focal cover sits in. About stands Nisha's portrait in
            a cool halo and the homepage has its moon; this is the same idea for
            the work — the cover in focus is lit, the piles in the corners are
            not. Static and behind everything, so it costs nothing per frame. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[62vw] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              'radial-gradient(closest-side, rgba(120,140,210,0.16) 0%, rgba(var(--hero-hot-rgb) / 0.05) 45%, transparent 100%)',
          }}
        />

        {/* ── The covers, as planes in a real 3D scene ── */}
        <div className="absolute inset-0 z-[10]">
          {projects.map((proj, i) => (
            <TrackCard
              key={proj.id}
              p={proj}
              i={i}
              pos={pos}
              c={cfg}
              mx={mx}
              my={my}
              focal={focal === i}
              onPick={jumpTo}
              navigate={navigate}
            />
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

        {/* ── RIGHT: the full index, scrolling to keep the active one centred ──

            The dossier and this index sit on the 1440 column's
            edges, the same ones the header's mark and links use. They were
            measured from the viewport instead, which is the same edge below
            1440 and 280px outside the header on a 2000px screen. The names are
            right-aligned so their ragged edge is the inside one and the
            column's edge stays straight under "Contact". */}
        <div className="pointer-events-none absolute right-6 top-1/2 z-[400] hidden w-[240px] -translate-y-1/2 md:block lg:right-[max(2.5rem,calc((100%_-_1440px)/2_+_2.5rem))] xl:w-[290px]">
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

        {tuning && <TunePanel cfg={cfg} setCfg={setCfg} />}

        {/* The page's title and where you are in it, on the column's edges
            like everything else. The page had no h1 at all — the dossier's h3s
            were the top of its outline. It gets the header's scrim, mirrored:
            the incoming cover rises straight through this band, and on a phone
            the label sat on top of its screenshot. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[390] h-28"
          style={{ background: 'linear-gradient(0deg, rgba(5,16,31,0.94) 0%, rgba(5,16,31,0.7) 45%, rgba(5,16,31,0) 100%)' }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-[400] mx-auto flex max-w-[1440px] items-center justify-between px-6 lg:px-10">
          <h1 className="font-mono text-[9.5px] uppercase tracking-[0.28em] text-hero-mute sm:text-[10px]">
            Selected work <span className="text-hero-mute/60">· {N} projects</span>
          </h1>
          <p className="font-mono text-[9.5px] tabular-nums tracking-[0.2em] text-hero-mute sm:text-[10px]">
            <motion.span className="text-hero-hot">{counter}</motion.span>
            <span className="text-hero-mute/60"> / {String(N).padStart(2, '0')}</span>
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-[400] h-[3px] bg-white/10">
          <motion.div className="h-full origin-left bg-hero-hot" style={{ scaleX: railScale }} />
        </div>
      </div>
    </section>
  )
}

/* Role / Launch / Recognition in the reference. Here: the fields this data
   actually has, in that same three-block shape. */
/* The eyebrow, rule and pills are the homepage's and About's own — the lit
   diamond before the hero's "UX Designer / UX Engineer", the short gold rule
   under About's intro, the mono pills on its timeline. Without them this column
   was the one block of type on the site set in none of its details. */
function Dossier({ p }) {
  return (
    <>
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden
          className="h-[5px] w-[5px] shrink-0 rotate-45 bg-hero-hot"
          style={{ boxShadow: '0 0 6px rgba(var(--hero-hot-rgb) / 1), 0 0 18px rgba(var(--hero-hot-rgb) / 0.6)' }}
        />
        <p className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-hero-hot">
          {categoryOf(p.id)}
        </p>
      </div>
      <h3 className="mt-3 font-display text-[clamp(1.35rem,1.9vw,1.9rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-hero-ink">
        {shortOf(p.id, p.company)}
      </h3>
      <span aria-hidden className="mt-5 block h-px w-10 bg-hero-hot/70" />

      <dl className="mt-5 space-y-3.5">
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
            <dd className="mt-2 flex flex-wrap gap-1.5">
              {p.tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/[0.14] bg-white/[0.03] px-2.5 py-1 font-mono text-[9px] uppercase leading-none tracking-[0.14em] text-[#b9c0dd]"
                >
                  {t}
                </span>
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
