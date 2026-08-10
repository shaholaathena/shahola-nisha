import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { stats } from '../../data/portfolio'
import heroImg from '../../assets/hero.png'

const EASE = [0.16, 1, 0.3, 1]

const modes = {
  product: {
    label: 'PRODUCT DESIGN',
    title: <>I design <em>digital products</em> people don't have to think about.</>,
    copy: 'Turning complicated requirements into clear, useful experiences across banking, fintech and digital platforms.',
  },
  systems: {
    label: 'DESIGN SYSTEMS',
    title: <>I turn <em>complex systems</em> into interfaces that scale.</>,
    copy: 'From tokens and components to white-label products, I design for consistency without losing character.',
  },
  interaction: {
    label: 'INTERACTION DESIGN',
    title: <>I make <em>interfaces</em> feel natural, not decorated.</>,
    copy: 'Motion, feedback and behavior used with purpose — so every interaction communicates something.',
  },
}

export default function Hero() {
  const ref = useRef(null)
  const [mode, setMode] = useState('product')
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateX = useSpring(useTransform(pointerY, [-600, 600], [3, -3]), { stiffness: 120, damping: 22 })
  const rotateY = useSpring(useTransform(pointerX, [-800, 800], [-4, 4]), { stiffness: 120, damping: 22 })
  const imageX = useSpring(useTransform(pointerX, [-800, 800], [-10, 10]), { stiffness: 80, damping: 20 })
  const imageY = useSpring(useTransform(pointerY, [-600, 600], [-7, 7]), { stiffness: 80, damping: 20 })
  const content = modes[mode]

  const handlePointerMove = (event) => {
    pointerX.set(event.clientX - window.innerWidth / 2)
    pointerY.set(event.clientY - window.innerHeight / 2)
  }

  const scrollToWork = () => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section ref={ref} id="hero" onPointerMove={handlePointerMove} className="relative min-h-screen overflow-hidden bg-[#f3f0e9] text-[#111]">
      <div className="pointer-events-none absolute -left-[.08em] top-[15vh] select-none font-display text-[30vw] font-semibold leading-[.7] tracking-[-.1em] text-black/[.025]" aria-hidden="true">SH</div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1700px] flex-col px-6 pb-7 pt-28 lg:px-12 lg:pt-32">
        <div className="flex items-center justify-between border-b border-black/10 pb-5 text-[10px] font-semibold uppercase tracking-[.22em] text-black/45">
          <span>Shahola Nisha</span>
          <span className="hidden md:block">Product / UX / Interaction</span>
          <span>Dhaka / 2026</span>
        </div>

        <div className="grid flex-1 items-center gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-20 lg:py-10">
          <div className="max-w-[1080px]">
            <motion.p key={content.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4, ease: EASE }} className="mb-6 text-[10px] font-semibold uppercase tracking-[.25em] text-black/40">{content.label}</motion.p>

            <motion.h1 key={mode} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, ease: EASE }} className="font-display text-[clamp(4rem,8.5vw,9.5rem)] font-medium leading-[.82] tracking-[-.085em]">
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

          <div className="relative mx-auto w-full max-w-[420px] lg:mr-4">
            <motion.div style={{ rotateX, rotateY }} className="relative [perspective:1200px]">
              <motion.div style={{ x: imageX, y: imageY }} className="relative ml-auto aspect-[.76] w-[82%] overflow-hidden bg-[#d8d3c8]">
                <motion.img src={heroImg} alt="Shahola Nisha" className="h-full w-full object-cover object-center grayscale" initial={{ scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease: EASE }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 mix-blend-multiply" />
              </motion.div>

              <div className="absolute left-0 top-[12%] flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[.2em] text-black/40 [writing-mode:vertical-rl]">
                <span className="h-12 w-px bg-black/20" /> Designing since 2018
              </div>

              <motion.div style={{ x: useTransform(pointerX, [-800, 800], [7, -7]), y: useTransform(pointerY, [-600, 600], [-5, 5]) }} className="absolute -bottom-4 -left-5 bg-black px-5 py-4 text-white">
                <span className="block text-[8px] uppercase tracking-[.2em] text-white/45">Currently</span>
                <span className="mt-1 block text-sm font-medium">Senior UX Engineer</span>
              </motion.div>

              <div className="absolute -right-1 top-0 text-right text-[9px] font-semibold uppercase leading-5 tracking-[.18em] text-black/40">Banking<br />Fintech<br />Platforms</div>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-black/10 pt-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            {Object.entries(modes).map(([key, item], index) => (
              <button key={key} onClick={() => setMode(key)} className={`flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[.18em] transition-colors ${mode === key ? 'text-black' : 'text-black/30 hover:text-black/70'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${mode === key ? 'bg-black' : 'bg-transparent border border-black/25'}`} />
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
