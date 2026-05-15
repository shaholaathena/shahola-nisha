import { motion } from 'framer-motion'

const icons = {
  search: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  map: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 2L2 4V14L6 12L10 14L14 12V2L10 4L6 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6 2V12M10 4V14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  lightbulb: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2C5.79 2 4 3.79 4 6C4 7.5 4.8 8.8 6 9.5V11H10V9.5C11.2 8.8 12 7.5 12 6C12 3.79 10.21 2 8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6 13H10M7 11V13M9 11V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  layers: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 8L8 11L14 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 5L8 8L14 5L8 2L2 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M2 11L8 14L14 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  check: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  rocket: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2C8 2 12 4 12 8C12 10.5 10.5 12 10.5 12H5.5C5.5 12 4 10.5 4 8C4 4 8 2 8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6 12L5 15L8 13L11 15L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="8" cy="8" r="1.5" fill="currentColor" />
    </svg>
  ),
}

export default function ProcessIndicator({ phase, index, isLast = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col"
    >
      {/* Connector line (desktop) */}
      {!isLast && (
        <div
          className="absolute top-5 left-[50%] hidden lg:block"
          style={{ width: 'calc(100% - 40px)', height: '1px', background: 'linear-gradient(to right, rgba(0,0,0,0.15), rgba(0,0,0,0.03))', transform: 'translateX(20px)' }}
          aria-hidden="true"
        />
      )}

      {/* Phase node */}
      <div className="flex flex-col items-center lg:items-start gap-4">
        <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-lg border border-border-strong bg-zinc-900 text-white group-hover:text-zinc-300 transition-colors mx-auto lg:mx-0">
          {icons[phase.icon]}
        </div>

        {/* Content */}
        <div className="text-center lg:text-left">
          <div className="text-[10px] font-mono text-ink-muted mb-1.5">{phase.phase}</div>
          <h3 className="font-display font-semibold text-sm text-ink-primary mb-1.5">{phase.title}</h3>
          <p className="text-xs text-ink-muted leading-relaxed">{phase.description}</p>
          <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] text-ink-faint font-mono">
            <div className="w-1.5 h-1.5 rounded-full bg-ink-faint" />
            {phase.duration}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
