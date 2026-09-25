/* ─────────────────────────────────────────────────────────────────────────────
   WhoIAm — her own "Curious by nature" section, as a section.

   Rebuilt onto the page's new section architecture. It used to be a two-column
   split: the statement stacked down the left, the personal facts as a 2x2 of
   cards on the right. That was fine on its own and wrong next to Experience and
   What I do, which now both open with a full-width statement and run their
   content beneath it — this was the last section still splitting the fold
   vertically, and it read as a different page.

   That split has since gone too; see "Four small lights" below.

   ── Copy ──

   The statement and its supporting line are hers: "I notice the little things"
   over "Curious about people, drawn to details...". They replace "Curious by
   nature" and the paragraph that used to open this section with her job title
   and employer.

   Losing that paragraph costs the page nothing. AboutIntro already opens with
   "A design engineer based in Dhaka, turning complex requirements into simple,
   intuitive products ...", and the Experience timeline names SSL
   Wireless as the current role two sections above this one. Saying it a third
   time here was the weakest use of the most prominent paragraph in the section.

   Copy is hers verbatim, with one change: "UX Analyst at SSL Wireless — I
   design ..." lost its em dash, because this project does not use them.

   ── Layout ──

   Back on its original 2x2 beside the statement, after an editorial-row
   version and a card version were both tried. What those rounds kept is the
   motion: on hover the label turns gold and the fact leans in a few pixels,
   200ms, transform and colour only, and only on devices that hover.

   No icons. Each item used to open on a line icon (a note, a book, a pen, a
   pin) directly above a label saying the same word, so the mark said
   everything twice, and no other section on the page uses icons. The mono
   label now leads each item, as it does everywhere else.

   ───────────────────────────────────────────────────────────────────────────── */
import { motion, useReducedMotion } from 'framer-motion'
import SectionIntro from './SectionIntro'
import { SPLIT, MAIN } from './columns'

const PERSONAL = [
  { label: 'Music',    title: 'Alt-rock & nostalgic playlists', sub: 'Evanescence · Radiohead · and more in rotation' },
  { label: 'Reads',    title: 'Stories that stay with me',      sub: 'Harry Potter · Pather Panchali · among favorites' },
  { label: 'Hobbies',  title: 'Sketching ideas & amateur art',  sub: 'Coffee, pen & paper' },
  { label: 'Based in', title: 'Dhaka, Bangladesh',              sub: 'GMT+6 · Open to remote' },
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
    <section id="who-i-am" className="relative">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10 lg:py-24">
        <div className={SPLIT}>
          <div>
            <SectionIntro eyebrow="Who I am">
              Drawn to the <span className="text-hero-hot">little things</span>.
            </SectionIntro>
          </div>

          <div className={`${MAIN} grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2`}>
            {PERSONAL.map((p, i) => (
                <motion.div key={p.label} {...reveal(0.06 + i * 0.06)} className="group">
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-hero-mute transition-colors duration-200 ease-out group-hover:text-hero-hot">{p.label}</h3>
                  <span
                    aria-hidden
                    className="mt-2.5 block h-px w-12 bg-white/15 transition-all duration-500 group-hover:w-20 group-hover:bg-white/35"
                  />
                  <div className="transition-transform duration-200 ease-out group-hover:translate-x-1">
                    <p className="mt-3.5 text-[15px] font-semibold leading-snug text-hero-ink sm:text-[16px]">{p.title}</p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-hero-mute">{p.sub}</p>
                  </div>
                </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
