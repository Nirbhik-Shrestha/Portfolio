import { socials } from '../data/portfolio'
import { cx, iconButton } from '../lib/ui'
import Icon, { type IconName } from './Icon'

const iconFor: Record<(typeof socials)[number]['icon'], IconName> = {
  github: 'github',
  linkedin: 'linkedin',
  email: 'mail',
}

/** Row of icon links (GitHub, LinkedIn, Email) from portfolio.ts. */
export default function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cx('flex items-center gap-1', className)}>
      {socials.map((social) => {
        const isMail = social.href.startsWith('mailto:')
        return (
          <li key={social.label}>
            <a
              href={social.href}
              className={iconButton}
              aria-label={social.label}
              title={social.label}
              {...(isMail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
            >
              <Icon name={iconFor[social.icon]} />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
