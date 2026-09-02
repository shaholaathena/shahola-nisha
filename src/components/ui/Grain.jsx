/* ── Film grain: a fixed, static noise layer over the whole page. Pure CSS/SVG,
   no JS, GPU-cheap. Gives the flat white ground a premium, tactile feel. ── */
const NOISE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'>
      <filter id='n'>
        <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
        <feColorMatrix type='saturate' values='0'/>
      </filter>
      <rect width='100%' height='100%' filter='url(#n)'/>
    </svg>`
  )

export default function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9998]"
      style={{
        backgroundImage: `url("${NOISE}")`,
        backgroundSize: '140px 140px',
        opacity: 0.04,
        mixBlendMode: 'multiply',
      }}
    />
  )
}
