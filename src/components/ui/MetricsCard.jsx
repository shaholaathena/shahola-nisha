import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function AnimatedNumber({ value, suffix, duration = 1.8 }) {
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!isInView) return
    const startTime = performance.now()
    const isDecimal = !Number.isInteger(value)

    const animate = (now) => {
      const elapsed = (now - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * value
      setCurrent(isDecimal ? Math.round(current * 10) / 10 : Math.round(current))
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [isInView, value, duration])

  return (
    <span ref={ref}>
      {Number.isInteger(value) ? current.toLocaleString() : current.toFixed(1)}{suffix}
    </span>
  )
}

export default function MetricsCard({ metric, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="card-surface p-6 sm:p-8 flex flex-col justify-between min-h-[180px] group hover:border-border-strong transition-all duration-300"
    >
      <div className="mb-6">
        <div className="text-4xl sm:text-5xl font-display font-semibold text-ink-primary tracking-tight leading-none mb-2">
          <AnimatedNumber value={metric.value} suffix={metric.suffix} />
        </div>
        <div className="text-sm font-medium text-ink-primary leading-snug">
          {metric.label}
        </div>
      </div>

      <div>
        <p className="text-xs text-ink-muted leading-relaxed mb-4">
          {metric.description}
        </p>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#3b82f6]/70">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-800/50" />
          {metric.trend}
        </div>
      </div>
    </motion.div>
  )
}
