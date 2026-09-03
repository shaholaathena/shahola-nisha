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
   ───────────────────────────────────────────────────────────────────────────── */

/* The email and the portfolio URL come from her own About mockup, which
   publishes both — so the earlier "no email by default" stance is settled: she
   has made that call, and withholding it now would just be a dead end on a
   contact section.

   NOTE: the mockup also shows linkedin.com/in/alimoonnisha, while
   `meta.linkedin` is /in/shahola-nisha. Those are different handles and only
   she knows which is current, so the data file's value is kept and the
   discrepancy is flagged rather than silently switched. */
const CHANNELS = [
  { label: 'Email', value: 'alimoon.nisha@gmail.com', href: 'mailto:alimoon.nisha@gmail.com' },
  { label: 'LinkedIn', value: 'in/shahola-nisha', href: meta.linkedin },
  { label: 'Portfolio', value: 'alimoonnisha.vercel.app', href: 'https://alimoonnisha.vercel.app' },
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

        {/* ── Masthead ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VP}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-end justify-between border-t border-white/20 pt-4"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] tabular-nums text-hero-mute">
            Contact
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.24em] text-hero-mute sm:block">
            Open to new work
          </span>
        </motion.div>

        {/* ── The statement ── */}
        <div className="mt-16 lg:mt-24">
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 30, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={VP}
            transition={{ duration: 1, ease: EASE }}
            className="max-w-[14ch] font-display text-[clamp(2.75rem,10vw,8rem)] font-semibold leading-[0.9] tracking-[-0.035em]"
          >
            Let&rsquo;s make something{' '}
            <em className="not-italic font-semibold text-hero-hot decoration-hero-hot/40 underline underline-offset-[6px]">worth using</em>.
          </motion.h2>
        </div>

        {/* ── Channels + action ── */}
        <div className="mt-16 grid grid-cols-12 gap-y-12 border-t border-white/10 pt-10 lg:mt-24 lg:gap-x-12">

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="col-span-12 lg:col-span-5"
          >
            <p className="max-w-md text-[16px] leading-relaxed text-[#b9c0dd]">
              I&rsquo;m a UX Analyst at SSL Wireless in Dhaka, working across banking,
              payments and platform products. If you&rsquo;re building something where
              clarity actually matters, I&rsquo;d like to hear about it.
            </p>

            {/* Gold pill: the one filled control on the page, so the primary
                action does not look like the ghost rings around it. */}
            <a
              href={meta.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-9 inline-flex items-center gap-3 overflow-hidden rounded-full bg-hero-hot px-8 py-4 text-sm font-semibold text-[#05101f] transition-transform active:scale-95"
            >
              <span className="absolute inset-0 translate-y-full bg-white transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <span className="relative z-10">Start a conversation</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">↗</span>
            </a>
          </motion.div>

          {/* Channel index */}
          <motion.dl
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="col-span-12 lg:col-span-6 lg:col-start-7"
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
                <dd className="flex items-baseline gap-3 font-display text-[1.15rem] font-medium tracking-tight text-hero-ink transition-colors group-hover:text-hero-hot sm:text-[1.4rem]">
                  {c.value}
                  <span className="text-hero-hot opacity-40 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" aria-hidden="true">↗</span>
                </dd>
              </a>
            ))}

            <div className="flex items-baseline justify-between gap-6 border-b border-white/[0.12] py-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-hero-mute">Based in</span>
              <span className="font-display text-[1.15rem] font-medium tracking-tight text-hero-ink sm:text-[1.4rem]">
                {meta.location}
              </span>
            </div>
          </motion.dl>
        </div>
      </div>
    </section>
  )
}
