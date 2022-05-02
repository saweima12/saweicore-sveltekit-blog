import type { RequestHandler } from '@sveltejs/kit';
import type { DirectoryClassifierResult, SourcePage } from 'markedpage';

import { siteConfig, classifiedSet } from 'markedpage';

export const get: RequestHandler = async ({ params }) => {
  // get url params
  const { slug } = params;
  const pageNum = Number(slug)
  // get config params.
  const config = await siteConfig();
  const maxPerPage = config.pagination.maxPerPage;
  // get all page list.
	const postSet: DirectoryClassifierResult = await classifiedSet('post');
	const rawList: Array<SourcePage> = postSet.pages.slice().sort((a,b) => {
    return new Date(b.frontMatter.created).getTime() - new Date(a.frontMatter.created).getTime()
  });

  let postList: Array<SourcePage> = [];
  const maxPage = Math.ceil(rawList.length / maxPerPage);
  if (pageNum <= maxPage ) {
    let startIndex = (pageNum - 1) * maxPerPage;
    let endIndex = pageNum * maxPerPage;
    postList = rawList.slice(startIndex, endIndex);
  }

	return {
		body: {
			list: postList,
      maxPage: maxPage,
      pageNum: pageNum,
		}
	};
};
