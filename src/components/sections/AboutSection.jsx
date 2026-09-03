import SectionRow from '../about/SectionRow'

/* ─────────────────────────────────────────────────────────────────────────────
   Strengths and clients.

   The reference page puts a "My super powers" grid under a left-margin label,
   and that shape suits this material better than the prose version it replaced.
   Each strength here is drawn from a decision that actually shipped and names
   the case study it came from, so the grid reads as evidence rather than as a
   values statement — the difference between "I'm good at design systems" and
   "five banks ship this app and it holds".

   Where the reference then runs a band of personal photographs, this runs the
   institutions the work shipped into. Same structural beat, and the only
   honest equivalent available here: the client list IS the credential.
   ───────────────────────────────────────────────────────────────────────────── */
const STRENGTHS = [
  {
    title: 'Clarity where it costs',
    body: 'Most of my work ships where a mistake costs someone real money: a farmer moving funds, a shopkeeper taking a first digital payment. A screen is not done when it looks right, it is done when a first-time user can finish it without help.',
    source: 'myBKB · Bangladesh Krishi Bank',
  },
  {
    title: 'Systems that survive rebranding',
    body: 'Five banks ship the same merchant app under five different brands. That only holds because components bind to meaning, never to a colour. The rule matters more than any component in the library.',
    source: 'Bangla QR Merchant Platform',
  },
  {
    title: 'Design and development',
    body: 'I write the front-end I design. Being able to build what I draw means fewer decisions get quietly renegotiated between the file and the release, and I can tell what is expensive before it is drawn.',
    source: 'Across the practice',
  },
  {
    title: 'Sequence as a tool',
    body: 'Order is a design decision. Setting up payments is the step a shop owner is most likely to abandon, so putting it after identity and delivery meant it arrived once there was momentum to spend.',
    source: 'ZCOMMERZ',
  },
]

/* Real institutions the work has shipped into. Substance in place of decoration. */
const CLIENTS = [
  'Bangladesh Krishi Bank', 'Southeast Bank', 'NCC Bank', 'Rupali Bank',
  'Janata Bank', 'Basic Bank', 'SSLCOMMERZ', 'UNDP', 'BAT', 'Easy Health', 'Willro',
]

export default function AboutSection() {
  return (
    <>
      <SectionRow id="about" label="What I'm good at" meta="Four things that held">
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
          {STRENGTHS.map((s) => (
            <article key={s.title}>
              <h3 className="font-display text-[1.15rem] font-semibold leading-snug tracking-[-0.01em] text-hero-ink">
                {s.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-[#aeb6d6]">{s.body}</p>
              <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-hero-mute">
                {s.source}
              </p>
            </article>
          ))}
        </div>
      </SectionRow>

      <SectionRow id="think" label="Shipped into" meta={`${CLIENTS.length} institutions`}>
        <ul className="grid grid-cols-1 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
          {CLIENTS.map((c) => (
            <li
              key={c}
              className="border-b border-white/[0.06] py-3 text-[14px] leading-snug text-[#b9c0dd]"
            >
              {c}
            </li>
          ))}
        </ul>
      </SectionRow>
    </>
  )
}
