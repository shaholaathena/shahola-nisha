import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { softStops } from '../../lib/softGradient'
import skyStars from '../../assets/hero/sky.svg'
import mountains from '../../assets/hero/mtn-back.svg'
import cityscape from '../../assets/hero-creative/cityscape2.svg'

/* ─────────────────────────────────────────────────────────────────────────────
   AboutAtmosphere — one sky for the whole page.

   The problem this exists to fix: AboutIntro carried a night backdrop and
   CTASection carried a gold pool, and between them sat roughly 2,300px of flat
   navy separated by hairlines. The lights came on for the hero, went out for
   the entire middle of the page, and came back for the last screen. Measured
   down the scroll, four consecutive sections had no background treatment at
   all, three of them in the identical rail-and-content shape. That is what made
   the page read as a document rather than as part of this site.

   So the atmosphere is not per-section. It is a single layer behind the whole
   of `main`, and the sections stay transparent and sit on it. AboutIntro's own
   backdrop is opaque and simply covers this in the hero region, which is why
   the hero needed no change to accommodate it.

   ── `horizon` ──

   The range and skyline are anchored to the FOOT of this layer, which suits a
   page that ends on something sparse. /about ends on the contact band, so they
   read as a horizon under it.

   /work does not: it ends on a nine-card grid, and the skyline came up through
   the bottom third of it — mountains and lit windows showing between project
   covers. So the horizon is a prop. Off, what remains is the graduated sky and
   the star field, which sit behind anything.

   Worth noting the name is now wrong: two pages use this, not just About. A
   rename to something like `NightSky` is overdue and is only held up by being
   churn across two imports.

   ── Why this uses the homepage's actual artwork ──

   For a while this was a CSS gradient and 70 drawn dots, and it never once read
   as the same site. Comparing the two pages layer by layer says why: the
   homepage runs THIRTEEN planes built from real drawings — `sky.svg`,
   `moon.png`, `mtn-back.svg`, `cityscape2.svg`, plus clouds, comets and shafts.
   Its identity is an illustrated night landscape. A gradient cannot become a
   mountain range no matter how it is tuned, so the artwork itself is here now:
   the same star field at the top, the same range, and the same skyline at the
   foot so the scroll ends on the horizon the homepage opens on.

   ── Why that does not repeat the readability mistake ──

   An earlier pass added gold blooms and had to be torn out, because screen
   blends LIGHTEN the ground the copy sits on and drove `text-hero-mute` from
   6.57:1 to 3.63:1. These layers are the opposite: mountains and city are dark
   silhouettes composited at reduced brightness, so they push the background
   DOWN. Contrast improves where they sit rather than degrading. The one light
   source in the homepage's scene — the moon and its halo — is deliberately not
   here, because that is the piece that would have to sit behind body copy.

   What remains lifting nothing: a dark graduated sky, the star field, a sparse
   drawn twinkle over it, silhouettes at the foot, and edge shading.

   The homepage's scanline layer was carried over and then removed. A 1px-on,
   2px-off repeating gradient is meant to read as texture; over thousands of
   pixels of near-flat navy it read as banding instead — visible horizontal
   stripes across the whole page rather than a surface. It works on the hero
   because there is a detailed illustration under it to break it up.

   `hero-twinkle` is a global utility in index.css, already inside a
   `prefers-reduced-motion` block that stops it, so this file needs no
   reduced-motion handling of its own. Nothing here is information: it is all
   `aria-hidden` and `pointer-events-none`, and the page has to work with the
   whole layer deleted.
   ───────────────────────────────────────────────────────────────────────────── */

/* Deterministic, so the field never reshuffles on a re-render — the same
   sin-seeded trick AboutIntro and NightScene both use.

   Sparser than the hero's (which runs 46 stars over one viewport). This layer
   covers the entire scroll, several thousand pixels, so the same density would
   read as static rather than as sky. The count is tuned to the page height, not
   to the hero's number. */
const STARS = Array.from({ length: 130 }, (_, i) => {
  const r = (n) => {
    const x = Math.sin((i + 1) * n) * 10000
    return x - Math.floor(x)
  }
  const bright = r(43.12) > 0.74
  return {
    left: `${(r(12.9898) * 100).toFixed(2)}%`,
    /* Starts at 18%, below the intro. The intro already has the top star
       field behind it, and twinkles scattered round her portrait as well made
       that sky busier than the portrait itself. */
    top: `${(18 + r(78.233) * 80).toFixed(2)}%`,
    size: bright ? 2 : 1,
    /* Per-star floor and ceiling, so the layer has stars that pulse hard and
       stars that barely move. A uniform blink reads as a broken pixel. */
    min: (0.10 + r(4.53) * 0.18).toFixed(2),
    max: (0.34 + r(9.71) * 0.34).toFixed(2),
    /* Durations spread across a wide, non-round range so no two stars fall into
       a shared rhythm — the same reason the homepage's loops are coprime. */
    dur: `${(3.4 + r(21.7) * 5.3).toFixed(2)}s`,
    delay: `-${(r(33.1) * 7).toFixed(2)}s`,
  }
})

gsap.registerPlugin(ScrollTrigger)

/* The pools of light, in page px. `r` is the ellipse's radii, so each element
   is twice that; the gradient fades out by 70% of the way to its edge. */
const NEBULAE = [
  /* The first one sits under the portrait and runs down into Experience, so
     the light she stands in and the first pool below are one continuous glow
     rather than two lights with a dark band between them. */
  { x: '74%', y: 960, rx: 900, ry: 640, rgb: '88 118 205', a: 0.1 },
  { x: '8%', y: 1900, rx: 860, ry: 580, rgb: '169 156 240', a: 0.08 },
  { x: '90%', y: 2560, rx: 800, ry: 540, rgb: '99 132 230', a: 0.1 },
  { x: '12%', y: 3240, rx: 880, ry: 560, rgb: '169 156 240', a: 0.08 },
  { x: '80%', y: 3900, rx: 820, ry: 520, rgb: '99 132 230', a: 0.09 },
]

// Falloffs with no edge; see lib/softGradient.
const soft = softStops

/* ── Parallax ──

   The sky used to scroll as one flat sheet with the copy, so nothing in it
   ever read as further away than the text on top. Now each layer moves by its
   own amount as it passes through the viewport: `data-depth` is how many px it
   travels either side of where it is drawn, and the further back a layer is,
   the more it holds still against the scroll. Stars furthest, then the light,
   then the range; the skyline is nearest and moves least.

   Each layer rests at its drawn position when it is centred in view — the
   `-d → +d` range is symmetric about that point — so the composition this file
   describes is still what you see when you look at it. The skyline is the
   exception: the page ends before it can reach the middle of the screen, so it
   instead arrives at its drawn place exactly at the bottom of the scroll.

   Scrubbed straight off the scroll, which is Lenis's (SmoothScroll feeds its
   position to ScrollTrigger), so the drift has the page's own inertia and needs
   no smoothing of its own. Transform only. Nothing under reduced motion. */
const DEPTH = { stars: 170, light: 110, range: 60, skyline: 70 }

/* `parallax={false}` for a page that does not scroll — /work is one locked
   viewport, and a layer tied to a scroll that never happens just sits at its
   start offset, which pushed the skyline 70px down and out of frame there. */
/* `topStars` is the strength of the star field across the top of the page.
   About passes it lower than the default: that field sits behind the intro,
   and at full strength the sky around her portrait was busier than the
   portrait. /work keeps the default under its own veil. */
export default function AboutAtmosphere({ horizon = true, parallax = true, topStars = 0.8 }) {
  const root = useRef(null)

  useEffect(() => {
    const el = root.current
    if (!el || !parallax) return undefined
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      el.querySelectorAll('[data-depth]').forEach((layer) => {
        const d = Number(layer.dataset.depth)
        gsap.fromTo(
          layer,
          { y: -d },
          { y: d, ease: 'none', scrollTrigger: { trigger: layer, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      })

      el.querySelectorAll('[data-depth-end]').forEach((layer) => {
        gsap.fromTo(
          layer,
          { y: Number(layer.dataset.depthEnd) },
          { y: 0, ease: 'none', scrollTrigger: { trigger: layer, start: 'top bottom', end: 'max', scrub: true } },
        )
      })

      /* The first star field and the drawn twinkle start at the very top, so
         they have no "centred" moment to rest on: they sit where drawn at the
         top of the page and drift down as it scrolls away. */
      gsap.to(el.querySelectorAll('[data-drift]'), {
        y: (i, target) => Number(target.dataset.drift),
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'max', scrub: true, invalidateOnRefresh: true },
      })
    })
    return () => mm.revert()
  }, [horizon, parallax])

  return (
    <div ref={root} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* The sky. It was held between #05101f and #071528 — so dark and so
          grey that beside the homepage it read as charcoal, not night, and
          crossing from / to /about changed the colour of the whole site. It now
          takes the homepage sky's own navy (NightScene's ramp runs #061529 →
          #0b2144 → #183a66), stopping at #0b2144: the deepest blue that ramp
          reaches while the page's smallest type still clears 4.5:1 on it
          (`text-hero-mute` is 5.5:1 at #0b2144, 4.8:1 at #102c56, which is
          too close to the line to put under body copy for a whole page).

          The top is NOT the void. It was, and the intro sat on the darkest band
          of the page with the portrait's blue aura lit up inside it, so the
          hero read as a dark block with a bright patch and the navy of the
          sections began below it as a separate colour. It now opens at
          #061328 and reaches the page's navy by a quarter of the way down,
          through small steps, so the intro and Experience share one sky. Only
          the foot still settles to the void, under the footer.

          An earlier pass ran this out to #102440 with gold blooms screened over
          it. That is the version that cost readability, and the numbers were
          not close: `text-hero-mute` measures 6.57:1 on the flat void, and a
          gold bloom bright enough to see drove the same labels to 3.63:1 — so
          far under 4.5:1 that the only way to keep the glow was to lighten the
          ink, which is the wrong end of the problem to fix. The glow is gone
          and the ink is back to the token.

          Then taken one step darker on request: the peak is #0a1c3b rather
          than #0b2144, every stop scaled down with it. Still navy, not
          charcoal, and darker only widens the contrast margins above.

          So: blue rather than bright. No blooms, no screened light; only the
          hue of the ground moves toward the homepage's, and the interest on
          this page still comes from type and structure rather than light. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #051024 0%, #06132a 4%, #07162f 9%, #081833 15%,' +
            ' #081935 24%, #091b38 38%, #0a1c3b 54%, #091b38 67%, #081935 78%,' +
            ' #07162d 86%, #06142a 92%, #051126 96%, #05101f 100%)',
        }}
      />



      {/* ── Nebulae ──

          The sky alone was one flat colour for four thousand pixels: navy now
          rather than charcoal, but still a solid ground, and she did not want a
          solid ground. The homepage's night has depth because light sits in it.
          These are that light — broad, soft pools of the cool counter-light and
          the violet the homepage already uses, alternating sides down the page
          so each section sits in a slightly different part of the sky.

          Cool only, never gold: the gold bloom is what once took the page's
          smallest labels to 3.6:1. At these strengths the worst point — the
          centre of a pool over the bluest band of the sky — keeps
          `text-hero-mute` at 4.8:1. Positioned in px from the top, not %, so
          the pools keep their shape however tall the page is. */}
      {NEBULAE.map((n) => (
        <div
          key={n.y}
          data-depth={DEPTH.light}
          className="absolute will-change-transform"
          style={{
            left: `calc(${n.x} - ${n.rx}px)`,
            top: n.y - n.ry,
            width: n.rx * 2,
            height: n.ry * 2,
            background: `radial-gradient(closest-side, ${soft(n.rgb, n.a)})`,
          }}
        />
      ))}

      {/* The same star field again, further down, so the stars do not stop
          where the intro ends. Two more bands of the supplied artwork, each
          faded at both ends so no band has an edge, fainter than the first,
          and mirrored or flipped so the repeat is not recognisable. */}
      {[
        { top: 1250, flip: 'scaleX(-1)', opacity: 0.5 },
        { top: 2550, flip: 'scaleY(-1)', opacity: 0.42 },
      ].map((band) => (
        <div
          key={band.top}
          data-depth={DEPTH.stars}
          className="absolute inset-x-0 h-[1100px] will-change-transform"
          style={{
            top: band.top,
            maskImage:
              'linear-gradient(180deg, transparent 0%, #000 22%, #000 70%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(180deg, transparent 0%, #000 22%, #000 70%, transparent 100%)',
          }}
        >
          <img
            src={skyStars}
            alt=""
            className="h-full w-full object-cover"
            draggable="false"
            style={{ filter: 'saturate(0.22)', opacity: band.opacity, transform: band.flip }}
          />
        </div>
      ))}

      {/* The supplied field, top of the page. Held to a fixed 1100px rather
          than a percentage: this layer is thousands of pixels tall and a
          percentage would stretch a star field into streaks. Masked out at the
          foot so it ends in sky rather than on an edge. */}
      <div
        data-drift="320"
        className="absolute inset-x-0 top-0 h-[1100px] will-change-transform"
        style={{
          maskImage:
            'linear-gradient(180deg, #000 0%, #000 46%, rgba(0,0,0,0.45) 74%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(180deg, #000 0%, #000 46%, rgba(0,0,0,0.45) 74%, transparent 100%)',
        }}
      >
        <img
          src={skyStars}
          alt=""
          className="h-full w-full object-cover"
          draggable="false"
          /* Desaturated hard. The artwork's stars are 342 in #50FFFF — pure
             cyan — and 59 in #5095FF. On the homepage they sit inside a
             neon-lit city and read as part of that scene; over this page's
             plain dark sky the same dots read as coloured noise rather than
             stars. At 0.22 they keep a cool cast and nothing more. */
          style={{ filter: 'saturate(0.22)', opacity: topStars }}
        />
      </div>

      {horizon && (
      <>
      {/* The range, left, above the skyline. Sat 300px off the foot at first,
          which put it directly behind the contact band's small labels; it is
          560px up now, where the only thing over it is the closing headline in
          full-strength ink. Both edges fade so it is cut off by the frame
          rather than stopping in open sky — NightScene's treatment, same
          reason. Brightness 0.8 rather than the 0.42 first tried: this artwork
          is already dark (NightScene has to push it to 1.35 to read at all),
          so 0.42 was very nearly invisible. */}
      <div
        data-depth={DEPTH.range}
        className="absolute bottom-[480px] left-0 hidden h-[280px] w-[58%] will-change-transform sm:block"
        style={{
          maskImage:
            'linear-gradient(90deg, #000 0%, #000 44%, rgba(0,0,0,0.55) 72%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(90deg, #000 0%, #000 44%, rgba(0,0,0,0.55) 72%, transparent 100%)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            maskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 10%, #000 24%, #000 100%)',
            WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 10%, #000 24%, #000 100%)',
          }}
        >
          <img
            src={mountains}
            alt=""
            className="h-full w-full object-cover"
            draggable="false"
            style={{ objectPosition: '38% 24%', filter: 'brightness(0.8) saturate(0.35) contrast(1.02)' }}
          />
        </div>
      </div>


      {/* The skyline, anchored to the very bottom. Brightness 0.26 against the
          0.52 NightScene uses: there it is the subject, here it is scenery
          under a contact band, and the artwork's lit windows are the one thing
          in these layers capable of lifting the background rather than
          lowering it.

          Height and onset are set against the range above it, not chosen. At
          380px with a 48% onset the skyline first appeared 362px below the
          mountains' foot, leaving a band of flat empty sky between two pieces
          of one landscape — they read as two unrelated images rather than a
          horizon. 560px at a 15% onset brings its top up to meet the foot, so
          the range now sits on the skyline the way it does on the homepage. */}
      <div
        data-depth-end={DEPTH.skyline}
        className="absolute inset-x-0 bottom-0 h-[560px] will-change-transform"
        style={{
          maskImage:
            'linear-gradient(180deg, transparent 0%, transparent 15%, rgba(0,0,0,0.3) 34%, rgba(0,0,0,0.72) 60%, #000 82%)',
          WebkitMaskImage:
            'linear-gradient(180deg, transparent 0%, transparent 15%, rgba(0,0,0,0.3) 34%, rgba(0,0,0,0.72) 60%, #000 82%)',
        }}
      >
        <img
          src={cityscape}
          alt=""
          className="h-full w-full object-cover"
          draggable="false"
          style={{ objectPosition: '50% 84%', filter: 'brightness(0.26) saturate(0.28) contrast(1.06)' }}
        />
      </div>

      <div data-drift="220" className="absolute inset-0 will-change-transform">
      {STARS.map((s, i) => (
        <span
          key={i}
          className="hero-twinkle absolute rounded-full bg-white"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            '--tw-min': s.min,
            '--tw-max': s.max,
            '--tw-dur': s.dur,
            '--tw-delay': s.delay,
          }}
        />
      ))}
      </div>


      {/* Ground. The skyline now runs behind the footer, and the foot of that
          artwork is where its lit windows are brightest — directly under 10px
          mono copyright text. This settles the last 150px back toward the void
          so the copy has something dark to sit on, which is also what the base
          of a real skyline looks like. */}
      <div
        className="absolute inset-x-0 bottom-0 h-[150px]"
        style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(5,16,31,0.72) 55%, #05101f 100%)' }}
      />
      </>
      )}

      {/* Horizontal, not radial. A radial vignette assumes a frame with a
          centre; this layer is thousands of pixels tall and has no centre, so
          the darkening runs down the left and right edges instead and holds the
          column together for the whole scroll. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            `linear-gradient(90deg, ${soft('3 10 24', 0.4, 22)}),` +
            `linear-gradient(270deg, ${soft('3 10 24', 0.4, 22)})`,
        }}
      />
    </div>
  )
}
