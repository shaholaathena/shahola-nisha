import { motion } from 'framer-motion'

export default function Timeline({ items }) {
  return (
    <div className="relative" role="list">
      {/* Vertical line */}
      <div
        className="absolute left-[7px] top-2 bottom-2 w-px"
        style={{ background: 'linear-gradient(to bottom, rgba(59,130,246,0.4), rgba(255,255,255,0.06) 80%, transparent)' }}
        aria-hidden="true"
      />

      <div className="space-y-10" role="listitem">
        {items.map((item, index) => (
          <motion.div
            key={item.company}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative pl-8"
          >
            {/* Node */}
            <div
              className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-zinc-800/60 bg-surface-base"
              aria-hidden="true"
            >
              {index === 0 && (
                <div className="absolute inset-[3px] rounded-full bg-zinc-800/80 animate-pulse" />
              )}
            </div>

            {/* Content */}
            <div className="group">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                <div>
                  <h3 className="font-display font-semibold text-sm text-ink-primary">{item.role}</h3>
                  <div className="text-sm text-zinc-500/80 font-medium">{item.company}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs font-mono text-ink-muted">{item.period}</div>
                  <div className="text-xs text-ink-faint">{item.location}</div>
                </div>
              </div>

              <p className="text-xs text-ink-muted leading-relaxed mt-2 mb-3">
                {item.description}
              </p>

              {/* Highlight tags */}
              <div className="flex flex-wrap gap-1.5">
                {item.highlights.map((h) => (
                  <span
                    key={h}
                    className="text-[10px] px-2 py-0.5 rounded bg-black/[0.04] text-ink-muted border border-border-subtle"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
