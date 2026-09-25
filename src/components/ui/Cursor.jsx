import { useEffect, useRef, useState } from 'react'

/* ── Star cursor ──

   The star itself is NOT drawn here. It is the system cursor, set from an SVG
   in index.css (`html.has-custom-cursor`), so the OS moves it on the hardware
   cursor plane and it is exactly as fast as a normal cursor. Two cursors that
   JS positioned were reported as slow before this; this one cannot be.

   This component only adds what CSS cannot, and neither piece can hold the
   star back, because the star does not wait for them:
     · STARDUST: small glowing white and gold motes and four-arm sparkles
       shed along the path, drifting and twinkling out over a second or so; mostly gold while over something clickable, to match the
       gold star. Drawn on one canvas; the loop stops when they are gone.
     · A CLICK BURST: a small ring of stars thrown out from the tip on press.
     · A "View" TAG beside the star over a large clickable card (or any
       element with data-cursor="ring"); its text is data-cursor-label if set.
       data-cursor="plain" opts an element out of the tag.

   Fine pointers only; touch never mounts it, and without the class the page
   keeps the ordinary cursor. Reduced motion drops the stardust and the burst. */

const INTERACTIVE = 'a, button, [role="button"], summary, label[for], [data-cursor]'
const TEXT = 'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]'
const LARGE_W = 320
const LARGE_H = 120
// Toned down after it read as too busy, then back up a step when it vanished:
// a star every ~24px of travel, small, soft and gone in under a second.
const MAX_PARTICLES = 60
const SPAWN_EVERY = 24 // px of travel per star

export default function Cursor() {
  // Read once at mount. This is a client-only SPA, so window is always there.
  const [enabled] = useState(
    () => window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  )
  const tag = useRef(null)
  const canvas = useRef(null)

  useEffect(() => {
    if (!enabled) return
    const root = document.documentElement
    root.classList.add('has-custom-cursor')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const label = tag.current
    const cv = canvas.current
    const ctx = cv.getContext('2d')
    let dpr = 1
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = Math.round(window.innerWidth * dpr)
      cv.height = Math.round(window.innerHeight * dpr)
    }
    resize()

    const last = { x: 0, y: 0, set: false }
    let travelled = 0
    let raf = 0
    let prevT = 0
    const stars = []

    const tagFor = (target) => {
      if (target?.closest?.(TEXT)) return null
      const hit = target?.closest?.(INTERACTIVE)
      if (!hit) return null
      const pref = hit.getAttribute('data-cursor')
      if (pref === 'plain') return null
      const text = hit.getAttribute('data-cursor-label') || 'View'
      if (pref === 'ring') return text
      const r = hit.getBoundingClientRect()
      return r.width > LARGE_W || r.height > LARGE_H ? text : null
    }

    const GOLD = '243, 207, 134'
    const WHITE = '255, 255, 255'
    let goldShare = 0.3

    const spawn = (x, y, dx, dy) => {
      if (stars.length >= MAX_PARTICLES) stars.shift()
      stars.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        vx: -dx * 0.01 + (Math.random() - 0.5) * 0.3,
        vy: -dy * 0.01 + (Math.random() - 0.5) * 0.3 + 0.05,
        size: 0.9 + Math.random() * 1.1,
        life: 550 + Math.random() * 350,
        age: 0,
        seed: Math.random() * 6.28,
        rgb: Math.random() < goldShare ? GOLD : WHITE,
      })
    }

    // Evenly spaced around the tip with a little jitter, fast, short-lived.
    const burst = (x, y) => {
      const n = 5
      for (let i = 0; i < n; i++) {
        if (stars.length >= MAX_PARTICLES) stars.shift()
        const a = (i / n) * Math.PI * 2 + Math.random() * 0.4
        const v = 1.2 + Math.random() * 0.9
        stars.push({
          x, y,
          vx: Math.cos(a) * v,
          vy: Math.sin(a) * v,
          size: 0.9 + Math.random() * 1,
          life: 420 + Math.random() * 220,
          age: 0,
          seed: Math.random() * 6.28,
          rgb: Math.random() < Math.max(goldShare, 0.5) ? GOLD : WHITE,
        })
      }
    }

    const tick = (now) => {
      raf = 0
      const dt = prevT ? Math.min(now - prevT, 50) : 16
      prevT = now
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      ctx.globalCompositeOperation = 'lighter'
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i]
        s.age += dt
        if (s.age >= s.life) { stars.splice(i, 1); continue }
        s.x += s.vx * dt * 0.06
        s.y += s.vy * dt * 0.06
        s.vx *= 0.985
        s.vy *= 0.985
        const t = s.age / s.life
        // Soft but visible: 65% at most (35% vanished; at 75% with larger,
        // denser motes it read as too strong). Each mote eases in over its first ~90ms instead
        // of popping on, so the trail reads as a haze rather than dots.
        const fadeIn = Math.min(1, s.age / 90)
        const a = 0.65 * fadeIn * Math.pow(1 - t, 1.8) * (0.55 + 0.45 * Math.sin(s.seed + s.age * 0.018))
        const r = s.size * (1 - t * 0.5)
        // A soft halo first, so each mote glows rather than just dots.
        ctx.fillStyle = `rgba(${s.rgb}, ${a * 0.12})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, r * 3, 0, Math.PI * 2)
        ctx.fill()
        if (s.size > 1.55) {
          // The larger ones are tiny four-arm sparkles, the cursor's own shape.
          const l = r * 3
          const k = r * 0.45
          ctx.fillStyle = `rgba(${s.rgb}, ${a})`
          ctx.beginPath()
          ctx.moveTo(s.x, s.y - l)
          ctx.quadraticCurveTo(s.x + k, s.y - k, s.x + l, s.y)
          ctx.quadraticCurveTo(s.x + k, s.y + k, s.x, s.y + l)
          ctx.quadraticCurveTo(s.x - k, s.y + k, s.x - l, s.y)
          ctx.quadraticCurveTo(s.x - k, s.y - k, s.x, s.y - l)
          ctx.fill()
        } else {
          ctx.fillStyle = `rgba(${s.rgb}, ${a})`
          ctx.beginPath()
          ctx.arc(s.x, s.y, r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      if (stars.length) raf = requestAnimationFrame(tick)
      else prevT = 0
    }

    const onMove = (e) => {
      const x = e.clientX
      const y = e.clientY

      goldShare = e.target?.closest?.(INTERACTIVE) ? 0.85 : 0.3

      const text = tagFor(e.target)
      if (text) {
        if (label.textContent !== text) label.textContent = text
        label.style.transform = `translate3d(${x + 22}px, ${y + 26}px, 0)`
        label.dataset.on = 'true'
      } else if (label.dataset.on === 'true') {
        label.dataset.on = 'false'
      }

      if (!last.set) { last.x = x; last.y = y; last.set = true; return }
      const dx = x - last.x
      const dy = y - last.y
      last.x = x; last.y = y
      if (reduce || e.target?.closest?.(TEXT)) return
      travelled += Math.hypot(dx, dy)
      if (travelled < SPAWN_EVERY) return
      while (travelled >= SPAWN_EVERY) {
        travelled -= SPAWN_EVERY
        // From the sparkle's centre, not its tip: the hotspot is the top arm.
        spawn(x + 5, y + 13, dx, dy)
      }
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onLeave = () => { label.dataset.on = 'false'; last.set = false }
    const onDown = (e) => {
      if (reduce || e.button !== 0 || e.target?.closest?.(TEXT)) return
      burst(e.clientX, e.clientY)
      if (!raf) raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    root.addEventListener('pointerleave', onLeave)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      root.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      root.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', resize)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
      <span ref={tag} className="cursor-tag" data-on="false">View</span>
    </div>
  )
}
