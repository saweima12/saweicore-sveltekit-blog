import type { PageLoad } from './$types';
import { siteConfig } from '$lib/store';
import { dataAPI } from '$lib/client';

export const load: PageLoad = async ({ fetch }) => {
	let apiUrl = dataAPI.getConfig();
	let response = await fetch(apiUrl);
	const config = await response.json();
	siteConfig.set(config);
	return {};
};
