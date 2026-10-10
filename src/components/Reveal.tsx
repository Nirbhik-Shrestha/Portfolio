import { m } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Seconds; use small steps (0.05–0.1) to stagger siblings. */
  delay?: number
  as?: 'div' | 'li'
}

/**
 * Fades and lifts content in once as it scrolls into view.
 * With reduced motion, <MotionConfig reducedMotion="user"> in App drops the movement.
 */
export default function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const Component = as === 'li' ? m.li : m.div
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </Component>
  )
}
