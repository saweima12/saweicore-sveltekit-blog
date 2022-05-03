import { classifiedSet } from 'markedpage';
import type { SourcePage, FrontMatterClassifierResult } from 'markedpage';

import type { RequestHandler } from '@sveltejs/kit';

export const get : RequestHandler = async ({params}) => {

  // Get: tag list.
  const tagSets: FrontMatterClassifierResult = await classifiedSet("tag");
  // Get: page list by tagName.
  const tagSet = tagSets[params.slug] || [];
  let postList = tagSet.slice().sort((a, b) => {
    return new Date(b.frontMatter.created).getTime() - new Date(a.frontMatter.created).getTime();
  });

  return {
    body: {
      name: params.slug,
      list: postList
    }
  }
}
