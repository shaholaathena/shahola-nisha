import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const projects = [
  { id: '01', name: 'Bangla QR', type: 'Merchant / Payments', color: '#dcefe9' },
  { id: '02', name: 'Krishi Bank', type: 'Internet Banking', color: '#e8e0f5' },
  { id: '03', name: 'Design Systems', type: 'Multi-bank / Platforms', color: '#f1e2d1' },
]

export default function Hero() {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const x = useSpring(pointerX, { stiffness: 70, damping: 18 })
  const y = useSpring(pointerY, { stiffness: 70, damping: 18 })
  const previewX = useTransform(x, [-600, 600], [-18, 18])
  const previewY = useTransform(y, [-400, 400], [-10, 10])

  const handlePointerMove = (event) => {
    pointerX.set(event.clientX - window.innerWidth / 2)
    pointerY.set(event.clientY - window.innerHeight / 2)
  }

  const enterWork = () => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" onPointerMove={handlePointerMove} className="relative min-h-screen overflow-hidden bg-[#f7f6f2] text-[#111]">
      <div className="mx-auto flex min-h-screen max-w-[1540px] flex-col px-6 pb-6 pt-7 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between border-b border-black/10 pb-5 text-[10px] font-semibold uppercase tracking-[0.2em]">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="font-display text-lg font-semibold normal-case tracking-[-0.04em]">Shahola.</a>
          <div className="hidden gap-8 text-black/45 md:flex">
            <a href="#work" className="transition-colors hover:text-black">Work</a>
            <a href="#about" className="transition-colors hover:text-black">About</a>
            <a href="#contact" className="transition-colors hover:text-black">Say hello</a>
          </div>
          <span className="text-black/40">Dhaka, Bangladesh</span>
        </header>

        <div className="flex flex-1 flex-col justify-center py-16 lg:py-20">
          <div className="grid items-start gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-24">
            <div>
              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8 text-xs font-medium uppercase tracking-[0.22em] text-black/45">
                Product designer · UX engineer · since 2018
              </motion.p>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.08 }} className="max-w-[920px] font-display text-[clamp(4.8rem,10.2vw,10.5rem)] font-medium leading-[0.79] tracking-[-0.085em]">
                I’m Shahola.
              </motion.h1>

              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.18 }} className="mt-10 max-w-[760px] font-display text-[clamp(2rem,4vw,4.3rem)] font-medium leading-[0.98] tracking-[-0.055em]">
                I design digital products, mostly the <span className="font-serif italic">complicated ones.</span>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-10 max-w-[560px] text-[15px] leading-7 text-black/55">
                I started by designing interfaces in 2018. Somewhere along the way, I became obsessed with understanding why products work — and why they sometimes don’t. Today I work across banking, fintech and enterprise products, turning messy requirements into experiences that make sense.
              </motion.p>

              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} onClick={enterWork} className="group mt-10 inline-flex items-center gap-3 border-b border-black pb-2 text-xs font-semibold uppercase tracking-[0.16em]">
                See what I’ve made <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
              </motion.button>
            </div>

            <div className="relative min-h-[430px] lg:mt-16">
              <motion.div style={{ x: previewX, y: previewY }} className="relative ml-auto w-full max-w-[560px]">
                <div className="mb-5 flex items-end justify-between border-b border-black/10 pb-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">Selected work</span>
                  <span className="text-[10px] text-black/35">Hover a project</span>
                </div>

                <div>
                  {projects.map((project) => (
                    <a key={project.id} href="#work" className="group relative flex items-center justify-between border-b border-black/10 py-8 transition-all duration-300 hover:px-4" onClick={(e) => { e.preventDefault(); enterWork() }}>
                      <div className="flex items-baseline gap-5">
                        <span className="font-mono text-[10px] text-black/30">{project.id}</span>
                        <span className="font-display text-[clamp(2rem,3.5vw,3.6rem)] font-medium tracking-[-0.05em] transition-transform duration-300 group-hover:translate-x-2">{project.name}</span>
                      </div>
                      <span className="max-w-[110px] text-right text-[9px] uppercase leading-4 tracking-[0.16em] text-black/35 group-hover:text-black/60">{project.type}</span>
                      <motion.span className="pointer-events-none absolute right-24 top-1/2 h-24 w-32 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ backgroundColor: project.color }} />
                    </a>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-black/35">
                  <span>Banking · Payments · Systems</span><span>01—03</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-black/10 pt-4 text-[9px] uppercase tracking-[0.2em] text-black/35 sm:flex-row sm:items-center sm:justify-between">
          <span>Design · Systems · Code</span>
          <span>Make complicated things make sense.</span>
          <span>Scroll ↓</span>
        </div>
      </div>
    </section>
  )
}
