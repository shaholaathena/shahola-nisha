import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

const bioStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0 } },
}

const bioItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

const gridStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}

const gridItem = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE } },
}

const INTERESTS = [
  {
    id: 'music',
    label: 'Music',
    headline: 'Alt-rock & nostalgic playlists',
    detail: 'Evanescence · Radiohead · and more in rotation',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    id: 'reads',
    label: 'Reads',
    headline: 'Stories that stay with me',
    detail: 'Harry Potter · Pather Panchali · among favorites',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    id: 'art',
    label: 'Hobbies',
    headline: 'Sketching ideas & amateur art',
    detail: 'Coffee, pen & paper',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    id: 'location',
    label: 'Based in',
    headline: 'Dhaka, Bangladesh',
    detail: 'GMT+6 · Open to remote',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-16 lg:py-24 border-t border-border-subtle bg-surface-base">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">

          {/* ── Left: Bio ── */}
          <motion.div
            variants={bioStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-5"
          >
            <motion.div variants={bioItem} className="flex items-center gap-3 mb-6">
              <div className="h-px w-6 bg-zinc-800/50" />
              <span className="text-xs font-semibold text-zinc-500 tracking-widest uppercase">Who I am</span>
            </motion.div>

            <div className="overflow-hidden mb-8">
              <motion.h2
                variants={bioItem}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-primary tracking-tight leading-[1.1]"
              >
                Curious by nature.
              </motion.h2>
            </div>

            <motion.p variants={bioItem} className="text-base text-zinc-500 leading-relaxed mb-5">
              UX Analyst at SSL Wireless — I design banking, healthcare, and enterprise products for people stepping into digital finance for the very first time. Making the unfamiliar feel obvious is the work.
            </motion.p>

            <motion.p variants={bioItem} className="text-[14px] text-zinc-400 leading-relaxed mb-5">
              The same attention I give to a good story or a late-night sketch is what I bring to every screen I ship.
            </motion.p>

            <motion.div variants={bioItem} className="mt-5">
              <span className="text-[9px] font-mono font-semibold text-zinc-400 tracking-widest uppercase block mb-3">AI in my workflow</span>
              <div className="flex flex-wrap gap-2">
                {['Claude', 'Antigravity', 'Cursor', 'Gemini', 'ChatGPT'].map(tool => (
                  <span key={tool} className="text-[11px] font-medium text-zinc-500 bg-zinc-50 border border-zinc-100 px-3 py-1 rounded-full">
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: Interests ── */}
          <motion.div
            variants={gridStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-7 grid grid-cols-2 gap-x-10 gap-y-12"
          >
            {INTERESTS.map((item) => (
              <motion.div key={item.id} variants={gridItem}>
                <div className="text-zinc-200 mb-4 select-none">
                  {item.icon}
                </div>

                <span className="text-[9px] font-mono font-semibold text-zinc-400 tracking-widest uppercase">
                  {item.label}
                </span>
                <div className="w-5 h-[1.5px] bg-zinc-200 mt-1.5 mb-3 rounded-full" />

                <p className="text-[15px] font-semibold text-ink-primary leading-snug mb-1.5">
                  {item.headline}
                </p>
                <p className="text-[12.5px] text-zinc-400 leading-snug">{item.detail}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
