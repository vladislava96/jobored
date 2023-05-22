# Jobored

## Features

- Used [template](https://mantine.dev/guides/next/) Next.js + Mantine
- Server side rendering setup for Mantine
- Jest with react testing library
- ESLint setup with [eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine)

## Functionality

- Used Superjob Service API
- The user sees a list of available vacancies, as well as filters to narrow the search.
- The user can click on a vacancy and get to the “Vacancy” page for its detailed view.
- The user can save the job as a favorite by clicking on the star.
- The user can remove the vacancy from favorites by clicking again on the star.
- Favorite vacancies are saved in localeStorage.
- The user sees a list of saved jobs.
- The user can remove a vacancy from favorites by clicking on the star.
- The user can click on a vacancy and get to the “Vacancy” page for its detailed view.
- The user sees the details of the vacancy.

## npm scripts

### Build and dev scripts

- `dev` – start dev server
- `build` – bundle application for production
- `export` – exports static website to `out` folder
- `analyze` – analyzes application bundle with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `jest` – runs jest tests
- `jest:watch` – starts jest watch
- `test` – runs `jest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier
