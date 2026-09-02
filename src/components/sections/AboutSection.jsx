import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]
const VP = { once: true, margin: '-15%' }

/* Principles drawn from the actual case studies rather than invented for the
   page — each names a decision that shipped, so the section reads as evidence
   of thinking rather than a values statement. */
const PRINCIPLES = [
  {
    title: 'One decision per screen',
    body: 'A transfer is not one task, it is three questions. Who, how much, confirm. Splitting them cost an extra tap and removed a whole class of error.',
    source: 'myBKB — Bangladesh Krishi Bank',
  },
  {
    title: 'Separate what changes from what never does',
    body: 'Five banks ship the same merchant app under five brands. That only holds because components bind to meaning, never to a colour. The rule matters more than any component.',
    source: 'Bangla QR Merchant Platform',
  },
  {
    title: 'Sequence is a design tool',
    body: 'Setting up payments is the step a shop owner is most likely to abandon. Putting it after identity and delivery meant it arrived once there was momentum to spend.',
    source: 'ZCOMMERZ',
  },
]

/* Real institutions the work has shipped into. Substance in place of decoration. */
const CLIENTS = [
  'Bangladesh Krishi Bank', 'Southeast Bank', 'NCC Bank', 'Rupali Bank',
  'Janata Bank', 'Basic Bank', 'SSLCOMMERZ', 'UNDP', 'BAT', 'Easy Health', 'Willro',
]

function Reveal({ children, delay = 0, className = '' }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-surface-1 py-24 lg:py-36">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">

        <Reveal className="mb-14 lg:mb-20">
          <div className="flex items-end justify-between border-t border-ink-primary pt-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">
              About
            </span>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted sm:block">
              Dhaka · Since 2018
            </span>
          </div>
        </Reveal>

        {/* Statement — full measure, no competing image */}
        <Reveal>
          <h2 className="max-w-[18ch] font-display text-[clamp(2.1rem,6vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ink-primary">
            I design for people stepping into digital money for the{' '}
            <em className="not-italic font-semibold text-accent decoration-accent/30 underline underline-offset-[6px]">first time</em>.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-12 gap-y-12 lg:mt-20 lg:gap-x-12">
          <Reveal delay={0.08} className="col-span-12 lg:col-span-7">
            <div className="grid max-w-3xl grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
              <p className="text-[15px] leading-relaxed text-ink-secondary">
                Eight years in, most of my work has been in places where a mistake
                costs someone real money — a farmer moving funds in rural Bangladesh,
                a shopkeeper taking their first digital payment. That raises the bar
                on clarity in a way a marketing site never does.
              </p>
              <p className="text-[15px] leading-relaxed text-ink-secondary">
                I work across research, flows, interface and design systems, and I
                write front-end code. Being able to build what I draw means fewer
                decisions get quietly renegotiated between the file and the release.
              </p>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-border-default pt-7 sm:grid-cols-4">
              {[
                ['Based in', 'Dhaka, BD'],
                ['Now', 'UX Analyst, SSL Wireless'],
                ['Focus', 'Fintech · Payments'],
                ['Also', 'Front-end build'],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted">{k}</dt>
                  <dd className="mt-1.5 text-[13px] font-semibold leading-snug text-ink-primary">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Client index — the column that used to hold a redundant portrait */}
          <Reveal delay={0.16} className="col-span-12 lg:col-span-4 lg:col-start-9">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                Shipped into
              </span>
              <span className="h-px flex-1 bg-border-default" />
            </div>
            <ul className="mt-5 flex flex-col">
              {CLIENTS.map((c) => (
                <li
                  key={c}
                  className="border-b border-border-subtle py-2.5 text-[14px] leading-snug text-ink-secondary"
                >
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ══ Approach ══ */}
        <div id="think" className="mt-24 lg:mt-36">
          <Reveal className="mb-12 lg:mb-16">
            <div className="flex items-end justify-between border-t border-ink-primary pt-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">
                Approach
              </span>
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted sm:block">
                Three rules that held
              </span>
            </div>
          </Reveal>

          <Reveal>
            <p className="mb-14 max-w-2xl font-display text-[clamp(1.35rem,2.6vw,2rem)] font-normal leading-[1.22] tracking-[-0.015em] text-ink-primary">
              I don&rsquo;t have a six-step process. I have a handful of rules that
              survived contact with real products.
            </p>
          </Reveal>

          <div className="border-t border-border-default">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className="grid grid-cols-12 gap-x-4 gap-y-3 border-b border-border-default py-9 sm:gap-x-8 lg:py-12">
                  <h3 className="col-span-12 font-display text-[clamp(1.5rem,3vw,2.35rem)] font-medium leading-[1.06] tracking-[-0.02em] text-ink-primary sm:col-span-6">
                    {p.title}
                  </h3>
                  <div className="col-span-12 sm:col-span-6">
                    <p className="max-w-prose text-[15px] leading-relaxed text-ink-secondary">{p.body}</p>
                    <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted">
                      {p.source}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
