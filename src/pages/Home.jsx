import { motion } from 'framer-motion'
import logo from '../assets/logo.png'
import hero from '../assets/hero2.png'
import krishi from '../assets/home-bkb.png'
import mybkb from '../assets/mybkb app.png'
import merchant from '../assets/merchant/jbl-home.png'
import easyHealth from '../assets/easy-health.jpg'
import ecopia from '../assets/ecopia.jpg'

const projects = [
  {
    number: '01',
    title: 'Magpie — Internet Banking',
    type: 'Designed for Basic Bank',
    description: 'A complete internet banking solution covering fund transfer, account management, bills, cards and more.',
    image: krishi,
    href: '/case-study/bkb-mobile',
    accent: 'text-[#6756d9]',
    className: 'md:col-span-7',
  },
  {
    number: '02',
    title: 'Bangla QR Merchant App',
    type: 'One app. Multiple banks.',
    description: 'A unified merchant experience for QR payments across multiple banks and MFS.',
    image: merchant,
    href: '/case-study/merchant-onboarding',
    accent: 'text-[#e86b39]',
    className: 'md:col-span-5',
  },
  {
    number: '03',
    title: 'myBKB',
    type: 'Mobile Banking App',
    description: 'A simpler way to manage everyday banking, from transfers and recharge to account activity.',
    image: mybkb,
    href: '/case-study/bkb-mobile',
    accent: 'text-[#34865f]',
    className: 'md:col-span-5',
  },
  {
    number: '04',
    title: 'Easy Health',
    type: 'Healthcare Platform',
    description: 'A digital healthcare experience designed to make patient services easier to navigate and use.',
    image: easyHealth,
    href: '#contact',
    accent: 'text-[#4e73d8]',
    className: 'md:col-span-7',
  },
  {
    number: '05',
    title: 'Ecopia',
    type: 'Digital Product',
    description: 'A product experience focused on clearer information, intuitive interaction and useful digital workflows.',
    image: ecopia,
    href: '#contact',
    accent: 'text-[#c05a45]',
    className: 'md:col-span-12',
  },
]

function Tile({ children, className = '', id }) {
  return <section id={id} className={`relative overflow-hidden rounded-[28px] border border-black/[0.07] bg-[#faf9f6] ${className}`}>{children}</section>
}

function ContactTile({ href, label, value, icon }) {
  return (
    <motion.a href={href} className="group flex min-h-[150px] flex-col justify-between rounded-[28px] border border-black/[.07] bg-[#faf9f6] p-6" whileHover={{ y: -4 }} transition={{ duration: .25 }}>
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eeeaff] text-lg text-[#6254d9]">{icon}</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
      </div>
      <div><p className="text-sm font-medium">{label}</p><p className="mt-1 truncate text-xs text-black/45">{value}</p></div>
    </motion.a>
  )
}

function ProjectTile({ project }) {
  return (
    <motion.a href={project.href} className={`group relative min-h-[360px] overflow-hidden rounded-[28px] border border-black/[.07] bg-[#faf9f6] ${project.className}`} whileHover={{ y: -4 }} transition={{ duration: .3 }}>
      <div className="absolute left-6 top-6 z-20">
        <p className={`text-xs font-semibold ${project.accent}`}>{project.number}</p>
        <h3 className="mt-5 max-w-[280px] font-display text-[clamp(1.8rem,3vw,2.7rem)] font-medium leading-[.98] tracking-[-.06em]">{project.title}</h3>
        <p className={`mt-3 text-sm font-medium ${project.accent}`}>{project.type}</p>
        <p className="mt-3 max-w-[290px] text-sm leading-5 text-black/50">{project.description}</p>
      </div>
      <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 text-xs font-medium underline underline-offset-4">View project <span>↗</span></div>
      <motion.img src={project.image} alt={project.title} className="absolute bottom-[-4%] right-[-7%] h-[78%] w-[66%] object-contain object-right-bottom drop-shadow-[0_24px_35px_rgba(0,0,0,.12)]" whileHover={{ scale: 1.045, x: -5, y: -6 }} transition={{ duration: .55, ease: [0.22,1,0.36,1] }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/[.025]" />
    </motion.a>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#eeece8] text-[#14182a] antialiased">
      <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between">
          <a href="#top" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/85 text-base font-bold shadow-sm backdrop-blur-xl">SN<span className="text-[#6756d9]">.</span></a>
          <nav className="flex items-center gap-1 rounded-full border border-black/[.05] bg-white/85 p-1 shadow-sm backdrop-blur-xl">
            {['All','About','Work','Experience','Contact'].map((item, i) => <a key={item} href={item === 'All' ? '#top' : `#${item.toLowerCase()}`} className={`rounded-full px-4 py-2 text-[12px] transition-colors ${i === 0 ? 'bg-white shadow-sm' : 'hover:bg-white/80'}`}>{item}</a>)}
          </nav>
          <a href="#contact" className="hidden rounded-full bg-white/85 px-4 py-2 text-[12px] shadow-sm backdrop-blur-xl sm:block">~ Smooth scroll</a>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-[1180px] px-4 pb-8 pt-4 sm:px-6 sm:pt-6">
        <div className="grid auto-rows-[150px] grid-cols-1 gap-4 md:grid-cols-12">
          <Tile id="about" className="min-h-[360px] md:col-span-7 md:row-span-2">
            <div className="flex h-full flex-col sm:flex-row">
              <div className="relative flex min-h-[240px] w-full items-end justify-center overflow-hidden sm:w-[47%]">
                <div className="absolute left-10 top-12 h-36 w-36 rounded-full bg-[#e5ddff]" />
                <img src={hero} alt="Shahola Nisha" className="relative z-10 h-[88%] w-auto max-w-full object-contain object-bottom mix-blend-multiply" />
              </div>
              <div className="flex flex-1 flex-col justify-center p-7 sm:p-8">
                <p className="text-sm text-black/45">Heyyy 👋</p>
                <h1 className="mt-2 font-display text-[clamp(2.3rem,4vw,4rem)] font-medium leading-[.92] tracking-[-.065em]">I’m Shahola Nisha<span className="text-[#6756d9]">.</span></h1>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[.08em] text-[#6756d9]">Product Designer / UX Engineer</p>
                <p className="mt-5 max-w-md text-sm leading-6 text-black/55">I design digital products for complex systems — where clarity, intuition and human needs come first.</p>
                <p className="mt-5 text-xs text-black/45">⌖ Based in Dhaka, Bangladesh</p>
              </div>
            </div>
          </Tile>

          <ContactTile href="mailto:snisha.athena@gmail.com" label="Let’s connect" value="snisha.athena@gmail.com" icon="✉" />
          <ContactTile href="https://www.linkedin.com/in/shahola-nisha/" label="LinkedIn" value="/in/shahola-nisha" icon="in" />

          <Tile className="min-h-[150px] md:col-span-5 md:row-span-1">
            <div className="grid h-full grid-cols-3 divide-x divide-black/[.08] p-6">
              <div className="flex flex-col justify-between px-2 first:pl-0"><span>◉</span><div><strong className="font-display text-3xl tracking-[-.06em]">7+</strong><p className="mt-1 text-[11px] text-black/45">Years experience</p></div></div>
              <div className="flex flex-col justify-between px-5"><span>◇</span><div><strong className="font-display text-3xl tracking-[-.06em]">30+</strong><p className="mt-1 text-[11px] text-black/45">Products designed</p></div></div>
              <div className="flex flex-col justify-between px-5 pr-0"><span>♡</span><div><strong className="font-display text-xl tracking-[-.05em]">Problem solver</strong><p className="mt-1 text-[11px] text-black/45">By nature</p></div></div>
            </div>
          </Tile>

          <div id="work" className="col-span-full flex items-end justify-between px-1 pb-2 pt-8">
            <div><p className="text-[10px] font-medium uppercase tracking-[.18em] text-black/40">Selected work</p><h2 className="mt-2 font-display text-4xl font-medium tracking-[-.06em] sm:text-6xl">Things I’ve made.</h2></div>
            <span className="hidden pb-1 text-xs text-black/35 sm:block">05 projects · product design</span>
          </div>

          {projects.map(project => <ProjectTile key={project.number} project={project} />)}

          <Tile id="experience" className="min-h-[270px] p-7 md:col-span-5 sm:p-8">
            <p className="text-[10px] uppercase tracking-[.18em] text-black/40">About / Experience</p>
            <h3 className="mt-5 max-w-md font-display text-4xl font-medium leading-[.95] tracking-[-.06em]">From building interfaces to designing the experience behind them.</h3>
            <div className="mt-7 flex items-center gap-3 text-xs text-black/55"><span className="rounded-full bg-[#eeeaff] px-3 py-1.5">UI Engineer</span><span>→</span><span className="rounded-full bg-[#eeeaff] px-3 py-1.5">UX Engineer</span><span>→</span><span className="rounded-full bg-[#eeeaff] px-3 py-1.5">Product Designer</span></div>
          </Tile>

          <Tile className="min-h-[270px] bg-[#171b2b] p-7 text-white md:col-span-7 sm:p-8">
            <div className="flex h-full flex-col justify-between"><div><p className="text-[10px] uppercase tracking-[.18em] text-white/40">What I do</p><h3 className="mt-5 font-display text-4xl font-medium tracking-[-.06em]">Make complicated<br /><span className="text-[#b5a8ff]">things feel simple.</span></h3></div><div className="flex flex-wrap gap-2 text-xs text-white/70"><span className="rounded-full border border-white/10 px-3 py-2">UX / UI Design</span><span className="rounded-full border border-white/10 px-3 py-2">Interaction</span><span className="rounded-full border border-white/10 px-3 py-2">Prototyping</span><span className="rounded-full border border-white/10 px-3 py-2">Product Thinking</span></div></div>
          </Tile>

          <section id="contact" className="rounded-[28px] bg-[#dcd4ff] p-8 md:col-span-12 sm:p-12"><div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end"><div><p className="text-[10px] uppercase tracking-[.18em] text-black/45">Have a project in mind?</p><h2 className="mt-3 max-w-3xl font-display text-[clamp(3rem,6vw,6rem)] font-medium leading-[.9] tracking-[-.07em]">Let’s build something<br />meaningful together.</h2></div><a href="mailto:snisha.athena@gmail.com" className="group shrink-0 rounded-full bg-[#171b2b] px-6 py-4 text-sm text-white transition-transform hover:-translate-y-1">Say hello <span className="ml-2 transition-transform group-hover:translate-x-1">↗</span></a></div></section>
        </div>
      </main>
      <footer className="mx-auto flex max-w-[1180px] justify-between px-4 pb-8 pt-4 text-[10px] uppercase tracking-[.15em] text-black/35 sm:px-6"><span>© {new Date().getFullYear()} Shahola Nisha</span><span>Designed & coded with intention.</span></footer>
    </div>
  )
}
