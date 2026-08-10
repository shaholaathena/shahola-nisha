import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, meta } from '../data/portfolio'
import logo from '../assets/logo.png'

const ease = [0.22, 1, 0.36, 1]
const work = projects.filter((p) => ['bkb-internet', 'merchant-onboarding', 'bkb-mobile'].includes(p.id))

function Reveal({ children, delay = 0, className = '' }) {
  return <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .7, delay, ease }} className={className}>{children}</motion.div>
}

function Nav() {
  const [open, setOpen] = useState(false)
  const links = [['Work', '#work'], ['About', '#about'], ['Experience', '#experience'], ['Contact', '#contact']]
  return <header className="fixed inset-x-0 top-0 z-50 px-5 pt-5 sm:px-8 lg:px-10">
    <div className="mx-auto flex max-w-[1480px] items-center justify-between rounded-full border border-black/10 bg-[#f6f4ef]/85 px-4 py-3 backdrop-blur-xl sm:px-5">
      <a href="#top" className="flex items-center"><img src={logo} alt="Shahola" className="h-8 w-auto object-contain" /></a>
      <nav className="hidden items-center gap-7 md:flex">{links.map(([label, href]) => <a key={label} href={href} className="text-[11px] font-medium uppercase tracking-[.16em] text-black/55 transition-colors hover:text-black">{label}</a>)}<a href="mailto:snisha.athena@gmail.com" className="rounded-full bg-black px-4 py-2 text-[10px] font-medium uppercase tracking-[.15em] text-white">Let's talk ↗</a></nav>
      <button onClick={() => setOpen(!open)} className="flex h-9 w-9 items-center justify-center md:hidden" aria-label="Menu"><span className="text-lg">{open ? '×' : '≡'}</span></button>
    </div>
    {open && <div className="mx-auto mt-2 max-w-[1480px] rounded-3xl border border-black/10 bg-[#f6f4ef] p-5 md:hidden">{links.map(([label, href]) => <a onClick={() => setOpen(false)} key={label} href={href} className="block border-b border-black/10 py-4 text-sm">{label}</a>)}</div>}
  </header>
}

function Hero() {
  return <section id="top" className="relative min-h-[100svh] overflow-hidden bg-[#f6f4ef] px-5 pb-12 pt-32 sm:px-8 lg:px-10">
    <div className="mx-auto flex min-h-[calc(100svh-176px)] max-w-[1480px] flex-col justify-between">
      <div className="grid items-end gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <Reveal><p className="mb-7 font-mono text-[10px] uppercase tracking-[.24em] text-black/45">Product designer · UX engineer · Dhaka</p></Reveal>
          <Reveal delay={.08}><h1 className="max-w-[1100px] font-display text-[clamp(4.2rem,11vw,11.5rem)] font-medium leading-[.78] tracking-[-.075em] text-black">I design<br /><span className="text-black/30">digital products</span><br />that make sense.</h1></Reveal>
        </div>
        <Reveal delay={.18} className="pb-2 lg:pb-4"><p className="max-w-sm text-[15px] leading-7 text-black/55">I’m Shahola — a UX designer with an engineer’s instinct for systems. I turn complicated banking, payment and digital products into experiences people can actually understand.</p><a href="#work" className="mt-7 inline-flex border-b border-black/30 pb-2 text-[11px] font-medium uppercase tracking-[.16em]">See selected work ↓</a></Reveal>
      </div>
      <div className="grid grid-cols-2 gap-8 border-t border-black/15 pt-5 sm:grid-cols-4">
        {[['01','7+','years designing'],['02','30+','products & clients'],['03','100+','screens shipped'],['04','7.0','IELTS score']].map(([n,v,l]) => <div key={n}><span className="font-mono text-[9px] text-black/35">{n}</span><div className="mt-2 font-display text-2xl tracking-[-.04em]">{v}</div><div className="text-[10px] uppercase tracking-[.14em] text-black/40">{l}</div></div>)}
      </div>
    </div>
  </section>
}

function WorkSection() {
  const [active, setActive] = useState(work[0])
  const title = (p) => p.id === 'bkb-internet' ? 'Bangladesh Krishi Bank' : p.id === 'merchant-onboarding' ? 'Bangla QR Merchant App' : 'myBKB Mobile Banking'
  const desc = (p) => p.id === 'bkb-internet' ? 'Making complex banking tasks easier to understand, navigate and complete.' : p.id === 'merchant-onboarding' ? 'One merchant experience designed to scale across multiple banks and brands.' : 'A simpler mobile banking experience for everyday financial tasks.'
  return <section id="work" className="bg-[#f6f4ef] px-5 py-28 sm:px-8 lg:px-10 lg:py-40">
    <div className="mx-auto max-w-[1480px]">
      <Reveal><div className="mb-20 flex flex-col justify-between gap-8 border-t border-black/15 pt-5 md:flex-row md:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[.22em] text-black/40">01 / Selected work</p><h2 className="mt-5 font-display text-[clamp(4rem,9vw,9rem)] font-medium leading-[.8] tracking-[-.075em]">Work<br /><span className="text-black/30">that shipped.</span></h2></div><p className="max-w-xs text-sm leading-6 text-black/50">A selection of products I’ve shaped across banking, payments and digital services.</p></div></Reveal>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
        <div className="border-t border-black/15">
          {work.map((p, i) => <a href={p.link || '#'} key={p.id} onMouseEnter={() => setActive(p)} onFocus={() => setActive(p)} className="group block border-b border-black/15 py-8 sm:py-10">
            <div className="flex gap-5"><span className="pt-2 font-mono text-[10px] text-black/35">0{i + 1}</span><div className="flex-1"><div className="mb-3 font-mono text-[9px] uppercase tracking-[.18em] text-black/40">{p.tags?.slice(0,3).join(' · ')} · {p.year}</div><div className="flex items-start justify-between gap-6"><h3 className={`max-w-2xl font-display text-[clamp(2.2rem,5vw,5rem)] font-medium leading-[.9] tracking-[-.06em] transition-opacity ${active.id === p.id ? 'opacity-100' : 'opacity-30 group-hover:opacity-100'}`}>{title(p)}</h3><span className="pt-1 text-xl opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">↗</span></div><AnimatePresence initial={false}>{active.id === p.id && <motion.p initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} transition={{duration:.35,ease}} className="mt-4 max-w-xl overflow-hidden text-sm leading-6 text-black/50">{desc(p)}</motion.p>}</AnimatePresence></div></div>
          </a>)}
        </div>
        <div className="lg:sticky lg:top-28 lg:h-[540px]">
          <AnimatePresence mode="wait"><motion.div key={active.id} initial={{opacity:0,scale:.97,y:15}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.97,y:-10}} transition={{duration:.45,ease}} className="relative h-[430px] overflow-hidden bg-[#e9e6df] sm:h-[540px]">
            {active.coverQR ? <div className="flex h-full items-center justify-center"><div className="w-[42%] max-w-[230px] rounded-[28px] bg-white p-2 shadow-2xl"><div className="aspect-[9/18] rounded-[22px] bg-[#f4f4f4] p-4"><div className="h-2 w-16 rounded-full bg-black/10"/><div className="mt-8 h-20 rounded-2xl bg-black/10"/><div className="mt-4 grid grid-cols-2 gap-2"><div className="h-16 rounded-xl bg-black/5"/><div className="h-16 rounded-xl bg-black/5"/></div></div></div></div> : <img src={active.image} alt={active.title} className="h-full w-full object-contain p-8 transition-transform duration-700 hover:scale-[1.02]" />}<div className="absolute inset-x-5 bottom-5 flex justify-between font-mono text-[9px] uppercase tracking-[.15em] text-black/45"><span>{active.company}</span><span>Open project ↗</span></div>
          </motion.div></AnimatePresence>
        </div>
      </div>
    </div>
  </section>
}

function About() {
  return <section id="about" className="bg-black px-5 py-28 text-white sm:px-8 lg:px-10 lg:py-40"><div className="mx-auto max-w-[1480px]"><Reveal><div className="grid gap-16 lg:grid-cols-[.8fr_1.6fr]"><div><p className="font-mono text-[10px] uppercase tracking-[.22em] text-white/40">02 / About</p><p className="mt-8 max-w-xs text-sm leading-6 text-white/45">From coded interfaces to product decisions — I like working where design meets systems.</p></div><div><h2 className="font-display text-[clamp(3rem,6.5vw,7rem)] font-medium leading-[.9] tracking-[-.065em]">I started in UI.<br /><span className="text-white/35">I stayed for the problems.</span></h2><p className="mt-12 max-w-3xl text-lg leading-8 text-white/65">My career began as a UI Engineer in 2018. Since then I’ve moved closer to the problem: understanding users, mapping flows, designing systems, prototyping interactions and working with engineers to ship the result.</p><div className="mt-12 grid gap-8 border-t border-white/15 pt-6 sm:grid-cols-3">{[['Think','Research · flows · IA'],['Design','UX · UI · systems'],['Build','Prototypes · HTML · JS']].map(([a,b]) => <div key={a}><div className="font-display text-2xl">{a}</div><div className="mt-2 text-xs text-white/40">{b}</div></div>)}</div></div></div></Reveal></div></section>
}

function Experience() {
  const items = [['2018','UI Engineer','Started designing and building digital interfaces.'],['2020','UX Analyst · SSL Wireless','Moved into UX across banking, healthcare, LMS and digital products.'],['2024','Senior UX Engineer','Led product and interface work for banking and merchant platforms.'],['Now','Product Designer','Focusing on end-to-end product thinking, interaction and scalable systems.']]
  return <section id="experience" className="bg-[#f6f4ef] px-5 py-28 sm:px-8 lg:px-10 lg:py-40"><div className="mx-auto max-w-[1480px]"><Reveal><div className="border-t border-black/15 pt-5"><p className="font-mono text-[10px] uppercase tracking-[.22em] text-black/40">03 / Experience</p><div className="mt-16">{items.map(([year,role,text],i) => <div key={year} className="grid border-b border-black/15 py-9 md:grid-cols-[130px_1fr_1fr] md:gap-10"><span className="font-mono text-[10px] text-black/40">{year}</span><h3 className="mt-3 font-display text-3xl tracking-[-.04em] md:mt-0">{role}</h3><p className="mt-3 max-w-md text-sm leading-6 text-black/50 md:mt-0">{text}</p></div>)}</div></div></Reveal></div></section>
}

function Credentials() {
  return <section id="credentials" className="bg-[#e7e3da] px-5 py-24 sm:px-8 lg:px-10 lg:py-32"><div className="mx-auto max-w-[1480px]"><Reveal><div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><p className="font-mono text-[10px] uppercase tracking-[.22em] text-black/40">04 / Credentials</p><h2 className="mt-6 font-display text-5xl tracking-[-.06em] sm:text-7xl">Proof,<br /><span className="text-black/35">not noise.</span></h2></div><div className="border-t border-black/15">{[['IELTS','7.0','May 2025'],['Design & UX','Product design · UX · UI','Current focus'],['Engineering','HTML · CSS · JavaScript','Still building']].map(([a,b,c]) => <div key={a} className="grid gap-3 border-b border-black/15 py-7 sm:grid-cols-[1fr_2fr_1fr]"><span className="font-display text-xl">{a}</span><span className="text-sm text-black/55">{b}</span><span className="font-mono text-[9px] uppercase tracking-[.15em] text-black/35 sm:text-right">{c}</span></div>)}</div></div></Reveal></div></section>
}

function Contact() {
  return <section id="contact" className="bg-[#f6f4ef] px-5 pb-16 pt-28 sm:px-8 lg:px-10 lg:pb-20 lg:pt-40"><div className="mx-auto max-w-[1480px]"><Reveal><div className="border-t border-black/15 pt-5"><p className="font-mono text-[10px] uppercase tracking-[.22em] text-black/40">05 / Contact</p><div className="mt-20 flex flex-col justify-between gap-16 lg:flex-row lg:items-end"><h2 className="max-w-5xl font-display text-[clamp(4rem,10vw,10rem)] font-medium leading-[.78] tracking-[-.075em]">Have a<br /><span className="text-black/30">problem worth</span><br />solving?</h2><div className="max-w-sm"><p className="text-sm leading-6 text-black/55">I’m open to thoughtful product, UX and interaction work where complexity is part of the challenge.</p><a href="mailto:snisha.athena@gmail.com" className="mt-8 inline-flex border-b border-black pb-2 font-display text-xl tracking-[-.03em]">snisha.athena@gmail.com ↗</a></div></div><div className="mt-24 flex flex-col justify-between gap-5 border-t border-black/15 pt-5 text-[10px] uppercase tracking-[.16em] text-black/40 sm:flex-row"><span>Shahola Nisha · Dhaka, Bangladesh</span><div className="flex gap-6"><a href={meta.linkedin}>LinkedIn ↗</a><a href={meta.dribbble}>Dribbble ↗</a></div></div></div></Reveal></div></section>
}

export default function Home() { return <div className="min-h-screen bg-[#f6f4ef] text-black"><Nav /><main><Hero /><WorkSection /><About /><Experience /><Credentials /><Contact /></main></div> }
