import { useEffect, useState } from 'react'

interface TypewriterOptions {
  typeMs?: number
  deleteMs?: number
  /** How long a finished word stays on screen. */
  holdMs?: number
  /** When true (reduced motion), whole words swap without the typing effect. */
  disabled?: boolean
}

/** Types out each word, pauses, deletes it, then moves on to the next. */
export function useTypewriter(
  words: readonly string[],
  { typeMs = 70, deleteMs = 35, holdMs = 1800, disabled = false }: TypewriterOptions = {},
) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  const word = words[index % words.length] ?? ''

  useEffect(() => {
    if (words.length === 0) return
    const next = () => setIndex((i) => (i + 1) % words.length)

    // Reduced motion: no typing, just swap whole words now and then.
    if (disabled) {
      const id = window.setTimeout(next, holdMs + 1500)
      return () => window.clearTimeout(id)
    }

    let id: number
    if (!deleting && text === word) {
      id = window.setTimeout(() => setDeleting(true), holdMs)
    } else if (deleting && text === '') {
      id = window.setTimeout(() => {
        setDeleting(false)
        next()
      }, 300)
    } else {
      const nextText = deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)
      id = window.setTimeout(() => setText(nextText), deleting ? deleteMs : typeMs)
    }
    return () => window.clearTimeout(id)
  }, [text, deleting, word, words.length, disabled, typeMs, deleteMs, holdMs])

  return disabled ? word : text
}
