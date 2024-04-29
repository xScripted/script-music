import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path, { dirname } from 'path'
const __dirname = dirname(__filename)

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    plugins: [svelte()],
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src/renderer/src')}/`,
        '@interfaces/': `${path.resolve(__dirname, 'src/interfaces')}/`,
      },
    },
  },
})
