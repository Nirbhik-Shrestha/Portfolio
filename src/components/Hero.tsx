import { m, useReducedMotion } from 'framer-motion'
import { hero, site } from '../data/portfolio'
import { useTypewriter } from '../hooks/useTypewriter'
import { button } from '../lib/ui'
import Icon from './Icon'
import SocialLinks from './SocialLinks'

/* The h1 and tagline render without entrance animation so they paint
   immediately (they're the Largest Contentful Paint); only the extras fade in. */

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: 'easeOut' as const },
})

export default function Hero() {
  const reduceMotion = useReducedMotion() ?? false
  const typed = useTypewriter(site.rotatingTitles, { disabled: reduceMotion })

  return (
    <section id="home" aria-label="Introduction" className="relative overflow-hidden pt-28 pb-20 sm:pt-40 sm:pb-28">
      {/* Decorative background */}
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[44rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
      />

      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <m.p {...fadeUp(0)} className="font-mono text-sm text-accent">
            {hero.greeting}
          </m.p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">
            {site.name}
          </h1>

          {/* Rotating title: screen readers get the plain list, sighted users the typewriter. */}
          <p className="mt-5 h-8 text-lg font-semibold sm:h-9 sm:text-2xl">
            <span className="sr-only">{site.rotatingTitles.join(', ')}</span>
            <span aria-hidden="true" className="font-mono text-accent">
              {typed}
              <span className="ml-0.5 inline-block h-[1.1em] w-[0.55ch] translate-y-[0.15em] bg-accent motion-safe:animate-blink" />
            </span>
          </p>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-pretty text-muted">{site.tagline}</p>

          <m.div {...fadeUp(0.15)} className="mt-9 flex flex-wrap items-center gap-3">
            <a href={hero.primaryCta.href} className={button.primary}>
              {hero.primaryCta.label}
              <Icon name="arrowRight" className="h-4 w-4" />
            </a>
            <a href={site.resumeUrl} download className={button.secondary}>
              <Icon name="download" className="h-4 w-4" />
              {hero.resumeCta.label}
            </a>
          </m.div>

          <m.div {...fadeUp(0.25)} className="mt-8 flex items-center gap-4">
            <SocialLinks className="-ml-2.5" />
            <span className="h-px w-10 bg-line" aria-hidden="true" />
            <span className="inline-flex items-center gap-1.5 text-sm text-muted">
              <Icon name="pin" className="h-4 w-4" />
              {site.location}
            </span>
          </m.div>
        </div>

        <m.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="hidden lg:block"
        >
          <CodeCard />
        </m.div>
      </div>
    </section>
  )
}

/** Editor-window card that shows the hero.codeCard data as a TypeScript object. */
function CodeCard() {
  const { filename, variable, fields } = hero.codeCard
  const entries = Object.entries(fields)
  const str = (value: string) => <span className="text-code-string">&quot;{value}&quot;</span>

  const lines = [
    <>
      <span className="text-code-keyword">const</span> {variable} <span className="text-muted">=</span> {'{'}
    </>,
    ...entries.map(([key, value]) => (
      <>
        {'  '}
        <span className="text-code-key">{key}</span>
        <span className="text-muted">: </span>
        {Array.isArray(value) ? (
          <>
            [
            {value.map((item, i) => (
              <span key={item}>
                {str(item)}
                {i < value.length - 1 && <span className="text-muted">, </span>}
              </span>
            ))}
            ]
          </>
        ) : (
          str(value)
        )}
        <span className="text-muted">,</span>
      </>
    )),
    <>{'}'}</>,
  ]

  // Purely decorative (the same facts appear in About), so hidden from assistive tech.
  return (
    <div aria-hidden="true" className="relative">
      <div className="absolute -inset-4 rounded-3xl bg-accent/10 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/10 dark:shadow-black/40">
        <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-muted">{filename}</span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="flex">
                <span className="mr-5 w-4 shrink-0 text-right text-muted/60 select-none">{i + 1}</span>
                <span className="whitespace-pre text-fg">{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}
