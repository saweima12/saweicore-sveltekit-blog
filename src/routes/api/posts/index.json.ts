import type { RequestHandler } from '@sveltejs/kit';
import type { DirectoryClassifierResult, SourcePage } from 'markedpage';

import { siteConfig, classifiedSet } from 'markedpage';

export const get: RequestHandler = async ({ params, url }) => {
	const postSet: DirectoryClassifierResult = await classifiedSet('post');
	const postList: Array<SourcePage> = postSet.pages;

	return {
		body: {
			list: postList,
      maxPage: 0,

		}
	};
};
