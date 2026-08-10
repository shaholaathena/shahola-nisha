import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import heroImg from '../../assets/hero.png'
import MagneticButton from '../ui/MagneticButton'

const EASE = [0.16, 1, 0.3, 1]

const modes = [
  { label: 'PRODUCT', title: 'products', accent: 'people', copy: 'Turning complicated requirements into products people can understand.' },
  { label: 'SYSTEMS', title: 'systems', accent: 'that scale', copy: 'Designing reusable foundations that stay coherent as products grow.' },
  { label: 'INTERACTION', title: 'interactions', accent: 'that matter', copy: 'Using motion, hierarchy and feedback to make digital experiences feel obvious.' },
]

export default function Hero() {
  const [active, setActive] = useState(0)
  const ref = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 90, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 90, damping: 20 })
  const imageX = useTransform(springX, [-500, 500], [-18, 18])
  const imageY = useTransform(springY, [-500, 500], [-12, 12])
  const glowX = useTransform(springX, [-500, 500], ['25%', '75%'])
  const glowY = useTransform(springY, [-500, 500], ['25%', '70%'])
  const mode = modes[active]

  const handlePointerMove = (event) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(event.clientX - (rect.left + rect.width / 2))
    mouseY.set(event.clientY - (rect.top + rect.height / 2))
  }

  return (
    <section
      id="hero"
      ref={ref}
      onPointerMove={handlePointerMove}
      className="relative min-h-[100svh] overflow-hidden bg-[#f4f3ef] text-[#111]"
    >
      {/* A responsive field of light follows the cursor. */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{ background: `radial-gradient(600px circle at ${glowX} ${glowY}, rgba(210,199,255,.55), transparent 65%)` }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] bg-grid-subtle" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1500px] flex-col px-6 pb-8 pt-28 lg:px-12 lg:pt-32">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_430px]">
          <div className="max-w-[980px]">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .7, ease: EASE }}
              className="mb-8 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.28em] text-zinc-500"
            >
              <span className="h-px w-8 bg-black/30" />
              Shahola · Product / UX / Interaction
            </motion.p>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: .1, ease: EASE }}
                className="font-display text-[clamp(4.2rem,10.7vw,10.5rem)] font-medium leading-[.78] tracking-[-.075em]"
              >
                I design
              </motion.h1>
            </div>

            <div className="overflow-hidden">
              <motion.div
                key={mode.title}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: .7, ease: EASE }}
                className="font-display text-[clamp(4.2rem,10.7vw,10.5rem)] font-medium leading-[.78] tracking-[-.075em]"
              >
                <span className="text-zinc-400">{mode.title}</span>
                <span className="ml-3 font-serif italic text-[#876cf0]">{mode.accent}.</span>
              </motion.div>
            </div>

            <motion.p
              key={mode.copy}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .45, ease: EASE }}
              className="mt-9 max-w-xl text-sm leading-7 text-zinc-600 sm:text-base"
            >
              {mode.copy}
            </motion.p>

            <div className="mt-9 flex flex-wrap items-center gap-2">
              {modes.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`relative overflow-hidden rounded-full border px-4 py-2 text-[9px] font-semibold tracking-[.18em] transition-all duration-300 ${active === index ? 'border-black bg-black text-white' : 'border-black/15 bg-white/40 text-zinc-500 hover:border-black/35 hover:text-black'}`}
                >
                  {active === index && <motion.span layoutId="hero-mode" className="absolute inset-0 bg-black" />}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <MagneticButton strength={0.22}>
                <a
                  href="#work"
                  onClick={(e) => { e.preventDefault(); document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }) }}
                  className="group inline-flex items-center gap-3 rounded-full bg-black px-6 py-3.5 text-xs font-semibold text-white transition-transform active:scale-95"
                >
                  Explore the work
                  <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
                </a>
              </MagneticButton>
              <span className="text-[10px] uppercase tracking-[.16em] text-zinc-400">Scroll to enter the work</span>
            </div>
          </div>

          <div className="relative hidden h-[620px] lg:block">
            <motion.div
              style={{ x: imageX, y: imageY }}
              initial={{ opacity: 0, scale: .92, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.1, delay: .25, ease: EASE }}
              className="absolute right-0 top-1/2 w-[300px] -translate-y-1/2 xl:w-[350px]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[180px_180px_24px_24px] bg-[#ddd9d2] shadow-[0_30px_90px_rgba(35,25,70,.16)]">
                <img src={heroImg} alt="Shahola" className="h-full w-full object-cover object-center grayscale" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111]/45 via-transparent to-white/10 mix-blend-multiply" />
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: .7, delay: .8, ease: EASE }}
                className="absolute -left-20 top-20 rounded-full border border-black/10 bg-[#f4f3ef]/80 px-4 py-2 backdrop-blur-md"
              >
                <span className="text-[9px] font-semibold uppercase tracking-[.18em]">Based in Dhaka · 2026</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-5 -left-14 flex h-24 w-24 items-center justify-center rounded-full bg-[#876cf0] text-center text-[9px] font-semibold uppercase leading-4 tracking-[.14em] text-white shadow-xl"
              >
                <span>8+ years<br />making<br />interfaces</span>
              </motion.div>
            </motion.div>

            <div className="absolute bottom-0 right-0 w-32 border-t border-black/15 pt-3 text-[9px] uppercase tracking-[.18em] text-zinc-400">
              Banking · Fintech<br />Systems · Platforms
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-end justify-between border-t border-black/10 pt-4 text-[9px] uppercase tracking-[.2em] text-zinc-400">
          <span>Scroll</span>
          <span>01 — Introduction</span>
          <motion.span animate={{ x: [0, 7, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>↓</motion.span>
        </div>
      </div>
    </section>
  )
}
