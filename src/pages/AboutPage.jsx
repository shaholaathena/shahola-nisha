import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import AboutIntro from '../components/about/AboutIntro'
import WhoIAm from '../components/about/WhoIAm'
import Approach from '../components/about/Approach'
import AboutSection from '../components/sections/AboutSection'
import ExperienceSection from '../components/sections/ExperienceSection'
import CertificationsSection from '../components/sections/CertificationsSection'
import CTASection from '../components/sections/CTASection'

/* Everything about the person, in one scroll: who, then the track record, then
   the credentials, then how to reach her. Contact is the closing section here
   rather than its own route.

   The page runs fully dark to match the homepage's night hero — the shell paints
   the void, AboutIntro carries the night backdrop and the portrait, and every
   section below is on transparent surfaces so the one dark ground shows through.
   Navigation and Footer are shared with the light inner pages, so they take a
   `dark` flag rather than being forked. */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-hero-void text-hero-ink antialiased">
      <Navigation variant="hero" dark />
      <main>
        <AboutIntro />
        <WhoIAm />
        <Approach />
        <AboutSection />
        <ExperienceSection />
        <CertificationsSection />
        <CTASection />
      </main>
      <Footer dark />
    </div>
  )
}
