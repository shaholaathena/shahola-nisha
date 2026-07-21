import { projects } from '../../data/portfolio'

const banks = projects.find((p) => p.id === 'merchant-onboarding')?.caseStudy?.banks ?? []

// Bank home screens from src/assets/merchant/ (sebl-home, ncc-home, …)
const homeModules = import.meta.glob('../../assets/merchant/*-home.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})
const homeByName = Object.fromEntries(
  Object.entries(homeModules).map(([path, url]) => [path.split('/').pop().replace(/\.[^.]+$/, ''), url])
)

function MiniPhone({ src, accent, width }) {
  const bezel = Math.max(4, Math.round(width * 0.028))
  const outerR = Math.round(width * 0.16)
  const innerR = Math.max(5, outerR - bezel)
  const islandW = Math.round(width * 0.26)
  const islandH = Math.round(width * 0.07)
  return (
    <div style={{ width }}>
      <div
        className="relative bg-zinc-900"
        style={{ padding: bezel, borderRadius: outerR, boxShadow: '0 18px 34px -16px rgba(15,23,42,0.55)' }}
      >
        <div className="relative overflow-hidden bg-white" style={{ borderRadius: innerR, aspectRatio: '393 / 852' }}>
          {src ? (
            <img src={src} alt="" className="w-full h-full object-cover object-top" draggable="false" />
          ) : (
            <div className="w-full h-full" style={{ background: accent }} />
          )}
          <div
            className="absolute left-1/2 -translate-x-1/2 bg-black rounded-full"
            style={{ top: Math.round(bezel * 1.3), width: islandW, height: islandH }}
          />
        </div>
      </div>
    </div>
  )
}

export default function MerchantCoverFan() {
  // center JBL so it sits at the front of the fan; others fan out around it
  const rest = banks.filter((b) => b.code !== 'JBL')
  const jbl = banks.find((b) => b.code === 'JBL')
  const order = jbl && rest.length === 4 ? [rest[0], rest[1], jbl, rest[2], rest[3]] : banks
  const mid = (order.length - 1) / 2

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <div className="relative" style={{ width: 420, height: 320 }}>
        {order.map((b, i) => {
          const off = i - mid
          const angle = off * 8
          const tx = off * 46
          const ty = Math.abs(off) * 14
          const z = order.length - Math.abs(off)
          return (
            <div
              key={b.code}
              className="absolute left-1/2 bottom-0"
              style={{
                zIndex: z,
                transform: `translateX(-50%) translateX(${tx}px) translateY(${ty}px) rotate(${angle}deg)`,
                transformOrigin: '50% 100%',
              }}
            >
              <MiniPhone src={homeByName[`${b.code.toLowerCase()}-home`]} accent={b.accent} width={128} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
