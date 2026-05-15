import { meta } from '../../data/portfolio'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border-subtle bg-surface-base">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex items-center justify-center">
        <p className="text-xs text-ink-faint">
          © {year} Alimoon Nisha Portfolio.
        </p>

      </div>
    </footer>
  )
}
