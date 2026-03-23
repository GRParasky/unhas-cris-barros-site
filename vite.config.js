import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages sem domínio próprio → '/unhas-cris-barros-site/'
  // Domínio próprio (CNAME configurado) → '/'
  base: '/unhas-cris-barros-site/',
})
