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

   The asset is a masked cut-out: 822×839 RGBA, already desaturated, with her
   silhouette occupying roughly the middle 60% and everything around it fully
   transparent. It is not a framed scene, and the distinction decides the whole
   treatment — anything painted across the element's box lands on empty pixels
   as well as on her, which is how an earlier flat `rgba(5,16,31,0.30)` wash
   over the frame turned into a visible navy rectangle hanging in the sky.

   So nothing here is allowed to be rectangular. Three layers, in order:

     · An aura underneath her. A cut-out with no ground reads as pasted on;
       a soft warm-over-cool bloom, blurred and centred on her torso rather
       than on the box, makes the section look like the thing lighting her.
       It sits behind the image so her own edge stays crisp against it.
     · A duotone locked to her silhouette. The overlay carries the same mask
       as the photograph, so the tint stops exactly where she does. Blended
       `soft-light`, it warms her lit side toward the gold and drops her
       shadow side into the page's navy, which is what actually marries a
       black-and-white portrait to a coloured surface — a wash over the box
       only ever greys the background out.
     · A bottom fade, as a mask rather than a gradient fill. The asset ends in
       a straight horizontal cut at her waist; masking dissolves that cut into
       the night, whereas painting a gradient over it would re-introduce the
       rectangle the mask exists to avoid. It is applied to the wrapper so the
       photograph and its duotone fade together as one.

   The image also renders at its own aspect ratio. The previous `aspect-[3/4]`
   with `object-cover` cropped a near-square source down to a portrait box,
   which cut her trailing arm off at the frame edge.

   ───────────────────────────────────────────────────────────────────────────── */

/* Dissolves the asset's straight waist cut into the night. On the wrapper, so
   the photograph and the duotone over it fade as a single object. */
const BOTTOM_FADE = {
  WebkitMaskImage:
    'linear-gradient(180deg, #000 0%, #000 58%, rgba(0,0,0,0.55) 80%, transparent 100%)',
  maskImage:
    'linear-gradient(180deg, #000 0%, #000 58%, rgba(0,0,0,0.55) 80%, transparent 100%)',
}

/* Clips the tint to her outline by reusing the portrait's own alpha as a mask,
   which is what keeps it off the transparent air around her. */
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
          style={{ background: 'radial-gradient(100% 70% at 78% 8%, rgba(232,184,98,0.07) 0%, transparent 58%)' }}
        />
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
              Hi, I&rsquo;m <span className="text-hero-hot">Nisha.</span>
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
            <div className="relative ml-auto w-full max-w-[500px]">
              {/* The light she is standing in. Centred on her torso — 47% 40%
                  is where the silhouette actually sits inside the transparent
                  frame, not where the box's middle is. */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-x-10 -inset-y-8 blur-2xl"
                style={{
                  background:
                    'radial-gradient(46% 42% at 47% 40%, rgba(232,184,98,0.09) 0%, transparent 72%),' +
                    'radial-gradient(62% 58% at 47% 52%, rgba(43,86,158,0.28) 0%, transparent 74%)',
                }}
              />

              {/* Photograph + duotone, faded out together at the waist cut. */}
              <div className="relative" style={BOTTOM_FADE}>
                <img
                  src={nisha}
                  alt="Alimoon Nisha"
                  className="relative block w-full select-none"
                  style={{ filter: 'contrast(1.06) brightness(0.97)' }}
                  draggable="false"
                />
                {/* Depth first: soft-light deepens her shadow side toward the
                    page's navy without flattening the face. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                  style={{
                    ...SILHOUETTE,
                    background:
                      'linear-gradient(158deg, rgba(232,184,98,0.42) 0%, rgba(232,184,98,0.12) 42%,' +
                      ' rgba(19,44,84,0.50) 76%, rgba(11,33,68,0.70) 100%)',
                  }}
                />
                {/* Then hue, held at 0.3. `color` on a greyscale base is a true
                    duotone and will happily recolour her skin outright; a third
                    of it is the point where she picks up the section's warmth
                    and cool without ceasing to read as a photograph. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-color"
                  style={{
                    ...SILHOUETTE,
                    background:
                      'linear-gradient(158deg, #e8b862 0%, #c99a52 38%, #2b4a86 78%, #16305c 100%)',
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
