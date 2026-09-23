import { motion } from 'framer-motion'

/* One star on a scroll-drawn line — the stages in WhatIDo and the roles in
   Experience. Unlit it is a faint ring on the void, so the line appears to pass
   through a star that is not on yet; `lit` (0–1, usually a motion value off the
   scroll) brings up the gold and its glow over it. 11px, so its centre sits on
   a line drawn 5px in from the same edge. */
export default function Star({ lit }) {
  return (
    <span aria-hidden className="relative block h-[11px] w-[11px]">
      <span className="absolute inset-0 rounded-full border border-white/25 bg-hero-void" />
      <motion.span
        className="absolute inset-0 rounded-full bg-hero-hot"
        style={{
          opacity: lit,
          boxShadow: '0 0 0 4px rgba(232,184,98,0.12), 0 0 18px rgba(232,184,98,0.55)',
        }}
      />
    </span>
  )
}
