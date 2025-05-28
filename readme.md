# AI Background Remover

This project is a web application built with Next.js that allows users to easily remove backgrounds from images using artificial intelligence.

## Features

- **Easy Image Upload:** Simple interface for uploading images.
- **AI-Powered Background Removal:** Utilizes AI models (likely from Hugging Face) to accurately detect and remove image backgrounds.
- **Download Results:** Allows users to download the processed image with the background removed.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for building server-rendered applications.
- [@huggingface/transformers](https://www.huggingface.co/transformers) - Library for using pre-trained AI models.
- [react-images-uploading](https://www.npmjs.com/package/react-images-uploading) - React component for image uploading.
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework.
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript.
- [Jest](https://jestjs.io/) - JavaScript testing framework.
- [ESLint](https://eslint.org/) - Pluggable JavaScript linter.
- [Prettier](https://prettier.io/) - Opinionated code formatter.
- [Husky](https://typicode.github.io/husky/#/) - Git hooks.

## Quick Start

Follow these steps to get the project up and running on your local machine.

1.  **Clone the repository:**
    ```bash
    git clone <repository_url> # Replace <repository_url> with the actual URL
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

## How to Use

1.  Navigate to the application in your web browser (`http://localhost:3000` if running locally).
2.  Click on the upload area or drag and drop an image file to upload it.
3.  The application will process the image and remove the background using AI.
4.  Once the processing is complete, the resulting image will be displayed.
5.  Click the download button to save the image with the background removed.

## Available NPM Scripts

- `start`: Start development
- `dev`: Start development server with turbopack (used by `npm run start`)
- `lint`: Run linter
- `test`: Start testing environment
- `format`: Run formatter
- `precommit:format`: Run prettier before commit
- precommit:lint: Run production eslint before commit
- precommit:typecheck: Run typescript type checking before commit

## Project Structure

- `src/`: Main application code (components, hooks, etc.)
- `public/`: Static assets (SVGs, images)
- `.husky/`: Git hooks for pre-commit checks

## Vercel Deployment

1. Push your code to GitHub.
2. Import your repo at [Vercel](https://vercel.com/import/git).
3. Vercel auto-detects Next.js and deploys instantly.

---
