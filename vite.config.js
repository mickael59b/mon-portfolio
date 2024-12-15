import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/mon-portfolio/',  // Ajoutez cette ligne pour spécifier le sous-dossier sur GitHub Pages
  plugins: [react()],
});
