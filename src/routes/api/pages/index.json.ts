import type { RequestHandler } from '@sveltejs/kit';
import type { DirectoryClassifierResult, SourcePage } from 'markedpage';

import { classifiedSet } from 'markedpage';

export const get: RequestHandler = async () => {
  // get all page list.
	const postSet: DirectoryClassifierResult = await classifiedSet('post');
	const rawList: Array<SourcePage> = postSet.pages.slice().sort((a,b) => {
    return new Date(b.frontMatter.created).getTime() - new Date(a.frontMatter.created).getTime()
  });

	return {
		body: {
			list: rawList,
		}
	};
};
