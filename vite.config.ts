import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

// https://vite.dev/config/
export default defineConfig({
  // For GitHub Pages: set to '/' for custom domain, or '/repo-name/' for username.github.io/repo-name
  // The GitHub Actions workflow will set this automatically
  base: process.env.GITHUB_ACTIONS ? '/portfolio/' : '/',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    imagetools(),
  ],
})
