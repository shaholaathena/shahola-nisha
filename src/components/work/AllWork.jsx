import { motion, useReducedMotion } from 'framer-motion'
import { projects } from '../../data/portfolio'
import { categoryOf, shortOf } from './groups'
import { useState } from 'react'
import { useVelocitySkew } from '../../lib/useVelocitySkew'
import { canUse3D } from '../../lib/canUse3D'
import WorkGallery3D from './WorkGallery3D'
import MerchantCoverQR from '../ui/MerchantCoverQR'

/* ─────────────────────────────────────────────────────────────────────────────
   AllWork — all nine projects, as a grid.

   ══ What this replaced, and why ════════════════════════════════════════════

   A scroll-turned 3D helix (`ProjectHelix`, deleted). The geometry was correct
   — verified by driving the transform maths directly — but it pinned the
   section, and the pin is what broke the page:

     main            hero          0 →  702
                     #work       702 → 2736
                     pin-spacer 2736 → 5689   ← 2953px, 1600px padding-bottom
     helix content              2736 → 4089

   ScrollTrigger's `pin: true` adds a runway — here 1600px — to hold the
   section still while the animation plays out. When the pin holds, a reader
   never sees that runway. When it does not, it is 1600px of empty page, which
   is precisely what showed up: a screen and a half of nothing under the work.

   The pin most likely stopped holding because Lenis was added underneath it and
   ScrollTrigger measured its layout before Lenis existed. That is fixable. It
   is not worth fixing here, for one reason: a pinned section's failure mode is
   a huge hole in the page, and this component could not be verified in the
   environment it was built in — rAF is suspended, so not one frame of it was
   ever seen. Shipping an effect whose worst case is 1600px of void, unseen, is
   the wrong trade for a project index.

   So this is the version with nothing to go wrong: nine covers, a grid, no
   pin, no 3D, no GSAP, no dependence on scroll. It was already the helix's
   fallback for narrow screens and reduced motion; now it is the whole thing.

   If the helix is wanted again it needs, in this order: a visible pane to build
   it in, `ScrollTrigger.refresh()` after Lenis initialises, and a check that
   the pin-spacer's height matches the section it is holding.

   ── Numbering ──

   01 through 09 across all nine, continuing the three bands above rather than
   restarting, so the page reads as one body of work. The three with case
   studies link; the six without are `<article>`, not anchors to nowhere.
   ───────────────────────────────────────────────────────────────────────────── */
/* One card. Split out so each can own a `useVelocitySkew` — hooks cannot be
   called in a loop. The skew rides on an inner wrapper, because framer-motion's
   reveal writes `transform` on the outer one and the two would overwrite each
   other on the same node. */
function Card({ p, i, reveal }) {
  const skew = useVelocitySkew({ max: 4 })

  const Body = (
    <>
      <div ref={skew} className="aspect-[16/10] w-full overflow-hidden rounded-sm bg-white/[0.05] will-change-transform">
{/* Order matters, and getting it wrong is visible. `coverQR` is a
            drawn component, not a file, and Bangla QR has BOTH it and an
            `image` — checking `image` first was fine, but checking only
            `image` meant projects that have just `coverQR` fell through to the
            company-name fallback. Two of nine cards rendered as a grey panel
            with "SSL Wireless" in the corner. */}
        {p.image ? (
          <img
            src={p.image}
            alt={p.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
            draggable="false"
          />
        ) : p.coverQR ? (
          <div className="flex h-full w-full items-center justify-center p-6">
            <div className="w-[38%] max-w-[130px]">
              <MerchantCoverQR />
            </div>
          </div>
        ) : (
          /* Last resort, and it should look deliberate rather than broken: the
             product name set as type, not a stranded client name. */
          <div className="flex h-full w-full flex-col justify-between p-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-hero-mute">
              {categoryOf(p.id)}
            </span>
            <span className="font-display text-[1.35rem] font-semibold leading-none tracking-[-0.02em] text-hero-ink">
              {shortOf(p.id, p.company)}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-baseline gap-3">
        <span className="font-mono text-[11px] tabular-nums text-hero-hot">
          {String(i + 1).padStart(2, '0')}
        </span>
        <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-hero-mute">
          {categoryOf(p.id)}
          {p.year ? ` · ${p.year}` : ''}
        </span>
      </div>

      <h3 className="mt-1.5 font-display text-[1.05rem] font-medium leading-snug text-hero-ink transition-colors group-hover:text-hero-hot">
        {shortOf(p.id, p.company)}
      </h3>

      {p.description && (
        <p className="mt-2 line-clamp-2 text-[13.5px] leading-relaxed text-hero-mute">
          {p.description}
        </p>
      )}
    </>
  )

  return (
    <motion.div {...reveal(0.03 + (i % 3) * 0.05)} className="group">
      {p.link ? <a href={p.link} className="block">{Body}</a> : <article>{Body}</article>}
    </motion.div>
  )
}

export default function AllWork() {
  const reduce = useReducedMotion()

  /* Settled before the first render, not reported back from an effect. When
     the canvas is in, the DOM grid becomes a quieter index beneath it rather
     than showing the same nine covers at full size twice; when it is not — no
     WebGL, narrow, reduced motion — the grid is the whole section. */
  const [gl] = useState(canUse3D)

  const reveal = (d = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-8%' },
          transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
        }

  return (
    <section id="all-work" className="relative border-t border-white/10">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10 lg:py-24">

        <div className="mb-10 flex items-end justify-between lg:mb-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-hero-mute sm:text-[11px]">
            Everything else
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] tabular-nums text-hero-mute">
            {String(projects.length).padStart(2, '0')} projects
          </p>
        </div>

        {gl && <WorkGallery3D />}

        <div
          className={`grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3 ${
            gl ? 'mt-16 border-t border-white/[0.08] pt-14 lg:mt-20' : ''
          }`}
        >
          {projects.map((p, i) => (
            <Card key={p.id} p={p} i={i} reveal={reveal} />
          ))}
        </div>
      </div>
    </section>
  )
}
