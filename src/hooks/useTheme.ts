import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
/** Keep in sync with RESPECT_SYSTEM in the inline script in index.html. */
const RESPECT_SYSTEM = true
/** Browser UI colour (mobile address bar) per theme; matches --page in index.css. */
const THEME_COLORS: Record<Theme, string> = { light: '#f8fafc', dark: '#0b1120' }

function readSaved(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null // storage blocked (private mode, etc.)
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme])
}

/**
 * Light/dark theme state. The initial theme is set by the inline script in
 * index.html (before React loads), so here we just read it back from <html>.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  )

  // Follow OS theme changes live, until the visitor makes an explicit choice.
  useEffect(() => {
    if (!RESPECT_SYSTEM) return
    const query = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => {
      if (readSaved()) return
      const next: Theme = query.matches ? 'light' : 'dark'
      applyTheme(next)
      setTheme(next)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    setTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore: the choice just won't persist */
    }
  }, [theme])

  return { theme, toggleTheme }
}
