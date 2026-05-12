import { motion } from 'framer-motion'

const floatingVariants = {
  initial: { y: 0 },
  float: {
    y: [-6, 6, -6],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export function FloatingNotification({ message, time, type = 'info', delay = 0 }) {
  const typeStyles = {
    info: { dot: 'bg-zinc-500', border: 'border-zinc-800/20' },
    success: { dot: 'bg-green-400', border: 'border-green-500/20' },
    warning: { dot: 'bg-yellow-400', border: 'border-yellow-500/20' },
  }
  const styles = typeStyles[type] || typeStyles.info

  return (
    <motion.div
      variants={floatingVariants}
      initial="initial"
      animate="float"
      style={{ animationDelay: `${delay}s` }}
      className={`card-surface px-4 py-3 flex items-center gap-3 min-w-[220px] ${styles.border}`}
    >
      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${styles.dot}`} />
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium text-ink-primary truncate">{message}</div>
        <div className="text-[10px] text-ink-muted">{time}</div>
      </div>
    </motion.div>
  )
}

export function FloatingMetric({ label, value, trend }) {
  return (
    <motion.div
      variants={floatingVariants}
      initial="initial"
      animate="float"
      className="card-surface px-5 py-4 text-center min-w-[120px]"
    >
      <div className="text-xl font-display font-semibold text-ink-primary tracking-tight">{value}</div>
      <div className="text-xs text-ink-muted mt-0.5">{label}</div>
      {trend && (
        <div className="text-[10px] text-green-400 mt-1 font-medium">{trend}</div>
      )}
    </motion.div>
  )
}

export default FloatingNotification
