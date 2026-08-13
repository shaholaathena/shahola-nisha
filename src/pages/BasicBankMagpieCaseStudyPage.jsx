import { useEffect, useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from '../components/layout/Footer'
import ScrollProgress from '../components/layout/ScrollProgress'
import logo from '../assets/logo.png'

const heroImage = 'https://shaholanisha.xyz/wp-content/uploads/2026/01/magpie.png'
const figmaUrl = 'https://www.figma.com/design/yWbqQUeITrZfcK3vmt3DoJ/Basic-Bank-Internet-Banking?node-id=55051-16545'

const sections = [
  ['cs-cover', '01', 'Cover'],
  ['cs-brief', '02', 'Brief'],
  ['cs-timeline', '03', 'Timeline'],
  ['cs-process', '04', 'Process'],
  ['cs-research', '05', 'Research'],
  ['cs-features', '06', 'Features'],
  ['cs-flow', '07', 'User Flow'],
  ['cs-wireframe', '08', 'Wireframe'],
  ['cs-styleguide', '09', 'Style Guide'],
  ['cs-visual', '10', 'Visual Design'],
]

const features = [
  ['Account Dashboard', 'Account balance, account details and quick access to everyday banking actions.'],
  ['Fund Transfer', 'Transfer funds across own accounts, Basic Bank accounts and other banks.'],
  ['MFS Transfer', 'A dedicated path for transferring money to mobile financial services.'],
  ['Beneficiary Management', 'Add and manage recipients so repeat transfers are easier and safer.'],
  ['Utility Bills', 'Bring recurring utility payments into the same banking experience.'],
  ['Mobile Recharge', 'Make a frequent, low-effort service easy to discover from the dashboard.'],
  ['Credit Card', 'Add cards, view card details and manage credit-card bill payments.'],
  ['Transaction History', 'Review previous financial activity with clear amount, date and status information.'],
  ['Account Management', 'Manage linked accounts and keep account-level information accessible.'],
  ['ATM / Branch Search', 'Help customers find nearby physical banking support when digital service is not enough.'],
]

const research = [
  ['User context', 'Everyday banking users need fast access to balances, transfers and payments without having to understand the bank’s internal service structure.'],
  ['Product context', 'Magpie brings several banking services into one mobile experience, so information architecture becomes a core part of the product.'],
  ['Trust context', 'Financial actions need stronger feedback than ordinary app actions: users need to know what they are sending, where it is going and whether it succeeded.'],
  ['Design opportunity', 'Prioritise high-frequency tasks, progressively disclose details and use consistent confirmation patterns across money-moving journeys.'],
]

const flow = [
  ['01', 'Choose transfer', 'Start with the destination or transfer type so the following fields are relevant to the task.'],
  ['02', 'Select account', 'Make the source account explicit before the user enters a financial amount.'],
  ['03', 'Choose beneficiary', 'Use saved recipients for repeat transfers, with a clear path to add a new one.'],
  ['04', 'Enter amount', 'Keep the amount prominent and separate from supporting information.'],
  ['05', 'Review & verify', 'Create a deliberate checkpoint before money moves.'],
  ['06', 'Confirmation', 'Give an unambiguous success or failure state and transaction reference.'],
]

const colors = [
  ['Primary Green', '#1B6320', 'Brand / primary action'],
  ['Dark Green', '#15551B', 'Deep brand tone'],
  ['Text', '#1B1B1B', 'Primary text'],
  ['Muted', '#989898', 'Secondary information'],
  ['Border', '#D1D1D1', 'Dividers / fields'],
  ['Success', '#46B679', 'Success / active states'],
  ['Warning', '#FFD80C', 'Highlight / warning'],
  ['Accent', '#F98A17', 'Attention / alerts'],
]

const typeScale = [
  ['Display', 'Circular Std', 'Bold', '40–48px'],
  ['Heading', 'Circular Std', 'Medium', '28–32px'],
  ['Body', 'Circular Std', 'Regular', '14–16px'],
  ['Label', 'Circular Std', 'Regular', '10–11px'],
]

const EASE = [0.22, 1, 0.36, 1]
const VP = { once: true, margin: '-80px' }

function Fade({ children, className = '' }) {
  return <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: .7, ease: EASE }} className={className}>{children}</motion.div>
}

function SectionLabel({ num, label }) {
  return <div className="flex items-center gap-3 mb-7"><span className="text-xs font-mono text-ink-muted">{num}</span><span className="h-px w-8 bg-zinc-300"/><span className="text-xs font-mono uppercase tracking-[.2em] text-ink-muted">{label}</span></div>
}

function PhoneScreen({ step = 0 }) {
  const screens = [
    <><div className="text-[8px] text-zinc-400">GOOD MORNING</div><div className="text-lg font-semibold mt-1">Welcome back</div><div className="mt-5 rounded-2xl bg-[#e8f4d0] p-4"><div className="text-[8px] text-zinc-500">BASIC BANK CURRENT ACCOUNT</div><div className="text-xl font-semibold mt-2">Tap to balance</div></div><div className="grid grid-cols-3 gap-2 mt-5">{['Fund Transfer','MFS Transfer','Utility Bills','Recharge','Manage Cards','History'].map(x => <div key={x} className="rounded-xl bg-[#eef5e7] p-3 text-[8px] text-center">{x}</div>)}</div></>,
    <><div className="text-[8px] text-zinc-400">FUND TRANSFER</div><div className="text-lg font-semibold mt-1">Select account</div><div className="mt-5 rounded-2xl border border-zinc-200 p-4"><div className="text-[8px] text-zinc-400">FROM</div><div className="text-[10px] font-semibold mt-2">Basic Bank Current Account</div><div className="text-[8px] text-zinc-500 mt-1">A/C No: •••• 4498</div></div><div className="mt-3 rounded-2xl border border-zinc-200 p-4"><div className="text-[8px] text-zinc-400">TO</div><div className="text-[10px] font-semibold mt-2">Select beneficiary</div></div><div className="mt-5 rounded-xl bg-[#1b6320] text-white text-center py-3 text-[9px]">Continue</div></>,
    <><div className="text-[8px] text-zinc-400">TRANSFER SUMMARY</div><div className="text-lg font-semibold mt-1">Review details</div><div className="mt-5 space-y-4">{[['Recipient','Beneficiary'],['Account','•••• 9012'],['Amount','৳ 12,500'],['Purpose','Transfer']].map(([a,b]) => <div key={a} className="flex justify-between border-b border-zinc-100 pb-3"><span className="text-[8px] text-zinc-400">{a}</span><span className="text-[9px] font-medium">{b}</span></div>)}</div><div className="mt-6 rounded-xl bg-[#1b6320] text-white text-center py-3 text-[9px]">Confirm & Transfer</div></>,
    <><div className="text-[8px] text-zinc-400">TRANSACTION</div><div className="text-lg font-semibold mt-1">Transfer successful</div><div className="mt-8 mx-auto w-16 h-16 rounded-full bg-[#e5f4e8] flex items-center justify-center text-[#1b6320] text-2xl">✓</div><div className="text-center mt-6 text-[10px] text-zinc-500">Transaction reference</div><div className="text-center mt-1 text-sm font-semibold">MBG-2022-0918</div><div className="mt-6 rounded-xl border border-zinc-200 text-center py-3 text-[9px]">Done</div></>,
  ]
  return <div className="w-[210px] sm:w-[235px] min-h-[430px] rounded-[30px] border-[7px] border-zinc-900 bg-white shadow-2xl p-5 shrink-0">{screens[step % screens.length]}</div>
}

export default function BasicBankMagpieCaseStudyPage() {
  const [active, setActive] = useState('cs-cover')
  const flowRef = useRef(null)
  const drag = useRef({ active: false, start: 0, scroll: 0 })

  const onDown = useCallback((e) => { drag.current = { active: true, start: e.pageX, scroll: flowRef.current?.scrollLeft || 0 } }, [])
  const onMove = useCallback((e) => { if (!drag.current.active || !flowRef.current) return; flowRef.current.scrollLeft = drag.current.scroll - (e.pageX - drag.current.start) }, [])
  const onUp = useCallback(() => { drag.current.active = false }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id) }), { rootMargin: '-35% 0px -55% 0px', threshold: 0 })
    sections.forEach(([id]) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-surface-base text-ink-primary antialiased">
      <ScrollProgress />

      <aside className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-2" aria-label="Case study sections">
        {sections.map(([id, num, label]) => <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })} className="group flex items-center justify-end gap-2" title={label}><span className={`text-[11px] font-mono transition-opacity ${active === id ? 'opacity-100 text-zinc-600' : 'opacity-0 group-hover:opacity-50 text-ink-muted'}`}>{num} {label}</span><span className={`rounded-full ${active === id ? 'w-2 h-2 bg-zinc-600' : 'w-1.5 h-1.5 bg-zinc-300'}`} /></button>)}
      </aside>

      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-base/80 backdrop-blur-xl border-b border-border-subtle"><div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between"><Link to="/" className="flex items-center"><img src={logo} alt="Alimoon Nisha" className="h-14 w-auto object-contain opacity-85" style={{ mixBlendMode: 'multiply' }} /></Link><Link to="/" className="text-base text-ink-secondary hover:text-ink-primary">← Back to work</Link></div></header>

      <main className="pt-16">
        <section id="cs-cover" style={{ scrollMarginTop: 64 }} className="border-b border-border-subtle bg-surface-base">
          <div className="h-0.5 w-full bg-gradient-to-r from-[#1b6320] via-[#46b679]/50 to-transparent" />
          <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-16 lg:pt-28 lg:pb-20">
            <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
              <div><Fade><div className="flex items-center gap-3 mb-8"><span className="text-xs font-mono uppercase tracking-[.2em] text-ink-muted">Case Study</span><span className="w-1 h-1 rounded-full bg-zinc-300"/><span className="text-xs font-mono uppercase tracking-[.2em] text-ink-muted">2022</span><span className="w-1 h-1 rounded-full bg-zinc-300"/><span className="text-xs font-mono uppercase tracking-[.2em] text-zinc-600">Basic Bank</span></div><h1 className="font-display font-bold tracking-[-.045em] leading-[.92] text-[clamp(3.4rem,7vw,6.8rem)]">Magpie<br/><span className="text-zinc-300">Financial Services</span></h1><p className="mt-8 max-w-2xl text-lg lg:text-xl leading-8 text-ink-secondary">A mobile banking solution for Basic Bank customers to manage finances, transfer funds, pay bills and access everyday financial services from one app.</p><div className="flex flex-wrap gap-2 mt-8">{['Mobile Banking','Financial Services','Figma'].map(tag => <span key={tag} className="px-3 py-2 rounded-lg border border-border-subtle bg-white text-xs font-medium text-ink-secondary">{tag}</span>)}</div></Fade></div>
              <Fade className="flex justify-center lg:justify-end"><img src={heroImage} alt="Basic Bank Magpie mobile banking application" className="w-full max-w-[620px] rounded-[28px] object-cover shadow-2xl border border-zinc-200" /></Fade>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border-subtle mt-16 pt-8">{[['Client','Basic Bank'],['Timeline','Sep–Oct 2022'],['Role','UX / UI Design'],['Platform','Mobile App']].map(([a,b]) => <div key={a}><div className="text-[10px] font-mono uppercase tracking-[.16em] text-ink-muted">{a}</div><div className="mt-2 text-sm font-semibold">{b}</div></div>)}</div>
          </div>
        </section>

        <nav className="sticky top-16 z-40 bg-surface-base/90 backdrop-blur-xl border-b border-border-subtle overflow-x-auto"><div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex gap-8 min-w-max">{sections.map(([id,num,label]) => <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })} className={`text-[10px] font-mono uppercase tracking-[.14em] ${active === id ? 'text-ink-primary' : 'text-ink-muted hover:text-ink-primary'}`}>{num} {label}</button>)}</div></nav>

        <section id="cs-brief" style={{ scrollMarginTop: 120 }} className="border-b border-border-subtle"><div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28"><div className="grid lg:grid-cols-12 gap-12 lg:gap-16"><Fade className="lg:col-span-7"><SectionLabel num="02" label="Project Brief"/><h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.02]">Bringing everyday banking into <span className="text-zinc-300">one mobile experience.</span></h2><p className="mt-8 text-lg leading-8 text-ink-secondary">Magpie was designed as a mobile banking experience where customers could move between accounts, transfers and everyday services without needing to understand how the bank's internal services were organised.</p></Fade><Fade className="lg:col-span-4 lg:col-start-9"><div className="grid grid-cols-2 gap-x-8 gap-y-7">{[['Client','Basic Bank'],['Product','Magpie Financial Services'],['Role','UX / UI Design'],['Duration','Sep–Oct 2022'],['Platform','Mobile App'],['Tool','Figma']].map(([a,b]) => <div key={a}><div className="text-[10px] font-mono uppercase tracking-widest text-ink-muted">{a}</div><div className="mt-2 text-sm font-medium">{b}</div></div>)}</div></Fade></div><div className="mt-16 rounded-3xl bg-[#eef3e8] p-8 lg:p-12"><div className="text-xs font-mono uppercase tracking-[.18em] text-zinc-500">Design objective</div><p className="mt-5 max-w-4xl text-2xl lg:text-3xl leading-[1.45] font-light">Make high-frequency financial tasks easy to discover, easy to complete and easy to trust.</p></div></div></section>

        <section id="cs-timeline" style={{ scrollMarginTop: 120 }} className="border-b border-border-subtle bg-white"><div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28"><SectionLabel num="03" label="Timeline"/><Fade><div className="grid md:grid-cols-4 border-l border-t border-zinc-200">{[['01','Discover','Understand services, users and banking context.'],['02','Structure','Map information architecture and core journeys.'],['03','Design','Translate flows into mobile UI and reusable patterns.'],['04','Refine','Review states, hierarchy and interaction details.']].map(([n,t,d]) => <div key={n} className="border-r border-b border-zinc-200 p-7 lg:p-9 min-h-[220px]"><span className="font-mono text-xs text-zinc-400">{n}</span><h3 className="font-display text-2xl font-semibold mt-10">{t}</h3><p className="text-sm text-zinc-600 leading-6 mt-3">{d}</p></div>)}</div></Fade></div></section>

        <section id="cs-process" style={{ scrollMarginTop: 120 }} className="border-b border-border-subtle"><div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28"><Fade><SectionLabel num="04" label="Process"/><div className="grid lg:grid-cols-2 gap-16 items-end"><h2 className="font-display text-5xl lg:text-7xl font-bold tracking-tight leading-[.98]">From service list<br/><span className="text-zinc-300">to user journey.</span></h2><p className="max-w-xl text-lg leading-8 text-ink-secondary">The design process focused on turning a broad banking feature set into a coherent set of tasks. Information architecture came before visual polish, then flows were translated into repeatable mobile patterns.</p></div></Fade><div className="mt-16 grid lg:grid-cols-5 border-t border-l border-zinc-200">{['Context & requirements','Information architecture','User flows','Wireframes','High-fidelity UI'].map((x,i) => <div key={x} className="border-r border-b border-zinc-200 p-6 min-h-[150px]"><span className="font-mono text-xs text-zinc-400">0{i+1}</span><p className="mt-10 font-medium text-sm">{x}</p></div>)}</div></div></section>

        <section id="cs-research" style={{ scrollMarginTop: 120 }} className="border-b border-border-subtle bg-white"><div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28"><Fade><SectionLabel num="05" label="Research & Context"/><div className="grid lg:grid-cols-2 gap-12 mb-14"><h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.02]">Design decisions started with <span className="text-zinc-300">context.</span></h2><p className="text-lg leading-8 text-ink-secondary">Rather than inventing unsupported research metrics, this case study focuses on the product and interaction context visible in the banking experience: multiple services, different transaction types and a need for confidence around financial actions.</p></div></Fade><div className="grid md:grid-cols-2 border-l border-t border-zinc-200">{research.map(([title,text],i) => <Fade key={title} className="border-r border-b border-zinc-200 p-8 lg:p-10 min-h-[250px]"><span className="font-mono text-xs text-zinc-400">0{i+1}</span><h3 className="font-display text-2xl font-semibold mt-10">{title}</h3><p className="mt-4 text-sm leading-7 text-zinc-600">{text}</p></Fade>)}</div></div></section>

        <section id="cs-features" style={{ scrollMarginTop: 120 }} className="border-b border-border-subtle"><div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28"><Fade><SectionLabel num="06" label="Features"/><div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14"><h2 className="font-display text-5xl lg:text-7xl font-bold tracking-tight leading-[.98]">A complete set of<br/><span className="text-zinc-300">everyday services.</span></h2><p className="max-w-md text-zinc-600 leading-7">The home experience connects the most important services while deeper tasks remain structured within their own journeys.</p></div></Fade><div className="grid md:grid-cols-2 lg:grid-cols-3 border-l border-t border-zinc-200">{features.map(([title,text],i) => <Fade key={title} className="border-r border-b border-zinc-200 p-7 lg:p-9 min-h-[220px]"><span className="font-mono text-xs text-zinc-400">{String(i+1).padStart(2,'0')}</span><h3 className="font-display text-2xl font-semibold mt-10">{title}</h3><p className="text-sm text-zinc-600 leading-6 mt-3">{text}</p></Fade>)}</div></div></section>

        <section id="cs-flow" style={{ scrollMarginTop: 120 }} className="border-b border-border-subtle bg-[#eef3e8] overflow-hidden"><div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28"><Fade><SectionLabel num="07" label="User Flow"/><div className="grid lg:grid-cols-2 gap-12 items-end"><h2 className="font-display text-5xl lg:text-7xl font-bold tracking-tight leading-[.98]">Fund transfer,<br/><span className="text-zinc-400">step by step.</span></h2><p className="max-w-xl text-zinc-600 leading-7">A financial transfer was treated as a deliberate sequence: the user always knows what information is needed, what they are confirming and what happens next.</p></div></Fade><div ref={flowRef} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp} className="mt-16 flex gap-8 overflow-x-auto pb-8 cursor-grab select-none scrollbar-hide">{flow.map(([n,title,text],i) => <div key={n} className="min-w-[360px] sm:min-w-[440px] rounded-3xl bg-white border border-zinc-200 p-6 shadow-sm"><div className="flex items-center justify-between"><span className="font-mono text-xs text-zinc-400">{n}</span><span className="text-xs text-zinc-400">Fund Transfer</span></div><div className="flex justify-center py-8"><PhoneScreen step={i} /></div><h3 className="font-display text-2xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-zinc-600">{text}</p></div>)}</div></div></section>

        <section id="cs-wireframe" style={{ scrollMarginTop: 120 }} className="border-b border-border-subtle bg-white"><div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28"><Fade><SectionLabel num="08" label="Wireframe"/><div className="grid lg:grid-cols-2 gap-14 items-center"><div><h2 className="font-display text-5xl lg:text-6xl font-bold tracking-tight leading-[1.02]">Structure before <span className="text-zinc-300">surface.</span></h2><p className="mt-7 text-lg leading-8 text-ink-secondary">Early layouts focused on hierarchy, grouping and task sequence. The aim was to solve navigation and information density before applying the final visual language.</p><div className="mt-10 grid grid-cols-2 gap-3">{['Dashboard hierarchy','Transfer steps','Beneficiary selection','Review state','Success / failure','Payment entry'].map(x => <div key={x} className="border border-zinc-200 rounded-xl p-4 text-sm">{x}</div>)}</div></div><div className="grid grid-cols-3 gap-3 items-end"><div className="h-[300px] rounded-[24px] border-[6px] border-zinc-300 bg-zinc-50 p-3"><div className="h-4 w-16 bg-zinc-200 rounded"/><div className="h-16 bg-zinc-200 rounded-xl mt-6"/><div className="grid grid-cols-2 gap-2 mt-3">{Array.from({length:6}).map((_,i)=><div key={i} className="h-12 bg-zinc-200 rounded-lg"/>)}</div></div><div className="h-[360px] rounded-[24px] border-[6px] border-zinc-400 bg-zinc-50 p-3 -mb-6"><div className="h-4 w-24 bg-zinc-300 rounded"/><div className="h-12 bg-zinc-200 rounded-xl mt-8"/><div className="h-12 bg-zinc-200 rounded-xl mt-3"/><div className="h-12 bg-zinc-200 rounded-xl mt-3"/><div className="h-10 bg-zinc-300 rounded-xl mt-6"/></div><div className="h-[320px] rounded-[24px] border-[6px] border-zinc-300 bg-zinc-50 p-3"><div className="h-4 w-20 bg-zinc-200 rounded"/><div className="space-y-3 mt-8">{Array.from({length:5}).map((_,i)=><div key={i} className="h-7 bg-zinc-200 rounded"/>)}</div></div></div></div></Fade></div></section>

        <section id="cs-styleguide" style={{ scrollMarginTop: 120 }} className="border-b border-border-subtle"><div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28"><Fade><SectionLabel num="09" label="Style Guide"/><div className="grid lg:grid-cols-2 gap-14 mb-14"><h2 className="font-display text-5xl lg:text-6xl font-bold tracking-tight leading-[1.02]">A visual language built around <span className="text-zinc-300">trust.</span></h2><p className="text-lg leading-8 text-ink-secondary">The UI uses Basic Bank’s green identity with restrained neutrals, clear typography and repeatable components. Financial information gets enough hierarchy to be scanned without turning every screen into a dashboard.</p></div></Fade><div className="grid lg:grid-cols-2 gap-8"><div className="rounded-3xl bg-zinc-950 text-white p-8 lg:p-10"><div className="font-mono text-xs uppercase tracking-[.18em] text-zinc-500">Color system</div><div className="grid grid-cols-2 gap-4 mt-8">{colors.map(([name,hex,role]) => <div key={name} className="flex gap-3 items-center"><span className="w-10 h-10 rounded-xl border border-white/10" style={{ background: hex }}/><div><div className="text-sm font-medium">{name}</div><div className="text-[10px] text-zinc-500">{hex}</div><div className="text-[10px] text-zinc-500">{role}</div></div></div>)}</div></div><div className="rounded-3xl border border-zinc-200 bg-white p-8 lg:p-10"><div className="font-mono text-xs uppercase tracking-[.18em] text-zinc-400">Typography</div><div className="mt-8 space-y-6">{typeScale.map(([role,family,weight,size]) => <div key={role} className="flex items-end justify-between border-b border-zinc-100 pb-4"><div><div className="text-xs text-zinc-400">{role}</div><div className="text-lg font-medium mt-1">{family}</div></div><div className="text-right text-xs text-zinc-500">{weight}<br/>{size}</div></div>)}</div></div></div><div className="mt-8 grid md:grid-cols-4 gap-3">{['Primary button','Account card','Input field','Transaction row'].map(x => <div key={x} className="rounded-2xl border border-zinc-200 bg-white p-5"><div className="h-8 rounded-lg bg-[#1b6320]"/><div className="h-3 w-20 bg-zinc-200 rounded mt-5"/><div className="h-2 w-28 bg-zinc-100 rounded mt-2"/><p className="mt-4 text-xs text-zinc-500">{x}</p></div>)}</div></div></section>

        <section id="cs-visual" style={{ scrollMarginTop: 120 }} className="border-b border-border-subtle bg-white"><div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28"><Fade><SectionLabel num="10" label="Visual Design"/><div className="grid lg:grid-cols-2 gap-12 items-end mb-14"><h2 className="font-display text-5xl lg:text-7xl font-bold tracking-tight leading-[.98]">From structure<br/><span className="text-zinc-300">to interface.</span></h2><p className="max-w-xl text-lg leading-8 text-ink-secondary">The final interface brings the banking hierarchy, green brand language and task-focused patterns together across the product’s major journeys.</p></div></Fade><div className="rounded-[32px] bg-[#eef3e8] p-6 lg:p-14 overflow-hidden"><div className="flex gap-6 lg:gap-10 items-end justify-center overflow-x-auto pb-4"><PhoneScreen step={0}/><PhoneScreen step={1}/><PhoneScreen step={2}/><PhoneScreen step={3}/></div></div><div className="mt-12 flex flex-wrap gap-3"><a href={figmaUrl} target="_blank" rel="noreferrer" className="rounded-full bg-zinc-900 text-white px-5 py-3 text-sm font-medium hover:bg-zinc-800">View Figma project ↗</a><Link to="/" className="rounded-full border border-zinc-200 px-5 py-3 text-sm font-medium hover:bg-zinc-50">Back to portfolio</Link></div></div></section>

        <section className="bg-zinc-950 text-white"><div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28"><div className="grid lg:grid-cols-2 gap-14"><div><div className="text-xs font-mono uppercase tracking-[.2em] text-zinc-500">Reflection</div><h2 className="font-display text-5xl lg:text-7xl font-bold tracking-tight leading-[.98] mt-7">Good banking UX makes every decision <span className="text-zinc-600">clear.</span></h2></div><div className="lg:pt-12"><p className="text-xl lg:text-2xl leading-9 text-zinc-300">Magpie’s biggest design challenge was not the number of services—it was making those services feel like one coherent product. Clear hierarchy, progressive disclosure and consistent transaction feedback helped create that sense of continuity.</p><p className="mt-10 pt-8 border-t border-white/10 text-base leading-7 text-zinc-400">This case study focuses on the product design work and the screens represented in the portfolio. No unsupported user-test metrics or business outcomes are presented as facts.</p></div></div></div></section>
      </main>
      <Footer />
    </div>
  )
}
