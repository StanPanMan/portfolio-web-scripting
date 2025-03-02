// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  base: '/portfolio-web-scripting/',  // Ensures relative paths in production
  plugins: [react()],
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),         // Main HTML file (root)
        todoApp: resolve(__dirname, 'todo-app/index.html'),  // Todo App HTML file
      }
    }
  }
})
