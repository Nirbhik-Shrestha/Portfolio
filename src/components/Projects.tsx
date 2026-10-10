import { moreProjectsUrl, projects } from '../data/portfolio'
import { button } from '../lib/ui'
import Icon from './Icon'
import ProjectCard from './ProjectCard'
import Reveal from './Reveal'
import Section from './Section'

export default function Projects() {
  return (
    <Section id="projects" tinted>
      {/* Grid grows automatically as you add projects in portfolio.ts. */}
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal as="li" key={project.title} delay={(i % 3) * 0.08}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </ul>

      {moreProjectsUrl && (
        <Reveal className="mt-12 text-center">
          <a href={moreProjectsUrl} target="_blank" rel="noopener noreferrer" className={button.secondary}>
            <Icon name="github" className="h-4 w-4" />
            More on GitHub
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </Reveal>
      )}
    </Section>
  )
}
