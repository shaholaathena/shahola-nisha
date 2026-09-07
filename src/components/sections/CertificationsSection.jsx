import SectionRow from '../about/SectionRow'

/* ─────────────────────────────────────────────────────────────────────────────
   Certifications.

   Named "Credentials" until now, while Navigation has always linked to it as
   "Certifications" — so the nav promised one heading and the page delivered
   another. Renaming the section settles it in the direction the nav already
   pointed.

   Three of the four link out to a verifiable certificate, and the ones that do
   get the arrow — a credential you cannot check is worth less than one you can,
   so the link is treated as part of the credential rather than as decoration.
   That is also where the section's heading comes from.

   The whole row is the link where a URL exists, not just the title, because a
   14px target inside a wide empty row is a hit area nobody can find.

   Every field except the title is optional. The year, the issuer and the
   platform each render only if present, so an entry can carry just the fact it
   is sure of instead of padding the rest out with guesses.

   The year moved from a left column to the right edge, matching what Experience
   now does: title and year as the row's two anchors, with the reading happening
   between them. Two lists on one page that both carry a date should not carry
   it in two different places.

   Hover moves the title to the accent and slides the arrow. It used to also
   wash the row in gold; that was removed with the rest of the page's glow,
   because a tint behind a row of text buys atmosphere and spends legibility.
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
  /* Hers, added on request. The band score is all that was given, so the
     issuer is still left off rather than guessed — IELTS is administered by the
     British Council, IDP and Cambridge, only she knows which sat her, and a
     wrong body on a verifiable credential is worse than a missing one. Fill
     `issuer` in and it renders automatically; the row omits it while it is
     absent. Sat 2025, so it is also the most recent entry in the list. */
  {
    title: 'IELTS Academic, overall band 7',
    issuer: null,
    platform: null,
    year: '2025',
    url: null,
  },
]

function Row({ c, first }) {
  const inner = (
    <>
      <div className="relative flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
        <h3 className="flex items-start gap-2 font-display text-[1.15rem] font-semibold leading-snug tracking-[-0.015em] text-hero-ink transition-colors duration-300 group-hover:text-hero-hot sm:text-[1.35rem]">
          {c.title}
          {c.url && (
            <span
              aria-hidden
              className="mt-[3px] shrink-0 text-hero-hot opacity-35 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
            >
              ↗
            </span>
          )}
        </h3>
        {c.year && (
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-hero-mute">
            {c.year}
          </span>
        )}
      </div>

      {(c.issuer || c.platform) && (
        <p className="relative mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-hero-mute">
          {[c.issuer, c.platform].filter(Boolean).join(' · ')}
        </p>
      )}
    </>
  )

  const cls = `group relative block py-7 ${first ? 'pt-0' : 'border-t border-white/[0.08]'}`

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
    <SectionRow
      id="certifications"
      eyebrow="Certifications"
      label={
        <>
          Verified, not claimed<span className="text-hero-hot">.</span>
        </>
      }
      lede="Three of these link straight to the issuer's record."
    >
      <ul className="flex flex-col">
        {certs.map((c, i) => (
          <Row key={c.title} c={c} first={i === 0} />
        ))}
      </ul>
    </SectionRow>
  )
}
