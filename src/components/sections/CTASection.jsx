import { motion, useReducedMotion } from 'framer-motion'
import { meta } from '../../data/portfolio'

const EASE = [0.22, 1, 0.36, 1]
const VP = { once: true, margin: '-15%' }

/* Deliberately no email address here: publishing one on a public page is the
   user's call, not a default. Add a `meta.email` and a row below to include it. */
const CHANNELS = [
  { label: 'LinkedIn', value: 'in/shahola-nisha', href: meta.linkedin },
  { label: 'Dribbble', value: 'dribbble.com/shahola', href: meta.dribbble },
]

export default function CTASection() {
  const reduce = useReducedMotion()

  return (
    <section id="contact" className="relative overflow-hidden bg-ink-primary py-24 text-paper lg:py-36">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">

        {/* ── Masthead ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VP}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-end justify-between border-t border-paper/30 pt-4"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] tabular-nums text-paper/50">
            Contact
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.24em] text-paper/50 sm:block">
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
            <em className="not-italic font-semibold text-accent decoration-accent/30 underline underline-offset-[6px]">worth using</em>.
          </motion.h2>
        </div>

        {/* ── Channels + action ── */}
        <div className="mt-16 grid grid-cols-12 gap-y-12 border-t border-paper/20 pt-10 lg:mt-24 lg:gap-x-12">

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="col-span-12 lg:col-span-5"
          >
            <p className="max-w-md text-[16px] leading-relaxed text-paper/70">
              I&rsquo;m a UX Analyst at SSL Wireless in Dhaka, working across banking,
              payments and platform products. If you&rsquo;re building something where
              clarity actually matters, I&rsquo;d like to hear about it.
            </p>

            <a
              href={meta.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-9 inline-flex items-center gap-3 overflow-hidden rounded-full bg-paper px-8 py-4 text-sm font-semibold text-ink-primary transition-transform active:scale-95"
            >
              <span className="absolute inset-0 translate-y-full bg-accent transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-paper">
                Start a conversation
              </span>
              <span className="relative z-10 transition-all duration-300 group-hover:translate-x-1 group-hover:text-paper" aria-hidden="true">↗</span>
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
                className="group flex items-baseline justify-between gap-6 border-b border-paper/15 py-5 transition-colors hover:border-accent"
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/50">
                  {c.label}
                </dt>
                <dd className="flex items-baseline gap-3 font-display text-[1.15rem] font-medium tracking-tight text-paper transition-colors group-hover:text-accent sm:text-[1.4rem]">
                  {c.value}
                  <span className="text-accent opacity-40 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" aria-hidden="true">↗</span>
                </dd>
              </a>
            ))}

            <div className="flex items-baseline justify-between gap-6 border-b border-paper/15 py-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/50">Based in</span>
              <span className="font-display text-[1.15rem] font-medium tracking-tight text-paper sm:text-[1.4rem]">
                {meta.location}
              </span>
            </div>
          </motion.dl>
        </div>
      </div>
    </section>
  )
}
