import type { Project } from '../data/portfolio'
import { button, card, chip, cx } from '../lib/ui'
import Icon from './Icon'

export default function ProjectCard({ project }: { project: Project }) {
  const { title, subtitle, description, tags, image, imageAlt, github, demo } = project

  return (
    <article
      className={cx(
        card,
        'group relative flex h-full flex-col overflow-hidden transition duration-300 hover:border-accent/50 hover:shadow-xl hover:shadow-black/5 motion-safe:hover:-translate-y-1 dark:hover:shadow-black/30',
      )}
    >
      <div className="aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
        <img
          src={image}
          alt={imageAlt}
          width={1200}
          height={750}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-1 text-sm font-medium text-accent">{subtitle}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{description}</p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
          {tags.map((tag) => (
            <li key={tag} className={chip}>
              {tag}
            </li>
          ))}
        </ul>

        {(github || demo) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className={cx(button.small, 'relative z-10')}
              >
                <Icon name="github" className="h-4 w-4" />
                GitHub
                <span className="sr-only"> repository for {title} (opens in a new tab)</span>
              </a>
            )}
            {demo && (
              // The ::after overlay stretches this link over the whole card.
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className={cx(button.small, 'after:absolute after:inset-0')}
              >
                <Icon name="external" className="h-4 w-4" />
                Live Demo
                <span className="sr-only"> of {title} (opens in a new tab)</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
