import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

/* ── Custom cursor: two elements, two speeds.
   A small dot tracks the pointer almost exactly, while a larger ring follows on a
   softer spring so it trails and settles a beat later. That lag is the whole
   effect — it reads as weight rather than decoration. Inspiration: robin-noguier
   / kester.

   Colour: both layers are white under `mix-blend-mode: difference`, so they
   render near-black on the cream editorial sections and white on the dark ones
   with no per-section wiring. The `view` state opts out of blending — a solid
   ink disc, because a label has to stay readable.

   Tag any element to change the cursor:
     data-cursor="view" data-cursor-label="See work"   → filled disc + label
     data-cursor="none"                                → hidden

   Guards: mounts only on a fine pointer (mouse), so touch keeps the native
   cursor; `cursor: none` is applied via a class this component adds, so a JS
   failure leaves the normal cursor intact; reduced motion drops the spring lag. ── */
export default function Cursor() {
  // Decided once at mount: a fine pointer (mouse) gets the custom cursor; touch
  // devices never enable it. Computed in the initializer so we don't setState in
  // an effect (which would trigger a cascading re-render).
  const [enabled] = useState(
    () => typeof window !== 'undefined' && !!window.matchMedia?.('(pointer: fine)').matches
  )
  const [visible, setVisible] = useState(false)
  const [variant, setVariant] = useState('default') // default | link | view | hidden
  const [label, setLabel] = useState('')
  const [down, setDown] = useState(false)
  const labelRef = useRef('')

  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  // Two springs off the same source: the dot is near-instant, the ring lags.
  const dotCfg = reduce ? { stiffness: 2200, damping: 90 } : { stiffness: 1300, damping: 55, mass: 0.25 }
  const ringCfg = reduce ? { stiffness: 2200, damping: 90 } : { stiffness: 200, damping: 26, mass: 0.55 }
  const dotX = useSpring(x, dotCfg)
  const dotY = useSpring(y, dotCfg)
  const ringX = useSpring(x, ringCfg)
  const ringY = useSpring(y, ringCfg)

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-custom-cursor')

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const over = (e) => {
      const t = e.target.closest?.('[data-cursor], a, button, [role="button"]')
      if (!t) {
        setVariant('default')
        if (labelRef.current) { setLabel(''); labelRef.current = '' }
        return
      }
      const c = t.getAttribute('data-cursor')
      if (c === 'view') {
        const l = t.getAttribute('data-cursor-label') || 'View'
        setVariant('view')
        setLabel(l)
        labelRef.current = l
      } else if (c === 'none') {
        setVariant('hidden')
      } else {
        setVariant('link')
        if (labelRef.current) { setLabel(''); labelRef.current = '' }
      }
    }
    const leave = () => setVisible(false)
    const enter = () => setVisible(true)
    const downFn = () => setDown(true)
    const upFn = () => setDown(false)

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)
    window.addEventListener('mousedown', downFn)
    window.addEventListener('mouseup', upFn)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
      window.removeEventListener('mousedown', downFn)
      window.removeEventListener('mouseup', upFn)
      document.documentElement.classList.remove('has-custom-cursor')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled])

  if (!enabled) return null

  const isView = variant === 'view'
  const isLink = variant === 'link'
  const shown = visible && variant !== 'hidden'

  const ringSize = isView ? 92 : isLink ? 54 : 34
  const dotSize = isLink ? 5 : 7

  const spring = { type: 'spring', stiffness: 380, damping: 28, mass: 0.5 }

  return (
    <>
      {/* Trailing ring — the slower of the two */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="flex items-center justify-center rounded-full"
          animate={{
            width: ringSize,
            height: ringSize,
            opacity: shown ? 1 : 0,
            scale: down ? 0.88 : 1,
            backgroundColor: isView ? '#111111' : 'rgba(255,255,255,0)',
            borderWidth: isView ? 0 : 1,
          }}
          transition={spring}
          style={{
            marginLeft: -ringSize / 2,
            marginTop: -ringSize / 2,
            borderColor: 'rgba(255,255,255,0.85)',
            borderStyle: 'solid',
            // The label must stay legible, so the filled state opts out of blending.
            mixBlendMode: isView ? 'normal' : 'difference',
          }}
        >
          <AnimatePresence>
            {isView && label && (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.18 }}
                className="select-none px-2 text-center font-mono text-[9px] font-medium uppercase leading-tight tracking-[0.14em] text-[#f5f2eb]"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Leading dot — hidden while the filled disc is showing */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: dotX, y: dotY }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: dotSize,
            height: dotSize,
            opacity: shown && !isView ? 1 : 0,
          }}
          transition={spring}
          style={{
            marginLeft: -dotSize / 2,
            marginTop: -dotSize / 2,
            mixBlendMode: 'difference',
          }}
        />
      </motion.div>
    </>
  )
}
