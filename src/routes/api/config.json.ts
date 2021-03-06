import type { RequestHandler } from '@sveltejs/kit';
import { siteConfig } from 'markedpage';

export const GET: RequestHandler = async ({ url }) => {
	const config = await siteConfig();

	return {
		body: config
	};
};
