import { getPage } from 'markedpage';
import type { SourcePage } from 'markedpage';
import type { RequestHandler } from '@sveltejs/kit';

import { getFormatedDate } from '$lib/helper';

export const get : RequestHandler = async ({ params }) => {

  const { year, month, slug } = params;
  // Search page by params.
  const page: SourcePage = await getPage(slug, (page) => {
    const dateObj = getFormatedDate(page.frontMatter.created);
    return dateObj.year == year && dateObj.month == month;
  });

  if (!page)
    throw "Can't find target page";

  const context: string = await page.render();

  return {
    body: {
      metadata: page.frontMatter,
      context: context
    }
  }
}