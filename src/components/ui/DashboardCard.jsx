import { motion } from 'framer-motion'

const SparkLine = ({ color = '#6b7280', values = [30, 45, 38, 60, 52, 70, 65, 80] }) => {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const w = 80
  const h = 28
  const points = values
    .map((v, i) => `${(i / (values.length - 1)) * w},${h - ((v - min) / range) * (h - 4) - 2}`)
    .join(' ')

  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" className="w-20 h-7" aria-hidden="true">
      <polyline points={points} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const StatusDot = ({ status }) => {
  const colors = {
    live: 'bg-zinc-400',
    review: 'bg-zinc-300',
    archived: 'bg-zinc-600',
  }
  return (
    <div className={`w-1.5 h-1.5 rounded-full ${colors[status] || colors.archived} ${status === 'live' ? 'animate-pulse' : ''}`} />
  )
}

const cards = [
  {
    title: 'Transaction Volume',
    value: '৳2.4B',
    delta: '+12.4%',
    positive: true,
    status: 'live',
    sparkValues: [40, 52, 44, 68, 58, 74, 70, 88],
    label: 'vs last month',
  },
  {
    title: 'Success Rate',
    value: '99.2%',
    delta: '+0.3pp',
    positive: true,
    status: 'live',
    sparkValues: [94, 96, 95, 97, 98, 97.5, 99, 99.2],
    label: 'rolling 30d',
  },
  {
    title: 'Avg. Settlement',
    value: '1.8s',
    delta: '-0.4s',
    positive: true,
    status: 'live',
    sparkValues: [3.2, 2.8, 2.5, 2.4, 2.2, 2.0, 1.9, 1.8],
    label: 'response time',
  },
  {
    title: 'Flagged Txns',
    value: '0.03%',
    delta: '-0.01pp',
    positive: true,
    status: 'review',
    sparkValues: [0.08, 0.07, 0.06, 0.06, 0.05, 0.04, 0.04, 0.03],
    label: 'of total volume',
  },
]

export default function DashboardCard({ className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`card-surface overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <StatusDot status="live" />
          <span className="text-xs font-medium text-ink-secondary">Payment Dashboard</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-mono text-ink-faint">
          <span>Live</span>
          <span>·</span>
          <span>Enterprise</span>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 divide-x divide-y divide-white/[0.06]">
        {cards.map((card) => (
          <div key={card.title} className="px-5 py-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="text-[10px] text-ink-muted mb-1">{card.title}</div>
                <div className="text-lg font-display font-semibold text-ink-primary tracking-tight leading-none">
                  {card.value}
                </div>
              </div>
              <SparkLine values={card.sparkValues} />
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`text-[10px] font-medium ${card.positive ? 'text-zinc-500' : 'text-zinc-400'}`}>
                {card.delta}
              </span>
              <span className="text-[10px] text-ink-faint">{card.label}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
