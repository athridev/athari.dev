# Athari.dev

**AI, Cloud & Tech Talent Signals for the Middle East** — the landing page for the Athari newsletter and community, served at [athari.dev](https://athari.dev) via GitHub Pages.

## Structure

```
index.html            Landing page (hero, coverage, audience, why, roadmap, signup)
styles.css            Full design system — premium dark theme
script.js             Reveal animations, nav state, footer year
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

## Newsletter signup

Signup is delegated entirely to [Athari Risala](https://risala.athari.dev) — the subscribe section embeds Risala's official iframe (`https://risala.athari.dev/embed`), which handles its own submit flow, anti-bot token, and inline success state. This repo is a static page with no backend and stores no signup data; subscribers are collected and managed in Risala's admin at `risala.athari.dev/admin`.
