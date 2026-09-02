
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
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
