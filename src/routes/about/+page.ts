import type { PageLoad } from './$types';
import type { PageResult } from '$lib/types';
import { dataAPI } from '$lib/client';

export const load: PageLoad = async ({ fetch }) => {
	const api = dataAPI.getAboutData();
	const response = await fetch(api);
	const { metadata, content }: PageResult = await response.json();

	return {
		metadata,
		content
	};
};
