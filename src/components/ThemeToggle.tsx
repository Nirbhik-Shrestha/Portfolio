import { useTheme } from '../hooks/useTheme'
import { iconButton } from '../lib/ui'
import Icon from './Icon'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const label = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`

  return (
    <button type="button" onClick={toggleTheme} className={iconButton} aria-label={label} title={label}>
      {/* Show the theme you'd switch *to*. */}
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
    </button>
  )
}
