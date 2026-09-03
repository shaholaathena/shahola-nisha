/* ─────────────────────────────────────────────────────────────────────────────
   WhoIAm — her own "Curious by nature" section, as a section.

   Her layout, unchanged in structure: the statement and the working details in
   a left column, the personal facts as a 2x2 of small cards on the right. The
   split is the idea — left is what she does for a living, right is what she is
   like, and neither has to carry the other.

   It sits in the page's section rhythm rather than at the top of it: same
   top rule, same measure, same vertical padding as every SectionRow below. It
   does NOT use SectionRow itself, because that primitive puts a label in the
   left margin and this section already owns both of its columns; nesting one
   inside the other would produce three columns and a much narrower measure.
   The "Who I am" eyebrow does the labelling instead.

   Copy is hers verbatim, with one change: "UX Analyst at SSL Wireless — I
   design ..." lost its em dash, because this project does not use them.
   ───────────────────────────────────────────────────────────────────────────── */
import { motion, useReducedMotion } from 'framer-motion'
import Eyebrow from './Eyebrow'

const AI_TOOLS = ['Claude', 'Antigravity', 'Cursor', 'Gemini', 'ChatGPT']

/* Outline marks, 1.5px stroke on currentColor so they inherit the muted ink and
   stay a whisper next to the type rather than competing with it. */
const Icon = {
  music: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="7" cy="18" r="2.5" /><circle cx="17.5" cy="15.5" r="2.5" />
      <path d="M9.5 18V6.5l10.5-2v11" />
    </svg>
  ),
  book: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 6.5C10.5 5 8.2 4.4 4.5 4.4v13C8.2 17.4 10.5 18 12 19.5c1.5-1.5 3.8-2.1 7.5-2.1v-13C15.8 4.4 13.5 5 12 6.5Z" />
      <path d="M12 6.5v13" />
    </svg>
  ),
  pen: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 20s1.5-4.5 4-7l8.5-8.5a2.1 2.1 0 0 1 3 3L11 16c-2.5 2.5-7 4-7 4Z" />
      <path d="M9.5 13.5l1 1" />
    </svg>
  ),
  pin: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  ),
}

const PERSONAL = [
  { icon: 'music', label: 'Music',    title: 'Alt-rock & nostalgic playlists', sub: 'Evanescence · Radiohead · and more in rotation' },
  { icon: 'book',  label: 'Reads',    title: 'Stories that stay with me',      sub: 'Harry Potter · Pather Panchali · among favorites' },
  { icon: 'pen',   label: 'Hobbies',  title: 'Sketching ideas & amateur art',  sub: 'Coffee, pen & paper' },
  { icon: 'pin',   label: 'Based in', title: 'Dhaka, Bangladesh',              sub: 'GMT+6 · Open to remote' },
]

export default function WhoIAm() {
  const reduce = useReducedMotion()
  const reveal = (d = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-12%' },
          transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
        }

  return (
    <section id="who-i-am" className="relative border-t border-white/10">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid grid-cols-12 gap-y-14 lg:gap-x-20">

          {/* Left: the statement */}
          <div className="col-span-12 lg:col-span-5">
            <motion.div {...reveal()}>
              <Eyebrow className="mb-7">Who I am</Eyebrow>
            </motion.div>

            <motion.h2
              {...reveal(0.04)}
              className="font-display text-[clamp(2.4rem,6vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-hero-ink"
            >
              Curious by nature<span className="text-hero-hot">.</span>
            </motion.h2>

            <motion.p
              {...reveal(0.1)}
              className="mt-8 max-w-lg text-[16px] leading-relaxed text-[#b9c0dd] sm:text-[17px]"
            >
              UX Analyst at SSL Wireless. I design banking, healthcare, and
              enterprise products for people stepping into digital finance for
              the very first time. Making the unfamiliar feel obvious is the
              work.
            </motion.p>

            <motion.p
              {...reveal(0.14)}
              className="mt-5 max-w-lg text-[15px] leading-relaxed text-hero-mute sm:text-[16px]"
            >
              The same attention I give to a good story or a late-night sketch is
              what I bring to every screen I ship.
            </motion.p>

            <motion.div {...reveal(0.18)} className="mt-10">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-hero-mute">
                AI in my workflow
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {AI_TOOLS.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[13px] text-[#b9c0dd]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right: the personal 2x2 */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2">
              {PERSONAL.map((p, i) => {
                const Mark = Icon[p.icon]
                return (
                  <motion.div key={p.label} {...reveal(0.06 + i * 0.06)}>
                    <Mark className="h-6 w-6 text-hero-mute/70" aria-hidden="true" />
                    <h3 className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-hero-mute">
                      {p.label}
                    </h3>
                    <span aria-hidden className="mt-2.5 block h-px w-9 bg-white/15" />
                    <p className="mt-3.5 text-[15px] font-semibold leading-snug text-hero-ink sm:text-[16px]">
                      {p.title}
                    </p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-hero-mute">
                      {p.sub}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
