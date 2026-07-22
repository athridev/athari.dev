# athari.dev

The growing project index for [athari.dev](https://athari.dev), served from the repository root with GitHub Pages.

## Add a project

Add one object to `projects.js`. The homepage automatically renders the card and updates the live-project count. Each entry contains its name, URL, short copy, tags, visual treatment, and accent colors.

## Structure

- `projects.js` — the project registry
- `index.html` — the responsive project-index experience
- `favicon.svg` — browser icon
- `og.png` — social preview image
- `404.html` — redirects unknown paths home
- `CNAME` — custom-domain mapping

## Deployment

The `main` branch is published with GitHub Pages. The apex domain points to GitHub Pages and `www` redirects to the apex.
