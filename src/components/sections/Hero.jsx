import { useRef, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NightScene from '../hero/NightScene'
import NeonTicker from '../hero/NeonTicker'
import logo from '../../assets/logo.png'
import { meta } from '../../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────────────────────────
   Hero.

   The scene is a night city. NightScene builds the place and mounts
   ProcessWindows inside its city layer — those light real windows in the
   artwork to walk through her six process phases, so they have to move with it.
   NeonTicker states the facts, and this file orchestrates the whole.

   Two things were REMOVED from the earlier version rather than restyled, and
   the omissions matter as much as the additions:

     · The "Vision" / "Clarity" redline annotations. Once the traces label
       arrivals with real states, a second annotation vocabulary pointing
       abstract nouns at scenery only competed with it.
     · The bottom-right coordinates HUD, which said what the ticker now says.

   Motion budget. Every ambient loop lives in CSS (NightScene, NeonTicker) so
   this timeline owns only the orchestrated moments: one entrance, one scroll
   push, and pointer response. Continuous motion is transform/opacity only; the
   two exceptions — the headline's width axis and its chromatic split — run once
   on entrance and then never again.
   ───────────────────────────────────────────────────────────────────────────── */

/* The nav used to be five in-page anchors. The homepage is now one locked
   frame with nothing below it, so these are routes: everything that used to be
   a section further down the scroll lives on /work or /about, and Think and
   Contact are hash targets on /about that ScrollToTop resolves after the
   route change. */
const NAV = [
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/about#contact' },
]


/* The thesis, broken by hand.

   Her wording, unedited. Two journeys stated in parallel: wondering to making
   is how she works, questions to solutions is what that produces, and the
   colon is the hinge that makes the second half read as a restatement of the
   first rather than as a separate claim.

   THREE LINES MAXIMUM, which is a hard constraint and not a preference. It
   also happens to be the honest break: the colon ends line one, so each half
   of the parallel gets a line of its own and the arrival gets the third.

   What three lines cost is SIZE, and the trade is worth understanding before
   anyone edits these words. "From wondering to making:" is 25 characters, the
   longest single line this headline has ever carried, and it alone sets the
   cap. Splitting it across two lines allowed 5rem; keeping it whole forces
   3.7rem. 3.8rem was measured first and came to 720px in a 736px column,
   which is inside this file's own no-go zone for margin.

   The same 25-character line sets the FLOOR, and this is where the three-line
   ceiling actually bites. At a 1.65rem floor it measured 327px in a 375px
   viewport's 327px column and wrapped, which produced the fourth line the
   headline is not allowed to have. The floor is 1.55rem for that one line's
   sake. Mobile, not desktop, is the binding end here, and a desktop-only check
   would have passed this. Shorter copy is what buys big type here, not the other way round: at
   four lines the same sentence set half again as large.

   The last break must not move. "to solutions." alone, in the accent, is the
   arrival, and pulling it up to join line two would leave the sentence
   trailing off rather than landing.

   The accent sits on the whole last line, where the eye finishes. Marking
   words mid-sentence was tried on an earlier headline and rejected: two marks
   stop the eye twice on the way in, the sentence stops reading as a sentence,
   and the line loses its landing, since at display size the colour rather than
   the barely visible period is what says the thought has ended.

   -- Line shape --
   Each line is an ARRAY of segments. A string is plain, `{ a: '...' }` is
   accented, so any words anywhere can take the accent.

   LINE LENGTH IS LOAD-BEARING and BOTH ends bind: desktop at the 46rem column,
   mobile at a 375px viewport's 327px. Earlier headlines were found to wrap by
   landing EXACTLY on those numbers (736px in 736, 327px in 327), so the clamp
   keeps real margin at both ends rather than maximising size. A 4.4rem cap
   once fit by nine pixels and was rejected for that: nine pixels is one font
   swap or one browser's rounding from wrapping, and it fails silently.

   Count characters at your peril: a 20-character line here once measured wider
   than a 23-character one, because m, w and o are wide where i, t, f and l are
   not. Measure at BOTH 1440px and 375px after any edit to the words.

   A wrapped line is not merely ugly: each line owns one clip mask and one
   `data-line` that the entrance staggers, so a line that wraps puts two visual
   lines behind one reveal and the stagger silently loses a beat. With a
   three-line ceiling a wrap is worse still, because it produces the fourth
   line this headline is not allowed to have. */
const HEADLINE = [
  ['From wondering to making:'],
  ['I follow questions'],
  [{ a: 'to solutions.' }],
]

/* Socials are icons, not words: the rail is 9px mono everywhere else and two
   more text labels there read as more nav. Each mark carries its own
   aria-label, since an icon with no text has no accessible name. */
function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.65h.05a4.17 4.17 0 0 1 3.75-2.06C21.6 8.59 23 10.9 23 14.24V21h-4v-6c0-1.43-.03-3.27-2-3.27-2 0-2.3 1.56-2.3 3.17V21h-4V9Z" />
    </svg>
  )
}

function DribbbleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M5.3 6.4c3.6 3.6 8.4 5 13.9 4.5M2.9 14.3c5.6-1.5 10.2-.4 13.6 3.4M8.6 2.9c3.7 4.6 6 9.7 6.6 15.6" />
    </svg>
  )
}

export default function Hero() {
  const root = useRef(null)
  const cta = useRef(null)
  const navigate = useNavigate()

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      /* ══ ENTRANCE ═══════════════════════════════════════════════════════════
            One establishing shot: the void resolves into a place, the place
            switches on, then the argument arrives. Long soft easing — this is a
            camera settling, not a demo reel.

            Every tween is a `.from()`, which parks its target at opacity 0 until
            the timeline runs. If it never runs — reduced motion, a throttled
            background tab, a stalled main thread — the hero would render blank,
            so the end state is forced below. Content must never depend on an
            animation to become visible. ══ */
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' }, paused: reduced })

      /* Retimed to roughly half its original length. The first version put the
         headline's first line at 1.45s and did not finish the copy until 3.3s —
         three seconds before the page's own argument could be read. Nobody
         waits that out. The whole sequence now lands by ~1.6s, with the
         headline complete at ~1.25s, and the establishing beats compress into
         the space before it rather than delaying it. */
      intro
        .from('[data-layer="sky"]', { opacity: 0, duration: 0.7 }, 0)
        .from('[data-layer="stars"]', { opacity: 0, duration: 1.0 }, 0.1)
        .from('[data-layer="twinkle"]', { opacity: 0, duration: 1.0 }, 0.2)
        /* Before the city, so the horizon builds back to front: the range is
           already there when the skyline rises in front of it. */
        .from('[data-layer="mountains"]', { opacity: 0, duration: 0.9 }, 0.1)
        .from('[data-layer="city"]', { opacity: 0, y: 12, duration: 0.9 }, 0.12)

        /* The sweep. A neon bar runs up the city once and the windows appear to
           light as it passes — the moment the place switches on. */
        .set('[data-layer="scan"]', { opacity: 1 }, 0.25)
        .fromTo('[data-layer="scan"]',
          { top: '100%' },
          { top: '-38%', duration: 0.75, ease: 'power2.inOut' }, 0.25)
        .set('[data-layer="scan"]', { opacity: 0 }, 1.0)

        .from('[data-layer="city-neon"]', { opacity: 0, duration: 0.7 }, 0.5)
        .from('[data-layer="shafts"]', { opacity: 0, duration: 0.9 }, 0.6)
        /* The comet layer has to be up well before the first comet crosses at
           ~1.8s, or that crossing is spent fading in and nobody sees it. */
        .from('[data-layer="comet"]', { opacity: 0, duration: 0.7 }, 0.5)
        .from('[data-layer="moon"]', { opacity: 0, y: 26, scale: 0.96, duration: 1.1 }, 0.2)

        .from('[data-nav]', { opacity: 0, y: -8, duration: 0.5, stagger: 0.04 }, 0.35)
        .from('[data-eyebrow]', { opacity: 0, y: 10, duration: 0.5 }, 0.45)

        /* The thesis. Lines clip up out of their own mask, the width axis opens
           from compressed to normal, and a chromatic split resolves to zero —
           three properties, one gesture, once. A headline that keeps glitching
           is a headline nobody finishes reading. */
        .from('[data-line]', { yPercent: 112, duration: 0.62, stagger: 0.06 }, 0.5)
        .fromTo('[data-headline]',
          { '--hero-wdth': 78, '--hero-gx': 7 },
          { '--hero-wdth': 100, '--hero-gx': 0, duration: 0.73, ease: 'power2.out' }, 0.52)

        .from('[data-sub]', { opacity: 0, y: 12, duration: 0.6 }, 0.8)
        .from('[data-cta]', { opacity: 0, y: 12, duration: 0.6 }, 0.9)
        .from('[data-rail]', { opacity: 0, duration: 0.65 }, 0.95)
        .from('[data-ticker]', { opacity: 0, y: 14, duration: 0.6 }, 1.0)

      // Reduced motion: straight to the composed frame.
      if (reduced) intro.progress(1)

      /* Failsafe for a throttled or stalled ticker. Timers keep running when
         requestAnimationFrame does not, so the hero always resolves. */
      const failsafe = setTimeout(() => {
        if (intro.progress() < 0.99) intro.progress(1)
      }, 2600)

      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          pointer: '(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
        },
        (context) => {
          if (!context.conditions.motion) return

          /* ══ SCROLL: a camera push into the city ════════════════════════════
                A push, not a drift: the city grows and drops while the sky
                recedes, so the frame reads as moving INTO the scene. The city's
                own travel stays small — a large one would haul its masked top
                edge down and expose the fade as a band. ══ */
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.8,
            },
          })

          tl.to('[data-layer="sky"]', { yPercent: 5, scale: 1.04 }, 0)
            .to('[data-layer="stars"]', { yPercent: 10, opacity: 0.4 }, 0)
            .to('[data-layer="moon"]', { yPercent: 34, scale: 1.06 }, 0)
            .to('[data-layer="clouds"]', { yPercent: 18 }, 0)
            /* Least travel of anything on the horizon, and it hazes out as the
               city comes forward — distance behaving like distance. */
            .to('[data-layer="mountains"]', { yPercent: 4, opacity: 0.55 }, 0)
            .to('[data-layer="city"]', { yPercent: 7, scale: 1.1 }, 0)
            /* The city brightens as you move into it — the one beat carried over
               from every earlier version of this scene. */
            .to('[data-layer="city-lights"]', { opacity: 0.9 }, 0)
            .to('[data-layer="city-neon"]', { opacity: 1.3 }, 0)
            .to('[data-layer="shafts"]', { opacity: 1.4, yPercent: 6 }, 0)
            .to('[data-layer="glow"]', { yPercent: 8, opacity: 0.65 }, 0)
            .to('[data-copy]', { yPercent: -32, opacity: 0, ease: 'power1.in' }, 0)
            .to('[data-ticker]', { yPercent: 100, opacity: 0, ease: 'power1.in' }, 0)

          /* ══ POINTER: the frame answers the cursor ═══════════════════════════
                Layers offset by depth and in opposite directions across the
                horizon, so moving the mouse looks THROUGH the scene rather than
                sliding a picture. `quickTo` rewrites one existing tween instead
                of creating one per mousemove — the difference is a hundred
                tweens a second versus none.

                Fine pointers on wide screens only: touch has no hover state to
                answer, and this should never compete with a scroll gesture. ══ */
          if (!context.conditions.pointer) return

          const depth = [
            ['[data-layer="stars"]', 10],
            ['[data-layer="clouds"]', 16],
            ['[data-layer="mountains"]', 8],
            ['[data-layer="moon"]', 22],
            ['[data-layer="shafts"]', -14],
            ['[data-layer="city"]', -20],
          ]
          const setters = depth.map(([sel, amount]) => ({
            x: gsap.quickTo(sel, 'x', { duration: 0.9, ease: 'power3.out' }),
            y: gsap.quickTo(sel, 'y', { duration: 0.9, ease: 'power3.out' }),
            amount,
          }))

          const onMove = (e) => {
            const nx = e.clientX / window.innerWidth - 0.5
            const ny = e.clientY / window.innerHeight - 0.5
            setters.forEach(({ x, y, amount }) => {
              x(nx * amount)
              y(ny * amount * 0.5)
            })
          }
          window.addEventListener('mousemove', onMove, { passive: true })

          /* The call to action leans toward the cursor — a few pixels only, and
             only within its own bounds. Enough to register as responsive; not
             enough to move the target away from someone aiming at it. */
          const btn = cta.current
          const toX = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3.out' })
          const toY = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3.out' })

          const onBtnMove = (e) => {
            const r = btn.getBoundingClientRect()
            toX(((e.clientX - (r.left + r.width / 2)) / r.width) * 14)
            toY(((e.clientY - (r.top + r.height / 2)) / r.height) * 10)
          }
          const onBtnLeave = () => { toX(0); toY(0) }
          btn.addEventListener('mousemove', onBtnMove)
          btn.addEventListener('mouseleave', onBtnLeave)

          return () => {
            window.removeEventListener('mousemove', onMove)
            btn.removeEventListener('mousemove', onBtnMove)
            btn.removeEventListener('mouseleave', onBtnLeave)
          }
        }
      )

      return () => { clearTimeout(failsafe); mm.revert() }
    }, root)

    return () => ctx.revert()
  }, [])

  const go = (e, to) => {
    e.preventDefault()
    navigate(to)
  }

  return (
    <section
      id="hero"
      ref={root}
      className="relative min-h-[100svh] w-full overflow-hidden bg-hero-void text-hero-ink md:h-[100svh] md:min-h-0"
    >
      <NightScene />

      {/* Directional scrim. The city is the atmosphere; the argument has to win.
          This keeps the type on a dark field whatever the neons are doing behind
          it, and biases the composition left so the copy reads first. */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(100deg, rgba(5,7,15,0.94) 0%, rgba(5,7,15,0.82) 26%, rgba(5,7,15,0.44) 48%, rgba(5,7,15,0.08) 68%, transparent 84%)',
        }}
      />

      {/* ── Nav. The indices are gone: they were pointing into a five-item
             route through one page, and three links to three routes do not
             need to be counted. Mono stays — it is the register this site
             reads data in.

             Straight, and in the corner people look for a menu in. It spent a
             version turned sideways down the right edge, which looked like the
             rest of the frame and read like nothing: rotated, uppercase, mono,
             tracked and small is five legibility penalties stacked on the one
             control that has to be scannable on sight.

             The <nav> spans the frame because its two halves answer to
             different edges — the mark to the centred 1440 column, the links to
             the viewport's own right margin, which is where the socials sit.
             Anything narrower than 1440 makes those the same edge; anything
             wider does not, and then a nav that respects the column no longer
             lines up with the rail below it. pointer-events-none with the links
             opting back in, because an element this size must not sit on top of
             the scene. ── */}
      <nav className="pointer-events-none absolute inset-0 z-30" aria-label="Primary">

        <div className="absolute inset-x-0 top-0 mx-auto flex max-w-[1440px] items-center justify-between px-6 pt-7 lg:px-10 lg:pt-9">
          {/* The real mark, not the `A.` that stood in for it. The file is dark
              ink on transparency — right for the light inner pages, invisible
              here — so it is knocked out to white: brightness(0) flattens the
              ink to black and invert(1) turns it white, with the transparency
              untouched. No blend mode needed, and nothing to maintain if the
              artwork is ever re-exported. The glow is the same one the type in
              this frame carries. */}
          <a
            href="/"
            onClick={(e) => go(e, '/')}
            data-nav
            aria-label="Alimoon Nisha, home"
            className="pointer-events-auto block"
          >
            <img
              src={logo}
              alt="Alimoon Nisha"
              className="h-9 w-auto object-contain lg:h-10"
              draggable="false"
              style={{
                filter: 'brightness(0) invert(1) drop-shadow(0 0 18px rgba(232, 184, 98,0.35))',
              }}
            />
          </a>

          <a
            href="/work"
            onClick={(e) => go(e, '/work')}
            data-nav
            className="pointer-events-auto font-mono text-[10px] uppercase tracking-[0.2em] text-hero-signal underline decoration-hero-signal/40 underline-offset-[6px] md:hidden"
          >
            Work
          </a>
        </div>

        {/* Same right margin as the social rail at the bottom of the frame, so
            the two read as one edge. No box around the words: the capsules were
            legible but they made three links look like three buttons, and the
            rule under the word already says which one the cursor is on. The
            padding stays for the hit area — it is just no longer drawn. */}
        <ul className="absolute right-6 top-7 hidden items-center gap-7 md:flex lg:right-10 lg:top-9">
          {NAV.map((item) => (
            <li key={item.label} data-nav>
              {/* No aria-current: Home has left the list — the mark is the way
                  back — and none of what remains is the page you are on. */}
              <a
                href={item.to}
                onClick={(e) => go(e, item.to)}
                className="hero-navlink group pointer-events-auto relative block py-3"
              >
                <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-[#c9cfe9] transition-colors duration-200 group-hover:text-hero-hot lg:text-[12px]">
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Social rail, right side, raised clear of the ticker.

             This said "Scroll". On a locked homepage that is an instruction to
             do something the page will not do, so the slot carries the two
             profiles instead — the same vertical line, now under something
             that goes somewhere. Below `lg` the rail is hidden and the CTA row
             carries LinkedIn inline, so the link is never only in the rail. ── */}
      <div
        data-rail
        className="absolute bottom-20 right-6 z-20 hidden flex-col items-center gap-4 lg:right-10 lg:flex"
      >
        <span className="h-16 w-px bg-gradient-to-b from-transparent to-hero-signal/70" />
        <div className="flex flex-col items-center gap-5">
          <a
            href={meta.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className="hero-social flex h-11 w-11 items-center justify-center rounded-full"
          >
            <LinkedInIcon className="h-[22px] w-[22px]" />
          </a>
          <a
            href={meta.dribbble}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Dribbble"
            className="hero-social flex h-11 w-11 items-center justify-center rounded-full"
          >
            <DribbbleIcon className="h-[22px] w-[22px]" />
          </a>
        </div>
      </div>

      {/* ── The argument ── */}
      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-[1440px] items-center px-6 pb-32 pt-28 md:h-full md:min-h-0 lg:px-10">
        <div data-copy className="w-full max-w-[46rem]">

          <div data-eyebrow className="mb-6 flex items-center gap-3">
            <span
              className="h-[5px] w-[5px] rotate-45 bg-hero-hot"
              style={{ boxShadow: '0 0 6px rgba(232, 184, 98,1), 0 0 18px rgba(232, 184, 98,0.6)' }}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-hero-signal sm:text-[11px]">
              UX Designer / UX Engineer
            </span>
          </div>

          {/* Lines are explicit, not left to wrapping. At this size the browser
              broke "I turn complex problems" mid-phrase and produced a fourth
              line, which also meant two visual lines sharing one clip mask and
              one reveal. Declaring the breaks puts the payoff on its own line
              and gives the stagger three real units to work with.

              `pb/-mb` on each mask: the mask has to clear descenders — the p in
              "problems" — without the padding changing the line spacing. */}
          <h1
            data-headline
            className="hero-headline hero-split leading-[1.06] tracking-[-0.03em] text-[clamp(1.55rem,6.2vw,3.7rem)]"
          >
            {HEADLINE.map((parts, i) => (
              <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
                <span data-line className="inline-block">
                  {parts.map((part, j) =>
                    typeof part === 'string'
                      ? part
                      : <span key={j} className="text-hero-hot">{part.a}</span>
                  )}
                </span>
              </span>
            ))}
          </h1>

          {/* The sub carries everything the headline is free NOT to say: who she
              is, where, and what she works on. The headline above is a mood; if
              this paragraph goes vague the hero states nothing at all.

              Four edits from the version handed over:
                · "This is Alimoon Nisha" -> "I'm". The headline is first person
                  ("I follow questions"), so a third-person introduction between
                  it and "I design ..." switched voice twice in three lines.
                · The name is capitalised. It appears nowhere else in readable
                  type — the wordmark top-left is a signature and reads as a
                  mark, not as a name — so this is the only place a first-time
                  visitor actually learns it.
                · "etc." is gone. A capability list that trails off says the
                  list ran out of energy, and it is the last thing read before
                  the call to action.
                · The front-end clause is back in its place. Designing AND
                  shipping the code is the rarer half of what she does and the
                  only claim here another designer could not also make.

              THREE LINES at 183 characters. A two-line version was tried and
              is not reachable with this copy: at the 672px measure a line holds
              about 64 characters, so two lines is roughly a 128-character
              budget. Widening further would buy it, and is refused — 672px is
              already at the edge of a comfortable measure, and the fix for a
              long paragraph is a shorter paragraph, not a wider column.

              The em dash in "products—then" was replaced with a comma. No em
              dashes anywhere in this project's copy.

              MEASURE: max-w-2xl (672px), widened from max-w-lg (512px). It now
              sits just inside the headline's longest line rather than stepping
              well in from it, so the two blocks read as one column. The cost is
              about 64 characters per line, which lands inside the 45-75 that is
              comfortable to read. Do not widen it further to absorb a longer
              paragraph; shorten the paragraph instead.

              If this is edited, re-measure the RENDERED line count rather than
              counting characters, and check it at 375px as well as desktop.
              Below 672px the viewport, not this cap, sets the width, so the
              mobile line count does not follow from the desktop one. */}
          <p data-sub className="mt-7 max-w-2xl text-[15px] leading-relaxed text-[#b9c0dd] sm:text-[16px]">
            I&rsquo;m Alimoon Nisha, a UX Analyst at SSL Wireless in Dhaka. I design
            complex banking, healthcare, and enterprise products, then write the
            clean, production-ready front-end that ships them.
          </p>

          <div data-cta className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              ref={cta}
              href="/work"
              onClick={(e) => go(e, '/work')}
              className="group inline-flex items-center gap-4 transition-transform duration-150 active:scale-[0.97]"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-hero-ink">
                Explore my work
              </span>
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-hero-hot/50 transition-colors duration-200 group-hover:border-hero-hot group-hover:bg-hero-hot/15 group-hover:shadow-[0_0_10px_rgba(232,184,98,0.6),0_0_30px_rgba(232,184,98,0.35)]">
                <span className="text-hero-hot transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </span>
            </a>
            <span className="hidden h-8 w-px bg-white/15 sm:block" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-hero-mute">
              8 yrs · Dhaka, BD
            </span>
            {/* The rail's job below `lg`, where the rail is not rendered. */}
            <div className="flex items-center gap-4 lg:hidden">
              <a
                href={meta.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className="hero-social flex h-11 w-11 items-center justify-center rounded-full"
              >
                <LinkedInIcon className="h-[20px] w-[20px]" />
              </a>
              <a
                href={meta.dribbble}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Dribbble"
                className="hero-social flex h-11 w-11 items-center justify-center rounded-full"
              >
                <DribbbleIcon className="h-[20px] w-[20px]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <NeonTicker />
    </section>
  )
}
