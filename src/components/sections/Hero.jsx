import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { stats } from '../../data/portfolio'

const EASE = [0.16, 1, 0.3, 1]

const modes = {
  product: {
    label: 'PRODUCT',
    eyebrow: '01 / PRODUCT DESIGN',
    title: <>I make complex<br /><em>products feel clear.</em></>,
    copy: 'Banking, fintech and digital platforms designed around how people actually move through them.',
  },
  systems: {
    label: 'SYSTEMS',
    eyebrow: '02 / DESIGN SYSTEMS',
    title: <>I build systems<br /><em>that stay coherent.</em></>,
    copy: 'Tokens, components and patterns that let multiple products grow without losing their identity.',
  },
  interaction: {
    label: 'INTERACTION',
    eyebrow: '03 / INTERACTION DESIGN',
    title: <>I design the<br /><em>space between screens.</em></>,
    copy: 'Motion, feedback and behavior used to make interfaces easier to understand and nicer to use.',
  },
}

const flowItems = [
  { label: 'Amount', value: '৳ 25,000', type: 'field' },
  { label: 'To', value: 'NCC Bank •••• 4821', type: 'field' },
  { label: 'Review', value: 'Ready to send', type: 'action' },
]

export default function Hero() {
  const ref = useRef(null)
  const [mode, setMode] = useState('product')
  const [activeFlow, setActiveFlow] = useState(0)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const objectX = useSpring(useTransform(pointerX, [-800, 800], [-14, 14]), { stiffness: 80, damping: 20 })
  const objectY = useSpring(useTransform(pointerY, [-600, 600], [-10, 10]), { stiffness: 80, damping: 20 })
  const content = modes[mode]

  const handlePointerMove = (event) => {
    pointerX.set(event.clientX - window.innerWidth / 2)
    pointerY.set(event.clientY - window.innerHeight / 2)
  }

  const scrollToWork = () => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section ref={ref} id="hero" onPointerMove={handlePointerMove} className="relative min-h-screen overflow-hidden bg-[#f3f0e9] text-[#111]">
      <div className="pointer-events-none absolute inset-0 opacity-[.035] bg-grid-subtle" />
      <div className="pointer-events-none absolute -right-[12vw] top-[4vh] select-none font-display text-[34vw] font-semibold leading-none tracking-[-.12em] text-black/[.025]" aria-hidden="true">01</div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1700px] flex-col px-6 pb-7 pt-28 lg:px-12 lg:pt-32">
        <header className="flex items-center justify-between border-b border-black/10 pb-5 text-[10px] font-semibold uppercase tracking-[.22em] text-black/45">
          <span>Shahola Nisha</span>
          <span className="hidden md:block">Product Designer / UX Engineer</span>
          <span>Dhaka / 2026</span>
        </header>

        <div className="grid flex-1 items-center gap-14 py-14 lg:grid-cols-[minmax(0,1fr)_480px] lg:gap-16 lg:py-10">
          <div className="max-w-[980px]">
            <motion.p key={content.eyebrow} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, ease: EASE }} className="mb-7 text-[10px] font-semibold uppercase tracking-[.26em] text-black/40">{content.eyebrow}</motion.p>

            <motion.h1 key={mode} initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, ease: EASE }} className="font-display text-[clamp(4rem,8.1vw,9rem)] font-medium leading-[.83] tracking-[-.085em]">
              {content.title}
            </motion.h1>

            <div className="mt-10 flex max-w-2xl flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
              <motion.p key={`${mode}-copy`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .4, delay: .1 }} className="max-w-md text-[15px] leading-7 text-black/55">{content.copy}</motion.p>
              <button onClick={scrollToWork} className="group flex shrink-0 items-center gap-3 text-[10px] font-semibold uppercase tracking-[.18em]">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-black/20 transition-all duration-300 group-hover:bg-black group-hover:text-white">↓</span>
                <span className="border-b border-black/20 pb-1 group-hover:border-black">Enter the work</span>
              </button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[480px] lg:mr-2">
            <motion.div style={{ x: objectX, y: objectY }} className="relative">
              <div className="mb-3 flex items-end justify-between px-1">
                <span className="text-[9px] font-semibold uppercase tracking-[.2em] text-black/35">Live interface / 001</span>
                <span className="flex items-center gap-2 text-[9px] uppercase tracking-[.16em] text-black/35"><i className="h-1.5 w-1.5 rounded-full bg-[#6e56d8]" /> Interactive</span>
              </div>

              <motion.div layout className="relative overflow-hidden border border-black/12 bg-[#ebe8e0] shadow-[0_30px_90px_rgba(20,20,20,.12)]">
                <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
                  <span className="text-sm font-semibold tracking-tight">Transfer</span>
                  <span className="text-[9px] uppercase tracking-[.18em] text-black/35">Merchant / Bank</span>
                </div>

                <div className="p-5 sm:p-7">
                  <div className="mb-7 flex items-end justify-between">
                    <div>
                      <p className="mb-2 text-[9px] uppercase tracking-[.18em] text-black/35">Send money</p>
                      <p className="font-display text-4xl tracking-[-.04em]">৳ 25,000</p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white text-sm">↗</div>
                  </div>

                  <div className="space-y-2">
                    {flowItems.map((item, index) => (
                      <button key={item.label} onClick={() => setActiveFlow(index)} className={`group flex w-full items-center justify-between border px-4 py-4 text-left transition-all duration-300 ${activeFlow === index ? 'border-black bg-white' : 'border-black/8 bg-[#f5f2eb] hover:border-black/20'}`}>
                        <span>
                          <span className="block text-[9px] uppercase tracking-[.16em] text-black/35">{item.label}</span>
                          <span className="mt-1 block text-sm font-medium">{item.value}</span>
                        </span>
                        <span className={`text-xs transition-transform duration-300 ${activeFlow === index ? 'translate-x-0 text-black' : '-translate-x-1 text-black/20 group-hover:translate-x-0'}`}>→</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-5">
                    <span className="text-[9px] uppercase tracking-[.16em] text-black/35">Designed for clarity</span>
                    <span className="font-mono text-[9px] text-black/40">0{activeFlow + 1} / 03</span>
                  </div>
                </div>
              </motion.div>

              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-5 -left-5 border border-black/10 bg-black px-5 py-4 text-white shadow-xl">
                <span className="block text-[8px] uppercase tracking-[.2em] text-white/45">Experience</span>
                <span className="mt-1 block text-sm font-medium">8+ years / interfaces</span>
              </motion.div>

              <div className="absolute -right-8 top-12 hidden w-24 border-t border-black/15 pt-3 text-[8px] uppercase leading-5 tracking-[.17em] text-black/35 sm:block">Banking<br />Fintech<br />Platforms</div>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-black/10 pt-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-5">
            {Object.entries(modes).map(([key, item], index) => (
              <button key={key} onClick={() => setMode(key)} className={`flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[.18em] transition-colors ${mode === key ? 'text-black' : 'text-black/30 hover:text-black/70'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${mode === key ? 'bg-[#6e56d8]' : 'border border-black/25'}`} />
                0{index + 1} / {item.label}
              </button>
            ))}
          </div>
          <div className="flex gap-7 text-[9px] uppercase tracking-[.18em] text-black/35">
            {stats.slice(0, 3).map((stat) => <span key={stat.label}><strong className="text-black/70">{stat.value}</strong> {stat.label}</span>)}
          </div>
        </div>
      </div>
    </section>
  )
}
