/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Formspree form ID (the part after https://formspree.io/f/). See .env.example. */
  readonly VITE_FORMSPREE_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
