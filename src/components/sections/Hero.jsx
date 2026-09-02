import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NightScene from '../hero/NightScene'
import NeonTicker from '../hero/NeonTicker'

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

const NAV = [
  { n: '01', label: 'Home', href: '#hero' },
  { n: '02', label: 'Work', href: '#work' },
  { n: '03', label: 'Think', href: '#think' },
  { n: '04', label: 'About', href: '#about' },
  { n: '05', label: 'Contact', href: '#contact' },
]

/* The thesis, broken by hand. "clear" is the hinge of the sentence and gets the
   hot accent; the full stop is cyan because it is the arrival — the same colour
   the settlement traces use when something lands. */
const HEADLINE = [
  { plain: 'I turn complex' },
  { plain: 'problems into' },
  { plain: '', accent: 'clear', tail: ' experiences', stop: true },
]

export default function Hero() {
  const root = useRef(null)
  const cta = useRef(null)

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

  const go = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={root}
      className="relative min-h-[100svh] w-full overflow-hidden bg-hero-void text-hero-ink"
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

      {/* ── Nav. The numbers stay because they are indices into an ordered route
             through the work, and mono is the register this site reads data in. ── */}
      <nav
        className="absolute inset-x-0 top-0 z-30 mx-auto flex max-w-[1440px] items-start justify-between px-6 pt-7 lg:px-10 lg:pt-9"
        aria-label="Primary"
      >
        <a
          href="#hero"
          onClick={(e) => go(e, '#hero')}
          data-nav
          className="font-display text-[1.6rem] font-semibold leading-none tracking-tight text-white"
          style={{ textShadow: '0 0 18px rgba(255,46,136,0.45)' }}
        >
          A<span className="text-hero-magenta">.</span>
        </a>

        <ul className="hidden items-start gap-7 md:flex lg:gap-10">
          {NAV.map((item, i) => (
            <li key={item.label} data-nav>
              <a
                href={item.href}
                onClick={(e) => go(e, item.href)}
                className="hero-navlink group block text-center"
                aria-current={i === 0 ? 'page' : undefined}
              >
                <span className="block font-mono text-[9px] tabular-nums text-hero-cyan/60 transition-colors duration-200 group-hover:text-hero-cyan">
                  {item.n}
                </span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#c3c9e6] transition-colors duration-200 group-hover:text-white lg:text-[11px]">
                  {item.label}
                </span>
                <span
                  className="hero-underline mx-auto mt-1.5 block h-[1.5px] w-5 bg-hero-magenta"
                  style={{ boxShadow: '0 0 10px rgba(255,46,136,0.8)' }}
                />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#work"
          onClick={(e) => go(e, '#work')}
          data-nav
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-hero-cyan underline decoration-hero-cyan/40 underline-offset-[6px] md:hidden"
        >
          Work
        </a>
      </nav>

      {/* ── Left rail, raised clear of the ticker ── */}
      <div
        data-rail
        className="absolute bottom-20 left-6 z-20 hidden flex-col items-center gap-4 lg:left-10 lg:flex"
      >
        <span className="h-16 w-px bg-gradient-to-b from-transparent to-hero-cyan/70" />
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-hero-mute [writing-mode:vertical-rl]">
          Scroll
        </span>
      </div>

      {/* ── The argument ── */}
      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-[1440px] items-center px-6 pb-32 pt-28 lg:px-10">
        <div data-copy className="w-full max-w-[46rem]">

          <div data-eyebrow className="mb-6 flex items-center gap-3">
            <span
              className="h-[5px] w-[5px] rotate-45 bg-hero-magenta"
              style={{ boxShadow: '0 0 12px rgba(255,46,136,0.9)' }}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-hero-cyan sm:text-[11px]">
              UX / Product Designer
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
            className="hero-headline hero-split leading-[1.06] tracking-[-0.03em] text-[clamp(2.3rem,6.2vw,4.9rem)]"
          >
            {HEADLINE.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
                <span data-line className="inline-block">
                  {line.plain}
                  {line.accent && <span className="text-hero-magenta">{line.accent}</span>}
                  {line.tail}
                  {line.stop && <span className="text-hero-cyan">.</span>}
                </span>
              </span>
            ))}
          </h1>

          <p data-sub className="mt-7 max-w-lg text-[15px] leading-relaxed text-[#b9c0dd] sm:text-[16px]">
            UX strategy, product thinking and interaction design — for banking,
            payments and platform products where getting it wrong costs someone
            real money.
          </p>

          <div data-cta className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              ref={cta}
              href="#work"
              onClick={(e) => go(e, '#work')}
              className="group inline-flex items-center gap-4 transition-transform duration-150 active:scale-[0.97]"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-hero-ink">
                Explore my work
              </span>
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-hero-magenta/50 transition-colors duration-200 group-hover:border-hero-magenta group-hover:bg-hero-magenta/15 group-hover:shadow-[0_0_22px_rgba(255,46,136,0.45)]">
                <span className="text-hero-magenta transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </span>
            </a>
            <span className="hidden h-8 w-px bg-white/15 sm:block" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-hero-mute">
              8 yrs · Dhaka, BD
            </span>
          </div>
        </div>
      </div>

      <NeonTicker />
    </section>
  )
}
