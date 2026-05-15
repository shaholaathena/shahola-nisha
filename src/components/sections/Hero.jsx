import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { stats } from '../../data/portfolio'
import heroImg from '../../assets/hero.png'

const stagger = {
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 80])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-grid-subtle pt-24 pb-20"
    >
      {/* Dynamic Ambient gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(circle 800px at 80% 40%, rgba(0,0,0,0.04) 0%, transparent 60%), radial-gradient(circle 600px at 20% 80%, rgba(0,0,0,0.03) 0%, transparent 60%)',
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full lg:grid lg:grid-cols-12 lg:gap-16 items-center"
      >
        {/* Left Column - Text content */}
        <motion.div variants={stagger} initial="initial" animate="animate" className="col-span-12 lg:col-span-7 pt-10">
          {/* Eyebrow */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
            <div className="h-px w-10 bg-zinc-800" />
            <span className="text-xs font-semibold text-zinc-500 tracking-widest uppercase">
              UX Analyst · UX Engineer · AI-Assisted Designer
            </span>
          </motion.div>

          {/* Main headline */}
          <div className="mb-6 overflow-hidden">
            <motion.h1
               initial={{ y: '20%', opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-semibold leading-[1.05] tracking-tight text-[clamp(2.1rem,5.1vw,4.6rem)] text-ink-primary"
            >
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-600">Alimoon Nisha</span>.<br/>
              <span className="text-[clamp(1.4rem,2.8vw,2.2rem)] font-light text-zinc-500 block mt-1 leading-[1.3] tracking-tight">Someone who believes good design should go unnoticed.</span>
            </motion.h1>
          </div>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            className="text-sm sm:text-base text-zinc-500 max-w-xl leading-relaxed mb-8 font-light"
          >
            UX Analyst at SSL Wireless, Dhaka. I design banking, healthcare, payment and enterprise products etc.
          </motion.p>

          {/* AI Tools */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
            <div className="h-px w-6 bg-zinc-800/50" />
            <span className="text-[9px] font-mono font-semibold text-zinc-400 tracking-widest uppercase">
              AI · Claude · Antigravity · Cursor · Gemini · ChatGPT
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 mb-16">
            <a
              href="#work"
              onClick={(e) => { e.preventDefault(); document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-zinc-900 text-white text-sm font-semibold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10">View Selected Work</span>
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                className="relative z-10 transition-transform"
                aria-hidden="true"
              >
                →
              </motion.span>
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-ink-primary border border-border-strong rounded-full hover:bg-surface-1 transition-all duration-300"
            >
              Get in touch
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-border-subtle"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                className=""
              >
                <div className="text-ink-faintxl font-display font-bold text-ink-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-zinc-900/80 mb-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column - Visual/Image */}
        <motion.div 
          style={{ y, opacity }}
          className="col-span-12 lg:col-span-5 mt-16 lg:mt-0 relative hidden md:block lg:w-[78%] lg:ml-auto"
        >
          {/* Container with glowing effect */}
          <motion.div
             animate={{ y: [-10, 10, -10] }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             className="relative z-10 w-full aspect-[4/5] rounded-[2rem] card-surface overflow-hidden glow-zinc-md border border-border-default p-2"
          >
             <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-surface-2 relative noise">
                {/* Subtle inner gradient behind image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-800/10 to-transparent z-0" />
                <motion.img
                  src={heroImg}
                  alt="Alimoon Nisha"
                  style={{ scale: imageScale }}
                  className="w-full h-full object-cover object-center relative z-10 opacity-95 transition-all duration-700 mix-blend-multiply grayscale-[0.2] hover:grayscale-0"
                />
             </div>
          </motion.div>

          {/* Decorative floating elements */}
          <motion.div 
             animate={{ y: [0, -12, 0] }}
             transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
             whileHover={{ scale: 1.05, y: -5, cursor: "grab" }}
             whileTap={{ scale: 0.95, cursor: "grabbing" }}
             drag
             dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
             dragElastic={0.2}
             className="absolute -bottom-10 -left-10 bg-white/70 backdrop-blur-2xl p-4 rounded-[24px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05),0_0_0_1px_rgba(255,255,255,0.5)_inset,0_0_0_1px_rgba(0,0,0,0.03)] z-20 group"
          >
             <div className="flex items-center gap-3.5 pr-2">
                <div className="relative w-12 h-12 rounded-[16px] bg-gradient-to-br from-zinc-50 to-white flex items-center justify-center shadow-[0_2px_10px_-3px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,1)_inset,0_0_0_1px_rgba(0,0,0,0.05)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <div className="absolute inset-0 rounded-[16px] bg-zinc-800 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <span className="text-zinc-900 font-bold text-lg font-display tracking-tight z-10">UI</span>
                </div>
                <div>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-0.5">Expertise</p>
                   <p className="text-[15px] text-slate-800 font-bold tracking-tight">User Interface</p>
                </div>
             </div>
          </motion.div>

          <motion.div 
             animate={{ y: [0, 15, 0] }}
             transition={{ y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}
             whileHover={{ scale: 1.05, y: -5, cursor: "grab" }}
             whileTap={{ scale: 0.95, cursor: "grabbing" }}
             drag
             dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
             dragElastic={0.2}
             className="absolute -top-8 -right-8 bg-white/70 backdrop-blur-2xl p-4 rounded-[24px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05),0_0_0_1px_rgba(255,255,255,0.5)_inset,0_0_0_1px_rgba(0,0,0,0.03)] z-20 group"
          >
             <div className="flex items-center gap-3.5 pr-2">
                <div className="relative w-12 h-12 rounded-[16px] bg-gradient-to-br from-zinc-50 to-white flex items-center justify-center shadow-[0_2px_10px_-3px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,1)_inset,0_0_0_1px_rgba(0,0,0,0.05)] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                  <div className="absolute inset-0 rounded-[16px] bg-zinc-800 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <span className="text-zinc-900 font-bold text-lg font-display tracking-tight z-10">UX</span>
                </div>
                <div>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-0.5">Research</p>
                   <p className="text-[15px] text-slate-800 font-bold tracking-tight">User Experience</p>
                </div>
             </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <p className="text-[10px] tracking-widest text-ink-muted uppercase font-medium">Scroll</p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-zinc-800/60 to-transparent"
        />
      </motion.div>

    </section>
  )
}
