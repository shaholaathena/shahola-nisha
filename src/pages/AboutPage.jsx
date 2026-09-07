import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import AboutIntro from '../components/about/AboutIntro'
import WhoIAm from '../components/about/WhoIAm'
import AboutAtmosphere from '../components/about/AboutAtmosphere'
import AboutTicker from '../components/about/AboutTicker'
import AboutGallery from '../components/about/AboutGallery'
import WhatIDo from '../components/about/WhatIDo'
import ExperienceSection from '../components/sections/ExperienceSection'
import CertificationsSection from '../components/sections/CertificationsSection'
import CTASection from '../components/sections/CTASection'

/* Everything about the person, in one scroll: the track record and how she
   works, then who she is away from it, then the credentials, then how to reach
   her. Contact is the closing section here rather than its own route.

   Work comes before the personal material on purpose. A visitor arriving on
   /about from a portfolio is deciding whether to keep reading, and the answer
   to that is the career and the process, not the reading habits — those land
   better once someone has a reason to care about them. ExperienceSection holds the
   timeline; WhatIDo, the three-stage process, immediately after it.

   The page runs fully dark to match the homepage's night hero. AboutAtmosphere
   paints one sky behind the whole of `main` and every section is transparent on
   top of it, so the night is continuous rather than something each section has
   to reproduce for itself. That is a change from how this worked before, where
   only the intro and the contact band had any backdrop and the entire middle of
   the page was flat.

   The wrapper holding it spans `main` AND the footer: the layer is
   `absolute inset-0` inside it and the content sits above on `z-10`. The footer
   was outside at first, painting its own `bg-hero-void`, which put a flat slab
   under the skyline and cut the artwork off with a hard edge. Inside the
   wrapper and transparent, the copyright sits on the same ground as everything
   above it and the sky runs to the last pixel of the page.

   Navigation and Footer are shared with the light inner pages, so they take a
   `dark` flag rather than being forked. */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-hero-void text-hero-ink antialiased">
      <Navigation variant="hero" dark />
      <div className="relative">
        <AboutAtmosphere />
        <div className="relative z-10">
          <main>
            <AboutIntro />
            <AboutTicker />
            <ExperienceSection />
            <WhatIDo />
            <WhoIAm />
            <AboutGallery />
            <CertificationsSection />
            <CTASection />
          </main>
          <Footer dark />
        </div>
      </div>
    </div>
  )
}
