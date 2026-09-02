/* ─────────────────────────────────────────────────────────────────────────────
   NightScene — deliberately sparse.

   An earlier version stacked mountains, a cityscape and a foreground from three
   different illustration sets. They had incompatible palettes, lighting and
   perspective, so the result read as a collage with hard crop seams rather than
   a place. Colour-grading cannot fix that.

   So this keeps only what is internally consistent: one night sky, its stars,
   and one photoreal moon — all lit from the same source, with no horizon line
   to betray a crop. Atmosphere comes from bloom and haze, not from more assets.

   The city is back, on those same terms. `cityscape2.svg` is the one that
   actually works, and it works because it is not a cutout — it is a whole
   night scene: 1703x1200, buildings filling four fifths of the height, its own
   water reflections, and an opaque sky painted `#020423`. That last detail is
   the reason this blends at all: the scene's own sky gradient starts at
   `#040613`, so the artwork's sky and ours are within a few values of each
   other and the seam has almost nothing to hide.

   So it is not placed as a strip — it IS the background, full-bleed, and three
   things make it sit in the frame instead of on top of it:

     · Its top edge is masked, not cropped. The fade runs through the artwork's
       own sky band and into the rooflines, so distant towers lose their tops to
       haze. A crop would draw a line; this reads as aerial perspective.
     · It is colour-graded toward the scene, not left as drawn. The back towers
       are a dusty mauve that is far warmer than this palette, so an indigo
       `mix-blend-color` pass takes the hue while leaving the luminance — which
       is what keeps the lit windows reading as lights. The layer is `isolate`d
       so that blend stays inside the city and does not touch the sky.
     · `glow` sits IN FRONT of it, so the ground haze is air between the viewer
       and the city rather than a wash underneath it.

   The moon renders after the city and is therefore always on top: it is the
   scene's light source, so nothing should occlude it.

   Layers still expose `data-layer` for the GSAP timeline in Hero.jsx.
   ───────────────────────────────────────────────────────────────────────────── */
import skyStars from '../../assets/hero/sky.svg'
import moon from '../../assets/hero/moon.png'
// Lives in hero-creative/ because that is where it was dropped; the other
// layers resolve from hero/. Worth unifying, but not worth a silent file move.
import cityscape from '../../assets/hero-creative/cityscape2.svg'

export default function NightScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">

      {/* ── Sky ── */}
      <div
        data-layer="sky"
        className="absolute inset-0 -top-[6%] h-[112%]"
        style={{ background: 'linear-gradient(180deg, #040613 0%, #080e26 34%, #101838 58%, #171f45 78%, #0d1430 100%)' }}
      />

      {/* ── Stars: the supplied night sky, used for its star field. Edge-faded
             on all sides so it never shows the boundary of its own canvas. ── */}
      <div
        data-layer="stars"
        className="absolute inset-0"
        style={{
          maskImage: 'radial-gradient(120% 100% at 50% 30%, #000 55%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(120% 100% at 50% 30%, #000 55%, transparent 100%)',
        }}
      >
        <img src={skyStars} alt="" className="h-full w-full object-cover opacity-90" draggable="false" />
      </div>

      {/* ── Clouds: soft, low-contrast, no hard edges. Just enough to keep the
             sky from reading as a flat gradient. ── */}
      <svg data-layer="clouds" className="absolute inset-x-0 top-[8%] h-[52%] w-full" preserveAspectRatio="none" viewBox="0 0 100 52">
        <defs>
          <filter id="cloudsoft" x="-40%" y="-140%" width="180%" height="380%">
            <feGaussianBlur stdDeviation="3.4" />
          </filter>
        </defs>
        <g filter="url(#cloudsoft)">
          <ellipse cx="72" cy="16" rx="26" ry="2.6" fill="#7d76b8" opacity="0.22" />
          <ellipse cx="30" cy="26" rx="30" ry="2.4" fill="#5f5a95" opacity="0.16" />
          <ellipse cx="86" cy="34" rx="20" ry="2.0" fill="#8a7fae" opacity="0.12" />
        </g>
      </svg>

      {/* ── City.

             Full-bleed and `object-cover`: at 1703x1200 the artwork is only a
             touch squarer than the viewport, so covering the frame crops barely
             a hundred pixels — the skyline arrives essentially uncropped, which
             is exactly what the previous asset could not do at this width.

             `isolate` matters: the grade below uses mix-blend, and without an
             isolation context those blends would reach past the city and tint
             the sky and stars too. ── */}
      <div
        data-layer="city"
        className="absolute inset-0 isolate"
        style={{
          /* The artwork's own sky dissolves into ours rather than being cut.
             The ramp deliberately runs past the sky band and into the rooflines
             so the tallest distant towers lose their tops to haze. */
          maskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.28) 16%, rgba(0,0,0,0.75) 30%, #000 44%, #000 100%)',
          WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.28) 16%, rgba(0,0,0,0.75) 30%, #000 44%, #000 100%)',
        }}
      >
        <img
          src={cityscape}
          alt=""
          className="h-full w-full object-cover object-bottom"
          draggable="false"
          style={{ filter: 'brightness(0.66) saturate(0.5) contrast(1.06)' }}
        />

        {/* Hue pass. `color` takes hue and saturation from this fill and keeps
            the luminance underneath, so the mauve towers move to indigo while
            the lit windows stay bright. A hue-rotate() could not do this: it
            would have swung the teal foreground just as far the wrong way. */}
        <div className="absolute inset-0 mix-blend-color" style={{ background: '#243063', opacity: 0.62 }} />

        {/* Depth: the base of the city is further into the haze than its
            roofline, and the very bottom carries the artwork's water, which
            should read as dark and still. */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(19,26,60,0.30) 74%, rgba(9,14,36,0.62) 100%)' }}
        />

        {/* ── City lights.

               The windows are baked into the artwork, so the separable layer
               the README asks for is faked as a bloom over the massing. Own
               `data-layer`, starts dim — Hero.jsx lifts it on scroll. Cool, not
               warm: these windows are pale yellow-green, and an orange bloom
               over them read as a different city. ── */}
        <div
          data-layer="city-lights"
          className="absolute inset-0 mix-blend-screen opacity-35"
          style={{ background: 'radial-gradient(ellipse 78% 42% at 54% 80%, rgba(196,214,255,0.26) 0%, rgba(168,190,246,0.10) 46%, transparent 78%)' }}
        />
      </div>

      {/* ── Atmosphere: a soft ground-glow so the lower frame is air, not dead
             black. No hard line, so nothing reads as a horizon crop. ── */}
      <div
        data-layer="glow"
        className="absolute inset-x-0 bottom-0 h-[46%]"
        style={{ background: 'radial-gradient(130% 100% at 62% 100%, rgba(90,104,190,0.24) 0%, rgba(44,52,110,0.12) 38%, transparent 72%)' }}
      />

      {/* ── Moon: the single focal object, and the scene's only light source ── */}
      <div
        data-layer="moon"
        className="absolute right-[10%] top-[9%] h-[30vmin] w-[30vmin] sm:right-[14%] lg:right-[17%]"
      >
        {/* bloom — the moon has to feel like it is lighting the air around it */}
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
        {/* one HUD flourish, tying the scene to the numbered navigation */}
        <svg
          data-layer="orbit"
          className="absolute left-1/2 top-1/2 h-[220%] w-[220%] -translate-x-1/2 -translate-y-1/2 overflow-visible"
          viewBox="0 0 200 200"
        >
          <ellipse cx="100" cy="100" rx="96" ry="33" fill="none" stroke="rgba(186,178,240,0.22)" strokeWidth="0.5" transform="rotate(-18 100 100)" />
          <circle cx="195" cy="69" r="1.6" fill="#d7ceff" opacity="0.8" />
        </svg>
      </div>

      {/* grade */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(110% 92% at 66% 30%, transparent 32%, rgba(3,5,14,0.52) 100%)' }} />
    </div>
  )
}
