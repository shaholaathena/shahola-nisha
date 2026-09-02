import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/* ── Custom cursor: a blend-mode ring that trails the pointer and swells over
   anything interactive. Only mounts on fine-pointer (mouse) devices, and hides
   the native cursor while active — restored on unmount. Respects touch. ── */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [down, setDown] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  // Ring trails softly; the dot (below) tracks tighter.
  const ringX = useSpring(x, { stiffness: 380, damping: 34, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 380, damping: 34, mass: 0.6 })
  const dotX = useSpring(x, { stiffness: 900, damping: 40, mass: 0.3 })
  const dotY = useSpring(y, { stiffness: 900, damping: 40, mass: 0.3 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)

    const prevCursor = document.body.style.cursor
    document.body.style.cursor = 'none'

    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    const isInteractive = (el) =>
      el?.closest?.('a, button, [role="button"], input, textarea, select, [data-cursor], .cursor-pointer')
    const over = (e) => setHovering(!!isInteractive(e.target))
    const downH = () => setDown(true)
    const upH = () => setDown(false)

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    window.addEventListener('mousedown', downH)
    window.addEventListener('mouseup', upH)
    return () => {
      document.body.style.cursor = prevCursor
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mousedown', downH)
      window.removeEventListener('mouseup', upH)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block" aria-hidden="true" style={{ mixBlendMode: 'difference' }}>
      {/* trailing ring */}
      <motion.div
        className="absolute top-0 left-0 rounded-full border border-white"
        style={{ x: ringX, y: ringY, width: 34, height: 34, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: down ? 0.8 : hovering ? 1.9 : 1, opacity: hovering ? 0.9 : 0.6 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      />
      {/* tight dot */}
      <motion.div
        className="absolute top-0 left-0 rounded-full bg-white"
        style={{ x: dotX, y: dotY, width: 5, height: 5, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  )
}
