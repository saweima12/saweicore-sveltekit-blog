import { classifiedSet, siteConfig } from 'markedpage';
import type { SourcePage, FrontMatterClassifierResult } from 'markedpage';

import type { RequestHandler } from '@sveltejs/kit';

export const get : RequestHandler = async ({params}) => {
  //  get params
  const { tag, slug } = params;
  const pageNum = Number(slug);
  // load config.
  const config = await siteConfig();
  const maxPerPage = config.pagination.maxPerPage;
  // Get: tag list.
  const tagSetMap: FrontMatterClassifierResult = await classifiedSet("tag");
  const tagSet = tagSetMap[tag] || [];

  let sortList = tagSet.slice().sort((a, b) => {
    return new Date(b.frontMatter.created).getTime() - new Date(a.frontMatter.created).getTime();
  });

  const maxPage = Math.ceil(sortList.length / maxPerPage);
  let list: Array<SourcePage> = []
  if (pageNum <= maxPage) {
    let startIndex = (pageNum - 1) * maxPerPage;
    let endIndex = pageNum * maxPerPage;
    list = sortList.slice(startIndex, endIndex);
  }

  return {
    body: {
      name: params.tag,
      list: list,
      maxPage: maxPage,
      pageNum: pageNum
    }
  }
}
