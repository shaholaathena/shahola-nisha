import { useEffect } from 'react'
import Hero from '../components/sections/Hero'

/* The homepage is the hero and nothing else: one composed frame, one viewport,
   no scroll. What used to sit below it — work, about, experience,
   certifications, contact — now lives on /work and /about, so the landing is a
   picture rather than the first screen of a long page.

   The lock is deliberately NOT applied on phones. At 375x667 the eyebrow,
   headline, sub, CTA row and ticker do not reliably fit in 100svh, and clipping
   the argument is a worse outcome than letting the page move, so below `md` the
   hero keeps its natural height and scrolls normally. Hero.jsx carries the
   matching height rules. */
export default function Home() {
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const apply = () => { document.body.style.overflow = mq.matches ? 'hidden' : '' }
    apply()
    mq.addEventListener('change', apply)
    return () => {
      mq.removeEventListener('change', apply)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className="bg-hero-void text-hero-ink antialiased">
      <Hero />
    </div>
  )
}
