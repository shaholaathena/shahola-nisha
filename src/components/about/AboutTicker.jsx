/* ─────────────────────────────────────────────────────────────────────────────
   AboutTicker — the homepage's strip, once, closing the hero.

   Same mechanism as `hero/NeonTicker`: four copies of the list on a track that
   translates -25%, so the loop point lands exactly where it started. Two copies
   would leave bare strip at the loop on any viewport wider than one copy, which
   is documented at length over there and is not worth rediscovering here. Every
   copy after the first is `aria-hidden`, so the facts are announced once.

   It sits immediately under the hero. On the homepage the strip is an outro
   beneath a hero that does not scroll, so it reads as the base of that one
   composition; placed directly below AboutIntro it does the same thing here,
   closing the hero rather than interrupting the page. It also means the first
   thing that happens after the portrait is movement, which is the earliest
   point the page can say it belongs to the same site.

   Once, and only once. A second strip would stop being a link to the homepage
   and start being this page's tic.

   Content follows NeonTicker's rule: facts, no filler, and nothing the page
   already states in place. So no location (WhoIAm has a "Based in" card), no
   availability (the contact band says "Open to new work"), and no counts that
   have to be revised by hand. The first line is rescued from the strengths
   section that was deleted — it was the best claim on that page and it is true.
   ───────────────────────────────────────────────────────────────────────────── */
const ITEMS = [
  { text: 'I write the front-end I design', tone: 'hot' },
  { text: 'Healthcare · Internet banking · Merchants · LMS', tone: 'dim' },
  { text: 'Research · Prototyping · Design systems', tone: 'dim' },
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
          <span className="mx-7 h-[3px] w-[3px] shrink-0 rotate-45 bg-hero-violet/50" />
        </span>
      ))}
    </>
  )
}

export default function AboutTicker() {
  return (
    <div className="relative overflow-hidden border-y border-hero-violet/15 bg-hero-void/40 py-3.5 backdrop-blur-[2px]">
      {/* Edge fade, so items enter and leave rather than being guillotined by
          the viewport edge. */}
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
