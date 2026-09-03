/* ─────────────────────────────────────────────────────────────────────────────
   NightScene — Dhaka at night, as a payment network.

   History worth keeping, because it constrains everything below. An early
   version stacked mountains, a cityscape and a foreground from three different
   illustration sets; incompatible palettes and perspective made it a collage
   with hard crop seams. A later one used a warm 750x500 skyline that had to be
   stretched or tiled to span the frame, and looked it. Both failed the same
   way: the artwork was fighting the frame.

   `cityscape2.svg` does not, and that is why it is the only illustration here.
   1703x1200, buildings filling four fifths of the height, its own water
   reflections, and an opaque sky painted `#020423` — within a few values of
   this scene's own sky, so the seam has almost nothing to hide.

   Three rules hold the composition together:

     · The city's top edge is MASKED, never cropped. The fade runs through the
       artwork's sky band and into the rooflines, so the upper city goes to
       haze and the frame keeps a real sky above it. That is what lets the moon
       read as being above the city rather than inside it.
     · The city is COLOUR-GRADED, not left as drawn. The back towers are a
       dusty mauve far warmer than this palette. An indigo `mix-blend-color`
       pass takes hue and saturation while leaving luminance — which is what
       keeps the lit windows reading as lights — and two neon `screen` passes
       then light the city from two sides. The layer is `isolate`d so those
       blends stay inside the city and never touch the sky.
     · Everything left of about 45% stays quiet. The headline lives there, and
       the argument has to win over the atmosphere.

   Motion here is ambient only — three comets, twinkling stars and breathing
   light shafts — and all of it is CSS so the GSAP timeline in Hero.jsx is free
   to own the orchestrated moments. The comets replaced a field of forty-four
   rain streaks: rare crossings read as a real sky, where a permanent loop reads
   as an effect. Every ambient loop stops under `prefers-reduced-motion`, and the
   composed frame is complete without any of them.

   There is no neon signage layer. An earlier version hung flickering magenta
   and cyan bars on the buildings; they were the loudest thing in the frame and
   they were, plainly, lines drawn over a city rather than light coming out of
   one. The neon now comes from where light actually comes from: the two-sided
   `screen` passes on the city, the lit windows, the shafts, the horizon haze.

   Layers expose `data-layer` for that timeline; they are the contract.
   ───────────────────────────────────────────────────────────────────────────── */
import skyStars from '../../assets/hero/sky.svg'
import moon from '../../assets/hero/moon.png'
import mountains from '../../assets/hero/mtn-back.svg'
// Lives in hero-creative/ because that is where it was dropped; the other
// layers resolve from hero/. Worth unifying, but not worth a silent file move.
import cityscape from '../../assets/hero-creative/cityscape2.svg'
import ProcessWindows from './ProcessWindows'

/* ── Comets.

   A shared radiant: all three fall down-right at a similar shallow angle,
   because a meteor shower HAS a common direction — three comets pointing three
   ways reads as three separate effects. What differs is everything else: where
   they cross, how long the streak is, how bright, and how often.

   Every corridor here was checked against the two things it must not cross —
   the headline's box and the moon's disc — by sampling the rotated path. A
   first pass ran from 26% for 40vw and put four of eleven sample points inside
   the moon. These do not.

   `run` is both the wrapper's width and the travel distance; it is one variable
   because a corridor that does not match its own travel fails silently. ── */
const COMETS = [
  /* Timings are the whole point of this table, so read them together.

     `dur` is one full cycle and the streak is only visible for 3%-15% of it, so
     the four together put something across the sky about every 2.6 seconds —
     often enough to be noticed on arrival, nowhere near often enough to be
     rain. The first version used 17/11/23/29s and the answer was that nobody
     saw them: one crossing early, then an empty sky for five seconds.

     `delay` is POSITIVE and staggered, which is the other half of the fix. The
     entrance settles at ~1.6s, so the first comet is timed to cross just after
     it at ~1.8s, and the next three follow at roughly 3.1s, 4.6s and 6.5s. A
     negative delay put the first crossing underneath the entrance fade, where
     it was invisible.

     9/7/13/17 are pairwise coprime, and none is a multiple of the process
     walk's ~7.4s, so no two events lock into a visible rhythm. */
  // The event: longest streak, brightest head, thickest tail.
  { left: '10%', top: '4%', angle: 12, run: '30vw', streak: 'w-[19vw] max-w-[265px]',
    thick: 'h-[3px]', head: 5, tail: 'rgba(91, 157, 255,0.45)', tip: 'rgba(240,249,255,1)',
    bloom: '0 0 18px 4px rgba(150,220,255,0.95)', dur: '9s', delay: '1.5s' },
  // The quick one: seen most often, so kept small.
  { left: '30%', top: '2%', angle: 15, run: '20vw', streak: 'w-[9vw] max-w-[126px]',
    thick: 'h-[2px]', head: 4, tail: 'rgba(196,214,255,0.32)', tip: 'rgba(238,246,255,0.92)',
    bloom: '0 0 11px 2px rgba(190,215,255,0.8)', dur: '7s', delay: '2.9s' },
  // The far one: violet, fainter — depth rather than event.
  { left: '4%', top: '11%', angle: 9, run: '24vw', streak: 'w-[12vw] max-w-[168px]',
    thick: 'h-[2px]', head: 4, tail: 'rgba(169,156,240,0.30)', tip: 'rgba(224,218,255,0.85)',
    bloom: '0 0 12px 2px rgba(169,156,240,0.7)', dur: '13s', delay: '4.2s' },
  /* One in the empty sky RIGHT of the moon, which the other three never reach —
     three comets crossing the same patch read as one effect repeating. It runs
     off the frame edge rather than stopping inside it, so it reads as passing
     through rather than as an animation that ended. */
  { left: '84%', top: '4%', angle: 14, run: '16vw', streak: 'w-[7vw] max-w-[98px]',
    thick: 'h-[2px]', head: 4, tail: 'rgba(91, 157, 255,0.32)', tip: 'rgba(232,244,255,0.92)',
    bloom: '0 0 12px 2px rgba(150,220,255,0.85)', dur: '17s', delay: '6s' },
]

/* ── Twinkling stars.

   A sparse layer over the supplied field, whose stars cannot be animated
   individually. Deterministic pseudo-random, not Math.random, so the sky is
   identical on every render and across a fast refresh — a star that jumps
   position on a re-render is worse than no twinkle at all.

   Biased right and up: the layer is masked away from the left third, where the
   headline sits. A blinking dot behind type pulls the eye off the type even at
   2px. ── */
const STARS = (() => {
  const rand = (i, n) => (Math.sin((i + 1) * n) + 1) / 2
  const raw = Array.from({ length: 46 }, (_, i) => ({ i, score: rand(i, 51.7) }))

  /* Exactly five stars get a flare, chosen as the top five of a deterministic
     score rather than by a threshold. A threshold looks equivalent and is not:
     `score > 0.82` produced thirteen of forty-six, which is glitter, not a
     handful. Ranking makes the count the thing that is specified. */
  const flared = new Set(
    [...raw].sort((a, b) => b.score - a.score).slice(0, 5).map((s) => s.i)
  )

  return raw.map(({ i }) => {
    const r = (n) => rand(i, n)
    const bright = flared.has(i)
    return {
      left: 8 + r(12.9898) * 90,
      top: 2 + r(78.233) * 52,
      size: bright ? 2.4 : 1 + r(43.7) * 1.1,
      /* Near-zero trough: the star all but disappears and comes back, which is
         what reads as a blink. The earlier 0.1-0.3 floor only ever dimmed. */
      min: bright ? 0.12 : 0.04 + r(31.4) * 0.1,
      max: bright ? 1 : 0.55 + r(94.6) * 0.45,
      /* Bright stars still pulse slower than the faint ones — a fast hard blink
         on the flared stars reads as a fault light — but both are quicker now. */
      dur: (bright ? 2.6 : 1.2) + r(17.1) * 1.3,
      delay: -(r(63.2) * 6),
      tone: bright ? '#eaf4ff' : r(88.1) > 0.6 ? '#bfe9ff' : '#d7d0ff',
      bloom: bright,
    }
  })
})()

export default function NightScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">

      {/* ── Sky. Navy the whole way down, deepest at the top so the lit city
             below has something to be bright against, and opening out toward
             the rooflines where a city's light pollution actually sits. The
             ramp used to end on a dark plum, which fought the gold. ── */}
      <div
        data-layer="sky"
        className="absolute inset-0 -top-[6%] h-[112%]"
        style={{
          background:
            'linear-gradient(180deg, #030c1a 0%, #061529 26%, #0b2144 52%, #102c56 74%, #14345f 88%, #183a66 100%)',
        }}
      />

      {/* ── Stars. The supplied night sky, used only for its star field, edge-
             faded on all sides so it never shows the boundary of its canvas. ── */}
      <div
        data-layer="stars"
        className="absolute inset-0"
        style={{
          maskImage: 'radial-gradient(120% 100% at 50% 26%, #000 52%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(120% 100% at 50% 26%, #000 52%, transparent 100%)',
        }}
      >
        <img src={skyStars} alt="" className="h-full w-full object-cover opacity-90" draggable="false" />
      </div>

      {/* ── Twinkle. A second, sparse layer of drawn stars over the supplied
             field — see STARS for why it has to be separate. Masked off the
             left third so nothing blinks behind the headline. ── */}
      <div
        data-layer="twinkle"
        className="absolute inset-0"
        style={{
          maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.3) 24%, #000 46%, #000 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.3) 24%, #000 46%, #000 100%)',
        }}
      >
        {STARS.map((star, i) => (
          <span
            key={i}
            className="hero-twinkle absolute rounded-full"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              background: star.tone,
              /* Inline opacity is the reduced-motion resting value: with the
                 animation off, this is what shows. */
              opacity: star.max,
              boxShadow: star.bloom ? `0 0 7px 1px ${star.tone}` : undefined,
              '--tw-min': star.min,
              '--tw-max': star.max,
              '--tw-dur': `${star.dur.toFixed(2)}s`,
              '--tw-delay': `${star.delay.toFixed(2)}s`,
            }}
          >
            {/* Cross flare, on the brightest handful only. It is what makes a
                2px dot read as a star rather than as a pixel — and it is why
                the bright ones are rationed: on every star it would be glitter. */}
            {star.bloom && (
              <>
                <span
                  className="absolute left-1/2 top-1/2 h-px w-[15px] -translate-x-1/2 -translate-y-1/2"
                  style={{ background: `linear-gradient(90deg, transparent, ${star.tone}, transparent)` }}
                />
                <span
                  className="absolute left-1/2 top-1/2 h-[15px] w-px -translate-x-1/2 -translate-y-1/2"
                  style={{ background: `linear-gradient(180deg, transparent, ${star.tone}, transparent)` }}
                />
              </>
            )}
          </span>
        ))}
      </div>

      {/* ── Clouds. Low contrast, no hard edges — just enough to stop the sky
             reading as a flat gradient, now tinted by the city below. ── */}
      <svg data-layer="clouds" className="absolute inset-x-0 top-[6%] h-[54%] w-full" preserveAspectRatio="none" viewBox="0 0 100 54">
        <defs>
          <filter id="cloudsoft" x="-40%" y="-140%" width="180%" height="380%">
            <feGaussianBlur stdDeviation="3.6" />
          </filter>
        </defs>
        <g filter="url(#cloudsoft)">
          <ellipse cx="72" cy="15" rx="27" ry="2.6" fill="#7d76b8" opacity="0.20" />
          <ellipse cx="30" cy="25" rx="30" ry="2.4" fill="#5f5a95" opacity="0.15" />
          <ellipse cx="86" cy="34" rx="21" ry="2.1" fill="#c05a9a" opacity="0.12" />
        </g>
      </svg>

      {/* ══ MOUNTAINS, LEFT ═══════════════════════════════════════════════════
             Behind the city and in front of the clouds: a range on the horizon
             that the skyline stands in front of. Left only, and the artwork
             suits that without mirroring — its ridges step DOWN left to right,
             so the mass lands under the headline and thins out toward the moon,
             which is the way the composition already leans.

             The whole point is depth, not scenery. Everything below is aimed at
             keeping it a suggestion of mass behind the headline rather than a
             second subject competing with it. ── */}
      <div
        data-layer="mountains"
        className="absolute bottom-[34%] left-0 h-[40%] w-[52%] sm:w-[56%] lg:w-[60%]"
        style={{
          /* Right edge dissolves instead of ending: the range is cut off by the
             frame on the left, which reads as continuing, but a hard stop in
             open sky mid-frame reads as a pasted-in image. */
          maskImage: 'linear-gradient(90deg, #000 0%, #000 46%, rgba(0,0,0,0.6) 72%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, #000 0%, #000 46%, rgba(0,0,0,0.6) 72%, transparent 100%)',
        }}
      >
        {/* Second wrapper because the two fades run on different axes and one
            `mask-image` cannot hold both without mask-composite, whose WebKit
            spelling still differs. Vertical here: peaks dissolve into the sky
            (aerial perspective — the far ridge has the most air in front of it)
            and the foot dissolves into the horizon haze, so the range has no
            bottom edge of its own. */}
        <div
          className="absolute inset-0"
          style={{
            maskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.62) 7%, #000 18%, #000 78%, rgba(0,0,0,0.4) 100%)',
            WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.62) 7%, #000 18%, #000 78%, rgba(0,0,0,0.4) 100%)',
          }}
        >
          {/* Sky glow BEHIND the ridges. A night range reads as a dark shape
              against a lit horizon, so the ridge line needs something to be a
              silhouette against — the lift on the artwork below separates the
              far ranges from each other, and this separates the whole range
              from the sky. Pooled low and left, under the mass. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 76% 104% at 36% 90%, rgba(104,124,214,0.5) 0%, rgba(62,72,148,0.24) 40%, transparent 76%)',
            }}
          />

          {/* `objectPosition` keeps the ridge lines and crops the artwork's
              lower pines away — they would land under the opaque part of the
              city band anyway, so cropping them costs nothing and buys the
              peaks room.

              The X crop is the difference between a range and a smudge. At 0%
              the frame got the artwork's own left edge, which is a near-black
              mass with no internal ridge line — invisible against a night sky,
              so the left third of the hero showed nothing at all. 38% starts
              on the mid-tone ranges instead, which still step DOWN to the
              right, so the range leans the way the composition does.

              Brightened rather than darkened, which is the opposite of what
              this layer wants everywhere else: the artwork is dark navy on
              transparent, and against a #0a1030 sky the ridges were within a
              few percent luminance of the sky behind them. Contrast is pulled
              slightly BACK at the same time so the lift does not also raise
              the near mass — the far ridges gain, the near ones stay dark, and
              the range keeps its depth. */}
          <img
            src={mountains}
            alt=""
            className="h-full w-full object-cover"
            draggable="false"
            style={{ objectPosition: '38% 24%', filter: 'brightness(1.35) saturate(0.55) contrast(0.95)' }}
          />

          {/* Hue pass, same move as the city's: the artwork's haze band is a
              warm peach dawn, and this swings it to the scene's navy while
              leaving the ridge luminance alone. Without it the left horizon
              glows warm while the right one glows magenta, from two different
              times of day. */}
          <div className="absolute inset-0 mix-blend-color" style={{ background: '#14294f', opacity: 0.8 }} />

          {/* A touch of the moon's light on the ridges nearest it. The moon is
              up and right, so only the right-facing flanks catch anything. */}
          <div
            className="absolute inset-0 mix-blend-screen"
            style={{ background: 'radial-gradient(ellipse 60% 90% at 88% 22%, rgba(150,190,255,0.13) 0%, transparent 70%)' }}
          />

          {/* The headline sits on this exact patch of frame, so the range gives
              way to it — heaviest at the far left where the type starts. This
              is inside the mountain layer, not a scrim over the section, so it
              darkens the ridges without touching the sky or the stars. */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(94deg, rgba(4,6,16,0.7) 0%, rgba(4,6,16,0.44) 30%, rgba(4,6,16,0.14) 58%, transparent 82%)' }}
          />
        </div>
      </div>

      {/* ══ CITY ══════════════════════════════════════════════════════════════
             Bottom-anchored band rather than full-bleed. At full-bleed width
             this artwork is taller than the frame, so buildings filled it edge
             to edge and swallowed the moon. Banding it keeps a sky. ── */}
      <div
        data-layer="city"
        className="absolute inset-x-0 bottom-0 isolate h-[52%] sm:h-[58%] lg:h-[64%]"
      >
        {/* The mask lives on this wrapper rather than on the layer itself, so
            the lit windows below are NOT faded by it. They are light sources in
            the artwork, and hazing a light source dims the thing the haze is
            supposed to be revealing. The outer div stays the transform target,
            which keeps the GSAP selectors and the window anchors in the same
            coordinate space. */}
        <div
          className="absolute inset-0"
          style={{
            maskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.16) 12%, rgba(0,0,0,0.52) 26%, rgba(0,0,0,0.86) 40%, #000 54%, #000 100%)',
            WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.16) 12%, rgba(0,0,0,0.52) 26%, rgba(0,0,0,0.86) 40%, #000 54%, #000 100%)',
          }}
        >
        {/* `objectPosition` is load-bearing. Something has to be cropped; this
            chooses WHICH part survives — the lit mid-rise and the foreground,
            not the back towers whose tops we would only haze away anyway. */}
        <img
          src={cityscape}
          alt=""
          className="h-full w-full object-cover"
          draggable="false"
          style={{ objectPosition: '50% 84%', filter: 'brightness(0.52) saturate(0.42) contrast(1.08)' }}
        />

        {/* Hue pass. `color` takes hue and saturation from this fill and keeps
            the luminance underneath, so the mauve towers move to navy while the
            lit windows stay bright. `hue-rotate()` could not do this — it would
            have swung the teal foreground just as far the wrong way.

            Dropped from 0.66 to 0.52 along with the warm windows: at full
            strength it was overwriting the artwork's own window colour too,
            and the gold bloom above had to fight a hue pass that had already
            turned every pane blue. Leaving some of the baked warmth in means
            the bloom lands on windows that are already the right colour. */}
        <div className="absolute inset-0 mix-blend-color" style={{ background: '#153158', opacity: 0.52 }} />

        {/* ── Two-sided neon light. This is the whole cyberpunk move, and it is
               `screen` rather than a tint because neon ADDS light: gold from
               the low right where the city is densest, blue from mid-left
               where the traces run. Two sources, so the massing has a lit side and a
               cool side instead of one flat wash. ── */}
        <div
          data-layer="city-neon"
          className="absolute inset-0 mix-blend-screen"
          style={{
            background:
              'radial-gradient(ellipse 58% 52% at 78% 88%, rgba(232, 184, 98,0.30) 0%, rgba(232, 184, 98,0.09) 44%, transparent 74%),' +
              'radial-gradient(ellipse 52% 46% at 34% 70%, rgba(91, 157, 255,0.20) 0%, rgba(91, 157, 255,0.06) 46%, transparent 76%)',
          }}
        />

        {/* Window bloom. The artwork bakes its windows in, so the separable
            lights layer is faked as a bloom over the massing rather than drawn
            per pane.

            It is warm now, and that is a reversal: an earlier note here warned
            that a warm bloom over the artwork's pale yellow-green windows read
            as a different city entirely. The finding was right and the city is
            the one we want — lamplit rather than fluorescent. The value is the
            accent's own gold, so the windows and the copy are lit by one
            source instead of two that nearly match. */}
        <div
          data-layer="city-lights"
          className="absolute inset-0 mix-blend-screen opacity-45"
          style={{ background: 'radial-gradient(ellipse 76% 44% at 58% 76%, rgba(232,184,98,0.46) 0%, rgba(226,172,92,0.22) 44%, transparent 80%)' }}
        />

        {/* Aerial perspective, and the artwork's water at the very bottom,
            which should read as dark and still. */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(16,34,68,0.30) 74%, rgba(7,20,40,0.62) 100%)' }}
        />

        {/* The headline lives on the left, so the city quiets down there. This
            is inside the city layer on purpose — it darkens the buildings, not
            the sky, which the section-level scrim cannot tell apart. */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(96deg, rgba(5,16,31,0.90) 0%, rgba(5,16,31,0.72) 28%, rgba(5,16,31,0.30) 52%, transparent 74%)' }}
        />

        {/* ── Load sweep. Hero.jsx runs this bar up the city once, on entrance,
               and the windows appear to light as it passes. Parked off-frame
               and at zero opacity so it is invisible if that never runs. ── */}
        <div
          data-layer="scan"
          className="absolute inset-x-0 h-[38%] opacity-0 mix-blend-screen"
          style={{
            top: '100%',
            background: 'linear-gradient(180deg, transparent 0%, rgba(91, 157, 255,0.16) 42%, rgba(232, 184, 98,0.20) 72%, transparent 100%)',
          }}
        />
        </div>

        {/* Mounted INSIDE the city layer, not beside it: the lights sit on real
            windows in the artwork, so they have to inherit the same parallax
            and scroll scale the artwork gets, or they slide off their panes the
            moment anything moves. */}
        <ProcessWindows />
      </div>

      {/* ── Volumetric shafts. Skewed wedges rising off the city, breathing on
             a slow loop. Bottom transform origin so they pivot at their source
             rather than floating. ── */}
      <div data-layer="shafts" className="absolute inset-0 mix-blend-screen">
        <div
          className="hero-shaft absolute bottom-[18%] left-[54%] h-[52%] w-[16%] origin-bottom -skew-x-12"
          style={{ background: 'linear-gradient(0deg, rgba(91, 157, 255,0.16) 0%, transparent 82%)' }}
        />
        <div
          className="hero-shaft absolute bottom-[14%] left-[72%] h-[46%] w-[13%] origin-bottom skew-x-[9deg]"
          style={{ background: 'linear-gradient(0deg, rgba(232, 184, 98,0.18) 0%, transparent 80%)', animationDelay: '-4.5s' }}
        />
        <div
          className="hero-shaft absolute bottom-[20%] left-[88%] h-[40%] w-[11%] origin-bottom -skew-x-6"
          style={{ background: 'linear-gradient(0deg, rgba(169,156,240,0.15) 0%, transparent 80%)', animationDelay: '-8s' }}
        />
      </div>

      {/* ── Comets. In front of the city, behind the moon and the copy: they
             are things crossing the sky between the viewer and the skyline.

             Two nested elements each, because a rotation and an animated
             translate cannot share one transform: the wrapper holds the
             corridor's angle and length, the child does the travelling. ── */}
      <div data-layer="comet" className="absolute inset-0">
        {COMETS.map((c, i) => (
          <div
            key={i}
            className="absolute origin-left"
            style={{
              left: c.left,
              top: c.top,
              width: 'var(--comet-run)',
              transform: `rotate(${c.angle}deg)`,
              '--comet-run': c.run,
              '--comet-dur': c.dur,
              '--comet-delay': c.delay,
            }}
          >
            <div className={`hero-comet relative opacity-0 ${c.thick} ${c.streak}`}>
              {/* Tail: brightest at the leading edge, fading out behind. */}
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: `linear-gradient(90deg, transparent 0%, ${c.tail} 58%, ${c.tip} 100%)` }}
              />
              {/* Head, with its own bloom — the tail is lit BY this, so it has
                  to be the brightest thing in the streak. */}
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full"
                style={{ width: c.head, height: c.head, background: c.tip, boxShadow: c.bloom }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ── Horizon haze. Air between the viewer and the city, so the lower
             frame is atmosphere rather than dead black. ── */}
      <div
        data-layer="glow"
        className="absolute inset-x-0 bottom-0 h-[46%]"
        style={{
          background:
            'radial-gradient(120% 100% at 74% 100%, rgba(232, 184, 98,0.16) 0%, rgba(90,60,150,0.10) 34%, transparent 70%),' +
            'radial-gradient(100% 90% at 30% 100%, rgba(91, 157, 255,0.10) 0%, transparent 64%)',
        }}
      />

      {/* ── Moon. Rendered last of the scene objects and therefore always on
             top: it is the light source, so nothing should occlude it.

             Deliberately bare. It used to carry an orbit ring with a satellite
             dot, drifting on an infinite tween. That made the moon a planet,
             which nothing else in this frame supports, and its stated job — HUD
             register, echoing the numbered nav — is now done properly by
             ProcessWindows, with real content instead of the pose of it. The
             moon is light and a focal point; it needs no instrumentation. ── */}
      <div
        data-layer="moon"
        className="absolute right-[10%] top-[9%] h-[22vmin] w-[22vmin] sm:right-[14%] lg:right-[17%]"
      >
        <div
          className="absolute left-1/2 top-1/2 h-[340%] w-[340%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(214,226,255,0.20) 0%, rgba(180,196,255,0.075) 30%, transparent 64%)' }}
        />
        <img
          src={moon}
          alt=""
          className="relative z-10 h-full w-full object-contain"
          draggable="false"
          style={{ filter: 'brightness(1.04) contrast(1.04) drop-shadow(0 0 44px rgba(206,220,255,0.30))' }}
        />
      </div>

      {/* ── Grade + scanlines. The vignette biases attention left; the scanlines
             are 1px at 3% and exist to give the neons a surface to sit on
             rather than to be noticed. ── */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(112% 92% at 68% 34%, transparent 30%, rgba(2,3,10,0.58) 100%)' }} />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ background: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)' }}
      />
    </div>
  )
}
