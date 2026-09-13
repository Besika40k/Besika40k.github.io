# CLAUDE.md

Portfolio site for Besik Meskhia ("Jormungandr"). Vite + React 19 + TypeScript + Sass CSS modules, deployed to GitHub Pages by `.github/workflows/deploy.yml`.

## Commands

- `npm run dev`: dev server on port 5173
- `npm run build`: `tsc -b` then `vite build`. Run it before calling work done.
- `npm run lint` / `npm run format`

## Layout

- Composition modelled on jkane.co: a left column of profile cards (`src/components/sidebar/`) and a right panel of detail sections (`src/components/panel/`). Above 1000px both columns scroll independently; below that the page stacks and scrolls normally.
- Content is data, not markup: `src/data/*.ts`. Components never hard-code user-facing copy.
- i18n: every string is `Localized` (`{ en, ka }`). Use `useI18n()` for `t(key)` (UI labels in `src/i18n/strings.ts`) and `l(value)` (data). Georgian is proofread by the owner, so flag new Georgian text for review.

## Styling rules

- `src/styles/_tokens.scss` is auto-injected into every SCSS file; it must not emit CSS. Colours are CSS custom properties in `src/styles/global.scss`.
- Palette comes from the owner's rsschool-cv site: slate `#3b4e51`, sage `#8aa3a6`, ice `#e9f1f2`, abyss `#1c261a`, ember `#e67e22`, rose `#b8938f`. Ember marks the active state; never use it for body text (use `--link`).
- Fonts: Grenze (display), Schibsted Grotesk (body), Noto Serif/Sans Georgian (Georgian fallbacks), Noto Sans Runic (rune accents).
- Artwork: use the owner's traced serpent and rune pattern (`src/assets/`). Don't draw new serpent or logo art; the owner rejected hand-drawn, cartoonish versions.
- Motion: interface animations ignore `prefers-reduced-motion` on purpose (owner's call, `MotionConfig reducedMotion="never"`). Automatic, non-interactive motion (avatar entrance spin) and smooth scrolling still honour it.
- Brand icons: add named imports to `src/lib/brandIcons.ts` (keeps the bundle tree-shaken).
