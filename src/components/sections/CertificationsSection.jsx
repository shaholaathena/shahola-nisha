import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]
const VP = { once: true, margin: '-80px' }

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
    year: '2024',
    url: null,
  },
]

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-16 lg:py-24 border-t border-border-subtle bg-surface-base">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-6 bg-zinc-800/50" />
              <span className="text-xs font-semibold text-zinc-500 tracking-widest uppercase">Credentials</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={VP}
                transition={{ duration: 0.75, ease: EASE, delay: 0.07 }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-primary tracking-tight leading-[1.1]"
              >
                Certifications.
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.55, ease: EASE, delay: 0.13 }}
            className="text-base text-ink-muted max-w-xs leading-relaxed sm:text-right"
          >
            Verified credentials in UX design, research, and emerging technology.
          </motion.p>
        </div>

        {/* List */}
        <div className="divide-y divide-zinc-100">
          {certs.map((cert, i) => {
            const isLink = !!cert.url
            const Tag = isLink ? motion.a : motion.div
            const linkProps = isLink
              ? { href: cert.url, target: '_blank', rel: 'noreferrer' }
              : {}

            return (
              <Tag
                key={i}
                {...linkProps}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
                className="group flex items-center gap-6 sm:gap-10 py-7 hover:bg-zinc-50/70 transition-colors duration-200 rounded-xl px-5 -mx-5 cursor-default"
                style={{ cursor: isLink ? 'pointer' : 'default' }}
              >
                {/* Index */}
                <span className="text-base font-mono text-zinc-300 w-10 flex-shrink-0 hidden lg:block select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400 mb-1.5">
                    {cert.issuer}
                    <span className="mx-2 text-zinc-300">·</span>
                    {cert.platform}
                  </p>
                  <h3 className="text-[15px] sm:text-base font-semibold text-zinc-900 leading-snug group-hover:text-black transition-colors duration-200 truncate sm:whitespace-normal">
                    {cert.title}
                  </h3>
                </div>

                {/* Year + action */}
                <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
                  <span className="text-sm font-mono text-zinc-400 hidden sm:block">
                    {cert.year}
                  </span>
                  {isLink ? (
                    <div className="w-9 h-9 rounded-full border border-zinc-200 bg-white flex items-center justify-center group-hover:bg-zinc-900 group-hover:border-zinc-900 transition-all duration-300 shadow-sm">
                      <svg
                        width="12" height="12"
                        viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5"
                        strokeLinecap="round" strokeLinejoin="round"
                        className="text-zinc-500 group-hover:text-white transition-colors duration-300"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-full border border-zinc-100 bg-zinc-50 flex items-center justify-center opacity-40">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                    </div>
                  )}
                </div>

              </Tag>
            )
          })}
        </div>

      </div>
    </section>
  )
}
