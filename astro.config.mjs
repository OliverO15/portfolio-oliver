import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://oliver-ormar-portfolio.netlify.app',
  integrations: [react()],
});
