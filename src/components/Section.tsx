import type { ReactNode } from 'react'
import { nav, sections, type SectionId } from '../data/portfolio'
import { cx } from '../lib/ui'
import SectionHeading from './SectionHeading'

interface SectionProps {
  id: SectionId
  children: ReactNode
  /** Alternate background band for visual rhythm. */
  tinted?: boolean
}

/** Shared wrapper: anchor id, spacing, page column and the numbered heading. */
export default function Section({ id, children, tinted = false }: SectionProps) {
  const headingId = `${id}-heading`
  const index = nav.findIndex((item) => item.id === id) + 1

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cx('py-20 sm:py-28', tinted && 'border-y border-line bg-surface-2/50')}
    >
      <div className="container-page">
        <SectionHeading id={headingId} index={index} {...sections[id]} />
        {children}
      </div>
    </section>
  )
}
