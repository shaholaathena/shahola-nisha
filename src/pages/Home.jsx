
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import StickyNav from '../components/ui/StickyNav'
import Hero from '../components/sections/Hero'
import FeaturedWork from '../components/sections/FeaturedWork'
import AboutSection from '../components/sections/AboutSection'
import ExperienceSection from '../components/sections/ExperienceSection'
import CertificationsSection from '../components/sections/CertificationsSection'
import CTASection from '../components/sections/CTASection'

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-base text-ink-primary antialiased">

      <Navigation />
      <StickyNav />
      <main>
        <Hero />
        <FeaturedWork />
        <AboutSection />
        <ExperienceSection />
        <CertificationsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
