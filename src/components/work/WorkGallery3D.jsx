import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { projects } from '../../data/portfolio'
import { shortOf } from './groups'

/* ─────────────────────────────────────────────────────────────────────────────
   WorkGallery3D — the covers as curved planes in a void.

   Built to her reference (jesperlandberg.com's index): a black room with a
   perspective grid floor, project covers mapped onto vertically CURVED planes
   in a row, the centre one facing the camera and its neighbours angled away.
   Drag or scroll moves along the row.

   ══ Why this needs three.js, after I argued twice that it did not ══════════

   It needs it because the planes are bent. A CSS transform can rotate and
   translate a rectangle in perspective, which is what the earlier helix did,
   but it cannot curve one — there is no CSS for "bow this element along its
   own vertical axis". That bend is a vertex displacement on a segmented plane,
   and doing it means a mesh.

   I told her a CSS spiral did not need three.js, which was true, and then
   repeated it about these references, which was not. Reading the reference
   bundle settled it: 1,060KB, `WebGLRenderer`, `ShaderMaterial`,
   `PlaneGeometry`, 65 fragment shaders, zero `<img>` elements.

   ══ The first frame is rendered synchronously, on purpose ══════════════════

   `renderOnce()` is called during setup, before any animation loop starts.
   Three.js normally paints from inside a rAF loop, so in an environment where
   rAF never fires — a hidden tab, a throttled background window, the harness
   this was built in, which fires ZERO frames — the canvas would stay black and
   the whole section would be an empty hole. This is the same failure that put
   1600px of void on this page once already.

   With one synchronous render, the scene is correct and visible the instant it
   exists, and the loop only ever animates something already on screen. It is
   also what made this component verifiable at all.

   ══ The DOM grid is still the real content ═════════════════════════════════

   Whether this mounts at all is decided by `lib/canUse3D`, synchronously,
   before the first render — see that file for why it is not discovered in an
   effect. On a phone, without WebGL, or under reduced motion this component
   never mounts and the caller renders its ordinary grid of covers: nine `<img>`
   elements a crawler and a screen reader can both read. The canvas is
   decoration over that, never a replacement for it.

   ══ Geometry ═══════════════════════════════════════════════════════════════

   Each cover is a `PlaneGeometry` with 24 horizontal segments so it has
   vertices to bend. The bend is applied once at build time, pushing each
   vertex back along Z by the square of its distance from the plane's centre —
   a parabola, which reads as a cylinder section at this shallow depth and
   costs nothing per frame.

   Planes sit at `i * GAP` along X and turn to face inward, so the row curves
   away in both directions from wherever the camera is looking.
   ───────────────────────────────────────────────────────────────────────────── */

const PLANE_W = 3.2
const PLANE_H = 2.0
const GAP = 3.9 // world units between plane centres
const BEND = 0.55 // how far the edges bow away from the camera
const SEGMENTS = 24

/* Bow a plane along its own X axis. Called once per geometry — the vertices do
   not change again, so there is no per-frame cost to the curve at all. */
function bend(geometry, amount) {
  const pos = geometry.attributes.position
  const halfW = PLANE_W / 2
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const t = x / halfW // -1 .. 1
    pos.setZ(i, -t * t * amount)
  }
  pos.needsUpdate = true
  geometry.computeVertexNormals()
}

export default function WorkGallery3D() {
  const mount = useRef(null)
  const [label, setLabel] = useState(shortOf(projects[0]?.id, ''))

  useEffect(() => {
    const el = mount.current
    if (!el) return

    /* Capability was already settled by `canUse3D` before this mounted — the
       caller does not render it otherwise. A `WebGLRenderer` constructor can
       still throw on a machine that advertises a context and cannot give one,
       and an unhandled throw here would take the page down with it. */
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    } catch {
      return
    }

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x04060e)

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 120)
    camera.position.set(0, 0.15, 5.2)

    const width = el.clientWidth
    const height = Math.round(width * 0.46)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    el.appendChild(renderer.domElement)

    /* ── The floor. A grid, receding — the one element of the reference that
          establishes the space rather than the content. ── */
    const grid = new THREE.GridHelper(120, 120, 0x1b2740, 0x101a2c)
    grid.position.y = -1.55
    scene.add(grid)

    scene.add(new THREE.AmbientLight(0xffffff, 1))

    /* ── The covers ── */
    const loader = new THREE.TextureLoader()
    loader.setCrossOrigin('anonymous')
    const items = projects.filter((p) => p.image)
    const meshes = []

    items.forEach((p, i) => {
      const geo = new THREE.PlaneGeometry(PLANE_W, PLANE_H, SEGMENTS, 1)
      bend(geo, BEND)

      /* A visible placeholder colour, so a plane exists and is lit before its
         texture arrives — and stays that way if the image 404s. */
      const mat = new THREE.MeshBasicMaterial({ color: 0x16273e, side: THREE.DoubleSide })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.x = i * GAP
      mesh.userData = { id: p.id, index: i }
      scene.add(mesh)
      meshes.push(mesh)

      loader.load(
        p.image,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace
          mat.map = tex
          mat.color.set(0xffffff)
          mat.needsUpdate = true
          renderOnce()
        },
        undefined,
        () => {} // leave the placeholder colour on failure
      )
    })

    /* Camera target along the row, and the current eased position. */
    let target = 0
    let current = 0

    const layout = () => {
      meshes.forEach((m) => {
        const d = m.position.x - current
        /* Turn each plane inward, so the row bows away from the viewer in
           both directions rather than lying flat like a contact sheet. */
        m.rotation.y = THREE.MathUtils.clamp(-d * 0.13, -0.75, 0.75)
        m.position.z = -Math.abs(d) * 0.42
      })
      camera.position.x = current
      camera.lookAt(current, 0, 0)
    }

    const renderOnce = () => {
      layout()
      renderer.render(scene, camera)
    }

    /* THE FIRST FRAME, WITHOUT rAF. See the header — this is what stops the
       section being a black hole wherever rAF does not run. */
    renderOnce()

    let raf = 0
    const loop = () => {
      current += (target - current) * 0.075
      renderOnce()

      const idx = Math.round(current / GAP)
      const item = items[THREE.MathUtils.clamp(idx, 0, items.length - 1)]
      if (item) setLabel(shortOf(item.id, item.company))

      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    /* ── Input. Wheel and drag move along the row; the page does not scroll
          while the pointer is over the canvas, which is why this is a fixed
          height band rather than a pinned section. ── */
    const maxX = (items.length - 1) * GAP

    const onWheel = (e) => {
      e.preventDefault()
      target = THREE.MathUtils.clamp(target + e.deltaY * 0.006, 0, maxX)
    }

    let dragging = false
    let lastX = 0
    const onDown = (e) => {
      dragging = true
      lastX = e.clientX
      el.setPointerCapture?.(e.pointerId)
    }
    const onMove = (e) => {
      if (!dragging) return
      target = THREE.MathUtils.clamp(target - (e.clientX - lastX) * 0.012, 0, maxX)
      lastX = e.clientX
    }
    const onUp = () => {
      dragging = false
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)

    const onResize = () => {
      const w = el.clientWidth
      const h = Math.round(w * 0.46)
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderOnce()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('resize', onResize)
      meshes.forEach((m) => {
        m.geometry.dispose()
        if (m.material.map) m.material.map.dispose()
        m.material.dispose()
      })
      grid.geometry.dispose()
      grid.material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div className="relative">
      <div
        ref={mount}
        className="w-full overflow-hidden rounded-sm [&>canvas]:block [&>canvas]:h-auto [&>canvas]:w-full"
        style={{ cursor: 'grab' }}
        aria-hidden="true"
      />

      <div className="mt-5 flex items-baseline justify-between">
          <span className="font-display text-[1.05rem] font-medium text-hero-ink">{label}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-hero-mute">
          Drag or scroll
        </span>
      </div>
    </div>
  )
}
