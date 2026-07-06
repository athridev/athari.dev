# Athari.dev

**AI, Cloud & Tech Talent Signals for the Middle East** — the landing page for the Athari newsletter and community, served at [athari.dev](https://athari.dev) via GitHub Pages.

## Structure

```
index.html            Landing page (hero, coverage, audience, why, roadmap, signup)
styles.css            Full design system — premium dark theme
script.js             Reveal animations, nav state, form handling
404.html              Branded not-found page
favicon.svg           Vector favicon
apple-touch-icon.png  iOS/home-screen icon (180×180)
og.jpg                Open Graph / social share image (1200×630)
CNAME                 Custom domain for GitHub Pages
robots.txt            Crawler policy + sitemap pointer
sitemap.xml           Single-URL sitemap
```

## Deployment

Deployed from the `main` branch (root) with GitHub Pages. DNS at Porkbun:

- `A` records on the apex → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- `CNAME` on `www` → `athridev.github.io`

## Connecting the newsletter form

The form currently stores signups in `localStorage` (key `athari-signups`) and simulates success. To connect a real backend, set `FORM_ENDPOINT` at the top of `script.js` to any endpoint that accepts a JSON POST of `{ name, email, role, interest }` — e.g. a [Formspree](https://formspree.io) form URL, a Beehiiv/ConvertKit API proxy, or a small Vercel function that writes to a DB and sends a welcome email via Resend.
