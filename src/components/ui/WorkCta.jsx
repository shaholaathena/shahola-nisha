import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

/* "Explore my work": the one call to action the homepage hero and the About
   intro both end on. Its look is `.work-cta` in index.css.

   The pointer position is written to --mx / --my so the gold spotlight inside
   the glass can follow the cursor. `ref` passes through (React 19) because the
   hero leans this element toward the cursor with GSAP, which owns its
   transform; nothing in CSS may animate `transform` on the root. */
export default function WorkCta({ ref, className = '' }) {
  const onPointerMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <Link ref={ref} to="/work" onPointerMove={onPointerMove} className={`work-cta ${className}`}>
      <span className="work-cta-label">Explore my work</span>
      <span className="work-cta-disc" aria-hidden="true">
        <span className="work-cta-arrows">
          <ArrowRight className="h-[18px] w-[18px]" strokeWidth={2.25} />
          <ArrowRight className="h-[18px] w-[18px]" strokeWidth={2.25} />
        </span>
      </span>
    </Link>
  )
}
