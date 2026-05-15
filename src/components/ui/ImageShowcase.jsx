import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const screens = [
  {
    id: 'overview',
    label: 'Overview',
    description: 'Executive summary with KPI visibility',
  },
  {
    id: 'transactions',
    label: 'Transactions',
    description: 'Real-time transaction feed with filtering',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    description: 'Deep-dive trend and segmentation analysis',
  },
  {
    id: 'alerts',
    label: 'Alerts',
    description: 'Configurable threshold and anomaly detection',
  },
]

const OverviewScreen = () => (
  <svg viewBox="0 0 640 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
    <rect width="640" height="380" fill="#0a0a0a" />
    <rect width="640" height="44" fill="#0d0d0d" />
    <rect x="16" y="15" width="60" height="14" rx="3" fill="rgba(255,255,255,0.35)" opacity="0.4" />
    <rect x="84" y="15" width="44" height="14" rx="3" fill="rgba(255,255,255,0.07)" />
    <rect x="136" y="15" width="44" height="14" rx="3" fill="rgba(255,255,255,0.07)" />
    <rect x="188" y="15" width="44" height="14" rx="3" fill="rgba(255,255,255,0.07)" />
    <rect x="496" y="12" width="120" height="20" rx="4" fill="rgba(255,255,255,0.35)" opacity="0.2" />
    {[0,1,2,3].map(i => (
      <g key={i}>
        <rect x={16 + i * 155} y="60" width="143" height="72" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <rect x={28 + i * 155} y="72" width="60" height="9" rx="2" fill="rgba(255,255,255,0.1)" />
        <rect x={28 + i * 155} y="87" width="90" height="20" rx="3" fill={i === 0 ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.22)'} opacity={i === 0 ? 0.65 : 1} />
        <rect x={28 + i * 155} y="112" width="50" height="8" rx="2" fill={i === 0 ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.08)'} opacity={0.4} />
        {i === 0 && <rect x={130 + i * 155} y="68" width="22" height="10" rx="2" fill="rgba(255,255,255,0.1)" />}
      </g>
    ))}
    <rect x="16" y="148" width="400" height="210" rx="6" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
    <rect x="28" y="160" width="100" height="11" rx="2" fill="rgba(255,255,255,0.12)" />
    <rect x="28" y="177" width="44" height="8" rx="2" fill="rgba(255,255,255,0.06)" />
    <rect x="80" y="177" width="44" height="8" rx="2" fill="rgba(255,255,255,0.35)" opacity="0.35" />
    {[0,1,2,3].map(i => <line key={i} x1="28" y1={220 + i * 32} x2="404" y2={220 + i * 32} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />)}
    <polyline points="32,330 82,298 132,306 182,274 232,245 282,256 332,228 382,238 406,232" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
    <polyline points="32,330 82,298 132,306 182,274 232,245 282,256 332,228 382,238 406,232 406,350 32,350" fill="rgba(255,255,255,0.35)" opacity="0.07" />
    <polyline points="32,338 82,334 132,330 182,326 232,320 282,322 332,315 382,318 406,316" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="232" cy="245" r="4" fill="rgba(255,255,255,0.35)" />
    <rect x="424" y="148" width="200" height="210" rx="6" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
    <rect x="436" y="160" width="80" height="11" rx="2" fill="rgba(255,255,255,0.12)" />
    <rect x="436" y="183" width="176" height="1" fill="rgba(255,255,255,0.06)" />
    {[0,1,2,3,4,5].map(i => (
      <g key={i}>
        <rect x="436" y={192 + i * 24} width="100" height="9" rx="2" fill="rgba(255,255,255,0.07)" />
        <rect x="546" y={192 + i * 24} width="52" height="9" rx="2" fill={i <= 1 ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.05)'} opacity={i <= 1 ? 0.4 : 1} />
      </g>
    ))}
  </svg>
)

const TransactionsScreen = () => (
  <svg viewBox="0 0 640 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
    <rect width="640" height="380" fill="#0a0a0a" />
    <rect width="640" height="44" fill="#0d0d0d" />
    <rect x="16" y="15" width="60" height="14" rx="3" fill="rgba(255,255,255,0.07)" />
    <rect x="84" y="15" width="44" height="14" rx="3" fill="rgba(255,255,255,0.35)" opacity="0.4" />
    <rect x="28" y="60" width="200" height="28" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    <rect x="38" y="69" width="80" height="10" rx="2" fill="rgba(255,255,255,0.1)" />
    <rect x="238" y="60" width="100" height="28" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    <rect x="248" y="69" width="60" height="10" rx="2" fill="rgba(255,255,255,0.07)" />
    <rect x="348" y="60" width="80" height="28" rx="4" fill="rgba(255,255,255,0.35)" opacity="0.15" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
    <rect x="358" y="69" width="40" height="10" rx="2" fill="rgba(255,255,255,0.35)" opacity="0.5" />
    <rect x="16" y="104" width="608" height="32" rx="0" fill="rgba(255,255,255,0.04)" />
    {['Merchant', 'Amount', 'Status', 'Method', 'Time'].map((h, i) => (
      <rect key={h} x={28 + i * 118} y="115" width={i === 0 ? 60 : 48} height="8" rx="2" fill="rgba(255,255,255,0.12)" />
    ))}
    {[0,1,2,3,4,5,6,7].map(i => (
      <g key={i}>
        <rect x="16" y={136 + i * 28} width="608" height="28" fill={i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent'} />
        <rect x="28" y={144 + i * 28} width="80" height="8" rx="2" fill="rgba(255,255,255,0.1)" />
        <rect x="146" y={144 + i * 28} width="60" height="8" rx="2" fill="rgba(255,255,255,0.12)" />
        <rect x="264" y={142 + i * 28} width="52" height="12" rx="3" fill={i < 2 ? 'rgba(255,255,255,0.07)' : i < 5 ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.06)'} />
        <rect x="272" y={145 + i * 28} width="36" height="6" rx="1.5" fill={i < 2 ? 'rgba(255,255,255,0.18)' : i < 5 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.1)'} />
        <rect x="382" y={144 + i * 28} width="50" height="8" rx="2" fill="rgba(255,255,255,0.07)" />
        <rect x="500" y={144 + i * 28} width="40" height="8" rx="2" fill="rgba(255,255,255,0.06)" />
      </g>
    ))}
  </svg>
)

const AnalyticsScreen = () => (
  <svg viewBox="0 0 640 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
    <rect width="640" height="380" fill="#0a0a0a" />
    <rect width="640" height="44" fill="#0d0d0d" />
    <rect x="16" y="15" width="60" height="14" rx="3" fill="rgba(255,255,255,0.07)" />
    <rect x="84" y="15" width="44" height="14" rx="3" fill="rgba(255,255,255,0.07)" />
    <rect x="136" y="15" width="44" height="14" rx="3" fill="rgba(255,255,255,0.35)" opacity="0.4" />
    <rect x="16" y="60" width="196" height="308" rx="6" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
    <rect x="28" y="72" width="80" height="10" rx="2" fill="rgba(255,255,255,0.12)" />
    {['Total Volume', 'Avg Transaction', 'Peak Hour', 'Top Category', 'Success Rate'].map((l, i) => (
      <g key={l}>
        <rect x="28" y={94 + i * 46} width="172" height="34" rx="4" fill={i === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)'} stroke={i === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)'} strokeWidth="1" />
        <rect x="36" y={100 + i * 46} width="60" height="7" rx="1.5" fill="rgba(255,255,255,0.1)" />
        <rect x="36" y={112 + i * 46} width="90" height="10" rx="2" fill={i === 0 ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.2)'} opacity={i === 0 ? 0.6 : 1} />
      </g>
    ))}
    <rect x="228" y="60" width="396" height="200" rx="6" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
    <rect x="240" y="72" width="100" height="10" rx="2" fill="rgba(255,255,255,0.12)" />
    {[0,1,2,3].map(i => <line key={i} x1="240" y1={108 + i * 36} x2="612" y2={108 + i * 36} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />)}
    {[32, 52, 44, 68, 58, 74, 70, 88, 80, 92, 86, 96].map((h, i) => (
      <rect key={i} x={248 + i * 30} y={240 - h} width="20" height={h} rx="2" fill={i >= 9 ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.08)'} opacity={i >= 9 ? 0.7 : 1} />
    ))}
    <rect x="228" y="276" width="396" height="92" rx="6" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
    <rect x="240" y="288" width="80" height="10" rx="2" fill="rgba(255,255,255,0.12)" />
    <rect x="240" y="304" width="372" height="1" fill="rgba(255,255,255,0.05)" />
    {[0,1,2].map(i => (
      <g key={i}>
        <rect x={240 + i * 128} y="312" width="100" height="8" rx="2" fill="rgba(255,255,255,0.07)" />
        <rect x={240 + i * 128} y="326" width="70" height="22" rx="3" fill={i === 0 ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.06)'} opacity={i === 0 ? 0.3 : 1} />
      </g>
    ))}
  </svg>
)

const AlertsScreen = () => (
  <svg viewBox="0 0 640 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
    <rect width="640" height="380" fill="#0a0a0a" />
    <rect width="640" height="44" fill="#0d0d0d" />
    <rect x="16" y="15" width="60" height="14" rx="3" fill="rgba(255,255,255,0.07)" />
    <rect x="84" y="15" width="44" height="14" rx="3" fill="rgba(255,255,255,0.07)" />
    <rect x="136" y="15" width="44" height="14" rx="3" fill="rgba(255,255,255,0.07)" />
    <rect x="188" y="15" width="44" height="14" rx="3" fill="rgba(255,255,255,0.18)" opacity="0.9" />
    {[
      { color: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.15)', dot: 'rgba(255,255,255,0.7)', label: 'High — Velocity spike' },
      { color: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.1)', dot: 'rgba(255,255,255,0.5)', label: 'Medium — Off-hours activity' },
      { color: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.08)', dot: 'rgba(255,255,255,0.4)', label: 'Info — New device login' },
      { color: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.08)', dot: 'rgba(255,255,255,0.3)', label: 'Resolved — Threshold breach' },
    ].map((alert, i) => (
      <g key={i}>
        <rect x="16" y={60 + i * 52} width="608" height="44" rx="5" fill={alert.color} stroke={alert.border} strokeWidth="1" />
        <circle cx="32" cy={82 + i * 52} r="5" fill={alert.dot} />
        <rect x="44" y={74 + i * 52} width="120" height="9" rx="2" fill="rgba(255,255,255,0.2)" />
        <rect x="44" y={87 + i * 52} width="80" height="7" rx="1.5" fill="rgba(255,255,255,0.1)" />
        <rect x="530" y={76 + i * 52} width="70" height="20" rx="3" fill="rgba(255,255,255,0.06)" />
        <rect x="538" y={81 + i * 52} width="54" height="8" rx="1.5" fill="rgba(255,255,255,0.12)" />
      </g>
    ))}
    <rect x="16" y="272" width="608" height="90" rx="6" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
    <rect x="28" y="284" width="100" height="10" rx="2" fill="rgba(255,255,255,0.12)" />
    <rect x="28" y="304" width="200" height="28" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    <rect x="36" y="312" width="80" height="8" rx="2" fill="rgba(255,255,255,0.1)" />
    <rect x="238" y="304" width="100" height="28" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    <rect x="246" y="312" width="60" height="8" rx="2" fill="rgba(255,255,255,0.08)" />
    <rect x="500" y="304" width="108" height="28" rx="4" fill="rgba(255,255,255,0.35)" opacity="0.25" />
    <rect x="510" y="312" width="80" height="8" rx="2" fill="rgba(255,255,255,0.35)" opacity="0.6" />
  </svg>
)

const screenComponents = {
  overview: OverviewScreen,
  transactions: TransactionsScreen,
  analytics: AnalyticsScreen,
  alerts: AlertsScreen,
}

export default function ImageShowcase() {
  const [active, setActive] = useState('overview')
  const ActiveScreen = screenComponents[active]

  return (
    <div className="card-surface overflow-hidden">
      {/* Tab bar */}
      <div className="flex items-center gap-1 px-4 py-3 border-b border-border-subtle bg-[#050c18]">
        {screens.map((screen) => (
          <button
            key={screen.id}
            onClick={() => setActive(screen.id)}
            className={`px-4 py-1.5 text-xs font-medium rounded transition-all duration-200 ${
              active === screen.id
                ? 'text-ink-primary bg-surface-3'
                : 'text-ink-muted hover:text-ink-secondary'
            }`}
          >
            {screen.label}
          </button>
        ))}
      </div>

      {/* Screen */}
      <div className="relative overflow-hidden bg-[#0a0a0a]" style={{ height: 320 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <ActiveScreen />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Description */}
      <div className="px-5 py-4 border-t border-border-subtle flex items-center justify-between">
        <p className="text-xs text-ink-muted">
          {screens.find((s) => s.id === active)?.description}
        </p>
        <div className="flex gap-1.5">
          {screens.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${active === s.id ? 'bg-zinc-500' : 'bg-black/[0.1]'}`}
              aria-label={`Show ${s.label} screen`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
