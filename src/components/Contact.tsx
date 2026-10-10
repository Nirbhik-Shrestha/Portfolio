import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { contact, site } from '../data/portfolio'
import { button, card, cx } from '../lib/ui'
import Icon from './Icon'
import Reveal from './Reveal'
import Section from './Section'

/*
 * Contact form → Formspree (https://formspree.io), no backend needed.
 * TODO: create a free Formspree form and put its ID in VITE_FORMSPREE_ID
 *       (.env locally, and in Vercel/Netlify environment variables). See README.
 */
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID?.trim()
const ENDPOINT = FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : null

type Field = 'name' | 'email' | 'message'
type Values = Record<Field, string>
type Errors = Partial<Record<Field, string>>
type Status = 'idle' | 'submitting' | 'success' | 'error'

const EMPTY: Values = { name: '', email: '', message: '' }
const FIELDS: Field[] = ['name', 'email', 'message']
const MESSAGE_MAX = 5000

function validate(values: Values): Errors {
  const errors: Errors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const message = values.message.trim()

  if (!name) errors.name = 'Please enter your name.'
  else if (name.length < 2) errors.name = 'Name looks a bit short.'

  if (!email) errors.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = 'Please enter a valid email address.'

  if (!message) errors.message = 'Please write a message.'
  else if (message.length < 10) errors.message = 'Message should be at least 10 characters.'
  else if (message.length > MESSAGE_MAX) errors.message = `Please keep it under ${MESSAGE_MAX} characters.`

  return errors
}

export default function Contact() {
  const [values, setValues] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false) // validate live only after the first attempt
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [event.target.name]: event.target.value }
    setValues(next)
    if (submitted) setErrors(validate(next))
    if (status === 'success' || status === 'error') setStatus('idle')
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)

    const found = validate(values)
    setErrors(found)
    const firstInvalid = FIELDS.find((field) => found[field])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    // Honeypot: real people never fill this hidden field, bots usually do.
    const honeypot = new FormData(event.currentTarget).get('_gotcha')
    if (honeypot) {
      setStatus('success')
      return
    }

    if (!ENDPOINT) {
      if (import.meta.env.DEV) console.warn('Contact form: set VITE_FORMSPREE_ID in .env (see README).')
      setServerError('The contact form isn’t set up yet.')
      setStatus('error')
      return
    }

    setStatus('submitting')
    setServerError('')
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          _subject: `Portfolio message from ${values.name.trim()}`,
        }),
      })
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { errors?: { message: string }[] } | null
        throw new Error(data?.errors?.map((e) => e.message).join(' ') || `Request failed (${response.status})`)
      }
      setStatus('success')
      setValues(EMPTY)
      setSubmitted(false)
      setErrors({})
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Something went wrong.')
      setStatus('error')
    }
  }

  const inputClass = (field: Field) =>
    cx(
      'mt-2 block w-full rounded-lg border bg-page px-4 py-3 text-fg placeholder:text-muted/70 transition-colors',
      'focus:border-accent focus:ring-2 focus:ring-accent/30 focus:outline-none',
      errors[field] ? 'border-red-600 dark:border-red-400' : 'border-line',
    )

  const fieldError = (field: Field) =>
    errors[field] && (
      <p id={`${field}-error`} className="mt-2 flex items-center gap-1.5 text-sm text-red-700 dark:text-red-400">
        <Icon name="alert" className="h-4 w-4 shrink-0" />
        {errors[field]}
      </p>
    )

  const a11y = (field: Field) => ({
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
  })

  return (
    <Section id="contact" tinted>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        {/* Left: direct contact details */}
        <Reveal className="space-y-6">
          <div className={cx(card, 'p-6')}>
            <p className="font-mono text-xs tracking-wider text-accent uppercase">{contact.emailLabel}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 inline-flex items-center gap-2 text-lg font-semibold break-all hover:text-accent"
            >
              <Icon name="mail" className="h-5 w-5 shrink-0 text-accent" />
              {site.email}
            </a>
          </div>
          <div className={cx(card, 'p-6')}>
            <p className="font-mono text-xs tracking-wider text-accent uppercase">Location</p>
            <p className="mt-2 inline-flex items-center gap-2 text-lg font-semibold">
              <Icon name="pin" className="h-5 w-5 shrink-0 text-accent" />
              {site.location}
            </p>
          </div>
        </Reveal>

        {/* Right: the form */}
        <Reveal delay={0.1}>
          <form
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            className={cx(card, 'p-6 sm:p-8')}
            aria-labelledby="contact-form-heading"
          >
            <h3 id="contact-form-heading" className="text-xl font-semibold">
              {contact.formHeading}
            </h3>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={values.name}
                  onChange={onChange}
                  className={inputClass('name')}
                  placeholder="Your name"
                  {...a11y('name')}
                />
                {fieldError('name')}
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  value={values.email}
                  onChange={onChange}
                  className={inputClass('email')}
                  placeholder="you@example.com"
                  {...a11y('email')}
                />
                {fieldError('email')}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                maxLength={MESSAGE_MAX}
                value={values.message}
                onChange={onChange}
                className={cx(inputClass('message'), 'resize-y')}
                placeholder="Tell me a little about your project or idea…"
                {...a11y('message')}
              />
              {fieldError('message')}
            </div>

            {/* Honeypot: hidden from people and assistive tech. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="_gotcha">Leave this empty</label>
              <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button type="submit" className={button.primary} disabled={status === 'submitting'}>
                {status === 'submitting' ? (
                  <>
                    <Icon name="spinner" className="h-4 w-4 motion-safe:animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Icon name="send" className="h-4 w-4" />
                    Send message
                  </>
                )}
              </button>
            </div>

            {/* Announced to screen readers when the status changes. */}
            <div aria-live="polite" role="status" className="empty:hidden">
              {status === 'success' && (
                <p className="mt-5 flex items-start gap-2 rounded-lg border border-accent/30 bg-accent/10 p-4 text-sm text-fg">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {contact.successMessage}
                </p>
              )}
              {status === 'error' && (
                <p className="mt-5 flex items-start gap-2 rounded-lg border border-red-600/30 bg-red-600/10 p-4 text-sm text-fg dark:border-red-400/30 dark:bg-red-400/10">
                  <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0 text-red-700 dark:text-red-400" />
                  <span>
                    Sorry, your message couldn’t be sent. {serverError} Please email me directly at{' '}
                    <a href={`mailto:${site.email}`} className="font-semibold text-accent underline underline-offset-2">
                      {site.email}
                    </a>
                    .
                  </span>
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}
