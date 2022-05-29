import { getPage } from 'markedpage';
import type { SourcePage } from 'markedpage';
import type { RequestHandler } from '@sveltejs/kit';

import { getFormatedDate } from '$lib/helper';

export const get: RequestHandler = async ({ params }) => {
	const { year, month, slug } = params;
	// Search page by params.
	const page: SourcePage = await getPage(slug, (page) => {
		const dateObj = getFormatedDate(page.frontMatter.created);
		return dateObj.year == year && dateObj.month == month;
	});

	if (!page) throw "Can't find target page";

	const content: string = await page.render();

  const headings = page.headings.map(item => {
    return {
		depth: item.depth,
		text: item.text,
		id: item.id
    }
  });

	return {
		body: {
			metadata: page.frontMatter,
			content: content,
      		headings: headings
		}
	};
};
