import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // TODO: Se hospedar em subpasta (ex: GitHub Pages), defina o base path aqui.
  // Ex: base: '/nome-do-repositorio/' para GitHub Pages, ou '/' para domínio próprio.
  base: '/',
})
