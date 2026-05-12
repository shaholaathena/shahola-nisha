import ScrollProgress from './components/layout/ScrollProgress'
import Navigation from './components/layout/Navigation'
import Footer from './components/layout/Footer'
import StickyNav from './components/ui/StickyNav'
import Hero from './components/sections/Hero'
import FeaturedWork from './components/sections/FeaturedWork'
import ProcessSection from './components/sections/ProcessSection'
import ImpactSection from './components/sections/ImpactSection'
import CaseStudyPreview from './components/sections/CaseStudyPreview'
import AboutSection from './components/sections/AboutSection'
import CTASection from './components/sections/CTASection'

export default function App() {
  return (
    <div className="min-h-screen bg-surface-base text-ink-primary antialiased">
      <ScrollProgress />
      <Navigation />
      <StickyNav />
      <main>
        <Hero />
        <FeaturedWork />
        <ProcessSection />
        <ImpactSection />
        <CaseStudyPreview />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
