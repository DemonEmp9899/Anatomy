# 🦴 BareBones — General Anatomy, Made Easy

Static study site for 1st-year MBBS, generated from `general-anatomy-site.md`.

## Build & preview
```bash
npm install
npm run build      # writes the site to dist/
npm run serve      # build + serve at http://localhost:8080
```

## How it works
- **Content** lives only in `general-anatomy-site.md` (Part B). Edit it and rebuild.
  - `## NN · Title` becomes a chapter page; `### x.y Heading` becomes a concept card.
  - `> [!NOTE]` ⚡ high-yield, `> [!TIP]` 🧠 mnemonic sticky, `> [!IMPORTANT]` 🩺 clinical pearl, `> [!WARNING]` ⚠️ trap.
  - A ```` ```text ```` block starting `FIG x.y — TITLE` becomes a figure frame.
  - `### 🎤 Viva` lists (`1. **Q** → A`) become flip cards.
- **Interactive SVG figures** are in `src/figures.mjs`, keyed by figure id. Any figure without an SVG falls back to the notebook (ASCII) sketch.
  Drawn so far: 2.1, 3.1, 5.2, 6.2, 7.1, 7.3, 8.3, 9.2, 10.1, 11.1.
- `src/styles.css` holds the design system, `src/app.js` the behaviour (search, X-ray mode, Exam Mode, progress, quiz). `build.mjs` is the generator.

## Deploy
`dist/` is plain HTML with relative links. Upload it to GitHub Pages, Netlify, or any static host (it includes `.nojekyll`).
