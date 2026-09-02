import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]
const VP = { once: true, margin: '-15%' }

const certs = [
  {
    title: 'Foundations of User Experience (UX) Design',
    issuer: 'Google',
    platform: 'Coursera',
    year: 'Jul 2023',
    url: 'https://www.coursera.org/account/accomplishments/certificate/25NSD3JFBHTH',
  },
  {
    title: 'Start the UX Design Process: Empathize, Define & Ideate',
    issuer: 'Google',
    platform: 'Coursera',
    year: 'Oct 2023',
    url: 'https://www.coursera.org/account/accomplishments/certificate/Y8U9X6EMT2HL',
  },
  {
    title: 'Conduct UX Research and Test Early Concepts',
    issuer: 'Google',
    platform: 'Coursera',
    year: 'Mar 2024',
    url: 'https://www.coursera.org/account/accomplishments/verify/VWD8EU4R5E28',
  },
  {
    title: 'Internet of Things (IoT)',
    issuer: 'Certificate of Achievement',
    platform: 'Independent',
    year: '2018',
    url: null,
  },
]

export default function CertificationsSection() {
  const reduce = useReducedMotion()

  return (
    <section id="certifications" className="relative bg-surface-1 py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-12 flex items-end justify-between border-t border-ink-primary pt-4 lg:mb-16"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] tabular-nums text-ink-muted">
            Credentials
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.24em] tabular-nums text-ink-muted sm:block">
            {String(certs.length).padStart(2, '0')} Certificates
          </span>
        </motion.div>

        {/* Set as an index, not as cards — the credential matters, not a badge. */}
        <ul className="border-t border-border-default">
          {certs.map((c, i) => {
            const Tag = c.url ? 'a' : 'div'
            return (
              <motion.li
                key={c.title}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
                className="border-b border-border-default"
              >
                <Tag
                  {...(c.url ? { href: c.url, target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`group grid grid-cols-12 items-baseline gap-x-4 gap-y-1 py-6 sm:gap-x-8 ${c.url ? 'cursor-pointer' : ''}`}
                >
                  <span className="col-span-2 font-mono text-[10px] tabular-nums text-ink-muted sm:col-span-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="col-span-10 font-display text-[1.15rem] font-medium leading-snug tracking-tight text-ink-primary transition-colors group-hover:text-accent sm:col-span-7 sm:text-[1.35rem]">
                    {c.title}
                  </h3>
                  <span className="col-span-6 col-start-3 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-muted sm:col-span-2 sm:col-start-auto">
                    {c.issuer} · {c.platform}
                  </span>
                  <span className="col-span-4 flex items-baseline justify-end gap-3 font-mono text-[9px] uppercase tracking-[0.16em] tabular-nums text-ink-muted sm:col-span-2">
                    {c.year}
                    {c.url && (
                      <span className="text-accent opacity-40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true">↗</span>
                    )}
                  </span>
                </Tag>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
