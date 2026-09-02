# Hero artwork — layered nightscape

Drop illustrated layers in this folder and they are picked up automatically.
`NightScene.jsx` resolves each layer by **exact filename** (no extension) and
renders the image instead of its drawn fallback. Nothing else needs editing —
the GSAP choreography in `Hero.jsx` targets `data-layer` names, not markup.

Any subset works. Provide only `moon` and you get an illustrated moon over a
drawn landscape. Provide all of them and the scene is fully illustrated.

## Filenames (PNG with alpha, unless noted)

| File | Layer | Alpha | Notes |
|---|---|---|---|
| `sky` | backdrop | opaque | Full-bleed gradient sky + nebula/haze. JPG fine. |
| `stars` | distant stars | **yes** | Stars only, transparent elsewhere. |
| `clouds` | clouds | **yes** | Moonlit cloud banks, transparent. |
| `moon` | moon | **yes** | The moon disc + its bloom. Square canvas, centred. |
| `mtn-back` | mountain background | **yes** | Hazier, lighter — aerial perspective. |
| `mtn-fore` | mountain foreground | **yes** | Darker, more detail. |
| `city` | city distant | **yes** | Building silhouettes, unlit. |
| `city-lights` | city lights | **yes** | Window/street lights ONLY, on transparent — this layer is brightened on scroll, so it must be separable. |
| `sea` | ocean | opaque-ish | Water body. |
| `reflection` | moon reflection | **yes** | Moonpath on water. Animated separately from `moon`. |
| `reflected-stars` | reflected stars | **yes** | Faint star reflections. |
| `foreground` | foreground | **yes** | Shoreline, trees, railing, viewing point. Darkest, moves fastest. |

## Specs

- **Width:** 2560px (3200px if you can) — it spans full-bleed.
- **Height:** size each layer to where it sits; full-canvas layers are simplest
  and safest (transparent above/below), because every layer is absolutely
  positioned to the same box.
- **Format:** PNG for anything with alpha. WebP preferred for weight; JPG only
  for `sky`/`sea`. Please compress — the previous single hero image was 1.15 MB,
  which is what we just removed.
- **Composition:** keep the LEFT ~45% visually calm. The headline sits there and
  a busy left side kills legibility.
- **Moon:** place it right-of-centre, upper third. It is the focal anchor.
- **Overlap:** let layers overlap generously; parallax shifts them and gaps show
  as seams otherwise. Extend each layer ~10% beyond where it appears to sit.

## The one compositional rule

The scene has to read **complexity → clarity → impact**: jagged mountains give
way to the ordered city, which resolves into calm water. That progression is the
argument the hero is making, so keep the mountains restless and the sea still.
