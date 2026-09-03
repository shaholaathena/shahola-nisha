/* ─────────────────────────────────────────────────────────────────────────────
   NeonTicker — the strip along the bottom of the hero.

   It carries facts, not filler. Every item is something true and useful to a
   person deciding whether to keep reading: where she is, how long she has been
   doing this, what the work is, and whether she is open to more of it. A
   marquee of invented metrics would have been easier and worth nothing.

   Duplicated content is how a seamless marquee works: the track holds the list
   N times and translates -(100/N)%, so the loop point lands exactly where it
   started. Every copy after the first is `aria-hidden`, so a screen reader
   hears each fact once however many are rendered.

   N IS FOUR, NOT TWO, AND THAT IS A BUG FIX. With two copies the strip
   translates by a full copy's width, which leaves the last copy's tail edge
   inside the frame — so a viewport WIDER than one copy shows bare strip at the
   loop. One copy is about 1165px here and the gap was visible at any desktop
   width; it was simply never noticed at the widths it was checked at. With
   four copies the content behind the shift is three copies wide, so the strip
   stays full to roughly 3500px.

   The travel distance is unchanged — one copy width either way — so 38s still
   moves at exactly the same speed. Only the runway got longer.

   If the item list changes length, this stays correct: the percentage is tied
   to the number of copies, not to their content.
   ───────────────────────────────────────────────────────────────────────────── */

/* Nothing here repeats what the hero already states in place — "8 yrs · Dhaka,
   BD" sits next to the call to action, so this strip must not say Dhaka again.

   It used to solve that by printing the coordinates instead: 23.8103° N,
   90.4125° E. Technically not a repeat, and useless — nobody reads a latitude
   off a moving strip, so the slot cost a fifth of the loop and returned a
   decoration. "Shipped into banks" is the same length and actually says
   something.

   No count in it, deliberately. "Six banks shipped" was the first attempt and
   it has the same defect "3 case studies" did: a number that has to be revised
   by hand every time the work changes, sitting in a file nobody would think to
   open. The claim is stronger without it anyway — the specific banks are named
   on /about, which is where a reader who wants the list should end up. The
   phrasing echoes that page's own "SHIPPED INTO" label on purpose.

   "3 case studies" went for a different reason: it counted the site's own
   pages. A visitor who wants to know how many case studies there are is
   already on their way to /work, and a number that changes whenever a case
   study is added is a maintenance trap in a file nobody would think to open. */
const ITEMS = [
  { text: 'Available for work', tone: 'hot' },
  { text: 'UX strategy · Interaction design · Front-end', tone: 'dim' },
  { text: 'Banking · Payments · Platform', tone: 'dim' },
]

const TONE = {
  hot: 'text-hero-hot',
  signal: 'text-hero-signal',
  dim: 'text-hero-mute',
}

function Run() {
  return (
    <>
      {ITEMS.map((item, i) => (
        <span key={`${item.text}-${i}`} className="flex shrink-0 items-center">
          <span className={`font-mono text-[10px] uppercase tracking-[0.26em] ${TONE[item.tone]}`}>
            {item.text}
          </span>
          {/* Separator, not decoration: it is the only thing telling you where
              one fact ends and the next begins in a single scrolling line. */}
          <span className="mx-7 h-[3px] w-[3px] shrink-0 rotate-45 bg-hero-violet/50" />
        </span>
      ))}
    </>
  )
}

export default function NeonTicker() {
  return (
    <div
      data-ticker
      className="absolute inset-x-0 bottom-0 z-20 overflow-hidden border-t border-hero-violet/15 bg-hero-void/55 py-3 backdrop-blur-[2px]"
    >
      {/* Edge fade, so items enter and leave the strip instead of being
          clipped by a hard vertical edge. */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(90deg, #05101f 0%, transparent 9%, transparent 91%, #05101f 100%)',
        }}
      />
      <div className="hero-marquee flex w-max items-center">
        <Run />
        {[1, 2, 3].map((i) => (
          <div key={i} aria-hidden="true" className="flex items-center">
            <Run />
          </div>
        ))}
      </div>
    </div>
  )
}
