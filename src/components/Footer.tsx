import { footer, site } from '../data/portfolio'
import Icon from './Icon'
import SocialLinks from './SocialLinks'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col items-center gap-5 py-10 text-sm text-muted sm:flex-row sm:justify-between">
        <p className="text-center sm:text-left">
          © {year} {site.name}. <span className="font-mono">{footer.builtWith}</span>
        </p>
        <div className="flex items-center gap-3">
          <SocialLinks />
          <a
            href="#home"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line transition-colors hover:border-accent hover:text-accent"
            aria-label="Back to top"
            title="Back to top"
          >
            <Icon name="arrowUp" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
