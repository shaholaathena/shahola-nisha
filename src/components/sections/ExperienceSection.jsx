import { motion, useReducedMotion } from 'framer-motion'
import { experience } from '../../data/portfolio'

const EASE = [0.22, 1, 0.36, 1]
const VP = { once: true, margin: '-15%' }

/* Capabilities grouped by where they sit in the work, so the list reads as a
   practice rather than a keyword dump. The third column is the differentiator. */
const CAPABILITIES = [
  {
    group: 'Research & definition',
    items: ['User research', 'Stakeholder interviews', 'Journey mapping', 'Information architecture', 'Flow design'],
  },
  {
    group: 'Design & systems',
    items: ['Interface design', 'Design systems', 'Design tokens', 'Prototyping', 'Usability review', 'Accessibility'],
  },
  {
    group: 'Build',
    items: ['HTML & CSS', 'JavaScript', 'React', 'Tailwind', 'Framer Motion', 'Design-to-code handoff'],
  },
]

function Reveal({ children, delay = 0, className = '' }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24, filter: 'blur(5px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={VP}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative bg-surface-base py-24 lg:py-36">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">

        {/* ── Masthead ── */}
        <Reveal className="mb-14 lg:mb-20">
          <div className="flex items-end justify-between border-t border-ink-primary pt-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] tabular-nums text-ink-muted">
              Practice
            </span>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted sm:block">
              Experience &amp; capabilities
            </span>
          </div>
        </Reveal>

        {/* ── Experience, set as records rather than a timeline graphic ── */}
        <div className="border-t border-border-default">
          {experience.map((role, i) => (
            <Reveal key={role.company} delay={i * 0.08}>
              <article className="grid grid-cols-12 gap-x-4 gap-y-4 border-b border-border-default py-9 sm:gap-x-8 lg:py-12">
                {/* period */}
                <div className="col-span-12 sm:col-span-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] tabular-nums text-ink-muted">
                    {role.period}
                  </span>
                </div>

                {/* company + role */}
                <div className="col-span-12 sm:col-span-5">
                  <h3 className="font-display text-[clamp(1.6rem,3.2vw,2.6rem)] font-medium leading-[1.02] tracking-[-0.02em] text-ink-primary">
                    {role.company}
                  </h3>
                  <p className="mt-2 text-[14px] font-semibold text-accent">{role.role}</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted">
                    {role.location}
                  </p>
                </div>

                {/* detail */}
                <div className="col-span-12 sm:col-span-4">
                  <p className="text-[14px] leading-relaxed text-ink-secondary">{role.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5">
                    {role.highlights.map((h) => (
                      <li key={h} className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* ── Capabilities ── */}
        <div className="mt-20 lg:mt-28">
          <Reveal>
            <div className="mb-10 flex items-center gap-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">
                What I do
              </span>
              <span className="h-px flex-1 bg-border-default" />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-3">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.group} delay={i * 0.1}>
                <div>
                  <h3 className="font-display text-[1.35rem] font-medium leading-tight tracking-tight text-ink-primary">
                    {c.group}
                  </h3>
                  <span className="mt-4 mb-4 block h-px w-10 bg-accent" />
                  <ul className="space-y-2">
                    {c.items.map((item) => (
                      <li key={item} className="text-[14px] leading-snug text-ink-secondary">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
