import { json as json$1 } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import TestJson from '$lib/test/search.json';

export const GET: RequestHandler = async ({ url }) => {
	return json$1({
		...TestJson
	});
};
