import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { getPage } from 'markedpage';

export const GET: RequestHandler = async () => {
	const page = await getPage('about');
	const content = await page.render();

	return json({
		metadata: page.frontMatter,
		content: content
	});
};
