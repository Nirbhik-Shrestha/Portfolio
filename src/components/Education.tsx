import { certifications, education } from '../data/portfolio'
import { card, cx } from '../lib/ui'
import Icon, { type IconName } from './Icon'
import Reveal from './Reveal'
import Section from './Section'

function IconBadge({ name }: { name: IconName }) {
  return (
    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
      <Icon name={name} />
    </span>
  )
}

export default function Education() {
  return (
    <Section id="education">
      <ul className="grid gap-6 md:grid-cols-2">
        {education.map((item, i) => (
          <Reveal as="li" key={item.degree} delay={i * 0.08} className={cx(card, 'flex gap-5 p-6')}>
            <IconBadge name="graduation" />
            <div className="min-w-0">
              <p className="font-mono text-sm text-accent">{item.period}</p>
              <h3 className="mt-1 text-lg font-semibold">
                {item.degree}
                {item.field && <span className="font-normal text-muted"> · {item.field}</span>}
              </h3>
              <p className="mt-1 text-muted">
                {item.institution}, {item.location}
              </p>
              {item.details && (
                <ul className="mt-3 space-y-1 text-sm leading-relaxed text-muted">
                  {item.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </ul>

      {certifications.length > 0 && (
        <>
          <h3 className="mt-14 mb-6 font-mono text-sm tracking-wider text-muted uppercase">Certifications</h3>
          <ul className="grid gap-6 md:grid-cols-2">
            {certifications.map((cert) => (
              <Reveal as="li" key={cert.name} className={cx(card, 'flex items-center gap-5 p-6')}>
                <IconBadge name="award" />
                <div>
                  <p className="font-semibold">{cert.name}</p>
                  <p className="mt-0.5 text-sm text-muted">
                    {[cert.issuer, cert.year].filter(Boolean).join(' · ')}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </>
      )}
    </Section>
  )
}
