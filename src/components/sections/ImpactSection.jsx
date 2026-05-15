import { motion } from 'framer-motion'
import { metrics } from '../../data/portfolio'
import MetricsCard from '../ui/MetricsCard'

const MiniBarChart = () => (
  <svg viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {[28, 36, 22, 44, 32, 48, 40, 36, 44, 42].map((h, i) => (
      <rect
        key={i}
        x={2 + i * 12}
        y={48 - h}
        width={9}
        height={h}
        rx="2"
        fill={i >= 7 ? '#1a1a1a' : 'rgba(0,0,0,0.08)'}
        opacity={i >= 7 ? 0.7 : 1}
      />
    ))}
  </svg>
)

export default function ImpactSection() {
  return (
    <section id="impact" className="py-28 lg:py-36 border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-6 bg-zinc-800/50" />
              <span className="text-xs font-semibold text-zinc-500 tracking-widest uppercase">Impact</span>
            </div>
            <h2 className="font-display text-4xl sm:text-ink-faintxl font-semibold text-ink-primary tracking-tight leading-tight">
              Numbers that matter.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm text-ink-muted max-w-xs leading-relaxed lg:text-right"
          >
            A snapshot of experience, client highlights, and product categories from the portfolio.
          </motion.p>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {metrics.map((metric, i) => (
            <MetricsCard key={metric.label} metric={metric} index={i} />
          ))}
        </div>

        {/* Decorative data viz row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card-surface p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6"
        >
          <div className="flex-shrink-0 w-32">
            <MiniBarChart />
          </div>
          <div className="w-px h-12 bg-black/[0.07] self-stretch hidden sm:block" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium text-ink-primary mb-1">Client highlights</p>
            <p className="text-xs text-ink-muted leading-relaxed">
              Portfolio work includes Basic Bank, UNDP, BAT, Othership, easyMerchant, Easy Health, Star Cineplex, SSLCommerz, Pepsi, Coca-Cola, and more.
            </p>
          </div>
          <div className="sm:ml-auto flex-shrink-0">
            <div className="text-xs font-mono text-ink-muted px-3 py-1.5 rounded border border-border-subtle">
              Portfolio snapshot
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
