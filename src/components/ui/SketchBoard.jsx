import { motion, useReducedMotion } from 'framer-motion'

/* ── SketchBoard — the hero's right-hand panel.
   A designer's notebook page that draws itself: a phone wireframe, the working
   principle, the process loop, and the payoff line.

   Two things make it read as hand-drawn rather than vector-clean:
   1. `pathLength` animation — every stroke is drawn from 0 to 1, in the order a
      person would actually sketch it, so the panel builds instead of appearing.
   2. A turbulence + displacement filter that pushes each stroke off its ideal
      path by a couple of pixels, giving the wobble of a pencil line. It is applied
      only to shape groups — running it over text would smear the lettering.

   Plays once on mount. Under reduced motion every stroke renders complete and
   nothing animates. ── */

const INK = 'rgba(26,26,26,0.78)'
const INK_SOFT = 'rgba(26,26,26,0.45)'
const BLUE = '#aebdd6'
const PEACH = '#e0a98b'
const SAND = '#e3cba6'

export default function SketchBoard() {
  const reduce = useReducedMotion()

  /* Draw a stroke: pathLength 0 → 1 after `delay`. Under reduced motion the
     stroke is simply present, with no transition. */
  const draw = (delay, duration = 0.7) =>
    reduce
      ? { initial: false, animate: { pathLength: 1, opacity: 1 } }
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: {
            pathLength: { delay, duration, ease: [0.4, 0, 0.2, 1] },
            opacity: { delay, duration: 0.01 },
          },
        }

  /* Ink in a piece of lettering or a fill. */
  const ink = (delay, duration = 0.45) =>
    reduce
      ? { initial: false, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay, duration },
        }

  return (
    <svg
      viewBox="0 0 600 780"
      className="h-auto w-full overflow-visible"
      role="img"
      aria-label="Hand-drawn sketch of a banking app wireframe beside a process diagram: understand, simplify, design."
    >
      <defs>
        {/* The pencil wobble. scale controls how far strokes stray. */}
        <filter id="sketch-rough" x="-12%" y="-12%" width="124%" height="124%">
          <feTurbulence type="fractalNoise" baseFrequency="0.024" numOctaves="3" seed="9" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="sketch-rough-soft" x="-12%" y="-12%" width="124%" height="124%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      {/* ══════════ The phone ══════════ */}
      <g
        filter="url(#sketch-rough)"
        fill="none"
        stroke={INK}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* body */}
        <motion.path
          d="M42 78 C42 56 56 44 78 44 L212 44 C234 44 248 56 248 78 L248 402 C248 424 234 436 212 436 L78 436 C56 436 42 424 42 402 Z"
          {...draw(0.15, 1.1)}
        />
        {/* side button */}
        <motion.path d="M250 132 L250 168" strokeWidth="2" {...draw(1.0, 0.25)} />
      </g>

      {/* phone contents */}
      <g filter="url(#sketch-rough-soft)" fill="none" stroke={INK_SOFT} strokeWidth="1.3" strokeLinecap="round">
        {/* back chevron + search */}
        <motion.path d="M72 76 L65 82 L72 88" {...draw(1.05, 0.2)} />
        <motion.circle cx="222" cy="81" r="7" {...draw(1.1, 0.25)} />
        <motion.path d="M227 86 L232 91" {...draw(1.2, 0.15)} />

        {/* balance underline */}
        <motion.path d="M68 152 L196 152" stroke="rgba(26,26,26,0.14)" {...draw(1.45, 0.3)} />

        {/* the chart — the one blue line on the page */}
        <motion.path
          d="M68 208 C92 196, 104 214, 122 202 S 156 174, 176 182 S 208 158, 226 146"
          stroke={BLUE}
          strokeWidth="2.2"
          {...draw(1.55, 0.9)}
        />

        {/* quick action tiles */}
        {[68, 124, 180].map((x, i) => (
          <motion.rect
            key={x}
            x={x}
            y={258}
            width="46"
            height="40"
            rx="7"
            {...draw(2.15 + i * 0.12, 0.35)}
          />
        ))}

        {/* transaction rows */}
        {[344, 388].map((y, i) => (
          <g key={y}>
            <motion.circle cx="80" cy={y} r="10" {...draw(2.65 + i * 0.15, 0.3)} />
            <motion.path d={`M100 ${y - 5} L188 ${y - 5}`} {...draw(2.72 + i * 0.15, 0.3)} />
            <motion.path d={`M100 ${y + 5} L152 ${y + 5}`} stroke="rgba(26,26,26,0.22)" {...draw(2.78 + i * 0.15, 0.25)} />
            <motion.path d={`M206 ${y} L228 ${y}`} {...draw(2.84 + i * 0.15, 0.2)} />
          </g>
        ))}
      </g>

      {/* phone labels */}
      <g className="font-hand" fill={INK} textAnchor="start">
        <motion.text x="68" y="122" fontSize="19" fill={INK_SOFT} {...ink(1.3)}>Balance</motion.text>
        <motion.text x="68" y="146" fontSize="26" fontWeight="600" {...ink(1.4)}>৳ 24,850.00</motion.text>
        <motion.text x="68" y="245" fontSize="19" fill={INK_SOFT} {...ink(2.05)}>Quick Actions</motion.text>
        <motion.text x="68" y="322" fontSize="19" fill={INK_SOFT} {...ink(2.55)}>Recent Transactions</motion.text>
      </g>

      {/* ══════════ Clarity first ══════════ */}
      <g className="font-hand" fill={INK}>
        <motion.text x="312" y="72" fontSize="34" fontWeight="600" {...ink(0.5)}>
          Clarity first.
        </motion.text>
      </g>
      <motion.path
        d="M312 86 C356 80, 412 84, 456 79"
        fill="none"
        stroke={INK}
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#sketch-rough-soft)"
        {...draw(0.85, 0.45)}
      />

      {/* checklist */}
      {[
        { label: 'Understand', y: 132 },
        { label: 'Simplify', y: 174 },
        { label: 'Design', y: 216 },
      ].map((item, i) => (
        <g key={item.label}>
          <motion.path
            d={`M314 ${item.y - 8} L322 ${item.y} L336 ${item.y - 16}`}
            fill="none"
            stroke={INK}
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#sketch-rough-soft)"
            {...draw(1.15 + i * 0.22, 0.3)}
          />
          <motion.text
            x="350"
            y={item.y}
            className="font-hand"
            fontSize="27"
            fill={INK}
            {...ink(1.3 + i * 0.22)}
          >
            {item.label}
          </motion.text>
        </g>
      ))}

      {/* curved arrow: principle → screen */}
      <g filter="url(#sketch-rough-soft)" fill="none" stroke={INK_SOFT} strokeWidth="1.6" strokeLinecap="round">
        <motion.path d="M318 246 C300 288, 288 300, 262 306" {...draw(2.0, 0.5)} />
        <motion.path d="M274 296 L261 307 L272 316" {...draw(2.45, 0.25)} />
      </g>

      {/* ══════════ Process loop ══════════ */}
      <g filter="url(#sketch-rough)" fill="none" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
        {/* Problem diamond */}
        <motion.path d="M336 372 L386 348 L436 372 L386 396 Z" {...draw(2.9, 0.55)} />
        {/* boxes */}
        <motion.rect x="470" y="350" width="106" height="44" rx="3" {...draw(3.25, 0.45)} />
        <motion.rect x="470" y="430" width="106" height="44" rx="3" {...draw(3.75, 0.45)} />
        <motion.rect x="470" y="510" width="106" height="44" rx="3" {...draw(4.2, 0.45)} />

        {/* connectors */}
        <motion.path d="M436 372 L470 372" {...draw(3.15, 0.2)} />
        <motion.path d="M460 366 L470 372 L460 378" {...draw(3.3, 0.15)} />

        <motion.path d="M523 394 L523 430" {...draw(3.65, 0.2)} />
        <motion.path d="M517 420 L523 431 L529 420" {...draw(3.78, 0.15)} />

        <motion.path d="M523 474 L523 510" {...draw(4.1, 0.2)} />
        <motion.path d="M517 500 L523 511 L529 500" {...draw(4.22, 0.15)} />

        {/* loop back up the right edge */}
        <motion.path d="M576 532 C606 532, 606 372, 578 372" strokeDasharray="5 5" {...draw(4.6, 0.7)} />
      </g>

      {/* Design box fill — the step that ships */}
      <motion.rect
        x="470"
        y="510"
        width="106"
        height="44"
        rx="3"
        fill={BLUE}
        fillOpacity="0.5"
        filter="url(#sketch-rough-soft)"
        {...ink(4.45, 0.6)}
      />

      <g className="font-hand" fill={INK} textAnchor="middle">
        <motion.text x="386" y="379" fontSize="21" {...ink(3.05)}>Problem</motion.text>
        <motion.text x="523" y="379" fontSize="21" {...ink(3.4)}>Understand</motion.text>
        <motion.text x="523" y="459" fontSize="21" {...ink(3.88)}>Simplify</motion.text>
        <motion.text x="523" y="539" fontSize="21" {...ink(4.32)}>Design</motion.text>
      </g>

      {/* ══════════ People / Systems / Business → Better Experiences ══════════ */}
      <motion.ellipse
        cx="120"
        cy="562"
        rx="86"
        ry="60"
        fill="none"
        stroke={PEACH}
        strokeWidth="2.2"
        strokeLinecap="round"
        filter="url(#sketch-rough-soft)"
        {...draw(4.8, 0.8)}
      />
      <g className="font-hand" fill={INK} textAnchor="middle">
        <motion.text x="120" y="540" fontSize="24" {...ink(5.0)}>People</motion.text>
        <motion.text x="120" y="570" fontSize="24" {...ink(5.1)}>Systems</motion.text>
        <motion.text x="120" y="600" fontSize="24" {...ink(5.2)}>Business</motion.text>
      </g>

      <g filter="url(#sketch-rough-soft)" fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round">
        <motion.path d="M216 562 L286 562" {...draw(5.3, 0.3)} />
        <motion.path d="M276 555 L288 562 L276 569" {...draw(5.5, 0.15)} />
      </g>

      {/* highlighter swipe, laid down before the words as a marker would be */}
      <motion.path
        d="M306 578 C352 572, 410 576, 452 570"
        fill="none"
        stroke={SAND}
        strokeWidth="13"
        strokeLinecap="round"
        opacity="0.75"
        filter="url(#sketch-rough-soft)"
        {...draw(5.6, 0.5)}
      />
      <g className="font-hand" fill={INK}>
        <motion.text x="306" y="548" fontSize="27" {...ink(5.7)}>Better</motion.text>
        <motion.text x="306" y="576" fontSize="27" {...ink(5.8)}>Experiences</motion.text>
      </g>

      {/* ══════════ The closing line ══════════ */}
      <g className="font-hand" fill={INK}>
        <motion.text x="300" y="678" fontSize="31" {...ink(6.0)}>Let&rsquo;s make</motion.text>
        <motion.text x="300" y="716" fontSize="31" {...ink(6.12)}>complicated</motion.text>
        <motion.text x="300" y="754" fontSize="31" {...ink(6.24)}>simple.</motion.text>
      </g>
      <g filter="url(#sketch-rough-soft)" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round">
        <motion.path d="M300 726 C342 720, 396 724, 438 719" {...draw(6.18, 0.4)} />
        <motion.path d="M300 764 C324 759, 356 762, 380 758" {...draw(6.3, 0.3)} />
      </g>
    </svg>
  )
}
