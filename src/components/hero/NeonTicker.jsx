/* ─────────────────────────────────────────────────────────────────────────────
   NeonTicker — the strip along the bottom of the hero.

   It carries facts, not filler. Every item is something true and useful to a
   person deciding whether to keep reading: where she is, how long she has been
   doing this, what the work is, and whether she is open to more of it. A
   marquee of invented metrics would have been easier and worth nothing.

   Duplicated content is how a seamless marquee works: the track holds the list
   twice and translates -50%, so the loop point lands exactly where it started.
   The copy is `aria-hidden` so a screen reader hears each fact once.
   ───────────────────────────────────────────────────────────────────────────── */

/* Nothing here repeats what the hero already states in place. "8 yrs · Dhaka,
   BD" sits next to the call to action, so the ticker carries the coordinates
   alone; the old bottom-right coordinates HUD was removed for the same reason. */
const ITEMS = [
  { text: 'Available for work', tone: 'magenta' },
  { text: 'UX strategy · Product thinking · Interaction design', tone: 'dim' },
  { text: '23.8103° N, 90.4125° E', tone: 'cyan' },
  { text: 'Banking · Payments · Platform', tone: 'dim' },
  { text: '3 case studies', tone: 'cyan' },
]

const TONE = {
  magenta: 'text-hero-magenta',
  cyan: 'text-hero-cyan',
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
            'linear-gradient(90deg, #05070f 0%, transparent 9%, transparent 91%, #05070f 100%)',
        }}
      />
      <div className="hero-marquee flex w-max items-center">
        <Run />
        <div aria-hidden="true" className="flex items-center">
          <Run />
        </div>
      </div>
    </div>
  )
}
