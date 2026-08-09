// Card cover for the Bangla QR Merchant App case study.
// One phone, the Bangla QR pay screen — the cover states the product at a
// glance: a merchant presenting one interoperable code.
const screenModules = import.meta.glob('../../assets/merchant/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})
const byName = Object.fromEntries(
  Object.entries(screenModules).map(([path, url]) => [path.split('/').pop().replace(/\.[^.]+$/, ''), url])
)

// Screen gate — mirror the case-study page: only vetted screens render.
const APPROVED_SCREENS = new Set(['ssl-merchant-qr'])
const pick = (file) => (file && APPROVED_SCREENS.has(file) ? byName[file] : undefined)

function Phone({ src, width }) {
  const bezel = Math.max(5, Math.round(width * 0.028))
  const outerR = Math.round(width * 0.16)
  const innerR = Math.max(6, outerR - bezel)
  const islandW = Math.round(width * 0.26)
  const islandH = Math.round(width * 0.07)
  return (
    <div style={{ width }}>
      <div
        className="relative bg-zinc-900"
        style={{ padding: bezel, borderRadius: outerR, boxShadow: '0 26px 48px -20px rgba(15,23,42,0.55)' }}
      >
        <div className="relative overflow-hidden bg-white" style={{ borderRadius: innerR, aspectRatio: '393 / 852' }}>
          {src ? (
            <img src={src} alt="" className="w-full h-full object-cover object-top" draggable="false" />
          ) : (
            <div className="w-full h-full bg-zinc-100" />
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

export default function MerchantCoverQR() {
  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <Phone src={pick('ssl-merchant-qr')} width={168} />
    </div>
  )
}
