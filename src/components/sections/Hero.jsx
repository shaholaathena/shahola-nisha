import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NightScene from '../hero/NightScene'

gsap.registerPlugin(ScrollTrigger)

/* Editorial nav. Numbered because these ARE an ordered route through the
   portfolio, not decoration — the order is the argument. */
const NAV = [
  { n: '01', label: 'Home', href: '#hero' },
  { n: '02', label: 'Work', href: '#work' },
  { n: '03', label: 'Think', href: '#think' },
  { n: '04', label: 'About', href: '#about' },
  { n: '05', label: 'Contact', href: '#contact' },
]

/* Scene annotations, set like design redlines. This is where the landscape
   stops being wallpaper and starts reading as a designer's artifact: the
   metaphor is stated once, quietly, in the vocabulary of a spec. */
const NOTES = [
  { key: 'moon', label: 'Vision', top: '17%', right: '4%', align: 'right' },
  { key: 'mtn', label: 'Complexity', top: '46%', right: '4%', align: 'right' },
  { key: 'city', label: 'Products', top: '61%', right: '4%', align: 'right' },
  { key: 'sea', label: 'Impact', top: '79%', right: '4%', align: 'right' },
]

function Annotation({ label, top, right }) {
  return (
    <div
      data-note
      className="pointer-events-none absolute hidden items-center gap-3 xl:flex"
      style={{ top, right }}
    >
      <span className="h-px w-10 bg-[rgba(190,182,240,0.45)]" />
      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#b9b2e6]">{label}</span>
    </div>
  )
}

export default function Hero() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      /* ── Entrance. One orchestrated sequence: the world settles, then the
            argument arrives. Long, soft easing — this is establishing a shot,
            not demoing a technique.

            Note the failsafe below: every tween here is a `.from()`, which
            parks the element at opacity 0 until the timeline runs. If it never
            runs — reduced motion, a background tab with throttled rAF, a stalled
            main thread — the hero would render blank. Content must never depend
            on an animation to become visible, so we force the end state. ── */
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' }, paused: reduced })
      intro
        .from('[data-layer="sky"]', { opacity: 0, duration: 1.6 }, 0)
        .from('[data-layer="moon"]', { opacity: 0, y: 46, scale: 0.94, duration: 2.0 }, 0.15)
        .from('[data-layer="stars"]', { opacity: 0, duration: 2.0 }, 0.3)
        .from('[data-layer="mtn-back"]', { opacity: 0, y: 30, duration: 1.5 }, 0.35)
        .from('[data-layer="mtn-fore"]', { opacity: 0, y: 34, duration: 1.5 }, 0.45)
        .from('[data-layer="city"]', { opacity: 0, y: 24, duration: 1.4 }, 0.6)
        .from(['[data-layer="sea"]', '[data-layer="reflection"]'], { opacity: 0, duration: 1.6 }, 0.7)
        .from('[data-layer="foreground"]', { opacity: 0, y: 24, duration: 1.2 }, 0.8)
        .from('[data-nav]', { opacity: 0, y: -10, duration: 0.8, stagger: 0.05 }, 0.5)
        .from('[data-eyebrow]', { opacity: 0, y: 14, duration: 0.8 }, 0.85)
        .from('[data-line]', { opacity: 0, yPercent: 108, duration: 1.05, stagger: 0.09 }, 0.95)
        .from('[data-sub]', { opacity: 0, y: 16, duration: 0.9 }, 1.35)
        .from('[data-cta]', { opacity: 0, y: 16, duration: 0.9 }, 1.5)
        .from('[data-rail]', { opacity: 0, duration: 1 }, 1.5)
        .from('[data-note]', { opacity: 0, x: 18, duration: 0.9, stagger: 0.12 }, 1.6)

      // Reduced motion: skip straight to the composed frame.
      if (reduced) intro.progress(1)

      // Failsafe for a throttled or stalled ticker — timers keep running even
      // when requestAnimationFrame does not, so the hero always resolves.
      const failsafe = setTimeout(() => {
        if (intro.progress() < 0.99) intro.progress(1)
      }, 4000)

      /* ── Scroll choreography. Layer speeds are ordered by depth: sky barely
            moves, foreground moves most. The city brightens as it comes forward,
            and the reflection drifts against the sky so the water reads as a
            surface rather than a mirror. ── */
      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          desktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        },
        (context) => {
          if (!context.conditions.motion) return

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.8,
            },
          })

          tl.to('[data-layer="sky"]', { yPercent: 6 }, 0)
            .to('[data-layer="stars"]', { yPercent: 12, opacity: 0.45 }, 0)
            .to('[data-layer="moon"]', { yPercent: 30, scale: 1.05 }, 0)
            .to('[data-layer="clouds"]', { yPercent: 20 }, 0)
            .to('[data-layer="mtn-back"]', { yPercent: 24 }, 0)
            .to('[data-layer="mtn-fore"]', { yPercent: 36 }, 0)
            .to('[data-layer="city"]', { yPercent: 48 }, 0)
            .to('[data-layer="city-lights"]', { opacity: 1.6 }, 0)
            .to('[data-layer="sea"]', { yPercent: 26 }, 0)
            .to('[data-layer="reflection"]', { yPercent: 14, opacity: 0.7 }, 0)
            .to('[data-layer="reflected-stars"]', { yPercent: 8, opacity: 0.4 }, 0)
            .to('[data-layer="foreground"]', { yPercent: 66 }, 0)
            .to('[data-copy]', { yPercent: -34, opacity: 0, ease: 'power1.in' }, 0)
            .to('[data-note]', { opacity: 0, ease: 'power1.in' }, 0)

          /* Slow ambient drift on the moon's orbit — ~40s, below the threshold
             where it reads as animation and above where it reads as static. */
          gsap.to('[data-layer="orbit"]', {
            rotation: 360,
            duration: 240,
            repeat: -1,
            ease: 'none',
            transformOrigin: '50% 50%',
          })
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
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#05081a] text-[#e9ecfa]"
    >
      <NightScene />

      {/* Directional scrim. The landscape is the atmosphere, but the argument
          has to win: this keeps the type on a dark field regardless of what the
          city lights are doing behind it, and biases the composition left so
          the copy reads first and the scene reads second. */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(100deg, rgba(5,8,26,0.94) 0%, rgba(5,8,26,0.82) 26%, rgba(5,8,26,0.45) 48%, rgba(5,8,26,0.08) 68%, transparent 84%)',
        }}
      />

      {/* ── Editorial nav ── */}
      <nav
        className="absolute inset-x-0 top-0 z-30 mx-auto flex max-w-[1440px] items-start justify-between px-6 pt-7 lg:px-10 lg:pt-9"
        aria-label="Primary"
      >
        <a
          href="#hero"
          onClick={(e) => go(e, '#hero')}
          data-nav
          className="font-display text-[1.6rem] font-semibold leading-none tracking-tight text-[#f2f4ff]"
        >
          A<span className="text-[#a99cf0]">.</span>
        </a>

        <ul className="hidden items-start gap-7 md:flex lg:gap-10">
          {NAV.map((item, i) => (
            <li key={item.label} data-nav>
              <a
                href={item.href}
                onClick={(e) => go(e, item.href)}
                className="group block text-center"
                aria-current={i === 0 ? 'page' : undefined}
              >
                <span className="block font-mono text-[9px] tabular-nums text-[#a99cf0]/70 transition-colors group-hover:text-[#a99cf0]">
                  {item.n}
                </span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#c3c9e6] transition-colors group-hover:text-white lg:text-[11px]">
                  {item.label}
                </span>
                <span
                  className={`mx-auto mt-1.5 block h-px bg-[#a99cf0] transition-all duration-300 ${
                    i === 0 ? 'w-5' : 'w-0 group-hover:w-5'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* compact entry point on small screens */}
        <a
          href="#work"
          onClick={(e) => go(e, '#work')}
          data-nav
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c3c9e6] underline decoration-[#a99cf0]/50 underline-offset-[6px] md:hidden"
        >
          Work
        </a>
      </nav>

      {/* ── Scene annotations ── */}
      {NOTES.map((n) => (
        <Annotation key={n.key} {...n} />
      ))}

      {/* ── Left rail: scroll affordance + place ── */}
      <div
        data-rail
        className="absolute bottom-10 left-6 z-20 hidden flex-col items-center gap-4 lg:left-10 lg:flex"
      >
        <span className="h-16 w-px bg-gradient-to-b from-transparent to-[#a99cf0]/60" />
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#8f96b8] [writing-mode:vertical-rl]">
          Scroll
        </span>
      </div>

      {/* ── The argument ── */}
      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-[1440px] items-center px-6 pb-24 pt-28 lg:px-10">
        <div data-copy className="w-full max-w-[46rem]">

          <div data-eyebrow className="mb-6 flex items-center gap-3">
            <span className="text-[#a99cf0]">✳</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#a99cf0] sm:text-[11px]">
              UX / Product Designer
            </span>
          </div>

          <h1 className="font-display font-semibold leading-[1.04] tracking-[-0.03em] text-[clamp(2.3rem,6.2vw,4.9rem)]">
            {['I turn complex problems', 'into '].map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <span data-line className="inline-block">
                  {line}
                  {i === 1 && (
                    <>
                      <span className="text-[#a99cf0]">clear</span> experiences
                      <span className="text-[#a99cf0]">.</span>
                    </>
                  )}
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
              href="#work"
              onClick={(e) => go(e, '#work')}
              className="group inline-flex items-center gap-4"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#e9ecfa]">
                Explore my work
              </span>
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#a99cf0]/50 transition-colors duration-300 group-hover:border-[#a99cf0] group-hover:bg-[#a99cf0]/15">
                <span className="text-[#a99cf0] transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </span>
            </a>
            <span className="hidden h-8 w-px bg-white/15 sm:block" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8f96b8]">
              8 yrs · Dhaka, BD
            </span>
          </div>
        </div>
      </div>

      {/* ── Coordinates: a quiet HUD note that places the work, not decoration ── */}
      <div
        data-rail
        className="absolute bottom-9 right-6 z-20 hidden text-right lg:right-10 lg:block"
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#8f96b8]">
          23.8103° N, 90.4125° E
        </p>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[#6f7699]">
          Between ideas and impact
        </p>
      </div>

      {/* ── Transition into the light page below ── */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-16"
        style={{ background: 'linear-gradient(to bottom, transparent, #eef1ea)' }}
        aria-hidden="true"
      />
    </section>
  )
}
