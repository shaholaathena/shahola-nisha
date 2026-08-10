import { motion } from 'framer-motion'
import logo from '../assets/logo.png'
import krishi from '../assets/home-bkb.png'
import mybkb from '../assets/mybkb app.png'
import merchant from '../assets/merchant/jbl-home.png'
import qr from '../assets/merchant/jbl-qr.png'

const projects = [
  { number: '01', title: 'Bangladesh Krishi Bank', type: 'Internet Banking', description: 'Making everyday banking tasks easier to understand and complete.', image: krishi, href: '/case-study/bkb-mobile', className: 'md:col-span-7 md:row-span-2' },
  { number: '02', title: 'Bangla QR Merchant', type: 'Fintech · Multi-bank', description: 'One merchant experience designed to ship across multiple banks.', image: merchant, href: '/case-study/merchant-onboarding', className: 'md:col-span-5 md:row-span-2' },
  { number: '03', title: 'myBKB', type: 'Mobile Banking', description: 'A simpler mobile banking experience for everyday financial tasks.', image: mybkb, href: '/case-study/bkb-mobile', className: 'md:col-span-7' },
]

function Tile({ children, className = '', dark = false, id }) {
  return <section id={id} className={`relative overflow-hidden rounded-[28px] border border-black/[0.07] ${dark ? 'bg-[#171717] text-white' : 'bg-[#faf9f6]'} ${className}`}>{children}</section>
}

function ProjectTile({ project }) {
  return <motion.a href={project.href} className={`group relative min-h-[380px] overflow-hidden rounded-[28px] border border-black/[0.07] bg-[#faf9f6] ${project.className}`} whileHover={{ y: -4 }} transition={{ duration: .3 }}>
    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/65 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    <motion.img src={project.image} alt="" className="absolute inset-0 h-full w-full object-cover object-top" initial={{ scale: 1.02 }} whileHover={{ scale: 1.06 }} transition={{ duration: .65 }} />
    <div className="absolute left-5 top-5 z-20 flex items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[.16em] text-black backdrop-blur-md"><span>{project.number}</span><span className="opacity-30">/</span><span>{project.type}</span></div>
    <div className="absolute bottom-5 left-5 right-5 z-20 translate-y-2 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"><div className="flex items-end justify-between gap-6"><div><h3 className="font-display text-2xl font-medium tracking-[-.04em] sm:text-3xl">{project.title}</h3><p className="mt-1 max-w-md text-sm leading-6 text-white/75">{project.description}</p></div><span className="shrink-0 text-lg">↗</span></div></div>
  </motion.a>
}

function IntroTile() {
  return <Tile className="min-h-[360px] md:col-span-6 md:row-span-2" id="about"><div className="flex h-full flex-col justify-between p-7 sm:p-9"><div className="flex items-start justify-between"><img src={logo} alt="Shahola" className="h-10 w-auto object-contain opacity-80 mix-blend-multiply" /><span className="rounded-full border border-black/10 px-3 py-1.5 text-[10px] uppercase tracking-[.15em] text-black/45">Dhaka · Bangladesh</span></div><div className="max-w-xl"><p className="mb-4 text-sm text-black/45">Hello, I’m Shahola 👋</p><h1 className="font-display text-[clamp(3rem,6vw,5.8rem)] font-medium leading-[.9] tracking-[-.065em]">I design digital products for <span className="italic">complicated</span> problems.</h1><p className="mt-6 max-w-lg text-sm leading-6 text-black/55 sm:text-base">Product designer and UX engineer working across banking, fintech and digital platforms — turning messy requirements into experiences that make sense.</p></div></div></Tile>
}

function SmallLinkTile({ href, label, children, className = '' }) {
  return <motion.a href={href} className={`group flex min-h-[170px] flex-col justify-between rounded-[28px] border border-black/[.07] bg-[#faf9f6] p-6 ${className}`} whileHover={{ y: -4 }} transition={{ duration: .25 }}><div className="flex items-center justify-between"><span className="text-[10px] font-medium uppercase tracking-[.16em] text-black/40">{label}</span><span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span></div><div className="font-display text-2xl font-medium tracking-[-.045em]">{children}</div></motion.a>
}

function SideQuestTile() {
  return <Tile className="min-h-[170px] bg-[#e9e5ff] md:col-span-3"><div className="flex h-full flex-col justify-between p-6"><div className="flex items-center justify-between text-[10px] uppercase tracking-[.16em] text-black/45"><span>Side quests</span><span>✦</span></div><p className="font-display text-2xl font-medium tracking-[-.05em]">Design systems,<br />experiments & tiny ideas.</p></div></Tile>
}

export default function Home() {
  return <div className="min-h-screen bg-[#eeece8] text-[#171717] antialiased">
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6"><div className="mx-auto flex max-w-[1180px] items-center justify-between"><a href="#top" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-sm font-bold shadow-sm backdrop-blur-xl">S.</a><nav className="flex items-center gap-1 rounded-full border border-black/[.06] bg-white/80 p-1 shadow-sm backdrop-blur-xl">{['All','About','Work','Side Quests'].map((item,i) => <a key={item} href={item === 'All' ? '#top' : item === 'Side Quests' ? '#side-quests' : `#${item.toLowerCase()}`} className={`rounded-full px-4 py-2 text-[12px] transition-colors ${i === 0 ? 'bg-white shadow-sm' : 'text-black/70 hover:bg-white/70'}`}>{item}</a>)}</nav><a href="#contact" className="hidden rounded-full bg-white/80 px-4 py-2 text-[12px] shadow-sm backdrop-blur-xl sm:block">Say hello ↗</a></div></header>
    <main id="top" className="mx-auto max-w-[1180px] px-4 pb-8 pt-4 sm:px-6 sm:pt-6">
      <div className="grid auto-rows-[170px] grid-cols-1 gap-4 md:grid-cols-12">
        <IntroTile />
        <SmallLinkTile className="md:col-span-3" href="mailto:snisha.athena@gmail.com" label="Email">Let’s talk.</SmallLinkTile>
        <SmallLinkTile className="md:col-span-3" href="https://www.linkedin.com/in/shahola-nisha/" label="LinkedIn">Connect with me.</SmallLinkTile>
        <SideQuestTile />
        <SmallLinkTile className="md:col-span-3" href="#work" label="Currently">Designing products.</SmallLinkTile>
        <div id="work" className="md:col-span-12 pt-8 pb-1"><div className="flex items-end justify-between border-b border-black/10 pb-4"><div><p className="text-[10px] uppercase tracking-[.18em] text-black/40">Selected work</p><h2 className="mt-2 font-display text-4xl font-medium tracking-[-.06em] sm:text-6xl">Things I’ve made.</h2></div><span className="hidden text-xs text-black/35 sm:block">03 projects · 2024—2026</span></div></div>
        {projects.map(project => <ProjectTile key={project.number} project={project} />)}
        <Tile id="side-quests" className="min-h-[300px] bg-[#dce8e4] md:col-span-5"><div className="flex h-full flex-col justify-between p-7"><div className="flex justify-between text-[10px] uppercase tracking-[.16em] text-black/40"><span>01 / Systems</span><span>✦</span></div><div><h3 className="font-display text-4xl font-medium tracking-[-.06em]">Design systems<br />that scale.</h3><p className="mt-4 max-w-sm text-sm leading-6 text-black/55">Reusable components, tokens and white-label architecture for products that need to work across brands.</p></div></div></Tile>
        <Tile className="min-h-[300px] bg-[#171717] text-white md:col-span-7"><div className="relative h-full overflow-hidden p-7"><img src={qr} alt="Merchant QR interface" className="absolute -right-8 bottom-[-24%] h-[125%] w-auto rounded-[30px] shadow-2xl transition-transform duration-700 hover:-translate-y-3" /><div className="relative z-10 max-w-sm"><p className="text-[10px] uppercase tracking-[.16em] text-white/40">A little about how I work</p><h3 className="mt-5 font-display text-4xl font-medium tracking-[-.06em]">Understand.<br />Simplify.<br />Design.</h3></div></div></Tile>
        <section id="contact" className="rounded-[28px] bg-[#faf9f6] p-8 md:col-span-12 sm:p-12"><div className="flex flex-col justify-between gap-10 sm:flex-row sm:items-end"><div><p className="text-[10px] uppercase tracking-[.18em] text-black/40">Have a complex problem?</p><h2 className="mt-3 max-w-3xl font-display text-[clamp(3rem,7vw,7rem)] font-medium leading-[.9] tracking-[-.07em]">Let’s make it<br /><span className="italic">make sense.</span></h2></div><a href="mailto:snisha.athena@gmail.com" className="group shrink-0 rounded-full bg-[#171717] px-6 py-4 text-sm text-white transition-transform hover:-translate-y-1">snisha.athena@gmail.com <span className="ml-2 transition-transform group-hover:translate-x-1">↗</span></a></div></section>
      </div>
    </main>
    <footer className="mx-auto flex max-w-[1180px] justify-between px-4 pb-8 pt-4 text-[10px] uppercase tracking-[.15em] text-black/35 sm:px-6"><span>Shahola Nisha · Product Designer</span><span>© {new Date().getFullYear()}</span></footer>
  </div>
}
