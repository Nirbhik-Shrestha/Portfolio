import { skills } from '../data/portfolio'
import { card, chip, cx } from '../lib/ui'
import Reveal from './Reveal'
import Section from './Section'

export default function Skills() {
  return (
    <Section id="skills" tinted>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal
            as="li"
            key={group.category}
            delay={(i % 3) * 0.06}
            className={cx(card, 'p-6 transition-colors hover:border-accent/50')}
          >
            <h3 className="font-semibold">
              <span className="font-mono text-sm text-muted" aria-hidden="true">
                {'// '}
              </span>
              {group.category}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${group.category} skills`}>
              {group.items.map((skill) => (
                <li key={skill} className={chip}>
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
