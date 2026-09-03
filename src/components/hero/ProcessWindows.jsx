/* ─────────────────────────────────────────────────────────────────────────────
   ProcessWindows — the signature element.

   The one thing in this hero that is not atmosphere. The city is the metaphor;
   this is the argument. The headline claims she turns complex problems into
   clear experiences; this is HOW — her six phases, lit one at a time in a
   window of a different building, so the frame states the method rather than
   asserting the outcome.

   The labels are not written here. They come from `process` in data/portfolio,
   which is the same array the Process section renders, so the hero can never
   drift from the process it is previewing. Geometry stays local — where a
   window is, is a hero concern — and the words are taken by index.

   An earlier version labelled these with payment states (initiated, authorised,
   captured, settled, reconciled). True to the domain she works in, but it was
   the wrong subject for a portfolio hero: it described her clients' systems,
   not her.

   ══ No connectors ══════════════════════════════════════════════════════════

   An earlier version drew the route: faint wiring between the windows and a
   neon packet running along it. The lines are gone, and the element is better
   without them. The order already says everything a connector said — you read
   the path from WHICH window lights next, and the hop is carried by a beat of
   darkness between phases.

   Exactly one window is ever lit. A visited one used to keep a dim ember so the
   route accumulated behind the current phase, and that is gone: a light is on
   or it is off, and a window sitting at 30% is neither. What it cost is the
   standing trail — the route is now read in sequence, from what lights next,
   and not from a picture of where the walk has been. What it bought is that the
   lit window is unambiguously THE lit window.

   Colour carries the headline's own arc: cyan while the work is still being
   figured out, magenta once it is real and going to people. So across the walk
   the city moves from cool to hot — complex to clear.

   ══ How the anchors were found, and the wrong way that failed ═══════════════

   First attempt: parse `cityscape2.svg`, find its window-coloured rectangles,
   use those coordinates. Half were wrong — pixel-sampling the rendered artwork
   showed four of eight anchors sitting on bare building wall. A window can
   exist in the file and be completely invisible, because a nearer building is
   painted over it later in document order. Source geometry says a window was
   drawn; it does not say a window can be SEEN.

   So these came from the raster instead: draw the artwork to a canvas at its
   natural 1703x1200, flood-fill every uniform patch brighter than the walls,
   keep the ones of window size, and group them by fill — in this artwork each
   building face has its own window colour, which makes colour a reliable proxy
   for "a different building". 132 windows survived that filter; these six are
   from six different faces, and every one is pixel-verified: sampling the
   artwork at its centre returns that window's own colour, never wall.

   ══ THE COUPLING ════════════════════════════════════════════════════════════

   `CANVAS` and `OBJECT_POSITION` MUST match the artwork's intrinsic size and
   the `objectPosition` on the <img> in NightScene. Change one without the other
   and every light drifts off its window. `object-fit` geometry is not exposed
   to script, so there is no way to derive it from the DOM — it is duplicated on
   purpose, and this note is why that is safe.
   ───────────────────────────────────────────────────────────────────────────── */
import { useRef, useState, useLayoutEffect, useEffect } from 'react'
import gsap from 'gsap'
import { process } from '../../data/portfolio'

/* cityscape2.svg's own viewBox, and the objectPosition NightScene renders it at. */
const CANVAS = { w: 1703, h: 1200 }
const OBJECT_POSITION = { x: 0.5, y: 0.84 }

const TONE = {
  early: { light: '#f4d79c', text: '#f9e8c6' },
  late:  { light: '#e8a53a', text: '#f2cb85' },
}

/* Six anchors, one per building face, in the order the walk visits them.
   `side` alternates where it has to: stops 4 and 5 sit within ten artwork
   pixels of the same baseline, so letting both labels read rightward overlapped
   them — pointing them in opposite directions puts 83px between them instead.

   `tone` follows the headline's arc rather than the phase: cool while the work
   is still being worked out, hot once it is real and going to people. */
const ANCHORS = [
  { x: 1028, y: 660, w: 15, h: 27, tone: 'early', side: 'left' },
  { x: 1108, y: 928, w: 20, h: 33, tone: 'early', side: 'right' },
  { x: 1283, y: 747, w: 12, h: 29, tone: 'early', side: 'right' },
  { x: 1363, y: 659, w: 14, h: 35, tone: 'late', side: 'left' },
  { x: 1428, y: 649, w: 12, h: 21, tone: 'late', side: 'right' },
  { x: 1521, y: 738, w: 12, h: 16, tone: 'late', side: 'right' },
]

/* Words from the process, geometry from here. If a phase is ever added to
   `process`, the hero shows the first six and the new one needs an anchor — it
   will not silently misalign, it just will not appear. */
const CHAIN = ANCHORS.slice(0, process.length).map((anchor, i) => ({
  ...anchor,
  label: process[i].title,
}))

/* Hero.jsx runs its neon sweep up the skyline from 0.25s to 1.0s. Nothing
   settles in a city that has not switched on yet, so the walk waits for it —
   but only just: the entrance is now about half its old length, and a walk that
   still waited 2.2s would leave the hero doing nothing for a second after it
   had finished arriving. If that entrance timing changes, this changes with it. */
const ENTRANCE_CLEARED = 1.35

/* ── Cadence. Every duration the walk uses lives here, because the only way to
      retune the rhythm is to change several of them together.

      SWITCH is short on purpose: a light either is on or it is not, and a long
      fade makes a window read as materialising rather than switching. HOLD is
      the one value with a floor under it — it is how long a word stays up to be
      read, and below roughly 0.8s the eye cannot find the label and finish it
      before it goes. That floor, not taste, is what stops this going faster. ── */
const SWITCH = 0.14  // a window coming on, and its label with it
const HOLD = 0.95    // how long one phase is asserted — see the floor above
const RELEASE = 0.2  // going out, all the way, and the label leaving with it
const HANDOFF = 0.28 // the beat of darkness that stands in for the hop
const SETTLE = 1.0   // the last phase held before it clears
const CLEAR = 0.32   // the last window and its label leaving together

export default function ProcessWindows() {
  const root = useRef(null)
  const [box, setBox] = useState(null)

  /* Measure the host and keep measuring: the artwork rescales with the frame,
     so anchors computed at one size are wrong at the next. */
  useLayoutEffect(() => {
    const host = root.current?.parentElement
    if (!host) return

    /* offsetWidth/Height, NOT getBoundingClientRect: the city layer is scaled by
       the scroll timeline, and a rect would report the scaled size and send
       every anchor drifting mid-scroll. Layout size ignores transforms. */
    const measure = () => {
      const { offsetWidth: w, offsetHeight: h } = host
      if (w > 0 && h > 0) setBox({ w, h })
    }
    measure()

    const ro = new ResizeObserver(measure)
    ro.observe(host)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!box) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const wins = gsap.utils.toArray('[data-win]')
      const labels = gsap.utils.toArray('[data-win-label]')

      /* Reduced motion gets the claim without the journey: every window lit and
         every state named at once, nothing moving. */
      if (reduced) {
        gsap.set(root.current, { opacity: 1 })
        gsap.set([...wins, ...labels], { opacity: 0.85 })
        return
      }

      gsap.set(root.current, { opacity: 1 })
      gsap.set([...wins, ...labels], { opacity: 0 })

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.4, delay: ENTRANCE_CLEARED })

      let t = 0
      wins.forEach((win, i) => {
        /* The window and its label come on almost together — a 0.06s offset, so
           the light reads as the cause and the word as the consequence without
           the pair feeling staggered. */
        tl.to(win, { opacity: 1, duration: SWITCH, ease: 'power2.out' }, t)
          .to(labels[i], { opacity: 1, duration: SWITCH, ease: 'power2.out' }, t + 0.06)

        /* Handing over. Both go completely — only one phase is ever asserted,
           and the window is the assertion as much as the word is. `power2.in`
           rather than `inOut`: switching off has no ease-out, it just stops. */
        if (i < wins.length - 1) {
          tl.to(labels[i], { opacity: 0, duration: RELEASE * 0.8, ease: 'power1.in' }, t + HOLD)
            .to(win, { opacity: 0, duration: RELEASE, ease: 'power2.in' }, t + HOLD)
        }

        t += HOLD + HANDOFF
      })

      /* The last phase holds for a beat — the only thing still lit — and then
         goes. Every earlier window is already dark, so this clears the pair
         rather than a whole skyline, and the exit is faster than any entrance
         in the walk. The list is still the full set: cheap, and it means a
         throttled tab that skipped a release cannot leave a window burning. */
      tl.to([...wins, ...labels], { opacity: 0, duration: CLEAR, ease: 'power1.in' }, t + SETTLE)
    }, root)

    /* Failsafe, mirroring Hero.jsx: the layer ships hidden and GSAP reveals it,
       so a throttled ticker — a background tab, a stalled main thread — would
       leave it invisible forever. Timers keep running when requestAnimationFrame
       does not. */
    const failsafe = setTimeout(() => {
      if (root.current) gsap.set(root.current, { opacity: 1 })
    }, 2600)

    return () => { clearTimeout(failsafe); ctx.revert() }
  }, [box])

  /* Wide frames only. Five labelled stops need room to be read; on a phone they
     collide with each other and with the copy, and the artwork is cropped hard
     enough there that the right-hand stops fall outside the frame entirely. */
  const shell = 'pointer-events-none absolute inset-0 hidden h-full w-full opacity-0 md:block'

  /* Un-measured state. Reached whenever the host reports a zero-sized box — a
     detached or zero-width viewport, for instance. Carries `data-process` like
     the real render does, so anything selecting on the layer finds it in either
     state rather than silently reporting it missing. */
  if (!box) return <svg ref={root} data-process className={shell} aria-hidden="true" />

  /* ── Artwork space → host space. `object-cover` scales by whichever axis needs
        more, then objectPosition decides which part of the overflow is cropped.
        That overflow is negative, which is why these offsets are. ── */
  const scale = Math.max(box.w / CANVAS.w, box.h / CANVAS.h)
  const offX = (box.w - CANVAS.w * scale) * OBJECT_POSITION.x
  const offY = (box.h - CANVAS.h * scale) * OBJECT_POSITION.y

  return (
    <svg
      ref={root}
      data-process
      className={shell}
      viewBox={`0 0 ${box.w} ${box.h}`}
      aria-hidden="true"
    >
      <defs>
        <filter id="win-bloom" x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur stdDeviation={Math.max(4, 7 * scale)} />
        </filter>
      </defs>

      {CHAIN.map((stop, i) => {
        const tone = TONE[stop.tone]
        const x = offX + stop.x * scale
        const y = offY + stop.y * scale
        const w = stop.w * scale
        const h = stop.h * scale
        const right = stop.side === 'right'
        return (
          <g key={`stop-${i}`}>
            {/* Bloom under the pane: a lit window spills light into the air
                around it before it reads as a rectangle. */}
            <g data-win>
              <rect x={x} y={y} width={w} height={h} fill={tone.light} opacity="0.7" filter="url(#win-bloom)" />
              <rect x={x} y={y} width={w} height={h} fill={tone.light} />
              <rect x={x} y={y} width={w} height={h} fill="#fff" opacity="0.3" />
            </g>
            <text
              data-win-label
              x={right ? x + w + 9 : x - 9}
              y={y - 7}
              textAnchor={right ? 'start' : 'end'}
              fill={tone.text}
              className="font-mono"
              style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase' }}
            >
              {stop.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
