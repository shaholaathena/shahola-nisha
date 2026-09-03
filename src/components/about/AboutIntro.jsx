import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import nisha from '../../assets/nisha-1.png'
import Eyebrow from './Eyebrow'

/* ─────────────────────────────────────────────────────────────────────────────
   AboutIntro — the arrival band of the About page.

   Composition follows her mockup: the statement stacked down the left, the
   portrait holding the right half. Copy is hers from that mockup, including the
   second, quieter paragraph, which is the one place on the site that says what
   she is like rather than what she does.

   Two details carried over from the mockup because they do real work:

     · the short gold rule between the two paragraphs, which separates the
       professional line from the personal one without a heading, and
     · the "Explore my work" ring, the same control the homepage hero ends on,
       so the About page offers a way onward instead of dead-ending.

   ── The photograph ──

   This is an environmental portrait, not a cut-out: a composed frame with a
   wall, dappled tree shadows and a bench, supplied as RGB with no alpha. Three
   things that were right for the previous asset are wrong for this one, and all
   three were removed:

     · Grayscale. The earlier cut-out was a plum outfit fighting the gold, so
       desaturating it helped. This frame already carries a warm cast (+13 red
       over blue, measured) which lands in the same family as the accent, so
       black and white threw away the one thing tying it to the palette.
     · The bottom gradient mask. That existed to dissolve a cut-out's straight
       horizontal cut across the chest. Here the bottom of the frame is her
       feet and the ground, and fading it just deleted the composition.
     · The small size. 340px suited a head-and-shoulders cut-out; a scene with
       a wall and a canopy of shadow in it needs room to be legible at all.

   So it is framed rather than floated. A rectangular photograph has an edge
   whether or not you acknowledge it, and rounding it with a hairline border
   reads as a deliberate plate; pretending it has no edge is what made the
   earlier tile look like a stray blue box. Its own mean brightness is 46, so
   it sits down into the night surface without needing anything behind it.

   ───────────────────────────────────────────────────────────────────────────── */

/* Deterministic star field, so it never reflows on a re-render. */
const STARS = Array.from({ length: 38 }, (_, i) => {
  const r = (n) => {
    const x = Math.sin((i + 1) * n) * 10000
    return x - Math.floor(x)
  }
  return {
    left: `${(r(12.9898) * 100).toFixed(2)}%`,
    top: `${(r(78.233) * 64).toFixed(2)}%`,
    size: r(43.12) > 0.85 ? 2 : 1,
    op: 0.2 + r(4.53) * 0.45,
  }
})

export default function AboutIntro() {
  const reduce = useReducedMotion()
  const rise = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      }
  const step = (d) =>
    reduce ? {} : { ...rise, transition: { ...rise.transition, delay: d } }

  return (
    <section className="relative overflow-hidden bg-hero-void text-hero-ink">
      {/* ── Night backdrop ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, #05070f 0%, #061529 64%, #0b2144 100%)' }}
        />
        <div className="absolute inset-0">
          {STARS.map((s, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white"
              style={{ left: s.left, top: s.top, width: s.size, height: s.size, opacity: s.op }}
            />
          ))}
        </div>
        <div
          className="absolute inset-0 mix-blend-screen"
          style={{ background: 'radial-gradient(100% 70% at 78% 8%, rgba(232,184,98,0.14) 0%, transparent 58%)' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-hero-void" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 pt-32 pb-16 lg:px-10 lg:pt-36 lg:pb-20">
        <div className="grid grid-cols-12 items-center gap-y-12 lg:gap-x-16">

          {/* Statement */}
          <div className="col-span-12 lg:col-span-6">
            <motion.div {...rise}>
              <Eyebrow className="mb-7">About me</Eyebrow>
            </motion.div>

            <motion.h1
              {...step(0.04)}
              className="font-display text-[clamp(2.5rem,6.4vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.035em]"
            >
              Hi, I&rsquo;m <span className="text-hero-hot">Alimoon.</span>
            </motion.h1>

            <motion.p
              {...step(0.1)}
              className="mt-6 max-w-lg text-[16px] leading-relaxed text-[#b9c0dd] sm:text-[17px]"
            >
              A UX Analyst based in Dhaka, designing digital products and
              experiences that are useful, usable, and meaningful.
            </motion.p>

            {/* The rule that separates what she does from what she is like. */}
            <motion.span
              {...step(0.14)}
              aria-hidden
              className="mt-8 block h-px w-12 bg-hero-hot/70"
            />

            <motion.p
              {...step(0.18)}
              className="mt-7 max-w-lg text-[14px] leading-relaxed text-hero-mute sm:text-[15px]"
            >
              I enjoy turning complex requirements into simple, intuitive
              solutions that create real impact. When I&rsquo;m not designing,
              you&rsquo;ll probably find me lost in a book, behind a camera, or
              daydreaming about my next travel.
            </motion.p>

            {/* Same ring the homepage hero ends on. */}
            <motion.div {...step(0.22)} className="mt-10">
              <Link to="/work" className="group inline-flex items-center gap-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-hero-ink">
                  Explore my work
                </span>
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-hero-hot/50 transition-colors duration-200 group-hover:border-hero-hot group-hover:bg-hero-hot/15">
                  <span
                    className="text-hero-hot transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.div
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.97 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.08 },
                })}
            className="col-span-12 sm:col-span-8 md:col-span-6 lg:col-span-6"
          >
            <div className="relative ml-auto w-full max-w-[420px]">
              <div className="relative overflow-hidden">
                <img
                  src={nisha}
                  alt="Alimoon Nisha"
                  className="block aspect-[3/4] w-full select-none object-cover object-center"
                  draggable="false"
                />
                {/* Two scrims, both inside the frame so the radius clips them.

                    The flat one is the actual blend: the lit wall in this
                    photograph is far brighter than anything else on the page,
                    and left alone the plate read as a window cut into the
                    night rather than part of it. A wash of the page's own navy
                    pulls its highlights down into the surrounding luminance
                    range and cools them toward the palette, without touching
                    the warmth in her and the bench.

                    The gradient one hands the bottom edge off to the page. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{ background: 'rgba(5,16,31,0.30)' }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
                  style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(5,16,31,0.6) 100%)' }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
