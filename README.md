# Oliver Ormar Ingvarsson — portfolio

A one-page portfolio built as a broadcast multiview: four projects as camera sources, a program window that plays each project as a four-shot segment, and a working studio switcher (input keys, AUTO, CUT).

Live: https://oliver-ormar-portfolio.netlify.app

## Stack
- [Astro](https://astro.build) for the static page, meta tags and assets
- React for the interactive multiview (one island, `client:load`)
- Hosted on Netlify (`netlify.toml`)

## Structure
```
src/
  components/Multiview.jsx   switcher, program window, shots, auto-play
  data/projects.js           project titles, credits and thumbnails
  styles/multiview.css       all styles, incl. the mobile layout (≤760px)
  layouts/Base.astro         <head>: title, description, Open Graph
  pages/index.astro
public/
  assets/                    images and short muted videos used by the shots
  Oliver_Ormar_Ingvarsson_CV.pdf
```

## Develop
```
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```

## Behaviour notes
- Auto-play starts a few seconds after load and loops Vörn → QuickFlick → Graphics Engine → Bogfimisetrið. The next project is always loaded into preview before the cut.
- Any click, tap or key press hands control to the visitor; the AUTO key resumes.
- Auto-play is off for visitors with reduced motion enabled and pauses while the tab is hidden.
