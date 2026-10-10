/** Joins class names, skipping falsy values. */
export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60'

/** Shared button styles (work on <a> and <button>). */
export const button = {
  primary: cx(buttonBase, 'bg-accent text-accent-fg hover:bg-accent-strong'),
  secondary: cx(buttonBase, 'border border-line bg-surface text-fg hover:border-accent hover:text-accent'),
  /** Smaller outline button used inside cards. */
  small:
    'inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent',
}

/** Tech tag / skill chip. */
export const chip =
  'inline-flex items-center rounded-md border border-accent/25 bg-accent/10 px-2.5 py-1 font-mono text-xs font-medium text-accent'

/** Round icon-only link/button (socials, theme toggle, menu). */
export const iconButton =
  'inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-accent'

/** Card surface. */
export const card = 'rounded-2xl border border-line bg-surface'
