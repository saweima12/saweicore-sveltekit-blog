import { sveltekit } from '@sveltejs/kit/vite';
import { markedpageVitePlugin } from 'markedpage';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		markedpageVitePlugin()
	]
};

export default config;
