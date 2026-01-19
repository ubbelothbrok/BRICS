# BRICS Website

A full-stack website built with React, TypeScript, Vite, Tailwind CSS, and MongoDB, inspired by the official BRICS website.

## Features

- Frontend: React with TypeScript and Vite for fast development
- Styling: Tailwind CSS for responsive design
- Backend: Node.js with Express
- Database: MongoDB for storing news articles
- Components: Header, Navigation, Member Countries, News, Footer

## Setup

1. Install dependencies:
   ```bash
   npm install
   cd server && npm install
   ```

2. Start MongoDB locally or set MONGODB_URI in .env

3. Seed sample data:
   ```bash
   node server/seed.js
   ```

4. Start the backend:
   ```bash
   node server/index.js
   ```

5. Start the frontend:
   ```bash
   npm run dev
   ```

6. Open http://localhost:5173

## Build

```bash
npm run build
```
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
