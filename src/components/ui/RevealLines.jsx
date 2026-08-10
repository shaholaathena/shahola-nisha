import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

/* ── Editorial line reveal. Each line sits in an overflow-hidden mask and lifts
   into place with a stagger, so a heading "wipes" up line by line as it scrolls
   into view. Inspiration: antonsten / kester.

   `lines` is an array of nodes — one per visual line — so styled fragments
   (an <em>, a coloured span, a <br/>-free line) survive intact.

   trigger="inview" reveals on scroll (default); trigger="mount" reveals on load
   (use for above-the-fold headings like the hero). ── */
export default function RevealLines({
  lines,
  className = '',
  lineClassName = '',
  style,
  stagger = 0.09,
  delay = 0,
  duration = 0.9,
  trigger = 'inview',
  as: Tag = 'span',
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[Tag] || motion.span

  if (reduce) {
    return (
      <Tag className={className} style={style}>
        {lines.map((line, i) => (
          <span key={i} className={`block ${lineClassName}`}>{line}</span>
        ))}
      </Tag>
    )
  }

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }
  const lineVariants = {
    hidden: { y: '118%' },
    show: { y: '0%', transition: { duration, ease: EASE } },
  }

  const activation =
    trigger === 'mount'
      ? { initial: 'hidden', animate: 'show' }
      : { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-12%' } }

  return (
    <MotionTag className={className} style={style} variants={container} {...activation}>
      {lines.map((line, i) => (
        // pb/-mb keeps descenders and italics from clipping against the mask edge
        // without adding real layout height.
        <span key={i} className={`block overflow-hidden pb-[0.12em] -mb-[0.12em] ${lineClassName}`}>
          <motion.span variants={lineVariants} className="block">
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}
