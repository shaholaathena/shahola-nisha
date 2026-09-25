import { motion, useReducedMotion } from 'framer-motion'
import WorkCta from '../ui/WorkCta'
import nisha from '../../assets/nisha-3.png'
import Eyebrow from './Eyebrow'
import { softStops } from '../../lib/softGradient'

/* ─────────────────────────────────────────────────────────────────────────────
   AboutIntro — the arrival band of the About page.

   Composition follows her mockup: the statement stacked down the left, the
   portrait holding the right half. Copy is hers, now one paragraph: what she
   does, then the line that says what she is like (the one place on the site
   that does). It was two paragraphs split by a short gold rule until she
   asked for one.

   The "Explore my work" pill carries over from the mockup: the same control
   the homepage hero ends on, so the About page offers a way onward instead of
   dead-ending.

   ── The photograph ──

   Her own portrait, her own cut-out: 1160×1355 RGBA, shot outdoors in soft
   natural light, head tilted, in a dark shirt. It replaced a front-on studio
   headshot on white, and nearly everything that one needed has gone with it —
   there was a shade laid across one side of her face to break its symmetry,
   and a darkening over a cream jacket so the chest did not outshine the face.
   This photograph has its own light and its own dark clothes, so both were
   taken out; putting a painted shadow on a face that already has real light
   on it only fights it.

   What is left is light-touch. No frame, and fades only on the outside edges
   where the original photograph cut her off: the sides and the foot. A grade a
   shade below a daylight frame, a soft warm-over-cool glow behind her, and a
   thin warm rim offset toward the moon, up and to the right, so her hair
   separates from the sky.

   ───────────────────────────────────────────────────────────────────────────── */

/* An eased falloff that holds full strength out to `hold` of the way, then
   leaves along a smoothstep, so there is no point at which the eye can find
   where it starts or ends. Used for both masks below. */
const held = (rgb, a, hold) =>
  [`rgb(${rgb} / ${a}) 0%`, `rgb(${rgb} / ${a}) ${hold}%`]
    .concat(
      [0.12, 0.25, 0.38, 0.5, 0.62, 0.75, 0.88, 1].map((t) => {
        const k = 1 - t * t * (3 - 2 * t)
        return `rgb(${rgb} / ${(a * k).toFixed(4)}) ${(hold + t * (100 - hold)).toFixed(1)}%`
      }),
    )
    .join(', ')

/* ── How she meets the sky ──

   One soft oval, not straight edges. Three linear fades — one per cut edge of
   the photograph — each drew a line of its own: a vertical one down the right
   shoulder and a band across the foot. A single ellipse round her, at full
   strength over her face, hair and shoulders and easing out beyond them,
   leaves no line anywhere. It is deliberately large: an earlier oval that
   began fading at the shoulders took her body with it and left a head
   floating in the sky, which reads as too big however it is sized. This one
   keeps the shoulders and chest, and only the photograph's own cut edges fall
   into the tail, at a tenth of their strength or less. */
const EDGE_FADE_OVAL = `radial-gradient(ellipse 56% 64% at 52% 40%, ${held('0 0 0', 1, 50)})`
const EDGE_FADE = {
  WebkitMaskImage: EDGE_FADE_OVAL,
  maskImage: EDGE_FADE_OVAL,
}

/* Her outline, from the portrait's own alpha, so the ambient shade below
   stops exactly where she does and never lands on the sky. */
const SILHOUETTE = {
  WebkitMaskImage: `url(${nisha})`,
  maskImage: `url(${nisha})`,
  WebkitMaskSize: '100% 100%',
  maskSize: '100% 100%',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
}

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
    <section className="relative overflow-hidden text-hero-ink">
      {/* The hero used to paint its own night: an opaque gradient, its own
          38-star field, and a fade back to the void at its foot. All of that is
          gone. AboutAtmosphere now carries one sky for the whole page — the
          homepage's real `sky.svg` field included — and this section is
          transparent so that sky runs through it unbroken.

          That opacity was the reason the top of the page still looked like a
          different site after everything below it had been rebuilt: the shared
          atmosphere was there, and the hero was sitting on top of it painting
          over the part a visitor sees first.

          What stays is the one thing this section owns: the warm glow up and to
          the right, which is the hero's own light and has nothing behind it to
          conflict with. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 mix-blend-screen"
          style={{ background: `radial-gradient(100% 70% at 78% 8%, ${softStops('232 184 98', 0.07, 62)})` }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 pt-32 pb-16 lg:px-10 lg:pt-36 lg:pb-20">
        <div className="grid grid-cols-12 items-center gap-y-12 lg:gap-x-16">

          {/* Statement */}
          <div className="col-span-12 lg:col-span-6">
            <motion.div {...rise}>
              <Eyebrow className="mb-7">A LITTLE ABOUT ME</Eyebrow>
            </motion.div>

            <motion.h1
              {...step(0.04)}
              className="font-display text-[clamp(2.5rem,6.4vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.035em]"
            >
              Hi, I&rsquo;m <span className="text-hero-hot">Nisha.</span>
            </motion.h1>

            {/* One paragraph, not two. It was a professional line and a quieter
                personal one split by a short gold rule; she asked for them as
                one. The two work sentences are folded together ("designing and
                building" + "complex requirements into simple, intuitive
                solutions"), and the personal sentence closes it. "Behind a camera"
                became sketching at her request; "just for fun" keeps it a
                hobby, not a second discipline. */}
            <motion.p
              {...step(0.1)}
              className="mt-6 max-w-2xl text-[16px] leading-relaxed text-[#b9c0dd] sm:text-[17px]"
            >
              A design engineer based in Dhaka, turning complex requirements into
              simple, intuitive products that are useful, usable, and meaningful.
              When I&rsquo;m not designing, you&rsquo;ll probably find me lost in
              a book, sketching (just for fun), or daydreaming about my next
              travel.
            </motion.p>

            {/* Same control the homepage hero ends on. */}
            <motion.div {...step(0.16)} className="mt-10">
              <WorkCta />
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
            {/* 400px: a presence in the sky beside the words rather than
                their equal, with some air to its right. */}
            <div className="relative mx-auto w-full max-w-[400px] lg:ml-auto lg:mr-10">
              {/* The light she stands in: warm at her head, the page's cool
                  navy further out. Blurred, eased, and behind her. */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-12 blur-2xl"
                style={{
                  background:
                    `radial-gradient(46% 38% at 50% 34%, ${softStops('232 184 98', 0.09)}),` +
                    `radial-gradient(64% 60% at 50% 46%, ${softStops('52 84 156', 0.16)})`,
                }}
              />

              {/* Turned 13° toward level. Her head sits at 21° in the
                  photograph (measured along the pupils), which read as
                  lopsided at this size; 8° is left so it still reads as a
                  relaxed tilt rather than a passport pose. It turns about her
                  face, and the fade masks turn with it — rotating only the
                  image would swing the photograph's cut edges out from under
                  them. */}
              <div className="relative" style={{ ...EDGE_FADE, transform: 'rotate(13deg)', transformOrigin: '50% 40%' }}>
                <img
                  src={nisha}
                  alt="Alimoon Nisha"
                  className="relative block w-full select-none"
                  style={{
                    filter:
                      /* The rim is offset toward the light — right and up — so it
                         catches only the edge the moon would, instead of
                         outlining her evenly all the way round. */
                      'saturate(0.9) contrast(1.02) brightness(0.9) drop-shadow(1.5px -1px 1px rgba(232,184,98,0.22)) drop-shadow(6px -4px 14px rgba(232,184,98,0.08))',
                  }}
                  draggable="false"
                />
                {/* Night round her, daylight on her face. The photograph was
                    taken outdoors by day, so the ends of her hair and her
                    shoulders are lit as brightly as her face — brighter than
                    anything else in a night sky, which is what kept her
                    looking pasted in. The night now reaches into her from the
                    outside: clear over the face, deepening toward her edges,
                    so those edges are already close to the sky's own value
                    when the oval above dissolves them into it. Multiply only
                    darkens; nothing on her changes colour. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 mix-blend-multiply"
                  style={{
                    ...SILHOUETTE,
                    background: `radial-gradient(ellipse 34% 30% at 52% 38%, rgb(255 255 255 / 0) 0%, rgb(255 255 255 / 0) 55%, rgb(40 58 102 / 0.35) 100%), radial-gradient(ellipse 60% 62% at 52% 40%, rgb(40 58 102 / 0) 0%, rgb(40 58 102 / 0) 30%, rgb(24 40 78 / 0.5) 100%)`,
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
