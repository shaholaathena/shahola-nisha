import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import AboutAtmosphere from '../components/about/AboutAtmosphere'
import WorkHero from '../components/work/WorkHero'
import FeaturedCases from '../components/work/FeaturedCases'
import AllWork from '../components/work/AllWork'

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
    <div className="min-h-screen bg-hero-void text-hero-ink antialiased">
      <Navigation variant="hero" dark />

      <div className="relative">
        {/* No horizon here: this page ends on a nine-card grid, and the
            skyline was coming up through the bottom third of it. */}
        <AboutAtmosphere horizon={false} />

        <div className="relative z-10">
          <main>
            <WorkHero />
            <FeaturedCases />
            <AllWork />
          </main>

          <Footer dark />
        </div>
      </div>
    </div>
  )
}
