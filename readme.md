# AI Background Remover

This project is a web application built with Next.js that allows users to easily remove backgrounds from images using artificial intelligence.

## Features

- **Easy Image Upload:** Simple interface for uploading images.
- **AI-Powered Background Removal:** Utilizes AI model to accurately detect and remove image backgrounds.
- **Download Results:** Allows users to download the processed image with the background removed.

## Quick Start

Follow these steps to get the project up and running on your local machine.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Serohman/ai-remove-bg.git
    cd ai-remove-bg
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## Available NPM Scripts

- `start`: Start development
- `dev`: Start development server with turbopack (used by `npm run start`)
- `lint`: Run linter
- `test`: Start testing environment
- `format`: Run formatter
- `precommit:format`: Run prettier before commit
- `precommit:lint`: Run production eslint before commit
- `precommit:typecheck`: Run typescript type checking before commit

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for building server-rendered applications.
- [@huggingface/transformers](https://www.huggingface.co/transformers) - Library for using pre-trained AI models.
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework.
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript.
- [Jest](https://jestjs.io/) - JavaScript testing framework.
- [ESLint](https://eslint.org/) - Pluggable JavaScript linter.
- [Prettier](https://prettier.io/) - Opinionated code formatter.
- [Husky](https://typicode.github.io/husky/#/) - Git hooks.
