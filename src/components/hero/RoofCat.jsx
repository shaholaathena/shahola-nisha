import { useLayoutEffect, useRef, useState } from 'react'
import { coverMapping } from './cityArtwork'

/* ─────────────────────────────────────────────────────────────────────────────
   RoofCat — a cat on a roof, looking up at the moon.

   Not information and not the argument. It is the one small, living thing in
   the city, and it is for whoever looks long enough to find it.

   ── Where it sits, and how that was found ──

   Bottom right, on the corner building's roof, just inside the social rail.
   Measured off the raster, not guessed: drawn to a canvas at the artwork's
   natural 1703x1200, that roof's edge is at y = 848 from x ≈ 1552 to the
   artwork's right edge, and for the full height of the cat above it what stands
   behind is one flat, paler wall (luminance 83 against the roof's 24). A
   silhouette only reads with something lighter behind it; dark on dark, the cat
   disappears.

   x = 1572 keeps it at the LEFT end of that roof, and even there it only fits
   on wide frames. The social rail sits a fixed 40px in from the edge while the
   artwork scales with the width, so the two close on each other as the window
   narrows: clear from about 1366 up, not below. So the rail is measured, and
   when the corner is taken the cat moves to its second roof —
   the tower right of centre, x 1334, on the same roofline and with the paler
   mid-rise behind it. Below `lg` the rail is not rendered and the corner is
   always free.

   Head in profile to the left, tail out to the right, the way the reference
   she gave has it. The thin cool rim along its top edge is offset toward the
   moon, so the light on its back and ears comes from the one light source in
   the sky.

   ── Pinned, not placed ──

   Mounted inside the city layer, so it inherits the parallax and the scroll
   scale the artwork gets; positioned in artwork coordinates through the same
   cover mapping ProcessWindows uses, so it stays on its roof at every size.

   ── Motion ──

   The tail, and only the tail: a slow sway with a long rest, on an 11s loop so
   it never falls into step with the process walk. Under reduced motion the cat
   simply sits.

   Hidden below `sm`. On a phone the frame crops the artwork so hard that the
   tower sits on the right edge and the cat would be cut in half by it.
   ───────────────────────────────────────────────────────────────────────────── */

/* Artwork px: the centre of the cat's base, first choice first. Both roofs
   are at y = 848. */
const ROOFS = [
  { x: 1572, y: 848 }, // bottom-right corner building
  { x: 1334, y: 848 }, // the lit tower right of centre
]
/* Clearance from the rail's line and icons. The city layer — and this cat with
   it — drifts up to 10px sideways with the pointer while the rail stays put, so
   anything under that lets the line cross the cat as the mouse moves. */
const RAIL_GAP = 12
/* Artwork px, a little taller than one of that tower's windows. Kept modest on
   purpose: the cat is a quiet shape you find, not a feature — she asked for a
   hint of it, not a clearly drawn animal. */
const HEIGHT = 64
const VIEW = { x: 7, y: 0, w: 40, h: 50 } // the drawing's own box
const BODY_CENTRE_X = 21 // where the base's middle is, in the drawing

/* Sitting, in profile, head to the left and tail out to the right — the way
   her reference has it.

   Cuddly, not sleek. The first drawings were the Halloween cat: tall pointed
   ears, a long thin body, a sharp nose, legs standing apart. What reads as soft
   at this size is the opposite on every count — a big round head, short ears
   with rounded tips, a round face with no point to it, a full fluffy chest and
   a chubby body wider at the haunch, and paws tucked in against the body with
   only a small notch between them rather than a gap you can see through. The
   tail is a touch thicker and curls up lazily at the tip. */
const BODY =
  // the round front of the face, up to the front ear
  'M8.7 13.4 C8.6 11.8 9.2 10.4 10.3 9.4 ' +
  // front ear: short, with a rounded tip
  'C10.4 7.4 10.6 5.4 11.4 4.2 C11.8 3.6 12.5 3.6 12.9 4.1 C13.6 5 14.3 5.9 15 6.6 ' +
  // the crown, then the back ear, also rounded
  'C16.3 6.1 17.6 6.1 18.8 6.5 C19.4 5.6 20.1 4.8 20.8 4.3 ' +
  'C21.3 4 21.9 4.2 22.1 4.8 C22.5 6.3 22.8 8 22.9 9.6 ' +
  // the big round back of the head, and a soft dip at the nape
  'C24 11.6 24.2 14.6 23.4 17 C24.2 18.6 25.4 20 26.8 21.6 ' +
  // the back rounding out into a full haunch and down to the roof
  'C31.2 25.6 34.8 30.8 35 37.6 C35.2 44 33.2 48.4 29.8 50 ' +
  // the hind paw, tucked in, and only a small notch before the front one
  'L18.4 50 C17.4 50 16.9 49.5 16.9 48.8 C16.9 48.2 16.6 47.6 16.1 47.6 ' +
  'C15.6 47.6 15.3 48.2 15.3 48.8 C15.3 49.5 14.8 50 13.8 50 ' +
  // the front paw, round at the toe
  'L11.6 50 C10.2 50 9.4 49 9.9 47.8 ' +
  // up the front leg into a full, fluffy chest
  'C10.6 44 10.4 37 9.8 31.4 C9.3 27 9.4 23 10.6 20.4 ' +
  // a soft chin, back to the face
  'C9.5 19.4 8.9 17.8 8.9 16.6 C8.8 15.6 8.7 14.4 8.7 13.4 Z'

/* The tail, as a stroke so it can pivot on its root: out of the haunch, along
   the roof, and the tip curling up. */
const TAIL = 'M29.4 49.2 C34.6 50.6 40 50.2 42.2 47.2 C43.8 45 43.2 42.4 41 42'
const TAIL_WIDTH = 3

const INK = '#050b16' // the tower's roof as it renders, after the city's grade
const RIM = 'rgba(176, 196, 255, 0.5)' // cool, from the moon — not the gold


export default function RoofCat() {
  const root = useRef(null)
  const [box, setBox] = useState(null)

  /* offsetWidth/Height, not a rect, for the same reason as ProcessWindows: the
     city layer is transformed, and layout size ignores transforms. */
  useLayoutEffect(() => {
    const host = root.current?.parentElement
    if (!host) return undefined
    /* The rail lives in Hero, a sibling of the whole scene, so it is found by
       its data hook rather than passed down. Its two parts — the thin line and
       the icon column — are measured separately: the cat sits beside the line,
       which is 22px inside the column's edge, and treating the whole rail as
       one box pushed the cat off a corner it clearly fits.

       Both are taken relative to where this host sits in LAYOUT, with its
       pointer-parallax translate removed, so the answer does not depend on
       where the mouse happened to be when the window was resized. */
    const measure = () => {
      const { offsetWidth: w, offsetHeight: h } = host
      if (!(w > 0 && h > 0)) return
      const railEl = document.querySelector('[data-rail]')
      const o = host.getBoundingClientRect()
      const t = new DOMMatrix(getComputedStyle(host).transform)
      const ox = o.left - t.m41
      const oy = o.top - t.m42
      const rail = railEl?.getClientRects().length
        ? [...railEl.children].map((el) => {
            const r = el.getBoundingClientRect()
            return { left: r.left - ox, right: r.right - ox, top: r.top - oy, bottom: r.bottom - oy }
          })
        : []
      setBox({ w, h, rail })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(host)
    return () => ro.disconnect()
  }, [])

  const { scale, offX, offY } = box ? coverMapping(box) : { scale: 0, offX: 0, offY: 0 }
  const h = HEIGHT * scale
  const w = (h * VIEW.w) / VIEW.h
  // The base's centre sits on the roof; x is measured from the body, not the tail.
  const bodyCentre = (BODY_CENTRE_X - VIEW.x) / VIEW.w

  const place = (roof) => ({
    left: offX + roof.x * scale - w * bodyCentre,
    // Down a hair, so the cat sits ON the roof edge rather than hovering over it.
    top: offY + roof.y * scale - h + scale * 1.5,
  })
  const clearOfRail = ({ left, top }) =>
    (box?.rail ?? []).every(
      (r) =>
        left + w + RAIL_GAP <= r.left ||
        left >= r.right + RAIL_GAP ||
        top > r.bottom ||
        top + h < r.top,
    )
  const at = ROOFS.map(place).find(clearOfRail) ?? place(ROOFS[ROOFS.length - 1])

  return (
    <div ref={root} aria-hidden="true" className="pointer-events-none absolute inset-0 hidden sm:block">
      {box && (
        <svg
          viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
          className="absolute"
          style={{
            left: at.left,
            top: at.top,
            width: w,
            height: h,
            overflow: 'visible',
          }}
        >
          {/* Rim first, nudged up and toward the moon; the body covers all of it
              but the top-right edge — the back, the haunch and the ears. */}
          <g transform="translate(0.7 -0.6)">
            <path d={BODY} fill={RIM} />
            <path className="hero-cat-tail" d={TAIL} fill="none" stroke={RIM} strokeWidth={TAIL_WIDTH} strokeLinecap="round" />
          </g>
          <path d={BODY} fill={INK} />
          <path className="hero-cat-tail" d={TAIL} fill="none" stroke={INK} strokeWidth={TAIL_WIDTH} strokeLinecap="round" />
        </svg>
      )}
    </div>
  )
}
