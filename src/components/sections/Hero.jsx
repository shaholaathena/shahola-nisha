import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import SketchBoard from '../ui/SketchBoard'

export default function Hero() {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const x = useSpring(pointerX, { stiffness: 70, damping: 18 })
  const y = useSpring(pointerY, { stiffness: 70, damping: 18 })
  const previewX = useTransform(x, [-600, 600], [-10, 10])
  const previewY = useTransform(y, [-400, 400], [-7, 7])

  const handlePointerMove = (event) => {
    pointerX.set(event.clientX - window.innerWidth / 2)
    pointerY.set(event.clientY - window.innerHeight / 2)
  }

  const enterWork = () => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" onPointerMove={handlePointerMove} className="relative min-h-screen overflow-hidden bg-[#f7f6f2] text-[#111]">
      <div className="mx-auto flex min-h-screen max-w-[1540px] flex-col px-6 pb-6 pt-24 sm:px-8 lg:px-12 lg:pt-28">

        {/* Two columns: the statement, and the notebook page it came from. */}
        <div className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,470px)] lg:gap-16 lg:py-8">

          <div className="max-w-[760px]">
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6 text-xs font-medium uppercase tracking-[0.22em] text-black/45">
              Hello, I’m
            </motion.p>

            {/* Sized off width and height together, so the focus strip below still
                clears the fold on a short laptop. */}
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.08 }} className="font-display text-[clamp(3.5rem,min(8.6vw,15vh),9.5rem)] font-medium leading-[0.78] tracking-[-0.09em]">
              Shahola.
            </motion.h1>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.18 }} className="mt-7 max-w-[660px] font-display text-[clamp(1.75rem,min(3.4vw,5.6vh),3.5rem)] font-medium leading-[0.98] tracking-[-0.055em]">
              I design digital products, mostly the <span className="font-serif italic">complicated ones.</span>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-7 max-w-[540px] text-[15px] leading-7 text-black/55">
              I started by designing interfaces in 2018. Somewhere along the way, I became obsessed with understanding why products work — and why they sometimes don’t.
              <br /><br />
              Today I work across banking, fintech and enterprise products, turning messy requirements into experiences that make sense.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4">
              <button
                onClick={enterWork}
                data-cursor="view"
                data-cursor-label="See work"
                className="group inline-flex items-center gap-3 border-b border-black pb-2 text-xs font-semibold uppercase tracking-[0.16em]"
              >
                See what I’ve made <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
              </button>

              <div className="border-l border-black/20 pl-5 text-[9px] font-semibold uppercase leading-5 tracking-[0.2em] text-black/40">
                <span className="text-black">8+ years</span><br />
                of building digital experiences
              </div>
            </motion.div>
          </div>

          {/* The sketch drifts a little with the pointer, so the page feels alive
              before anything is clicked. */}
          <motion.div
            style={{ x: previewX, y: previewY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <SketchBoard />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="flex max-w-[900px] flex-wrap gap-x-8 gap-y-4 border-t border-black/10 pt-5">
          {[
            ['01', 'Product Design'],
            ['02', 'UX & Interaction'],
            ['03', 'Design Systems'],
            ['04', 'Frontend & Prototypes'],
          ].map(([number, label]) => (
            <div key={number} className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-black/55">
              <span className="font-mono text-black/25">{number}</span>
              <span>{label}</span>
            </div>
          ))}
        </motion.div>

        <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4 text-[9px] uppercase tracking-[0.2em] text-black/35">
          <span>Banking · Fintech · Digital Platforms</span>
          <span className="hidden sm:block">Make complicated things make sense.</span>
          <button onClick={enterWork} className="transition-colors hover:text-black">Scroll ↓</button>
        </div>
      </div>
    </section>
  )
}
