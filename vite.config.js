import { sveltekit } from '@sveltejs/kit/vite';
import { markedpageVitePlugin } from 'markedpage';

import siteConfig from './src/site.config';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), markedpageVitePlugin(siteConfig)]
};

export default config;
