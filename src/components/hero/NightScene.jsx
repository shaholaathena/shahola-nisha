/* ─────────────────────────────────────────────────────────────────────────────
   NightScene — the hero landscape as independent depth layers.

   Every layer resolves ILLUSTRATED ART FIRST: drop a file named after the layer
   into src/assets/hero/ (see the README there) and it renders instead of the
   drawn fallback. Nothing else changes — the GSAP timeline in Hero.jsx targets
   `data-layer` names, so choreography survives any art swap, partial or total.

   The drawn fallback exists so the hero is never broken while art is in flight.
   It builds ridgelines by midpoint displacement and clouds by turbulence rather
   than flat polygons, so it reads as landscape rather than as a chart.
   ───────────────────────────────────────────────────────────────────────────── */

const files = import.meta.glob('../../assets/hero/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
})
const ART = Object.fromEntries(
  Object.entries(files).map(([p, url]) => [p.split('/').pop().replace(/\.[^.]+$/, ''), url])
)

/* Deterministic RNG so the generated terrain never reshuffles between renders. */
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* Midpoint displacement — the standard way to get a believable ridgeline.
   A polygon with 8 vertices reads as a graph; this reads as terrain. */
function ridgePath(seed, { iterations = 6, roughness = 0.52, height = 1, baseY = 100, width = 100 }) {
  const rnd = mulberry32(seed)
  let pts = [rnd() * 0.5 + 0.25, rnd() * 0.5 + 0.25]
  for (let it = 0; it < iterations; it++) {
    const next = []
    for (let i = 0; i < pts.length - 1; i++) {
      next.push(pts[i])
      next.push((pts[i] + pts[i + 1]) / 2 + (rnd() - 0.5) * Math.pow(roughness, it) * 1.6)
    }
    next.push(pts[pts.length - 1])
    pts = next
  }
  const max = Math.max(...pts); const min = Math.min(...pts)
  const norm = pts.map((v) => (v - min) / (max - min || 1))
  const step = width / (norm.length - 1)
  const d = norm
    .map((v, i) => `${i === 0 ? 'M' : 'L'}${(i * step).toFixed(2)},${(baseY - v * height).toFixed(2)}`)
    .join(' ')
  return { d: `${d} L${width},${baseY} L0,${baseY} Z`, peaks: norm, step }
}

const STAR_RND = mulberry32(20260902)
const STARS = Array.from({ length: 180 }, () => ({
  x: STAR_RND() * 100,
  y: STAR_RND() * 64,
  r: STAR_RND() * 1.2 + 0.22,
  o: STAR_RND() * 0.65 + 0.28,
  d: STAR_RND() * 6,
}))

const CITY_RND = mulberry32(778812)
const BUILDINGS = Array.from({ length: 62 }, (_, i) => {
  const w = CITY_RND() * 2.0 + 0.85
  const h = CITY_RND() * CITY_RND() * 20 + 4
  return {
    x: i * 1.64 + CITY_RND() * 0.4,
    w,
    h,
    lit: CITY_RND() > 0.18,
    antenna: CITY_RND() > 0.86,
    setback: CITY_RND() > 0.72,
  }
})

const BACK = ridgePath(4471, { iterations: 6, roughness: 0.5, height: 24, baseY: 30, width: 100 })
const FORE = ridgePath(90211, { iterations: 7, roughness: 0.56, height: 22, baseY: 26, width: 100 })

/* Renders illustrated art when present, otherwise the drawn fallback. */
function Layer({ name, className, style, children, imgClass = 'h-full w-full object-cover' }) {
  return (
    <div data-layer={name} className={className} style={style}>
      {ART[name] ? <img src={ART[name]} alt="" className={imgClass} draggable="false" /> : children}
    </div>
  )
}

export default function NightScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">

      {/* ── Sky ── */}
      <Layer
        name="sky"
        className="absolute inset-0 -top-[8%] h-[116%]"
        style={
          ART.sky
            ? undefined
            : {
                background:
                  'linear-gradient(to bottom, #04061a 0%, #070d27 20%, #101a42 40%, #1c2450 54%, #33285a 66%, #55355f 74%, #7c4a5a 79%, #35285a 85%, #101838 100%)',
              }
        }
      >
        {/* faint high-altitude haze so the sky isn't a flat ramp */}
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <filter id="skyhaze" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.008 0.03" numOctaves="4" seed="11" />
              <feColorMatrix values="0 0 0 0 0.42 0 0 0 0 0.38 0 0 0 0 0.62 0 0 0 0.5 0" />
              <feGaussianBlur stdDeviation="1.4" />
            </filter>
          </defs>
          <rect width="100" height="72" filter="url(#skyhaze)" opacity="0.30" />
        </svg>
      </Layer>

      {/* ── Distant stars ── */}
      <Layer name="stars" className="absolute inset-x-0 top-0 h-[72%]" imgClass="h-full w-full object-cover">
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 64">
          <defs>
            <filter id="starglow" x="-300%" y="-300%" width="700%" height="700%">
              <feGaussianBlur stdDeviation="0.5" />
            </filter>
          </defs>
          {STARS.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r * 0.15} fill="#eaf0ff" opacity={s.o}>
              <animate attributeName="opacity" values={`${s.o};${s.o * 0.2};${s.o}`} dur={`${3.5 + s.d}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {/* a few brighter anchors with bloom */}
          {STARS.slice(0, 9).map((s, i) => (
            <circle key={`b${i}`} cx={s.x} cy={s.y} r={0.42} fill="#ffffff" opacity="0.75" filter="url(#starglow)" />
          ))}
          {/* shooting stars — long, rare, easily missed. That is the point. */}
          {[
            { x: 18, y: 9, dl: '0s', dur: '11s' },
            { x: 62, y: 5, dl: '6.5s', dur: '13s' },
          ].map((sh, i) => (
            <g key={`sh${i}`} opacity="0">
              <animate attributeName="opacity" values="0;0;1;0" keyTimes="0;0.86;0.93;1" dur={sh.dur} begin={sh.dl} repeatCount="indefinite" />
              <line x1={sh.x} y1={sh.y} x2={sh.x + 9} y2={sh.y + 3.4} stroke="#dfe8ff" strokeWidth="0.16" strokeLinecap="round" />
              <circle cx={sh.x + 9} cy={sh.y + 3.4} r="0.22" fill="#ffffff" />
            </g>
          ))}
        </svg>
      </Layer>

      {/* ── Clouds: displaced turbulence, not ellipses ── */}
      <Layer name="clouds" className="absolute inset-x-0 top-[10%] h-[46%]">
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 46">
          <defs>
            <filter id="painterly" x="-40%" y="-120%" width="180%" height="340%">
              <feTurbulence type="fractalNoise" baseFrequency="0.016 0.055" numOctaves="5" seed="23" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="26" xChannelSelector="R" yChannelSelector="G" />
              <feGaussianBlur stdDeviation="1.5" />
            </filter>
            <linearGradient id="cwarm" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffc79c" />
              <stop offset="100%" stopColor="#a2708f" />
            </linearGradient>
            <linearGradient id="ccool" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9a94d0" />
              <stop offset="100%" stopColor="#5b5590" />
            </linearGradient>
          </defs>
          <g filter="url(#painterly)">
            {/* underlit bank near the moon */}
            <ellipse cx="74" cy="14" rx="20" ry="2.8" fill="url(#cwarm)" opacity="0.42" />
            <ellipse cx="86" cy="20" rx="15" ry="2.2" fill="url(#cwarm)" opacity="0.30" />
            <ellipse cx="58" cy="24" rx="17" ry="2.0" fill="url(#cwarm)" opacity="0.20" />
            {/* cool banks away from the light */}
            <ellipse cx="20" cy="19" rx="22" ry="2.6" fill="url(#ccool)" opacity="0.26" />
            <ellipse cx="40" cy="31" rx="26" ry="2.3" fill="url(#ccool)" opacity="0.20" />
            <ellipse cx="8" cy="33" rx="18" ry="2.0" fill="url(#ccool)" opacity="0.16" />
          </g>
        </svg>
      </Layer>

      {/* ── Moon: the focal anchor ── */}
      <Layer
        name="moon"
        className="absolute right-[12%] top-[7%] h-[34vmin] w-[34vmin] sm:right-[16%] lg:right-[18%]"
        imgClass="h-full w-full object-contain"
      >
        <div className="relative h-full w-full">
          <div
            className="absolute left-1/2 top-1/2 h-[340%] w-[340%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,228,190,0.22) 0%, rgba(255,206,166,0.08) 30%, transparent 62%)' }}
          />
          <div
            className="absolute inset-0 overflow-hidden rounded-full"
            style={{
              background: 'radial-gradient(circle at 35% 30%, #fffaf0 0%, #ffeed3 38%, #f4d0a4 70%, #cfa176 92%, #b98d68 100%)',
              boxShadow: '0 0 90px 16px rgba(255,224,182,0.32)',
            }}
          >
            {/* maria + surface grain, kept faint so it reads as a moon not a texture demo */}
            <svg className="h-full w-full" viewBox="0 0 100 100">
              <defs>
                <filter id="lunar">
                  <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="4" seed="5" />
                  <feColorMatrix values="0 0 0 0 0.62 0 0 0 0 0.48 0 0 0 0 0.34 0 0 0 0.35 0" />
                </filter>
              </defs>
              <rect width="100" height="100" filter="url(#lunar)" opacity="0.22" />
              <g fill="#c49a72" opacity="0.24">
                <ellipse cx="38" cy="34" rx="11" ry="9" />
                <ellipse cx="61" cy="52" rx="7" ry="6" />
                <ellipse cx="45" cy="67" rx="5.5" ry="4.5" />
                <circle cx="71" cy="31" r="3.4" />
                <circle cx="27" cy="56" r="3" />
              </g>
              {/* limb darkening */}
              <circle cx="50" cy="50" r="50" fill="none" stroke="#8a6949" strokeWidth="7" opacity="0.16" />
            </svg>
          </div>
          <svg data-layer="orbit" className="absolute left-1/2 top-1/2 h-[215%] w-[215%] -translate-x-1/2 -translate-y-1/2 overflow-visible" viewBox="0 0 200 200">
            <ellipse cx="100" cy="100" rx="96" ry="33" fill="none" stroke="rgba(186,178,240,0.28)" strokeWidth="0.55" transform="rotate(-18 100 100)" />
            <circle cx="196" cy="70" r="1.7" fill="#d3cbff" opacity="0.85" />
          </svg>
        </div>
      </Layer>

      {/* ── Mountain background: hazier, lighter — aerial perspective ── */}
      <Layer name="mtn-back" className="absolute inset-x-0 bottom-[34%] h-[32%]">
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 30">
          <defs>
            <linearGradient id="mb" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#544d80" />
              <stop offset="60%" stopColor="#413c6b" />
              <stop offset="100%" stopColor="#343056" />
            </linearGradient>
          </defs>
          <path d={BACK.d} fill="#4a4478" opacity="0.85" />
          {/* haze pooling at the base separates this range from the next */}
          <rect x="0" y="22" width="100" height="8" fill="url(#mbhaze)" />
          <defs>
            <linearGradient id="mbhaze" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6b6098" stopOpacity="0" />
              <stop offset="100%" stopColor="#7d6fa6" stopOpacity="0.55" />
            </linearGradient>
          </defs>
        </svg>
      </Layer>

      {/* ── Mountain foreground: darker, snow on the moonlit flank ── */}
      <Layer name="mtn-fore" className="absolute inset-x-0 bottom-[31%] h-[28%]">
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 26">
          <path d={FORE.d} fill="#221f45" />
          <path d={FORE.d} fill="none" stroke="#b9c2e8" strokeWidth="0.22" opacity="0.35" />
          <rect x="0" y="19" width="100" height="7" fill="url(#mfhaze)" />
          <defs>
            <linearGradient id="mfhaze" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4b4478" stopOpacity="0" />
              <stop offset="100%" stopColor="#5b5288" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      </Layer>

      {/* ── City (silhouettes) ── */}
      <Layer name="city" className="absolute inset-x-0 bottom-[30.5%] h-[16%]">
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 22">
          <g fill="#141230">
            {BUILDINGS.map((b, i) => (
              <g key={i}>
                <rect x={b.x} y={22 - b.h} width={b.w} height={b.h} />
                {b.setback && <rect x={b.x + b.w * 0.2} y={22 - b.h - 1.6} width={b.w * 0.6} height="1.8" />}
                {b.antenna && <rect x={b.x + b.w / 2 - 0.06} y={22 - b.h - 3.4} width="0.12" height="3.4" />}
              </g>
            ))}
          </g>
          <polygon points="63,22 64.5,2.6 66,22" fill="#141230" />
        </svg>
      </Layer>

      {/* ── City lights: separate layer so scroll can brighten it ── */}
      <Layer name="city-lights" className="absolute inset-x-0 bottom-[30.5%] h-[16%]">
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 22">
          <defs>
            <filter id="bloom" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.5" />
            </filter>
          </defs>
          <g fill="#ffb877" filter="url(#bloom)">
            {BUILDINGS.filter((b) => b.lit).map((b, i) =>
              Array.from({ length: Math.max(1, Math.floor(b.h / 2.4)) }, (_, j) => (
                <rect
                  key={`${i}-${j}`}
                  x={b.x + b.w * 0.24}
                  y={22 - b.h + 1.1 + j * 2.2}
                  width={b.w * 0.5}
                  height="0.62"
                  opacity={0.3 + ((i * 3 + j) % 5) * 0.14}
                />
              ))
            )}
          </g>
          <rect x="64.2" y="1.4" width="0.7" height="2.2" fill="#ff8f5c" opacity="0.95" filter="url(#bloom)" />
          {/* street-level glow along the waterfront */}
          <rect x="0" y="20.6" width="100" height="1.5" fill="url(#strip)" opacity="0.55" />
          <defs>
            <linearGradient id="strip" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff9a5e" stopOpacity="0.1" />
              <stop offset="45%" stopColor="#ffb377" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ff9a5e" stopOpacity="0.15" />
            </linearGradient>
          </defs>
        </svg>
      </Layer>

      {/* ── Sea ── */}
      <Layer
        name="sea"
        className="absolute inset-x-0 bottom-0 h-[31%]"
        style={ART.sea ? undefined : { background: 'linear-gradient(to bottom, #1c2450 0%, #141b3c 38%, #090e24 100%)' }}
      >
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 31">
          <defs>
            <filter id="ripple">
              <feTurbulence type="fractalNoise" baseFrequency="0.02 0.5" numOctaves="3" seed="9" />
              <feColorMatrix values="0 0 0 0 0.62 0 0 0 0 0.68 0 0 0 0 0.9 0 0 0 0.34 0" />
            </filter>
          </defs>
          <rect width="100" height="31" filter="url(#ripple)" opacity="0.16" />
        </svg>
      </Layer>

      {/* ── Moon reflection: animated independently of the moon ── */}
      <Layer name="reflection" className="absolute inset-x-0 bottom-0 h-[31%] overflow-hidden">
        <div
          className="absolute bottom-0 h-full w-[34%]"
          style={{
            left: '59%',
            background:
              'radial-gradient(ellipse 40% 96% at 50% 0%, rgba(255,230,194,0.36) 0%, rgba(255,214,170,0.16) 32%, rgba(255,205,160,0.05) 60%, transparent 82%)',
            filter: 'blur(7px)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[64%]"
          style={{ background: 'linear-gradient(to bottom, rgba(255,158,104,0.13) 0%, transparent 72%)', filter: 'blur(10px)' }}
        />
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 31">
          <g fill="#d6dffa">
            {Array.from({ length: 26 }, (_, i) => {
              const y = i * 1.18
              const w = 3 + ((i * 7) % 11)
              return <rect key={i} x={(i * 9.7) % 88} y={y} width={w} height="0.26" rx="0.13" opacity={0.2 - i * 0.005} />
            })}
          </g>
        </svg>
      </Layer>

      {/* ── Reflected stars: fainter and slower than the sky above ── */}
      <Layer name="reflected-stars" className="absolute inset-x-0 bottom-0 h-[27%]">
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 27">
          {STARS.slice(0, 44).map((s, i) => (
            <circle key={i} cx={s.x} cy={27 - (s.y % 25)} r={s.r * 0.1} fill="#e2e9ff" opacity={s.o * 0.28} />
          ))}
        </svg>
      </Layer>

      {/* ── Foreground: a viewing point — trees, railing, a lantern ── */}
      <Layer name="foreground" className="absolute inset-x-0 bottom-0 h-[22%]">
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 22">
          <g fill="#05070f">
            {/* conifer silhouettes at the right edge */}
            {[{ x: 88, h: 13 }, { x: 93, h: 16 }, { x: 97.5, h: 11 }].map((t, i) => (
              <polygon key={i} points={`${t.x},${22 - t.h} ${t.x - 2.4},22 ${t.x + 2.4},22`} />
            ))}
            {[{ x: 4, h: 10 }, { x: 8.5, h: 14 }].map((t, i) => (
              <polygon key={`l${i}`} points={`${t.x},${22 - t.h} ${t.x - 2.1},22 ${t.x + 2.1},22`} />
            ))}
            {/* railing */}
            <rect x="0" y="13.2" width="100" height="0.42" />
            <rect x="0" y="15.4" width="100" height="0.3" opacity="0.9" />
            {Array.from({ length: 34 }, (_, i) => (
              <rect key={i} x={i * 3 + 0.8} y="13.2" width="0.32" height="5" opacity="0.92" />
            ))}
            {/* ground */}
            <rect x="0" y="18.2" width="100" height="3.8" />
          </g>
          {/* lantern — the single warm human detail down here */}
          <circle cx="26" cy="12.4" r="1.9" fill="#ffb066" opacity="0.28" />
          <rect x="25.5" y="11.6" width="1" height="1.6" fill="#ffcf9a" opacity="0.95" />
        </svg>
      </Layer>

      {/* ── Grade: pulls focus and unifies the layers into one exposure ── */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 92% at 68% 32%, transparent 28%, rgba(3,5,14,0.58) 100%)' }} />
    </div>
  )
}
