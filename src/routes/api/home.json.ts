import { page } from '$app/stores';
import type { RequestHandler } from '@sveltejs/kit';
import type {
  DirectoryClassifierResult,
  FrontMatterClassifierResult,
  SourcePage
} from 'markedpage';

import { classifiedSet } from 'markedpage';

export const get: RequestHandler = async ({ params }) => {
  // process postList & sort by created time descending.
	const postSet: DirectoryClassifierResult = await classifiedSet('post');
	const postList: Array<SourcePage> = postSet.pages.slice()
    .sort((a, b) => {
      return new Date(b.frontMatter.created).getTime() - new Date(a.frontMatter.created).getTime()
    });

  // process taglis & sort by count descending.
  const tagMap: FrontMatterClassifierResult = await classifiedSet("tag");
  const tagList : Array<Record<string, any>> = Object.entries(tagMap)
    .map(([tagId, pages]) => ({ id: tagId, count: pages.length }))
    .sort((a, b) => b.count - a.count);

	return {
		body: {
			postList,
      tagList
		}
	};
};
