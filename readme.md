# Template: Next Application

**_A hand-picked front-end stack to quickly kickstart and ship serverless apps—with best practices baked in._**

[![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=white)](https://prettier.io/)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)
![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white)

## Features

- **Catch bad code:** Catch compilation, linting, formatting errors and other poor practices before they're committed.

## Quick Start

1. **Clone the template**
   ```bash
   gh repo create new-repo-name --template serohman/template-app-next --private
   gh repo clone new-repo-name
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the development server**
   ```bash
   npm run start
   ```

## Available NPM Scripts

- `start`: Start development
- `lint`: Run linter
- `format`: Run formatter
- `test`: Start testing environment

## Project Structure

- **src/**: Main application code
- **public/**: Static assets (SVGs, images)
- **.husky/**: Git hooks for pre-commit checks

## Vercel Deployment

1. Push your code to GitHub.
2. Import your repo at [Vercel](https://vercel.com/import/git).
3. Vercel auto-detects Next.js and deploys instantly.

---
