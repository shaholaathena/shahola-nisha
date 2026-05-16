import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const DashboardMockup = ({ color, accentColor }) => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
    {/* Background */}
    <rect width="320" height="180" fill={color} rx="2" />
    {/* Top bar */}
    <rect x="0" y="0" width="320" height="28" fill="rgba(0,0,0,0.25)" />
    <rect x="10" y="9" width="40" height="10" rx="2" fill="rgba(255,255,255,0.08)" />
    <rect x="58" y="9" width="28" height="10" rx="2" fill="rgba(255,255,255,0.05)" />
    <rect x="94" y="9" width="28" height="10" rx="2" fill="rgba(255,255,255,0.05)" />
    {/* Sidebar */}
    <rect x="0" y="28" width="52" height="152" fill="rgba(0,0,0,0.2)" />
    <rect x="8" y="38" width="36" height="8" rx="2" fill={accentColor} opacity="0.4" />
    <rect x="8" y="52" width="36" height="8" rx="2" fill="rgba(255,255,255,0.06)" />
    <rect x="8" y="64" width="36" height="8" rx="2" fill="rgba(255,255,255,0.06)" />
    <rect x="8" y="76" width="36" height="8" rx="2" fill="rgba(255,255,255,0.06)" />
    {/* Main content area */}
    {/* KPI row */}
    <rect x="60" y="36" width="56" height="30" rx="3" fill="rgba(255,255,255,0.05)" />
    <rect x="64" y="40" width="20" height="6" rx="1.5" fill="rgba(255,255,255,0.12)" />
    <rect x="64" y="50" width="32" height="10" rx="2" fill={accentColor} opacity="0.7" />
    <rect x="124" y="36" width="56" height="30" rx="3" fill="rgba(255,255,255,0.05)" />
    <rect x="128" y="40" width="20" height="6" rx="1.5" fill="rgba(255,255,255,0.12)" />
    <rect x="128" y="50" width="32" height="10" rx="2" fill="rgba(255,255,255,0.25)" />
    <rect x="188" y="36" width="56" height="30" rx="3" fill="rgba(255,255,255,0.05)" />
    <rect x="192" y="40" width="20" height="6" rx="1.5" fill="rgba(255,255,255,0.12)" />
    <rect x="192" y="50" width="32" height="10" rx="2" fill="rgba(255,255,255,0.18)" />
    <rect x="252" y="36" width="56" height="30" rx="3" fill="rgba(255,255,255,0.05)" />
    <rect x="256" y="40" width="20" height="6" rx="1.5" fill="rgba(255,255,255,0.12)" />
    <rect x="256" y="50" width="32" height="10" rx="2" fill="rgba(255,255,255,0.14)" />
    {/* Chart */}
    <rect x="60" y="74" width="154" height="70" rx="3" fill="rgba(255,255,255,0.04)" />
    <rect x="64" y="78" width="40" height="6" rx="1.5" fill="rgba(255,255,255,0.1)" />
    {/* Line chart */}
    <polyline
      points="68,128 88,118 108,122 128,110 148,96 168,100 188,88 208,92"
      stroke={accentColor}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.8"
    />
    <polyline
      points="68,128 88,118 108,122 128,110 148,96 168,100 188,88 208,92 208,140 68,140"
      fill={accentColor}
      opacity="0.07"
    />
    {/* Table */}
    <rect x="222" y="74" width="86" height="70" rx="3" fill="rgba(255,255,255,0.04)" />
    <rect x="226" y="78" width="30" height="5" rx="1.5" fill="rgba(255,255,255,0.1)" />
    <rect x="226" y="88" width="78" height="1" fill="rgba(255,255,255,0.06)" />
    {[0,1,2,3,4].map(i => (
      <g key={i}>
        <rect x="226" y={93 + i * 9} width="40" height="5" rx="1" fill="rgba(255,255,255,0.07)" />
        <rect x="274" y={93 + i * 9} width="28" height="5" rx="1" fill={i === 0 ? accentColor : 'rgba(255,255,255,0.07)'} opacity={i === 0 ? 0.5 : 1} />
      </g>
    ))}
    {/* Bottom bar */}
    <rect x="60" y="150" width="246" height="22" rx="3" fill="rgba(255,255,255,0.03)" />
    <rect x="64" y="155" width="60" height="6" rx="1.5" fill="rgba(255,255,255,0.07)" />
    <rect x="130" y="155" width="40" height="6" rx="1.5" fill="rgba(255,255,255,0.05)" />
  </svg>
)

const MobileMockup = ({ color, accentColor }) => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
    <rect width="320" height="180" fill={color} rx="2" />
    {/* Phone frame */}
    <rect x="96" y="8" width="128" height="164" rx="12" fill="rgba(0,0,0,0.4)" />
    <rect x="100" y="12" width="120" height="156" rx="10" fill="rgba(0,0,0,0.3)" />
    {/* Status bar */}
    <rect x="110" y="18" width="40" height="4" rx="2" fill="rgba(255,255,255,0.12)" />
    <rect x="196" y="18" width="16" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
    {/* Header */}
    <rect x="108" y="28" width="60" height="10" rx="2" fill={accentColor} opacity="0.5" />
    {/* Balance card */}
    <rect x="108" y="44" width="104" height="42" rx="6" fill={accentColor} opacity="0.15" />
    <rect x="114" y="50" width="36" height="6" rx="1.5" fill="rgba(255,255,255,0.2)" />
    <rect x="114" y="60" width="72" height="12" rx="2" fill="rgba(255,255,255,0.35)" />
    {/* Quick actions */}
    {[0,1,2,3].map(i => (
      <g key={i}>
        <rect x={108 + i * 28} y="92" width="20" height="20" rx="10" fill="rgba(255,255,255,0.06)" />
        <rect x={111 + i * 28} y="95" width="14" height="14" rx="7" fill={i === 0 ? accentColor : 'rgba(255,255,255,0.1)'} opacity={i === 0 ? 0.5 : 1} />
      </g>
    ))}
    {/* Transactions */}
    {[0,1,2,3].map(i => (
      <g key={i}>
        <rect x="108" y={118 + i * 12} width="8" height="8" rx="4" fill="rgba(255,255,255,0.08)" />
        <rect x="120" y={120 + i * 12} width="40" height="4" rx="1" fill="rgba(255,255,255,0.1)" />
        <rect x="180" y={120 + i * 12} width="22" height="4" rx="1" fill={i === 0 ? accentColor : 'rgba(255,255,255,0.08)'} opacity={i === 0 ? 0.6 : 1} />
      </g>
    ))}
  </svg>
)

const SystemMockup = ({ color, accentColor }) => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
    <rect width="320" height="180" fill={color} rx="2" />
    {/* Component grid */}
    {[0,1,2,3].map(col => (
      [0,1,2].map(row => (
        <g key={`${col}-${row}`}>
          <rect
            x={16 + col * 76}
            y={20 + row * 52}
            width="66"
            height="44"
            rx="4"
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
          <rect x={22 + col * 76} y={28 + row * 52} width={col % 2 === 0 ? 40 : 28} height="6" rx="1.5" fill={row === 0 && col === 0 ? accentColor : 'rgba(255,255,255,0.12)'} opacity={row === 0 && col === 0 ? 0.6 : 1} />
          <rect x={22 + col * 76} y={38 + row * 52} width="50" height="4" rx="1" fill="rgba(255,255,255,0.07)" />
          <rect x={22 + col * 76} y={46 + row * 52} width="30" height="4" rx="1" fill="rgba(255,255,255,0.05)" />
        </g>
      ))
    ))}
    {/* Token swatches at bottom */}
    {[accentColor, '#6b7280', '#9ca3af', '#d1d5db', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0.15)'].map((c, i) => (
      <rect key={i} x={16 + i * 20} y="164" width="16" height="10" rx="2" fill={c} opacity="0.7" />
    ))}
  </svg>
)

const EnterpriseMockup = ({ color, accentColor }) => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
    <rect width="320" height="180" fill={color} rx="2" />
    {/* Two-panel layout */}
    <rect x="0" y="0" width="110" height="180" fill="rgba(0,0,0,0.2)" />
    {/* Left panel steps */}
    {[0,1,2,3,4].map(i => (
      <g key={i}>
        <circle cx="22" cy={30 + i * 28} r="7" fill={i <= 1 ? accentColor : 'rgba(255,255,255,0.08)'} opacity={i <= 1 ? 0.5 : 1} />
        {i < 4 && <rect x="21" y={38 + i * 28} width="2" height="12" fill="rgba(255,255,255,0.1)" />}
        <rect x="36" y={25 + i * 28} width="60" height="7" rx="1.5" fill={i <= 1 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)'} />
        <rect x="36" y={35 + i * 28} width="40" height="5" rx="1" fill="rgba(255,255,255,0.05)" />
      </g>
    ))}
    {/* Right panel form */}
    <rect x="118" y="16" width="188" height="148" rx="4" fill="rgba(255,255,255,0.03)" />
    <rect x="126" y="24" width="80" height="10" rx="2" fill="rgba(255,255,255,0.15)" />
    <rect x="126" y="38" width="170" height="28" rx="3" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    <rect x="132" y="46" width="60" height="8" rx="1.5" fill="rgba(255,255,255,0.1)" />
    <rect x="126" y="72" width="80" height="28" rx="3" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    <rect x="132" y="80" width="50" height="8" rx="1.5" fill="rgba(255,255,255,0.1)" />
    <rect x="212" y="72" width="80" height="28" rx="3" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    <rect x="218" y="80" width="50" height="8" rx="1.5" fill="rgba(255,255,255,0.1)" />
    <rect x="126" y="106" width="172" height="28" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
    <rect x="132" y="114" width="70" height="8" rx="1.5" fill="rgba(255,255,255,0.08)" />
    {/* CTA button */}
    <rect x="126" y="142" width="80" height="16" rx="3" fill={accentColor} opacity="0.7" />
    <rect x="214" y="142" width="80" height="16" rx="3" fill="rgba(255,255,255,0.06)" />
  </svg>
)

const mockupMap = {
  dashboard: DashboardMockup,
  mobile: MobileMockup,
  system: SystemMockup,
  enterprise: EnterpriseMockup,
}

export default function ProjectCard({ project, index = 0 }) {
  const Mockup = mockupMap[project.type] || DashboardMockup
  const navigate = useNavigate()

  const handleClick = () => {
    if (!project.link) return
    if (project.link.startsWith('/')) {
      navigate(project.link)
    } else if (project.link.startsWith('#')) {
      document.querySelector(project.link)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.open(project.link, '_blank', 'noopener noreferrer')
    }
  }

  return (
    <motion.article
      onClick={project.link ? handleClick : undefined}
      initial={{ opacity: 0, y: 48, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: index * 0.14 }}
      whileHover={{ y: -5 }}
      className={`group card-surface overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-zinc-900/5 hover:border-zinc-800/20 ${project.link ? 'cursor-pointer' : 'cursor-default'}`}
      style={{ minHeight: 560 }}
    >
      {/* Product mockup */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{
          height: 420,
          background: project.color,
        }}
      >
        <div className="w-full h-full transform group-hover:scale-105 group-hover:rotate-1 transition-transform duration-700 ease-out">
          {project.image ? (
            <img src={project.image} alt={project.title} className="w-full h-full object-cover object-center" />
          ) : (
            <Mockup color={project.color} accentColor={project.accentColor} />
          )}
        </div>
        {/* Overlay gradient */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(to top, ${project.color}dd 0%, transparent 80%)` }}
          aria-hidden="true"
        />
        {/* Year badge */}
        <div className="absolute top-3 right-3 px-2 py-1 text-[10px] font-medium text-white/80 bg-black/40 backdrop-blur-md rounded-md border border-white/10 shadow-sm">
          {project.year}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 bg-white">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="text-[10px] font-semibold tracking-wide px-2.5 py-1 rounded-md bg-surface-2 text-ink-secondary border border-border-subtle group-hover:border-zinc-800/20 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex-1">
          <h3 className="font-display font-bold text-lg text-ink-primary mb-2 leading-tight group-hover:text-zinc-900 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-ink-muted leading-relaxed line-clamp-2 group-hover:text-ink-secondary transition-colors">
            {project.description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 mt-2 border-t border-border-subtle group-hover:border-zinc-800/10 transition-colors">
          <div className="flex flex-col">
             <span className="text-xs font-semibold text-ink-primary">{project.company}</span>
             <span
               className="text-[10px] font-medium mt-0.5"
               style={{ color: project.accentColor }}
             >
               {project.impact}
             </span>
          </div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all transform group-hover:translate-x-1 ${project.link ? 'bg-zinc-900 text-white group-hover:bg-zinc-700' : 'bg-surface-2 text-ink-muted group-hover:bg-zinc-50 group-hover:text-zinc-900'}`}>
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
             </svg>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
