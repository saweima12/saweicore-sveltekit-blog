import { page } from '$app/stores';
import type { RequestHandler } from '@sveltejs/kit';
import type {
  DirectoryClassifierResult,
  SourcePage
} from 'markedpage';

import { classifiedSet } from 'markedpage';
import { getFormatedDate } from '$lib/helper';

export const get: RequestHandler = async ({ params }) => {
  // process postList & sort by created time descending.
	const postSet: DirectoryClassifierResult = await classifiedSet('post');
	const postList: Array<SourcePage> = postSet.pages.slice()
    .sort((a, b) => {
      return new Date(b.frontMatter.created).getTime() - new Date(a.frontMatter.created).getTime()
  });

  const groupMap = postList.reduce((groups: Record<string, any>, item: SourcePage) => {
    const dateObj = getFormatedDate(item.frontMatter.created);
    groups[dateObj.year] = groups[dateObj.year] || [];
    groups[dateObj.year].push(item);
    return groups;
  }, {});

  const groupList = Object.entries(groupMap).map(([name, list]) => {
    return { name, list };
  }).sort((a, b) => Number(b.name) - Number(a.name));

	return {
		body: {
			groups: groupList
		}
	};
};
