import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { seo, site, socials } from './src/data/portfolio.ts'

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * Fills the __SEO_*__ placeholders in index.html from src/data/portfolio.ts,
 * so the SEO and social tags are edited in the same place as everything else.
 * It also writes robots.txt and sitemap.xml at build time.
 */
function portfolioSeo(): Plugin {
  const absolute = (path: string) => new URL(path, `${site.url}/`).toString()

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: site.title,
    url: site.url,
    email: `mailto:${site.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Kathmandu', addressCountry: 'NP' },
    sameAs: socials.filter((s) => s.icon !== 'email').map((s) => s.href),
  }

  const tokens: Record<string, string> = {
    __SEO_TITLE__: escapeHtml(seo.title),
    __SEO_DESCRIPTION__: escapeHtml(seo.description),
    __SEO_KEYWORDS__: escapeHtml(seo.keywords.join(', ')),
    __SEO_AUTHOR__: escapeHtml(site.name),
    __SEO_EMAIL__: escapeHtml(site.email),
    __SEO_URL__: escapeHtml(`${site.url}/`),
    __SEO_IMAGE__: escapeHtml(absolute(seo.image)),
    __SEO_IMAGE_ALT__: escapeHtml(seo.imageAlt),
    __SEO_TWITTER__: escapeHtml(seo.twitterHandle),
    // `<` is escaped so the JSON can never close the <script> tag early.
    __SEO_JSONLD__: JSON.stringify(personSchema).replace(/</g, '\\u003c'),
  }

  return {
    name: 'portfolio-seo',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        let out = html.replace(/__SEO_[A-Z_]+__/g, (token) => tokens[token] ?? token)
        // Drop the twitter:site tag entirely when no handle is configured.
        if (!seo.twitterHandle) out = out.replace(/\s*<meta name="twitter:site"[^>]*>/, '')
        return out
      },
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${absolute('/sitemap.xml')}\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${site.url}/</loc></url>\n</urlset>\n`,
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), portfolioSeo()],
})
