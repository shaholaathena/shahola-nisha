// Card cover for the SSL Merchant Acquiring Platform case study.
// Fans one home screen per bank client — the cover states the thesis at a
// glance: same product, different brand.
import { projects } from '../../data/portfolio'

const banks = projects.find((p) => p.id === 'merchant-onboarding')?.caseStudy?.banks ?? []

const screenModules = import.meta.glob('../../assets/merchant/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})
const byName = Object.fromEntries(
  Object.entries(screenModules).map(([path, url]) => [path.split('/').pop().replace(/\.[^.]+$/, ''), url])
)

// Screen gate — mirror the case-study page: only vetted screens render.
const APPROVED_SCREENS = new Set([
  'ssl-merchant-home',
  'jbl-home',
  'sebl-home',
  'ncc-home',
  'rupali-home',
  'sdbl-home',
])
const pick = (file) => (file && APPROVED_SCREENS.has(file) ? byName[file] : undefined)
const resolve = (file, fallback) => pick(file) || pick(fallback)

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

// Put the reference build at the front of the fan; the rest fan out around it.
// Count-agnostic, so adding a bank client needs no change here.
function fanOrder(list) {
  const heroIdx = list.findIndex((b) => b.status === 'Reference')
  if (heroIdx < 0) return list
  const rest = list.filter((_, i) => i !== heroIdx)
  const mid = Math.floor(rest.length / 2)
  return [...rest.slice(0, mid), list[heroIdx], ...rest.slice(mid)]
}

export default function MerchantCoverFan() {
  const order = fanOrder(banks)
  const mid = (order.length - 1) / 2
  // Tighten the spread as the roster grows so the fan keeps its footprint.
  const step = order.length > 5 ? 38 : 46

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <div className="relative" style={{ width: 420, height: 320 }}>
        {order.map((b, i) => {
          const off = i - mid
          const angle = off * 8
          const tx = off * step
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
              <MiniPhone src={resolve(b.screen, `${b.code.toLowerCase()}-home`)} accent={b.accent} width={128} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
