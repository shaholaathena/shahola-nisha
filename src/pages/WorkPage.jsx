import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import FeaturedWork from '../components/sections/FeaturedWork'

/* The work index, lifted out of the old single-page scroll. The section
   component is unchanged; this page only gives it a header, a footer and the
   top padding the fixed header needs. */
export default function WorkPage() {
  return (
    <div className="min-h-screen bg-surface-base text-ink-primary antialiased">
      <Navigation />
      <main className="pt-16">
        <FeaturedWork />
      </main>
      <Footer />
    </div>
  )
}
