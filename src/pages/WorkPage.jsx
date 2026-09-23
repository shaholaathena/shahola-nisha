import Navigation from '../components/layout/Navigation'
import AboutAtmosphere from '../components/about/AboutAtmosphere'
import WorkReel from '../components/work/WorkReel'

/* The work index, lifted out of the old single-page scroll.

   ── Night, not paper ──

   This page was on the light theme: a `#eef1ea` ground, `ink-primary` type and
   the `#93511b` accent. That was inherited from the case studies it links to,
   and it was wrong — the homepage and About are the night theme, and /work sits
   between them in the nav. Landing here from either one changed the entire
   surface of the site.

   It now runs the same night as About and shares its atmosphere layer, so the
   sky, the star field and the horizon are continuous across both pages rather
   than something About alone happens to have.

   NOTE: the three case-study pages are still paper, and each carries its own
   inline header rather than this `Navigation`. So /work → a case study is now
   the one remaining place the surface flips. That is a bigger conversion than
   this page and has not been done.

   ── Built to her reference ──

   Three parts, in the shape that reference sets out:

     · `WorkHero` — the statement, with the three case studies numbered along a
       curving star trail beside it.
     · `FeaturedCases` — one band per case study: big ghost numeral, category,
       editorial line, description, tags, a circular arrow control, and the
       cover on the opposite side, alternating.
     · `AllWork` — all nine as a grid of covers, numbered 01-09 continuing the
       bands above.

   A scroll-turned 3D helix sat in that last slot and was removed: its
   ScrollTrigger pin added a 1600px runway to the page and the pin did not hold,
   which left a screen and a half of empty navy under the work. AllWork.jsx
   records the diagnosis and what fixing the helix would require.

   This replaced `FeaturedWork`, which is no longer imported anywhere. That
   component listed the three as text rows and dumped the remaining six into a
   one-line-each archive with no images and no links — six of nine projects
   rendered as grey type while every one of their covers sat unused in the data
   file.

   The page also no longer needs its own `<header>`: WorkHero carries the h1,
   and its own top padding clears the fixed nav, so `pt-28` moved into it.

   */
export default function WorkPage() {
  return (
    <div className="relative h-screen overflow-hidden bg-hero-void text-hero-ink antialiased">
      <Navigation variant="hero" dark />

      {/* The homepage hero's night sky, one viewport tall, behind everything.

          It is `absolute`, not `fixed`, on purpose: an ancestor of this page
          carries `filter: blur(0px)`, which makes it the containing block for
          fixed descendants, so `fixed` here would not have stayed put anyway.
          Since the page no longer scrolls, absolute holds it exactly where it
          needs to be. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 h-screen w-full overflow-hidden">
        {/* The night sky, held well back.

            At full strength the star field, the range and the lit skyline all
            sit in the same tonal band as the covers — dark artwork on dark
            artwork — and the stacks never separate from it no matter how they
            are lit or arranged. Dropped to a third and veiled through the
            middle, the sky still reads as the same scene as the rest of the
            site but stops competing with the work in front of it. */}
        <AboutAtmosphere parallax={false} />
        {/* Muted with a veil rather than by wrapping the sky in an opacity
            layer. Opacity on that subtree forces the whole thing — large SVGs,
            masks and all — into an offscreen buffer on every composite, which
            was enough to lock the renderer up. A plain gradient painted over the
            top costs nothing and reads the same.

            Held back hardest behind the covers and the two type columns, and
            opened up toward the corners. At 0.62 even at the edges the stars
            were gone entirely and the page read as flat navy beside About's
            sky; the corners are where the sky can show without anything
            sitting on it. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(70% 62% at 50% 48%, rgba(5,16,31,0.93) 0%,' +
              ' rgba(5,16,31,0.74) 58%, rgba(5,16,31,0.34) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 h-screen">
        <main className="h-full">
          <WorkReel />
        </main>
      </div>

      {/* Header scrim. The page never scrolls, so the nav never gets the
          background it earns on scroll elsewhere, and the covers fly straight
          through the band it sits in: gold "Work" over a lit laptop screen was
          unreadable. The covers fade out under this strip instead. Above the
          reel (z-10), below the header (z-900). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[800] h-40"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,16,31,0.96) 0%, rgba(5,16,31,0.82) 45%, rgba(5,16,31,0) 100%)',
        }}
      />
    </div>
  )
}
