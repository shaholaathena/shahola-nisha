import { motion, useMotionValue, useSpring } from 'framer-motion'

const focusAreas = [
  'PRODUCT DESIGN',
  'UX & INTERACTION',
  'DESIGN SYSTEMS',
  'FRONTEND & PROTOTYPES',
]

export default function Hero() {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const x = useSpring(pointerX, { stiffness: 55, damping: 20 })
  const y = useSpring(pointerY, { stiffness: 55, damping: 20 })

  const handlePointerMove = (event) => {
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

      <div className="relative mx-auto flex min-h-screen max-w-[1600px] flex-col px-7 py-7 sm:px-10 lg:px-14">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-black/10 pb-5">
          <a
            href="#hero"
            onClick={(event) => {
              event.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="font-display text-[20px] font-semibold tracking-[-0.05em]"
          >
            S.
          </a>

          <nav className="hidden items-center gap-10 text-[10px] font-semibold uppercase tracking-[0.2em] md:flex">
            <a href="#work" className="transition-opacity hover:opacity-50">Work</a>
            <a href="#about" className="transition-opacity hover:opacity-50">About</a>
            <a href="#contact" className="transition-opacity hover:opacity-50">Contact</a>
          </nav>

          <span className="h-2.5 w-2.5 rounded-full bg-black" aria-hidden="true" />
        </header>

        {/* Main editorial composition */}
        <div className="relative flex flex-1 items-center py-14 lg:py-16">
          <div className="w-full">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-7 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/55"
            >
              Hello, I’m
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[clamp(5.5rem,14vw,13rem)] font-normal leading-[0.72] tracking-[-0.075em]"
            >
              Shahola.
            </motion.h1>

            <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,700px)_1fr] lg:gap-24">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className="max-w-[720px] font-display text-[clamp(2.3rem,4.3vw,4.8rem)] font-medium leading-[0.96] tracking-[-0.055em]"
                >
                  I design digital products, mostly the{' '}
                  <em className="font-serif font-normal">complicated</em> ones.
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="mt-9 max-w-[520px] space-y-5 text-[14px] leading-7 text-black/65"
                >
                  <p>
                    I started out designing interfaces in 2018. Somewhere along the way, I became obsessed with understanding why products work — and why they sometimes don’t.
                  </p>
                  <p>
                    Today I work across banking, fintech and enterprise products, turning messy requirements into experiences that make sense.
                  </p>
                </motion.div>
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
              transition={{ duration: 0.7, delay: 0.5 }}
              className="absolute bottom-[18%] right-[8%] hidden max-w-[190px] font-serif text-[26px] italic leading-[1.05] lg:block"
            >
              Let’s make<br />
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
            {focusAreas.map((item, index) => (
              <button
                key={item}
                onClick={scrollToWork}
                className="group flex items-center gap-4 text-left"
              >
                <span className="font-mono text-[9px] text-black/35">0{index + 1}</span>
                <span className="border-l border-black/20 pl-4 text-[10px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 group-hover:translate-x-1">
                  {item}
                </span>
              </button>
            ))}
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
