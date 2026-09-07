import { motion, useReducedMotion } from 'framer-motion'
import { meta } from '../../data/portfolio'

const EASE = [0.22, 1, 0.36, 1]
const VP = { once: true, margin: '-15%' }

/* ─────────────────────────────────────────────────────────────────────────────
   Contact — the closing band.

   Brought onto the night surface with the rest of the page. It used to sit on
   `bg-ink-primary`, the light theme's warm near-black, which read as a
   different colour temperature from the navy above it and made the bottom of
   the page look like a different site. It is transparent now, so the one dark
   ground runs from the nav to the footer, with a soft gold pool at the base to
   give the last screen some warmth to land on.

   It also carried the last of `accent-on-dark` (#f0a03c), a yellow-orange left
   over from the original palette. Everything accent here is the site's gold.

   The closing statement used to run to 8rem — 128px, against section headings
   that are now 48px and a hero that caps at 4.6rem. It capped the page with
   something nearly twice the size of anything else on it. It is 4.6rem here,
   the hero's ceiling, so the page opens and closes at one scale and the
   sections between them sit a clear step below.
   ───────────────────────────────────────────────────────────────────────────── */

/* Two social profiles, and no email address.

   An earlier version published the address, on the reasoning that her own
   mockup showed it and withholding it would leave the contact section as a dead
   end. She has since removed it, which reverses that: the direct line is now
   LinkedIn, which is also where the primary button goes. Worth knowing the
   consequence — there is no longer any way to reach her from this site without
   an account on someone else's platform. That is a deliberate choice, not an
   oversight, and it is the kind of thing that looks like an oversight later.

   The portfolio URL went with it. It pointed at this site, from this site, and
   the "Based in" row went too — the location is already in the ticker's reach
   and, unlike the other rows, it was the one entry that was not a way to
   contact anybody.

   NOTE: her mockup shows linkedin.com/in/alimoonnisha, while `meta.linkedin` is
   /in/shahola-nisha. Those are different handles and only she knows which is
   current, so the data file's value is kept and the discrepancy is flagged
   rather than silently switched. */
const CHANNELS = [
  { label: 'LinkedIn', value: 'in/shahola-nisha', href: meta.linkedin },
  { label: 'Dribbble', value: 'dribbble.com/shahola', href: meta.dribbble },
]

export default function CTASection() {
  const reduce = useReducedMotion()

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/10 py-24 text-hero-ink lg:py-36"
    >
      {/* A warm pool at the base, so the page ends on light rather than on a
          hard edge. Same gold as every other accent, at a whisper. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          background:
            'radial-gradient(80% 60% at 50% 118%, rgba(232,184,98,0.16) 0%, transparent 68%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-10">


        {/* ── Statement, beside the channels ──

            A masthead row used to sit above this: "Contact" against "Open to
            new work", over its own rule. Removed on request. Two consequences
            worth knowing — the section no longer labels itself, so the only
            thing naming it is the nav link that scrolls here; and "Open to new
            work" was the page's one availability signal, which the ticker
            deliberately does not carry because this band did. Nothing says it
            now.

            The grid lost its top rule and top margin with the masthead: the
            section element already draws a border above itself, and a second
            one immediately under it read as a doubled line. */}
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-[46%_1fr] lg:gap-x-16">

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 30, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={VP}
            transition={{ duration: 1, ease: EASE }}
            
          >
            {/* The closing line moved out of its own full-width band and into
                the left column, so it sits level with the two links instead of
                above them. Same two-column shape the three sections above this
                one now use, which makes the contact band the fourth rather than
                a layout of its own.

                Its column is 46%, not the 35% the three sections above use.
                Those hold a short eyebrow and a heading; this holds the page's
                closing sentence at 54px, and 35% broke it into three ragged
                lines. The right-hand column only carries two short link rows,
                so the width was going spare. */}
            <h2 className="font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.032em]">
              Let&rsquo;s make something{' '}
              <em className="not-italic font-semibold text-hero-hot decoration-hero-hot/40 underline underline-offset-[6px]">worth using</em>.
            </h2>
          </motion.div>

          {/* Channel index */}
          <motion.dl
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            
          >
            {CHANNELS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline justify-between gap-6 border-b border-white/[0.12] py-5 transition-colors hover:border-hero-hot/60"
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-hero-mute">
                  {c.label}
                </dt>
                <dd className="flex items-baseline gap-3 font-display text-[1rem] font-medium tracking-tight text-hero-ink transition-colors group-hover:text-hero-hot sm:text-[1.15rem]">
                  {c.value}
                  <span className="text-hero-hot opacity-40 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" aria-hidden="true">↗</span>
                </dd>
              </a>
            ))}

          </motion.dl>
        </div>
      </div>
    </section>
  )
}
