# Besika40k.github.io

Personal portfolio of Besik Meskhia (Jormungandr), served at https://besika40k.github.io.

Built with React, TypeScript, Sass (CSS modules) and Vite. English and Georgian.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run lint
npm run format
```

## Editing content

All text lives in typed data files. Every user-facing string has an `en` and a `ka` version.

| What                        | File                       |
| --------------------------- | -------------------------- |
| Name, bio, links, email     | `src/data/profile.ts`      |
| Work experience             | `src/data/experience.ts`   |
| Projects and categories     | `src/data/projects.ts`     |
| Skills and the logo strip   | `src/data/skills.ts`       |
| Education, spoken languages | `src/data/education.ts`    |
| Hackathons and achievements | `src/data/achievements.ts` |
| Interface labels            | `src/i18n/strings.ts`      |

- **Projects**: set `pinned: true` to show a project in the left column. Put screenshots in `public/projects/` and reference them with `image: '/projects/name.png'`.
- **Achievements**: remove `placeholder: true` once an entry is real.
- **Logos**: tech logos come from [simple-icons](https://simpleicons.org). To use a new one, add it to `src/lib/brandIcons.ts`.
- **CV**: replace `public/CV.pdf`.

## Mini-game

The Contact view swaps the logo strip and pinned projects for a small endless runner: the serpent jumps runestones (Space, ↑ or tap). It lives in `src/game/serpentRunner.ts`; speed, gravity and when ravens appear are constants at the top of that file. The best score is kept in the visitor's browser.

## Deploying

Every push to `main` builds the site and publishes it through GitHub Actions (`.github/workflows/deploy.yml`).
One-time setup: in the repository's **Settings → Pages**, set **Source** to **GitHub Actions**.

## Artwork

The ouroboros and the rune pattern are vector traces of the images from [rsschool-cv](https://github.com/Besika40k/rsschool-cv). They are single-colour SVGs, recoloured with CSS masks.
