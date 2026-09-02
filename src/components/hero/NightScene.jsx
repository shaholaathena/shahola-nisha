/*
  NightScene — cinematic anime-inspired hero landscape.

  The scene is intentionally built from discrete SVG/CSS layers so the hero can
  behave like an interactive design system rather than a flat background.
  Each layer exposes `data-layer` for GSAP choreography in Hero.jsx.
*/

function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rand = mulberry32(20260902)
const STARS = Array.from({ length: 180 }, () => ({
  x: rand() * 100,
  y: rand() * 58,
  r: rand() * 1.25 + 0.22,
  o: rand() * 0.62 + 0.22,
  d: rand() * 5,
  drift: (rand() - 0.5) * 0.7,
}))

const seed2 = mulberry32(778812)
const BUILDINGS = Array.from({ length: 54 }, (_, i) => {
  const w = seed2() * 2.8 + 1.0
  const h = seed2() * 18 + 4.5
  return { x: i * 1.92 + seed2() * 0.45, w, h, lit: seed2() > 0.23 }
})

export default function NightScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* SKY — deep indigo, with a subtle anime dusk bloom near the horizon. */}
      <div
        data-layer="sky"
        className="absolute inset-0 -top-[8%] h-[116%]"
        style={{
          background:
            'radial-gradient(circle at 66% 21%, rgba(93,82,173,0.24) 0%, rgba(93,82,173,0) 21%), linear-gradient(to bottom, #030611 0%, #071127 23%, #0d1837 43%, #182653 61%, #3a3260 73%, #6a4b70 81%, #1c2446 91%, #0a1025 100%)',
        }}
      />

      {/* STARFIELD — varied scale and opacity so it reads as atmosphere. */}
      <svg data-layer="stars" className="absolute inset-x-0 top-0 h-[70%] w-full" preserveAspectRatio="none" viewBox="0 0 100 62">
        {STARS.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r * 0.18} fill="#eef3ff" opacity={s.o}>
            <animate
              attributeName="opacity"
              values={`${s.o};${Math.max(0.12, s.o * 0.36)};${s.o}`}
              dur={`${3.2 + s.d}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values={`${s.y};${s.y + s.drift};${s.y}`}
              dur={`${12 + s.d * 2}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
        {/* a few hero stars with a soft cross flare */}
        {[{ x: 18, y: 15 }, { x: 51, y: 11 }, { x: 79, y: 22 }, { x: 91, y: 12 }].map((s, i) => (
          <g key={`flare-${i}`} opacity="0.9">
            <circle cx={s.x} cy={s.y} r="0.38" fill="#ffffff" />
            <path d={`M ${s.x - 1.6} ${s.y} H ${s.x + 1.6} M ${s.x} ${s.y - 1.6} V ${s.x === 91 ? s.y + 1.6 : s.y + 1.6}`} stroke="#cbd5ff" strokeWidth="0.18" />
          </g>
        ))}
      </svg>

      {/* MOON — the visual signature. Large, full, luminous, and calm. */}
      <div data-layer="moon" className="absolute right-[10%] top-[6%] h-[36vmin] w-[36vmin] sm:right-[15%] lg:right-[18%]">
        <div
          className="absolute left-1/2 top-1/2 h-[320%] w-[320%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(225,232,255,0.17) 0%, rgba(192,205,255,0.08) 25%, transparent 61%)' }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 37% 33%, #ffffff 0%, #eaf0ff 42%, #cbd8f4 70%, #aebfde 100%)',
            boxShadow: '0 0 85px 18px rgba(204,220,255,0.30), inset -12px -16px 24px rgba(99,114,145,0.12)',
          }}
        />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
          <g fill="#8ea0c6" opacity="0.18">
            <circle cx="35" cy="31" r="8" />
            <circle cx="61" cy="52" r="6" />
            <circle cx="45" cy="68" r="4.5" />
            <circle cx="70" cy="31" r="3.4" />
            <circle cx="27" cy="56" r="3.1" />
            <circle cx="53" cy="24" r="2.8" />
          </g>
        </svg>
        <svg data-layer="orbit" className="absolute left-1/2 top-1/2 h-[220%] w-[220%] -translate-x-1/2 -translate-y-1/2 overflow-visible" viewBox="0 0 200 200">
          <ellipse cx="100" cy="100" rx="96" ry="33" fill="none" stroke="rgba(186,178,240,0.24)" strokeWidth="0.55" transform="rotate(-18 100 100)" />
          <circle cx="194" cy="69" r="1.65" fill="#d7ceff" opacity="0.9" />
        </svg>
      </div>

      {/* WISPY CLOUD BELTS — painterly anime-inspired forms, kept subtle. */}
      <svg data-layer="clouds" className="absolute inset-x-0 top-[12%] h-[45%] w-full" preserveAspectRatio="none" viewBox="0 0 100 40">
        <defs>
          <filter id="soft" x="-30%" y="-60%" width="160%" height="220%">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>
        <g filter="url(#soft)">
          <path d="M-2 26 C11 20, 16 23, 28 20 C39 17, 47 18, 58 21 C67 23, 77 20, 87 18 C96 16, 103 19, 104 21 L104 29 L-2 29 Z" fill="#9d8bc2" opacity="0.20" />
          <path d="M-4 31 C10 25, 23 28, 34 26 C46 23, 59 26, 70 24 C82 22, 93 24, 104 22 L104 34 L-4 34 Z" fill="#e8a58e" opacity="0.12" />
          <path d="M62 14 C70 9, 77 12, 83 10 C91 7, 98 10, 103 8 L103 18 C93 15, 84 18, 76 16 C69 15, 64 17, 62 14 Z" fill="#7f83b8" opacity="0.16" />
        </g>
      </svg>

      {/* FAR MOUNTAINS — soft, layered silhouette. */}
      <svg data-layer="mtn-far" className="absolute inset-x-0 bottom-[35%] h-[31%] w-full" preserveAspectRatio="none" viewBox="0 0 100 30">
        <polygon points="0,30 7,20 15,23 27,9 36,17 45,12 56,20 66,13 77,21 88,12 100,7 100,30" fill="#413a6b" opacity="0.64" />
        <polygon points="27,9 31,14 23,14" fill="#c7d0e7" opacity="0.28" />
        <polygon points="100,7 95,12 91,11" fill="#c7d0e7" opacity="0.22" />
      </svg>

      {/* NEAR MOUNTAINS — stronger, dramatic central peak. */}
      <svg data-layer="mtn-near" className="absolute inset-x-0 bottom-[32%] h-[29%] w-full" preserveAspectRatio="none" viewBox="0 0 100 28">
        <polygon points="0,28 10,17 19,21 31,11 43,20 53,8 65,19 78,4 89,16 100,10 100,28" fill="#211f45" />
        <polygon points="53,8 59,16 49,15" fill="#d9e1f4" opacity="0.34" />
        <polygon points="78,4 84,13 73,12" fill="#eef2ff" opacity="0.46" />
        <polygon points="78,4 78,28 92,28 88,16 84,13" fill="#161936" opacity="0.45" />
      </svg>

      {/* CITY — denser coastal skyline with a clearer visual focal point. */}
      <svg data-layer="city" className="absolute inset-x-0 bottom-[30%] h-[16%] w-full" preserveAspectRatio="none" viewBox="0 0 100 22">
        <g fill="#101229">
          {BUILDINGS.map((b, i) => (
            <rect key={i} x={b.x} y={22 - b.h} width={b.w} height={b.h} rx="0.15" />
          ))}
        </g>
        <g data-layer="city-lights" fill="#ffb982">
          {BUILDINGS.filter((b) => b.lit).map((b, i) =>
            Array.from({ length: Math.max(1, Math.floor(b.h / 2.8)) }, (_, j) => (
              <rect
                key={`${i}-${j}`}
                x={b.x + b.w * 0.25}
                y={22 - b.h + 1.7 + j * 2.45}
                width={Math.max(0.25, b.w * 0.45)}
                height="0.75"
                opacity={0.28 + ((i + j) % 5) * 0.13}
              />
            ))
          )}
        </g>
        {/* signature tower */}
        <polygon points="64,22 65.2,4 66.4,22" fill="#101229" />
        <rect x="64.76" y="2" width="0.92" height="3.5" fill="#ff9d69" opacity="0.95" />
        <circle cx="65.2" cy="1.7" r="0.45" fill="#ffd2ad" opacity="0.95" />
      </svg>

      {/* SEA */}
      <div
        data-layer="sea"
        className="absolute inset-x-0 bottom-0 h-[31%]"
        style={{ background: 'linear-gradient(to bottom, #1b2447 0%, #11183a 40%, #070c20 100%)' }}
      />

      {/* REFLECTION — moon path + city shimmer. */}
      <div data-layer="reflection" className="absolute inset-x-0 bottom-0 h-[31%] overflow-hidden">
        <div
          className="absolute bottom-0 h-full w-[38%]"
          style={{
            left: '53%',
            background:
              'radial-gradient(ellipse 42% 98% at 50% 0%, rgba(226,235,255,0.32) 0%, rgba(200,215,250,0.14) 32%, rgba(210,185,255,0.05) 61%, transparent 83%)',
            filter: 'blur(7px)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[65%]"
          style={{
            background: 'linear-gradient(to bottom, rgba(169,143,236,0.10) 0%, transparent 70%)',
            filter: 'blur(10px)',
          }}
        />
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 30">
          <g fill="#d9e3ff" opacity="0.13">
            {Array.from({ length: 22 }, (_, i) => (
              <rect key={i} x={(i * 8.7) % 96} y={i * 1.34 + 0.8} width={4.5 + (i % 5) * 3} height="0.28" rx="0.14" />
            ))}
          </g>
          <g fill="#ffb982" opacity="0.11">
            {Array.from({ length: 18 }, (_, i) => (
              <rect key={`warm-${i}`} x={(i * 11.4 + 5) % 96} y={7 + i * 1.15} width={3.5 + (i % 4) * 2} height="0.22" rx="0.11" />
            ))}
          </g>
        </svg>
      </div>

      {/* Reflected stars — intentionally dimmer and vertically displaced. */}
      <svg data-layer="reflected-stars" className="absolute inset-x-0 bottom-0 h-[26%] w-full" preserveAspectRatio="none" viewBox="0 0 100 26">
        {STARS.slice(0, 44).map((s, i) => (
          <ellipse key={i} cx={s.x} cy={26 - (s.y % 24)} rx={Math.max(0.18, s.r * 0.18)} ry="0.55" fill="#dfe7ff" opacity={s.o * 0.24}>
            <animate attributeName="opacity" values={`${s.o * 0.14};${s.o * 0.30};${s.o * 0.14}`} dur={`${4 + s.d}s`} repeatCount="indefinite" />
          </ellipse>
        ))}
      </svg>

      {/* FOREGROUND — subtle balcony edge to establish viewer perspective. */}
      <svg data-layer="foreground" className="absolute inset-x-0 bottom-0 h-[17%] w-full" preserveAspectRatio="none" viewBox="0 0 100 17">
        <rect x="0" y="9.1" width="100" height="0.55" fill="#05070f" />
        <rect x="0" y="11.6" width="100" height="0.35" fill="#05070f" opacity="0.86" />
        {Array.from({ length: 26 }, (_, i) => (
          <rect key={i} x={i * 4 + 1} y="9.1" width="0.42" height="7" fill="#05070f" opacity="0.88" />
        ))}
        <rect x="0" y="15.8" width="100" height="1.2" fill="#03050d" />
      </svg>

      {/* VIGNETTE — keeps the scene cinematic and content-readable. */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(120% 95% at 70% 35%, transparent 28%, rgba(2,4,12,0.48) 100%)' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-36"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(3,5,13,0.92))' }}
      />
    </div>
  )
}
