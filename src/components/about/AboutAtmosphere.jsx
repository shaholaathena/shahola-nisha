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
const STARS = Array.from({ length: 70 }, (_, i) => {
  const r = (n) => {
    const x = Math.sin((i + 1) * n) * 10000
    return x - Math.floor(x)
  }
  const bright = r(43.12) > 0.74
  return {
    left: `${(r(12.9898) * 100).toFixed(2)}%`,
    /* Starts at 14%: above that is the hero, which paints over this anyway, and
       drawing stars nobody can see is just work for the compositor. */
    top: `${(14 + r(78.233) * 84).toFixed(2)}%`,
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

export default function AboutAtmosphere({ horizon = true }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* The sky. It does move, but only between #05101f and #071528 — a
          difference you register as depth rather than as a colour change, and
          small enough that the ground stays effectively as dark as the flat
          void it replaced.

          An earlier pass ran this out to #102440 with gold blooms screened over
          it. That is the version that cost readability, and the numbers were
          not close: `text-hero-mute` measures 6.57:1 on the flat void, and a
          gold bloom bright enough to see drove the same labels to 3.63:1 — so
          far under 4.5:1 that the only way to keep the glow was to lighten the
          ink, which is the wrong end of the problem to fix. The glow is gone
          and the ink is back to the token.

          What is left is dark, and the interest on this page now comes from
          type, structure and one moving strip instead of from light. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #05101f 0%, #061426 30%, #071528 56%,' +
            ' #061224 80%, #05101f 100%)',
        }}
      />



      {/* The supplied field, top of the page. Held to a fixed 1100px rather
          than a percentage: this layer is thousands of pixels tall and a
          percentage would stretch a star field into streaks. Masked out at the
          foot so it ends in sky rather than on an edge. */}
      <div
        className="absolute inset-x-0 top-0 h-[1100px]"
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
          className="h-full w-full object-cover opacity-80"
          draggable="false"
          /* Desaturated hard. The artwork's stars are 342 in #50FFFF — pure
             cyan — and 59 in #5095FF. On the homepage they sit inside a
             neon-lit city and read as part of that scene; over this page's
             plain dark sky the same dots read as coloured noise rather than
             stars. At 0.22 they keep a cool cast and nothing more. */
          style={{ filter: 'saturate(0.22)' }}
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
        className="absolute bottom-[480px] left-0 hidden h-[280px] w-[58%] sm:block"
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
        className="absolute inset-x-0 bottom-0 h-[560px]"
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
            'linear-gradient(90deg, rgba(2,3,10,0.45) 0%, transparent 17%,' +
            ' transparent 83%, rgba(2,3,10,0.45) 100%)',
        }}
      />
    </div>
  )
}
