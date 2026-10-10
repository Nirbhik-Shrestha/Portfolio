import { experience } from '../data/portfolio'
import { chip } from '../lib/ui'
import Reveal from './Reveal'
import Section from './Section'

export default function Experience() {
  return (
    <Section id="experience">
      {/* Vertical timeline: the left border is the line, each item adds a dot. */}
      <ol className="relative ml-2 max-w-3xl border-l border-line">
        {experience.map((job, i) => {
          const period = job.start ? `${job.start} – ${job.end}` : job.end
          return (
            <Reveal as="li" key={`${job.company}-${job.role}`} delay={i * 0.08} className="relative pb-12 pl-8 last:pb-0 sm:pl-10">
              <span
                aria-hidden="true"
                className="absolute top-1.5 left-0 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-accent bg-page ring-4 ring-page"
              />

              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-xl font-semibold">
                  {job.role}{' '}
                  <span className="text-accent">
                    @{' '}
                    {job.companyUrl ? (
                      <a
                        href={job.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline-offset-4 hover:underline"
                      >
                        {job.company}
                      </a>
                    ) : (
                      job.company
                    )}
                  </span>
                </h3>
                <p className="font-mono text-sm text-muted">{period}</p>
              </div>

              {(job.companyDescription || job.location) && (
                <p className="mt-1 text-sm text-muted">
                  {[job.companyDescription, job.location].filter(Boolean).join(' · ')}
                </p>
              )}

              <ul className="mt-5 space-y-3">
                {job.highlights.map((point) => (
                  <li key={point} className="flex gap-3 leading-relaxed text-muted">
                    <span aria-hidden="true" className="mt-0.5 text-accent">
                      ▹
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
                {job.tech.map((tech) => (
                  <li key={tech} className={chip}>
                    {tech}
                  </li>
                ))}
              </ul>
            </Reveal>
          )
        })}
      </ol>
    </Section>
  )
}
