/* The About page's one column split, shared so the sections cannot drift apart.

   A three-column grid: the heading takes the first third, the content spans
   the other two, so every section's content starts on the same line — What I
   do's first star included.

   The sections used to set this each on their own — 35%, 25%, 46% — so the
   right-hand edge of the headings and the start of the content jumped at every
   section break. */
/* Every section heading on the page, so they read as one line of type from
   the intro down to contact rather than a new size at each section. */
export const HEADING = 'font-display text-[clamp(1.85rem,3.4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.028em] text-hero-ink'

export const SPLIT = 'grid grid-cols-1 gap-y-12 lg:grid-cols-3 lg:gap-x-10'
export const MAIN = 'lg:col-span-2'
