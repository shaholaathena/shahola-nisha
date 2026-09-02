import skyStars from '../../assets/hero-creative/sky-stars.svg'
import mountains from '../../assets/hero-creative/mountains.svg'
import cityscape from '../../assets/hero-creative/cityscapes-01.svg'
import moon from '../../assets/hero-creative/moon.png'
import illustration from '../../assets/hero-creative/4278222-01.svg'

export default function NightScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div data-layer="sky" className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #050714 0%, #0b1230 42%, #1c2550 70%, #0a1027 100%)' }} />

      <img src={illustration} alt="" data-layer="art-plate" className="absolute inset-0 h-full w-full object-cover opacity-[0.13] mix-blend-screen" draggable="false" />

      <div data-layer="stars" className="absolute inset-x-0 top-0 h-[72%]">
        <img src={skyStars} alt="" className="h-full w-full object-cover opacity-85" draggable="false" />
      </div>

      <div data-layer="moon" className="absolute right-[10%] top-[5%] h-[34vmin] w-[34vmin] sm:right-[14%] lg:right-[18%]">
        <div className="absolute left-1/2 top-1/2 h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(circle, rgba(225,232,255,.19) 0%, rgba(192,205,255,.07) 30%, transparent 64%)' }} />
        <img src={moon} alt="" className="relative h-full w-full object-contain" draggable="false" />
        <svg data-layer="orbit" className="absolute left-1/2 top-1/2 h-[215%] w-[215%] -translate-x-1/2 -translate-y-1/2 overflow-visible" viewBox="0 0 200 200">
          <ellipse cx="100" cy="100" rx="96" ry="33" fill="none" stroke="rgba(186,178,240,.24)" strokeWidth=".55" transform="rotate(-18 100 100)" />
          <circle cx="195" cy="69" r="1.7" fill="#d7ceff" />
        </svg>
      </div>

      <svg data-layer="clouds" className="absolute inset-x-0 top-[12%] h-[44%] w-full" preserveAspectRatio="none" viewBox="0 0 100 40">
        <g opacity=".18" fill="#aaa0d0">
          <path d="M-2 26C11 20 16 23 28 20C39 17 47 18 58 21C67 23 77 20 87 18C96 16 103 19 104 21V29H-2Z" />
          <path d="M62 14C70 9 77 12 83 10C91 7 98 10 103 8V18C93 15 84 18 76 16C69 15 64 17 62 14Z" fill="#d5a0bd" />
        </g>
      </svg>

      <div data-layer="mtn-far" className="absolute inset-x-[-7%] bottom-[33%] h-[34%] opacity-70">
        <img src={mountains} alt="" className="h-full w-full object-cover object-bottom scale-[1.14]" draggable="false" />
      </div>

      <div data-layer="mtn-near" className="absolute inset-x-[-12%] bottom-[25%] h-[35%] opacity-82">
        <img src={mountains} alt="" className="h-full w-full object-cover object-bottom scale-[1.34] translate-y-[9%] brightness-[0.68] saturate-[0.82]" draggable="false" />
      </div>

      <div data-layer="city" className="absolute inset-x-[-6%] bottom-[18%] h-[35%] opacity-90">
        <img src={cityscape} alt="" className="h-full w-full object-cover object-bottom scale-[1.12]" draggable="false" />
        <div data-layer="city-lights" className="absolute inset-0 mix-blend-screen" style={{ background: 'radial-gradient(ellipse at 55% 72%, rgba(255,176,118,.20), transparent 42%)' }} />
      </div>

      <div data-layer="sea" className="absolute inset-x-0 bottom-0 h-[28%]" style={{ background: 'linear-gradient(180deg, #182044 0%, #101736 42%, #060b1e 100%)' }} />

      <div data-layer="reflection" className="absolute bottom-0 right-[18%] h-[28%] w-[30%] opacity-70" style={{ background: 'radial-gradient(ellipse 44% 96% at 50% 0%, rgba(220,232,255,.31), rgba(193,211,248,.12) 34%, rgba(196,173,238,.04) 61%, transparent 83%)', filter: 'blur(7px)', transform: 'skewX(-5deg)' }} />

      <svg data-layer="reflected-stars" className="absolute inset-x-0 bottom-0 h-[24%] w-full opacity-45" preserveAspectRatio="none" viewBox="0 0 100 24">
        {Array.from({ length: 36 }, (_, i) => (
          <ellipse key={i} cx={(i * 17.3) % 100} cy={2 + ((i * 3.7) % 20)} rx="0.4" ry="0.13" fill="#dce6ff" />
        ))}
      </svg>

      <svg data-layer="foreground" className="absolute inset-x-0 bottom-0 h-[16%] w-full" preserveAspectRatio="none" viewBox="0 0 100 16">
        <rect x="0" y="10" width="100" height=".55" fill="#04060e" />
        <rect x="0" y="15" width="100" height="1" fill="#02040a" />
      </svg>

      <div className="absolute inset-0" style={{ background: 'linear-gradient(100deg, rgba(4,6,17,.86) 0%, rgba(4,6,17,.50) 30%, rgba(4,6,17,.13) 58%, transparent 82%), radial-gradient(100% 90% at 68% 36%, transparent 26%, rgba(3,5,14,.43) 100%)' }} />
      <div className="absolute inset-x-0 bottom-0 h-28" style={{ background: 'linear-gradient(to bottom, transparent, rgba(3,5,14,.9))' }} />
    </div>
  )
}
