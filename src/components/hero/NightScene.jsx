/* ─────────────────────────────────────────────────────────────────────────────
   NightScene — the hero landscape, built as discrete parallax layers.

   Drawn in SVG/CSS rather than shipped as artwork for one reason: the scroll
   choreography needs sky, stars, moon, mountains, city, sea and foreground to
   move at different speeds. A single flat render cannot do that, and would also
   cost ~1MB. Each layer exposes `data-layer` so the GSAP timeline in Hero.jsx
   can drive it without reaching into markup.

   Any layer can later be swapped for exported painterly art without touching
   the choreography — the contract is the `data-layer` name and the stacking.
   ───────────────────────────────────────────────────────────────────────────── */

/* Deterministic pseudo-random so the starfield is stable across re-renders. */
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rand = mulberry32(20260902)
const STARS = Array.from({ length: 130 }, () => ({
  x: rand() * 100,
  y: rand() * 62,
  r: rand() * 1.15 + 0.25,
  o: rand() * 0.6 + 0.3,
  d: rand() * 5,
}))

/* Skyline built from seeded values so it reads as a real city rather than an
   even comb of rectangles. Windows are sparse and warm. */
const seed2 = mulberry32(778812)
const BUILDINGS = Array.from({ length: 46 }, (_, i) => {
  const w = seed2() * 2.4 + 1.1
  const h = seed2() * 17 + 5
  return { x: i * 2.22 + seed2() * 0.5, w, h, lit: seed2() > 0.25 }
})

export default function NightScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">

      {/* ── Sky ── */}
      <div
        data-layer="sky"
        className="absolute inset-0 -top-[8%] h-[116%]"
        style={{
          background:
            'linear-gradient(to bottom, #05081a 0%, #0a1029 26%, #141c42 48%, #26264f 62%, #47355f 72%, #6b4560 78%, #2a2450 84%, #131a37 100%)',
        }}
      />

      {/* ── Stars ── */}
      <svg data-layer="stars" className="absolute inset-x-0 top-0 h-[70%] w-full" preserveAspectRatio="none" viewBox="0 0 100 62">
        {STARS.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r * 0.16} fill="#e8eeff" opacity={s.o}>
            <animate
              attributeName="opacity"
              values={`${s.o};${s.o * 0.25};${s.o}`}
              dur={`${3 + s.d}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>

      {/* ── Moon: the visual anchor ── */}
      <div data-layer="moon" className="absolute right-[12%] top-[8%] h-[34vmin] w-[34vmin] sm:right-[16%] lg:right-[18%]">
        {/* atmospheric bloom */}
        <div
          className="absolute left-1/2 top-1/2 h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,226,186,0.20) 0%, rgba(255,210,170,0.07) 32%, transparent 62%)' }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 36% 32%, #fff6e6 0%, #ffe6c2 42%, #f0c79a 72%, #d9a978 100%)',
            boxShadow: '0 0 70px 12px rgba(255,222,180,0.35)',
          }}
        />
        {/* craters — restrained, just enough to read as a moon */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
          <g fill="#c9a077" opacity="0.28">
            <circle cx="38" cy="34" r="8" />
            <circle cx="60" cy="52" r="5.5" />
            <circle cx="45" cy="66" r="4" />
            <circle cx="70" cy="30" r="3.2" />
            <circle cx="28" cy="55" r="3" />
          </g>
        </svg>
        {/* orbital ring — the one HUD flourish, tying the scene to the nav */}
        <svg data-layer="orbit" className="absolute left-1/2 top-1/2 h-[210%] w-[210%] -translate-x-1/2 -translate-y-1/2 overflow-visible" viewBox="0 0 200 200">
          <ellipse cx="100" cy="100" rx="96" ry="34" fill="none" stroke="rgba(186,178,240,0.30)" strokeWidth="0.6" transform="rotate(-18 100 100)" />
          <circle cx="196" cy="70" r="1.8" fill="#cfc6ff" opacity="0.85" />
        </svg>
      </div>

      {/* ── Clouds ── */}
      <svg data-layer="clouds" className="absolute inset-x-0 top-[14%] h-[42%] w-full" preserveAspectRatio="none" viewBox="0 0 100 40">
        <defs>
          <filter id="soft" x="-30%" y="-60%" width="160%" height="220%">
            <feGaussianBlur stdDeviation="1.6" />
          </filter>
        </defs>
        <g filter="url(#soft)">
          <ellipse cx="72" cy="13" rx="17" ry="2.6" fill="#e8b48f" opacity="0.30" />
          <ellipse cx="82" cy="18" rx="13" ry="2.1" fill="#d99a7f" opacity="0.24" />
          <ellipse cx="24" cy="21" rx="19" ry="2.4" fill="#8a7fb8" opacity="0.20" />
          <ellipse cx="52" cy="27" rx="22" ry="2.2" fill="#6f6aa4" opacity="0.18" />
          <ellipse cx="90" cy="30" rx="15" ry="2" fill="#c98f74" opacity="0.16" />
        </g>
      </svg>

      {/* ── Far mountains ── */}
      <svg data-layer="mtn-far" className="absolute inset-x-0 bottom-[36%] h-[30%] w-full" preserveAspectRatio="none" viewBox="0 0 100 30">
        <polygon points="0,30 8,17 15,21 26,8 34,15 42,10 52,19 60,13 70,20 80,11 88,17 100,6 100,30" fill="#3a3663" opacity="0.75" />
        <polygon points="26,8 30,12 22,12" fill="#cfd6ee" opacity="0.5" />
        <polygon points="100,6 96,11 92,9" fill="#cfd6ee" opacity="0.4" />
      </svg>

      {/* ── Near mountains ── */}
      <svg data-layer="mtn-near" className="absolute inset-x-0 bottom-[33%] h-[26%] w-full" preserveAspectRatio="none" viewBox="0 0 100 26">
        <polygon points="0,26 10,14 20,20 32,6 44,16 54,11 66,19 78,9 88,16 100,12 100,26" fill="#232047" />
        <polygon points="32,6 37,12 27,12" fill="#dfe5f7" opacity="0.55" />
        <polygon points="78,9 82,14 74,14" fill="#dfe5f7" opacity="0.42" />
      </svg>

      {/* ── City ── */}
      <svg data-layer="city" className="absolute inset-x-0 bottom-[31%] h-[15%] w-full" preserveAspectRatio="none" viewBox="0 0 100 22">
        <g fill="#15132f">
          {BUILDINGS.map((b, i) => (
            <rect key={i} x={b.x} y={22 - b.h} width={b.w} height={b.h} />
          ))}
        </g>
        {/* warm windows */}
        <g data-layer="city-lights" fill="#ffb473">
          {BUILDINGS.filter((b) => b.lit).map((b, i) =>
            Array.from({ length: Math.max(1, Math.floor(b.h / 3)) }, (_, j) => (
              <rect
                key={`${i}-${j}`}
                x={b.x + b.w * 0.28}
                y={22 - b.h + 1.6 + j * 2.6}
                width={b.w * 0.42}
                height="0.85"
                opacity={0.35 + ((i + j) % 4) * 0.16}
              />
            ))
          )}
        </g>
        {/* a tower, for a landmark silhouette */}
        <polygon points="63,22 64.4,4 65.8,22" fill="#15132f" />
        <rect x="63.9" y="2" width="0.9" height="3" fill="#ff8f5c" opacity="0.9" />
      </svg>

      {/* ── Sea ── */}
      <div
        data-layer="sea"
        className="absolute inset-x-0 bottom-0 h-[31%]"
        style={{ background: 'linear-gradient(to bottom, #1b2246 0%, #131a3a 40%, #0a0f26 100%)' }}
      />

      {/* ── Moon column + city glow on the water. Reflections are a separate
             layer so they can drift against the sky above them. ── */}
      <div data-layer="reflection" className="absolute inset-x-0 bottom-0 h-[31%] overflow-hidden">
        {/* Moonpath: an ellipse that widens toward the viewer, not a fixed
            column — a rectangular block reads as a UI panel, not water. */}
        <div
          className="absolute bottom-0 h-full w-[34%]"
          style={{
            left: '59%',
            background:
              'radial-gradient(ellipse 42% 96% at 50% 0%, rgba(255,228,190,0.34) 0%, rgba(255,214,170,0.16) 34%, rgba(255,205,160,0.05) 62%, transparent 82%)',
            filter: 'blur(7px)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[62%]"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,160,105,0.14) 0%, transparent 70%)',
            filter: 'blur(9px)',
          }}
        />
        {/* horizontal shimmer bands */}
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 30">
          <g fill="#cfd8f5" opacity="0.14">
            {Array.from({ length: 16 }, (_, i) => (
              <rect key={i} x={(i * 7.3) % 90} y={i * 1.85} width={5 + (i % 4) * 3.5} height="0.32" rx="0.16" />
            ))}
          </g>
        </svg>
      </div>

      {/* ── Reflected stars: slower and fainter than the sky, so the water
             reads as a surface rather than a mirror ── */}
      <svg data-layer="reflected-stars" className="absolute inset-x-0 bottom-0 h-[26%] w-full" preserveAspectRatio="none" viewBox="0 0 100 26">
        {STARS.slice(0, 34).map((s, i) => (
          <circle key={i} cx={s.x} cy={26 - (s.y % 24)} r={s.r * 0.11} fill="#dfe6ff" opacity={s.o * 0.32} />
        ))}
      </svg>

      {/* ── Foreground: a railing edge, to place the viewer somewhere ── */}
      <svg data-layer="foreground" className="absolute inset-x-0 bottom-0 h-[16%] w-full" preserveAspectRatio="none" viewBox="0 0 100 16">
        <rect x="0" y="9.4" width="100" height="0.5" fill="#080b1c" />
        <rect x="0" y="11.6" width="100" height="0.35" fill="#080b1c" opacity="0.85" />
        {Array.from({ length: 26 }, (_, i) => (
          <rect key={i} x={i * 4 + 1} y="9.4" width="0.4" height="6.6" fill="#080b1c" opacity="0.9" />
        ))}
        <rect x="0" y="15" width="100" height="1" fill="#05070f" />
      </svg>

      {/* ── Vignette: pulls focus to the type on the left ── */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(120% 90% at 68% 34%, transparent 30%, rgba(4,6,16,0.55) 100%)' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(4,6,16,0.9))' }}
      />
    </div>
  )
}
