import { defineConfig } from 'astro/config';
import { astroImageTools } from 'astro-imagetools';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
	integrations: [
		vue({
			reactivityTransform: true,
		}),
		astroImageTools,
	],
});
