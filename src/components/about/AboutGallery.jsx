import { motion, useReducedMotion } from 'framer-motion'
import Eyebrow from './Eyebrow'

/* ─────────────────────────────────────────────────────────────────────────────
   AboutGallery — a horizontal strip that scrolls itself.

   Placed after "Who I am", because that section is the one that says what she
   is like rather than what she does, and these are its evidence. It also breaks
   the page's shape at the right moment: everything before and after it is a
   left rail with a column of text beside it, and this is the only section that
   goes edge to edge.

   ── Motion ──

   It runs on `hero-marquee`, the same global animation as the hero's ticker,
   which means it also inherits that animation's `prefers-reduced-motion` stop
   for free. FOUR copies of the list, translating -25%, for the reason written
   out in NeonTicker: with two copies the track travels a full copy width and
   the tail edge lands inside the frame, leaving bare strip at the loop on any
   viewport wider than one copy.

   Two things follow from an animation that can stop:

     · Stopped, only the first copy is on screen and the rest is unreachable.
       So the frame is `motion-reduce:overflow-x-auto` — when the animation is
       off, the strip becomes an ordinary horizontal scroller and every image is
       still reachable. A gallery that hides half its contents from anyone who
       turns motion off is not a gallery.
     · It pauses on hover, so anything you want to actually look at will hold
       still while you look at it.

   ── The placeholders ──

   Generated as inline SVG data URIs rather than pulled from a placeholder
   service or committed as files. No network request, nothing to 404 later, and
   nothing added to the repo that has to be deleted when the real photographs
   arrive. They carry an index and a caption so they are distinguishable from
   each other while the layout is being judged.

   TO REPLACE: import the real images and swap the `src` in SHOTS. That is the
   only change needed — `alt` moves with it, and the varied aspect ratios below
   should be replaced with each photograph's real one so the strip keeps its
   uneven rhythm. Right now `alt` describes a placeholder, which is honest; with
   real photographs it must describe the photograph.
   ───────────────────────────────────────────────────────────────────────────── */

/* Deliberately not gold, and deliberately low contrast against the page: these
   are stand-ins, and a placeholder that draws the eye harder than the real
   thing will misinform the layout decision being made from it. */
const placeholder = (w, h, index, label) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0' stop-color='#0c1a2e'/>
          <stop offset='1' stop-color='#16273e'/>
        </linearGradient>
      </defs>
      <rect width='${w}' height='${h}' fill='url(#g)'/>
      <rect x='0.5' y='0.5' width='${w - 1}' height='${h - 1}' fill='none'
            stroke='rgba(255,255,255,0.10)'/>
      <line x1='0' y1='0' x2='${w}' y2='${h}' stroke='rgba(255,255,255,0.045)'/>
      <line x1='${w}' y1='0' x2='0' y2='${h}' stroke='rgba(255,255,255,0.045)'/>
      <text x='${w / 2}' y='${h / 2 - 6}' text-anchor='middle'
            font-family='ui-monospace, monospace' font-size='${Math.round(h * 0.16)}'
            fill='rgba(255,255,255,0.20)'>${index}</text>
      <text x='${w / 2}' y='${h / 2 + Math.round(h * 0.11)}' text-anchor='middle'
            font-family='ui-monospace, monospace' font-size='${Math.round(h * 0.055)}'
            letter-spacing='${Math.round(h * 0.012)}'
            fill='rgba(255,255,255,0.28)'>${label.toUpperCase()}</text>
    </svg>`
  )

/* Mixed orientations on purpose. A strip of identically proportioned frames
   reads as a contact sheet; the uneven rhythm is what makes it read as a
   gallery, and it is also what real photographs will actually be. */
const SHOTS = [
  { w: 1200, h: 900, label: 'Sketchbook' },
  { w: 900, h: 1200, label: 'Dhaka' },
  { w: 1200, h: 900, label: 'Workshop' },
  { w: 1000, h: 1000, label: 'On the road' },
  { w: 1200, h: 900, label: 'Desk' },
  { w: 900, h: 1200, label: 'Camera roll' },
].map((s, i) => ({
  ...s,
  id: s.label,
  src: placeholder(s.w, s.h, String(i + 1).padStart(2, '0'), s.label),
  alt: `Placeholder ${i + 1} of 6 — ${s.label}`,
}))

function Run({ cloned = false }) {
  return (
    <>
      {SHOTS.map((s) => (
        <figure key={`${s.id}-${cloned}`} className="relative mr-4 shrink-0 lg:mr-6">
          <img
            src={s.src}
            /* Clones are decorative duplicates of frames already announced, so
               they are hidden from the accessibility tree rather than repeating
               the whole strip four times to a screen reader. */
            alt={cloned ? '' : s.alt}
            aria-hidden={cloned || undefined}
            className="h-52 w-auto select-none rounded-[10px] object-cover sm:h-64 lg:h-[19rem]"
            /* The frame's proportions are declared, not discovered.

               Without this the width comes from the decoded image, so the
               element is zero-width until it loads — and a zero-area element
               never intersects the viewport, so `loading="lazy"` could never
               fire and the image could never load itself. The whole strip
               rendered as nothing. Declaring the ratio also means real
               photographs will drop in without the row reflowing around them. */
            style={{ aspectRatio: `${s.w} / ${s.h}` }}
            draggable="false"
          />
        </figure>
      ))}
    </>
  )
}

export default function AboutGallery() {
  const reduce = useReducedMotion()
  const reveal = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-12%' },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      }

  return (
    <section id="gallery" className="relative border-t border-white/10">
      <div className="mx-auto max-w-[1440px] px-6 pt-16 lg:px-10 lg:pt-24">
        <motion.div {...reveal} className="max-w-xl">
          <Eyebrow className="mb-6">Off the clock</Eyebrow>
          <h2 className="font-display text-[clamp(1.95rem,3.5vw,2.95rem)] font-semibold leading-[1.04] tracking-[-0.028em] text-hero-ink">
            The rest of it<span className="text-hero-hot">.</span>
          </h2>
          <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-[#b9c0dd]">
            Sketches, streets, and whatever the camera caught. Placeholders for
            now.
          </p>
        </motion.div>
      </div>

      {/* Full bleed, and the only section on the page that is. It escapes the
          1440 container on purpose — a strip that scrolls should run off both
          edges, or it reads as a widget sitting in a column. */}
      <div className="group relative mt-10 overflow-hidden py-1 motion-reduce:overflow-x-auto lg:mt-14">
        {/* Edge fade, so frames enter and leave instead of being cut. Hidden
            when the strip becomes a manual scroller, where a fade over the
            first and last frame would just obscure them. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 motion-reduce:hidden"
          style={{
            background:
              'linear-gradient(90deg, #05101f 0%, transparent 7%, transparent 93%, #05101f 100%)',
          }}
        />
        {/* The duration is inline because `.hero-marquee` sets `animation` as
            a shorthand, which resets `animation-duration` and beat the utility
            class. 52s, not the ticker's 38s: these frames are far wider than a
            line of mono text, so matching the strip's speed would have moved
            them past too fast to look at. */}
        <div
          className="hero-marquee flex w-max items-center group-hover:[animation-play-state:paused]"
          style={{ animationDuration: '52s' }}
        >
          <Run />
          {[1, 2, 3].map((i) => (
            <Run key={i} cloned />
          ))}
        </div>
      </div>

      <div className="pb-16 lg:pb-24" />
    </section>
  )
}
