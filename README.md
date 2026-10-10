# Nirbhik Shrestha: Portfolio

Personal portfolio site for Nirbhik Shrestha, a full-stack developer in Kathmandu, Nepal.

**Stack:** React 19 · Vite · TypeScript · Tailwind CSS v4 · Framer Motion · Formspree (contact form)

It's a single page with smooth-scrolling anchor navigation and a light/dark theme. All the content lives in one data file.

---

## Run locally

Requires **Node.js 20.19+ or 22.12+** (`.nvmrc` pins 22).

```bash
npm install
cp .env.example .env      # then add your Formspree ID (see below)
npm run dev               # http://localhost:5173
```

| Command             | What it does                                      |
| ------------------- | ------------------------------------------------- |
| `npm run dev`       | Dev server with hot reload                        |
| `npm run build`     | Type-check, then build to `dist/`                 |
| `npm run preview`   | Serve the production build locally                |
| `npm run typecheck` | Type-check only                                   |

---

## Editing content: `src/data/portfolio.ts`

**All the text, links and images on the site live in [`src/data/portfolio.ts`](src/data/portfolio.ts).** To update the site you only edit this file, never the components.

| You want to change…                          | Edit this export in `portfolio.ts`    |
| -------------------------------------------- | ------------------------------------- |
| Name, tagline, typewriter phrases, site URL  | `site`                                |
| GitHub username / LinkedIn URL               | `GITHUB_USERNAME`, `LINKEDIN_URL` (top of file) |
| Page title, meta description, social image   | `seo`                                 |
| Hero buttons and the code-window card        | `hero`                                |
| Section titles and intros                    | `sections`                            |
| About text and the quick-facts card          | `about`                               |
| Skill groups                                 | `skills`                              |
| Jobs                                         | `experience`                          |
| Projects                                     | `projects`                            |
| Degrees / certificates                       | `education`, `certifications`         |
| Contact and footer wording                   | `contact`, `footer`                   |

The SEO tags in `index.html` (title, description, Open Graph, Twitter, JSON-LD) are filled in from `site` and `seo` at build time by a small plugin in `vite.config.ts`, so you never need to edit `index.html` by hand. `robots.txt` and `sitemap.xml` are generated from `site.url` the same way.

### Adding a project

1. Put a screenshot in `public/projects/` (1200×750, `.webp` or `.jpg`, ideally under 200 KB).
2. Copy an existing object in the `projects` array and edit it:

```ts
{
  title: 'My New App',
  subtitle: 'One-line summary',
  description: 'Two or three sentences about what it does and how it was built.',
  tags: ['React', 'Node.js'],
  image: '/projects/my-new-app.webp',
  imageAlt: 'Screenshot of My New App dashboard',
  github: `${GITHUB_URL}/my-new-app`,   // remove to hide the button
  demo: 'https://my-new-app.vercel.app', // remove to hide the button
},
```

The grid reflows automatically.

### Resume

Put your PDF at **`public/Nirbhik_Shrestha_Resume.pdf`**. The "Download Resume" buttons already link to it. To use a different file name, change `site.resumeUrl`.

---

## Contact form setup (Formspree)

The form sends messages to your inbox through [Formspree](https://formspree.io), so no backend is needed. The free plan allows 50 submissions a month.

1. Sign up at **formspree.io** and click **New Form**. Use `nirbhik2k60@gmail.com` as the destination email.
2. Copy the form's ID, which is the last part of its endpoint. For `https://formspree.io/f/xyzabcde`, the ID is `xyzabcde`.
3. Locally, put it in `.env`:
   ```bash
   VITE_FORMSPREE_ID=xyzabcde
   ```
4. On Vercel/Netlify, add the same variable under the project's **Environment Variables**, then redeploy. Vite reads env variables at build time, so a redeploy is required.
5. Send yourself a test message. The first submission asks you to confirm the form by email.

Until the ID is set, the form still validates input, but submitting shows a friendly message that points visitors to your email address.

The form includes a hidden honeypot field (`_gotcha`) that blocks basic spam bots. You can turn on reCAPTCHA in the Formspree dashboard if you need more protection.

> Prefer EmailJS? Only `onSubmit` in `src/components/Contact.tsx` needs to change. Swap the `fetch` call for `emailjs.send(...)` and add its keys as `VITE_` env variables.

---

## Deploy to Vercel (recommended)

`vercel.json` is included. It sets the framework, the build command, long-term caching for hashed assets and some basic security headers.

**Using the dashboard:**

1. Push this folder to a GitHub repository:
   ```bash
   git init && git add . && git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<you>/portfolio.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository. Vercel detects Vite automatically: the build command is `npm run build` and the output folder is `dist`.
3. Under **Environment Variables**, add `VITE_FORMSPREE_ID`.
4. Click **Deploy**.
5. Copy your live URL (e.g. `https://nirbhik.vercel.app` or a custom domain) into `site.url` in `portfolio.ts`, then commit and push. Canonical, Open Graph and sitemap URLs need the real address. Every push to `main` redeploys automatically.

**Using the CLI:**

```bash
npm i -g vercel
vercel            # first run links the project
vercel env add VITE_FORMSPREE_ID
vercel --prod
```

### Netlify (alternative)

`netlify.toml` is included. Import the repo at [app.netlify.com](https://app.netlify.com), add `VITE_FORMSPREE_ID` under *Site configuration → Environment variables*, and deploy. The build settings are read from the file.

---

## Project structure

```
├─ public/
│  ├─ favicon.svg, favicon-32.png, apple-touch-icon.png
│  ├─ og-image.png               # 1200×630 social preview (placeholder)
│  ├─ projects/*.svg             # project screenshot placeholders
│  └─ Nirbhik_Shrestha_Resume.pdf  ← add this
├─ src/
│  ├─ data/portfolio.ts          # ← ALL site content
│  ├─ components/                # Navbar, Hero, About, Skills, Experience, Projects,
│  │                             # ProjectCard, Education, Contact, Footer, SectionHeading,
│  │                             # Section, Reveal, Icon, SocialLinks, ThemeToggle
│  ├─ hooks/                     # useTheme, useTypewriter, useActiveSection
│  ├─ lib/                       # shared class names, lazy-loaded motion features
│  ├─ App.tsx, main.tsx, index.css
├─ index.html                    # SEO placeholders + no-flash theme script
├─ vite.config.ts                # fills SEO tags, writes robots.txt + sitemap.xml
├─ vercel.json, netlify.toml
└─ .env.example
```

## Notes

- **Theme:** the site uses the visitor's saved choice first, then their OS setting, then dark. To make dark the default for everyone, even visitors whose OS is set to light, set `RESPECT_SYSTEM = false` in both `index.html` and `src/hooks/useTheme.ts`.
- **Accent colour:** teal, defined once as `--accent` / `--accent-strong` (light and dark values) at the top of `src/index.css`. Change those to re-theme the site.
- **Motion:** animations are scroll reveals and hover states only. Visitors with *reduced motion* enabled get no movement, and the typewriter switches whole words instead of typing them.
- **Fonts:** Inter and JetBrains Mono are self-hosted via Fontsource, so there are no Google Fonts requests.
- **Privacy:** your phone number is intentionally not shown anywhere on the site.
