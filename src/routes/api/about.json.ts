import type { RequestHandler } from '@sveltejs/kit';
import { getPage } from 'markedpage';

export const get: RequestHandler = async ({ url }) => {
	const page = await getPage('about');
	const content = await page.render();

	return {
		body: {
			metadata: page.frontMatter,
			content: content
		}
	};
};
