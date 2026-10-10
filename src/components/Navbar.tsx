import { AnimatePresence, m } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { nav, site } from '../data/portfolio'
import { useActiveSection } from '../hooks/useActiveSection'
import { cx, iconButton } from '../lib/ui'
import Icon from './Icon'
import ThemeToggle from './ThemeToggle'

const sectionIds = nav.map((item) => item.id)

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(sectionIds)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Solid, blurred bar once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile menu: focus the first link on open; close on Escape, outside click,
  // or when the viewport grows to desktop size.
  useEffect(() => {
    if (!open) return
    menuRef.current?.querySelector<HTMLElement>('a')?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node
      if (!menuRef.current?.contains(target) && !toggleRef.current?.contains(target)) setOpen(false)
    }
    const desktop = window.matchMedia('(min-width: 768px)')
    const onResize = () => desktop.matches && setOpen(false)

    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    desktop.addEventListener('change', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
      desktop.removeEventListener('change', onResize)
    }
  }, [open])

  const linkClass = (id: string) =>
    cx(
      'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-accent',
      active === id ? 'text-accent' : 'text-muted',
    )

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300',
        scrolled || open ? 'border-line bg-page/85 backdrop-blur-md' : 'border-transparent',
      )}
    >
      <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between gap-4">
        <a
          href="#home"
          aria-label={`${site.name}, back to top`}
          className="rounded-md font-mono text-base font-semibold tracking-tight"
        >
          <span className="text-accent" aria-hidden="true">
            &lt;
          </span>
          {site.firstName}
          <span className="text-accent" aria-hidden="true">
            {' />'}
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={linkClass(item.id)}
                aria-current={active === item.id ? 'true' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <a
            href={site.resumeUrl}
            download
            className="ml-2 hidden items-center gap-1.5 rounded-lg border border-accent/40 px-3.5 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent/10 md:inline-flex"
          >
            Resume
          </a>
          <button
            ref={toggleRef}
            type="button"
            className={cx(iconButton, 'md:hidden')}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            ref={menuRef}
            className="border-t border-line md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <ul className="container-page flex flex-col gap-1 py-4">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={cx(linkClass(item.id), 'block py-3 text-base')}
                    aria-current={active === item.id ? 'true' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 border-t border-line pt-4">
                <a
                  href={site.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-base font-semibold text-accent"
                  onClick={() => setOpen(false)}
                >
                  <Icon name="download" className="h-4 w-4" />
                  Download Resume
                </a>
              </li>
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
