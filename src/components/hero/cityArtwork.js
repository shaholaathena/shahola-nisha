/* ─────────────────────────────────────────────────────────────────────────────
   The city artwork's geometry, for anything pinned to a point in it.

   `CANVAS` is cityscape2.svg's own viewBox, and `OBJECT_POSITION` is the
   `objectPosition` NightScene renders it at. Both MUST match those two places:
   `object-fit` geometry is not exposed to script, so there is no way to read
   it back from the DOM, and every pinned element — the process windows, the cat
   on the roof — drifts off its mark the moment one side changes without the
   other.

   Its own module, not an export from ProcessWindows, because exporting plain
   values beside a component breaks React Fast Refresh.
   ───────────────────────────────────────────────────────────────────────────── */
export const CANVAS = { w: 1703, h: 1200 }
export const OBJECT_POSITION = { x: 0.5, y: 0.84 }

/* Artwork space → host space. `object-cover` scales by whichever axis needs
   more, then objectPosition decides which part of the overflow is cropped. That
   overflow is negative, which is why the offsets are. */
export function coverMapping(box) {
  const scale = Math.max(box.w / CANVAS.w, box.h / CANVAS.h)
  return {
    scale,
    offX: (box.w - CANVAS.w * scale) * OBJECT_POSITION.x,
    offY: (box.h - CANVAS.h * scale) * OBJECT_POSITION.y,
  }
}
