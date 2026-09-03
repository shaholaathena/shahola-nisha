import SectionRow from '../about/SectionRow'

/* ─────────────────────────────────────────────────────────────────────────────
   Credentials.

   Built on the reference's "Featured in" row: a year in the left column, the
   title as the line you actually read, and the source underneath. Three of the
   four link out to a verifiable certificate, and the ones that do get the
   arrow — a credential you cannot check is worth less than one you can, so the
   link is treated as part of the credential rather than as decoration.

   The whole row is the link where a URL exists, not just the title, because a
   14px target inside a wide empty row is a hit area nobody can find.
   ───────────────────────────────────────────────────────────────────────────── */
const certs = [
  {
    title: 'Foundations of User Experience (UX) Design',
    issuer: 'Google',
    platform: 'Coursera',
    year: 'Jul 2023',
    url: 'https://www.coursera.org/account/accomplishments/certificate/25NSD3JFBHTH',
  },
  {
    title: 'Start the UX Design Process: Empathize, Define & Ideate',
    issuer: 'Google',
    platform: 'Coursera',
    year: 'Oct 2023',
    url: 'https://www.coursera.org/account/accomplishments/certificate/Y8U9X6EMT2HL',
  },
  {
    title: 'Conduct UX Research and Test Early Concepts',
    issuer: 'Google',
    platform: 'Coursera',
    year: 'Mar 2024',
    url: 'https://www.coursera.org/account/accomplishments/verify/VWD8EU4R5E28',
  },
  {
    title: 'Internet of Things (IoT)',
    issuer: 'Certificate of Achievement',
    platform: 'Independent',
    year: '2018',
    url: null,
  },
]

function Row({ c, first }) {
  const inner = (
    <>
      <div className="col-span-12 sm:col-span-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-hero-mute">
          {c.year}
        </span>
      </div>
      <div className="col-span-12 sm:col-span-9">
        <h3 className="flex items-start gap-1.5 text-[15px] font-semibold leading-snug text-hero-ink transition-colors group-hover:text-hero-hot sm:text-[16px]">
          {c.title}
          {c.url && (
            <span aria-hidden className="mt-[2px] shrink-0 text-hero-mute transition-colors group-hover:text-hero-hot">
              ↗
            </span>
          )}
        </h3>
        <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-hero-mute">
          {c.issuer} · {c.platform}
        </p>
      </div>
    </>
  )

  const cls = `group grid grid-cols-12 gap-x-6 gap-y-2 py-6 lg:gap-x-10 ${
    first ? '' : 'border-t border-white/[0.08]'
  }`

  return c.url ? (
    <li>
      <a href={c.url} target="_blank" rel="noreferrer noopener" className={cls}>
        {inner}
      </a>
    </li>
  ) : (
    <li className={cls}>{inner}</li>
  )
}

export default function CertificationsSection() {
  return (
    <SectionRow id="certifications" label="Credentials" meta={`${certs.length} certificates`}>
      <ul className="flex flex-col">
        {certs.map((c, i) => (
          <Row key={c.title} c={c} first={i === 0} />
        ))}
      </ul>
    </SectionRow>
  )
}
