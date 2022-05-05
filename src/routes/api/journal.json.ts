import type { RequestHandler } from '@sveltejs/kit';
import type { PageMeta } from '$lib/types';
import type {
  DirectoryClassifierResult,
  SourcePage
} from 'markedpage';

import { classifiedSet } from 'markedpage';
import { getFormatedDate } from '$lib/helper';

export const get: RequestHandler = async ({ params }) => {
  // process postList & sort by created time descending.
	const postSet: DirectoryClassifierResult = await classifiedSet('post');
	const postList: Array<PageMeta> = postSet.pages.slice()
    .map(page => ({ metadata: page.frontMatter, slugKey: page.slugKey}))
    .sort((a, b) => {
      return new Date(b.metadata.created).getTime() - new Date(a.metadata.created).getTime()
  });

  const groupMap = postList.reduce((groups: Record<string, any>, page: PageMeta) => {
    const dateObj = getFormatedDate(page.metadata.created);
    groups[dateObj.year] = groups[dateObj.year] || [];
    groups[dateObj.year].push(page);
    return groups;
  }, {});

  const groupList = Object.entries(groupMap)
    .map(([name, pageList]) => ({ name, pageList }))
    .sort((a, b) => Number(b.name) - Number(a.name));

	return {
		body: {
			groups: groupList
		}
	};
};
