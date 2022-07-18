import type { RequestHandler } from '@sveltejs/kit';
import TestJson from '$lib/test/search.json';

export const GET: RequestHandler = async ({ url }) => {
	return {
		body: {
			...TestJson
		}
	};
};
