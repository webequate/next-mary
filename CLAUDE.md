# Project: next-mary (Mary J Johnson — maryjjohnson.com)

This is one of a family of 9 similar Next.js projects managed by Webequate. The projects share the same stack and architecture but are not identical.

**Purpose:** Portfolio/professional site for Mary J Johnson — education consultant, author, and blogger. Visitors can read her bio, browse her published books, read linked articles, explore online work/contributions, and contact her via a form that sends email through Gmail SMTP.

---

## Stack

| Layer | Version | Notes |
|---|---|---|
| Node.js | 24 LTS (24.15.0) | Pinned in `.nvmrc` and `vercel.json` |
| Next.js | 16 | App Router only; Turbopack enabled |
| React | 19 | Automatic JSX runtime (`react-jsx`) |
| TypeScript | 5.x | strict mode, `moduleResolution: bundler` |
| Tailwind CSS | 3.x | PostCSS pipeline |
| ESLint | 9 | Flat config (`eslint.config.mjs`) |
| Prettier | 3.x | `.prettierrc.json` |
| Nodemailer | 8 | Contact form email (Gmail SMTP) |
| Deployment | Vercel | Node 24, no custom build command |

---

## Architecture

- **App Router only.** There is no `pages/` directory (excluded in `tsconfig.json`). All routes live under `app/`.
- **Turbopack** is the bundler for both dev and build. Do not add webpack configuration — it will be ignored and may cause errors.
- **SVG imports** are handled natively by Turbopack via `resolveExtensions` in `next.config.js`. No `@svgr/webpack` loader needed.
- **CSS `@import`** statements must appear before all `@tailwind` directives in `globals.css` — Turbopack enforces this.
- **Email** is sent via `nodemailer` (Gmail SMTP) through an App Router API route at `app/api/send-email/route.tsx`. Note the `.tsx` extension — this is intentional and correct.
- **All content is static.** No database or CMS. Site content lives in `data/*.json`. Pages are statically generated at build time.
- **Font loading** uses `next/font/google` via `lib/fonts.ts` (Belgrano), not a CSS `@import`. This is different from other projects in the family that load fonts via `globals.css`.
- **Metadata** is centralized via `lib/metadata.ts` (`siteConfig` + `getPageMetadata()`). Individual pages call `getPageMetadata()` rather than constructing metadata objects inline.

---

## Directory structure

```
next-mary/
├── app/                          # All routes (App Router)
│   ├── layout.tsx                # Root layout: HTML shell, Header, Footer, GTM, Providers, Layout, UseScrollToTop
│   ├── page.tsx                  # Home page: name, titles, summary items, ThemedImage, social links
│   ├── about/
│   │   └── page.tsx              # About page: AboutContent + AboutDetails sidebar with photo
│   ├── articles/
│   │   └── page.tsx              # Bulleted article list; items may have optional external links
│   ├── books/
│   │   └── page.tsx              # Book grid with cover images and external purchase links
│   ├── contact/
│   │   └── page.tsx              # Two-column: ContactForm + ContactDetails
│   ├── online-work/
│   │   └── page.tsx              # Linked list of online contributions and projects
│   └── api/
│       └── send-email/
│           └── route.tsx         # POST: contact form → Nodemailer. GET: health ping
│
├── components/                   # Shared UI components
│   ├── AboutContent.tsx          # Renders aboutIntro paragraph + aboutItems list
│   ├── AboutDetails.tsx          # Renders the profile photo (mary.jpg); accepts name/location/phone/website props but does not render them
│   ├── AllenJohnson.tsx          # SVG "ALLEN JOHNSON" text logo — appears unused, legacy artifact
│   ├── ContactDetails.tsx        # Static contact info with Feather icons (name, location, phone, email, website)
│   ├── ContactForm.tsx           # Contact form: state, validation, honeypot, POST to /api/send-email
│   ├── Copyright.tsx             # Footer copyright with dynamic year
│   ├── Footer.tsx                # Footer: secondary nav, social links, copyright, WebEquate branding
│   ├── FormInput.tsx             # Reusable labeled input field
│   ├── Hamburger.tsx             # Mobile menu toggle (FiMenu / FiX icons)
│   ├── Header.tsx                # Responsive nav: MaryJJohnson logo, desktop/mobile nav, ThemeSwitcher
│   ├── Heading.tsx               # Section h2 with standard bold styling
│   ├── HomeButton.tsx            # Home icon link — appears unused, legacy artifact
│   ├── Layout.tsx                # Client component: applies body bg classes, wraps children in <main>
│   ├── MaryJJohnson.tsx          # SVG "MARY J JOHNSON" display text using Belgrano font (home link)
│   ├── PageContent.tsx           # Client wrapper: re-renders on pathname change (key={pathname}) for fade transitions
│   ├── Providers.tsx             # Client: next-themes ThemeProvider (defaultTheme: "light")
│   ├── Social.tsx                # Maps socialLinks array → list of SocialButton components
│   ├── SocialButton.tsx          # Individual social icon link (opens new tab); supports Facebook, GitHub, Instagram, LinkedIn, Twitter, YouTube
│   ├── ThemedImage.tsx           # Renders mary.jpg via next/image; reads theme via useTheme (currently same image for both themes)
│   ├── ThemeSwitcher.tsx         # FaSun/FaMoon toggle; guards with mounted check to prevent hydration mismatch
│   └── WebEquate.tsx             # "Website by WebEquate" attribution link
│
├── hooks/
│   ├── useScrollToTop.tsx        # Returns scroll-to-top button JSX; shows after 400px scroll
│   └── useThemeSwitcher.tsx      # Legacy: localStorage-based theme manager; superseded by next-themes — do not use for new work
│
├── interfaces/
│   └── ContactForm.ts            # ContactForm interface (name, email, subject, message, website honeypot)
│
├── lib/
│   ├── fonts.ts                  # Belgrano font via next/font/google (weight 400, Latin subset, swap display)
│   └── metadata.ts               # siteConfig object + getPageMetadata() helper; used by all page routes
│
├── types/
│   ├── article.ts                # Article type (name, link?, order)
│   ├── basics.ts                 # Basics and SocialLink types (matches data/basics.json shape)
│   ├── book.ts                   # Book type (name, image, link, order)
│   └── online-work.ts            # OnlineWork type (name, link, order)
│
├── data/                         # Static JSON content (source of truth for all site content)
│   ├── basics.json               # Site identity: name, titles, summaryItems, about intro/items, contact info, social links
│   ├── articles.json             # 14 articles: name + optional link + order
│   ├── books.json                # 3 published books: name, cover image path, external purchase link, order
│   └── online-work.json          # 9 online contributions: name, external link, order
│
├── styles/
│   └── globals.css               # Tailwind directives, fadeIn keyframes, nav classes, scrollbar-gutter
│
├── public/
│   ├── assets/                   # Brand logos (logo-webequate-light.png, logo-webequate-dark.png)
│   ├── images/                   # Profile photo (mary.jpg, mary.png), book covers (book-1/2/3.png), UI assets
│   ├── fonts/                    # GeneralSans variable font (woff2, woff, ttf, eot)
│   ├── robots.txt
│   └── sitemap*.xml
│
├── scripts/                      # Build utility scripts (sitemap sorting)
│
├── next.config.js                # Turbopack SVG extensions, image formats, strict mode
├── tsconfig.json                 # Target ES2022, react-jsx, @/* alias, bundler resolution
├── tailwind.config.js            # Custom red/neutral palette, dark mode: class, forms plugin
├── eslint.config.mjs             # ESLint v9 flat config
├── postcss.config.js             # PostCSS for Tailwind
├── .prettierrc.json              # semi, trailingComma: es5, double quotes, 2-space tabs
├── next-sitemap.config.js        # siteUrl: https://maryjjohnson.com, generates robots.txt
├── vercel.json                   # NODE_VERSION: 24.15.0
├── .nvmrc                        # Node 24
└── .env.template                 # Environment variable reference
```

---

## Key files

| File | Purpose |
|---|---|
| `next.config.js` | Turbopack extensions, AVIF/WebP image formats, strict mode |
| `tsconfig.json` | `jsx: react-jsx`, no `baseUrl`, `moduleResolution: bundler` |
| `eslint.config.mjs` | ESLint v9 flat config with native `@typescript-eslint` rules |
| `styles/globals.css` | Tailwind directives, animations, nav component classes |
| `.nvmrc` | Node 24 |
| `vercel.json` | `NODE_VERSION: 24.15.0` |
| `lib/fonts.ts` | Belgrano font definition (`next/font/google`) |
| `lib/metadata.ts` | `siteConfig` + `getPageMetadata()` — used by every page route |
| `app/api/send-email/route.tsx` | Contact form API handler |
| `data/basics.json` | Site identity and contact config |
| `data/articles.json` | Article list (source of truth for `/articles`) |
| `data/books.json` | Book list (source of truth for `/books`) |
| `data/online-work.json` | Online work list (source of truth for `/online-work`) |

---

## Environment variables

All variables are required in production unless marked optional. Copy `.env.template` to `.env.local` for local development.

| Variable | Required | Description |
|---|---|---|
| `GMAIL_USER` | Yes | Gmail account used as the SMTP sender |
| `GMAIL_APP_PASS` | Yes | Gmail app-specific password (not the account password) |
| `EMAIL_FROM` | Yes | `From:` address in outgoing emails |
| `EMAIL_TO` | Yes | Recipient address for contact form submissions |
| `EMAIL_CC` | No | CC address for contact form submissions |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL (`https://maryjjohnson.com`) — used for metadata and sitemaps |
| `NEXT_PUBLIC_ASSET_URL` | Yes | Base URL for public assets |
| `NEXT_PUBLIC_GTM_ID` | Yes | Google Tag Manager container ID (e.g. `GTM-XXXXXXX`) |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics measurement ID |

`NEXT_PUBLIC_*` variables are embedded at build time and exposed to the browser. Never put secrets in `NEXT_PUBLIC_*` variables.

---

## Third-party services

| Service | How used |
|---|---|
| **Gmail SMTP** | Nodemailer connects on port 465 (TLS) using `GMAIL_USER` + `GMAIL_APP_PASS`. Configure a Gmail App Password — standard account passwords are rejected. |
| **Google Tag Manager** | Injected via `@next/third-parties` `<GoogleTagManager>` in the root layout. Controlled by `NEXT_PUBLIC_GTM_ID`. |
| **Google Fonts** | Belgrano loaded via `next/font/google` in `lib/fonts.ts` — **not** a CSS `@import`. The font object is exported and applied as a class. |
| **Vercel** | Deployment platform. No custom build command — Vercel auto-detects Next.js. Node version set in `vercel.json`. |
| **next-sitemap** | Generates `sitemap.xml` and `robots.txt` at build time via `npm run build:sitemap`. Config in `next-sitemap.config.js`. |

---

## Data model

### `data/basics.json` → `types/basics.ts`

Single object with site-wide identity and contact info. Imported directly in server or client components.

```ts
type SocialLink = { name: string; handle: string; url: string };

type Basics = {
  _id: string;
  name: string;
  titles: string[];         // Rotating role labels shown on home page
  summaryItems: string[];   // Paragraph items for home page summary
  aboutIntro: string;       // Opening paragraph for /about
  aboutItems: string[];     // Additional about paragraphs
  resumeLink: string;       // URL to downloadable resume/CV
  email: string;
  socialLinks: SocialLink[];
  location: string;
  phone: string;
  website: string;
  contactIntro: string;     // Intro text for the contact page
};
```

### `data/articles.json` → `types/article.ts`

Array of 14 article entries, used by `/articles`.

```ts
type Article = {
  name: string;
  link?: string;   // Optional — some articles are text-only (no URL)
  order: number;
};
```

### `data/books.json` → `types/book.ts`

Array of 3 published books, used by `/books`.

```ts
type Book = {
  name: string;
  image: string;   // Path relative to /public (e.g. /images/book-1.png)
  link: string;    // External purchase/info URL
  order: number;
};
```

### `data/online-work.json` → `types/online-work.ts`

Array of 9 online contributions, used by `/online-work`.

```ts
type OnlineWork = {
  name: string;
  link: string;    // External URL
  order: number;
};
```

### `interfaces/ContactForm.ts`

```ts
interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;   // Honeypot — must be empty; bots fill it in
}
```

---

## Routing

| URL pattern | Source file | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Home: name, titles, summary, ThemedImage, social links |
| `/about` | `app/about/page.tsx` | AboutContent paragraphs + AboutDetails photo sidebar |
| `/articles` | `app/articles/page.tsx` | Linked/unlinked article list from `articles.json` |
| `/books` | `app/books/page.tsx` | Book grid with cover images from `books.json` |
| `/contact` | `app/contact/page.tsx` | Two-column: ContactForm + ContactDetails |
| `/online-work` | `app/online-work/page.tsx` | Linked contributions list from `online-work.json` |
| `/api/send-email` | `app/api/send-email/route.tsx` | POST only; GET returns health ping |

All routes are statically generated. There are no dynamic `[slug]` routes in this project.

---

## Theming

Dark mode is class-based (set on `<html>`). `next-themes` manages persistence to `localStorage` and hydration safety via `Providers.tsx`. Default theme is `"light"`.

**Custom Tailwind palette (red accent — distinct from other family projects):**

| Token | Value | Usage |
|---|---|---|
| `light-1` | `#f5f5f5` | Light-mode backgrounds |
| `light-2` | `#a3a3a3` | Light-mode secondary text |
| `light-3` | `#404040` | Light-mode borders/rings |
| `dark-1` | `#262626` | Dark-mode backgrounds |
| `dark-2` | `#525252` | Dark-mode secondary text |
| `dark-3` | `#d4d4d4` | Dark-mode borders/rings |
| `accent-light` | `#bb0000` | Accent color in light mode (deep red) |
| `accent-dark` | `#990000` | Accent color in dark mode (darker red) |

Use `dark:` prefix variants for dark-mode styles. `ThemeSwitcher` guards its render with a `mounted` check to prevent hydration mismatches.

**Typography:** Belgrano (Google Fonts) is the display font for the site logo. It is loaded via `next/font/google` in `lib/fonts.ts` and applied as a CSS class via the exported font object. Standard body text uses the Tailwind sans stack, with `.belgrano` also defined as a fallback CSS class in `globals.css`.

---

## Coding conventions

### Imports

All imports use the `@/` alias (maps to project root). No relative imports.

```ts
import basics from "@/data/basics.json";
import { Basics } from "@/types/basics";
import Header from "@/components/Header";
import { getPageMetadata } from "@/lib/metadata";
```

### Server vs client components

The default is server component. Add `"use client"` only when the component needs browser APIs, event handlers, or React hooks. Most page files in this project are `"use client"` because of theme and animation dependencies. The root `app/layout.tsx` is a server component; `Providers.tsx` and `Layout.tsx` are the client boundary.

### TypeScript

- Strict mode is on. Avoid `any` — the ESLint config allows it only in API route files (`**/api/**/*.{ts,tsx}`).
- Type data shapes in `types/` (matching JSON structure). Put component prop interfaces inline at the top of the file, or in `interfaces/` if reused across files.
- The `ContactForm` interface lives in `interfaces/ContactForm.ts` because it is shared between `ContactForm.tsx` and `route.tsx`.

### Metadata pattern

Every page route uses `lib/metadata.ts` rather than constructing metadata inline:

```ts
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata({
  title: "About",
  description: "...",
  path: "/about",
});
```

`getPageMetadata()` injects the canonical URL, OpenGraph image, and Twitter card fields automatically from `siteConfig`.

### Styling

- Tailwind utility classes only — no inline styles, no CSS modules.
- Dark mode via `dark:` prefix on every element that needs it. Use the custom palette tokens (`bg-light-1 dark:bg-dark-1`, `text-dark-2 dark:text-light-2`, etc.).
- The accent color is red (`accent-light` / `accent-dark`) — not orange or blue. Use it for highlights, active nav states, and hover effects.
- Animation: `.page-content` applies a 0.5s `fadeIn` keyframe. `PageContent.tsx` triggers this on route change by using `pathname` as its React `key`.
- Nav class hierarchy: `.nav-primary` (desktop header), `.nav-secondary` (footer), `.nav-mobile` (hamburger drawer).

### Page transitions

Wrap page body content in `<PageContent>` to get the fade-in transition on route change:

```tsx
<PageContent>
  <Heading>Articles</Heading>
  {/* ... */}
</PageContent>
```

`PageContent` uses `usePathname()` as its `key` prop, which causes React to unmount/remount the subtree on navigation, triggering the CSS animation.

### Forms

- All form state lives in client components with `useState`.
- Submit handler POSTs JSON to `/api/send-email`, reads `{ success, message }` response.
- Always include the honeypot `website` field (hidden via CSS, not `type="hidden"`).
- Reset form fields on successful submission.
- Show loading state on the submit button during the request.
- On a filled honeypot, the API returns a silent success — do not show a confirmation to the user.

### Email API route

The route file is `route.tsx` (not `route.ts`) — this is intentional. Server-side validation mirrors client validation. The route:

1. Rejects requests with a filled honeypot field silently (returns 200 success to confuse bots).
2. Validates all required fields and email format server-side.
3. Escapes HTML in all user-supplied strings before embedding in the HTML email body.
4. Sends both an HTML version (with responsive template) and a plain-text fallback (which includes the `receivedAt` timestamp).
5. Returns `{ success, message }` — the client reads `result.message` for display.

### SEO / metadata

Every route uses `getPageMetadata()` from `lib/metadata.ts`:

```ts
export const metadata = getPageMetadata({
  title: "Contact",
  description: "Get in touch with Mary J Johnson.",
  path: "/contact",
});
```

The root layout (`app/layout.tsx`) sets the base metadata directly using `siteConfig` for the home page defaults.

---

## Component conventions

- **File names:** PascalCase matching the exported component name.
- **One component per file.** No barrel files.
- **Props:** Inline interface at the top of the file unless the interface is shared across files (in which case put it in `interfaces/`).
- **No default export wrapping** — components are exported as `export default function ComponentName` or `export default ComponentName`.
- **Icons:** Use `react-icons` subpackages. Current usage: `fi` (Feather Icons) in ContactDetails, Header, Hamburger, useScrollToTop; `fa` (Font Awesome) in SocialButton, ThemeSwitcher.
- **Dead code:** `AllenJohnson.tsx` and `HomeButton.tsx` appear to be unused legacy artifacts. Do not extend them — delete them when confirmed unused.

---

## Testing

The project uses **Vitest** + **React Testing Library** (jsdom environment).

### Configuration

| File | Purpose |
|---|---|
| `vitest.config.ts` | Vitest config: jsdom environment, `@vitejs/plugin-react`, `@/` alias |
| `vitest.setup.ts` | Global setup: `@testing-library/jest-dom` matchers + Next.js module mocks |

### Global mocks (vitest.setup.ts)

- **`next/font/google`** — stubbed because `lib/fonts.ts` calls `Belgrano()` at import time (a Next.js build-time API that fails in jsdom). Any component that transitively imports `lib/fonts.ts` needs this mock.
- **`next/link`** — rendered as a plain `<a>` so tests don't need a router context.
- **`next/navigation`** — `usePathname` mocked to return `"/"` by default; override per-test with `vi.mocked(usePathname).mockReturnValue("/your-path")`.

### Test structure

```
__tests__/
├── lib/
│   └── metadata.test.ts          # siteConfig constants + getPageMetadata() output
├── hooks/
│   └── useThemeSwitcher.test.tsx # localStorage restore, no-loop guarantee, class management
└── components/
    ├── ContactForm.test.tsx       # submission, error paths, honeypot, field reset, payload
    ├── Footer.test.tsx            # nav links, isActive logic
    ├── FormInput.test.tsx         # label, type, placeholder, onChange, required
    ├── Hamburger.test.tsx         # toggle callback, icon swap
    ├── Header.test.tsx            # nav links, isActive logic, hamburger open/close
    ├── PageContent.test.tsx       # children rendering, className, pathname change
    ├── SocialButton.test.tsx      # URL, target, icon dispatch for all 6 networks
    └── ThemeSwitcher.test.tsx     # mount guard, light→dark, dark→light
```

Purely presentational components (no logic, state, or interactivity) are intentionally not tested.

### Commands

```bash
npm test               # vitest watch mode
npm run test:run       # single run (local)
npm run test:ci        # single run (CI)
```

### Adding new tests

- Put test files under `__tests__/` mirroring the source tree.
- If a new component imports `next/font/google` (directly or via `lib/fonts.ts`), the global mock in `vitest.setup.ts` already handles it — no per-file mock needed.
- If a component uses `next-themes` `useTheme`, mock it at the top of the test file:
  ```ts
  vi.mock("next-themes", () => ({
    useTheme: vi.fn(() => ({ theme: "light", setTheme: vi.fn() })),
  }));
  ```
- Use `vi.mocked(usePathname).mockReturnValue("/path")` inside individual tests to simulate active nav states.

---

## Commands

```bash
npm run dev            # dev server on port 5555 (Turbopack)
npm run build          # production build
npm run lint           # eslint . (ESLint v9 flat config)
npm run format         # prettier --write on all source files
npm run build:sitemap  # next-sitemap + custom sort script
npm run test:run       # run full test suite once
```

---

## What to avoid

- Do not add a `webpack()` function to `next.config.js` — Turbopack is active.
- Do not add `baseUrl` to `tsconfig.json` — deprecated in TS 6.0.
- Do not use `next/head` or `next/router` — App Router uses `export const metadata` and `next/navigation`.
- Do not use `.eslintrc.*` files — ESLint v9 reads only `eslint.config.mjs`.
- Do not use `next lint` in scripts — replaced by `eslint .`.
- Do not downgrade Node below 24 — `package.json` `engines` enforces `>=24.0.0`.
- Do not use relative imports — use the `@/` alias.
- Do not load Belgrano via a CSS `@import` — it is already loaded by `next/font/google` in `lib/fonts.ts`. Adding a duplicate `@import` would cause a double download.
- Do not construct page metadata inline — call `getPageMetadata()` from `lib/metadata.ts`.
- Do not use `useThemeSwitcher` from `hooks/useThemeSwitcher.tsx` — it is a legacy hook superseded by `next-themes`. Use `useTheme()` from `next-themes` instead.
- Do not put secrets in `NEXT_PUBLIC_*` environment variables — they are embedded in the client bundle.

---

## Upgrade history (condensed)

The following changes were made to reach the current state from a Next.js 15 / Node 22 baseline:

1. **Next.js 16 + Turbopack** — removed webpack SVG loader, added `turbopack.resolveExtensions`, fixed `globals.css` import order, set `jsx: react-jsx`.
2. **ESLint v9 flat config** — deleted `.eslintrc.json`, created `eslint.config.mjs`, changed lint script from `next lint` to `eslint .`; API route pattern extended to cover `.{ts,tsx}`.
3. **Security audit pass** — `nodemailer` 6→8, various ReDoS/injection fixes.
4. **Dependency refresh** — all packages to current stable, `@typescript-eslint` parser + plugin added; removed `eslint-config-prettier`, `eslint-plugin-prettier`, `eslint-plugin-react-hooks`.
5. **Dead code removal** — removed unused props from `AboutDetails`, unused `catch` binding in `ContactForm`, unused `receivedAt` parameter from `buildHtmlEmail` in the send-email route.
6. **tsconfig cleanup** — changed `target` to `es2022`, `jsx` to `react-jsx`; updated `exclude` list; removed deprecated `baseUrl`.
7. **Node.js 24 LTS** — `.nvmrc`, `vercel.json`, `engines` all updated.
