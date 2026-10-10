import { about } from '../data/portfolio'
import { card } from '../lib/ui'
import Reveal from './Reveal'
import Section from './Section'

export default function About() {
  return (
    <Section id="about">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <Reveal className="space-y-5 text-lg leading-relaxed text-pretty text-muted">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <dl className={`${card} divide-y divide-line`}>
            {about.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1 px-6 py-4">
                <dt className="font-mono text-xs tracking-wider text-accent uppercase">{fact.label}</dt>
                <dd className="font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  )
}
