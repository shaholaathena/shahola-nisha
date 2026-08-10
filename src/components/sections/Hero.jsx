import { useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import RevealLines from '../ui/RevealLines'

const focusAreas = [
  'PRODUCT DESIGN',
  'UX & INTERACTION',
  'DESIGN SYSTEMS',
  'FRONTEND & PROTOTYPES',
]

export default function Hero() {
  const reduce = useReducedMotion()
  // -1 = nothing highlighted; the strip only responds to hover/focus.
  const [focus, setFocus] = useState(-1)

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const x = useSpring(pointerX, { stiffness: 55, damping: 20 })
  const y = useSpring(pointerY, { stiffness: 55, damping: 20 })

  const handlePointerMove = (event) => {
    if (reduce) return
    pointerX.set((event.clientX / window.innerWidth - 0.5) * 18)
    pointerY.set((event.clientY / window.innerHeight - 0.5) * 12)
  }

  const scrollToWork = () => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      onPointerMove={handlePointerMove}
      className="relative min-h-screen overflow-hidden bg-[#f5f2eb] text-[#111]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] bg-grid-subtle" />

      {/* A field of warm light trailing the cursor — the page reacts before
          anything is clicked. */}
      <motion.div
        aria-hidden="true"
        style={{ x, y }}
        className="pointer-events-none absolute -inset-32 opacity-70"
      >
        <div className="absolute left-[58%] top-[22%] h-[36rem] w-[36rem] rounded-full bg-[#e6dcc6] blur-[120px]" />
      </motion.div>

      <div className="relative mx-auto flex min-h-screen max-w-[1600px] flex-col px-7 pb-6 pt-24 sm:px-10 lg:px-14">

        {/* Main editorial composition */}
        <div className="relative flex flex-1 items-center py-6 lg:py-8">
          <div className="w-full">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-7 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/55"
            >
              <span className="h-px w-8 bg-black/30" />
              Hello, I&rsquo;m
            </motion.p>

            <RevealLines
              as="h1"
              trigger="mount"
              delay={0.1}
              duration={1.1}
              lines={['Shahola.']}
              // Sized off width AND height: on a short laptop the name scales
              // down so the focus strip still clears the fold, while tall
              // screens keep the full editorial scale.
              className="font-serif text-[clamp(4.5rem,min(14vw,21vh),13rem)] font-normal leading-[0.72] tracking-[-0.075em]"
            />

            <div className="mt-9 grid gap-10 lg:grid-cols-[minmax(0,700px)_1fr] lg:gap-24">
              <div>
                <RevealLines
                  as="h2"
                  trigger="mount"
                  delay={0.28}
                  stagger={0.08}
                  lines={[
                    'I design digital products,',
                    <>mostly the <em className="font-serif font-normal">complicated</em> ones.</>,
                  ]}
                  className="max-w-[720px] font-display text-[clamp(2rem,min(4.3vw,6.4vh),4.8rem)] font-medium leading-[0.96] tracking-[-0.055em]"
                />

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.55 }}
                  className="mt-7 max-w-[520px] space-y-4 text-[14px] leading-7 text-black/65"
                >
                  <p>
                    I started out designing interfaces in 2018. Somewhere along the way, I became obsessed with understanding why products work — and why they sometimes don&rsquo;t.
                  </p>
                  <p>
                    Today I work across banking, fintech and enterprise products, turning messy requirements into experiences that make sense.
                  </p>
                </motion.div>

                <motion.button
                  type="button"
                  onClick={scrollToWork}
                  data-cursor="view"
                  data-cursor-label="See work"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.68 }}
                  className="group mt-8 inline-flex items-center gap-4 border-b border-black/25 pb-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors hover:border-black"
                >
                  Explore selected work
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">↗</span>
                </motion.button>
              </div>

              <motion.div
                style={{ x, y }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.45 }}
                className="hidden items-start justify-end pt-3 lg:flex"
              >
                <div className="border-l border-black/25 pl-5 text-[10px] uppercase leading-5 tracking-[0.2em] text-black/55">
                  <strong className="block text-black">8+ years</strong>
                  of building digital<br />
                  experiences
                </div>
              </motion.div>
            </div>

            {/* Handwritten-style statement */}
            <motion.div
              initial={{ opacity: 0, rotate: -3, y: 12 }}
              animate={{ opacity: 1, rotate: -3, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="absolute bottom-[14%] right-[7%] hidden max-w-[190px] font-serif text-[26px] italic leading-[1.05] lg:block"
            >
              Let&rsquo;s make<br />
              <span className="underline decoration-1 underline-offset-4">complicated</span><br />
              simple.
            </motion.div>
          </div>
        </div>

        {/* Focus strip */}
        <div className="border-t border-black/15 pt-5">
          <div className="mb-4 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-black/50">
            <span>What I work on</span>
            <span className="h-px w-8 bg-black/30" />
          </div>

          <div className="grid grid-cols-2 gap-y-5 sm:grid-cols-4">
            {focusAreas.map((item, index) => {
              const on = focus === index
              return (
                <button
                  key={item}
                  onClick={scrollToWork}
                  onMouseEnter={() => setFocus(index)}
                  onFocus={() => setFocus(index)}
                  onMouseLeave={() => setFocus(-1)}
                  onBlur={() => setFocus(-1)}
                  className="group flex items-center gap-4 text-left"
                >
                  <span className={`font-mono text-[9px] transition-colors ${on ? 'text-black' : 'text-black/35'}`}>
                    0{index + 1}
                  </span>
                  <span className={`border-l pl-4 text-[10px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 group-hover:translate-x-1 ${on ? 'border-black text-black' : 'border-black/20 text-black/60'}`}>
                    {item}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <button
          onClick={scrollToWork}
          className="absolute bottom-7 right-5 hidden -translate-y-1/2 items-center gap-4 text-[9px] font-semibold uppercase tracking-[0.2em] [writing-mode:vertical-rl] lg:flex"
        >
          Scroll to explore
          <span className="text-lg font-normal">↓</span>
        </button>
      </div>
    </section>
  )
}
