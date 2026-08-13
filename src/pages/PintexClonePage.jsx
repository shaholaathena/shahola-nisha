import { useState } from 'react'

const DEMO_URL = 'https://jthemes.net/themes/html/pintex/files/demo-11.html'

export default function PintexClonePage() {
  const [loaded, setLoaded] = useState(false)

  return (
    <main className="pintex-clone-shell">
      {!loaded && (
        <div className="pintex-clone-loading" aria-live="polite">
          <span>Loading Pintex…</span>
        </div>
      )}
      <iframe
        title="Pintex demo 11"
        src={DEMO_URL}
        onLoad={() => setLoaded(true)}
        className="pintex-clone-frame"
      />
    </main>
  )
}
