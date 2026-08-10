import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function Hero() {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const x = useSpring(pointerX, { stiffness: 70, damping: 18 })
  const y = useSpring(pointerY, { stiffness: 70, damping: 18 })
  const previewX = useTransform(x, [-600, 600], [-12, 12])
  const previewY = useTransform(y, [-400, 400], [-8, 8])

  const handlePointerMove = (event) => {
    pointerX.set(event.clientX - window.innerWidth / 2)
    pointerY.set(event.clientY - window.innerHeight / 2)
  }

  const enterWork = () => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" onPointerMove={handlePointerMove} className="relative min-h-screen overflow-hidden bg-[#f7f6f2] text-[#111]">
      <div className="mx-auto flex min-h-screen max-w-[1540px] flex-col px-6 pb-6 pt-24 sm:px-8 lg:px-12 lg:pt-28">
        <div className="flex flex-1 flex-col justify-center py-14 lg:py-16">
          <div className="max-w-[980px]">
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-7 text-xs font-medium uppercase tracking-[0.22em] text-black/45">
              Hello, I’m
            </motion.p>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.08 }} className="font-display text-[clamp(5rem,11vw,11.5rem)] font-medium leading-[0.78] tracking-[-0.09em]">
              Shahola.
            </motion.h1>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.18 }} className="mt-9 max-w-[780px] font-display text-[clamp(2.1rem,4.25vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.055em]">
              I design digital products, mostly the <span className="font-serif italic">complicated ones.</span>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-9 max-w-[560px] text-[15px] leading-7 text-black/55">
              I started by designing interfaces in 2018. Somewhere along the way, I became obsessed with understanding why products work — and why they sometimes don’t.
              <br /><br />
              Today I work across banking, fintech and enterprise products, turning messy requirements into experiences that make sense.
            </motion.p>

            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} onClick={enterWork} className="group mt-9 inline-flex items-center gap-3 border-b border-black pb-2 text-xs font-semibold uppercase tracking-[0.16em]">
              See what I’ve made <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
            </motion.button>
          </div>

          <motion.div style={{ x: previewX, y: previewY }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.5 }} className="pointer-events-none absolute right-[7vw] top-[39vh] hidden lg:block">
            <div className="flex items-start gap-4 border-l border-black/20 pl-5">
              <div className="text-[9px] font-semibold uppercase leading-5 tracking-[0.2em] text-black/40">
                <span className="text-black">8+ years</span><br />
                of building digital<br />
                experiences
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="mt-20 flex max-w-[900px] flex-wrap gap-x-8 gap-y-4 border-t border-black/10 pt-5 lg:mt-24">
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
        </div>

        <div className="flex items-center justify-between border-t border-black/10 pt-4 text-[9px] uppercase tracking-[0.2em] text-black/35">
          <span>Banking · Fintech · Digital Platforms</span>
          <span className="hidden sm:block">Make complicated things make sense.</span>
          <button onClick={enterWork} className="transition-colors hover:text-black">Scroll ↓</button>
        </div>
      </div>
    </section>
  )
}
