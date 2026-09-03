import { motion, useReducedMotion } from 'framer-motion'
import Eyebrow from './Eyebrow'

/* ─────────────────────────────────────────────────────────────────────────────
   Approach and journey — two columns, straight from her mockup.

   LEFT is how she works, as four steps with a ringed mark each. It is the
   process companion to "What I'm good at" further down: this is the order she
   moves in, that is the evidence it produced. Kept separate on purpose, because
   collapsing them would turn four clean steps into four claims.

   RIGHT is the timeline. The mockup adds two things the site did not have and
   could not have invented: the degree (BSc CSE, Daffodil International
   University) and a forward-looking last entry. Both are here.

   The employment years come from `data/portfolio.js`, not from the mockup,
   where they were rounded — Streams Tech is Apr 2018 to Apr 2020 in the data
   and "2019 – 2021" in the picture. Real dates win over a mockup's shorthand.

   The connector is one absolutely positioned line behind the dots rather than a
   border on each row, so the last dot terminates the line instead of trailing
   a stub past it.
   ───────────────────────────────────────────────────────────────────────────── */
const STEPS = [
  {
    title: 'Ask better questions',
    body: 'I start with curiosity to understand people, problems, and possibilities.',
    icon: (p) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
        <path d="M9.2 9a2.9 2.9 0 1 1 4.3 2.5c-.9.6-1.5 1.2-1.5 2.2" />
        <path d="M12 17.6h.01" />
      </svg>
    ),
  },
  {
    title: 'Look a little closer',
    body: 'I dive into details, connect the dots, and uncover what truly matters.',
    icon: (p) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
        <path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12Z" />
        <circle cx="12" cy="12" r="2.6" />
      </svg>
    ),
  },
  {
    title: 'Make, test, refine',
    body: 'I iterate fast, learn continuously, and refine until it feels just right.',
    icon: (p) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
        <path d="M4 20s1.4-4.2 3.8-6.6l8-8a2 2 0 0 1 2.8 2.8l-8 8C8.2 18.6 4 20 4 20Z" />
        <path d="M9.4 13.4l1.2 1.2" />
      </svg>
    ),
  },
  {
    title: 'Create with purpose',
    body: 'I design with empathy and clarity to deliver value that lasts.',
    icon: (p) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
        <path d="M12 3.5l1.7 4.9 4.9 1.7-4.9 1.7L12 16.7l-1.7-4.9L5.4 10l4.9-1.7L12 3.5Z" />
        <path d="M18.5 16.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z" />
      </svg>
    ),
  },
]

const JOURNEY = [
  {
    period: '2016 – 2019',
    title: 'Academic Foundation',
    body: 'BSc in Computer Science & Engineering, Daffodil International University.',
  },
  {
    period: 'Apr 2018 – Apr 2020',
    title: 'Early Career',
    body: 'UI Engineer at Streams Tech. Started in UI/UX design and front-end development, working on web and product interfaces.',
  },
  {
    period: 'Apr 2020 – Present',
    title: 'UX Analyst at SSL Wireless',
    body: 'Designing complex banking, healthcare, merchant and enterprise products in Dhaka.',
    current: true,
  },
  {
    period: 'Beyond',
    title: 'What&rsquo;s next',
    body: 'Continuously learning, exploring new ideas, and building meaningful digital experiences.',
  },
]

export default function Approach() {
  const reduce = useReducedMotion()
  const reveal = (d = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-12%' },
          transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
        }

  return (
    <section id="approach" className="relative border-t border-white/10">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid grid-cols-12 gap-y-16 lg:gap-x-20">

          {/* How I approach my work */}
          <div className="col-span-12 lg:col-span-6">
            <motion.div {...reveal()}>
              <Eyebrow className="mb-10">How I approach my work</Eyebrow>
            </motion.div>

            <ol className="flex flex-col gap-8">
              {STEPS.map((s, i) => {
                const Mark = s.icon
                return (
                  <motion.li key={s.title} {...reveal(0.05 + i * 0.05)} className="flex gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.03]">
                      <Mark className="h-5 w-5 text-hero-hot" aria-hidden="true" />
                    </span>
                    <div className="pt-1">
                      <h3 className="text-[16px] font-semibold leading-snug text-hero-ink">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 max-w-sm text-[14px] leading-relaxed text-hero-mute">
                        {s.body}
                      </p>
                    </div>
                  </motion.li>
                )
              })}
            </ol>
          </div>

          {/* The journey so far */}
          <div className="col-span-12 lg:col-span-6">
            <motion.div {...reveal(0.05)}>
              <Eyebrow className="mb-10">The journey so far</Eyebrow>
            </motion.div>

            <ol className="relative flex flex-col gap-9 pl-8">
              {/* One connector behind the dots, stopping at the last one. */}
              <span
                aria-hidden
                className="absolute left-[5px] top-2 bottom-6 w-px bg-white/12"
              />
              {JOURNEY.map((j, i) => (
                <motion.li key={j.title} {...reveal(0.08 + i * 0.05)} className="relative">
                  <span
                    aria-hidden
                    className={`absolute -left-8 top-1.5 h-[11px] w-[11px] rounded-full border-2 ${
                      j.current
                        ? 'border-hero-hot bg-hero-hot'
                        : 'border-white/25 bg-hero-void'
                    }`}
                  />
                  <p
                    className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
                      j.current ? 'text-hero-hot' : 'text-hero-mute'
                    }`}
                  >
                    {j.period}
                  </p>
                  <h3
                    className="mt-1.5 text-[16px] font-semibold leading-snug text-hero-ink"
                    dangerouslySetInnerHTML={{ __html: j.title }}
                  />
                  <p className="mt-1.5 max-w-md text-[14px] leading-relaxed text-hero-mute">
                    {j.body}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
