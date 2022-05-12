import type { RequestHandler } from '@sveltejs/kit';
import TestJson from '$lib/test/search.json';

export const get: RequestHandler = async ({ url }) => {
	return {
		body: {
			...TestJson
		}
	};
};
