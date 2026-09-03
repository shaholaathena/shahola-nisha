import SectionRow from '../about/SectionRow'
import { experience } from '../../data/portfolio'

/* ─────────────────────────────────────────────────────────────────────────────
   Experience and capabilities.

   Two rows in the page's one shape. The experience list follows the reference's
   timeline exactly: the period in a narrow left column, then company, role and
   what the work actually was. Reading the dates as a column is the point — a
   reader scanning a CV wants the shape of a career before the detail of it.

   Capabilities sit in a separate row rather than inside the timeline, because
   they are not tied to one employer. Grouped by where they fall in the work,
   so the list reads as a practice rather than a keyword dump; the third group
   is the one most designers cannot claim.
   ───────────────────────────────────────────────────────────────────────────── */
const CAPABILITIES = [
  {
    group: 'Research & definition',
    items: ['User research', 'Stakeholder interviews', 'Journey mapping', 'Information architecture', 'Flow design'],
  },
  {
    group: 'Design & systems',
    items: ['Interface design', 'Design systems', 'Design tokens', 'Prototyping', 'Usability review', 'Accessibility'],
  },
  {
    group: 'Build',
    items: ['HTML & CSS', 'JavaScript', 'React', 'Tailwind', 'Framer Motion', 'Design-to-code handoff'],
  },
]

export default function ExperienceSection() {
  return (
    <>
      <SectionRow id="experience" label="Experience" meta="Since 2018">
        <ol className="flex flex-col">
          {experience.map((job, i) => (
            <li
              key={job.company}
              className={`grid grid-cols-12 gap-x-6 gap-y-2 py-7 lg:gap-x-10 ${
                i > 0 ? 'border-t border-white/[0.08]' : ''
              }`}
            >
              <div className="col-span-12 sm:col-span-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-hero-mute">
                  {job.period}
                </span>
              </div>
              <div className="col-span-12 sm:col-span-9">
                <h3 className="font-display text-[1.3rem] font-semibold leading-tight tracking-[-0.015em] text-hero-ink">
                  {job.company}
                </h3>
                <p className="mt-1 text-[13px] font-semibold text-hero-hot">{job.role}</p>
                <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[#aeb6d6]">
                  {job.description}
                </p>
                {job.highlights?.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
                    {job.highlights.map((h) => (
                      <li
                        key={h}
                        className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-hero-mute"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </SectionRow>

      <SectionRow label="What I do" meta="Research to release">
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-3">
          {CAPABILITIES.map((c) => (
            <div key={c.group}>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-hero-hot">
                {c.group}
              </h3>
              <ul className="mt-4 flex flex-col gap-2">
                {c.items.map((it) => (
                  <li key={it} className="text-[14px] leading-snug text-[#b9c0dd]">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionRow>
    </>
  )
}
