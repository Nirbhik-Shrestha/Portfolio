import type { SectionCopy } from '../data/portfolio'
import Reveal from './Reveal'

interface SectionHeadingProps extends SectionCopy {
  /** Id for the <h2>, referenced by the section's aria-labelledby. */
  id: string
  /** Section number shown in the mono eyebrow ("02. skills"). */
  index: number
}

export default function SectionHeading({ id, index, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mb-10 max-w-2xl sm:mb-14">
      <p className="font-mono text-sm text-accent">
        <span aria-hidden="true">{String(index).padStart(2, '0')}. </span>
        {eyebrow}
      </p>
      <h2 id={id} className="mt-2 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-lg leading-relaxed text-pretty text-muted">{description}</p>}
    </Reveal>
  )
}
